import {isLocal} from '@edgio/core/environment';
import {Router, edgioRoutes} from '@edgio/core/router';
import {Features} from '@edgio/core/types';
import {nextRoutes} from '@edgio/next';
import {load} from 'cheerio';
import {Downloader as GithubDownloader} from 'github-download-directory';
import semverMaxSatisfying from 'semver/ranges/max-satisfying';

import {
  scriptSrcDomains,
  connectSrcDomains,
  imgSrcDomains,
  frameSrcDomains,
  styleSrcDomains,
  fontSrcDomains,
  mediaSrcDomains,
} from './edgio/cspDomains';
import {archiveRoutes} from './edgio/plugins/ArchiveRoutes';
import redirects from './edgio/redirects';

const defaultFeatures: Features = {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1d',
    service_worker_max_age: '1h',
  },
};

const router = new Router()
  .match('/(.*)', {
    ...defaultFeatures,
    headers: !isLocal()
      ? {
          set_response_headers: {
            'Strict-Transport-Security':
              'max-age=31536000; includeSubDomains; preload',
            'Content-Security-Policy': [
              `default-src 'self'`,
              `style-src 'unsafe-inline' 'self' ${styleSrcDomains.join(' ')}`,
              `font-src ${fontSrcDomains.join(' ')}`,
              `img-src 'self' ${imgSrcDomains.join(' ')}`,
              `frame-src ${frameSrcDomains.join(' ')}`,
              `script-src 'unsafe-inline' 'self' 'unsafe-eval' ${scriptSrcDomains.join(
                ' '
              )}`,
              `base-uri 'self'`,
              `frame-ancestors 'self'`,
              `media-src ${mediaSrcDomains.join(' ')}`,
              `connect-src ${connectSrcDomains.join(' ')}`,
            ].join('; '),
            'X-XSS-Protection': '1; mode=block',
          },
          remove_origin_response_headers: ['cache-control'],
        }
      : {},
  })

  // google verification
  .match('/googlea13e5ef2a6ea3f29.html', {
    ...defaultFeatures,
    response: {
      set_response_body:
        'google-site-verification: googlea13e5ef2a6ea3f29.html',
      set_done: true,
    },
  });

//  -- API docs --

// proxy /docs/versions to the version list
router.match('/docs/versions', {
  origin: {
    set_origin: 'api',
  },
  url: {
    url_rewrite: [
      {
        source: '/docs/versions',
        destination: '/versions.csv',
      },
    ],
  },
});

// proxy v?.x api docs to the latest version
[3, 4, 5, 6, 7].forEach((v) => {
  // proxy /docs/v?.x to the latest version
  router
    .match(`/docs/v${v}.x/:path*`, ({compute, proxy}) => {
      compute(async (req) => {
        // fetch the list of current published versions
        console.log('computing');
        const versions = await (
          await fetch('https://docs.edg.io/docs/versions')
        ).text();

        const targetVersion = semverMaxSatisfying(
          versions.replace(/\n/g, '').split(','),
          `v${v}.x`
        );

        let path = `/${targetVersion}/:path*`;

        const lastPathSegment = req.path.split('/').reverse()[0];
        const hasTrailingSlash = req.path.endsWith('/');
        const hasFileExtension = lastPathSegment.includes('.');

        // set path to index.html if it doesn't end with a file extension
        if (!hasFileExtension) {
          path = `/${targetVersion}/:path*/index.html`;
        }

        console.log('proxying to', path);

        await proxy('api', {
          path,
          transformResponse: (res) => {
            console.log('transforming response');
            // due to relative paths in the response, if the path doesn't end with a trailing
            // slash (eg. /api/core), then assets will be requested from the wrong path (eg. /api/assets/...)
            // so we need to rewrite the paths to include the last path segment
            if (!hasTrailingSlash && !hasFileExtension) {
              const $ = load(res.body ?? '');

              // prepend ${lastPathSegment} to all elements with an href or src attribute
              $('*[href], *[src]').each((i, el) => {
                const $el = $(el);
                const href = $el.attr('href');
                const src = $el.attr('src');

                if (href) {
                  $el.attr('href', `${lastPathSegment}/${href}`);
                }

                if (src) {
                  $el.attr('src', `${lastPathSegment}/${src}`);
                }
              });

              res.body = $.html();
            }
          },
        });
      });
    })

    // proxy api docs assets
    .match('/docs/:version/api/:path*:file(\\.[css|js|html|json|png]+)', {
      origin: {
        set_origin: 'api',
      },
      url: {
        url_rewrite: [
          {
            source: '/docs/:version/api/:path*:file',
            destination: '/:version/api/:path*:file',
            syntax: 'path-to-regexp',
          },
        ],
      },
    });
});

// redirects
redirects.forEach(([from, to, statusCode]) => {
  router.match(from, ({redirect}) =>
    redirect(to, {statusCode: Number(statusCode || 301)})
  );
});

// plugins
router
  // .use(
  //   archiveRoutes.addRoute(
  //     '/archive/github/:owner/:repo/:path*',
  //     async (req) => {
  //       const {owner, repo, path} = req.params || {};
  //       const downloader = new GithubDownloader({
  //         github: {auth: process.env.GH_API_TOKEN},
  //       });

  //       const flatPath = (path as string[]).join('/');
  //       const result = await downloader.fetchFiles(owner, repo, flatPath);

  //       return result.map(({path, contents}) => ({
  //         path: path.split(flatPath)[1],
  //         data: contents,
  //       }));
  //     }
  //   )
  // )
  .use(nextRoutes);
//.use(edgioRoutes);

// error handling
// router.catch(/^4.*/, {
//   response: {
//     set_status_code: 302,
//   },
//   headers: {
//     set_response_headers: {
//       location: '%{scheme}://%{host}/',
//     },
//   },
//   url: {
//     follow_redirects: true,
//   },
// });

export default router;

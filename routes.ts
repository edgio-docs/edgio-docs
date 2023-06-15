import {isProductionBuild} from '@edgio/core/environment';
import {Router, CustomCacheKey} from '@edgio/core/router';
import {nextRoutes} from '@edgio/next';
import {load} from 'cheerio';
import {Downloader as GithubDownloader} from 'github-download-directory';
import semverMaxSatisfying from 'semver/ranges/max-satisfying';

import {archiveRoutes} from './edgio/plugins/ArchiveRoutes';
import redirects from './edgio/redirects';
// import prerenderRequests from './layer0/prerender';

const key = new CustomCacheKey().excludeAllQueryParametersExcept('query');

const htmlCacheConfig = {
  key,
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60,
  },
};

const staticCacheConfig = {
  key,
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
  },
};

const scriptSrcDomains = [
  'player.vimeo.com',
  'cdn.jsdelivr.net',
  'www.googletagmanager.com',
  'cdn.segment.com',
  'cdn4.mxpnl.com',
  'www.google-analytics.com',
  'widget.intercom.io',
  'sc.lfeeder.com',
  'snap.licdn.com',
  'connect.facebook.net',
  'www.youtube.com',
  'js.intercomcdn.com',
  '*.hotjar.com',
  's.adroll.com',
  'px4.ads.linkedin.com',
  '*.google-analytics.com',
  '*.googletagmanager.com',
  'googletagmanager.com',
  '*.clarity.ms',
].sort();

const connectSrcDomains = [
  '*.edg.io',
  '*.layer0.co',
  '*.layer0.link',
  '*.layer0-perma.link',
  '*.layer0-limelight.link',
  '*.segment.io',
  '*.segment.com',
  'analytics.google.com',
  '*.google-analytics.com',
  '*.googletagmanager.com',
  'googletagmanager.com',
  '*.intercom.io',
  '*.intercomcdn.com',
  '*.intercomassets.com',
  '*.github.io',
  '*.algolianet.com',
  '*.algolia.net',
  '*.vimeo.com',
  'vimeo.com',
  '*.clarity.ms',
].sort();

const router = new Router()
  // .prerender(prerenderRequests)
  .match({}, ({setResponseHeader, removeUpstreamResponseHeader}) => {
    if (isProductionBuild()) {
      setResponseHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
      setResponseHeader(
        'Content-Security-Policy',
        [
          `default-src 'self'`,
          `style-src 'unsafe-inline' 'self' fonts.googleapis.com cdn.jsdelivr.net`,
          `font-src fonts.gstatic.com`,
          `img-src 'self' www.google-analytics.com analytics.twitter.com www.facebook.com px.ads.linkedin.com *.intercomcdn.com tr.lfeeder.com data: *.moovweb.net edgeio.whitecdn.com`,
          `frame-src www.youtube.com youtu.be player.vimeo.com`,
          `script-src 'unsafe-inline' 'self' 'unsafe-eval' ${scriptSrcDomains.join(
            ' '
          )}`,
          `base-uri 'self'`,
          `frame-ancestors 'self'`,
          `media-src www.youtube.com`,
          `connect-src ${connectSrcDomains.join(' ')}`,
        ].join('; ')
      );
      setResponseHeader('X-XSS-Protection', '1; mode=block');
      removeUpstreamResponseHeader('cache-control');
    }
  })
  .match('/googlea13e5ef2a6ea3f29.html', ({send, cache}) => {
    cache(htmlCacheConfig);
    send('google-site-verification: googlea13e5ef2a6ea3f29.html');
  })
  // .match('/sitemap.xml', ({serveStatic}) => serveStatic('sitemap.xml'))
  .match('/service-worker.js', ({serviceWorker}) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .get('/images/:path*', ({cache}) => {
    cache(staticCacheConfig);
  });

// API docs

// redirects for latest versioned docs
[3, 4, 5, 6, 7].forEach((v) => {
  // match versioned api docs and redirect
  router.match(`/docs/v${v}.x/:path*`, ({cache, compute, proxy}) => {
    cache(htmlCacheConfig);
    compute(async (req) => {
      // fetch the list of current published versions
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

      await proxy('api', {
        path,
        transformResponse: (res) => {
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
  });
});

// list of versions
router
  .match('/docs/versions', ({cache, proxy}) => {
    cache(htmlCacheConfig);
    proxy('api', {path: '/versions.csv'});
  })
  // match current api docs with a file extension
  .match(
    '/docs/api/:path*:file(\\.[css|js|html|json|png]+)',
    ({proxy, cache, compute, redirect}) => {
      cache(htmlCacheConfig);
      compute(async () => {
        // fetch the list of current published versions
        const versions = await (
          await fetch('https://docs.edg.io/docs/versions')
        ).text();

        const targetVersion = semverMaxSatisfying(
          versions.replace(/\n/g, '').split(','),
          `v*`
        );

        redirect(`/docs/${targetVersion}/api/:path*:file`);
      });
    }
  )
  // match current api docs with a terminating /
  .match('/docs/api/:path*/', ({cache, redirect, compute}) => {
    cache(htmlCacheConfig);

    compute(async () => {
      // fetch the list of current published versions
      const versions = await (
        await fetch('https://docs.edg.io/docs/versions')
      ).text();

      const targetVersion = semverMaxSatisfying(
        versions.replace(/\n/g, '').split(','),
        `v*`
      );

      redirect(`/docs/${targetVersion}/api/:path*`);
    });
  })
  // match current api docs without terminating /,
  // gets redirected to :path*/ to satisfy relative asset paths
  .match('/docs/api/:path*', ({redirect}) => {
    redirect('/docs/api/:path*/');
  })

  // match versioned api docs with a file extension
  .match(
    '/docs/:version/api/:path*:file(\\.[css|js|html|json|png]+)',
    ({proxy, cache}) => {
      cache(htmlCacheConfig);
      proxy('api', {path: '/:version/api/:path*:file'});
    }
  );

// match versioned api docs with a terminating /
router
  .match(
    '/docs/:version/api/:path*/',
    ({proxy, cache, setResponseHeader, request}) => {
      cache(htmlCacheConfig);
      proxy('api', {path: '/:version/api/:path*/index.html'});
      setResponseHeader(
        'Link',
        `<https://docs.edg.io${request.url}index.html>; rel="canonical"`
      );
    }
  )
  // match versioned api docs without terminating /,
  // gets redirected to :path*/ to satisfy relative asset paths
  .match('/docs/:version/api/:path*', ({redirect}) => {
    redirect('/docs/:version/api/:path*/');
  });

redirects.forEach(([from, to, statusCode]) => {
  router.match(from, ({redirect}) =>
    redirect(to, {statusCode: Number(statusCode || 301)})
  );
});

router.match('/:path*', ({cache}) => {
  cache(htmlCacheConfig);
});

router
  .use(
    archiveRoutes.addRoute(
      '/archive/github/:owner/:repo/:path*',
      async (req) => {
        const {owner, repo, path} = req.params || {};
        const downloader = new GithubDownloader({
          github: {auth: process.env.GH_API_TOKEN},
        });

        const flatPath = (path as string[]).join('/');
        const result = await downloader.fetchFiles(owner, repo, flatPath);

        return result.map(({path, contents}) => ({
          path: path.split(flatPath)[1],
          data: contents,
        }));
      }
    )
  )
  .use(nextRoutes)
  .fallback(({redirect}) => {
    return redirect('/', 302);
  });

export default router;

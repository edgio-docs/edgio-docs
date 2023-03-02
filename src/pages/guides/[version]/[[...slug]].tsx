import {readFile} from 'fs/promises';
import {join} from 'path';

import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../../components/MDX/MDXComponents';
import {getVersionedConfig} from '../../../utils/config';
import {getVersionedNavigation} from '../../../utils/navigation';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList} from 'utils/Types';

const guidesPath = 'src/guides';

export default function VersionedGuide({
  source,
  headings,
}: {
  source: any;
  headings: MDHeadingsList;
}) {
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={source.frontmatter} headings={headings}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

// The paths generated for this page contain versioning and potentially
// the name of the guide in the path (eg. /guides/v6 or /guides/v6/overview).
// The path with no guide name will be used for the homepage of the version.
// The path with a guide name will be used for the guide.
export const getStaticPaths = async () => {
  const routes = [];

  // determine available versions from config files
  const versions = (
    await globby('config/v*.config.js', {
      cwd: join(process.cwd(), 'src'),
    })
  ).map(async (file: string) => {
    const v = (file.match(/v(\d+)\.config\.js/) || [])[1];

    return {
      version: v,
    };
  });

  const versionObjects = await Promise.all(versions);

  // determine available guides from filesystem
  const guides = await globby('guides', {
    cwd: join(process.cwd(), 'src'),
    expandDirectories: {
      extensions: ['md', 'mdx'],
    },
  });

  // Create a list of routes for each guide that exists in the filesystem
  // (eg. /guides/overview => /guides/[...slug])
  // These non-versioned routes will be used for the latest version of the guide
  const guidesFromFilePath = guides.map(
    (path: string) =>
      path
        .replace('guides/', '') // remove guides/ prefix
        .replace(/.mdx?/, '') // remove extension
  );

  // create a list of paths for each version and guide
  // eg. /v6/guides/overview
  const versionedPaths = versionObjects
    .flatMap(({version}) => {
      const versionedHomepage = {
        params: {
          version: `v${version}`,
          // no slug since this will just be the homepage
          slug: [],
        },
      };

      // `guide` is the rest of the path after /src/guides
      const versionedGuides = guidesFromFilePath.map((guide: string) => {
        // v*/guides/sites/overview
        const versionedGuide = `v${version}/${guide}`;
        const versionedNavGuide = `/guides/${versionedGuide}`;

        return {
          params: {
            version: `v${version}`,
            slug: guide.split('/'),
          },
        };
      });

      return [versionedHomepage, ...versionedGuides];
    })
    .filter(Boolean);
  routes.push(...versionedPaths);

  return {
    paths: routes,
    fallback: false,
  };
};

export async function getStaticProps({params}: {params: any}) {
  const {version, slug}: {version: string; slug: string[]} = params;
  const cleanedVersion = version.replace('v', '');
  const versionRE = /^v(\d+)$/;

  // default to using the homepage for content
  let content = await readFile(
    join(process.cwd(), 'src', 'pages', 'index.md'),
    'utf8'
  );

  // slug is everything after `/guides/v6/...`. It may not exist
  // if the request is for the homepage for the version.
  if (slug && slug.length > 0) {
    const slugAsString = slug.join('/');
    // The filesystem structure for guides is:
    //  - /src/guides/v6/overview.mdx (example)
    // The route slug is:
    //  - /guides/v6/overview (example)
    const slugWithoutGuides = slugAsString.replace(/guides\//, '');
    const files = (
      await globby(
        ['md', 'mdx'].flatMap((ext) => [
          `${guidesPath}/v${cleanedVersion}/${slugWithoutGuides}.${ext}`,
          `${guidesPath}/${slugWithoutGuides}.${ext}`,
        ])
      )
    ).sort((a, b) => {
      // prioritize versioned files over non-versioned files
      if (a.match(versionRE) && !b.match(versionRE)) {
        return -1;
      }
      if (!a.match(versionRE) && b.match(versionRE)) {
        return 1;
      }
      return 0;
    });

    if (!files.length) {
      console.log(`No matches files for route '${slugWithoutGuides}'`);
      return {notFound: true};
    }

    const file = files[0];
    console.log(
      `Using '${file}' for route '${slugAsString}'. Available files:`,
      files
    );

    content = await readFile(join(process.cwd(), file), 'utf8');
  }

  // update template with versioned constants
  content = templateReplace(content, await getVersionedConfig(cleanedVersion));

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.toString().replace(/<!--([\s\S]*?)-->/g, '');

  // Any {{ VALUE }} that was not replaced in the above step
  // should be replaced with only 1 set of [] braces. Keeping them as
  // double braces will cause the MDX parser to throw an error.
  content = content.toString().replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return `[${p1}]`;
  });

  const headings: MDHeadingsList = [];
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins,
      rehypePlugins: [[rehypeExtractHeadings, {headings}]],
      format: 'mdx',
    },
  });

  return {props: {source: mdxSource, headings}};
}

import {readFile} from 'fs/promises';
import {join} from 'path';

import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import {getVersionedConfig} from '../../utils/config';
import {getVersionedNavigation} from '../../utils/navigation';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
//import JSONRoutes from 'utils/jsonRoutes';
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
    <Page routeTree={{}}>
      <MarkdownPage meta={source.frontmatter} headings={headings}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

// The paths generated for this page contain no versioning in the path (eg. /guides/overview).
// Because of that, those routes are assumed to be the latest available version
// and will use the latest v*.config.js and v*.nav.js files.
export const getStaticPaths = async () => {
  const routes = [];

  // determine available guides from filesystem, excluding any paths that are guides/v*
  const guides = await globby(['guides/**/*.{md,mdx}', '!guides/v*/**/*'], {
    cwd: join(process.cwd(), 'src'),
    onlyFiles: true,
  });

  // Create a list of routes for each guide that exists in the filesystem
  const guidesFromFilePath = guides.map(
    (path: string) =>
      path
        .replace('guides/', '') // remove guides/ prefix
        .replace(/.mdx?/, '') // remove extension
  );

  routes.push(
    ...guidesFromFilePath.map((path) => ({params: {slug: path.split('/')}}))
  );
  return {
    paths: routes,
    fallback: false,
  };
};

export async function getStaticProps({params}: {params: any}) {
  const {slug}: {version: string; slug: string[]} = params;
  const latestVersion = process.env.NEXT_PUBLIC_LATEST_VERSION; // defined in next.config.js
  const versionRE = /^v(\d+)$/;

  console.log(
    `Using latest version ${latestVersion} for route '${slug.join('/')}'`
  );

  const slugAsString = slug.join('/');

  // Even though no version is specified in the route, we still need to determine
  // if there is a latest-versioned guide available. Assume that the latest version
  // is v6, and the request is for the /guides/overview page. We check the filesystem
  // for the following files:
  // - guides/v6/overview.md
  // - guides/v6/overview.mdx
  // - guides/overview.md
  // - guides/overview.mdx
  // If any of those files exist, we use the first one we find. If none of those
  // files exist, we return a 404.
  const files = (
    await globby(
      ['md', 'mdx'].flatMap((ext) => [
        `${guidesPath}/v${latestVersion}/${slugAsString}.${ext}`,
        `${guidesPath}/${slugAsString}.${ext}`,
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
    console.log(`No matches files for route '${slugAsString}'`);
    return {notFound: true};
  }

  const file = files[0];
  console.log(
    `Using '${file}' for route '${slugAsString}'. Available files:`,
    files
  );

  let content = await readFile(join(process.cwd(), file), 'utf8');

  // update template with versioned constants
  content = templateReplace(content, await getVersionedConfig(latestVersion));

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.toString().replace(/<!--([\s\S]*?)-->/g, '');

  // Any {{ VALUE }} that was not replaced in the above step
  // should be replaced with only 1 set of [] brackets. Keeping them as
  // {{ }} double braces will cause the MDX parser to throw an error.
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

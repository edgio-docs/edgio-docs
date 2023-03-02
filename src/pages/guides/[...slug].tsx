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

export const getStaticPaths = async () => {
  // This structure is used to create the routes for the /guides/[...slug] pages.
  // Because these paths are not prefixed with a version, they will be used for
  // the latest available version.
  const routes = [];

  // determine available guides from filesystem, excluding any paths that are guides/v*
  const guides = await globby(['guides/**/*.{md,mdx}', '!guides/v*/**/*'], {
    cwd: join(process.cwd(), 'src'),
    onlyFiles: true,
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

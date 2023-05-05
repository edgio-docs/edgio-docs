import {readFile} from 'fs/promises';
import {basename, dirname, join} from 'path';

import {isEdgioRunDev} from '@edgio/core/environment';
import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {getVersionedConfig, getBaseConfig} from '../../utils/config';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {MDXComponents} from 'components/MDX/MDXComponents';
import JSONRoutes from 'utils/jsonRoutes';
import {logDev} from 'utils/logging';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList} from 'utils/Types';

// location of guide markdown files
const guidePath = 'guides/open_edge';
const basePath = basename(dirname(__dirname));

export default function Guide({
  source,
  headings,
  version,
}: {
  source: any;
  headings: MDHeadingsList;
  version: string;
}) {
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={{...source.frontmatter, version}} headings={headings}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export async function getStaticPaths() {
  const routes = [];
  const paths = [];
  const [root, mdPath] = guidePath.split('/');

  // determine available guides from filesystem
  const allGuides = (
    await globby([`${mdPath}/**/*.{md,mdx}`], {
      cwd: join(process.cwd(), root),
    })
  ).map(
    (path: string) =>
      path
        .replace(`${mdPath}/`, '') // remove path prefix
        .replace(/.mdx?/, '') // remove extension
  );

  console.log('allGuides: ', allGuides);

  // if in dev mode, fallback to SSR for faster builds
  if (isEdgioRunDev()) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // add all guides to paths
  paths.push(...[...allGuides]);

  // convert paths to routes
  routes.push(
    ...[...new Set(paths)].map((path) => ({params: {slug: path.split('/')}}))
  );

  return {
    paths: routes,
    fallback: false,
  };
}

export async function getStaticProps({params}: {params: any}) {
  console.log('params: ', params);
  const {slug}: {slug: string[]} = params;
  const indexRE = /index.mdx?$/;
  let guide = (slug && [...slug]) ?? [];

  const slugAsString = guide.join('/');

  const guideGlobs = ['md', 'mdx'].flatMap((ext) => [
    `${guidePath}/${slugAsString}/index.${ext}`,
    `${guidePath}/${slugAsString}.${ext}`,
  ]);

  const files = (await globby(guideGlobs)).sort((a, b) => {
    // prioritize index files over guide files
    if (a.match(indexRE) && !b.match(indexRE)) {
      return -1;
    }
    if (!a.match(indexRE) && b.match(indexRE)) {
      return 1;
    }
    return 0;
  });

  const [file] = files;
  if (!file) {
    logDev(`No matching files for route '${slugAsString}'`);
    return {notFound: true};
  }

  logDev(
    `Using '${file}' for route '${slugAsString}'. Available files:`,
    files
  );

  let content = await readFile(join(process.cwd(), file), 'utf8');

  // update template with versioned constants
  content = templateReplace(content, getBaseConfig());

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.replace(/<!--([\s\S]*?)-->/g, '');

  // <edgejs> tags are used for external documentation and should be removed
  content = content.replace(/<edgejs([\s\S]*?)edgejs>/g, '');

  // Any {{ VALUE }} that was not replaced in the above step
  // should be replaced with only 1 set of [] brackets. Keeping them as
  // {{ }} double braces will cause the MDX parser to throw an error.
  content = content.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
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

  return {props: {source: mdxSource, headings, version: null}};
}

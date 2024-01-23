import {join} from 'path';

import {isEdgioRunDev, isProductionBuild} from '@edgio/core/environment';
import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import {getVersionedConfig, serializeConfig} from '../../utils/config';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {APPLICATIONS_SRC_PATH} from 'config/appConfig';
import {AppProvider} from 'contexts/AppContext';
import logger from 'utils/logging';
import {getVersionedNavigation} from 'utils/navigation';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList, Route, StringMap} from 'utils/Types';

const guidesPath = APPLICATIONS_SRC_PATH;
const urlStartPath = __dirname.split('/pages').reverse()[0];

export default function Guide({
  source,
  sourceFile,
  headings,
  version,
  config,
  navItems,
}: {
  source: any;
  sourceFile: string;
  headings: MDHeadingsList;
  version: string;
  config: StringMap;
  navItems: Route;
}) {
  return (
    <AppProvider config={config} navMenuItems={navItems} version={version}>
      <Page>
        <MarkdownPage
          meta={{...source.frontmatter, sourceFile, version}}
          headings={headings}>
          <MDXRemote {...source} components={MDXComponents} />
        </MarkdownPage>
      </Page>
    </AppProvider>
  );
}

export const getStaticPaths = async () => {
  const routes = [];
  const paths = [];

  // determine available guides from filesystem
  const allGuides = (
    await globby(['**/*.{md,mdx}'], {
      cwd: join(process.cwd(), guidesPath),
    })
  ).map(
    (path: string) => path.replace(/.mdx?/, '') // remove extension
  );

  // guides without version-specific override
  const baseGuides = allGuides.filter((path: string) => !path.match(/^v\d+/));

  // Across the different versions and different guides, we need routes
  // in the following formats:
  // /{PREFIX}/[guide] => guide for the latest version
  // /{PREFIX}/[version] => homepage for the version
  // /{PREFIX}/[version]/[guide] => guide for the version

  // in dev mode, don't prerender any pages and fallback to SSR for
  // faster page loads
  if (isEdgioRunDev()) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // prerender guides for the latest version only; previous versions will
  // fallback to SSR
  const version = `v${process.env.NEXT_PUBLIC_LATEST_VERSION}`;
  paths.push(
    ...[
      version, // version homepage
      ...baseGuides.map((path) => join(version, path)), // versioned base guides
      ...allGuides.filter((path) => path.startsWith(version)), // versioned overrides
    ]
  );

  // convert paths to routes
  routes.push(
    ...[...new Set(paths)].map((path) => ({params: {slug: path.split('/')}}))
  );

  if (isProductionBuild()) {
    logger.prod(JSON.stringify(paths));
  }

  // in the end, only routes matching `/{PREFIX}/v7/*` will be prerendered
  // and the rest (eg. /{PREFIX}/v6/*) will fallback to SSR
  return {
    paths: routes,
    fallback: 'blocking',
  };
};

export async function getStaticProps({params}: {params: any}) {
  const {slug}: {slug: string[]} = params;
  const latestVersion = process.env.NEXT_PUBLIC_LATEST_VERSION as string; // defined in next.config.js
  const versionRE = /^v(\d+)$/;
  let [version, ...guide] = slug;
  let isHomepage = false;
  const isVersionSpecifiedInSlug = versionRE.test(version);

  if (!isVersionSpecifiedInSlug) {
    // no version specified in the path, so redirect to the latest version path
    return {
      redirect: {
        destination: `${urlStartPath}/v${latestVersion}/${slug.join('/')}`,
        permanent: true,
      },
    };
  } else if (!guide || !guide.length) {
    // version with no remainig guide path so use as homepage
    isHomepage = true;
    guide = ['index'];
  }

  const slugAsString = guide.join('/');

  const guideGlobs = ['md', 'mdx'].flatMap((ext) => [
    `${guidesPath}/${version}/${slugAsString}.${ext}`,
    `${guidesPath}/${slugAsString}.${ext}`,
  ]);

  const files = (await globby(guideGlobs)).sort((a, b) => {
    // prioritize versioned files over non-versioned files
    if (a.match(versionRE) && !b.match(versionRE)) {
      return -1;
    }
    if (!a.match(versionRE) && b.match(versionRE)) {
      return 1;
    }
    return 0;
  });

  const [file] = files;
  if (!file) {
    logger.warn(`No matching files for route '${slugAsString}'`);
    return {notFound: true};
  }

  logger.dev(
    `Using '${file}' for route '${slugAsString}'. Available files:`,
    files
  );

  const config = await getVersionedConfig(version);
  const navItems = await getVersionedNavigation(version);

  // update template with versioned constants
  let content =
    templateReplace(join(process.cwd(), file), config) ??
    `Invalid template file: ${file}`;

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.replace(/<!--([\s\S]*?)-->/g, '');
  // In some special cases, like code blocks, we do allow HTML comments.
  // They indicate this by using &lt;!-- instead of <!-- so we need to
  // convert them back to HTML comments after removing all HTML comments.
  content = content.replace(/\&lt;!-- /g, '<!-- ');

  // <edgejs> tags are used for external documentation and should be removed
  content = content.replace(/<edgejs([\s\S]*?)edgejs>/g, '');

  const headings: MDHeadingsList = [];
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins,
      rehypePlugins: [[rehypeExtractHeadings, {headings}]],
      format: 'mdx',
    },
  });

  return {
    props: {
      source: mdxSource,
      sourceFile: file,
      headings,
      version,
      config: serializeConfig(config),
      navItems,
    },
  };
}

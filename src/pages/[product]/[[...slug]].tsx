import {join} from 'path';

import {isEdgioRunDev, isProductionBuild} from '@edgio/core/environment';
import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {productsConfig} from 'config/appConfig';
import {getContextTypeByName} from 'contexts/AppContext';
import logger from 'utils/logging';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList} from 'utils/Types';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import {getConfigByContext} from '../../utils/config';

const guidesPath = join(process.cwd(), 'guides');

export default function Guide({
  source,
  sourceFile,
  headings,
  isHomepage,
}: {
  source: any;
  sourceFile: string;
  headings: MDHeadingsList;
  isHomepage: boolean;
}) {
  // TODO - isHomepage needs to be set in the context
  return (
    <Page>
      <MarkdownPage
        meta={{...source.frontmatter, sourceFile}}
        headings={headings}
        isHomepage={isHomepage}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export const getStaticPaths = async () => {
  const routes = [];
  const paths = [];

  // determine available guides from filesystem
  const allGuides = (
    await globby(['**/*.{md,mdx}'], {
      cwd: guidesPath,
    })
  ).map(
    (path: string) =>
      path
        .replace(/.mdx?/, '') // remove extension
        .replace(/\/index$/, '') // remove index
  );

  // First part of the path will be the "product" (eg. 'applications', 'uplynk', etc.)
  // Some products will have a version in the path (eg. 'applications/v7') and will have the following structure:
  // /{PREFIX}/[guide] => guide for the non-versioned product
  // /{PREFIX}/[version] => homepage for the version product
  // /{PREFIX}/[version]/[guide] => guide for the versioned product

  // In dev mode, don't prerender any pages and fallback to SSR for
  // faster page loads
  // if (isEdgioRunDev()) {
  //   return {
  //     paths: [],
  //     fallback: 'blocking',
  //   };
  // }

  paths.push(...allGuides.sort());

  // Convert file paths to routes. The first part of the path will be the [product] and the rest will be the [slug]
  routes.push(
    ...[...new Set(paths)].map((path) => {
      const [product, ...slug] = path.split('/');
      return {
        params: {
          product,
          slug,
        },
      };
    })
  );

  if (isProductionBuild()) {
    logger.debug(
      `Generating the following paths: \n${JSON.stringify(paths, null, 2)}`
    );
  }

  return {
    paths: routes,
    fallback: 'blocking',
  };
};

export async function getStaticProps({
  params,
}: {
  params: {product: string; slug: string[]};
}) {
  let {product, slug} = params;
  let [version, ...guide] = (slug = slug || []);
  const versionRE = /^v(\d+)$/;
  const hasVersionInSlug = versionRE.test(version);
  let isHomepage = false;

  // Configurations for the matched product
  const initialContextType = getContextTypeByName(product);
  const productConfig = productsConfig[product];

  if (!productConfig) {
    logger.warn(`No product configuration found for '${product}'`);
    return {notFound: true};
  }

  // Define the default version configuration
  const {pathPrefix} = productConfig;
  let {guidesPath} = productConfig.versions.default!;

  // If a version is specified, use the version configuration
  if (hasVersionInSlug) {
    guidesPath = productConfig.versions[version].guidesPath;
  } else {
    // Reset the guide to the slug if no version is specified
    version = 'default';
    guide = slug;
  }

  // Redirect to the latest version if no version is specified and the product contains multiple versions matching the regex
  const versions = Object.keys(productConfig.versions).filter((v) =>
    v.match(versionRE)
  );

  if (!hasVersionInSlug && versions.length > 1) {
    const latestVersion = versions.sort().reverse()[0];
    logger.warn(
      `No version specified for '${product}'. Redirecting to latest version: '${pathPrefix}/${latestVersion}/${slug.join(
        '/'
      )}'`
    );
    return {
      redirect: {
        destination: `${pathPrefix}/${latestVersion}/${slug.join('/')}`,
        permanent: true,
      },
    };
  } else if (!guide || !guide.length || guide[guide.length - 1] === 'index') {
    // No guide determined in path so assume homepage
    isHomepage = true;
    guide = ['index'];
  }

  // Remaining guide path after version and product
  const slugAsString = guide.join('/');

  // Glob for matching the guide files
  const guideGlobs = Array.from(
    new Set(
      ['md', 'mdx'].flatMap((ext) => [
        join(guidesPath, version || '', `${slugAsString}.${ext}`),
        join(guidesPath, `${slugAsString}.${ext}`),
      ])
    )
  );

  // Find the first matching file
  const files = await globby(guideGlobs);
  const [file] = files;
  if (!file) {
    logger.warn(`No matching files for route '${slugAsString}'`);
    return {notFound: true};
  }

  logger.dev(
    `Using '${file}' for route '${slugAsString}'. Available files: ${files}`
  );

  const config = await getConfigByContext(
    getContextTypeByName(product),
    version
  );

  // Update template with versioned constants
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
      // _app.tsx props
      initialContextType,
      initialVersion: version,

      // component props
      source: mdxSource,
      sourceFile: file,
      headings,
      isHomepage,
    },
  };
}

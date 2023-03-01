import {readFile} from 'fs/promises';
import {join} from 'path';

import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../plugins/markdownToHtml';
import {MDXComponents} from '../components/MDX/MDXComponents';
import {getVersionedConfig} from '../utils/config';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList} from 'utils/Types';

export default function VersionedIndex({source}: {source: any}) {
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={source.frontmatter}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export const getStaticPaths = async () => {
  const routes = [];

  // determine available versions from config files
  const versions = (
    await globby('config/v*.config.js', {
      cwd: join(process.cwd(), 'src'),
    })
  ).map(async (file: string) => {
    const v = (file.match(/v(\d+)\.config\.js/) || [])[1];
    const config = await getVersionedConfig(v);

    return {
      version: v,
      config,
    };
  });

  const versionObjects = await Promise.all(versions);

  // create a list of paths for each version and guide
  // eg. /v6 => /[version]
  const versionedPaths = versionObjects.map(({version}) => {
    return {
      params: {
        version: `v${version}`,
      },
    };
  });
  routes.push(...versionedPaths);

  console.log('routes', routes);

  return {
    paths: routes,
    fallback: false,
  };
};

export async function getStaticProps({params}: {params: any}) {
  let version = params.version as string;
  version = version.replace('v', '');

  let content = await readFile(
    join(process.cwd(), 'src', 'pages', 'index.md'),
    'utf8'
  );

  // update template with versioned constants
  content = templateReplace(content, await getVersionedConfig(version));

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.toString().replace(/<!--([\s\S]*?)-->/g, '');

  // Any {{ VALUE }} that was not replaced in the above step
  // should be replaced with only 1 set of [] braces. Keeping them as
  // double braces will cause the MDX parser to throw an error.
  content = content.toString().replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return `[${p1}]`;
  });

  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins,
      format: 'mdx',
    },
  });

  return {props: {source: mdxSource}};
}

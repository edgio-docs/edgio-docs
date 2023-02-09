import {readFile} from 'fs/promises';
import {join} from 'path';

import {globby} from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import * as constants from '../../../../constants';
import {remarkPlugins} from '../../../../plugins/markdownToHtml';
import {MDXComponents} from '../../../components/MDX/MDXComponents';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';

const applicationsPath = 'src/pages/guides';

export const getStaticPaths = async () => {
  const routes = [
    {params: {version: 'v5', slug: ['getting_started']}},
    {params: {version: 'v6', slug: ['getting_started']}},
  ];
  return {
    paths: routes,
    fallback: false,
  };
};

export default function VersionedGuide({source}) {
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={{title: 'Foo'}}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export async function getStaticProps({params}) {
  const {version, slug} = params;
  const files = await globby(
    ['md', 'mdx'].map((ext) => `${applicationsPath}/${slug}.${ext}`)
  );
  console.log(
    'looking for',
    ['md', 'mdx'].map((ext) => `${applicationsPath}/${slug}.${ext}`),
    files
  );
  const file = files[0];
  let content = await readFile(join(process.cwd(), file), 'utf8');

  // replace all matches of {{\\s*(\\w+)\\s*}} with only 1 set of {} braces
  content = content.toString().replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return `{${p1}}`;
  });

  const mdxSource = await serialize(content, {
    scope: constants,
    mdxOptions: {remarkPlugins},
  });
  return {props: {source: mdxSource}};
}

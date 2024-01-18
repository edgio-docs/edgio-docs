import {join} from 'path';

import {isEdgioRunDev} from '@edgio/core/environment';
import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins} from '../../../plugins/markdownToHtml';
import rehypeExtractHeadings from '../../../plugins/rehype-extract-headings';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import uplynkConfig from '../../config/uplynk.config';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import logger from 'utils/logging';
import templateReplace from 'utils/templateReplace';
import {MDHeadingsList} from 'utils/Types';
import {UPLYNK_SRC_PATH} from 'config/appConfig';

const guidesPath = UPLYNK_SRC_PATH;
const urlStartPath = __dirname.split('/pages').reverse()[0];

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
    <Page>
      <MarkdownPage meta={{...source.frontmatter, version}} headings={headings}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export async function getStaticProps({params}: {params: any}) {
  const {slug}: {slug: string[]} = params;
  const indexRE = /index.mdx?$/;
  let guide = (slug && [...slug]) ?? [];

  const slugAsString = guide.join('/');

  const guideGlobs = ['md', 'mdx'].flatMap((ext) => [
    `${guidesPath}/${slugAsString}/index.${ext}`,
    `${guidesPath}/${slugAsString}.${ext}`,
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
    logger.warn(`No matching files for route '${slugAsString}'`);
    return {notFound: true};
  }

  logger.dev(
    `Using '${file}' for route '${slugAsString}'. Available files:`,
    files
  );

  // update template with versioned constants
  let content =
    templateReplace(join(process.cwd(), file), uplynkConfig) ??
    `Invalid template file: ${file}`;

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.replace(/<!--([\s\S]*?)-->/g, '');

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

  return {props: {source: mdxSource, headings, version: null}};
}

import {readFile} from 'fs/promises';
import {join} from 'path';

import {globby} from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {
  remarkPlugins,
  markdownToHtml,
} from '../../../../plugins/markdownToHtml';
import {
  MDXComponents as Components,
  MDXComponents,
} from '../../../components/MDX/MDXComponents';
import {basePaths, versionedPaths} from '../../../data/navigation';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';
import templateReplace from 'utils/templateReplace';

const applicationsPath = 'src/pages/guides';

export default function VersionedGuide({source}: {source: any}) {
  return (
    <Page routeTree={JSONRoutes}>
      <MarkdownPage meta={source.frontmatter}>
        <MDXRemote {...source} components={MDXComponents} />
      </MarkdownPage>
    </Page>
  );
}

export const getStaticPaths = async () => {
  // determine available versions from config files
  const versions = (
    await globby('config/v*.config.js', {
      cwd: join(process.cwd(), 'src'),
    })
  )
    // extract the version from the filename
    .map((file: string) => (file.match(/v(\d+)\.config\.js/) || [])[1]);

  // determine available guides from filesystem
  const guides = await globby('pages/guides', {
    cwd: join(process.cwd(), 'src'),
    expandDirectories: {
      extensions: ['md', 'mdx'],
    },
  });

  const guidesWithVersion = guides.filter((path: string) =>
    path.match(/\/v\d+\/.+/)
  );
  const guidesWithoutVersion = guides.filter(
    (path: string) => !path.match(/\/v\d+\/.+/)
  );

  // create a list of routes for each version and guide
  const routes = versions
    .flatMap((version: string) =>
      guidesWithoutVersion.map((guide: string) => {
        const versionedGuide = guide.replace('guides/', `guides/v${version}/`);

        // If the guide already has a version in the file structure, skip the SSG
        // version of it. Otherwise, this will attempt to create 2 routes for the
        // same guide.
        if (guidesWithVersion.includes(versionedGuide)) {
          return;
        }

        return {
          params: {
            version: `v${version}`,
            slug: guide
              .replace('pages/guides/', '')
              .replace('.md', '')
              .replace('.mdx', '')
              .split('/'),
          },
        };
      })
    )
    .filter(Boolean);

  return {
    paths: routes,
    fallback: false,
  };
};

export async function getStaticProps({params}: {params: any}) {
  const {version, slug}: {version: string; slug: string[]} = params;
  const slugAsString = slug.join('/');
  const files = await globby(
    ['md', 'mdx'].map((ext) => `${applicationsPath}/${slugAsString}.${ext}`)
  );

  if (!files.length) {
    console.log('no files', `${applicationsPath}/${slug}.mdx?`);
  }

  const file = files[0];
  let content = await readFile(join(process.cwd(), file), 'utf8');

  // get config for this version
  const config = await import(`../../../config`);

  // update template with versioned constants
  content = templateReplace(content, config.getVersionedConfig(version));

  // remove any html comments (<!-- -->) as these will not parse correctly
  content = content.toString().replace(/<!--([\s\S]*?)-->/g, '');

  // Any {{ VALUE }} that was not replaced in the above step
  // should be replaced with only 1 set of {} braces
  content = content.toString().replace(/{{\s*(\w+)\s*}}/g, (match, p1) => {
    return `{${p1}}`;
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

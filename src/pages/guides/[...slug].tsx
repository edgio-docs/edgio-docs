import {readFile} from 'fs/promises';
import {join} from 'path';

import globby from 'globby';
import {MDXRemote} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';

import {remarkPlugins, markdownToHtml} from '../../../plugins/markdownToHtml';
import {MDXComponents} from '../../components/MDX/MDXComponents';
import {getVersionedConfig} from '../../config';
import {basePaths, versionedPaths} from '../../data/navigation';

import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import JSONRoutes from 'utils/jsonRoutes';
import templateReplace from 'utils/templateReplace';

const guidesPath = 'src/guides';

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
  const routes = [];

  // determine available versions from config files
  const versions = (
    await globby('config/v*.config.js', {
      cwd: join(process.cwd(), 'src'),
    })
  )
    // extract the version from the filename
    .map((file: string) => (file.match(/v(\d+)\.config\.js/) || [])[1]);

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
  routes.push(
    ...guidesFromFilePath.map((path) => ({params: {slug: path.split('/')}}))
  );

  // create a list of paths for each version and guide
  // eg. /guides/v6/overview => /guides/[...slug]
  const versionedPaths = versions
    .flatMap((version: string) =>
      guidesFromFilePath.map((guide: string) => {
        const versionedGuide = `v${version}/${guide}`;

        // If the guide already has a version in the file structure, skip the SSG
        // version of it. Otherwise, this will attempt to create 2 routes for the
        // same guide.
        if (guidesFromFilePath.includes(versionedGuide)) {
          console.log(
            `Skipping SSG route for '${versionedGuide}' as it already exists`
          );
          return;
        }

        // TODO need to verify this guide is part of the versioned navigation menu.
        // We don't want to generate a route for a guide that is not part of the
        // navigation menu for that version.

        return {
          params: {
            slug: versionedGuide.split('/'),
          },
        };
      })
    )
    .filter(Boolean);
  routes.push(...versionedPaths);

  return {
    paths: routes,
    fallback: false,
  };
};

export async function getStaticProps({params}: {params: any}) {
  const {slug}: {slug: string[]} = params;
  const latestVersion = process.env.LATEST_VERSION || '6'; // defined in next.config.js
  const versionRE = /^v(\d+)$/;

  // Determine the version from the first element of the slug.
  let [, version] = slug[0].match(versionRE) || [];
  if (version) {
    console.log(`Using version ${version} for route '${slug.join('/')}'`);
    slug.shift();
  } else {
    console.log(
      `No version specified; using latest version ${latestVersion} for route '${slug.join(
        '/'
      )}'`
    );
    version = latestVersion;
  }

  const slugAsString = slug.join('/');
  const files = (
    await globby(
      ['md', 'mdx'].flatMap((ext) => [
        `${guidesPath}/v${version}/${slugAsString}.${ext}`,
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
  content = templateReplace(content, await getVersionedConfig(version));

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

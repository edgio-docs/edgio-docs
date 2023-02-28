// @ts-nocheck
import {MDXProvider} from '@mdx-js/react';
import {useRouter} from 'next/router';
import * as React from 'react';

import {MDXComponents} from '../../components/MDX/MDXComponents';
import {siteConfig} from '../../config/appConfig';
import Docs from '../Docs';
import DocsFooter from '../Docs/DocsFooter';
import Seo from '../Seo';

import {MDHeading, MDHeadingsList} from 'utils/Types';

export function MarkdownPage<
  T extends {title: string; status?: string} = {
    title: string;
    status?: string;
  }
>({children, meta, headings}: MarkdownProps<T>) {
  const {route} = useRouter();

  // const {route, nextRoute, prevRoute} = useRouteMeta();
  const title = meta.title || route || '';
  // const description = meta.description || route?.description || '';

  if (!route) {
    console.error('This page was not added to one of the sidebar JSON files.');
  }

  const isHomePage = route === '/';

  const tocHeadings = headings.map((heading: MDHeading) => ({
    url: `#${heading.id}`,
    depth: heading.rank,
    text: heading.title,
  }));

  if (tocHeadings.length > 0) {
    tocHeadings.unshift({
      depth: 1,
      text: 'Overview',
      url: '',
    });
  }

  return (
    <MDXProvider components={MDXComponents}>
      <Seo {...{isHomePage, title, description: siteConfig.tagline}} />
      {isHomePage ? (
        children
      ) : (
        <Docs title={title} tocHeadings={tocHeadings}>
          {children}
        </Docs>
      )}
      <DocsFooter />
    </MDXProvider>
  );
}

export interface MarkdownProps<Frontmatter> {
  meta: Frontmatter & {description?: string};
  children?: React.ReactNode;
  headings?: MDHeadingsList;
}

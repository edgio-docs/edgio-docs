import {MDXProvider} from '@mdx-js/react';
import {useRouter} from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import {MDXComponents} from '../../components/MDX/MDXComponents';
import {siteConfig} from '../../config/appConfig';
import Docs from '../Docs';
import DocsFooter from '../Docs/DocsFooter';
import Seo from '../Seo';

import useConditioning from 'utils/hooks/useConditioning';
import {MDHeading, MDHeadingsList} from 'utils/Types';

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export function MarkdownPage<
  T extends {
    title: string;
    status?: string;
    version?: string;
    sourceFile?: string;
  } = {
    title: string;
    status?: string;
    version?: string;
    sourceFile?: string;
  }
>({children, meta, headings}: MarkdownProps<T>) {
  const {route, query} = useRouter();
  const {slug} = query;
  const {
    version: {latestVersion},
  } = useConditioning();
  const title = meta.title || route || '';
  const description = meta.description || siteConfig.tagline;
  const version = meta.version || latestVersion;

  if (!route) {
    console.error('This page was not added to one of the sidebar JSON files.');
  }

  const isHomePage =
    route === '/' ||
    !!(slug && slug.length === 1 && slug[0].match(/^v\d+$/) !== null);

  const tocHeadings = [];

  if (headings) {
    tocHeadings.push(
      ...headings.map((heading: MDHeading) => ({
        url: `#${heading.id}`,
        depth: heading.rank,
        text: heading.title,
      }))
    );
  }

  if (tocHeadings.length > 0) {
    tocHeadings.unshift({
      depth: 1,
      text: 'Overview',
      url: '#',
    });
  }

  return (
    <PageLayout>
      {' '}
      {/* Use the flex container */}
      <MDXProvider components={MDXComponents}>
        <Seo {...{isHomePage, title, description, version}} />
        {isHomePage ? (
          children
        ) : (
          <Docs
            title={title}
            tocHeadings={tocHeadings}
            source={meta.sourceFile}>
            {children}
          </Docs>
        )}
      </MDXProvider>
      <DocsFooter />
    </PageLayout>
  );
}

export interface MarkdownProps<Frontmatter> {
  meta: Frontmatter & {description?: string};
  children?: React.ReactNode;
  headings?: MDHeadingsList;
}

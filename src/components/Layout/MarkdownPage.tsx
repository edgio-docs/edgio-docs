import * as React from 'react';

import {MDXProvider} from '@mdx-js/react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import useConditioning from 'utils/hooks/useConditioning';
import {MDHeading, MDHeadingsList} from 'utils/Types';

import {siteConfig} from '../../config/appConfig';
import Docs from '../Docs';
import DocsFooter from '../Docs/DocsFooter';
import {MDXComponents} from '../MDX/MDXComponents';
import Seo from '../Seo';

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
>({children, meta, headings, isHomepage}: MarkdownProps<T>) {
  const {route, query} = useRouter();
  const {slug} = query;
  const {
    version: {latestVersion},
  } = useConditioning();
  const title = meta.title || route || '';
  const description = meta.description || siteConfig.tagline;
  const version = meta.version || latestVersion;

  if (!route) {
    console.error(
      'This page was not added to the corresponding *.nav.js file.'
    );
  }

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
      <MDXProvider components={MDXComponents}>
        <Seo {...{isHomepage, title, description, version}} />
        {isHomepage ? (
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
  isHomepage?: boolean;
}

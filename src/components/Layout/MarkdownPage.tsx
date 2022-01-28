import { MDXProvider } from '@mdx-js/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { MDXComponents } from '../MDX/MDXComponents';
import Docs from '../Docs';

export interface MarkdownProps<Frontmatter> {
  meta: Frontmatter & { description?: string };
  children?: React.ReactNode;
}

export function MarkdownPage<
  T extends { title: string; status?: string } = {
    title: string;
    status?: string;
  }
>({ children, meta }: MarkdownProps<T>) {
  const { route } = useRouter();

  // const {route, nextRoute, prevRoute} = useRouteMeta();
  const title = meta.title || route || '';
  // const description = meta.description || route?.description || '';

  if (!route) {
    console.error('This page was not added to one of the sidebar JSON files.');
  }

  const isHomePage = route === '/';

  return (
    <MDXProvider components={MDXComponents}>
      {isHomePage ? (
        children
      ) : (
        <div className="docs">
          <Docs title={title}>{children}</Docs>
        </div>
      )}
    </MDXProvider>
  );
}

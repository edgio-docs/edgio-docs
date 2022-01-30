import * as React from 'react';
import { MarkdownPage, MarkdownProps } from './MarkdownPage';
import { Page } from './Page';

interface PageFrontmatter {
  title: string;
  status: string;
}

export default function withDocs(p: PageFrontmatter) {
  function LayoutDocs(props: MarkdownProps<PageFrontmatter>) {
    return <MarkdownPage {...props} meta={p} />;
  }
  LayoutDocs.appShell = AppShell;
  return LayoutDocs;
}

function AppShell(props: { children: React.ReactNode }) {
  return <Page {...props} />;
}

import * as React from 'react';
import { MarkdownPage, MarkdownProps } from './MarkdownPage';
import { Page } from './Page';

interface PageFrontmatter {
  title: string;
  status: string;
}

export default function withDocs(p: PageFrontmatter) {
  function LayoutHome(props: MarkdownProps<PageFrontmatter>) {
    return <MarkdownPage {...props} meta={p} />;
  }
  LayoutHome.appShell = AppShell;
  return LayoutHome;
}

function AppShell(props: { children: React.ReactNode }) {
  return <Page {...props} />;
}

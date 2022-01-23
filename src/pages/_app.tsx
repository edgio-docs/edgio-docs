/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {AppProps} from 'next/app';
import '@docsearch/css';
import '../styles/fonts.css';
import '../styles/algolia.css';
import '../styles/index.css';
import '../styles/sandpack.css';
import '@codesandbox/sandpack-react/dist/index.css';
import '../styles/nprogress.css';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import GlobalStyle from '../styles/GlobalStyle';


// -> Used for the loader when switching between pages
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const EmptyAppShell: React.FC = ({children}) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell;
  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }

  return (
    <AppShell>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppShell>
  );
}

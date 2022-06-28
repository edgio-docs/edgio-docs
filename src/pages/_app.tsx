import '@docsearch/css';
import {Metrics} from '@layer0/rum';
import {MDXEmbedProvider} from 'mdx-embed';
import type {AppProps} from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';
import {ThemeProvider} from 'styled-components';

import '../styles/reset.css';
import '../styles/custom-props.css';
import '../styles/nprogress.css';
import '../styles/scrollbar.css';
import '../styles/prism.css';
import '../styles/algolia.css';

// import {VersionProvider} from 'components/versioning';

new Metrics({token: 'cdc8d6df-476b-4e2d-ae1a-f8c6893a39a8'}).collect();

// -> Used for the loader when switching between pages
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Breakpoints for media queries
const theme = {
  breakpoints: {
    small: '400px',
  },
};

const EmptyAppShell: React.FC = ({children}) => <>{children}</>;

export default function MyApp({Component, pageProps}: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell;

  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }

  return (
    <AppShell>
      {/* <VersionProvider> */}
      <ThemeProvider theme={theme}>
        <MDXEmbedProvider>
          <Component {...pageProps} />
        </MDXEmbedProvider>
      </ThemeProvider>
      {/* </VersionProvider> */}
    </AppShell>
  );
}

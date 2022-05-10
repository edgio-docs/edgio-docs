import '@docsearch/css';
import type {AppProps} from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';
import {ThemeProvider} from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';

// import {VersionProvider} from 'components/versioning';

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
      <GlobalStyles />
      {/* <VersionProvider> */}
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      {/* </VersionProvider> */}
    </AppShell>
  );
}

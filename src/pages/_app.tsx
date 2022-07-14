import '@docsearch/css';
import {Metrics} from '@layer0/rum';
// @ts-ignore
import galite from 'ga-lite';
import {MDXEmbedProvider} from 'mdx-embed';
import type {AppProps} from 'next/app';
import Router from 'next/router';
import {useRouter} from 'next/router';
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

if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    galite('create', process.env.NEXT_PUBLIC_GA_TRACKING_ID, 'auto');
  }
  const terminationEvent = 'onpagehide' in window ? 'pagehide' : 'unload';
  window.addEventListener(terminationEvent, function () {
    galite('send', 'timing', 'JS Dependencies', 'unload');
  });
}

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
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      galite('set', 'page', url);
      galite('send', 'pageview');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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

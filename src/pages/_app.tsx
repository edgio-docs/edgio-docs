import '@docsearch/css';
import {Metrics} from '@layer0/rum';
import {MDXEmbedProvider} from 'mdx-embed';
import type {AppProps} from 'next/app';
import Router from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import * as React from 'react';

import '../styles/algolia.css';
import '../styles/custom-props.css';
import '../styles/nprogress.css';
import '../styles/prism.css';
import '../styles/reset.css';
import '../styles/scrollbar.css';

const EmptyAppShell: React.FC = ({children}) => <>{children}</>;

// CWV for Layer0
new Metrics({token: 'cdc8d6df-476b-4e2d-ae1a-f8c6893a39a8'}).collect();

// -> Used for the loader when switching between pages
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function GAnalytics() {
  return (
    <div>
      <Script
        src={`https://googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        strategy="afterInteractive"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
        `}
      </Script>
    </div>
  );
}

export default function MyApp({Component, pageProps}: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell;

  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }

  return (
    <AppShell>
      <GAnalytics />
      <MDXEmbedProvider>
        <Component {...pageProps} />
      </MDXEmbedProvider>
    </AppShell>
  );
}

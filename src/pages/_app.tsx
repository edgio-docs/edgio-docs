import '@docsearch/css';
import {Metrics} from '@edgio/rum';
import {MDXEmbedProvider} from 'mdx-embed';
import {DefaultSeo} from 'next-seo';
import type {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import * as React from 'react';

import LoadingFallBackPage from 'components/Fallbacks/Loading';
import {VersionProvider} from 'components/versioning';
import {siteConfig} from 'siteConfig';

// Universal loading page (used in dynamically imported components) which contains the wrapper of each page

import '../styles/code.css';
import '../styles/algolia.css';
import '../styles/custom-props.css';
import '../styles/nprogress.css';
import '../styles/prism.css';
import '../styles/reset.css';
import '../styles/scrollbar.css';

const EmptyAppShell: React.FC = ({children}) => <>{children}</>;

// CWV for Edgio
new Metrics({token: 'cdc8d6df-476b-4e2d-ae1a-f8c6893a39a8'}).collect();

// List of fallback components
const ChangeLogFallBackPage = dynamic(
  () => import('../components/Fallbacks/Changelog'),
  {
    loading: () => <LoadingFallBackPage />,
  }
);

// Create a fallback dict
// Match a route being navigated to
// and place the fallback/loading versions of those pages
const fallbackMap: {[route: string]: React.ReactNode} = {
  '/applications/changelog': <ChangeLogFallBackPage />,
};

function GAnalytics() {
  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${siteConfig.analytics.gtmId}');
        `}
      </Script>
    </>
  );
}

export default function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [changingTo, setChangingTo] = React.useState('');
  React.useEffect(() => {
    // All of this should execute if JS is available after (if) mounted
    const handleRouteChange = (url: string, {shallow}: {shallow: any}) => {
      // Start the spinner
      NProgress.start();
      // Set loading to true
      setLoading(true);
      // Set the url changing to fallback
      setChangingTo(url);
    };
    const handleRouteComplete = (url: string, {shallow}: {shallow: any}) => {
      // End the spinner
      NProgress.done();
      // Set the url to empty so that always <Component {...pageProps} /> is rendered
      setChangingTo('');
      // Set loading to false
      setLoading(false);
    };
    // -> Used for the loader when switching between pages
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', () => handleRouteComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', () => handleRouteComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let AppShell = (Component as any).appShell || EmptyAppShell;

  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }

  const canonicalUrl = (
    `https://docs.edg.io` + (router.asPath === '/' ? '' : router.asPath)
  ).split('?')[0];

  return loading && fallbackMap.hasOwnProperty(changingTo) ? (
    fallbackMap[changingTo]
  ) : (
    <VersionProvider>
      <AppShell>
        <GAnalytics />
        <DefaultSeo canonical={canonicalUrl} />
        <MDXEmbedProvider>
          <Component {...pageProps} />
        </MDXEmbedProvider>
      </AppShell>
    </VersionProvider>
  );
}

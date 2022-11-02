import '@docsearch/css';
import {Metrics} from '@edgio/rum';
import {MDXEmbedProvider} from 'mdx-embed';
import type {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import * as React from 'react';

// Universal loading page (used in dynamically imported components) which contains the wrapper of each page
import {siteConfig as config} from '../siteConfig';

import LoadingFallBackPage from 'components/Fallbacks/Loading';

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
  '/guides/changelog': <ChangeLogFallBackPage />,
};

function GAnalytics() {
  return (
    <>
      <Script
        src={`https://googletagmanager.com/gtag/js?id=${config.analytics.id}`}
        strategy="afterInteractive"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${config.analytics.id}');
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
      router.events.on('routeChangeError', () => handleRouteComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let AppShell = (Component as any).appShell || EmptyAppShell;

  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent) {
    AppShell = (Component as any)({}).props.originalType.appShell;
  }

  return loading && fallbackMap.hasOwnProperty(changingTo) ? (
    fallbackMap[changingTo]
  ) : (
    <AppShell>
      <GAnalytics />
      <MDXEmbedProvider>
        <Component {...pageProps} />
      </MDXEmbedProvider>
    </AppShell>
  );
}

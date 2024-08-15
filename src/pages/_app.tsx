import * as React from 'react';

import '@docsearch/css';
import {install} from '@edgio/prefetch/window';
import {prefetch} from '@edgio/prefetch/window/prefetch';
import {Metrics} from '@edgio/rum';
import {MDXEmbedProvider} from 'mdx-embed';
import type {AppProps} from 'next/app';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import Script from 'next/script';
import {DefaultSeo} from 'next-seo';
import NProgress from 'nprogress';

// Universal loading page (used in dynamically imported components) which contains the wrapper of each page
import EdgioAnswers, {EdgioAnswersWidget} from 'components/EdgioAnswers';
import LoadingFallBackPage from 'components/Fallbacks/Loading';
import Toast from 'components/Toast';
import {siteConfig} from 'config/appConfig';
import {AppProvider, AppProviderProps} from 'contexts/AppContext';
import {EdgioAnswersProvider} from 'contexts/EdgioAnswersContext';
import {ThemeProvider} from 'contexts/ThemeContext';
import '../styles/algolia.css';
import '../styles/code.css';
import '../styles/custom-props.css';
import '../styles/fonts.css';
import '../styles/nprogress.css';
import '../styles/prism.css';
import '../styles/reset.css';
import '../styles/scrollbar.css';

const EmptyAppShell: React.FC<{children: React.ReactNode}> = ({children}) => (
  <>{children}</>
);

interface DocsAppProps extends AppProps {
  pageProps: AppProviderProps & {};
}

// CWV for Edgio
new Metrics({token: 'a5c2ebb3-dd43-4c36-b082-fb499a7bcd8d'}).collect();

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

export default function MyApp({Component, pageProps}: DocsAppProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [changingTo, setChangingTo] = React.useState('');

  React.useEffect(() => {
    // Install service worker
    if ('serviceWorker' in navigator) {
      install({
        watch: [
          {
            selector: 'a[href^="/applications"]',
            callback: (el) => {
              const href = el.getAttribute('href') as string;
              prefetch(href);
            },
          },
        ],
      });
    }
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

  const isHome = router.asPath === '/';

  return loading && fallbackMap.hasOwnProperty(changingTo) ? (
    fallbackMap[changingTo]
  ) : (
    <AppShell>
      <AppProvider {...pageProps}>
        <GAnalytics />
        <DefaultSeo canonical={canonicalUrl} />
        <EdgioAnswersProvider>
          <ThemeProvider>
            <MDXEmbedProvider>
              <Component {...pageProps} />

              <Toast />
            </MDXEmbedProvider>
            <EdgioAnswers />
            {!isHome && <EdgioAnswersWidget />}
          </ThemeProvider>
        </EdgioAnswersProvider>
      </AppProvider>
    </AppShell>
  );
}

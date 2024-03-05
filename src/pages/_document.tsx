import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Initial theme reading and setting to prevent flash of light theme on page load
                (function() {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    document.documentElement.classList.remove('light', 'dark'); // Remove both classes
                    document.documentElement.classList.add(newTheme); // Add the new theme class
                  }

                  function getPreferredTheme() {
                    try {
                      const preferredTheme = localStorage.getItem('theme');
                      return preferredTheme ? preferredTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    } catch (err) {
                      // Fallback if localStorage is not accessible
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                  }

                  const initialTheme = getPreferredTheme();
                  setTheme(initialTheme);
                })();


                // Clarity tracking code
                (function(c, l, a, r, i, t, y) {
                  c[a] = c[a] || function() {
                    (c[a].q = c[a].q || []).push(arguments)
                  };
                  t = l.createElement(r);
                  t.async = 1;
                  t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
                  y = l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t, y);
                })(window, document, "clarity", "script", "d9958syk46");  
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

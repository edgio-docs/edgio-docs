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
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;1,500&family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="line-numbers">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
	                function setTheme(newTheme) {
	                	window.__theme = newTheme;
	                	if (newTheme === 'dark') {
	                		document.documentElement.classList.remove('light');
	                		document.documentElement.classList.add('dark');
	                	} else {
	                		document.documentElement.classList.remove('dark');
	                		document.documentElement.classList.add('light');
	                	}
	                }

	                var preferredTheme;
	                try {
	                	preferredTheme = localStorage.getItem('theme');
	                } catch (err) { }

	                // This function is attached to the window object so you can use it from anywhere
	                // in the application.
	                window.__setPreferredTheme = function (newTheme) {
	                	preferredTheme = newTheme;
	                	setTheme(newTheme);
	                	try {
	                		localStorage.setItem('theme', newTheme);
	                	} catch (err) { }
	                };


	                var initialTheme = preferredTheme;

	                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

	                if (!initialTheme) {
	                	initialTheme = darkQuery.matches ? "dark" : "light";
	                }
	                setTheme(initialTheme);

	                darkQuery.addEventListener('change', function (e) {
	                	setTheme(e.matches ? "dark" : "light");
	                	window.__setPreferredTheme(e.matches ? "dark" : "light");
	                });
                })();
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

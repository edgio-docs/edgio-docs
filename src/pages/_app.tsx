import '@docsearch/css';
import {AppProps} from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import * as React from 'react';
import '../styles/algolia.css';
import GlobalStyle from '../styles/GlobalStyle';
import '../styles/nprogress.css';
import {ThemeProvider} from 'styled-components';
//
import '../styles/code-syntax/a11y-dark.css';
import '../styles/code-syntax/a11y-light.css';
import '../styles/code-syntax/agate.css';
import '../styles/code-syntax/an-old-hope.css';
import '../styles/code-syntax/androidstudio.css';
// import "../styles/code-syntax/arduino-light.css";
// import "../styles/code-syntax/arta.css";
// import "../styles/code-syntax/ascetic.css";
// import "../styles/code-syntax/atelier-cave-dark.css";
// import "../styles/code-syntax/atelier-cave-light.css";
// import "../styles/code-syntax/atelier-dune-dark.css";
// import "../styles/code-syntax/atelier-dune-light.css";
// import "../styles/code-syntax/atelier-estuary-dark.css";
// import "../styles/code-syntax/atelier-estuary-light.css";
// import "../styles/code-syntax/atelier-forest-dark.css";
// import "../styles/code-syntax/atelier-forest-light.css";
// import "../styles/code-syntax/atelier-heath-dark.css";
// import "../styles/code-syntax/atelier-heath-light.css";
// import "../styles/code-syntax/atelier-lakeside-dark.css";
// import "../styles/code-syntax/atelier-lakeside-light.css";
// import "../styles/code-syntax/atelier-plateau-dark.css";
// import "../styles/code-syntax/atelier-plateau-light.css";
// import "../styles/code-syntax/atelier-savanna-dark.css";
// import "../styles/code-syntax/atelier-savanna-light.css";
// import "../styles/code-syntax/atelier-seaside-dark.css";
// import "../styles/code-syntax/atelier-seaside-light.css";
// import "../styles/code-syntax/atelier-sulphurpool-dark.css";
// import "../styles/code-syntax/atelier-sulphurpool-light.css";
// import "../styles/code-syntax/atom-one-dark-reasonable.css";
// import "../styles/code-syntax/atom-one-dark.css";
// import "../styles/code-syntax/atom-one-light.css";
// import "../styles/code-syntax/brown-paper.css";
import '../styles/code-syntax/codepen-embed.css';
// import "../styles/code-syntax/color-brewer.css";
// import "../styles/code-syntax/darcula.css";
// import "../styles/code-syntax/dark.css";
// import "../styles/code-syntax/default.css";
// import "../styles/code-syntax/docco.css";
// import "../styles/code-syntax/dracula.css";
// import "../styles/code-syntax/far.css";
// import "../styles/code-syntax/foundation.css";
// import "../styles/code-syntax/github-gist.css";
// import "../styles/code-syntax/github.css";
// import "../styles/code-syntax/gml.css";
// import "../styles/code-syntax/googlecode.css";
// import "../styles/code-syntax/gradient-dark.css";
// import "../styles/code-syntax/gradient-light.css";
// import "../styles/code-syntax/grayscale.css";
// import "../styles/code-syntax/gruvbox-dark.css";
// import "../styles/code-syntax/gruvbox-light.css";
// import "../styles/code-syntax/hopscotch.css";
// import "../styles/code-syntax/hybrid.css";
// import "../styles/code-syntax/idea.css";
// import "../styles/code-syntax/ir-black.css";
// import "../styles/code-syntax/isbl-editor-dark.css";
// import "../styles/code-syntax/isbl-editor-light.css";
// import "../styles/code-syntax/kimbie.dark.css";
// import "../styles/code-syntax/kimbie.light.css";
// import "../styles/code-syntax/lightfair.css";
// import "../styles/code-syntax/lioshi.css";
// import "../styles/code-syntax/magula.css";
// import "../styles/code-syntax/mono-blue.css";
// import "../styles/code-syntax/monokai-sublime.css";
// import "../styles/code-syntax/monokai.css";
// import "../styles/code-syntax/night-owl.css";
// import "../styles/code-syntax/nnfx-dark.css";
// import "../styles/code-syntax/nnfx.css";
// import "../styles/code-syntax/nord.css";
// import "../styles/code-syntax/obsidian.css";
// import "../styles/code-syntax/ocean.css";
// import "../styles/code-syntax/paraiso-dark.css";
// import "../styles/code-syntax/paraiso-light.css";
// import "../styles/code-syntax/pojoaque.css";
// import "../styles/code-syntax/purebasic.css";
// import "../styles/code-syntax/qtcreator_dark.css";
// import "../styles/code-syntax/qtcreator_light.css";
// import "../styles/code-syntax/railscasts.css";
// import "../styles/code-syntax/rainbow.css";
// import "../styles/code-syntax/routeros.css";
// import "../styles/code-syntax/school-book.css";
// import "../styles/code-syntax/shades-of-purple.css";
// import "../styles/code-syntax/solarized-dark.css";
// import "../styles/code-syntax/solarized-light.css";
// import "../styles/code-syntax/srcery.css";
// import "../styles/code-syntax/stackoverflow-dark.css";
// import "../styles/code-syntax/stackoverflow-light.css";
// import "../styles/code-syntax/sunburst.css";
// import "../styles/code-syntax/tomorrow-night-blue.css";
// import "../styles/code-syntax/tomorrow-night-bright.css";
// import "../styles/code-syntax/tomorrow-night-eighties.css";
// import "../styles/code-syntax/tomorrow-night.css";
// import "../styles/code-syntax/tomorrow.css";
// import "../styles/code-syntax/vs.css";
// import "../styles/code-syntax/vs2015.css";
// import "../styles/code-syntax/xcode.css";
// import "../styles/code-syntax/xt256.css";
// import "../styles/code-syntax/zenburn.css";

//

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
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppShell>
  );
}

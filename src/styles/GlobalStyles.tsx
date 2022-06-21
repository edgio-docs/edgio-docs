import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  /* New */
  --colors-black0: #000000;
  --colors-black1: #353535;
  --colors-gray0: #1A1A1A;
  --colors-gray1: #EEEEEE;;
  --colors-green0: #01B18D;
  --colors-pink0: #E95495;
  --colors-purple0: #812991;
  --colors-white0: #FFFFFF;
  --colors-pink0: #E95495;
  --colors-blue0: #00A2E2;
  --linear-gradient-green-to-blue:  linear-gradient(89.92deg, #00BDA6 0%, #00A2E2 132.46%);

  // named
  --homepagehero-color: #353535;
  --homepagehero-bg-image: url('/images/home/LightHeroImg.svg'),  linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FAFDFF 97.42%);
  --sidebar-bg-color: #ffffff;
  --sidebar-href-color: #353535;
  --header-bg-color: #ffffff;
  --table-hdr-bg-color: var(--colors-green0);
  --table-striped-row-bg-color: var(--colors-gray1);
  /* End new */

  /* Colors */
  // #region
  --white: #fff;
  --black1: #1a1a1a;
  --pink: #E95495;
  --grey1: #e3e8ee;
  --grey2: #e5e5e5;
  --grey3: #f6f6f7;

  --docs-content-bg: #fff;
  --get-started-card-bg: #ffffff;
  --get-started-card-sub-bg: #707070;
  --link-grey1: #606060;
  --hr-grey1: #e3e8ee;
  --grey4: #EEEEEE;
  --docs-color: #353535;
  --text-code-bg: #f6f6f7;
  --inline-code-bg: #f6f6f7;

  /* Sizes */
  --scrollbar-size: 8px;
  --sidebar-width: 280px;
  --container-max-width: 1228px;
  --container-padding: 0 20px;

  --docs-footer-bg: #F6F6F6;;
  --docs-footer-color: #000000;

  --docs-area-width: 1228px;
  --dark-theme-switcher-display: flex;
  --light-theme-switcher-display: none;
  --homepage-hero-gradient-bg: linear-gradient(180.17deg, rgba(255, 255, 255, 0) 0.15%, rgba(121, 114, 252, 0.1) 99.84%, #FAFDFF 99.85%);

  --small-breakpoint: 400px;

  /* Colors */
  --sidenav-link-color: #606060;
  --sidenav-hr-color: #d8d8d8;
  --homepage-hero-title-color: #1a1a1a;
  --homepage-hero-subtitle-color: #707070;
  --homepage-section-header-bgColor: #EEEEEE;
  --homepage-section-title-color: #1a1a1a;
  --homepage-section-subtitle-color: #707070;
  --homepage-link-color: #606060;
  --header-bgColor: #ffffff;
  --scrollbar-bg: #C4C4C4;
  // #endregion
}

:root.dark {
  /* New */
  /* named */
  --homepagehero-bg-image: url('/images/home/DarkHeroImg.svg'), #000000;
  --homepagehero-color: #ffffff;
  --sidebar-bg-color: #353535;
  --sidebar-href-color: #ffffff;
  --header-bg-color: #353535;
  --table-hdr-bg-color: #606060;
  --table-striped-row-bg-color: #303030; 

  /* End new */
}


:root.dark {
  --black1: #fff;
  --grey1: rgba(0, 0, 0, 0.15);
  --grey2: #4e4e4e;
  --grey3: #353535;

  --scrollbar-bg: #353535;
    --docs-content-bg: #1a1a1a;
    --get-started-card-bg: #000000;
    --get-started-card-sub-bg: #fff;
    --link-grey1: #fff;
    --hr-grey1: #2a2b2c;
    --docs-color: #fff;
    --text-code-bg: #2a2b2c;
    --inline-code-bg: transparent;

    --docs-footer-bg: #000000;
    --docs-footer-color: #ffffff;

  --dark-theme-switcher-display: none;
  --light-theme-switcher-display: flex;

  --homepage-hero-gradient-bg: linear-gradient(
      180.17deg,
      rgba(255, 255, 255, 0) 0.15%,
      rgba(121, 114, 252, 0.1) 99.84%
    );

    /* Colors */
  --sidenav-link-color: #ffffff;
  --homepage-hero-title-color: #ffffff;
  --homepage-hero-subtitle-color: #ffffff;
  --homepage-section-title-color: #fff;
  --homepage-section-subtitle-color: #fff;
  --homepage-link-color: #fff;
  --header-bgColor: #353535;
}


html, body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Helvetica Neue', 'Ubuntu';
  background-color: var(--docs-content-bg);
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html, body {
  height: 100%;
}

body {
  line-height: 1.5;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

#dark-theme-switcher {
  display: var(--dark-theme-switcher-display) !important;
}

#light-theme-switcher {
  display: var(--light-theme-switcher-display) !important;
}

.transform-rotate-180 {
  transform: rotate(180deg);
}
`;

const NProgress = createGlobalStyle`
	#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: var(--colors-green0);
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}

/* Fancy blur effect */

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px var(--colors-blue0), 0 0 5px var(--colors-blue0);
  opacity: 1;
  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */

#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: solid 2px transparent;
  border-top-color: var(--colors-green0);
  border-left-color: var(--colors-green0);
  border-radius: 50%;
  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}


@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

`;

const Scrollbar = createGlobalStyle`
.custom-scrollbar::-webkit-scrollbar-thumb,
.custom-scrollbar::-webkit-scrollbar-track,
.custom-scrollbar::-webkit-scrollbar-corner {
  background: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: var(--scrollbar-size);
  height: var(--scrollbar-size);
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: var(--scrollbar-bg);
  border: 2px solid transparent;
  border-radius: 10px;
  background-clip: content-box;
}
`;

const CodeSyntaxHighlight = createGlobalStyle`
code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1rem;
	font-weight: 500;
  text-align: left;
  white-space: pre-wrap;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
  overflow: auto;
  /* padding: 15px 15px 15px 0px; */
  padding: 15px;
}

:not(pre)>code[class*="language-"],
pre[class*="language-"] {
  background: transparent;
}

/* Inline code */
:not(pre)>code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999;
}

.token.punctuation {
  color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #e2777a;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: green;
}

pre[class*="language-"].line-numbers {
  padding-left: 3.5em;
}
`;

const Algolia = createGlobalStyle`
:root {
  --docsearch-searchbox--bg: #f6f6f6;
  --docsearch-text-color: black;
  --docsearch-searchbox-focus-background: #fff;
  --docsearch-searchbox-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(60, 66, 87, 0.16) 0px 0px 0px 2px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  --docsearch-text-color: black;
  --docsearch-modal-background: var(--docs-content-bg);
  --docsearch-hit-background: #e7e7e7;
  --docsearch-hit-color: #000000;
}

:root.dark {
  --docsearch-searchbox--bg: #1a1a1a;
  --docsearch-text-color: white;
  --docsearch-searchbox-focus-background: #1a1a1a;
  --docsearch-searchbox-shadow: rgb(116, 116, 116) 0px 0px 0px 0px,
    rgb(112, 112, 112) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px,
    rgb(80, 80, 80) 0px 0px 0px 2px, rgb(75, 75, 75) 0px 0px 0px 0px,
    rgb(114, 114, 114) 0px 0px 0px 0px, rgb(136, 136, 136) 0px 0px 0px 0px;
  --docsearch-searchbox-focus-background: #000;
  --docsearch-modal-background: var(--docs-content-bg);
  --docsearch-hit-background: #262626;
  --docsearch-hit-color: #cbcbcb;
}

.DocSearch-Container,
.DocSearch-Container * {
  box-sizing: border-box;
}

.DocSearch-Button:active,
.DocSearch-Button:focus,
.DocSearch-Button:hover {
  color: var(--docsearch-text-color);
  transform: scale(1.1);
  box-shadow: none;
}

.DocSearch-Button {
  align-items: center;
  background: var(--docsearch-searchbox--bg);
  color: var(--docsearch-muted-color);
  margin: 0;
  border: 0;
  padding: 0;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  --size: 32px;
  height: var(--size);
  width: var(--size);
}

.DocSearch-Button-Container {
  align-items: center;
  display: flex;
}

.DocSearch-Button-Keys {
  display: none;
}

.DocSearch-Container {
  background-color: var(--docsearch-container-background);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 200;
}

.DocSearch-Modal {
  margin: 0;
  display: flex;
  justify-content: space-between;
  height: 100%;
  max-width: 350px;
  border-radius: 0;
  background: var(--docsearch-modal-background);
  box-shadow: none;
  flex-direction: column;
  position: relative;
}

.DocSearch-SearchBar {
  padding: 12px;
  display: flex;
}

.DocSearch-Dropdown {
  padding-left: 0px;
  padding-right: 0px;
  height: 100%;
  max-height: 100%;
  min-height: var(--docsearch-spacing);
  overflow-y: auto;
  padding: 0 var(--docsearch-spacing);
  scrollbar-color: var(--docsearch-muted-color)
    var(--docsearch-modal-background);
  scrollbar-width: thin;
}

.DocSearch-Footer {
  --docsearch-footer-background: var(--docsearch-searchbox-focus-background);
  background: var(--docsearch-footer-background);
  flex-direction: column-reverse;
  align-items: flex-start;
  height: auto;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: var(--docsearch-spacing);
  position: relative;
  user-select: none;
  width: 100%;
  z-index: 300;
  gap: 12px;
  box-shadow: inset 0px 1px var(--hr-grey1);
  padding: var(--docsearch-spacing);
}

.DocSearch-Hits:last-of-type {
  margin-bottom: 24px;
}

.DocSearch-Hit-source {
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 13px;
  color: var(--docsearch-text-color);
  font-weight: 700;
  margin: 0px;
  background: var(--docsearch-modal-background);
  line-height: 32px;
  padding: 8px 4px 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.DocSearch-Dropdown {
  scrollbar-color: var(--scrollbar-bg) var(--scrollbar-bg);
}

.DocSearch-Dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.DocSearch-Hit-Container {
  align-items: center;
  display: flex;
  flex-direction: row;
  height: var(--docsearch-hit-height);
  padding: 0 var(--docsearch-spacing) 0 0;
}

.DocSearch-Hit {
  border-radius: 4px;
  display: flex;
  padding-bottom: 4px;
  position: relative;
}

.DocSearch-Hit[aria-selected='true'] a {
  background: var(--linear-gradient-green-to-blue);
}

.DocSearch-Hit a {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding-left: 1.25rem;
  display: block;
  width: 100%;
  border-radius: 0;
  box-shadow: none;
}

.DocSearch-Hits mark {
  color: var(--colors-green0);
}

@media screen and (max-width: 750px) {
  .DocSearch-Button {
    height: 31px;
  }

  .DocSearch-Button-Container {
    --size: 32px;
    width: var(--size);
    height: var(--size);
  }

  .DocSearch-Button-Placeholder {
    display: initial;
  }
}

@media screen and (max-width: 500px) {
  .DocSearch-Button-Container {
    --size: 16px;
  }
}

.DocSearch-Form {
  height: 100%;
  padding: 6px;
}

#docsearch-input {
  font-size: 16px;
}

#docsearch-label > svg {
  width: 16px;
  height: 16px;
  color: var(--colors-green0);
}

.DocSearch-NoResults {
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--docsearch-text-color);
  gap: 12px;
}

.DocSearch-Prefill, .DocSearch-Help a, .DocSearch-Label {
  color: var(--colors-green0)
}
`;

export default function GlobalStyles() {
  return (
    <>
      <GlobalStyle />
      <NProgress />
      <Scrollbar />
      <CodeSyntaxHighlight />
      <Algolia />
    </>
  );
}

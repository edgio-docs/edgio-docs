import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  /* Colors */
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
  --sidebar-width: 280px;
  --container-max-width: 1228px;
  --container-padding: 0 20px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --black1: #fff;
    --white: var(--grey3);
    --grey1: rgba(0, 0, 0, 0.15);
    --grey2: #4e4e4e;
    --grey3: #353535;

    --docs-content-bg: #1a1a1a;
    --get-started-card-bg: #000000;
    --get-started-card-sub-bg: #fff;
    --link-grey1: #fff;
    --hr-grey1: #2a2b2c;
    --docs-color: #fff;
    --text-code-bg: #2a2b2c;
    --inline-code-bg: transparent;
  }
}

html, body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Helvetica Neue', 'Ubuntu';
}

/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

/* code and stuff */
code, pre {
  font-family: 'IBM Plex Mono', monospace;
}

code {
  white-space: nowrap;
  font-weight: 600;
}
`;

export default GlobalStyle;

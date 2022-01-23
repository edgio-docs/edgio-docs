import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --white: #fff;
}


html, body {
  font-family: -apple-system, Inter, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Helvetica Neue', 'Ubuntu';
}
`;

export default GlobalStyle;

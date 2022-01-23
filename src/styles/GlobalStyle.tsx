import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
--GSSB: "GS-Sans-Bold";
--GSSBI: "GS-Sans-Bold-Italic";
--GSSBlk: "GS-Sans-Black";
--GSSI: "GS-Sans-Italic";
--GSSL: "GS-Sans-Light";
--GSSM: "GS-Sans-Medium";
--GSSMI: "GS-Sans-Medium-Italic";
--GSSR: "GS-Sans-Regular";
--GSST: "GS-Sans-Thin";
--GSCB: "GS-Condensed-Bold";
--GSCR: "GS-Condensed-Regular";
}


html, body {
  font-family: 'IBM Plex Sans', -apple-system, Inter, var(--GSSR), BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Helvetica Neue', 'Ubuntu' !important;
}
`;

export default GlobalStyle;

import {default as base} from './base.config';

const HEADER_PREFIX = 'x-0';
const DOMAIN_LEGACY = 'layer0.co';
const APP_DOMAIN = `app.${DOMAIN_LEGACY}`;
const LINK_DOMAIN = `layer0-limelight.link`;
const RUM_DOMAIN = `rum.layer0.co`;
const PACKAGE_VERSION = '^6.0.0';

const INSTALL_CLI = `## Install the ${base.PRODUCT_NAME} CLI {/*install-the-cli*/}

If you have not already done so, install the [${base.PRODUCT_NAME} CLI](/guides/develop/cli).

<SnippetGroup>

\`\`\`bash tabLabel="npm"
npm i -g ${base.PACKAGE_NAME}/cli@${PACKAGE_VERSION}
\`\`\`

\`\`\`bash tabLabel="Yarn"
yarn global add ${base.PACKAGE_NAME}/cli@${PACKAGE_VERSION}
\`\`\`

</SnippetGroup>
`;

const PREREQ = `
${base.SYSTEM_REQUIREMENTS}

${base.SIGN_UP}

${INSTALL_CLI}
  `.trim();

const config = {
  HEADER_PREFIX,
  DOMAIN_LEGACY,
  APP_DOMAIN,
  LINK_DOMAIN,
  RUM_DOMAIN,
  INSTALL_CLI,
  PACKAGE_VERSION,
  PREREQ,
};

export default config;

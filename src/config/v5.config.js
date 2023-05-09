import {default as base} from './base.config';

const COMPANY_NAME = 'Edgio';
const PORTAL = `${COMPANY_NAME} Developer console`;
const HEADER_PREFIX = 'x-0';
const DOMAIN_LEGACY = 'layer0.co';
const APP_DOMAIN = `app.${DOMAIN_LEGACY}`;
const LINK_DOMAIN = `layer0-limelight.link`;
const RUM_DOMAIN = `rum.edgio.net`;
const NODE_VERSION = '14.x';
const PACKAGE_VERSION = '^5.0.0';
const INIT_ARG_EDGIO_VERSION = `--edgioVersion ${PACKAGE_VERSION}`;
const APP_URL = `https://${APP_DOMAIN}`;
const LOGIN_URL = `${APP_URL}/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f`;

const PORTAL_LINK = `[${PORTAL}](${LOGIN_URL})`;

const SYSTEM_REQUIREMENTS = `## System Requirements {/*system-requirements*/}

- [Install Node.js 14.19.0](/guides/install_nodejs)`;

const SYSTEM_REQUIREMENTS_H3 = `### System Requirements {/*system-requirements*/}

- [Install Node.js 14.19.0](/guides/install_nodejs)`;

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
${SYSTEM_REQUIREMENTS}

${base.SIGN_UP}

${INSTALL_CLI}
  `.trim();

const config = {
  COMPANY_NAME,
  PORTAL,
  HEADER_PREFIX,
  DOMAIN_LEGACY,
  APP_DOMAIN,
  LINK_DOMAIN,
  NODE_VERSION,
  RUM_DOMAIN,
  SYSTEM_REQUIREMENTS,
  SYSTEM_REQUIREMENTS_H3,
  PREREQ,
  PACKAGE_VERSION,
  INIT_ARG_EDGIO_VERSION,
  APP_URL,
  LOGIN_URL,
  PORTAL_LINK,
};

export default config;

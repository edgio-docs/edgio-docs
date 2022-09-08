const COMPANY_NAME = 'Edgio';
const PRODUCT_NAME = 'Edgio';
const PRODUCT = 'Edgio';
const PRODUCT_LEGACY = 'Layer0';
const PRODUCT_EDGE = 'App Edge';
const PRODUCT_PLATFORM = 'App Platform';
const PRODUCT_SECURITY = 'App Security';
const PRODUCT_NAME_LOWER = PRODUCT_LEGACY.toLowerCase();
const PRODUCT_NAME_UPPER = PRODUCT_LEGACY.toUpperCase();
const CLI_NAME = '0';
const FULL_CLI_NAME = 'layer0';
const PACKAGE_NAME = '@layer0';
const CONFIG_FILE = 'layer0.config.js';
const HEADER_PREFIX = 'x-0';
const COOKIE_PREFIX = 'layer0';
const RUM_NS = 'Layer0'; // namespace for the JS package used by RUM

const DOMAIN = 'layer0.co';
const APP_DOMAIN = `app.${DOMAIN}`;
const DOCS_DOMAIN = `docs.${DOMAIN}`;
const DOCS_PAGES_DOMAIN = 'layer0-docs.s3.amazonaws.com';
const DOCS_REPO = 'layer0-docs/layer0-docs';
const EXAMPLES_REPO = 'layer0-docs/layer0-examples';

const WWW_URL = `https://www.${DOMAIN}`;
const APP_URL = `https://${APP_DOMAIN}`;
const FORUM_URL = `https://forum.${DOMAIN}`;
const FIDDLE_URL = `https://fiddle.${DOMAIN}`;
const STATUS_URL = `https://status.${DOMAIN}`;
const HELP_URL = `https://help.${DOMAIN}`;
const SUPPORT_URL = `${APP_URL}/help`;
const DOCS_URL = `https://${DOCS_DOMAIN}`;
const DOCS_PAGES_REPO_URL = `https://${DOCS_PAGES_DOMAIN}`;
const LOGIN_URL = `${APP_URL}/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f`;

const PORTAL = `[${COMPANY_NAME} Developer console](${LOGIN_URL})`;

const NODE_VERSION = '14.x';
const STARTER_NAME = 'layer0-app';
const EDGEJS_LABEL = 'EdgeJS';

const YEAR = '2022';

const EXAMPLES_REPOS = {
  angular: 'https://github.com/layer0-docs/layer0-angular-example',
  astro: 'https://github.com/layer0-docs/layer0-astro-example',
  cdn: 'https://github.com/layer0-docs/layer0-cdn-example',
  fastboot: 'https://github.com/layer0-docs/layer0-ember-fastboot-example',
  frontity: 'https://github.com/layer0-docs/layer0-frontity-example',
  gatsby: 'https://github.com/layer0-docs/layer0-gatsby-example',
  next: 'https://github.com/layer0-docs/layer0-nextjs-example',
  nextcommerce: 'https://github.com/layer0-docs/layer0-nextjs-commerce-example',
  nuxt: 'https://github.com/layer0-docs/layer0-nuxt-example',
  nx: 'https://github.com/layer0-docs/layer0-nx-example',
  razzle: 'https://github.com/layer0-docs/layer0-razzle-example',
  sapper: 'https://github.com/layer0-docs/layer0-sapper-example',
  spartacus: 'https://github.com/layer0-docs/layer0-spartacus-example',
  svelte: 'https://github.com/layer0-docs/layer0-svelte-example',
  vsf: 'https://github.com/layer0-docs/layer0-vue-storefront-example',
  'static-backbone': 'https://github.com/layer0-docs/static-backbonejs-example',
  'static-react': 'https://github.com/layer0-docs/layer0-static-react-example',
  'static-vue': 'https://github.com/layer0-docs/layer0-static-vuejs-example',
};

const SYSTEM_REQUIREMENTS = `## System Requirements {/*system-requirements*/}

- [Install Node.js 14.19.0](/guides/install_nodejs)`;

const SYSTEM_REQUIREMENTS_H3 = `### System Requirements {/*system-requirements*/}

- [Install Node.js 14.19.0](/guides/install_nodejs)`;

const SIGN_UP = `## Sign up for ${PRODUCT} {/*sign-up*/}

Deploying requires an account on ${PRODUCT}. <a href="${APP_URL}/signup">Sign up here for free.</a>`;

const INSTALL_CLI = `## Install the ${PRODUCT_NAME} CLI {/*install-the-cli*/}

If you have not already done so, install the [${PRODUCT_NAME} CLI](cli).

With \`npm\`: 
\`\`\`bash
npm i -g ${PACKAGE_NAME}/cli
\`\`\`

With \`yarn\`:
\`\`\`bash
yarn global add ${PACKAGE_NAME}/cli
\`\`\`
`;

const PREREQ = `
${SYSTEM_REQUIREMENTS}

${SIGN_UP}

${INSTALL_CLI}
`.trim();

const INSTALL_CLI_STEP = `Install the ${PRODUCT_NAME} CLI

If you have not already done so, install the [${PRODUCT_NAME} CLI](cli).

With \`npm\`: 
\`\`\`bash
npm i -g ${PACKAGE_NAME}/cli
\`\`\`

With \`yarn\`:
\`\`\`bash
yarn global add ${PACKAGE_NAME}/cli
\`\`\`
`;

const SECURITY_NAV = `1.  From the ${PORTAL}, click on the **AppOps** tab.
    2.  Click **Open on my.edgecast.com** to load the **Security** page.
    3.  From the **Security** page's navigation pane, click `;

const ACCOUNT_UPGRADE = `Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to upgrade your account.`;

const PARTNERS_CONTACT = `partner@llnw.com`;

module.exports = {
  ACCOUNT_UPGRADE,
  COMPANY_NAME,
  PRODUCT,
  PRODUCT_LEGACY,
  PRODUCT_EDGE,
  PRODUCT_PLATFORM,
  PRODUCT_SECURITY,
  PRODUCT_NAME,
  PRODUCT_NAME_LOWER,
  PRODUCT_NAME_UPPER,
  APP_DOMAIN,
  APP_URL,
  CLI_NAME,
  CONFIG_FILE,
  COOKIE_PREFIX,
  DOCS_DOMAIN,
  DOCS_PAGES_DOMAIN,
  DOCS_PAGES_REPO_URL,
  DOCS_REPO,
  DOCS_URL,
  DOMAIN,
  EDGEJS_LABEL,
  EXAMPLES_REPO,
  EXAMPLES_REPOS,
  PORTAL,
  FIDDLE_URL,
  FORUM_URL,
  FULL_CLI_NAME,
  HEADER_PREFIX,
  HELP_URL,
  INSTALL_CLI,
  LOGIN_URL,
  PREREQ,
  INSTALL_CLI_STEP,
  NODE_VERSION,
  PACKAGE_NAME,
  PARTNERS_CONTACT,
  SECURITY_NAV,
  SIGN_UP,
  STARTER_NAME,
  STATUS_URL,
  SUPPORT_URL,
  SYSTEM_REQUIREMENTS_H3,
  SYSTEM_REQUIREMENTS,
  YEAR,
  WWW_URL,
  RUM_NS,
};

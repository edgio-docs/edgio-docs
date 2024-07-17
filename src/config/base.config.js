// NOTE: While this is base config is primarily based on v7,
// all versions inherit these values. Changing these values
// will affect all versions and should be avoided unless a new
// variable is being added. Otherwise, all overrides should be
// made in the versioned config files.

const COMPANY_NAME = 'Edgio';
const PRODUCT_NAME = 'Edgio';
const PRODUCT = 'Edgio';
const PRODUCT_LEGACY = 'Layer0';
const PRODUCT_EDGE = 'Performance';
const PRODUCT_APPLICATIONS = 'Applications';
const PRODUCT_PLATFORM = 'Sites';
const PRODUCT_SECURITY = 'Security';
const PRODUCT_LOWER = PRODUCT.toLowerCase();
const PRODUCT_NAME_LOWER = PRODUCT.toLowerCase();
const PRODUCT_NAME_UPPER = PRODUCT.toUpperCase();
const PRODUCT_LEGACY_LOWER = PRODUCT_LEGACY.toLowerCase();
const PORTAL = `${COMPANY_NAME} Console`;
const IDENTITY_DASHBOARD = `${PRODUCT} Identity Dashboard`;
const DOCS_NAME = `${COMPANY_NAME} Docs`;
const CHROME_EXTENSION = `${COMPANY_NAME} Developer Tools Chrome extension`;
const CHROME_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/edgio-developer-tools/lennfodclaaegmceonbblmnnmpmpmahf';
const CHROME_EXTENSION_LINK = `[${CHROME_EXTENSION}](${CHROME_EXTENSION_URL})`;

const CLI_NAME = 'edg';
const FULL_CLI_NAME = 'edgio';
const PACKAGE_NAME = '@edgio';
const PACKAGE_VERSION = 'latest';
const INIT_ARG_EDGIO_VERSION = `--edgioVersion ${PACKAGE_VERSION}`;
const LEGACY_FW_INIT_ARG_EDGIO_VERSION = `--edgioVersion 7.5.0`;
const CONFIG_FILE = 'edgio.config.js';
const ROUTES_FILE = `\`routes.[js|ts]\``;
const HEADER_PREFIX = 'x-edg';
const COOKIE_PREFIX = 'edgio';
const RUM_NS = 'Edgio'; // namespace for the JS package used by RUM

const DOMAIN = 'edg.io';
const DOMAIN_LEGACY = 'layer0.co';
const API_DOMAIN = 'edgioapis.com';
const APP_DOMAIN = `edgio.app`;
const IDENTITY_DOMAIN = `account.edgio.app`;
const IDENTITY_TOKEN_DOMAIN = `id.edgio.app`;
const LINK_DOMAIN = `edgio.link`;
const PERMALINK_DOMAIN = `edgio-perma.link`;
const RUM_DOMAIN = `rum.edgio.net`;
const DOCS_DOMAIN = `docs.${DOMAIN}`;
const DOCS_PAGES_DOMAIN = 'layer0-docs.s3.amazonaws.com';
const DOCS_REPO = 'edgio-docs/edgio-docs';
const EXAMPLES_REPO = 'edgio-docs/edgio-examples';

const WWW_URL = `https://www.${DOMAIN}/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const APP_URL = `https://${APP_DOMAIN}`;
const FORUM_URL = `https://forum.${DOMAIN}/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const FIDDLE_URL = `https://fiddle.${DOMAIN}/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const STATUS_URL = `https://status.${DOMAIN}/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const HELP_URL = `https://${DOMAIN}/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const SUPPORT_URL = `https://${DOMAIN}/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const DOCS_URL = `https://${DOCS_DOMAIN}`;
const API_DOCS_URL = `https://docs.edg.io/rest_api/`;
const DOCS_PAGES_REPO_URL = `https://${DOCS_PAGES_DOMAIN}`;
const API_URL = `https://${API_DOMAIN}`;
const IDENTITY_URL = `https://${IDENTITY_DOMAIN}`;
const API_SECURITY_VERSION = '0.9';
const API_CONFIG_VERSION = '0.1';
const SAMPLE_TEAM_ID = '12345678-1234-1234-1234-1234567890ab';
const LOGIN_URL = `${APP_URL}/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f`;
const UPLYNK_CMS_URL = `https://cms.uplynk.com/`;
const DELIVERY_PORTAL_URL = `https://control-new.edg.io/acontrol/#/login`;

const PORTAL_LINK = `[${PORTAL}](${LOGIN_URL})`;
const IDENTITY_LINK = `[${IDENTITY_DASHBOARD}](${IDENTITY_URL})`;

const NODE_VERSION = '18.x';
const STARTER_NAME = 'layer0-app';
const EDGEJS_LABEL = 'EdgeJS';

const YEAR = '2023';

const BOT_MUSTACHE = `\`{{BOT_JS}}\``;

const EXAMPLES_REPOS = {
  angular: 'https://github.com/edgio-docs/edgio-angular-example',
  astro: 'https://github.com/edgio-docs/edgio-astro-example',
  cdn: 'https://github.com/edgio-docs/edgio-cdn-example',
  fastboot: 'https://github.com/edgio-docs/edgio-ember-fastboot-example',
  frontity: 'https://github.com/edgio-docs/edgio-frontity-example',
  gatsby: 'https://github.com/edgio-docs/edgio-gatsby-example',
  next: 'https://github.com/edgio-docs/edgio-nextjs-example',
  nextcommerce: 'https://github.com/edgio-docs/edgio-nextjs-commerce-example',
  nuxt: 'https://github.com/edgio-docs/edgio-nuxt-example',
  nx: 'https://github.com/edgio-docs/edgio-nx-example',
  razzle: 'https://github.com/edgio-docs/edgio-razzle-example',
  sapper: 'https://github.com/edgio-docs/edgio-sapper-example',
  spartacus: 'https://github.com/edgio-docs/edgio-spartacus-example',
  svelte: 'https://github.com/edgio-docs/edgio-svelte-example',
  vsf: 'https://github.com/edgio-docs/edgio-vue-storefront-example',
  'static-backbone': 'https://github.com/edgio-docs/static-backbonejs-example',
  'static-react': 'https://github.com/edgio-docs/edgio-static-react-example',
  'static-vue': 'https://github.com/edgio-docs/edgio-static-vuejs-example',
};

const TEAM_ID = `-   \`<TEAM ID>\`**:** Required. Replace this variable with your team's tenant ID.`;
const API_REQUEST_HEADERS = `<h4>Request Headers</h4>

Set up your API client to pass our [common request headers](/guides/develop/rest_api/api_request_response#request-headers).`;

const SIGN_UP = `## Sign up for ${PRODUCT} {/*sign-up*/}

Deploying requires an account on ${PRODUCT}. [Sign up here for free.](${APP_URL}/signup)`;

const PREFETCH_TIER1_INTRO = `
The \`${FULL_CLI_NAME} init\` command adds a service worker based on [Workbox](https://developers.google.com/web/tools/workbox) at \`sw/service-worker.js\`.
If you have an existing service worker that uses workbox, you can copy its contents into \`sw/service-worker.js\` and simply add the following to your service worker:

\`\`\`js filename="sw/service-worker.js"
import { Prefetcher } from '${PACKAGE_NAME}/prefetch/sw';

new Prefetcher().route();
\`\`\``;

const INSTALL_CLI_STEP = `Install the ${PRODUCT_NAME} CLI

If you have not already done so, install the [${PRODUCT_NAME} CLI](/guides/develop/cli).

<SnippetGroup>

\`\`\`bash tabLabel="npm"
npm i -g ${PACKAGE_NAME}/cli
\`\`\`

\`\`\`bash tabLabel="Yarn"
yarn global add ${PACKAGE_NAME}/cli
\`\`\`

</SnippetGroup>
`;

const CONTACT_SUPPORT = `Contact our [technical customer support](${HELP_URL}).`;

const SECURITY_NAV = `1.  From the ${PORTAL_LINK}, select the desired organization.
    2.  From the **Security** section, click `;

const ENV_NAV = `1.  From the ${PORTAL_LINK}, select the desired private space or organization.
    2.  Select the desired property.
    3.  From the left-hand pane, select the desired environment from under the **Environments** section.
    4.  From the left-hand pane, select`;

const ACCOUNT_UPGRADE = `Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to upgrade your account.`;

const PARTNERS_CONTACT = `partner@llnw.com`;

const config = {
  ACCOUNT_UPGRADE,
  API_DOMAIN,
  COMPANY_NAME,
  PRODUCT,
  PRODUCT_LOWER,
  PRODUCT_LEGACY,
  PRODUCT_APPLICATIONS,
  PRODUCT_EDGE,
  PRODUCT_PLATFORM,
  PRODUCT_SECURITY,
  PRODUCT_NAME,
  PRODUCT_NAME_LOWER,
  PRODUCT_NAME_UPPER,
  PRODUCT_LEGACY_LOWER,
  APP_DOMAIN,
  APP_URL,
  API_URL,
  API_SECURITY_VERSION,
  API_REQUEST_HEADERS,
  CHROME_EXTENSION,
  CHROME_EXTENSION_LINK,
  CHROME_EXTENSION_URL,
  CLI_NAME,
  CONFIG_FILE,
  ROUTES_FILE,
  COOKIE_PREFIX,
  DOCS_DOMAIN,
  DOCS_PAGES_DOMAIN,
  DOCS_PAGES_REPO_URL,
  DOCS_REPO,
  DOCS_URL,
  API_DOCS_URL,
  DOMAIN,
  DOMAIN_LEGACY,
  EDGEJS_LABEL,
  ENV_NAV,
  EXAMPLES_REPO,
  EXAMPLES_REPOS,
  FIDDLE_URL,
  FORUM_URL,
  FULL_CLI_NAME,
  HEADER_PREFIX,
  HELP_URL,
  IDENTITY_DASHBOARD,
  IDENTITY_DOMAIN,
  IDENTITY_TOKEN_DOMAIN,
  IDENTITY_LINK,
  IDENTITY_URL,
  LINK_DOMAIN,
  PERMALINK_DOMAIN,
  RUM_DOMAIN,
  LOGIN_URL,
  PORTAL,
  PORTAL_LINK,
  INSTALL_CLI_STEP,
  PREFETCH_TIER1_INTRO,
  NODE_VERSION,
  PACKAGE_NAME,
  PARTNERS_CONTACT,
  SECURITY_NAV,
  SIGN_UP,
  STARTER_NAME,
  STATUS_URL,
  SUPPORT_URL,
  SAMPLE_TEAM_ID,
  TEAM_ID,
  CONTACT_SUPPORT,
  YEAR,
  BOT_MUSTACHE,
  WWW_URL,
  RUM_NS,
  PACKAGE_VERSION,
  INIT_ARG_EDGIO_VERSION,
  LEGACY_FW_INIT_ARG_EDGIO_VERSION,
  DOCS_NAME,
  UPLYNK_CMS_URL,
  DELIVERY_PORTAL_URL,
};

export default config;

// Helper functions that are used in the templates, but not serialized in the config
export const configHelpers = {
  CLI_CMD: (cmd) => `${FULL_CLI_NAME} ${cmd}`,
};

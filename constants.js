const PRODUCT_NAME = 'Layer0'
const PRODUCT_NAME_LOWER = PRODUCT_NAME.toLowerCase()
const PRODUCT_NAME_UPPER = PRODUCT_NAME.toUpperCase()
const CLI_NAME = 'layer0'
const PACKAGE_NAME = '@layer0'
const CONFIG_FILE = 'layer0.config.js'
const HEADER_PREFIX = 'x-0'
const COOKIE_PREFIX = 'layer0'

const DOMAIN = 'layer0.co'
const APP_DOMAIN = `app.${DOMAIN}`
const DOCS_DOMAIN = `docs.${DOMAIN}`
const DOCS_PAGES_DOMAIN = 'layer0-docs.s3.amazonaws.com'
const DOCS_REPO = 'layer0-docs/layer0-docs'
const EXAMPLES_REPO = 'layer0-docs/layer0-examples'

const WWW_URL = `https://www.${DOMAIN}`
const APP_URL = `https://${APP_DOMAIN}`
const FORUM_URL = `https://forum.${DOMAIN}`
const STATUS_URL = `https://status.${DOMAIN}`
const HELP_URL = `https://help.${DOMAIN}`
const DOCS_URL = `https://${DOCS_DOMAIN}`
const DOCS_PAGES_REPO_URL = `https://${DOCS_PAGES_DOMAIN}`

const NODE_VERSION = '14.x'
const STARTER_NAME = 'layer0-app'
const EDGEJS_LABEL = 'EdgeJS'

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
}

const SYSTEM_REQUIREMENTS = `## System requirements

- [Install Node.js 14.0](/guides/install-nodejs)`

const SYSTEM_REQUIREMENTS_H3 = `### System Requirements

- [Install Node.js 14.0](/guides/install-nodejs)`

const SIGN_UP_LAYER0 = `## Sign up for {{ PRODUCT_NAME }}

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup)`

module.exports = {
  PRODUCT_NAME,
  PRODUCT_NAME_LOWER,
  PRODUCT_NAME_UPPER,
  CLI_NAME,
  PACKAGE_NAME,
  CONFIG_FILE,
  HEADER_PREFIX,
  COOKIE_PREFIX,
  DOMAIN,
  APP_DOMAIN,
  DOCS_DOMAIN,
  DOCS_PAGES_DOMAIN,
  WWW_URL,
  APP_URL,
  FORUM_URL,
  STATUS_URL,
  HELP_URL,
  DOCS_URL,
  DOCS_PAGES_REPO_URL,
  NODE_VERSION,
  STARTER_NAME,
  DOCS_REPO,
  EXAMPLES_REPO,
  EDGEJS_LABEL,
  EXAMPLES_REPOS,
  SYSTEM_REQUIREMENTS,
  SYSTEM_REQUIREMENTS_H3,
  SIGN_UP_LAYER0,
}

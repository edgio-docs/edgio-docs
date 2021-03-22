const PRODUCT_NAME = 'Layer0'
const PRODUCT_NAME_LOWER = PRODUCT_NAME.toLowerCase()
const PRODUCT_NAME_UPPER = PRODUCT_NAME.toUpperCase()
const CLI_NAME = 'layer0'
const PACKAGE_NAME = '@layer0'
const CONFIG_FILE = 'layer0.config.js'
const HEADER_PREFIX = 'x-layer0-'

const DOMAIN = 'layer0.co'
const APP_DOMAIN = `app.${DOMAIN}`
const DOCS_DOMAIN = `developer.${DOMAIN}`
const DOCS_PAGES_DOMAIN = 'layer0-docs.github.io'

const APP_URL = `https://${APP_DOMAIN}`
const FORUM_URL = `https://forum.${DOMAIN}`
const STATUS_URL = `https://status.${DOMAIN}`
const HELP_URL = `https://help.${DOMAIN}`
const DOCS_PAGES_REPO_URL = `https://${DOCS_PAGES_DOMAIN}/layer0-docs-pages`

const NODE_VERSION = '12.x'

module.exports = {
  PRODUCT_NAME,
  PRODUCT_NAME_LOWER,
  PRODUCT_NAME_UPPER,
  CLI_NAME,
  PACKAGE_NAME,
  CONFIG_FILE,
  HEADER_PREFIX,
  DOMAIN,
  APP_DOMAIN,
  DOCS_DOMAIN,
  DOCS_PAGES_DOMAIN,
  APP_URL,
  FORUM_URL,
  STATUS_URL,
  HELP_URL,
  DOCS_PAGES_REPO_URL,
  NODE_VERSION,
}

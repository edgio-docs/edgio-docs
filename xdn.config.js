'use strict'
const { DOCS_PAGES_DOMAIN } = require('./constants')

// This file was automatically added by `layer0 init`.
// You should commit this file to source control.
module.exports = {
  backends: {
    api: {
      domainOrIp: DOCS_PAGES_DOMAIN,
      hostHeader: DOCS_PAGES_DOMAIN,
    },
  },
  connector: '@layer0/next',
}

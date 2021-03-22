'use strict'
const { DOCS_PAGES_DOMAIN } = require('./constants')

// This file was automatically added by xdn deploy.
// You should commit this file to source control.
module.exports = {
  backends: {
    api: {
      domainOrIp: DOCS_PAGES_DOMAIN,
      hostHeader: DOCS_PAGES_DOMAIN,
    },
  },
  connector: '@xdn/next',
}

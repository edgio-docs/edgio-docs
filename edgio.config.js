const {DOCS_PAGES_DOMAIN} = require('./constants');

module.exports = {
  connector: '@edgio/next',
  backends: {
    api: {
      domainOrIp: DOCS_PAGES_DOMAIN,
      hostHeader: DOCS_PAGES_DOMAIN,
    },
  },
  includeFiles: {
    '.next/static/**/*': true,
  },
};

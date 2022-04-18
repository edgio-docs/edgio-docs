const {DOCS_PAGES_DOMAIN} = require('./constants');

module.exports = {
  connector: '@layer0/next',
  backends: {
    api: {
      domainOrIp: DOCS_PAGES_DOMAIN,
      hostHeader: DOCS_PAGES_DOMAIN,
    },
  },
};

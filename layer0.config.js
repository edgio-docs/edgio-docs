const {DOCS_PAGES_DOMAIN} = require('./constants');

module.exports = {
  backends: {
    api: {
      domainOrIp: DOCS_PAGES_DOMAIN,
      hostHeader: DOCS_PAGES_DOMAIN,
    },
  },
};

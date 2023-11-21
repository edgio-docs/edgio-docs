const {DOCS_PAGES_DOMAIN} = require('./constants');

module.exports = {
  team: 'edgio-community',
  name: 'docs.edg.io',
  connector: '@edgio/next',
  next: {
    enforceTrailingSlash: false,
  },
  environments: {
    production: {
      hostnames: [{hostname: 'docs.edg.io'}],
    },
  },
  origins: [
    {
      name: 'api',
      override_host_header: DOCS_PAGES_DOMAIN,
      hosts: [
        {
          scheme: 'https',
          location: [
            {
              hostname: DOCS_PAGES_DOMAIN,
              port: 443,
            },
          ],
        },
      ],
      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: DOCS_PAGES_DOMAIN,
      },
      //shields: {us_east: 'DCD'},
      // tls_verify: {
      //   allow_self_signed_certs: true,
      // },
    },
  ],

  serverless: {
    include: ['src/guides/**/*'],
  },
  cloudRuntime: 'nodejs18.x',
};

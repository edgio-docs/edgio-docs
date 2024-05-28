module.exports = {
  team: 'edgio-community',
  name: 'docs.edg.io',
  connector: '@edgio/next',
  routes: 'src/edgio/routes.ts',
  next: {
    enforceTrailingSlash: false,
    disableImageOptimizer: true,
  },
  environments: {
    production: {
      hostnames: [{hostname: 'docs.edg.io'}],
    },
  },
  origins: [
    {
      name: 'api',
      override_host_header: 'layer0-docs.s3.amazonaws.com',
      hosts: [
        {
          scheme: 'https',
          location: [
            {
              hostname: 'layer0-docs.s3.amazonaws.com',
              port: 443,
            },
          ],
        },
      ],
      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: 'layer0-docs.s3.amazonaws.com',
      },
    },
  ],

  serverless: {
    include: ['guides/**/*'],
  },
  cloudRuntime: 'nodejs18.x',
};

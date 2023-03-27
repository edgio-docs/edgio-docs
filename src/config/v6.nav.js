const nav = {
  title: 'guides',
  path: '/guides',
  routes: [
    {
      title: 'Getting Started',
      path: 'getting_started',
      icon: 'spark',
    },
    {
      title: 'Basics',
      path: 'basics',
      icon: 'server',
      routes: [
        {
          title: 'Environments',
          path: 'basics/environments',
        },
        {
          title: 'Domains',
          path: 'basics/domains',
        },
        {
          title: 'Deployments',
          path: 'basics/deployments',
        },
        {
          title: 'Collaboration',
          path: 'basics/collaboration',
          routes: [
            {
              title: 'Single-Sign On (SSO)',
              path: 'basics/collaboration/sso',
            },
          ],
        },
        {
          title: 'Alerts',
          path: 'basics/alerts',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'edgio.config.js Configuration',
          path: 'basics/edgio_config',
        },
      ],
    },
    {
      title: 'Performance',
      path: 'performance',
      icon: 'trend',
      routes: [
        {
          title: 'Getting Started',
          path: 'performance/getting_started',
        },

        {
          title: 'CDN-as-Code (EdgeJS)',
          path: 'performance/cdn_as_code',
          routes: [
            {
              title: 'Common Routing Patterns',
              path: 'performance/cdn_as_code/common_routing_patterns',
            },
          ],
        },
        {
          title: 'Caching',
          path: 'performance/caching',
        },
        {
          title: 'Purging',
          path: 'performance/purging',
        },
        {
          title: 'Static Prerendering',
          path: 'performance/static_prerendering',
        },
        {
          title: 'Predictive Prefetch',
          path: 'performance/prefetching',
        },
        {
          title: 'Traffic Splitting',
          path: 'performance/traffic_splitting',
          routes: [
            {
              title: 'A/B Testing',
              path: 'performance/traffic_splitting/a_b_testing',
            },
          ],
        },
        {
          title: 'Observability',
          path: 'performance/observability',
          routes: [
            {
              title: 'Core Web Vitals',
              path: 'performance/observability/core_web_vitals',
            },
            {
              title: 'Devtools',
              path: 'performance/observability/devtools',
            },
          ],
        },
        {
          title: 'Serverless Compute',
          path: 'performance/serverless_compute',
        },
        {
          title: 'Unit Testing (EdgeJS)',
          path: 'performance/unit_testing_edgejs',
        },
        {
          title: 'Image Optimization',
          path: 'performance/image_optimization',
        },
        {
          title: 'Traditional Sites',
          path: 'performance/traditional_sites',
        },
        {
          title: 'Third-Party CDNs',
          path: 'performance/third_party_cdns',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Compression',
          path: 'performance/compression',
        },
        {
          title: 'Request',
          path: 'performance/request',
        },
        {
          title: 'Response',
          path: 'performance/response',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Troubleshooting',
          path: 'performance/troubleshooting',
        },
        {
          title: 'Limits',
          path: 'performance/limits',
        },
      ],
    },
    {
      title: 'Security',
      path: 'security',
      icon: 'shield',
      routes: [
        {
          title: 'Managed Bot Defense',
          path: 'security/managed_bot_defense',
        },
        {
          title: 'Managed Rule Groups',
          path: 'security/managed_rule_groups',
        },
        {
          title: 'Security Suite',
          path: 'security/security_suite',
        },
      ],
    },
    {
      title: 'Sites',
      path: 'sites_frameworks',
      icon: 'book-plain',
      routes: [
        {
          title: 'Frameworks',
          path: 'sites_frameworks/getting_started',
          routes: [
            {
              title: 'Angular',
              path: 'sites_frameworks/getting_started/angular',
            },
            {
              title: 'Astro',
              path: 'sites_frameworks/getting_started/astro',
            },
            {
              title: 'Brunch',
              path: 'sites_frameworks/getting_started/brunch',
            },
            {
              title: 'Docusaurus',
              path: 'sites_frameworks/getting_started/docusaurus',
            },
            {
              title: 'Dojo',
              path: 'sites_frameworks/getting_started/dojo',
            },
            {
              title: 'Eleventy',
              path: 'sites_frameworks/getting_started/eleventy',
            },
            {
              title: 'Ember.js',
              path: 'sites_frameworks/getting_started/ember',
            },
            {
              title: 'Ember Fastboot',
              path: 'sites_frameworks/getting_started/ember_fastboot',
            },
            {
              title: 'Express',
              path: 'sites_frameworks/getting_started/express',
            },
            {
              title: 'Frontity',
              path: 'sites_frameworks/getting_started/frontity',
            },
            {
              title: 'Gatsby',
              path: 'sites_frameworks/getting_started/gatsby',
            },
            {
              title: 'Gridsome',
              path: 'sites_frameworks/getting_started/gridsome',
            },
            {
              title: 'Hexo',
              path: 'sites_frameworks/getting_started/hexo',
            },
            {
              title: 'Hugo',
              path: 'sites_frameworks/getting_started/hugo',
            },
            {
              title: 'Ionic React',
              path: 'sites_frameworks/getting_started/ionic_react',
            },
            {
              title: 'Ionic Vue',
              path: 'sites_frameworks/getting_started/ionic_vue',
            },
            {
              title: 'Jekyll',
              path: 'sites_frameworks/getting_started/jekyll',
            },
            {
              title: 'Lit',
              path: 'sites_frameworks/getting_started/lit',
            },
            {
              title: 'MkDocs',
              path: 'sites_frameworks/getting_started/mkdocs',
            },
            {
              title: 'Next.js',
              path: 'sites_frameworks/getting_started/next',
            },
            {
              title: 'Next.js Commerce',
              path: 'sites_frameworks/getting_started/next_commerce',
            },
            {
              title: 'Nuxt.js',
              path: 'sites_frameworks/getting_started/nuxt',
            },
            {
              title: 'Nuxt3',
              path: 'sites_frameworks/getting_started/nuxt3',
            },
            {
              title: 'Preact',
              path: 'sites_frameworks/getting_started/preact',
            },
            {
              title: 'Razzle',
              path: 'sites_frameworks/getting_started/razzle',
            },
            {
              title: 'React',
              path: 'sites_frameworks/getting_started/react',
            },
            {
              title: 'React Static',
              path: 'sites_frameworks/getting_started/react_static',
            },
            {
              title: 'React Storefront',
              path: 'sites_frameworks/getting_started/react-storefront',
            },
            {
              title: 'RedwoodJS',
              path: 'sites_frameworks/getting_started/redwoodjs',
            },
            {
              title: 'Remix',
              path: 'sites_frameworks/getting_started/remix',
            },
            {
              title: 'Saber',
              path: 'sites_frameworks/getting_started/saber',
            },
            {
              title: 'Sanity',
              path: 'sites_frameworks/getting_started/sanity',
            },
            {
              title: 'Sapper',
              path: 'sites_frameworks/getting_started/sapper',
            },
            {
              title: 'Scully',
              path: 'sites_frameworks/getting_started/scully',
            },
            {
              title: 'SolidJS',
              path: 'sites_frameworks/getting_started/solid',
            },
            {
              title: 'Spartacus',
              path: 'sites_frameworks/getting_started/spartacus',
            },
            {
              title: 'Static HTML/JS',
              path: 'sites_frameworks/getting_started/static_sites',
            },
            {
              title: 'Stencil',
              path: 'sites_frameworks/getting_started/stencil',
            },
            {
              title: 'Svelte',
              path: 'sites_frameworks/getting_started/svelte',
            },
            {
              title: 'UmiJS',
              path: 'sites_frameworks/getting_started/umijs',
            },
            {
              title: 'VitePress',
              path: 'sites_frameworks/getting_started/vitepress',
            },
            {
              title: 'Vue Storefront',
              path: 'sites_frameworks/getting_started/vsf',
            },
            {
              title: 'Vue.js',
              path: 'sites_frameworks/getting_started/vue',
            },
            {
              title: 'VuePress',
              path: 'sites_frameworks/getting_started/vuepress',
            },
            {
              title: 'Zola',
              path: 'sites_frameworks/getting_started/zola',
            },
          ],
        },
        {
          title: 'Connectors',
          path: 'sites_frameworks/connectors',
        },
        {
          title: 'Incremental Static Regeneration',
          path: 'sites_frameworks/isg',
        },
        {
          title: 'Limits',
          path: 'sites_frameworks/limits',
        },
      ],
    },
    {
      title: 'Third-Party Integrations',
      path: 'integrations',
      icon: 'gear',
      routes: [
        {
          title: 'BigCommerce',
          path: 'integrations/bigcommerce',
        },
        {
          title: 'Bloomreach',
          path: 'integrations/bloomreach',
        },
        {
          title: 'Shopify Hydrogen',
          path: 'integrations/shopify_hydrogen',
        },
        {
          title: 'Swell',
          path: 'integrations/swell',
        },
        {
          title: 'WordPress',
          path: 'integrations/wordpress',
        },
      ],
    },
    {
      title: 'Develop',
      path: 'develop',
      icon: 'code-plain',
      routes: [
        {
          title: 'CLI',
          path: 'develop/cli',
        },
        {
          title: 'REST API',
          path: 'develop/rest_api',
        },
        {
          title: 'Log Data',
          path: 'develop/logs',
        },
        {
          title: 'Deploy to Edgio Button',
          path: 'develop/deploy_to_edgio',
        },
        {
          title: 'EdgeJS API Reference',
          path: 'develop/packages',
          routes: [
            {
              title: '@edgio/core',
              path: 'https://docs.edg.io/docs/api/core',
              external: true,
            },
            {
              title: '@edgio/prefetch',
              path: 'https://docs.edg.io/docs/api/prefetch',
              external: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Upgrading',
      path: 'upgrading',
      icon: 'stacks-plain',
      routes: [
        {
          title: 'Migration to v4',
          path: 'upgrading/layer0_migration',
        },
        {
          title: 'Migration to v5',
          path: 'upgrading/v5_migration',
        },
        {
          title: 'Migration to v6',
          path: 'upgrading/v6_migration',
        },
      ],
    },
  ],
};
export default nav;

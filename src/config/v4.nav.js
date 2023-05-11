const nav = {
  title: 'guides',
  path: '/guides',
  routes: [
    {
      title: 'Getting Started',
      icon: 'spark',
      path: 'v4_getting_started',
      routes: [
        {
          title: 'Performance',
          path: 'webapp_cdn_getting_started',
        },
        {
          title: 'Sites',
          path: 'jamstack_getting_started',
        },
        {
          title: 'Deploying',
          path: 'deploy_apps',
        },
        {
          title: 'System Overview',
          path: 'overview',
        },
      ],
    },
    {
      title: 'Performance',
      icon: 'server',
      path: 'v4_performance',
      routes: [
        {
          title: 'Routing with EdgeJS',
          path: 'routing',
        },
        {
          title: 'Common Routing Patterns',
          path: 'cookbook',
        },
        {
          title: 'Custom Domains & SSL',
          path: 'production',
        },
        {
          title: 'Caching',
          path: 'caching',
        },
        {
          title: 'Purging',
          path: 'purging',
        },
        {
          title: 'Static Prerendering',
          path: 'static_prerendering',
        },
        {
          title: 'Predictive Prefetch',
          path: 'prefetching',
        },
        {
          title: 'Traditional Sites',
          path: 'traditional_sites',
        },
        {
          title: 'Split Testing',
          path: 'split_testing',
        },
        {
          title: 'Traffic Splitting',
          path: 'traffic_splitting',
        },
        {
          title: 'Observability',
          path: 'core_web_vitals',
        },
        {
          title: 'Performance',
          path: 'performance',
        },
        {
          title: 'Serverless Compute',
          path: 'serverless_functions',
        },
        {
          title: 'Third-Party CDNs',
          path: 'third_party_cdns',
        },
        {
          title: 'Image Optimization',
          path: 'image_optimization',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Compression',
          path: 'compression',
        },
        {
          title: 'Request',
          path: 'request_headers',
        },
        {
          title: 'Response Headers',
          path: 'response_headers',
        },
        {
          title: 'Status Codes',
          path: 'status_codes',
        },
        {
          title: 'Cookies',
          path: 'cookies',
        },
        {
          title: 'Regions',
          path: 'regions',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Troubleshooting',
          path: 'troubleshooting',
        },
      ],
    },
    {
      title: 'Sites',
      icon: 'book-plain',
      path: 'v4_sites',
      routes: [
        {
          title: 'Connectors',
          path: 'connectors',
        },
        {
          title: 'Incremental Static (Re)generation',
          path: 'isg',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Angular',
          path: 'angular',
        },
        {
          title: 'Astro',
          path: 'astro',
        },
        {
          title: 'Brunch',
          path: 'brunch',
        },
        {
          title: 'Docusaurus',
          path: 'docusaurus',
        },
        {
          title: 'Dojo',
          path: 'dojo',
        },
        {
          title: 'Eleventy',
          path: 'eleventy',
        },
        {
          title: 'Ember.js',
          path: 'ember',
        },
        {
          title: 'Ember Fastboot',
          path: 'ember_fastboot',
        },
        {
          title: 'Express',
          path: 'express',
        },
        {
          title: 'Frontity',
          path: 'frontity',
        },
        {
          title: 'Gatsby',
          path: 'gatsby',
        },
        {
          title: 'Gridsome',
          path: 'gridsome',
        },
        {
          title: 'Hexo',
          path: 'hexo',
        },
        {
          title: 'Hugo',
          path: 'hugo',
        },
        {
          title: 'Ionic React',
          path: 'ionic_react',
        },
        {
          title: 'Ionic Vue',
          path: 'ionic_vue',
        },
        {
          title: 'Jekyll',
          path: 'jekyll',
        },
        {
          title: 'Lit',
          path: 'lit',
        },
        {
          title: 'MkDocs',
          path: 'mkdocs',
        },
        {
          title: 'Nx',
          path: 'nx',
        },
        {
          title: 'Next.js',
          path: 'next',
        },
        {
          title: 'Next.js Commerce',
          path: 'next_commerce',
        },
        {
          title: 'Nuxt.js',
          path: 'nuxt',
        },
        {
          title: 'Nuxt3',
          path: 'nuxt3',
        },
        {
          title: 'Preact',
          path: 'preact',
        },
        {
          title: 'Razzle',
          path: 'razzle',
        },
        {
          title: 'React',
          path: 'react',
        },
        {
          title: 'React Static',
          path: 'react_static',
        },
        {
          title: 'React Storefront',
          path: 'react-storefront',
        },
        {
          title: 'RedwoodJS',
          path: 'redwoodjs',
        },
        {
          title: 'Remix',
          path: 'remix',
        },
        {
          title: 'Saber',
          path: 'saber',
        },
        {
          title: 'Sanity',
          path: 'sanity',
        },
        {
          title: 'Sapper',
          path: 'sapper',
        },
        {
          title: 'Scully',
          path: 'scully',
        },
        {
          title: 'SolidJS',
          path: 'solid',
        },
        {
          title: 'Spartacus',
          path: 'spartacus',
        },
        {
          title: 'Static HTML/JS',
          path: 'static_sites',
        },
        {
          title: 'Stencil',
          path: 'stencil',
        },
        {
          title: 'Svelte',
          path: 'svelte',
        },
        {
          title: 'UmiJS',
          path: 'umijs',
        },
        {
          title: 'VitePress',
          path: 'vitepress',
        },
        {
          title: 'Vue Storefront',
          path: 'vsf',
        },
        {
          title: 'Vue.js',
          path: 'vue',
        },
        {
          title: 'VuePress',
          path: 'vuepress',
        },
        {
          title: 'Zola',
          path: 'zola',
        },
      ],
    },
    {
      title: 'Security',
      icon: 'shield',
      path: 'v4_security',
      routes: [
        {
          title: 'Security Suite',
          path: 'security',
        },
        {
          title: 'Managed Rule Groups',
          path: 'managed_rule_groups',
        },
      ],
    },
    {
      title: 'Environments',
      icon: 'leaf',
      path: 'environments',
    },
    {
      title: 'Integrations',
      icon: 'gear',
      path: 'integrations',
      routes: [
        {
          title: 'BigCommerce',
          path: 'bigcommerce',
        },
        {
          title: 'Bloomreach',
          path: 'bloomreach',
        },
        {
          title: 'Shopify Hydrogen',
          path: 'shopify_hydrogen',
        },
        {
          title: 'Swell',
          path: 'swell',
        },
      ],
    },
    {
      title: 'Accounts & Teams',
      icon: 'user',
      path: 'v4_accounts_teams',
      routes: [
        {
          title: 'Alerts',
          path: 'alerts',
        },
        {
          title: 'Teams',
          path: 'teams',
        },
        {
          title: 'SAML Single Sign On',
          path: 'saml',
        },
      ],
    },
    {
      title: 'Developer Tools',
      icon: 'code-plain',
      path: 'v4_developer_tools',
      routes: [
        {
          title: 'CLI',
          path: 'cli',
        },
        {
          title: 'Devtools',
          path: 'devtools',
        },
        {
          title: 'EdgeJS Unit Testing',
          path: 'edgejs_testing',
        },
        {
          title: 'Logs',
          path: 'logs',
        },
        {
          title: `Deploy to Layer0 Button`,
          path: 'deploy_to_layer0',
        },
      ],
    },
    {
      title: 'APIs',
      icon: 'code-plain',
      path: 'v4_apis',
      routes: [
        {
          title: 'REST API',
          path: 'rest_api',
        },
        {
          title: `@layer0/core Package`,
          path: '/docs/v4.x/api/core/',
          external: true,
        },
        {
          title: `@layer0/prefetch Package`,
          path: '/docs/v4.x/api/prefetch/',
          external: true,
        },
        {
          title: `@layer0/core (v3.x) Package`,
          path: '/docs/v3.x/api/core/',
          external: true,
        },
        {
          title: `@layer0/prefetch (v3.x) Package`,
          path: '/docs/v3.x/api/prefetch/',
          external: true,
        },
      ],
    },
    {
      title: 'Reference',
      icon: 'stacks-plain',
      path: 'v4_reference',
      routes: [
        {
          title: 'Limits & Caveats',
          path: 'limits',
        },
        {
          title: 'v4 Migration Guide',
          path: 'layer0_migration',
        },
        {
          title: 'layer0.config.js',
          path: 'layer0_config',
        },
      ],
    },
  ],
};
export default nav;

type Redirect = [string | RegExp, string, number?];

export default <Array<Redirect>>[
  // existing redirects
  ['/applications/starter', '/applications/v7/getting_started'],
  ['/applications/debugging', '/applications/performance/troubleshooting'],
  ['/applications/deploying', '/applications/basics/deployments'],

  // sidenav updates
  ['/applications/webapp_cdn_getting_started', '/applications/getting_started'],
  ['/applications/deploy_apps', '/applications/basics/deployments'],
  [
    '/applications/edgio_config',
    '/applications/performance/cdn_as_code/edgio_config',
  ],
  [
    '/applications/basics/edgio_config',
    '/applications/performance/cdn_as_code/edgio_config',
  ],
  ['/applications/environments', '/applications/basics/environments'],
  ['/applications/production', '/applications/basics/domains'],
  ['/applications/teams', '/applications/basics/collaboration'],
  ['/applications/cli', '/applications/develop/cli'],
  ['/applications/deploy_to_edgio', '/applications/develop/deploy_to_edgio'],
  ['/applications/logs', '/applications/develop/logs'],
  ['/applications/packages', '/applications/develop/packages'],
  ['/applications/bigcommerce', '/applications/v6/integrations/bigcommerce'],
  ['/applications/bloomreach', '/applications/v6/integrations/bloomreach'],
  [
    '/applications/shopify_hydrogen',
    '/applications/v6/integrations/shopify_hydrogen',
  ],
  ['/applications/swell', '/applications/v6/integrations/swell'],
  ['/applications/wordpress', '/applications/v6/integrations/wordpress'],
  ['/applications/caching', '/applications/performance/caching'],
  ['/applications/compression', '/applications/performance/compression'],
  [
    '/applications/edgejs_testing',
    '/applications/performance/unit_testing_edgejs',
  ],
  ['/applications/graphql', '/applications/v4/graphql'],
  [
    '/applications/image_optimization',
    '/applications/performance/image_optimization',
  ],
  ['/applications/observability', '/applications/performance/observability'],
  [
    '/applications/core_web_vitals',
    '/applications/performance/observability/core_web_vitals',
  ],
  [
    '/applications/devtools',
    '/applications/performance/observability/devtools',
  ],
  ['/applications/prefetching', '/applications/performance/prefetching'],
  ['/applications/purging', '/applications/performance/purging'],
  ['/applications/request_headers', '/applications/performance/request'],
  ['/applications/response_headers', '/applications/performance/response'],
  ['/applications/routing', '/applications/performance/cdn_as_code'],
  [
    '/applications/serverless_functions',
    '/applications/performance/serverless_compute',
  ],
  [
    '/applications/third_party_cdns',
    '/applications/performance/third_party_cdns',
  ],
  ['/applications/traffic_splitting', '/applications/v7/experimentation'],
  ['/applications/split_testing', '/applications/v7/experimentation'],
  [
    '/applications/layer0_migration',
    '/applications/reference/layer0_migration',
  ],
  ['/applications/saml', '/applications/collaboration/sso'],
  ['/applications/v5_migration', '/applications/v6/upgrading/v5_migration'],
  [
    '/applications/managed_rule_groups',
    '/applications/security/managed_rule_groups',
  ],
  ['/applications/security_suite', '/applications/security/security_suite'],
  [
    '/applications/security/advanced_bot_management',
    '/applications/security/managed_bot_defense',
  ],
  ['/applications/connectors', '/applications/sites_frameworks/connectors'],
  [
    '/applications/isg',
    '/applications/v7/sites_frameworks/getting_started/nuxt#incremental-static-rendering-isg',
  ],
  [
    '/applications/angular',
    '/applications/sites_frameworks/getting_started/angular',
  ],
  [
    '/applications/astro',
    '/applications/sites_frameworks/getting_started/astro',
  ],
  [
    '/applications/brunch',
    '/applications/v6/sites_frameworks/getting_started/brunch',
  ],
  [
    '/applications/docusaurus',
    '/applications/v6/sites_frameworks/getting_started/docusaurus',
  ],
  [
    '/applications/dojo',
    '/applications/v6/sites_frameworks/getting_started/dojo',
  ],
  [
    '/applications/eleventy',
    '/applications/v6/sites_frameworks/getting_started/eleventy',
  ],
  [
    '/applications/ember',
    '/applications/v6/sites_frameworks/getting_started/ember',
  ],
  [
    '/applications/ember_fastboot',
    '/applications/sites_frameworks/legacy_connectors/ember_fastboot',
  ],
  [
    '/applications/express',
    '/applications/sites_frameworks/getting_started/express',
  ],
  [
    '/applications/frontity',
    '/applications/sites_frameworks/legacy_connectors/frontity',
  ],
  [
    '/applications/gatsby',
    '/applications/sites_frameworks/legacy_connectors/gatsby',
  ],
  [
    '/applications/gridsome',
    '/applications/v6/sites_frameworks/getting_started/gridsome',
  ],
  [
    '/applications/hexo',
    '/applications/sites_frameworks/legacy_connectors/hexo',
  ],
  [
    '/applications/hugo',
    '/applications/v6/sites_frameworks/getting_started/hugo',
  ],
  [
    '/applications/ionic_react',
    '/applications/v6/sites_frameworks/getting_started/ionic_react',
  ],
  [
    '/applications/ionic_vue',
    '/applications/v6/sites_frameworks/getting_started/ionic_vue',
  ],
  [
    '/applications/jekyll',
    '/applications/v6/sites_frameworks/getting_started/jekyll',
  ],
  [
    '/applications/lit',
    '/applications/v6/sites_frameworks/getting_started/lit',
  ],
  [
    '/applications/mkdocs',
    '/applications/sites_frameworks/legacy_connectors/mkdocs',
  ],
  ['/applications/next', '/applications/sites_frameworks/getting_started/next'],
  [
    '/applications/next_commerce',
    '/applications/v6/sites_frameworks/getting_started/next_commerce',
  ],
  ['/applications/nuxt', '/applications/sites_frameworks/getting_started/nuxt'],
  [
    '/applications/nuxt3',
    '/applications/sites_frameworks/getting_started/nuxt3',
  ],
  ['/applications/nx', '/applications/v4/nx'],
  [
    '/applications/preact',
    '/applications/v6/sites_frameworks/getting_started/preact',
  ],
  [
    '/applications/razzle',
    '/applications/sites_frameworks/legacy_connectors/razzle',
  ],
  [
    '/applications/react-storefront',
    '/applications/v6/sites_frameworks/getting_started/react-storefront',
  ],
  [
    '/applications/react',
    '/applications/sites_frameworks/getting_started/react',
  ],
  [
    '/applications/react_static',
    '/applications/v6/sites_frameworks/getting_started/react_static',
  ],
  [
    '/applications/redwoodjs',
    '/applications/v6/sites_frameworks/getting_started/redwoodjs',
  ],
  [
    '/applications/remix',
    '/applications/sites_frameworks/getting_started/remix',
  ],
  [
    '/applications/saber',
    '/applications/v6/sites_frameworks/getting_started/saber',
  ],
  [
    '/applications/sanity',
    '/applications/sites_frameworks/legacy_connectors/sanity',
  ],
  [
    '/applications/sapper',
    '/applications/v6/sites_frameworks/getting_started/sapper',
  ],
  [
    '/applications/scully',
    '/applications/v6/sites_frameworks/getting_started/scully',
  ],
  [
    '/applications/solid',
    '/applications/v6/sites_frameworks/getting_started/solid',
  ],
  [
    '/applications/spartacus',
    '/applications/v6/sites_frameworks/getting_started/spartacus',
  ],
  [
    '/applications/static_sites',
    '/applications/v6/sites_frameworks/getting_started/static_sites',
  ],
  [
    '/applications/stencil',
    '/applications/v6/sites_frameworks/getting_started/stencil',
  ],
  [
    '/applications/svelte',
    '/applications/v6/sites_frameworks/getting_started/svelte',
  ],
  [
    '/applications/umijs',
    '/applications/v6/sites_frameworks/getting_started/umijs',
  ],
  [
    '/applications/vitepress',
    '/applications/v6/sites_frameworks/getting_started/vitepress',
  ],
  [
    '/applications/vsf',
    '/applications/v6/sites_frameworks/getting_started/vsf',
  ],
  ['/applications/vue', '/applications/sites_frameworks/getting_started/vue'],
  [
    '/applications/vuepress',
    '/applications/v6/sites_frameworks/getting_started/vuepress',
  ],
  [
    '/applications/zola',
    '/applications/v6/sites_frameworks/getting_started/zola',
  ],
  [
    '/applications/cookbook',
    '/applications/performance/cdn_as_code/common_routing_patterns',
  ],
  [
    '/applications/static_prerendering',
    '/applications/performance/static_prerendering',
  ],
  [
    '/applications/traditional_sites',
    '/applications/performance/traditional_sites',
  ],
  [
    '/applications/troubleshooting',
    '/applications/performance/troubleshooting',
  ],
  [
    '/applications/reference/layer0_migration',
    '/applications/upgrading/layer0_migration',
  ],
  [
    '/applications/reference/v5_migration',
    '/applications/v6/upgrading/v5_migration',
  ],
  [
    '/applications/reference/v6_migration',
    '/applications/v6/upgrading/v6_migration',
  ],
  ['/applications/bots', '/applications/security'],
  ['/applications/build_web_apps', '/applications/getting_started'],
  [
    '/applications/cookies',
    '/applications/performance/traffic_splitting/a_b_testing',
  ],
  ['/applications/overview', '/applications/performance'],
  ['/applications/regions', '/applications/sites_frameworks#regions'],

  // v4
  ['/applications/v4/v4_accounts_teams', '/applications/v4/alerts'],
  ['/applications/v4/v4_apis', '/applications/v4/rest_api'],
  ['/applications/v4/v4_developer_tools', '/applications/v4/cli'],
  [
    '/applications/v4/v4_getting_started',
    '/applications/v4/webapp_cdn_getting_started',
  ],
  ['/applications/v4/v4_performance', '/applications/v4/routing'],
  ['/applications/v4/v4_reference', '/applications/v4/limits'],
  ['/applications/v4/v4_security', '/applications/v4/security'],
  ['/applications/v4/v4_sites', '/applications/v4/connectors'],
  ['/applications/v4/deploying', '/applications/v7/basics/deployments'],
  ['/applications/v4/getting_started', '/applications/v7/getting_started'],

  // v7
  [
    '/applications/v7/performance/purging',
    '/applications/v7/performance/caching/purging',
  ],
  [
    '/applications/v7/performance/observability/core_web_vitals',
    '/applications/v7/performance/observability/real_user_monitoring',
  ],
  [
    '/applications/v7/performance/cdn_as_code/common_routing_patterns',
    '/applications/v7/performance/cdn_as_code/route_features',
  ],
  [
    '/applications/v7/performance/cdn_as_code/getting_started',
    '/applications/v7/performance/cdn_as_code',
  ],
  [
    '/applications/v7/performance/experiments',
    '/applications/v7/experimentation',
  ],
  ['/applications/v7/edge-functions', '/applications/v7/edge_functions'],
  [
    /\/guides\/v7\/sites_frameworks\/getting_started\/(ember_fastboot|frontity|gatsby|hexo|mkdocs|razzle|sanity)/,
    '/applications/v7/sites_frameworks/legacy_connectors/$1',
  ],
  [
    '/applications/v7/basics/hostnames_and_origins',
    '/applications/v7/basics/hostnames',
  ],
  [
    '/applications/v7/develop/cli',
    '/applications/v7/performance/cdn_as_code/cli',
  ],
  [
    '/applications/v7/develop/rest_api',
    '/applications/v7/rest_api',
  ],
  [
    '/applications/v7/develop/rest_api/(.*)',
    '/applications/v7/rest_api/$1',
  ],
  [/\/guides\/(.*)/, '/applications/$1'],
];

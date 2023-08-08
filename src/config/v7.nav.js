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
          title: 'Properties',
          path: 'basics/properties',
        },
        {
          title: 'Environments',
          path: 'basics/environments',
        },
        {
          title: 'Hostnames and Origins',
          path: 'basics/hostnames_and_origins',
        },
        {
          title: 'Deployments',
          path: 'basics/deployments',
        },
        {
          title: 'Collaboration',
          path: 'basics/collaboration',
        },
        {
          title: 'Alerts',
          path: 'basics/alerts',
        },
        {
          title: 'Account Settings',
          path: 'basics/account_settings',
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
          title: 'Rules',
          path: 'performance/rules',
          routes: [
            {
              title: 'Conditions',
              path: 'performance/rules/conditions',
            },
            {
              title: 'Features',
              path: 'performance/rules/features',
            },
            {
              title: 'Feature Variables',
              path: 'performance/rules/feature_variables',
            },
            {
              title: 'Operators',
              path: 'performance/rules/operators',
            },
          ],
        },
        {
          title: 'CDN-as-Code (EdgeJS)',
          path: 'performance/cdn_as_code',
          routes: [
            {
              title: 'Route Criteria and Conditions',
              path: 'performance/cdn_as_code/route_criteria',
            },
            {
              title: 'Route Features',
              path: 'performance/cdn_as_code/route_features',
            },
            {
              title: 'Error Handling',
              path: 'performance/cdn_as_code/error_handling',
            },
            {
              title: '',
              path: '',
            },
            {
              title: 'edgio.config.js Configuration',
              path: 'performance/cdn_as_code/edgio_config',
            },
          ],
        },
        {
          title: 'Cache Management',
          path: 'performance/caching',
          routes: [
            {
              title: 'Purging Cached Content',
              path: 'performance/caching/purging',
            },
            {
              title: 'Cache Request Flow',
              path: 'performance/caching/cache_request_flow',
            },
            {
              title: 'Cache Hit Ratio Optimization',
              path: 'performance/caching/cache_hit_ratio_optimization',
            },
            {
              title: 'Cache Key',
              path: 'performance/caching/cache_key',
            },
          ],
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
        },
        {
          title: 'Observability',
          path: 'performance/observability',
          routes: [
            {
              title: 'Edge Insights',
              path: 'performance/observability/edge_insights',
            },
            {
              title: 'Real User Monitoring (RUM)',
              path: 'performance/observability/real_user_monitoring',
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
        // {
        //   title: 'Unit Testing (EdgeJS)',
        //   path: 'performance/unit_testing_edgejs',
        // },
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
      title: 'Edge Functions',
      path: 'edge-functions',
      icon: 'edge-functions',
    },
    {
      title: 'Security',
      path: 'security',
      icon: 'shield',
      routes: [
        {
          title: 'Website Security (EdgeJS)',
          path: 'security/edgejs_security',
        },
        {
          title: 'Origin Shield',
          path: 'security/origin_shield',
        },
        {
          title: 'TLS Certificates',
          path: 'security/tls_certificates',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Web Application Firewall (WAF)',
          path: 'security/waf',
        },
        {
          title: 'Getting Started',
          path: 'security/getting_started',
        },
        {
          title: 'Access Rules',
          path: 'security/access_rules',
        },
        {
          title: 'API Security',
          path: 'security/api_security',
        },
        {
          title: 'Rate Rules',
          path: 'security/rate_rules',
        },
        {
          title: 'Bot Manager',
          path: 'security/bot_rules',
        },
        {
          title: 'Custom Rules',
          path: 'security/custom_rules',
        },
        {
          title: 'Managed Rules',
          path: 'security/managed_rules',
        },
        {
          title: 'Security Apps',
          path: 'security/security_applications',
        },
        {
          title: 'Dashboard',
          path: 'security/dashboard',
        },
        {
          title: 'Recent Event Logs',
          path: 'security/recent_event_logs',
        },
        {
          title: 'Response to Client',
          path: 'security/response_to_client',
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
              title: 'Custom Connector',
              path: 'sites_frameworks/getting_started/custom_connector',
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
            // {
            //   title: 'Lit',
            //   path: 'sites_frameworks/getting_started/lit',
            // },
            {
              title: 'MkDocs',
              path: 'sites_frameworks/getting_started/mkdocs',
            },
            {
              title: 'Next.js',
              path: 'sites_frameworks/getting_started/next',
            },
            // {
            //   title: 'Next.js Commerce',
            //   path: 'sites_frameworks/getting_started/next_commerce',
            // },
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
            // {
            //   title: 'React Storefront',
            //   path: 'sites_frameworks/getting_started/react-storefront',
            // },
            // {
            //   title: 'RedwoodJS',
            //   path: 'sites_frameworks/getting_started/redwoodjs',
            // },
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
            // {
            //   title: 'Sapper',
            //   path: 'sites_frameworks/getting_started/sapper',
            // },
            // {
            //   title: 'Scully',
            //   path: 'sites_frameworks/getting_started/scully',
            // },
            {
              title: 'SolidJS',
              path: 'sites_frameworks/getting_started/solid',
            },
            // {
            //   title: 'Spartacus',
            //   path: 'sites_frameworks/getting_started/spartacus',
            // },
            {
              title: 'Static HTML/JS',
              path: 'sites_frameworks/getting_started/static_sites',
            },
            {
              title: 'Stencil',
              path: 'sites_frameworks/getting_started/stencil',
            },
            // {
            //   title: 'Svelte',
            //   path: 'sites_frameworks/getting_started/svelte',
            // },
            // {
            //   title: 'UmiJS',
            //   path: 'sites_frameworks/getting_started/umijs',
            // },
            {
              title: 'VitePress',
              path: 'sites_frameworks/getting_started/vitepress',
            },
            // {
            //   title: 'Vue Storefront',
            //   path: 'sites_frameworks/getting_started/vsf',
            // },
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
      title: 'Logs',
      path: 'logs',
      icon: 'data-plain',
      routes: [
        {
          title: 'Build Logs',
          path: 'logs/build_logs',
        },
        {
          title: 'Server Logs',
          path: 'logs/server_logs',
        },
        {
          title: 'Access Logs',
          path: 'logs/access_logs',
        },
        {
          title: 'Real-Time Log Delivery',
          path: 'logs/rtld',
          routes: [
            {
              title: 'AWS S3 Log Delivery',
              path: 'logs/rtld/aws_s3_log_delivery',
            },
            {
              title: 'Azure Blob Storage Log Delivery',
              path: 'logs/rtld/azure_blob_storage_log_delivery',
            },
            {
              title: 'Datadog Log Delivery',
              path: 'logs/rtld/datadog_log_delivery',
            },
            {
              title: 'Google Cloud Storage Log Delivery',
              path: 'logs/rtld/google_cloud_storage_log_delivery',
            },
            {
              title: 'Splunk Enterprise Log Delivery',
              path: 'logs/rtld/splunk_enterprise_log_delivery',
            },
            {
              title: 'Sumo Logic Log Delivery',
              path: 'logs/rtld/sumo_logic_log_delivery',
            },
            {
              title: 'New Relic Log Delivery',
              path: 'logs/rtld/new_relic_log_delivery',
            },
            {
              title: 'Web Server Log Delivery',
              path: 'logs/rtld/web_server_log_delivery',
            },
            {
              title: '',
              path: '',
            },
            {
              title: 'Filtering Log Data',
              path: 'logs/rtld/filtering_log_data',
            },
            {
              title: 'Log File Naming Convention',
              path: 'logs/rtld/log_file_naming_convention',
            },
            {
              title: 'Log Data Verification',
              path: 'logs/rtld/log_data_verification',
            },
            {
              title: '',
              path: '',
            },
            {
              title: 'Log Fields (RTLD CDN)',
              path: 'logs/rtld/log_fields_rtld_cdn',
            },
            {
              title: 'Log Fields (RTLD WAF)',
              path: 'logs/rtld/log_fields_rtld_waf',
            },
            {
              title: 'Log Fields (RTLD Rate Limiting',
              path: 'logs/rtld/log_fields_rtld_rate_limiting',
            },
            {
              title: 'Log Fields (RTLD Bot)',
              path: 'logs/rtld/log_fields_rtld_bot_manager',
            },
          ],
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
          title: 'EdgeJS API Reference',
          path: 'develop/packages',
          routes: [
            {
              title: '@edgio/core',
              path: '/docs/v7.x/api/core/',
              external: true,
            },
            {
              title: '@edgio/prefetch',
              path: '/docs/v7.x/api/prefetch/',
              external: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Reference',
      path: 'reference',
      icon: 'stacks-plain',
      routes: [
        {
          title: 'Country Codes',
          path: 'reference/country_codes',
        },
        {
          title: 'HTTP Status Codes',
          path: '/guides/performance/response#status-codes',
        },
        {
          title: 'Response Headers',
          path: '/guides/performance/response#response-headers',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Rules',
          path: '',
        },
        {
          title: 'Match Conditions',
          path: '/guides/performance/rules/conditions',
        },
        {
          title: 'Features',
          path: '/guides/performance/rules/features',
        },
        {
          title: 'Feature Variables',
          path: '/guides/performance/rules/feature_variables',
        },
        {
          title: 'Operators',
          path: '/guides/performance/rules/operators',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'CDN-as-Code (EdgeJS)',
          path: '',
        },
        {
          title: '{{ CONFIG_FILE }}',
          path: '/guides/performance/cdn_as_code/edgio_config',
        },
        {
          title: '{{ PACKAGE_NAME }}/core',
          path: '/docs/api/core',
          external: true,
        },
        {
          title: '{{ PACKAGE_NAME }}/prefetch',
          path: '/docs/api/prefetch',
          external: true,
        },
        {
          title: 'CLI',
          path: '/guides/develop/cli#commands',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'REST API',
          path: '',
        },
        {
          title: 'Purge (cache-clear)',
          path: '/guides/develop/rest_api',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'Log Data',
          path: '',
        },
        {
          title: 'Access Logs',
          path: '',
        },
        {
          title: 'Edge Insights',
          path: '/guides/performance/observability/edge_insights',
        },
        {
          title: 'Serverless Compute Console',
          path: '/guides/logs/server_logs#serverless-compute-console-and-dri-log-fields',
        },
        {
          title: '',
          path: '',
        },
        {
          title: 'RTLD',
          path: '',
        },
        {
          title: 'RTLD CDN',
          path: '/guides/logs/rtld/log_fields_rtld_cdn',
        },
        {
          title: 'RTLD WAF',
          path: '/guides/logs/rtld/log_fields_rtld_waf',
        },
        {
          title: 'RTLD Rate Limiting',
          path: '/guides/logs/rtld/log_fields_rtld_rate_limiting',
        },
        {
          title: 'RTLD Bot',
          path: '/guides/logs/rtld/log_fields_rtld_bot_manager',
        },
      ],
    },
    {
      title: 'Upgrading',
      path: 'upgrading',
      icon: 'add-circle',
    },
  ],
};
export default nav;

import {productsConfig} from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['applications'].pathPrefix,
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
          routes: [
            {
              title: 'Create Self-Hosted Property',
              path: 'basics/properties/create_self_hosted',
            },
            {
              title: `Create using CLI`,
              path: 'basics/properties/create_using_cli',
            },
            {
              title: 'Create from Template',
              path: 'basics/properties/create_from_template',
            },
            {
              title: `Create from GitHub`,
              path: 'basics/properties/create_from_github',
            },
          ],
        },
        {
          title: 'Environments',
          path: 'basics/environments',
        },
        {
          title: 'Hostnames',
          path: 'basics/hostnames',
        },
        {
          title: 'Origin Configurations',
          path: 'basics/origins',
        },
        {
          title: 'Deployments',
          path: 'basics/deployments',
        },
        {
          title: 'Serving Traffic through Our Network',
          path: 'basics/serving_traffic',
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
              title: 'Request Matching Scenarios',
              path: 'performance/rules/request_matching_scenarios',
            },
            {
              title: 'Feature Scenarios',
              path: 'performance/rules/feature_scenarios',
            },
            separator,
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
              title: 'Conditional Routes',
              path: 'performance/cdn_as_code/conditional_routes',
            },
            {
              title: 'Error Handling',
              path: 'performance/cdn_as_code/error_handling',
            },
            separator,
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
            separator,
            {
              title: 'Cache Status Codes',
              path: 'performance/caching/cache_status_codes',
            },
          ],
        },
        // {
        // title: 'Static Prerendering',
        // path: 'performance/static_prerendering',
        // },
        {
          title: 'Predictive Prefetch',
          path: 'performance/prefetching',
          routes: [
            {
              title: 'Prefetching with a Script Tag',
              path: 'performance/prefetching/prefetching_script_tag',
            },
            {
              title: 'Prefetching with Edgio Sites',
              path: 'performance/prefetching/prefetching_edgio_sites',
            },
          ],
        },
        {
          title: 'Redirects',
          path: 'performance/redirects',
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
              title: 'Edgio Developer Tools Chrome Extension',
              path: 'performance/observability/developer_tools_chrome_extension',
            },
            {
              title: 'Devtools',
              path: 'performance/observability/devtools',
            },
          ],
        },
        {
          title: 'Cloud Functions',
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
        separator,
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
        separator,
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
      path: 'edge_functions',
      icon: 'edge-functions',
      routes: [
        {
          title: 'Caching',
          path: 'edge_functions/caching',
        },
        {
          title: 'Fetching from Cloud Functions',
          path: 'edge_functions/fetch_cloud_functions',
        },
        {
          title: 'HtmlTransformer',
          path: 'edge_functions/htmltransformer',
        },
        separator,
        {
          title: 'Examples',
          path: 'edge_functions/examples',
          routes: [
            {
              title: 'AWS Request Signing',
              path: 'edge_functions/examples/aws_request_signing',
            },
            {
              title: 'Basic Request Signing',
              path: 'edge_functions/examples/basic_request_signing',
            },
            {
              title: 'Content Stitching',
              path: 'edge_functions/examples/content_stitching',
            },
            {
              title: 'Header Manipulation',
              path: 'edge_functions/examples/header_manipulation',
            },
            {
              title: 'JSON Responses',
              path: 'edge_functions/examples/json_responses',
            },
            {
              title: 'JWT Verification',
              path: 'edge_functions/examples/jwt_verification',
            },
            {
              title: 'Redirects',
              path: 'edge_functions/examples/redirects',
            },
            {
              title: 'Waiting Room',
              path: 'edge_functions/examples/waiting_room',
            },
          ],
        },
        separator,
        {
          title: 'Migrating from Cloudflare Workers',
          path: 'edge_functions/migrating_cloudflare_workers',
        },
        {
          title: 'Migrating from CloudFront Functions',
          path: 'edge_functions/migrating_cloudfront_functions',
        },
      ],
    },
    {
      title: 'Experimentation',
      path: 'experimentation',
      icon: 'experimentation',
      routes: [
        {
          title: 'Cross-Environment Traffic Splitting',
          path: 'experimentation/cross_environment_traffic_splitting',
        },
        {
          title: 'Basic Traffic Splitting Tutorial',
          path: 'experimentation/basic_traffic_splitting_tutorial',
        },
        {
          title: 'Iterative Migration Tutorial',
          path: 'experimentation/iterative_migration_tutorial',
        },
      ],
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
          title: 'Attack Surface Management - BETA',
          path: 'security/asm',
        },
        separator,
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
          title: 'Client-Side Protection',
          path: 'security/client_side_protection',
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
          title: 'Matched On Variables',
          path: 'security/matched_on_variables',
        },
        {
          title: 'Response to Client',
          path: 'security/response_to_client',
        },
      ],
    },
    {
      title: 'AI Integrations',
      path: 'ai_integrations',
      icon: 'ai-integrations',
      routes: [
        {
          title: 'LangChain',
          path: 'ai_integrations/langchain',
        },
        {
          title: 'LlamaIndex',
          path: 'ai_integrations/llamaindex',
        },
        {
          title: 'Mistral',
          path: 'ai_integrations/mistral',
        },
        {
          title: 'Cohere',
          path: 'ai_integrations/cohere',
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
              title: 'Node.js Connector',
              path: 'sites_frameworks/getting_started/nodejs_connector',
            },
            {
              title: 'Express',
              path: 'sites_frameworks/getting_started/express',
            },
            {
              title: 'Next.js',
              path: 'sites_frameworks/getting_started/next',
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
              title: 'Qwik',
              path: 'sites_frameworks/getting_started/qwik',
            },
            {
              title: 'React',
              path: 'sites_frameworks/getting_started/react',
            },
            {
              title: 'SvelteKit',
              path: 'sites_frameworks/getting_started/sveltekit',
            },
            {
              title: 'Vue.js',
              path: 'sites_frameworks/getting_started/vue',
            },
          ],
        },
        {
          title: 'Legacy Connectors',
          path: 'sites_frameworks/legacy_connectors',
          routes: [
            {
              title: 'Ember Fastboot',
              path: 'sites_frameworks/legacy_connectors/ember_fastboot',
            },
            {
              title: 'Frontity',
              path: 'sites_frameworks/legacy_connectors/frontity',
            },
            {
              title: 'Gatsby',
              path: 'sites_frameworks/legacy_connectors/gatsby',
            },
            {
              title: 'Hexo',
              path: 'sites_frameworks/legacy_connectors/hexo',
            },
            {
              title: 'Mkdocs',
              path: 'sites_frameworks/legacy_connectors/mkdocs',
            },
            {
              title: 'Razzle',
              path: 'sites_frameworks/legacy_connectors/razzle',
            },
            {
              title: 'Sanity',
              path: 'sites_frameworks/legacy_connectors/sanity',
            },
          ],
        },
        {
          title: 'Connectors',
          path: 'sites_frameworks/connectors',
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
            separator,
            {
              title: 'Filtering Log Data',
              path: 'logs/rtld/filtering_log_data',
            },
            {
              title: 'Custom Log Fields (RTLD CDN)',
              path: 'logs/rtld/custom_log_fields',
            },
            {
              title: 'Log File Naming Convention',
              path: 'logs/rtld/log_file_naming_convention',
            },
            {
              title: 'Log Data Verification',
              path: 'logs/rtld/log_data_verification',
            },
            separator,
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
            {
              title: 'Log Fields (RTLD Cloud Functions)',
              path: 'logs/rtld/log_fields_rtld_cloud_functions',
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
          routes: [
            {
              title: 'Authentication',
              path: 'develop/rest_api/authentication',
            },
            {
              title: 'Using the Metrics REST API',
              path: 'develop/rest_api/metrics_rest_api_usage',
            },
            {
              title: 'REST API Reference',
              path: '/rest_api/',
              external: true,
            },
            separator,
            {
              title: 'Legacy Purge (Clear-Cache)',
              path: 'develop/rest_api/cache_purge',
            },
          ],
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
          path: 'performance/response#status-codes',
        },
        {
          title: 'Response Headers',
          path: 'performance/response#response-headers',
        },
        separator,
        {
          title: 'Rules - Match Conditions',
          path: 'performance/rules/conditions',
        },
        {
          title: 'Rules - Features',
          path: 'performance/rules/features',
        },
        {
          title: 'Rules - Feature Variables',
          path: 'performance/rules/feature_variables',
        },
        {
          title: 'Rules - Operators',
          path: 'performance/rules/operators',
        },
        separator,
        {
          title: 'edgio.config.js Configuration',
          path: 'performance/cdn_as_code/edgio_config',
        },
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
        {
          title: 'CLI',
          path: 'develop/cli#commands',
        },
        separator,
        {
          title: 'REST API Reference',
          path: '/rest_api/',
          external: true,
        },
        {
          title: 'Legacy Purge API',
          path: 'develop/rest_api/cache_purge',
        },
        separator,
        {
          title: 'RTLD CDN',
          path: 'logs/rtld/log_fields_rtld_cdn',
        },
        {
          title: 'RTLD WAF',
          path: 'logs/rtld/log_fields_rtld_waf',
        },
        {
          title: 'RTLD Rate Limiting',
          path: 'logs/rtld/log_fields_rtld_rate_limiting',
        },
        {
          title: 'RTLD Bot',
          path: 'logs/rtld/log_fields_rtld_bot_manager',
        },
      ],
    },
    {
      title: 'Upgrading',
      path: 'upgrading',
      icon: 'add-circle',
      routes: [
        {
          title: 'Upgrading to Version 7',
          path: 'upgrading/upgrading',
        },
        {
          title: `Updating Packages`,
          path: 'upgrading/updating_packages',
        },
      ],
    },
  ],
};
export default nav;

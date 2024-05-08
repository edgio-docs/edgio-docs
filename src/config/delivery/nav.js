import { productsConfig } from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['delivery'].pathPrefix,
  routes: [
    {
      title: 'Overview',
      path: 'index',
    },
    {
      title: 'Delivery',
      path: 'delivery',
      routes: [
        {
          title: 'User Guide',
          path: 'delivery/guide',
          routes: [
            {
              title: 'Getting Started',
              path: 'delivery/guide/getting_started',
            },
            {
              title: 'Key Concepts',
              path: 'delivery/guide/key_concepts',
            },
            {
              title: 'Features',
              path: 'delivery/guide/features',
            },
            {
              title: 'Options',
              path: 'delivery/guide/options',
            },
            {
              title: 'Technologies',
              path: 'delivery/guide/technologies',
            },
            {
              title: 'Implementation',
              path: 'delivery/guide/implementation',
            },
            {
              title: 'Management',
              path: 'delivery/guide/management',
            },
          ],
        },
        {
          title: 'MediaVault',
          path: 'delivery/mediavault',
          routes: [
            {
              title: 'Parameters',
              path: 'delivery/mediavault/mediavault_parameters',
            },
            {
              title: 'Configuration',
              path: 'delivery/mediavault/path_and_cookie_based_mediavault',
            },
            {
              title: 'Security',
              path: 'delivery/mediavault/security',
            },
            {
              title: 'File Extensions',
              path: 'delivery/mediavault/file_extensions',
            },
            {
              title: 'Selective URL Handling',
              path: 'delivery/mediavault/selective_url_handling',
            },
            {
              title: 'PHP Example',
              path: 'delivery/mediavault/php_example',
            },
          ],
        },
        {
          title: 'SmartPurge',
          path: 'delivery/smartpurge',
          routes: [
            {
              title: 'User Guide',
              path: 'delivery/smartpurge/user_guide',
            },
            {
              title: 'REST API',
              path: 'delivery/smartpurge/smartpurge_rest_api',
            },
          ],
        },
      ],
    },
    {
      title: 'APIs',
      path: 'apis',
      routes: [
        {
          title: 'Billing',
          path: 'edge_functions/caching',
        },
        {
          title: 'Fetching from Cloud Functions',
          path: 'https://support.limelight.com/public/openapi/configuration/index.html',
        },
        {
          title: 'Configuration',
          path: 'https://support.limelight.com/public/openapi/configuration/index.html',
        },
        {
          title: 'Realtime Reporting',
          path: 'https://support.limelight.com/public/openapi/realtimereporting/index.html',
        },
        separator,
        {
          title: 'Allow List',
          path: 'https://control.llnw.com/aportal/support/documentation/iprssfeed/v2',
        },
        {
          title: 'API Structure',
          path: 'control/support_tools/api_structure',
        },
        {
          title: 'API Terminology',
          path: 'control/support_tools/api_terminology',
        },
        {
          title: 'Global Time',
          path: 'control/support_tools/global_time',
        },
      ],
    },
    {
      title: 'Control',
      path: 'control',
      routes: [
        {
          title: 'APIs',
          path: 'control/apis',
          routes: [
            {
              title: 'Billing',
              path: 'https://support.limelight.com/public/openapi/configuration/index.html',
            },
            {
              title: 'Configuration',
              path: 'https://support.limelight.com/public/openapi/configuration/index.html',
            },
            {
              title: 'Realtime Reporting',
              path: 'https://support.limelight.com/public/openapi/realtimereporting/index.html',
            },
            separator,
            {
              title: 'Allow List',
              path: 'https://control.llnw.com/aportal/support/documentation/iprssfeed/v2',
            },
            {
              title: 'API Explorer',
              path: 'https://support.limelight.com/public/explorer/llnw-api-explorer.html',
            },
            {
              title: 'API Structure',
              path: 'control/support_tools/api_structure',
            },
            {
              title: 'API Terminology',
              path: 'control/support_tools/api_terminology',
            },
            {
              title: 'Global Time',
              path: 'control/support_tools/global_time',
            },
          ],
        },
        {
          title: 'Configure',
          path: 'control/configure',
          routes: [
            {
              title: 'Caching and Delivery',
              path: 'control/configure/caching_and_delivery',
            },
            {
              title: 'Chunked Streaming',
              path: 'control/configure/chunked_streaming',
            },
            {
              title: 'DNS Services',
              path: 'control/configure/dns_services',
            },
            {
              title: 'Intelligent Ingest',
              path: 'control/configure/intelligent_ingest',
            },
            {
              title: 'Live Streaming',
              path: 'control/configure/live_streaming',
            },
            {
              title: 'Log Delivery Service',
              path: 'control/configure/log_delivery_service',
            },
            {
              title: 'MediaVault URLs',
              path: 'control/configure/mediavault_hash_generator',
            },
            {
              title: 'SSL Certificates',
              path: 'control/configure/ssl_certificates',
            },
          ],
        },
        {
          title: 'Manage',
          path: 'control/manage',
          routes: [
            {
              title: 'Account',
              path: 'control/manage/account',
            },
            {
              title: 'Authentication',
              path: 'control/manage/authentication',
            },
            {
              title: 'Content with SmartPurge',
              path: 'control/manage/content_with_smartpurge',
            },
            {
              title: 'Control Portal Users',
              path: 'control/manage/control_portal_users',
            },
            {
              title: 'Origin Storage Users',
              path: 'control/manage/origin_storage_users',
            },
          ],
        },
        {
          title: 'Analyze',
          path: 'control/reports',
          routes: [
            {
              title: 'General Information',
              path: 'control/reports/general_information/general_information',
            },
            separator,
            {
              title: 'Billing',
              path: 'control/reports/traffic/billing',
            },
            {
              title: 'CMCD',
              path: 'control/reports/traffic/cmcd',
            },
            {
              title: 'DNS Overview',
              path: 'control/reports/traffic/dns_overview',
            },
            {
              title: 'LDS Overview',
              path: 'control/reports/traffic/lds_overview',
            },
            {
              title: 'Live Push',
              path: 'control/reports/traffic/live_push',
            },
            {
              title: 'Live Stats',
              path: 'control/reports/traffic/live_stats',
            },
            {
              title: 'Service Provider Traffic',
              path: 'control/reports/traffic/service_provider_traffic',
            },
            {
              title: 'Traffic',
              path: 'control/reports/traffic/traffic',
            },
            {
              title: 'Transit',
              path: 'control/reports/traffic/transit',
            },
            {
              title: 'Unified Traffic',
              path: 'control/reports/traffic/unified_traffic',
            },
            separator,
            {
              title: 'Origin Storage',
              path: 'control/reports/content/origin_storage',
            },
            {
              title: 'Status Codes',
              path: 'control/reports/content/status_codes',
            },
          ],
        },
      ],
    },
    {
      title: 'Storage',
      path: 'storage',
    },
    {
      title: 'Video',
      path: 'video',
    },
  ],
};

export default nav;

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
      title: 'APIs',
      path: 'apis',
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
              path: 'control/apis/billing',
            },
            {
              title: 'Configuration',
              path: 'control/apis/configuration',
            },
            {
              title: 'Realtime Reporting',
              path: 'control/apis/realtime_reporting',
            },
            separator,
            {
              title: 'IP Allow List',
              path: 'control/support_tools/ip_allow_list',
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
              title: 'Intelligent Ingest',
              path: 'control/configure/intelligent_ingest',
            },
            {
              title: 'Chunked Streaming',
              path: 'control/configure/chunked_streaming',
            },
            {
              title: 'MP3 Streaming',
              path: 'control/configure/mp3_streaming',
            },
            {
              title: 'DNS Services',
              path: 'control/configure/dns_services',
            },
            {
              title: 'MediaVault Hash Generator',
              path: 'control/configure/mediavault_hash_generator',
            },
            {
              title: 'SSL Certificates',
              path: 'control/configure/ssl_certificates',
            },
            {
              title: 'Log Delivery Service',
              path: 'control/configure/log_delivery_service',
            },
            {
              title: 'Live Streaming',
              path: 'control/configure/live_streaming',
            },
          ],
        },
        {
          title: 'Manage',
          path: 'control/manage',
          routes: [
            {
              title: 'My Account',
              path: 'control/manage/my_account',
            },
            {
              title: 'Content with SmartPurge',
              path: 'control/manage/content_with_smartpurge',
            },
            {
              title: 'Authentication',
              path: 'control/manage/authentication',
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
          title: 'Reports',
          path: 'control/reports',
          routes: [
            {
              title: 'General Information',
              path: 'control/reports/general_information',
            },
            separator
            {
              title: 'Billing',
              path: 'control/reports/billing',
            },
            {
              title: 'CMCD',
              path: 'control/reports/cmcd',
            },
            {
              title: 'DNS Overview',
              path: 'control/reports/dns_overview',
            },
            {
              title: 'LDS Overview',
              path: 'control/reports/lds_overview',
            },
            {
              title: 'Live Push',
              path: 'control/reports/live_push',
            },
            {
              title: 'Service Provider Traffic',
              path: 'control/reports/service_provider_traffic',
            },
            {
              title: 'Traffic',
              path: 'control/reports/traffic',
            },
            {
              title: 'Unified Traffic',
              path: 'control/reports/unified_traffic',
            },
            separator
            {
              title: 'Origin Storage',
              path: 'control/reports/origin_storage',
            },
            {
              title: 'Realtime Live Event Overview',
              path: 'control/reports/realtime_live_event_overview',
            },
            {
              title: 'Status Codes',
              path: 'control/reports/status_codes',
            },
            {
              title: 'URL Prefixes',
              path: 'control/reports/url_prefixes',
            },
          ],
        },
      ],
    },
    {
      title: 'Delivery',
      path: 'delivery',
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

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
      title: 'Overvew',
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
              path: 'control/apis/ip_allow_list',
            },
            {
              title: 'Global Time',
              path: 'control/apis/global_time',
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

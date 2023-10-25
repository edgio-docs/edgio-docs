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
      title: 'Rules',
      path: 'performance/rules',
      icon: 'trend',
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
      title: 'Predictive Prefetching',
      path: 'performance/prefetching',
    },
    {
      title: 'Experimentation',
      path: 'experimentation',
      icon: 'experimentation',
    },
    {
      title: 'Image Optimization',
      path: 'performance/image_optimization',
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
      title: 'Troubleshooting',
      path: 'performance/troubleshooting',
    },
    {
      title: 'Limits',
      path: 'performance/limits',
    },
    {
      title: 'Analytics & Logs',
      path: 'logs',
      icon: 'data-plain',
      routes: [
        {
          title: 'Edge Insights',
          path: 'performance/observability/edge_insights',
        },
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
      title: 'Upgrading to Version 7',
      path: 'upgrading/upgrading',
      icon: 'add-circle',
    },
  ],
};
export default nav;

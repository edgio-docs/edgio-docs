import { productsConfig } from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['uplynk'].pathPrefix,
  routes: [
    {
      title: 'Overview',
      path: 'overview',
      icon: 'uplynk/overview',
      routes: [
        {
          title: 'Inputs and Outputs',
          path: 'overview/inputs_outputs',
        },
        {
          title: 'Features',
          path: 'overview/features',
        },
        {
          title: 'Glossary',
          path: 'overview/glossary',
        },
        {
          title: 'Portal',
          path: 'overview/portal',
        },
        {
          title: 'News and Updates',
          path: 'https://cms.uplynk.com/static/cms/news.html',
        },
      ],
    },
    {
      title: 'Get Started',
      path: 'get_started',
      icon: 'spark',
      routes: [
        {
          title: 'Accounts',
          path: 'get_started/accounts',
        },
        {
          title: 'Acquire',
          path: 'get_started/acquire',
        },
        {
          title: 'Manage',
          path: 'get_started/manage',
        },
        {
          title: 'Monetize',
          path: 'get_started/monetize',
          routes: [
            {
              title: 'Ads',
              path: 'get_started/monetize/ads',
            },
            {
              title: 'Syndication',
              path: 'get_started/monetize/syndication',
            },
          ],
        },
        {
          title: 'Deliver',
          path: 'get_started/deliver',
        },
      ],
    },
    {
      title: 'Acquire',
      path: 'acquire',
      icon: 'server',
      routes: [
        {
          title: 'Encoding Profiles',
          path: 'acquire/encoding_profiles',
        },
        {
          title: 'Captions and Subtitles',
          path: 'acquire/captions_and_subtitles',
        },
        {
          title: 'VOD',
          path: 'acquire/vod',
          routes: [
            {
              title: 'Add Content',
              path: 'acquire/vod/add_content',
            },
            {
              title: 'Automate via Slicebot',
              path: 'acquire/vod/automation_via_slicebot',
            },
            {
              title: 'VOD Uploader',
              path: 'acquire/vod/vod_uploader',
            },
          ],
        },
        {
          title: 'Live',
          path: 'acquire/live',
          routes: [
            {
              title: 'Cloud Slicer Live',
              path: 'acquire/live/cloud_slicer_live',
            },
            {
              title: 'On Prem/Live Slicer',
              path: 'acquire/live/on_prem_slicer',
            },
            {
              title: 'Failover',
              path: 'acquire/live/failover',
            },
            {
              title: 'Health Monitoring',
              path: 'acquire/live/health_monitoring',
            },
            {
              title: 'SCTE Plugins',
              path: 'acquire/live/scte_plugins',
            },
            {
              title: 'Troubleshooting',
              path: 'acquire/live/troubleshooting',
            },
          ],
        },
      ],
    },
    {
      title: 'Manage',
      path: 'manage',
      icon: 'server',
      routes: [
        {
          title: 'Assets',
          path: 'manage/assets',
          routes: [
            {
              title: 'Content Management',
              path: 'manage/assets/content_management',
            },
            {
              title: 'Virtual Linear Playlists and Smartstart',
              path: 'manage/assets/virtual_linear_playlists_and_smartstart',
            },
            {
              title: 'Reprocessing',
              path: 'manage/assets/reprocessing',
            },
            {
              title: 'Boundaries',
              path: 'manage/assets/boundaries',
            },
          ],
        },
        {
          title: 'Channels',
          path: 'manage/channels',
          routes: [
            {
              title: 'Linear',
              path: 'manage/channels/linear',
            },
            {
              title: 'Virtual Linear',
              path: 'manage/channels/virtual_linear',
            },
          ],
        },
        {
          title: 'Live Events',
          path: 'manage/live_events',
        },
        {
          title: 'Content Protection',
          path: 'manage/content_protection',
          routes: [
            {
              title: 'Studio DRM',
              path: 'manage/content_protection/studio_drm',
            },
            {
              title: 'Apple FPS',
              path: 'manage/content_protection/apple_fps',
            },
            {
              title: 'DASH',
              path: 'manage/content_protection/dash',
            },
            {
              title: 'Geoblocking',
              path: 'manage/content_protection/geoblocking',
            },
            {
              title: 'Blackout',
              path: 'manage/content_protection/blackout',
            },
            {
              title: 'Conditional and Reverse Blackout',
              path: 'manage/content_protection/conditional_and_reverse_blackout',
            },
          ],
        },
        {
          title: 'Clipping',
          path: 'manage/clipping',
        },
        {
          title: 'Health Notifications via Amazon SNS',
          path: 'manage/health_notifications_via_amazon_sns',
        },
      ],
    },
    {
      title: 'Monetize',
      path: 'monetize',
      icon: 'server',
      routes: [
        {
          title: 'Syndication',
          path: 'monetize/syndication',
        },
        {
          title: 'Ads',
          path: 'monetize/ads',
          routes: [
            {
              title: 'Universal Ad Configuration',
              path: 'monetize/ads/universal_ad_configuration',
            },
            {
              title: 'Google Ad Manager',
              path: 'monetize/ads/google_ad_manager',
            },
            {
              title: 'FreeWheel',
              path: 'monetize/ads/freewheel',
            },
            {
              title: 'Ad Debug',
              path: 'monetize/ads/ad_debug',
            },
          ],
        },
      ],
    },
    {
      title: 'Deliver',
      path: 'deliver',
      icon: 'server',
      routes: [
        {
          title: 'Playback URLS',
          path: 'deliver/playback_urls',
          routes: [
            {
              title: 'Customize Playback via Parameters',
              path: 'deliver/playback_urls/customize_playback_via_parameters',
            },
            {
              title: 'Sign a Playback URL',
              path: 'deliver/playback_urls/sign_playback_url',
            },
          ],
        },
        {
          title: 'Media Player',
          path: 'deliver/media_player',
          routes: [
            {
              title: 'Embed Media Player',
              path: 'deliver/media_player/embed_media_player',
            },
            {
              title: 'Add Media Player to Web Page',
              path: 'deliver/media_player/add_media_player_to_web_page',
            },
          ],
        },
      ],
    },
    {
      title: 'Analyze',
      path: 'analyze',
      icon: 'server',
      routes: [
        {
          title: 'Reports',
          path: 'analyze/reports',
        },
        {
          title: 'Log File Delivery',
          path: 'analyze/log_file_delivery',
        },
        {
          title: 'Ad Log File Delivery',
          path: 'analyze/ad_log_file_delivery',
        },
      ],
    },
  ],
};

export default nav;

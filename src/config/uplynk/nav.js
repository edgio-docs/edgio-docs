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
          path: 'overview/news_updates',
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
        },
        {
          title: 'Live',
          path: 'acquire/live',
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
        },
        {
          title: 'Channels',
          path: 'manage/channels',
        },
        {
          title: 'Live Events',
          path: 'manage/live_events',
        },
        {
          title: 'Content Protection',
          path: 'manage/content_protection',
        },
      ],
    },
    {
      title: 'Monetize',
      path: 'monetize',
      icon: 'server',
      routes: [
        {
          title: 'Syndication Publishing',
          path: 'monetize/syndication_publishing',
        },
        {
          title: 'Ads',
          path: 'monetize/ads',
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
        },
        {
          title: 'Media Player',
          path: 'deliver/media_player',
        },
        {
          title: 'StreamStats for API',
          path: 'deliver/streamstats',
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

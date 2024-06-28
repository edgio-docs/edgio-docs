import {IconEdgioApplications} from 'components/Icon';
import {IconDelivery} from 'components/Icon/IconDelivery';
import {IconOpenEdge} from 'components/Icon/IconOpenEdge';
import {IconUplynk} from 'components/Icon/IconUplynk';
import {HomepageSectionGroup} from 'utils/Types';

export const sections: HomepageSectionGroup[] = [
  {
    heading: 'Applications',
    subheading: 'Build lightning fast, secured web and app experiences.',
    className: 'applications',
    icon: IconEdgioApplications,
    path: '/applications',
    sections: [
      {
        title: 'Basics',
        path: 'basics',
        items: [
          {
            title: 'Getting Started',
            path: '/applications/getting_started',
          },
          {
            title: 'Properties',
            path: 'properties',
          },
          {
            title: 'Environments',
            path: 'environments',
          },
          {
            title: 'Hostnames',
            path: 'hostnames',
          },
          {
            title: 'Origin Configurations',
            path: 'origins',
          },
          {
            title: 'Deployments',
            path: 'deployments',
          },
          {
            title: 'Serving Traffic',
            path: 'serving_traffic',
          },
          {
            title: 'Collaboration',
            path: 'collaboration',
          },
        ],
      },
      {
        title: 'Performance',
        path: 'performance',
        items: [
          {
            title: 'Getting Started',
            path: 'getting_started',
          },
          {
            title: 'Rules',
            path: 'rules',
          },
          {
            title: 'CDN-as-Code (EdgeJS)',
            path: 'cdn_as_code',
          },
          {
            title: 'Experimentation',
            path: '../experimentation',
          },
          {
            title: 'Edge Functions',
            path: '../edge_functions',
          },
          {
            title: 'Redirects',
            path: 'redirects',
          },
          {
            title: 'Predictive Prefetching',
            path: 'prefetching',
          },
          {
            title: 'Edge Insights',
            path: 'observability/edge_insights',
          },
          {
            title: 'Cloud Functions',
            path: 'serverless_compute',
          },
          {
            title: 'Image Optimization',
            path: 'image_optimization',
          },
          {
            title: 'Cache Management',
            path: 'caching',
          },
        ],
      },
      {
        title: 'Security',
        path: 'security',
        items: [
          {
            title: 'Getting Started',
            path: 'getting_started',
          },
          {
            title: 'Access Rules',
            path: 'access_rules',
          },
          {
            title: 'API Security',
            path: 'api_security',
          },
          {
            title: 'Rate Rules',
            path: 'rate_rules',
          },
          {
            title: 'Bot Manager',
            path: 'bot_rules',
          },
          {
            title: 'Custom Rules',
            path: 'custom_rules',
          },
          {
            title: 'Managed Rules',
            path: 'managed_rules',
          },
          {
            title: 'Client-Side Protection',
            path: 'client_side_protection',
          },
          {
            title: 'Security Apps',
            path: 'security_applications',
          },
          {
            title: 'Dashboard',
            path: 'dashboard',
          },
        ],
      },
      {
        title: 'Sites',
        path: 'sites_frameworks',
        items: [
          {
            title: 'Next.js',
            path: 'getting_started/next',
          },
          {
            title: 'Nuxt3',
            path: 'getting_started/nuxt3',
          },
          {
            title: 'Express',
            path: 'getting_started/express',
          },
          {
            title: 'React',
            path: 'getting_started/react',
          },
          {
            title: 'Vue.js',
            path: 'getting_started/vue',
          },
          {
            title: 'Additional Frameworks',
            path: 'getting_started',
          },
        ],
      },
      {
        title: 'REST API',
        path: 'rest_api',
        items: [
          {
            title: 'Authentication',
            path: '/applications/rest_api/authentication',
          },
          {
            title: 'REST API Reference',
            path: '/rest_api/',
            external: true,
          },
        ],
      },
    ],
  },

  {
    heading: 'Delivery',
    subheading:
      'Designed for high-quality, reliable streaming, and large-scale downloads.',
    className: 'delivery',
    icon: IconDelivery,
    path: '/delivery',
    sections: [
      {
        title: 'CDN',
        path: '/delivery/delivery',
        items: [
          {
            title: 'Getting Started',
            path: '/delivery/delivery/guide/getting_started',
          },
          {
            title: 'Delivery Guide',
            path: '/delivery/delivery/guide',
          },
          {
            title: 'MediaVault',
            path: '/delivery/delivery/mediavault',
          },
          {
            title: 'Storage Quick Start',
            path: '/delivery/storage/quick_start',
          },
          {
            title: 'SmartPurge',
            path: '/delivery/delivery/smartpurge',
          },
        ],
      },
      {
        title: 'APIs',
        path: '/delivery/apis',
        items: [
          {
            title: 'Billing',
            path: 'https://support.limelight.com/public/openapi/billing/index.html',
          },
          {
            title: 'Configuration',
            path: 'https://support.limelight.com/public/openapi/configuration/index.html',
          },
          {
            title: 'SmartPurge',
            path: '/delivery/delivery/smartpurge/smartpurge_rest_api',
          },
          {
            title: 'API Explorer',
            path: 'https://developers.limelight.com/explorer/',
          },
        ],
      },
      {
        title: 'Control Portal',
        path: '/delivery/control',
        items: [
          {
            title: 'Billing Report',
            path: '/delivery/control/reports/traffic/billing',
          },
          {
            title: 'Caching & Delivery',
            path: '/delivery/control/configure/caching_and_delivery',
          },
          {
            title: 'Chunked Streaming',
            path: '/delivery/control/configure/chunked_streaming',
          },
          {
            title: 'Live Stats Report',
            path: '/delivery/control/reports/traffic/live_stats',
          },
          {
            title: 'Log Delivery Service',
            path: '/delivery/control/configure/log_delivery_service',
          },
          {
            title: 'Traffic Report',
            path: '/delivery/control/reports/traffic/traffic',
          },
        ],
      },
    ],
  },
  {
    heading: 'Uplynk',
    subheading: 'Facilitates effortless and versatile content streaming.',
    className: 'uplynk',
    icon: IconUplynk,
    sections: [
      {
        items: [
          {
            title: 'Getting Started',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Setup-Overview.htm',
          },
          {
            title: 'Live Linear',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Linear.htm',
          },
          {
            title: 'Live Events',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Events-2.htm',
          },
          {
            title: 'Live Slicer',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Live-Slicer-Setup.htm',
          },
          {
            title: 'Cloud Slicer Live',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Cloud-Slicer-Live.htm',
          },
          {
            title: 'On-Demand Content',
            path: 'https://docs.edgecast.com/video/index.html#Setup/On-Demand-Content.htm',
          },
          {
            title: 'Channel Scheduler',
            path: 'https://docs.edgecast.com/video/index.html#Develop/Schedule-Entries-API.htm?Highlight=scheduler',
          },
          {
            title: 'Playback URLs',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Playback-URLs.htm',
          },
          {
            title: 'Captions and Subtitles',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Captions-Subtitles.htm',
          },
          {
            title: 'Syndication Publishing',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Syndication-Publishing.htm',
          },
          {
            title: 'Blackout',
            path: 'https://docs.edgecast.com/video/index.html#Security/Blackout.htm',
          },
          {
            title: 'Geoblocking',
            path: 'https://docs.edgecast.com/video/index.html#Security/Geoblocking.htm',
          },
          {
            title: 'Studio DRM',
            path: 'https://docs.edgecast.com/video/index.html#Security/Studio-DRM.htm',
          },
          {
            title: 'Ads',
            path: 'https://docs.edgecast.com/video/index.html#AdIntegration/Ad-Server-Integration.htm',
          },
        ],
      },
    ],
  },
  {
    heading: 'Open Edge',
    subheading: 'Embedded capacity to enhance on-network delivery.',
    className: 'open-edge',
    icon: IconOpenEdge,
    sections: [
      {
        items: [
          {
            title: 'ISP Traffic Report',
            path: 'https://support.limelight.com/public/en/Content/Control/Open_Edge/Open_Edge.htm#Using',
          },
          {
            title: 'Edge Cache',
            path: 'https://support.limelight.com/public/en/Content/Control/Open_Edge/Open_Edge.htm#Cache',
          },
          {
            title: 'FAQs',
            path: 'https://support.limelight.com/public/en/Content/Open_Edge/Open_Edge_FAQs.htm',
          },
        ],
      },
    ],
  },
];

(() => {
  const setHref = (basePath: string, path: string) =>
    path.startsWith('http') || path.startsWith('/')
      ? path
      : `${basePath}/${path}`;

  sections.forEach((section) => {
    if (section.path) {
      section.href = section.path;
    }

    section.sections.forEach((subsection) => {
      if (subsection.path) {
        subsection.href = setHref(section.path!, subsection.path);
      }

      subsection.items.forEach((item) => {
        if (item.path) {
          item.href = setHref(`${section.path}/${subsection.path}`, item.path);
        }
      });
    });
  });
})();

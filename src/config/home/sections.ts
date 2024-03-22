import {IconEdgioApplications, IconEdgioMedia} from 'components/Icon';
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
            path: '',
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
            title: 'Frameworks',
            path: 'getting_started',
          },
        ],
      },
    ],
  },
  {
    heading: 'Uplynk',
    subheading: 'Accelerate and protect your streaming media business.',
    className: 'uplynk',
    icon: IconEdgioMedia,
    sections: [
      {
        title: 'Uplynk',
        path: 'https://docs.edgecast.com/video/index.html',
        items: [
          {
            title: 'Getting Started',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Setup-Overview.htm%3FTocPath%3DBasic%2520Setup%7C_____0',
          },
          {
            title: 'Live Linear',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Linear.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Linear%7C_____0',
          },
          {
            title: 'Live Events',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Events-2.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Events%7C_____0',
          },
          {
            title: 'Live Slicer',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Live-Slicer-Setup.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Slicer%7C_____0',
          },
          {
            title: 'Cloud Slicer Live',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Cloud-Slicer-Live.htm%3FTocPath%3DBasic%2520Setup%7C_____4',
          },
          {
            title: 'On-Demand Content',
            path: 'https://docs.edgecast.com/video/index.html#Setup/On-Demand-Content.htm%3FTocPath%3DBasic%2520Setup%7COn-Demand%2520Content%7C_____0',
          },
          {
            title: 'Playback URLs',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Playback-URLs.htm%3FTocPath%3DBasic%2520Setup%7CPlayback%2520URLs%7C_____0',
          },
          {
            title: 'Captions and Subtitles',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Captions-Subtitles.htm%3FTocPath%3DBasic%2520Setup%7CCaptions%2520and%2520Subtitles%7C_____0',
          },
          {
            title: 'Syndication Publishing',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Syndication-Publishing.htm%3FTocPath%3DBasic%2520Setup%7C_____10',
          },
          {
            title: 'Blackout',
            path: 'https://docs.edgecast.com/video/index.html#Security/Blackout.htm%3FTocPath%3DSecurity%7CBlackout%7C_____0',
          },
          {
            title: 'Geoblocking',
            path: 'https://docs.edgecast.com/video/index.html#Security/Geoblocking.htm%3FTocPath%3DSecurity%7C_____3',
          },
          {
            title: 'Studio DRM',
            path: 'https://docs.edgecast.com/video/index.html#Security/Studio-DRM.htm%3FTocPath%3DSecurity%7CStudio%2520Digital%2520Rights%2520Management%2520(DRM)%7C_____0',
          },
          {
            title: 'Ads',
            path: 'https://docs.edgecast.com/video/index.html#AdIntegration/Ad-Server-Integration.htm%3FTocPath%3DAds%7C_____0',
          },
        ],
      },
    ],
  },
  {
    heading: 'Delivery',
    subheading: 'Something Delivery',
    className: 'delivery',
    icon: IconEdgioMedia,
    sections: [
      {
        title: 'Uplynk',
        path: 'https://docs.edgecast.com/video/index.html',
        items: [
          {
            title: 'Getting Started',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Setup-Overview.htm%3FTocPath%3DBasic%2520Setup%7C_____0',
          },
          {
            title: 'Live Linear',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Linear.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Linear%7C_____0',
          },
          {
            title: 'Live Events',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Events-2.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Events%7C_____0',
          },
          {
            title: 'Live Slicer',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Live-Slicer-Setup.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Slicer%7C_____0',
          },
          {
            title: 'Cloud Slicer Live',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Cloud-Slicer-Live.htm%3FTocPath%3DBasic%2520Setup%7C_____4',
          },
        ],
      },
    ],
  },
  {
    heading: 'Open Edge',
    subheading: 'Something Open Edge',
    className: 'open-edge',
    icon: IconEdgioMedia,
    sections: [
      {
        title: 'Uplynk',
        path: 'https://docs.edgecast.com/video/index.html',
        items: [
          {
            title: 'Getting Started',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Setup-Overview.htm%3FTocPath%3DBasic%2520Setup%7C_____0',
          },
          {
            title: 'Live Linear',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Linear.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Linear%7C_____0',
          },
          {
            title: 'Live Events',
            path: 'https://docs.edgecast.com/video/index.html#Setup/Live-Events-2.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Events%7C_____0',
          },
          {
            title: 'Live Slicer',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Live-Slicer-Setup.htm%3FTocPath%3DBasic%2520Setup%7CLive%2520Slicer%7C_____0',
          },
          {
            title: 'Cloud Slicer Live',
            path: 'https://docs.edgecast.com/video/index.html#Slicer/Cloud-Slicer-Live.htm%3FTocPath%3DBasic%2520Setup%7C_____4',
          },
          {
            title: 'On-Demand Content',
            path: 'https://docs.edgecast.com/video/index.html#Setup/On-Demand-Content.htm%3FTocPath%3DBasic%2520Setup%7COn-Demand%2520Content%7C_____0',
          },
        ],
      },
    ],
  },
];

sections.forEach((section) => {
  section.sections.forEach((subsection) => {
    subsection.items.forEach((item) => {
      if (!item.path.startsWith('http') && !item.path.startsWith('/')) {
        item.path = `${section.path}/${subsection.path}/${item.path}`;
      }
    });
  });
});

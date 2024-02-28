import {IconEdgioApplications, IconEdgioMedia} from 'components/Icon';
import {HomepageSectionGroup} from 'utils/Types';

export const sections: HomepageSectionGroup[] = [
  {
    heading: 'Applications',
    subheading: 'Build lightning fast, secured web and app experiences.',
    className: 'applications',
    icon: IconEdgioApplications,
    sections: [
      {
        title: 'Security',
        link: '/security',
        items: [
          {
            title: 'Security',
            link: '/security',
          },
          {
            title: 'Getting Started',
            link: '/security/getting-started',
          },
          {
            title: 'Dual WAF',
            link: '/security/dual-waf',
          },
          {
            title: 'Security Dashboard',
            link: '/security/security-dashboard',
          },
          {
            title: 'Bot Management',
            link: '/security/bot-management',
          },
          {
            title: 'API Security',
            link: '/security/api-security',
          },
          {
            title: 'Access Rules',
            link: '/security/access-rules',
          },
          {
            title: 'Rate Limiting',
            link: '/security/rate-limiting',
          },
          {
            title: 'EdgeJS',
            link: '/security/edgejs',
          },
          {
            title: 'Managed Rules',
            link: '/security/managed-rules',
          },
        ],
      },
      {
        title: 'Performance',
        description:
          'Optimize your application performance and user experience.',
        link: '/performance',
        items: [
          {
            title: 'Getting Started',
            link: '/performance/getting-started',
          },
          {
            title: 'Observability',
            link: '/performance/observability',
          },
          {
            title: 'Cloud Functions',
            link: '/performance/cloud-functions',
          },
          {
            title: 'CDN-as-Code',
            link: '/performance/cdn-as-code',
          },
          {
            title: 'Predictive Prefetch',
            link: '/performance/predictive-prefetch',
          },
          {
            title: 'Redirects',
            link: '/performance/redirects',
          },
          {
            title: 'Traffic Splitting',
            link: '/performance/traffic-splitting',
          },
          {
            title: 'Image Optimization',
            link: '/performance/image-optimization',
          },
          {
            title: 'Cache Management',
            link: '/performance/cache-management',
          },
        ],
      },
      {
        title: 'Sites',
        description: 'Build and deploy websites with ease.',
        items: [
          {
            title: 'Frameworks',
            link: '/sites/frameworks',
          },
          {
            title: 'Connectors',
            link: '/sites/connectors',
          },
          {
            title: 'Incremental Static Regeneration',
            link: '/sites/incremental-static-regeneration',
          },
        ],
      },
    ],
  },
  {
    heading: 'Media',
    subheading: 'Accelerate and protect your streaming media business.',
    className: 'media',
    icon: IconEdgioMedia,
    sections: [
      {
        title: 'Uplynk',
        link: '/media/uplynk',
        items: [
          {
            title: 'Getting Started',
            link: '/media/uplynk/getting-started',
          },
          {
            title: 'Security',
            link: '/media/uplynk/security',
          },
          {
            title: 'Ads',
            link: '/media/uplynk/ads',
          },
          {
            title: 'Live Streaming',
            link: '/media/uplynk/live-streaming',
          },
          {
            title: 'Clipping Video',
            link: '/media/uplynk/clipping-video',
          },
          {
            title: 'Content Management',
            link: '/media/uplynk/content-management',
          },
          {
            title: 'Cloud Packaging',
            link: '/media/uplynk/cloud-packaging',
          },
          {
            title: 'Log File Delivery',
            link: '/media/uplynk/log-file-delivery',
          },
          {
            title: 'Cloud Slicer Live',
            link: '/media/uplynk/cloud-slicer-live',
          },
        ],
      },
      {
        title: 'Delivery',
        link: '/media/delivery',
        items: [
          {
            title: 'Getting Started',
            link: '/media/delivery/getting-started',
          },
          {
            title: 'Security',
            link: '/media/delivery/security',
          },
          {
            title: 'Large File Delivery',
            link: '/media/delivery/large-file-delivery',
          },
          {
            title: 'Managed CDN',
            link: '/media/delivery/managed-cdn',
          },
          {
            title: 'WAF',
            link: '/media/delivery/waf',
          },
          {
            title: 'Content Management',
            link: '/media/delivery/content-management',
          },
          {
            title: 'Real-Time Log Delivery',
            link: '/media/delivery/real-time-log-delivery',
          },
          {
            title: 'Geoblocking',
            link: '/media/delivery/geoblocking',
          },
          {
            title: 'Cloud Slicer Live',
            link: '/media/delivery/cloud-slicer-live',
          },
        ],
      },
      {
        title: 'Open Edge',
        link: '/media/open-edge',
        items: [
          {
            title: 'Getting Started',
            link: '/media/open-edge/getting-started',
          },
          {
            title: 'ISP & MSP',
            link: '/media/open-edge/isp-msp',
          },
          {
            title: 'Edge Cache Servers',
            link: '/media/open-edge/edge-cache-servers',
          },
          {
            title: 'Managed CDN',
            link: '/media/open-edge/managed-cdn',
          },
          {
            title: 'Clipping Video',
            link: '/media/open-edge/clipping-video',
          },
          {
            title: 'Content Management',
            link: '/media/open-edge/content-management',
          },
          {
            title: 'View Media Documentation',
            link: '/media/open-edge/view-media-documentation',
          },
          {
            title: 'Dynamic Cloud',
            link: '/media/open-edge/dynamic-cloud',
          },
          {
            title: 'Packaging',
            link: '/media/open-edge/packaging',
          },
          {
            title: 'Log File Delivery',
            link: '/media/open-edge/log-file-delivery',
          },
          {
            title: 'Cloud Slicer Live',
            link: '/media/open-edge/cloud-slicer-live',
          },
        ],
      },
    ],
  },
];

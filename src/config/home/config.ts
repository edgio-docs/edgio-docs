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
        title: 'Security',
        path: '/security',
        items: [
          {
            title: 'Security',
            path: '/security',
          },
          {
            title: 'Getting Started',
            path: '/security/getting-started',
          },
          {
            title: 'Dual WAF',
            path: '/security/dual-waf',
          },
          {
            title: 'Security Dashboard',
            path: '/security/security-dashboard',
          },
          {
            title: 'Bot Management',
            path: '/security/bot-management',
          },
          {
            title: 'API Security',
            path: '/security/api-security',
          },
          {
            title: 'Access Rules',
            path: '/security/access-rules',
          },
          {
            title: 'Rate Limiting',
            path: '/security/rate-limiting',
          },
          {
            title: 'EdgeJS',
            path: '/security/edgejs',
          },
          {
            title: 'Managed Rules',
            path: '/security/managed-rules',
          },
        ],
      },
      {
        title: 'Performance',
        description:
          'Optimize your application performance and user experience.',
        path: '/performance',
        items: [
          {
            title: 'Getting Started',
            path: '/performance/getting-started',
          },
          {
            title: 'Observability',
            path: '/performance/observability',
          },
          {
            title: 'Cloud Functions',
            path: '/performance/cloud-functions',
          },
          {
            title: 'CDN-as-Code',
            path: '/performance/cdn-as-code',
          },
          {
            title: 'Predictive Prefetch',
            path: '/performance/predictive-prefetch',
          },
          {
            title: 'Redirects',
            path: '/performance/redirects',
          },
          {
            title: 'Traffic Splitting',
            path: '/performance/traffic-splitting',
          },
          {
            title: 'Image Optimization',
            path: '/performance/image-optimization',
          },
          {
            title: 'Cache Management',
            path: '/performance/cache-management',
          },
        ],
      },
      {
        title: 'Sites',
        description: 'Build and deploy websites with ease.',
        items: [
          {
            title: 'Frameworks',
            path: '/sites/frameworks',
          },
          {
            title: 'Connectors',
            path: '/sites/connectors',
          },
          {
            title: 'Incremental Static Regeneration',
            path: '/sites/incremental-static-regeneration',
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
        path: '/media/uplynk',
        items: [
          {
            title: 'Getting Started',
            path: '/media/uplynk/getting-started',
          },
          {
            title: 'Security',
            path: '/media/uplynk/security',
          },
          {
            title: 'Ads',
            path: '/media/uplynk/ads',
          },
          {
            title: 'Live Streaming',
            path: '/media/uplynk/live-streaming',
          },
          {
            title: 'Clipping Video',
            path: '/media/uplynk/clipping-video',
          },
          {
            title: 'Content Management',
            path: '/media/uplynk/content-management',
          },
          {
            title: 'Cloud Packaging',
            path: '/media/uplynk/cloud-packaging',
          },
          {
            title: 'Log File Delivery',
            path: '/media/uplynk/log-file-delivery',
          },
          {
            title: 'Cloud Slicer Live',
            path: '/media/uplynk/cloud-slicer-live',
          },
        ],
      },
      {
        title: 'Delivery',
        path: '/media/delivery',
        items: [
          {
            title: 'Getting Started',
            path: '/media/delivery/getting-started',
          },
          {
            title: 'Security',
            path: '/media/delivery/security',
          },
          {
            title: 'Large File Delivery',
            path: '/media/delivery/large-file-delivery',
          },
          {
            title: 'Managed CDN',
            path: '/media/delivery/managed-cdn',
          },
          {
            title: 'WAF',
            path: '/media/delivery/waf',
          },
          {
            title: 'Content Management',
            path: '/media/delivery/content-management',
          },
          {
            title: 'Real-Time Log Delivery',
            path: '/media/delivery/real-time-log-delivery',
          },
          {
            title: 'Geoblocking',
            path: '/media/delivery/geoblocking',
          },
          {
            title: 'Cloud Slicer Live',
            path: '/media/delivery/cloud-slicer-live',
          },
        ],
      },
      {
        title: 'Open Edge',
        path: '/media/open-edge',
        items: [
          {
            title: 'Getting Started',
            path: '/media/open-edge/getting-started',
          },
          {
            title: 'ISP & MSP',
            path: '/media/open-edge/isp-msp',
          },
          {
            title: 'Edge Cache Servers',
            path: '/media/open-edge/edge-cache-servers',
          },
          {
            title: 'Managed CDN',
            path: '/media/open-edge/managed-cdn',
          },
          {
            title: 'Clipping Video',
            path: '/media/open-edge/clipping-video',
          },
          {
            title: 'Content Management',
            path: '/media/open-edge/content-management',
          },
          {
            title: 'View Media Documentation',
            path: '/media/open-edge/view-media-documentation',
          },
          {
            title: 'Dynamic Cloud',
            path: '/media/open-edge/dynamic-cloud',
          },
          {
            title: 'Packaging',
            path: '/media/open-edge/packaging',
          },
          {
            title: 'Log File Delivery',
            path: '/media/open-edge/log-file-delivery',
          },
          {
            title: 'Cloud Slicer Live',
            path: '/media/open-edge/cloud-slicer-live',
          },
        ],
      },
    ],
  },
];

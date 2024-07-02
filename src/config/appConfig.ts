import React from 'react';

// Automatically import all announcements from the src/templates/announcements directory
const announcementFiles = require.context(
  'templates/announcements',
  true,
  /\.md$/
);

const importAnnouncements = () => {
  const announcements: {[key: string]: string} = {};
  announcementFiles.keys().forEach((filename: string) => {
    const resourceName = filename.replace('./', '').replace('.md', '');
    announcements[resourceName] = announcementFiles(filename).default as string;
  });
  return announcements;
};

const announcements = importAnnouncements();

type DynamicImport<T = any> = () => Promise<{default: T}>;

export type ProductConfig = {
  pathPrefix: string;
  versions: {
    [version: string]: ProductVersionConfig;
  } & {default?: ProductVersionConfig};
  edgioAnswers?: {
    starterQuestions: string[];
    contextStatement: string;
  };
};

export type ProductVersionConfig = {
  configImport: DynamicImport;
  guidesPath: string;
  navigationImport: DynamicImport | null;
  announcement?: {
    styles?: React.CSSProperties | {[key: string]: React.CSSProperties};
    id: string;
    title?: string;
    message: string;
    type?: 'info' | 'important' | 'critical';
  };
};

export type ProductsConfig = {
  [product: string]: ProductConfig;
};

export const headerImagePaths = {
  dark: {
    applications: '/images/home/header/logo/dark/apps.png',
    applications_v4: '/images/home/header/logo/dark/apps-v4.png',
    applications_v6: '/images/home/header/logo/dark/apps-v6.png',
    applications_v7: '/images/home/header/logo/dark/apps-v7.png',
    delivery: '/images/home/header/logo/dark/delivery.png',
    edgioDocs: '/images/home/header/logo/dark/docs.png',
    uplynk: '/images/home/header/logo/dark/uplynk.png',
  },
  light: {
    applications: '/images/home/header/logo/light/apps.png',
    applications_v4: '/images/home/header/logo/light/apps-v4.png',
    applications_v6: '/images/home/header/logo/light/apps-v6.png',
    applications_v7: '/images/home/header/logo/light/apps-v7.png',
    delivery: '/images/home/header/logo/light/delivery.png',
    edgioDocs: '/images/home/header/logo/light/docs.png',
    uplynk: '/images/home/header/logo/light/uplynk.png',
  },
};

export const productsConfig: ProductsConfig = {
  applications: {
    pathPrefix: '/applications',
    versions: {
      v4: {
        configImport: () => import('config/applications/v4.config'),
        guidesPath: 'guides/applications/v4',
        navigationImport: () => import('config/applications/v4.nav'),
        announcement: {
          id: 'v4-announcement',
          message: announcements['apps_v4_announcement'],
          type: 'critical',
        },
      },
      v6: {
        configImport: () => import('config/applications/v6.config'),
        guidesPath: 'guides/applications/v6',
        navigationImport: () => import('config/applications/v6.nav'),
        announcement: {
          id: 'v6-announcement',
          message: announcements['apps_v6_announcement'],
          type: 'critical',
        },
      },
      v7: {
        configImport: () => import('config/applications/v7.config'),
        guidesPath: 'guides/applications/v7',
        navigationImport: () => import('config/applications/v7.nav'),
        announcement: {
          id: 'v7-announcement',
          message: announcements['apps_v7_announcement'],
          type: 'important',
        },
      },
    },
    edgioAnswers: {
      starterQuestions: [
        'How do I get started with EdgeJS?',
        'How do I cache images/* at the edge for 1 hour?',
        'How do I prevent caching in the browser with EdgeJS?',
      ],
      contextStatement:
        'Only provide me with information about the Applications product.',
    },
  },
  uplynk: {
    pathPrefix: '/uplynk',
    versions: {
      default: {
        configImport: () => import('config/uplynk/config'),
        guidesPath: 'guides/uplynk',
        navigationImport: () => import('config/uplynk/nav'),
      },
    },
  },
  delivery: {
    pathPrefix: '/delivery',
    versions: {
      default: {
        configImport: () => import('config/delivery/config'),
        guidesPath: 'guides/delivery',
        navigationImport: () => import('config/delivery/nav'),
      },
    },
    edgioAnswers: {
      starterQuestions: [
        'What are the key features of Delivery?',
        'Create a Storage user.',
        'What reports can I find in Control?',
      ],
      contextStatement:
        'Only provide me with information about the Delivery product.',
    },
  },
  open_edge: {
    pathPrefix: '/open_edge',
    versions: {
      default: {
        configImport: () => import('config/open_edge/config'),
        guidesPath: 'guides/open_edge',
        navigationImport: () => import('config/open_edge/nav'),
      },
    },
  },
  home: {
    pathPrefix: '/',
    versions: {
      default: {
        configImport: () => import('config/base.config'),
        guidesPath: 'guides/home',
        navigationImport: null,
      },
    },
    edgioAnswers: {
      starterQuestions: [
        'How do I configure caching for my Applications property?',
        'What does Delivery offer?',
      ],
      contextStatement:
        'Prioritize information for product-specific questions, but include general context if necessary.',
    },
  },
};

export const siteConfig = {
  editUrl: 'https://github.com/edgio-docs/edgio-docs/edit/src/pages',
  copyright: `Copyright © ${new Date().getFullYear()} Edgio. All Rights Reserved.`,
  repoUrl: 'https://github.com/edgio-docs/edgio-docs',
  twitterUrl: 'https://twitter.com/edgioinc',
  algolia: {
    appId: 'NUB3ND0MNC',
    apiKey: '102f7bfdfa7c14ea4e20577bfdd73c5d',
    indexName: 'layer0',
  },
  headerIdConfig: {
    className: `anchor`,
  },
  tagline: `Explore the Edgio guides and examples on how to integrate edge logic into your application code & extend the edge to the browser.`,
  twitterHandle: 'edgioinc',
  analytics: {
    gtmId: 'GTM-5WCD2BK',
  },
  fireawai: {
    chatbotId: '5aa46a00-64ab-44a7-ba8e-778402716981',
    apiToken: 'ac9030b3-dfa6-4e18-8069-e8df54c131e4',
  },
};

productsConfig.applications.versions.default =
  productsConfig.applications.versions.v7;

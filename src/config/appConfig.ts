type DynamicImport<T = any> = () => Promise<{default: T}>;

type ProductVersionConfig = {
  configImport: DynamicImport;
  guidesPath: string;
  navigationImport: DynamicImport;
};

type ProductConfig = {
  pathPrefix: string;
  versions: {
    [version: string]: ProductVersionConfig;
  } & {default?: ProductVersionConfig};
};

type ProductsConfig = {
  [product: string]: ProductConfig;
};

export const productsConfig: ProductsConfig = {
  applications: {
    pathPrefix: '/applications',
    versions: {
      v4: {
        configImport: () => import('config/applications/v4.config'),
        guidesPath: 'guides/applications/v4',
        navigationImport: () => import('config/applications/v4.nav'),
      },
      v5: {
        configImport: () => import('config/applications/v5.config'),
        guidesPath: 'guides/applications/v5',
        navigationImport: () => import('config/applications/v5.nav'),
      },
      v6: {
        configImport: () => import('config/applications/v6.config'),
        guidesPath: 'guides/applications/v6',
        navigationImport: () => import('config/applications/v6.nav'),
      },
      v7: {
        configImport: () => import('config/applications/v7.config'),
        guidesPath: 'guides/applications/v7',
        navigationImport: () => import('config/applications/v7.nav'),
      },
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
    chatbotId: 'f98fb410-2056-447e-984f-753cbbe5d513',
    apiToken: 'ac9030b3-dfa6-4e18-8069-e8df54c131e4',
  },
};
productsConfig.applications.versions.default =
  productsConfig.applications.versions.v7;

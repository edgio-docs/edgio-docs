type DynamicImport<T = any> = () => Promise<{default: T}>;

type ProductVersionConfig = {
  configPath: DynamicImport;
  guidesPath: string;
  navigationPath: DynamicImport;
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
};

export const productsConfig: ProductsConfig = {
  applications: {
    pathPrefix: '/applications',
    versions: {
      v4: {
        configPath: () => import('config/applications/v4.config'),
        guidesPath: 'guides/applications/v4',
        navigationPath: () => import('config/applications/v4.nav'),
      },
      v5: {
        configPath: () => import('config/applications/v5.config'),
        guidesPath: 'guides/applications/v5',
        navigationPath: () => import('config/applications/v5.nav'),
      },
      v6: {
        configPath: () => import('config/applications/v6.config'),
        guidesPath: 'guides/applications/v6',
        navigationPath: () => import('config/applications/v6.nav'),
      },
      v7: {
        configPath: () => import('config/applications/v7.config'),
        guidesPath: 'guides/applications/v7',
        navigationPath: () => import('config/applications/v7.nav'),
      },
    },
  },
  uplynk: {
    pathPrefix: '/uplynk',
    versions: {
      default: {
        configPath: () => import('config/uplynk/config'),
        guidesPath: 'guides/uplynk',
        navigationPath: () => import('config/uplynk/nav'),
      },
    },
  },
  delivery: {
    pathPrefix: '/delivery',
    versions: {
      default: {
        configPath: () => import('config/delivery/config'),
        guidesPath: 'guides/delivery',
        navigationPath: () => import('config/delivery/nav'),
      },
    },
  },
  open_edge: {
    pathPrefix: '/open_edge',
    versions: {
      default: {
        configPath: () => import('config/open_edge/config'),
        guidesPath: 'guides/open_edge',
        navigationPath: () => import('config/open_edge/nav'),
      },
    },
  },
};
productsConfig.applications.versions.default =
  productsConfig.applications.versions.v7;

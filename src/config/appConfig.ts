type DynamicImport<T = any> = () => Promise<{default: T}>;

export type ProductConfig = {
  pathPrefix: string;
  versions: {
    [version: string]: ProductVersionConfig;
  } & {default?: ProductVersionConfig};
};

export type ProductVersionConfig = {
  configImport: DynamicImport;
  guidesPath: string;
  navigationImport: DynamicImport | null;
  announcement?: {
    styles?: React.CSSProperties;
    id: string;
    title?: string;
    message: string;
  };
};

export type ProductsConfig = {
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
        announcement: {
          id: 'v4-announcement',
          message: `Edgio Applications v4 and
                    support for Node.js 16 are undergoing end-of-life (EOL). Read the&nbsp;
                    <a href="https://edg.io/blogs/layer0-end-of-life-announcement/" target="_blank">
                      Layer0 EOL announcement
                    </a>
                    , the&nbsp;
                    <a href="/applications/v4/install_nodejs">Node.js 16 EOL plan</a>
                    &nbsp; or browse&nbsp;
                    <a href="/">
                      Edgio Applications v7 docs
                    </a>
                    .`,
        },
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
        announcement: {
          id: 'v7-announcement',
          message: `Introducing Edgio Applications v7.&nbsp;
                    <a href="/applications/v7/intro">
                      Find out what&apos;s new.
                    </a>`,
          styles: {},
        },
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
  home: {
    pathPrefix: '/',
    versions: {
      default: {
        configImport: () => import('config/base.config'),
        guidesPath: 'guides/home',
        navigationImport: null,
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

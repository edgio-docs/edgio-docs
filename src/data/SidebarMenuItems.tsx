import * as React from 'react';

import {
  IconAngular,
  IconAstro,
  IconAstroDark,
  IconBigCommerce,
  IconBigCommerceDark,
  IconBloomreach,
  IconBloomreachDark,
  IconBookPlain,
  IconBookPlainDark,
  IconBrunch,
  IconBulb,
  IconBulbDark,
  IconCodePlain,
  IconCodePlainDark,
  IconDocusaurus,
  IconDojo,
  IconEleventy,
  IconEleventyDark,
  IconEmberFastboot,
  IconEmberFastbootDark,
  IconEmberJS,
  IconExpress,
  IconExpressDark,
  IconFiddle,
  IconFiddleDark,
  IconFolder,
  IconFolderDark,
  IconForum,
  IconForumDark,
  IconFrontity,
  IconGatsby,
  IconGridsome,
  IconGridsomeDark,
  IconHexo,
  IconHugo,
  IconIonicX,
  IconJekyll,
  IconJekyllDark,
  IconMKDocs,
  IconMKDocsDark,
  IconNextJS,
  IconNextJSCommerce,
  IconNextJSCommerceDark,
  IconNextJSDark,
  IconNuxt,
  IconNX,
  IconNXDark,
  IconPreact,
  IconRazzle,
  IconReact,
  IconReactStatic,
  IconReactStorefront,
  IconRedwood,
  IconRemix,
  IconRemixDark,
  IconSaber,
  IconSanity,
  IconSapper,
  IconServerlessFunctions,
  IconServerSmall,
  IconServerSmallDark,
  IconShopifyHydrogen,
  IconSolidJS,
  IconSparkPlain,
  IconSparkPlainDark,
  IconSpartacus,
  IconStacksPlain,
  IconStacksPlainDark,
  IconStaticHTMLJS,
  IconStatus,
  IconStatusDark,
  IconStencil,
  IconStencilDark,
  IconSupport,
  IconSupportDark,
  IconSvelte,
  IconSwell,
  IconSwellDark,
  IconUmiJS,
  IconUserPlain,
  IconUserPlainDark,
  IconVideos,
  IconVideosDark,
  IconVitePress,
  IconVue,
  IconVueStorefront,
  IconZola,
  IconZolaDark,
  IconEdgioSquareLogo,
  IconEdgioSquareLogoDark,
} from '../components/Icon';

import {IconGear, IconGearDark} from 'components/Icon/IconGear';

export interface IRoute {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
  iconDark?: JSX.IntrinsicElements['svg'];
  external?: boolean;
  parentIndex?: number;
  childIndex?: number;
}

export interface ISidebarMenuItem {
  title: string;
  icon: JSX.IntrinsicElements['svg'];
  iconDark?: JSX.IntrinsicElements['svg'];
  path: string;
  sortRoutes?: boolean;
  routes?: Array<IRoute>;
}

export type ISidebarMenuItems = Array<Array<ISidebarMenuItem>>;

const SidebarMenuItems: ISidebarMenuItems = [
  [
    {
      title: 'Getting Started',
      icon: <IconSparkPlain />,
      iconDark: <IconSparkPlainDark />,
      path: 'getting-started',
      sortRoutes: false,
      routes: [
        {
          title: 'WebApp CDN',
          path: '/guides/webapp_cdn_getting_started',
        },
        {
          title: 'Jamstack',
          path: '/guides/jamstack_getting_started',
        },
        {
          title: 'GraphQL CDN',
          path: '/guides/graphql',
        },
        {
          title: 'Deploying',
          path: '/guides/deploy_apps',
        },
        {
          title: 'System Overview',
          path: '/guides/overview',
        },
      ],
    },
    {
      title: 'CDN',
      icon: <IconServerSmall />,
      iconDark: <IconServerSmallDark />,
      path: 'cdn',
      sortRoutes: true,
      routes: [
        {
          title: 'EdgeJS Routing',
          path: '/guides/routing',
        },
        {
          title: 'Security',
          path: '/guides/security',
        },
        {
          title: 'Core Web Vitals',
          path: '/guides/core_web_vitals',
        },
        {
          title: 'Image Optimization',
          path: '/guides/image_optimization',
        },
        {
          title: 'Prefetching',
          path: '/guides/prefetching',
        },
        {
          title: 'Traditional Sites',
          path: '/guides/traditional_sites',
        },
        {
          title: 'Caching',
          path: '/guides/caching',
        },
        {
          title: 'Purging',
          path: '/guides/purging',
        },
        {
          title: 'Static Prerendering',
          path: '/guides/static_prerendering',
        },
        {
          title: 'Incremental Static (Re)generation',
          path: '/guides/isg',
        },
        {
          title: 'Common Routing Patterns',
          path: '/guides/cookbook',
        },
        {
          title: 'Split Testing',
          path: '/guides/split_testing',
        },
        {
          title: 'Custom Domains & SSL',
          path: '/guides/production',
        },
        {
          title: 'Performance',
          path: '/guides/performance',
        },
        {
          title: 'Edge Network',
          path: '/guides/regions',
        },
        {
          title: 'Third Party CDNs',
          path: '/guides/third_party_cdns',
        },

        {
          title: 'Connectors',
          path: '/guides/connectors',
        },
        {
          title: 'Troubleshooting',
          path: '/guides/troubleshooting',
        },
      ],
    },
    {
      title: 'Developer Tools',
      icon: <IconCodePlain />,
      iconDark: <IconCodePlainDark />,
      path: 'dev-tools',
      sortRoutes: true,
      routes: [
        {
          title: 'CLI',
          path: '/guides/cli',
        },
        {
          title: 'Devtools',
          path: '/guides/devtools',
        },
        {
          title: 'EdgeJS Unit Testing',
          path: '/guides/edgejs_testing',
        },
        {
          title: 'Logs',
          path: '/guides/logs',
        },
      ],
    },
    {
      title: 'Accounts & Teams',
      icon: <IconUserPlain />,
      iconDark: <IconUserPlainDark />,
      path: 'accounts-teams',
      sortRoutes: true,
      routes: [
        {
          title: 'Teams',
          path: '/guides/teams',
        },
        {
          title: 'Environments',
          path: '/guides/environments',
        },
        {
          title: 'SAML Single Sign On',
          path: '/guides/saml',
        },
      ],
    },
    {
      title: 'Framework Guides',
      icon: <IconBookPlain />,
      iconDark: <IconBookPlainDark />,
      path: 'framework-guides',
      sortRoutes: true,
      routes: [
        {
          title: 'Angular',
          path: '/guides/angular',
          icon: <IconAngular />,
          iconDark: <IconAngular />,
        },
        {
          title: 'Astro',
          path: '/guides/astro',
          icon: <IconAstro />,
          iconDark: <IconAstroDark />,
        },
        {
          title: 'Brunch',
          path: '/guides/brunch',
          icon: <IconBrunch />,
          iconDark: <IconBrunch />,
        },
        {
          title: 'Docusaurus',
          path: '/guides/docusaurus',
          icon: <IconDocusaurus />,
          iconDark: <IconDocusaurus />,
        },
        {
          title: 'Dojo',
          path: '/guides/dojo',
          icon: <IconDojo />,
          iconDark: <IconDojo />,
        },
        {
          title: 'Eleventy',
          path: '/guides/eleventy',
          icon: <IconEleventy />,
          iconDark: <IconEleventyDark />,
        },
        {
          title: 'Ember.js',
          path: '/guides/ember',
          icon: <IconEmberJS />,
          iconDark: <IconEmberJS />,
        },
        {
          title: 'Ember Fastboot',
          path: '/guides/ember_fastboot',
          icon: <IconEmberFastboot />,
          iconDark: <IconEmberFastbootDark />,
        },
        {
          title: 'Express',
          path: '/guides/express',
          icon: <IconExpress />,
          iconDark: <IconExpressDark />,
        },
        {
          title: 'Frontity',
          path: '/guides/frontity',
          icon: <IconFrontity />,
          iconDark: <IconFrontity />,
        },
        {
          title: 'Gatsby',
          path: '/guides/gatsby',
          icon: <IconGatsby />,
          iconDark: <IconGatsby />,
        },
        {
          title: 'Gridsome',
          path: '/guides/gridsome',
          icon: <IconGridsome />,
          iconDark: <IconGridsomeDark />,
        },
        {
          title: 'Hexo',
          path: '/guides/hexo',
          icon: <IconHexo />,
          iconDark: <IconHexo />,
        },
        {
          title: 'Hugo',
          path: '/guides/hugo',
          icon: <IconHugo />,
          iconDark: <IconHugo />,
        },
        {
          title: 'Ionic React',
          path: '/guides/ionic_react',
          icon: <IconIonicX />,
          iconDark: <IconIonicX />,
        },
        {
          title: 'Ionic Vue',
          path: '/guides/ionic_vue',
          icon: <IconIonicX />,
          iconDark: <IconIonicX />,
        },
        {
          title: 'Jekyll',
          path: '/guides/jekyll',
          icon: <IconJekyll />,
          iconDark: <IconJekyllDark />,
        },
        {
          title: 'MkDocs',
          path: '/guides/mkdocs',
          icon: <IconMKDocs />,
          iconDark: <IconMKDocsDark />,
        },
        {
          title: 'Nx',
          path: '/guides/nx',
          icon: <IconNX />,
          iconDark: <IconNXDark />,
        },
        {
          title: 'Next.js',
          path: '/guides/next',
          icon: <IconNextJS />,
          iconDark: <IconNextJSDark />,
        },
        {
          title: 'Next.js Commerce',
          path: '/guides/next_commerce',
          icon: <IconNextJSCommerce />,
          iconDark: <IconNextJSCommerceDark />,
        },
        {
          title: 'Nuxt.js',
          path: '/guides/nuxt',
          icon: <IconNuxt />,
          iconDark: <IconNuxt />,
        },
        {
          title: 'Nuxt3',
          path: '/guides/nuxt3',
          icon: <IconNuxt />,
          iconDark: <IconNuxt />,
        },
        {
          title: 'Preact',
          path: '/guides/preact',
          icon: <IconPreact />,
          iconDark: <IconPreact />,
        },
        {
          title: 'Razzle',
          path: '/guides/razzle',
          icon: <IconRazzle />,
          iconDark: <IconRazzle />,
        },
        {
          title: 'React',
          path: '/guides/react',
          icon: <IconReact />,
          iconDark: <IconReact />,
        },
        {
          title: 'React Static',
          path: '/guides/react_static',
          icon: <IconReactStatic />,
          iconDark: <IconReactStatic />,
        },
        {
          title: 'React Storefront',
          path: '/guides/react-storefront',
          icon: <IconReactStorefront />,
          iconDark: <IconReactStorefront />,
        },
        {
          title: 'RedwoodJS',
          path: '/guides/redwoodjs',
          icon: <IconRedwood />,
          iconDark: <IconRedwood />,
        },
        {
          title: 'Remix',
          path: '/guides/remix',
          icon: <IconRemix />,
          iconDark: <IconRemixDark />,
        },
        {
          title: 'Saber',
          path: '/guides/saber',
          icon: <IconSaber />,
          iconDark: <IconSaber />,
        },
        {
          title: 'Sanity',
          path: '/guides/sanity',
          icon: <IconSanity />,
          iconDark: <IconSanity />,
        },
        {
          title: 'Sapper',
          path: '/guides/sapper',
          icon: <IconSapper />,
          iconDark: <IconSapper />,
        },
        {
          title: 'Serverless Functions',
          path: '/guides/serverless_functions',
          icon: <IconServerlessFunctions />,
          iconDark: <IconServerlessFunctions />,
        },
        {
          title: 'SolidJS',
          path: '/guides/solid',
          icon: <IconSolidJS />,
          iconDark: <IconSolidJS />,
        },
        {
          title: 'Spartacus',
          path: '/guides/spartacus',
          icon: <IconSpartacus />,
          iconDark: <IconSpartacus />,
        },
        {
          title: 'Static HTML/JS',
          path: '/guides/static_sites',
          icon: <IconStaticHTMLJS />,
          iconDark: <IconStaticHTMLJS />,
        },
        {
          title: 'Stencil',
          path: '/guides/stencil',
          icon: <IconStencil />,
          iconDark: <IconStencilDark />,
        },
        {
          title: 'Svelte',
          path: '/guides/svelte',
          icon: <IconSvelte />,
          iconDark: <IconSvelte />,
        },
        {
          title: 'UmiJS',
          path: '/guides/umijs',
          icon: <IconUmiJS />,
          iconDark: <IconUmiJS />,
        },
        {
          title: 'VitePress',
          path: '/guides/vitepress',
          icon: <IconVitePress />,
          iconDark: <IconVitePress />,
        },
        {
          title: 'Vue Storefront',
          path: '/guides/vsf',
          icon: <IconVueStorefront />,
          iconDark: <IconVueStorefront />,
        },
        {
          title: 'Vue.js',
          path: '/guides/vue',
          icon: <IconVue />,
          iconDark: <IconVue />,
        },
        {
          title: 'VuePress',
          path: '/guides/vuepress',
          icon: <IconVitePress />,
          iconDark: <IconVitePress />,
        },
        {
          title: 'Zola',
          path: '/guides/zola',
          icon: <IconZola />,
          iconDark: <IconZolaDark />,
        },
      ],
    },
    {
      title: 'Integrations',
      icon: <IconGear />,
      iconDark: <IconGearDark />,
      path: 'integration-guides',
      sortRoutes: true,
      routes: [
        {
          title: 'BigCommerce',
          path: '/guides/bigcommerce',
          icon: <IconBigCommerce />,
          iconDark: <IconBigCommerceDark />,
        },
        {
          title: 'Bloomreach',
          path: '/guides/bloomreach',
          icon: <IconBloomreach />,
          iconDark: <IconBloomreachDark />,
        },
        {
          title: 'Shopify Hydrogen',
          path: '/guides/shopify_hydrogen',
          icon: <IconShopifyHydrogen />,
          iconDark: <IconShopifyHydrogen />,
        },
        {
          title: 'Swell',
          path: '/guides/swell',
          icon: <IconSwell />,
          iconDark: <IconSwellDark />,
        },
      ],
    },
    {
      title: 'Reference',
      icon: <IconStacksPlain />,
      iconDark: <IconStacksPlainDark />,
      path: 'reference',
      sortRoutes: true,
      routes: [
        {
          title: 'Changelog',
          path: '/guides/changelog',
        },
        {
          title: 'Compression',
          path: '/guides/compression',
        },
        {
          title: 'Status Codes',
          path: '/guides/status_codes',
        },
        {
          title: 'Cookies',
          path: '/guides/cookies',
        },
        {
          title: 'Managed Rule Groups',
          path: '/guides/managed_rule_groups',
        },
        {
          title: 'Layer0 for Traditional Sites',
          path: '/guides/traditional_sites',
        },
        {
          title: 'Request Headers',
          path: '/guides/request_headers',
        },
        {
          title: 'Response Headers',
          path: '/guides/response_headers',
        },
        {
          title: 'Limits',
          path: '/guides/limits',
        },
        {
          title: 'REST API',
          path: '/guides/rest_api',
        },
        {
          title: 'Install Node.js',
          path: '/guides/install_nodejs',
        },
        {
          title: 'Deploy to Layer0 Button',
          path: '/guides/deploy_to_layer0',
        },
        {
          title: 'Contributing',
          path: '/guides/contributing',
        },
        {
          title: 'v4 Migration Guide',
          path: '/guides/layer0_migration',
        },
        {
          title: 'layer0.config.js',
          path: '/guides/layer0_config',
        },
      ],
    },
    {
      title: 'Videos',
      icon: <IconVideos />,
      iconDark: <IconVideosDark />,
      path: 'videos',
      sortRoutes: true,
      routes: [
        {
          title: 'Layer0 Tutorials',
          path: 'https://vimeo.com/user/776463/folder/9270726',
          external: true,
        },
      ],
    },
    {
      title: 'Package APIs',
      icon: <IconFolder />,
      iconDark: <IconFolderDark />,
      path: 'package-apis',
      sortRoutes: false,
      routes: [
        {
          title: '@layer0/core',
          path: '/docs/api/core/',
          external: true,
        },
        {
          title: '@layer0/prefetch',
          path: '/docs/api/prefetch/',
          external: true,
        },
        {
          title: '@layer0/core (v3.x)',
          path: '/docs/v3.17.8/api/core/',
          external: true,
        },
        {
          title: '@layer0/prefetch (v3.x)',
          path: '/docs/v3.17.8/api/prefetch/',
          external: true,
        },
      ],
    },
    {
      title: 'Learning Resources',
      icon: <IconBulb />,
      iconDark: <IconBulbDark />,
      path: 'learning-resources',
      sortRoutes: true,
      routes: [
        {
          title: 'What is GraphQL?',
          path: '/guides/what_is_graphql',
        },
      ],
    },
  ],
  [
    {
      title: 'Fiddle',
      icon: <IconFiddle />,
      iconDark: <IconFiddleDark />,
      path: 'https://fiddle.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Forum',
      icon: <IconForum />,
      iconDark: <IconForumDark />,
      path: 'https://forum.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Status',
      icon: <IconStatus />,
      iconDark: <IconStatusDark />,
      path: 'https://status.layer0.co/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Support',
      icon: <IconSupport />,
      iconDark: <IconSupportDark />,
      path: 'https://app.layer0.co/help?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Edg.io',
      icon: <IconEdgioSquareLogo />,
      iconDark: <IconEdgioSquareLogoDark />,
      path: 'https://edg.io',
    },
  ],
];

export default SidebarMenuItems;

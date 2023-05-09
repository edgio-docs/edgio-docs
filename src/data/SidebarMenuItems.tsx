import {map, flatMap, flatten} from 'lodash';
import * as React from 'react';

import {
  CONFIG_FILE,
  PACKAGE_NAME,
  PRODUCT,
  PRODUCT_EDGE,
  PRODUCT_LEGACY_LOWER,
  PRODUCT_PLATFORM,
  PRODUCT_SECURITY,
  FIDDLE_URL,
} from '../../constants';
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
  IconFolder,
  IconFolderDark,
  IconFrontity,
  IconGatsby,
  IconGear,
  IconGearDark,
  IconGridsome,
  IconGridsomeDark,
  IconHexo,
  IconHugo,
  IconIonicX,
  IconJekyll,
  IconJekyllDark,
  IconLeaf,
  IconLeafDark,
  IconLit,
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
  IconScully,
  IconSecurityPlain,
  IconSecurityPlainDark,
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
  IconStencil,
  IconStencilDark,
  IconSvelte,
  IconSwell,
  IconSwellDark,
  IconUmiJS,
  IconUserPlain,
  IconUserPlainDark,
  IconVitePress,
  IconVue,
  IconVueStorefront,
  IconZola,
  IconZolaDark,
  IconFiddle,
  IconFiddleDark,
  IconForum,
  IconForumDark,
  IconStatus,
  IconStatusDark,
  IconSupport,
  IconSupportDark,
  IconEdgioSquareLogo,
  IconEdgioSquareLogoDark,
  IconWordPress,
} from '../components/Icon';

export interface IRoute {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
  iconDark?: JSX.IntrinsicElements['svg'];
  external?: boolean;
  parentIndex?: number;
  childIndex?: number;
  /**
   * `true` to automatically determine the separator position based on the item hierarchy
   */
  separator?: boolean | 'top' | 'bottom';
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
          title: PRODUCT_EDGE,
          path: '/guides/getting_started',
        },
        {
          title: PRODUCT_PLATFORM,
          path: '/guides/sites_frameworks/getting_started',
        },
        {
          title: PRODUCT_SECURITY,
          path: '/guides/security/getting_started',
        },
        {
          title: 'Deploying',
          path: '/guides/basics/deployments',
        },
        {
          title: 'System Overview',
          path: '/guides/overview',
        },
      ],
    },
    {
      title: PRODUCT_EDGE,
      icon: <IconServerSmall />,
      iconDark: <IconServerSmallDark />,
      path: 'cdn',
      sortRoutes: false,
      routes: [
        {
          title: 'Routing with EdgeJS',
          path: '/guides/performance/cdn_as_code',
        },
        {
          title: 'Common Routing Patterns',
          path: '/guides/performance/cdn_as_code/common_routing_patterns',
        },
        {
          title: 'Custom Domains & SSL',
          path: '/guides/basics/domains',
        },
        {
          title: 'Caching',
          path: '/guides/performance/caching',
        },
        {
          title: 'Purging',
          path: '/guides/performance/purging',
        },
        {
          title: 'Static Prerendering',
          path: '/guides/performance/static_prerendering',
        },
        {
          title: 'Predictive Prefetch',
          path: '/guides/performance/prefetching',
        },
        {
          title: 'Traditional Sites',
          path: '/guides/performance/traditional_sites',
        },
        {
          title: 'Observability',
          path: '/guides/performance/observability',
        },
        {
          title: 'Performance',
          path: '/guides/performance',
        },
        {
          title: 'Serverless Compute',
          path: '/guides/performance/serverless_compute',
          icon: <IconServerlessFunctions />,
          iconDark: <IconServerlessFunctions />,
        },
        {
          title: 'Third-Party CDNs',
          path: '/guides/performance/third_party_cdns',
        },
        {
          title: 'Image Optimization',
          path: '/guides/performance/image_optimization',
          separator: true,
        },
        {
          title: 'Compression',
          path: '/guides/performance/compression',
        },
        {
          title: 'Request',
          path: '/guides/performance/request',
        },
        {
          title: 'Response Headers',
          path: '/guides/performance/response',
        },
        {
          title: 'Status Codes',
          path: '/guides/performance/response#status-codes',
        },
        {
          title: 'Troubleshooting',
          path: '/guides/performance/troubleshooting',
        },
      ],
    },
    {
      title: PRODUCT_PLATFORM,
      icon: <IconBookPlain />,
      iconDark: <IconBookPlainDark />,
      path: 'popular-frameworks',
      sortRoutes: false,
      routes: [
        {
          title: 'Next.js',
          path: '/guides/sites_frameworks/getting_started/next',
          icon: <IconNextJS />,
          iconDark: <IconNextJSDark />,
        },
        {
          title: 'Nuxt3',
          path: '/guides/sites_frameworks/getting_started/nuxt3',
          icon: <IconNuxt />,
          iconDark: <IconNuxt />,
        },
        {
          title: 'Nuxt.js',
          path: '/guides/sites_frameworks/getting_started/nuxt',
          icon: <IconNuxt />,
          iconDark: <IconNuxt />,
        },
        {
          title: 'React',
          path: '/guides/sites_frameworks/getting_started/react',
          icon: <IconReact />,
          iconDark: <IconReact />,
        },
        {
          title: 'Vue.js',
          path: '/guides/sites_frameworks/getting_started/vue',
          icon: <IconVue />,
          iconDark: <IconVue />,
        },
      ],
    },
    {
      title: PRODUCT_PLATFORM,
      icon: <IconBookPlain />,
      iconDark: <IconBookPlainDark />,
      path: 'v4-framework-guides',
      sortRoutes: false,
      routes: [
        {
          title: 'Connectors',
          path: '/guides/connectors',
        },
        {
          title: 'Incremental Static (Re)generation',
          path: '/guides/isg',
          separator: true,
        },
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
          title: 'Lit',
          path: '/guides/lit',
          icon: <IconLit />,
          iconDark: <IconLit />,
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
          title: 'Scully',
          path: '/guides/scully',
          icon: <IconScully />,
          iconDark: <IconScully />,
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
      title: PRODUCT_PLATFORM,
      icon: <IconBookPlain />,
      iconDark: <IconBookPlainDark />,
      path: 'framework-guides',
      sortRoutes: false,
      routes: [
        {
          title: 'Angular',
          path: '/guides/sites_frameworks/getting_started/angular',
          icon: <IconAngular />,
          iconDark: <IconAngular />,
        },
        {
          title: 'Astro',
          path: '/guides/sites_frameworks/getting_started/astro',
          icon: <IconAstro />,
          iconDark: <IconAstroDark />,
        },
        {
          title: 'Brunch',
          path: '/guides/sites_frameworks/getting_started/brunch',
          icon: <IconBrunch />,
          iconDark: <IconBrunch />,
        },
        {
          title: 'Docusaurus',
          path: '/guides/sites_frameworks/getting_started/docusaurus',
          icon: <IconDocusaurus />,
          iconDark: <IconDocusaurus />,
        },
        {
          title: 'Dojo',
          path: '/guides/sites_frameworks/getting_started/dojo',
          icon: <IconDojo />,
          iconDark: <IconDojo />,
        },
        {
          title: 'Eleventy',
          path: '/guides/sites_frameworks/getting_started/eleventy',
          icon: <IconEleventy />,
          iconDark: <IconEleventyDark />,
        },
        {
          title: 'Ember.js',
          path: '/guides/sites_frameworks/getting_started/ember',
          icon: <IconEmberJS />,
          iconDark: <IconEmberJS />,
        },
        {
          title: 'Ember Fastboot',
          path: '/guides/sites_frameworks/getting_started/ember_fastboot',
          icon: <IconEmberFastboot />,
          iconDark: <IconEmberFastbootDark />,
        },
        {
          title: 'Express',
          path: '/guides/sites_frameworks/getting_started/express',
          icon: <IconExpress />,
          iconDark: <IconExpressDark />,
        },
        {
          title: 'Frontity',
          path: '/guides/sites_frameworks/getting_started/frontity',
          icon: <IconFrontity />,
          iconDark: <IconFrontity />,
        },
        {
          title: 'Gatsby',
          path: '/guides/sites_frameworks/getting_started/gatsby',
          icon: <IconGatsby />,
          iconDark: <IconGatsby />,
        },
        {
          title: 'Gridsome',
          path: '/guides/sites_frameworks/getting_started/gridsome',
          icon: <IconGridsome />,
          iconDark: <IconGridsomeDark />,
        },
        {
          title: 'Hexo',
          path: '/guides/sites_frameworks/getting_started/hexo',
          icon: <IconHexo />,
          iconDark: <IconHexo />,
        },
        {
          title: 'Hugo',
          path: '/guides/sites_frameworks/getting_started/hugo',
          icon: <IconHugo />,
          iconDark: <IconHugo />,
        },
        {
          title: 'Ionic React',
          path: '/guides/sites_frameworks/getting_started/ionic_react',
          icon: <IconIonicX />,
          iconDark: <IconIonicX />,
        },
        {
          title: 'Ionic Vue',
          path: '/guides/sites_frameworks/getting_started/ionic_vue',
          icon: <IconIonicX />,
          iconDark: <IconIonicX />,
        },
        {
          title: 'Jekyll',
          path: '/guides/sites_frameworks/getting_started/jekyll',
          icon: <IconJekyll />,
          iconDark: <IconJekyllDark />,
        },
        {
          title: 'Lit',
          path: '/guides/sites_frameworks/getting_started/lit',
          icon: <IconLit />,
          iconDark: <IconLit />,
        },
        {
          title: 'MkDocs',
          path: '/guides/sites_frameworks/getting_started/mkdocs',
          icon: <IconMKDocs />,
          iconDark: <IconMKDocsDark />,
        },
        {
          title: 'Next.js',
          path: '/guides/sites_frameworks/getting_started/next',
          icon: <IconNextJS />,
          iconDark: <IconNextJSDark />,
        },
        {
          title: 'Next.js Commerce',
          path: '/guides/sites_frameworks/getting_started/next_commerce',
          icon: <IconNextJSCommerce />,
          iconDark: <IconNextJSCommerceDark />,
        },
        {
          title: 'Nuxt.js',
          path: '/guides/sites_frameworks/getting_started/nuxt',
          icon: <IconNuxt />,
          iconDark: <IconNuxt />,
        },
        {
          title: 'Nuxt3',
          path: '/guides/sites_frameworks/getting_started/nuxt3',
          icon: <IconNuxt />,
          iconDark: <IconNuxt />,
        },
        {
          title: 'Preact',
          path: '/guides/sites_frameworks/getting_started/preact',
          icon: <IconPreact />,
          iconDark: <IconPreact />,
        },
        {
          title: 'Razzle',
          path: '/guides/sites_frameworks/getting_started/razzle',
          icon: <IconRazzle />,
          iconDark: <IconRazzle />,
        },
        {
          title: 'React',
          path: '/guides/sites_frameworks/getting_started/react',
          icon: <IconReact />,
          iconDark: <IconReact />,
        },
        {
          title: 'React Static',
          path: '/guides/sites_frameworks/getting_started/react_static',
          icon: <IconReactStatic />,
          iconDark: <IconReactStatic />,
        },
        {
          title: 'React Storefront',
          path: '/guides/sites_frameworks/getting_started/react-storefront',
          icon: <IconReactStorefront />,
          iconDark: <IconReactStorefront />,
        },
        {
          title: 'RedwoodJS',
          path: '/guides/sites_frameworks/getting_started/redwoodjs',
          icon: <IconRedwood />,
          iconDark: <IconRedwood />,
        },
        {
          title: 'Remix',
          path: '/guides/sites_frameworks/getting_started/remix',
          icon: <IconRemix />,
          iconDark: <IconRemixDark />,
        },
        {
          title: 'Saber',
          path: '/guides/sites_frameworks/getting_started/saber',
          icon: <IconSaber />,
          iconDark: <IconSaber />,
        },
        {
          title: 'Sanity',
          path: '/guides/sites_frameworks/getting_started/sanity',
          icon: <IconSanity />,
          iconDark: <IconSanity />,
        },
        {
          title: 'Sapper',
          path: '/guides/sites_frameworks/getting_started/sapper',
          icon: <IconSapper />,
          iconDark: <IconSapper />,
        },
        {
          title: 'Scully',
          path: '/guides/sites_frameworks/getting_started/scully',
          icon: <IconScully />,
          iconDark: <IconScully />,
        },
        {
          title: 'SolidJS',
          path: '/guides/sites_frameworks/getting_started/solid',
          icon: <IconSolidJS />,
          iconDark: <IconSolidJS />,
        },
        {
          title: 'Spartacus',
          path: '/guides/sites_frameworks/getting_started/spartacus',
          icon: <IconSpartacus />,
          iconDark: <IconSpartacus />,
        },
        {
          title: 'Static HTML/JS',
          path: '/guides/sites_frameworks/getting_started/static_sites',
          icon: <IconStaticHTMLJS />,
          iconDark: <IconStaticHTMLJS />,
        },
        {
          title: 'Stencil',
          path: '/guides/sites_frameworks/getting_started/stencil',
          icon: <IconStencil />,
          iconDark: <IconStencilDark />,
        },
        {
          title: 'Svelte',
          path: '/guides/sites_frameworks/getting_started/svelte',
          icon: <IconSvelte />,
          iconDark: <IconSvelte />,
        },
        {
          title: 'UmiJS',
          path: '/guides/sites_frameworks/getting_started/umijs',
          icon: <IconUmiJS />,
          iconDark: <IconUmiJS />,
        },
        {
          title: 'VitePress',
          path: '/guides/sites_frameworks/getting_started/vitepress',
          icon: <IconVitePress />,
          iconDark: <IconVitePress />,
        },
        {
          title: 'Vue Storefront',
          path: '/guides/sites_frameworks/getting_started/vsf',
          icon: <IconVueStorefront />,
          iconDark: <IconVueStorefront />,
        },
        {
          title: 'Vue.js',
          path: '/guides/sites_frameworks/getting_started/vue',
          icon: <IconVue />,
          iconDark: <IconVue />,
        },
        {
          title: 'VuePress',
          path: '/guides/sites_frameworks/getting_started/vuepress',
          icon: <IconVitePress />,
          iconDark: <IconVitePress />,
        },
        {
          title: 'Zola',
          path: '/guides/sites_frameworks/getting_started/zola',
          icon: <IconZola />,
          iconDark: <IconZolaDark />,
        },
      ],
    },
    {
      title: PRODUCT_SECURITY,
      icon: <IconSecurityPlain />,
      iconDark: <IconSecurityPlainDark />,
      path: 'security',
      sortRoutes: false,
      routes: [
        {
          title: 'Website Security (EdgeJS)',
          path: '/guides/security/edgejs_security',
          separator: true,
        },
        {
          title: 'Web Application Firewall (WAF)',
          path: '/guides/security/waf',
        },
        {
          title: 'Access Rules',
          path: '/guides/security/access_rules',
        },
        {
          title: 'Rate Rules',
          path: '/guides/security/rate_rules',
        },
        {
          title: 'Bot Rules',
          path: '/guides/security/bot_rules',
        },
        {
          title: 'Custom Rules',
          path: '/guides/security/custom_rules',
        },
        {
          title: 'Managed Rules',
          path: '/guides/security/managed_rules',
        },
        {
          title: 'Security Applications',
          path: '/guides/security/security_applications',
        },
        {
          title: 'Dashboard',
          path: '/guides/security/dashboard',
        },
        {
          title: 'Logs',
          path: '/guides/security/recent_event_logs',
        },
        {
          title: 'Response to Client',
          path: '/guides/security/response_to_client',
          separator: true,
        },
        {
          title: 'Country Codes',
          path: '/reference/country_codes',
        },
        {
          title: 'Matched On Variables',
          path: '/guides/security/matched_on_variables',
        },
      ],
    },
    {
      title: 'Environments',
      icon: <IconLeaf />,
      iconDark: <IconLeafDark />,
      path: 'environments',
      sortRoutes: false,
      routes: [
        {
          title: 'Environments',
          path: '/guides/basics/environments',
        },
      ],
    },
    {
      title: 'Integrations',
      icon: <IconGear />,
      iconDark: <IconGearDark />,
      path: 'integrations',
      sortRoutes: false,
      routes: [
        {
          title: 'Overview',
          path: '/guides/integrations',
          separator: true,
        },
        {
          title: 'BigCommerce',
          path: '/guides/integrations/bigcommerce',
          icon: <IconBigCommerce />,
          iconDark: <IconBigCommerceDark />,
        },
        {
          title: 'Bloomreach',
          path: '/guides/integrations/bloomreach',
          icon: <IconBloomreach />,
          iconDark: <IconBloomreachDark />,
        },
        {
          title: 'Shopify Hydrogen',
          path: '/guides/integrations/shopify_hydrogen',
          icon: <IconShopifyHydrogen />,
          iconDark: <IconShopifyHydrogen />,
        },
        {
          title: 'Swell',
          path: '/guides/integrations/swell',
          icon: <IconSwell />,
          iconDark: <IconSwellDark />,
        },

        {
          title: 'WordPress',
          path: '/guides/integrations/wordpress',
          icon: <IconWordPress />,
          iconDark: <IconWordPress />,
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
          title: 'Alerts',
          path: '/guides/basics/alerts',
        },
        {
          title: 'Teams',
          path: '/guides/basics/collaboration',
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
          path: '/guides/develop/cli',
        },
        {
          title: 'Devtools',
          path: '/guides/performance/observability/devtools',
        },
        {
          title: 'EdgeJS Unit Testing',
          path: '/guides/performance/unit_testing_edgejs',
        },
        {
          title: `Deploy to ${PRODUCT} Button`,
          path: '/guides/develop/deploy_to_edgio',
        },
      ],
    },
    {
      title: 'APIs',
      icon: <IconFolder />,
      iconDark: <IconFolderDark />,
      path: 'apis',
      sortRoutes: false,
      routes: [
        {
          title: 'REST API',
          path: '/guides/develop/rest_api',
        },
        {
          title: `${PACKAGE_NAME}/core Package`,
          path: '/docs/api/core/',
          external: true,
        },
        {
          title: `${PACKAGE_NAME}/prefetch Package`,
          path: '/docs/api/prefetch/',
          external: true,
        },
        {
          title: `@${PRODUCT_LEGACY_LOWER}/core (v4.x) Package`,
          path: '/docs/v4.x/api/core/',
          external: true,
        },
        {
          title: `@${PRODUCT_LEGACY_LOWER}/prefetch (v4.x) Package`,
          path: '/docs/v4.x/api/prefetch/',
          external: true,
        },
        {
          title: `@${PRODUCT_LEGACY_LOWER}/core (v3.x) Package`,
          path: '/docs/v3.x/api/core/',
          external: true,
        },
        {
          title: `@${PRODUCT_LEGACY_LOWER}/prefetch (v3.x) Package`,
          path: '/docs/v3.x/api/prefetch/',
          external: true,
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
          title: 'v6 Migration Guide',
          path: '/guides/upgrading/v6_migration',
        },
        {
          title: 'v5 Migration Guide',
          path: '/guides/upgrading/v5_migration',
        },
        {
          title: 'v4 Migration Guide',
          path: '/guides/upgrading/layer0_migration',
        },
        {
          title: CONFIG_FILE,
          path: '/guides/performance/cdn_as_code/edgio_config',
        },
      ],
    },
  ],
  [
    {
      title: 'Edgio v4 Documentation',
      icon: <IconEdgioSquareLogo />,
      iconDark: <IconEdgioSquareLogoDark />,
      path: 'https://docs.layer0.co',
    },
    {
      title: 'Fiddle',
      icon: <IconFiddle />,
      iconDark: <IconFiddleDark />,
      path: `${FIDDLE_URL}/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`,
    },
    {
      title: 'Forum',
      icon: <IconForum />,
      iconDark: <IconForumDark />,
      path: 'https://forum.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Status',
      icon: <IconStatus />,
      iconDark: <IconStatusDark />,
      path: 'https://status.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    },
    {
      title: 'Support',
      icon: <IconSupport />,
      iconDark: <IconSupportDark />,
      path: 'https://edg.io/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
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

export const prerenderPaths = map(
  flatMap(flatten(SidebarMenuItems), (item: any) => item.routes),
  (item: any) => {
    if (item && item.path.startsWith('/')) {
      return {path: item.path};
    }

    return;
  }
);

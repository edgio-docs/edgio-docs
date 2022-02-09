import { IconAngular } from '../components/Icon/IconAngular';
import { IconAstro } from '../components/Icon/IconAstro';
import { IconBookPlain } from '../components/Icon/IconBookPlain';
import { IconBrunch } from '../components/Icon/IconBrunch';
import { IconBulb } from '../components/Icon/IconBulb';
import { IconCodePlain } from '../components/Icon/IconCodePlain';
import { IconDocusaurus } from '../components/Icon/IconDocusaurus';
import { IconDojo } from '../components/Icon/IconDojo';
import { IconEleventy } from '../components/Icon/IconEleventy';
import { IconEmberFastboot } from '../components/Icon/IconEmberFastboot';
import { IconEmberJS } from '../components/Icon/IconEmberJS';
import { IconExpress } from '../components/Icon/IconExpress';
import { IconFiddle } from '../components/Icon/IconFiddle';
import { IconFolder } from '../components/Icon/IconFolder';
import { IconForum } from '../components/Icon/IconForum';
import { IconFrontity } from '../components/Icon/IconFrontity';
import { IconGatsby } from '../components/Icon/IconGatsby';
import { IconGridsome } from '../components/Icon/IconGridsome';
import { IconHexo } from '../components/Icon/IconHexo';
import { IconHugo } from '../components/Icon/IconHugo';
import { IconIonicX } from '../components/Icon/IconIonicX';
import { IconJekyll } from '../components/Icon/IconJekyll';
import { IconLogo } from '../components/Icon/IconLogo';
import { IconMKDocs } from '../components/Icon/IconMKDocs';
import { IconNextJS } from '../components/Icon/IconNextJS';
import { IconNextJSCommerce } from '../components/Icon/IconNextJSCommerce';
import { IconNX } from '../components/Icon/IconNX';
import { IconPreact } from '../components/Icon/IconPreact';
import { IconRazzle } from '../components/Icon/IconRazzle';
import { IconReact } from '../components/Icon/IconReact';
import { IconReactStatic } from '../components/Icon/IconReactStatic';
import { IconReactStorefront } from '../components/Icon/IconReactStorefront';
import { IconRemix } from '../components/Icon/IconRemix';
import { IconRedwood } from '../components/Icon/IconRedwood';
import { IconSaber } from '../components/Icon/IconSaber';
import { IconSapper } from '../components/Icon/IconSapper';
import { IconServerlessFunctions } from '../components/Icon/IconServerlessFunctions';
import { IconServerSmall } from '../components/Icon/IconServerSmall';
import { IconShopifyHydrogen } from '../components/Icon/IconShopifyHydrogen';
import { IconSolidJS } from '../components/Icon/IconSolidJS';
import { IconSparkPlain } from '../components/Icon/IconSparkPlain';
import { IconSpartarcus } from '../components/Icon/IconSpartarcus';
import { IconStacksPlain } from '../components/Icon/IconStacksPlain';
import { IconStaticHTMLJS } from '../components/Icon/IconStaticHTMLJS';
import { IconStatus } from '../components/Icon/IconStatus';
import { IconStencil } from '../components/Icon/IconStencil';
import { IconSupport } from '../components/Icon/IconSupport';
import { IconSvelte } from '../components/Icon/IconSvelte';
import { IconSwell } from '../components/Icon/IconSwell';
import { IconUmiJS } from '../components/Icon/IconUmiJS';
import { IconUserPlain } from '../components/Icon/IconUserPlain';
import { IconVideos } from '../components/Icon/IconVideos';
import { IconVitePress } from '../components/Icon/IconVitePress';
import { IconVue } from '../components/Icon/IconVue';
import { IconZola } from '../components/Icon/IconZola';
import { IconVueStorefront } from '../components/Icon/VueStorefront';

export interface IChildrenRoutes {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
}

export interface ISidebarMenuItem {
  title: string;
  icon: JSX.IntrinsicElements['svg'];
  path: string;
  routes?: Array<IChildrenRoutes>;
}

const SidebarMenuItems: Array<Array<ISidebarMenuItem>> = [
  [
    {
      title: 'Platform Overview',
      icon: <IconLogo />,
      path: '',
    },
    {
      title: 'Getting Started',
      icon: <IconSparkPlain />,
      path: 'getting-started',
      routes: [
        {
          title: 'WebApp CDN',
          path: 'webapp-cdn',
        },
        {
          title: 'Jamstack',
          path: 'jamstack',
        },
        {
          title: 'GraphQL CDN',
          path: 'graphql-cdn',
        },
        {
          title: 'Deploying',
          path: 'deploying',
        },
        {
          title: 'System Overview',
          path: 'system-overview',
        },
      ],
    },
    {
      title: 'CDN',
      icon: <IconServerSmall />,
      path: 'cdn',
      routes: [
        {
          title: 'Caching',
          path: 'caching',
        },
        {
          title: 'Common Routing Patterns',
          path: 'common-routing-patterns',
        },
        {
          title: 'Connectors',
          path: 'connectors',
        },
        {
          title: 'Core Web Vitals',
          path: 'core-web-vitals',
        },
        {
          title: 'Custom Domans & SSL',
          path: 'custom-domains-ssl',
        },
        {
          title: 'Edge Network',
          path: 'edge-network',
        },
        {
          title: 'EdgeJS Routing',
          path: 'edgejs-routing',
        },
        {
          title: 'Image Optimization',
          path: 'image-optimization',
        },
        {
          title: 'Incremental Static (Re)generation',
          path: 'isg',
        },
        {
          title: 'Performance',
          path: 'performance',
        },
        {
          title: 'Prefetching',
          path: 'prefetching',
        },
        {
          title: 'Purging',
          path: 'purging',
        },
        {
          title: 'Security',
          path: 'security',
        },
        {
          title: 'Split Testing',
          path: 'split-testing',
        },
        {
          title: 'Static Prerendering',
          path: 'static-prerendering',
        },
        {
          title: 'Third Party CDNs',
          path: 'third-party-cdns',
        },
        {
          title: 'Traditional Sites',
          path: 'traditional-sites',
        },
        {
          title: 'Troubleshooting',
          path: 'troubleshooting',
        },
      ],
    },
    {
      title: 'Developer Tools',
      icon: <IconCodePlain />,
      path: 'dev-tools',
      routes: [
        {
          title: 'CLI',
          path: 'cli',
        },
        {
          title: 'Devtools',
          path: 'devtools',
        },
        {
          title: 'Logs',
          path: 'logs',
        },
      ],
    },
    {
      title: 'Accounts & Teams',
      icon: <IconUserPlain />,
      path: 'accounts-teams',
      routes: [
        {
          title: 'Environments',
          path: 'environments',
        },
        {
          title: 'Teams',
          path: 'teams',
        },
      ],
    },
    {
      title: 'Framework Guides',
      icon: <IconBookPlain />,
      path: 'framework-guides',
      routes: [
        {
          title: 'Angular',
          path: 'angular',
          icon: <IconAngular />,
        },
        {
          title: 'Astro',
          path: 'astro',
          icon: <IconAstro />,
        },
        {
          title: 'Brunch',
          path: 'brunch',
          icon: <IconBrunch />,
        },
        {
          title: 'Docusaurus',
          path: 'docusaurus',
          icon: <IconDocusaurus />,
        },
        {
          title: 'Dojo',
          path: 'dojo',
          icon: <IconDojo />,
        },
        {
          title: 'Eleventy',
          path: 'eleventy',
          icon: <IconEleventy />,
        },
        {
          title: 'Ember Fastboot',
          path: 'ember-fastboot',
          icon: <IconEmberFastboot />,
        },
        {
          title: 'Ember.js',
          path: 'ember',
          icon: <IconEmberJS />,
        },
        {
          title: 'Express',
          path: 'express',
          icon: <IconExpress />,
        },
        {
          title: 'Frontity',
          path: 'frontity',
          icon: <IconFrontity />,
        },
        {
          title: 'Gatsby',
          path: 'gatsby',
          icon: <IconGatsby />,
        },
        {
          title: 'Gridsome',
          path: 'gridsome',
          icon: <IconGridsome />,
        },
        {
          title: 'Hexo',
          path: 'hexo',
          icon: <IconHexo />,
        },
        {
          title: 'Hugo',
          path: 'hugo',
          icon: <IconHugo />,
        },
        {
          title: 'Ionic React',
          path: 'ionic-react',
          icon: <IconIonicX />,
        },
        {
          title: 'Ionic Vue',
          path: 'ionic-vue',
          icon: <IconIonicX />,
        },
        {
          title: 'Jekyll',
          path: 'jekyll',
          icon: <IconJekyll />,
        },
        {
          title: 'MKDocs',
          path: 'mkdocs',
          icon: <IconMKDocs />,
        },
        {
          title: 'Next.js',
          path: 'nextjs',
          icon: <IconNextJS />,
        },
        {
          title: 'Next.js Commerce',
          path: 'nextjs-commerce',
          icon: <IconNextJSCommerce />,
        },
        {
          title: 'Nuxt.js',
          path: 'nuxtjs',
          icon: <IconAstro />,
        },
        {
          title: 'React NX',
          path: 'nx',
          icon: <IconNX />,
        },
        {
          title: 'Preact',
          path: 'preact',
          icon: <IconPreact />,
        },
        {
          title: 'Razzle',
          path: 'razzle',
          icon: <IconRazzle />,
        },
        {
          title: 'React',
          path: 'react',
          icon: <IconReact />,
        },
        {
          title: 'React Static',
          path: 'react-static',
          icon: <IconReactStatic />,
        },
        {
          title: 'React Storefront',
          path: 'react-storefront',
          icon: <IconReactStorefront />,
        },
        {
          title: 'Redwood',
          path: 'redwoodjs',
          icon: <IconRedwood />,
        },
        {
          title: 'Remix',
          path: 'remix',
          icon: <IconRemix />,
        },
        {
          title: 'Saber',
          path: 'saber',
          icon: <IconSaber />,
        },
        {
          title: 'Sapper',
          path: 'sapper',
          icon: <IconSapper />,
        },
        {
          title: 'Serverless Functions',
          path: 'serverless-functions',
          icon: <IconServerlessFunctions />,
        },
        {
          title: 'Shopify Hydrogen',
          path: 'shopify-hydrogen',
          icon: <IconShopifyHydrogen />,
        },
        {
          title: 'SolidJS',
          path: 'solidjs',
          icon: <IconSolidJS />,
        },
        {
          title: 'Spartacus',
          path: 'spartacus',
          icon: <IconSpartarcus />,
        },
        {
          title: 'Static HTML/JavaScript',
          path: 'static-html-javascript',
          icon: <IconStaticHTMLJS />,
        },
        {
          title: 'Stencil',
          path: 'stencil',
          icon: <IconStencil />,
        },
        {
          title: 'Svelte',
          path: 'svelte',
          icon: <IconSvelte />,
        },
        {
          title: 'Swell',
          path: 'swell',
          icon: <IconSwell />,
        },
        {
          title: 'UmiJS',
          path: 'umijs',
          icon: <IconUmiJS />,
        },
        {
          title: 'VitePress',
          path: 'vitepress',
          icon: <IconVitePress />,
        },
        {
          title: 'Vue Storefront',
          path: 'vue-storefront',
          icon: <IconVueStorefront />,
        },
        {
          title: 'Vue.js',
          path: 'vuejs',
          icon: <IconVue />,
        },
        {
          title: 'VuePress',
          path: 'vuepress',
          icon: <IconVitePress />,
        },
        {
          title: 'Zola',
          path: 'zola',
          icon: <IconZola />,
        },
      ],
    },
    {
      title: 'Reference',
      icon: <IconStacksPlain />,
      path: 'reference',
      routes: [
        {
          title: 'Bots',
          path: 'bots',
        },
        {
          title: 'Changelog',
          path: 'changelog',
        },
        {
          title: 'Contributing',
          path: 'contributing',
        },
        {
          title: 'Cookies',
          path: 'cookies',
        },
        {
          title: 'Deploy to Layer0 Button',
          path: 'deploy-to-layer0-button',
        },
        {
          title: 'Install Node.js',
          path: 'install-nodejs',
        },
        {
          title: 'Layer0 for Traditional Sites',
          path: 'layer0-for-traditional-sites',
        },
        {
          title: 'layer0.config.js',
          path: 'layer0-config-js',
        },
        {
          title: 'Limits',
          path: 'limits',
        },
        {
          title: 'Request Headers',
          path: 'request-headers',
        },
        {
          title: 'Response Headers',
          path: 'response-headers',
        },
        {
          title: 'REST API',
          path: 'rest-api',
        },
        {
          title: 'Status Codes',
          path: 'status-codes',
        },
        {
          title: 'v4 Migration Guide',
          path: 'v4-migration-guide',
        },
      ],
    },
    {
      title: 'Videos',
      icon: <IconVideos />,
      path: 'videos',
    },
    {
      title: 'Package APIs',
      icon: <IconFolder />,
      path: 'package-apis',
    },
    {
      title: 'Learning Resources',
      icon: <IconBulb />,
      path: 'learning-resources',
      routes: [
        {
          title: 'What is GraphQL?',
          path: 'what-is-graphql',
        },
      ],
    },
  ],
  [
    {
      title: 'Fiddle',
      icon: <IconFiddle />,
      path: '',
    },
    {
      title: 'Forum',
      icon: <IconForum />,
      path: '',
    },
    {
      title: 'Status',
      icon: <IconStatus />,
      path: '',
    },
    {
      title: 'Support',
      icon: <IconSupport />,
      path: '',
    },
  ],
];

export default SidebarMenuItems;

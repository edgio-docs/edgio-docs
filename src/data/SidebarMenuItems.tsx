import {IconAngular} from '../components/Icon/IconAngular';
import {IconAstro} from '../components/Icon/IconAstro';
import {IconBookPlain} from '../components/Icon/IconBookPlain';
import {IconBrunch} from '../components/Icon/IconBrunch';
import {IconBulb} from '../components/Icon/IconBulb';
import {IconCodePlain} from '../components/Icon/IconCodePlain';
import {IconDocusaurus} from '../components/Icon/IconDocusaurus';
import {IconDojo} from '../components/Icon/IconDojo';
import {IconEleventy} from '../components/Icon/IconEleventy';
import {IconEmberFastboot} from '../components/Icon/IconEmberFastboot';
import {IconEmberJS} from '../components/Icon/IconEmberJS';
import {IconExpress} from '../components/Icon/IconExpress';
import {IconFiddle} from '../components/Icon/IconFiddle';
import {IconFolder} from '../components/Icon/IconFolder';
import {IconForum} from '../components/Icon/IconForum';
import {IconFrontity} from '../components/Icon/IconFrontity';
import {IconGatsby} from '../components/Icon/IconGatsby';
import {IconGridsome} from '../components/Icon/IconGridsome';
import {IconHexo} from '../components/Icon/IconHexo';
import {IconHugo} from '../components/Icon/IconHugo';
import {IconIonicX} from '../components/Icon/IconIonicX';
import {IconJekyll} from '../components/Icon/IconJekyll';
// import { IconLogo } from '../components/Icon/IconLogo';
import {IconMKDocs} from '../components/Icon/IconMKDocs';
import {IconNextJS} from '../components/Icon/IconNextJS';
import {IconNextJSCommerce} from '../components/Icon/IconNextJSCommerce';
import {IconNX} from '../components/Icon/IconNX';
import {IconPreact} from '../components/Icon/IconPreact';
import {IconRazzle} from '../components/Icon/IconRazzle';
import {IconReact} from '../components/Icon/IconReact';
import {IconReactStatic} from '../components/Icon/IconReactStatic';
import {IconReactStorefront} from '../components/Icon/IconReactStorefront';
import {IconRemix} from '../components/Icon/IconRemix';
import {IconRedwood} from '../components/Icon/IconRedwood';
import {IconSaber} from '../components/Icon/IconSaber';
import {IconSapper} from '../components/Icon/IconSapper';
import {IconServerlessFunctions} from '../components/Icon/IconServerlessFunctions';
import {IconServerSmall} from '../components/Icon/IconServerSmall';
import {IconShopifyHydrogen} from '../components/Icon/IconShopifyHydrogen';
import {IconSolidJS} from '../components/Icon/IconSolidJS';
import {IconSparkPlain} from '../components/Icon/IconSparkPlain';
import {IconSpartarcus} from '../components/Icon/IconSpartarcus';
import {IconStacksPlain} from '../components/Icon/IconStacksPlain';
import {IconStaticHTMLJS} from '../components/Icon/IconStaticHTMLJS';
import {IconStatus} from '../components/Icon/IconStatus';
import {IconStencil} from '../components/Icon/IconStencil';
import {IconSupport} from '../components/Icon/IconSupport';
import {IconSvelte} from '../components/Icon/IconSvelte';
import {IconSwell} from '../components/Icon/IconSwell';
import {IconUmiJS} from '../components/Icon/IconUmiJS';
import {IconUserPlain} from '../components/Icon/IconUserPlain';
import {IconVideos} from '../components/Icon/IconVideos';
import {IconVitePress} from '../components/Icon/IconVitePress';
import {IconVue} from '../components/Icon/IconVue';
import {IconZola} from '../components/Icon/IconZola';
import {IconVueStorefront} from '../components/Icon/VueStorefront';

export interface IChildrenRoutes {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
  external?: boolean;
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
      title: 'Getting Started',
      icon: <IconSparkPlain />,
      path: 'getting-started',
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
      path: 'cdn',
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
      path: 'dev-tools',
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
          title: 'Logs',
          path: '/guides/logs',
        },
      ],
    },
    {
      title: 'Accounts & Teams',
      icon: <IconUserPlain />,
      path: 'accounts-teams',
      routes: [
        {
          title: 'Teams',
          path: '/guides/teams',
        },
        {
          title: 'Environments',
          path: '/guides/environments',
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
          path: '/guides/angular',
          icon: <IconAngular />,
        },
        {
          title: 'Astro',
          path: '/guides/astro',
          icon: <IconAstro />,
        },
        {
          title: 'Brunch',
          path: '/guides/brunch',
          icon: <IconBrunch />,
        },
        {
          title: 'Docusaurus',
          path: '/guides/docusaurus',
          icon: <IconDocusaurus />,
        },
        {
          title: 'Dojo',
          path: '/guides/dojo',
          icon: <IconDojo />,
        },
        {
          title: 'Eleventy',
          path: '/guides/eleventy',
          icon: <IconEleventy />,
        },
        {
          title: 'Ember.js',
          path: '/guides/ember',
          icon: <IconEmberFastboot />,
        },
        {
          title: 'Ember Fastboot',
          path: '/guides/ember_fastboot',
          icon: <IconEmberJS />,
        },
        {
          title: 'Express',
          path: '/guides/express',
          icon: <IconExpress />,
        },
        {
          title: 'Frontity',
          path: '/guides/frontity',
          icon: <IconFrontity />,
        },
        {
          title: 'Gatsby',
          path: '/guides/gatsby',
          icon: <IconGatsby />,
        },
        {
          title: 'Gridsome',
          path: '/guides/gridsome',
          icon: <IconGridsome />,
        },
        {
          title: 'Hexo',
          path: '/guides/hexo',
          icon: <IconHexo />,
        },
        {
          title: 'Hugo',
          path: '/guides/hugo',
          icon: <IconHugo />,
        },
        {
          title: 'Ionic React',
          path: '/guides/ionic_react',
          icon: <IconIonicX />,
        },
        {
          title: 'Ionic Vue',
          path: '/guides/ionic_vue',
          icon: <IconIonicX />,
        },
        {
          title: 'Jekyll',
          path: '/guides/jekyll',
          icon: <IconJekyll />,
        },
        {
          title: 'MkDocs',
          path: '/guides/mkdocs',
          icon: <IconMKDocs />,
        },
        {
          title: 'NX',
          path: '/guides/nx',
          icon: <IconNextJS />,
        },
        {
          title: 'Next.js',
          path: '/guides/next',
          icon: <IconNextJSCommerce />,
        },
        {
          title: 'Next.js Commerce',
          path: '/guides/next_commerce',
          icon: <IconAstro />,
        },
        {
          title: 'Nuxt.js',
          path: '/guides/nuxt',
          icon: <IconNX />,
        },
        {
          title: 'Preact',
          path: '/guides/preact',
          icon: <IconPreact />,
        },
        {
          title: 'Razzle',
          path: '/guides/razzle',
          icon: <IconRazzle />,
        },
        {
          title: 'React',
          path: '/guides/react',
          icon: <IconReact />,
        },
        {
          title: 'React Static',
          path: '/guides/react_static',
          icon: <IconReactStatic />,
        },
        {
          title: 'React Storefront',
          path: '/guides/react-storefront',
          icon: <IconReactStorefront />,
        },
        {
          title: 'RedwoodJS',
          path: '/guides/redwoodjs',
          icon: <IconRedwood />,
        },
        {
          title: 'Remix',
          path: '/guides/remix',
          icon: <IconRemix />,
        },
        {
          title: 'Saber',
          path: '/guides/saber',
          icon: <IconSaber />,
        },
        {
          title: 'Sapper',
          path: '/guides/sapper',
          icon: <IconSapper />,
        },
        {
          title: 'Serverless Functions',
          path: '/guides/serverless_functions',
          icon: <IconServerlessFunctions />,
        },
        {
          title: 'Shopify Hydrogen',
          path: '/guides/shopify_hydrogen',
          icon: <IconShopifyHydrogen />,
        },
        {
          title: 'SolidJS',
          path: '/guides/solid',
          icon: <IconSolidJS />,
        },
        {
          title: 'Spartacus',
          path: '/guides/spartacus',
          icon: <IconSpartarcus />,
        },
        {
          title: 'Static HTML/JS',
          path: '/guides/static_sites',
          icon: <IconStaticHTMLJS />,
        },
        {
          title: 'Stencil',
          path: '/guides/stencil',
          icon: <IconStencil />,
        },
        {
          title: 'Svelte',
          path: '/guides/svelte',
          icon: <IconSvelte />,
        },
        {
          title: 'Swell',
          path: '/guides/swell',
          icon: <IconSwell />,
        },
        {
          title: 'UmiJS',
          path: '/guides/umijs',
          icon: <IconUmiJS />,
        },
        {
          title: 'VitePress',
          path: '/guides/vitepress',
          icon: <IconVitePress />,
        },
        {
          title: 'Vue Storefront',
          path: '/guides/vsf',
          icon: <IconVueStorefront />,
        },
        {
          title: 'Vue.js',
          path: '/guides/vue',
          icon: <IconVue />,
        },
        {
          title: 'VuePress',
          path: '/guides/vuepress',
          icon: <IconVitePress />,
        },
        {
          title: 'Zola',
          path: '/guides/zola',
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
          title: 'Changelog',
          path: '/guides/changelog',
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
          path: '/guides/install-nodejs',
        },
        {
          title: 'Deploy to Layer0 Button',
          path: '/guides/deploy-to-layer0',
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
      path: 'videos',
      routes: [
        {
          title: 'Product Updates',
          path: 'https://www.youtube.com/playlist?list=PLv3_GoCvQgUn8pKufafW2Ufy0DXTL3BCp',
          external: true,
        },
        {
          title: 'Layer0 Tutorials',
          path: 'https://www.youtube.com/playlist?list=PLv3_GoCvQgUnbIlR-OFhS9dQW4oSHv4ji',
          external: true,
        },
      ],
    },
    {
      title: 'Package APIs',
      icon: <IconFolder />,
      path: 'package-apis',
      routes: [
        {
          title: '@layer0/core',
          path: 'https://docs.layer0.co/docs/api/core',
          external: true,
        },
        {
          title: '@layer0/prefetch',
          path: 'https://docs.layer0.co/docs/api/prefetch',
          external: true,
        },
      ],
    },
    {
      title: 'Learning Resources',
      icon: <IconBulb />,
      path: 'learning-resources',
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

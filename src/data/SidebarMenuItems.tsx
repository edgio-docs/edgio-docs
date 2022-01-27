import {IconBookPlain} from '../components/Icon/IconBookPlain';
import {IconBulb} from '../components/Icon/IconBulb';
import {IconCodePlain} from '../components/Icon/IconCodePlain';
import {IconFolder} from '../components/Icon/IconFolder';
import {IconLogo} from '../components/Icon/IconLogo';
import {IconServerSmall} from '../components/Icon/IconServerSmall';
import {IconSparkPlain} from '../components/Icon/IconSparkPlain';
import {IconStacksPlain} from '../components/Icon/IconStacksPlain';
import {IconUserPlain} from '../components/Icon/IconUserPlain';
import {IconVideos} from '../components/Icon/IconVideos';

interface ISidebarMenuItems {
  title: string;
  icon: JSX.IntrinsicElements['svg'];
  path: string;
  routes?: Array<{title: string; path: string}>;
}

const SidebarMenuItems: Array<ISidebarMenuItems> = [
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
      },
      {
        title: 'Astro',
        path: 'astro',
      },
      {
        title: 'Brunch',
        path: 'brunch',
      },
      {
        title: 'Docusaurus',
        path: 'docusaurus',
      },
      {
        title: 'Dojo',
        path: 'dojo',
      },
      {
        title: 'Eleventy',
        path: 'eleventy',
      },
      {
        title: 'Ember Fastboot',
        path: 'ember-fastboot',
      },
      {
        title: 'Ember.js',
        path: 'ember',
      },
      {
        title: 'Express',
        path: 'express',
      },
      {
        title: 'Frontity',
        path: 'frontity',
      },
      {
        title: 'Gatsby',
        path: 'gatsby',
      },
      {
        title: 'Gridsome',
        path: 'gridsome',
      },
      {
        title: 'Hexo',
        path: 'hexo',
      },
      {
        title: 'Hugo',
        path: 'hugo',
      },
      {
        title: 'Ionic React',
        path: 'ionic-react',
      },
      {
        title: 'Ionic Vue',
        path: 'ionic-vue',
      },
      {
        title: 'Jekyll',
        path: 'jekyll',
      },
      {
        title: 'MKDocs',
        path: 'mkdocs',
      },
      {
        title: 'Next.js',
        path: 'nextjs',
      },
      {
        title: 'Next.js Commerce',
        path: 'nextjs-commerce',
      },
      {
        title: 'Nuxt.js',
        path: 'nuxtjs',
      },
      {
        title: 'NX',
        path: 'nx',
      },
      {
        title: 'Preact',
        path: 'preact',
      },
      {
        title: 'Razzle',
        path: 'razzle',
      },
      {
        title: 'React',
        path: 'react',
      },
      {
        title: 'React Static',
        path: 'react-static',
      },
      {
        title: 'React Storefront',
        path: 'react-storefront',
      },
      {
        title: 'Remix',
        path: 'remix',
      },
      {
        title: 'Saber',
        path: 'saber',
      },
      {
        title: 'Sapper',
        path: 'sapper',
      },
      {
        title: 'Serverless Functions',
        path: 'serverless-functions',
      },
      {
        title: 'Shopify Hydrogen',
        path: 'shopify-hydrogen',
      },
      {
        title: 'SolidJS',
        path: 'solidjs',
      },
      {
        title: 'Spartacus',
        path: 'spartacus',
      },
      {
        title: 'Static HTML/JavaScript',
        path: 'static-html-javascript',
      },
      {
        title: 'Stencil',
        path: 'stencil',
      },
      {
        title: 'Svelte',
        path: 'svelte',
      },
      {
        title: 'Swell',
        path: 'swell',
      },
      {
        title: 'UmiJS',
        path: 'umijs',
      },
      {
        title: 'VitePress',
        path: 'vitepress',
      },
      {
        title: 'Vue Storefront',
        path: 'vue-storefront',
      },
      {
        title: 'Vue.js',
        path: 'vuejs',
      },
      {
        title: 'VuePress',
        path: 'vuepress',
      },
      {
        title: 'Zola',
        path: 'zola',
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
];

export default SidebarMenuItems;

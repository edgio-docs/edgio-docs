import Link from 'next/link';
import styled from 'styled-components';

import {
  IconAngular,
  IconAstro,
  IconAstroDark,
  IconBrunch,
  IconDocusaurus,
  IconDojo,
  IconEleventy,
  IconEleventyDark,
  IconEmberJS,
  IconEmberFastboot,
  IconEmberFastbootDark,
  IconExpress,
  IconExpressDark,
  IconFrontity,
  IconGatsby,
  IconGridsome,
  IconGridsomeDark,
  IconHexo,
  IconHugo,
  IconIonicX,
  IconJekyll,
  IconJekyllDark,
  IconLit,
  IconMKDocs,
  IconMKDocsDark,
  IconNX,
  IconNXDark,
  IconNextJS,
  IconNextJSDark,
  IconNextJSCommerce,
  IconNextJSCommerceDark,
  IconNuxt,
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
  IconSolidJS,
  IconSpartacus,
  IconStaticHTMLJS,
  IconStencil,
  IconStencilDark,
  IconSvelte,
  IconUmiJS,
  IconVitePress,
  IconVueStorefront,
  IconVue,
  IconZola,
  IconZolaDark,
} from 'components/Icon';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

const StyledFrameworks = styled.div`
  .framework-lists {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(174px, 1fr));
    gap: 20px;
  }

  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .framework-list__item {
    .framework-link {
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid var(--hr-secondary);
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
    }
  }
`;

const items = {
  '4': [
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
  '7': [
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
      title: 'SolidJS',
      path: '/guides/sites_frameworks/getting_started/solid',
      icon: <IconSolidJS />,
      iconDark: <IconSolidJS />,
    },
    {
      title: 'Stencil',
      path: '/guides/sites_frameworks/getting_started/stencil',
      icon: <IconStencil />,
      iconDark: <IconStencilDark />,
    },
    {
      title: 'VitePress',
      path: '/guides/sites_frameworks/getting_started/vitepress',
      icon: <IconVitePress />,
      iconDark: <IconVitePress />,
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
  default: [
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
};

export default function Frameworks() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();

  const routesByColumns = itemsByColumn(items, version, 'title').flat();

  return (
    <StyledFrameworks>
      <ul className="framework-lists">
        {routesByColumns.map((route) => (
          <li key={route.path} className="framework-list__item">
            <Link href={version.toVersionedPath(route.path)} passHref>
              <a className="framework-link">
                <div className="icon" id="light-theme">
                  {/* @ts-ignore */}
                  {route.icon ? route.icon : null}
                </div>
                <div className="icon" id="dark-theme">
                  {/* @ts-ignore */}
                  {route.iconDark ? route.iconDark : null}
                </div>
                <span className="link-text">{route.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledFrameworks>
  );
}

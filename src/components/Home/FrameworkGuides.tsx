import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT_PLATFORM} from '../../../constants';
import {IconAngular} from '../Icon/IconAngular';
import {IconAstro, IconAstroDark} from '../Icon/IconAstro';
import {IconBook} from '../Icon/IconBook';
import {IconEmberJS} from '../Icon/IconEmberJS';
import {IconGatsby} from '../Icon/IconGatsby';
import {IconNextJS, IconNextJSDark} from '../Icon/IconNextJS';
import {
  IconNextJSCommerce,
  IconNextJSCommerceDark,
} from '../Icon/IconNextJSCommerce';
import {IconNuxt} from '../Icon/IconNuxt';
import {IconPreact} from '../Icon/IconPreact';
import {IconReact} from '../Icon/IconReact';
import {IconReactStatic} from '../Icon/IconReactStatic';
import {IconRedwood} from '../Icon/IconRedwood';
import {IconRemix, IconRemixDark} from '../Icon/IconRemix';
import {IconServerlessFunctions} from '../Icon/IconServerlessFunctions';
import {IconSolidJS} from '../Icon/IconSolidJS';
import {IconSvelte} from '../Icon/IconSvelte';
import {IconVue} from '../Icon/IconVue';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import {IconArrow} from 'components/Icon/IconArrow';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

const items = {
  '4': [
    {
      title: 'Next.js',
      path: '/guides/next',
      icon: {
        light: <IconNextJS />,
        dark: <IconNextJSDark />,
      },
    },
    {
      title: 'React',
      path: '/guides/react',
      icon: {
        light: <IconReact />,
        dark: <IconReact />,
      },
    },
    {
      title: 'Vue Storefront',
      path: '/guides/vsf',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'Gatsby',
      path: '/guides/gatsby',
      icon: {
        light: <IconGatsby />,
        dark: <IconGatsby />,
      },
    },
    {
      title: 'Vue.js',
      path: '/guides/vue',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'Angular',
      path: '/guides/angular',
      icon: {
        light: <IconAngular />,
        dark: <IconAngular />,
      },
    },
    {
      title: 'Serverless Compute',
      path: '/guides/serverless_functions',
      icon: {
        light: <IconServerlessFunctions />,
        dark: <IconServerlessFunctions />,
      },
    },
    {
      title: 'Remix',
      path: '/guides/remix',
      icon: {
        light: <IconRemix />,
        dark: <IconRemixDark />,
      },
    },
    {
      title: 'Next.js Commerce',
      path: '/guides/next_commerce',
      icon: {
        light: <IconNextJSCommerce />,
        dark: <IconNextJSCommerceDark />,
      },
    },
    {
      title: 'Svelte',
      path: '/guides/svelte',
      icon: {
        light: <IconSvelte />,
        dark: <IconSvelte />,
      },
    },
    {
      title: 'SolidJS',
      path: '/guides/solid',
      icon: {
        light: <IconSolidJS />,
        dark: <IconSolidJS />,
      },
    },
    {
      title: 'React Static',
      path: '/guides/react_static',
      icon: {
        light: <IconReactStatic />,
        dark: <IconReactStatic />,
      },
    },
    {
      title: 'Ionic Vue',
      path: '/guides/ionic_vue',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'RedwoodJS',
      path: '/guides/redwoodjs',
      icon: {
        light: <IconRedwood />,
        dark: <IconRedwood />,
      },
    },
    {
      title: 'Preact',
      path: '/guides/preact',
      icon: {
        light: <IconPreact />,
        dark: <IconPreact />,
      },
    },
    {
      title: 'Ember.js',
      path: '/guides/ember',
      icon: {
        light: <IconEmberJS />,
        dark: <IconEmberJS />,
      },
    },
    {
      title: 'Astro',
      path: '/guides/astro',
      icon: {
        light: <IconAstro />,
        dark: <IconAstroDark />,
      },
    },
  ],
  '5,6': [
    {
      title: 'Next.js',
      path: '/guides/sites_frameworks/getting_started/next',
      icon: {
        light: <IconNextJS />,
        dark: <IconNextJSDark />,
      },
    },
    {
      title: 'React',
      path: '/guides/sites_frameworks/getting_started/react',
      icon: {
        light: <IconReact />,
        dark: <IconReact />,
      },
    },
    {
      title: 'Vue Storefront',
      path: '/guides/sites_frameworks/getting_started/vsf',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'Gatsby',
      path: '/guides/sites_frameworks/getting_started/gatsby',
      icon: {
        light: <IconGatsby />,
        dark: <IconGatsby />,
      },
    },
    {
      title: 'Vue.js',
      path: '/guides/sites_frameworks/getting_started/vue',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'Angular',
      path: '/guides/sites_frameworks/getting_started/angular',
      icon: {
        light: <IconAngular />,
        dark: <IconAngular />,
      },
    },
    {
      title: 'Serverless Compute',
      path: '/guides/performance/serverless_compute',
      icon: {
        light: <IconServerlessFunctions />,
        dark: <IconServerlessFunctions />,
      },
    },
    {
      title: 'Remix',
      path: '/guides/sites_frameworks/getting_started/remix',
      icon: {
        light: <IconRemix />,
        dark: <IconRemixDark />,
      },
    },
    {
      title: 'Next.js Commerce',
      path: '/guides/sites_frameworks/getting_started/next_commerce',
      icon: {
        light: <IconNextJSCommerce />,
        dark: <IconNextJSCommerceDark />,
      },
    },
    {
      title: 'Svelte',
      path: '/guides/sites_frameworks/getting_started/svelte',
      icon: {
        light: <IconSvelte />,
        dark: <IconSvelte />,
      },
    },
    {
      title: 'SolidJS',
      path: '/guides/sites_frameworks/getting_started/solid',
      icon: {
        light: <IconSolidJS />,
        dark: <IconSolidJS />,
      },
    },
    {
      title: 'React Static',
      path: '/guides/sites_frameworks/getting_started/react_static',
      icon: {
        light: <IconReactStatic />,
        dark: <IconReactStatic />,
      },
    },
    {
      title: 'Ionic Vue',
      path: '/guides/sites_frameworks/getting_started/ionic_vue',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'RedwoodJS',
      path: '/guides/sites_frameworks/getting_started/redwoodjs',
      icon: {
        light: <IconRedwood />,
        dark: <IconRedwood />,
      },
    },
    {
      title: 'Preact',
      path: '/guides/sites_frameworks/getting_started/preact',
      icon: {
        light: <IconPreact />,
        dark: <IconPreact />,
      },
    },
    {
      title: 'Ember.js',
      path: '/guides/sites_frameworks/getting_started/ember',
      icon: {
        light: <IconEmberJS />,
        dark: <IconEmberJS />,
      },
    },
    {
      title: 'Astro',
      path: '/guides/sites_frameworks/getting_started/astro',
      icon: {
        light: <IconAstro />,
        dark: <IconAstroDark />,
      },
    },
  ],
  '7': [
    {
      title: 'Next.js',
      path: '/guides/sites_frameworks/getting_started/next',
      icon: {
        light: <IconNextJS />,
        dark: <IconNextJSDark />,
      },
    },
    {
      title: 'Nuxt.js',
      path: '/guides/sites_frameworks/getting_started/nuxt',
      icon: {
        light: <IconNuxt />,
        dark: <IconNuxt />,
      },
    },
    {
      title: 'Nuxt3',
      path: '/guides/sites_frameworks/getting_started/nuxt3',
      icon: {
        light: <IconNuxt />,
        dark: <IconNuxt />,
      },
    },
  ],
};

const StyledComp = styled(StyledFeatureSection)`
  .icon {
    --size: 24px;
    width: var(--size);
    height: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .route-items__col3 {
    .route-list__item:last-child {
      a {
        font-weight: initial;
        display: flex;
        align-items: center;
        column-gap: 7px;
      }
    }
  }
`;

export default function FrameworkGuides() {
  const {
    version,
    version: {toVersionedPath, selectedVersion},
  } = useConditioning();

  const routesByColumns = itemsByColumn(items, version, null, 6);

  let sitesGettingStarted = '/guides/sites_frameworks/getting_started/';
  if (selectedVersion === '4') {
    sitesGettingStarted = `/guides/jamstack_getting_started`;
  }

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconBook}
        title="Sites"
        subtitle={`Accelerate your dynamic and static Jamstack sites through ${PRODUCT_PLATFORM}.`}
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title, icon}) => (
                <li className="route-list__item" key={title}>
                  {icon ? (
                    <>
                      <div id="dark-theme" className="icon">
                        {icon.dark}
                      </div>
                      <div id="light-theme" className="icon">
                        {icon.light}
                      </div>
                    </>
                  ) : (
                    <div className="dot" />
                  )}
                  <Link href={toVersionedPath(path)}>{title}</Link>
                </li>
              ))}
              {index === routesByColumns.length - 1 &&
                routesByColumns.length > 2 && (
                  <li className="route-list__item">
                    <Link href={toVersionedPath(sitesGettingStarted)} passHref>
                      <a>
                        <div className="dot" />
                        <span>View all supported</span>
                        <IconArrow displayDirection="right" />
                      </a>
                    </Link>
                  </li>
                )}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

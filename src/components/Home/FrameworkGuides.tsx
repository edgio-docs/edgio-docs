import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT_EDGE} from '../../../constants';
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

interface IRoutesProps {
  title: string;
  path: string;
  icon?: {
    light: JSX.IntrinsicElements['svg'];
    dark: JSX.IntrinsicElements['svg'];
  };
}

export default function FrameworkGuides() {
  const routesCol1: Array<IRoutesProps> = [
    {
      title: 'Next.js',
      path: 'next',
      icon: {
        light: <IconNextJS />,
        dark: <IconNextJSDark />,
      },
    },
    {
      title: 'React',
      path: 'react',
      icon: {
        light: <IconReact />,
        dark: <IconReact />,
      },
    },
    {
      title: 'Vue Storefront',
      path: 'vsf',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'Gatsby',
      path: 'gatsby',
      icon: {
        light: <IconGatsby />,
        dark: <IconGatsby />,
      },
    },
    {
      title: 'Vue.js',
      path: 'vue',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'Angular',
      path: 'angular',
      icon: {
        light: <IconAngular />,
        dark: <IconAngular />,
      },
    },
  ];
  const routesCol2: Array<IRoutesProps> = [
    {
      title: 'Serverless Compute',
      path: 'serverless_functions',
      icon: {
        light: <IconServerlessFunctions />,
        dark: <IconServerlessFunctions />,
      },
    },
    {
      title: 'Remix',
      path: 'remix',
      icon: {
        light: <IconRemix />,
        dark: <IconRemixDark />,
      },
    },
    {
      title: 'Next.js Commerce',
      path: 'next_commerce',
      icon: {
        light: <IconNextJSCommerce />,
        dark: <IconNextJSCommerceDark />,
      },
    },
    {
      title: 'Svelte',
      path: 'svelte',
      icon: {
        light: <IconSvelte />,
        dark: <IconSvelte />,
      },
    },
    {
      title: 'SolidJS',
      path: 'solid',
      icon: {
        light: <IconSolidJS />,
        dark: <IconSolidJS />,
      },
    },
    {
      title: 'React Static',
      path: 'react_static',
      icon: {
        light: <IconReactStatic />,
        dark: <IconReactStatic />,
      },
    },
  ];
  const routesCol3: Array<IRoutesProps> = [
    {
      title: 'Ionic Vue',
      path: 'ionic_vue',
      icon: {
        light: <IconVue />,
        dark: <IconVue />,
      },
    },
    {
      title: 'RedwoodJS',
      path: 'redwood',
      icon: {
        light: <IconRedwood />,
        dark: <IconRedwood />,
      },
    },
    {
      title: 'Preact',
      path: 'preact',
      icon: {
        light: <IconPreact />,
        dark: <IconPreact />,
      },
    },
    {
      title: 'Ember.js',
      path: 'ember',
      icon: {
        light: <IconEmberJS />,
        dark: <IconEmberJS />,
      },
    },
    {
      title: 'Astro',
      path: 'astro',
      icon: {
        light: <IconAstro />,
        dark: <IconAstroDark />,
      },
    },
  ];
  const routes = [routesCol1, routesCol2, routesCol3];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconBook}
        title="Framework Guides"
        subtitle={`Utilize ${PRODUCT_EDGE} on your pre-existing site, or use one of our templates.`}
      />

      <div className="route-items">
        {routes.map((route, index) => (
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
                  <Link href={`/guides/${path}`}>{title}</Link>
                </li>
              ))}
              {index === 2 && (
                <li className="route-list__item">
                  <Link href="/guides/jamstack_getting_started" passHref>
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

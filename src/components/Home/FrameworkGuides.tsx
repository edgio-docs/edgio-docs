import Link from 'next/link';
import styled from 'styled-components';
import { IconAngular } from '../Icon/IconAngular';
import { IconAstro } from '../Icon/IconAstro';
import { IconBook } from '../Icon/IconBook';
import { IconEmberJS } from '../Icon/IconEmberJS';
import { IconGatsby } from '../Icon/IconGatsby';
import { IconGridsome } from '../Icon/IconGridsome';
import { IconNextJS } from '../Icon/IconNextJS';
import { IconNextJSCommerce } from '../Icon/IconNextJSCommerce';
import { IconPreact } from '../Icon/IconPreact';
import { IconReact } from '../Icon/IconReact';
import { IconReactStatic } from '../Icon/IconReactStatic';
import { IconRemix } from '../Icon/IconRemix';
import { IconServerlessFunctions } from '../Icon/IconServerlessFunctions';
import { IconSolidJS } from '../Icon/IconSolidJS';
import { IconSvelte } from '../Icon/IconSvelte';
import { IconVue } from '../Icon/IconVue';
import { StyledFeatureSection } from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)`
  .icon {
    --size: 24px;
    width: var(--size);
    height: var(--size);
  }
`;

interface IRoutesProps {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
}

export default function DeveloperTools() {
  const routesCol1: Array<IRoutesProps> = [
    {
      title: 'Next.js',
      path: 'caching',
      icon: <IconNextJS />,
    },
    {
      title: 'React',
      path: 'edgejs-routing',
      icon: <IconReact />,
    },
    {
      title: 'Vue Storefront',
      path: 'edgejs-routing',
      icon: <IconVue />,
    },
    {
      title: 'Gatsby',
      path: 'caching',
      icon: <IconGatsby />,
    },
    {
      title: 'Vue.js',
      path: 'caching',
      icon: <IconVue />,
    },
    {
      title: 'Angular',
      path: 'caching',
      icon: <IconAngular />,
    },
  ];
  const routesCol2: Array<IRoutesProps> = [
    {
      title: 'Serverless functions',
      path: 'caching',
      icon: <IconServerlessFunctions />,
    },
    {
      title: 'Remix',
      path: 'edgejs-routing',
      icon: <IconRemix />,
    },
    {
      title: 'Next.js Commerce',
      path: 'edgejs-routing',
      icon: <IconNextJSCommerce />,
    },
    {
      title: 'Svelte',
      path: 'caching',
      icon: <IconSvelte />,
    },
    {
      title: 'SolidJS',
      path: 'caching',
      icon: <IconSolidJS />,
    },
    {
      title: 'React Static',
      path: 'caching',
      icon: <IconReactStatic />,
    },
  ];
  const routesCol3: Array<IRoutesProps> = [
    {
      title: 'Ionic Vue',
      path: 'caching',
      icon: <IconVue />,
    },
    {
      title: 'Gridsome',
      path: 'edgejs-routing',
      icon: <IconGridsome />,
    },
    {
      title: 'Preact',
      path: 'edgejs-routing',
      icon: <IconPreact />,
    },
    {
      title: 'Ember.js',
      path: 'caching',
      icon: <IconEmberJS />,
    },
    {
      title: 'Astro',
      path: 'caching',
      icon: <IconAstro />,
    },
  ];

  const routes = [routesCol1, routesCol2, routesCol3];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconBook}
        title="Framework Guides"
        subtitle="Utilize Layer0 CDN on your pre-existing site, or use one of our templates."
      />

      <div className="route-items">
        {routes.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({ path, title, icon }) => (
                <li className="route-list__item" key={title}>
                  {icon ? (
                    <div className="icon">{icon}</div>
                  ) : (
                    <div className="dot" />
                  )}
                  <Link href={path}>{title}</Link>
                </li>
              ))}
              {index === 2 && (
                <li>
                  <Link href="/framework-guides">View all supported</Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

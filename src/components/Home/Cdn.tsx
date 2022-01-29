import Link from 'next/link';
import styled from 'styled-components';
import { IconServer } from '../Icon/IconServer';
import { StyledFeatureSection } from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;
interface IRoutesProps {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
}

export default function Cdn() {
  const routesCol1: Array<IRoutesProps> = [
    {
      title: 'Caching',
      path: 'caching',
    },
    {
      title: 'Common Routing Patterns',
      path: 'edgejs-routing',
    },
    {
      title: 'Connectors',
      path: '',
    },
    {
      title: 'Core Web Vitals',
      path: '',
    },
    {
      title: 'Custom Domains & SSL',
      path: '',
    },
    {
      title: 'Edge Network',
      path: '',
    },
  ];

  const routesCol2: Array<IRoutesProps> = [
    {
      title: 'EdgeJS Routing',
      path: 'edgejs-routing',
    },
    {
      title: 'Image Optimization',
      path: 'edgejs-routing',
    },
    {
      title: 'Incremental Static (Re)generation',
      path: '',
    },
    {
      title: 'Performance',
      path: '',
    },
    {
      title: 'Prefetching',
      path: '',
    },
    {
      title: 'Purging',
      path: '',
    },
  ];

  const routesCol3: Array<IRoutesProps> = [
    {
      title: 'Security',
      path: 'edgejs-routing',
    },
    {
      title: 'Split Testing',
      path: 'edgejs-routing',
    },
    {
      title: 'Static Prerendering',
      path: '',
    },
    {
      title: 'Third Party CDNs',
      path: '',
    },
    {
      title: 'Traditional Sites',
      path: '',
    },
    {
      title: 'Troubleshooting',
      path: '',
    },
  ];

  const routes = [routesCol1, routesCol2, routesCol3];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconServer}
        title="CDN"
        subtitle="Accelerate and secure your app using the Layer0 global CDN and EdgeJS."
      />

      <div className="route-items">
        {routes.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({ path, title }) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

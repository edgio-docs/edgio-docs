import Link from 'next/link';
import styled from 'styled-components';
import SectionHeader from './SectionHeader';
import { IconStacks } from '../Icon/IconStacks';
import { StyledFeatureSection } from './FeatureSection';

const StyledComp = styled(StyledFeatureSection)``;

interface IRoutesProps {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
}

export default function Reference() {
  const routesCol1: Array<IRoutesProps> = [
    {
      title: 'Bots',
      path: 'caching',
    },
    {
      title: 'Changelog',
      path: 'edgejs-routing',
    },
    {
      title: 'Contributing',
      path: '',
    },
    {
      title: 'Cookies',
      path: '',
    },
    {
      title: 'Deploy to Layer0 Button',
      path: '',
    },
    {
      title: 'Install Node.js',
      path: '',
    },
  ];

  const routesCol2: Array<IRoutesProps> = [
    {
      title: 'Layer0 for Traditional Sites',
      path: 'edgejs-routing',
    },
    {
      title: 'layer0.config.js',
      path: 'edgejs-routing',
    },
    {
      title: 'Limits',
      path: '',
    },
    {
      title: 'Request Headers',
      path: '',
    },
    {
      title: 'Response Headers',
      path: '',
    },
    {
      title: 'REST API',
      path: '',
    },
  ];

  const routesCol3: Array<IRoutesProps> = [
    {
      title: 'Status Codes',
      path: 'edgejs-routing',
    },
    {
      title: 'v4 Migration Guide',
      path: 'edgejs-routing',
    },
  ];

  const routes = [routesCol1, routesCol2, routesCol3];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconStacks}
        title="Reference"
        subtitle="Additional helpful information in regards to getting the most out of Layer0."
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

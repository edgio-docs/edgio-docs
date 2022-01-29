import styled from 'styled-components';
import Link from 'next/link';
import { IconCode } from '../Icon/IconCode';
import { StyledFeatureSection } from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;
interface IRoutesProps {
  title: string;
  path: string;
  icon?: JSX.IntrinsicElements['svg'];
}

export default function DeveloperTools() {
  const routesCol1: Array<IRoutesProps> = [
    {
      title: 'CLI',
      path: 'caching',
    },
    {
      title: 'Devtools',
      path: 'edgejs-routing',
    },
    {
      title: 'Logs',
      path: 'edgejs-routing',
    },
  ];

  const routes = [routesCol1];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconCode}
        title="Developer Tools"
        subtitle="Tools that help developer understand how their site interacts with Layer0."
      />

      <div className="route-items">
        {routes.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({ path, title }) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={path} passHref>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

import Link from 'next/link';
import styled from 'styled-components';
import { getChildrenRoutesFromSidebarMenuItems } from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import { IconServer } from '../Icon/IconServer';
import { StyledFeatureSection } from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;
export default function Cdn() {
  const parentPath = 'cdn';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);

  const routesByColumns = [
    allRoutes?.slice(0, 6),
    allRoutes?.slice(6, 12),
    allRoutes?.slice(12),
  ];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconServer}
        title="CDN"
        subtitle="Accelerate and secure your app using the Layer0 global CDN and EdgeJS."
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({ path, title }) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={`/${parentPath}/${path}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

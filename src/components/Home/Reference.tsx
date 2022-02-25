import Link from 'next/link';
import styled from 'styled-components';
import SectionHeader from './SectionHeader';
import {IconStacks} from '../Icon/IconStacks';
import {StyledFeatureSection} from './FeatureSection';
import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import _ from 'lodash';

const StyledComp = styled(StyledFeatureSection)``;

export default function Reference() {
  const parentPath = 'reference';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);
  const allRoutesSorted = _.sortBy(allRoutes, 'title');

  const routesByColumns = [
    allRoutesSorted?.slice(0, 6),
    allRoutesSorted?.slice(6, 12),
    allRoutesSorted?.slice(12),
  ];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconStacks}
        title="Reference"
        subtitle="Additional helpful information in regards to getting the most out of Layer0."
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title}) => (
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

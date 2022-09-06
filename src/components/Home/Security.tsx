import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import {IconSecurity} from '../Icon/IconSecurity';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;

export default function Security() {
  const parentPath = 'security';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);
  const allRoutesSorted = sortBy(allRoutes, 'title');

  const routesByColumns = [
    allRoutes?.slice(0, 8),
    allRoutes?.slice(8, 16),
    allRoutes?.slice(16),
  ];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconSecurity}
        title="App Security"
        subtitle={`Protect your web applications without sacrificing performance.`}
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

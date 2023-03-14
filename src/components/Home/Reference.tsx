import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import {IconStacks} from '../Icon/IconStacks';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';

const StyledComp = styled(StyledFeatureSection)``;

export default function Reference() {
  const {
    version: {toPath},
  } = useConditioning();
  const parentPath = 'reference';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);
  const allRoutesSorted = sortBy(allRoutes, 'title');

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
        subtitle={`Additional helpful information in regards to getting the most out of ${PRODUCT}.`}
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title}) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={toPath(path)}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

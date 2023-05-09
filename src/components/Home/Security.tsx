import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT, PRODUCT_SECURITY} from '../../../constants';
import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';

const StyledComp = styled(StyledFeatureSection)``;

export default function Security() {
  const {
    version: {toVersionedPath, selectedVersion},
  } = useConditioning();

  let parentPath;

  if (selectedVersion === '4') {
    parentPath = `v4-security`;
  } else {
    parentPath = `security`;
  }
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
        Icon="shield-dark"
        title="Security"
        subtitle={`Protect your web applications without sacrificing performance through ${PRODUCT} ${PRODUCT_SECURITY}.`}
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title}) => (
                <li className="route-list__item" key={title}>
                  <div className="dot" />
                  <Link href={toVersionedPath(path)}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import {IconCode} from '../Icon/IconCode';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';

const StyledComp = styled(StyledFeatureSection)``;

export default function DeveloperTools() {
  const {
    version: {toVersionedPath},
  } = useConditioning();
  const parentPath = 'dev-tools';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);
  const allRoutesSorted = sortBy(allRoutes, 'title');

  const routesByColumns = [allRoutesSorted];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconCode}
        title="Developer Tools"
        subtitle={`Use these tools to interact with ${PRODUCT} and gain insight into how it is accelerating your site.`}
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

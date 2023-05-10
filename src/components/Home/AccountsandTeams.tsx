import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import styled from 'styled-components';

import {getChildrenRoutesFromSidebarMenuItems} from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import {IconUser} from '../Icon/IconUser';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import useConditioning from 'utils/hooks/useConditioning';

const StyledComp = styled(StyledFeatureSection)``;

export default function AccountsandTeams() {
  const {
    version: {toVersionedPath, selectedVersion},
  } = useConditioning();

  let parentPath;

  if (selectedVersion === '4') {
    parentPath = `v4-accounts-teams`;
  } else {
    parentPath = `accounts-teams`;
  }
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);
  const allRoutesSorted = sortBy(allRoutes, 'title');

  const routesByColumns = [allRoutesSorted];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconUser}
        title="Accounts &amp; Teams"
        subtitle="Create production, staging, and other environments and share your project."
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

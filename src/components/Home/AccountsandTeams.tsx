import styled from 'styled-components';
import Link from 'next/link';
import { IconUser } from '../Icon/IconUser';
import { StyledFeatureSection } from './FeatureSection';
import SectionHeader from './SectionHeader';
import { getChildrenRoutesFromSidebarMenuItems } from '../../utils/getChildrenRoutesFromSidebarMenuItems';

const StyledComp = styled(StyledFeatureSection)``;

export default function AccountsandTeams() {
  const parentPath = 'accounts-teams';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath);

  const routesByColumns = [allRoutes];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconUser}
        title="Accounts & Teams"
        subtitle="Create production, staging, and other environments and share your project."
      />

      <div className="route-items">
        {routesByColumns.map((route, index) => (
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

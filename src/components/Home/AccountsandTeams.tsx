import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import styled from 'styled-components';

import {useTheme} from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';
import itemsByColumn from 'utils/itemsByColumn';

import {IconAppsTeams, IconAppsTeamsDark} from '../Icon/IconAppsTeams';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

const StyledComp = styled(StyledFeatureSection)``;

const items = {
  '4': [
    {
      title: 'Alerts',
      path: '/guides/alerts',
    },
    {
      title: 'Teams',
      path: '/guides/teams',
    },
    {
      title: 'SAML Single Sign On',
      path: '/guides/saml',
    },
  ],
  default: [
    {
      title: 'Alerts',
      path: '/guides/basics/alerts',
    },
    {
      title: 'Teams',
      path: '/guides/basics/collaboration',
    },
  ],
};

export default function AccountsandTeams() {
  const {
    version,
    version: {toVersionedPath},
  } = useConditioning();
  const {themedValue} = useTheme();

  const routesByColumns = itemsByColumn(items, version, 'title', 5);

  return (
    <StyledComp>
      <SectionHeader
        Icon={themedValue(IconAppsTeams, IconAppsTeamsDark)}
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

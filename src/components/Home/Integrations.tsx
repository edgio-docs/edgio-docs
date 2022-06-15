import Link from 'next/link';
import styled from 'styled-components';

import {IRoute} from '../../data/SidebarMenuItems';
import {
  getChildrenRoutesFromSidebarMenuItems,
  findChildByGuideName,
} from '../../utils/getChildrenRoutesFromSidebarMenuItems';
import {IconBigCommerce} from '../Icon/IconBigCommerce';
import {IconBloomreach} from '../Icon/IconBloomreach';
import {IconGitHub} from '../Icon/IconGitHub';
import {IconShopifyHydrogen} from '../Icon/IconShopifyHydrogen';
import {IconSwell} from '../Icon/IconSwell';

import {StyledFeatureSection} from './FeatureSection';
import SectionHeader from './SectionHeader';

import {IconArrow} from 'components/Icon/IconArrow';

const StyledComp = styled(StyledFeatureSection)`
  .icon {
    --size: 24px;
    width: var(--size);
    height: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .route-items__col3 {
    .route-list__item:last-child {
      a {
        color: var(--pink);
        font-weight: initial;
        display: flex;
        column-gap: 7px;
      }
    }
  }
`;

export default function Integrations() {
  const routesCol1: Array<IRoute> = [
    ...getChildrenRoutesFromSidebarMenuItems('integrations'),
  ];

  // const parentPath = 'framework-guides';

  const routes = [routesCol1];

  return (
    <StyledComp>
      <SectionHeader
        Icon={IconBook}
        title="Integrations"
        subtitle="Utilize Layer0 CDN on your pre-existing site, or use one of our templates."
      />

      <div className="route-items">
        {routes.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title, icon}) => (
                <li className="route-list__item" key={title}>
                  {icon ? (
                    <>
                      <div id="dark-theme-switcher" className="icon">
                        {icon.light}
                      </div>
                      <div id="light-theme-switcher" className="icon">
                        {icon.dark}
                      </div>
                    </>
                  ) : (
                    <div className="dot" />
                  )}
                  <Link href={`/guides/${path}`}>{title}</Link>
                </li>
              ))}
              {index === 2 && (
                <li className="route-list__item">
                  <Link href="/guides/jamstack_getting_started" passHref>
                    <a>
                      <span>View all supported</span>
                      <IconArrow displayDirection="right" />
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </StyledComp>
  );
}

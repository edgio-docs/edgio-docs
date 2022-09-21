import cs from 'classnames';
import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import useCollapse from 'react-collapsed';
import styled from 'styled-components';

import SidebarMenuItems, {
  IRoute,
  ISidebarMenuItem,
} from '../../../data/SidebarMenuItems';
import {IconChevron} from '../../Icon/IconChevron';
import {IconOutsideLink, IconOutsideLinkDark} from '../../Icon/IconOutsideLink';

const StlyedSidebar = styled.div`
  font-size: 14px;
  font-weight: 500;
  height: 100%;
  color: var(--text-primary);

  .nav-container {
    display: flex;
    row-gap: 2rem;
    flex-direction: column;
    height: 100%;
  }

  .hr-separator {
    height: 1px;
    width: calc(100% - 40px);
    background: var(--hr-primary);
    transform: translateX(20px);
  }

  .nav-items-primary {
    flex: 1;
    overflow-y: auto;
  }

  .nav-item__box-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background: transparent;
    border: none;
    width: 100%;
    text-decoration: none;
    text-align: left;
    padding: 0;
  }

  .trigger-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 10px;
    text-decoration: none;
    padding: 5px 20px;
    color: var(--sidebar-link-primary);
    text-decoration: none;

    :hover {
      background-color: var(--href-hover-primary);
    }
  }

  .icon-box {
    display: flex;
    justify-content: center;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
  }
  .icon-chevron {
    transition: 100ms ease-in-out;
  }
  .is-open .icon-chevron {
    transform: rotate(180deg);
  }

  .menu-item__title {
    flex: 1;
  }

  .routes {
    margin-left: calc(20px + 16px + 18px);
    position: relative;
    overflow: hidden;

    ::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: calc(100%);
      top: 0;
      width: 0.75px;
      background-color: var(--colors-blue0);
    }
  }

  .route {
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 4px;

    a {
      display: grid;
      gap: 6px;
      align-items: center;
      grid-template-columns: 1fr auto;
      flex: 1;
      padding-left: 12px;
      padding: 4px 4px 4px 12px;
      color: inherit;
      text-decoration: none;

      :hover {
        background-color: var(--href-hover-primary);
      }
    }

    .route-separator {
      min-height: 1px;
      background: var(--hr-primary);
      display: flex;
      flex: 1;
      margin: 2px 0 2px 0;
    }
  }

  [aria-current='true'] {
    color: var(--colors-blue0) !important;
  }
`;

function ChildrenRoutes({
  routes,
  currentRoutePath,
}: {
  routes: Array<IRoute>;
  currentRoutePath: string;
}) {
  return (
    <div className="routes">
      {routes.map((route, i) => {
        const separatorTop =
          route.separator === 'top' ||
          (route.separator === true && routes.length === i + 1);
        const separatorBottom =
          route.separator === 'bottom' ||
          (route.separator === true && i + 1 < routes.length);

        return (
          <div className="route" key={i}>
            {separatorTop && <div className="route-separator" />}
            {route.external ? (
              <a href={route.path} target="_blank" rel="noopener noreferrer">
                {route.title}

                <>
                  <div className="icon-box" id="dark-theme">
                    <IconOutsideLinkDark />
                  </div>
                  <div className="icon-box" id="light-theme">
                    <IconOutsideLink />
                  </div>
                </>
              </a>
            ) : (
              <Link href={route.path}>
                <a aria-current={currentRoutePath === route.path}>
                  {route.title}
                </a>
              </Link>
            )}
            {separatorBottom && <div className="route-separator" />}
          </div>
        );
      })}
    </div>
  );
}

function MenuItemIcon({
  icon,
  iconDark,
}: {
  icon: JSX.IntrinsicElements['svg'];
  iconDark: JSX.IntrinsicElements['svg'] | undefined;
}) {
  return (
    <>
      <div className="icon-box" id="dark-theme">
        {iconDark}
      </div>
      <div className="icon-box" id="light-theme">
        {icon}
      </div>
    </>
  );
}

function MenuTitle({title}: {title: string}) {
  return <span className="menu-item__title">{title}</span>;
}

function MenuChevron({hasChildren}: {hasChildren: boolean}) {
  if (hasChildren) {
    return (
      <div className="icon-box icon-chevron">
        <IconChevron displayDirection="right" />
      </div>
    );
  }

  return null;
}

function MenuExternalHrefIcon() {
  return (
    <>
      <div className="icon-box" id="light-theme">
        <IconOutsideLink />
      </div>
      <div className="icon-box" id="dark-theme">
        <IconOutsideLinkDark />
      </div>
    </>
  );
}

function MenuToggle({
  menuItem,
  isActive,
  onSelect,
  isExternalRoute,
}: {
  menuItem: ISidebarMenuItem;
  isActive?: boolean;
  onSelect?: () => void;
  isExternalRoute?: boolean;
}) {
  if (isExternalRoute) {
    return (
      <Link href={menuItem.path} passHref>
        <a className="nav-item__box-inner" target="_blank">
          <div className="trigger-link">
            <MenuItemIcon
              {...{icon: menuItem.icon, iconDark: menuItem.iconDark}}
            />
            <MenuTitle {...{title: menuItem.title}} />
            {isExternalRoute && <MenuExternalHrefIcon />}
          </div>
        </a>
      </Link>
    );
  }

  return (
    <button onClick={onSelect} type="button" className="nav-item__box-inner">
      <div
        className={cs('trigger-link', {
          'is-open': isActive,
        })}>
        <MenuItemIcon {...{icon: menuItem.icon, iconDark: menuItem.iconDark}} />
        <MenuTitle {...{title: menuItem.title}} />
        <MenuChevron {...{hasChildren: !!menuItem.routes}} />
      </div>
    </button>
  );
}

function getCurrentRouteParentIndex(
  routes: ISidebarMenuItem[],
  currentRoutePath: string
) {
  const index = routes.findIndex((route) => {
    return (
      route?.routes?.find((route) => route.path === currentRoutePath) ?? null
    );
  });

  return index === -1 ? null : index;
}

function PrimaryNavItems({
  pryNavItemsIndex,
  pryNavItems,
}: {
  pryNavItemsIndex: number;
  pryNavItems: ISidebarMenuItem[];
}) {
  const router = useRouter();
  const currentRoutePath = router.pathname;
  const [activeIndex, setActiveIndex] = useState<number | null>(() =>
    getCurrentRouteParentIndex(pryNavItems, currentRoutePath)
  );

  useEffect(() => {
    setActiveIndex(getCurrentRouteParentIndex(pryNavItems, currentRoutePath));
  }, [currentRoutePath, pryNavItems]);

  return (
    <AccordionParent>
      {Object.keys(pryNavItems).map((items, index) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[pryNavItemsIndex][itemsAsNumber];
        const childrenRoutes = menuItem.sortRoutes
          ? sortBy(menuItem.routes, (item) => item.title.toLowerCase())
          : menuItem.routes;

        return (
          <Accordion
            key={itemsAsNumber}
            {...{
              isActive: activeIndex === index,
              onSelect: () =>
                setActiveIndex(activeIndex === index ? null : index),
              menuItem,
              childrenRoutes,
              currentRoutePath,
            }}
          />
        );
      })}
    </AccordionParent>
  );
}

function Accordion({
  isActive,
  onSelect,
  menuItem,
  childrenRoutes,
  currentRoutePath,
}: {
  isActive: boolean;
  onSelect?: () => void;
  menuItem: ISidebarMenuItem;
  childrenRoutes: IRoute[] | undefined;
  currentRoutePath: string;
}) {
  const {getCollapseProps, getToggleProps} = useCollapse({
    isExpanded: isActive,
  });

  return (
    <div className="nav-item__box">
      <MenuToggle
        isActive={isActive}
        menuItem={menuItem}
        {...getToggleProps({
          onSelect,
        })}
      />
      {childrenRoutes && (
        <div {...getCollapseProps()}>
          <ChildrenRoutes
            {...{
              routes: childrenRoutes,
              currentRoutePath,
            }}
          />
        </div>
      )}
    </div>
  );
}

function AccordionParent({children}: {children: React.ReactNode}) {
  return <div className="nav-items nav-items-primary">{children}</div>;
}

function SecondaryNavitems({
  secNavItemsIndex,
  secNavItems,
}: {
  secNavItemsIndex: number;
  secNavItems: ISidebarMenuItem[];
}) {
  return (
    <div className="nav-items">
      {Object.keys(secNavItems).map((items) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[secNavItemsIndex][itemsAsNumber];

        return (
          <div className="nav-item__box" key={itemsAsNumber}>
            <MenuToggle {...{menuItem, isExternalRoute: true}} />
          </div>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const pryNavItemsIndex = 0;
  const pryNavItems = SidebarMenuItems[pryNavItemsIndex];

  const secNavItemsIndex = 1;
  const secNavItems = SidebarMenuItems[secNavItemsIndex];

  return (
    <StlyedSidebar>
      <div className="nav-container">
        <PrimaryNavItems {...{pryNavItemsIndex, pryNavItems}} />
        <div className="hr-separator" />
        <SecondaryNavitems {...{secNavItemsIndex, secNavItems}} />
      </div>
    </StlyedSidebar>
  );
}

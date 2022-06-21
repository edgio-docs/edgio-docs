import cs from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import styled from 'styled-components';

import SidebarMenuItems, {
  ISidebarMenuItem,
  IRoute,
} from '../../../data/SidebarMenuItems';
import {IconChevron} from '../../Icon/IconChevron';
import {IconOutsideLink, IconOutsideLinkDark} from '../../Icon/IconOutsideLink';

import useHydrationIsLoaded from 'utils/hooks/useHydrationIsLoaded';

const StlyedSidebar = styled.div`
  font-size: 14px;
  font-weight: 500;
  height: 100%;
  color: var(--sidebar-href-color);

  .nav-container {
    display: flex;
    row-gap: 2rem;
    flex-direction: column;
    height: 100%;
  }

  .hr-separator {
    height: 1px;
    width: calc(100% - 40px);
    background: var(--sidenav-hr-color);
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
  }

  .trigger-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 10px;
    text-decoration: none;
    padding: 5px 20px;
    color: var(--sidebar-href-color);
    text-decoration: none;

    :hover {
      background-color: var(--grey2);
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
        background-color: var(--grey2);
      }
    }

    .route-separator {
      min-height: 1px;
      background: var(--sidenav-hr-color);
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
    <motion.div
      className="routes"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: {height: 'auto'},
        collapsed: {height: 0},
      }}
      transition={{duration: 0.1}}>
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
                  <div className="icon-box" id="light-theme-switcher">
                    <IconOutsideLinkDark />
                  </div>
                  <div className="icon-box" id="dark-theme-switcher">
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
    </motion.div>
  );
}

function ParentRoute({
  menuItem,
  isExternalRoute = false,
  accordion,
  setAccordion,
  parentIndex,
}: {
  menuItem: ISidebarMenuItem;
  isExternalRoute?: boolean;
  accordion?: {
    isOpen: boolean;
    currentIndex: number;
  };
  setAccordion?: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      currentIndex: number;
    }>
  >;
  parentIndex?: number;
}) {
  function updateAccordion() {
    if (accordion && setAccordion && parentIndex !== undefined) {
      setAccordion({
        ...accordion,
        isOpen: accordion.currentIndex !== parentIndex,
        currentIndex: accordion.currentIndex === parentIndex ? -1 : parentIndex,
      });
    }
  }

  if (isExternalRoute) {
    return (
      <Link href={menuItem.path} passHref>
        <a className="nav-item__box-inner" target="_blank">
          <div className="trigger-link">
            <div className="icon-box" id="dark-theme-switcher">
              {menuItem.icon}
            </div>
            <div className="icon-box" id="light-theme-switcher">
              {menuItem.iconDark}
            </div>
            <span className="menu-item__title">{menuItem.title}</span>
            {isExternalRoute && (
              <>
                <div className="icon-box" id="light-theme-switcher">
                  <IconOutsideLinkDark />
                </div>
                <div className="icon-box" id="dark-theme-switcher">
                  <IconOutsideLink />
                </div>
              </>
            )}
          </div>
        </a>
      </Link>
    );
  }

  const isCurrent = !isExternalRoute && accordion?.currentIndex === parentIndex;
  return (
    <button
      type="button"
      className="nav-item__box-inner"
      onClick={updateAccordion}>
      <div
        className={cs('trigger-link', {
          'is-open': isCurrent,
        })}
        aria-current={isCurrent}>
        <div className="icon-box" id="dark-theme-switcher">
          {menuItem.icon}
        </div>
        <div className="icon-box" id="light-theme-switcher">
          {menuItem.iconDark}
        </div>
        <span className="menu-item__title">{menuItem.title}</span>
        {menuItem.routes && (
          <div className="icon-box icon-chevron">
            <IconChevron displayDirection="right" />
          </div>
        )}
      </div>
    </button>
  );
}

function PrimaryNavItems() {
  // Hack. See https://github.com/framer/motion/issues/578
  const isLoaded = useHydrationIsLoaded();

  const navItemsIndex = 0;
  const navItems = SidebarMenuItems[navItemsIndex];
  const navItemsArray = Object.keys(navItems);

  const router = useRouter();
  const currentRoutePath = router.pathname;

  function getCurrentRouteParentIndex() {
    return navItemsArray
      .map((items, index) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[navItemsIndex][itemsAsNumber];
        const menuItemRoutes = menuItem.routes;

        if (!menuItemRoutes) {
          return undefined;
        }

        return menuItemRoutes.find((route, innerIndex) => {
          if (route.path === currentRoutePath) {
            route.parentIndex = index;
            route.childIndex = innerIndex;
            return route;
          }

          return undefined;
        });
      })
      .find((item) => !!item);
  }

  const [accordion, setAccordion] = useState({
    isOpen: true,
    currentIndex: getCurrentRouteParentIndex()?.parentIndex ?? -1,
  });

  // Hack. See https://github.com/framer/motion/issues/578
  const ComputedAnimatePresence = isLoaded ? AnimatePresence : 'div';

  return (
    <div className="nav-items nav-items-primary">
      {navItemsArray.map((items, index) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[navItemsIndex][itemsAsNumber];

        return (
          <div className="nav-item__box" key={itemsAsNumber}>
            <ParentRoute
              {...{menuItem, accordion, setAccordion, parentIndex: index}}
            />
            <ComputedAnimatePresence>
              {menuItem.routes &&
                accordion.isOpen &&
                accordion.currentIndex === index && (
                  <ChildrenRoutes
                    {...{
                      routes: menuItem.sortRoutes
                        ? sortBy(menuItem.routes, (item) =>
                            item.title.toLowerCase()
                          )
                        : menuItem.routes,
                      currentRoutePath,
                    }}
                  />
                )}
            </ComputedAnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function SecondaryNavitems() {
  const navItemsIndex = 1;
  const navItems = SidebarMenuItems[navItemsIndex];

  return (
    <div className="nav-items">
      {Object.keys(navItems).map((items) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[navItemsIndex][itemsAsNumber];

        return (
          <div className="nav-item__box" key={itemsAsNumber}>
            <ParentRoute {...{menuItem, isExternalRoute: true}} />
          </div>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  return (
    <StlyedSidebar>
      <div className="nav-container">
        <PrimaryNavItems />
        <div className="hr-separator" />
        <SecondaryNavitems />
      </div>
    </StlyedSidebar>
  );
}

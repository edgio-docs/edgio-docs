import {AnimatePresence, motion} from 'framer-motion';
import sortBy from 'lodash/sortBy';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import styled from 'styled-components';
import SidebarMenuItems, {
  ISidebarMenuItem,
} from '../../../data/SidebarMenuItems';
import {IconChevron} from '../../Icon/IconChevron';
import {IconOutsideLink} from '../../Icon/IconOutsideLink';

const StlyedSidebar = styled.div`
  font-size: 14px;
  font-weight: 500;
  height: 100%;

  .nav-container {
    display: grid;
    row-gap: 32px;
  }

  .hr-separator {
    height: 1px;
    width: calc(100% - 40px);
    background: var(--grey1);
    transform: translateX(20px);
  }

  .nav-item__box-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
  }

  .trigger-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 10px;
    text-decoration: none;
    padding: 5px 20px;
    color: var(--black1);
    text-decoration: none;

    :hover {
      background-color: var(--grey2);
      font-weight: 600;
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

  .menu-item__title {
    flex: 1;
  }

  .routes {
    margin-left: calc(20px + 16px + 10px);
    position: relative;
    overflow: hidden;

    ::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: calc(100% - 20px);
      top: 0;
      transform: translateY(10px);
      border: 0.75px solid var(--pink);
    }
  }

  .route {
    display: flex;
    padding: 0 20px 0 4px;

    a {
      display: grid;
      gap: 6px;
      align-items: center;
      grid-template-columns: auto 1fr;
      flex: 1;
      padding-left: 12px;
      padding: 4px 0 4px 12px;
      color: var(--black1);
      text-decoration: none;

      :hover {
        background-color: var(--grey2);
        font-weight: 600;
      }
    }
  }

  [aria-current='true'] {
    color: var(--pink) !important;
  }
`;

function ChildrenRoutes({
  routes,
  currentRoutePath,
}: {
  routes: Array<{
    title: string;
    path: string;
    icon?: JSX.IntrinsicElements['svg'];
    external?: boolean;
  }>;
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
      {routes.map((route, i) => (
        <div className="route" key={i}>
          {route.external ? (
            <a href={route.path} target="_blank" rel="noopener noreferrer">
              {route.title}

              <div className="icon-box">
                <IconOutsideLink />
              </div>
            </a>
          ) : (
            <Link href={route.path}>
              <a aria-current={currentRoutePath === route.path}>
                {route.title}
              </a>
            </Link>
          )}
        </div>
      ))}
    </motion.div>
  );
}

function ParentRoute({
  menuItem,
  isExternalRoute = false,
  accordion,
  setAccordion,
  parentIndex,
}: // currentChildIndex,
{
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
      // currentChildIndex: number;
    }>
  >;
  parentIndex?: number;
}) {
  function updateAccordion() {
    if (accordion && setAccordion && parentIndex !== undefined) {
      console.log('setting accordion');
      setAccordion({
        ...accordion,
        isOpen: accordion.currentIndex !== parentIndex,
        currentIndex: accordion.currentIndex === parentIndex ? -1 : parentIndex,
      });
    }
  }

  return (
    <button
      type="button"
      className="nav-item__box-inner"
      onClick={updateAccordion}>
      <div
        className="trigger-link"
        aria-current={
          !isExternalRoute && accordion?.currentIndex === parentIndex
        }>
        <div className="icon-box">{menuItem.icon}</div>
        <span className="menu-item__title">{menuItem.title}</span>
        {menuItem.routes && (
          <div className="icon-box">
            <IconChevron displayDirection="right" />
          </div>
        )}
        {isExternalRoute && (
          <div className="icon-box">
            <IconOutsideLink />
          </div>
        )}
      </div>
    </button>
  );
}

function PrimaryNavItems() {
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
    // currentChildIndex: getCurrentRouteParentIndex()?.childIndex ?? -1,
  });

  return (
    <div className="nav-items">
      {navItemsArray.map((items, index) => {
        const itemsAsNumber = Number(items);
        const menuItem = SidebarMenuItems[navItemsIndex][itemsAsNumber];

        return (
          <div className="nav-item__box" key={itemsAsNumber}>
            <ParentRoute
              {...{menuItem, accordion, setAccordion, parentIndex: index}}
            />
            <AnimatePresence>
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
            </AnimatePresence>
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

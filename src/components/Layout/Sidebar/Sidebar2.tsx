import Link from 'next/link';
import React from 'react';
import useCollapse from 'react-collapsed';
import {
  GetCollapsePropsOutput,
  GetTogglePropsOutput,
} from 'react-collapsed/dist/types';
import styled from 'styled-components';

import NavItems from '../../../data/nav.json';
import {IconChevron, IconOutsideLink, IconOutsideLinkDark} from '../../Icon';

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

  /* here... */
  .nav-items-primary,
  .sidenav-sublist {
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
    /* margin-left: auto; */
    position: absolute;
    right: 0;
    transform: translateX(-20px);
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

  /* start here... */
  .sidenav-sublist {
    list-style: none;
    padding: 0px;
  }

  .menu-toggle__wrap {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    background: transparent;
    border: medium none;
    width: 100%;
    text-decoration: none;
    text-align: left;
    padding: 5px 16px;
    column-gap: 10px;
    position: relative;
    cursor: pointer;
    border-radius: 2px;
    color: var(--sidebar-link-primary);

    :hover {
      background-color: var(--href-hover-primary);
    }

    + .sidenav-sublist {
      position: relative;
      margin-left: calc(16px);

      ::before {
        position: absolute;
        left: 0px;
        bottom: 0px;
        height: calc(100% - 10px);
        top: 0px;
        width: 0.75px;
        background-color: var(--colors-blue0);
        content: '';
        transform: translateY(5px);
      }

      &[data-nav-depth='1']::before {
        opacity: 80%;
      }

      &[data-nav-depth='2']::before {
        opacity: 60%;
      }
    }
  }

  .sidenav-menu__container {
    padding: 0px 4px;

    :empty {
      height: 1px;
      width: calc(100% - 32px);
      background: var(--hr-primary);
      transform: translateX(16px);
      opacity: 0.6;
      padding: 0;
      margin: 2px 0;
    }
  }
`;

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

interface IAccordion {
  route: IRoute;
  isActive: boolean;
  onSelect: () => void;
  depth: number;
}

interface IExternalRouteTitle {
  title: string;
  path: string;
}
function ExternalRouteTitle({title, path}: IExternalRouteTitle) {
  return (
    <a
      className="menu-toggle__wrap sidenav-link"
      href={path}
      target="_blank"
      rel="noopener noreferrer">
      {title}
      <>
        <div className="icon-box icon-chevron" id="dark-theme">
          <IconOutsideLinkDark />
        </div>
        <div className="icon-box icon-chevron" id="light-theme">
          <IconOutsideLink />
        </div>
      </>
    </a>
  );
}

interface IDefaultRotueTitle {
  title: string;
  path: string;
  hasChildren: boolean;
  toggleProps: GetTogglePropsOutput;
}
function DefaultRouteTitle({
  title,
  path,
  hasChildren,
  toggleProps,
}: IDefaultRotueTitle) {
  return (
    <Link
      href={`${path.length > 0 ? `/guides/${path}` : 'javascript:void(0)'}`}
      passHref>
      <a className="menu-toggle__wrap sidenav-link" {...toggleProps}>
        <span>{title}</span>
        <MenuChevron {...{hasChildren}} />
      </a>
    </Link>
  );
}

function Accordion({route, isActive, onSelect, depth}: IAccordion) {
  const [isExpanded, setExpanded] = React.useState(isActive);
  const {getCollapseProps, getToggleProps} = useCollapse({
    isExpanded,
  });

  React.useEffect(() => {
    setExpanded(isActive);
  }, [isActive, setExpanded]);

  return (
    <li
      className="sidenav-item"
      data-comp="accordion"
      data-expanded={isExpanded}>
      <div className="sidenav-menu__container">
        {route.external ? (
          <ExternalRouteTitle
            {...{title: route.title as string, path: route.path}}
          />
        ) : (
          route.title && (
            <DefaultRouteTitle
              {...{
                title: route.title as string,
                path: route.path,
                hasChildren: !!route.routes,
                toggleProps: {
                  ...getToggleProps({
                    onClick: onSelect,
                  }),
                },
              }}
            />
          )
        )}

        {/* children collapse */}
        {route.routes && (
          <SideNavSublist
            {...{
              depth: depth + 1,
              collapseProps: {
                ...getCollapseProps(),
              },
            }}>
            <AccordionParent {...{routes: route.routes, depth: depth + 1}} />
          </SideNavSublist>
        )}
      </div>
    </li>
  );
}

interface IRoute {
  title: string | null;
  path: string;
  external?: boolean;
  routes?: Array<IRoute>;
}

interface IAccordionParent {
  routes: Array<IRoute>;
  depth: number;
}

function AccordionParent({routes, depth}: IAccordionParent) {
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);

  return (
    <>
      {routes.map((route, index) => {
        return (
          <React.Fragment key={index}>
            <Accordion
              {...{
                route,
                isActive: activeIndex === index,
                onSelect: () =>
                  setActiveIndex(activeIndex === index ? null : index),
                depth,
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

interface ISideNavSublist {
  depth: number;
  collapseProps?: GetCollapsePropsOutput;
  children: React.ReactNode;
}

function SideNavSublist({depth, collapseProps, children}: ISideNavSublist) {
  if (collapseProps) {
    return (
      <ul
        className="sidenav-sublist"
        {...{'data-nav-depth': depth, ...collapseProps}}>
        {children}
      </ul>
    );
  }

  return <>{children}</>;
}

export function Sidebar() {
  return (
    <StlyedSidebar>
      <div className="nav-container">
        <ul className="sidenav-sublist" data-nav-depth="0">
          <SideNavSublist {...{depth: 0}}>
            <AccordionParent routes={NavItems as Array<IRoute>} depth={0} />
          </SideNavSublist>
        </ul>
      </div>
    </StlyedSidebar>
  );
}

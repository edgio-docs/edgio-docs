/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {Fragment, useEffect, useState, memo} from 'react';
import useCollapse from 'react-collapsed';
import styled from 'styled-components';

import NavItems from '../../../../src/data/nav.json';

interface IRoute {
  title: string | null;
  path: string;
  icon: string;
  routes?: IRoute[];
}
interface IRoutes {
  title: string;
  path: string;
  routes: IRoute[];
}

const IconChevron = memo(function IconChevron({
  className,
  displayDirection,
}: {
  className?: string;
  displayDirection: 'down' | 'left' | 'up' | 'right';
}) {
  const classes = cn(
    {
      'transform rotate-0': displayDirection === 'down',
      'transform rotate-90': displayDirection === 'left',
      'transform rotate-180': displayDirection === 'up',
      'transform -rotate-90': displayDirection === 'right',
    },
    className
  );
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20">
      <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z"
          transform="translate(356.5 164.5)"
        />
        <polygon points="446 418 466 418 466 398 446 398" />
      </g>
    </svg>
  );
});

function MenuChevron() {
  return (
    <div className="icon-box icon-chevron">
      <IconChevron displayDirection="right" />
    </div>
  );
}

function Accordion({
  route,
  isActive,
  onSelect,
  depth,
  currentRoutePath,
}: {
  route: IRoute;
  isActive: boolean;
  onSelect: () => void;
  depth: number;
  currentRoutePath: string;
}) {
  const {getCollapseProps, getToggleProps} = useCollapse({
    isExpanded: isActive,
  });

  return (
    <li className="sidenav-item" data-comp="accordion" data-expanded={isActive}>
      <div className="sidenav-menu__container">
        {/* Toggle */}
        {route.title && (
          <Link
            href={`/guides/${route.path}`}
            passHref
            className="sidenav-link"
            data-depth={depth}>
            <a
              className="menu-toggle__wrap"
              data-is-highlighted={
                currentRoutePath.replace('/guides/', '') === route.path
              }
              {...getToggleProps({
                onClick: onSelect,
              })}>
              {depth === 0 && (
                <div className="icons">
                  <div id="dark-theme">
                    <img
                      src={`/icons/${route.icon}.svg`}
                      alt={route.icon}
                      width="16px"
                      height="16px"
                    />
                  </div>
                  <div id="light-theme">
                    <img
                      src={`/icons/${route.icon}-dark.svg`}
                      alt={route.icon}
                      width="16px"
                      height="16px"
                    />
                  </div>
                </div>
              )}
              <span>{route.title}</span>
              {route.routes && <MenuChevron />}
            </a>
          </Link>
        )}
        {/* Collapse */}
        {route.routes && (
          // ?? can this be a single component that returns its children?
          <ul
            className="sidenav-sublist"
            {...{'data-nav-depth': depth + 1, ...getCollapseProps()}}>
            <AccordionParent {...{routes: route.routes, depth: depth + 1}} />
          </ul>
        )}
      </div>
    </li>
  );
}

function getCurrentRouteIndex(
  routes: IRoute[],
  depth: number,
  currentRoutePath: string
) {
  const indez = routes.findIndex(
    (route, index) =>
      currentRoutePath.split('/')[depth] ===
      route.path.split('/')[route.path.split('/').length - 1]
  );

  return indez || null;
}

function AccordionParent({routes, depth}: {routes: IRoute[]; depth: number}) {
  const router = useRouter();
  const currentRoutePath = router.pathname;
  const [activeIndex, setActiveIndex] = useState<number | null>(() =>
    getCurrentRouteIndex(
      routes,
      depth,
      currentRoutePath.replace('/guides/', '')
    )
  );

  return (
    <>
      {routes.map((route, index) => {
        return (
          <Fragment key={index}>
            <Accordion
              {...{
                route,
                currentRoutePath,
                isActive: activeIndex === index,
                onSelect: () =>
                  setActiveIndex(activeIndex === index ? null : index),
                depth,
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

const StyledSideNav = styled.div`
  /* ul:not([data-nav-depth="0"]) {
	border-left: 1px solid var(--hr-primary);
} */

  [aria-expanded='true'] {
    font-weight: 700 !important;
    color: var(--colors-blue0) !important;
  }

  [aria-expanded='false'][data-is-highlighted='true'] {
    font-weight: 700 !important;
    color: var(--colors-blue0) !important;
  }

  .sidenav-sublist {
    list-style: none;
    padding: 0px;
  }

  .sidenav-sublist [data-nav-depth='1'] {
    margin-left: calc(16px + 20px);
  }

  .sidenav-sublist [data-nav-depth='2'] {
    margin-left: calc(16px);
  }

  .menu-toggle__wrap {
    display: grid;
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
    grid-template-columns: auto 1fr auto;
    font-size: 14px;
    font-weight: 400;
  }

  .menu-toggle__wrap:hover {
    background-color: var(--href-hover-primary);
  }

  .menu-toggle__wrap + .sidenav-sublist {
    position: relative;
    overflow: hidden;
  }

  .sidenav-menu__container:empty {
    height: 1px;
    width: calc(100% - 32px);
    background: var(--hr-primary);
    transform: translateX(16px);
    opacity: 0.6;
    padding: 0;
    margin: 2px 0;
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
    position: absolute;
    right: 0;
    transform: translateX(-20px);
  }

  .is-open .icon-chevron {
    transform: rotate(180deg);
  }
`;

export default function SideNav() {
  return (
    <StyledSideNav>
      <ul className="sidenav-sublist" data-nav-depth="0">
        <AccordionParent routes={(NavItems as IRoutes).routes} depth={0} />
      </ul>
    </StyledSideNav>
  );
}

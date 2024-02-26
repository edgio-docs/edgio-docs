import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import useCollapse from 'react-collapsed';
import {CgExternal} from 'react-icons/cg';
import {GoChevronRight} from 'react-icons/go';
import styled from 'styled-components';

import AppContext from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';
import useConditioning from 'utils/hooks/useConditioning';

interface Route {
  title: string | null;
  path: string;
  icon: string;
  routes?: Route[];
  external?: boolean;
}

function Accordion({
  route,
  isActive,
  onSelect,
  depth,
  currentRoutePath,
}: {
  route: Route;
  isActive: boolean;
  onSelect: () => void;
  depth: number;
  currentRoutePath: string;
}) {
  const {
    version: {toVersionedPath, selectedVersion},
  } = useConditioning();

  const {themedValue} = useTheme();

  const {getCollapseProps, getToggleProps} = useCollapse({
    isExpanded: selectedVersion === '4' || isActive,
  });

  const onExapandIconClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onSelect();
  };

  const isActiveLink = route.path.length > 0;
  const currentPathAtCurrentDepth = currentRoutePath.split('/')[depth];
  const routePathAtCurrentDepth = route.path.split('/')[depth];
  let iconSrc = null;

  if (route.icon) {
    iconSrc = `/icons/${route.icon}${themedValue('-dark', '')}.svg`;
  }

  const childElement = (
    <a
      className="menu-toggle__wrap"
      data-is-highlighted={
        currentPathAtCurrentDepth === routePathAtCurrentDepth
      }
      {...getToggleProps({
        onClick: onSelect,
      })}
      data-v4={selectedVersion === '4'}>
      {depth === 0 && iconSrc && (
        <div className="icons">
          <Image
            key={iconSrc}
            src={iconSrc}
            alt={route.icon}
            width="16px"
            height="16px"
            priority
          />
        </div>
      )}
      <span>{route.title}</span>
      {route.routes && (
        <div className="icon-chevron" onClick={onExapandIconClick}>
          <GoChevronRight />
        </div>
      )}
    </a>
  );

  const isExternalLink = route.external;
  const isInternalLink = route.title && isActiveLink;
  const isExpanded = selectedVersion === '4' || isActive;

  return (
    <li
      className="sidenav-item"
      data-comp="accordion"
      data-expanded={isExpanded}>
      <div className="sidenav-menu__container">
        {/* Toggle */}
        {isExternalLink ? (
          <a
            href={route.path}
            className="sidenav-link menu-toggle__wrap"
            target="_blank"
            rel="noopener noreferrer">
            <span> {route.title}</span>
            <div className="icon-chevron">
              <CgExternal />
            </div>
          </a>
        ) : (
          isInternalLink && (
            <Link
              href={toVersionedPath(route.path)}
              className="sidenav-link"
              data-depth={depth}>
              {childElement}
            </Link>
          )
        )}
        {/* Collapse */}
        {route.routes && (
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
  routes: Route[],
  depth: number,
  currentRoutePath: string
) {
  const currentRoute = currentRoutePath.split('/')[depth];
  return routes.findIndex((route) => route.path.endsWith(currentRoute));
}

function AccordionParent({routes, depth}: {routes: Route[]; depth: number}) {
  const router = useRouter();
  const {version} = useConditioning();
  const slug = (router.query?.slug as string[]) ?? [];
  const index = slug.indexOf(version.pathPrefix);
  const currentRoutePath = (index === -1 ? slug : slug.slice(index + 1)).join(
    '/'
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(() =>
    getCurrentRouteIndex(routes, depth, currentRoutePath)
  );

  useEffect(() => {
    setActiveIndex(getCurrentRouteIndex(routes, depth, currentRoutePath));
  }, [currentRoutePath, depth, routes]);

  return (
    <>
      {routes.map((route, index) => (
        <Fragment key={index}>
          <Accordion
            route={route}
            currentRoutePath={currentRoutePath}
            isActive={activeIndex === index}
            onSelect={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
            depth={depth}
          />
        </Fragment>
      ))}
    </>
  );
}

const StyledSideNav = styled.div`
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
  height: 100%;

  ul:not([data-nav-depth='0']) {
    position: absolute;

    ::before {
      content: '';
      position: absolute;
      height: calc(100% - 10px);
      top: 5px;
      width: 1px;
      background-color: var(--hr-primary);
      left: 8px;
    }
  }

  [aria-expanded='true'] {
    .icon-chevron {
      transform: translateX(-20px) rotate(90deg);
    }
  }

  [data-is-highlighted='true'][data-v4='false'] {
    font-weight: 700 !important;
    color: var(--colors-blue0) !important;
  }

  .sidenav-sublist {
    list-style: none;
    padding: 0px;

    :first-of-type {
      flex: 1 1 0%;
      overflow-y: auto;

      + hr {
        height: 1px;
        border: none;
        background: var(--border-primary);
      }
    }
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
    font-size: 16px;
    font-weight: 400;
  }

  .menu-toggle__wrap:hover {
    color: var(--colors-blue0);
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

    /* add box lines around icon on hover */
    &:hover {
      border: 1px solid var(--colors-blue0);
  }
`;

export default function SideNav() {
  const {navMenuItems} = useContext(AppContext);

  if (navMenuItems?.routes) {
    return (
      <StyledSideNav>
        <ul className="sidenav-sublist" data-nav-depth="0">
          <AccordionParent routes={(navMenuItems as Route).routes!} depth={0} />
        </ul>
      </StyledSideNav>
    );
  }

  return null;
}

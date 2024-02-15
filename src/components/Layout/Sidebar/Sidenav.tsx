import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import useCollapse from 'react-collapsed';
import {CgExternal} from 'react-icons/cg';
import {GoChevronRight} from 'react-icons/go';
import styled from 'styled-components';

import {FIDDLE_URL} from '../../../../constants';

import AppContext from 'contexts/AppContext';
import useConditioning from 'utils/hooks/useConditioning';
import type {Route} from 'utils/Types';

// Simplified and reorganized Accordion component
function Accordion({
  route,
  isActive,
  onToggle,
  depth,
}: {
  route: Route;
  isActive: boolean;
  onToggle: () => void;
  depth: number;
}) {
  const {
    version: {toVersionedPath, selectedVersion},
  } = useConditioning();
  const {getCollapseProps, getToggleProps} = useCollapse({
    isExpanded: isActive,
  });

  // Directly return null to avoid rendering if no path is provided
  if (!route.path) {
    return null;
  }

  // Render the accordion item
  return (
    <li className="sidenav-item" data-comp="accordion" data-expanded={isActive}>
      <div className="sidenav-menu__container">
        {/* Render external link or internal navigation link */}
        <span className="sidenav-item-link">
          {route.external ? (
            <ExternalLink route={route} />
          ) : (
            <InternalLink
              route={route}
              depth={depth}
              onToggle={onToggle}
              toVersionedPath={toVersionedPath}
              getToggleProps={getToggleProps}
            />
          )}
        </span>
        {/* Conditional rendering of sub-menu items */}
        {route.routes && (
          <ul className="sidenav-sublist" {...getCollapseProps()}>
            {route.routes.map((subRoute, index) => (
              <Accordion
                key={index}
                route={subRoute}
                isActive={isActive}
                onToggle={() => {}}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

// Renders an external link
function ExternalLink({route}: {route: Route}) {
  return (
    <a
      href={route.path}
      className="sidenav-link menu-toggle__wrap"
      target="_blank"
      rel="noopener noreferrer">
      <span>{route.title}</span>
      <CgExternal className="icon-chevron" />
    </a>
  );
}

// Renders an internal link with optional toggle for sub-menus
function InternalLink({
  route,
  depth,
  onToggle,
  toVersionedPath,
  getToggleProps,
}: {
  route: Route;
  depth: number;
  onToggle: () => void;
  toVersionedPath: (path: string) => string;
  getToggleProps: () => any;
}) {
  const preventDefaultAndToggle = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <Fragment>
      {route.icon && depth === 0 && <RouteIcon icon={route.icon} />}
      <Link
        href={toVersionedPath(route.path!)}
        className="sidenav-link"
        data-depth={depth}>
        <a {...getToggleProps()} className="menu-toggle__wrap">
          <span>{route.title}</span>

          {route.routes && (
            <span className="icon-chevron" onClick={preventDefaultAndToggle}>
              <GoChevronRight />
            </span>
          )}
        </a>
      </Link>
    </Fragment>
  );
}

// Utility component to render route icons
function RouteIcon({icon}: {icon: string}) {
  return (
    <div className="icons">
      <ImageWrapper icon={icon} theme="dark" />
      <ImageWrapper icon={icon} theme="light" />
    </div>
  );
}

// Utility component for Image tags to reduce repetition
function ImageWrapper({icon, theme}: {icon: string; theme: string}) {
  return (
    <div id={`${theme}-theme`}>
      <Image
        src={`/icons/${icon}${theme === 'light' ? '-dark' : ''}.svg`}
        alt={icon}
        width="16px"
        height="16px"
        priority
      />
    </div>
  );
}

// Main SideNav component that handles rendering of top-level AccordionParent
export default function SideNav() {
  const {navMenuItems} = useContext(AppContext);

  if (!navMenuItems.routes) {
    return null;
  }

  return (
    <StyledSideNav>
      <ul className="sidenav-sublist" data-nav-depth="0">
        {navMenuItems.routes.map((route, index) => (
          <Accordion
            key={index}
            route={route}
            isActive={index === 1} // Initial state can be dynamic based on the route or context
            onToggle={() => {}} // Implement toggle functionality if needed
            depth={0}
          />
        ))}
      </ul>
    </StyledSideNav>
  );
}

const StyledSideNav = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  /* Styles for nested lists */
  ul:not([data-nav-depth='0']) {
    position: relative; /* Adjusted to ensure proper alignment and visibility */
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

  /* Rotate chevron icon when expanded */
  [aria-expanded='true'] .icon-chevron {
    transform: rotate(90deg);
  }

  /* Highlight styling */
  [data-is-highlighted='true'][data-v4='false'] {
    font-weight: 700 !important;
    color: var(--colors-blue0) !important;
  }

  .sidenav-menu__container {
    display: flex; /* Use flexbox for layout */
    align-items: center; /* Align items vertically in the center */
    flex-wrap: nowrap; /* Ensure items do not wrap */
    flex-direction: row; /* Stack items horizontally */
  }

  .menu-toggle__wrap {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 0;
    background: transparent;
    border: none;
    text-decoration: none;
    cursor: pointer;
    color: var(--sidebar-link-primary);
    font-size: 14px;
    font-weight: 400;
    flex-wrap: nowrap;
    transition: transform 0.2s ease;

    &:hover {
      font-size: 16px; /* Makes text slightly larger */
      color: var(--colors-blue0);
    }
  }

  span.icon-chevron {
    margin-left: auto;
    margin-right: 20px;
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
    flex-shrink: 0;

    &:hover {
      font-size: 16px; /* Makes text slightly larger */
      box-shadow: 0 0 0 1px var(--sidebar-link-primary);
    }
  }

  /* Ensure the hover effect on chevron does not affect the alignment */
  .icons {
    margin-right: 10px;
    transition: 100ms ease-in-out;
    flex-shrink: 0;
  }

  /* Additional styles for .icon-chevron and other elements... */

  /* Adjustments for nested sublist indentation and styling */
  .sidenav-sublist {
    list-style: none; /* Remove bullet points */
    padding-left: 0; /* Remove padding */
    margin-left: 16px; /* Indent nested lists */
    display: flex; /* Use flex layout for sublists */
    flex-direction: column; /* Stack items vertically */
  }

  /* Style adjustments for deeper nesting or specific cases */
  .sidenav-sublist [data-nav-depth='1'],
  .sidenav-sublist [data-nav-depth='2'] {
    margin-left: calc(16px + 20px); /* Adjust margins for nested items */
  }
`;

const links = [
  {
    title: 'Fiddle',
    path: `${FIDDLE_URL}/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`,
    icon: 'fiddle',
  },
  {
    title: 'Forum',
    path: 'https://forum.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    icon: 'forum',
  },
  {
    title: 'Status',
    path: 'https://status.edg.io/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    icon: 'status',
  },
  {
    title: 'Support',
    path: 'https://edg.io/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006',
    icon: 'support',
  },
  {
    title: 'Edg.io',
    path: 'https://edg.io',
    icon: 'edgio',
  },
];

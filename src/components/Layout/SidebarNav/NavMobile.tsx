import React, {useEffect, useRef, useState} from 'react';

import styled, {css} from 'styled-components';

import {IconHamburger} from 'components/Icon/IconHamburger';
import {
  IconMenuCollapse,
  IconMenuCollapseDark,
} from 'components/Icon/IconMenuCollapse';
import headerNav from 'config/header.nav';
import {useAppContext} from 'contexts/AppContext';
import {useTheme} from 'contexts/ThemeContext';

import AlgoliaSearch from '../Header/AlgoliaSearch';
import {HeaderButtons} from '../Header/Header';
import ThemeSwitcher from '../Header/ThemeSwitcher';

import SimpleAccordion from './Accordion';

import {SidebarNav} from '.';

const StyledNavWrapper = styled.nav``;

const StyledNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  height: 60px;

  & > :first-child {
    margin-right: 16px;
  }

  & > :last-child {
    margin-left: auto;
    padding-right: 10px;
  }
`;

const StyledNavBody = styled.div<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 80vw;
  height: 100%;
  background: var(--bg-primary);
  overflow-y: auto;
  z-index: 1000;

  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
`;

const StyledNavFooter = styled.div<{hasNav: boolean}>`
  ${(props) =>
    props.hasNav
      ? css`
          border-top: 1px solid var(--sidebar-line);
          padding: 24px 25px 0 25px;
        `
      : css`
          border-top: none;
          padding: 0 25px;
        `}

  ${HeaderButtons} {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 0;

    * {
      width: 100%;
      padding: 8px;
      text-align: center;
      display: block;
    }
  }
`;

const StyledCollapseIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledSidebarWrapper = styled.div`
  padding: 0 25px 24px 25px;
`;

const Overlay = styled.div<{isOpen: boolean}>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

interface SidebarNavMobileProps {
  // Add any additional props you need
}

const NavMobile: React.FC<SidebarNavMobileProps> = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const {renderThemedElement} = useTheme();
  const {hasNavigationMenu} = useAppContext();

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  const closeMenu = () => {
    setShowMenu(false);
  };

  const onSidebarNavClick = (event) => {
    // traverse up to find the parent anchor tag
    let target = event.target;
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }

    // close the menu if the target doesn't have a ul sibling
    if (target && !target.nextElementSibling) {
      closeMenu();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the nav menu
      if (navMenuRef?.current && !navMenuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showMenu]); // Only re-run the effect if showMenu changes

  useEffect(() => {
    // Prevent scrolling on the body when menu is open
    if (showMenu) {
      document.body.classList.toggle('lock-scroll', showMenu);
    }

    return () => {
      document.body.classList.remove('lock-scroll');
    };
  }, [showMenu]);

  return (
    <StyledNavWrapper ref={navMenuRef}>
      <IconHamburger onClick={toggleMenu} />
      <Overlay isOpen={showMenu} onClick={closeMenu} />
      <StyledNavBody isOpen={showMenu}>
        <StyledNavHeader>
          <AlgoliaSearch onSearchOpen={closeMenu} />
          <ThemeSwitcher />
          <StyledCollapseIcon onClick={toggleMenu}>
            {renderThemedElement(
              <IconMenuCollapse />,
              <IconMenuCollapseDark />
            )}
          </StyledCollapseIcon>
        </StyledNavHeader>
        {hasNavigationMenu && (
          <StyledSidebarWrapper>
            <SidebarNav
              {...props}
              className="navigation"
              onClick={onSidebarNavClick}
            />
          </StyledSidebarWrapper>
        )}
        <StyledNavFooter hasNav={hasNavigationMenu}>
          <SimpleAccordion items={headerNav} />
          <HeaderButtons />
        </StyledNavFooter>
      </StyledNavBody>
    </StyledNavWrapper>
  );
};

export default NavMobile;

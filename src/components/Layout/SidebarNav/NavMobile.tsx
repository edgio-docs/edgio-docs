import React, {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';

import {IconHamburger} from 'components/Icon/IconHamburger';
import {
  IconMenuCollapse,
  IconMenuCollapseDark,
} from 'components/Icon/IconMenuCollapse';
import {useTheme} from 'contexts/ThemeContext';

import AlgoliaSearch from '../Header/AlgoliaSearch';
import {HeaderButtons} from '../Header/Header';
import {getHeaderNavAsRoutes} from '../Header/HeaderNav';
import ThemeSwitcher from '../Header/ThemeSwitcher';

import {SidebarNav} from '.';

const StyledNavWrapper = styled.nav``;

const StyledNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 60px;

  & > :first-child {
    margin-right: 16px;
  }

  & > :last-child {
    margin-left: auto;
    padding-right: 10px;
  }
`;

const StyledNavBody = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80vw;
  height: 100%;
  background: var(--bg-primary);
  overflow-y: auto;
  z-index: 1000;
`;

const StyledNavFooter = styled.div`
  border-top: 1px solid var(--sidebar-line);
  padding: 10px;
`;

const StyledCollapseIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledSidebarWrapper = styled.div``;

interface SidebarNavMobileProps {
  // Add any additional props you need
}

const NavMobile: React.FC<SidebarNavMobileProps> = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const {renderThemedElement} = useTheme();

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  const closeMenu = () => {
    setShowMenu(false);
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
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = showMenu ? 'hidden' : originalStyle;

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [showMenu]);

  console.log('footer items', getHeaderNavAsRoutes());

  return (
    <StyledNavWrapper ref={navMenuRef}>
      {!showMenu && <IconHamburger onClick={toggleMenu} />}
      {showMenu && (
        <StyledNavBody>
          <StyledNavHeader>
            <AlgoliaSearch />
            <ThemeSwitcher />
            <StyledCollapseIcon onClick={toggleMenu}>
              {renderThemedElement(
                <IconMenuCollapse />,
                <IconMenuCollapseDark />
              )}
            </StyledCollapseIcon>
          </StyledNavHeader>
          <StyledSidebarWrapper>
            <SidebarNav
              {...props}
              className="navigation"
              items={getHeaderNavAsRoutes()}
            />
          </StyledSidebarWrapper>
          <StyledNavFooter>
            <HeaderButtons />
          </StyledNavFooter>
        </StyledNavBody>
      )}
    </StyledNavWrapper>
  );
};

export default NavMobile;

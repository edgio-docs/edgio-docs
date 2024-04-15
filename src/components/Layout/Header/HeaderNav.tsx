import {Menu, MenuButton, MenuLink, MenuList} from '@reach/menu-button';
import {FaAngleDown} from 'react-icons/fa';
import styled from 'styled-components';

import '@reach/menu-button/styles.css';
import Link from 'components/MDX/Link';
import headerNavConfig from 'config/header.nav';

import {Route} from '../SidebarNav/SidebarNav';

const StyledMenuButton = styled(MenuButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  word-wrap: break-word;
  border: none;
  gap: 4px;
  background: transparent;

  &:hover,
  &:focus {
    color: var(--colors-blue0);
    cursor: pointer;

    svg {
      color: inherit;
    }
  }
`;

const StyledMenuLink = styled(Link)`
  font-size: 14px;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: var(--colors-blue0);
    text-decoration: none;
  }
`;

const StyledMenuList = styled(MenuList)`
  width: 100%;
  height: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  background: var(--bg-secondary);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;

  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.slide-down[data-reach-menu-list],
  &.slide-down[data-reach-menu-items] {
    border-radius: 5px;
    animation: slide-down 0.2s ease;
  }

  > [data-reach-menu-item] {
    padding-top: 7px;
    padding-bottom: 8px;
    padding-left: 13px;
    padding-right: 13px;
    color: var(--text-primary);
    font-size: 12px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    width: 100%;
  }

  > [data-reach-menu-item][data-selected] {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
`;

const StyledMenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--bg-secondary);
  margin: 8px 0;
`;

// Style for SEO friendly links (hidden from users but visible to search engines)
const SEOLinksContainer = styled.div`
  display: none;
`;

export default function HeaderNav() {
  return (
    <>
      {headerNavConfig.map((navItem, index) => {
        const isLink = !!navItem.url;
        const hasItems = !!navItem.items;

        return (
          <div key={index}>
            <Menu>
              <StyledMenuButton>
                {isLink ? (
                  <StyledMenuLink href={navItem.url} versioned={false}>
                    {navItem.title}
                  </StyledMenuLink>
                ) : (
                  <>
                    <span>{navItem.title}</span>
                    <FaAngleDown />
                  </>
                )}
              </StyledMenuButton>
              {hasItems && (
                <StyledMenuList>
                  {navItem.items?.map((item, index) => {
                    const isDivider = item === null;

                    if (isDivider) {
                      return <StyledMenuDivider key={index} />;
                    }

                    const {name, url, useNextLink} = item;
                    return (
                      <MenuLink key={index} as="span">
                        <StyledMenuLink
                          href={url}
                          versioned={false}
                          useNextLink={useNextLink}>
                          {name}
                        </StyledMenuLink>
                      </MenuLink>
                    );
                  })}
                </StyledMenuList>
              )}
            </Menu>
            {/* SEO friendly links */}
            <SEOLinksContainer>
              {hasItems &&
                navItem.items?.map((item, seoIndex) => {
                  if (item) {
                    return (
                      <a
                        key={seoIndex}
                        href={item.url}
                        style={{display: 'none'}}>
                        {item.name}
                      </a>
                    );
                  }
                  return null;
                })}
            </SEOLinksContainer>
          </div>
        );
      })}
    </>
  );
}

interface HeaderRoute extends Route {
  icon?: React.ReactNode;
}

export function getHeaderNavAsRoutes(): HeaderRoute {
  const nav = {
    title: 'header-nav',
    path: '/applications',
    routes: headerNavConfig.map((navItem) => {
      const isLink = !!navItem.url;
      const hasItems = !!navItem.items;

      if (isLink) {
        return {
          title: navItem.title,
          path: navItem.url || 'foo',
        };
      }

      if (hasItems) {
        return {
          title: navItem.title,
          path: 'foo',
          routes: navItem.items?.map((item) => {
            if (item) {
              return {
                title: item.name,
                path: item.url || 'bar',
              };
            }
            return {
              title: 'FooBarBaz',
              path: 'baz',
            };
          }),
        };
      }

      return null;
    }),
  };

  console.log('nav: ', nav);

  return nav;
}

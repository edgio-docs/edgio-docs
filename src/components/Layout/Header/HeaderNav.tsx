import {Menu, MenuList, MenuButton, MenuLink} from '@reach/menu-button';
import Link from 'next/link';
import {FaAngleDown} from 'react-icons/fa';
import styled from 'styled-components';

import '@reach/menu-button/styles.css';
import headerNavConfig from 'config/header.nav';

const StyledMenuButton = styled(MenuButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-size: 14px;
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

  & > a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const StyledMenuList = styled(MenuList)`
  width: 100%;
  height: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  background: #17232e;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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
    color: white;
    font-size: 12px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    width: 100%;
  }

  > [data-reach-menu-item][data-selected] {
    background: #515a62;
    color: white;
  }
`;

const StyledMenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #515a62;
  margin: 8px 0;
`;

export default function HeaderNav() {
  return (
    <>
      {headerNavConfig.map((navItem, index) => {
        const isLink = !!navItem.url;
        const hasItems = !!navItem.items;

        return (
          <Menu key={index}>
            <StyledMenuButton>
              {isLink ? (
                <Link href={navItem.url} passHref>
                  <a>{navItem.title}</a>
                </Link>
              ) : (
                <>
                  <span>{navItem.title}</span>
                  <FaAngleDown />
                </>
              )}
            </StyledMenuButton>
            {hasItems && (
              <StyledMenuList>
                {navItem.items.map((item, index) => {
                  const isDivider = item === null;

                  if (isDivider) {
                    return <StyledMenuDivider key={index} />;
                  }
                  return (
                    <MenuLink key={index} as={'a'} href={item.url}>
                      {item.name}
                    </MenuLink>
                  );
                })}
              </StyledMenuList>
            )}
          </Menu>
        );
      })}
    </>
  );
}

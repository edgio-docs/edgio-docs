import Link from 'next/link';
import styled from 'styled-components';
import {IconSearch} from '../../Icon/IconSearch';
import {IconDarkMode} from '../../Icon/IconDarkMode';
import {IconLogoWithText} from '../../Icon/IconLogoWithText';
import {siteConfig} from 'siteConfig';
import {DocSearch} from '@docsearch/react';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--white);
  width: 100%;
  height: var(--header-height);
  box-shadow: inset 0 -1px #e3e8ee;
  padding: 17px 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 20px;

  > [class*='col'] {
    display: flex;
    align-items: center;
  }

  .col-1 {
    .logo-box {
      cursor: pointer;
    }
  }

  .col-2 {
    justify-content: center;

    .search-form__box {
      max-width: 623px;
      width: 623px;
    }

    .search-form {
      display: flex;
      column-gap: 5px;
      padding: 6px 10px;
      width: 100%;
      height: 36px;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
      transition-delay: initial;
      transition-property: all;
      border-radius: 4px;
      background: #f6f6f6;

      :focus-within,
      :hover {
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(60, 66, 87, 0.16) 0px 0px 0px 2px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px;
      }

      label {
        display: flex;
        align-items: center;
        height: 100%;
        curson: text;
      }

      [type='search'] {
        flex: 1;
        background: transparent;
        border: none;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        color: #606060;
        appearance: none;
        outline: 0;
      }
    }
  }

  .col-3 {
    display: grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 15px;
    align-items: center;

    .theme-switcher {
      width: 32px;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      height: 32px;

      :hover {
        background-color: #e5e5e5;
        cursor: pointer;
      }
    }

    a {
      font-size: 14px;
      line-height: 19px;
      color: var(--black1);
      text-decoration: none;
      padding: 4px 12px;
    }

    a:last-of-type {
      color: var(--white);
      background-color: var(--pink);
      padding: 8px 12px;
      font-weight: 600;
      border-radius: 4px;
    }
  }
`;

const {
  appId: algoliaAppId,
  apiKey: algoliaApiKey,
  indexName,
} = siteConfig.algolia;

export default function Header() {
  return (
    <StyledHeader className="docs-header">
      <div className="col-1">
        <Link href="/" passHref>
          <div className="logo-box">
            <IconLogoWithText className="logo" />
          </div>
        </Link>
      </div>
      <div className="col-2">
        <div className="search-form__box">
          <DocSearch
            appId={algoliaAppId}
            indexName={indexName}
            apiKey={algoliaApiKey}
          />
        </div>
      </div>
      <div className="col-3">
        <button type="button" className="theme-switcher">
          <IconDarkMode />
        </button>
        <Link href="https://app.layer0.co/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f">
          Login
        </Link>
        <Link href="https://app.layer0.co/signup?redirectTo=%2F&sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f">
          Sign up
        </Link>
      </div>
    </StyledHeader>
  );
}

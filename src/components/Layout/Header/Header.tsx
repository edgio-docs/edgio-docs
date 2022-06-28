import {DocSearch} from '@docsearch/react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import EdgioDark from '../../../../public/images/home/edgio-dark.png';
import EdgioLight from '../../../../public/images/home/edgio-light.png';
import NoSSRWrapper from '../NoSSRWrapper';

import {IconHamburger} from 'components/Icon/IconHamburger';
import {
  IconDarkMobileLogo,
  IconLightMobileLogo,
} from 'components/Icon/IconMobileLogo';
import {siteConfig} from 'siteConfig';
import useTheme from 'utils/hooks/useTheme';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--bg-secondary);
  width: 100%;
  height: var(--header-height);
  box-shadow: inset 0 -1px var(--shadow-primary);
  padding: 17px 20px;
  display: grid;
  grid-template-columns: auto auto;
  align-content: center;

  > [class*='col'] {
    display: flex;
    align-items: center;
  }

  .col-1 {
    .logo-box {
      cursor: pointer;
      align-items: center;
    }

    a {
      text-decoration: none;
    }
  }

  .col-2 {
    display: flex;
    justify-content: flex-end;

    .desktop {
      display: grid;
      grid-template-columns: repeat(4, auto);
      column-gap: 15px;
      align-items: center;
    }

    .theme-switcher {
      height: 32px;
      width: 32px;
      background-color: transparent;
      border: none;
      justify-content: center;
      align-items: center;
      padding: 0;

      :hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }

    a {
      font-size: 14px;
      line-height: 19px;
      color: var(--text-primary);
      text-decoration: none;
      padding: 4px 12px;
    }

    a:last-of-type {
      color: var(--colors-white0);
      background: var(--lg-primary);
      padding: 8px 12px;
      font-weight: 600;
      border-radius: 4px;
    }
  }

  button[class*='mobile-menu'] {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-primary);
  }

  #mobile {
    display: none;
  }

  .DocSearch-Button {
    background-color: transparent;
  }

  .DocSearch-Button-Placeholder {
    display: none;
  }

  @media (max-width: 850px) {
    #desktop {
      display: none;
    }

    #mobile {
      display: grid;
      grid-template-columns: repeat(3, auto);
      align-items: center;
      column-gap: 15px;
    }

    .col-2 {
      display: flex;
    }

    .col-3 {
      display: flex;
    }
  }
`;

declare global {
  interface Window {
    __theme: string;
    __setPreferredTheme: (theme: string) => void;
  }
}

const lightSwitchIcon = (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 8.92517C15.568 7.42976 14.8518 5.36767 15.3161 2.62871C12.4591 3.41577 10.5938 2.16435 8.95671 0.0078125C7.39834 2.40834 5.28902 3.14817 2.36117 2.71529C3.56537 5.75333 1.81023 7.43763 0 9.15342C2.41627 10.6331 3.14823 12.703 2.66812 15.4105C5.40708 14.836 7.39047 15.6624 9.05116 18.3384C10.4757 15.4105 12.7503 15.017 15.4735 15.3161C14.5291 12.3725 16.056 10.6331 18 8.92517ZM13.5059 9.31083C13.4771 9.77847 13.3816 10.2396 13.2226 10.6803L13.1753 10.8062C13.1178 10.9515 13.0521 11.0934 12.9786 11.2313C12.9145 11.3624 12.8408 11.4887 12.7582 11.609C12.7078 11.6784 12.6525 11.7442 12.5929 11.8058L12.4749 11.979L12.4198 12.034C11.8108 12.7712 10.9925 13.3061 10.073 13.568C9.15345 13.83 8.17608 13.8067 7.2701 13.5012C6.36412 13.1957 5.57222 12.6223 4.99911 11.857C4.42601 11.0917 4.09871 10.1705 4.0605 9.21515C4.02229 8.25981 4.27496 7.31537 4.7851 6.50674C5.29525 5.6981 6.03883 5.06336 6.91751 4.68646C7.79619 4.30957 8.76858 4.20826 9.70609 4.39595C10.6436 4.58363 11.502 5.05147 12.1679 5.73759L12.3804 5.93435C12.5421 6.1113 12.6895 6.30079 12.8212 6.50104C13.2381 7.17243 13.4614 7.94597 13.4666 8.73628C13.4666 8.83073 13.4666 8.9173 13.4666 9.01175C13.4666 9.1062 13.4666 9.16129 13.4666 9.23212L13.5059 9.31083Z"
      fill="white"
    />
    <path
      d="M8.76778 12.8368C10.7934 12.8368 12.4355 11.1948 12.4355 9.16915C12.4355 7.14354 10.7934 5.50146 8.76778 5.50146C6.74218 5.50146 5.1001 7.14354 5.1001 9.16915C5.1001 11.1948 6.74218 12.8368 8.76778 12.8368Z"
      fill="white"
    />
  </svg>
);

const darkSwitchIcon = (
  <svg
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_71_224)">
      <path
        d="M18 8.92517C15.568 7.42976 14.8518 5.36767 15.3161 2.62871C12.4591 3.41577 10.5938 2.16435 8.95671 0.0078125C7.39834 2.40834 5.28902 3.14817 2.36117 2.71529C3.56537 5.75333 1.81023 7.43763 0 9.15342C2.41627 10.6331 3.14823 12.703 2.66812 15.4105C5.40708 14.836 7.39047 15.6624 9.05116 18.3384C10.4757 15.4105 12.7503 15.017 15.4735 15.3161C14.5291 12.3725 16.056 10.6331 18 8.92517ZM12.4906 11.9868C12.3754 12.1229 12.2518 12.2517 12.1207 12.3725C11.5321 12.9313 10.7918 13.3041 9.99238 13.4441C9.19297 13.5841 8.37001 13.4851 7.62658 13.1595C8.51793 12.8792 9.29588 12.3203 9.84616 11.5652C10.3965 10.81 10.6901 9.89823 10.6839 8.96385C10.6777 8.02946 10.3721 7.12168 9.81191 6.37382C9.25171 5.62597 8.46646 5.07746 7.57149 4.80886C8.2962 4.57859 9.06491 4.52201 9.81552 4.64369C10.5661 4.76538 11.2776 5.06191 11.8924 5.50934C12.0733 5.64946 12.2418 5.80482 12.3962 5.97371C12.5578 6.15065 12.7052 6.34014 12.8369 6.54039C13.3255 7.37949 13.5548 8.34443 13.496 9.31364C13.4372 10.2828 13.0928 11.213 12.5063 11.9868H12.4906Z"
        fill="#606060"
      />
    </g>
    <defs>
      <clipPath id="clip0_71_224">
        <rect width="18" height="18.3384" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const {
  appId: algoliaAppId,
  apiKey: algoliaApiKey,
  indexName,
} = siteConfig.algolia;

export default function Header({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}) {
  return (
    <StyledHeader className="docs-header">
      <div className="col-1">
        <div id="desktop">
          <Link href="/" passHref>
            <a>
              <div className="logo-box" id="light-theme">
                <Image
                  src={EdgioDark}
                  width="86"
                  height="36"
                  alt="Edgio"
                  unoptimized
                  priority
                />
              </div>
              <div className="logo-box" id="dark-theme">
                <Image
                  src={EdgioLight}
                  width="86"
                  height="36"
                  alt="Edgio"
                  unoptimized
                  priority
                />
              </div>
            </a>
          </Link>
        </div>
        <div id="mobile">
          <Link href="/" passHref>
            <a>
              <div className="logo-box">
                <IconLightMobileLogo className="logo" />
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="col-2">
        <div id="desktop" className="desktop">
          <div className="search-form__box">
            <NoSSRWrapper>
              <DocSearch
                appId={algoliaAppId}
                indexName={indexName}
                apiKey={algoliaApiKey}
              />
            </NoSSRWrapper>
          </div>
          <ToggleTheme />
          <Link href="https://app.layer0.co/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f">
            Login
          </Link>
          <Link href="https://app.layer0.co/signup?redirectTo=%2F&sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f">
            Sign up
          </Link>
        </div>
        <div id="mobile">
          <div className="search-form__box">
            <NoSSRWrapper>
              <DocSearch
                appId={algoliaAppId}
                indexName={indexName}
                apiKey={algoliaApiKey}
              />
            </NoSSRWrapper>
          </div>
          <ToggleTheme />
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setShowSidebar(!showSidebar)}>
            <IconHamburger />
          </button>
        </div>
      </div>
    </StyledHeader>
  );
}

function ToggleTheme() {
  const {setTheme} = useTheme();
  return (
    <>
      <button
        type="button"
        className="theme-switcher"
        id="light-theme"
        onClick={() => {
          setTheme('dark');
        }}>
        {darkSwitchIcon}
      </button>
      <button
        type="button"
        className="theme-switcher"
        id="dark-theme"
        onClick={() => {
          setTheme('light');
        }}>
        {lightSwitchIcon}
      </button>
    </>
  );
}

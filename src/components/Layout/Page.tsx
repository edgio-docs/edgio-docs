import Link from 'next/link';
import {useRouter} from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {PRODUCT_APPLICATIONS} from '../../../constants';

import Header from './Header/Header';
import SideNav from './Sidebar/Sidenav';
import {useIsMobile} from './useMediaQuery';
import {RouteItem, SidebarContext} from './useRouteMeta';

import useConditioning from 'utils/hooks/useConditioning';

interface PageProps {
  routeTree: RouteItem;
  children: React.ReactNode;
}

interface StyledBannerxProps {
  legacy?: boolean;
  future?: boolean;
}

const StyledMainPage = styled.div`
  --sidebar-width: 280px;

  .docs-content {
    width: 100%;
    display: flex;

    .docs-side__nav {
      position: sticky;
      left: 0px;
      top: var(--header-height);
      height: calc(100vh - var(--header-height));
      width: var(--sidebar-width);
      overflow: auto;
      user-select: none;
      padding: calc(var(--header-height) / 2) 0;
      z-index: 2;
      background-color: var(--bg-secondary);
      will-change: transform;
      transition: transform 0.2s;

      &[data-open='true'] {
        position: fixed;
        transform: translateX(0);
      }

      @media (max-width: 850px) {
        position: fixed;
        transform: translateX(calc(-1 * 100% - 8px));
        width: calc(100% - 16px);
      }
    }

    .docs-content__inner {
      flex: 1 1 0%;
      min-height: calc(100vh - var(--header-height));
      position: relative;

      .LayoutHome {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }
    }
  }
`;

const StyledBanner = styled.div<StyledBannerxProps>`
  --banner-text-color: ${({legacy, future}) => (legacy ? '#000' : '#fff')};
  --banner-background-color: ${({legacy, future}) =>
    legacy ? 'var(--callout-tip)' : future ? '#812990' : 'var(--lg-primary)'};

  display: block;
  text-align: center;
  color: var(--banner-text-color);
  background: var(--banner-background-color);
  font-size: calc(1rem - 2px);
  padding: 1em;
  text-decoration: none;
  font-weight: 500;

  a {
    color: var(--banner-text-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Banner() {
  const {version} = useConditioning();
  if (version.selectedVersion === '7') {
    return (
      <StyledBanner future>
        Get ready for {PRODUCT} {PRODUCT_APPLICATIONS} {version.selectedVersionText}.&nbsp;

        <Link href="/guides/v7-intro" passHref>
          <a>Learn about this upcoming product release.</a>
        </Link>

      </StyledBanner>
    );
  }
  if (!version.isLatest) {
    return (
      <StyledBanner legacy>
        You are reading {PRODUCT} {PRODUCT_APPLICATIONS} {version.selectedVersionText} docs.&nbsp;
        <Link href="/" passHref>
          <a>
            Check out our latest docs for {PRODUCT} {PRODUCT_APPLICATIONS} {version.latestVersionText}.
          </a>
        </Link>
      </StyledBanner>
    );
  }
  return (
    <StyledBanner>
      🎉 Introducing {PRODUCT} {PRODUCT_APPLICATIONS} v6 which supports Node.js v16.{' '}
      <Link href="/guides/reference/v6_migration" passHref>
        <a>Learn how to upgrade.</a>
      </Link>{' '}
      🎉
    </StyledBanner>
  );
}

export function Page({routeTree, children}: PageProps) {
  const isMobile = useIsMobile(850);
  const [showSidebar, setShowSidebar] = React.useState(isMobile);
  const router = useRouter();
  const showBanner = !isMobile || (isMobile && !showSidebar);

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => setShowSidebar(false));
  }, [router]);

  return (
    <StyledMainPage>
      {showBanner && <Banner />}
      <Header {...{showSidebar, setShowSidebar}} />
      <SidebarContext.Provider value={routeTree}>
        <main className="docs-content">
          <div
            className="docs-side__nav custom-scrollbar"
            data-open={isMobile && showSidebar}>
            <SideNav />
          </div>
          <div className="docs-content__inner">{children}</div>
        </main>
      </SidebarContext.Provider>
    </StyledMainPage>
  );
}

import {useRouter} from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import Header from './Header/Header';
import SideNav from './Sidebar/Sidenav';
import {useIsMobile} from './useMediaQuery';
import {RouteItem, SidebarContext} from './useRouteMeta';

interface PageProps {
  routeTree: RouteItem;
  children: React.ReactNode;
}

interface IStyledMainPageProps {
  isBannerHidden: boolean;
}

const StyledMainPage = styled.div.attrs<IStyledMainPageProps>((props) => ({
  isBannerHidden: props.isBannerHidden || false,
}))<IStyledMainPageProps>`
  --sidebar-width: 280px;
  --mult: ${(props) => (props.isBannerHidden ? 1 : 2)};
  display: grid;
  grid-template-rows: calc(var(--header-height) * var(--mult)) 1fr;

  .docs-content {
    width: 100%;
    display: flex;
    padding-top: 8px;

    .docs-side__nav {
      left: 0px;
      width: var(--sidebar-width);
      overflow: hidden;
      user-select: none;
      z-index: 2;
      will-change: transform;
      transition: transform 0.2s;
      top: 0;
      display: grid;
      align-items: center;
      position: sticky;
      height: calc(100vh - (var(--header-height) * var(--mult)) - 16px);
      background-color: var(--bg-primary);
      top: calc(var(--header-height) * var(--mult));

      &[data-open='true'] {
        position: fixed;
        transform: translateX(0);
      }

      @media (max-width: 850px) {
        position: fixed;
        transform: translateX(calc(-1 * 100% - 8px));
        width: 100%;
      }
    }

    .docs-content__inner {
      flex: 1 1 0%;
      position: relative;
      margin-bottom: 8px;

      .LayoutHome {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }
    }
  }
`;

export function Page({routeTree, children}: PageProps) {
  const isMobile = useIsMobile(850);
  const [showSidebar, setShowSidebar] = React.useState(isMobile);
  const router = useRouter();

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => setShowSidebar(false));
  }, [router]);

  React.useEffect(() => {
    showSidebar
      ? document.body.setAttribute('style', 'overflow:hidden;position:fixed')
      : document.body.removeAttribute('style');
  }, [showSidebar]);

  return (
    <StyledMainPage {...{isBannerHidden: isMobile}}>
      <Header {...{showSidebar, setShowSidebar, isMobile}} />
      <SidebarContext.Provider value={routeTree}>
        <main className="docs-content">
          <div className="docs-side__nav" data-open={isMobile && showSidebar}>
            <SideNav />
          </div>
          <div className="docs-content__inner">{children}</div>
        </main>
      </SidebarContext.Provider>
    </StyledMainPage>
  );
}

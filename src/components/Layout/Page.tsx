import {useRouter} from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import Header from './Header/Header';
import {Sidebar} from './Sidebar/Sidebar';
import {useIsMobile} from './useMediaQuery';
import {RouteItem, SidebarContext} from './useRouteMeta';

interface PageProps {
  routeTree: RouteItem;
  children: React.ReactNode;
}

const StyledMainPage = styled.div`
  --sidebar-width: 280px;

  .docs-content {
    width: 100%;
    display: flex;

    .docs-side__nav {
      position: sticky;
      left: 0;
      top: var(--header-height);
      height: calc(100vh - var(--header-height));
      width: var(--sidebar-width);
      overflow: auto;
      user-select: none;
      padding: calc(var(--header-height) / 2) 0;
      box-shadow: inset -1px 0px var(--hr-secondary);
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
        transform: translateX(calc(-1 * var(--sidebar-width)));
      }
    }

    .docs-content__inner {
      margin: 0 auto;
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

export function Page({routeTree, children}: PageProps) {
  const isMobile = useIsMobile(850);
  const [showSidebar, setShowSidebar] = React.useState(isMobile);
  const router = useRouter();

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => setShowSidebar(false));
  }, [router]);

  return (
    <StyledMainPage>
      <Header {...{showSidebar, setShowSidebar}} />
      <SidebarContext.Provider value={routeTree}>
        <main className="docs-content">
          <div
            className="docs-side__nav custom-scrollbar"
            data-open={isMobile && showSidebar}>
            <Sidebar />
          </div>
          <div className="docs-content__inner">{children}</div>
        </main>
      </SidebarContext.Provider>
    </StyledMainPage>
  );
}

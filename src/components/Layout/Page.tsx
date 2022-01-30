import * as React from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

interface PageProps {
  children: React.ReactNode;
}

const StyledDocs = styled.div`
  --sidebar-width: 280px;
  --header-height: 64px;

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
      background-color: #f6f6f7;
      padding: 20px 0;
      box-shadow: inset -1px 0px #e3e8ee;
    }

    .docs-content__inner {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      flex: 1 1;

      .LayoutHome {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem 1rem;
      }
    }
  }
`;

export function Page({ children }: PageProps) {
  return (
    <StyledDocs className="docs">
      <Header />
      <main className="docs-content">
        {/* app-content */}
        <div className="docs-side__nav">
          <Sidebar />
        </div>
        <div className="docs-content__inner">{children}</div>
      </main>
    </StyledDocs>
  );
}

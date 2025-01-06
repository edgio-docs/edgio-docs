// @ts-ignore
import * as React from 'react';

import {default as JSURL} from 'jsurl';
import debounce from 'lodash/debounce';
import {useRouter} from 'next/router';
// @ts-ignore
import scrollIntoView from 'scroll-into-view';
import styled from 'styled-components';

import Link from 'components/MDX/Link';
import {ContextType, useAppContext} from 'contexts/AppContext';
import useConditioning from 'utils/hooks/useConditioning';
import textCompare from 'utils/textCompare';

import Header from './Header/Header';
import MobileHeader from './Header/MobileHeader';
import {SidebarNav} from './navigation';
import {useIsMobile} from './useMediaQuery';

export function Page({children}: PageProps) {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = React.useState(isMobile);
  const router = useRouter();
  const {context, hasNavigationMenu} = useAppContext();
  const showBanner = context === ContextType.APPLICATIONS && !isMobile;
  const contentInnerRef = React.useRef(null);

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => setShowSidebar(false));
  }, [router]);

  React.useEffect(() => {
    const handleHashChange = debounce(() => {
      const hash = window.location.hash.substring(1);
      if (!hash) {
        return;
      }

      try {
        const highlight = JSURL.parse(hash);
        if (highlight?.q?.length > 0 && contentInnerRef.current) {
          highlightElementByText(
            highlight.q as string,
            contentInnerRef.current
          );
        }
      } catch (e) {}
    }, 100);

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.addEventListener('hashchange', handleHashChange);
      handleHashChange.cancel();
    };
  }, []);

  return (
    <StyledMainPage>
      <StyledTopMessage>
        <div className="inner-container">
          <p>
            As part of our filing for Chapter 11 bankruptcy relief,{' '}
            <a
              href="https://www.akamai.com/newsroom/press-release/akamai-completes-acquisition-of-select-assets-of-edgio"
              style={{color: '#6d28d9'}}>
              Akamai has acquired
            </a>{' '}
            select assets from Edgio, including certain customer contracts from
            our content delivery and security businesses, but not including{' '}
            <a href="https://uplynk.com">Uplynk</a>. We encourage any active
            Edgio delivery or security customers that are not already engaged
            with Akamai to migrate their services, to contact their{' '}
            <a
              href="https://www.akamai.com/company/locations"
              style={{color: '#6d28d9'}}>
              local Akamai office
            </a>{' '}
            or <a href="mailto:support@edg.io">support@edg.io</a> as soon as
            possible to help avoid service interruptions.
          </p>
          <br />
          <p>
            Any Edgio <a href="https://uplynk.com">Uplynk</a> customers can
            reach out to{' '}
            <a href="mailto:support@uplynk.com">support@uplynk.com</a> for any
            questions or concerns.
          </p>
        </div>
      </StyledTopMessage>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      )}
      <main className="docs-content">
        {hasNavigationMenu && !isMobile && (
          <div
            className="docs-side__nav custom-scrollbar"
            data-open={isMobile && showSidebar}>
            <SidebarNav />
          </div>
        )}
        <div className="docs-content__inner" ref={contentInnerRef}>
          {children}
        </div>
      </main>
    </StyledMainPage>
  );
}

const StyledTopMessage = styled.div`
  padding: 1rem;
  background: #e2e8f0;
  color: #0f172a;
  font-weight: medium;

  .inner-container {
    margin: 0 auto;
    max-width: 960px;
  }

  a {
    color: #6d28d9;
  }
`;

interface StyledBannerProps {
  legacy?: boolean;
  future?: boolean;
}

const StyledMainPage = styled.div`
  --sidebar-width: 320px;

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
      background-color: var(--nav-header-bg);
      will-change: transform;
      transition: transform 0.2s;
      border-right: 1px solid var(--border-primary);

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

    @keyframes fadeHighlightShadow {
      0% {
        box-shadow: 0px 0px 10px 2px var(--colors-blue0);
      }
      100% {
        box-shadow: none;
      }
    }

    .highlight {
      animation: fadeHighlightShadow 5s forwards;
    }
  }
`;

const StyledBanner = styled.div<StyledBannerProps>`
  --banner-text-color: ${({legacy, future}) => (legacy ? '#000' : '#fff')};
  --banner-background-color: ${({legacy, future}) =>
    legacy ? 'var(--callout-tip)' : future ? '#812990' : 'var(--lg-primary)'};
  --banner-font-size: ${({legacy, future}) => (legacy ? '18px' : '1rem')};

  display: block;
  text-align: center;
  color: var(--banner-text-color);
  background: var(--banner-background-color);
  font-size: var(--banner-font-size);
  padding: 1em;
  text-decoration: none;
  font-weight: 500;

  a {
    color: var(--colors-blue0);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function scrollToElementAndExecute(element: HTMLElement, callback: () => void) {
  setTimeout(() => {
    scrollIntoView(element, {align: {top: 0.1}}, (type: string) => {
      callback();
    });
  });
}

/**
 * Finds the closest parent element containing the specific text and applies a temporary highlight style.
 * @param {string} searchText - The text to search for.
 * @returns {HTMLElement|null} The closest parent element or null if not found.
 */
function highlightElementByText(searchText: string, ownerElement: HTMLElement) {
  const escapedText = decodeURIComponent(searchText);

  if (!escapedText) {
    return;
  }

  const regex = new RegExp(escapedText, 'i');
  const walker = document.createTreeWalker(ownerElement, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      if (textCompare(node.parentElement?.textContent ?? '', escapedText)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });

  const textNode = walker.nextNode();
  if (textNode) {
    const {parentElement} = textNode;

    if (parentElement) {
      scrollToElementAndExecute(parentElement, () => {
        parentElement.classList.add('highlight');

        setTimeout(() => {
          parentElement.classList.remove('highlight');
        }, 5000);
      });

      return parentElement;
    }
  }

  return null;
}

function Banner() {
  const {version} = useConditioning();
  const {config} = useAppContext();
  const {PRODUCT, PRODUCT_APPLICATIONS, PRODUCT_LEGACY} = config;
  if (version.selectedVersion === '7') {
    return (
      <StyledBanner future>
        Cloud Functions support for Node.js 16 is undergoing end-of-life.&nbsp;
        <Link href="/guides/install_nodejs">View the end-of-life plan.</Link>
      </StyledBanner>
    );
  }
  if (!version.isLatest) {
    return (
      <StyledBanner legacy>
        {PRODUCT} {PRODUCT_APPLICATIONS} {version.selectedVersionText} and
        support for Node.js 16 are undergoing end-of-life (EOL). Read the&nbsp;
        <Link href="https://edg.io/blogs/layer0-end-of-life-announcement/">
          {PRODUCT_LEGACY} EOL announcement
        </Link>
        , the&nbsp;
        <Link href="/guides/install_nodejs">Node.js 16 EOL plan</Link>
        &nbsp; or browse&nbsp;
        <Link href="/">
          {PRODUCT} {PRODUCT_APPLICATIONS} {version.latestVersionText} docs
        </Link>
        .
      </StyledBanner>
    );
  }
  return (
    <StyledBanner>
      🎉 Introducing {PRODUCT} {PRODUCT_APPLICATIONS} v6 which supports Node.js
      v16.{' '}
      <Link href="/guides/reference/v6_migration">Learn how to upgrade.</Link>{' '}
      🎉
    </StyledBanner>
  );
}

export interface PageProps {
  showNav?: boolean;
  showBanner?: boolean;
  children: React.ReactNode;
}

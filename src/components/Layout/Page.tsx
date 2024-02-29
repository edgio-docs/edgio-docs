// @ts-ignore
import {default as JSURL} from 'jsurl';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import {useRouter} from 'next/router';
import * as React from 'react';
// @ts-ignore
import scrollIntoView from 'scroll-into-view';
import styled from 'styled-components';

import {PRODUCT} from '../../../constants';
import {PRODUCT_APPLICATIONS} from '../../../constants';

import Header from './Header/Header';
import SideNav from './Sidebar/Sidenav';
import {useIsMobile} from './useMediaQuery';

import useConditioning from 'utils/hooks/useConditioning';
import textCompare from 'utils/textCompare';

export function Page({children}: PageProps) {
  const isMobile = useIsMobile(850);
  const [showSidebar, setShowSidebar] = React.useState(isMobile);
  const router = useRouter();
  const showBanner = !isMobile || (isMobile && !showSidebar);
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
      {showBanner && <Banner />}
      <Header {...{showSidebar, setShowSidebar}} />
      <main className="docs-content">
        <div
          className="docs-side__nav custom-scrollbar"
          data-open={isMobile && showSidebar}>
          <SideNav />
        </div>
        <div className="docs-content__inner" ref={contentInnerRef}>
          {children}
        </div>
      </main>
    </StyledMainPage>
  );
}

interface StyledBannerProps {
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

  display: block;
  text-align: center;
  color: var(--banner-text-color);
  background: var(--banner-background-color);
  font-size: calc(1rem - 2px);
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
  if (version.selectedVersion === '7') {
    return (
      <StyledBanner future>
        Introducing {PRODUCT} {PRODUCT_APPLICATIONS}{' '}
        {version.selectedVersionText}.&nbsp;
        <Link href="/guides/v7/intro" passHref>
          <a>Find out what&apos;s new.</a>
        </Link>
      </StyledBanner>
    );
  }
  if (!version.isLatest) {
    return (
      <StyledBanner legacy>
        You are viewing docs for {PRODUCT} {PRODUCT_APPLICATIONS}{' '}
        {version.selectedVersionText} (deprecated). Read the &nbsp;
        <Link href="https://edg.io/blogs/layer0-end-of-life-announcement/">
          <a>
            end-of-life announcement
          </a>
        </Link>
        &nbsp; or browse &nbsp;
        <Link href="/" passHref>
          <a>
            {PRODUCT} {PRODUCT_APPLICATIONS}{' '}
            {version.latestVersionText} docs
          </a>
        </Link>
        .
      </StyledBanner>
    );
  }
  return (
    <StyledBanner>
      🎉 Introducing {PRODUCT} {PRODUCT_APPLICATIONS} v6 which supports Node.js
      v16.{' '}
      <Link href="/guides/reference/v6_migration" passHref>
        <a>Learn how to upgrade.</a>
      </Link>{' '}
      🎉
    </StyledBanner>
  );
}

export interface PageProps {
  children: React.ReactNode;
}

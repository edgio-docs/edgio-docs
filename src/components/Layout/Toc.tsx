import Link from 'next/link';
import {useRouter} from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import {useTocHighlight} from './useTocHighlight';

import useConditioning from 'utils/hooks/useConditioning';

const StyledToc = styled.div`
  padding: 0 20px;

  @media (max-width: 1200px) {
    display: none;
  }

  .docs-toc__nav {
    background-color: var(--bg-secondary);
    border-radius: 4px;
    position: sticky;
    overflow: auto;
    padding: calc(var(--header-height) / 2) 0 calc(var(--header-height) / 2)
      20px;
    --scrollbar-bg: #606060;
    max-height: calc(100vh - var(--header-height) - 16px);
    top: calc(var(--header-height) + 8px);
    margin-top: calc(var(--header-height) / 2);
  }

  .docs-toc__heading {
    margin-bottom: 16px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--toc-text-primary);
  }

  .docs-toc__listItems {
    padding: 0;
    list-style: none;

    a {
      color: var(--toc-text-link);
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
      line-height: 24px;
      padding: 4px 8px;
      display: block;

      :hover {
        color: var(--text-link);
      }
    }
  }

  .docs-toc__listItem {
    position: relative;
  }

  [data-selected='true'] {
    ::before {
      content: '';
      position: absolute;
      left: 0;
      height: calc(100% - 8px);
      top: 50%;
      transform: translateY(-50%) translateX(-20px);
      width: 3px;
      background: var(--colors-blue0);
    }

    > a {
      color: var(--colors-blue0);
      font-weight: 700;
    }
  }

  [data-depth='3'] {
    padding-left: 12px;
  }

  [data-depth='-1'] {
    display: none;
  }
`;

export function Toc({
  headings,
}: {
  headings: Array<{url: string; text: React.ReactNode; depth: number}>;
}) {
  const router = useRouter();
  const {asPath} = router;
  const {
    version: {toVersionedPath},
  } = useConditioning();
  const {currentIndex} = useTocHighlight();
  const selectedIndex = Math.min(currentIndex, headings.length - 1);

  return (
    <StyledToc className="docs-article__toc">
      {headings && headings.length > 0 && (
        <nav role="navigation" className="docs-toc__nav custom-scrollbar">
          <h2 className="docs-toc__heading">On this page</h2>
          <div className="toc">
            <ul className="docs-toc__listItems">
              {headings.map((h, i) => {
                // `h.url` is the anchor link for the heading
                // so we need to prepend the current path to it
                let path = h.url;
                if (path.length) {
                  path = asPath.split('#')[0] + path;
                }
                console.log('path', path);
                return (
                  <li
                    key={`heading-${h.url}-${i}`}
                    data-selected={i === selectedIndex}
                    data-depth={h.depth && h.depth < 4 ? h.depth : -1}
                    className="docs-toc__listItem">
                    <Link href={toVersionedPath(path)}>
                      <a>{h.text}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </StyledToc>
  );
}

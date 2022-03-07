import cx from 'classnames';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import {useTocHighlight} from './useTocHighlight';

const StyledToc = styled.div`
  @media (max-width: 850px) {
    display: none;
  }

  .docs-toc__nav {
    position: sticky;
    box-shadow: inset 1px 0px var(--hr-grey1);
    padding-left: 20px;
    top: calc(var(--header-height) + 8px);
    max-height: calc(100vh - var(--header-height));
    overflow: scroll;
    padding-top: calc(var(--header-height) / 2);
  }

  .docs-toc__heading {
    margin-bottom: 16px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--link-grey1);
  }

  .docs-toc__listItems {
    padding: 0;
    list-style: none;

    a {
      color: var(--link-grey1);
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
      line-height: 24px;
      padding: 4px 8px;
      display: block;

      :hover {
        color: var(--pink);
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
      background: var(--pink);
    }

    > a {
      color: var(--pink);
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
  const {currentIndex} = useTocHighlight();
  const selectedIndex = Math.min(currentIndex, headings.length - 1);

  return (
    <StyledToc className="docs-article__toc">
      <nav role="navigation" className="docs-toc__nav">
        <h2 className="docs-toc__heading">On this page</h2>
        <div className="toc">
          <ul className="docs-toc__listItems">
            {headings &&
              headings.length > 0 &&
              headings.map((h, i) => {
                return (
                  <li
                    key={`heading-${h.url}-${i}`}
                    data-selected={i === selectedIndex}
                    data-depth={h.depth && h.depth < 4 ? h.depth : -1}
                    className="docs-toc__listItem">
                    <Link href={h.url}>
                      <a>{h.text}</a>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>
    </StyledToc>
  );
}

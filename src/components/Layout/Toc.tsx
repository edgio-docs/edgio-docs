import cx from 'classnames';
import * as React from 'react';
import styled from 'styled-components';
import {useTocHighlight} from './useTocHighlight';

const StyledToc = styled.div`
  padding-top: 32px;
  padding-left: 0;

  .docs-toc__nav {
    position: sticky;
    box-shadow: inset 1px 0px #e3e8ee;
    padding-left: 20px;
    top: calc(64px + 32px);
  }

  .docs-toc__heading {
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    color: #606060;
  }

  .docs-toc__listItems {
    padding: 0;
    list-style: none;
    display: grid;
    row-gap: 6px;

    a {
      color: var(--black1);
      text-decoration: none;
      padding: 10px 0px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 20px;

      :hover {
        color: var(--pink);
      }
    }
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
        <div className="toc h-full overflow-y-auto pl-4">
          <ul className="docs-toc__listItems">
            {headings &&
              headings.length > 0 &&
              headings.map((h, i) => {
                if (h.url == null) {
                  // TODO: only log in DEV
                  console.error('Heading does not have URL');
                }
                return (
                  <li
                    key={`heading-${h.url}-${i}`}
                    className={cx(
                      'text-sm px-2 py-1 rounded-l-lg',
                      selectedIndex === i
                        ? 'bg-highlight dark:bg-highlight-dark'
                        : null,
                      {
                        'pl-4': h?.depth === 3,
                        hidden: h.depth && h.depth > 3,
                      }
                    )}>
                    <a
                      className={cx(
                        selectedIndex === i
                          ? 'text-link dark:text-link-dark font-bold'
                          : 'text-secondary dark:text-secondary-dark',
                        'block hover:text-link dark:hover:text-link-dark'
                      )}
                      href={h.url}>
                      {h.text}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>
    </StyledToc>
  );
}

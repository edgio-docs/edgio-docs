import {siteConfig} from 'siteConfig';
import styled from 'styled-components';
import {Toc} from '../Layout/Toc';

const StyledDocs = styled.div`
  max-width: var(--docs-area-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 75% 1fr;
  min-height: calc(100vh - 64px);
  color: var(--docs-color);

  .docs-article {
    padding: 0 20px 20px 20px;
  }

  .docs-article__header {
    padding-top: 32px;
    color: var(--docs-color);
  }

  .docs-article__body {
    display: grid;
    gap: 16px 0;

    .article-heading {
      color: var(--docs-color);
      display: flex;
      align-items: center;
      gap: 10px;
      scroll-margin-top: calc(var(--header-height) + 8px);
      padding-top: 16px;
      position: relative;

      .anchor {
        position: absolute;
        left: 0;
        transform: translateX(-1em);
        width: 18px;
        height: 18px;
        top: 50%;

        @media (max-width: 400px) {
          transform: translateX(-18px);
        }
      }

      .anchor svg {
        visibility: hidden;
      }

      &:hover svg {
        visibility: visible;
      }
    }

    .article-ul__list,
    .article-ol__list {
      padding-left: 35px;
      display: grid;
      row-gap: 8px;
      list-style: square;
    }

    .article-ol__list {
      list-style: decimal;
    }

    .text-code {
      padding: 0 4px;
      border-radius: 4px;
      background: var(--text-code-bg);
      border: 1px solid #d2d5d8;
      overflow-wrap: break-word;
      font-variant-ligatures: none;
      margin: 0;
      overflow-x: auto;
      text-align: left;
    }

    .text-link {
      color: #2993e0;
      text-decoration: none;
      position: relative;
      font-weight: 600;

      ::after {
        content: '';
        position: absolute;
        bottom: 0;
        height: 1px;
        left: 0;
        background: #2993e0;
        width: 0;
        transform: translateY(2px);
        transition: width 0.2s ease-in-out;
      }

      &:hover ::after {
        width: 100%;
      }
    }
  }

  .article-header {
    margin-bottom: 16px;
    margin-top: 0;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.663px;
    font-weight: bold;
  }

  h2.article-heading {
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
  }

  h3.article-heading {
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
  }

  h4.article-heading {
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
  }

  .article-text {
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    display: block;
    overflow-x: auto;

    thead th {
      font-weight: 600;
    }

    th,
    td {
      padding: 16px;
      border: 1px solid #e3e8ee;
      text-align: left;
      vertical-align: top;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const anchorClassName = siteConfig.headerIdConfig.className;

export default function Docs({
  title,
  children,
  tocHeadings,
}: {
  title: string;
  children: React.ReactNode;
  tocHeadings: {url: string; depth: number; text: string}[];
}) {
  return (
    <StyledDocs className="docs-body">
      <article className="docs-article">
        <header className="docs-article__header">
          <h1 className="article-header">
            {title}
            <a
              className={anchorClassName}
              href="#"
              style={{display: 'none'}}
              aria-hidden="true"></a>
          </h1>
        </header>
        <div className="docs-article__body">{children}</div>
      </article>
      <Toc headings={tocHeadings} />
    </StyledDocs>
  );
}

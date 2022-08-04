import styled from 'styled-components';

import {Toc} from '../Layout/Toc';

import DocsPagination from './DocsPagination';
import EditPage from './EditPage';

import {siteConfig} from 'siteConfig';

const StyledDocs = styled.div`
  max-width: var(--docs-area-width);
  margin: 0 auto 500px auto;
  display: grid;
  grid-template-columns: 75% 1fr;

  .docs-article__section {
    padding: 0 20px 20px 20px;
  }

  .docs-article {
    color: var(--docs-text-primary);
  }

  .docs-article__header {
    padding-top: 32px;
  }

  .docs-article__body {
    display: grid;
    gap: 16px 0;

    .article-heading {
      display: flex;
      align-items: center;
      gap: 10px;
      scroll-margin-top: calc(var(--header-height) + 8px);
      padding-top: 16px;
      position: relative;

      .anchor {
        color: var(--docs-text-primary);
        text-decoration: none;

        span {
          margin-left: 8px;
          visibility: hidden;
        }
      }

      &:hover .anchor span {
        visibility: visible;
      }
    }

    .article-ul__list,
    .article-ol__list {
      padding-left: 24px;
      list-style: square;
      margin-bottom: 0.8rem;
    }

    .article-ol__list {
      list-style: decimal;
    }

    .list-item {
      margin-bottom: 7px;

      > * {
        margin-bottom: inherit;
      }
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

      &:hover::after {
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
    overflow: auto;
  }

  .list-item .article-text,
  img {
    margin-bottom: 7px;
  }

  img {
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
    display: block;

    thead {
      /* box-shadow: rgb(71, 71, 71) 0px -2px inset; */
    }

    th,
    td {
      border: 1px solid var(--hr-secondary);
    }

    thead th {
      font-weight: 600;
      color: var(--docs-text-primary);
      font-size: 14px;
    }

    tr {
      th,
      td {
        padding: 16px;
        text-align: left;
        vertical-align: top;
      }
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 630px) {
    margin-bottom: 900px;
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
      <div className="docs-article__section">
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
        <EditPage />
        <DocsPagination />
      </div>
      <Toc headings={tocHeadings} />
    </StyledDocs>
  );
}

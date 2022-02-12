import {siteConfig} from 'siteConfig';
import styled from 'styled-components';
import {Toc} from '../Layout/Toc';

const StyledDocs = styled.div`
  max-width: 1228px;
  max-width: 1228px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 75% 1fr;
  min-height: calc(100vh - 64px);
  color: rgb(92, 95, 98);

  .docs-article {
    padding: 0 20px 20px 20px;
  }

  /* .docs-article { */
  /* box-shadow: inset 1px 0px #e3e8ee; */
  /* } */

  .docs-article__header {
    padding-top: 32px;
    color: rgb(32, 34, 35);
  }

  .docs-article__body {
    display: grid;
    gap: 16px 0;

    .article-heading {
      color: rgb(32, 34, 35);
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
      background: #f6f6f7;
      border: 1px solid #d2d5d8;
      overflow-wrap: break-word;
      font-variant-ligatures: none;
      margin: 0;
      overflow-x: auto;
      text-align: left;
    }

    .text-link {
      color: #d81b60;
      text-decoration: none;
      position: relative;
      font-weight: 600;

      ::after {
        content: '';
        position: absolute;
        bottom: 0;
        height: 1px;
        left: 0;
        background: #d81b60;
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
    line-height: 1.5;
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

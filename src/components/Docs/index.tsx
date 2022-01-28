import styled from 'styled-components';

const StyledDocs = styled.div`
  max-width: 1228px;
  max-width: 1228px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 75% 1fr;
  min-height: calc(100vh - 64px);

  .docs-article,
  .docs-article__toc {
    padding: 0 20px;
  }

  .docs-article {
    box-shadow: inset 1px 0px #e3e8ee;
  }

  .docs-article__toc {
    box-shadow: inset 1px 0px #e3e8ee;
  }

  .docs-article__header {
    padding-top: 32px;
  }

  .docs-article__body {
    display: grid;
    gap: 24px 0;

    .article-heading {
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 10px;

      .anchor svg {
        visibility: hidden;
      }

      &:hover svg {
        visibility: visible;
      }
    }

    .article-ul__list {
      padding-left: 35px;
      display: grid;
      row-gap: 8px;
    }

    .text-code {
      color: black;
      padding: 0 4px;
      border-radius: 4px;
      background: #f6f6f7;
      border: 1px solid #d2d5d8;
      overflow-wrap: break-word;
      font-variant-ligatures: none;
      white-space: pre-wrap;
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
  }

  .article-text {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    color: #353535;
  }
`;

export default function Docs({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <StyledDocs className="docs-body">
      <article className="docs-article">
        <header className="docs-article__header">
          <h1 className="article-header">{title}</h1>
        </header>
        <div className="docs-article__body">{children}</div>
      </article>
      <div className="docs-article__toc">.</div>
    </StyledDocs>
  );
}

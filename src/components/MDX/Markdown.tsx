import React from 'react';

import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import {MDXComponents} from 'components/MDX/MDXComponents';

interface MarkdownProps {
  source?: string;
  trim?: boolean;
}

const MarkdownWrapper = styled.div`
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
    padding-left: 27px;
    margin-bottom: 0.8rem;
    overflow: hidden;
  }

  .article-ul__list {
    list-style: disc;
  }

  .article-ul__list > li > .article-ul__list {
    list-style: square;
  }

  .article-ul__list > li > .article-ul__list > li > .article-ul__list {
    list-style: circle;
  }

  .article-ol__list {
    list-style: decimal;
  }

  .article-ol__list > li > .article-ol__list {
    list-style: lower-roman;
  }

  .article-ol__list > li > .article-ol__list > li > .article-ol__list {
    list-style: lower-alpha;
  }

  .list-item {
    margin-bottom: 7px;

    > *:not(.inline-icon) {
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

  .article-header {
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
    box-shadow: rgba(0, 0, 0, 0.1) 1px 3px 7px 2px,
      rgba(0, 0, 0, 0.06) 1px 3px 1px 0px;
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
      background-color: var(--table-header-bg);
    }

    tr {
      th,
      td {
        padding: 12px;
        text-align: left;
        vertical-align: top;
      }
    }
  }
`;

const Markdown: React.FC<MarkdownProps> = ({source, trim = true, ...props}) => {
  source = trim ? source?.trim() : source;
  return (
    <MarkdownWrapper>
      {/* @ts-ignore */}
      <ReactMarkdown components={MDXComponents} {...props}>
        {source}
      </ReactMarkdown>
    </MarkdownWrapper>
  );
};

export default Markdown;

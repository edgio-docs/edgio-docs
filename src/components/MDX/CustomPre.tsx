import CodeLanguage from 'components/getLanguage';
import React from 'react';
import styled from 'styled-components';
import CodeBlock from './CodeBlock';
import getLanguage from '../getLanguage';

const StyledCustomPre = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  border: 2px solid #363636;
  border-radius: 8px;
  overflow: hidden;

  .code-wrap {
    border: 2px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  pre {
    margin: 0;
  }

  code[class*='language-'],
  pre[class*='language-'],
  pre code {
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-break: break-all;
    hyphens: none;
    color: #ffffff;
    line-height: 1.9;
    tab-size: 4;
    font-size: 14px;
    font-weight: 600;
    font-family: 'IBM Plex Mono';
  }

  .hljs-comment,
  .hljs-quote {
    color: #7e7887;
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-regexp,
  .hljs-link,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #be4678;
  }

  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #aa573c;
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #2a9292;
  }

  .hljs-title,
  .hljs-section {
    color: var(--pink);
  }

  .hljs-keyword,
  .hljs-selector-tag {
    color: var(--yellow);
  }

  .hljs-deletion,
  .hljs-addition {
    color: #19171c;
    display: inline-block;
    width: 100%;
  }

  .hljs-deletion {
    background-color: #be4678;
  }

  .hljs-addition {
    background-color: #2a9292;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    color: white;
    padding: 0.5em;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .code-language {
    padding: 0 0.5em;
    display: flex;
    justify-content: flex-end;
    font-weight: var(--fw700);
  }

  .code-block__inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-color: #356369;
    background: #242424;
  }

  .code-block__header {
    height: 32px;
    border-bottom: 2px solid #363636;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    padding: 6px 6px 6px 8px;
    font-size: 14px;
    color: white;
    display: flex;
    justify-content: space-between;
  }

  .code-block__pre {
    text-align: left;
    margin: 0;
    padding: 10px;
    width: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  /* reset */
  pre,
  code,
  kbd {
    white-space: pre-wrap;
    margin: 0;
    overflow-x: auto;
    text-align: left;
  }

  .code-block__header-text {
    font-weight: 700;
  }
`;

export default function CustomPre({children}: {children: React.ReactNode}) {
  let message: string | undefined;
  let language: string | undefined;
  let filename: string | undefined;

  if (typeof children === 'string') {
    message = children;
  } else if (
    React.isValidElement(children) &&
    typeof children.props.children === 'string'
  ) {
    message = children.props.children;
    language = children.props.className;
    filename = children.props.filename;
  }

  console.log(filename);

  return (
    <StyledCustomPre>
      <div className="code-block">
        <div className="code-block__inner">
          <header className="code-block__header">
            <span className="code-block__header-text">
              {language && getLanguage(language)}
            </span>
            {filename && (
              <span className="code-block__filename">
                {filename.replaceAll('"', '')}
              </span>
            )}
          </header>
          <main className="code-block__content">
            <CodeBlock language={language || 'js'}>{message}</CodeBlock>
          </main>
        </div>
      </div>
    </StyledCustomPre>
  );
}

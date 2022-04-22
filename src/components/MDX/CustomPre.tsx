import React, {useEffect, useState} from 'react';
import styled, {StyledComponent} from 'styled-components';

import getDescriptiveLanguage from '../getLanguage';

import CodeBlock from './CodeBlock';

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
    hyphens: none;
    tab-size: 4;
    font-size: 14px;
    font-family: 'IBM Plex Mono';
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
    /* background: rgb(30, 29, 30) none repeat scroll 0% 0%; */
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
    margin: 0;
    overflow-x: auto;
    text-align: left;
  }

  .code-block__header-text {
    font-weight: 700;
  }

  code {
    --scrollbar-bg: #777;
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

  return (
    <StyledCustomPre>
      <div className="code-block">
        <div className="code-block__inner">
          {language && (
            <header className="code-block__header">
              <span className="code-block__header-text">
                {language && getDescriptiveLanguage(language)}
              </span>
              {filename && (
                <span className="code-block__filename">{filename}</span>
              )}
            </header>
          )}
          <main className="code-block__content">
            <CodeBlock language={language || 'js'}>{message}</CodeBlock>
          </main>
        </div>
      </div>
    </StyledCustomPre>
  );
}

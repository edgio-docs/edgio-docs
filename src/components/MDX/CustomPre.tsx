import cn from 'classnames';
import React, {useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import styled from 'styled-components';

import getDescriptiveLanguage from '../getLanguage';

export const StyledCustomPre = styled.div`
  border: 2px solid #363636;
  border-radius: 8px;
  overflow: hidden;

  .code-block__inner {
    display: flex;
    flex-direction: column;
    background: #242424;
  }

  .code-block__header {
    border-bottom: 2px solid #363636;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    padding: 6px 6px 6px 8px;
    font-size: 14px;
    color: var(--colors-white0);
    display: flex;
    justify-content: space-between;

    [class*='header-'] {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .code-block__filename {
      background-color: #363636;
      border-radius: 4px;
      border: 1px solid #1a1a1a;
    }
  }

  .code-block__header-text {
    font-weight: 700;
  }

  code {
    --scrollbar-bg: #777;
  }
`;

export default function CustomPre({className, ...props}: {className: string}) {
  const languageString = className;

  return (
    <StyledCustomPre>
      <div className="code-block">
        <div className="code-block__inner">
          {languageString !== 'language-unknown' ? (
            <header className="code-block__header">
              <div className="header-start">
                <span className="code-block__header-text">
                  {getDescriptiveLanguage(languageString)}
                </span>
                {/* {replacedFilename && (
                  <span className="code-block__filename">
                    {replacedFilename}
                  </span>
                )} */}
              </div>
              {/* <div className="header-end">
                <CopyCode {...{ message  }} />
              </div> */}
            </header>
          ) : null}

          <main className="code-block__content">
            <pre
              {...{
                className: cn('custom-scrollbar', languageString),
                ...props,
              }}></pre>
          </main>
        </div>
      </div>
    </StyledCustomPre>
  );
}

const StyledCopyCodeButton = styled.button`
  color: var(--copy-code-primary);
  background-color: #363636;
  font-weight: 600;
  border-radius: 4px;
  font-size: 14px;
  line-height: 19px;
  border: 1px solid var(--colors-black4);
  cursor: pointer;
  padding: 4px 8px;
  transition: scale 0.2s ease-in-out;

  :hover {
    transform: scale(1.05);
  }
`;

function CopyCode({message}: {message: string}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  });

  return (
    <CopyToClipboard text={message.trim()} onCopy={() => setCopied(true)}>
      <StyledCopyCodeButton className="code-block__copy">
        {copied ? 'Copied' : 'Copy'}
      </StyledCopyCodeButton>
    </CopyToClipboard>
  );
}

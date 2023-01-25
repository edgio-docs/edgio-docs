import {Tab} from '@headlessui/react';
import cn from 'classnames';
import Highlight, {defaultProps} from 'prism-react-renderer';
import React, {useState} from 'react';
import styled from 'styled-components';

import {
  clsByOperator,
  getLinesToHighlight,
  Line,
  LineContent,
  LineNo,
} from './CodeBlock';
import {CopyCode, StyledCustomPre} from './CustomPre';

import getDescriptiveLanguage from 'components/getLanguage';
import {StringMap} from 'utils/Types';

interface TabItemProps {
  children: string;
  selectedIndex: number;
  myIndex: number;
}
function TabItem({children, selectedIndex, myIndex}: TabItemProps) {
  const isSelected = selectedIndex === myIndex;

  return (
    <Tab aria-selected={isSelected ? 'selected' : ''}>
      <span>{children}</span>
    </Tab>
  );
}

const StyledCodeTabs = styled(StyledCustomPre)`
  .tab-list {
    list-style: none;
    padding: 0 8px;
    display: flex;
    border-bottom: 2px solid #2a2b2c;

    @supports (gap: 10px) {
      gap: 10px;
    }

    button {
      --border-color: transparent;
      color: white;
      padding: 6px 4px;
      font-size: 14px;
      font-family: 'IBM Plex Mono', monospace;
      font-weight: 500;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;

      :hover,
      &[aria-selected='true'] {
        --border-color: #f08d49;
      }
    }
  }
`;

interface SnippetGroupProps {
  children: Array<React.ReactNode>;
}
export function SnippetGroup({children}: SnippetGroupProps) {
  let [selectedIndex, setSelectedIndex] = useState(0);

  const activeChildren = children[selectedIndex];

  let filename: string | undefined;
  let message: string = '';
  const unknownLanguageString = 'language-unknown';
  let language: string = unknownLanguageString;

  if (React.isValidElement(activeChildren)) {
    const lastProps = activeChildren.props.children.props;
    filename = lastProps.filename;
    message = lastProps.children;
    language = lastProps.className || unknownLanguageString;
  }

  return (
    <StyledCodeTabs>
      <div className="code-block">
        <div className="code-block__inner">
          <header className="code-block__header">
            <div className="header-start">
              <span className="code-block__header-text">
                {getDescriptiveLanguage(language)}
              </span>
              {filename && (
                <span className="code-block__filename">🗄️ {filename}</span>
              )}
            </div>
            <div className="header-end">
              <CopyCode {...{message}} />
            </div>
          </header>
          <Tab.Group
            as="div"
            // @ts-ignore
            onChange={setSelectedIndex}
            className="tab-group">
            <Tab.List className="tab-list">
              {children.map((child, tabIndex) => {
                return (
                  <TabItem
                    key={tabIndex}
                    myIndex={tabIndex}
                    selectedIndex={selectedIndex}>
                    {
                      // @ts-ignore
                      child.props.children.props.tabLabel
                    }
                  </TabItem>
                );
              })}
            </Tab.List>

            <Tab.Panels className="tab-panels">
              {children.map((child, index) => {
                const {
                  highlight: highlightLines,
                  del: highlightDeletions,
                  ins: highlightInsertions,
                  diff: highlightAsDiff,
                  children,
                  // @ts-ignore
                } = child.props.children.props;

                return (
                  <Tab.Panel key={index} className="tab-panel">
                    <CPre
                      {...{
                        highlightLines,
                        highlightDeletions,
                        highlightInsertions,
                        highlightAsDiff,
                      }}>
                      {children.trim()}
                    </CPre>
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </StyledCodeTabs>
  );
}

function CPre({
  children,
  highlightAsDiff,
  highlightLines,
  highlightDeletions,
  highlightInsertions,
}: {
  children: string;
  highlightAsDiff?: boolean;
  highlightLines?: any;
  highlightDeletions?: any;
  highlightInsertions?: any;
}) {
  const linesToHighlight: StringMap = getLinesToHighlight({
    'line-highlight': highlightLines,
    [clsByOperator['+']]: highlightInsertions,
    [clsByOperator['-']]: highlightDeletions,
  });

  // if diff attribute is provided, extract the lines to highlight automatically based on +/-
  if (highlightAsDiff) {
    const re = /(^\s*(\+|\-))/;
    const lines = children.split(/\r?\n/);

    lines.forEach((line, idx) => {
      const match = re.exec(line);
      if (match) {
        lines[idx] = line.substring(match.index + match[1].length);
        linesToHighlight[idx + 1] = clsByOperator[match[2]];
      }
    });

    children = lines.join('\n');
  }

  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={children}
      language="javascript">
      {({className, style, tokens, getLineProps, getTokenProps}) => {
        return (
          <pre
            className={cn('code-block', 'custom-scrollbar', className)}
            style={style}>
            {tokens.map((line, i) => {
              const lineNum = i + 1;
              return (
                <Line key={i} {...getLineProps({line, key: i})}>
                  <LineNo className="line-num">{lineNum}</LineNo>
                  <LineContent className={cn(linesToHighlight[lineNum])}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({token, key})} />
                    ))}
                  </LineContent>
                </Line>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
}

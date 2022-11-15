import cn from 'classnames';
import _flattenDeep from 'lodash/flattenDeep';
import _range from 'lodash/range';
import Highlight, {defaultProps, Language} from 'prism-react-renderer';
import {useState} from 'react';
import styled from 'styled-components';

export default function CodeBlock({
  language,
  children,
  highlightLines,
  highlightDeletions,
  highlightInsertions,
}: {
  language: Language;
  children: string;
  highlightLines?: any;
  highlightDeletions?: any;
  highlightInsertions?: any;
}) {
  const getLinesToHighlight = (lines: string) => {
    const result = {};
    try {
      if (!lines || !lines.length) {
        return result;
      }

      const values = lines
        .replace(/[\{\}]/g, '')
        .split(',')

        .map((i: string) => {
          const [start, end] = i.split('-').map((n) => parseInt(n.trim()));
          return _range(start, (end || start) + 1);
        });

      return _flattenDeep(values).reduce((result: any, value: any) => {
        result[value] = true;
        return result;
      }, result);
    } catch (e) {
      return result;
    }
  };

  const [linesToHighlight] = useState(getLinesToHighlight(highlightLines));

  const [insertionsToHighlight] = useState(
    getLinesToHighlight(highlightInsertions)
  );

  const [deletionsToHighlight] = useState(
    getLinesToHighlight(highlightDeletions)
  );

  const getBackgroundColor = (i: any) => {
    try {
      if (insertionsToHighlight[i + 1]) {
        return '#00ffcb33';
      }
      if (deletionsToHighlight[i + 1]) {
        return '#650000';
      }
      if (linesToHighlight[i + 1]) {
        return '#393939';
      }
      return 'transparent';
    } catch (e) {
      return 'transparent';
    }
  };

  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={children}
      language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={cn('custom-scrollbar', className)} style={style}>
          {tokens.map((line, i) => {
            return (
              <Line
                key={i}
                {...getLineProps({line, key: i})}
                style={{
                  background: getBackgroundColor(i),
                }}>
                <LineNo>{i + 1}</LineNo>
                <LineContent
                  className={cn({
                    'line-highlight': linesToHighlight?.[i + 1],
                    'deletion-highlight': deletionsToHighlight?.[i + 1],
                    'insertion-highlight': insertionsToHighlight?.[i + 1],
                  })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({token, key})} />
                  ))}
                </LineContent>
              </Line>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}

export const Line = styled.div``;

export const LineContent = styled.span`
  width: 100%;
  position: relative;
  display: table-cell;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.2em;
`;

export const LineNo = styled.span`
  left: 0;
  position: sticky;
  user-select: none;
  text-align: right;
  padding-left: 15px;
  display: table-cell;
  background: #1a1a1a;
  letter-spacing: -1px;
  padding-right: 0.5em;
  border-right: 1px solid #363636;
`;

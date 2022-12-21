import cn from 'classnames';
import _flattenDeep from 'lodash/flattenDeep';
import _range from 'lodash/range';
import Highlight, {defaultProps, Language} from 'prism-react-renderer';
import styled from 'styled-components';

import {StringMap} from 'utils/Types';

export const Line = styled.div``;

export const LineContent = styled.span`
  width: 100%;
  position: relative;
  display: table-cell;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.2em;
`;

export default function CodeBlock({
  language,
  children,
  highlightAsDiff,
  highlightLines,
  highlightDeletions,
  highlightInsertions,
}: {
  language: Language;
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
      language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
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
      )}
    </Highlight>
  );
}

export const LineNo = styled.span`
  left: 0;
  min-width: 35px;
  position: sticky;
  user-select: none;
  text-align: right;
  display: table-cell;
  background: #1a1a1a;
  letter-spacing: -1px;
  padding-right: 0.5em;
  border-right: 1px solid #363636;
`;

export const clsByOperator: StringMap = {
  '+': 'insertion-highlight',
  '-': 'deletion-highlight',
};

export const getLinesToHighlight = (linesByClass: StringMap) => {
  const result = {};

  for (const cls in linesByClass) {
    const lines = linesByClass[cls];

    if (!lines || !lines.length) {
      continue;
    }
    try {
      const values = lines
        .replace(/[\{\}]/g, '')
        .split(',')

        .map((i: string) => {
          const [start, end] = i.split('-').map((n) => parseInt(n.trim()));
          return _range(start, (end || start) + 1);
        });

      _flattenDeep(values).reduce((result: any, value: any) => {
        result[value] = cls;
        return result;
      }, result);
    } catch (e) {}
  }

  return result;
};

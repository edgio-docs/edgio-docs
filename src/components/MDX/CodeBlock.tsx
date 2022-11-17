import cn from 'classnames';
import Highlight, {defaultProps, Language} from 'prism-react-renderer';
import styled from 'styled-components';

export default function CodeBlock({
  language,
  children,
}: {
  language: Language;
  children: string;
}) {
  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={children}
      language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={cn('custom-scrollbar', className)} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({line, key: i})}>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </LineContent>
            </Line>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export const Line = styled.div`
  display: table-row;
`;

export const LineContent = styled.span`
  display: table-cell;
  padding-left: 0.5em;
`;

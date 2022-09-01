import styled, {css} from 'styled-components';

import {StyledCodeWrap} from './InlineCode';

interface IStyledCallout {
  type: 'info' | 'warning' | 'danger';
}

const StyledCallout = styled.div.attrs<IStyledCallout>((props) => ({
  type: props.type || 'info',
}))<IStyledCallout>`
  padding: 15px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 15px;
  align-items: flex-start;

  /* type=info */
  ${(props) =>
    props.type === 'info' &&
    css`
      background: rgb(239, 245, 242) none repeat scroll 0% 0%;
      color: rgb(39, 83, 69);
      border-color: rgb(181, 216, 195);
    `}

  /* type=warning */
	${(props) =>
    props.type === 'warning' &&
    css`
      background: #fff1bf none repeat scroll 0% 0%;
      color: #000000;
      border-color: #f8de82;
    `}

	/* type=danger */
	${(props) =>
    props.type === 'danger' &&
    css`
      background: rgb(245, 239, 239) none repeat scroll 0% 0%;
      color: rgb(83, 39, 41);
      border-color: rgb(216, 181, 181);
    `}

  ${StyledCodeWrap} {
    color: var(--text-primary);
  }
`;

export default function Callout({
  type,
  children,
}: {
  type: 'info' | 'warning' | 'danger';
  children: React.ReactNode;
}) {
  return (
    <StyledCallout className="callout" type={type}>
      <div className="callout-image__wrap">
        {type === 'info' ? 'ℹ️' : type === 'warning' ? '⚠️' : '⛔️'}
      </div>
      <div className="callout-body">{children}</div>
    </StyledCallout>
  );
}

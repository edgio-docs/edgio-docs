import styled, {css} from 'styled-components';

interface IStyledCallout {
  type: 'info' | 'tip' | 'important' | 'warning' | 'danger';
}

const StyledCallout = styled.div.attrs<IStyledCallout>((props) => ({
  type: props.type || 'info',
}))<IStyledCallout>`
  padding: 14px 20px 20px 60px;
  border: 1px solid #dedede;
  border-radius: 3px;
  margin: 0 0 7px 0;
  background-color: var(--callout-bg);
  background-repeat: no-repeat;
  background-position: 15px 15px;
  min-height: 30px;
  color: var(--text-primary);
  border-left-width: 5px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 15px;
  align-items: flex-start;

  /* type=info */
  ${(props) =>
    props.type === 'info' &&
    css`
      background-image: url('/images/callouts/note.png');
      border-left-color: #1c8ec2;
    `}

  /* type=tip */
  ${(props) =>
    props.type === 'tip' &&
    css`
      background-image: url('/images/callouts/tip.png');
      border-left-color: #fee8a6;
    `}

  /* type=important */
  ${(props) =>
    props.type === 'important' &&
    css`
      background-image: url('/images/callouts/important.png');
      border-left-color: #a2238d;
    `}

  /* type=warning */
	${(props) =>
    props.type === 'warning' &&
    css`
      background-image: url('/images/callouts/warning.png');
      border-left-color: #ec1c24;
    `}

	/* type=danger */
	${(props) =>
    props.type === 'danger' &&
    css`
      background-image: url('/images/callouts/danger.png');
      border-left-color: #a2238d;
    `}

	.callout-image__wrap {
    --size: 60px;
    /* width: var(--size);
		height: var(--size); */
    /* background-color: black; */
  }
`;

export default function Callout({
  type,
  children,
}: {
  type: 'info' | 'tip' | 'important' | 'warning' | 'danger';
  children: React.ReactNode;
}) {
  return (
    <StyledCallout className="callout" type={type}>
      <div className="callout-image__wrap"></div>
      <div className="callout-body">{children}</div>
    </StyledCallout>
  );
}

import {
  FaInfoCircle,
  FaLightbulb,
  FaExclamationTriangle,
  FaMinusCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import styled, {css} from 'styled-components';

import {StyledCodeWrap} from './InlineCode';

interface IStyledCallout {
  type: 'info' | 'warning' | 'danger';
}
const types = {
  info: {
    icon: FaInfoCircle,
  },
  tip: {
    icon: FaLightbulb,
  },
  important: {
    icon: FaExclamationCircle,
  },
  warning: {
    icon: FaExclamationTriangle,
  },
  danger: {
    icon: FaMinusCircle,
  },
};

const StyledCallout = styled.div.attrs<IStyledCallout>((props) => ({
  type: props.type || 'info',
}))<IStyledCallout>`
  padding: 14px 20px 20px 14px;
  border: 1px solid #dedede;
  border-radius: 3px;
  margin: 0 0 7px 0;
  background-color: var(--callout-bg);
  min-height: 30px;
  color: var(--text-primary);
  border-left-width: 5px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 15px;
  align-items: flex-start;

  /* defaults for all types */
  .icon {
    font-size: 32px;
    & path {
      stroke: var(--callout-stroke);
      stroke-width: var(--callout-stroke-width);
    }
  }

  /* type-specific */
  ${(props) => css`
    border-left-color: var(--callout-${props.type});
    .icon {
      color: var(--callout-${props.type});
    }
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
  const Icon = types[type].icon;

  return (
    <StyledCallout className="callout" type={type}>
      <div className="callout-image__wrap icon">{<Icon />}</div>
      <div className="callout-body">{children}</div>
    </StyledCallout>
  );
}

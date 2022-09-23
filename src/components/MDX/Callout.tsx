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

const colorize = (color: string) => css`
  border-left-color: ${color};

  .icon {
    color: ${color};
  }
`;
const types = {
  info: {
    icon: FaInfoCircle,
    style: colorize('#1c8ec2'),
  },
  tip: {
    icon: FaLightbulb,
    style: colorize('#fee8a6'),
  },
  important: {
    icon: FaExclamationCircle,
    style: colorize('#0df89d'),
  },
  warning: {
    icon: FaExclamationTriangle,
    style: colorize('#ffc800'),
  },
  danger: {
    icon: FaMinusCircle,
    style: colorize('#f45263'),
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
  }

  /* type-specific */
  ${(props) => types[props.type].style}

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

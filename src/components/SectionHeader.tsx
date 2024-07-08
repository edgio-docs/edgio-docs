import {IconType} from 'react-icons';
import styled from 'styled-components';

import useThemedImageIcon from 'components/Layout/useThemedImageIcon';

function IconBox({
  Icon,
}: {
  Icon:
    | React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>
    | IconType
    | (() => JSX.Element);
}) {
  return (
    <div className="section-icon__box">
      <div className="icon-box">
        <Icon />
      </div>
    </div>
  );
}

function SectionHeaderTitle({title}: {title: string}) {
  return <h2 className="section-header__title">{title}</h2>;
}

function SectionHeaderSubtitle({subtitle}: {subtitle: string}) {
  return <p className="section-header__subtitle">{subtitle}</p>;
}

const StyledSectionheader = styled.header`
  display: flex;
  align-items: flex-start;
  column-gap: 18px;

  .section-icon__box {
    .icon-box {
      --size: 32px;
      width: var(--size);
      height: var(--size);
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
    }
  }

  .section-header__content {
    display: grid;
    row-gap: 6px;
    max-width: initial;

    /*@media (max-width: 1086px) {
      max-width: initial;
    }*/
  }

  .section-header__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: var(--title-primary);
  }

  .section-header__subtitle {
    font-size: 14px;
    line-height: 28px;
    color: var(--subtitle-primary);
  }
`;

interface ISectionHeaderProps {
  Icon?:
    | React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>
    | IconType
    | string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  Icon,
  title,
  subtitle,
}: ISectionHeaderProps) {
  let IconCmp = null;

  if (typeof Icon === 'string') {
    IconCmp = () => useThemedImageIcon(Icon, {width: 18, height: 18}, false);
  } else if (Icon) {
    IconCmp = Icon;
  }

  return (
    <StyledSectionheader>
      {IconCmp && <IconBox Icon={IconCmp} />}
      <div className="section-header__content">
        <SectionHeaderTitle {...{title}} />
        {subtitle && <SectionHeaderSubtitle {...{subtitle}} />}
      </div>
    </StyledSectionheader>
  );
}

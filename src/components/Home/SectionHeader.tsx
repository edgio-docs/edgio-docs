import styled from 'styled-components';

function IconBox({
  Icon,
}: {
  Icon: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>;
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
  column-gap: 19px;

  .section-icon__box {
    .icon-box {
      --size: 32px;
      width: var(--size);
      height: var(--size);
      position: relative;
      background-color: var(--homepage-section-header-bgColor);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
    }
  }

  .section-header__content {
    display: grid;
    row-gap: 6px;
    max-width: 42%;

    @media (max-width: 1086px) {
      max-width: initial;
    }
  }

  .section-header__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    color: var(--homepage-section-title-color);
  }

  .section-header__subtitle {
    font-size: 20px;
    line-height: 28px;
    color: var(--homepage-section-subtitle-color);
  }
`;

interface ISectionHeaderProps {
  Icon?: React.NamedExoticComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  Icon,
  title,
  subtitle,
}: ISectionHeaderProps) {
  return (
    <StyledSectionheader>
      {Icon && <IconBox {...{Icon}} />}
      <div className="section-header__content">
        <SectionHeaderTitle {...{title}} />
        {subtitle && <SectionHeaderSubtitle {...{subtitle}} />}
      </div>
    </StyledSectionheader>
  );
}

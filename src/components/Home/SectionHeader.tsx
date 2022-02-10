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
  font-family: 'Inter';

  display: flex;
  align-items: flex-start;
  column-gap: 19px;

  .section-icon__box {
    .icon-box {
      --size: 32px;
      width: var(--size);
      height: var(--size);
      position: relative;
    }
  }

  .section-header__content {
    display: grid;
    row-gap: 6px;
    max-width: 42%;
  }

  .section-header__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
  }

  .section-header__subtitle {
    font-size: 20px;
    line-height: 28px;
    color: #707070;
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

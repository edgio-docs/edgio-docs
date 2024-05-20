import {NamedExoticComponent} from 'react';

import cn from 'classnames';
import styled from 'styled-components';

import Link from 'components/MDX/Link';
import {mobileMinWidth} from 'styles';
import {HomepageSectionGroup} from 'utils/Types';

const columnCount = 3;

const SectionContainer = styled.div`
  width: 100%;
  padding: 40px;
  background: var(--home-card-bg);
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--border-primary);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  a {
    color: var(--text-primary);
    text-decoration: none;

    &:hover {
      color: var(--colors-blue0);
    }
  }

  @media (max-width: ${mobileMinWidth}) {
    padding: 10px;
  }
`;

const SectionHeader = styled.div`
  width: 100%
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleIcon = styled.div`
  width: 36.57px;
  height: 36.57px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleIconInner = styled.div``;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.div`
  font-size: 14px;
  line-height: 18px;
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ItemsGrid = styled.div<{columns: number}>`
  display: grid;
  grid-gap: 6px;
  width: 100%;
  box-sizing: border-box;

  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // 2 columns for medium screens
  }

  @media (max-width: ${mobileMinWidth}) {
    grid-template-columns: repeat(1, 1fr); // 1 column for small screens
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemDot = styled.div`
  min-width: 8px;
  width: 8px;
  min-height: 8px;
  height: 8px;
  background: var(--theme-primary);
  border-radius: 1px;
`;

const ItemText = styled.div`
  font-size: 16px;
  white-space: nowrap;
`;

const ViewMoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 500;
`;

const ViewMoreText = styled(ItemText)``;

const ViewMoreIcon = styled.div`
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type SectionBoxProps = HomepageSectionGroup & {
  className?: string;
  icon?: NamedExoticComponent<JSX.IntrinsicElements['svg']>;
};

const SectionBox = ({
  heading,
  subheading,
  className,
  icon,
  href,
  sections,
}: SectionBoxProps) => {
  const Icon = icon;

  return (
    <SectionContainer className={cn(className)}>
      <SectionHeader>
        <TitleContainer>
          <TitleIcon>
            <TitleIconInner>{Icon && <Icon />}</TitleIconInner>
          </TitleIcon>
          {href ? (
            <Link href={href}>
              <Title>{heading}</Title>
            </Link>
          ) : (
            <Title>{heading}</Title>
          )}
        </TitleContainer>
        <Subtitle>{subheading}</Subtitle>
      </SectionHeader>
      <ItemsContainer>
        {sections.map((section, i) => (
          <Section key={i}>
            {section.title &&
              (section.href ? (
                <Link href={section.href}>
                  <SectionTitle>{section.title}</SectionTitle>
                </Link>
              ) : (
                <SectionTitle>{section.title}</SectionTitle>
              ))}
            <ItemsGrid columns={columnCount}>
              {section.items.map((item) => (
                <Item key={item.title}>
                  <ItemDot />
                  <ItemText>
                    <Link href={item.href}>{item.title}</Link>
                  </ItemText>
                </Item>
              ))}
            </ItemsGrid>
          </Section>
        ))}
      </ItemsContainer>
      {/* {href && (
        <ViewMoreContainer>
          <ViewMoreText>
            <Link href={href}>View {heading} Documentation</Link>{' '}
          </ViewMoreText>
          <ViewMoreIcon>--&gt;</ViewMoreIcon>
        </ViewMoreContainer>
      )} */}
    </SectionContainer>
  );
};

export default SectionBox;

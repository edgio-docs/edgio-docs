import cn from 'classnames';
import {NamedExoticComponent} from 'react';
import styled from 'styled-components';

const columnCount = 3;

const SectionContainer = styled.div`
  width: 100%;
  padding: 40px;
  background: var(--bg-primary);
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
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
  color: var(--text-primary);
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.div`
  color: var(--text-primary);
  font-size: 14px;
  line-height: 18px;
`;

const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
`;

const SectionTitle = styled.div`
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
`;

const ItemsGrid = styled.div<{columns: number}>`
  display: grid;
  grid-template-columns: repeat(${({columns}) => columns}, 1fr);
  gap: 16px;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ItemDot = styled.div`
  width: 8px;
  height: 8px;
  background: var(--theme-primary);
  border-radius: 1px;
`;

const ItemText = styled.div`
  color: var(--text-primary);
  font-size: 14px;
`;

const ViewMoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
`;

const ViewMoreText = styled.div``;

const ViewMoreIcon = styled.div`
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface SectionBoxProps {
  title: string;
  subtitle: string;
  className?: string;
  icon?: NamedExoticComponent<JSX.IntrinsicElements['svg']>;
  sections: {
    title: string;
    items: any[];
  }[];
  viewMoreText: string;
}

const SectionBox = ({
  title,
  subtitle,
  className,
  icon,
  sections,
  viewMoreText,
}: SectionBoxProps) => {
  const Icon = icon;

  return (
    <SectionContainer className={cn('theme', className)}>
      <SectionHeader>
        <TitleContainer>
          <TitleIcon>
            <TitleIconInner>{Icon && <Icon />}</TitleIconInner>
          </TitleIcon>
          <Title>{title}</Title>
        </TitleContainer>
        <Subtitle>{subtitle}</Subtitle>
      </SectionHeader>
      <ItemsContainer>
        {sections.map((section) => (
          <Section key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <ItemsGrid columns={columnCount}>
              {section.items.map((item) => (
                <Item key={item.title}>
                  <ItemDot />
                  <ItemText>{item.title}</ItemText>
                </Item>
              ))}
            </ItemsGrid>
          </Section>
        ))}
      </ItemsContainer>
      <ViewMoreContainer>
        <ViewMoreText>View {title} Documentation</ViewMoreText>
        <ViewMoreIcon>--&gt;</ViewMoreIcon>
      </ViewMoreContainer>
    </SectionContainer>
  );
};

export default SectionBox;

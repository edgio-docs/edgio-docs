import styled from 'styled-components';

export const StyledFeatureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;

  .route-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    width: 100%;
    margin-left: 50px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }

  .route-list__items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    list-style: none;
    padding: 0;
  }

  .route-list__item {
    display: flex;
    align-items: center;
    gap: 6px;

    .dot {
      --size: 8px;
      width: var(--size);
      height: var(--size);
      background-color: var(--text-link);
      border-radius: 1px;
    }

    a {
      font-size: 16px;
      line-height: 24px;
      color: var(--text-link-primary);
      position: relative;
      text-decoration: none;
      border-bottom: 1px solid transparent;

      :hover {
        border-bottom-color: var(--colors-blue0);
      }
    }
  }
`;

interface IFeatureSectionProps {
  children: React.ReactNode;
}

export default function FeatureSection({children}: IFeatureSectionProps) {
  return <StyledFeatureSection>{children}</StyledFeatureSection>;
}

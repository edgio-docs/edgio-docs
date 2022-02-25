import styled from 'styled-components';

export const StyledFeatureSection = styled.div`
  display: grid;
  row-gap: 28px;

  .route-items {
    display: flex;
    justify-content: space-between;
    padding-left: calc(19px + 32px);
    flex-wrap: wrap;
    gap: 12px;
  }

  .route-list__items {
    display: grid;
    row-gap: 12px;
    list-style: none;
    padding: 0;
  }

  .route-list__item {
    display: flex;
    align-items: center;
    column-gap: 10px;

    .dot {
      --size: 8px;
      width: var(--size);
      height: var(--size);
      background-color: var(--pink);
      border-radius: 1px;
    }

    a {
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: var(--link-grey1);
      position: relative;
      text-decoration: none;
      border-bottom: 1px solid transparent;

      :hover {
        border-bottom-color: var(--pink);
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

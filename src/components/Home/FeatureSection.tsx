import Link from 'next/link';
import styled from 'styled-components';

const StyledFeatureSection = styled.div`
  display: grid;
  row-gap: 16px;

  .route-items {
    display: flex;
    justify-content: space-between;
    padding-left: calc(19px + 32px);
  }

  .route-list__items {
    display: grid;
    row-gap: 12px;
  }

  .route-list__item {
    a {
      font-weight: 600;
      font-size: 18px;
      color: #606060;
      position: relative;
      padding-left: 15px;

      ::before {
        background-color: #e95495;
        content: '';
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 1px;
        --size: 8px;
        width: var(--size);
        height: var(--size);
      }
    }
  }
`;

interface IFeatureSectionProps {
  children: React.ReactNode;
  routes: Array<Array<{title: string; path: string}>>;
}

export default function FeatureSection({
  children,
  routes,
}: IFeatureSectionProps) {
  return (
    <StyledFeatureSection>
      {children}
      <div className="route-items">
        {routes.map((route, index) => (
          <div className={`route-items__col${index + 1}`} key={index}>
            <ul className="route-list__items">
              {route.map(({path, title}) => (
                <li className="route-list__item" key={title}>
                  <Link href={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledFeatureSection>
  );
}

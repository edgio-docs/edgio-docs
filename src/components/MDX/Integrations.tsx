import Link from 'next/link';
import styled from 'styled-components';

import {getChildrenRoutesFromSidebarMenuItems} from 'utils/getChildrenRoutesFromSidebarMenuItems';

const StyledIntegrations = styled.div`
  .integrations {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 8px;

    border: 1px solid var(--hr-grey1);
    border-radius: 8px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .integration-list__item {
    .integration-link {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: flex-start;
      gap: 10px;
      border: 2px solid var(--hr-grey1);
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s;

      :hover {
        transform: scale(1.02);
      }
    }

    .title,
    .description {
      font-size: 16px;
      line-height: 24px;
    }

    .title {
      font-weight: 600;
    }

    .description {
      font-weight: 400;
      opacity: 0.8;
    }
  }
`;

function getIntegrationsDescription(integration: string) {
  switch (integration) {
    case 'bigcommerce':
      return 'Layer0 supports a number of integrations of popular products and platforms as listed below.';
    case 'bloomreach':
      return 'Layer0 supports a number of integrations of popular products and platforms as listed below.';
    case 'shopify_hydrogen':
      return 'Layer0 supports a number of integrations of popular products and platforms as listed below.';
    case 'swell':
      return 'Layer0 supports a number of integrations of popular products and platforms as listed below.';
    default:
      return ":( I don't know what integration this is";
  }
}

export default function Integrations() {
  const parentPath = 'integrations';
  const allRoutes = getChildrenRoutesFromSidebarMenuItems(parentPath).slice(1);

  return (
    <StyledIntegrations>
      <ul className="integrations">
        {allRoutes.map((route) => (
          <li key={route.path} className="integration-list__item">
            <Link href={route.path} passHref>
              <a className="integration-link">
                <div className="icon" id="dark-theme-switcher">
                  {route.icon ? route.icon : null}
                </div>
                <div className="icon" id="light-theme-switcher">
                  {route.iconDark ? route.iconDark : null}
                </div>
                <div>
                  <h3 className="title">{route.title}</h3>
                  <p className="description">
                    {getIntegrationsDescription(route.path.split('/')[2])}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledIntegrations>
  );
}

import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT_NAME} from '../../../constants';
import {IconGitHub} from '../Icon/IconGitHub';

import {findChildByGuideName} from 'utils/getChildrenRoutesFromSidebarMenuItems';

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

    border: 1px solid var(--hr-secondary);
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
      border: 2px solid var(--hr-secondary);
      padding: 8px;
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.1s;
      height: 100%;
      will-change: transform;

      :hover {
        transform: scale(1.01);
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

const integrations: Object[] = [
  {
    ...findChildByGuideName('bigcommerce'),
    description: `${PRODUCT_NAME} provides integration with BigCommerce, an API-driven ecommerce platform with solutions for B2B, wholesale, social media platforms and more.`,
  },
  {
    ...findChildByGuideName('bloomreach'),
    description: `Bloomreach is an API-driven platform offering that focuses on powerful content, customer engagement, and product discovery offerings to achieve true personalization and drive unparalleled business growth.`,
  },
  {
    ...findChildByGuideName('shopify_hydrogen'),
    description: `${PRODUCT_NAME}'s integration with Hydrogen's React-based framework for building custom storefronts on Shopify gives you everything you need to start fast, build fast, and deliver the best personalized shopping experiences.`,
  },
  {
    ...findChildByGuideName('swell'),
    description: `Swell is a customizable headless ecommerce platform that supports global B2C and B2B merchants. ${PRODUCT_NAME}'s integration with Swell and Nuxt.js let's you get up and running quickly.`,
  },
  {
    ...findChildByGuideName('deploy_apps'),
    title: 'CI/CD Integration',
    path: '/guides/deploy_apps#deploy-from-ci',
    description: `${PRODUCT_NAME} has deploy integrations with your favorite CI/CD platform including GitHub, Jenkins, and GitLab.`,
    icon: <IconGitHub />,
    iconDark: <IconGitHub />,
  },
];

export default function Integrations() {
  return (
    <StyledIntegrations>
      <ul className="integrations">
        {integrations.map((route: any) => (
          <li key={route.path} className="integration-list__item">
            <Link href={route.path} passHref>
              <a className="integration-link">
                <div className="icon" id="light-theme">
                  {route.icon ? route.icon : null}
                </div>
                <div className="icon" id="dark-theme">
                  {route.iconDark ? route.iconDark : null}
                </div>
                <div>
                  <h3 className="title">{route.title}</h3>
                  <p className="description">{route.description}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </StyledIntegrations>
  );
}

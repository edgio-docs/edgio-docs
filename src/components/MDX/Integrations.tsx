/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styled from 'styled-components';

import {PRODUCT_NAME} from '../../../constants';

import useConditioning from 'utils/hooks/useConditioning';

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

    img {
      width: 100%;
      height: 100%;
      margin: 0;
      box-shadow: none;
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
    title: 'BigCommerce',
    path: '/guides/integrations/bigcommerce',
    icon: 'bigcommerce',
    description: `${PRODUCT_NAME} provides integration with BigCommerce, an API-driven ecommerce platform with solutions for B2B, wholesale, social media platforms and more.`,
  },
  {
    title: 'Bloomreach',
    path: '/guides/integrations/bloomreach',
    icon: 'bloomreach',
    description: `Bloomreach is an API-driven platform offering that focuses on powerful content, customer engagement, and product discovery offerings to achieve true personalization and drive unparalleled business growth.`,
  },
  {
    title: 'Shopify Hydrogen',
    path: '/guides/integrations/shopify_hydrogen',
    icon: 'shopify-hydrogen',
    description: `${PRODUCT_NAME}'s integration with Hydrogen's React-based framework for building custom storefronts on Shopify gives you everything you need to start fast, build fast, and deliver the best personalized shopping experiences.`,
  },
  {
    title: 'Swell',
    path: '/guides/integrations/swell',
    icon: 'swell',
    description: `Swell is a customizable headless ecommerce platform that supports global B2C and B2B merchants. ${PRODUCT_NAME}'s integration with Swell and Nuxt.js let's you get up and running quickly.`,
  },
  {
    title: 'CI/CD Integration',
    path: '/guides/basics/deployments#deploy-from-ci',
    icon: 'github',
    description: `${PRODUCT_NAME} has deploy integrations with your favorite CI/CD platform including GitHub, Jenkins, and GitLab.`,
  },
  {
    title: 'WordPress',
    path: '/guides/integrations/wordpress',
    icon: 'wordpress',
    description: `WordPress is a content management system (CMS) that allows you to host and build websites. ${PRODUCT_NAME}'s integration with WordPress extends to plugin support for cache purging from your WordPress control panel.`,
  },
];

export default function Integrations() {
  const {
    version: {toPath},
  } = useConditioning();

  return (
    <StyledIntegrations>
      <ul className="integrations">
        {integrations.map((route: any) => (
          <li key={route.path} className="integration-list__item">
            <Link href={toPath(route.path)} passHref>
              <a className="integration-link">
                <div className="icon" id="light-theme">
                  <img
                    src={`/icons/${route.icon}-dark.svg`}
                    alt={route.title}
                  />
                </div>
                <div className="icon" id="dark-theme">
                  <img src={`/icons/${route.icon}.svg`} alt={route.title} />
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

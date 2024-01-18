import {PRODUCT} from '../../constants';

export const siteConfig = {
  editUrl: 'https://github.com/edgio-docs/edgio-docs/edit/src/pages',
  copyright: `Copyright © ${new Date().getFullYear()} ${PRODUCT}. All Rights Reserved.`,
  repoUrl: 'https://github.com/edgio-docs/edgio-docs',
  twitterUrl: 'https://twitter.com/layer0deploy',
  algolia: {
    appId: 'NUB3ND0MNC',
    apiKey: '102f7bfdfa7c14ea4e20577bfdd73c5d',
    indexName: 'layer0',
  },
  headerIdConfig: {
    className: `anchor`,
  },
  tagline: `Explore the ${PRODUCT} guides and examples on how to integrate edge logic into your application code & extend the edge to the browser.`,
  twitterHandle: 'Layer0Deploy',
  analytics: {
    gtmId: 'GTM-5WCD2BK',
  },
};

export const APPLICATIONS_SRC_PATH = 'guides/applications';
export const APPLICATIONS_PATH_PREFIX = 'applications';
export const UPLYNK_SRC_PATH = 'guides/uplynk';
export const UPLYNK_PATH_PREFIX = 'uplynk';

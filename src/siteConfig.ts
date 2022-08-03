import {PRODUCT} from '../constants';
// IMPORTANT
export const siteConfig = {
  editUrl: 'https://github.com/layer0-docs/layer0-docs/edit/src/pages',
  copyright: `Copyright © ${new Date().getFullYear()} ${PRODUCT}. All Rights Reserved.`,
  repoUrl: 'https://github.com/layer0-docs/layer0-docs',
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
};

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
  sentryDSN:
    'https://d8acf889ce6f76303aca7c2c8b977761@o4506077343252480.ingest.sentry.io/4506077345939456',
};

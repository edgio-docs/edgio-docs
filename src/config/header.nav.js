import {
  FIDDLE_URL,
  FORUM_URL,
  STATUS_URL,
  SUPPORT_URL,
} from 'config/base.config';

const headerNav = [
  {
    title: 'Product',
    items: [
      {
        name: 'Applications v7',
        url: '/applications/v7',
      },
      {
        name: 'Uplynk',
        url: '',
      },
      {
        name: 'Open Edge',
        url: '',
      },
      {
        name: 'Delivery',
        url: '',
      },
      /* divider */
      null,
      {
        name: 'Edgecast CDN',
        url: '',
      },
      {
        name: 'Applications v6',
        url: '/applications/v6',
      },
      {
        name: 'Applications v5',
        url: '/applications/v5',
      },
      {
        name: 'Applications v4',
        url: '/applications/v4',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        name: 'Applications REST API',
        url: '/rest-api',
      },
      {
        name: 'Applications EdgeJS API',
        url: '/docs/v7.x/api/core/',
      },
      {
        name: 'Uplynk',
        url: '',
      },
      {
        name: 'Delivery',
        url: '',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        name: 'Edgio Answers',
        url: '',
      },
      {
        name: 'Status Page',
        url: STATUS_URL,
      },
      {
        name: 'Forum',
        url: FORUM_URL,
      },
      {
        name: 'Contact Us',
        url: SUPPORT_URL,
      },
    ],
  },
  {
    title: 'Fiddle',
    url: FIDDLE_URL,
  },
];

export default headerNav;

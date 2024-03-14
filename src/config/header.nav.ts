import {edgioAnswersUrl} from 'components/EdgioAnswers';
import config from 'config/base.config';

const {STATUS_URL, SUPPORT_URL, FORUM_URL, FIDDLE_URL} = config;

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
        url: 'https://docs.edgecast.com/video/index.html',
      },
      {
        name: 'Open Edge',
        url: '',
      },
      {
        name: 'Delivery',
        url: 'https://docs.edgecast.com/cdn/index.html#Getting_Started/GS-All.htm',
      },
      /* divider */
      null,
      {
        name: 'Edgecast CDN',
        url: 'https://docs.edgecast.com/cdn/index.html#Getting_Started/GS-All.htm',
      },
      {
        name: 'Applications v6',
        url: '/applications/v6',
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
        url: '/rest_api',
      },
      {
        name: 'Applications EdgeJS API',
        url: '/docs/v7.x/api/core/',
      },
      {
        name: 'Uplynk',
        url: 'https://docs.edgecast.com/video/index.html',
      },
      {
        name: 'Delivery',
        url: 'https://docs.edgecast.com/cdn/index.html#Getting_Started/GS-All.htm',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        name: 'Edgio Answers',
        url: edgioAnswersUrl,
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

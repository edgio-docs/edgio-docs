import {edgioAnswersUrl} from 'components/EdgioAnswers';
import config from 'config/base.config';

const {STATUS_URL, SUPPORT_URL, FORUM_URL, FIDDLE_URL} = config;

type HeaderNavItemOrDivider = HeaderNavItem | null;
interface HeaderNavItem {
  name: string;
  url: string;
  useNextLink?: boolean;
}

interface HeaderNavGroup {
  title: string;
  items?: HeaderNavItemOrDivider[];
  url?: string;
}

const headerNav: HeaderNavGroup[] = [
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
        url: 'https://support.limelight.com/public/en/Default.htm#Control/Open_Edge/Open_Edge.htm',
      },
      {
        name: 'Delivery',
        url: 'https://support.limelight.com/public/en/Default.htm#Delivery/Delivery_Public.htm',
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
        useNextLink: false,
      },
      {
        name: 'Applications EdgeJS API',
        url: '/docs/v7.x/api/core/',
      },
      {
        name: 'Uplynk',
        url: 'https://docs.edgecast.com/video/index.html#Develop/Develop.htm',
      },
      {
        name: 'Delivery',
        url: 'https://support.limelight.com/public/en/Default.htm#API/API%20Index.htm',
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

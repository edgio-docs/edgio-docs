import {edgioAnswersUrl} from 'components/EdgioAnswers';
import {AccordionItem} from 'components/Layout/navigation/Accordion';
import config from 'config/base.config';

import {siteConfig} from './appConfig';

const {STATUS_URL, SUPPORT_URL, FORUM_URL, FIDDLE_URL} = config;

const headerNav: AccordionItem[] = [
  {
    title: 'Products',
    items: [
      {
        title: 'Applications v7',
        url: '/applications/v7',
      },
      {
        title: 'Uplynk',
        url: 'https://docs.edgecast.com/video/index.html',
      },
      {
        title: 'Open Edge',
        url: 'https://support.limelight.com/public/en/Default.htm#Control/Open_Edge/Open_Edge.htm',
      },
      {
        title: 'Delivery',
        url: 'https://support.limelight.com/public/en/Default.htm#Delivery/Delivery_Public.htm',
      },
      /* divider */
      null,
      {
        title: 'Edgecast CDN',
        url: 'https://docs.edgecast.com/cdn/index.html#Welcome_to_the_Help_Center.htm',
      },
      {
        title: 'Applications v6',
        url: '/applications/v6',
      },
      {
        title: 'Applications v4',
        url: '/applications/v4',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Applications REST API',
        url: '/rest_api',
        useNextLink: false,
      },
      {
        title: 'Applications EdgeJS API',
        url: '/docs/v7.x/api/core/',
      },
      {
        title: 'Uplynk',
        url: 'https://docs.edgecast.com/video/index.html#Develop/Develop.htm',
      },
      {
        title: 'Delivery',
        url: 'https://support.limelight.com/public/en/Default.htm#API/API%20Index.htm',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      siteConfig.edgioAnswers.enabled
        ? {
            title: 'Edgio Answers',
            url: edgioAnswersUrl,
          }
        : null,
      {
        title: 'Status Page',
        url: STATUS_URL,
      },
      {
        title: 'Forum',
        url: FORUM_URL,
      },
      {
        title: 'Contact Us',
        url: SUPPORT_URL,
      },
    ].filter(Boolean),
  },
  {
    title: 'Fiddle',
    url: FIDDLE_URL,
  },
];

export default headerNav;

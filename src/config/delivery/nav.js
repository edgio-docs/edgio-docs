import { productsConfig } from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['delivery'].pathPrefix,
  routes: [
    {
      title: 'Overvew',
      path: 'index',
    },
    {
      title: 'APIs',
      path: 'apis',
    },
    {
      title: 'Control',
      path: 'control',
      routes: [
        {
          title: 'APIs',
          path: 'control/apis',
          routes: [
            {
              title: 'Billing',
              path: 'control/apis/billing',
            },
            {
              title: 'Configuration',
              path: 'control/apis/configuration',
            },
            {
              title: 'Realtime Reporting',
              path: 'control/apis/realtime_reporting',
            },
            {
              separator,
            }
            {
              title: 'IP Allow List',
              path: 'control/apis/ip_allow_list',
            },
            {
              title: 'Global Time',
              path: 'control/apis/global_time',
            },
          ],
        },
      ],
    },
    {
      title: 'Delivery',
      path: 'delivery',
    },
    {
      title: 'Storage',
      path: 'storage',
    },
    {
      title: 'Video',
      path: 'video',
    },
  ],
};

export default nav;

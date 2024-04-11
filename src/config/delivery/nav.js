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
      title: 'IP Allow List',
      path: 'ip_allow_list',
    },
    {
      title: 'Global Time',
      path: 'global_time',
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
          ],
        },
      ],
    },
    {
      title: 'Delivery',
      path: 'delivery',
    },
  ],
};

export default nav;

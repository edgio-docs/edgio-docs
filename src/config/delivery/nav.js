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
      icon: 'spark',
    },
    {
      title: 'IP Allow List',
      path: 'ip_allow_list',
      icon: 'spark',
    },
    {
      title: 'Global Time',
      path: 'global_time',
      icon: 'spark',
    },
    {
      title: 'APIs',
      path: 'apis',
      icon: 'spark',
    },
    {
      title: 'Control',
      path: 'control',
      icon: 'spark',
      routes: [
        {
          title: 'APIs',
          path: 'control/apis',
          icon: 'spark',
          routes: [
            {
              title: 'Billing',
              path: 'control/apis/billing',
              icon: 'spark',
            },
          ]
        },
      ]
    },
    {
      title: 'Delivery',
      path: 'delivery',
      icon: 'spark',
    },
  ],
};

export default nav;

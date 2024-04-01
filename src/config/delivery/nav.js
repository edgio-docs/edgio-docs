import {productsConfig} from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['delivery'].pathPrefix,
  routes: [
    {
      title: 'Control',
      path: 'control',
      icon: 'spark',
      routes: [
        {
          title: 'Getting Started',
          path: 'control/apis',
          icon: 'spark',
          routes: [
            {
              title: 'Billing',
              path: 'control/apis/billing',
              icon: 'spark',
            },
          ],
        },
      ],
    },
    {
      title: 'Delivery',
      path: 'delivery',
      icon: 'spark',
    },
  ],
};

export default nav;

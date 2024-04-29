import {productsConfig} from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['uplynk'].pathPrefix,
  routes: [
    {
      title: 'Getting Started',
      path: 'getting_started',
      icon: 'spark',
    },
  ],
};

export default nav;

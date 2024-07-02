import { productsConfig } from '../appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: productsConfig['open_edge'].pathPrefix,
  routes: [
    {
      title: 'Overview',
      path: 'overview',
      icon: 'spark',
    },
    {
      title: 'FAQs',
      path: 'faqs',
      icon: 'spark',
    },
    {
      title: 'Blockers',
      path: 'overview/#blockers',
      icon: 'spark',
    },
    {
      title: 'rDNS Reqs',
      path: 'overview/#rdns',
      icon: 'spark',
    },
  ],
};

export default nav;

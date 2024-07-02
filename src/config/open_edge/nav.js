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
    },
    {
      title: 'FAQs',
      path: 'faqs',
    },
    {
      title: 'Blockers',
      path: 'overview/#blockers',
    },
    {
      title: 'rDNS Reqs',
      path: 'overview/#rdns',
    },
  ],
};

export default nav;

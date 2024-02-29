import {UPLYNK_PATH_PREFIX} from './appConfig';

const separator = {
  title: '',
  path: '',
};

const nav = {
  title: 'guides',
  path: `/${UPLYNK_PATH_PREFIX}`,
  routes: [
    {
      title: 'Getting Started',
      path: 'getting_started',
      icon: 'spark',
    },
  ],
};

export default nav;

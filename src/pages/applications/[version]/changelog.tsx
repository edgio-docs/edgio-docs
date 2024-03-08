import {productsConfig} from 'config/appConfig';

import ChangelogPage, {getStaticProps} from '../changelog';

export const getStaticPaths = async () => {
  // determine available versions from config files
  const versions = Object.keys(productsConfig.applications.versions)
    .filter((v) => v !== 'default')
    .sort()
    .reverse();

  console.log('versions', versions);

  return {
    paths: versions.map((version) => ({
      params: {
        version,
      },
    })),
    fallback: 'blocking',
  };
};

export default ChangelogPage;
export {getStaticProps};

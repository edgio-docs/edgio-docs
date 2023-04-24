import {join} from 'path';

import globby from 'globby';

import ChangelogPage, {getStaticProps} from '../changelog';

export const getStaticPaths = async () => {
  // determine available versions from config files
  const versions = (
    await globby('config/v*.config.js', {
      cwd: join(process.cwd(), 'src'),
    })
  ).map(async (file: string) => {
    const v = (file.match(/v(\d+)\.config\.js/) || [])[1];

    return {
      version: v,
    };
  });

  const versionObjects = await Promise.all(versions);

  return {
    paths: versionObjects.map(({version}) => ({
      params: {
        version: `v${version}`,
      },
    })),
    fallback: 'blocking',
  };
};

export default ChangelogPage;
export {getStaticProps};

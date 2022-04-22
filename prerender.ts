import {join} from 'path';

import {existsSync, readFileSync, readJsonSync} from 'fs-extra';
import {map, flatMap, flatten} from 'lodash';

import navData from './src/data/SidebarMenuItems';

const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID');
const nextRoutesManifestPath = join(
  process.cwd(),
  '.next',
  'routes-manifest.json'
);

export default async function prerenderRequests() {
  const requests = [
    {path: '/'},
    ...map(
      flatMap(flatten(navData), (item) => item.routes),
      (item) => {
        if (item && item.path.startsWith('/')) {
          return {path: item.path};
        }
      }
    ),
  ].filter(Boolean);

  if (existsSync(buildIdPath)) {
    const buildId = readFileSync(buildIdPath, 'utf8');
    const routesJson = readJsonSync(nextRoutesManifestPath);
    requests.push(
      ...routesJson.dataRoutes?.map(({page}) => ({
        path: `/_next/data/${buildId}${page}.json`,
      }))
    );
  }

  return requests;
}

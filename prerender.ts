import {join} from 'path';

import {existsSync, readFileSync, readJsonSync} from 'fs-extra';

import {prerenderPaths} from './src/data/SidebarMenuItems';

const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID');
const nextRoutesManifestPath = join(
  process.cwd(),
  '.next',
  'routes-manifest.json'
);

export default async function prerenderRequests() {
  const requests = [{path: '/'}, ...prerenderPaths].filter(Boolean);

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

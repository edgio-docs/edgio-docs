import {existsSync, readFileSync} from 'fs';
import {join} from 'path';

import {map, flatMap, flatten} from 'lodash';

import navData from './src/data/SidebarMenuItems';

const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID');

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
  ];

  if (existsSync(buildIdPath)) {
    const buildId = readFileSync(buildIdPath, 'utf8');
    const apiPaths = requests
      .map((req) => {
        let path = req.path.replace(/^\/|\/$/, '');
        path = `/_next/data/${buildId}/${path}.json`;

        return {path};
      })
      .flat();
    requests.push(...apiPaths);
  }

  return requests.filter(Boolean);
}

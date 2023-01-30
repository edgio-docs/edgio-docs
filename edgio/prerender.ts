import {join} from 'path';

import {existsSync, readFileSync, readJsonSync} from 'fs-extra';

import routes from '../src/data/nav.json';

const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID');
const nextRoutesManifestPath = join(
  process.cwd(),
  '.next',
  'routes-manifest.json'
);

export default async function prerenderRequests() {
  const requests = [
    {path: '/'},
    {path: '/applications/changelog'},

    // ...JSONRoutes.routes.map(({path}) => ({
    //   path,
    // })),
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

// function getPathsFromJson(data) {
//   const paths = [];
//   const {path, routes} = data;

//   function getRoutes(path, routes) {
//     if (path) {
//       paths.push(path);
//     }
//   }

//   getRoutes(path, routes);

//   return paths;
// }

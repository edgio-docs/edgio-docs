import v4 from '../config/v4.nav';
import v5 from '../config/v5.nav';
import v6 from '../config/v6.nav';
//import v7 from '../config/_ignore_v7.nav';

import {Route, StringMap} from './Types';

const navigation: StringMap = {
  v4,
  v5,
  v6,
  //v7,
};

/**
 *
 * @param version
 * @returns
 */
export function getVersionedNavigation(version?: string): Route {
  if (!version) {
    version = process.env.NEXT_PUBLIC_LATEST_VERSION as string; // defined in next.config.js
  }

  // clean up version string so it's just the numeric value
  version = version.replace('v', '');

  return navigation[`v${version}`];
}

export function getVersionedPaths(version?: string) {
  function flattenPaths(
    obj: Route,
    basePath?: string | undefined,
    nested = false
  ) {
    const result = [];

    if (!basePath) {
      basePath = rootPath;
    } else if (!nested) {
      basePath = `${rootPath}/${basePath}`;
    }

    if (obj.path) {
      result.push(`${basePath}/${obj.path}`);
    }
    if (obj.routes) {
      obj.routes.forEach((route) => {
        if (!route.external) {
          result.push(...flattenPaths(route, basePath, true));
        }
      });
    }
    return result;
  }

  const nav = getVersionedNavigation(version);
  const rootPath = nav.path;
  delete nav.path;

  return flattenPaths(nav);
}

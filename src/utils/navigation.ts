import {Route} from './Types';

/**
 *
 * @param version
 * @returns
 */
export async function getVersionedNavigation(version?: string): Promise<Route> {
  if (!version) {
    version = process.env.NEXT_PUBLIC_LATEST_VERSION as string; // defined in next.config.js
  }

  // clean up version string so it's just the numeric value
  version = version.replace('v', '');

  return (await import(`../config/v${version}.nav`)).default;
}

export async function getVersionedPaths(version?: string) {
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

  const nav = await getVersionedNavigation(version);
  const rootPath = nav.path;
  delete nav.path;

  return flattenPaths(nav);
}

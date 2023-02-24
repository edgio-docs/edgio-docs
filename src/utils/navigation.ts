export async function getVersionedNavigation(version?: string) {
  function flattenPaths(
    obj: {path: any; routes: any[]},
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

  if (!version) {
    version = process.env.LATEST_VERSION; // defined in next.config.js
  }

  const nav = (await import(`../config/v${version}.nav.js`)).default;

  const rootPath = nav.path;
  delete nav.path;

  return flattenPaths(nav);
}

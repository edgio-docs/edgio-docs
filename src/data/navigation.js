const nav = require('./nav.json');

const rootPath = nav.path;
delete nav.path;

function flattenPaths(obj, basePath, nested = false) {
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

module.exports = {
  basePaths: flattenPaths(nav),
  versionedPaths: flattenPaths(nav, '{version}'),
};

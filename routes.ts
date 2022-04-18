// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import {Router, CustomCacheKey} from '@layer0/core/router';
import {nextRoutes} from '@layer0/next';

const key = new CustomCacheKey().excludeAllQueryParametersExcept(
  'query',
  'version'
);

const htmlCacheConfig = {
  key,
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 0,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
  },
};

export default new Router()
  .match('/service-worker.js', ({serviceWorker}) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .match('/api-docs/:path*', ({cache, proxy}) => {
    cache(htmlCacheConfig);
    proxy('api', {
      path: '/:path*',
    });
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages

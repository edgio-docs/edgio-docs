const { Router, CustomCacheKey } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
const key = new CustomCacheKey().excludeAllQueryParametersExcept('query', 'version')
const prerenderRequests = require('./xdn/prerenderRequests')

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
}

const apiCacheConfig = {
  key,
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
  },
}

const staticCacheConfig = {
  key,
  browser: {
    maxAgeSeconds: 60 * 60,
    serviceWorkerSeconds: 60 * 60,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
  },
}

module.exports = new Router()
  .prerender(prerenderRequests)
  .match('/service-worker.js', ({ cache, serveStatic }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 365,
      },
    })
    serveStatic('.next/static/service-worker.js')
  })
  .get('/images/:path*', ({ cache }) => {
    cache(staticCacheConfig)
  })
  // the following route is needed for older guides and should not be removed
  .match('/guides/images/:path*', ({ cache, serveStatic }) => {
    cache(staticCacheConfig)
    serveStatic('public/images/:path*')
  })
  .match('/api/:path*', ({ cache }) => {
    cache(apiCacheConfig)
  })
  .match('/:path*', ({ cache }) => {
    cache(htmlCacheConfig)
  })
  .match('/docs/api/:path*/', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/xdn-docs-pages/current/api/:path*/' })
  })
  .match('/docs/api/:path*', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/xdn-docs-pages/current/api/:path*' })
  })
  .match('/docs/:version/api/:path*/', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/xdn-docs-pages/:version/api/:path*/' })
  })
  .match('/docs/:version/api/:path*', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/xdn-docs-pages/:version/api/:path*' })
  })
  .get('/googleb2732cddf1383cf4.html', ({ send }) =>
    send('google-site-verification: googleb2732cddf1383cf4.html', 200, 'OK'),
  )
  .use(nextRoutes)
  .fallback(({ redirect }) => {
    return redirect('/', 302)
  })

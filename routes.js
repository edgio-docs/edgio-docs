const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

const htmlCacheConfig = {
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
  browser: {
    maxAgeSeconds: 60 * 60,
    serviceWorkerSeconds: 60 * 60,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
  },
}

module.exports = app => {
  const { nextMiddleware } = createNextPlugin(app)

  return (
    new Router()
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
      // the following route is needed for older guides and should not be removed
      .match('/guides/images/*path', ({ cache, serveStatic }) => {
        cache(staticCacheConfig)
        serveStatic('public/images/*path')
      })
      .match('/api/*path', ({ cache }) => {
        cache(apiCacheConfig)
      })
      .match('/*path', ({ cache }) => {
        cache(htmlCacheConfig)
      })
      .match('/docs/:version/api/*path/', ({ proxy, cache }) => {
        cache(htmlCacheConfig)
        proxy('api', { path: '/xdn-docs-pages/:version/api/*path/' })
      })
      .match('/docs/:version/api/*path', ({ proxy, cache }) => {
        cache(htmlCacheConfig)
        proxy('api', { path: '/xdn-docs-pages/:version/api/*path' })
      })
      .use(nextMiddleware)
      .fallback(({ redirect }) => {
        return redirect('/', 302)
      })
  )
}

const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

const cacheConfig = {
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: 60 * 60,
  },
  edge: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
  },
}

module.exports = app => {
  const { nextMiddleware } = createNextPlugin(app)

  return new Router()
    .match('/service-worker.js', ({ cache, serveStatic }) => {
      cache({
        browser: {
          maxAgeSeconds: 0,
        },
        edge: {
          maxAgeSeconds: 60 * 60 * 365,
        },
      })
      return serveStatic('.next/static/service-worker.js')
    })
    .match('/*path', ({ cache }) => {
      cache(cacheConfig)
    })
    .match('/docs/*path', ({ proxy, cache }) => {
      cache(cacheConfig)
      return proxy('api', { path: '/xdn-docs-pages/{path}' })
    })
    .use(nextMiddleware)
    .fallback(({ redirect }) => {
      return redirect('/', '302')
    })
}

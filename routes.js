const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { nextMiddleware } = createNextPlugin(app)

  return new Router()
    .match('/*path', ({ cache }) => {
      cache({
        browser: {
          httpClientCache: 60 * 60,
        },
        edge: {
          maxAgeSeconds: 60 * 60 * 24 * 365,
          staleWhileRevalidateSeconds: 60 * 60 * 24 * 365,
        },
      })
    })
    .match('/reference/*path', ({ proxy }) => {
      return proxy('api', { path: '/xdn-docs-pages/{path}' })
    })
    .use(nextMiddleware)
}

const Router = require('xdn-router/Router')
const createNextPlugin = require('xdn-next/router/createNextPlugin')

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
    .use(nextMiddleware)
}

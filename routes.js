const { Router, CustomCacheKey } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
// const { isProductionBuild } = require('../layer0/packages/core/src/environment')
const key = new CustomCacheKey().excludeAllQueryParametersExcept('query', 'version')
const prerenderRequests = require('./layer0/prerenderRequests')

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
  .match({}, ({ setResponseHeader }) => {
    if (process.env.NODE_ENV === 'production') {
      setResponseHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
      setResponseHeader(
        'Content-Security-Policy',
        [
          `default-src 'self'`,
          `style-src 'unsafe-inline' 'self' fonts.googleapis.com cdn.jsdelivr.net`,
          `font-src fonts.gstatic.com`,
          `img-src 'self' www.google-analytics.com analytics.twitter.com www.facebook.com px.ads.linkedin.com tr.lfeeder.com data:`,
          `frame-src www.youtube.com`,
          `script-src 'unsafe-inline' 'self' 'unsafe-eval' cdn.jsdelivr.net www.googletagmanager.com cdn.segment.com cdn4.mxpnl.com www.google-analytics.com widget.intercom.io sc.lfeeder.com snap.licdn.com connect.facebook.net www.youtube.com js.intercomcdn.com`,
          `base-uri 'self'`,
          `frame-ancestors 'self'`,
          `media-src www.youtube.com`,
          `connect-src *.layer0.co *.layer0.link *.segment.io analytics.google.com *.intercom.io *.intercomcdn.com *.intercomassets.com *.github.io *.algolianet.com *.algolia.net`,
        ].join('; '),
      )
      setResponseHeader('X-XSS-Protection', '1; mode=block')
    }
  })
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
  .match('/:path*', ({ cache }) => {
    cache(htmlCacheConfig)
  })
  .match('/docs/api/:path*/', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/layer0-docs-pages/current/api/:path*/' })
  })
  .match('/docs/api/:path*', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/layer0-docs-pages/current/api/:path*' })
  })
  .match('/docs/:version/api/:path*/', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/layer0-docs-pages/:version/api/:path*/' })
  })
  .match('/docs/:version/api/:path*', ({ proxy, cache }) => {
    cache(htmlCacheConfig)
    proxy('api', { path: '/layer0-docs-pages/:version/api/:path*' })
  })
  .get('/googleb2732cddf1383cf4.html', ({ send }) =>
    send('google-site-verification: googleb2732cddf1383cf4.html', 200, 'OK'),
  )
  .use(nextRoutes)
  .fallback(({ redirect }) => {
    return redirect('/', 302)
  })

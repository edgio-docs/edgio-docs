# Next.js

This guide shows you how to deploy a Next.js application on the Moovweb XDN:

## Getting Started

If you don't already have a next.js application, you can create one using:

```
npm create next-app my-next-app
```

To deploy your Next.js application on the Moovweb XDN:

1. Set `target: 'serverless'` and add the `withServiceWorker` plugin to `next.config.js`. If this file doesn't exist, create it with the following content:

```js
const { withServiceWorker } = require('@xdn/next/sw')

module.exports = withServiceWorker({
  target: 'serverless',
})
```

If you're already using `next-offline`, you should remove it in favor of `withServiceWorker`, which itself uses `next-offline`.

2. Run `xdn init`

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/next` package
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to `next.js`. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

## Service Worker

The `xdn init` command adds a service worker at `sw/service-worker.js`.  If you have an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js`, or con:

```
```

## Routing

The XDN supports Next.js's built-in routing scheme for both page and api routes, including Next.js 9's clean dynamic routes. The default `routes.js` file created by `xdn init` sends all requests to Next.js via a fallback route:

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { nextMiddleware } = createNextPlugin(app)
  return new Router().use(nextMiddleware)
}
```

### Middleware

In the code above `nextMiddleware` adds all Next.js routes router based on the /pages directory. You can add additional routes before and after the middleware, for example to send some URLs to an alternate backend. This is useful for gradually replacing an existing site with a new Next.js app.

A popular use case is to fallback to a legacy site for any route that your Next.js app isn't configured to handle:

```js
new Router()
  .use(nextMiddleware)
  .fallback(({ proxy }) => proxy('legacy'))
```

To configure the legacy backend, use xdn.config.js:

```js
module.exports = {
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'legacy.my-site.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'legacy.my-site.com',
    },
  },
}
```

Using environment variables here allows you to configure different legacy domains for each XDN environment.

### Vanity Routes

For SEO purposes you may want to add additional "vanity" routes that point to Next.js. You can do this using the `renderNext` function returned from `createNextPlugin(app)`:

```js
const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router()
    .use(nextMiddleware)
    .match('/some/vanity/url/:p', async ({ render }) => {
      await render((req, res, params) =>
        renderNext(req, res, '/p/[productId]', { productId: params.p }),
      )
    })
}
```

### Caching

The easiest way to add edge caching to your next.js app is to add caching routes before the middleware.  For example, 
imagine you have `/pages/c/[categoryId].js`:


```js
new Router()
  .match('/pages/c/:categoryId', async ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60
      }
    })
  })
  .use(nextMiddleware)
```

### Running Locally

To test your app locally, run:

```
xdn run
```

You can do a production build of your app and test it locally using:

```
xdn build && xdn run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the Moovweb cloud using serverless-offline.

### Deploying

To deploy your app to the Moovweb XDN, run:

```
xdn deploy
```

See [deploying](deploying) for more information.

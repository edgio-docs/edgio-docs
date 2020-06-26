# Next.js

This guide shows you how to deploy a Next.js application on the Moovweb XDN:

## Getting Started

If you don't already have a Next.js application, you can create one using:

```bash
npm create next-app my-next-app
```

To prepare your Next.js application for deployment on the Moovweb XDN:

1. Install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

2. Run `xdn init`

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the XDN router.
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `@xdn/react` package - Provides a `Prefetch` component for prefetching pages
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

3. Add the `withServiceWorker` plugin to `next.config.js`. If this file doesn't exist, create it with the following content:

```js
// next.config.js

const { withServiceWorker } = require('@xdn/next/sw')

module.exports = withServiceWorker()
```

If you're already using `next-offline`, you should remove it in favor of `withServiceWorker`, which itself uses `next-offline`.

## Running Locally

To simulate your app within the XDN locally, run:

```bash
npm run xdn:start
```

## Deploying

To deploy your app to the XDN, run:

```bash
npm run xdn:deploy
```

See [deploying](deploying) for more information.

## Prefetching

The `xdn init` command adds a service worker based on [Workbox](https://developers.google.com/web/tools/workbox) at `sw/service-worker.js`.  If you have an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js` and simply add the following to your service worker:

```js
import { Prefetcher } from '@xdn/prefetch/sw'

new Prefetcher().route()
```

The above allows you to prefetch pages from the XDN's edge cache to greatly improve browsing speed. To prefetch a page, add the `Prefetch` component from `@xdn/react` to any Next `Link` element:

```js
import { Prefetch } from '@xdn/react'
import Link from 'next/link'

export default function ProductListing({ products }) {
  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>
          <Link as={product.url} href="/p/[productId]">
            <Prefetch>
              <a><img src={product.thumbnail} /></a>
            </Prefetch>
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

The `Prefetch` component fetches data for the linked page from the XDN's edge cache and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

The `Prefetch` component assumes you're using `getServerSideProps` and will prefetch the data URL corresponding to the target page. If you need to prefetch a different url, you can do so using the `url` prop:

```js
<Link as={product.url} href="/p/[productId]">
  <Prefetch url="/some/url/to/prefetch">
    <a><img src={product.thumbnail} /></a>
  </Prefetch>
</Link>
```

## Routing

The XDN supports Next.js's built-in routing scheme for both page and api routes, including Next.js 9's clean dynamic routes. The default `routes.js` file created by `xdn init` sends all requests to Next.js via a fallback route:

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router')
const { nextRoutes } = require('@xdn/next')

module.exports = new Router()
  .get('/service-worker.js', ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
      browser: {
        maxAgeSeconds: 0,
      },
    })
    serveStatic('.next/static/service-worker.js')
  })
  .use(nextRoutes)
```

### nextRoutes middleware

In the code above, the `nextRoutes` middleware adds all Next.js routes to the router based on the `/pages` directory. You can add additional routes before and after the middleware, for example to send some URLs to an alternate backend. This is useful for gradually replacing an existing site with a new Next.js app.

A popular use case is to fallback to a legacy site for any route that your Next.js app isn't configured to handle:

```js
new Router()
  .use(nextRoutes)
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
const { renderNextPage, nextRoutes } = require('@xdn/next')

module.exports = new Router()
  .get('/some/vanity/url/:p', res => {
    renderNextPage('/p/[productId]', res, params => ({ productId: params.p }))
  })
  .use(nextRoutes)
```

The `renderNextPage` function returns a promise that resolves when Next.js has rendered the response and takes the following parameters:

* nextRoute - `String` The next.js route path
* res - `ResponseWriter` The ResponseWriter passed to your route handler
* params - `Object|Function` An object containing query params to provide to the next page, or a function that takes the route's path params and the request and returns a params object.

### Caching

The easiest way to add edge caching to your Next.js app is to add caching routes before the middleware.  For example, 
imagine you have `/pages/c/[categoryId].js`:


```js
new Router()
  .get('/pages/c/:categoryId', ({ cache }) => {
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
  .use(nextRoutes)
```

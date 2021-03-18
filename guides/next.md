# Next.js

This guide shows you how to deploy a Next.js application on the Moovweb XDN.

## Example SSR Site

This Next.js example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

[Try the Next.js SSR Example Site](https://moovweb-docs-xdn-next-example-default.moovweb-edge.io/category/hats?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-next-example?button)

## Next.js Commerce

For details on using the Next.js Commerce template with the XDN refer to our [Next.js Commerce Guide](next_commerce).

## Connector

This framework has a connector developed for the XDN. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/moovweb-docs/xdn-connectors/tree/main/xdn-next-connector?button)

## Supported Features

The Moovweb XDN supports all of the most powerful features of Next.js 10, including:

- Localization
- Image Optimization
- `getStaticPaths` (including `fallback: (true|false|'blocking')`)
- `getStaticProps` (including `revalidate`)
- `getServerSideProps`
- `getInitialProps`

## Getting Started

### Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

### Create a Next.js Application

If you don't already have a Next.js application, you can create one using:

```bash
npm create next-app my-next-app
```

To prepare your Next.js application for deployment on the Moovweb XDN:

### Install the XDN CLI globally

```bash
npm install -g @xdn/cli
```

\*\*Note
When installing the XDN CLI globally in a virtual environment that has Node and NPM installed globally, you [may run into permission issues](https://forum.moovweb.com/t/xdn-cli-npm-install-error/83). In that case, you can install the XDN CLI locally within you app using `npm i -D @xdn/cli` and running commands using `./node_modules/@xdn/cli` instead of `xdn`.

If you run into permission issues while attempting to install the XDN CLI globally on your local development machine, these may be fixed by using [nvm](https://github.com/nvm-sh/nvm) to manage Node and NPM.

### Initialize your Next.js project

```bash
cd my-next-app
xdn init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the XDN router.
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `@xdn/react` package - Provides a `Prefetch` component for prefetching pages
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

### Edit next.config.js

Add the `withXDN` and `withServiceWorker` plugins to `next.config.js`. If this file doesn't exist, create it in the root directory of your project folder, with the following content:

```js
// next.config.js

const { withXDN, withServiceWorker } = require('@xdn/next/config')

module.exports = withXDN(
  withServiceWorker({
    future: {
      webpack5: true, // Google's Workbox library requires webpack 5 when building on Next.js 10+
    },
  }),
)
```

The `withXDN` plugin ensures that your app is bundled properly for running on the XDN, and `withServiceWorker` provides a service worker based on `sw/service-worker.js`.

_If you're already using `next-offline`, you should remove it in favor of `withServiceWorker`, which itself uses `next-offline._

## Running Locally

To simulate your app within the XDN locally, run:

```bash
xdn dev
```

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```bash
xdn deploy
```

See [deploying](deploying) for more information.

## Prefetching

The `xdn init` command adds a service worker based on [Workbox](https://developers.google.com/web/tools/workbox) at `sw/service-worker.js`. If you have an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js` and simply add the following to your service worker:

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
          <Link as={product.url} href="/p/[productId]" passHref>
            <Prefetch>
              <a>
                <img src={product.thumbnail} />
              </a>
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
    <a>
      <img src={product.thumbnail} />
    </a>
  </Prefetch>
</Link>
```

Note that if you don't provide a `url` prop to `Prefetch`, you must specify the `passHref` prop on `Link` in order for the `Prefetch` component to know what URL to prefetch.

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
new Router().use(nextRoutes).fallback(({ proxy }) => proxy('legacy'))
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

### rewrites and redirects

The `nextRoutes` middleware automatically adds routes for [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) and [redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) specified in `next.config.js`. Redirects are served directly from the network edge to maximize performance.

### Explicit Routes

To render a specific page, use the `renderNextPage` function:

```js
const { Router } = require('@xdn/core/router')
const { renderNextPage, nextRoutes } = require('@xdn/next')

module.exports = new Router()
  .get('/some/vanity/url/:p', res => {
    renderNextPage('/p/[productId]', res, params => ({ productId: params.p }))
  })
  .use(nextRoutes)
```

The `renderNextPage` function takes the following parameters:

- nextRoute - `String` The next.js route path
- res - `ResponseWriter` The ResponseWriter passed to your route handler
- params - `Object|Function` An object containing query params to provide to the next page, or a function that takes the route's path params and the request and returns a params object.

### Rendering the 404 page

You can explicitly render the Next.js 404 page using `nextRoutes.render404(res)`:

```js
const { Router } = require('@xdn/core/router')
const { renderNextPage, nextRoutes } = require('@xdn/next')

module.exports = new Router()
  .get('/some/missing/page', res => {
    nextRoutes.render404(res)
  })
  .use(nextRoutes)
```

### Dynamic Fallback Route

Usually Next.js requires 404.js to be a static page. The XDN enables you to render a specific page when no other route is matched using `router.fallback`:

```js
const { Router } = require('@xdn/core/router')
const { renderNextPage, nextRoutes } = require('@xdn/next')

module.exports = new Router().use(nextRoutes).fallback(res => {
  renderNextPage('/not-found', res) // render pages/not-found.js, which can be dynamic (using getInitialProps or getServerSideProps)
})
```

### Caching

The easiest way to add edge caching to your Next.js app is to add caching routes before the middleware. For example,
imagine you have `/pages/p/[productId].js`. Here's how you can SSR responses as well as cache calls to `getServerSideProps`:

```js
new Router()
  // Products - SSR
  .get('/p/:productId', ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
    })
  })
  // Products - getServerSideProps
  .get('/_next/data/:version/p/:productId.json', ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
    })
  })
  .use(nextRoutes)
```

### Preventing Next.js pages from being cached by other CDNs

By default, Next.js adds a `cache-control: private, no-cache, no-store, must-revalidate` header to all responses from `getServerSideProps`. The presence of `private` would prevent the XDN from caching the response, so `nextRoutes` middleware from `@xdn/next` automatically removes the `private` portion of the header to enable caching at edge. If you want your responses to be private, you need to specify a `cache-control` header using the router:

```js
new Router().get('/my-private-page', ({ setResponseHeader }) => {
  setResponseHeader('cache-control', 'private, no-cache, no-store, must-revalidate')
})
```

Doing so will prevent other CDNs running in front of the XDN from caching the response.

## Building with Webpack 5

As of Next.js v10.0.6, Webpack 4 is still used by default. You can upgrade to Webpack 5 by making the following changes to your app:

### package.json

Add `"webpack": "^5.0.0"` to `resolutions`:

```js
"resolutions": {
  "webpack": "^5.0.0"
}
```

### next.config.js

Add the following to next.config.js:

```js
future: {
  webpack5: true,
}
```

Then run `yarn install` followed by `xdn build` to verify that your app builds successfully using Webpack 5.

Some additional notes:

- In order to use Webpack 5 you must use yarn to install dependencies. NPM does not support `resolutions` in package.json.
- Webpack 5 contains many breaking changes, so it is possible that you'll need to make additional changes to the webpack config via next.config.js to get your app to build successfully.
- You'll also see some deprecation warnings, like these, which are fine, as long as `xdn build` is successful:

```
(node:95329) [DEP_WEBPACK_SINGLE_ENTRY_PLUGIN] DeprecationWarning: SingleEntryPlugin was renamed to EntryPlugin
info  - Creating an optimized production build...
(node:95339) [DEP_WEBPACK_SINGLE_ENTRY_PLUGIN] DeprecationWarning: SingleEntryPlugin was renamed to EntryPlugin
> Creating service worker...
(node:95339) [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
        Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.
        Make sure to select an appropriate stage from Compilation.PROCESS_ASSETS_STAGE_*.
> Optimizing serverless functions (Webpack 5)
(node:95339) [DEP_WEBPACK_CHUNK_HAS_ENTRY_MODULE] DeprecationWarning: Chunk.hasEntryModule: Use new ChunkGraph API
```

# Next.js

This guide shows you how to deploy a Next.js application on {{ PRODUCT_NAME }}.

## Example SSR Site

This Next.js example app uses server-side rendering and prefetching to provide lightning-fast transitions between pages.

[Try the Next.js SSR Example Site](https://layer0-docs-layer0-nextjs-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/layer0-nextjs-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%253A%252F%252Fgithub.com%252Flayer0-docs%252Flayer0-nextjs-example)

## Next.js Commerce

For details on using the Next.js Commerce template with {{ PRODUCT_NAME }}, refer to our [Next.js Commerce Guide](next_commerce).

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-next-connector?button)

## Supported Features

{{ PRODUCT_NAME }} supports all of the most powerful features of Next.js 10, including:

- Localization
- Image Optimization
- `getStaticPaths` (including `fallback: (true|false|'blocking')`)
- `getStaticProps` (including `revalidate`)
- `getServerSideProps`
- `getInitialProps`

{{ SYSTEM_REQUIREMENTS }}

## Getting Started

### Create a Next.js Application

If you don't already have a Next.js application, you can create one using:

```bash
npm create next-app my-next-app
```

To prepare your Next.js application for deployment on {{ PRODUCT_NAME }}:

### Install the {{ PRODUCT_NAME }} CLI globally

```bash
npm install -g {{ PACKAGE_NAME }}/cli
```

When installing the {{ PRODUCT_NAME }} CLI globally in a virtual environment that has Node and NPM installed globally, you [may run into permission issues]({{ FORUM_URL }}/t/xdn-cli-npm-install-error/83). In that case, you can install the {{ PRODUCT_NAME }} CLI locally within your app using `npm i -D {{ PACKAGE_NAME }}/cli` and running commands using `./node_modules/{{ PACKAGE_NAME }}/cli` instead of `{{ CLI_NAME }}`.

If you run into permission issues while attempting to install the {{ PRODUCT_NAME }} CLI globally on your local development machine, these may be fixed by using [nvm](https://github.com/nvm-sh/nvm) to manage Node and NPM.

### Initialize your Next.js project

```bash
cd my-next-app
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}.
- The `{{ PACKAGE_NAME }}/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the {{ PRODUCT_NAME }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed.
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages.
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

## Next.js Config Plugins

If your project does not have a `next.config.js` file, one will automatically be added when you run `{{ CLI_NAME }} init`. Doing so adds two plugins:

- `with{{ PRODUCT_NAME }}` (required)
- `withServiceWorker` (optional)

If your project already has this config file, you need to add these plugins yourself.

```js
const { with{{ PRODUCT_NAME }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = with{{ PRODUCT_NAME }}(
  withServiceWorker({
    // Output source maps so that stack traces have original source filenames and line numbers when tailing
    // the logs in the {{ PRODUCT_NAME }} developer console.
    {{ CLI_NAME }}SourceMaps: true,
  })
)
```

### with{{ PRODUCT_NAME }}

The `with{{ PRODUCT_NAME }}` plugin optimizes the Next.js build for running on {{ PRODUCT_NAME }}. It is required to deploy your application on {{ PRODUCT_NAME }} and accepts the following parameters:

- `{{ CLI_NAME }}SourceMaps`: Defaults to `false`. Set to `true` to add server-side source maps so that stack traces have original source filenames and line numbers when tailing the logs in the {{ PRODUCT_NAME }} developer console. This will increase the serverless bundle size but will not affect performance. If you find that your app exceeds the maximum serverless bundle size allowed by {{ PRODUCT_NAME }}, you can disable this option to conserve space.

### withServiceWorker

The `withServiceWorker` plugin builds a service worker from `sw/service-worker.js` that prefetches and caches all static JS assets and enables {{ PRODUCT_NAME }}'s [prefetching](/guides/next#section_prefetching) functionality.

## Running Locally

To simulate your app within {{ PRODUCT_NAME }} locally, run:

```bash
{{ CLI_NAME }} dev
```

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project:

```bash
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

## Prefetching

The `{{ CLI_NAME }} init` command adds a service worker based on [Workbox](https://developers.google.com/web/tools/workbox) at `sw/service-worker.js`. If you have an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js` and simply add the following to your service worker:

```js
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'

new Prefetcher().route()
```

The code above allows you to prefetch pages from {{ PRODUCT_NAME }}'s edge cache to greatly improve browsing speed. To prefetch a page, add the `Prefetch` component from `{{ PACKAGE_NAME }}/react` to any Next `Link` element:

```js
import { Prefetch } from '{{ PACKAGE_NAME }}/react'
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

The `Prefetch` component fetches data for the linked page from {{ PRODUCT_NAME }}'s edge cache and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

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

Note that if you don't provide a `url` prop to `Prefetch`, you must specify the `passHref` prop on `Link` in order for the `Prefetch` component to know which URL to prefetch.

## Routing

{{ PRODUCT_NAME }} supports Next.js's built-in routing scheme for both page and API routes, including Next.js 9's clean dynamic routes. The default `routes.js` file created by `{{ CLI_NAME }} init` sends all requests to Next.js via a fallback route:

```js
// This file was automatically added by {{ CLI_NAME }} deploy.
// You should commit this file to source control.
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { nextRoutes } = require('{{ PACKAGE_NAME }}/next')

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

In the code above, the `nextRoutes` middleware adds all Next.js routes to the router based on the `/pages` directory. You can add additional routes before and after the middleware. For example, you can choose to send some URLs to an alternate backend. This is useful for gradually replacing an existing site with a new Next.js app.

A popular use case is to fallback to a legacy site for any route that your Next.js app isn't configured to handle:

```js
new Router().use(nextRoutes).fallback(({ proxy }) => proxy('legacy'))
```

To configure the legacy backend, use {{ CONFIG_FILE }}:

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

Using environment variables here allows you to configure different legacy domains for each {{ PRODUCT_NAME }} environment.

### rewrites and redirects

The `nextRoutes` middleware automatically adds routes for [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) and [redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) specified in `next.config.js`. Redirects are served directly from the network edge to maximize performance.

### Explicit Routes

To render a specific page, use the `renderNextPage` function:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { renderNextPage, nextRoutes } = require('{{ PACKAGE_NAME }}/next')

module.exports = new Router()
  .get('/some/vanity/url/:p', res => {
    renderNextPage('/p/[productId]', res, params => ({ productId: params.p }))
  })
  .use(nextRoutes)
```

The `renderNextPage` function takes the following parameters:

- nextRoute - `String` The Next.js route path
- res - `ResponseWriter` The ResponseWriter passed to your route handler
- params - `Object|Function` An object containing query params to provide to the next page, or a function that takes the route's path params and the request and returns a params object

### Rendering the 404 page

You can explicitly render the Next.js 404 page using `nextRoutes.render404(res)`:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { renderNextPage, nextRoutes } = require('{{ PACKAGE_NAME }}/next')

module.exports = new Router()
  .get('/some/missing/page', res => {
    nextRoutes.render404(res)
  })
  .use(nextRoutes)
```

### Dynamic Fallback Route

Usually Next.js requires 404.js to be a static page. {{ PRODUCT_NAME }} enables you to render a specific page when no other route is matched using `router.fallback`:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { renderNextPage, nextRoutes } = require('{{ PACKAGE_NAME }}/next')

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

By default, Next.js adds a `cache-control: private, no-cache, no-store, must-revalidate` header to all responses from `getServerSideProps`. The presence of `private` would prevent {{ PRODUCT_NAME }} from caching the response, so `nextRoutes` middleware from `{{ PACKAGE_NAME }}/next` automatically removes the `private` portion of the header to enable caching at the edge. If you want your responses to be private, you need to specify a `cache-control` header using the router:

```js
new Router().get('/my-private-page', ({ setResponseHeader }) => {
  setResponseHeader('cache-control', 'private, no-cache, no-store, must-revalidate')
})
```

Doing so will prevent other CDNs running in front of {{ PRODUCT_NAME }} from caching the response.

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

Add the following to `next.config.js`:

```js
future: {
  webpack5: true,
}
```

Then run `yarn install` followed by `{{ CLI_NAME }} build` to verify that your app builds successfully using Webpack 5.

Some additional notes:

- In order to use Webpack 5 you must use yarn to install dependencies. NPM does not support `resolutions` in package.json.
- Webpack 5 contains many breaking changes, so it is possible that you'll need to make additional changes to the webpack config via `next.config.js` to get your app to build successfully.
- You may run into this error: `UnhandledPromiseRejectionWarning: TypeError: dependency.getCondition is not a function`. You can fix this by adding `next-offline` as a dependency using `npm i -D next-offline` or `yarn add --dev next-offline`.
- You'll also see some deprecation warnings, like these, which are fine, as long as `{{ CLI_NAME }} build` is successful:

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

## Using next-i18next

The [next-i18next](https://github.com/isaachinman/next-i18next) package is a popular solution for adding localization to Next.js apps. It has some issues when running in serverless deployments, but you can work around these:

First, you need to _not_ use the default name for the `next-i18next.config.js` file. We recommend renaming it `i18next.config.js`. When you use the default name, next-i18next will try to load the config when the serverless function starts and since it is not bundled with the app, it will fail.

Then, you need to explicitly provide the config to `appWithTranslation` and `serverSideTranslations`.

So in your `pages/_app.js`:

```js
export default appWithTranslation(MyApp, require('../i18next.config')) // <~ need to explicitly pass the config here
```

and in your pages:

```js
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'], require('../i18next.config'))), // <~ need to explicitly pass the config here.
      // Will be passed to the page component as props
    },
  }
}
```

Make sure you also import the config correctly with the new name into your `next.config.js`:

```js
const { with{{ PRODUCT_NAME }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')
const { i18n } = require('./i18next.config')

module.exports = with{{ PRODUCT_NAME }}(
  withServiceWorker({
    // Output source maps so that stack traces have original source filenames and line numbers when tailing
    // the logs in the {{ PRODUCT_NAME }} developer console.
    {{ CLI_NAME }}SourceMaps: true,
    i18n,
  }),
)
```

Finally, you will need to update your `layer0.config.js` to (includeFiles)[/guides/layer0_config#section_includefiles] where the locale files are stored. Example using the default of `/public`:

```js
module.exports = {
  connector: '@layer0/next',
  includeFiles: {
    public: true,
  },
}
```

A working example app can be found [here](https://github.com/layer0-docs/layer0-next-i18n-example).

## Using experimental-serverless-trace

As of **v3.16.6**, Next.js apps built with layer0 will use the `experimental-serverless-trace` target by default. The serverless target does not support most modern Next.js features like preview mode, revalidate, fallback. For backwards compatibility reasons, the serverless target will still be supported.

At build time, layer0 will run a trace on your application code and find only the required modules needed to run your production application, then add those to the deployment bundle.

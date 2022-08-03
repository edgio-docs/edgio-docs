---
title: Next.js
---
This guide shows you how to deploy a [Next.js](https://nextjs.org/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Next.js SSR"
  siteUrl="https://layer0-docs-layer0-nextjs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-nextjs-example" 
  deployFromRepo />

## Next.js Commerce {/*nextjs-commerce*/}

For details on using the Next.js Commerce template with {{ PRODUCT }}, refer to our [Next.js Commerce Guide](next_commerce).

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-next-connector">
 View the Connector Code
</ButtonLink>

## Supported Versions {/*supported-versions*/}

{{ PRODUCT_NAME }} supports Next version 9 through 12.

## Supported Features {/*supported-features*/}

{{ PRODUCT_NAME }} supports all of the most powerful features of Next.js, including:

- SSG
- SSR
- ISG
- ISR
- Localization
- Image Optimization
- `getStaticPaths` (including `fallback: (true|false|'blocking')`)
- `getStaticProps` (including `revalidate`)
- `getServerSideProps`
- `getInitialProps`

{{ PREREQ }}

When installing the {{ PRODUCT }} CLI globally in a virtual environment that has Node and NPM installed globally, you [may run into permission issues]({{ FORUM_URL }}/t/xdn-cli-npm-install-error/83). In that case, you can install the {{ PRODUCT }} CLI locally within your app using `npm i -D {{ PACKAGE_NAME }}/cli` and running commands using `./node_modules/{{ PACKAGE_NAME }}/cli` instead of `{{ CLI_NAME }}`.

If you run into permission issues while attempting to install the {{ PRODUCT }} CLI globally on your local development machine, these may be fixed by using [nvm](https://github.com/nvm-sh/nvm) to manage Node and NPM.

## Getting Started {/*getting-started*/}

### Create a Next.js Application {/*create-a-nextjs-application*/}

If you don't already have a Next.js application, you can create one using:

```bash
npx create-next-app@latest
```

### Initializing your Project {/*initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
cd my-next-app
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application to {{ PRODUCT }}.
- The `{{ PACKAGE_NAME }}/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the {{ PRODUCT }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed.
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages.
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

## Next.js Config Plugins {/*nextjs-config-plugins*/}

If your project does not have a `next.config.js` file, one will automatically be added when you run `{{ CLI_NAME }} init`. Doing so adds two plugins:

- `with{{ PRODUCT_LEGACY }}` (required)
- `withServiceWorker` (optional)

If your project already has this config file, you need to add these plugins yourself.

```js
const { with{{ PRODUCT_LEGACY }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = with{{ PRODUCT_LEGACY }}(
  withServiceWorker({
    // Output source maps so that stack traces have original source filenames and line numbers when tailing
    // the logs in the {{ PRODUCT_NAME }} developer console.
    {{ FULL_CLI_NAME }}SourceMaps: true,
  })
)
```

### with{{ PRODUCT_LEGACY }} {/*withlayer0*/}

The `with{{ PRODUCT_LEGACY }}` plugin optimizes the Next.js build for running on {{ PRODUCT }}. It is required to deploy your application on {{ PRODUCT }} and accepts the following parameters:

- `{{ FULL_CLI_NAME }}SourceMaps`: Defaults to `false`. Set to `true` to add server-side source maps so that stack traces have original source filenames and line numbers when tailing the logs in the {{ PRODUCT_NAME }} developer console. This will increase the serverless bundle size but will not affect performance. If you find that your app exceeds the maximum serverless bundle size allowed by {{ PRODUCT_NAME }}, you can disable this option to conserve space.

<Callout type="warning">
  We noticed some performance issues related to sourcemaps being loaded in our Serverless infrastructure, which may result in 539 project timeout errors. In case you encounter such errors, please try again with sourcemaps disabled. This document will be updated once the problem is fully resolved.
</Callout>

### withServiceWorker {/*withserviceworker*/}

The `withServiceWorker` plugin builds a service worker from `sw/service-worker.js` that prefetches and caches all static JS assets and enables {{ PRODUCT }}'s [prefetching](/guides/next#section_prefetching) functionality.

## {{ PRODUCT_NAME }} Devtools {/*edgio-devtools*/}

By default, [Devtools](/guides/devtools) are enabled on production builds of Next.js with {{ PRODUCT }}. To disable devtools in production, add the `disableLayer0DevTools` flag:

```js
const { with{{ PRODUCT_LEGACY }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = with{{ PRODUCT_LEGACY }}(
  withServiceWorker({
    // Output source maps so that stack traces have original source filenames and line numbers when tailing
    // the logs in the {{ PRODUCT_NAME }} developer console.
    {{ FULL_CLI_NAME }}SourceMaps: true,
    // Don't include {{ PRODUCT_NAME }} Devtools in production
    // More on {{ PRODUCT_NAME }} Devtools at https://docs.layer0.co/guides/devtools
    disableLayer0DevTools: true,
  })
)
```

## Running Locally {/*running-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

## Prefetching {/*prefetching*/}

The `{{ CLI_NAME }} init` command adds a service worker based on [Workbox](https://developers.google.com/web/tools/workbox) at `sw/service-worker.js`. If you have an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js` and simply add the following to your service worker:

```js
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'

new Prefetcher().route()
```

## Adding the {{ PRODUCT_NAME }} Service Worker {/*adding-the-layer0-service-worker*/}

To add the {{ PRODUCT_NAME }} service worker to your app, call the `install` function from `{{ PACKAGE_NAME }}/prefetch/window` in a `useEffect` hook when the app first loads. For example, you can alter the `pages/_app.js` in your Next.js app as follows:

```js
// pages/_app.js
import { useEffect } from 'react'
import { install } from '{{ PACKAGE_NAME }}/prefetch/window'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      install()
    }
  }, [])
}
```

The code above allows you to prefetch pages from {{ PRODUCT }}'s edge cache to greatly improve browsing speed. To prefetch a page, add the `Prefetch` component from `{{ PACKAGE_NAME }}/react` to any Next `Link` element. The example below shows you how to prefetch JSON data from `getServerSideProps` or `getStaticProps` using the `createNextDataUrl` function from `{{ PACKAGE_NAME }}/next/client`.

```js
import { Prefetch } from '{{ PACKAGE_NAME }}/react'
import Link from 'next/link'
import { createNextDataURL } from '{{ PACKAGE_NAME }}/next/client'

export default function ProductListing({ products }) {
  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>
          <Link href={product.url} passHref>
            <Prefetch
              url={createNextDataURL({
                href: product.url,
                routeParams: {
                  // keys must match the param names in your next page routes
                  // So for example if your product page is /products/[productId].js:
                  productId: product.id,
                },
              })}
            >
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

The `Prefetch` component fetches data for the linked page from {{ PRODUCT }}'s edge cache and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

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

## Routing {/*routing*/}

{{ PRODUCT }} supports Next.js's built-in routing scheme for both page and API routes, including Next.js 9's clean dynamic routes. The default `routes.js` file created by `{{ CLI_NAME }} init` sends all requests to Next.js via a fallback route:

```js
// This file was automatically added by {{ CLI_NAME }} deploy.
// You should commit this file to source control.
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { nextRoutes } = require('{{ PACKAGE_NAME }}/next')

module.exports = new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  . noIndexPermalink()
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

### nextRoutes middleware {/*nextroutes-middleware*/}

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

Using environment variables here allows you to configure different legacy domains for each {{ PRODUCT }} environment.

### rewrites and redirects {/*rewrites-and-redirects*/}

The `nextRoutes` middleware automatically adds routes for [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) and [redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) specified in `next.config.js`. Redirects are served directly from the network edge to maximize performance.

### Explicit Routes {/*explicit-routes*/}

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

### Rendering the 404 page {/*rendering-the-404-page*/}

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

### Dynamic Fallback Route {/*dynamic-fallback-route*/}

Usually Next.js requires 404.js to be a static page. {{ PRODUCT }} enables you to render a specific page when no other route is matched using `router.fallback`:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { renderNextPage, nextRoutes } = require('{{ PACKAGE_NAME }}/next')

module.exports = new Router().use(nextRoutes).fallback(res => {
  renderNextPage('/not-found', res) // render pages/not-found.js, which can be dynamic (using getInitialProps or getServerSideProps)
})
```

### Caching {/*caching*/}

The easiest way to add edge caching to your Next.js app is to add caching routes before the middleware. For example,
imagine you have `/pages/p/[productId].js`. Here's how you can SSR responses as well as cache calls to `getServerSideProps`:

```js
new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  . noIndexPermalink()
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

### Preventing Next.js pages from being cached by other CDNs {/*preventing-nextjs-pages-from-being-cached-by-other-cdns*/}

By default, Next.js adds a `cache-control: private, no-cache, no-store, must-revalidate` header to all responses from `getServerSideProps`. The presence of `private` would prevent {{ PRODUCT_NAME }} from caching the response, so `nextRoutes` middleware from `{{ PACKAGE_NAME }}/next` automatically removes the `private` portion of the header to enable caching at the edge. If you want your responses to be private, you need to specify a `cache-control` header using the router:

```js
new Router().get('/my-private-page', ({ setResponseHeader }) => {
  setResponseHeader('cache-control', 'private, no-cache, no-store, must-revalidate')
})
```

Doing so will prevent other CDNs running in front of {{ PRODUCT_NAME }} from caching the response.

## Building with Webpack 5 {/*building-with-webpack-5*/}

As of Next.js v10.0.6, Webpack 4 is still used by default. You can upgrade to Webpack 5 by making the following changes to your app:

### package.json {/*packagejson*/}

Add `"webpack": "^5.0.0"` to `resolutions`:

```js
"resolutions": {
  "webpack": "^5.0.0"
}
```

### next.config.js {/*nextconfigjs*/}

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

## Using next-i18next {/*using-next-i18next*/}

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
const { with{{ PRODUCT_LEGACY }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')
const { i18n } = require('./i18next.config')

module.exports = with{{ PRODUCT_LEGACY }}(
  withServiceWorker({
    // Output source maps so that stack traces have original source filenames and line numbers when tailing
    // the logs in the {{ PRODUCT_NAME }} developer console.
    {{ FULL_CLI_NAME }}SourceMaps: true,
    i18n,
  }),
)
```

Finally, you will need to update your `{{ CONFIG_FILE }}` to [includeFiles](/guides/layer0_config#section_includefiles) where the locale files are stored. Example using the default of `/public`:

```js
module.exports = {
  connector: '{{ PACKAGE_NAME }}/next',
  includeFiles: {
    public: true,
  },
}
```

A working example app can be found [here](https://github.com/layer0-docs/layer0-next-i18n-example).

## Using experimental-serverless-trace {/*using-experimental-serverless-trace*/}

As of **v3.16.6**, Next.js apps built with {{ PRODUCT_NAME }} will use the `experimental-serverless-trace` target by default. The serverless target does not support most modern Next.js features like preview mode, revalidate, fallback. For backwards compatibility reasons, the serverless target will still be supported.

At build time, {{ PRODUCT_NAME }} will run a trace on your application code and find only the required modules needed to run your production application, then add those to the deployment bundle.

## Next.js version 12 and Next.js Middleware (BETA) {/*section_next_js_version_12_and_next_js_middleware__beta_*/}

As of Next.js version 12 the `serverless` and `experimental-serverless-trace` targets have been deprecated and no new features will be supported for these targets. This includes Next.js Middleware (beta) and React component streaming (alpha). The `{{ PACKAGE_NAME }}/next` connector has historically utilized the `serverless` and `experimental-serverless-trace` targets to create a suitable build output for a serverless runtime.

As of **v4.13.0** {{ PRODUCT_NAME }} packages, Next.js apps using Next.js versions 12 or higher can opt into using the default `server` target by explicitly setting `target: 'server'` in the `next.config.js` file. The `{{ PACKAGE_NAME }}/next` connector will then create a minimal server bundle with requests delegated to a Next.js server instance instead of rendering via serverless page functions. When opting into the `server` target you can use Next.js Middleware.

Future versions of {{ PRODUCT_NAME }} when using Next.js 12 or higher will utilize the `server` target by default.

### Next.js 12 with server target deprecations {/*nextjs-12-with-server-target-deprecations*/}

`NextRouter.render404` and `renderNextPage` with specifying a page to render are retired when using Next.js 12+ and the `server` target. Requests are delegated to a Next.js server instance which will handle determining which page to render based on the request. Prior use cases should now be achieved via using Next.js redirects and rewrites.

### Middleware caveats {/*middleware-caveats*/}

When using Next.js Middleware it should be noted that the middleware functions are only executed at the serverless layer, ie after edge cache. Middleware that you want to execute on each request needs to have caching disabled explicitly for the route that the middleware is configured to run for. Some Middleware use cases such as rewriting the request to another route would be fine to cache. These use cases need to be evaluated on a per route basis with caching enabled/disabled based on the desired result.

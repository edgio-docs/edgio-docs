# Spartacus for SAP Commerce Cloud (formerly SAP Hybris)

This guide shows you how to deploy [Spartacus](https://sap.github.io/spartacus-docs) apps on {{ PRODUCT_NAME }}.

[Try the Spartacus Example Site](https://layer0-docs-layer0-spartacus-example-default.layer0.link/?button)
[View the Code](https://github.com/{{ EXAMPLES_REPO }}/tree/main/layer0-spartacus-example?button)

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-spartacus-connector?button)

## Install Node.js and npm

**{{ PRODUCT_NAME }} only supports Node.js version {{ NODE_VERSION }}**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the {{ PRODUCT_NAME }} cloud. Therefore, we highly suggest using Node 12 for all development._

## Getting Started

If you don't already have a Spartacus application, you can create one using:

#### 1. Create a new Angular App

**Spartacus 2.x only supports Angular version 9.x**
**Spartacus 3.x only supports Angular version 10.x**

```bash
npm install -g @angular/cli@9
ng new my-layer0-spartacus-app
```

You should now have a working starter app. Run `ng serve` to see the application running on `localhost:4200`.

#### 2. Add Spartacus with SSR

To deploy your Spartacus application on {{ PRODUCT_NAME }} it needs to support server-side rendering (SSR). To add SSR support, run:

```bash
ng add @spartacus/schematics --ssr
```

Read more about server-side rendering in Spartacus [here](https://sap.github.io/spartacus-docs/server-side-rendering-in-spartacus/).

The previous command created:

- A server-side application module (`app.server.module.ts`)
- A bootstrapper for the server app (`main.server.ts`)
- `server.ts` which exports an Express app
- TypeScript configuration for the server (`tsconfig.server.json`)

You can now run `npm run build:ssr && npm run serve:ssr` to access your server-side rendered app at `localhost:4000`.

To prepare your Spartacus application for deployment on {{ PRODUCT_NAME }}:

#### 1. Install the {{ PRODUCT_NAME }} CLI globally:

```bash
npm install -g {{ PACKAGE_NAME }}/cli
```

2. Run the following in the root folder of your project. This will configure your project for {{ PRODUCT_NAME }}.

```bash
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/angular` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/spartacus` package
- The `{{ PACKAGE_NAME }}/prefetch` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT_NAME }}.
- `routes.js` - A default routes file that sends all requests to the Angular Universal server. Update this file to add caching or proxy some URLs to a different origin.
- The `sw` folder - Contains the files needed to build the service worker that that provides static asset and API prefetching.

#### 3. Update `{{ CONFIG_FILE }}`

For an app called `my-layer0-spartacus-app` the {{ PRODUCT_NAME }} config file created by `{{ CLI_NAME }} init` will look like so:

```js
// This file was automatically added by {{ CLI_NAME }} deploy.
// You should commit this file to source control.

module.exports = {
  backends: {
    commerce: {
      domainOrIp: 'api-commerce.my-site.com',
      hostHeader: 'api-commerce.my-site.com',
    },
  },
}
```

If you have several projects and the `defaultProject` as specified in `angular.json` is not the project with the SSR build, specify the correct project with the `ANGULAR_PROJECT` environment variable. For example: `ANGULAR_PROJECT=my-ssr-project {{ CLI_NAME }} build`.

#### 4. Update OCC `baseUrl` endpoint

The `baseUrl` should be updated to use the remote URL when `window` is not defined (i.e., for SSR), and the current host when `window` is defined. For example:

```js
baseUrl: typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.host}`
  : 'https://api-commerce.my-site.com'
```

This value is defined in the `backend` property of the options parameter to `B2cStorefrontModule.withConfig({})` in the `app.module.ts` file, but is best set using environment variables in the `environment.ts` and `environment.prod.ts` files.

## Adding prefetching

### Upstream request tracking

Prefetching for a Spartacus app can be enabled by listening to upstream requests made when server-side rendering a specific page. `{{ PACKAGE_NAME }}/prefetch` library will pick up on the upstream requests made by reading the `{{ HEADER_PREFIX }}-upstream-requests` response header. An example scenario:

1. User A lands on `/product/1`.
1. `/product/1` has not been cached in the edge and thus will be server-side rendered.
1. The rendering server has been modified to track upstream requests by patching `https.request`.
1. The rendering server sets `{{ HEADER_PREFIX }}-upstream-requests` to, for example: `/rest/v2/1;/rest/v2/2;`
1. The HTML response for `/product/1` is now cached and for future requests served from the edge along with the `{{ HEADER_PREFIX }}-upstream-requests` response header.
1. User B lands on a page that has a link to `/product/1`. `/product/:path*` has been configured with `cache.browser.spa: true`. Because of this configuration, `{{ PACKAGE_NAME }}/prefetch` will know to make a prefetch HEAD request for `/product/1`, and only if `product/1` can be served from the edge will it prefetch all requests specified in `{{ HEADER_PREFIX }}-upstream-requests` response header.
1. When User B click the link to `/product/1`, the navigation will be faster since the requests needed to render the new page will be in service worker cache.

Example implementation of upstream request tracking changes required in your `server.ts` file:

```diff
import 'zone.js/dist/zone-node'
import * as express from 'express'
import { join } from 'path'

+ // layer0
+ import * as http from 'http'
+ import * as https from 'https'
+ import createRenderCallback from '{{ PACKAGE_NAME }}/spartacus/server/createRenderCallback'
+ import installLayer0Middleware from '{{ PACKAGE_NAME }}/spartacus/server/installLayer0Middleware'


// Express server
const server = express()

+ installLayer0Middleware({ server, http, https });

const PORT = process.env.PORT || 4200
const DIST_FOLDER = join(process.cwd(), 'dist/<your-project-name>')

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap,
} = require('./dist/<your-project-name>-server/main')

server.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  }),
)

server.set('view engine', 'html')
server.set('views', DIST_FOLDER)

server.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  }),
)

// All regular routes use the Universal engine
server.get('*', (req, res) => {
  res.render(
    'index',
    { req },
+   createRenderCallback(res),
  )
})

export default server
```

### Service worker

The build command places the built `service-worker.js` under `dist` so `{{ PACKAGE_NAME }}/angular` will know to static serve the file.

Installing the service worker and any further prefetching will be handled by `{{ PACKAGE_NAME }}/prefetch` by invoking the `install` function imported from `{{ PACKAGE_NAME }}/prefetch/window/install`.

Example implementation in `app.component.ts`:

```diff
import { Component, OnInit, Inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'
+ import install from '{{ PACKAGE_NAME }}/prefetch/window/install'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isBrowser: boolean
  title = '<your-project-name>'

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit() {
+   setTimeout(() => {
+     if (this.isBrowser) {
+       install()
+     }
+   })
  }
}
```

To avoid Spartacus installing `ngsw-worker`, set `production: false` in `environment.prod.ts` as a temporary workaround:

```diff
pwa: {
- enabled: environment.production
+ enabled: false
},
```

You may also need to disable it in your `app.module.ts` file:

```diff
ServiceWorkerModule.register(
  'ngsw-worker.js',
  {
-   enabled: environment.production,
+   enabled: false
  }
),
```

Add `"skipLibCheck": true,` to `tsconfig.json` to avoid type errors from `workbox` library during build.

## Routing and Cache Configuration

The default `routes.js` file created by `{{ CLI_NAME }} init` sends all requests to Angular server via a fallback route.

```js
// This file was automatically added by {{ CLI_NAME }} deploy.
// You should commit this file to source control.

import { Router } from '{{ PACKAGE_NAME }}/core/router'
import { angularRoutes } from '{{ PACKAGE_NAME }}/angular'

export default new Router()
  // other routes removed
  .use(angularRoutes)
```

The default router also includes common cache configurations for most Spartacus apps:

```js
  return new Router()
    .match('/rest/v2/:path*', ({ cache, proxy }) => {
      cache({
        browser: {
          maxAgeSeconds: PAGE_TTL,
          serviceWorkerSeconds: PAGE_TTL,
        },
        edge: {
          maxAgeSeconds: PAGE_TTL,
          staleWhileRevalidateSeconds: PAGE_TTL,
        },
      })
      return proxy('commerce')
    })
    .match('/medias/:path*', ({ cache, proxy }) => {
      cache({
        browser: {
          maxAgeSeconds: FAR_FUTURE_TTL,
        },
        edge: {
          maxAgeSeconds: FAR_FUTURE_TTL,
          staleWhileRevalidateSeconds: 60 * 60 * 24,
        },
      })
      return proxy('commerce')
    })
    ...
}
```

These routes are set up to cache the default API endpoints from SAP Commerce Cloud, but should be configured to suit your application as needed.

Finally, to configure prefetching for your pages, configure the routes that use SSR using the `prefetchUpstreamRequests: true` flag for the `cache` function:

```js
const CACHE_SSR_PAGE = {
  prefetchUpstreamRequests: true,
  edge: {
    maxAgeSeconds: PAGE_TTL * 365,
    staleWhileRevalidateSeconds: PAGE_TTL * 365,
    forcePrivateCaching: true,
  },
}

return new Router()
  ...
  .get('/base-site-path/:path*', ({ cache }) => {
    cache(CACHE_SSR_PAGE)
  })
}
```

## Running Locally

To test your app locally, run:

```bash
{{ CLI_NAME }} run
```

You can do a production build of your app and test it locally using:

```bash
{{ CLI_NAME }} build && {{ CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the {{ PRODUCT_NAME }} cloud using serverless-offline.

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project:

```bash
{{ CLI_NAME }} deploy
```

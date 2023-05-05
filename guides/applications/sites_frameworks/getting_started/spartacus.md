---
title: Spartacus for SAP Commerce Cloud (formerly SAP Hybris)
---

This guide shows you how to deploy a [Spartacus](https://sap.github.io/spartacus-docs) application to {{ PRODUCT }}.

<ButtonLinksGroup>
  <ButtonLink variant="fill" type="default" href="https://edgio-community-examples-spartacus-live.layer0-limelight.link/">
    Try the Spartacus Example Site
    </ButtonLink>
  <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-spartacus-example">
   View the Code
  </ButtonLink>
  <ButtonLink variant="stroke" type="deploy" withIcon={true} href="{{ APP_URL }}/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Fedgio-docs%2Fedgio-spartacus-example" />
</ButtonLinksGroup>

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/applications/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-spartacus-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ }}


## Getting Started {/*getting-started*/}

If you don't already have a Spartacus application, you can create one using:

#### 1. Create a new Angular App {/*1-create-a-new-angular-app*/}

**Spartacus 2.x only supports Angular version 9.x**
**Spartacus 3.x only supports Angular version 10.x**

```bash
npm install -g @angular/cli@9
ng new my-{{ PRODUCT_NAME_LOWER }}-spartacus-app
```

You should now have a working starter app. Run `ng serve` to see the application running on `localhost:4200`.

#### 2. Add Spartacus with SSR {/*2-add-spartacus-with-ssr*/}

To deploy your Spartacus application on {{ PRODUCT }} it needs to support server-side rendering (SSR). To add SSR support, run:

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

#### 3. Initializing your Project {/*3-initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/angular` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/spartacus` package
- The `{{ PACKAGE_NAME }}/prefetch` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Angular Universal server. Update this file to add caching or proxy some URLs to a different origin.
- The `sw` folder - Contains the files needed to build the service worker that that provides static asset and API prefetching.

#### 4. Update `{{ CONFIG_FILE }}` {/*4-update-*/}

For an app called `my-{{ PRODUCT_NAME_LOWER }}-spartacus-app` the {{ PRODUCT }} config file created by `{{ FULL_CLI_NAME }} init` will look like so:

```js
// This file was automatically added by {{ FULL_CLI_NAME }} deploy.
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

If you have several projects and the `defaultProject` as specified in `angular.json` is not the project with the SSR build, specify the correct project with the `ANGULAR_PROJECT` environment variable. For example: `ANGULAR_PROJECT=my-ssr-project {{ FULL_CLI_NAME }} build`.

#### 5. Update OCC `baseUrl` endpoint {/*5-update-occ-baseurl-endpoint*/}

The `baseUrl` should be updated to use the remote URL when `window` is not defined (i.e., for SSR), and the current host when `window` is defined. For example:

```js
baseUrl: typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.host}`
  : 'https://api-commerce.my-site.com'
```

This value is defined in the `backend` property of the options parameter to `B2cStorefrontModule.withConfig({})` in the `app.module.ts` file, but is best set using environment variables in the `environment.ts` and `environment.prod.ts` files.

## Adding prefetching {/*adding-prefetching*/}

### Upstream request tracking {/*upstream-request-tracking*/}

Prefetching for a Spartacus app can be enabled by listening to upstream requests made when server-side rendering a specific page. `{{ PACKAGE_NAME }}/prefetch` library will pick up on the upstream requests made by reading the `{{ HEADER_PREFIX }}-upstream-requests` response header. An example scenario:

1. User A lands on `/product/1`.
1. `/product/1` has not been cached in the edge and thus will be server-side rendered.
1. The rendering server has been modified to track upstream requests by patching `https.request`.
1. The rendering server sets `{{ HEADER_PREFIX }}-upstream-requests` to, for example: `/rest/v2/1;/rest/v2/2;`
1. The HTML response for `/product/1` is now cached and for future requests served from the edge along with the `{{ HEADER_PREFIX }}-upstream-requests` response header.
1. User B lands on a page that has a link to `/product/1`. `/product/:path*` has been configured with `cache.browser.spa: true`. Because of this configuration, `{{ PACKAGE_NAME }}/prefetch` will know to make a prefetch HEAD request for `/product/1`, and only if `product/1` can be served from the edge will it prefetch all requests specified in `{{ HEADER_PREFIX }}-upstream-requests` response header.
1. When User B click the link to `/product/1`, the navigation will be faster since the requests needed to render the new page will be in service worker cache.

Example implementation of upstream request tracking changes required in your `server.ts` file:

```js ins="5-10,12,50"
import 'zone.js/dist/zone-node'
import * as express from 'express'
import { join } from 'path'

// {{ PRODUCT_NAME_LOWER }}
import * as http from 'http'
import * as https from 'https'
import createRenderCallback from '{{ PACKAGE_NAME }}/spartacus/server/createRenderCallback'
import install{{ PRODUCT }}Middleware from '{{ PACKAGE_NAME }}/spartacus/server/install{{ PRODUCT }}Middleware'

// Express server
const server = express()

install{{ PRODUCT }}Middleware({ server, http, https });

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
    createRenderCallback(res),
  )
})

export default server
```

### Fixing response header overflows {/*fixing-response-header-overflows*/}

Some CDNs, such as Akamai, impose low limits on the size of response headers. Prefetching works by listing all of the upstream API URLs fetched during SSR in
a `{{ HEADER_PREFIX }}-upstream-requests` response header. If your application makes many upstream requests for each page during SSR, this header can
be quite long and exceed the maximum length allowed by your CDN. To mitigate this, using the `maxHeaderLength` option when calling `createRenderCallback`:

```js
createRenderCallback(res, { maxHeaderLength: 500 })
```

### Service worker {/*service-worker*/}

The build command places the built `service-worker.js` under `dist` so `{{ PACKAGE_NAME }}/angular` will know to static serve the file.

Installing the service worker and any further prefetching will be handled by `{{ PACKAGE_NAME }}/prefetch` by invoking the `install` function imported from `{{ PACKAGE_NAME }}/prefetch/window/install`.

Example implementation in `app.component.ts`:

```js ins="4,20-24"
import { Component, OnInit, Inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'
import install from '{{ PACKAGE_NAME }}/prefetch/window/install'

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
    setTimeout(() => {
      if (this.isBrowser) {
        install()
      }
    })
  }
}
```

To avoid Spartacus installing `ngsw-worker`, set `production: false` in `environment.prod.ts` as a temporary workaround:

```js del="2" ins="3"
pwa: {
  enabled: environment.production
  enabled: false
},
```

You may also need to disable it in your `app.module.ts` file:

```js del="4" ins="5"
ServiceWorkerModule.register(
  'ngsw-worker.js',
  {
    enabled: environment.production,
    enabled: false
  }
),
```

Add `"skipLibCheck": true,` to `tsconfig.json` to avoid type errors from `workbox` library during build.

## Routing and Cache Configuration {/*routing-and-cache-configuration*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Angular server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

import { Router } from '{{ PACKAGE_NAME }}/core/router'
import { angularRoutes } from '{{ PACKAGE_NAME }}/angular'

export default new Router().use(angularRoutes)
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

## Running Locally {/*running-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} run
```

You can do a production build of your app and test it locally using:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the {{ PRODUCT }} cloud using serverless-offline.

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

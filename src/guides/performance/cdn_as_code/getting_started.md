---
title: Getting Started with CDN-As-Code
---

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "==": [
          {
            "request": "path"
          },
          "/api/:path*"
        ]
      },
      {
        "caching": {
          "max_age": "86400s",
          "stale_while_revalidate": "3600s",
          "service_worker_max_age": 86400,
          "bypass_client_cache": true
        },
        "headers": {
          "set_response_headers": {
            "x-sw-cache-control": "max-age=86400"
          }
        },
        "origin": {
          "set_origin": "origin"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

Our CDN-as-code approach to configuration allows you to configure CDN behavior using {{ EDGEJS_LABEL }} within a file ({{ ROUTES_FILE }}) stored alongside your code. This allows you to leverage the power of source control for collaboration and to link your CDN configurations with specific versions of your web application. 

## Quick Start

Get started with CDN-as-code by performing these steps:

1.  Create a property. If you have already performed this step, proceed to the next step.

    [Learn more.](/guides/getting_started)

    <Callout type="tip">

      Alternatively, you may experiment with our [sample websites](#example) by deploying them to {{ PRODUCT }}.

    </Callout>

2.  Use the {{ PRODUCT }} CLI to initialize your property. If you have already performed this step, proceed to the next step.

    <Callout type="info">

      This step requires [Node.js v{{ NODE_VERSION }}](/guides/install_nodejs). 

    </Callout>

    Install the {{ PRODUCT }} CLI, initialize your property, and then deploy it by running the following command from the root directory of your web application or website:

    ```bash
    npx {{ PACKAGE_NAME }}/cli@latest init \
      --name <PROPERTY> \
      --api-url https://api.edgio.app \
      --deploy
    ```

    Replace `<PROPERTY>` with the name of the property defined in step 1. You should only use lower-case characters and replace spaces with dashes (e.g., `my-property`). 

3.  [Define routes](#routes) that determine how {{ PRODUCT }} will handle that traffic.

4.  [Test your changes locally.](#deploy-locally)

5.  [Deploy your property](#deploy-to) to the {{ PRODUCT }} network.

## Routes.js|ts File {/*routes-js-ts*/}

The {{ ROUTES_FILE }} file defines a set of routes. A route:

-   Identifies a set of requests by HTTP method, URL path, query string parameters, cookies, and request headers. 
-   Determines how our CDN will handle the above requests. For example, you may configure those requests to be cached, prefetched, passed through without modification, or served as static content.

<Callout type = "info">

  By default, our CLI automatically creates `routes.js` and `{{ CONFIG_FILE }}` upon initializing a property (`{{ FULL_CLI_NAME }} init`). If your web application supports TypeScript and it uses a framework for which we have a TypeScript implementation, then our CLI will create `routes.ts` instead of `routes.js`. 

</Callout>

### Default Route Configuration {/*default-route-configuration*/}

By default, your {{ ROUTES_FILE }} contains the following configuration:

```js filename="./routes.js"
// This file was added by edgio init.
// You should commit this file to source control.

import { Router, edgioRoutes } from '@edgio/core'

// const ONE_HOUR = 60 * 60
// const ONE_DAY = 24 * ONE_HOUR

export default new Router()

  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  .match('/api/:path*', ({ proxy, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
        staleWhileRevalidateSeconds: ONE_HOUR,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
      },
    })
    proxy('origin')
  })

  // send any request to origin
  .match('/:path*', ({ proxy }) => proxy('origin'))
  // plugin enabling basic Edgio functionality
  .use(edgioRoutes)
```

The above configuration proxies all requests that do not match a route to the `origin` backend. Additionally, it does not define a route, since the only `match()` method has been commented-out. This means that all requests will be proxied to the `origin` backend.

<Callout type="info">

  A backend identifies a domain or IP address to which {{ PRODUCT }} may proxy requests. In this case, the `origin` backend was defined when you initialized this property using the `edgio init` command. 
<br /> 

  Add, modify, and remove backends by editing the [{{ CONFIG_FILE }} file](/guides/basics/edgio_config).

</Callout>

### Routes {/*routes*/}

A route identifies a set of requests through any combination of URL path, HTTP method, cookies, request headers, and query string parameters. The following routes show various ways for identifying requests. 

-   Match all requests:

    ```js
    .match('/:path*', () => { 
      // route handler goes here
    })
    ```

-   Match all `GET` requests whose URL path starts with `/marketing/images/`:

    ```js
    .get('/marketing/images/:path*', () => { 
      // route handler goes here
    })
    ```
-   Match all `GET` and `POST` requests whose URL path starts with `/marketing/images/` and contain the `sport` request header set to `basketball`:

    ```js
    .match(
      {
        path: '/marketing/images/:path*', 
        method: /GET|POST/i, // regular expression
        headers: { 'sport': /^basketball$/i }, // keys are header names; values are regular expressions
      },
      () => {
      // route handler goes here
    })
    ```

Once you have identified a set of requests, you need to define how {{ PRODUCT }} will handle those requests. The following routes show various ways in which requests can be processed.

-   Apply a caching policy to all requests and proxy cache misses to the `origin` backend:
    ```js
    .match('/:path*', ({ proxy, cache }) => {
      cache({
        edge: {
          maxAgeSeconds: 3600
        }
      })
      proxy('origin')
    })
    ```
-   Set the `images` response header and proxy cache misses to the `origin` backend for all GET requests whose URL path starts with `/marketing/images/`:
    ```js
    .get('/marketing/images/:path*', ({ setResponseHeader, proxy }) => { 
      setResponseHeader('images', 'true')
      proxy('origin')
    })
    ```

[View additional examples.](/guides/performance/cdn_as_code/common_routing_patterns)

### Defining Routes {/*defining-a-route*/}

We will now define a route by uncommenting the constants and the `match()` method in your {{ ROUTES_FILE }} file. It should now look similar to the following configuration:

```js filename="./routes.js" highlight={3-4,9-21}
import { Router } from '@edgio/core/router'

 const ONE_HOUR = 60 * 60
 const ONE_DAY = 24 * ONE_HOUR

export default new Router()
  
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
   .match('/api/:path*', ({ proxy, cache }) => {
     cache({
       edge: {
         maxAgeSeconds: ONE_DAY,
         staleWhileRevalidateSeconds: ONE_HOUR,
       },
       browser: {
         maxAgeSeconds: 0,
         serviceWorkerSeconds: ONE_DAY,
       },
     })
     proxy('origin')
   })

  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))
```

<a id="caching-policy" /> 

The above route matches all requests that start with `/api/` and instructs {{ PRODUCT }} to:

-   Cache those requests on our network for one day.
-   Allow us to serve stale content for one hour.
-   Instruct the browser to treat the response as immediately stale. 
-   Allow prefetched requests to be served from cache for one day.
-   Proxy those requests to your `origin` backend when we cannot serve them from cache.

You can use constants to apply this same caching policy to various routes. Define a `CACHE_ASSETS` constant and set it to the `cache` object defined in the above route.

```js filename="./routes.js" highlight={5-14}

import { Router } from '@edgio/core/router'

 const ONE_HOUR = 60 * 60
 const ONE_DAY = 24 * ONE_HOUR
 const CACHE_ASSETS = {
   edge: {
     maxAgeSeconds: ONE_DAY,
     staleWhileRevalidateSeconds: ONE_HOUR,
   },
   browser: {
     maxAgeSeconds: 0,
     serviceWorkerSeconds: ONE_DAY,
   },
 }
...
```

Update the `/api/` route to use the `CACHE_ASSETS` constant.

```js filename="./routes.js"
...
   .match('/api/:path*', ({ proxy, cache }) => {
     cache(CACHE_ASSETS)
     proxy('origin')
   })
...
```

We will now add a route that applies the same caching policy to all JavaScript (i.e., `.js` and `.mjs`) and CSS files. 

```js filename="./routes.js"
... 
  // Cache stylesheets and scripts, but prevent browser caching
  .match(
    '/:path*/:file.:ext(js|mjs|css)',
    ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => {
      setResponseHeader('cache-control', 'public, max-age=86400')
      removeUpstreamResponseHeader('set-cookie')
      cache(CACHE_ASSETS)
      proxy('origin')
    }
  )
...
```

The above route instructs {{ PRODUCT }} to perform the following actions for all requests whose file extension matches `js`, `mjs`, or `css`:

-   Set the `cache-control` response header to: `cache-control: public, max-age=86400`
-   Remove the `set-cookie` response header. {{ PRODUCT }} will not cache a response when the `set-cookie` response header is present.
-   Apply the [caching policy](#caching-policy) defined by the `CACHE_ASSETS` constant. 
-   Proxy these requests to your `origin` backend when we cannot serve them from cache.

Your {{ ROUTES_FILE }} should now look similar to the following:

```js filename="./routes.js"
import { Router } from '@edgio/core/router'

 const ONE_HOUR = 60 * 60
 const ONE_DAY = 24 * ONE_HOUR
 const CACHE_ASSETS = {
   edge: {
     maxAgeSeconds: ONE_DAY,
     staleWhileRevalidateSeconds: ONE_HOUR,
   },
   browser: {
     maxAgeSeconds: 0,
     serviceWorkerSeconds: ONE_DAY,
   },
 }

export default new Router() 

  // Here is an example where we cache api/* at the edge but prevent caching in the browser
   .match('/api/:path*', ({ proxy, cache }) => {
     cache(CACHE_ASSETS)
     proxy('origin')
   })
    
  // Cache stylesheets and scripts, but prevent browser caching
  .match(
    '/:path*/:file.:ext(js|mjs|css)',
    ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => { 
      setResponseHeader('cache-control', 'public, max-age=86400')
      removeUpstreamResponseHeader('set-cookie')
      cache(CACHE_ASSETS)
      proxy('origin')
    }
  ) 
    
  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))
```

The final line in your {{ ROUTES_FILE }} defines a `fallback()` method that proxies all requests that do not match a route to your `origin` backend.

## Testing Locally {/*deploy-locally*/}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by allowing you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ FULL_CLI_NAME }} dev`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

## Deploying Your Property {/*deploy-to*/}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Assess performance and caching behavior from the {{ PORTAL_LINK }}. Fine-tune your configuration by adding routes and then redeploying your property. Once you are ready to serve production traffic through {{ PRODUCT }}, update your site's DNS to point to our service.

[Learn more.](/guides/production)

## Examples {/*example*/}

Use our sample websites to gain hands-on experience on how to set up {{ PRODUCT }} {{ PRODUCT_EDGE }}. Specifically, you can browse our sample websites, view their source code, and even experiment on them by deploying them to {{ PRODUCT }}.

**Simple Example**

This example demonstrates a basic {{ PRODUCT }} configuration for `publicdomainreview.org`. It contains two routes that cache content according to their file extension.

<ExampleButtons
  title="Simple"
  siteUrl="https://edgio-community-examples-simple-performance-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-simple-performance-example/"
  deployFromRepo />

**Full-Featured Example**

This example demonstrates a full-featured {{ PRODUCT }} configuration that showcases the following functionality:

-   [Proxying requests](/guides/performance/cdn_as_code/common_routing_patterns#proxying-an-origin) to multiple origins
-   Increasing the cache buffer during revalidation through [StaleWhileRevalidate](/guides/performance/caching#achieving-100-cache-hit-rates)
-   [Prerendering](/guides/performance/static_prerendering) pages and caching them to improve performance.
-   Instructing the browser to [prefetch](/guides/performance/prefetching) and [deep fetch](/guides/performance/prefetching#deep-fetching) cached content to improve performance.

    <Callout type="info">

      Prefetching only improves performance for cached content. {{ PRODUCT }} returns `412 Precondition Failed` when prefetching a cache miss. This status code means that the prefetching did not occur for that request. 

    </Callout>

-   [Transforming and optimizing images](/guides/performance/image_optimization)
-   Transforming the response through [Serverless Compute](/guides/performance/serverless_compute)
-   [Removing response headers](/guides/performance/cdn_as_code#alter-requests-and-responses)
-   [Normalizing the cache key](/guides/performance/caching#customizing-the-cache-key)
-   Generating performance insights through [DevTools](/guides/performance/observability/devtools)
-   Tracking [Core Web Vitals](/guides/performance/observability/core_web_vitals) through real user monitoring (RUM).

<ExampleButtons
  title="Full-Featured"
  siteUrl="https://edgio-community-examples-full-featured-performance-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-full-featured-performance-example/"
  deployFromRepo />

## Issues? {/*issues*/}

If you have any issues during this process, check our [forums]({{ FORUM_URL }}) for assistance.

---
title: Getting Started with {{ PRODUCT_EDGE }}
---

Get started with {{ PRODUCT_EDGE }} by:

1.  Creating and deploying a property to {{ PRODUCT }}.

    [Learn more.](/guides/getting_started)

    <Callout type="tip">

      Alternatively, you may deploy our [sample site](#example).

    </Callout>

2.  Use our CDN-as-code approach to configuration to:

    -   Define routes.
    -   Set up edge caching.

3.  Deploy your updated property to {{ PRODUCT }}.

4.  Serve production traffic over {{ PRODUCT }} by updating your site's DNS to point to our service.

    [Learn more.](/guides/production)

Deploying your web application behind {{ PRODUCT }} optimizes the delivery of your site. As illustrated below, requests for your site will pass through {{ PRODUCT }}'s globally distributed edge network to your origin server.

![traffic](/images/starter/traffic.png)

## CDN-As-Code {/*cdn-as-code*/}

Our CDN-as-code approach to configuration allows you to configure CDN behavior using {{ EDGEJS_LABEL }} within a file ({{ ROUTES_FILE }}) stored alongside your code. This allows you to leverage the power of source control for collaboration and to link your CDN configurations with specific versions of your web application. 

The {{ ROUTES_FILE }} file defines a set of routes. A route:

-   Identifies a set of requests by HTTP method, URL path, query string parameters, cookies, and request headers. 
-   Determines how our CDN will handle the above requests. For example, you may configure those requests to be cached, prefetched, passed through without modification, or served as static content.

<Callout type = "info">

  By default, our {{ PRODUCT }} CLI automatically creates `routes.js` and `{{ CONFIG_FILE }}` upon initializing a property (`{{ FULL_CLI_NAME }} init`). If our CLI detects that your web application supports TypeScript, then it will create `routes.ts` instead of `routes.js`. 

</Callout>

## Default Route Configuration  {/*default-route-configuration*/}

By default, your {{ ROUTES_FILE }} will contain the following configuration:

```js filename="./routes.js"
import { Router } from '@edgio/core/router'

// const ONE_HOUR = 60 * 60
// const ONE_DAY = 24 * ONE_HOUR

export default new Router()

  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  // .match('/api/:path*', ({ proxy, cache }) => {
  //   cache({
  //     edge: {
  //       maxAgeSeconds: ONE_DAY,
  //       staleWhileRevalidateSeconds: ONE_HOUR,
  //     },
  //     browser: {
  //       maxAgeSeconds: 0,
  //       serviceWorkerSeconds: ONE_DAY,
  //     },
  //   })
  //   proxy('origin')
  // })

  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))
```

The above configuration proxies all requests that do not match a route to the `origin` backend. In this case, a route has not been defined since the `match()` method  has been commented out. This means that all requests will be proxied to the `origin` backend. 

<Callout type="info">

  Define backends within the [`{{ CONFIG_FILE }}` file](/guides/basics/edgio_config).

</Callout>

## Defining a Route {/*defining-a-route*/}

You may define a route by any combination of URL path, HTTP method, cookies, request headers, and query string parameters. Here are a few sample routes:

-   Match all requests whose URL path starts with `/marketing/images`:

    ```js
    .match('/marketing/images/:path*', () => { })
    ```

-   Match all GET requests whose URL path starts with `/marketing/images`:

    ```js
    .get('/marketing/images/:path*', () => { }))
    ```
-   Match all GET and POST requests whose URL path starts with `/marketing/images` and contain the `sport` request header set to `basketball`:

    ```js
    router.match(
      {
        path: '/marketing/images/:path*', 
        method: /GET|POST/i, // regular expression
        headers: { 'sport': /^basketball$/i }, // keys are header names; values are regular expressions
      },
      () => {})
    ```

In this case, we will define a route by uncommenting the constants and the `match()` method in your {{ ROUTES_FILE }} file. It should now look similar to the following configuration:

```js filename="./routes.js"
import { Router } from '@edgio/core/router'

+ const ONE_HOUR = 60 * 60
+ const ONE_DAY = 24 * ONE_HOUR

export default new Router()
  
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  + .match('/api/:path*', ({ proxy, cache }) => {
  +   cache({
  +     edge: {
  +       maxAgeSeconds: ONE_DAY,
  +       staleWhileRevalidateSeconds: ONE_HOUR,
  +     },
  +     browser: {
  +       maxAgeSeconds: 0,
  +       serviceWorkerSeconds: ONE_DAY,
  +     },
  +   })
  +   proxy('origin')
  + })

  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))
```

The newly uncommented route caches all requests that start with `/api/` and proxies those requests to your `origin` backend when we cannot serve them from cache. The `failback()` method proxies all other requests to your `origin` backend.
 
#### Cache Constants {/*cache-constants*/}
Cache constants in the {{ ROUTES_FILE }} have been abstracted out to enable reuse across different routes. You may add additional constants.

```js filename="./routes.js"
import { Router } from '{{ PACKAGE_NAME }}/core/router'

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY
// ...
```

Learn more about:
-   [CDN-as-code](/guides/performance/cdn_as_code)
-   [Caching](/guides/performance/caching)
-   [Predictive Prefetching](/guides/performance/prefetching)

## Deploy Locally {/*deploy-locally*/}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by allowing you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ FULL_CLI_NAME }} dev`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

## Deploy to {{ PRODUCT }} {/*deploy-to*/}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Assess performance and caching behavior from the {{ PORTAL }}. Fine-tune your configuration by adding routes and then redeploying your property.

## Example {/*example*/}

We provide links to a sample site and its source code below. You may also start experimenting with that site by clicking **Deploy to {{ PRODUCT }}**.

<ExampleButtons
  title="Web CDN"
  siteUrl="https://layer0-docs-cdn-starter-template-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-cdn-example"
  deployFromRepo />

## Issues? {/*issues*/}

If you have any issues during this process, check our [forums]({{ FORUM_URL }}) for assistance.

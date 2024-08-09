---
title: Route Features
---

Route features identify actions that will be applied to a request. Popular features include:

- **Caching**: Customizes when and how content is cached.
- **Headers**: Adds, modifies, or deletes headers from the request or response.
- **Origin**: Controls how the CDN communicates with an origin server.
- **Response**: Customizes the response sent to the client and determines whether we will allow prefetching instructions to be sent to the client.
- **Set Variables**: Assigns a value to one or more user-defined variable(s) that are passed to your bespoke traffic processing solution.
- **URL**: Redirects or rewrites requests to a different URL.

See [Features Reference](/applications/performance/rules/features) for a complete list of features and their behavior.

## Defining Route Features {/* defining-route-features */}

As outlined in the [Route Features](/applications/performance/cdn_as_code#route-features) section of the CDN-as-Code guide:

- Route features are defined as the second argument to the `Router` method being called in the `routes.js` file, such as `.match()`, `.get()`, `.post()`, etc.
- May also be defined in [conditional routes](/applications/performance/cdn_as_code/route_criteria#conditional-routes) such as `.if()`, `.elseif()`, etc.

The argument is an object that supports features outlined in the [Features Reference](/applications/performance/rules/features). The following example shows how to define a route feature that proxies a request to the origin host and caches it for 1 hour:

```js
router.match('/:path*', {
  caching: {
    max_age: '1h',
  },
  origin: {
    set_origin: 'origin',
  },
});
```

Route features are often defined using object notation, but in some cases, it may be necessary to use [RouteHelper](/docs/api/core/classes/router_RouteHelper.default.html) methods to define features. Some functionality such as [transforming requests/responses](#transforming-requests-responses) or [serving static files](#serving-a-static-file) requires the use of `RouteHelper` methods.

{{ routehelper_usage.md }}

When you're mixing usage of object notation and `RouteHelper` methods, the `addFeatures()` function allows you to seamlessly integrate features defined in object notation directly within `RouteHelper` instance. The examples below illustrate the two notation styles, and then show how to combine them:

```js
// Using different notation styles
router
  // Define caching using object notation
  .get('/some-path', {
    caching: {
      max_age: '1h',
    },
  })

  // Serve a static file using a RouteHelper method
  .get('/some-path', ({serveStatic}) => {
    serveStatic('public/some-path.html');
  });

/* or */

// Combining notation styles
router.get('/some-path', ({addFeatures, serveStatic}) => {
  // Use `addFeatures` RouteHelper method to define caching using object notation
  addFeatures({
    caching: {
      max_age: '1h',
    },
  });

  // Use `serveStatic` RouteHelper method to serve a static file
  serveStatic('public/some-path.html');
});
```

While both of these examples are functionally equivalent, the second example is more flexible because it allows you to define a single route using both notation styles for different features.

## Caching {/* caching */}

Add caching to a route using the [`caching`](/docs/api/core/interfaces/types.Caching.html) feature:

```js
router.get('/some/path', {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '',
    service_worker_max_age: '1h',
    bypass_client_cache: true,
  },
  headers: {
    set_response_headers: {
      'x-sw-cache-control': 'max-age=3600',
    },
  },
});
```

### Customizing the Cache Key {/* customizing-the-cache-key */}

A [cache key](/applications/performance/caching/cache_key) is automatically generated for each request, but if your web application relies on query string parameter(s), request header(s), or cookie(s) when generating a response, then you should customize the cache key to include those elements. You can customize the cache key using the [`cache_key`](docs/api/core/interfaces/types.Caching.html#cache_key) feature:

```js
router.get('/some/path', {
  caching: {
    max_age: '1d',
    cache_key: {
      // query string options are mutually exclusive; only one can be used for the cache key.
      exclude_all_query_params: boolean,
      include_all_query_params: boolean,
      include_all_query_params_except: ['session_id', 'utm_source'],
      include_query_params: ['page', 'filters'],

      include_headers: ['x-my-header'],
      include_cookies: ['x-my-cookie', 'language', 'currency'],
    },
  },
});
```

## Debug Cache Headers {/* debug-cache-headers */}

The debug cache response headers provide additional information about the cache policy applied to the requested asset. [Learn more.](/applications/performance/response#requesting-debug-cache-information)

To enable debug mode, you need to set the [`debug_header` feature](/applications/performance/rules/features#debug-header). In your `routes.js` file, add the following:

```js
import {Router, edgioRoutes} from '@edgio/core/router';

export default new Router().use(edgioRoutes).get('/some-path', {
  /* ... */
});
```

Including `edgioRoutes` in your router will automatically enable the debug feature for all routes. You can also enable debug mode for a specific route by adding the `debug_header` feature to the route:

```js
router.match('/some-path', {
  headers: {
    debug_header: true,
  },
  /* ... */
});
```

To see the debug headers in the response, you will need to specify the `x-ec-debug` header in your request. This request header should list the values of the debug headers you want to see in the response as defined under [Requesting Debug Cache Information](/applications/performance/response#requesting-debug-cache-information).

For example, you can use the [`{{ CLI_CMD(curl) }}`](/applications/performance/cdn_as_code/cli#curl) command to request the `x-ec-cache` and `x-ec-cache-state` headers:

```bash
{{ CLI_CMD(curl) }} https://your-site.com/some-path -H "x-ec-debug:x-ec-cache,x-ec-cache-state"
```

See an example of the response headers using our Simple Performance example site:

```bash
# with {{ CLI_CMD(curl) }}
{{ CLI_CMD(curl) }} https://edgio-community-examples-v7-simple-performance-live.edgio.link/ -H "x-ec-debug:x-ec-cache,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state,x-ec-cache-remote"

# with curl
curl -I -H "x-ec-debug: x-ec-cache,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state,x-ec-cache-remote" https://edgio-community-examples-v7-simple-performance-live.edgio.link/

```

In the following output, you will see the debug headers that were available in the response:

```diff
➜  ~ {{ CLI_CMD(curl) }} https://edgio-community-examples-v7-simple-performance-live.edgio.link/ -H "x-ec-debug:x-ec-cache,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state,x-ec-cache-remote"

URL :  https://edgio-community-examples-v7-simple-performance-live.edgio.link/ 🔗
From:  192.168.50.150:51204 🖥️
To  :  64.12.0.33:443 🌎

HTTP/2 200
Response Headers
  accept-ranges: bytes
  cache-control: public, max-age=0, must-revalidate
  content-length: 417115
  content-type: text/html; charset=UTF-8
  date: Wed, 31 May 2023 14:50:30 GMT
  etag: "665423646ec1a20bb8e43f8a71a132ba-ssl"
  last-modified: Wed, 31 May 2023 14:36:48 GMT
  server: Netlify
  server-timing: edgio_cache;desc=TCP_EXPIRED_HIT,edgio_pop;desc=dcd,edgio_country;desc=US
  strict-transport-security: max-age=31536000
+  x-ec-cache: TCP_EXPIRED_HIT from ECAcc (dcd/7D26)
+  x-ec-cache-key: //http/801B1A5C/origin/53/:/hs-4718288209145817659
+  x-ec-cache-state: max-age=0 (0s); must-revalidate; cache-ts=1685544630 (Wed, 31 May 2023 14:50:30 GMT); cache-age=0 (0s); remaining-ttl=0 (0s); expires-delta=none
+  x-ec-check-cacheable: YES
  x-edg-mr: 7:3;
  x-edg-version: 53 7 4 7.0.7 2023-05-31T14:32:16Z be36ceec-4cfd-4d56-aa41-ced08cd5352c
  x-nf-request-id: 01H1S4KY3H6QM7BZ0MRJC2C3MQ


   DNS Lookup   TCP Connection   TLS Handshake   Server Processing   Content Transfer
[     5ms     |      204ms     |     69ms      |       87ms        |       85ms       ]
              |                |               |                   |                  |
    namelookup:5ms             |               |                   |                  |
                        connect:209ms          |                   |                  |
                                    pretransfer:278ms              |                  |
                                                      starttransfer:365ms             |
                                                                                  total:450ms

Response Body
  Disabled. To enable use EDGIO_CURL_SAVE_BODY=true or EDGIO_CURL_SHOW_BODY=true

➜  ~
```

## Proxying an Origin {/* proxying-an-origin */}

### Same Path {/* same-path */}

To forward a request to the same path on one of the origins listed in `{{ CONFIG_FILE }}`, use the `origin` feature:

```js
router.get('/some-path', {
  origin: {
    set_origin: 'origin',
  },
});
```

The value of `set_origin` corresponds to the `name` property of an origin in `{{ CONFIG_FILE }}`. For example:

```js
module.exports = {
  // ... other configurations

  origins: [
    {
      name: 'origin',
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'www.my-site.com',
        },
      ],
    },
  ],
};
```

### Different Path {/* different-path */}

To forward the request to a different path, use the `url.url_rewrite` feature:

```js
router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  url: {
    url_rewrite: [
      {
        source: '/products/:productId',
        syntax: 'path-to-regexp',
        destination: '/p/:productId',
      },
    ],
  },
});
```

### Adding Caching {/* adding-caching */}

To cache proxied requests at the edge, use the `caching` feature:

```js
router.get('/products/:productId', {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1h',
  },
  origin: {
    set_origin: 'origin',
  },
});
```

### Altering the Request {/* altering-the-request */}

You can alter request headers when forwarding a request to a backend:

```js
router.get('/products/:productId', {
  headers: {
    set_request_headers: {
      'header-name': 'some-value',
    },
  },
  origin: {
    set_origin: 'origin',
  },
});
```

The above example makes use of the `headers.set_request_headers` feature.

### Altering the Response {/* altering-the-response */}

You can also alter the response before and after the cache:

```js
router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  headers: {
    // remove `header-name` from the origin response
    remove_origin_response_headers: ['header-name'],

    // add `header-name` to the response, appending the value to the
    // header if it already exists
    add_response_headers: {
      'header-name': 'some-value',
    },

    // set/overwrite `header-name` to `some-value` in the response
    set_response_headers: {
      'header-name': 'some-value',
    },

    // append `another-value` to `header-name` in the response,
    // becoming `some-value,another-value`
    set_response_headers: {
      '+header-name': ',another-value',
    },

    // remove `header-name` from the response by name
    remove_response_headers: ['header-name'],

    // or set with an empty value to remove `header-name` from the response
    set_response_headers: {
      'header-name': '',
    },
  },
});
```

Additional information on the `headers` feature can be found in the [Features](/applications/performance/rules/features#headers) guide.

### Altering All Responses {/* altering-all-responses */}

You can also write catch-all routes that will alter all responses. One example where this is useful is injecting [Content Security Policy](/applications/security/edgejs_security#content-security-policy-csp) headers.

Another example is adding response headers for debugging, which is often useful if {{ PRODUCT_NAME }} is behind another CDN or if you are troubleshooting your router rules. For example, you could respond with the value of request `%{http_x_forwarded_for}` into `x-debug-xff` to see the value that {{ PRODUCT_NAME }} is receiving from the CDN:

```js
router.match(
  {
    path: '/:path*',
    query: {
      my_site_debug: 'true',
    },
  },
  {
    headers: {
      set_response_headers: {
        'x-debug-xff': '%{http_x_forwarded_for}',
      },
    },
  }
);
```

The rules for interpolating the values of request and response objects can be found in the [routing](/applications/performance/cdn_as_code#embedded-values) guide.
Note that catch-all routes that alter headers, cookies, or caching can be placed at the start of your router while allowing subsequent routes to run because they alter the request or the response without actually sending a response. See [route execution](/applications/performance/cdn_as_code#route-execution) for more information on route execution order and sending responses.

### Transforming Requests / Responses {/* transforming-requests-responses */}

If you need to modify a request before going to an origin, or modify the response from an origin, you may use `transformRequest` and `transformResponse` functions on the `proxy` handler. Transform functions will be executed within the {{ PRODUCT }} cloud, and will not be executed on the edge. See [Cloud Functions](/applications/performance/serverless_compute) for more information.

{{ routehelper_usage.md }}

#### transformRequest Function {/* transformRequest-function */}

You can modify the request before it is sent to the origin using the `transformRequest` function. This example shows how you could add a `foo` property to the request body before sending it to the origin:

```js
router.get('/products/:productId', ({proxy}) => {
  proxy('origin', {
    transformRequest: (request) => {
      request.body = JSON.stringify({
        ...JSON.parse(request.body),
        foo: 'bar',
      });
    },
  });
});
```

#### transformResponse Function{/* transformResponse-function */}

Similarly, you can modify the response from the origin before it is sent to the client using the `transformResponse` function. This example shows how you could add an HTML `script` tag to the response body before sending it to the client:

```js
import responseBodyToString from '@edgio/core/utils/responseBodyToString';
import $ from 'cheerio';
/* ... */
router.get('/products/:productId', ({proxy}) => {
  proxy('origin', {
    transformResponse: (response) => {
      const body = responseBodyToString(response);
      const $body = $(body).append(
        '<script src="https://example.com/script.js"></script>'
      );
      response.body = $body.html();
    },
  });
});
```

## Manipulating Cookies {/* manipulating-cookies */}

You can manipulate cookies before they are sent to the browser using `headers.set_response_headers`:

```js
router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  headers: {
    // add cookie `foo=bar` to the response
    add_response_headers: {
      'set-cookie': 'foo=bar;',
    },
  },
});
```

### Adding Options to Cookies {/* adding-options-to-cookies */}

In addition to the name and value of the cookie, you can also add attributes to each cookie. For
information on possible cookie attributes, please refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

```js
import {serializeCookie} from '@edgio/core/utils/cookieUtils';

router.get('/products/:productId', {
  origin: {
    set_origin: 'origin',
  },
  headers: {
    // set cookie with options
    add_response_headers: {
      'set-cookie': 'foo=bar; Secure; HttpOnly;',
    },

    // set cookie with options using the serializeCookie helper
    add_response_headers: {
      'set-cookie': serializeCookie('foo', 'bar', {
        Secure: true,
        HttpOnly: true,
      }),
    },
  },
});
```

## Proxying to Different Backends Based on Different Host Names {/* proxying-to-different-backends-based-on-different-host-names */}

To proxy to different backends by matching the `host` header (e.g. different backends for different international sites):

```js
router
  .match(
    {
      path: '/:path*',
      headers: {
        host: 'yoursite.c1',
      },
    },
    {
      origin: {
        set_origin: 'country1-backend',
      },
    }
  )
  .match(
    {
      path: '/:path*',
      headers: {
        host: 'yoursite.c2',
      },
    },
    {
      origin: {
        set_origin: 'country2-backend',
      },
    }
  )
  .match(
    {
      path: '/:path*',
    },
    {
      origin: {
        set_origin: 'everybody-else-backend',
      },
    }
  );
```

## Serving a Static File {/* serving-a-static-file */}

To serve a specific file, use the [`serveStatic`](/docs/api/core/classes/router_RouteHelper.default.html#serveStatic) method.

{{ routehelper_usage.md }}

```js
router
  // cache the favicon for 1 day
  .get('/favicon.ico', {
    caching: {
      max_age: '1d',
      client_max_age: '1h',
    },
  })

  // serve the favicon from the `public` directory
  .get('/favicon.ico', ({serveStatic}) => serveStatic('public/favicon.ico'));
```

## Serving Static Files From a Directory {/* serving-static-files-from-a-directory */}

To serve a files from a directory, use the [`serveStatic`](/docs/api/core/classes/router_RouteHelper.default.html#serveStatic) method.

{{ routehelper_usage.md }}

```js
router
  // cache the static assets for 1 day
  .get('/assets/:path*', {
    caching: {
      max_age: '1d',
      client_max_age: '1h',
    },
  })

  // serve the assets from the `public` directory
  .get('/assets/:path*', ({serveStatic}) => serveStatic('public/:path*'));
```

## Serving the Service Worker {/* serving-the-service-worker */}

Similar to the above example, you can serve the service worker from its directory (e.g. `/dist/service-worker.js`).

{{ routehelper_usage.md }}

```js
router
  // cache the service worker for 1 day
  .get('/service-worker.js', {
    caching: {
      max_age: '1d',
      client_max_age: '1h',
    },
  })

  // serve the service worker from the `dist` directory
  .get('/service-worker.js', ({serveStatic}) =>
    serveStatic('dist/service-worker.js')
  );
```

## Routing to Cloud Functions {/* routing-to-cloud-functions */}

Render the result of a Cloud Function within your application by using the [`renderWithApp`](/docs/api/core/classes/router_RouteHelper.default.html#renderWithApp) method. Use this method to respond with an SSR or API result from your application.

{{ routehelper_usage.md }}

```js
router.get('/some/:path*', ({addFeatures, renderWithApp}) => {
  addFeatures({
    caching: {
      max_age: '1d',
      bypass_client_cache: true,
    },
  });

  renderWithApp();
});
```

<!-- ### Falling Back to Server-side Rendering {/*falling-back-to-server-side-rendering*/}

If you render some but not all paths for a given route at build time, you can fall back to server side rendering using the `onNotFound` option. Add the `loadingPage`
option to display a loading page while server-side rendering is in progress.

```js
router.get('/products/:id', ({ serveStatic, cache, renderWithApp }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
  })
  serveStatic('dist/products/:id.html', {
    onNotFound: () => renderWithApp(),
    loadingPage: 'dist/products/loading.html',
  })
})
```

This hybrid of static and dynamic rendering was first introduced in Next.js as [Incremental Static Generation (ISG)](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required). In Next.js apps, developers enable this behavior by returning `fallback: true` from
`getStaticPaths()`. The `{{ PACKAGE_NAME }}/next` package automatically configures the routes for ISG pages to use `onNotFound` and `loadingPage`. -->

<!-- ### Returning a Custom 404 Page {/*returning-a-custom-404-page*/}

When a request matches a route with `serveStatic`, but no matching static asset exists, you can serve a custom 404 page using the `onNotFound` option.

```js
router.get('/products/:id', ({ serveStatic, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
  })
  serveStatic('dist/products/:id.html', {
    onNotFound: async () => {
      await serveStatic('/products/not-found.html', {
        statusCode: 404,
        statusMessage: 'Not Found',
      })
    },
  })
})
``` -->

## Image Optimization {/* image-optimization */}

{{ PRODUCT_NAME }} can dynamically transform your images to tailor your site's design, experience, and performance needs. [Image optimization](/applications/performance/image_optimization) can be enabled using the [`response.optimize_images`](/docs/api/core/interfaces/types.Response.html#optimize_images) feature on your route(s).

<ExampleButtons
  title="Image Optimization"
  siteUrl="https://edgio-community-examples-v7-image-optimization-live.glb.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-image-optimization-example/"
/>

### Optimizing Local Images {/* optimizing-local-images */}

Images local to your project, such as those in your `public` directory, can be both served as static assets and processed by the image optimizer.

{{ routehelper_usage.md }}

```js
// match all /images/* requests
router.match(/\/images\/(.*)/, ({addFeatures, serveStatic}) => {
  // serve the image as a static asset, referencing the capture group from the match
  serveStatic('public/images/$1');

  // add the image optimization and caching feature
  addFeatures({
    caching: {
      max_age: '1d',
    },
    response: {
      optimize_images: true,
    },
  });
});
```

This example:

- Matches all `/images/*` requests
- Proxies the request to the static asset origin where the asset is hosted
- Enables the image optimization feature
- Caches the response for 1 day

**Sample request:** `https://example.com/images/my-image.jpg?width=200&height=200`

<Callout type="important">

Rules should match using a regular expression that captures the image path and query string parameters containing the image optimization options. This is necessary to ensure optimization options are captured and passed to the image optimizer. Using [simple path matching](/applications/performance/cdn_as_code/route_criteria#simple-path-matching) (e.g. `/images/:path*`) will not capture the query string parameters and optimizations will not be applied.

</Callout>

### Optimizing Remote Images {/* optimizing-remote-images */}

Images hosted on a remote server can be optimized by proxying the request to the origin and adding the image optimization feature.

```js
router.match('/images/:path*', {
  caching: {
    max_age: '1d',
  },
  origin: {
    set_origin: 'origin',
  },
  response: {
    optimize_images: true,
  },
});
```

This example:

- Matches all `/images/*` requests
- Proxies the request to the `origin` origin where the asset is hosted
- Enables the image optimization feature
- Caches the response for 1 day

If you need to modify the request path before proxying to the origin, you can use the `url.url_rewrite` feature.

```js
router.match(/\/images\/(.*)/, {
  caching: {
    max_age: '1d',
  },
  origin: {
    set_origin: 'media',
  },
  url: {
    url_rewrite: [
      {
        source: '/images/(.*)',
        syntax: 'regexp',
        destination: '/assets/images/$1',
      },
    ],
  },
  response: {
    optimize_images: true,
  },
});
```

This example:

- Matches all `/images/*` requests
- Proxies the request to the `media` origin where the asset is hosted
- Rewrites the request path to `/assets/images/*` to match the path on the origin
- Enables the image optimization feature
- Caches the response for 1 day

## Responding with a String Response Body {/* responding-with-a-string-response-body */}

To respond with a simple, constant string as the response body use the `response.set_response_body` and `response.set_done` features:

```js
router.get('/some-path', {
  caching: {
    max_age: '1d',
  },
  headers: {
    set_response_headers: {
      'Content-Type': 'text/html',
    },
  },
  response: {
    set_done: true,
    set_response_body: `
      <!doctype html>
      <html>
        <body>Hello World</body>
      </html>`,
  },
});
```

<Callout type="important">

When using `response.set_response_body` to send a response, you must also set `response.set_done` to `true`. This will allow the request to continue matching any subsequent rules, but will prevent the request from being forwarded to the origin.

</Callout>

To compute a dynamic response, use the [`compute`](/docs/api/core/classes/router_RouteHelper.default.html#compute) method.

{{ routehelper_usage.md }}

```js
router.get('/hello/:name', ({cache, setResponseHeader, compute, send}) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  });
  setResponseHeader('Content-Type', 'text/html');
  compute((request, response) => {
    send(`
      <!doctype html>
      <html>
        <body>Hello ${request.params.name}</body>
      </html>
    `);
  });
});
```

## Redirecting {/* redirecting */}

To redirect the browser to a different URL, use the `url.url_redirect` feature, optionally specifying the HTTP status code:

```js
router.get('/p/:productId', {
  url: {
    url_redirect: {
      code: 301,
      source: '/p/:productId',
      syntax: 'path-to-regexp',
      destination: '/products/:productId',
    },
  },
});
```

To compute the destination URL, use the [`compute`](/docs/api/core/classes/router_RouteHelper.default.html#compute) method.

{{ routehelper_usage.md }}

```js
router.get('/p/:productId', ({redirect, compute, cache}) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  });
  compute(async (request) => {
    const destination = await getDestinationFromMyAPI(request.params.productId);
    redirect(destination);
  });
});
```

### Redirecting All Traffic to a Different Domain {/* redirecting-all-traffic-to-a-different-domain */}

```js
// Redirect all traffic except those with host header starting with www. to www.mydomain.com
router.match(
  {headers: {host: /^(?!www\.).*$/}},
  {
    url: {
      url_redirect: {
        code: 302,
        destination: 'https://www.mydomain.com%{request_uri}',
      },
    },
  }
);

// Redirect all traffic from www.domain.com to domain.com
router.match(
  {headers: {host: /^(www\.).*$/}},
  {
    url: {
      url_redirect: {
        code: 302,
        destination: 'https://domain.com%{request_uri}',
      },
    },
  }
);
```

### Redirecting HTTP to HTTPS {/* redirecting-http-to-https */}

To redirect all HTTP traffic to HTTPS, use the `url.url_redirect` feature. Matching the `source` with `(.*)` will capture the entire path and query string that is then appended to the `destination`. Referencing `%{host}` in the `destination` will ensure that the request is redirected to the current host. See [Feature Variables](/applications/performance/rules/feature_variables) for more information.

```js
router.match(
  {scheme: 'HTTP'},
  {
    url: {
      url_redirect: {
        code: 302,
        source: '(.*)',
        destination: 'https://%{host}$1',
      },
    },
  }
);
```

## Blocking Unwanted Traffic {/* blocking-unwanted-traffic */}

Although there are various strategies for blocking unwanted traffic, the recommended method for blocking traffic is through {{ PRODUCT }} {{ PRODUCT_SECURITY }}'s [access rules](/security/access-rules). Access rules allow you to define traffic profiles (e.g., country, IP address, or user agent) that should always be allowed, blocked, or undergo additional security screening. 

### Blocking traffic from specific countries {/* blocking-traffic-from-specific-countries */}

If you need to block all traffic from a specific country or set of countries, you can do so by matching requests by the [country code](/applications/reference/country_codes) using the `location.country` match condition:

```js
import {or} from '@edgio/core';

router.if(
  or(
    {
      edgeControlCriteria: {
        '===': [
          {
            location: 'country',
          },
          'XX',
        ],
      },
    },
    {
      edgeControlCriteria: {
        '===': [
          {
            location: 'country',
          },
          'XY',
        ],
      },
    },
    {
      edgeControlCriteria: {
        '===': [
          {
            location: 'country',
          },
          'XZ',
        ],
      },
    }
  ),
  {
    access: {
      deny_access: true,
    },
  }
);
```

Learn more about geolocation headers in the [Request guide](/applications/performance/request#request-headers). For detailed information on complex rules, see [Conditional Routes](/applications/performance/cdn_as_code/conditional_routes).

<!-- TODO need support for regex client IP matching
### Allowing Specific IPs {/*allowing-specific-ips*/}

If you need to block all traffic except requests that originate from specific IP addresses, you can do so by matching requests by the [{{ HEADER_PREFIX }}-client-ip](/applications/request_headers#general-headers) header:

```js
router.get(
  {
    "headers": {
      // Regex that will do a negative lookahead for IPs you want to allow.
      // In this example 172.16.16.0/24 and 10.10.10.3/32 will be allowed and everything else will receive a 403
      '{{ HEADER_PREFIX }}-client-ip': /\b((?!172\.16\.16)(?!10.10.10.3)\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
    },
  }, {
  response: {
    set_done: true,
    set_response_body: "Blocked",
    set_status_code: 403
  }
})
``` -->

### Blocking Search Engine Crawlers {/* blocking-search-engine-crawlers */}

If you need to block all search engine bot traffic to specific environments (such as your default or staging environment), the easiest way is to include the `x-robots-tag` header with the same directives you would otherwise set in a `meta` tag.

<Callout type="info">

The search engine traffic is automatically blocked on {{ PRODUCT }} edge links and permalinks as of {{ PRODUCT }} v6.

</Callout>

If you would like to enable indexing on edge and permalinks, you need to pass `{ indexPermalink: true }` into the Router constructor in `routes.js` file:

```js
new Router({indexPermalink: true});
```

Otherwise, {{ PRODUCT }} will match requests with the `host` header matching `/{{ LINK_DOMAIN }}|{{ PERMALINK_DOMAIN }}/` and set a response header of `x-robots-tag: noindex`.

Additionally, you can customize this to block traffic to development or staging websites based on the `host` header of the request:

```js
router.get(
  {
    headers: {
      // Regex to catch multiple hostnames
      host: /dev.example.com|staging.example.com/,
    },
  },
  {
    headers: {
      set_response_headers: {
        'x-robots-tag': 'noindex',
      },
    },
  }
);
```

For other available directives, see [Google Developer Central](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives) and [Bing Webmaster Tools](https://www.bing.com/webmasters/help/which-robots-metatags-does-bing-support-5198d240) for lists of supported options.

## Token Auth {/*token-auth*/}

Token Auth provides a safeguard against hotlinking by requiring requests to contain a token value that defines the criteria that the request must satisfy before it can be served through our network. 

<ExampleButtons
  title="Token Auth"
  siteUrl="https://edgio-community-examples-v7-token-auth-example-live.glb.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-token-auth-example/"
/>

Set up Token Auth by performing the following steps:

1.  Define a [primary encryption key](/security/token_auth#encryption-keys).
2.  Ensure that requests for content that will be protected by Token Auth [contain a query string that start with a token](/security/token_auth#authorizing-requests).

    This step requires [generating encrypted tokens](/security/token_auth#tokens) that define the minimum access requirements. For example, you could use a server-side script to generate and inject tokens within links to protected content.

3.  [Enable Token Auth](#securing-content) on the desired requests by adding the Token Auth feature to one or more rule(s).

    ```js
    router.match(/^\/secure\/.+/i, {
      access: {
        token_auth: true
      }
    });
    ```
4.  Deploy your changes.
# Common Routing Patterns

This guide gives examples of common routing patterns using {{ PRODUCT_NAME }}.

## Proxying an Origin

### Same Path

To forward a request to the same path on one of the backends listed in `{{ CONFIG_FILE }}`, use the [`proxy`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#proxy) method of `ResponseWriter`:

```js
router.get('/some-path', ({ proxy }) => {
  proxy('origin')
})
```

The first argument corresponds to the name of a backend in `{{ CONFIG_FILE }}`. For example:

```js
module.exports = {
  backends: {
    origin: {
      domainOrIp: 'my-shop.example.com',
      hostHeader: 'my-shop.example.com',
    },
  },
}
```

### Different Path

To forward the request to a different path, use the [`path`](/docs/api/core/interfaces/_router_responsewriter_.proxyoptions.html#path) option of the `ProxyOptions` interface:

```js
router.get('/products/:productId', ({ proxy }) => {
  proxy('origin', { path: '/p/:productId' })
})
```

### Adding Caching

To cache proxied requests at the edge, use the [`cache`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#cache) method.

```js
router.get('/products/:productId', ({ cache, proxy }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24           // keep entries in the cache for 24 hours
      staleWhileRevalidateSeconds: 60 * 60  // when a cached page is older than 24 hours, serve it one more time
                                            // for up to 60 minutes while fetching a new version from the origin
    }
  })
  proxy('origin')
})
```

### Altering the Request

You can alter request headers when forwarding a request to a backend:

```js
router.get(
  '/products/:productId',
  ({ setRequestHeader, updateRequestHeader, removeRequestHeader, proxy }) => {
    setRequestHeader('header-name', 'header-value')
    updateRequestHeader('header-name', /some-.*-part/gi, 'some-replacement')
    removeRequestHeader('header-name')
    proxy('origin')
  },
)
```

The above example makes use of [`setRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#setrequestheader), [`updateRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#updaterequestheader), and [`removeRequestHeader`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#removerequestheader) API calls.

### Altering the Response

You can also alter the response before and after the cache:

```js
router.get(
  '/products/:productId',
  ({
    setUpstreamResponseHeader,
    setResponseHeader,
    removeResponseHeader,
    removeUpstreamResponseHeader,
    updateResponseHeader
    updateUpstreamResponseHeader
    proxy,
  }) => {
    proxy('origin')

    // applied before the cache
    setUpstreamResponseHeader('header-name', 'header-value')
    updateUpstreamResponseHeader('header-name', /some-.*-part/gi, 'some-replacement')
    removeUpstreamResponseHeader('header-name')

    // applied after the cache
    setResponseHeader('header-name', 'header-value')
    updateResponseHeader('header-name', /some-.*-part/gi, 'some-replacement')
    removeResponseHeader('header-name')
  },
)
```

#### Altering All Responses

You can also write catch-all routes that will alter all responses. One example where this is useful is injecting [Content Security Policy](security#section_content_security_policy__csp_) headers.

Another example is adding response headers for debugging, which is often useful if [{{ PRODUCT_NAME }} is behind another CDN](split_testing#section_third_party_cdns) or if you are troubleshooting your router rules. For example, you could respond with the value of request `x-forwarded-for` into `x-debug-xff` to see the value that {{ PRODUCT_NAME }} is receiving from the CDN:

```js
router.match(
  {
    path: '/:path*',
    query: {
      my_site_debug: 'true',
    },
  },
  ({ setResponseHeader }) => {
    setResponseHeader('x-debug-xff', '${req:x-forwarded-for}')
  },
)
// The rest of your router...
```

The rules for interpolating the values of request and response objects can be found in the [routing](routing#section_embedded_values) guide.
Note that catch-all routes that alter headers, cookies, or caching can be placed at the start of your router while allowing subsequent routes to run because they alter the request or the response without actually sending a response. See [route execution](/guides/routing#section_route_execution) for more information on route execution order and sending responses.

### Manipulating Cookies

You can manipulate cookies before they are sent to the browser using cookie response API calls like [`addResponseCookie`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#addresponsecookie):

```js
router.get('/some/path', ({
  addUpstreamResponseCookie,
  addResponseCookie,
  removeResponseCookie,
  removeUpstreamResponseCookie,
  updateResponseCookie
  updateUpstreamResponseCookie,
  proxy
}) => {
  proxy('origin')

  // applied before the cache
  addUpstreamResponseCookie('cookie-to-add', 'cookie-value')
  removeUpstreamResponseCookie('cookie-to-remove')
  updateUpstreamResponseCookie('cookie-to-alter', /Domain=.+;/, 'Domain=mydomain.com;')

  // applied after the cache
  addResponseCookie('cookie-to-add', 'cookie-value')
  removeResponseCookie('cookie-to-remove')
  updateResponseCookie('cookie-to-alter', /Domain=.+;/, 'Domain=mydomain.com;')
})
```

### Adding Options to Cookies

In addition to the name and value of the cookie, you can also add attributes to each cookie. For specific information on possible cookie attributes, please refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

```js
router.get('/some/path', ({ addUpstreamResponseCookie, addResponseCookie, proxy }) => {
  proxy('origin')

  addUpstreamResponseCookie('cookie-to-add', 'cookie-value', {
    domain: 'test.com',
  })

  addResponseCookie('cookie-to-add', 'cookie-value', { 'max-age': 50000 })
})
```

### Proxying to Different Backends Based on Different Host Names

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
    ({ proxy }) => {
      proxy('country1-backend')
    },
  )
  .match(
    {
      path: '/:path*',
      headers: {
        host: 'yoursite.c2',
      },
    },
    ({ proxy }) => {
      proxy('country2-backend')
    },
  )
  .match(
    {
      path: '/:path*',
    },
    ({ proxy }) => {
      proxy('everybody-else-backend')
    },
  )
```

## Serving a Static File

To serve a specific file use the [`serveStatic`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#servestatic) API:

```js
router.get('/favicon.ico', ({ serveStatic, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
    browser: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  serveStatic('assets/favicon.ico') // path is relative to the root of your project
})
```

## Serving Static Files From a Directory

Here's an example that serves all requests by sending the corresponding file in the `public` directory

```js
router.get('/:path*', ({ serveStatic, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
    browser: false, // prevent caching of stale html in the browser
  })
  serveStatic('public/:path*')
})
```

## Routing to Serverless

If your request needs to be run on the serverless tier, you can use the `renderWithApp` handler to render your result using your application. Use this method to respond with an SSR or API result from your application.

Example using the `renderWithApp` handler:

```js
router.get('/some/:path*', ({ renderWithApp, cache }) => {
  cache(CACHE_PAGES)
  renderWithApp()
})
```

### Falling Back to Server-side Rendering

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
`getStaticPaths()`. The `{{ PACKAGE_NAME }}/next` package automatically configures the routes for ISG pages to use `onNotFound` and `loadingPage`.

### Returning a Custom 404 Page

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
```

## Responding with a String Response Body

To respond with a simple, constant string as the response body use the [`send`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#send) method:

```js
router.get('/some-path', ({ cache, setResponseHeader, send }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  setResponseHeader('Content-Type', 'text/html')
  send(`
    <!doctype html>
    <html>
      <body>Hello World</body>
    </html>
  `)
})
```

To compute a dynamic response use the [`compute`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute) method:

```js
router.get('/hello/:name', ({ cache, setResponseHeader, compute, send }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  setResponseHeader('Content-Type', 'text/html')
  compute((request, response) => {
    send(`
      <!doctype html>
      <html>
        <body>Hello ${request.params.name}</body>
      </html>
    `)
  })
})
```

## Redirecting

To redirect the browser to a different URL, use the [`redirect`](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#redirect) API:

```js
router.get('/p/:productId', ({ redirect }) => {
  return redirect('/products/:productId', 301) // overrides the default status of 302 (Temporary Redirect)
})
```

If you need to compute the destination with sophisticated logic:

```js
router.get('/p/:productId', ({ redirect, compute, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  compute(async request => {
    const destination = await getDestinationFromMyAPI(request.params.productId)
    redirect(destination)
  })
})
```

### Redirecting All Traffic to a Different Domain

This example redirects all traffic on domains other than www.mydomain.com to www.mydomain.com. So for example, mydomain.com => www.mydomain.com

```js
router.match({ headers: { host: /^(?!www\.).*$/ } }, ({ redirect }) => {
  redirect('https://www.mydomain.com${url}')
})
```

## Blocking Unwanted Traffic

### Blocking traffic from specific countries

If you need to block all traffic from a specific country or set of countries, you can do so by matching requests by the [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) geolocation header:

```js
router.get(
  {
    headers: {
      '{{ HEADER_PREFIX }}-geo-country-code': /XX|XY|XZ/, // Regex matching two-letter country codes of the countries you want to block
    },
  },
  ({ send }) => {
    send('Blocked', 403)
  },
)
```

You can find more about geolocation headers [here](/guides/request_headers).

### Allowing Specific IPs

If you need to block all traffic from a specific country or set of countries, you can do so by matching requests by the [{{ HEADER_PREFIX }}-client-ip](/guides/request_headers#section_general_headers) header:

```js
router.get(
  {
    headers: {
      // Regex that will do a negative lookahead for IPs you want to allow.
      // In this example 172.16.16.0/24 and 10.10.10.3/32 will be allowed and everything else will receive a 403
      '{{ HEADER_PREFIX }}-client-ip': /\b((?!172\.16\.16)(?!10.10.10.3)\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
    },
  },
  ({ send }) => {
    send('Blocked', 403)
  },
)
```

### Blocking Search Engine Crawlers

If you need to block all search engine bot traffic to specific environments (such as your default or staging environment), the easiest way is to include the `x-robots-tag` header with the same directives you would otherwise set in a `meta` tag. This example blocks traffic to {{ PRODUCT_NAME }} edge links, permalinks, and to a staging website based on the `host` header of the request:

```js
router.get(
  {
    headers: {
      // Regex to catch multiple hostnames
      host: /layer0.link|layer0-perma.link|staging.example.com/,
    },
  },
  ({ setResponseHeader }) => {
    setResponseHeader('x-robots-tag', 'noindex')
  },
)
```

For other available directives, see [Google Developer Central](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives) and [Bing Webmaster Tools](https://www.bing.com/webmasters/help/which-robots-metatags-does-bing-support-5198d240) for lists of supported options.

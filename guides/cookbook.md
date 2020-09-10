# Cookbook

This guide gives examples of common routing patterns using the XDN.

## Proxying a backend

### Same Path

To forward a request to the same path to one of the backends listed in `xdn.config.js` use the [`proxy`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#proxy) method of `ResponseWriter`:

```js
router.get('/some-path', ({ proxy }) => {
  proxy('origin')
})
```

The first argument corresponds to the name of a backend in `xdn.config.js`. For example:

```js
module.exports = {
  backends: {
    origin: {
      domainOrIp: 'my-shop.myshopify.com',
      hostHeader: 'my-shop.myshopify.com',
    },
  },
}
```

### Different Path

To forward the request to a different path use the [`path`](https://developer.moovweb.com/docs/api/core/interfaces/_router_responsewriter_.proxyoptions.html#path) option of the `ProxyOptions` interface:

```js
router.get('/products/:productId', ({ proxy }) => {
  proxy('origin', { path: '/p/:productId' })
})
```

### Adding Caching

To cache proxied requests at the edge, use the [`cache`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#cache) method.

```js
router.get('/products/:productId', ({ proxy }) => {
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

### Altering the request

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

The above example makes use of [`setRequestHeader`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#setrequestheader), [`updateRequestHeader`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#updaterequestheader), and [`removeRequestHeader`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#removerequestheader) API calls.

### Altering the response

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

### Manipulating Cookies

You can manipulate cookies before they are sent to the browser using cookie response API calls like [`addResponseCookie`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#addresponsecookie):

```js
router.get('/some/path', ({
  setUpstreamResponseCookie,
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

## Serving a static file

To serve a specific file use the [`serveStatic`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#servestatic) API:

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

To serve all files in a directory tree under a specific path prefix:

```js
router.get('/assets/:path*', ({ serveStatic, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
    browser: {
      maxAgeSeconds: 60 * 60 * 24, // cache for 24 hours
    },
  })
  serveStatic('assets/:path*')
})
```

## Responding with a string response body

To respond with a simple, constant string as the response body use the [`send`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#send) method:

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

To compute a dynamic response use the [`compute`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute) method:

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

To redirect the browser to a different URL use the [`redirect`](https://developer.moovweb.com/docs/api/core/classes/_router_responsewriter_.responsewriter.html#redirect) API:

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

## Blocking unwanted traffic

### Blocking traffic from specific countries

If you need to block all traffic from a specific country or set of countries, you can do so by matching requests by the [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) geolocation header:

```js
router
  .get(
    {
      headers: {
        'x-xdn-geo-country-code': /XX|XY|XZ/ // Regex matching two-letter country codes of the countries you want to block
      }
    },
    ({ send }) => {
      send('Blocked', 403)
    }
  )
```

You can find more about geolocation headers [here](/guides/request_headers).

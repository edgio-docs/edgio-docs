# Routing

The `@xdn/core` package provides a JavaScript API for controlling routing and caching from your code base rather than a CDN web portal. Using this "CDN-as-Code" approach allows this vital routing logic to be properly tested, reviewed, and version controlled, just like the rest of your application code.

Using the Router, you can:

- Proxy requests to upstream sites
- Send redirects from the network edge
- Render responses on the server using Next.js, Nuxt.js, or Angular.
- Alter request and response headers
- Send synthetic responses
- Configure multiple destinations for split testing

## Configuration

To define routes for the Moovweb XDN, create a `routes.js` file in the root of your project. You can override the default path to the router by setting the `routes` key in `xdn.config.js`.

The `routes.js` file should export an instance of `@xdn/core/router/Router`:

```js
// routes.js
const { Router } = require('@xdn/core/router')

module.exports = new Router()
```

## Declaring Routes

Declare routes using the `match` method:

```js
// routes.js
const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .match('/some-path', edge => {
    // handle the request here
  })
```

## Route Pattern Syntax

The syntax for route paths is provided by [route-parser](https://github.com/rcs/route-parser). It is similar to express's route syntax:

| Example       | Description                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `:name`       | a parameter to capture from the route up to `/`, `?`, or end of string                                           |
| `*splat`      | a splat to capture from the route up to `?` or end of string                                                     |
| `()`          | Optional group that doesn't have to be part of the query. Can contain nested optional groups, params, and splats |
| anything else | free form literals                                                                                               |

Some examples:

- `/some/(optional/):thing`
- `/users/:id/comments/:comment`
- `/*a/foo/*b`
- `/books/*section/:title`
- `/books?author=:author`

## Matching Method, Cookies, and Headers

Match can either take a URL path, or an object which allows you to match based on method, cookies, and request headers:

```js
router.match(
  {
    path: '/some-path', // value is route-pattern syntax
    method: /GET|POST/i, // value is a regular expression
    cookies: { currency: /^(usd)$/i }, // keys are cookie names, values are regular expressions
    headers: { 'x-moov-device': /^desktop$/i }, // keys are header names, values are regular expressions
  },
  edge => {},
)
```

## Handling Requests

The second argument to `router.match` is a function that receives the request and generates a response. The function is passed an `edge` object containing the following methods:

## proxy(backend, options)

The proxy method allows you to route the request to an upstream site configured in the `backends` object in `xdn.config.js`.

### Parameters

| Name         | Type   | Description                                                                                                                           |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| backend      | String | The name of an backend configured in xdn.config.js to which the request should be routed                                              |
| options      | Object | An object with the following params                                                                                                   |
| options.path | String | The path to request from the upstream site. You can reference params in your route pattern using `{variable}`. See the example below. |

```js
// routes.js

router.match('/blog/:slug', async ({ proxy }) => {
  await proxy('legacy', { path: '/insights/{slug}' })
})
```

```js
// xdn.config.js

module.exports = {
  backends: {
    legacy: 'www.ebay.com',
  },
}
```

## redirect(path, status)

The redirect method allows you to redirect the browser to a new URL from the network edge.

### Parameters

| Name   | Type    | Description                                                                                                |
| ------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| path   | String  | The target path. You can reference params in your route pattern using `{variable}`. See the example below. |
| status | Integer | The HTTP response status to send. Defaults to `302` (Temporary redirect).                                  |

```js
router.match('/sale/:product', ({ redirect }) => {
  redirect('/holiday-sale/{product}', 301) // reference a path variable and send a 301 http status
})
```

## render(callback)

The render method allows you to return a server-side rendered HTML response.

### Parameters

| Name     | Type     | Description                                                                                          |
| -------- | -------- | ---------------------------------------------------------------------------------------------------- |
| callback | Function | A callback that sends a response using the provided response object. See "Callback Parameters" below |

### Callback Parameters

| Name     | Type                                                                                   | Description                                  |
| -------- | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| request  | [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest)   | The node.js request object                   |
| response | [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) | The node.js response object                  |
| params   | Object                                                                                 | The query and path params as key/value pairs |

```js
const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router().match('/holiday-sale/:productId', async ({ render }) => {
    await render((req, res, params) => renderNext(req, res, '/p/[productId]', params))
  })
}
```

### Rendering a Response with Next.js

Next.js applications should use `@xdn/next/router/createNextPlugin`, which returns an object containing:

#### renderNext(request, response, params, page)

Renders a response using a specific page component. Use this function to declare routes that cannot be specified using next.js's conventional routing based on directory structure.

- request - `Request` the request object
- response - `Response` the response object
- page - `String` The path to the next.js page component to render
- params - `Object` The path and query parameters

```js
// routes.js
const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router().match('/some/vanity/url/:p', async ({ render }) => {
    await render((req, res, params) =>
      renderNext(req, res, '/p/[productId]', { productId: params.p }),
    )
  })
}
```

#### renderNext(request, response, params, page)

| Name     | Type                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                    |
| -------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| request  | [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest)   | The node.js request object                                                                                                                                                                                                                                                                                                                                     |
| response | [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) | The node.js response object                                                                                                                                                                                                                                                                                                                                    |
| params   | Object                                                                                 | The query and path params as key/value pairs                                                                                                                                                                                                                                                                                                                   |
| page     | String                                                                                 | The path to the page component to render. If omitted, next.js will attempt to automatically determine the page based on it's own standard routing. You generally only need to supply a page when creating an explicit route. When using next.js to handle requests that don't match an explicit route, the page argument can be omitted. See "Fallback" below. |

#### nextMiddleware

A middleware that delegates routing to next.js's conventional routing based on directory structure. This includes serving static assets from the `/public` directory.

```js
// routes.js
const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router().use(nextMiddleware) // matches URLs based on next.js's built-in routing
}
```

## serveStatic(path)

Serves a static asset.

### Parameters

| Name | Type   | Description                                                                                             |
| ---- | ------ | ------------------------------------------------------------------------------------------------------- |
| path | String | The path to the asset from the root of your app. This path can contain variables captured in the route. |

```js
route.match('/static/:file', async ({ serveStatic }) => {
  await serveStatic('static/{file}')
})
```

## cache({ browser, edge })

Controls caching both in the browser and at the edge

```js
router.match('/some/path' ({ cache }) => {
  cache({
    browser: {
      // Sets the cache-control: maxage=n header sent to the browser.  To prevent the browser from caching this route
      // set maxAgeSeconds: 0
      maxAgeSeconds: 0,

      // Sends a non-standard header `x-sw-cache-control: n` that you can use to control caching your service worker.
      // Note that service workers do not understand this header by default so would you need to add code to your service
      // worker to support it
      serviceWorkerSeconds: 60 * 60
    },
    edge: {
      // Sets the TTL for a response in the XDN's edge cache
      maxAgeSeconds: 60 * 60 * 24

      // Sets the amount of time a stale response will be served from the cache.  When a stale response is sent, the XDN
      // will simultaneously fetch a new response to serve subsequent requests.
      // Using stale-while-revalidate helps raise your effective cache hit rate to near 100%.
      staleWhileRevalidateSeconds: 60 * 60 // serve stale responses for up to 1 hour while fetching a new response
    }
  })
})
```

[See the Caching guide for more information.](./caching)

## Fallback

You can provide a fallback route to handle requests that don't match any explicit route. Generally apps use Next.js's default routing to respond to unmatched requests:

```js
router.fallback(({ proxy }) => proxy('legacy')))
```

The `fallback` route should be the last route.

## Altering Request Headers

When proxying an upstream site, you can alter the request headers sent upstream using the following methods:

### setRequestHeader(name, value)

Sets a request header.

- name - `String` the name of the header to set
- value - `String` the value of the header

### updateRequestHeader(name, find, replace)

Alters the value of a request header returned from the backend.

- name - `String` The name of the header to set
- find - `Regexp` A pattern to find in the value
- replace - `String` A regular expression replacement string used to derive the new value of the header from the value sent by the browser

### removeRequestHeader(name)

Removes a request header sent from the browser

- name - `String` The name of the header to remove.

## Altering Response Headers

When proxying an upstream site, you can alter the response headers sent to the browser using the following methods:

### setResponseHeader(name, value)

Sets a response header.

- name - `String` the name of the header to set
- value - `String` the value of the header

### updateResponseHeader(name, find, replace)

Alters the value of a response header returned from the backend.

- name - `String` The name of the header to set
- find - `Regexp` A pattern to find in the value
- replace - `String` A regular expression replacement string used to derive the new value of the header from the value returned from upstream

### removeResponseHeader(name)

Removes a response header returned from the backend

- name - `String` The name of the header to remove.

## Full Example

This example shows typical usage of @xdn/core, including serving a service worker, next.js routes (varnity and conventional routes), and falling back to a legacy backend.

```js
const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router()
    .match('/service-worker.js', async ({ serveStatic }) => {
      await serveStatic('.next/static/service-worker.js')
    })
    .match('/some/vanity/url/:p', async ({ render }) => {
      await render((req, res, params) =>
        renderNext(req, res, '/p/[productId]', { productId: params.p }),
      )
    })
    .use(nextMiddleware)
    .fallback(async ({ proxy }) => {
      await proxy('legacy')
    })
}
```

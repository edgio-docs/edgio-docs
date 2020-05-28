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

Declare routes using the method corresponding to the HTTP method you want to match.

```js
// routes.js
const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .get('/some-path', ({ cache, proxy }) => {
    // handle the request here
  })
```

All HTTP methods are available:

* get
* put
* post
* patch
* delete
* head

To match all methods, use `match`:

```js
// routes.js
const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .match('/some-path', ({ cache, proxy }) => {
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
  () => {},
)
```

## Handling Requests

The second argument to routes is a function that receives a `ResponseWriter` and uses it to send a response. Using `ResponseWriter` you can:

* proxy a backend configured in `xdn.config.js`
* serve a static file
* send a redirect
* send a synthetic response
* cache the response at edge and in the browser
* manipulate request and response headers

[See the API Docs for Response Writer](/docs/__version__/api/core/classes/_router_responsewriter_.responsewriter.html)

## Full Example

This example shows typical usage of `@xdn/core`, including serving a service worker, next.js routes (varnity and conventional routes), and falling back to a legacy backend.

```js
// routes.js

const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .get('/service-worker.js', async ({ serviceWorker }) => {
    // serve the service worker built by webpack
    serviceWorker('dist/service-worker.js')
  })
  .get('/p/:productId', async ({ cache }) => {
    // cache products for one hour at edge and using the service worker
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        staleWhileRevalidateSeconds: 60 * 60
      },
      browser: {
        maxAgeSeconds: 0
        serviceWorkerSeconds: 60 * 60
      }
    })
    proxy('origin')
  })
  .fallback(async ({ proxy }) => {
    // serve all unmatched URLs from the origin backend configured in xdn.config.js
    proxy('origin')
  })
```

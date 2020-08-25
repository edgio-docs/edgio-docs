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

module.exports = new Router().get('/some-path', ({ cache, proxy }) => {
  // handle the request here
})
```

All HTTP methods are available:

- get
- put
- post
- patch
- delete
- head

To match all methods, use `match`:

```js
// routes.js
const { Router } = require('@xdn/core/router')

module.exports = new Router().match('/some-path', ({ cache, proxy }) => {
  // handle the request here
})
```

## Route Pattern Syntax

The syntax for route paths is provided by [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp), which is the same library used by [Express](https://expressjs.com/).

### Named Parameters

Named parameters are defined by prefixing a colon to the parameter name (`:foo`).

```js
new Router().get('/:foo/:bar', res => {
  /* ... */
})
```

**Please note:** Parameter names must use "word characters" (`[A-Za-z0-9_]`).

#### Custom Matching Parameters

Parameters can have a custom regexp, which overrides the default match (`[^/]+`). For example, you can match digits or names in a path:

```js
new Router().get('/icon-:foo(\\d+).png', res => {
  /* ... */
})
```

**Tip:** Backslashes need to be escaped with another backslash in JavaScript strings.

#### Custom Prefix and Suffix

Parameters can be wrapped in `{}` to create custom prefixes or suffixes for your segment:

```js
new Router().get('/:attr1?{-:attr2}?{-:attr3}?', res => {
  /* ... */
})
```

### Unnamed Parameters

It is possible to write an unnamed parameter that only consists of a regexp. It works the same the named parameter, except it will be numerically indexed:

```js
new Router().get('/:foo/(.*)', res => {
  /* ... */
})
```

### Modifiers

Modifiers must be placed after the parameter (e.g. `/:foo?`, `/(test)?`, `/:foo(test)?`, or `{-:foo(test)}?`).

#### Optional

Parameters can be suffixed with a question mark (`?`) to make the parameter optional.

```js
new Router().get('/:foo/:bar?', res => {
  /* ... */
})
```

**Tip:** The prefix is also optional, escape the prefix `\/` to make it required.

#### Zero or more

Parameters can be suffixed with an asterisk (`*`) to denote a zero or more parameter matches.

```js
new Router().get('/:foo*', res => {
  /* res.params.foo will be an array */
})
```

The captured parameter value will be provided as an array.

#### One or more

Parameters can be suffixed with a plus sign (`+`) to denote a one or more parameter matches.

```js
new Router().get('/:foo+', res => {
  /* res.params.foo will be an array */
})
```

The captured parameter value will be provided as an array.

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

- proxy a backend configured in `xdn.config.js`
- serve a static file
- send a redirect
- send a synthetic response
- cache the response at edge and in the browser
- manipulate request and response headers

[See the API Docs for Response Writer](/docs/__version__/api/core/classes/_router_responsewriter_.responsewriter.html)

## Full Example

This example shows typical usage of `@xdn/core`, including serving a service worker, next.js routes (vanity and conventional routes), and falling back to a legacy backend.

```js
// routes.js

const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .get('/service-worker.js', ({ serviceWorker }) => {
    // serve the service worker built by webpack
    serviceWorker('dist/service-worker.js')
  })
  .get('/p/:productId', ({ cache }) => {
    // cache products for one hour at edge and using the service worker
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        staleWhileRevalidateSeconds: 60 * 60,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60,
      },
    })
    proxy('origin')
  })
  .fallback(({ proxy }) => {
    // serve all unmatched URLs from the origin backend configured in xdn.config.js
    proxy('origin')
  })
```

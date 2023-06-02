---
title: CDN-as-Code (EdgeJS)
---

The `{{ PACKAGE_NAME }}/core` package provides a JavaScript API for controlling routing and caching from your code base rather than a CDN web portal. Using this _{{ EDGEJS_LABEL }}_ approach allows this vital routing logic to be properly tested, reviewed, and version controlled, just like the rest of your application code.

Using the Router, you can:

- Proxy requests to upstream sites
- Send redirects from the network edge
- Render responses on the server using Next.js, Nuxt.js, Angular, or any other framework that supports server side rendering.
- Alter request and response headers
- Send synthetic responses
- Configure multiple destinations for A/B testing

## Prerequisites {/*prerequisites*/}

Before proceeding, you will need an {{ PRODUCT }} property. Create one now if you do not already have one. 

[Learn how to create a property.](/guides/getting_started)

## Configuration {/*configuration*/}

Define routes within the {{ ROUTES_FILE }} file. This file should export an instance of `{{ PACKAGE_NAME }}/core/router/Router`:

```js filename="./routes.js"
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
```

<Callout type = "info">

  By default, our CLI automatically creates `routes.js` and `{{ CONFIG_FILE }}` upon initializing a property (`{{ FULL_CLI_NAME }} init`). If your web application supports TypeScript and it uses a framework for which we have a TypeScript implementation, then our CLI will create `routes.ts` instead of `routes.js`.

</Callout>

## Declare Routes {/*declare-routes*/}

Declare routes using the method corresponding to the HTTP method you want to match.

```js filename="./routes.js"
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

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

```js filename="./routes.js"
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router().match('/some-path', ({ cache, proxy }) => {
  // handle the request here
})
```

## Route Execution {/*route-execution*/}

When {{ PRODUCT_NAME }} receives a request, it executes **each route that matches the request** in the order in which they are declared until one sends a response. The following methods return a response:

- [appShell](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#appshell)
- [compute](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute)
- [proxy](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#proxy)
- [redirect](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#redirect)
- [send](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#send)
- [serveStatic](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#servestatic)
- [serviceWorker](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#serviceworker)
- [stream](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#stream)
- [use](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#compute)

Multiple routes can therefore be executed for a given request. A common pattern is to add caching with one route and render the response with a later one using middleware. In the following example we cache then render a response with Next.js:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { nextRoutes } = require('{{ PACKAGE_NAME }}/next')

// In this example a request to /products/1 will be cached by the first route, then served by the `nextRoutes` middleware
new Router()
  .get('/products/:id', ({ cache }) => {
    cache({
      edge: { maxAgeSeconds: 60 * 60, staleWhileRevalidateSeconds: 60 * 60 },
    })
  })
  .use(nextRoutes)
```

### Alter Requests and Responses {/*alter-requests-and-responses*/}

{{ PRODUCT_NAME }} offers APIs to manipulate request and response headers and cookies. The APIs are:

| Operation     | Request               | Upstream Response              | Response sent to Browser |
| ------------- | --------------------- | ------------------------------ | ------------------------ |
| Set header    | `setRequestHeader`    | `setUpstreamResponseHeader`    | `setResponseHeader`      |
| Add cookie    | `*`                   | `addUpstreamResponseCookie`    | `addResponseCookie`      |
| Update header | `updateRequestHeader` | `updateUpstreamResponseHeader` | `updateResponseHeader`   |
| Update cookie | `*`                   | `updateUpstreamResponseCookie` | `updateResponseCookie`   |
| Remove header | `removeRequestHeader` | `removeUpstreamResponseHeader` | `removeResponseHeader`   |
| Remove cookie | `*`                   | `removeUpstreamResponseCookie` | `removeResponseCookie`   |

`*` Adding, updating, or removing a request cookie can be achieved with `updateRequestHeader` applied to `cookie` header.

You can find detailed descriptions of these APIs in the `{{ PACKAGE_NAME }}/core` [documentation](/docs/api/core/classes/_router_responsewriter_.responsewriter.html).

### Embedded Values {/*embedded-values*/}

You can inject values from the request or response into headers or cookies as template literals using the `${value}` format. For example: `setResponseHeader('original-request-path', '${path}')` would add an `original-request-path` response header whose value is the request path.

| Value                   | Embedded value         | Description                                                                                                                   |
| ----------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| HTTP method             | `${method}`            | The value of the HTTP method used for the request (e.g. `GET`)                                                                |
| URL                     | `${url}`               | The complete URL path including any query strings (e.g. `/search?query=docs`). Protocol, hostname, and port are not included. |
| Path                    | `${path}`              | The URL path excluding any query strings (e.g. `/search`)                                                                     |
| Query string            | `${query:<name>}`      | The value of the `<name>` query string or empty if not available.                                                             |
| Request header          | `${req:<name>}`        | The value of the `<name>` request header or empty if not available.                                                           |
| Request cookie          | `${req:cookie:<name>}` | The value of the `<name>` cookie in `cookie` request header or empty if not available.                                        |
| Request named parameter | `${req:param:<name>}`  | The value of the `<name>` param defined in the route or empty if not available.                                               |
| Response header         | `${res:<name>}`        | The value of the `<name>` response header or empty if not available.                                                          |

## Route Pattern Syntax {/*route-pattern-syntax*/}

The syntax for route paths is provided by [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp), which is the same library used by [Express](https://expressjs.com/).

### Named Parameters {/*named-parameters*/}

Named parameters are defined by prefixing a colon to the parameter name (`:foo`).

```js
new Router().get('/:foo/:bar', res => {
  /* ... */
})
```

**Please note:** Parameter names must use "word characters" (`[A-Za-z0-9_]`).

#### Custom Matching Parameters {/*custom-matching-parameters*/}

Parameters can have a custom regexp, which overrides the default match (`[^/]+`). For example, you can match digits or names in a path:

```js
new Router().get('/icon-:foo(\\d+).png', res => {
  /* ... */
})
```

**Tip:** Backslashes need to be escaped with another backslash in JavaScript strings.

#### Custom Prefix and Suffix {/*custom-prefix-and-suffix*/}

Parameters can be wrapped in `{}` to create custom prefixes or suffixes for your segment:

```js
new Router().get('/:attr1?{-:attr2}?{-:attr3}?', res => {
  /* ... */
})
```

### Unnamed Parameters {/*unnamed-parameters*/}

It is possible to write an unnamed parameter that only consists of a regexp. It works the same the named parameter, except it will be numerically indexed:

```js
new Router().get('/:foo/(.*)', res => {
  /* ... */
})
```

### Modifiers {/*modifiers*/}

Modifiers must be placed after the parameter (e.g. `/:foo?`, `/(test)?`, `/:foo(test)?`, or `{-:foo(test)}?`).

#### Optional {/*optional*/}

Parameters can be suffixed with a question mark (`?`) to make the parameter optional.

```js
new Router().get('/:foo/:bar?', res => {
  /* ... */
})
```

**Tip:** The prefix is also optional, escape the prefix `\/` to make it required.

#### Zero or More {/*zero-or-more*/}

Parameters can be suffixed with an asterisk (`*`) to denote zero or more parameter matches.

```js
new Router().get('/:foo*', res => {
  /* res.params.foo will be an array */
})
```

The captured parameter value will be provided as an array.

#### One or More {/*one-or-more*/}

Parameters can be suffixed with a plus sign (`+`) to denote one or more parameter matches.

```js
new Router().get('/:foo+', res => {
  /* res.params.foo will be an array */
})
```

The captured parameter value will be provided as an array.

## Matching Method, Query Parameters, Cookies, and Headers {/*matching-method-query-parameters-cookies-and-headers*/}

Match can either take a URL path, or an object which allows you to match based on method, query parameters, cookies, or request headers:

```js
router.match(
  {
    path: '/some-path', // value is route-pattern syntax
    method: /GET|POST/i, // value is a regular expression
    cookies: { currency: /^(usd)$/i }, // keys are cookie names, values are regular expressions
    headers: { 'x-moov-device': /^desktop$/i }, // keys are header names, values are regular expressions
    query: { page: /^(1|2|3)$/ }, // keys are query parameter names, values are regular expressions
  },
  () => {},
)
```

## Request Handling {/*request-handling*/}

The second argument to routes is a function that receives a `ResponseWriter` and uses it to send a response. Using `ResponseWriter` you can:

- Proxy a backend configured in `{{ CONFIG_FILE }}`
- Serve a static file
- Send a redirect
- Send a synthetic response
- Cache the response at edge and in the browser
- Manipulate request and response headers

[See the API Docs for Response Writer](/docs/api/core/classes/_router_responsewriter_.responsewriter.html)

## Blocking Search Engine Crawlers {/*blocking-search-engine-crawlers*/}

If you need to block all search engine bot traffic to specific environments (such as your default or staging environment), the easiest way is to include the `x-robots-tag` header with the same directives you would otherwise set in a `meta` tag. 

<Callout type="info">

  The search engine traffic is automatically blocked on {{ PRODUCT }} edge links and permalinks as of {{ PRODUCT }} v6.

  If you would like to enable indexing on those links, you need to pass `{ indexPermalink: true }` into the Router constructor in `routes.js` file:
  ```js
    new Router({ indexPermalink: true })
  ```
  
  Otherwise, {{ PRODUCT }} will match requests with the `host` header matching `/layer0.link|layer0-perma.link/` and set a response header of `x-robots-tag: noindex, nofollow`.

</Callout>

Additionally, you can customize this to block traffic to development or staging websites based on the `host` header of the request:

```js

router
  .get(
    {
      headers: {
        // Regex to catch multiple hostnames
        host: /dev.example.com|staging.example.com/,
      },
    },
    ({ setResponseHeader }) => {
      setResponseHeader('x-robots-tag', 'noindex, nofollow')
    },
  )
```

## Full Example {/*full-example*/}

This example shows typical usage of `{{ PACKAGE_NAME }}/core`, including serving a service worker, next.js routes (vanity and conventional routes), and falling back to a legacy backend.

```js filename="./routes.js"

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

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
    // serve all unmatched URLs from the origin backend configured in {{ CONFIG_FILE }}
    proxy('origin')
  })
```

## Errors Handling {/*errors-handling*/}

You can use the router's `catch` method to return specific content when the request results in an error status (For example, a status code of 537). Using `catch`, you can also alter the `statusCode` and `response` on the edge before issuing a response to the user.

```js
router.catch(RegExp | string | number, (routeHandler: Function))
```

### Examples {/*examples*/}

For example, to issue a custom error page when the origin returns any 5xx status code:

```js filename="routes.js"

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  // Example route that returns with a 5xx error status code
  .get('/failing-route', ({ proxy }) => {
    proxy('broken-origin')
  })
  // So let's assume that the route above returns 5xx, so instead of rendering
  // the broken-origin response we can alter that by specifing .catch
  .catch(/5[0-9][0-9]/, ({ serveStatic }) => {
    // The file below is present at the root of the directory
    serveStatic('customized-error-page.html', { statusCode: 502 })
  })
```

The `.catch` method allows the edge router to render a response based on the result preceeding routes. So in the example above whenever we receive a 5xx, we respond with `customized-error-page.html` from the application's root directory, and change the status code to 502.

- Your catch callback is provided a [ResponseWriter](/docs/api/core/classes/_router_responsewriter_.responsewriter.html) instance. You can use any ResponseWriter method except `proxy` inside `.catch`.
- We highly recommend keeping `catch` routes simple. Serve responses using `serveStatic` instead of `send` to minimize the size of the edge bundle.

## Environment Edge Redirects {/*environment-edge-redirects*/}

In addition to sending redirects at the edge within the router configuration, this can also be configured at the environment level within the {{ PORTAL }}.

Under _&lt;Your Environment&gt; &#8594; Configuration_, click _Edit_ to draft a new configuration. Scroll down to the _Redirects_ section:
![redirects](/images/environments/redirects.png)

Click _Add A Redirect_ to configure the path or host you wish to redirect to:
![add redirect](/images/environments/add_redirects.png)

**Note:** you will need to activate and redeploy your site for this change to take effect.

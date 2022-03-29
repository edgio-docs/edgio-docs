# Routing with EdgeJS

The `{{ PACKAGE_NAME }}/core` package provides a JavaScript API for controlling routing and caching from your code base rather than a CDN web portal. Using this _{{ EDGEJS_LABEL }}_ approach allows this vital routing logic to be properly tested, reviewed, and version controlled, just like the rest of your application code.

Using the Router, you can:

- Proxy requests to upstream sites
- Send redirects from the network edge
- Render responses on the server using Next.js, Nuxt.js, Angular, or any other framework that supports server side rendering.
- Alter request and response headers
- Send synthetic responses
- Configure multiple destinations for split testing

## Configuration

You define routes for {{ PRODUCT_NAME }} using the `routes.js` file.

Before continuing, if you have not already initialized your project with {{ PRODUCT_NAME }}, do so using the instructions in [WebApp CDN](/guides/webapp_cdn_getting_started).

The `routes.js` file should export an instance of `{{ PACKAGE_NAME }}/core/router/Router`:

```js
// routes.js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
```

## Declare Routes

Declare routes using the method corresponding to the HTTP method you want to match.

```js
// routes.js
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

```js
// routes.js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router().match('/some-path', ({ cache, proxy }) => {
  // handle the request here
})
```

## Route Execution

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

### Alter Requests and Responses

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

### Embedded Values

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

#### Zero or More

Parameters can be suffixed with an asterisk (`*`) to denote zero or more parameter matches.

```js
new Router().get('/:foo*', res => {
  /* res.params.foo will be an array */
})
```

The captured parameter value will be provided as an array.

#### One or More

Parameters can be suffixed with a plus sign (`+`) to denote one or more parameter matches.

```js
new Router().get('/:foo+', res => {
  /* res.params.foo will be an array */
})
```

The captured parameter value will be provided as an array.

## Matching Method, Query Parameters, Cookies, and Headers

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

## Body Matching for POST requests

You can also match HTTP `POST` requests based on their request body content as in the following example:

```js
router.match(
  {
    body: { parse: 'json', criteria: { operationName: 'GetProducts' } }, // the body content will parsed as JSON and the parsed JSON matched against the presence of the criteria properties (in this case a GraphQL operation named 'GetProducts')
  },
  () => {},
)
```

Currently the only body content supported is JSON. Body content is parsed as JSON and is matched against the presence of the fields specified in the `criteria` field. The [_POST Body Matching Criteria_](#section_post_body_matching_criteria) section below contains examples of using the `criteria` field.

Body matching can be combined with other match parameters such as headers and cookies. For example,

```js
router.match(
  {
    // Only matches GetProducts operations to the /graphql endpoint
    // for logged in users
    path: '/graphql',
    cookies: { loginStatus: /^(loggedIn)$/i }, // loggedin users
    body: { parse: 'json', criteria: { operationName: 'GetProducts' } },
  },
  () => {},
)
```

### Caching & POST Body Matching

When body matching is combined with `cache` in a route, **the HTTP request body will automatically be used as the cache key.** For example, the code below will cache GraphQL `GetProducts` queries using the entire request body as the cache key:

```js
router.match(
  {
    body: { parse: 'json', criteria: { operationName: 'GetProducts' } },
  },
  ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        staleWhileRevalidateSeconds: 60 * 60 * 24, // this way stale items can still be prefetched
      },
    })
  },
)
```

You can still add additional parameters to the cache key using the normal {{ EDGEJS_LABEL }} `key` property. For example, the code below will cache GraphQL `GetProducts` queries separately for each user based on their userID cookie _and_ the HTTP body of the request.

```js
router.match(
  {
    body: { parse: 'json', criteria: { operationName: 'GetProducts' } },
  },
  ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        staleWhileRevalidateSeconds: 60 * 60 * 24, // this way stale items can still be prefetched
      },
      key: new CustomCacheKey().addCookie('userID'), // Split cache by userID
    })
  },
)
```

### POST Body Matching Criteria

The `criteria` property can be a string or regular expression.

For example, the router below,

```js
router.match(
  {
    body: { parse: 'json', criteria: { foo: 'bar' } },
  },
  () => {},
)
```

would match an HTTP POST request body containing:

```js
{
  "foo": "bar",
  "bar": "foo"
}
```

### Regular Expression Criteria

Regular expressions can also be used as `criteria`. For example,

```js
router.match(
  {
    body: { parse: 'json', criteria: { operationName: /^Get/ } },
  },
  () => {},
)
```

would match an HTTP POST body containing:

```js
{
  "operationName": "GetShops",
  "query": "...",
  "variables": {}
}
```

### Nested JSON Criteria

You can also use a nested object to match a field at a specific location in the JSON. For example,

```js
router.match(
  {
    body: {
      parse: 'json',
      criteria: {
        operation: {
          name: 'GetShops',
        },
      },
    },
  },
  () => {},
)
```

would match an HTTP POST body containing:

```js
{
  "operation": {
    "name": "GetShops",
    "query": "..."
  }
}
```

## GraphQL Queries

The {{ EDGEJS_LABEL }} router provides a `graphqlOperation` method for matching GraphQL.

```js
router.graphqlOperation('GetProducts', res => {
  /* Handle the POST for the GetProducts query specifically */
})
```

By default, the `graphqlOperation` assumes your GraphQL endpoint is at `/graphql`. You can alter this behavior by using the `path` property as shown below:

```js
router.graphqlOperation({ path: '/api/graphql', name: 'GetProducts' }, res => {
  /* Handle the POST for the GetProducts query specifically */
})
```

Note that when the `graphqlOperation` function is used, the HTTP request body will automatically be included in the cache key.

The `graphqlOperation` function is provided to simplify matching of common GraphQL scenarios. For complex GraphQL matching (such as authenticated data), you can use the generic [_Body Matching for POST requests_](#section_body_matching_for_post_requests) feature.

See the guide on [Implementing GraphQL Routing](/guides/graphql) in your project.

## Request Handling

The second argument to routes is a function that receives a `ResponseWriter` and uses it to send a response. Using `ResponseWriter` you can:

- Proxy a backend configured in `{{ CONFIG_FILE }}`
- Serve a static file
- Send a redirect
- Send a synthetic response
- Cache the response at edge and in the browser
- Manipulate request and response headers

[See the API Docs for Response Writer](/docs/__version__/api/core/classes/_router_responsewriter_.responsewriter.html)

## Full Example

This example shows typical usage of `{{ PACKAGE_NAME }}/core`, including serving a service worker, next.js routes (vanity and conventional routes), and falling back to a legacy backend.

```js
// routes.js

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

## Errors Handling

You can use the router's `catch` method to return specific content when the request results in an error status (For example, a 500). Using `catch`, you can also alter the `statusCode` and `response` on the edge before issuing a response to the user.

```js
router.catch(number | Regexp, (routeHandler: Function))
```

### Examples

To issue a custom error page when the origin returns a 500:

```js
// routes.js

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  // Example route
  .get('/failing-route', ({ proxy }) => {
    proxy('broken-origin')
  })
  // So let's assume that backend "broken-origin" returns 500, so instead
  // of rendering the broken-origin response we can alter that by specifing .catch
  .catch(500, ({ serveStatic }) => {
    serveStatic('static/broken-origin-500-page.html', {
      statusCode: 502,
    })
  })
```

The `.catch` method allows the edge router to render a response based on the result preceeding routes. So in the example above whenever we receive a 500 we respond with `broken-origin-500-page.html` from the application's `static` directory and change the status code to 502.

- Your catch callback is provided a [ResponseWriter](/docs/api/core/classes/_router_responsewriter_.responsewriter.html) instance. You can use any ResponseWriter method except `proxy` inside `.catch`.
- We highly recommend keeping `catch` routes simple. Serve responses using `serveStatic` instead of `send` to minimize the size of the edge bundle.

## Environment Edge Redirects

In addition to sending redirects at the edge within the router configuration, this can also be configured at the environment level within the Layer0 Developer Console.

Under _&lt;Your Environment&gt; &#8594; Configuration_, click _Edit_ to draft a new configuration. Scroll down to the _Redirects_ section:
![redirects](/images/environments/redirects.png)

Click _Add A Redirect_ to configure the path or host you wish to redirect to:
![add redirect](/images/environments/add_redirects.png)

**Note:** you will need to activate and redeploy your site for this change to take effect.

---
title: CDN-as-Code ({{ EDGEJS_LABEL }})
---

<Condition version="7">
{{ ROUTEHELPER }}
</Condition>

The `{{ PACKAGE_NAME }}/core` package provides a JavaScript API for controlling routing and caching from your code base rather than a CDN web portal. Using this _{{ EDGEJS_LABEL }}_ approach allows this vital routing logic to be properly tested, reviewed, and version controlled, just like the rest of your application code.

Using the Router, you can:

- Proxy requests to upstream sites
- Send redirects from the network edge
- Render responses on the server using Next.js and Nuxt.js <!--, Angular, or any other framework that supports server side rendering. -->
- Alter request and response headers
- Send synthetic responses

## Prerequisites {/*prerequisites*/}

Before proceeding, you will need an {{ PRODUCT }} property. Create one now if you do not already have one. 

[Learn how to create a property.](/guides/getting_started)

## Configuration {/*configuration*/}

Define routes within the {{ ROUTES_FILE }} file. This file should export an instance of `{{ PACKAGE_NAME }}/core/router/Router`:

```js filename="./routes.js"
import { Router } from "{{ PACKAGE_NAME }}/core";

export default new Router()
```

<Callout type = "info">

  By default, our CLI automatically creates `routes.js` and `{{ CONFIG_FILE }}` upon initializing a property (`{{ FULL_CLI_NAME }} init`). If your web application supports TypeScript and it uses a framework for which we have a TypeScript implementation, then our CLI will create `routes.ts` instead of `routes.js`.

</Callout>

## Declare Routes {/*declare-routes*/}

Declare routes using the method corresponding to the HTTP method you want to match. All HTTP methods are available:

- get
- put
- post
- patch
- delete
- head

To match all methods, use `match`:

```js filename="./routes.js"
import { Router } from "{{ PACKAGE_NAME }}/core";

export default new Router().match("/:path*", {});
```

## Route Pattern Syntax {/*route-pattern-syntax*/}

The syntax for route paths is provided by [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp), which is the same library used by [Express](https://expressjs.com/).

### Named Parameters {/*named-parameters*/}

Named parameters are defined by prefixing a colon to the parameter name (`:foo`).

```js
new Router().get('/:foo/:bar', {
  /* ... */
})
```

**Please note:** Parameter names must use "word characters" (`[A-Za-z0-9_]`).

#### Custom Matching Parameters {/*custom-matching-parameters*/}

Parameters can have a custom regexp, which overrides the default match (`[^/]+`). For example, you can match digits or names in a path:

```js
new Router().get('/icon-:foo(\\d+).png', {
  /* ... */
})
```

**Tip:** Backslashes need to be escaped with another backslash in JavaScript strings.

#### Custom Prefix and Suffix {/*custom-prefix-and-suffix*/}

Parameters can be wrapped in `{}` to create custom prefixes or suffixes for your segment:

```js
new Router().get('/:attr1?{-:attr2}?{-:attr3}?', {
  /* ... */
})
```

### Unnamed Parameters {/*unnamed-parameters*/}

It is possible to write an unnamed parameter that only consists of a regexp. It works the same the named parameter, except it will be numerically indexed:

```js
new Router().get('/:foo/(.*)', {
  /* ... */
})
```

### Modifiers {/*modifiers*/}

Modifiers must be placed after the parameter (e.g. `/:foo?`, `/(test)?`, `/:foo(test)?`, or `{-:foo(test)}?`).

#### Optional {/*optional*/}

Parameters can be suffixed with a question mark (`?`) to make the parameter optional.

```js
new Router().get('/:foo/:bar?', {
  /* ... */
})
```

**Tip:** The prefix is also optional, escape the prefix `\/` to make it required.

#### Zero or More {/*zero-or-more*/}

Parameters can be suffixed with an asterisk (`*`) to denote zero or more parameter matches.

```js
new Router().get('/:foo*', {
  /* ... */
})
```

The captured parameter value will be provided as an array.

#### One or More {/*one-or-more*/}

Parameters can be suffixed with a plus sign (`+`) to denote one or more parameter matches.

```js
new Router().get('/:foo+', {
  /*... */
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
  { /* ... */ },
)
```

## Negated Route Matching {/*negated-route-matching*/}

Previously, we showed how to match requests based on path, method, query parameters, cookies, and request headers. You can also negate these matches by specifying a `not` key in the object passed to your route criteria. For example, the following route matches all requests whose relative path does not match `/some-path`:

```js
router.match({
  "path": {
    "not": "/some-path"
  },
}, {
  "response": {
    "set_response_body": "Matches all requests except for /some-path",
    "set_done": true
  }
})
```

Similarly, you can negate matches based on method, query parameters, cookies, and request headers:

```js
router.match({
  "path": "/some-path",
  "query": {
    "page": {
      "not": /^(1|2|3)$/
    }
  },
  // "method": {
  //     "not": /POST/i
  // },
  // "cookies": { "currency": {
  //   "not": /^(usd)$/i 
  // },
  // "headers": { 
  //   "x-device": {
  //     "not": /^desktop$/i 
  //   }
}, {
  "response": {
    "set_response_body": "Matches all requests to /some-path except for those with query parameter page=1,2,3",
    "set_done": true
  }
})
```

## Request Handling {/*request-handling*/}

The second argument to routes is a function that receives a `Features` type and uses it to send a response, such as:

- Proxy a backend configured in `{{ CONFIG_FILE }}`
- Serve a static file
- Send a redirect
- Send a synthetic response
- Cache the response at edge and in the browser
- Manipulate request and response headers

For example, to send a synthetic response for requests to `/hello-world`:

```js
import { Router } from "{{ PACKAGE_NAME }}/core";

new Router()
  .get('/hello-world', {
    'response': {
      'set_response_body': 'Hello, world!',
      'set_done': true
    }
  })
```

## Route Execution {/*route-execution*/}

When {{ PRODUCT_NAME }} receives a request, it executes **each route that matches the request** in the order in which they are declared until one sends a response.

Multiple routes can therefore be executed for a given request. A common pattern is to add caching with one route and render the response with a later one using middleware. In the following example we cache then render a response with Next.js:

```js
import { Router } from "{{ PACKAGE_NAME }}/core";
import { nextRoutes } from "{{ PACKAGE_NAME }}/next";

// In this example a request to /products/1 will be cached by the first route, then served by the `nextRoutes` middleware
new Router()
  .get('/products/:id', {
    caching: { max_age: { 200: "1h" }, stale_while_revalidate: "1h" },
  })
  .use(nextRoutes)
```

### Stopping Route Execution {/*stopping-route-execution*/}

As mentioned previously, routes are executed in the order in which they are declared. If you want to stop execution of matched routes, you can use the `response` feature with the `set_done` option. This will prevent any additional routes from being executed.

```js
import { Router } from "{{ PACKAGE_NAME }}/core";

new Router()
  // match only /hello-world and stop route execution by immediately sending a response
  .get('/hello-world', {
    'response': {
      'set_response_body': 'Hello, world!',
      'set_done': true
    }
  })

  // match all request paths, including /hello-world
  .get('/(.*)', {
    "response": {
      "set_response_body": "This will never be executed if /hello-world is matched",
    }
  })
  
```

## Alter Requests and Responses {/*alter-requests-and-responses*/}

{{ PRODUCT_NAME }} offers APIs to manipulate request and response headers and cookies. The APIs are:

| Operation     | Request               | Response sent to Browser                                          |
|---------------|-----------------------|-------------------------------------------------------------------|
| Add header    | `set_request_headers` | `add_response_headers`                                            |
| Add cookie    | `*`                   | `*`                                                               |
| Update header | `set_request_headers` | `set_response_headers`                                            |
| Update cookie | `*`                   | `*`                                                               |
| Remove header | `set_request_headers` | `remove_response_headers` <br /> `remove_origin_response_headers` |
| Remove cookie | `*`                   | `*`                                                               |

`*` Adding, updating, or removing request cookies can be achieved with `set_request_headers` applied to `cookie` header. Similarly, adding, updating, or removing response cookies can be achieved with `set_response_headers` applied to `set-cookie` header.

## Request / Response Variables {/*embedded-variables*/}

You can inject values into the request or response via cache key rewrite, headers, cookies, URL redirect and rewrite as template literals using the `%{<FEATURE VALUE>}` format. 

| Feature Variable                  | Description                                                                                                          |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `%{arg_<QUERY STRING PARAMETER>}` | Returns the value corresponding to the query string parameter identified by the `<QUERY STRING PARAMETER>` term.     |
| `%{cookie_<COOKIE>}`              | Returns the value corresponding to the cookie identified by the `<COOKIE>` term.                                     |
| `%{host}`                         | Indicates the host defined in the request URL.                                                                       |
| `%{http_<REQUEST HEADER>}`        | Returns the value corresponding to the request header identified by the `<REQUEST HEADER>` term.                     |
| `%{normalized_path}`              | Indicates the normalized relative path for the request submitted to the CDN.                                         |
| `%{normalized_query}`             | Indicates the normalized query string defined in the request URL.                                                    |
| `%{normalized_uri}`               | Indicates the normalized relative path and query string for the request submitted to the CDN.                        |
| `%{path}`                         | Indicates the relative path to the requested content. This relative path reflects URL rewrites due to `url_rewrite`. |
| `%{query_string}`                 | Indicates the entire query string value defined in the request URL.                                                  |  |
| `%{referring_domain}`             | Indicates the domain defined in the `Referer` request header.                                                        |
| `%{request}`                      | Describes the request.                                                                                               |
| `%{request_method}`               | Indicates the HTTP request method.                                                                                   |
| `%{request_protocol}`             | Indicates the request protocol used by an edge server to proxy the request.                                          |
| `%{request_uri}`                  | Indicates the relative path, including the query string, defined in the request URI.                                 |
| `%{resp_<RESPONSE HEADER>}`       | Returns the value corresponding to the response header identified by the `<RESPONSE HEADER>` term.                   |
| `%{status}`                       | Indicates the HTTP status code for the response.                                                                     |

### Example {/*feature-variables-example*/}

This example shows how you would add an `original-request-path` response header for all requests whose value is the request path:

```js
router.match({}, {
  'headers': {
    set_response_header: { 
      'original-request-path': '%{path}' 
    }
  }
})
```

For a comprehensive list of variables, see the [Feature Variables](/guides/performance/rules/feature_variables) guide.

## Blocking Search Engine Crawlers {/*blocking-search-engine-crawlers*/}

If you need to block all search engine bot traffic to specific environments (such as your default or staging environment), the easiest way is to include the `x-robots-tag` header with the same directives you would otherwise set in a `meta` tag. 

<!-- <Callout type="info">

  The search engine traffic is automatically blocked on {{ PRODUCT }} edge links and permalinks as of {{ PRODUCT }} v6.

  If you would like to enable indexing on those links, you need to pass `{ indexPermalink: true }` into the Router constructor in `routes.js` file:
  ```js
    new Router({ indexPermalink: true })
  ```
  
  Otherwise, {{ PRODUCT }} will match requests with the `host` header matching `/layer0.link|layer0-perma.link/` and set a response header of `x-robots-tag: noindex`.

</Callout> -->

Additionally, you can customize this to block traffic to development or staging websites based on the `host` header of the request:

```js
router.get({
  headers: {
    // Regex to catch multiple hostnames
    host: /dev.example.com|staging.example.com/,
  },
}, {
  "headers": {
    "set_response_headers": {
      "x-robots-tag": "noindex"
    }
  }
})
```

## Full Example {/*full-example*/}

This example shows typical usage of `{{ PACKAGE_NAME }}/core`, including serving a service worker, Next.js routes (vanity and conventional routes), and falling back to a legacy backend.

<RawEdgeJS>
```
[
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/service-worker.js"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "30758400s",
          "bypass_client_cache": true
        },
        "url": {
          "url_rewrite": [
            {
              "source": "/service-worker.js",
              "syntax": "path-to-regexp",
              "destination": "/dist/service-worker.js"
            }
          ]
        },
        "headers": {
          "set_request_headers": {
            "x-edg-serverless-hint": ""
          }
        },
        "origin": {
          "set_origin": "edgio_static"
        }
      }
    ]
  },
  {
    "if": [
      {
        "and": [
          {
            "==": [
              {
                "request": "path"
              },
              "/p/:productId"
            ]
          },
          {
            "===": [
              {
                "request": "method"
              },
              "GET"
            ]
          }
        ]
      },
      {
        "caching": {
          "max_age": "3600s",
          "stale_while_revalidate": "3600s",
          "service_worker_max_age": 3600,
          "bypass_client_cache": true
        },
        "headers": {
          "set_response_headers": {
            "x-sw-cache-control": "max-age=3600"
          }
        },
        "origin": {
          "set_origin": "origin"
        }
      }
    ]
  },
  {
    "if": [
      {
        "==": [
          {
            "request": "path"
          },
          "/:path*"
        ]
      },
      {
        "origin": {
          "set_origin": "origin"
        }
      }
    ]
  }
]
```
</RawEdgeJS>

<!-- ## Errors Handling {/*errors-handling*/}

You can use the router's `catch` method to return specific content when the request results in an error status (For example, a status code of 537). Using `catch`, you can also alter the `statusCode` and `response` on the edge before issuing a response to the user.

```js
router.catch(RegExp | string | number, (routeHandler: Function))
``` -->

<!-- ### Examples {/*examples*/}

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
- We highly recommend keeping `catch` routes simple. Serve responses using `serveStatic` instead of `send` to minimize the size of the edge bundle. -->

<!-- ## Environment Edge Redirects {/*environment-edge-redirects*/}

In addition to sending redirects at the edge within the router configuration, this can also be configured at the environment level within the {{ PORTAL }}.

Under _Environments &#8594; &lt;Your Environment&gt;_, click _Rules_ then _Add Rule_ to draft a new rule configuration. Choose _URL Redirect_ from the dropdown menu:
![redirects](/images/environments/redirects.png)

Click _Add A Redirect_ to configure the path or host you wish to redirect to:
![add redirect](/images/environments/add_redirects.png)

**Note:** you will need to activate and redeploy your site for this change to take effect. -->

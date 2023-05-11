---
title: Getting Started with CDN-As-Code
---

<Condition version="7">{{ROUTEHELPER.md}}</Condition>

Our CDN-as-code approach to configuration allows you to configure CDN behavior using {{ EDGEJS_LABEL }} within a file ({{ ROUTES_FILE }}) stored alongside your code. This allows you to leverage the power of source control for collaboration and to link your CDN configurations with specific versions of your web application.

## Quick Start {/* quick-start */}

Get started with CDN-as-code by either experimenting with:
-   Our [sample websites](#examples):

    <ExampleButtons
      title="Simple"
      siteUrl="https://edgio-community-examples-v7-simple-performance-live.edgio.link/"
      repoUrl="https://github.com/edgio-docs/edgio-v7-simple-performance-example/"
    />
-   Your web application or website.

Perform the following steps to use {{ PRODUCT }} to improve the performance of your web application or website:

1.  Create a property. If you have already performed this step, proceed to the next step.

    [Learn more.](/guides/getting_started)

2.  Use the {{ PRODUCT }} CLI to initialize your property. If you have already performed this step, proceed to the next step.

    <Callout type="info">

    This step requires [Node.js v{{ NODE_VERSION }}](/guides/install_nodejs).

    </Callout>

    Install the {{ PRODUCT }} CLI, initialize your property, and then deploy it by running the following command from the root directory of your web application or website:

    ```bash
    npx {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }} init \
      {{ INIT_ARG_EDGIO_VERSION }} \
      --name <PROPERTY> \
      --deploy
    ```

    Replace `<PROPERTY>` with the name of the property defined in step 1. You should only use lower-case characters and replace spaces with dashes (e.g., `my-property`).

3.  [Define routes](#routes) that determine how {{ PRODUCT }} will handle that traffic.

4.  [Test your changes locally.](#deploy-locally)

5.  [Deploy your property](#deploy-to) to the {{ PRODUCT }} network.

## Routes File {/* routes-file */}

The {{ ROUTES_FILE }} file defines a set of routes. A route:

- Identifies a set of requests by HTTP method, URL path, query string parameters, cookies, and request headers.
- Determines how our CDN will handle the above requests. For example, you may configure those requests to be cached, prefetched, passed through without modification, or served as static content.

<Callout type = "info">

By default, our CLI automatically creates `routes.js` and `{{ CONFIG_FILE }}` upon initializing a property (`{{ FULL_CLI_NAME }} init`). If your web application supports TypeScript and it uses a framework for which we have a TypeScript implementation, then our CLI will create `routes.ts` instead of `routes.js`.

</Callout>

### Default Route Configuration {/* default-route-configuration */}

By default, your {{ ROUTES_FILE }} contains the following configuration:

```js filename="./routes.js"
// This file was added by edgio init.
// You should commit this file to source control.
import {Router, edgioRoutes} from '{{ PACKAGE_NAME }}/core';

export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  // .match('/api/:path*', {
  //   caching: {
  //     max_age: '1d',
  //     stale_while_revalidate: '1h',
  //     bypass_client_cache: true,
  //     service_worker_max_age: '1d',
  //   },
  // })

  // plugin enabling basic Edgio functionality
  .use(edgioRoutes);
```

The above configuration shows an example of how you can match all requests to the `/api/` URL path and cache them at the edge for 1 day.

<!-- <Callout type="info">

  A backend identifies a domain or IP address to which {{ PRODUCT }} may proxy requests. In this case, the `origin` backend was defined when you initialized this property using the `edgio init` command.
<br />

  Add, modify, and remove backends by editing the [{{ CONFIG_FILE }} file](/guides/performance/cdn_as_code/edgio_config).

</Callout> -->

## Routes {/* routes */}

A route identifies a set of requests through any combination of URL path, HTTP method, cookies, request headers, and query string parameters. The following routes show various ways for identifying requests.

- Match all requests:

  ```js
  router.match('/:path*', {
    // route handler goes here
  });
  ```

- Match all `GET` requests whose URL path starts with `/marketing/images/`:

  ```js
  router.get('/marketing/images/:path*', {
    // route handler goes here
  });
  ```

- Match all `GET` and `POST` requests whose URL path starts with `/marketing/images/` and contain the `sport` request header set to `basketball`:

  ```js
  router.match(
    {
      path: '/marketing/images/:path*',
      method: /GET|POST/i, // regular expression
      headers: {sport: /^basketball$/i}, // keys are header names; values are regular expressions
    },
    {
      // route features goes here
    }
  );
  ```

Once you have identified a set of requests, you need to define how {{ PRODUCT }} will handle those requests. The following routes show various ways in which requests can be processed.

- Apply a caching policy to all requests and proxy cache misses to the `origin` backend:
  ```js
  router.match('/:path*', {
    {
      caching: {
        max_age: "1h"
      },
      origin: {
        set_origin: "origin"
      }
    }
  })
  ```
- Set the `images` response header and proxy cache misses to the `origin` backend for all `GET` requests whose URL path starts with `/marketing/images/`:
  ```js
  router.get('/marketing/images/:path*', {
    headers: {
      set_response_headers: {
        images: 'true',
      },
    },
    origin: {
      set_origin: 'origin',
    },
  });
  ```

[View additional examples.](/guides/performance/cdn_as_code/common_routing_patterns)

### Defining Routes {/* defining-a-route */}

Routes are defined by calling a function on the `Router` object based on the HTTP method you intend to match. For example, you can handle a `GET` request a specific path or pattern using the `Router.get(...)` function. The router contains methods for all the supported HTTP methods. The following methods are available:

- `delete`
- `get`
- `head`
- `match` (matches any HTTP method)
- `options`
- `patch`
- `post`
- `put`

A full list of supported functions can be found in the [Router API documentation](/docs/api/core/classes/index.Router.html).

### Route Method Signature {/* route-fumethodnction-signature */}

Using `.match()` as an example, the method signature is as follows:

```ts
match(
  criteria: RouteCriteria | string | string[] | RegExp,
  features: FeaturesParam
)
```

The first argument `criteria` defines how to match a request. It can be a string (or array of strings), a regular expression, or an object of type [`RouteCriteria`](/docs/api/core/interfaces/router_RouteCriteria.default.html). For example, to match requests to the `/api/*` URL path, you could define the criteria as follows:

```js
// match by named parameter
router.match('/api/:path*', {
  // route features goes here
});

// match by regular expression
router.match(/^\/api\/(.*)$/, {
  // route features goes here
});

// match by `path` property
router.match(
  {
    path: '/api/:path*',
  },
  {
    // route features goes here
  }
);
```

All of the above examples are equivalent and show the various ways in which you can define the route criteria.

The second argument `features`, also referred to as the route handler, defines how to handle a request such as how to cache the response, how to proxy the request to the origin, or how to modify the request and response headers. This is an object of type [`Features`](/docs/api/core/interfaces/types.Features.html) and the full list of supported features can be found in the [Features API reference](/guides/performance/rules/features).

We will now define a route by uncommenting the `match()` method in your {{ ROUTES_FILE }} file. It should now look similar to the following configuration:

```js filename="./routes.js"
export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  .match('/api/:path*', {
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
      bypass_client_cache: true,
      service_worker_max_age: '1d',
    },
  })

  // plugin enabling basic Edgio functionality
  .use(edgioRoutes);
```

<a id="caching-policy" />{' '}

The above route matches all requests that start with `/api/` and instructs {{ PRODUCT }} to:

- Cache those requests on our network for one day.
- Allow us to serve stale content for one hour.
- Instruct the browser to treat the response as immediately stale.
- Allow prefetched requests to be served from cache for one day.
- Proxy those requests to your `origin` backend when we cannot serve them from cache.

We will now add a route that applies the same caching policy to all JavaScript (i.e., `.js` and `.mjs`) and CSS files.

```js filename="./routes.js"
// Cache stylesheets and scripts, but prevent browser caching
router.match('/:path*/:file.:ext(js|mjs|css)', {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1h',
    service_worker_max_age: '1d',
    bypass_client_cache: true,
  },
  headers: {
    set_response_headers: {
      'cache-control': 'public, max-age=86400',
    },
    remove_origin_response_headers: ['set-cookie'],
  },
  origin: {
    set_origin: 'origin',
  },
});
```

The above route instructs {{ PRODUCT }} to perform the following actions for all requests whose file extension matches `js`, `mjs`, or `css`:

- Set the `cache-control` response header to: `cache-control: public, max-age=86400`
- Remove the `set-cookie` response header. {{ PRODUCT }} will not cache a response when the `set-cookie` response header is present.
- Apply the [caching policy](#caching-policy).
- Proxy these requests to your `origin` backend when we cannot serve them from cache.

Your {{ ROUTES_FILE }} should now look similar to the following:

```js filename="./routes.js"
import {Router} from '@edgio/core/router';

export default new Router()
  .match('/api/:path*', {
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
      service_worker_max_age: '1d',
      bypass_client_cache: true,
    },
    origin: {
      set_origin: 'origin',
    },
  })

  // Cache stylesheets and scripts, but prevent browser caching
  .match('/:path*/:file.:ext(js|mjs|css)', {
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
      service_worker_max_age: '1d',
      bypass_client_cache: true,
    },
    headers: {
      set_response_headers: {
        'cache-control': 'public, max-age=86400',
      },
      remove_origin_response_headers: ['set-cookie'],
    },
    origin: {
      set_origin: 'origin',
    },
  })

  // plugin enabling basic Edgio functionality
  .use(edgioRoutes);
```

## Conditional Routes {/* conditional-routes */}

Conditional routes allow you to apply [rules](/guides/performance/rules) to a request using advanced if/then logic by the means of logical and comparison operators.

### Using the `.conditional()` method {/* using-the-conditional-method */}

Using the previous example above for caching the `/api/*` path, we can rewrite the same route using the [`conditional()`](/docs/core/classes/index.Router.html#conditional) method. This method accepts a single argument of type `Matches`. You can see the full specification of the `Matches` type in the [API reference](/docs/core/interfaces/types.Matches.html).

```js filename="./routes.js"
import {Router} from '@edgio/core/router';

export default new Router().conditional({
  if: [
    {
      and: [
        {
          '===': [
            {
              request: 'method',
            },
            'GET',
          ],
        },
        {
          '==': [
            {
              request: 'path',
            },
            '/api/:path*',
          ],
        },
      ],
    },
    {
      caching: {
        max_age: '1d',
        stale_while_revalidate: '1h',
        service_worker_max_age: '1d',
        bypass_client_cache: true,
      },
      origin: {
        set_origin: 'origin',
      },
    },
  ],
});
```

This is equivalent to the previous example. Broken down by line:

- The `if` array contains two objects. The first object defines an array of conditions that must be met using the `and` logic operator. The second object defines the features to apply if all conditions are met.
  - The `and` array requires all the following conditions to be satisfied:
    - the HTTP request method strictly equals (`===`) `GET`
    - the request path is a simple match (`==`) `/api/:path*`. (eg. `/api/foo` or `/api/foo/bar`)
  - Assuming all conditions are met, the following features will be applied:
    - the request will be cached at the edge for one day.
    - the request will be forwarded to the origin when the cache is stale, and then cached for one day.

### Types of Operators and Conditionals {/* types-of-operators-and-conditionals */}

#### Operators {/* operators */}

The [`Boolean`](/docs/core/interfaces/types.Boolean.html) type is used as a logical operator in the `if` array. You may specify an `and` or `or` operator. The `and` operator requires all conditions to be met. The `or` operator requires only one condition to be met.

<Callout type="warning">

Currently, only a single `and/or` operator is supported. The following would be an invalid use of multiple operators:

```js
{
  if: [
    {
      and: [
        {
          // conition
        },
        {
          // condition
        },
      ],
      or: [
        {
          // condition
        },
      ],
    },
    {
      // features
    },
  ],
}
```

</Callout>

#### Conditionals {/* conditionals */}

Conditionals define the expectations that must be met, using comparison operators, for the features to be applied to the request. This example of a single conditional identifies the type of comparison to take against the [`RulesVariables`](/docs/core/interfaces/types.RulesVariables.html) and the expected value:

```js
{
  '===': [ // comparison operator
    {
      request: 'method', // rules variable
    },
    'GET', // expected value
  ],
}
```

#### Comparison Operators {/* comparison-operators */}

| Operator | Description                       |
| -------- | --------------------------------- |
| `==`     | Simple match.                     |
| `!=`     | Negated simple match.             |
| `===`    | Strict match.                     |
| `!==`    | Negated strict match.             |
| `<`      | Less than.                        |
| `<=`     | Less than or equal to.            |
| `>`      | Greater than.                     |
| `>=`     | Greater than or equal to.         |
| `in`     | Value is in the array.            |
| `not_in` | Value is not in the array.        |
| `=~`     | Regular expression match.         |
| `!~`     | Negated regular expression match. |

### Example {/*example*/}

This example shows multiple conditionals that use various comparison operators and rules variables:

```js filename="./routes.js"
import {Router} from '@edgio/core/router';

export default new Router().conditional({
  if: [
    {
      and: [
        {
          '=~': [
            {
              'request.header': 'x-test',
            },
            '^foo$',
          ],
        },
        {
          and: [
            {
              '!==': [
                {
                  request: 'method',
                },
                'DELETE',
              ],
            },
            {
              and: [
                {
                  '==': [
                    {
                      request: 'path',
                    },
                    '/api/v:version/:path*',
                  ],
                },
                {
                  and: [
                    {
                      not_in: [
                        {
                          request: 'path',
                        },
                        ['/api/v1', '/api/v2'],
                      ],
                    },
                    {
                      and: [
                        {
                          '!~': [
                            {
                              'request.cookie': 'user_level',
                            },
                            '^level_(1|2)$',
                          ],
                        },
                        {
                          and: [
                            {
                              '===': [
                                {
                                  device: 'is_robot',
                                },
                                true,
                              ],
                            },
                            {
                              '>=': [
                                {
                                  device: 'resolution_height',
                                },
                                800,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      caching: {
        bypass_client_cache: true,
        service_worker_max_age: '1d',
        max_age: {
          200: '1d',
        },
        stale_while_revalidate: '1h',
      },
      origin: {
        set_origin: 'origin',
      },
    },
  ],
});
```

## Testing Locally {/* deploy-locally */}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by allowing you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ FULL_CLI_NAME }} dev`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

## Deploying Your Property {/* deploy-to */}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Assess performance and caching behavior from the {{ PORTAL_LINK }}. Fine-tune your configuration by adding routes and then redeploying your property. Once you are ready to serve production traffic through {{ PRODUCT }}, update your site's DNS to point to our service.

[Learn more.](/guides/production)

## Examples {/* examples */}

Use our sample website to gain hands-on experience on how to set up {{ PRODUCT }} {{ PRODUCT_EDGE }}. Specifically, you can browse our sample websites, view their source code, and even experiment on them by deploying them to {{ PRODUCT }}.

**Simple Example**

This example demonstrates a basic {{ PRODUCT }} configuration for `publicdomainreview.org`. It contains two routes that cache content according to their file extension.

<ExampleButtons
  title="Simple"
  siteUrl="https://edgio-community-examples-v7-simple-performance-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-simple-performance-example/"
/>

<!-- TODO: update example to work on v7
**Full-Featured Example**

This example demonstrates a full-featured {{ PRODUCT }} configuration that showcases the following functionality:

- [Proxying requests](/guides/performance/cdn_as_code/common_routing_patterns#proxying-an-origin) to multiple origins
- Increasing the cache buffer during revalidation through [StaleWhileRevalidate](/guides/performance/caching#achieving-100-cache-hit-rates)
- [Prerendering](/guides/performance/static_prerendering) pages and caching them to improve performance.
- Instructing the browser to [prefetch](/guides/performance/prefetching) and [deep fetch](/guides/performance/prefetching#deep-fetching) cached content to improve performance.

  <Callout type="info">

  Prefetching only improves performance for cached content. {{ PRODUCT }} returns `412 Precondition Failed` when prefetching a cache miss. This status code means that the prefetching did not occur for that request.

  </Callout>

- [Transforming and optimizing images](/guides/performance/image_optimization)
- Transforming the response through [Serverless Compute](/guides/performance/serverless_compute)
- [Removing response headers](/guides/performance/cdn_as_code#alter-requests-and-responses)
- [Normalizing the cache key](/guides/performance/caching#customizing-the-cache-key)
- Generating performance insights through [DevTools](/guides/performance/observability/devtools)
- Tracking [Core Web Vitals](/guides/performance/observability/core_web_vitals) through real user monitoring (RUM).

<ExampleButtons
  title="Full-Featured"
  siteUrl="https://edgio-community-examples-full-featured-performance-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-full-featured-performance-example/"
  deployFromRepo
/>
-->

## Issues? {/* issues */}

If you have any issues during this process, check our [forums]({{ FORUM_URL }}) for assistance.

---
title: Conditional Routes
---

Define a rule that uses advanced condition-based logic through:
-   [.if(), .elseif(), and .else() methods.](#using-the-if-elseif-and-else-methods)
-   [.and(), .or(), and .not() logical functions.](#logical-and-or-not-functions)
-   [Comparison operators](#comparison-operators), such as `==`, `===`, and `=~`.
-   Additional routers that establish [nested rules](#nested-rules).

<Callout type="important">

This documentation expects you to be familiar with defining simple rules through `.get()`, `.match()` and `.post()` [Router](/docs/api/core/classes/router_Router.default.html) methods, as explained in [Route Criteria and Conditions](/applications/performance/cdn_as_code/route_criteria) and [Route Features](/applications/performance/cdn_as_code/route_features) documentation.

</Callout>

## Using the .if(), .elseif(), and .else() Methods {/* using-the-if-elseif-and-else-methods */}

The [Router](/docs/api/core/classes/router_Router.default.html) class includes the conditional methods `.if()`, `.elseif()`, and `.else()` to implement if/then logic on requests. You can chain these methods to craft sophisticated routing rules. For enhanced conditions, you can embed [logical operator functions](#logical-and-or-not-functions) within the `.if()` and `.elseif()` criteria.

Both the [`.if()`](/docs/api/core/classes/router_Router.default.html#if) and [`.elseif()`](/docs/api/core/classes/router_Router.default.html#elseif) methods have the same signature when it comes to defining conditions and features. The first argument is of type [`ConditionCriteria`](/docs/api/core/types/router_RouteCriteria.ConditionCriteria.html), designed to specify one or more conditions. The subsequent (_N_) arguments are of the [`ConditionalParam`](/docs/api/core/types/router_Router.ConditionParam.html) type, letting you define various features or routers, especially for [nested rules](#nested-rules).

Likewise, the [`.else()`](/docs/api/core/classes/router_Router.default.html#else) method takes any number (_N_) of arguments of the [`ConditionalParam`](/docs/api/core/types/router_Router.ConditionParam.html) type, allowing you to outline features or [nested rules](#nested-rules).

It's important to note the chaining order of the conditional methods.

- `.if()` does not require a following `.elseif()` or `.else()` method.

  ```js
  router.if(/* ... */).get(/* ... */).match(/* ... */);
  ```

- `.else()` must follow directly after the `.if()` method or after an `.elseif()` method.

  ```js
  router.if(/* ... */).else(/* ... */).get(/* ... */).match(/* ... */);
  ```

- `.elseif()` must follow directly after the `.if()` method or another `.elseif()` method.

  ```js
  router
    .if(/* ... */)
    .elseif(/* ... */)
    .else(/* ... */)
    .get(/* ... */)
    .match(/* ... */);
  ```

The following example is invalid as `.elseif()` and `.else()` are not following directly after `.if()` or `.elseif()`:

```js diff highlight="3,5"
router
  .if(/* ... */)
  .get(/* ... */)
  .elseif(/* ... */) // must follow directly after .if() or .elseif()
  .match(/* ... */)
  .else(/* ... */); // must follow directly after .if() or .elseif()
```

### IF / ELSE Condition {/* if-else-condition */}

```js
import {Router} from '@edgio/core';

export default new Router()
  .if(
    {
      path: '/foo',
    },
    {
      response: {
        set_response_body: 'Hello, /foo!',
      },
    }
  )
  .else({
    response: {
      set_response_body: 'Hello, world!',
    },
  });
```

In this example, if the request path is `/foo`, the response body will be `Hello, /foo!`. For all other request paths, the response body will be `Hello, world!`.

### IF / ELSEIF / ELSE Condition {/* if-elseif-else-condition */}

```js
import {Router} from '@edgio/core';

export default new Router()
  .if(
    {
      path: '/foo',
    },
    {
      response: {
        set_response_body: 'Hello, /foo!',
      },
    }
  )
  .elseif(
    {
      path: '/bar',
    },
    {
      response: {
        set_response_body: 'Hello, /bar!',
      },
    }
  )
  .else({
    response: {
      set_response_body: 'Hello, world!',
    },
  });
```

In this example, if the request path is `/foo`, the response body will be `Hello, /foo!`. If the request path is `/bar`, the response body will be `Hello, /bar!`. For all other request paths, the response body will be `Hello, world!`.

## Logical .and(), .or(), not() Functions {/* logical-and-or-not-functions */}

Using the [`.and()`](/docs/api/core/functions/router_RouteCriteria.and.html), [`.or()`](/docs/api/core/functions/router_RouteCriteria.or.html) and [`.not()`](/docs/api/core/functions/router_RouteCriteria.not.html) helper functions, you can create more complex logic within your conditional rules. These functions may be imported from the `{{ PACKAGE_NAME }}/core` package.

```js
import {Router, and, or, not} from '@edgio/core';

export default new Router()
  .if(
    or(
      {
        path: '/foo',
      },
      {
        path: '/bar',
      }
    ),
    {
      response: {
        set_response_body: 'Hello, /foo or /bar!',
      },
    }
  )
  .elseif(
    and(
      {path: '/baz'},
      not({
        method: 'POST',
      })
    ),
    {
      response: {
        set_response_body: 'Hello, /baz with a non-POST method!',
      },
    }
  )
  .else({
    response: {
      set_response_body: 'Hello, world!',
    },
  });
```

In this example, if the request path is `/foo` or `/bar`, the response body will be `Hello, /foo or /bar!`.

If the request path is `/baz` and the request method is not `POST`, the response body will be `Hello, /baz with a non-POST method!`.

For all other request paths, the response body will be `Hello, world!`.

## Nested Rules {/* nested-rules */}

Nested rules are applied to an existing conditional route. They are a set of child rules under a parent `.if()`, `.elseif()`, or `.else()` method. Nested rules are defined using a new `Router` instance.

<Callout type="important">

Nested rules _must_ use a new `Router` instance. You cannot use the same `Router` instance for both the parent and nested rules.

</Callout>

For example, you can use rules to split traffic to different origins based on a cookie, and nested rules to handle requests to a specific path. The example below will send traffic to different origins depending on the cookie value, and then apply nested rules to rewrite the URL path for requests to `/assets/*` to `/public/assets/*`:

```js
import {Router} from '@edgio/core';

export default new Router()
  .if(
    {cookies: {experience: 'new'}},
    {origin: {set_origin: 'new_origin'}},
    new Router().match('/assets/:path*', {
      url: {
        url_rewrite: [
          {
            source: '/assets/:path*',
            destination: '/public/assets/:path*',
            syntax: 'path-to-regexp',
          },
        ],
      },
    })
  )
  .else({origin: {set_origin: 'legacy_origin'}});
```

## Advanced Criteria {/* advanced-criteria */}

If you wish to utilize the `.if()`, `.elseif()`, and `.else()` methods but find that your criteria are not supported by [`RouteCriteria`](/docs/api/core/interfaces/router_RouteCriteria.default.html), consider using the `edgeControlCriteria` property. This property allows you to define more advanced criteria using object-literal notation and is of the type `Matches`. For a detailed specification of the `Matches` type, refer to the [API reference](/docs/api/core/interfaces/types.Matches.html).

The following example applies the nested logic if the device is a tablet and the HTTP request method is `GET` (combination of both criteria formats):

```js
import {Router, and} from '@edgio/core';

export default new Router()
  .if(
    and(
      {
        edgeControlCriteria: {
          "===": [
            {
              device: "is_tablet"
            },
            true
          ]
        },
        { method: "GET" }
      }
    ),
    new Router().if(/* ... */)
  );
```

## Using the .conditional() Method {/* using-the-conditional-method */}

<Callout type="warning">

Using the `.conditional()` method to define complex rules is no longer recommended. It's advisable to use the `.if()`, `.elseif()`, and `.else()` methods instead.

For those with existing `.conditional()` calls, you can map them to the simpler `.if()` calls using the `Export to EdgeJS` functionality available in {{ PORTAL_LINK }}. For more information, consult the [Rules](/applications/performance/rules#export-rules-edgejs) documentation.

</Callout>

Let's revisit the example from our [Default Route Configuration](/applications/performance/cdn_as_code#default-route-configuration) section where we cached all requests to `/api/*`:

```js
// This file was added by edgio init.
// You should commit this file to source control.
import {Router, edgioRoutes} from '@edgio/core';

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

Using the example above for caching the `/api/*` path, we can rewrite the same route using the [`conditional()`](/docs/api/core/classes/router_Router.default.html#conditional) method. This method accepts a single argument of type `Matches`. You can see the full specification of the `Matches` type in the [API reference](/docs/api/core/interfaces/types.Matches.html).

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

- The `if` key is an array containing two objects. The first object defines the conditions that must be met using the `and` logic key. The second object defines the features to apply if all conditions are met.
  - The `and` array requires all the following conditions to be satisfied:
    - The HTTP request method strictly equals (`===`) `GET`
    - The request path is a simple match (`==`) `/api/:path*`. (eg. `/api/foo` or `/api/foo/bar`)
  - Assuming all conditions are met, the following features will be applied:
    - The request will be cached at the edge for one day.
    - The request will be forwarded to the origin when the cache is stale, and then cached for one day.
    - The request will be cached by the service worker for one day.

### Types of Operators and Conditionals {/* types-of-operators-and-conditionals */}

#### Operators {/* operators */}

The [`Boolean`](/docs/api/core/interfaces/types.Boolean.html) type is used as a logical operator in the `if` array. You may specify an `and` or `or` operator. The `and` operator requires all conditions to be met. The `or` operator requires only one condition to be met.

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

#### Criteria Format {/* criteria-format */}

The criteria outline the conditions that a request must fulfill for certain features to be applied. In simple terms, they state: "If the request meets these conditions, apply the specified features."

In the following example, we are using the `===` operator to check if a certain aspect of the request ([`RulesVariables`](/docs/api/core/interfaces/types.RulesVariables.html)) matches an expected value:

```js
{
  '===': [ // This is a strict equality operator
    {
      request: 'method', // We are looking at the method of the request
    },
    'GET', // We expect the method to be 'GET'
  ],
};
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

<Callout type="important">

If your routes file contains old `.conditional()` calls, they can be simplified to `.if()` calls through `export to EdgeJS` functionality in {{ PORTAL_LINK }}. To learn more, see [Rules](performance/rules#export-rules-edgejs) documentation.

</Callout>

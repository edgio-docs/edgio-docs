---
title: Conditional Routes
---

Conditional routes allow you to apply [Rules](/guides/performance/rules) to a request using advanced if/then logic by the means of logical and comparison operators. [Nested rules](#nested-rules) may also be applied using multiple routers.

<Callout type="important">

This documentation expects you to be familiar with defining simple rules through `.get()`, `.match()` and `.post()` [Router](/docs/api/core/classes/router_Router.default.html) methods, as explained in [Route Criteria and Conditions](/guides/performance/cdn_as_code/route_criteria) and [Route Features](/guides/performance/cdn_as_code/route_features) documentation.

</Callout>

## Using the .if(), .elseif(), and .else() Methods {/* using-the-if-elseif-and-else-methods */}

The `.if()`, `.elseif()`, and `.else()` methods are members of the [Router](/docs/api/core/classes/router_Router.default.html) class and are used to apply if/then logic to a request. These methods can be chained together to create complex rules. Additionally, you can use [Logical Operator Functions](#logical-and-or-not-functions) within the `.if()` and `.elseif()` criteria for more advanced conditioning.

The signature for the [`.if()`](/docs/api/core/classes/router_Router.default.html#if) and [`.elseif()`](/docs/api/core/classes/router_Router.default.html#elseif) methods is similiar as for defining simple conditions and features. The first argument of the [`ConditionCriteria`](/docs/api/core/types/router_RouteCriteria.ConditionCriteria.html) type is used to define one or more conditions. The remaining _N_ arguments are of type [`ConditionalFeaturesParam`](/docs/api/core/types/router_Router.ConditionFeaturesParam.html) where one or more features or routers (for [nested rules](#nested-rules)) may be defined.

The [`.else()`](/docs/api/core/classes/router_Router.default.html#else) method accepts _N_ number of arguments of type [`ConditionalFeaturesParam`](/docs/api/core/types/router_Router.ConditionFeaturesParam.html) where one or more features or routers (for [nested rules](#nested-rules)) may be defined.

### IF / ELSE Condition {/* if-else-condition */}

```js
import {Router, and, or, not} from '@edgio/core';

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
import {Router, and, or, not} from '@edgio/core';

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

<Callout type="important">

Calls of `.else()` and `.elseif()` must follow directly after an `.if()` call or another `.elseif()` call.

</Callout>

## Logical .and(), .or(), not() Functions {/* logical-and-or-not-functions */}

Using the [`.and()`](/docs/api/core/functions/router_RouteCriteria.and.html), [`.or()`](/docs/api/core/functions/router_RouteCriteria.or.html) and [`.not()`](/docs/api/core/functions/router_RouteCriteria.not.html) helper functions, you can create more complex logic within your conditional rules.

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

If you wish to use `.if()`, `.elseif()`, and `.else()` methods, but your criteria is not supported by [`RouteCriteria`](/docs/api/core/interfaces/router_RouteCriteria.default.html),
you can use the `edgeControlCriteria` property to write custom JSON logic. The property is of type `Matches`.
You can see the full specification of the `Matches` type in the [API reference](/docs/api/core/interfaces/types.Matches.html).

Following example applies the nested logic if device is a tablet and the method is GET (combination of both criteria formats):

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

This method of defining complex rules is no longer optimal - the `.if()`, `.elseif()`, and `.else()` methods should be used instead.

The mapping of your old `.conditional()` calls to simplified `.if()` calls can be done through `Export to EdgeJS` functionality in {{ PORTAL_LINK }}. To learn more, see [Rules](/guides/performance/rules#export-rules-edgejs) documentation.

</Callout>

Let's revisit the example from our [Default Route Configuration](/guides/performance/cdn_as_code#default-route-configuration) section where we cached all requests to `/api/*`:

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

- The `if` array contains two objects. The first object defines an array of conditions that must be met using the `and` logic operator. The second object defines the features to apply if all conditions are met.
  - The `and` array requires all the following conditions to be satisfied:
    - the HTTP request method strictly equals (`===`) `GET`
    - the request path is a simple match (`==`) `/api/:path*`. (eg. `/api/foo` or `/api/foo/bar`)
  - Assuming all conditions are met, the following features will be applied:
    - the request will be cached at the edge for one day.
    - the request will be forwarded to the origin when the cache is stale, and then cached for one day.

### Types of Operators and Conditionals {/* types-of-operators-and-conditionals */}

#### Operators {/* operators */}

The [`Boolean`](/docs/api/core/interfaces/types.Boolean.html) type is used as a logical operator in the `if` array. You may specify an `and` or `or` operator. The `and` operator requires all conditions to be met. The `or` operator requires only one condition to be met.

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

#### Criteria Format {/* criteria-format */}

The criteria define the expectations that must be met, using comparison operators, for the features to be applied to the request. This example of a single conditional identifies the type of comparison to take against the [`RulesVariables`](/docs/api/core/interfaces/types.RulesVariables.html) and the expected value:

```js
{
  '===': [ // comparison operator
    {
      request: 'method', // rules variable
    },
    'GET', // expected value
  ]
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

<Callout type="important">

If your routes file contains old `.conditional()` calls, they can be simplified to `.if()` calls through `export to EdgeJS` functionality in {{ PORTAL_LINK }}. To learn more, see [Rules](performance/rules#export-rules-edgejs) documentation.

</Callout>

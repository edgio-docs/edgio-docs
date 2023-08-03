---
title: Conditional Routes
---

Conditional routes allow you to apply [Rules](/guides/performance/rules) to a request using advanced if/then logic by the means of logical and comparison operators. [Nested rules](#nested-rules) may also be applied using multiple routers.

<Callout type="important">

This documentation expects you to be familiar with defining simple rules through `.get()`, `.match()` and `.post()` [Router](/docs/api/core/classes/router_Router.default.html) methods, as explained in [Route Criteria and Conditions](/guides/performance/cdn_as_code/route_criteria) and [Route Features](/guides/performance/cdn_as_code/route_features) documentation.

</Callout>

## Using the .if(), .elseif(), and .else() Methods {/* using-the-if-elseif-and-else-methods */}

The `.if()`, `.elseif()`, and `.else()` methods are members of the [Router](/docs/api/core/classes/router_Router.default.html) class and are used to apply if/then logic to a request. These methods can be chained together to create complex rules. Additionally, you can use [`.and()`](/docs/api/core/functions/router_RouteCriteria.and.html), [`.or()`](/docs/api/core/functions/router_RouteCriteria.or.html) and [`.not()`](/docs/api/core/functions/router_RouteCriteria.not.html) utility functions as logical operators within the `.if()` and `.elseif()` criteria.

The signature for the [`.if()`](/docs/api/core/classes/router_Router.default.html#if) and [`.elseif()`](/docs/api/core/classes/router_Router.default.html#elseif) methods is similiar as for defining simple conditions and features. The first argument of the [`ConditionCriteria`](/docs/api/core/types/router_RouteCriteria.ConditionCriteria.html) type is used to define one or more conditions. The remaining _N_ arguments are of type [`ConditionalFeaturesParam`](/docs/api/core/types/router_Router.ConditionFeaturesParam.html) where one or more features or routers (for [nested rules](#nested-rules)) may be defined.

The [`.else()`](/docs/api/core/classes/router_Router.default.html#else) method accepts _N_ number of arguments of type [`ConditionalFeaturesParam`](/docs/api/core/types/router_Router.ConditionFeaturesParam.html) where one or more features or routers (for [nested rules](#nested-rules)) may be defined.

#### IF / ELSE Condition {/* if-else-condition */}

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

#### IF / ELSEIF / ELSE Condition {/* if-elseif-else-condition */}

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

#### Logical Operators {/* logical-operators */}

Using the `and()` and `or()` helper functions, you can create more complex logic within your conditional rules. Logic may also be negated using the `not()` helper function.

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
      { path: '/baz' },
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
    { cookies: { experience: 'new' } },
    { origin: { set_origin: 'new_origin' } },
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
  .else({ origin: { set_origin: 'legacy_origin' } });
  
```


## Complex Criteria {/* complex-criteria */}

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

#### Criteria format {/* criteria-format */}

The criteria defines the expectations that must be met using comparison operators, for the features to be applied to the request. This example of a single conditional identifies the type of comparison to take against the [`RulesVariables`](/docs/api/core/interfaces/types.RulesVariables.html) and the expected value:

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

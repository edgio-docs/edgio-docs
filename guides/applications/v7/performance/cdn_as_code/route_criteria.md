---
title: Route Criteria and Conditions
---

Route conditions allow you to match requests based on the request path, method, query parameters, cookies, and request headers. You can also use route conditions to match requests based on regular expressions and negation.

As outlined in the [Route Criteria](/guides/performance/cdn_as_code#route-criteria) section of the CDN-as-Code guide, route criteria are defined as the first argument to the `Router` method being called in the `routes.js` file, such as `.match()`, `.get()`, `.post()`, etc.

## Simple Path Matching {/* simple-path-matching */}

The syntax for route paths utilizing simple matching is provided by [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp), which is the same library used by [Express](https://expressjs.com/).

### Named Parameters {/* named-parameters */}

Named parameters are defined by prefixing a colon to the parameter name (`:foo`).

```js
router.get('/:foo/:bar', {
  /* ... */
});
```

<Callout type="important">
  Parameter names must use "word characters" (`[A-Za-z0-9_]`).
</Callout>

#### Custom Matching Parameters {/* custom-matching-parameters */}

Parameters can have a custom regexp, which overrides the default match (`[^/]+`). For example, you can match digits or names in a path:

```js
router.get('/icon-:foo(\\d+).png', {
  /* ... */
});
```

**Tip:** Backslashes need to be escaped with another backslash in JavaScript strings.

#### Custom Prefix and Suffix {/* custom-prefix-and-suffix */}

Parameters can be wrapped in `{}` to create custom prefixes or suffixes for your segment:

```js
router.get('/:attr1?{-:attr2}?{-:attr3}?', {
  /* ... */
});
```

### Unnamed Parameters {/* unnamed-parameters */}

It is possible to write an unnamed parameter that only consists of a regexp. It works the same the named parameter, except it will be numerically indexed:

```js
router.get('/:foo/(.*)', {
  /* ... */
});
```

### Modifiers {/* modifiers */}

Modifiers must be placed after the parameter (e.g. `/:foo?`, `/(test)?`, `/:foo(test)?`, or `{-:foo(test)}?`).

#### Optional {/* optional */}

Parameters can be suffixed with a question mark (`?`) to make the parameter optional.

```js
router.get('/:foo/:bar?', {
  /* ... */
});
```

**Tip:** The prefix is also optional, escape the prefix `\/` to make it required.

#### Zero or More {/* zero-or-more */}

Parameters can be suffixed with an asterisk (`*`) to denote zero or more parameter matches.

```js
router.get('/:foo*', {
  /* ... */
});
```

The captured parameter value will be provided as an array.

#### One or More {/* one-or-more */}

Parameters can be suffixed with a plus sign (`+`) to denote one or more parameter matches.

```js
router.get('/:foo+', {
  /*... */
});
```

The captured parameter value will be provided as an array.

## Matching Method, Query Parameters, Cookies, and Headers {/* matching-method-query-parameters-cookies-and-headers */}

`.match()` can either take a URL path, or an object which allows you to match based on method, query parameters, cookies, or request headers:

```js
router.match(
  {
    path: '/some-path', // value is route-pattern syntax
    method: /GET|POST/i, // value is a regular expression
    cookies: {currency: /^(usd)$/i}, // keys are cookie names, values are regular expressions
    headers: {'some-header': /^some-value$/i}, // keys are header names, values are regular expressions
    query: {page: /^(1|2|3)$/}, // keys are query parameter names, values are regular expressions
  },
  {
    /* ... */
  }
);
```

## Negated Route Matching (Using `not`) {/* negated-route-matching */}

Previously, we showed how to match requests based on path, method, query parameters, cookies, and request headers. You can also negate these matches by specifying a `not` key in the object passed to your route criteria. For example, the following route matches all requests whose relative path does not match `/some-path`:

```js
router.match(
  {
    path: {
      not: '/some-path',
    },
  },
  {
    /* ... */
  }
);
```

Similarly, you can negate matches based on method, query parameters, cookies, and request headers:

```js
router.match(
  {
    path: '/some-path',
    query: {
      page: {
        not: /^(1|2|3)$/,
      },
    },
    method: {
      not: /POST/i,
    },
    cookies: {
      currency: {
        not: /^(usd)$/i,
      },
    },
    headers: {
      'x-device': {
        not: /^desktop$/i,
      },
    },
  },
  {
    /* ... */
  }
);
```

This example matches all requests to `/some-path` except for those with query parameter `page=1|2|3`

## Exact Path Matching {/* exact-matching */}

As described in [Simple Path Matching](#simple-path-matching), this type of route matching is based on [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp). While this is a rather universal approach to matching requests, {{ PRODUCT }} provides additional options for matching requests.

Exact path matching, also known as strict matching, gives you precise control over how requests are matched. Traditionally, you may match `/some-path` with the following route:

```js
router.match('/some-path', {
  /* ... */
});
```

This will match `/some-path`, `/Some-Path`, and other variations in between that are case-insensitive. However, using the `exact` function will use strict comparison in matching the request path. The following example shows how to import the `exact` function and use it to match requests to `/some-path`:

```js
import {Router, exact} from '{{ PACKAGE_NAME }}/core';

const router = new Router();

router.match(exact('/some-path'), {
  /* ... */
});

export default router;
```

This matches the path literally, so `/some-path` will match, but `/Some-Path` will not.

## Multiple Path Matching {/* multiple-path-matching */}

Multiple path matching uses the [`InOperatorValues`](/docs/api/core/types/router_RouteCriteria.InOperatorValues.html) type for matching a generic array of values. To use this, you must specify the argument as a [`RouteCriteria`](/docs/api/core/interfaces/router_RouteCriteria.default.html) type for the `path` you would like to match against. This type of matching is similar to `exact` matching in that it uses strict comparison.

For example, the following route matches requests to `/some-path` and `/another-path`, but not `/Some-Path` or `/Another-Path`:

```js
router.match(
  {
    path: ['/some-path', '/another-path'],
  },
  {
    /* ... */
  }
);
```

## Regular Expression Matching {/* regular-expression-matching */}

For complex routes that cannot be easily matched using `path-to-regexp`, you can use regular expressions to match requests. For example, the following route matches requests to `/some-path` and `/another-path`, but not `/Some-Path` or `/Another-Path`:

```js
router.match(
  {
    path: /^(\/some-path|\/another-path)$/i,
  },
  {
    /* ... */
  }
);
```

You may also use [Negated Route Matching](#negated-route-matching) with regular expressions:

```js
router.match(
  {
    path: {
      not: /^(\/some-path|\/another-path)$/i,
    },
  },
  {
    /* ... */
  }
);
```

Regular expression matching is also available for matching query parameters, cookies, and request headers, and more. Any property of [`RouteCriteria`](/docs/api/core/interfaces/router_RouteCriteria.default.html) that accepts [`CriteriaValue`](/docs/api/core/types/router_RouteCriteria.CriteriaValue.html) or [`OptionalCriteriaValue`](/docs/api/core/types/router_RouteCriteria.OptionalCriteriaValue.html) types can use a regular expression and negation.

## Conditional Routes {/* conditional-routes */}

Conditional routes allow you to apply [Rules](/guides/performance/rules) to a request using advanced if/then logic by the means of logical and comparison operators.

### Using the `.conditional()` method {/* using-the-conditional-method */}

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

Using the example above for caching the `/api/*` path, we can rewrite the same route using the [`conditional()`](/docs/core/classes/index.Router.html#conditional) method. This method accepts a single argument of type `Matches`. You can see the full specification of the `Matches` type in the [API reference](/docs/core/interfaces/types.Matches.html).

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

### Example {/* example */}

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

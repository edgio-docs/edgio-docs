---
title: Route Criteria and Conditions
---

Route conditions allow you to match requests based on the request path, method, query parameters, cookies, and request headers. You can also use route conditions to match requests based on regular expressions and negation.

As outlined in the [Route Criteria](/guides/performance/cdn_as_code#route-criteria) section of the CDN-as-Code guide, route criteria are defined as the first argument to the `Router` method being called in the `routes.js` file, such as `.match()`, `.get()`, `.post()`, etc.

## Matching All Requests {/* matching-all-requests */}

Match all requests through either of the following methods:

- [`.match`](/docs/api/core/classes/router_Router.default.html#match) with an empty criteria object

  ```js
  router.match({}, {
    /* ... */
  });
  ```

- [`always`](/docs/api/core/classes/router_Router.default.html#always) (requires {{ PRODUCT }} v7.2.0 or later)

  ```js
  router.always({
    /* ... */
  });
  ```
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
    method: 'GET', // value is a string
    cookies: {currency: /^(usd)$/i}, // keys are cookie names, values are regular expressions
    headers: {'some-header': /^some-value$/i}, // keys are header names, values are regular expressions
    query: {page: /^(1|2|3)$/}, // keys are query parameter names, values are regular expressions
  },
  {
    /* ... */
  }
);
```

## Negated Route Matching (not) {/* negated-route-matching-not */}

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
      not: 'POST',
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

## Exact Path Matching {/* exact-path-matching */}

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


<Callout type="important">

To learn about defining conditional logic and nested rules, refer to the [Conditional Routes](/guides/performance/cdn_as_code/conditional_routes) documentation.

</Callout>

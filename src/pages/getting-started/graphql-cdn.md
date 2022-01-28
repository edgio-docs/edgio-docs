---
title: GraphQL CDN
---

Layer0 provides full support for caching GraphQL APIs. Putting Layer0 in front of your GraphQL API can significantly improve its performance while reducing the amount of traffic that reaches your origin by serving cached queries from the network edge.

<!-- video -->

## Project Configuration {/* project-configuration */}
To deploy Layer0 in front of your GraphQL API, install the Layer0 CLI and create a new Layer0 configuration:

```shell
$ npm i -g @layer0/cli
$ 0 init
```

> For more information on adding Layer0 to an existing app, see [Getting Started](/getting_started#section_adding_layer0_to_an_existing_app)

## Configure the Origin {/* origin-configuration */}
To configure the origin domain from which your GraphQL API is served, add a backend to `layer0.config.js`. For example:

```js
// layer0.config.js
module.exports = {
  backends: {
    graphql: {
      domainOrIp: 'graphql-origin.my-site.com', // the hostname for your origin graphql server(s)
      hostHeader: 'graphql.my-site.com', // the hostname that clients use to connect to your graphql api
    },
  },
}
```

## Add Caching Rules {/* add-caching-rules */}

There are two ways to cache GraphQL responses using Layer0: by adding caching rules to your Layer0 router or by using the `cache-control` header

## Using the Layer0 Router {/* using-layer0-router */}

Imagine you have a query named `GetProduct`:

```graphql
export const GET_PRODUCT_QUERY = gql`
  query GetProduct {
    product(id: $productId) {
      name
      description
      price
    }
  }
`
```

You can add a caching rule for this query by using the `graphqlOperation` method:

```js
// routes.js
import { Router } from '@layer0/core'

export default new Router().graphqlOperation('GetProduct', ({ cache, proxy }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60, // cache responses for one hour
      staleWhileRevalidateSeconds: 60 * 60 * 24, // serve stale responses for up to 24 hours
    },
  })
  proxy('graphql') // forward requests to the GraphQL API origin we defined in layer0.config.js
})
```

## Match Operations by Regular Expression {/* match-operations-by-regex */}

The `graphqlOperation` method also allows you to match operations using a regular expression:

```js
export default new Router().graphqlOperation(/product/i, ({ cache, proxy }) => {
  /* ... */
})
```

## Alter the Default GraphQL API Path {/* alter-default-graphql-api-path */}

Most GraphQL APIs are hosted on the `/graphql` path. The `graphqlOperation` method will only match requests
sent to `/graphql` by default. To use a different `path`, specify the path option:

```js
export default new Router().graphqlOperation(
  {
    path: '/gql-api' /* override the default /graphql path */,
    name: 'GetProduct' /* name can also be a regular expression */,
  },
  ({ cache, proxy }) => {
    /* ... */
  },
)
```

## Use the Cache-Control Header {/* use-cache-control-header */}

Layer0 supports caching GraphQL responses at the network edge using the standard `cache-control` HTTP response header.
For example, to cache the results of a query for one hour, add the following header to your response:

```shell
cache-control: max-age=3600
```

You can also serve stale responses while fetching a fresh response from the origin by using `stale-while-revalidate`.
For example, to allow stale responses to be served for up to 24 hours, use:

```shell
cache-control: max-age=3600, stale-while-revalidate=86400
```

## Cache Key {/* cache-key */}

Regardless of the method you choose to define caching rules, Layer0 incorporates the request body into the cache key for
all POST requests. This means that if two requests have different request bodies, their responses will be cached separately.

## Invalidate Stale Queries {/* invalidate-stale-queries */}

Layer0 gives you the ability to purge individual queries from the edge cache by assigning surrogate keys to each cached
response.

## Assign Surrogate Keys {/* assign-surrogate-keys */}

To invalidate a cached query, you must first assign a surrogate key to the response before it is cached. You can do this
using the router:

1. **Use deriveSurrogateKeysFromJson**

```js
// routes.js
import { Router, deriveSurrogateKeysFromJson } from '@layer0/core'

export default new Router().graphqlOperation('GetProduct', ({ cache, proxy }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60, // cache responses for one hour
      staleWhileRevalidateSeconds: 60 * 60 * 24, // serve stale responses for up to 24 hours
    },
  })
  proxy('graphql', {
    transformResponse: deriveSurrogateKeysFromJson(json => [`product.${json.id}`]), // <~ Assigns a surrogate key to each response
  })
})
```

2. **Use the x-0-surrogate-key Response Header**

You can also assign surrogate keys by adding an `x-0-surrogate-key` header to the response from the origin.
Separate multiple keys with spaces:

```js
x-0-surrogate-key: key1 key2 key3
```

## Handle Conflicts {/* handle-conflicts */}

If the origin returns an x-0-surrogate-key response header and deriveSurrogateKeysFromJson is also used for a given
request, you can specify whether the surrogate keys should be merged, or the ones from the router should override
those in the origin response:

To merge surrogate keys:

```js
deriveSurrogateKeysFromJson(json => [`product.${json.id}`], { onConflict: 'merge' })
```

To ignore the surrogate keys from the origin:

```js
deriveSurrogateKeysFromJson(json => [`product.${json.id}`], { onConflict: 'override' })
```

## Purge by Surrogate Key

To purge all responses with a given surrogate key, use the Layer0 CLI's [cache-clear](/cli#section_cache_clear) command.

```js
layer0 cache-clear --team=my-team --site=my-site --environment=production --surrogate-key="product.1"
```

For more information, see [clearing the cache from the CLI](/cli#section_cache_clear).

You can also purge responses by surrogate key [via the REST API](/rest_api#section_clear_cache) by specifying the
`surrogateKeys` option.
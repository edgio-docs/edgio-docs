# GraphQL

{{ PRODUCT_NAME }} provides full support for caching GraphQL APIs. Putting Layer0 in front of you GraphQL API can significantly improve its performance while reducing the amount of traffic that reaches your origin by serving cached queries from the network edge.

## Example

[GraphQL over Proxy](https://layer0-docs-graphql-caching-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/graphql-caching-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Fgraphql-caching-example)

[GraphQL with Apollo Server Micro](https://layer0-docs-layer0-next-graphql-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/layer0-nextjs-graphql-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-graphql-example)

This sections below walk you through configuring your {{ PRODUCT_NAME }} project and creating the necessary routing rules to cache GraphQL responses.

## Project Configuration

To deploy Layer0 in front of your GraphQL API, install the {{ PRODUCT_NAME }} CLI and create a new {{ PRODUCT_NAME }} configuration:

```bash
$ npm i -g {{ PACKAGE_NAME }}/cli
$ {{ CLI_NAME }} init
```

For more information on adding {{ PRODUCT_NAME }} to an existing app, see [Getting Started](/guides/getting_started#section_adding_layer0_to_an_existing_app).

### Configuring the Origin

To configure the origin domain from which your GraphQL API is served, add a backend to `{{ CONFIG_FILE }}`. For example:

```js
// {{ CONFIG_FILE }}
module.exports = {
  backends: {
    graphql: {
      domainOrIp: 'graphql-origin.my-site.com', // the hostname for your origin graphql server(s)
      hostHeader: 'graphql.my-site.com', // the hostname that clients use to connect to your graphql api
    },
  },
}
```

## Adding Caching Rules

There are two ways to cache GraphQL responses using Layer0: by adding caching rules to your Layer0 router or by using the `cache-control` header.

### Using the {{ PRODUCT_NAME }} router

Imagine you have a query named `GetProduct`:

```js
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

#### Matching Operations by Regular Expression

The `graphqlOperation` method also allows you to match operations using a regular expression:

```js
export default new Router().graphqlOperation(/product/i, ({ cache, proxy }) => {
  /* ... */
})
```

#### Altering the default GraphQL API path

Most GraphQL APIs are hosted on the `/graphql` path. The `graphqlOperation` method will only match requests sent to `/graphql` by default. To use a different path, specify the `path` option:

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

### Using the cache-control header

{{ PRODUCT_NAME }} supports caching GraphQL responses at the network edge using the standard `cache-control` HTTP response header. For example, to cache the results of a query for one hour, adding the following header to your response:

```
cache-control: max-age=3600
```

You can also serve stale responses while fetching a fresh response from the origin by using `stale-while-revalidate`. For example, to allow stale responses to be served for up to 24 hours, use:

```
cache-control: max-age=3600, stale-while-revalidate=86400
```

### Cache Key

Regardless of the method you choose to define caching rules, Layer0 incorporates the request body into the cache key for all `POST` requests. This means that if two requests have different request bodies,
their responses will be cached separately.

## Invalidating stale queries

Layer0 gives you the ability to purge individual queries from the edge cache by assigning surrogate keys to each cached response.

### Assigning Surrogate Keys

To invalidate a cached query, you must first assign a surrogate key to the response before it is cached. You can do this using the router:

#### Using deriveSurrogateKeysFromJson

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

#### Using the x-0-surrogate-key response header

You can also assign surrogate keys by adding an `x-0-surrogate-key` header to the response from the origin. Separate multiple keys with spaces:

```
x-0-surrogate-key: key1 key2 key3
```

#### Handling conflicts

If the origin returns an `x-0-surrogate-key` response header and `deriveSurrogateKeysFromJson` is also used for a given request, you can specify whether the surrogate keys should be merged, or the ones
from the router should override those in the origin response:

To merge surrogate keys:

```js
deriveSurrogateKeysFromJson(json => [`product.${json.id}`], { onConflict: 'merge' })
```

To ignore the surrogate keys from the origin:

```js
deriveSurrogateKeysFromJson(json => [`product.${json.id}`], { onConflict: 'override' })
```

### Purging by Surrogate Key

To purge all responses with a given surrogate key, use the {{ PRODUCT_NAME }} CLI's [cache-clear](/guides/cli#section_cache_clear) command.

```
layer0 cache-clear --team=my-team --site=my-site --environment=production --surrogate-key="product.1"
```

[More information on clearing the cache from the CLI](/guides/cli#section_cache_clear)

You can also purge responses by surrogate key [via the REST API](/guides/rest_api#section_clear_cache) by specifying the `surrogateKeys` option.

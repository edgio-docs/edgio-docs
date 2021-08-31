# GraphQL

## Questions

- Now that we support JSON body matching, do we still need to use the GET method for Apollo queries? Is that strictly for Browser caching?

## Using Apollo

{{ PRODUCT_NAME }} also enables caching and prefetching of GraphQL requests via a middleware for [Apollo](https://www.apollographql.com/apollo-client). To enable prefetching of GraphQL queries in both the edge and the service worker:

### Setup

1. Ensure that your GraphQL API is configured to accept GET requests. The Apollo client uses POST requests by default, but the Apollo server [automatically accepts both GETs and POSTs](https://www.apollographql.com/docs/apollo-server/v1/requests/). We use GETs instead of POSTs for two reasons:

   1. So that the URLs are sufficiently unique cache keys
   2. Browser cache APIs only support caching GETs

2. Add `{{ PACKAGE_NAME }}/apollo` to your project:

```
npm i --save {{ PACKAGE_NAME }}/apollo
```

3. Add your GraphQL API as a backend to `{{ CONFIG_FILE }}`. For example:

```js
// {{ CONFIG_FILE }}

module.exports = {
  backends: {
    graphql: {
      domainOrIp: 'graphql.my-site.com',
      hostHeader: 'graphql.my-site.com',
    },
  },
}
```

4. Add a GET route for the GraphQL endpoint to your router:

```js
const { Router, CustomCacheKey } = require('{{ PACKAGE_NAME }}/core/router')
const { decompressRequest } = require('{{ PACKAGE_NAME }}/apollo')

module.exports = new Router()
  .post('/graphql', ({ proxy }) => {
    proxy('graphql') // forward posts requests to apollo unaltered
  })
  .get('/graphql', ({ cache, removeUpstreamResponseHeader, proxy }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
    })

    // Some APIs, like Shopify, attempt to establish a session by setting a cookie. {{ PRODUCT_NAME }} will
    // not cache responses with a set-cookie header, so we remove it before attempting to write
    // the response to the cache
    removeUpstreamResponseHeader('set-cookie')

    // Proxy the request to the "graphql" backend configured in {{ CONFIG_FILE }}
    // Here we use decompressRequest to decompress and extract the GraphQL query from the URL's query string
    // and convert the GET to a POST when connecting to the GraphQL server.
    proxy('graphql', { transformRequest: decompressRequest })
  })
```

5. Configure your Apollo client to use a custom link from {{ PACKAGE_NAME }}/apollo's `createHttpLink` function.

For a general example:

```js
import { ApolloClient, InMemoryCache, createHttpLink as apolloCreateHttpLink } from '@apollo/client'
import { createHttpLink } from '@layer0/apollo'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: '/graphql' }, apolloCreateHttpLink),
})
```

For example in Nuxt:

```js
import { createHttpLink } from '{{ PACKAGE_NAME }}/apollo'

export default () => ({
  defaultHttpLink: false,
  link: createHttpLink({
    credentials: 'omit',
    uri:
      typeof window === 'undefined' // Use a relative URL when running in the browser so that GraphQL requests are fetched via {{ PRODUCT_NAME }}'s edge cache.
        ? process.env.GQL_ENDPOINT
        : '/graphql',
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.GQL_ACCESS_TOKEN,
    },
  }),
})
```

The `createHttpLink` function accepts all of the options [documented here](https://www.apollographql.com/docs/link/links/http/#options) and automatically
uses GET requests for all queries so that they can be cached at the edge and prefetched by the service worker.

### Prefetching

Use `createApolloURL(client, query, variables)` to create the URL to prefetch:

```js
import { Prefetch } from '{{ PACKAGE_NAME }}/react'
import { createApolloURL } from '{{ PACKAGE_NAME }}/apollo'
import productById from '../apollo/queries/productById.gql'

function MyProductLink({ product }) {
  return (
    <Prefetch url={createApolloURL(this.$apollo, productById, { id: product.id })}>
      <a href={product.url}>{product.name}</a>
    </Prefetch>
  )
}
```

You can test that everything is running locally by running your project with:

```
{{ CLI_NAME }} dev --cache
```

#### Advantages over Apollo's prefetch functionality

[Apollo provides it's own ability to prefetch data.](https://www.apollographql.com/docs/react/performance/performance/) Prefetching using the method described above has a number of advantages:

- It minimizes the amount of data that needs to be transmitted in response to the initial request, making the page faster.
- Prefetched data is held in the service worker cache so it can be used in the event that the user navigates away from your website and returns later.
- Data is prefetched with low priority so that prefetch requests will not block other more important requests like navigation and images.

## TODO

- Add section for matching JSON
- Write a new landing page / guide for GraphQL matching. Since this will be a BIG product feature, we should write a lot about this and give plenty of example use cases
- Add JSON body matching section in Caching Guide

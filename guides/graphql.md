# GraphQL

{{ PRODUCT_NAME }} enables caching of GraphQL queries via our body content matcher built into the {{ PRODUCT_NAME }} router.

This guide will walk you through configuring your {{ PRODUCT_NAME }} project and the relevant routing commands for GraphQL caching.

## Preparing your project

This section assumes you already have a project that deploys to {{PRODUCT_NAME}}. If you have a new project please consult [these instructions](/guides/getting_started#section_adding_layer0_to_an_existing_app) for adding {{PRODUCT_NAME}} to an existing app.

### Project configuration

{{ PRODUCT_NAME }} needs to know the domain of your GraphQL API. You can do this adding the GraphQL API as a backend to `{{ CONFIG_FILE }}`. For example:

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

### Example Apollo Setup

We will use a simple Apollo project setup for an example:

Our Apollo Client points to `/graphql`, which is where we will add custom edge routing logic.

```js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
})

// Pass our client to the child components
return (
  <ApolloProvider client={client}>
    <Component />
  </ApolloProvider>
)
```

Create a GraphQL query which we will target in a custom route below.

```js
import { gql, useQuery } from '@apollo/client'

export const DATA = gql`
  query GetData {
    data(limit: 10) {
      name
      description
      thing {
        name
      }
    }
  }
`

const { loading, error, data } = useQuery(DATA)
```

## Enabling GraphQL Caching

GraphQL routes are cached by configuring the caching parameters in the {{PRODUCT_NAME}} router. To make a GraphQL route cachable, use the `graphqlOperation` method and specify a `cache` property. For example, the code below will cache all GraphQL operations named `GetData` and proxy them the `graphql` endpoint defined in `{{ CONFIG_FILE }}`.

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router().graphqlOperation('GetData', ({ cache, proxy }) => {
  cache({
    // The entire query body is used as the cache key, so for example the same query with different variables will be cached separately.
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
      staleWhileRevalidateSeconds: 60 * 60,
    },
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24,
    },
  })
  proxy('graphql') // forward posts requests to apollo unaltered
})
```

For more information consult [GraphQL section](/guides/routing#section_graphql_queries) and [Body Matching for POST requests section](/guides/routing#section_body_matching_for_post_requests) of the routing guide.

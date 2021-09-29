# GraphQL

{{ PRODUCT_NAME }} enables caching of GraphQL queries via our middleware for [Apollo](https://www.apollographql.com/apollo-client) and a body content matcher built into the {{ PRODUCT_NAME }} router.

This guide will walk you through configuring your {{ PRODUCT_NAME }} project and the relevant routing commands for GraphQL caching.

## Preparing your project

This section assumes you already have a project that deploys to {{PRODUCT_NAME}}. If you have a new project please consult [these instructions](/guides/getting_started#section_adding_layer0_to_an_existing_app) for adding {{PRODUCT_NAME}} to an existing app.

### Installation of packages

Start by adding `{{ PACKAGE_NAME }}/apollo` and `apollo-link-error` packages to your project:

```
npm i --save {{ PACKAGE_NAME }}/apollo apollo-link-error
```

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

### Wrap Apollo with Layer0 middleware

Configure your Apollo client to use a custom link from {{ PACKAGE_NAME }}/apollo's `createHttpLink` function.

```js
import { ApolloClient, InMemoryCache, createHttpLink as apolloCreateHttpLink } from '@apollo/client'
import { createHttpLink } from '@layer0/apollo'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: '/graphql' }, apolloCreateHttpLink),
})
```

The `createHttpLink` function accepts all of the options [documented here](https://www.apollographql.com/docs/link/links/http/#options).

Note that if you are using React or Next, you will need to wrap your components which will be making queries with an `ApolloProvider`:

```js
<ApolloProvider client={client}>
  <Component />
</ApolloProvider>
```

Children components of the `<ApolloProvider>` can then make GraphQL queries as normal. For example:

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

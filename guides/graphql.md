# GraphQL

{{ PRODUCT_NAME }} enables individual caching of GraphQL queries via our middleware for [Apollo](https://www.apollographql.com/apollo-client) and a body content matcher built into the layer0 router. What follows is a guide to installing and setting up Layer0 to handle your GraphQL requests with more control.

### Installation of packages

Add `{{ PACKAGE_NAME }}/apollo` and `apollo-link-error` to your project:

```
npm i --save {{ PACKAGE_NAME }}/apollo apollo-link-error
```

### Configuration

Add your GraphQL API as a backend to `{{ CONFIG_FILE }}`. For example:

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

### Routing

Add routes for GraphQL queries to your layer0 router:

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

More documentation for routing can be found [here](/guides/routing#section_body_matching).

### Wrap Apollo with Layer0

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

If using React or Next, you will need to wrap your components which will be making queries with an `ApolloProvider`:

```js
<ApolloProvider client={client}>
  <Component />
</ApolloProvider>
```

### Example Query

Make queries from inner components

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

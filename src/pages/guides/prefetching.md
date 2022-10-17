---
title: Predictive Prefetch
---

{{ PRODUCT_NAME }} allows you to speed up the user's browsing experience by prefetching pages and API calls that they are likely to need.

<Video src="https://www.youtube.com/watch?v=lfhSDCNgzfs" />

## Traffic Shielding {/*traffic-shielding*/}

You might think that prefetching will put significant additional load on the infrastructure hosting your APIs. That's actually not the case! {{ PRODUCT_NAME }} only serves prefetch requests from the edge cache. It will never make a request to the origin if a prefetch request cannot be served from the edge cache, so your servers will never see an increased load.

## Configuring the Service Worker {/*configuring-the-service-worker*/}

To enable prefetching, your site's service worker needs to use the `{{ PACKAGE_NAME }}/prefetch` library's `Prefetcher` class. If your site doesn't currently have a service worker, one can easily be created using Google's [Workbox](https://developers.google.com/web/tools/workbox).

Here's an example service worker based on Workbox:

```js
import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';

skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();
```

Once you've created a service worker, code running in the browser window needs to register the service worker before prefetching can begin. How you do this depends on the front-end framework that you use.

If you're not using a front-end framework, you can use the `install` function from `{{ PACKAGE_NAME }}/prefetch` to install the service worker. Here's an example:

```js
import install from '{{ PACKAGE_NAME }}/prefetch/window/install';

install();
```

## Configuring Routes for Prefetching {/*configuring-routes-for-prefetching*/}

To ensure that excessive prefetch traffic isn't passed on to your origin, {{ PRODUCT_NAME }} will serve prefetch requests when a cached response is available at the edge. By default, all prefetch requests will be cached at the edge for 2 minutes (see [`DEFAULT_MAX_AGE_SECONDS`](/docs/api/prefetch/modules/_sw_prefetcher_.html#default_max_age_seconds)). Additionally, you may configure a route that caches responses at the edge and in the service worker within your router, optionally giving it longer cache time for greater performance. In this example we define a route that caches product API calls for one hour:

```js filename="routes.js"
import {Router} from '{{ PACKAGE_NAME }}/core';

export default new Router()
  // Here we configure a route for the product API.
  .get('/api/products/:id.json', ({cache, proxy}) => {
    // In order to prefetch product data, we must cache responses at the edge and in the service worker.
    cache({
      edge: {
        maxAgeSeconds: 60 * 60, // cache at the edge for one hour
        staleWhileRevalidateSeconds: 60 * 60 * 24 * 365, // optionally serve stale while retreiving a fresh version from the origin
      },
      browser: {
        serviceWorkerSeconds: 60 * 60, // cache in the browser using the service worker for one hour
      },
    });
  });
```

Note that if you prefetch a URL without setting `browser.serviceWorkerSeconds` as shown above, the response will still be prefetched and cached by the service worker with a short TTL (2 minutes by default). You can change the default TTL by setting `defaultMaxAgeSeconds` when initializing the Prefetcher instance in your service worker:

```js
const prefetcher = new Prefetcher({defaultMaxAgeSeconds: 60 * 10}); // set the default TTL to 10 minutes
```

## Prefetching a URL {/*prefetching-a-url*/}

To prefetch a URL, call the `prefetch` function from `{{ PACKAGE_NAME }}/prefetch/window`. Here we prefetch data for a product page using the route we configured in the previous example.

```js
import {prefetch} from '{{ PACKAGE_NAME }}/prefetch/window';

prefetch('/api/products/1.json');
```

Prefetch requests are given the lowest priority. This ensures that they do not block more critical requests like API calls, images, scripts, and navigation.

Optionally is possible to override default TTL or the value of `serviceWorkerSeconds` defined in `routes.js` by providing the `maxAgeSeconds` option to `prefetch` function call. This option is applied only to that function call and doesn't affect any other calls made later.
```js
import {prefetch} from '{{ PACKAGE_NAME }}/prefetch/window';

prefetch('/api/products/1.json', "fetch", {
    maxAgeSeconds: 300 // 5 minutes
});
```

All prefetch function options can be found in its API Documentation [here](/docs/api/prefetch/modules/_window_prefetch_.html#prefetchconfiguration).

## React {/*react*/}

The `{{ PACKAGE_NAME }}/react` package provides a `Prefetch` component that you can wrap around any link to prefetch the link when it becomes visible in the viewport:

```js
import {Prefetch} from '{{ PACKAGE_NAME }}/react';

function ProductLink({product}) {
  return (
    <Prefetch url={`/api/products/${product.id}.json`}>
      <a href={`/products/${product.id}`}>{product.name}</a>
    </Prefetch>
  );
}
```

By default, `Prefetch` will fetch and cache the URL in the link's `href` attribute. If you have a single page app, you most likely want to prefetch the corresponding API call for the page rather than the page's HTML. The example above shows you how to set the `url` property to control which URL is prefetched.

## Next.js {/*nextjs*/}

If you're using Next.js with `getServerSideProps`, use `createNextDataURL` from `{{ PACKAGE_NAME }}/next/client` to prefetch the data for the linked page.

```js
import {Prefetch} from '{{ PACKAGE_NAME }}/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {createNextDataURL} from '{{ PACKAGE_NAME }}/next/client';

export default function ProductListing({products}) {
  const {locale} = useRouter(); // you can omit this if you're not using localization

  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>
          <Link href={product.url} passHref>
            <Prefetch
              url={createNextDataURL({
                href: product.url,
                locale, // you can omit this if you're not using localization
                routeParams: {
                  // keys must match the param names in your next page routes
                  // So for example if your product page is /products/[id].js:
                  id: product.id,
                },
              })}>
              <a>
                <img src={product.thumbnail} />
              </a>
            </Prefetch>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getServerSideProps({params: {id}}) {
  const products = await fetch(/* fetch from your api */).then((res) =>
    res.json()
  );

  return {
    props: {
      products,
    },
  };
}
```

## Vue {/*vue*/}

The `{{ PACKAGE_NAME }}/vue` package provides a `Prefetch` component that you can wrap around any link to prefetch the link when it becomes visible in the viewport:

```jsx
<template>
  <Prefetch v-bind:url="/api/for/some/page">
    <router-link v-bind:to="/some/page">Some page</router-link>
  </Prefetch>
</template>

<script>
  import Prefetch from '{{ PACKAGE_NAME }}/vue/Prefetch'
  export default {
    components: {
      Prefetch,
    },
  }
</script>
```

By default `Prefetch` will fetch and cache the URL in the link's `to` attribute (for both `router-link` and `nuxt-link`). If you have a single page app, you most likely want to prefetch an API call for the page rather than the page's HTML. The example above shows you how to set the `url` property to control which URL is prefetched.

## Deep Fetching {/*deep-fetching*/}

By default, prefetching only fetches the JSON API data or HTML document for a prefetched page. In order to achieve truly instant page transitions, all of the page's assets above the fold need to be prefetched as well. These typically include images, CSS, and JavaScript. This is where "deep fetching" comes in. Deep fetching parses the prefetched page and then fetches the important assets of the prefetched page that you specify.

To add deep fetching to your project, add the [DeepFetchPlugin](/docs/api/prefetch/classes/_sw_deepfetchplugin_.deepfetchplugin.html) to your service worker. The `DeepFetchPlugin` is then configured with an array of selectors that describe which assets need to be prefetched:

```js
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';
import DeepFetchPlugin from '{{ PACKAGE_NAME }}/prefetch/sw/DeepFetchPlugin';

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        /* Deep fetching configuration objects go here */
      },
    ]),
  ],
});
```

The `DeepFetchPlugin` can parse both HTML and JSON documents to extract the page assets that must be deep fetched. For {{ PRODUCT_NAME }} projects that are headless (i.e. the front end communicates with the backend through an API), you'll typically use the JSON option. However if the backend and front-end endpoints are communicating using HTML responses then you'll want to use the HTML option. Note that you can mix both HTML and JSON configuration objects in the an array passed to the `DeepFetchPlugin`.

### Deep fetching URLs in JSON responses {/*deep-fetching-urls-in-json-responses*/}

For JSON responses, you'll pass the `DeepFetchPlugin` an array of [DeepFetchJsonConfig interface]({{ DOCS_URL }}/docs/api/prefetch/interfaces/_sw_deepfetchplugin_.deepfetchjsonconfig.html) objects. These `DeepFetchJsonConfig` objects describe the asset URLs in the JSON response that should be prefetched. For example, the snippet below finds product images to deep fetch for a category page response:

```js
new DeepFetchPlugin([
  // parses the category API response to deep fetch the product images:
  {
    jsonQuery: 'Bundles.[**].Products:products(Product).MediumImageFile',
    jsonQueryOptions: {
      locals: {
        // filters out null products:
        products: (input) => input.filter((prod) => prod),
      },
    },
    maxMatches: 10,
    as: 'image',
  },
]);
```

The `jsonQuery` syntax is provided by the [json-query](https://github.com/auditassistant/json-query) library. You can test your JSON queries using their [JSON-query Tester Sandbox](https://maxleiko.github.io/json-query-tester/).

### Deep Fetching for HTML documents {/*deep-fetching-for-html-documents*/}

To deep fetch HTML documents, pass the plugin objects that match the [DeepFetchHtmlConfig interface]({{ DOCS_URL }}/docs/api/prefetch/interfaces/_sw_deepfetchplugin_.deepfetchhtmlconfig.html) and describe which HTML elements need to be prefetched via CSS selectors.

For example, imagine you're configuring prefetching for a product page and you want to ensure the main product image is prefetched so that it appears immediately when the page loads. If the main product image is displayed with an HTML `img` element with a CSS class called `product-featured-media`, it can be prefetched by adding the following to the DeepFetchPlugin:

```js
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';
import DeepFetchPlugin from '{{ PACKAGE_NAME }}/prefetch/sw/DeepFetchPlugin';

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'img.product-featured-media', // CSS selector syntax - just like you would use with document.querySelector()
        maxMatches: 1, // limits the number of matched elements to prefetch to 1 per page
        attribute: 'src', // the attribute holding the URL to prefetching
        as: 'image', // the type of asset being prefetched
      },
    ]),
  ],
});
```

#### Computing the URL to be prefetched {/*computing-the-url-to-be-prefetched*/}

In the example above the `img` element's `src` attribute contains URL that needs to be prefetched. Sometimes finding the URL to prefetch is not so straightforward. For example, apps sometimes use JavaScript to compute the URL for responsive images based on the user's device size. In such cases you can provide a `callback` function which will be passed all matching elements and decide what URLs to prefetch. Here is an example:

```typescript
import {Prefetcher, prefetch} from '{{ PACKAGE_NAME }}/prefetch/sw';
import DeepFetchPlugin, {
  DeepFetchCallbackParam,
} from '{{ PACKAGE_NAME }}/prefetch/sw/DeepFetchPlugin';

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'img.grid-view-item__image',
        maxMatches: 4,
        as: 'image',
        callback: deepFetchResponsiveImages,
      },
    ]),
  ],
});

function deepFetchResponsiveImages({$el, el, $}: DeepFetchCallbackParam) {
  const urlTemplate = $el.attr('data-src');
  const dataWidths = $el.attr('data-widths');

  if (dataWidths && urlTemplate) {
    const widths = JSON.parse(dataWidths);

    for (let width of widths.slice(0, 2)) {
      const url = urlTemplate?.replace(/\{width\}/, width);
      prefetch(url, 'image');
    }
  }
}
```

## GraphQL {/*graphql*/}

{{ PRODUCT_NAME }} also enables caching and prefetching of GraphQL requests via a middleware for [Apollo](https://www.apollographql.com/apollo-client). To enable prefetching of GraphQL queries in both the edge and the service worker:

1. Ensure that your GraphQL API is configured to accept GET requests. The Apollo client uses POST requests by default, but the Apollo server [automatically accepts both GETs and POSTs](https://www.apollographql.com/docs/apollo-server/v1/requests/). We use GETs instead of POSTs for two reasons:

   1. So that the URLs are sufficiently unique cache keys
   2. Browser cache APIs only support caching GETs

2. Add `{{ PACKAGE_NAME }}/apollo` to your project:

```bash
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
};
```

4. Add a GET route for the GraphQL endpoint to your router:

```js
const {Router, CustomCacheKey} = require('{{ PACKAGE_NAME }}/core/router');
const {decompressRequest} = require('{{ PACKAGE_NAME }}/apollo');

module.exports = new Router()
  .post('/graphql', ({proxy}) => {
    proxy('graphql'); // forward posts requests to apollo unaltered
  })
  .get('/graphql', ({cache, removeUpstreamResponseHeader, proxy}) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
    });

    // Some APIs, like Shopify, attempt to establish a session by setting a cookie. {{ PRODUCT_NAME }} will
    // not cache responses with a set-cookie header, so we remove it before attempting to write
    // the response to the cache
    removeUpstreamResponseHeader('set-cookie');

    // Proxy the request to the "graphql" backend configured in {{ CONFIG_FILE }}
    // Here we use decompressRequest to decompress and extract the GraphQL query from the URL's query string
    // and convert the GET to a POST when connecting to the GraphQL server.
    proxy('graphql', {transformRequest: decompressRequest});
  });
```

5. Configure your Apollo client to use a custom link from {{ PACKAGE_NAME }}/apollo's `createHttpLink` function. For example:

```js
import {createHttpLink} from '{{ PACKAGE_NAME }}/apollo';

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
});
```

The `createHttpLink` function accepts all of the options [documented here](https://www.apollographql.com/docs/link/links/http/#options) and automatically
uses GET requests for all queries so that they can be cached at the edge and prefetched by the service worker.

6. Use `createApolloURL(client, query, variables)` to create the URL to prefetch:

```js
import {Prefetch} from '{{ PACKAGE_NAME }}/react';
import {createApolloURL} from '{{ PACKAGE_NAME }}/apollo';
import productById from '../apollo/queries/productById.gql';

function MyProductLink({product}) {
  return (
    <Prefetch
      url={createApolloURL(this.$apollo, productById, {id: product.id})}>
      <a href={product.url}>{product.name}</a>
    </Prefetch>
  );
}
```

You can test that everything is running locally by running your project with:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

### Advantages over Apollo's prefetch functionality {/*advantages-over-apollos-prefetch-functionality*/}

[Apollo provides it's own ability to prefetch data.](https://www.apollographql.com/docs/react/performance/performance/) Prefetching using the method described above has a number of advantages:

- It minimizes the amount of data that needs to be transmitted in response to the initial request, making the page faster.
- Prefetched data is held in the service worker cache so it can be used in the event that the user navigates away from your website and returns later.
- Data is prefetched with low priority so that prefetch requests will not block other more important requests like navigation and images.

## Reducing 412s {/*reducing-412s*/}

By default, {{ PRODUCT_NAME }} will only serve prefetch requests from the edge cache. If a request cannot be served from the cache, a 412 status is returned. This protects your origin servers from additional traffic associated with prefetching. If you're seeing a surprisingly high number of 412s in your logs:

1. Ensure that the URLs you're prefetching match exactly those that are fetched during page navigation. Prefetch URLs will have `?{{ COOKIE_PREFIX }}_prefetch=1` whereas the URLs associated with page navigation won't. That's okay. The `{{ COOKIE_PREFIX }}_*` query parameters are automatically excluded from the cache key. Just ensure that there are no other differences.
2. Ensure that `cache` settings have stale-while-revalidate enabled. For example:

```js
router.get('/p/:productId', ({cache}) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60,
      staleWhileRevalidateSeconds: 60 * 60 * 24, // this way stale items can still be prefetched
    },
  });
});
```

3. Consider increasing `edge.maxAgeSeconds`. The shorter the cache time to live is, the more prefetches will fail.
4. Set the `includeCacheMisses` install option to `true`. This should be used with caution and is not recommended for use in production because it will significantly increase the traffic to your origin or API servers.

```js
import install from '{{ PACKAGE_NAME }}/prefetch/window/install';

// Call the following once when the page loads to allow prefetch requests to be served when responses
// aren't available in the edge cache:
install({includeCacheMisses: true});
```

## The cache-manifest.js File {/*the-cache-manifestjs-file*/}

This file is generated at runtime and is used by the `Prefetcher` class from `{{ PACKAGE_NAME }}/prefetch` to add routes to the [service worker](#service-worker). The routes ensure that custom cache keys and the `serviceWorkerSeconds` properties from the `cache()` settings in your router are propagated to the service worker.

For more information on `Prefetcher`, `serviceWorkderSeconds`, and `cache()`, see [Class Prefetcher](/docs/api/prefetch/classes/_sw_prefetcher_.prefetcher.html).

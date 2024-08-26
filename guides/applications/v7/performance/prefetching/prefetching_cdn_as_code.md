---
title: CDN-as-Code Predictive Prefetching Setup
---

If your website uses {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or is based on a JavaScript front-end framework, then you can install the `{{ PACKAGE_NAME }}/prefetch` package directly, take advantage of additional package features, and achieve deeper integration with your site.

**Key information:**

-   By default, only content that has already been cached on the POP closest to the user may be prefetched. {{ PRODUCT }} returns a [412 Precondition Failed response](/applications/performance/troubleshooting#412-precondition-failed-status-code) for prefetch requests that result in cache misses. This ensures that your infrastructure does not experience additional load due to prefetching.

-   Due to security requirements, prefetching requires the HTTPS protocol. An exception to this requirement occurs when using localhost.

## Setup {/*setup*/}

Perform the following steps:

1.  [Build the service worker with the Prefetcher class.](#building-the-service-worker)
2.  [Serve the service worker](#serving-the-service-worker) through a rule.
3.  [Register the service worker.](#registering-the-service-worker)
4.  [Enable prefetching](#defining-a-prefetching-caching-policy) for the desired requests by adding the following features within one or more rules:

    -   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

    Alternatively, you may [manually enable prefetching](#manual-prefetching) for specific requests.

### Building the Service Worker {/*building-the-service-worker*/}

Integrating prefetching into your site requires building the service worker with the `Prefetcher` class.

<Callout type="info">

  One method for adding a service worker to your site is to use [Google's Workbox](https://developers.google.com/web/tools/workbox).

</Callout>

**Sample Service Worker:**

The following sample service worker is based on Workbox using the `Prefetcher` class from `{{ PACKAGE_NAME }}/prefetch`:

```js filename="service-worker.js"
import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';

skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();
```

### Serving the Service Worker {/*serving-the-service-worker*/}

After you have created a service worker, your router needs to be configured to serve the file. If you are using one of our [connectors](/applications/sites_frameworks/getting_started), then it should be automatically configured for you.

**Example:**

The following example defines a route that serves requests for `/service-worker.js`. However, your code will vary according to the location of your service worker file.

```js filename="routes.js"
import {Router} from '{{ PACKAGE_NAME }}/core';

export default new Router()
  // cache the service worker at the edge for 1 day
  .match('/service-worker.js', {
    caching: {
      max_age: '1d',
      bypass_client_cache: true,
    },
  })

  // serve the service worker from the /dist directory
  .match('/service-worker.js', ({serviceWorker}) => {
    serviceWorker('dist/service-worker.js');
  });
```

### Registering the Service Worker {/*registering-the-service-worker*/}

After you have created and served the service worker, it needs to be registered. If you are using a front-end framework that does not automatically register service workers, then you should invoke the `install` function from the `{{ PACKAGE_NAME }}/prefetch` to install the service worker within your client-side code. See [InstallOptions](/docs/v7.x/api/prefetch/interfaces/window_InstallOptions.default.html) for additional options when installing the service worker.

<a id="sample-install-prefetch-code" />**Example:**

Assuming that your client-side code is in `app.js`, you can install the service worker by adding the following code to `app.js`:

```js filename="app.js"
import { install , prefetch } from '{{ PACKAGE_NAME }}/prefetch/window';

/*
  Your client-side code here
*/

// install the service worker
document.addEventListener('DOMContentLoaded', () => {
  install({
    /* install options */
  });
});
```

Now when your client-side code runs, the service worker will be installed and ready to prefetch URLs.

### Defining a Prefetching Caching Policy {/*defining-a-prefetching-caching-policy*/}

Automatic prefetching requires an edge and service worker caching policy. From within your router, define a route that caches responses at the edge and in the service worker. Optionally, set a longer cache time for greater performance.

**Example:**

The following example defines a route that caches product API calls for one hour:

```js diff filename="routes.js"
import {Router} from '{{ PACKAGE_NAME }}/core';

export default new Router()
  // cache the service worker at the edge for 1 day
  .match('/service-worker.js', {
    caching: {
      max_age: '1d',
      bypass_client_cache: true,
    },
  })

  // serve the service worker from the /dist directory
  .match('/service-worker.js', ({serviceWorker}) => {
    serviceWorker('dist/service-worker.js');
  })

+  // cache policy for product API calls
+  .get('/api/products/:id.json', {
+    caching: {
+      max_age: '1h',
+      stale_while_revalidate: '1d',
+      service_worker_max_age: '1h',
+    }
+  });
```

#### Default Caching Policy for Manually Prefetching {/*default-caching-policy-for-manually-prefetching*/}

If the `caching.service_worker_max_age` feature has not been defined, you may still [manually prefetch content](#manual-prefetching). By default, manually prefetched content will be cached by the service worker for 2 minutes. Change the default time to live (TTL) by setting [`defaultMaxAgeSeconds`](/docs/v7.x/api/prefetch/interfaces/sw_Prefetcher.PrefetcherConfig.html#defaultMaxAgeSeconds) when initializing the `Prefetcher` instance in your service worker.

**Example:**

Set a default TTL of 10 minutes by initializing the `Prefetcher` instance as shown below:

```js filename="service-worker.js"
const prefetcher = new Prefetcher({defaultMaxAgeSeconds: 60 * 10}); // set the local cache TTL to 10 minutes
```

### Automatic Prefetching {/*automatic-prefetching*/}

{{ PRODUCT }} will attempt to prefetch links that meet all of the following conditions:

-   You have [built](#building-the-service-worker), [served](#serving-the-service-worker), and [registered](#registering-the-service-worker) the service worker.
-   The link is displayed in the viewport (i.e., the area of the web page that is currently visible to the user).
-   The link matches at least one rule that contains both of the following features:
    -   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

<Callout type="info">

  Prefetch requests are given the lowest priority. This ensures that they do not block more critical requests like API calls, images, scripts, and navigation.

</Callout>

By default, the response varies according to whether the requested content has been cached within the POP closest to the user.
-   If a cached response is found, then {{ PRODUCT }} will serve this cached content to the browser. The browser will then cache it locally for the duration defined by the Set Service Worker Max Age (service_worker_max_age) feature.
-   If a cached response is not found, then {{ PRODUCT }} will return a [412 Precondition Failed response](/applications/performance/troubleshooting#412-precondition-failed-status-code).

    <Callout type="info">

      Override this behavior by enabling the `data-include-cache-misses` attribute.

    </Callout>

**Next.js Framework Example:**

This example generates an HTML page with a list of links:

```js filename="app/pages/page.jsx"
import Link from 'next/link'

function Pages({ pages }) {
    return (
        <ul>
            {pages.map((post) => (
                <li key={page.id}>
                    <Link href={`/pages/${page.id}`}>{page.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Pages
```

Add the following rule to automatically cache and prefetch all navigation links in the above example:

```js filename="routes.js"
import { Router } from '{{ PACKAGE_NAME }}/core/router'

export default new Router()
    //  This rule's path matches the links href attribute
    .match("/pages/:id", {
        caching: {
            max_age: "1h", // Caches the response on the edge for 1 hour
            service_worker_max_age: "1h" // Enables automatic prefetching and caches the response in the browser SW cache for 1 hour
        }
    })
```

### Manual Prefetching {/*manual-prefetching*/}

Manual prefetching also uses `prefetch` function, but it is manually called from your client-side code. This is especially useful when prefetching based on user interactions or other events. The [`prefetch`](/docs/v7.x/api/prefetch/functions/window_prefetch.prefetch.html) function accepts a URL and an optional `config` object with properties defined in the [`PrefetchConfiguration`](/docs/v7.x/api/prefetch/types/window_prefetch.PrefetchConfiguration.html) interface. This function may be called at any time after the service worker is installed.

The following sections describe various ways to implement manual prefetching using the `prefetch` function.

#### Prefetching on Hover {/*prefetching-on-hover*/}

This example shows how you can prefetch links with an `href` attribute when the user hovers over them:

```js filename="app.js"
import { install, prefetch } from '{{ PACKAGE_NAME }}/prefetch/window';

/*
  Your client-side code here
*/

document.addEventListener('DOMContentLoaded', () => {
  install({
    /* install options */
  });

  // prefetch URLs when the user hovers over them
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A') {
      prefetch(e.target.getAttribute('href'));
    }
  });
});
```

#### Prefetching Based on Element Visibility {/*prefetching-based-on-element-visibility*/}

To prefetch URLs based on element visibility, you can use the [`watch`](/docs/v7.x/api/prefetch/interfaces/window_InstallOptions.default.html#watch) option when installing the service worker. The `watch` option accepts an array of objects with `selector` and `callback` properties. The `selector` property is a CSS selector that matches elements to watch for visibility. The `callback` property is a function that is called when an element matching the selector becomes visible. This element is passed to the callback function as an argument.

The following example will prefetch all links with an `href` attribute that are visible on the page:

```js filename="app.js"
import { install, prefetch } from '{{ PACKAGE_NAME }}/prefetch/window';

/*
  Your client-side code here
*/

// install the service worker
document.addEventListener('DOMContentLoaded', () => {
  install({
    watch: [
      {
        selector: 'a[href^="/"]',
        callback: (el) => {
          prefetch(el.getAttribute('href'));
        },
      },
      {
        selector: 'link[href^="/"]',
        callback: (el) => {
          prefetch(el.getAttribute('href'));
        },
      },
    ],
  });
});
```

## Framework Prefetch Components {/* framework-prefetch-components */}

{{ PRODUCT }} provides prefetch component integration for the following front-end frameworks:

  - [Next.js](#nextjs)
  - [React](#react)
  - [Vue.js](#vuejs)

These components allow for easier prefetch integration with your existing framework code without having to call the `prefetch` function directly.

### React {/* react */}

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

By default, `Prefetch` will fetch and cache the URL in the link's `href` attribute. If you have a single page app, you should typically prefetch the corresponding API call for the page rather than the page's HTML. The above example shows how to set the `url` property to control which URL is prefetched.

### Next.js {/* nextjs */}

If you are using Next.js with `getServerSideProps`, use `createNextDataURL` from `{{ PACKAGE_NAME }}/next/client` to prefetch the data for the linked page.

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

### Vue.js {/* vuejs */}

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

By default, the `Prefetch` component will fetch and cache the URL in the link's `to` attribute (for both `router-link` and `nuxt-link`). If you have a single page app, you should typically prefetch an API call for the page rather than the page's HTML. The above example shows how to set the `url` property to control which URL is prefetched.

## Deep Fetching {/* deep-fetching */}

By default, prefetching only fetches the JSON API data or HTML document for a prefetched page. In order to achieve truly instant page transitions, all of the page's assets above the fold need to be prefetched as well. This typically includes images, CSS, and JavaScript. This is where deep fetching comes in. Deep fetching parses the prefetched page and then fetches important assets from the prefetched page.

To add deep fetching to your project, add the [DeepFetchPlugin](/docs/v7.x/api/prefetch/classes/sw_DeepFetchPlugin.default.html) to your service worker. The `DeepFetchPlugin` is then configured with an array of selectors that describe which assets need to be prefetched:

```js filename="service-worker.js"
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

The `DeepFetchPlugin` can parse both HTML and JSON documents to extract the page assets that must be deep fetched. For {{ PRODUCT }} projects that are headless (i.e., the front-end communicates with the backend through an API), you should typically use the JSON option. However, if the backend and front-end endpoints are communicating using HTML responses, then you should use the HTML option. You can mix both HTML and JSON configuration objects in the array passed to the `DeepFetchPlugin`.

### Deep Fetching Urls in JSON Responses {/* deep-fetching-urls-in-json-responses */}

For JSON responses, you should pass the `DeepFetchPlugin`, which is an array of [DeepFetchJsonConfig interface](/docs/v7.x/api/prefetch/classes/sw_DeepFetchPlugin.default.html#jsonConfigs) objects. These `DeepFetchJsonConfig` objects describe the asset URLs in the JSON response that should be prefetched. For example, the snippet below finds product images to deep fetch for a category page response:

```js filename="service-worker.js"
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

### Deep Fetching for HTML Documents {/* deep-fetching-for-html-documents */}

To deep fetch HTML documents, pass the plugin objects that match the [DeepFetchHtmlConfig interface](/docs/v7.x/api/prefetch/classes/sw_DeepFetchPlugin.default.html#htmlConfigs) and describe which HTML elements need to be prefetched via CSS selectors.

For example, imagine you're configuring prefetching for a product page and you want to ensure the main product image is prefetched so that it appears immediately when the page loads. If the main product image is displayed with an HTML `img` element with a CSS class called `product-featured-media`, it can be prefetched by adding the following to the DeepFetchPlugin:

```js filename="service-worker.js"
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

#### Computing the URL to Be Prefetched {/* computing-the-url-to-be-prefetched */}

In the example above the `img` element's `src` attribute contains URL that needs to be prefetched. Sometimes finding the URL to prefetch is not so straightforward. For example, apps sometimes use JavaScript to compute the URL for responsive images based on the user's device size. In such cases you can provide a `callback` function which will be passed all matching elements and decide what URLs to prefetch. Here is an example:

```typescript filename="service-worker.js"
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

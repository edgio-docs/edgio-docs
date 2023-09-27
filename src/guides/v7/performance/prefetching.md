---
title: Predictive Prefetch
---

{{ PRODUCT_NAME }} allows you to speed up the user's browsing experience by prefetching pages and API calls that they are likely to need.

## Traffic Shielding {/* traffic-shielding */}

You might think that prefetching will put significant additional load on the infrastructure hosting your APIs. That's actually not the case! {{ PRODUCT_NAME }} only serves prefetch requests from the edge cache. It will never make a request to the origin if a prefetch request cannot be served from the edge cache, so your servers will never see an increased load.

## Prefetching with a traditional site {/* traditional-site */}
To integrate prefetching into your existing site without needing to build a custom service-worker file, you can use our pre-built SW from  `@edgio/prefetch`.
This solution is suitable for most of the sites that are not using any JS front-end framework or can't be hosted on Edgio Sites for any other reason.
If your site is based on JS front-end framework and you're looking for deeper integration of prefetching into it, please see the [Prefetching with Edgio Sites](#edgio-sites) section.

### Registering the Service Worker {/* registering-the-service-worker-with-pre-built-package */}
To register the pre-built service worker and enable prefetching, you simply need to add the following script tag to your existing site's HTML:

```html filename="index.html"
<script src="/__edgio__/prefetch/install.js"></script>
```
This script tag will always install the latest version of pre-built [`@edgio/prefetch`](https://www.npmjs.com/package/@edgio/prefetch?activeTab=versions) package. 
If you wish to install specific version of this package, you can do so by adding the version to the script tag like this:
```html filename="index.html" 
<script src="/__edgio__/prefetch/v7.2.5/install.js"></script>
```

Usage example:
```html diff filename="index.html"
<html>
<head>
    <title>My awesome site</title>
</head>
<body>
    <h1>My awesome page</h1>
    <p>This site uses pre-built @edgio/prefetch from the CDN</p>
    
+   <script src="/__edgio__/prefetch/install.js"></script>
</body>
</html> 
```

The following additional config attributes are available:

| Option                       | Description                                                                                                                                                                  | Default |
| ---------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------- |
| `data-include-cache-misses`  | Set this option to true to send all requests to the origin even when they are not yet in the Edge cache.                                                                     | `false` |
| `data-force-prefetch-ratio`  | This option allows to set probability that a prefetch request will be relayed to the origin even if a response is not in the cache. This should be a number between 0 and 1. | `0`     |

Usage example:
```html filename="index.html"
<script src="/__edgio__/prefetch/install.js" data-include-cache-misses="true" data-force-prefetch-ratio="0.5"></script>
```

### Automatic Prefetching {/* automatic-prefetching-with-pre-built-package */}
When the pre-built `@edgio/prefetch` is installed on your site, it will automatically prefetch all links on your site that are in the screen viewport and match any of the configured [Rules](/guides/performance/rules#rules) that sets [`caching.max_age`](https://docs.edg.io/guides/performance/rules/features#set-max-age) and [`caching.service_worker_max_age`](/guides/performance/rules/features#set-service-worker-max-age) features.
The resource is then cached in the browser for given amount of time which is defined by the `caching.service_worker_max_age` feature.
The prefetch requests will succeed only in case the resource is already in the edge cache by default to not overload your origin servers.

Let's start with following example:
```html filename="index.html"
<html>
<head>
    <title>My awesome site</title>
</head>
<body>
    <h1>My awesome page</h1>
    <p>This site uses pre-built @edgio/prefetch from the CDN</p>
    <nav>
        <a href="/pages/1">Page 1</a>
        <a href="/pages/2">Page 2</a>
        <a href="/pages/3">Page 3</a>
    </nav>
    
    <script src="/__edgio__/prefetch/install.js"></script>
</body>
</html> 
```
To cache and prefetch all navigation links automatically in upper example, we simply need to add the following rule in EdgeJS or Console UI:
```js filename="routes.js"
import { Router } from '@edgio/core/router'

export default new Router()
    //  This rule's path matches the navigation links href attribute
    .match("/pages/:id", {
        caching: {
            max_age: "1h", // Caches the response in the edge cache for 1 hour
            service_worker_max_age: "1h" // Enables automatic prefetching and caches the response in the browser SW cache for 1 hour
        }
    })
```
![Prefetch rule](/images/v7/performance/prefetch_rule.png)

### Manual Prefetching {/* manual-prefetching-with-pre-built-package */}

If you wish to prefetch some resources manually or do prefetching based on complex conditions, you can do so by calling `Edgio.prefetch()` function from your code.

Example:
```html filename="index.html"
<html>
<head>
    <title>My awesome site</title>
</head>
<body>
    <h1>My awesome page</h1>
    <p>This site uses pre-built @edgio/prefetch from the CDN</p>
    <nav>
        <a href="/pages/1">Page 1</a>
        <a href="/pages/2">Page 2</a>
        <a href="/pages/3">Page 3</a>
    </nav>
    
    <script src="/__edgio__/prefetch/install.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const { prefetch } = Edgio;
            prefetch('/static/img/my-image.png');
            prefetch('/static/img/another-image.png', 'image', {
                // Override service_worker_max_age config for this call
                maxAgeSeconds: 60 * 60 // 1 hour
            });
        });
    </script>
</body>
</html> 
```
See the `prefetch()` function  [docs](/docs/api/prefetch/functions/window_prefetch.prefetch.html) for all config options.


## Prefetching with Edgio Sites {/* edgio-sites */}
If your site is hosted on Edgio Sites or based on the JS front-end framework, you can install the `@edgio/prefetch` package directly and take advantage of all the features that this package offers and deeper integration with your site.

### Configuring the Service Worker {/* configuring-the-service-worker */}

To integrate prefetching into your site using the `@edgio/prefetch` package, you need to build service-worker with `Prefetcher` class. 
If your site doesn't currently have a service worker, one can easily be created using Google's [Workbox](https://developers.google.com/web/tools/workbox).

Here's a sample service worker based on Workbox using the `Prefetcher` class from `{{ PACKAGE_NAME }}/prefetch`:

```js filename="service-worker.js"
import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';

skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();
```

### Serving the Service Worker {/* serving-the-service-worker */}

After you have created a service worker, your router will need to be configued to serve the file. The following code will vary depending on the location of your service worker file. In this example, we will define a route that serves requests for `/service-worker.js`:

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
NOTE: If you're using one of our Edgio Site's [connectors](/guides/sites_frameworks/getting_started), you most likely don't need to configure the route for the service worker in this step. It will be automatically configured for you.

### Registering the Service Worker {/* registering-the-service-worker */}

Once you've created and defined a route to serve the service worker, code running in the browser window needs to register the service worker before prefetching can begin.

If you're not using a front-end framework that already registers the service worker, you can invoke the `install` function from `{{ PACKAGE_NAME }}/prefetch` to install the service worker within your client-side code. As an example, if your client-side code is in `app.js`, you can install the service worker by adding the following code to `app.js`:

<a id="sample-install-prefetch-code" />

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

See [InstallOptions](/docs/api/prefetch/interfaces/window_InstallOptions.default.html) for additional configuration when installing the service worker.

### Defining a Prefetching Caching Policy {/* defining-a-prefetching-caching-policy */}

To ensure that excessive prefetch traffic isn't passed on to your origin, {{ PRODUCT_NAME }} will serve prefetch requests when a cached response is available at the edge. You may configure a route that caches responses at the edge and in the service worker within your router, optionally giving it longer cache time for greater performance. In this example we define a route that caches product API calls for one hour:

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
+    },
+    headers: {
+      set_response_headers: {
+        'x-sw-cache-control': 'max-age=3600',
+      },
+    },
+  });
```

Note that if you prefetch a URL without setting `caching.service_worker_max_age` as shown above, the response will still be prefetched and cached by the service worker with a short TTL (2 minutes by default). You can change the default TTL by setting [`defaultMaxAgeSeconds`](/docs/api/prefetch/interfaces/sw_Prefetcher.PrefetcherConfig.html#defaultMaxAgeSeconds) when initializing the `Prefetcher` instance in your service worker. For example, to set the default TTL to 10 minutes, you would initialize the `Prefetcher` instance as follows:

```js filename="service-worker.js"
const prefetcher = new Prefetcher({defaultMaxAgeSeconds: 60 * 10}); // set the local cache TTL to 10 minutes
```

### Automatic Prefetching {/* automatic-prefetching */}
With the service worker installed and a cache policy configured, you can now begin prefetching URLs. Prefetch requests are given the lowest priority. This ensures that they do not block more critical requests like API calls, images, scripts, and navigation.
The `@edgio/prefetch` will automatically prefetch all links on your site that are in the screen viewport and match any of the configured [Rules](/guides/performance/rules#rules) that sets [`caching.max_age`](/guides/performance/rules/features#set-max-age) and [`caching.service_worker_max_age`](/guides/performance/rules/features#set-service-worker-max-age) features.

Let's start with following example from Next.js framework. This example will generate HTML page with list of all pages and links to them:
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
To cache and prefetch all links automatically in upper example, we simply need to add the following rule in EdgeJS or Console UI:
```js filename="routes.js"
import { Router } from '@edgio/core/router'

export default new Router()
    //  This rule's path matches the links href attribute
    .match("/pages/:id", {
        caching: {
            max_age: "1h", // Caches the response in the edge cache for 1 hour
            service_worker_max_age: "1h" // Enables automatic prefetching and caches the response in the browser SW cache for 1 hour
        }
    })
```
![Prefetch rule](/images/v7/performance/prefetch_rule.png)


### Manual Prefetching {/* manual-prefetching */}

Manual prefetching utilizes the same `prefetch` function as automatic prefetching, but is called manually from your client-side code. This could be useful if you want to prefetch URLs based on user interaction or other events.
The [`prefetch`](/docs/api/prefetch/functions/window_prefetch.prefetch.html) function accepts a URL and an optional `config` object with properties defined in the [`PrefetchConfiguration`](/docs/api/prefetch/types/window_prefetch.PrefetchConfiguration.html) interface. This function may be called at any time after the service worker is installed.

The following sections describe various ways to implement manual prefetching using the `prefetch` function.

#### Prefetching triggered by hover {/* prefetching-triggered-by-hover */}

This example shows how you can prefetch URL of links with an `href` attribute when the user hovers over them:
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

#### Prefetching based on element visibility {/* prefetching-based-on-element-visibility */}

To prefetch URLs based on element visibility, you can use the [`watch`](/docs/api/prefetch/interfaces/window_InstallOptions.default.html#watch) option when installing the service worker. The `watch` option accepts an array of objects with `selector` and `callback` properties. The `selector` property is a CSS selector that matches elements to watch for visibility. The `callback` property is a function that is called when an element matching the selector becomes visible. The callback function is passed the element as an argument. The following example will prefetch URLs for all links with an `href` attribute that are visible on the page:

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

{{ PRODUCT }} provides prefetch component integration for a few of the following front-end frameworks:

  - [Next.js](#nextjs)
  - [React](#react)
  - [Vue.js](#vuejs)

These components allow for easier prefetch integration with your existing framework code without need to directly call the `prefetch` function.

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

By default, `Prefetch` will fetch and cache the URL in the link's `href` attribute. If you have a single page app, you most likely want to prefetch the corresponding API call for the page rather than the page's HTML. The example above shows you how to set the `url` property to control which URL is prefetched.

### Next.js {/* nextjs */}

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

By default `Prefetch` will fetch and cache the URL in the link's `to` attribute (for both `router-link` and `nuxt-link`). If you have a single page app, you most likely want to prefetch an API call for the page rather than the page's HTML. The example above shows you how to set the `url` property to control which URL is prefetched.

## Deep Fetching {/* deep-fetching */}

By default, prefetching only fetches the JSON API data or HTML document for a prefetched page. In order to achieve truly instant page transitions, all of the page's assets above the fold need to be prefetched as well. These typically include images, CSS, and JavaScript. This is where "deep fetching" comes in. Deep fetching parses the prefetched page and then fetches the important assets of the prefetched page that you specify.

To add deep fetching to your project, add the [DeepFetchPlugin](/docs/api/prefetch/classes/sw_DeepFetchPlugin.default.html) to your service worker. The `DeepFetchPlugin` is then configured with an array of selectors that describe which assets need to be prefetched:

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

The `DeepFetchPlugin` can parse both HTML and JSON documents to extract the page assets that must be deep fetched. For {{ PRODUCT_NAME }} projects that are headless (i.e. the front end communicates with the backend through an API), you'll typically use the JSON option. However if the backend and front-end endpoints are communicating using HTML responses then you'll want to use the HTML option. Note that you can mix both HTML and JSON configuration objects in the an array passed to the `DeepFetchPlugin`.

### Deep Fetching Urls in JSON Responses {/* deep-fetching-urls-in-json-responses */}

For JSON responses, you'll pass the `DeepFetchPlugin` an array of [DeepFetchJsonConfig interface](/docs/api/prefetch/classes/sw_DeepFetchPlugin.default.html#jsonConfigs) objects. These `DeepFetchJsonConfig` objects describe the asset URLs in the JSON response that should be prefetched. For example, the snippet below finds product images to deep fetch for a category page response:

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

To deep fetch HTML documents, pass the plugin objects that match the [DeepFetchHtmlConfig interface](/docs/api/prefetch/classes/sw_DeepFetchPlugin.default.html#htmlConfigs) and describe which HTML elements need to be prefetched via CSS selectors.

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

## Reducing 412s {/* reducing-412s */}

By default, {{ PRODUCT_NAME }} will only serve prefetch requests from the edge cache. If a request cannot be served from the cache, a 412 status is returned. This protects your origin servers from additional traffic associated with prefetching. If you're seeing a surprisingly high number of 412s in your logs:

1. Ensure that the URLs you're prefetching match exactly those that are fetched during page navigation. Prefetch URLs will have `?{{ COOKIE_PREFIX }}_prefetch=1` whereas the URLs associated with page navigation won't. That's okay. The `{{ COOKIE_PREFIX }}_*` query parameters are automatically excluded from the cache key. Just ensure that there are no other differences.
2. Ensure that `caching` settings have stale-while-revalidate enabled. For example:

```js filename="routes.js"
router.get('/p/:productId', {
  caching: {
    max_age: '1h',
    service_worker_max_age: '1h',
    stale_while_revalidate: '1d', // this way stale items can still be prefetched
  },
  headers: {
    set_response_headers: {
      'x-sw-cache-control': 'max-age=3600',
    },
  },
});
```

3. Consider increasing `caching.max_age`. The shorter the cache time to live is, the more prefetches will fail.
4. Set the `includeCacheMisses` install option to `true`. This should be used with caution and is not recommended for use in production because it will significantly increase the traffic to your origin or API servers.

```js filename="app.js"
import install from '{{ PACKAGE_NAME }}/prefetch/window/install';

// Call the following once when the page loads to allow prefetch requests to be served when responses
// aren't available in the edge cache:
install({includeCacheMisses: true});
```

## The cache-manifest.js File {/* the-cache-manifestjs-file */}

This file is generated during deployment and is used by the `{{ PACKAGE_NAME }}/prefetch` to automatically prefetch all links on site based on configured Rules.
The file is publicly available on `/__edgio__/cache-manifest.js` path.

It exposes the Rules with following Features:
- [`caching.max_age`](/guides/performance/rules/features#set-max-age)
- [`caching.service_worker_max_age`](/guides/performance/rules/features#set-service-worker-max-age)
- [`caching.bypass_cache`](/guides/performance/rules/features#bypass-cache)
- [`caching.bypass_client_cache`](/guides/performance/rules/features#bypass-client-cache)

and Conditions:
- [`request.path`](/guides/performance/rules/conditions#path)
- [`request.method`](/guides/performance/rules/conditions#method)
- [`request.query`](/guides/performance/rules/features#query)
- [`request.scheme`](/guides/performance/rules/features#scheme)
- [`request.origin_query_string`](/guides/performance/rules/conditions#origin-query-string)
- `request.origin_query`
- [`request.origin_path`](/guides/performance/rules/conditions#origin-path)

All other features and conditions are unsupported and will be ignored. If you don't want to expose the rule publicly in this file for any reason, you can explicitly exclude it by adding `cache-manifest-ignore` comment to it.

Example:
```js filename="routes.js"
import { Router } from '@edgio/core/router'

export default new Router()
    // This rule will not be listed in the cache-manifest.js file
    .get("/static/my-image.png", {
        caching: {
            max_age: "1h", // Caches the response in the edge cache for 1 hour
        },
        comment: "cache-manifest-ignore"
    })
```

---
title: Traditional Sites
---

This guide describes how to get up and running with {{ PRODUCT_NAME }} for traditional, multi-page applications. {{ PRODUCT_NAME }} can enable traditional websites (e.g. jQuery, PHP, VanillaJS, etc.) to take advantage of the performance benefits of advanced caching and predictive prefetching. If your website is built on a modern framework such as React, Angular, or Vue, we recommend considering our [framework-specific guides](/applications/sites_frameworks/getting_started).

Note that the speed benefit for traditional sites from {{ PRODUCT_NAME }} is dependent on the site’s JavaScript usage during the page load. If a page has JavaScript heavy processing during load it may reduce the benefit from {{ PRODUCT_NAME }}. Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to request site analysis prior to installation. Our typical turnaround time is 1 to 2 business days.

## How {{ PRODUCT_NAME }} for Traditional Sites Works {/* how-for-traditional-sites-works */}

As shown below, {{ PRODUCT_NAME }} becomes the main CDN for your site:

![traffic](/images/starter/traffic.svg)

Requests for your site will now pass through {{ PRODUCT_NAME }}'s globally distributed network of computers and then to your server. Your site's main domain, such as `www.site.com` now points to {{ PRODUCT_NAME }}, and your original server now responds to a new domain such as `origin.site.com` that {{ PRODUCT_NAME }} will use for fetching your page data. Note that `origin.site.com` in this example is hidden from users; users continue to access your site transparently from your original domain `www.site.com`.

{{ PRODUCT_NAME }} will do two things that accelerate your pages:

- Globally distributed caching: Pages and content that are in {{ PRODUCT_NAME }} cache will be returned to the user faster than being fetched from your server.
- Predictive prefetching: {{ PRODUCT_NAME }} predictively prefetch and serve data to the device _before_ the user even requests it. By effectively streaming page data to the device a few seconds ahead of the shopper, the page load becomes instantaneous because there is no network to wait for. Normally the increased traffic from this kind of data streaming would overload your server, but {{ PRODUCT_NAME }}'s caching layer acts as a "shield" to protect your origin for this load.

## Implementation Process {/* implementation-process */}

The high level implementation process for {{ PRODUCT_NAME }} is:

1. Make sure your pages are cacheable
2. Set up a project
3. Configure caching and prefetching
4. Test locally and on {{ PRODUCT_NAME }}
5. Go live by changing the DNS

We highly recommend performing this process on a staging server before attempting to try it on your production website.

## Make Sure Your Pages are Cacheable {/* make-sure-your-pages-are-cacheable */}

{{ PRODUCT_NAME }} will only prefetch and accelerate pages that are cacheable, i.e. do not have user specific content. The good news is that most pages can be made cacheable with only a few adjustments. Let's walk through an example.

![Ecommerce homepage with a badge indicating the number of items in the cart](/images/starter/user-content-example.png)

Consider the ecommerce page shown above. Most of the content on this page such as the main hero image, the menu items, the company logo, and more are not user specific. However, the badge indicating the number of items in the cart is specific to that user browsing the page. The cart count can't be stored in the cache otherwise, every user would get a page with the same cart count. However to make this page cacheable we can simply remove the user specific parts and "late load" them with JavaScript. In this case, we could change the page so that the cart count is empty in the page HTML and let JavaScript on the page fetch the cart count and update the page HTML after it loads. This strategy of late load is fairly universal and you may want to delegate all the user specific content to a single late load request that is made by JavaScript on your page.

Here are some of common types of page content that may need this approach:

- Badges indicating the number of items in cart or bag
- Text or buttons dependent on the username or login status (e.g. "Login", or "Welcome Bob")
- Segmented or personalized content such as recommended products based on the user's profile or browsing behavior (note that recommended products based on page data _are_ cacheable because the same recommended product would be shown to all users).
- User specific parameters for analytics (e.g. if analytics tracks users by their userid or how frequently they visit the site).

See common things you need to look for on an eCommmerce site:

| Non-cacheable content                                                                                                           | How to Change               | Location |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| Cart item count                                                                                                                 | Late load via API           | Global   |
| Welcome message                                                                                                                 | Late load                   | Global   |
| Localized currency                                                                                                              | Split cache based on cookie | Global   |
| Inline analytics                                                                                                                | Refactor                    | Global   |
| Personalized banners                                                                                                            | Late load                   | Homepage |
| Promo pricing                                                                                                                   | Late load                   | PLP      |
| Complex pricing (e.g. employee discounts, affiliate discounts, pricing based on item combinations or dollar amount in the cart) | Late load                   | PLP, PDP |
| Inventory                                                                                                                       | Lower cache TTL             | PLP      |
| Product recommendations                                                                                                         | Late load                   | PDP      |
| Inventory                                                                                                                       | Targeted cache clearing     | PDP      |

<!-- ## Connector {/* connector */}

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](/applications/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-starter-connector">
  View the Connector Code
</ButtonLink> -->

{{ PREREQ.md }}

## Setup a Project {/* setup-a-project */}

Create a project through the following command:

```bash
  npx {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }} init \
    {{ INIT_ARG_EDGIO_VERSION }} \
    --name <DOMAIN> \
    --origin <DOMAIN>
```

Replace `<DOMAIN>` with your website's domain when running the above command.

<Callout type="important">

If asked by the CLI, choose **{{ PRODUCT }} Performance (CDN-as-Code)** as the project type.

</Callout>

Once your project has been initialized, change into the directory of your project and run the following command to add the `{{ PACKAGE_NAME }}/starter` connector:

<SnippetGroup>

```bash tabLabel="npm"
npm i -D {{ PACKAGE_NAME }}/starter@{{ PACKAGE_VERSION }}
```

```bash tabLabel="Yarn 1 Classic"
yarn add --dev {{ PACKAGE_NAME }}/starter@{{ PACKAGE_VERSION }}
```

</SnippetGroup>

This connector will be used below for bundling and serving your site.

### Project Structure {/* project-structure */}

Before we get started, you should familiarize yourself with some of the key files in the {{ PRODUCT_NAME }} project. We will create these files in a following step, but for now, here's a quick overview of what they do:

- `routes.ts`: This is automatically created during the `init` process and is where the routes to be cached and prefetched are defined, caching rules, as well as what to pass through without modification and what to serve up as static content.
- `src/service-worker.ts`: Executed in the browser. The service worker is able to prefetch content (main product image, scripts, fonts, links, etc. as defined here) from within the potential next page’s document. We call this method "deep fetching".
  This file is where deep-fetching rules are defined: the selector, how many elements, which attribute to fetch, resource type, and an optional callback function for more complex fetches (as shown in the example). Here's more detailed info about [deep fetching](#deep-fetching).
- `src/browser.ts`: This is the entry point for the javascript bundle to be injected into the page. Logic for installing the service worker and other browser-specific functionality can be added here.

<Callout type="important">

The `routes.ts` file is automatically created during the `init` process. You will need to create the `src/service-worker.ts` and `src/browser.ts` files under the `src` directory.

</Callout>

## Configure Caching and Prefetching {/* configure-caching-and-prefetching */}

Next we need to configure the caching in our newly created project. To do so, add a route for each URL you want to cache to the `routes.ts` file. For example, consider a site where the homepage (`/`), category pages (`/category/xxxx`), and product pages (`/product/yyyy`) are to be cached. Then your `routes.ts` file would look like:

```js filename="routes.ts"
import {Router} from '{{ PACKAGE_NAME }}/core/router';

export default new Router().get(
  ['/collections/:path*', '/products/:path*', '/'],
  {
    caching: {
      max_age: '1h',
      service_worker_max_age: '1h',
      bypass_client_cache: true,
    },
    headers: {
      set_response_headers: {
        'x-sw-cache-control': 'max-age=3600',
      },
      remove_origin_response_headers: ['set-cookie'],
    },
    origin: {
      set_origin: 'origin',
    },
  }
);
```

Refer to the guides on [CDN-as-code](/applications/performance/cdn_as_code) and [Caching](/applications/performance/caching) for the full syntax to use in your `routes.ts` file.

In addition to configuring your caching in `routes.ts` as shown above, you may need to employ [advanced prefetching techniques](#advanced-prefetching-techniques) to achieve the best possible performance

## Configure the Service Worker {/* configuring-the-service-worker */}

To enable prefetching, your site's service worker needs to use the `{{ PACKAGE_NAME }}/prefetch` library's `Prefetcher` class. If your site doesn't currently have a service worker, one can easily be created using Google's [Workbox](https://developers.google.com/web/tools/workbox).

Here's an example service worker based on Workbox:

```js filename="src/service-worker.ts"
import {skipWaiting, clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';

skipWaiting();
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();
```

## Serve the Service Worker {/* serving-the-service-worker */}

Within the {{ PRODUCT }} router, we'll need to serve the `service-worker.ts` file when requested by the browser. This can be accomplished automatically using the `{{ PACKAGE_NAME }}/starter` connector installed in the earlier step

### Using `starterRoutes` (Recommended) {/* using-starter-routes */}

By importing `starterRoutes` from `@edgio/starter`, the `service-worker.ts` file will be served automatically from the `dist/service-worker.ts` path. This is the recommended approach.

```js filename="routes.ts" ins="3,21"
import {Router} from '{{ PACKAGE_NAME }}/core/router';
import shoppingFlowRouteFeatures from './shoppingFlowRouteFeatures';
import {injectBrowserScript, starterRoutes} from '@edgio/starter';

export default new Router()
  .get(['/collections/:path*', '/products/:path*', '/'], {
    caching: {
      max_age: '1h',
      service_worker_max_age: '1h',
      bypass_client_cache: true,
    },
    headers: {
      set_response_headers: {
        'x-sw-cache-control': 'max-age=3600',
      },
      remove_origin_response_headers: ['set-cookie'],
    },
    origin: {
      set_origin: 'origin',
    },
  })
  .use(starterRoutes);
```

## Install the Service Worker {/* installing-the-service-worker */}

Once you've created a service worker, code running in the browser window needs to register the service worker before prefetching can begin. To do this, we create a `browser.ts` file which will be injected into the page:

```js filename="src/browser.ts"
import install from '@edgio/prefetch/window/install';
import {prefetch} from '@edgio/prefetch/window/prefetch';

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

In this file, we're using the `install` function to register the service worker and the `prefetch` function to prefetch content. The `install` function takes an object with a `watch` property. The `watch` property is an array of objects that define what content to prefetch. In this example, we're prefetching all links and stylesheets that start with a `/`.

## Injecting browser.ts into the Response {/* injecting-browser-js */}

Now that we've defined the client-side prefetch logic, we must inject the `browser.ts` file into the response. Injecting the script into the response allows for it to be executed in the browser once the response is received. To do this, we need to modify the router to transform the response we've received from the origin, add our browser script to the head of the document, and then send the modified response to the client.

### Transforming the Response {/* transforming-the-response */}

To transform the origin response and inject the `browser.ts` file, we'll use the `transformResponse` property on the `proxy` function. This function takes a callback function that receives the response from the origin and returns a modified response. We can then pass the response to the `injectBrowserScript` function to automatically add the `browser.ts` file to the head of the document.

```js filename="routes.ts" ins="3,23-28"
import {Router} from '{{ PACKAGE_NAME }}/core/router';
import shoppingFlowRouteFeatures from './shoppingFlowRouteFeatures';
import {injectBrowserScript, starterRoutes} from '@edgio/starter';

export default new Router()
  .get(['/collections/:path*', '/products/:path*', '/'], {
    caching: {
      max_age: '1h',
      service_worker_max_age: '1h',
      bypass_client_cache: true,
    },
    headers: {
      set_response_headers: {
        'x-sw-cache-control': 'max-age=3600',
      },
      remove_origin_response_headers: ['set-cookie'],
    },
    origin: {
      set_origin: 'origin',
    },
  })
  .get(['/collections/:path*', '/products/:path*', '/'], ({proxy}) => {
    proxy('origin', {
      transformResponse: (response) => {
        injectBrowserScript(response);
      },
    });
  })
  .use(starterRoutes);
```

### Understanding Caching and Prefetching {/* understanding-caching-and-prefetching */}

By injecting `browser.ts` into your app's front-end code, your app will register the service worker and prefetch URLs that you have configured match a route configured with `caching.max_age` and `caching.service_worker_max_age` (in essence, when you configure a route to be cached, you are also declaring it to be a candidate for prefetching as well). Links that are visible when the page first loads are fetched immediately. Additional links will be fetched when the user scrolls down the page and more links become visible.

Prefetching can generate substantial additional network traffic. {{ PRODUCT_NAME }} automatically shields your origin from this additional traffic by only serving prefetch requests from the edge cache. If a prefetch request cannot be served from the cache, {{ PRODUCT_NAME }} will return an HTTP 412 status and the request will not be proxied to the origin. When this happens, the only effect for the user is that they will not see the speed benefit of prefetching. Therefore, the effectiveness of prefetching ramps up over time as users visit pages throughout your site. When the edge cache is cleared, either through the {{ PORTAL }} or automatically following a deployment, the speed benefit of prefetching is decreased until the cache fills up based on organic traffic.

<a id="test-your-code-locally"></a>

## Test Your Code Locally and on {{ PRODUCT_NAME }} {/* test-your-code-locally-and-on */}

Now that you've configured your caching in `routes.ts`, you should test it in your local development environment and on {{ PRODUCT_NAME }}.

### Running Locally {/* running-locally */}

To test the caching behavior locally, run your project with the [local cache option](/applications/performance/caching#caching-during-development) as shown below:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

<a id="running"></a>

### Running on {{ PRODUCT_NAME }} {/* running-on */}

Now that you're satisfied with your site in local development, it's time to deploy it to the {{ PRODUCT_NAME }} cloud. Once your code is deployed to the {{ PRODUCT_NAME }} cloud, you can formally evaluate site performance and QA functionality.

Deploy the build to {{ PRODUCT_NAME }} by running the `{{ FULL_CLI_NAME }} deploy` command:

<SnippetGroup>

    ```bash tabLabel="{{ PRODUCT }} CLI Version 7.2.2 or higher"
    {{ CLI_NAME }} deploy --organization=<ORGANIZATION>
    ```

    ```bash tabLabel="Version 7.2.1 or lower"
    {{ CLI_NAME }} deploy --team=<ORGANIZATION>
    ```

</SnippetGroup>

Consult the [Deployment guide](/applications/basics/deployments) for more information on the options for deploying your site.

## Go Live by Changing the DNS {/* go-live-by-changing-the-dns */}

After you've configured and tested your site on {{ PRODUCT_NAME }}, it's time to take it live. At a high level, the process is:

1. Specify the domain name of the site under the Configuration tab for the environment in the {{ PORTAL }}.
2. Configure your SSL certificate under the Configuration tab for the environment in the {{ PORTAL }}.
3. Create a CNAME record with your DNS provider with the value shown under the _Domains_ section for the environment in the {{ PORTAL }}.

<Callout type="info">

The third step (configuring your DNS) will be the crucial step that effectively transitions your domain to {{ PRODUCT_NAME }} and should be done last.

</Callout>

[Learn more.](/applications/basics/serving_traffic)

Before going live, you should use the [{{ PRODUCT_NAME }} Onboarding Discovery Worksheet](https://docs.google.com/spreadsheets/d/11T-Dqcv5a_bS6mVj-t9-qrTn5o-Qdn9CjXO3yEHS4zY/) to help you think through common use cases and concerns and ensure a smooth launch.

## Advanced Prefetching Techniques {/* advanced-prefetching-techniques */}

An introduction to prefetching is available in the [Prefetching guide](/applications/performance/prefetching). In addition, here are some techniques to take full advantage of the power of prefetching.

### Deep Fetching {/* deep-fetching */}

Deep fetching is an important technique for {{ PRODUCT_NAME }} projects. By default, only HTML content is prefetched. In order to achieve truly instant page transitions, all of the assets needed to render the content that appears above the fold needs to be deep fetched. Refer to the [Deep Fetching](/applications/performance/prefetching#deep-fetching) section of the [Prefetching guide](/applications/performance/prefetching) for more details on how to configure deep fetching in your project.

<!-- ### Prefetching POSTs {/* prefetching-posts */}

Most assets that need to be prefetched are HTTP `GET` requests. It is also possible to prefetch `POST` requests with some additional configuration.

When your app prefetches assets, the actual prefetch request is always a `GET`, so you need to make sure that your router is configured to respond to `GET` requests for any `POST` URL. In order to ensure that the response is cached as a `POST` by the service worker, you need to specify `convertToGet: true` in the cache config for the prefetch route handler, and to also use the `transformMethod` function to properly transform the `GET` request into a `POST` on the server:

```js
import {transformMethod} from '{{ PACKAGE_NAME }}/core/transform';

const postCacheConfig = {
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60,
  },
  browser: {
    serviceWorkerSeconds: 60 * 60 * 24,
    convertToGet: true,
  },
};

export default new Router()
  // When the request is a GET, convert it to post using Cloud Functions and cache the result
  .get('/some-post-path', ({cache, proxy}) => {
    cache(postCacheConfig);
    proxy('origin', {
      transformRequest: transformMethod('post'),
    });
  })
  // When the request is a POST, forward it to origin from the edge without using Cloud Functions
  .post('/some-post-path', ({cache, proxy}) => {
    cache(postCacheConfig);
    proxy('origin');
  });
``` -->

### Prefetching based on Element Visibility {/* prefetching-based-on-element-visibility */}

When installing the service worker, you can specify a `watch` list. Elements that match `watch` selectors can trigger a callback function when they become visible in the viewport:

```js
import {install, prefetch} from '{{ PACKAGE_NAME }}/prefetch/window';

document.addEventListener('DOMContentLoaded', function () {
  install({
    // If you don't have links specified with a `<a>` tags with `href` attributes, you can also
    // specify watchers to prefetch when other elements are added to the page:
    watch: [
      {
        selector: 'div.product-tile',
        callback: (el) => {
          const productId = el.getAttribute('data-product-id');
          const catId = document
            .getElementById('cat-listing')
            .getAttribute('data-category-id');
          prefetch(`/api/${catId}/${productId}`, 'fetch');
        },
      },
    ],
  });
});
```

### Maintenance {/* maintenance */}

For the most part maintenance for traditional sites running on {{ PRODUCT_NAME }} is minimal. However, the typical scenarios that require changes are:

- If you add personalized or user-specific content to the page you will need to make sure it is late loaded as described in the [Make sure your pages are cacheable](#make-sure-your-pages-are-cacheable) section.
- If you introduce a new segmentation of content (e.g. support a new language or currency), you may need to update your [custom cache key](/applications/performance/caching#customizing-the-cache-key).
- If you change the layout of the page (especially above the _fold_), it may alter the assets you need to prefetch or [deepfetch](#deep-fetching) to achieve the best performance.

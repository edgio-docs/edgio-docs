# XDN Starter

This guide describes how to get up and running with XDN Starter. XDN Starter enables traditional websites (i.e. jQuery, PHP, VanillaJS, etc.) to take advantage of the performance benefits of the XDN's advanced caching and predictive prefetching. If your website is built on a modern framework such as React, Angular, or Vue, we recommend considering our framework specific guides that can be found on the [homepage](/) as an alternative to XDN Starter.

Note that the speed benefit from XDN Starter is dependent on a site’s JavaScript usage during the page load. If a page has JavaScript heavy processing during load it may reduce the benefit from XDN Starter. Please contact our team via the chat button in the bottom right of this page if you're interested in a site analysis prior to beginning installation — turnaround time is typically 1-2 business days.

## How XDN Starter works

As shown below, in XDN Starter the XDN becomes the main CDN for your site:

![traffic](/images/starter/traffic.png)

Requests for your site will now pass through the XDN's globally distributed network of computers and then to your server. Your site's main domain, such as `www.site.com` now points to the XDN, and your original server now responds to a new domain such as `origin.site.com` that the XDN will use for fetching your page data. Note that `origin.site.com` in this example is hidden from users; users continue to access your site transparently from your original domain `www.site.com`.

The XDN will do two things that accelerate your pages:

- Globally distributed caching: Pages and content that are in the XDN cache will be returned to the user faster than being fetched from your server.
- Predictive prefetching: The XDN predictively prefetch and serve data to the device _before_ the user even requests it. By effectively streaming page data to the device a few seconds ahead of the shopper, the page load becomes instantaneous because there is no network to wait for. Normally the increased traffic from this kind of data streaming would overload your server, but the XDN's caching layer acting as a "shield" protecting your origin for this load.

## Implementation Process

The high level implementation process for XDN Starter is:

1. Make sure your pages are cachable
2. Add the XDN JavaScript libraries to your site
3. Set up a Starter project
4. Configure caching and prefetching
5. Test locally and on the XDN
6. Go live by changing the DNS

We highly recommend performing this process on a staging server before attempting to try it on your production website.

## Make sure your pages are cachable

The XDN will only prefetch and accelerate pages that are cachable, i.e. do not have user specific content. The good news is that most pages can be made cachable with only a few adjustments. Let's walk through an example.

![Ecommerce homepage with a badge indicating the number of items in the cart](/images/starter/user-content-example.png)

Consider the ecommerce page shown above. Most of the content on this page such as the main hero image, the menu items, the company logo, and more are not user specific. However, the badge indicating the number of items in the cart is specific to that user browsing the page. The cart count can't be stored in the cache otherwise, every user would get a page with the same cart count. However to make this page cacheable we can simply remove the user specific parts and "late load" them with JavaScript. In this case, we could change the page so that the cart count is empty in the page HTML and let JavaScript on the page fetch the cart count and update the page HTML after it loads. This strategy of late load is fairly universal and you may want to delegate all the user specific content to a single late load request that is made by JavaScript on your page.

Here are some of common types of page content that may need this approach:

- Badges indicating the number of items in cart or bag
- Text or buttons dependent on the username or login status (e.g. "Login", or "Welcome Bob")
- Segmented or personalized content such as recommended products based on the user's profile or browsing behavior (note that recommended products based on page data _are_ cachable because the same recommended product would be shown to all users).
- User specific parameters for analytics (e.g. if analytics tracks users by their userid or how frequently they visit the site).


## Add the XDN JavaScript libraries to your site

Next install the XDN JavaScript libraries to your site by adding the following to your site's HTML:

```html
<script src="/__xdn__/cache-manifest.js" defer="defer"></script>
<script src="/main.js" defer="defer"></script>
```

These tags power the predictive prefetching and caching that will be used by the XDN. Note that the JavaScript assets referenced in the above script tags are not on your server. The XDN server the assets for these script tags once the XDN is installed in front of your server as described in [How XDN Starter works](#section_how_xdn_starter_works).

## Setup a Starter project

As with any XDN project make sure you have Node and npm installed. If you do not have Node.js installed on your system, download and install it from official [Node.js downloads page](https://nodejs.org/en/download/). Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

Next, install the [XDN CLI](cli)

```bash
npm i -g @xdn/cli
```

Create your Starter project using the XDN's create module:

```bash
npm create xdn-app@latest
```

The XDN create module will prompt you for the following information:

- Name: Give your project name.
- Template: Select the `Default Starter template` option.
- Hostname: Enter the domain of the origin server that the XDN will be accelerating.
- Package manager: Pick `npm` unless you have strong preference and experience with `yarn`. This guide will assume `npm`.

Refer to the [xdn.config.js](xdn_config) guide for more details

Here's an example output from running XDN create:

```bash
$ npm create xdn-app@latest
npx: installed 170 in 10.375s
✔ Enter a name for your app … my-starter-app
✔ Select an app template › Default starter template
✔ Enter the hostname for the origin site (e.g. domain.com) … origin.site.com
✔ Which package manager would you like to use? › npm
✔ Downloading Default starter template XDN template... done.
✔ Installing dependencies... done.

XDN app created! Run the following to start your app in development mode:

cd my-starter-app
npm start

To deploy your app on the Moovweb XDN, run:

npm run deploy

$
```

### Project Structure

Before we get started, you should familiarize yourself with some of the key files in the XDN project:

- `service-worker.ts`: Is run on the browser. The service worker is able to prefetch content (main product image, scripts, fonts, links, etc. as defined here) from within the potential next page’s document. We call this method "deepfetching".
  This file is where deepfetching rules are defined: the selector, how many elements, which attribute to fetch, resource type, and an optional callback function for more complex fetches (as shown in the example). More detailed info about deepfetching is [described below](#section_deep_fetching).
- `shoppingFlowRouteHandler.ts`: Is run on the XDN. It’s where the caching rules get implemented, as well as where the modifications to be made to the requests and/or responses to support caching of dynamic content are defined.
- `cache.ts`: This is where the caching rules are defined for both the XDN (edge) and the browser.
- `routes.ts`: This is where the routes to be cached and prefetched are defined, as well as what to pass through without modification and what to serve up as static content.
- `browser.ts`: This is entry point for the `main.js` javascript bundle which is added to the window.

## Configure Caching and Prefetching

Next we need to configure the caching in our newly created project. To do so, add a route for each URL you want to cache to the `routes.ts` file. For example, consider a site where the homepage (`/`), category pages (`/category/xxxx`), and product pages (`/product/yyyy`) are to be cached. Then your `routes.ts` file would look like:

```typescript
// routes.ts
import { Router } from '@xdn/core/router'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .get('/', shoppingFlowRouteHandler)
  .get('/collections/*path', shoppingFlowRouteHandler)
  .get('/products/*path', shoppingFlowRouteHandler)
```

```typescript
// shoppingFlowRouteHandler.ts
import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@xdn/core/router/Router'

const handler: RouteHandler = async ({ cache, removeResponseHeader, proxy }) => {
  cache(CACHE_PAGES)
  removeResponseHeader('set-cookie') // The presence of a set-cookie header would prevent the response from being cached, so ensure set-cookie headers are removed.
  proxy('origin')
}

export default handler
```

```typescript
// cache.ts
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

/**
 * The default cache setting for pages in the shopping flow
 */
export const CACHE_PAGES = {
  edge: {
    maxAgeSeconds: ONE_HOUR,
  },
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: ONE_HOUR,
  },
}
```

Refer to the guides on [Routing](routing) and [Caching](caching) for the full syntax to use in your `routes.js` file. 

In addition to configuring your caching in `routes.ts` as shown above, you may need to employ [advanced prefetching techniques](#section_advanced_prefetching_techniques) to achieve the best possible performance 
 
### Understanding Caching and Prefetching

By injecting `main.js` into your app's front-end code, your app will automatically prefetch all visible HTML links with URLs that match a route configured with `edge.maxAgeSeconds` and `browser.serviceWorkerSeconds` (in essence, when you configure a route to be cached, you are also declaring it to be a candidate for prefetching as well). Links that are visible when the page first loads are fetched immediately. Additional links will be fetched when the user scrolls down the page and more links become visible.

Prefetching can generate substantial additional network traffic. The XDN automatically shields your origin from this additional traffic by only serving prefetch requests from the edge cache. If a prefetch request cannot be served from the cache, the XDN will return an HTTP 412 status and the request will not be proxied to the origin. When this happens, the only effect for the user is that they will not see the speed benefit of prefetching. Therefore, the effectiveness of prefetching ramps up over time as users visit pages throughout your site. When the edge cache is cleared, either through [XDN Console](caching#section_clearing_the_cache) or automatically following a deployment, the speed benefit of prefetching is decreased until the cache fills up based on organic traffic.

## Test your code locally and on the XDN

Now that you've configured your caching in `routes.ts`, you should test it in your local development environment and on the XDN.

### Running Locally

To test the caching behavior locally, run your project with the [local cache option](caching#section_caching_during_development) as shown below:

```bash
xdn run --cache
```

### Running on the XDN

Now that you're satisfied with your site in local development, it's time to deploy it to the XDN Cloud. Once your code is deployed to the XDN Cloud, you can formally evaluate site performance and QA functionality.

To deploy your site to the Moovweb XDN, you must first sign up for an account. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy your site using the `deploy` command:

```bash
xdn deploy --team=[team-name]
```

Consult the [Deploying guide](deploying) for more information on the options for deploying your site.

## Go live by changing the DNS

After you've configured and tested your site on the XDN, it's time to take it live. At a high level, the process is:

1. Specify the domain name of the site in the XDN Console.
2. Configure your SSL certificate in the XDN Console.
3. Create a CNAME record with your DNS provider with the value shown under DNS Configuration section of the XDN Console.

Each of these steps is described in more detail in the [Production guide](production). Note that third step (configuring your DNS) will be the crucial step that effectively transitions your domain to the XDN and should be done last.

## Advanced Prefetching Techniques

An introduction to prefetching is available in the [Prefetching guide](prefetching). In addition, here are some techniques to take full advantage of the power of prefetching. 

### Deep Fetching

By default, only HTML content is prefetched. In order to achieve truly instant page transitions, all of the assets needed to render the content that appears above the fold need to be prefetched. These typically include images, CSS, and JavaScript.

To deep fetch these assets, add the [DeepFetchPlugin](/docs/api/prefetch/classes/_sw_deepfetchplugin_.deepfetchplugin.html) plugin to your service worker. The `DeepFetchPlugin` is configured with an array of selectors that describe which HTML elements need to be prefetched. For example, imagine you're configuring prefetching for a product page and you want to ensure the main product image is prefetched so that it appears immediately when the page loads. If the main product image is displayed with an HTML `img` element with a CSS class called `product-featured-media`, it can be prefetched by adding the following to the DeepFetchPlugin:

```js
import { Prefetcher } from '@xdn/prefetch/sw'
import DeepFetchPlugin from '@xdn/prefetch/sw/DeepFetchPlugin'

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
})
```

#### Computing the URL to be prefetched

In the example above the `img` element's `src` attribute contains URL that needs to be prefetched. Sometimes finding the URL to prefetch is not so straightforward. For example, apps sometimes use JavaScript to compute the URL for responsive images based on the user's device size. In such cases you can provide a `callback` function which will be passed all matching elements and decide what URLs to prefetch. Here is an example:

```typescript
import { Prefetcher, prefetch } from '@xdn/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@xdn/prefetch/sw/DeepFetchPlugin'

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
})

function deepFetchResponsiveImages({ $el, el, $ }: DeepFetchCallbackParam) {
  const urlTemplate = $el.attr('data-src')
  const dataWidths = $el.attr('data-widths')

  if (dataWidths && urlTemplate) {
    const widths = JSON.parse(dataWidths)

    for (let width of widths.slice(0, 2)) {
      const url = urlTemplate?.replace(/\{width\}/, width)
      prefetch(url, 'image')
    }
  }
}
```

### Deep fetching URLs in JSON responses

In addition to deep fetching URLs found in HTML responses, you can also configure deep fetching for URLs found in JSON responses such as API calls. Here is an example which finds product images to deep fetch for a category page:

```js
new DeepFetchPlugin([
  // deep fetches the "category" API call to get PLP images:
  {
    jsonQuery: 'Bundles.[**].Products:products(Product).MediumImageFile',
    jsonQueryOptions: {
      locals: {
        // filters out null products:
        products: input => input.filter(prod => prod),
      },
    },
    maxMatches: 10,
    as: 'image',
  },
])
```

The `jsonQuery` syntax is provided by the [json-query](https://github.com/auditassistant/json-query) library. You can test your JSON queries using their [JSON-query Tester Sandbox](https://maxleiko.github.io/json-query-tester/).

### Prefetching POSTs

Most assets that need to be prefetched are HTTP GET requests. It is also possible to prefetch POST requests with some additional configuration.

When your app prefetches assets, the actual prefetch request is always a GET, so you need to make sure that your router is configured to respond to GET requests for any POST URL. In order to ensure that the response is cached as a POST by the service worker, you need to specify `convertToGet: true` in the cache config for the prefetch route handler, and to also use the `transformMethod` function to properly transform the GET request into a POST on the server:

```js
import { transformMethod } from '@xdn/core/transform'

const postCacheConfig = {
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60,
  },
  browser: {
    serviceWorkerSeconds: 60 * 60 * 24,
    convertToGet: true,
  },
}

export default new Router()
  // When the request is a GET, convert it to post using serverless compute and cache the result
  .get('/some-post-path', ({ cache, proxy }) => {
    cache(postCacheConfig)
    proxy('origin', {
      transformRequest: transformMethod('post'),
    })
  })
  // When the request is a POST, forward it to origin from the edge without using serverless compute
  .post('/some-post-path', ({ cache, proxy }) => {
    cache(postCacheConfig)
    proxy('origin')
  })
```

### Prefetching based on element visibility

By default, `<a>` tags are watched by the Prefetcher so that the value of their `href` attributes are prefetched once the links become visible in the viewport. However, sometimes you might need to trigger a prefetch based on the visibility of other types of elements.
 
When installing the service worker, you can specify a `watch` list. Elements that match `watch` selectors can trigger a callback function when they become visible in the viewport:

```js
import { install, prefetch } from '@xdn/prefetch/window'

document.addEventListener('DOMContentLoaded', function() {
  install({
    // If you don't have links specified with a `<a>` tags with `href` attributes, you can also
    // specify watchers to prefetch when other elements are added to the page:
    watch: [
      {
        selector: 'div.product-tile',
        callback: el => {
          const productId = el.getAttribute('data-product-id')
          const catId = document.getElementById('cat-listing').getAttribute('data-category-id')
          prefetch(`/api/${catId}/${productId}`, 'fetch')
        },
      },
    ],
  })
})
```

### Maintenance

For the most part maintenance for XDN starter is minimal. However, the typical scenarios that require changes are: 

* If you add personalized or user-specific content to the page you will need to make sure it is late loaded as described in the [Make sure your pages are cachable](#section_make_sure_your_pages_are_cachable) section. 
* If you introduce a new segmentation of content (i.e. support a new language or currency), you may need to update your [custom cache key](/guides/caching#section_customizing_the_cache_key).
* If you change the layout of the page (especially above the "fold"), it may alter the assets you need to prefetch or [deepfetch](#section_deep_fetching) to achieve the best performance.

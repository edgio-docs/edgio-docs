---
title: Caching
---

This guide introduces the caching capabilities of {{ PRODUCT_NAME }}. While most CDNs only cache content on your asset URLs, {{ PRODUCT_NAME }} caches content on your page URLs using {{ EDGEJS_LABEL }}, allowing you to control caching within your application code.

## Environments and Caching {/*environments-and-caching*/}

To begin caching responses, you need to create an [environment](/guides/basics/environments). Each environment provides a separate edge cache for the most recent deployment. Older deployments will no longer have edge caching, but can always be [redeployed](/guides/basics/deployments#branches-and-deployments) to re-enable caching.

## L1 and L2 Caches {/*l1-and-l2-caches*/}

Each edge point-of-presence (POP) has its own L1 cache. If a request cannot be fulfilled from the L1 cache, {{ PRODUCT_NAME }} will attempt to fulfill the request from a single global L2 cache POP in order to maximize your effective cache hit ratio. There is very little difference in time to first byte (TTFB) for responses served from the L1 vs L2 cache. In either case, the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the L2 cache. This means that only one request at a time will be sent to your origin servers for each cacheable URL.

## Caching a Response {/*caching-a-response*/}

To cache a response, use the [cache](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#cache) function in your route's callback:

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    browser: {
      // Sets the cache-control: maxage=n header sent to the browser.  To prevent the browser from caching this route
      // set maxAgeSeconds: 0
      maxAgeSeconds: 0,

      // Sends a non-standard header `x-sw-cache-control: n` that you can use to control caching your service worker.
      // Note that service workers do not understand this header by default, so you would need to add code to your service
      // worker to support it
      serviceWorkerSeconds: 60 * 60,
    },
    edge: {
      // Sets the TTL for a response in {{ PRODUCT_NAME }}'s edge cache
      maxAgeSeconds: 60 * 60 * 24,

      // Sets the amount of time a stale response will be served from the cache.  When a stale response is sent, {{ PRODUCT_NAME }}
      // will simultaneously fetch a new response to serve subsequent requests.
      // Using stale-while-revalidate helps raise your effective cache hit rate to near 100%.
      staleWhileRevalidateSeconds: 60 * 60, // serve stale responses for up to 1 hour while fetching a new response

      // And many other options
    },
    // Optionally customizes the cache key for both edge and browser
    key: new CustomCacheKey()
      .addBrowser() // Split cache by browser type
      .addCookie('some-cookie'), // Split cache by some-cookie cookie
  })
})
```

The `cache` function can be used in the same route as other functions such as `serveStatic`, `proxy` and `render`, or in a separate route prior to sending the response.

### Cache Key {/*cache-key*/}

{{ PRODUCT_NAME }} provides you with a default cache key out of the box. It is a broad cache key that ensures general correctness but can be further customized by you. The default cache key consists of:

- Value of `host` request header
- Complete request URL, including the query parameters (this can be customized)
- Value of `accept-encoding` request header
- Name of the destination when [A/B testing](/guides/performance/traffic_splitting/a_b_testing) is in effect

When [POST and other non-GET/HEAD](#caching-responses-for-post-and-other-non-gethead-requests) methods caching is enabled, {{ PRODUCT_NAME }} automatically adds the following to the cache key:

- Request HTTP method
- Request body

To ensure that your site is resilient to [cache poisoning attacks](/guides/security/security_suite#cache-poisoning), every request header that influences the rendering of the content must be included in your custom cache key.

#### Customizing the Cache Key {/*customizing-the-cache-key*/}

It is often useful to customize the cache key, either to improve the cache hit ratio or to account for complexities of your site. As seen above, {{ PRODUCT_NAME }} provides an easy way to customize the keys by using the `CustomCacheKey` class. Here we will focus on three common examples:

- Increasing the cache hit ratio by excluding all query parameters except those provided from the cache key. This lets only those specified parameters to fragment the cache (so you would add things like page, number per page, filters, variants of a product etc.)

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    // Other options...
    key: new CustomCacheKey().excludeAllQueryParametersExcept('whitelisted-param-1', 'whitelisted-param-2'),
  })
})
```

We recommend using this method over `excludeQueryParameters` as it's difficult to know all of the query parameters your application might receive and unexpected query parameters can lead to significantly lower cache hit rates. With excludeQueryParameters, it stops the listed query parameters from fragmenting the cache (so you would add things like utm_medium, gclid, or other marketing params you know that don't alter the content on the page)

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    // Other options...
    key: new CustomCacheKey().excludeQueryParameters('to-be-excluded-1', 'to-be-excluded-2'),
  })
})
```

This will remove the given query parameters from the URL before it is used in cache. On cache miss, the transformed URL will be passed to your code with the original query strings available to your code in `{{ HEADER_PREFIX }}-original-qs` request header.

- Including other request parameters like cookies:

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    key: new CustomCacheKey().addCookie('language').addCookie('currency'),
    // Other options...
  })
})
```

This will take the values of `language` and `currency` cookies from the `cookie` request header and use them in the cache key. This would allow you to cache different content for the same URL by creating different caches dependent on the `language` and `currency` values.

- Splitting the cache based on device type:

```js
import { CustomCacheKey } from '{{ PACKAGE_NAME }}/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    key: new CustomCacheKey().addDevice(),
    // Other options...
  })
})
```

This will take the value of the `{{ HEADER_PREFIX }}-device` request header and split based on the following devices:

- `smartphone`
- `tablet`
- `mobile` (feature phones)
- `desktop`

This allows you to cache different content, depending on the type of device in this example, for the same URL.

Customizing caching keys is a very powerful tool to make your site faster. At the same time, it is easy to apply it too broadly causing a loss of performance due to lower cache hit ratio. The key to correctly using cache customization is to apply it judiciously and narrowly for specific routes.

### Caching Responses for POST and other non-GET/HEAD Requests {/*caching-responses-for-post-and-other-non-gethead-requests*/}

{{ PRODUCT_NAME }} only supports caching responses for `GET` and `HEAD` requests. Some APIs, particularly those implemented with GraphQL, use `POST` requests by default, with queries being sent through the request body.

### Caching Private Responses {/*caching-private-responses*/}

By default, {{ PRODUCT_NAME }} never caches responses which have the `private` clause in their `cache-control` header. Sometimes though, it's desirable to cache such responses, intended for a single user of your site:

```js
router.get('/some/path', ({ cache }) => {
  cache({
    // Other options...
    edge: {
      // Other options...
      forcePrivateCaching: true, // Force caching of `private` responses
    },
  })
})
```

Note that this feature cannot be safely used with caching of `POST` and similar requests. If your signal that something must not be cached is through `private` but then you force caching of `private` responses, **all responses will be cached**.

## Achieving 100% Cache Hit Rates {/*achieving-100-cache-hit-rates*/}

The key to really successful cache hit rates is leveraging `staleWhileRevalidate` in conjunction with `maxAge`. There is a very detailed [article](https://web.dev/stale-while-revalidate/) available from web.dev that covers this concept in more detail. The main points to know is this

- `maxAge` defines the hard cache limit. An asset will be cached this amount of time regardless.
- `staleWhileRevalidate` defines an additional cache buffer limit past `maxAge` where cache content will still be returned to a client, but a network request will be issued to origin to check for new content.
- If `maxAge` + `staleWhileRevalidate` value is exceeded, then a network request to origin is made no matter what.

Set keys using the `edge` key in your cache key

```js
edge: {
  // 24 hours
  maxAgeSeconds: 60 * 60 * 24,
  // serve stale responses for up to 1 hour while fetching a new response
  staleWhileRevalidateSeconds: 60 * 60,
},
```

With the following header set, the diagram below shows the age of the previously cached response at the time of the next request

```
Cache-Control: max-age=1, stale-while-revalidate=59
```

![maxAge staleWhileRevalidate diagram](/images/caching/stale-max-age.png)

## Preventing a Response from being Cached {/*preventing-a-response-from-being-cached*/}

By default, {{ PRODUCT_NAME }} will cache responses that satisfy all of the following conditions:

1. The response must correspond to a `GET` or `HEAD` request. To override this, see the [_POST and other non-GET/HEAD_](#caching-responses-for-post-and-other-non-gethead-requests) section.
2. The response status must have a status code of 1xx, 2xx or 3xx. You cannot override this.
3. The response must not not have any `set-cookie` headers. You cannot override this, but you can use `removeUpstreamResponseHeader('set-cookie')` to remove `set-cookie` headers.
4. The response must have a valid `cache-control` header that includes a positive `max-age` or `s-maxage` and does not include a `private` clause. You can override this by using [router caching](#caching-a-response) and [forcing private responses](#caching-private-responses).

However, sometimes you may not want to cache anything, even if the upstream backend returns a `max-age`. Other times, you might want to [improve the performance](/guides/performance#turn-off-caching-when-not-needed) of pages that can never be cached at edge. In those cases, you can turn off caching:

```js
router.get('/some/uncacheable/path', ({ cache, proxy }) => {
  cache({
    // Other options...
    edge: false
  })
  // The route will need to send a response to prevent the request from continuing on to subsequent routes.
  // This example sends the request through to a backend defined as "origin" which will complete the request cycle
  await proxy('origin')
})
```

## How do I know if a response was served from the cache? {/*how-do-i-know-if-a-response-was-served-from-the-cache*/}

To know if a response is being cached, examine the `{{ HEADER_PREFIX }}-t` response header. There are two components that indicate caching status:

- `oc` - The outer (level 1) cache
- `sc` - The shield (level 2) cache

You will see one of the following values for these components:

- `pass` - The response was not cached (aka a cache "miss")
- `cached` - The response was added to the cache, but was not served from the cache (aka a cache "miss" that may be a "hit" for the next request)
- `hit` - The response was served from the cache

## Why is my response not being cached? {/*why-is-my-response-not-being-cached*/}

To understand why a response was not cached, examine the `{{ HEADER_PREFIX }}-caching-status` response header. It will have one of the following values:

### ok {/*ok*/}

The response was cached or served from the cache (see `{{ HEADER_PREFIX }}-t`).

### disabled {/*disabled*/}

The response was not cached because the edge caching was explicitly disabled (see [Preventing a Response from being Cached](#preventing-a-response-from-being-cached)).

### no-max-age {/*no-max-age*/}

The response was not cached because there was no `cache-control` response header with a non-zero `max-age` or `s-maxage` value. To cache the response, call `cache` in your route handler with `edge.maxAgeSeconds` set. For example:

```js
new Router().get('/', ({ cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24,
    },
  })
})
```

You can also cache the response by adding a `cache-control` header with non-zero `max-age` or `s-maxage` value to the upstream response.

### code {/*code*/}

The response was not cached because the response had a status code >= 400.

### private {/*private*/}

The response was not cached because it contained a `cache-control` header with `private`. To cache the response, use:

```js
new Router().get('/', ({ cache }) => {
  cache({
    edge: {
      forcePrivateCaching: true,
    },
  })
})
```

You can also remove the `private` value from the upstream response's `cache-control` header.

### method {/*method*/}

The response was not cached because the request method was something other than `HEAD` or `GET`, and the route that set the caching behavior used `match`. To cache the `POST` responses, for example, use `router.post()` instead of `router.match()`.

### body-too-big {/*body-too-big*/}

The response was not cached because the request body was more than 8000 bytes.

### set-cookie {/*set-cookie*/}

The response was not cached because it contained a `set-cookie` header. To cache the response, use `removeUpstreamResponseHeader('set-cookie')` to remove the set-cookie header.

### deployment {/*deployment*/}

The response was not cached because it was received during the brief time (less than 1 minute) that a new version of the app was being propagated through the global network of POPs. There is no need to take any action because this status goes away as soon as the new version is completely propagated.

### debug {/*debug*/}

The response was not cached because the request was issued with `{{ HEADER_PREFIX }}-debug` header set to `1`. In debug mode, {{ PRODUCT_NAME }} will respond with more data that is useful for troubleshooting. However, the increased header footprint may lead to header overflow and other failures, so this should be used only during actual troubleshooting.

### pass {/*pass*/}

The response was not cached due to unknown reasons. If you happen to receive this status then please contact [support]({{ APP_URL }}/help).

If the "pass" is intermittent on an otherwise cacheable resource, you may want to explore if "hit-for-pass" may have been triggered.

"Hit-for-pass" can happen when system remembers for a brief time that a typically cacheable resource was not cacheable as anticipated (such as a `Set-Cookie` header, or an HTTP error response code). The system will cache, typically for a couple of minutes that the resource was not cacheable, and will not coalesce requests.

Hit-for-pass disables the usual request coalescing behavior temporarily, when the resource is known not to be cacheable, clients can avoid being put in a waiting queue. Usually request coalescing (see [L2 Shield Cache](/guides/overview#l2-shield-cache)) speeds up client requests by enqueueing all but the first request, anticipating that the first request will populate the cache and allow instant delivery of the already-cached object to the waiting clients.

Disabling this, such as when the upstream resource is serving errors can help alleviate pressure at all stages of the request lifecycle.

## Caching During Development {/*caching-during-development*/}

By default, caching is turned off during development. This is done to ensure that developers don't see stale responses after making changes to their code or other upstream APIs. You can enable caching during development by running your app with:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

The cache will automatically be cleared when you make changes to your router. A few aspects of caching are not yet supported during local development:

- `edge.staleWhileRevalidateSeconds` is not yet implemented. Only `edge.maxAgeSeconds` is used to set the cache time to live.
- `edge.key` is not supported. Cache keys are always based solely on url, method, the `accept-encoding` and `host` headers, and body.

## Ensuring Versioned Browser Assets are Permanently Available {/*ensuring-versioned-browser-assets-are-permanently-available*/}

In order to ensure that users who are actively browsing your site do not experience issues during a deployment, developers can
configure certain client-side assets to be permanently available, even after a new version of the site has been deployed. For example,
browsers using an old version of the site may continue to request JavaScript chunks for the old version of the site for some time after a new
version is deployed. {{ PRODUCT_NAME }} automatically makes client-side scripts permanently available if you use Next.js, Nuxt.js, Angular, or Sapper.

If you are using another framework or would like to make sure a particular asset is permanently available, you can do so by setting the `permanent` option in `serveStatic`. For example:

```js
router.get('/scripts/:file', ({ serveStatic }) => {
  serveStatic('path/to/scripts', {
    permanent: true, // ensure that files are permanently accessible, even after a new version of the site has been deployed.
    exclude: ['some-non-versioned-file.js'], // you can exclude specific files from being served permanently.  You should do this for any files that do not have a hash of the content in the name.
  })
})
```

You should only make assets permanently available if they have a hash of the content or a version number in the filename, or are accessed via a globally unique URL. For example:

- /assets/main-989b11c4c35bc9b6e505.js
- /assets/v99/main.js

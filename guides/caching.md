# Caching

This guide introduces the caching capabilities of the Moovweb XDN

## Environments and Caching

To cache responses at edge you need to create an [environment](environments). Each environment provides a separate edge cache. Older deployments that are no longer the latest for an environment will not have edge caching.

## L1 and L2 Caches

Each edge point-of-presence (POP) has its own L1 cache. If a request cannot be fulfilled from the L1 cache, the XDN will attempt to fulfill the request from a single global L2 cache POP in order to maximize your effective cache hit ratio. There is very little difference in time to first byte for responses served from the L1 vs L2 cache. In either case the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the L2 cache. This means that only one request at a time for each cachable URL will reach your origin servers.

## Caching a Response

To cache a response, use the `cache` function passed in your route's callback:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path' ({ cache }) => {
  cache({
    browser: {
      // Sets the cache-control: maxage=n header sent to the browser.  To prevent the browser from caching this route
      // set maxAgeSeconds: 0
      maxAgeSeconds: 0,

      // Sends a non-standard header `x-sw-cache-control: n` that you can use to control caching your service worker.
      // Note that service workers do not understand this header by default so would you need to add code to your service
      // worker to support it
      serviceWorkerSeconds: 60 * 60
    },
    edge: {
      // Sets the TTL for a response in the XDN's edge cache
      maxAgeSeconds: 60 * 60 * 24

      // Sets the amount of time a stale response will be served from the cache.  When a stale response is sent, the XDN
      // will simultaneously fetch a new response to serve subsequent requests.
      // Using stale-while-revalidate helps raise your effective cache hit rate to near 100%.
      staleWhileRevalidateSeconds: 60 * 60, // serve stale responses for up to 1 hour while fetching a new response

      // Optionally customizes the cache key.
      cacheKey: new CustomCacheKey()
        .addBrowser() // Split cache by browser type
        .addCookie('some-cookie') // Split cache by some-cookie cookie
        // And many other options
    }
  })
})
```

The `cache` function can be used in the same route as other functions such as `serveStatic`, `proxy` and `render`, or in a separate route prior to sending the response.

### Cache Key

Moovweb XDN provides you with a default cache key out of the box. It is a broad cache key that ensures general correctness but that can be further customized by you. The default cache key consists of:

* Value of request `host` request header
* Complete request URL, including the query params (this can be customized)
* Value of `accept-encoding` request header
* Name of the destination when [split testing](./split_testing) is in effect

#### Customizing Cache Key

It is often useful to customize the cache key, either to improve the cache hit ratio or to account for complexities of your site. As seen above, the XDN provides an easy way to customize the keys by using the `CustomCacheKey` class. Here we will focus on two common examples:

* Increasing the cache hit ratio by excluding query parameters that are not used in the rendering of the content:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path' ({ cache }) => {
  cache({
    // Other options...
    edge: {
      // Other options...
      cacheKey: new CustomCacheKey()
        .excludeQueryParameters('to-be-excluded-1', 'to-be-excluded-2')
    }
  })
})
```

This will remove the given query parameters from the URL before it is used in cache. On cache miss the transformed URL will be passed to your code with the original query strings available to your code in `x-xdn-original-qs` request header.

* Including other request parameters like cookies:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path' ({ cache }) => {
  cache({
    // Other options...
    edge: {
      // Other options...
      cacheKey: new CustomCacheKey()
        .addCookie('language')
        .addCookie('currency')
    }
  })
})
```

This will take the values of `language` and `currency` cookies from `cookie` request header and use them in the cache key. This would allow you to cache different content, depending on the language and currency in this example, for the same URL.

Customizing caching keys is a very powerful tool to make your site faster. But at the same time it is easy to apply it too broadly leading to loss of performance due to lower cache hit ratio. The key to correctly using customization is to apply it judiciously and narrowly, for specific routes.

### Caching Responses for POST and similar requests

By default, Moovweb XDN only caches responses for `GET` and `HEAD` requests. It rarely makes sense to cache  `POST`, `PUT`, `PATCH`, or `DELETE` requests. These methods, from the point of view of HTTP semantics, are supposed to change the state of the underlying entities. Some query languages, however, like GraphQL, are implemented exclusively through `POST` requests with queries being sent through request body. When such solutions are used it is often desirable to be able to cache responses to some of these requests (namely those do not mutate any state).

To cache a response to a `POST`, a separate route must be created which, together with `cache` function, will enable this behavior:

```js
router.post('/api' ({ cache }) => {
  cache({
    // Caching options...
  })
})
```

This will automatically add request method and body to the caching key. There are two limitations to this:

1. If the request body is longer than 8,000 bytes, the caching will automatically be turned off.
2. Since both mutating and non-mutating requests are executed on the same route, there is no way for XDN to distinguish between such operations and the responsibility for never caching the mutating requests lies with you as the developer. The way to avoid caching responses to mutating requests is to inject `private` into `cache-control` of your response (e.g. `res.setHeader('cache-control', 'private')`)

### Caching Private Responses

By default Moovweb XDN never caches responses which have `private` clause in their `cache-control` header. Sometimes though it is desireable to cache such responses, intended for a single user of your site:

```js
router.get('/some/path' ({ cache }) => {
  cache({
    // Other options...
    edge: {
      // Other options...
      forcePrivateCaching: true // Force caching of `private` responses
    }
  })
})
```

Note that this feature cannot be safely used with caching of `POST` and similar requests: if the way to signal that something must not be cached is through `private` but then you force caching of `private` responses, all responses will be cached.

## Clearing the Cache

The cache is automatically cleared when you deploy to an environment. You can also clear the cache using the environment's Caching tab in the Moovweb XDN console.

![deployments](/images/caching/purge.png)

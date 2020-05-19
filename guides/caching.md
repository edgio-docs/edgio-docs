# Caching

This guide introduces the caching capabilities of the Moovweb XDN

## Environments and Caching

To cache responses at edge you need to create an [environment](environments). Each environment provides a separate edge cache. Older deployments that are no longer the latest for an environment will not have edge caching.

## L1 and L2 Caches

Each edge point-of-present has it's own L1 cache. If a request cannot be fulfilled from the L1 cache, the XDN will attempt to fulfill the request from a single L2 cache node in order to maximize your effective cache hit ratio. There is very little difference in time to first byte for responses served from the L1 vs L2 cache. In either case the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the L2 cache. This means that only one
request at a time for each cachable URL will reach your origin servers.

## Caching a Response

To cache a response, use the `cache` function passed in your route's callback:

```js
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
      staleWhileRevalidateSeconds: 60 * 60 // serve stale responses for up to 1 hour while fetching a new response
    }
  })
})
```

The `cache` function can be used in the same route as other functions such as `serveStatic`, `proxy` and `render`, or in a separate route prior to sending the response.

## Clearing the Cache

The cache is automatically cleared when you deploy to an environment. You can also clear the cache using the environment's Caching tab in the Moovweb XDN console.

![deployments](/images/caching/purge.png)

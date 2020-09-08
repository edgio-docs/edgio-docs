# Caching

This guide introduces the caching capabilities of the Moovweb XDN

## Environments and Caching

To cache responses at edge you need to create an [environment](environments). Each environment provides a separate edge cache. Older deployments that are no longer the latest for an environment will not have edge caching.

## L1 and L2 Caches

Each edge point-of-presence (POP) has its own L1 cache. If a request cannot be fulfilled from the L1 cache, the XDN will attempt to fulfill the request from a single global L2 cache POP in order to maximize your effective cache hit ratio. There is very little difference in time to first byte for responses served from the L1 vs L2 cache. In either case the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the L2 cache. This means that only one request at a time for each cacheable URL will reach your origin servers.

## Caching a Response

To cache a response, use the [cache](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#cache) function in your route's callback:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    browser: {
      // Sets the cache-control: maxage=n header sent to the browser.  To prevent the browser from caching this route
      // set maxAgeSeconds: 0
      maxAgeSeconds: 0,

      // Sends a non-standard header `x-sw-cache-control: n` that you can use to control caching your service worker.
      // Note that service workers do not understand this header by default so would you need to add code to your service
      // worker to support it
      serviceWorkerSeconds: 60 * 60,
    },
    edge: {
      // Sets the TTL for a response in the XDN's edge cache
      maxAgeSeconds: 60 * 60 * 24,

      // Sets the amount of time a stale response will be served from the cache.  When a stale response is sent, the XDN
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

### Cache Key

Moovweb XDN provides you with a default cache key out of the box. It is a broad cache key that ensures general correctness but that can be further customized by you. The default cache key consists of:

- Value of request `host` request header
- Complete request URL, including the query params (this can be customized)
- Value of `accept-encoding` request header
- Name of the destination when [split testing](./split_testing) is in effect

When [POST and other non-GET/HEAD](#section_caching_responses_for_post_and_other_non_get_head_requests) methods caching is enabled XDN automatically adds the following to the cache key:

- Request HTTP method
- Request body

#### Customizing the Cache Key

It is often useful to customize the cache key, either to improve the cache hit ratio or to account for complexities of your site. As seen above, the XDN provides an easy way to customize the keys by using the `CustomCacheKey` class. Here we will focus on two common examples:

- Increasing the cache hit ratio by excluding query parameters that are not used in the rendering of the content:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    // Other options...
    key: new CustomCacheKey().excludeQueryParameters('to-be-excluded-1', 'to-be-excluded-2'),
  })
})
```

This will remove the given query parameters from the URL before it is used in cache. On cache miss the transformed URL will be passed to your code with the original query strings available to your code in `x-xdn-original-qs` request header.

- Including other request parameters like cookies:

```js
import { CustomCacheKey } from '@xdn/core/router'

router.get('/some/path', ({ cache }) => {
  cache({
    key: new CustomCacheKey().addCookie('language').addCookie('currency'),
    // Other options...
  })
})
```

This will take the values of `language` and `currency` cookies from `cookie` request header and use them in the cache key. This would allow you to cache different content, depending on the language and currency in this example, for the same URL.

Customizing caching keys is a very powerful tool to make your site faster. But at the same time it is easy to apply it too broadly leading to loss of performance due to lower cache hit ratio. The key to correctly using customization is to apply it judiciously and narrowly, for specific routes.

### Caching Responses for POST and other non-GET/HEAD requests

By default, Moovweb XDN only caches responses for `GET` and `HEAD` requests. It rarely makes sense to cache `POST`, `PUT`, `PATCH`, or `DELETE` requests. These methods, from the point of view of HTTP semantics, are supposed to change the state of the underlying entities. However, some APIs, like GraphQL APIs, are implemented exclusively through `POST` requests with queries being sent through request body. When such solutions are used it is often desirable to be able to cache responses to some of these requests (namely those do not mutate any state).

To cache a response to a `POST`, a separate route must be created which, together with `cache` function, will enable this behavior:

```js
router.post('/api', ({ cache }) => {
  cache({
    // Caching options...
  })
})
```

This will automatically add request method and body to the caching key.

#### Limitations

There are a number of limitations in caching of `POST` and similar requests:

1. If the request body is longer than 8,000 bytes, the caching will automatically be turned off.
2. Since both mutating and non-mutating requests are executed on the same route, there is no way for XDN to distinguish between such operations and the responsibility for never caching the mutating requests lies with you as the developer. The way to avoid caching responses to mutating requests is to inject `private` into `cache-control` of your response (e.g. `res.setHeader('cache-control', 'private')`)
3. Multiple requests are often need to "warm" the cache for non-`GET` requests.

### Caching Private Responses

By default Moovweb XDN never caches responses which have `private` clause in their `cache-control` header. Sometimes though it is desirable to cache such responses, intended for a single user of your site:

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

Note that this feature cannot be safely used with caching of `POST` and similar requests: if the way to signal that something must not be cached is through `private` but then you force caching of `private` responses, all responses will be cached.

## Preventing a response from being cached

By default, the XDN will cache responses that satisfy all of the following conditions:

1. The response must correspond to a `GET` or `HEAD` request. To override this see [POST and other non-GET/HEAD](#section_caching_responses_for_post_and_other_non_get_head_requests) section.
2. The response status must be 1xx, 2xx or 3xx. You cannot override this.
3. The response must not not have any `set-cookie` headers. You cannot override this but you can use `removeUpstreamResponseHeader('set-cookie')` to remove set-cookie headers.
4. The response must have a valid cached-control`header that includes a positive`max-age`or`s-maxage`and does not include a`private` clause. You can override this by using [router caching](#section_caching_a_response) and [forcing private responses](#section_caching_private_responses)

Sometimes, however, you don't want to cache anything, even if the upstream backend returns a `max-age`. Other times you might want to [improve the performance](/guides/performance#section_turn_off_caching_when_not_needed) of pages that can never be cached at edge. In those cases you can turn off caching:

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

## How do I know if a response was served from the cache?

To know if a response is being cached, examine the `x-xdn-t` response header. There are two components that indicate caching status:

- `oc` - The outer (level 1) cache
- `sc` - The shield (level 2) cache

You will see one of the following values for these components:

- `pass` - The response was not cached (aka a cache "miss")
- `cached` - The response was added to the cache, but was not served from the cache (aka a cache "miss" that may be a "hit" for the next request)
- `hit` - The response was served from the cache.

## Why is my response not being cached?

To understand why a response was not cached, examine the `x-xdn-caching-status` response header. It will have one of the following values:

### ok

The response was cached or served from the cache (see `x-xdn-t`).

### disabled

The response was not cached because the edge caching was explicitly [disabled](#section_not_caching_a_response).

### no-max-age

The response was not cached because no `cache-control` response header with a non-zero `max-age` or `s-maxage` value was found. To cache the response, call `cache` in your route handler with `edge.maxAgeSeconds` set. For example:

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

### code

The response was not cached because the response had a status code >= 400.

### private

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

### method

The response was not cached because the request method was something other than `HEAD` or `GET`, and the route that set the caching behavior used `match`. To cache the `POST` responses, for example, use `router.post()` instead of `router.match()`.

### body-too-big

The response was not cached because the request body was more than 8000 bytes.

### set-cookie

The response was not cached because it contained a `set-cookie` header. To cache the response, use `removeUpstreamResponseHeader('set-cookie')` to remove the set-cookie header.

### deployment

The response was not cached because it was received during the brief time (less than 1 minute) that a new version of the app was being propagated through the global network of POPs. There is no need to take any action because as soon as the new version is completely propagated this status goes away.

## Caching During Development

By default, caching is turned off during development. This is done to ensure that developers don't see stale responses after making changes to their code or other upstream APIs. You can enable caching during development by running your app with:

```bash
xdn run --cache
```

The cache will automatically be cleared when you make changes to your router. A few aspects of caching are not yet supported during local development:

- `edge.staleWhileRevalidateSeconds` is not yet implemented. Only `edge.maxAgeSeconds` is used to set the cache time to live.
- `edge.key` is not supported. Cache keys are always based soley on url, method, `accept-encoding` and `host` headers, and body.

## Clearing the Cache

The cache is automatically cleared when you deploy to an environment. You can also clear the cache using the environment's Caching tab in the Moovweb XDN console.

![deployments](/images/caching/purge.png)

# Scheduled Cache Clearing using Github Actions

This guide walks you through clearing the cache on your site at a scheduled day and time.

## NPM script

Here is an example script you can add to your `package.json` to handle cache clearing for each environment. You can also configure scripts to clear by surrogate key, path, or group (As defined in the XDN Console)

These scripts assume that you have created environments called "production", "staging", and "development and you have created a deploy key for your site and added it as a secret in your repo called "xdn_deploy_token".

```js
  "scripts": {
    ...
    "clearcache:dev": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=development --token=$xdn_deploy_token",
    "clearcache:stage": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=staging --token=$xdn_deploy_token",
    "clearcache:prod": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=production --token=$xdn_deploy_token",
    "clearcache:prod:pdps": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=production --surrogate-key=pdp --token=$xdn_deploy_token",
    "clearcache:prod:plps": "xdn cache-clear --team=myTeam --site=myXDNApp --environment=production --surrogate-key=plp --token=$xdn_deploy_token",
    ...
  },
```

## GitHub Actions

Here is an example GitHub action that clears the cache at a scheduled time using the jobs defined in your `package.json`

```yml
# Add this file to your project at .github/workflows/clear-cache.yml
#
# This GitHub action clears the sites PRODUCTION cache at 09:15AM UTC every day.
#
# The schedule syntax is standard cron syntax
# minute  hour  day-of-month  month day-of-week
#   *      *         *          *        *
#
# 1.) This example depends on a script being defined in your package.json called clearcache:prod
#
# In order for this action to clear your cache, you must create a deploy token from the site settings page
# in Moovweb.app and configure it as a secret called "xdn_deploy_token" in your repo on GitHub.

name: Clear PRODUCTION cache at 5am
on:
  schedule:
    - cron: '15 9 * * *'
jobs:
  clear-the-cache:
    runs-on: ubuntu-latest
    steps:
      - name: Extract branch name
        shell: bash
        run: echo "::set-env name=BRANCH_NAME::$(echo ${GITHUB_REF#refs/heads/} | sed 's/\//_/g')"
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://npm-proxy.fury.io/moovweb/
      - name: Cache node modules
        uses: actions/cache@v1
        env:
          cache-name: cache-node-modules
        with:
          path: ~/.npm # npm cache files are stored in `~/.npm` on Linux/macOS
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
      - run: npm ci
      - name: Clear cache in production
        run: npm run clearcache:prod
        env:
          xdn_deploy_token: ${{secrets.xdn_deploy_token}}
```

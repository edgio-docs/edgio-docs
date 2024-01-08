---
title: Edge Function Caching
---

Caching fetch requests within your edge function can reduce the load on your origins and deliver content faster to your users. It may also mitigate timeout issues due to an edge function exceeding the [walltime limit](/guides/edge_functions#limitations).

In this section, we'll cover how to use the caching properties as part of the `fetch()` method. These properties are specified per fetch request and are completely separate from the caching properties specified in {{ROUTES_FILE}}. This guide also covers the default caching behavior of fetch requests and how origin cache directives affect caching.

## Order of Operations {/* order-of-operations */}

When a fetch request is made, the CDN will first check the cache for a cached response. If a cached response is found, it will be served from the cache. Otherwise, the request will be sent to the origin and the response will be cached based on one of the following scenarios:

- The [custom caching properties](#custom-caching-properties) specified in the `edgio` object.
- The `Cache-Control` header of the origin response.
- The cache TTL of 5 minutes if the fetch request meets the criteria for the [default cache behavior](#cache-behavior-of-fetch-requests).

![Edge Function Caching](/images/v7/edge-functions-fetch-request-caching.png)

If the fetch request is instructed to bypass the cache, the request will be sent directly to the origin and the response will not be cached.

![Edge Function Cache Bypass](/images/v7/edge-functions-fetch-request-bypass-caching.png)

### Caching Scenarios {/* caching-scenarios */}

#### Default 5 Minute Caching {/* default-5-minute-caching */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request) {
  // - assume no `cache-control` directives from the origin
  // - response is stored in cache for 5 minutes
  // - subsequent fetch requests to this same path will be served from cache for 5 minutes
  const response = await fetch('https://example.com/foo/bar', {
    edgio: {
      origin: 'web'
    }
  });

  return response;
}
```

#### Origin Cache-Control Header {/* origin-cache-control-header */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request) {
  // - assume `cache-control` directives from the origin are valid and respected
  // - response is stored in cache based on the origin `cache-control` directives
  // - subsequent fetch requests to this same path will be served from cache for the defined TTL
  const response = await fetch('https://example.com/foo/bar', {
    edgio: {
      origin: 'web'
    }
  });

  return response;
}
```

#### Custom Caching Properties {/* custom-caching-properties */}

```js filename="edge-functions/main.js"
export async function handleHttpRequest(request) {
  // - origin `cache-control` directives are ignored
  // - response is stored in cache for 10 minutes
  // - subsequent fetch requests to this same path will be served from cache for 10 minutes
  const response = await fetch('https://example.com/foo/bar', {
    edgio: {
      origin: 'web',
      caching: {
        max_age: 600
      }
    }
  });

  return response;
}
```

## Caching fetch() Requests {/* caching-fetch-requests */}

The following sample code shows how to define a custom caching policy for a fetch request. The caching properties are specified in the `edgio` object, which is passed as the second argument to the `fetch()` method.

```js
const resp = await fetch('https://your-server.com/some-path', {
  edgio: {
    origin: 'web',
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1h',
      tags: 'apple banana',
      bypass_cache: false,
    },
  },
});
```

### Caching Properties {/* caching-properties */}

- `max_age`: Specifies the maximum amount of time that a fetched response is considered fresh. This value is set as a duration string, which is a number followed by a time unit character. Supported time unit characters are `d` for days, `h` for hours, `m` for minutes, and `s` for seconds. For example, `"1h"` represents 1 hour. This setting overrides the `max-age` directive in the `Cache-Control` header of the origin response if present.
- `stale_while_revalidate`: Specifies the amount of time a stale response is served while a revalidation request is made in the background. This value is also set as a duration string similar to `max_age`. This setting overrides the `stale-while-revalidate` directive in the `Cache-Control` header of the origin response if present.
- `tags`: Allows you to specify a space-separated list of tags for the cached object, which can later be used for cache purging as [surrogate keys](/guides/performance/caching/purging#surrogate-key). Each tag should be a string without spaces.
- `bypass_cache`: A boolean value that, when set to `true`, bypasses the cache for the fetch request, ensuring the request is sent directly to the origin and the response is not stored in the cache.

These caching properties provide you with granular control over how your fetch requests are cached and served, allowing you to optimize the performance of your edge function.

### Cache Behavior of fetch() Requests {/* cache-behavior-of-fetch-requests */}

Edge function fetch requests are cached at the edge for 5 minutes under the following conditions:

- The response from the origin does not include a `Cache-Control` header.
- The response is deemed cacheable based on our [default caching policy](/guides/performance/caching#default-caching-policy).

This means that if you make a fetch request to the same URL within 5 minutes, the response will be served from the cache instead of going to the origin. This behavior can be overridden by specifying the `bypass_cache` option described above. Cache directives from the origin response will also be respected as follows:

- If the origin responds with a `Cache-Control` HTTP header containing valid directives, these directives will be respected. For example:
  - With `Cache-Control: max-age=60, s-maxage=900`, the fetch request will be cached for 15 minutes, considering `s-maxage=900`.
  - With `Cache-Control: max-age=600`, the response will be cached for 10 minutes, considering `max-age=600`.
  - With `Cache-Control: no-store, no-cache`, the response will not be cached.
- If the `Cache-Control` header is not present for a cache-eligible response, the CDN will check for the `Expires` header.
- If the response is cached based on the above logic, subsequent fetch requests will be served from cache until the cached response has expired or been purged. At which point, the fetch request will go to the origin.

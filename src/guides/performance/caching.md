---
title: Caching
---

This guide introduces the caching capabilities of {{ PRODUCT_NAME }}. While most CDNs only cache content on your asset URLs, {{ PRODUCT_NAME }} caches content on your page URLs using {{ EDGEJS_LABEL }}, allowing you to control caching within your application code.

## Environments and Caching {/*environments-and-caching*/}

Each environment provides a separate edge cache for the most recent deployment. Although older deployments do not support edge caching, you may re-enable it by [rolling back to that version](/guides/basics/deployments#versioning).

## Edge and Shield Caching {/*edge-and-shield-caching*/}

{{ PRODUCT }} may cache your content on our:

-   **Edge Points-of-Presence (POP):** An edge POP handles receives and responds to requests for your content. 
-   **Shield POP:** A shield POP reduces your network bandwidth and the load on your origin server by providing an intermediate caching layer between the edge of our network (aka edge POPs) and your web servers. This means that if a request cannot be served from cache by an edge POP, then it will be forwarded to a shield POP. Funneling requests to a shield POP maximizes your cache hit ratio. 

There is very little difference in time to first byte (TTFB) for responses served from an edge or shield POP. In either case, the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the shield POP. If you have configured your origin to only use a shield POP, then it will only submit a single request at a time to your origin servers for each cacheable URL.

[Learn more about Origin Shield.](/guides/security/origin_shield)

## Caching a Response {/*caching-a-response*/}

Define a caching policy through response headers, rules, or the cache function (CDN-as-code).

### Response Headers {/*response-headers*/}

The amount of time that an asset will be cached on our edge servers is determined by the response headers returned by the origin server when a client requests it. By default, our CDN honors the following response headers:
-   **Cache-Control: private:** Prevents our edge servers from caching the response.
-   **Cache-Control: no-store:** Prevents our edge servers from caching the response.
-   **Cache-Control: no-cache:** Prevents our edge servers or the client from caching the response.
-   **Pragma: no-cache:** Prevents our edge servers or the client from caching the response.
-   **Cache-Control: s-maxage:** Determines the requested content's TTL on our edge servers The length of time that the requested content will be cached on our network.

    <Callout type="info">

      This response header is ignored if the response contains any of the above response headers.

    </Callout>

-   **Cache-Control: max-age:** Determines the requested content's TTL on the user agent and our edge servers.

    <Callout type="info">

      This response header is ignored if the response contains any of the above response headers.

    </Callout>

-   **Expires:** Defines an expiration date for the requested content's TTL. The requested content will be considered stale after the specified date/time.

    <Callout type="info">

      If this directive has been assigned an invalid value, including zero, then it will be ignored for the request in question.

    </Callout> 

    <Callout type="info">

      This response header is ignored if the response contains any of the above response headers.

    </Callout>

**Key information:**

-   By default, content will only be cached after a POP receives two `GET` requests that result in a 200 OK response.
-   By default, {{ PRODUCT }} honors an origin server's cache directives. Allow {{ PRODUCT }} to override those directives by creating a rule with the [Ignore Origin No Cache](/guides/performance/rules/features#ignore-origin-no-cache) feature enabled for the desired status code (e.g., `200 OK`).
-   The above directives are ordered according to precedence. Higher directives take precedence over lower directives. In other words, if an asset contains both a `Cache-Control` and an `Expires` header, then the `Cache-Control` header will take precedence.
-   Please refer to your web server’s documentation for more information on how to configure these settings.
-   You may create a rule to override a web server's cache policy.

### Rules {/*rules*/}

Set or override a cache policy through rules. The most commonly used features for defining a caching policy are: 

    -   [Bypass Cache](/guides/performance/rules/features#bypass-cache)
    -   [Cache-Control Header Treatment](/guides/performance/rules/features#cache-control-header-treatment)
    -   [Set Client Max-Age](/guides/performance/rules/features#set-client-max-age)

[View all caching-related features.](/guides/performance/rules/features#caching)

### CDN-as-Code {/*cdn-as-code*/}

Use the [caching](/guides/performance/rules/features#caching) feature in your route configuration:

    ```js
    router.get('/some/path', {
      "caching": {
        "max_age": "86400s",
        "stale_while_revalidate": "3600s",
        "service_worker_max_age": "3600s",
        "bypass_client_cache": true
      },
      "headers": {
        "set_response_headers": {
          "x-sw-cache-control": "max-age=3600"
        }
      }
    })
    ```

### Cache Key {/*cache-key*/}

{{ PRODUCT_NAME }} provides you with a default cache key out of the box. By default, a request’s cache-key is determined by the request URI’s relative path. For example, a request to `https://example.com/some/path` will have a cache key of `/some/path`. This is sufficient for most sites, but there are some cases where you may want to customize the cache key. For example, if your site has a query parameter that affects the content of the response, you may want to include that query parameter in the cache key.

To ensure that your site is resilient to [cache poisoning attacks](/guides/security/security_suite#cache-poisoning), every request header that influences the rendering of the content must be included in your custom cache key.

#### Customizing the Cache Key {/*customizing-the-cache-key*/}

It is often useful to customize the cache key, either to improve the cache hit ratio or to account for complexities of your site. As seen above, {{ PRODUCT_NAME }} provides an easy way to customize the keys by using the `cache` feature. Here we will focus on three common examples:

- Increasing the cache hit ratio by excluding all query parameters except those provided from the cache key. This lets only those specified parameters to fragment the cache (so you would add things like page, number per page, filters, variants of a product etc.)

```js
router.get('/some/path', {
  "cache": {
    // Other options...
    "cache_key_query_string": {
      "include_all_except": [
        "allow-param-1",
        "allow-param-2"
      ]
    }
  }
})
```

- Including other request parameters using `cache_key_rewrite` like `language` and `currency` cookies:

```js
router.get('/some/path', {
  "cache": {
    // Other options...
    "cache_key_rewrite": {
      "source": "^/some/path/(.*)$",
      "destination": "^/some/path/(.*)-%{cookie_language}-%{cookie_currency}$"
    }
  }
})
```

This will take the values of `language` and `currency` cookies from the `cookie` request header and use them in the cache key. This would allow you to cache different content for the same URL by creating different caches dependent on the `language` and `currency` values.

- Splitting the cache based on geo location:

```js
router.get('/some/path', {
  "cache": {
    // Other options...
    "cache_key_rewrite": {
      "source": "^/some/path/(.*)$",
      "destination": "/some/path/$1-%{geo_country}"
    }
  }
})
```

This will take the value of the `%{geo_country}` feature variable and split based on the country code. This would allow you to cache different content for the same URL by creating different caches dependent on the `geo_country` value. See [Feature Variables](/guides/performance/rules/features#feature-variables) for additional reference values you may use to customize your cache key.

Customizing caching keys is a very powerful tool to make your site faster. At the same time, it is easy to apply it too broadly causing a loss of performance due to lower cache hit ratio. The key to correctly using cache customization is to apply it judiciously and narrowly for specific routes.

### Caching Responses for POST and other non-GET/HEAD Requests {/*caching-responses-for-post-and-other-non-gethead-requests*/}

{{ PRODUCT_NAME }} only supports caching responses for `GET` and `HEAD` requests. Some APIs, particularly those implemented with GraphQL, use `POST` requests by default, with queries being sent through the request body.

### Caching Private Responses {/*caching-private-responses*/}

By default, {{ PRODUCT_NAME }} never caches responses which have the `private` clause in their `cache-control` header. Sometimes though, it's desirable to cache such responses, intended for a single user of your site:

```js
router.get('/some/path', {
  "caching": {
    "ignore_origin_no_cache": true
  },
})
```

Note that this feature cannot be safely used with caching of `POST` and similar requests. If your signal that something must not be cached is through `private` but then you force caching of `private` responses, **all responses will be cached**.

## Achieving 100% Cache Hit Rates {/*achieving-100-cache-hit-rates*/}

The key to really successful cache hit rates is leveraging `stale_while_revalidate` in conjunction with `max_age`. There is a very detailed [article](https://web.dev/stale-while-revalidate/) available from web.dev that covers this concept in more detail. The main points to know is this:

- `max_age` defines the hard cache limit. An asset will be cached this amount of time regardless.
- `stale_while_revalidate` defines an additional cache buffer limit past `max_age` where cache content will still be returned to a client, but a network request will be issued to origin to check for new content.
- If `max_age` + `stale_while_revalidate` value is exceeded, then a network request to origin is made no matter what.

The following examples shows how to use `stale_while_revalidate` in conjunction with `max_age` to achieve 100% cache hit rates.

```js
router.get('/some/path', {
  caching: {
    max_age: "1d",
    stale_while_revalidate: "1h"
  },
  // Other options...
})
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
3. The response must not not have any `set-cookie` headers. You cannot override this, but you can [alter the response](/guides/performance/cdn_as_code/common_routing_patterns#altering-the-response) to remove `set-cookie` headers.
4. The response must have a valid `cache-control` header that includes a positive `max-age` or `s-maxage` and does not include a `private` clause. You can override this by using [router caching](#caching-a-response) and [forcing private responses](#caching-private-responses).

However, sometimes you may not want to cache anything, even if the upstream backend returns a `max-age`. Other times, you might want to [improve the performance](/guides/performance#turn-off-caching-when-not-needed) of pages that can never be cached at edge. In those cases, you can turn off caching:

```js
router.get('/some/uncachable/path', {
  "caching": {
    "bypass_cache": true
  },
  // The route will need to send a response to prevent the request from continuing on to subsequent routes.
  // This example sends the request through to a backend defined as "origin" which will complete the request cycle
  "origin": { 
    "set_origin": "origin"
  },
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

The response was not cached because there was no `cache-control` response header with a non-zero `max-age` or `s-maxage` value. To cache the response, set `max_age` under your `caching` rule. For example:

```js
router.get('/some/path', {
  "caching": {
    "max_age": "1d"
  },
})
```

You can also cache the response by adding a `cache-control` header with non-zero `max-age` or `s-maxage` value to the upstream response.

### code {/*code*/}

The response was not cached because the response had a status code >= 400.

### private {/*private*/}

The response was not cached because it contained a `cache-control` header with `private`. To cache the response, use:

```js
router.get('/some/path', {
  "caching": {
    "ignore_origin_no_cache": true
  },
})
```

You can also remove the `private` value from the upstream response's `cache-control` header. See [Altering the Response](/guides/performance/cdn_as_code/common_routing_patterns#altering-the-response) for more information.

### method {/*method*/}

The response was not cached because the request method was something other than `HEAD` or `GET`, and the route that set the caching behavior used `match`. To cache the `POST` responses, for example, use `router.post()` instead of `router.match()`.

### body-too-big {/*body-too-big*/}

The response was not cached because the request body was more than 8000 bytes.

### set-cookie {/*set-cookie*/}

The response was not cached because it contained a `set-cookie` header. To cache the response, use `headers` feature to remove the `set-cookie` header:

```js
router.get('/some/path', {
  "headers": {
    // remove `header-name` from the origin response
    remove_origin_response_headers: [
      "header-name"
    ],
    
    // remove `header-name` from the response by name
    remove_response_headers: [
      "header-name"
    ]
  },
})
```

See [Altering the Response](/guides/performance/cdn_as_code/common_routing_patterns#altering-the-response) for more information.

### deployment {/*deployment*/}

The response was not cached because it was received during the brief time (less than 1 minute) that a new version of the app was being propagated through the global network of POPs. There is no need to take any action because this status goes away as soon as the new version is completely propagated.

### debug {/*debug*/}

The response was not cached because the request was issued with `{{ HEADER_PREFIX }}-debug` header set to `1`. In debug mode, {{ PRODUCT_NAME }} will respond with more data that is useful for troubleshooting. However, the increased header footprint may lead to header overflow and other failures, so this should be used only during actual troubleshooting.

### pass {/*pass*/}

The response was not cached due to unknown reasons. If you happen to receive this status then please contact [support]({{ SUPPORT_URL }}).

If the "pass" is intermittent on an otherwise cacheable resource, you may want to explore if "hit-for-pass" may have been triggered.

"Hit-for-pass" can happen when system remembers for a brief time that a typically cacheable resource was not cacheable as anticipated (such as a `Set-Cookie` header, or an HTTP error response code). The system will cache, typically for a couple of minutes that the resource was not cacheable, and will not coalesce requests.

Hit-for-pass disables the usual request coalescing behavior temporarily, when the resource is known not to be cacheable, clients can avoid being put in a waiting queue. Usually request coalescing (see [L2 Shield Cache](/guides/overview#l2-shield-cache)) speeds up client requests by enqueueing all but the first request, anticipating that the first request will populate the cache and allow instant delivery of the already-cached object to the waiting clients.

Disabling this, such as when the upstream resource is serving errors can help alleviate pressure at all stages of the request lifecycle.

## Caching During Development {/*caching-during-development*/}

By default, caching is turned off during development. This is done to ensure that developers don't see stale responses after making changes to their code or other upstream APIs. You can enable caching during development by running your app with:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

The cache will automatically be cleared when you make changes to your router.

<!-- TODO: determine JSON syntax for serving static permenent assets
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
- /assets/v99/main.js -->

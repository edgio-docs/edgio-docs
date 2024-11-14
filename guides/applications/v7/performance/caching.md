---
title: Cache Management
---

Managing your caching policy and cached content is critical for achieving optimal website performance.

**Key concepts and procedures:**

-   [Default caching policy](#default-caching-policy)
-   [Defining a caching policy.](#caching-a-response)
-   [Caching content by query string, request headers, or additional custom criteria](/applications/performance/caching/cache_key#customizing-the-cache-key)
-   [Purging content.](/applications/performance/caching/purging)

## Caching {/*caching*/}
Caching creates a copy of the requested content within our edge and Origin Shield POPs. This improves your site's performance by allowing clients to retrieve your content from the POP closest to them instead of your origin servers.

## Environments and Caching {/* environments-and-caching */}

Each environment has a separate edge cache. The **Deploy Changes** popup's **Purge the cache after deployment** option determines whether this edge cache persists between deployments.

[Learn how to configure this option.](/applications/performance/caching/purging#deployments)

## Edge and Origin Shield Caching {/*edge-and-shield-caching*/}

{{ PRODUCT }} may cache your content on our:

- **Edge Points-of-Presence (POP):** An edge POP handles receives and responds to requests for your content.
- **Origin Shield POP:** An Origin Shield POP improves cache efficiency, reduces the load on your servers, and reduces network bandwidth. If you have assigned at least one Origin Shield POP to your origin configuration, our edge POPs can funnel cache misses through an Origin Shield POP.

There is very little difference in time to first byte (TTFB) for responses served from an edge or Origin Shield POP. In either case, the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the Origin Shield POP. An Origin Shield server only submits a single request at a time to your origin servers for each cacheable URL.

[Learn more about Origin Shield.](/applications/security/origin_shield)

## Default Caching Policy {/*default-caching-policy*/}

{{ PRODUCT }} only caches eligible responses when either of the following conditions are met:
-   An origin server provides cache instructions (aka [cache directives](#cache-directives)).
-   A rule defines a caching policy.

By default, a response is eligible for caching when it satisifes all of the following requirements:

| Requirement        | Description                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP Method        | `GET`                                                                                                                                                                                                                                                                                                                                       |
| HTTP Status Code   | `200 OK`                                                                                                                                                                                                                                                                                                                                    |
| Number of Requests | Varies by content type. <br /><br />A POP considers requests for the following content types eligible for caching after a single request: <ul><li>text/html</li><li>text/css</li><li>text/xml</li><li>application/json</li><li>application/javascript</li><li>application/xml</li></ul> It requires 2 requests for all other content types. |

{{ PRODUCT }} can serve cached content until its time to live (TTL) expires. After which, it will need to revalidate to find out whether the response has changed.

[View the request flow for determining whether to serve a response from cache.](/applications/performance/caching/cache_request_flow)

## Caching a Response {/* caching-a-response */}

Define a caching policy through:
-   **Response headers:** Define cache directives within response headers. Set these response headers through your web server's configuration or by defining a rule with header features (e.g., [Set Response Headers feature](/applications/performance/rules/features#set-response-headers)).
-   **Rules:** Define a [rule with caching features](#rules).

### Cache Directives (Response Headers) {/* cache-directives */}

An origin server or the {{ PRODUCT }} cloud may include headers in the response that contain cache directives. These cache directives may determine how long our servers will cache that response. By default, our servers honor the following response headers:

- **Cache-Control: private:** Prevents our servers from caching the response.
- **Cache-Control: no-store:** Prevents our servers from caching the response.
- **Cache-Control: no-cache:** Requires our servers or the client to revalidate cached content.
- **Pragma: no-cache:** Requires our servers or the client to revalidate cached content.
- **Cache-Control: s-maxage:** Determines the requested content's time-to-live (TTL) on our servers. TTL identifies the amount of time that cached content can be served without revalidation.
- **Cache-Control: max-age:** Determines the requested content's TTL on the user agent and our servers.
- **Expires:** Defines an expiration date for the requested content's TTL. The requested content will be considered stale after the specified date/time.

  <Callout type="info">

  If this directive has been assigned an invalid value, including zero, then it will be ignored for the request in question.

  </Callout>

**Key information:**

-   The above directives are ordered according to precedence. Directives that appear higher in the list take precedence over lower ones. In other words, if an asset contains both a `Cache-Control` and an `Expires` header, then the `Cache-Control` header will take precedence.
-   Refer to your web server’s documentation to learn how to define response headers.
-   You may override a web server's cache policy by creating a rule or route.

### Defining a Caching Policy through Rules {/* rules */}

Set or override a cache policy by creating a rule that identifies the desired set of requests and the caching policy that will be applied to them.

<Callout type="important">

  By default, certain cache directives take precedence over a cache policy defined within a rule. Allow {{ PRODUCT }} to override those directives by also enabling the [Ignore Origin No Cache feature (ignore_origin_no_cache)](/applications/performance/rules/features#ignore-origin-no-cache) for the desired status code (e.g., `200 OK`) within that rule.

</Callout>

Commonly used features for defining a caching policy are listed below.

| Feature                                                                                                      | Usage                                                                                                            |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| [Bypass Cache (bypass_cache)](/applications/performance/rules/features#bypass-cache)                               | Use this feature to disable caching on our network.                                                              |
| [Bypass Client Cache (bypass_client_cache)](/applications/performance/rules/features#bypass-client-cache)          | Use this feature to instruct the client to bypass cache.                                                         |
| [Ignore Origin No Cache (ignore_origin_no_cache)](/applications/performance/rules/features#ignore-origin-no-cache) | Use this feature to allow {{ PRODUCT }} to override `no-cache` directives.                                       |
| [Set Client Max-Age (client_max_age)](/applications/performance/rules/features#set-client-max-age)                 | Use this feature to define how long a client must wait before revalidating cached content with our servers.      |
| [Set Max-Age (max_age)](/applications/performance/rules/features#set-max-age)                                      | Use this feature to define how long an edge server must wait before revalidating cached content with the origin. |

[View all caching-related features.](/applications/performance/rules/features#caching)

#### Defining a Caching Policy through CDN-as-Code {/* cdn-as-code */}

Add the [caching](/docs/v7.x/api/core/interfaces/types.Caching.html) feature to your route:

```js
router.get('/some/path', {
  caching: {
    max_age: '86400s',
    stale_while_revalidate: '3600s',
    service_worker_max_age: '3600s',
    bypass_client_cache: true,
  },
  headers: {
    set_response_headers: {
      'x-sw-cache-control': 'max-age=3600',
    },
  },
});
```

### Cache Key {/* cache-key */}

Our servers use cache keys to determine whether a cached response exists for a specific request. Specifically, they calculate a cache key for each request. They then use this cache key to check for a cached response.

[Learn more about cache keys.](/applications/performance/caching/cache_key)

### Caching Responses for POST and PUT Requests {/* caching-responses-for-post-and-put-requests */}

By default, {{ PRODUCT }} only caches responses for `GET` requests. Cache the response for `POST`, `PUT`, or both HTTP methods using either of the following methods:

-   **Rules:** Create a rule that sets the [Enable Caching for Methods feature](/applications/performance/rules/features#enable-caching-for-methods) to `POST`, `PUT`, or both HTTP methods.
-   **CDN-as-Code:**
    ```js filename="./routes.js"
    router.match('/some/path', {
      caching: {
          "enable_caching_for_methods": ["POST", "PUT"],
        }
    });
    ```

### Caching Private Responses {/* caching-private-responses */}

By default, {{ PRODUCT }} does not cache the response when it contains [certain cache directives](#response-headers) (e.g., `Cache-Control: private`). Instruct our CDN to ignore these cache directives through either of the following methods:

-   **Rules:** Create a rule that enables the [Ignore Origin No Cache feature](/applications/performance/rules/features#ignore-origin-no-cache).
-   **CDN-as-Code:**
    ```js
    router.get('/some/path', {
      caching: {
        ignore_origin_no_cache: [200],
      },
    });
    ```

### Client Caching {/*client-caching*/}

Content can be cached on our network or the client's machine. Define how long content is cached on a client's machine through:

-   [Cache directives](#response-headers), such as `Cache-Control: max-age` and `Expires`.
-   [Set Client Max Age feature](/applications/performance/rules/features#set-client-max-age).

<Callout type="info">

  A user may clear a web browser’s cache to force the web server to request a new version from our network.

</Callout>

## Revalidation {/*revalidation*/}

Revalidation is the process through which an edge server checks the origin to find out whether a newer version of the requested cached content exists. If the origin indicates that the requested content has not changed, then our servers will serve cached content to the client and then update its TTL according to the provided cache instructions.

Our servers can only perform a revalidation when the following conditions are true:

-   The requested content is stale.
-   The cached response contains one of the following headers:
    -   `Last-Modified` (preferred)
    -   `ETag` header

    <Callout type="info">

      If either response header is not found, then our servers will perform an unconditional `GET` request to the origin.

    </Callout>

## Preventing a Response from being Cached {/* preventing-a-response-from-being-cached */}

There are certain cases under which you may wish to disable caching. For example, caching should be disabled for requests that typically generate unique responses. You may disable caching for these types of requests using either of the following methods:

-   **Rules:** Create a rule that enables the [Bypass Cache feature](/applications/performance/rules/features#bypass-cache) for the desired set of traffic.
-   **CDN-as-Code:**
    ```js filename="./routes.js"
    new Router()
      .get('/random-numbers', {
        caching: {
          "bypass_cache": true,
        },
      })
    ```
<!--
By default, {{ PRODUCT_NAME }} will cache responses that satisfy all of the following conditions:

1. The response must correspond to a `GET` or `HEAD` request. To override this, see the [_POST and other non-GET/HEAD_](#caching-responses-for-post-and-other-non-gethead-requests) section.
2. The response status must have a status code of 1xx, 2xx or 3xx. You cannot override this.
3. The response must not not have any `set-cookie` headers. You cannot override this, but you can [alter the response](/applications/performance/cdn_as_code/common_routing_patterns#altering-the-response) to remove `set-cookie` headers.
4. The response must have a valid `cache-control` header that includes a positive `max-age` or `s-maxage` and does not include a `private` clause. You can override this by using [router caching](#caching-a-response) and [forcing private responses](#caching-private-responses).
-->

## How do I know if a response was served from the cache? {/* how-do-i-know-if-a-response-was-served-from-the-cache */}

Responses served from cache contain the [x-cache: HIT](/applications/performance/response#-specific-headers) response header.

<!--
To know if a response is being cached, examine the `{{ HEADER_PREFIX }}-t` response header. There are two components that indicate caching status:

- `oc` - The outer (level 1) cache
- `sc` - The shield (level 2) cache

You will see one of the following values for these components:

- `pass` - The response was not cached (aka a cache "miss")
- `cached` - The response was added to the cache, but was not served from the cache (aka a cache "miss" that may be a "hit" for the next request)
- `hit` - The response was served from the cache

## Why is my response not being cached? {/* why-is-my-response-not-being-cached */}

To understand why a response was not cached, examine the `{{ HEADER_PREFIX }}-caching-status` response header. It will have one of the following values:

### ok {/* ok */}

The response was cached or served from the cache (see `{{ HEADER_PREFIX }}-t`).

### disabled {/* disabled */}

The response was not cached because the edge caching was explicitly disabled (see [Preventing a Response from being Cached](#preventing-a-response-from-being-cached)).

### no-max-age {/* no-max-age */}

The response was not cached because there was no `cache-control` response header with a non-zero `max-age` or `s-maxage` value. To cache the response, set `max_age` under your `caching` rule. For example:

```js
router.get('/some/path', {
  caching: {
    max_age: '1d',
  },
});
```

You can also cache the response by adding a `cache-control` header with non-zero `max-age` or `s-maxage` value to the upstream response.

### code {/* code */}

The response was not cached because the response had a status code >= 400.

### private {/* private */}

The response was not cached because it contained a `cache-control` header with `private`. To cache the response, use:

```js
router.get('/some/path', {
  caching: {
    ignore_origin_no_cache: [200],
  },
});
```

You can also remove the `private` value from the upstream response's `cache-control` header. See [Altering the Response](/applications/performance/cdn_as_code/common_routing_patterns#altering-the-response) for more information.

### method {/* method */}

The response was not cached because the request method was something other than `HEAD` or `GET`, and the route that set the caching behavior used `match`. To cache the `POST` responses, for example, use `router.post()` instead of `router.match()`.

### body-too-big {/* body-too-big */}

The response was not cached because the request body was more than 8000 bytes.

### set-cookie {/* set-cookie */}

The response was not cached because it contained a `set-cookie` header. To cache the response, use `headers` feature to remove the `set-cookie` header:

```js
router.get('/some/path', {
  headers: {
    // remove `header-name` from the origin response
    remove_origin_response_headers: ['header-name'],

    // remove `header-name` from the response by name
    remove_response_headers: ['header-name'],
  },
});
```

See [Altering the Response](/applications/performance/cdn_as_code/common_routing_patterns#altering-the-response) for more information.

### deployment {/* deployment */}

The response was not cached because it was received during the brief time (less than 1 minute) that a new version of the app was being propagated through the global network of POPs. There is no need to take any action because this status goes away as soon as the new version is completely propagated.

### debug {/* debug */}

The response was not cached because the request was issued with `{{ HEADER_PREFIX }}-debug` header set to `1`. In debug mode, {{ PRODUCT_NAME }} will respond with more data that is useful for troubleshooting. However, the increased header footprint may lead to header overflow and other failures, so this should be used only during actual troubleshooting.

### pass {/* pass */}

The response was not cached due to unknown reasons. If you happen to receive this status then please contact [support]({{ SUPPORT_URL }}).

If the "pass" is intermittent on an otherwise cacheable resource, you may want to explore if "hit-for-pass" may have been triggered.

"Hit-for-pass" can happen when system remembers for a brief time that a typically cacheable resource was not cacheable as anticipated (such as a `Set-Cookie` header, or an HTTP error response code). The system will cache, typically for a couple of minutes that the resource was not cacheable, and will not coalesce requests.

Hit-for-pass disables the usual request coalescing behavior temporarily, when the resource is known not to be cacheable, clients can avoid being put in a waiting queue. Usually request coalescing (see [L2 Shield Cache](/applications/performance#l2-shield-cache)) speeds up client requests by enqueueing all but the first request, anticipating that the first request will populate the cache and allow instant delivery of the already-cached object to the waiting clients.

Disabling this, such as when the upstream resource is serving errors can help alleviate pressure at all stages of the request lifecycle.
-->

## Caching During Development {/* caching-during-development */}

By default, caching is disabled during local development. This configuration prevents stale responses from being served after making changes to your code or upstream APIs. Enable caching during local development by passing the `--cache` option when running the {{ PRODUCT }} CLI in development mode:

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

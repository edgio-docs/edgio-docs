---
title: Caching
---

Caching creates a copy of the requested content on our edge servers. This dramatically reduces the distance that the data has to travel to fulfill all future requests. 

## Environments and Caching {/* environments-and-caching */}

Each environment provides a separate edge cache for the most recent deployment. Although older deployments do not support edge caching, you may re-enable it by [rolling back to that version](/guides/basics/deployments#versioning).

## Edge and Shield Caching {/* edge-and-shield-caching */}

{{ PRODUCT }} may cache your content on our:

- **Edge Points-of-Presence (POP):** An edge POP handles receives and responds to requests for your content.
- **Shield POP:** A shield POP reduces your network bandwidth and the load on your origin server by providing an intermediate caching layer between the edge of our network (aka edge POPs) and your web servers. This means that if a request cannot be served from cache by an edge POP, then it will be forwarded to a shield POP. Funneling requests to a shield POP maximizes your cache hit ratio.

There is very little difference in time to first byte (TTFB) for responses served from an edge or shield POP. In either case, the response is served nearly instantly (typically 25-100ms). Concurrent requests for the same URL on different POPs that result in a cache miss will be coalesced at the shield POP. If you have configured your origin to only use a shield POP, then it will only submit a single request at a time to your origin servers for each cacheable URL.

[Learn more about Origin Shield.](/guides/security/origin_shield)

## Default Caching Policy {/*default-caching-policy*/}

By default, only `GET` requests that result in a `200 OK` response are eligible to be cached. For these requests, our edge servers cache content according to the cache instructions (aka cache directives) provided by the origin server. If an origin  server does not provide cache directives, then it will be assigned a time to live (TTL) of 7 days (i.e., `Cache-Control: max-age=604800`). Content is considered fresh until its TTL has expired.

Once the asset has been cached on a POP, all future requests from the region served by that POP will be served directly from that POP while the cached content's TTL has not expired. Once the TTL has expired, an edge server from that POP may [revalidate](#revalidation) the asset with the origin server. If the asset has not been modified, then the cached content's TTL on that edge server will be updated to reflect the origin's cache instructions or a default TTL of 7 days. Otherwise, a new version of the asset will be retrieved and cached on the edge server.

## Caching a Response {/* caching-a-response */}

Define a caching policy through response headers or by setting up a rule or route with caching features. 

### Cache Directives (Response Headers) {/* response-headers */}

The amount of time that an asset will be cached on our edge servers is determined by the response headers returned by the origin server when a client requests it. By default, our CDN honors the following response headers:

- **Cache-Control: private:** Prevents our edge servers from caching the response.
- **Cache-Control: no-store:** Prevents our edge servers from caching the response.
- **Cache-Control: no-cache:** Requires our edge servers or the client to revalidate cached content.
- **Pragma: no-cache:** Requires our edge servers or the client to revalidate cached content.
- **Cache-Control: s-maxage:** Determines the requested content's time-to-live (TTL) on our edge servers. TTL identifies the amount of time that cached content can be served without revalidation.

  <Callout type="info">

  This response header is ignored if the response contains any of the above response headers.

  </Callout>

- **Cache-Control: max-age:** Determines the requested content's TTL on the user agent and our edge servers.

  <Callout type="info">

  This response header is ignored if the response contains any of the above response headers.

  </Callout>

- **Expires:** Defines an expiration date for the requested content's TTL. The requested content will be considered stale after the specified date/time.

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
-   You may override a web server's cache policy by creating a rule or route.

### Rules {/* rules */}

Set or override a cache policy by creating a rule that identifies the desired set of requests and the caching policy that will be applied to them. Commonly used features for defining a caching policy are listed below.

| Feature  | Usage  |
|---|---|
| [Bypass Cache](/guides/performance/rules/features#bypass-cache)  | Use this feature to disable caching on our network.  |
| [Bypass Client Cache](/guides/performance/rules/features#bypass-client-cache)  | Use this feature to instruct the client to bypass cache.   |
| [Set Client Max-Age](/guides/performance/rules/features#set-client-max-age)  | Use this feature to define how long a client must wait before revalidating cached content with our edge servers. |
| [Set Max-Age](/guides/performance/rules/features#set-max-age)  | Use this feature to define how long an edge server must wait before revalidating cached content with the origin.  |

[View all caching-related features.](/guides/performance/rules/features#caching)

### CDN-as-Code {/* cdn-as-code */}

Add the [caching](/docs/api/core/interfaces/types.Caching.html) feature to your route:

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

Our edge servers use cache keys to determine whether a cached response exists for a specific request. Specifically, they calculate a cache key for each request. They then use this cache key to check for a cached response. 

By default, our edge servers use the following syntax when calculating a cache key:

`//http/80<ACCOUNT ID>/<ORIGIN CONFIGURATION>/<DEPLOYMENT VERSION>/<RELATIVE PATH>:/hs-<URI HASH>`

Definitions for the above placeholder values are provided below.

| Placeholder  | Description  |
|--------------|--------------|
| `<ACCOUNT ID>`           | Indicates your unique customer account ID.   |
| `<ORIGIN CONFIGURATION>` | Indicates the name of the origin configuration associated with the request. <Callout type="info">Deploying a CDN-as-code configuration automatically generates the following system-defined origin configurations: `edgio_static`, `edgio_permanent_static`, `edgio_serverless`, and `edgio_image_optimizer`. Your CDN-as-code configuration  determines the origin configuration that will be applied to the cache key. View how {{ PRODUCT }} maps your code to these origin configurations from the **Rules** page. Returns `origin` when an origin configuration is inapplicable to a request.</Callout> |
| `<DEPLOYMENT VERSION>`   | Indicates the version of the deployment for the configuration that served the request whose response was cached. |
| `<RELATIVE PATH>`        | Indicates the relative path to the requested content. This relative path starts directly after the hostname. By default, query strings are ignored by the caching mechanism and therefore they will be excluded from the cache key. <Callout type ="info">If a query string is recorded in the cache key, it will be converted to its hash equivalent. After which, it will be inserted between the name of the requested asset and its file extension (e.g., asset**HashValue**.html).</Callout> |
| `<URI HASH>`             | Indicates a hash of the request URI. |

**Syntax:** `x-ec-cache-key: <CACHE KEY>`

**Example:** `x-ec-cache-key: //http/800001/web/21/images/foo.jpg:/hs-5041808438894094098`

#### Customizing the Cache Key {/* customizing-the-cache-key */}

If your web application relies on query string parameter(s), request header(s), or cookie(s) when generating a response, then you should customize the cache key to include those elements. 

**Key information:**

-   Customize the cache key for a specific set of requests by implementing either of the following features within a rule or route:

    -   [Cache Key Query String:](/guides/performance/rules/features#cache-key-query-string) Use this feature if you need to include one or more query string parameters in the cache key.

        **CDN-as-code:** [cache_key_query_string](/docs/api/core/interfaces/types.Caching.html#cache_key_query_string) 

    -   [Rewrite Cache Key:](/guides/performance/rules/features#rewrite-cache-key) Use this feature if you require additional control over how a cache key is calculated.

        **CDN-as-code:** [cache_key_rewrite](/docs/api/core/interfaces/types.Caching.html#cache_key_rewrite) 

-   Defining custom cache keys too broadly impacts performance and lowers your cache hit ratio. 

    We strongly recommend that you restrict this customization to a specific set of traffic (e.g., dynamic responses) and only add the specific critieria that influence the response provided to the client.

    For example, if the response varies according to a single query string parameter, then you should only add that query string parameter to your cache key. Adding additional query string parameters may cause too much segmentation for your cached content and thus reduce your cache hit ratio.

##### Sample Custom Cache Key Implementations

Examples of how to customize the cache key are provided below.

-   Add the `page` and `filters` query string parameters to the cache key using either of the following methods:
    -   **Rules:** Create a rule that sets the [Cache Key Query String feature](/guides/performance/rules/features#cache-key-query-string) to `Include` the `page` and `filters` query string parameters.

    <Callout type="tip">

      Add a query string parameter by typing its name and pressing `ENTER`.

    </Callout>

    -   **CDN-as-Code:** 

        ```js filename="./routes.js"
        router.get('/some/path', {
          caching: {
            // Other options...
            cache_key_query_string: {
              include: ['page', 'filters'],
            },
          },
        });
        ```
-   Add the `language` and `currency` cookies to the cache key using either of the following methods:
    -   **Rules:** Create a rule that defines the [Rewrite Cache Key feature](/guides/performance/rules/features#rewrite-cache-key) as indicated below:
        -   **Source:** Set this to option to the relative path for the set of requests whose cache key will be rewritten.
            `/some/path/(.*)`
        -   **Destination:** Set this option to the cache key's replacement pattern.
            `/some/path/$1-%{cookie_language}-%{cookie_currency}`

    -   **CDN-as-Code:** 

        ```js filename="./routes.js"
        router.get('/some/path', {
          caching: {
            // Other options...
            cache_key_rewrite: {
              source: '^/some/path/(.*)$',
              destination: '^/some/path/(.*)-%{cookie_language}-%{cookie_currency}$',
            },
          },
        });
        ```

-   Customize the cache key by the country from which the request originated.
    -   **Rules:** Create a rule that defines the [Rewrite Cache Key feature](/guides/performance/rules/features#rewrite-cache-key) as indicated below:
        -   **Source:** Set this to option to the relative path for the set of requests whose cache key will be rewritten.
            `/some/path/(.*)`
        -   **Destination:** Set this option to the cache key's replacement pattern.
            `/some/path/$1-%{geo_country}`

    -   **CDN-as-Code:** 

        ```js filename="./routes.js"
        router.get('/some/path', {
          caching: {
            // Other options...
            cache_key_rewrite: {
              source: '^/some/path/(.*)$',
              destination: '/some/path/$1-%{geo_country}',
            },
          },
        });
        ```

<Callout type="tip">

  Use [feature variables](/guides/performance/rules/feature_variables) to dynamically construct the cache key's replacement pattern. However, you may not use response metadata when defining a cache key.

</Callout>

### Caching Responses for POST and PUT Requests {/* caching-responses-for-post-and-put-requests */}

By default, {{ PRODUCT }} only caches responses for `GET` requests. Cache the response for `POST`, `PUT`, or both HTTP methods using either of the following methods:

-   **Rules:** Create a rule that sets the [Enable Caching for Methods feature](/guides/performance/rules/features#enable-caching-for-methods) to `POST`, `PUT`, or both HTTP methods.
-   **CDN-as-Code:** 
    ```js filename="./routes.js"
    router.get('/some/path', {
      caching: {
          "enable_caching_for_methods": ["POST", "PUT"],
        }
    });
    ```

### Caching Private Responses {/* caching-private-responses */}

By default, {{ PRODUCT }} does not cache the response when it contains [certain cache directives](#response-headers) (e.g., `Cache-Control: private`). Instruct our CDN to ignore these cache directives through either of the following methods:

-   **Rules:** Create a rule that enables the [Ignore Origin No Cache feature](/guides/performance/rules/features#ignore-origin-no-cache).
-   **CDN-as-Code:** 
    ```js
    router.get('/some/path', {
      caching: {
        ignore_origin_no_cache: true,
      },
    });
    ```

### Client Caching {/*client-caching*/}

Content can be cached on our network or the client's machine. Define how long content is cached on a client's machine through:

-   [Cache directives](#response-headers), such as `Cache-Control: max-age` and `Expires`.
-   [Set Client Max Age feature](/guides/performance/rules/features#set-client-max-age).

<Callout type="info">

  A user may clear a web browser’s cache to force the web server to request a new version from our network.

</Callout>

## Revalidation {/*revalidation*/}

Revalidation is the process through which an edge server checks the origin to find out whether a newer version of the requested cached content exists. If the origin indicates that the requested content has not changed, then our edge servers will serve cached content to the client and then update its TTL according to the provided cache instructions.

Our edge servers can only perform a revalidation when the following conditions are true:

-   The requested content is stale.
-   The cached response contains one of the following headers:
    -   `Last-Modified` (preferred)
    -   `ETag` header 

    <Callout type="info">

      If either response header is not found, then our edge servers will perform an unconditional `GET` request to the origin.

    </Callout>

## Cache Hit Ratio Optimization {/* cache-hit-ratio-optimization */}

There are many factors that influence cache hit ratio, such as:

-   Your caching policy. You need to identify the set of content that should be cached and how long it should be cached. 

    <Callout type="tip">

      The length of time that content should be cached is known as time to live (TTL). TTL should vary according to how often your content is updated. Setting a short TTL leads to more cache revalidations, while a long TTL could lead to stale content being served.

    </Callout>
-   Dynamic responses. If the response varies by query string parameter(s), request header(s), or cookies, then you will need to [customize your cache key](#cache-key) to include the criteria that influences the response provided to the client.

    <Callout type="important">

      We strongly recommend that you restrict this customization to a specific set of traffic (e.g., dynamic responses) and only add the specific critieria that influence the response provided to the client.

    </Callout>

-   Geographic distribution of your users. Clusters of users within the same geographic region typically result in a higher cache hit ratio than users distributed throughout the world. 

-   Cache invalidation (purging). Purging your content affects your cache hit ratio, since new requests will result in cache misses until that content is cached. If related content is updated at the same cadence, then it may make sense to use [surrogate keys (aka cache tags)](/guides/performance/purging#surrogate-key) to selectively target cached content when purging. 

-   Serving stale content during revalidation. Once configured, our edge servers can immediately respond to stale content with cached content instead of waiting for revalidation to complete. After our edge servers revalidate cached content, they will respond to new requests with an up-to-date version of your cached content. This feature balances performance with the need to serve the latest version of your content.

    Set up this feature using one of the following methods:

    -   **Rules:** Create a rule that configures the [Stale While Revalidate feature](/guides/performance/rules/features#stale-while-revalidate) to extend the amount of time that an edge server may serve stale content past the expiration of an asset's TTL.
    -   **CDN-as-Code:** 
        ```js filename="./routes.js"
        new Router()
          .get('/', {
            caching: {
              "max_age": "10h",
              "stale_while_revalidate": "10m",
            }
          })
        ```

        <Callout type="info">

          Once both TTL and the Stale While Revalidate time has been exceeded, our edge servers must wait for revalidation to complete before providing a response to the client. 

          For example, if the `max-age` interval is set to 10 hours and Stale While Revalidate feature is set to 10 minutes, then cached content older than 10 hours and 10 minutes must be revalidated before an edge server may provide a response.

        </Callout>

<!--
With the following header set, the diagram below shows the age of the previously cached response at the time of the next request

```
Cache-Control: max-age=1, stale-while-revalidate=59
```

![maxAge staleWhileRevalidate diagram](/images/caching/stale-max-age.png)
-->

## Preventing a Response from being Cached {/* preventing-a-response-from-being-cached */}

There are certain cases under which you may wish to disable caching. For example, caching should be disabled for requests that typically generate unique responses. You may disable caching for these types of requests using either of the following methods:

-   **Rules:** Create a rule that enables the [Bypass Cache feature](/guides/performance/rules/features#bypass-cache) for the desired set of traffic.
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
3. The response must not not have any `set-cookie` headers. You cannot override this, but you can [alter the response](/guides/performance/cdn_as_code/common_routing_patterns#altering-the-response) to remove `set-cookie` headers.
4. The response must have a valid `cache-control` header that includes a positive `max-age` or `s-maxage` and does not include a `private` clause. You can override this by using [router caching](#caching-a-response) and [forcing private responses](#caching-private-responses).
-->

## How do I know if a response was served from the cache? {/* how-do-i-know-if-a-response-was-served-from-the-cache */}

Responses served from cache contain the [x-cache: HIT](/guides/performance/response#-specific-headers) response header.

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
    ignore_origin_no_cache: true,
  },
});
```

You can also remove the `private` value from the upstream response's `cache-control` header. See [Altering the Response](/guides/performance/cdn_as_code/common_routing_patterns#altering-the-response) for more information.

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

See [Altering the Response](/guides/performance/cdn_as_code/common_routing_patterns#altering-the-response) for more information.

### deployment {/* deployment */}

The response was not cached because it was received during the brief time (less than 1 minute) that a new version of the app was being propagated through the global network of POPs. There is no need to take any action because this status goes away as soon as the new version is completely propagated.

### debug {/* debug */}

The response was not cached because the request was issued with `{{ HEADER_PREFIX }}-debug` header set to `1`. In debug mode, {{ PRODUCT_NAME }} will respond with more data that is useful for troubleshooting. However, the increased header footprint may lead to header overflow and other failures, so this should be used only during actual troubleshooting.

### pass {/* pass */}

The response was not cached due to unknown reasons. If you happen to receive this status then please contact [support]({{ SUPPORT_URL }}).

If the "pass" is intermittent on an otherwise cacheable resource, you may want to explore if "hit-for-pass" may have been triggered.

"Hit-for-pass" can happen when system remembers for a brief time that a typically cacheable resource was not cacheable as anticipated (such as a `Set-Cookie` header, or an HTTP error response code). The system will cache, typically for a couple of minutes that the resource was not cacheable, and will not coalesce requests.

Hit-for-pass disables the usual request coalescing behavior temporarily, when the resource is known not to be cacheable, clients can avoid being put in a waiting queue. Usually request coalescing (see [L2 Shield Cache](/guides/overview#l2-shield-cache)) speeds up client requests by enqueueing all but the first request, anticipating that the first request will populate the cache and allow instant delivery of the already-cached object to the waiting clients.

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
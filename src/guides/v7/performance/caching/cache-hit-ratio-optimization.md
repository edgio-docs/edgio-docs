---
title: Cache Hit Ratio Optimization
---

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
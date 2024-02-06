---
title: Feature Scenarios
---

[Features](/guides/performance/rules/features) customizes how {{ PRODUCT }} processes your traffic. Common customizations  are listed below.

-   Disabling caching.
-   Defining a custom caching policy.
-   Defining a custom cache key.
-   Sending a custom response.
-   Redirecting HTTP requests to HTTPS. 
-   Redirecting requests to a different URL.

### Disable Caching

By default, [{{ PRODUCT }} will only cache content](/guides/performance/caching#default-caching-policy) when it receives cache directives from your origin (e.g., your web servers). Prevent {{ PRODUCT }} from caching content even when cache directives are present by disabling caching for the desired requests through the [Bypass Cache feature](/guides/performance/features#bypass-cache).

![Bypass Cache feature](/images/v7/performance/rules-use-case-bypass-cache.png?width=700)

Add the [Bypass Client Cache feature](/guides/performance/features#bypass-client-cache) to instruct the client that it should not cache the response.

![Bypass Cache and Bypass Client Cache features](/images/v7/performance/rules-use-case-bypass-client-cache.png?width=700)

### Custom Cache Policy

Customize how long {{ PRODUCT }} will cache your content on our network by adding the [Set Max Age feature](/guides/performance/features#set-max-age). Define a max-age interval for each desired status code.

![Set Max Age feature](/images/v7/performance/rules-use-case-set-max-age.png?width=700)

Add the [Stale While Revalidate feature](/guides/performance/features#stale-while-revalidate) to allow {{ PRODUCT }} to serve a cached response during cache revalidation. In the following illustration, both of these features have been added within an ELSE statement. This means that these features are applied when a request does not satisfy the match conditions in the IF statement. In this case, it means that these features are only applied when either of the following conditions are true:
-   The request's relative path does not start with the `/marketing` directory.
-   The request's file extension matches one defined within the Extension match condition.

![Bypass Cache and Stale While Revalidate features](/images/v7/performance/rules-use-case-stale-while-revalidate.png?width=700)

### Custom Cache Key

{{ PRODUCT }} uses a [cache key](/guides/performance/caching/cache_key) to look up whether the requested content has been previously cached. By default, this cache key is determined by a variety of factors, including the requested URL and query string. This default configuration can lead to an optimal cache hit ratio when {{ PRODUCT }} serves different content for each unique query string. However, the cache hit ratio may be suboptimal when any of the following conditions are true:
-   The response body does not vary by query string. 
-   The response body varies according to a subset of query string parameters.
-   The response body varies according to another factor (e.g., request header or device type).

Use the [Cache Key feature](/guides/performance/features#cache-key) to tailor the cache key according to how unique responses are generated. For example, you can exclude the query string from the cache key or only include specific query string parameters. You may also add headers, cookies, and feature variables to the cache key. The following sample configuration includes the `category` and `country` query string parameters and the `device` header:

![Cache Key feature](/images/v7/performance/rules-use-case-cache-key.png?width=700)

### Cache Metadata



### Custom Responses



### Redirecting Requests


### HTTP to HTTPS Redirects



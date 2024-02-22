---
title: Feature Scenarios
---

[Features](/guides/performance/rules/features) customizes how {{ PRODUCT }} processes your traffic. Common customizations are listed below.

-   [Disabling caching.](#disable-caching)
-   [Defining a custom caching policy.](#custom-cache-policy)
-   [Defining a custom cache key.](#custom-cache-key)
-   [Adding cache metadata to the response.](#cache-metadata)
-   [Sending a custom response for a specific status code.](#custom-response-for-specific-status-codes)
-   [Tagging requests for purging.](#tagging-requests-for-purging)
-   [Redirecting HTTP requests to HTTPS.](#http-to-https-redirects)

## Disable Caching {/*disable-caching*/}

By default, [{{ PRODUCT }} will only cache content](/guides/performance/caching#default-caching-policy) when it receives cache directives from your origin (e.g., your web servers). Prevent {{ PRODUCT }} from caching content even when cache directives are present by disabling caching for the desired requests through the [Bypass Cache feature](/guides/performance/rules/features#bypass-cache).

![Bypass Cache feature](/images/v7/performance/rules-use-case-bypass-cache.png?width=700)

Add the [Bypass Client Cache feature](/guides/performance/rules/features#bypass-client-cache) to instruct the client that it should not cache the response.

![Bypass Cache and Bypass Client Cache features](/images/v7/performance/rules-use-case-bypass-client-cache.png?width=700)

## Custom Cache Policy {/*custom-cache-policy*/}

Customize how long {{ PRODUCT }} will cache your content on our network by adding the [Set Max Age feature](/guides/performance/rules/features#set-max-age). Define a max-age interval for each desired status code.

![Set Max Age feature](/images/v7/performance/rules-use-case-set-max-age.png)

Add the [Stale While Revalidate feature](/guides/performance/rules/features#stale-while-revalidate) to allow {{ PRODUCT }} to serve a cached response during cache revalidation. In the following illustration, both of these features have been added within an ELSE statement. This means that these features are applied when a request does not satisfy the match conditions in the IF statement. In this case, it means that these features are only applied when either of the following conditions are true:
-   The request's relative path does not start with the `/marketing` directory.
-   The request's file extension matches one defined within the Extension match condition.

![Bypass Cache and Stale While Revalidate features](/images/v7/performance/rules-use-case-stale-while-revalidate.png?width=700)

## Custom Cache Key {/*custom-cache-key*/}

{{ PRODUCT }} uses a [cache key](/guides/performance/caching/cache_key) to look up whether the requested content has been previously cached. By default, this cache key is determined by a variety of factors, including the requested URL and query string. This default configuration can lead to an optimal cache hit ratio when {{ PRODUCT }} serves different content for each unique query string. However, the cache hit ratio may be suboptimal when any of the following conditions are true:
-   The response body does not vary by query string. 
-   The response body varies according to a subset of query string parameters.
-   The response body varies according to another factor (e.g., request header or device type).

Use the [Cache Key feature](/guides/performance/rules/features#cache-key) to tailor the cache key according to how unique responses are generated. For example, you can exclude the query string from the cache key or only include specific query string parameters. You may also add headers, cookies, and feature variables to the cache key. The following sample configuration includes the `category` and `country` query string parameters and the `device` header within the query string:

![Cache Key feature](/images/v7/performance/rules-use-case-cache-key.png)

## Cache Metadata {/*cache-metadata*/}

Troubleshoot cache-related issues by including cache metadata within the response sent to the client. This requires enabling the [Debug Header feature](/guides/performance/rules/features/debug-header). We recommend that you enable it within a rule that applies to all requests as illustrated below.

![Enable the Debug Header feature](/images/v7/performance/rules-use-case-all-requests.png?width=700)

Once you have enabled this feature, cache metadata will be included in the response when you use the [Edgio Developer Tools Chrome extension](https://chrome.google.com/webstore/detail/edgio-developer-tools/ieehikdcdpeailgpfdbafhnbfhpdgefm) or by [manually requesting it through headers](/guides/performance/response#requesting-debug-cache-information).

## Custom Response for Specific Status Codes {/*custom-response-for-specific-status-codes*/}

A common task is to provide a custom response for a specific status code.

1.  Add a [Response Status Code match condition](/guides/performance/rules/conditions#response-status-code) and set it to the desired status code(s). For example, match on common `4xx` status codes by selecting the `is one of` operator and then adding `400`, `403`, and `404` to the **Value(s)** option. 

    ![Response Status Code match condition](/images/v7/performance/rules-use-case-response-status-code.png)

2.  Define a custom response by setting the [Set Response Body feature](/guides/performance/rules/features#set-response-body) to the desired content. 

    ![Set Response Body feature](/images/v7/performance/rules-use-case-set-response-body.png)

3.  Enable the [Set Done feature](/guides/performance/rules/features#set-done) to prevent cache misses from being forwarded to your origin. Your rule should now look similar to this illustration:

    ![Set Response Body feature](/images/v7/performance/rules-use-case-set-done.png?width=700)

Alternatively, you can instruct the client to redirect to a different URL, such as a dedicated page for `4xx` responses.

1.  Add a Response Status Code match condition as indicated above.
2.  Add the [Set Status Code feature](/guides/performance/rules/features#set-status-code) and set it to return the `302` status code.
3.  Add the [Set Response Headers feature](/guides/performance/rules/features#set-response-headers) and set the `Location` header to the URL to which the client will be redirected.

Your rule should now look similar to the following illustration:

![Set Status Code feature](/images/v7/performance/rules-use-case-set-status-code.png?width=700)

## Tagging Requests for Purging {/*tagging-requests-for-purging*/}

[Tag requests for purging](/guides/performance/caching/purging#surrogate-key) by setting the `Surrogate-Key` response header to the desired labels. If you use the [Set Response Headers feature](/guides/performance/rules/features#set-response-headers) to set this header, then you can take advantage of [feature variables](/guides/performance/rules/feature_variables) when defining labels. This allows you to dynamically assign one or more label(s). For example, you can tag requests by country and file extension by setting this header to this value: 

`%{geo_country} %{path//.*\./}`

Both values are feature variables. The first value (i.e., `%{geo_country}`) identifies the country (e.g., `US`, `MX`, or `FR`) from which the request originated. The second value (i.e., `%{path//.*\./}`) performs a find and replace on the `%{path}` feature variable. This pattern replaces the request's relative path with the file extension without the period (e.g., `htm`, `css`, and `png`). A sample configuration is shown below.

![Surrogate Key](/images/v7/performance/rules-use-case-surrogate-key.png)

Purge requests by country of origin, file extension, or both as shown below.

![Purge by surrogate key](/images/v7/performance/rules-use-case-purge-cache.png)

The above purge request will purge all requests that were tagged with `US`, `png`, or both values. 

An alternative approach is to combine multiple conditions within a single tag. For example, tag content using a single tag that combines country and file extension by setting the `Surrogate-Key` response header to the following value:

`%{geo_country}-%{path//.*\./}`

Purge all requests that originate from within the US for PNG images by submitting the following surrogate key purge: 

`US-png`

## HTTP to HTTPS Redirects {/*http-to-https-redirects*/}

Automatically redirect all HTTP requests to HTTPS.

1.  Identify all HTTP requests by adding the [Scheme match condition](/guides/performance/rules/conditions#scheme) and setting it to `HTTP`.
2.  Redirect HTTP requests to a HTTPS URL through the [URL Redirect feature](/guides/performance/rules/features#url-redirect). 
    1.  Set the **Source** option to `(.*)`. 
    2.  Set the **Destination** option to `https://%{host}$1`. The `%{host}` is a feature variable that is replaced by the host defined in the request URL. The `$1` represents the relative path for the request submitted by the client.

    ![URL Redirect](/images/v7/performance/rules-use-case-url-redirect.png)
    
Your rule should now look like similar to this:

![HTTP to HTTPS redirect](/images/v7/performance/rules-use-case-http-to-https-redirect.png?width=700)

## Default Image Optimizations {/*default-image-optimizations*/}

Automatically apply one or more image optimizations to all images. Once you have applied the following configuration, {{ PRODUCT }} will apply:
-   Your default optimizations to all images.
-   Any additional optimizations defined within the request, as long as those optimizations do not conflict with your default optimizations.

1.  Identify all images by adding the [Path match condition](/guides/performance/rules/conditions#path). Use the `matches (simple)` operator and set the **Match Value** option to:

    `/:path*/:file.:ext(jpg|jpeg|png|gif)`

    The above value matches all requests whose file extension is either jpg, jpeg, png, or gif.

    ![Matching images by file extension](/images/v7/performance/rules-use-case-default-image-optimizations-path.png)

2.  Enable Image Optimization by adding the [Optimize Images feature](/guides/performance/rules/features#optimize-images).
3.  Improve cache efficiency by adding the [Cache Key feature](/guides/performance/rules/features#cache-key). Set the **Query Parameters** option to `Exclude All`. 
4.  Apply a default set of image optimizations by rewriting the URL through the [Rewrite URL feature](/guides/performance/rules/features#rewrite-url). Configure it as directed below.

    1.  Set the **Source Path (Optional)** option to: `/.+`
    2.  Set the **Match Style** option to `regexp`.
    3.  Set the **Destination Path** option to:

        `%{path}?%{query_string/(.+)/$1&}$1&<Default Optimizations>`

        **Example:**

        For example, the following configuration automatically generates a WebP image and strips metadata from the image:

        `%{path}?%{query_string/(.+)/$1&}$1&auto=webp&strip=1`
        
        Your rule should now look like similar to this:

        ![Default image optimizations](/images/v7/performance/rules-use-case-default-image-optimizations.png?width=700)



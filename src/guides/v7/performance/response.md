---
title: Response
---

Each request for your content will generate a response from a server. This response consists of:
-   [Protocol and version](#protocol-and-version)
-   [Status code](#status-codes)
-   [Response headers](#response-headers)
-   [Response body](#response-body)

## Protocol and Version {/* protocol-and-version */}

Identifies the network protocol and version (e.g., HTTP/1.1) used to transmit the response to the client. This protocol and version typically matches the one defined in the request. If an invalid protocol or version was requested, then the response will return a `505 HTTP Version Not Supported`.

## Status Codes {/* status-codes */}

[HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are how the web signals errors and other states from the server to the web browser. If there is an error from your backend website, the error is simply forwarded by {{ PRODUCT_NAME }} to the browser.

### {{ Product_name }} Exclusive Status Codes {/* exclusive-status-codes */}

If the error is generated in {{ PRODUCT_NAME }} itself, the platform generates a 53x or 54x HTTP status code:

| CODE | NAME                                   | DESCRIPTION                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 530  | Internal {{ PRODUCT_NAME }} Error      | Unexpected error in {{ PRODUCT_NAME }}. Please contact [support]({{ HELP_URL }}) immediately.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 531  | Project Upstream Connection Error | Your project failed to establish an upstream connection. This is different from 536 where your project timed out waiting for a response from the upstream. Common causes are the upstream host you specified in your project is incorrect, the DNS entry you defined points to the wrong server, your servers are not responding, or you need to add the {{ PRODUCT_NAME }} IP addresses to your allowlist. (Contact your operations team and ask them to add the IP addresses in [_Allowlisting_](/guides/basics/hostnames_and_origins#firewall-allowing-ip-addresses) to your server's IP allowlist.) |
| 532  | Project Response Too Large             | Your project returned a response size greater than the allowed 6MB.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 533  | Project Upstream TLS Error             | The was an error negotiating a secure TLS connection with the upstream. Common causes are the host name provided does not match the name in the upstream TLS certificate, or the upstream TLS certificate has expired.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 534  | Project Error                          | Your project's serverless code has failed unexpectedly or has issued a malformed response. Use [server logs](/guides/logs/server_logs) to debug.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 535  | Unknown Project                        | The HTTP header `host` is missing or does not match any {{ PRODUCT_NAME }} deployment. Check your requesting URL and your project config.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <a id="536"></a> 536  | Project HTTP Response Timeout          | {{ PRODUCT_NAME }} did not receive an HTTP response from the upstream. Common causes are the upstream dropped the connection prematurely, the upstream application threw an exception, and the upstream took too long to respond.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 537  | Project DNS Resolution Error           | Failed to resolve the host name through DNS, which might indicate a problem with your DNS provider or incorrectly configured domain name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 538  | Project Request Loop                   | The {{ PRODUCT_NAME }} project exceeded the maximum level (3) of nested {{ PRODUCT_NAME }} requests. "Nested" means an {{ PRODUCT_NAME }} site is the upstream of itself or of another {{ PRODUCT_NAME }} site.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 539  | Project Timeout                        | The 539 status code is primarily caused by timeouts, but can also be caused by lack of allow lists (white lists) configured on your backend server. **Timeouts:** Your project's serverless code did not respond on time, either due to slow or blocking upstream or to badly handled asynchronous requests in code (e.g. missing `await` or call to `callback`). **Troubleshooting:** You can view the timings and status codes of the components in the stack in the [{{ HEADER_PREFIX }}-t header](#-t-response-header). Use [server logs](/guides/logs/server_logs) and [performance profiling](/guides/performance/observability#tracking-your-own-timings) to debug. You can also debug using information in [Troubleshooting 539 Status Codes](/guides/performance/troubleshooting#troubleshooting-539-status-codes), which includes information about detecting allow list errors. |
| 540  | Out of Memory                          | Your project's serverless code caused an out-of-memory situation. Use [server logs](/guides/logs/server_logs) to debug and lower the memory use.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 541  | {{ PRODUCT_NAME }} Out of Workers      | The traffic was so high that the request could not be scheduled for processing within the scheduling timeout. Please contact [support]({{ SUPPORT_URL }}) to upgrade your account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 542  | Project Header Overflow                | The {{ PRODUCT_NAME }} project's request or response had too many HTTP headers. See [limits](/guides/performance/limits)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 543  | Global Upstream Timeout                | The request failed to propagate between {{ PRODUCT_NAME }} edge and the Origin Shield POP. Please contact [support]({{ HELP_URL }}).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 544  | Invalid Host Header                    | The {{ PRODUCT_NAME }} received a value in `host` header that is not a valid domain name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 545  | {{ PRODUCT_NAME }} Component Not Ready | An unprepared {{ PRODUCT_NAME }} component received traffic. Please contact [support]({{ HELP_URL }}) immediately.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 546  | {{ PRODUCT_NAME }} Origin Shield POP TLS Error | The was an error negotiating a secure TLS connection with the {{ PRODUCT_NAME }} Origin Shield POP. Please contact [support]({{ HELP_URL }}) immediately. |
| 547  | {{ PRODUCT_NAME }} Origin Shield POP No HTTP Response | {{ PRODUCT_NAME }} did not receive an HTTP response from the Origin Shield POP. Please contact [support]({{ HELP_URL }}) immediately. |
| 548  | {{ PRODUCT_NAME }} Origin Shield POP DNS Resolution Error | {{ PRODUCT_NAME }} failed to resolve the Origin Shield POP's host name through DNS. Please contact [support]({{ HELP_URL }}) immediately. |

<!--
| 549 | {{ PRODUCT_NAME }} Captcha Served | Indicates that {{ PRODUCT_SECURITY_ADVANCED_BOT }} flagged a request as potential bot traffic. As a result, {{ PRODUCT }} served a CAPTCHA challenge instead of your site. Only visitors that can solve this challenge will be allowed to proceed to your site. |
-->

Obviously, your project can set status codes of their own, which may sometimes match codes above. We encourage you to avoid setting your own status code so as to lower troubleshooting overhead and other issues.

<a id="standard-status-codes"></a>

### Standard Status Codes Used by {{ Product_name }} Itself {/* standard-status-codes-used-by-itself */}

{{ PRODUCT_NAME }} also issues these standard response codes:

| CODE | NAME                | DESCRIPTION                                                                                                                                                                                                                                                                                    |
| ---- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request         | The URL is too long or the request headers are too large. See [limits](/guides/performance/limits)                                                                                                                                                                                                         |
| 404  | Not Found           | The server cannot find the requested resource. This usually occurs when the browser requests a page that your app does not have. A 404 will also occur when a request does not match any of the routes in your {{ PRODUCT_NAME }} router. [Learn more.](/guides/performance/cdn_as_code). |
| 412  | Precondition Failed | This code is returned when the query string parameter `{{ COOKIE_PREFIX }}_prefetch` equals `1` and the content was not found in the edge cache.                                                                                                                                               |

## Response Headers {/* response-headers */}

<Callout type="info">

  Response headers that start with `{{ HEADER_PREFIX }}-*` or `x-ec-` are reserved for use by {{ PRODUCT }}. 

</Callout>

The response headers generated for content requested through our CDN describe the response provided by an edge server. By default, our edge servers will include:

-   Response headers generated by the origin server.

    **Example:** The `Last-Modified` and `ETag` response headers determine whether our edge servers will be able to revalidate stale content.

-   Response headers that describe the response (i.e., date, size, and content type).
-   Response headers that define or describe the requested content's cache policy.
-   Information that identifies the edge server that served the response.

### Common Response Headers {/* common-response-headers */}

Common response headers are described below.

-   **Accept-Ranges:** Indicates whether a server can accept range requests.

    **Default value:** bytes

    <Callout type="info">

      The default value indicates that our servers can accept byte-range requests.

    </Callout>

-   **Cache-Control: max-age:** Indicates the maximum length of time that a request is considered fresh. An edge server can serve fresh content directly from cache without having to perform a revalidation with the origin server. <!--Default value: 604800 The default value indicates that the max-age for the requested content is 7 days Max-age is defined in seconds. 604800 seconds = 7 days.-->
-   **Content-Encoding:** Indicates that a compressed version of the requested content was served to the client. This response header indicates the asset's compression type (e.g., gzip, deflate, bzip2, etc.).
-   **Content-Length:** Indicates the size of the response body in octets.
-   **Content-Type:** Indicates the media type (aka content type) for the response body.
-   **Date:** Indicates the date and time (GMT) on which the edge server returned a response.
-   **Etag:** Indicates the entity tag (ETag) for the requested content. This ETag allows our edge servers to revalidate stale content. In other words, our edge servers will use ETag when checking with the origin server to see if there is a newer version of the requested content.
-   **Expires:** Indicates the date and time (GMT) at which the response will be considered stale. By default, our edge servers must revalidate requests for stale content.
-   **Last-Modified:** Indicates the date and time (GMT) at which the requested content was last updated.
-   **Server:** Provides information about the server that fulfilled the request.

    -   **Origin Server:** If an origin server provided a response for a cache miss that includes the `Server` response header, then our edge servers will forward it to the client. If it is missing from the response, then the CDN will define this header as indicated below.
    -   **CDN:** The following syntax applies for responses served from cache or when the `Server` response header is missing from the response provided by an origin server: `ECAcc (<POP>/<ID>)`

        Definitions for the above terms are provided below.

        -   **POP:** Indicates the POP that handled the request.
        -   **ID:** This field is for internal use only.

        **Example:** `server: ECAcc (lac/55D2)`

    <a id="server-timing-response-header" />

-   **Server-Timing:** {{ PRODUCT }} returns this response header when the [Server-Timing Header feature](/guides/performance/rules/features#server-timing-header) has been enabled. The `Server-Timing` response header contains cache status information and information about the POP that served the response. 

    **Syntax:** `server-timing: edgio_cache;desc=<CACHE STATUS CODE>,edgio_pop;desc=<POP>,edgio_country;desc=<COUNTRY>`

    **Example:** `server-timing: edgio_cache;desc=TCP_HIT,edgio_pop;desc=lac,edgio_country;desc=US`

    Definitions for the above terms are provided below.

    -   **CACHE STATUS CODE:** Indicates the cache status code for the response served to the client.
    -   **POP:** Indicates the POP that served the response.
    -   **COUNTRY:** Indicates the two-letter code for the POP's country.

-   **Vary:** Identifies the variant that defines whether cached content can be served for future requests.

    **Key information:**

    -   Our network only supports a single variant called `Accept-Encoding`. This value indicates that the `Accept-Encoding` request header determines whether cached content will be served.
    -   By default, our edge servers only return this header when the requested content was previously cached.
    -   The `Accept-Encoding` request header identifies the type of compression requested by the client. An edge server may deliver the requested content immediately if the cached asset matches the requested compression method.

-   **Warning:** This response header is only returned when a stale response is served to the client. A stale response is typically served under the following conditions:

    -   The [Stale While Revalidate feature](/guides/performance/rules/features#stale-while-revalidate) was applied to the request.
    
        **Response header value:** `110 - "Response is stale"`
    
    -   Revalidation failed and either of the following conditions is true:
   
        -   The origin server returned a `5xx` response and the [Stale on Error feature](/guides/performance/rules/features#stale-on-error) was applied to the request.
        -   The origin server is unresponsive and the stale window, as defined by the [Revalidate After Origin Unavailable feature](/guides/performance/rules/features#revalidate-after-origin-unavailable), is active.
    
        **Response header value:** `111 - "Revalidation Failed", 110 - "Response is stale"`

### {{ Product }}-Specific Headers {/* -specific-headers */}

{{ PRODUCT }}-specific headers are described below.

-   **x-cache: HIT:** Indicates that a cached version of the requested content was served directly to the client by an edge server.

    **Example:** `x-cache: HIT`

-  **x-ec-debug:** Contains the requested debug cache metadata when the [Debug Header feature](/guides/performance/rules/features#debug-header) has been enabled. [Learn more.](#requesting-debug-cache-information)
-   **{{ HEADER_PREFIX }}-aws-region:** Indicates the [AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) from which a Serverless request was served. 
<!--
-   **{{ HEADER_PREFIX }}-caching-status:** Indicates cache status information. If the response was not cached or served from cache, then it will report the reason why it was not cached.

    **Example:** The following sample response header indicates that caching was explictly disabled for this request: 

    `{{ HEADER_PREFIX }}-caching-status: disabled`

    [Learn more.](/guides/performance/caching#why-is-my-response-not-being-cached)
-->
-   **{{ HEADER_PREFIX }}-components:** Contains Serverless information that is primarily meant for internal use when troubleshooting issues.
-   **{{ HEADER_PREFIX }}-hit-request-id:** For responses served from cache, this header indicates the unique ID of the request that was cached on our CDN.
    <a id="-mr" />
	
-   **{{ HEADER_PREFIX }}-mr:** Identifies each rule that was applied to a request. 

    **Syntax:** `{{ HEADER_PREFIX }}-mr: <ENVIRONMENT #>:<RULE #>[;<ENVIRONMENT #>:<RULE #>;<ENVIRONMENT #>:<RULE #>]`

    **Example:** `{{ HEADER_PREFIX }}-mr: 16:0;16:1;`

    Definitions for the above terms are provided below.

        -   **ENVIRONMENT #:** Indicates the environment's version number.
        -   **RULE #:** Indicates the index number of the rule that was applied to the request. 

        <Callout type="tip">

          Click the **Show Rule Numbers** link at the top of the **Rules** page to display a number next to each rule. 

        </Callout>

        <Callout type="info">

          **CDN-as-Code:** Configurations deployed through the {{ PRODUCT }} CLI are converted into rules. You may view these rules through the **Rules** page.

        </Callout>

-   **{{ HEADER_PREFIX }}-p:** Returns `1` when the client's request includes an `edgio_prefetch` query string parameter. This parameter indicates that the client is requesting [Predictive Prefetching](/guides/performance/prefetching).

    **Example:** `{{ HEADER_PREFIX }}-p: 1`

-   **{{ HEADER_PREFIX }}-platform-aws-account:** Identifies the AWS account corresponding to the Serverless worker that processed a request.
-   **{{ HEADER_PREFIX }}-request-id:** Indicates the request's unique ID.
-   **{{ HEADER_PREFIX }}-status]:** Contains a comma-delimited list of HTTP status codes for each Serverless component that processed the request.
    -   **p**: Serverless load balancer
    -   **w**: Serverless worker

    **Example:** `{{ HEADER_PREFIX }}-status: p=200,w=200`
	
-   **{{ HEADER_PREFIX }}-surrogate-key:** Contains a space-delimited list of surrogate keys (cache tags). <!-- surrogate keys can be injected when needed into your backend responses -->

    [Learn more.](/guides/performance/caching/purging#surrogate-keys-cache-tags)

-   [{{ HEADER_PREFIX }}-t](#-t-response-header): Contains time measurements and cache status information for Serverless requests ({{ PRODUCT }} {{ PLATFORM }} and Serverless Compute).

-   **{{ HEADER_PREFIX }}-version:** Indicates basic information for your current deployment.

    **Syntax:** `{{ HEADER_PREFIX }}-version: <DEPLOYMENT> <ENVIRONMENT VERSION> <INTERNAL> NA <DEPLOYMENT TIMESTAMP> <ENVIRONMENT ID>`

    **Example:** `{{ HEADER_PREFIX }}-version: 16 16 19 NA 2023-04-02T22:52:30Z ed922fee-185c-427d-8949-83d135108aab`

    Definitions for the above terms are provided below.

    -   **DEPLOYMENT:** Identifies a deployment by its version number.
    -   **ENVIRONMENT VERSION:** Indicates the environment's version number. 
    -   **INTERNAL:** Reserved for future use.
    -   **DEPLOYMENT TIMESTAMP:** Indicates the date and time (UTC; 24-hour clock) at which your site was deployed.

        **Syntax:** `YYYY-MM-DDThh:mm:ss.msZ`

    -   **ENVIRONMENT ID:** Identifies an environment by its system-defined ID.

### Requesting Debug Cache Information {/* requesting-debug-cache-information */}

The debug cache response headers provide additional information about the cache policy applied to the requested asset. The response sent from our edge servers to a user will only include debug cache response headers when the following conditions are true:

-   The [Debug Header feature](/guides/performance/rules/features#debug-header) has been enabled on the desired request.
-   The request sets a `x-ec-debug` header to the set of debug cache headers that will be included in the response.

    **Syntax:** `x-ec-debug: <DEBUG CACHE HEADER>[,<DEBUG CACHE HEADER>,<DEBUG CACHE HEADER>]`

    **Example:** `x-ec-debug: x-ec-cache,x-ec-cache-remote,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state`

    Valid values for the `x-ec-debug` request header are provided below.

    -   **x-ec-cache:** [Cache status code](#cache-status-code-information)
    -   **x-ec-cache-remote:** [Cache status code](#cache-status-code-information)
    -   **x-ec-check-cacheable:** [Cacheable](#cacheable-response-header)
    -   **x-ec-cache-key:** [Cache key](#cache-key-response-header)
    -   **x-ec-cache-state:** [Cache state](#cache-state-response-header)
	
    <Callout type="tip">

      Once you have enabled the `Debug Header` feature,  use the [Edgio Developer Tools Chrome extension](https://chrome.google.com/webstore/detail/edgio-developer-tools/ieehikdcdpeailgpfdbafhnbfhpdgefm) to automatically add all debug cache response headers to traffic served by {{ PRODUCT }}. View these response headers by inspecting network activity through [Chrome DevTools](https://developer.chrome.com/docs/devtools/).
	  
	  Alternatively, if you are using the latest version of the {{ PRODUCT }} CLI (v7.0.22+), then [{{ FULL_CLI_NAME }} curl](/guides/develop/cli#curl) will also automatically add all debug cache headers to the response.

    </Callout>

#### Cache Status Code Information {/* cache-status-code-information */}

The following response headers identify a server and how it handled the response:

-   **x-ec-cache:** This response header is reported whenever content is routed through the CDN. It identifies the edge server that fulfilled the request.

    **Syntax:** `x-ec-cache: <CACHE STATUS CODE> from ECAcc (<POP>/<ID>)`

    **Example:** `x-ec-cache: TCP_HIT from ECAcc (lga/0FE8)`

-   **x-ec-cache-remote:** This response header is only reported when the requested content was cached on an origin shield server.

    **Syntax:** `x-ec-cache: <CACHE STATUS CODE> from ECAcc (<POP>/<ID>)`

    **Example:** `x-ec-cache-remote: TCP_HIT from ECAcc (dca/EF00)`

The terms used in the above response header syntax are defined below:

-   **CACHE STATUS CODE:** Indicates how the requested content was handled by the CDN. This is represented through a cache status code.

    <Callout type="info">

      The `TCP_DENIED` status code may be reported instead of `NONE` when an unauthorized request is denied due to Token-Based Authentication. However, the `NONE` status code will continue to be used when viewing reports or raw log data.

    </Callout>

-   **POP:** Indicates the three-letter abbreviation for the POP that handled the request.
    
#### Cacheable Response Header {/* cacheable-response-header */}

The `x-ec-check-cacheable` response header indicates whether the requested content could have been cached.

<Callout type="info">

  This response header does not indicate whether caching took place. Rather, it simply indicates whether the request was eligible for caching.

</Callout>

**Syntax:** `x-ec-check-cacheable: <CACHEABLE>`

**Example:** `x-ec-check-cacheable: YES`

The term `CACHEABLE` indicates whether the requested content could have been cached. Valid values for this term are:

-   **YES:** Indicates that the requested content was eligible for caching.
-   **NO:** Indicates that the requested content was ineligible for caching. This may be due to one of the following reasons:

    -   **Customer-Specific Configuration:** A configuration specific to your account can prevent our edge servers from caching an asset. For example, you may create a rule that prevents the response from being cached by enabling the `Bypass Cache` feature.
    -   **Cache Response Headers:** The requested asset's `Cache-Control` and `Expires` headers can prevent our edge servers from caching it.

-   **UNKNOWN:** Indicates that our servers were unable to assess whether the requested asset was cacheable. This typically occurs when the request is denied due to Token-Based Authentication.

#### Cache Key Response Header {/* cache-key-response-header */}

The `x-ec-cache-key` response header indicates the cache key associated with the requested content. A cache key identifies an asset for the purposes of caching. In other words, our servers will check for a cached version of an asset according to its cache key.

[Learn more about cache keys.](/guides/performance/caching/cache_key)

#### Cache State Response Header {/* cache-state-response-header */}

The `x-ec-cache-state` response header indicates the cache state of the requested content at the time it was requested.

**Syntax:** `x-ec-cache-state: max-age=<MAX-AGE SECONDS> (<MAX-AGE TIME PERIOD>); cache-ts=<UNIX TIME> (<ddd>, <dd MMM yyyy HH:mm:ss> GMT); cache-age=<CACHE-AGE SECONDS> (<CACHE-AGE TIME PERIOD); remaining-ttl=<REMAINING TTL (SECONDS)> (<REMAINING TTL TIME PERIOD>; expires-delta=<EXPIRES SECONDS>`

**Example:** `x-ec-cache-state: max-age=604800 (7d); cache-ts=1341802519 (Mon, 09 Jul 2012 02:55:19 GMT); cache-age=0 (0s); remaining-ttl=604800 (7d); expires-delta=none`

The terms used in the above response header syntax are defined below:

-   **MAX-AGE SECONDS:** Indicates the max-age (in seconds) as defined by the requested content's `Cache-Control` headers.
-   **MAX-AGE TIME PERIOD:** Converts the max-age value to the approximate equivalent of a larger unit (e.g., days).
-   **UNIX TIME:** Indicates the cache timestamp of the requested content in Unix time (a.k.a. POSIX time or Unix epoch). The cache timestamp indicates the starting date/time from which an asset's TTL will be calculated.  

    If the origin server does not utilize a third-party HTTP caching server or if that server does not return the `Age` response header, then the cache timestamp will always be the date/time when the asset was retrieved or revalidated. Otherwise, our edge servers will use the `Age` field to calculate the asset's TTL as follows:
    
    `Retrieval/RevalidateDateTime - Age`
    
-   **ddd, dd MMM yyyy HH:mm:ss GMT:** Indicates the cache timestamp of the requested content. 
-   **CACHE-AGE SECONDS:** Indicates the number of seconds that have elapsed since the cache timestamp.
-   **REMAINING TTL (SECONDS):** Indicates the number of seconds remaining for which the cached content will be considered fresh. This value is calculated as indicated below.
    
    `REMAINING TTL (SECONDS) = max-age - cache age`
    
-   **REMAINING TTL TIME PERIOD:** Converts the remaining TTL value (i.e., Remaining TTL Seconds) to the approximate equivalent of a larger unit (e.g., days).
    
-   **EXPIRES SECONDS:** Indicates the number of seconds remaining before the date/time specified in the Expires response header. If the Expires response header was not included in the response, then this term will report none.

#### Time Unit Abbreviations {/* time-unit-abbreviations */}

The following abbreviations are used for time units:

-   **s:** Seconds
-   **h:** Hour(s)
-   **d:** Day(s)
-   **m:** Month(s)
-   **y:** Year(s)

### {{ Header_prefix }}-T Response Header {/* -t-response-header */}

The {{ HEADER_PREFIX }}-t response header is solely returned for Serverless requests ({{ PRODUCT }} {{ PLATFORM }} and Serverless Compute). It contains time measurements for each Serverless component. 

**Syntax:**

`{{ HEADER_PREFIX }}-t: <Metric 1>=<Value 1>[,<Metric 2>=<Value 2>,<Metric n>=<Value n>]`

Valid values are:

-   **pt**: Serverless load balancer time. Indicates the total time, in milliseconds, it took to process the Serverless request. This metric measures the time between when the Serverless load balancer receives the request and when it sends a response to the client.
-   **pc**: Serverless load balancer counter. Indicates the number of requests generated by the Serverless load balancer. A value greater than `1` indicates that the load balancer had to scale the request by adding it to a queue and then resubmitting it. This occurs due to low available compute capacity.
-   **pf**: Serverless load balancer fetch time. Indicates the total time, in milliseconds, it took to fetch a response from a Serverless worker. Specifically, it measures the amount of time between when the Serverless load balancer forwards a request to a Serverless worker and when it receives a response.
-   **wbt**: Serverless worker billed time. Indicates the total billed time in milliseconds. This measurement may be higher than `wt`, since it includes Serverless workload time and time spent capturing Serverless log data.
-   **wbm**: Serverless worker billed memory. Indicates billed memory usage in Megabytes. This metric measures memory allocated to the Serverless worker.
-   **wm**: Serverless worker memory. Indicates actual Serverless worker memory usage in Megabytes.
-   **wt**: Serverless worker time. Indicates the total time, in milliseconds, it took for the Serverless worker to generate a response.
-   **wc**: Serverless worker count. Indicates the number of times that a Serverless worker was invoked for this request.
-   **wg**: Serverless worker age. Indicates the amount of time, in milliseconds, that the instance of the Serverless worker that processed the request has been running.
-   **wl**: Serverless worker lifetime. Indicates the total processing time, in milliseconds, for all Serverless workers for all requests.
<!--
-   **pu:** Serverless load balancer upstream fetch time. Indicates the total time, in milliseconds, it took to fetch a response from an origin. Specifically, it measures the amount of time between when the Serverless load balancer forwards a request to an origin and when it receives a response.
-   **wa:** Indicates the `transformRequest` time, in milliseconds, as measured by a Serverless worker.
-   **wp:** Indicates the fetch or proxy time, in milliseconds, as measured by a Serverless worker.
-   **wr:** Indicates the amount of time, in milliseconds, that the Serverless worker spent evaluating the route through which this request will be processed.
-   **wz:** If the route uses `transformResponse`, then this metric measures the `transformResponse` time in milliseconds.
-->

**Example:** The following sample {{ HEADER_PREFIX }}-t response header is for a Serverless Compute request:

`{{ HEADER_PREFIX }}-t: pt=2202,pc=1,pf=2201,wbt=1379,wbm=896,wm=162,wt=1062,wc=1,wg=1320,wl=1062`

We will now examine each metric defined within the above sample response header:

| Value | Description |
| -------------- | -------------- |
| `pt=2202`   | Indicates the total time from a Serverless load balancer was 2,202 milliseconds.                    |
| `pc=1`     | Indicates the request count for a Serverless load balancer was 1.                                 |
| `pf=2201`   | Indicates the fetch time from a Serverless load balancer was 2,201 milliseconds.                 |
| `wbt=1379`  | Indicates that billed time for Serverless was 1,379 milliseconds.                                |
| `wbm=896`  | Indicates that billed memory for Serverless was 896 Megabytes.                                |
| `wm=162`   | Indicates that memory usage for a Serverless worker was 162 Megabytes. |
| `wt=1062`   | Indicates that the workload time for a Serverless worker was 1,062 milliseconds.          |
| `wc=1`    | Indicates that this instance of Serverless was invoked 1 time.                    |
| `wg=1320`| Indicates that this instance of Serverless has been running for 1,320 seconds.                         |
| `wl=1062` | Indicates that the  total processing time for all Serverless workers for all requests is 1,062 milliseconds. |

<a id="serverless-compute-cold-start-timing"></a>

## Serverless  - Cold Start Timing {/* serverless-cold-start-timing */}

To calculate the Serverless cold start timing you must take the difference between `pf` and `wt` in the `{{ HEADER_PREFIX }}-t` header. `wt` is time taken for the Serverless worker to execute after it has started, this is can be read as the time is takes the project code to execute. If that seems large, evaluate the code within your project to see why this might be. To [track timings](/guides/performance#tracking-your-own-timings) for a function, it is possible to add specific code to do that.

Based on the example above, that would be `809 (pf) - 722 (wt) = 87ms`.

## Response Body {/* response-body */}

Contains the data provided in response to the request.

For example, the response body for a `GET` request for a text file might look similar to the following:

```
Hello World!
```
---
title: Response
---

Each request for your content will generate a response from a server. This response consists of:
-   [Protocol and version](#protocol-and-version)
-   [Status code](#status-codes)
-   [Response headers](#response-headers)
-   [Response body](#response-body)

## Protocol and Version {/*protocol-and-version*/}

By default, {{ PRODUCT }} communicates with your origin and clients using the HTTP protocol version (i.e., HTTP/1.0 or HTTP/1.1) defined in the request. However, the HTTP/2 protocol is solely used to communicate between our network and the client. This means that HTTP/2 requests that result in a cache miss will be forwarded to an origin server using the HTTP/1.1 protocol.

If a client requests an invalid protocol or version, then {{ PRODUCT }} will return a `505 HTTP Version Not Supported` response.

## Status Codes {/*status-codes*/}

<a id="exclusive-status-codes"></a><a id="standard-status-codes"></a>[HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are how the web signals errors and other states from the server to the web browser. If there is an issue with the request, {{ PRODUCT }} will either forward the error from the origin or respond with one of the following response codes:

| Status Code                                                                                                        | Description                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 Bad Request                                                                                                    | The URL is too long or the request headers are too large. [View request limits.](/guides/performance/limits#request-and-response-limits)                                                                                     |
| [404 Not Found](/guides/performance/troubleshooting#404-not-found-status-code)                                                | The server could not find the requested resource.                                                                                                                                                                            |
| [412 Precondition Failed](/guides/performance/troubleshooting#412-precondition-failed-status-code]                 | The requested content was not prefetched because it was not cached on the POP closest to the client. By default, {{ PRODUCT }} only prefetches cached content.                                                                           |
| [502 Bad Gateway](/guides/performance/troubleshooting#502-bad-gateway-status-code)                                 | {{ PRODUCT }} could not establish a connection to an origin server.                                                                                                                                                          |  |
| 505 HTTP Version Not Supported                                                                                     | An invalid HTTP protocol or version was requested.                                                                                                                                                                           |
| 530 Internal {{ PRODUCT }} Error                                                                                   | Unexpected error. {{ CONTACT_SUPPORT }}                                                                                                                                                                                      |
| [531 Project Upstream Connection Error](/guides/performance/troubleshooting#531-project-upstream-connection-error-status-code) | {{ PRODUCT }} could not establish a connection to your origin.                                                                                                                                                               |
| 532 Project Response Too Large                                                                                     | The response from the {{ PRODUCT }} cloud exceeded the [maximum response body limit](/guides/performance/limits#request-and-response-limits).                                                                                |
| 533 Project Upstream TLS Error                                                                                     | There was an error negotiating a secure TLS connection with the origin. Check whether the upstream TLS certificate has expired and whether the provided host name matches the upstream TLS certificate.                      |
| 534 Project Error                                                                                                  | Your project's serverless code has failed unexpectedly or has issued a malformed response. Use [server logs](/guides/logs/server_logs) to debug.                                                                             |
| 535 Unknown Project                                                                                                | The `host` header is missing or does not match any {{ PRODUCT }} deployment. Check the request and your project configuration.                                                                                               |
| <a id="536"></a>536 Project HTTP Response Timeout                                                                  | {{ PRODUCT }} did not receive an HTTP response from the upstream. Common causes are the upstream dropped the connection prematurely, the upstream application threw an exception, and the upstream took too long to respond. |
| 537 Project DNS Resolution Error                                                                                   | Failed to resolve the host name through DNS, which might indicate a problem with your DNS provider or an incorrectly configured domain.                                                                                      |
| 538 Project Request Loop                                                                                           | The {{ PRODUCT }} project exceeded the maximum level (3) of nested {{ PRODUCT }} requests. A request is nested when the {{ PRODUCT }} property is the upstream of itself or of another {{ PRODUCT }} property.               |
| [539 Project Timeout](/guides/performance/troubleshooting#troubleshooting-539-status-codes)                        | This status code is primarily caused by timeouts, but can also be caused by a lack of allowlists (whitelists) configured on your web server(s).                                                                              |
| 540 Out of Memory                                                                                                  | An {{ PRODUCT }} cloud worker ran out of memory when processing your project's serverless code. Use [server logs](/guides/logs/server_logs) to debug and lower memory usage.                                                 |
| 541 {{ PRODUCT }} Out of Workers                                                                                   | A request could not be scheduled for processing due to the amount of traffic on your website. {{ ACCOUNT_UPGRADE }}                                                                                                          |
| 542 Project Header Overflow                                                                                        | The {{ PRODUCT }} project's request or response contained too many HTTP headers. [View request limits.](/guides/performance/limits#request-and-response-limits)                                                              |
| 543 Global Upstream Timeout                                                                                        | The request failed to propagate between the edge of our network and the Origin Shield POP. {{ CONTACT_SUPPORT }}                                                                                                             |
| 544 Invalid Host Header                                                                                            | The `host` header is set to an invalid domain.                                                                                                                                                                               |
| 545 {{ PRODUCT }} Component Not Ready                                                                              | An unprepared {{ PRODUCT }} component received traffic.  {{ CONTACT_SUPPORT }}                                                                                                                                               |
| 546 {{ PRODUCT }} Origin Shield POP TLS Error                                                                      | There was an error negotiating a secure TLS connection with the Origin Shield POP.  {{ CONTACT_SUPPORT }}                                                                                                                    |
| 547 {{ PRODUCT }} Origin Shield POP No HTTP Response                                                               | {{ PRODUCT }} did not receive an HTTP response from the Origin Shield POP.  {{ CONTACT_SUPPORT }}                                                                                                                            |
| 548 {{ PRODUCT }} Origin Shield POP DNS Resolution Error                                                           | {{ PRODUCT }} failed to resolve the Origin Shield POP's host name through DNS.  {{ CONTACT_SUPPORT }}                                                                                                                        |
<!--
| 549{{ PRODUCT }} Captcha Served | Indicates that PRODUCT_SECURITY_ADVANCED_BOT flagged a request as potential bot traffic. As a result, {{ PRODUCT }} served a CAPTCHA challenge instead of your site. Only visitors that can solve this challenge will be allowed to proceed to your site. |
-->

## Response Headers {/*response-headers*/}

<Callout type="info">

  Response headers that start with `{{ HEADER_PREFIX }}-*` or `x-ec-` are reserved for use by {{ PRODUCT }}. 

</Callout>

The response headers generated for content requested through our CDN describe the response provided by an edge server. By default, our edge servers will include:

-   Response headers generated by the origin server.

    **Example:** The `Last-Modified` and `ETag` response headers determine whether our edge servers will be able to revalidate stale content.

-   Response headers that describe the response (i.e., date, size, and content type).
-   Response headers that define or describe the requested content's cache policy.
-   Information that identifies the edge server that served the response.

### Common Response Headers {/*common-response-headers*/}

Common response headers are described below.

-   **Accept-Ranges:** Indicates whether a server can accept range requests.

    **Default value:** bytes

    <Callout type="info">

      The default value indicates that our servers can accept byte-range requests.

    </Callout>

-   **Cache-Control: max-age:** Indicates the maximum length of time that a request is considered fresh. An edge server can serve fresh content directly from cache without having to perform a revalidation with the origin server. 
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

-   **Server-Timing:** This response header contains cache status information and information about the POP that served the response. 

    **Syntax:** `server-timing: edgio_cache;desc=<CACHE STATUS CODE>,edgio_pop;desc=<POP>,edgio_country;desc=<COUNTRY>`

    **Example:** `server-timing: edgio_cache;desc=TCP_HIT,edgio_pop;desc=lac,edgio_country;desc=US`

    Definitions for the above terms are provided below.

    -   **CACHE STATUS CODE:** Indicates the [cache status code](/guides/performance/caching/cache_status_codes) for the response served to the client.
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

### {{ PRODUCT }}-Specific Headers {/*-specific-headers*/}

{{ PRODUCT }}-specific headers are described below.

-   **x-cache: HIT:** Indicates that a cached version of the requested content was served directly to the client by an edge server.

    **Example:** `x-cache: HIT`

-  **x-ec-debug:** Contains the requested debug cache metadata when the [Debug Header feature](/guides/performance/rules/features#debug-header) has been enabled. [Learn more.](#requesting-debug-cache-information)
-   **{{ HEADER_PREFIX }}-aws-region:** Indicates the [AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions) from which a request to the {{ PRODUCT }} cloud was served. 
<!--
-   **{{ HEADER_PREFIX }}-caching-status:** Indicates cache status information. If the response was not cached or served from cache, then it will report the reason why it was not cached.

    **Example:** The following sample response header indicates that caching was explictly disabled for this request: 

    `{{ HEADER_PREFIX }}-caching-status: disabled`

    [Learn more.](/guides/performance/caching#why-is-my-response-not-being-cached)
-->
-   **{{ HEADER_PREFIX }}-components:** Contains {{ PRODUCT }} cloud information that is primarily meant for internal use when troubleshooting issues.
    <a id="-mr" />
<!--
-   **{{ HEADER_PREFIX }}-hit-request-id:** For responses served from cache, this header indicates the unique ID of the request that was cached on our CDN.
-->

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

-   **{{ HEADER_PREFIX }}-platform-aws-account:** Identifies the AWS account corresponding to the cloud worker that processed a request.
<!--
-   **{{ HEADER_PREFIX }}-request-id:** Indicates the request's unique ID.
-->
-   **{{ HEADER_PREFIX }}-status:** Contains a comma-delimited list of HTTP status codes for each cloud component that processed the request.
    -   **p**: Cloud load balancer
    -   **w**: Cloud worker

    **Example:** `{{ HEADER_PREFIX }}-status: p=200,w=200`

-   **{{ HEADER_PREFIX }}-surrogate-key:** Contains a space-delimited list of surrogate keys (cache tags). <!-- surrogate keys can be injected when needed into your backend responses -->

    [Learn more.](/guides/performance/caching/purging#surrogate-keys-cache-tags)

-   [{{ HEADER_PREFIX }}-t](#-t-response-header): Contains time measurements and cache status information for {{ PRODUCT }} cloud requests ({{ PRODUCT }} {{ PRODUCT_PLATFORM }} and Cloud Functions).

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

### Requesting Debug Cache Information {/*requesting-debug-cache-information*/}

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

#### Cache Status Code Information {/*cache-status-code-information*/}

The following response headers identify a server and how it handled the response:

-   **x-ec-cache:** This response header is reported whenever content is routed through the CDN. It identifies the edge server that fulfilled the request.

    **Syntax:** `x-ec-cache: <CACHE STATUS CODE> from ECAcc (<POP>/<ID>)`

    **Example:** `x-ec-cache: TCP_HIT from ECAcc (lga/0FE8)`

-   **x-ec-cache-remote:** This response header is only reported when the requested content was cached on an origin shield server.

    **Syntax:** `x-ec-cache: <CACHE STATUS CODE> from ECAcc (<POP>/<ID>)`

    **Example:** `x-ec-cache-remote: TCP_HIT from ECAcc (dca/EF00)`

The terms used in the above response header syntax are defined below:

-   **CACHE STATUS CODE:** Indicates how the requested content was handled by the CDN. This is represented through a [cache status code](/guides/performance/caching/cache_status_codes).
-   **POP:** Indicates the three-letter abbreviation for the POP that handled the request.
    
#### Cacheable Response Header {/*cacheable-response-header*/}

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

#### Cache Key Response Header {/*cache-key-response-header*/}

The `x-ec-cache-key` response header indicates the cache key associated with the requested content. A cache key identifies an asset for the purposes of caching. In other words, our servers will check for a cached version of an asset according to its cache key.

[Learn more about cache keys.](/guides/performance/caching/cache_key)

#### Cache State Response Header {/*cache-state-response-header*/}

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

#### Time Unit Abbreviations {/*time-unit-abbreviations*/}

The following abbreviations are used for time units:

-   **s:** Seconds
-   **h:** Hour(s)
-   **d:** Day(s)
-   **m:** Month(s)
-   **y:** Year(s)

### {{ HEADER_PREFIX }}-t Response Header {/*-t-response-header*/}

The {{ HEADER_PREFIX }}-t response header is solely returned for {{ PRODUCT }} cloud requests ({{ PRODUCT }} {{ PRODUCT_PLATFORM }} and Cloud Functions). It contains time measurements for each cloud component. 

**Syntax:**

`{{ HEADER_PREFIX }}-t: <Metric 1>=<Value 1>[,<Metric 2>=<Value 2>,<Metric n>=<Value n>]`

Valid values are:

-   **pt**: Cloud load balancer time. Indicates the total time, in milliseconds, it took to process the cloud request. This metric measures the time between when the cloud load balancer receives the request and when it sends a response to the client.
-   **pc**: Cloud load balancer counter. Indicates the number of requests generated by the cloud load balancer. A value greater than `1` indicates that the load balancer had to scale the request by adding it to a queue and then resubmitting it. This occurs due to low available compute capacity.
-   **pf**: Cloud load balancer fetch time. Indicates the total time, in milliseconds, it took to fetch a response from a cloud worker. Specifically, it measures the amount of time between when the cloud load balancer forwards a request to a cloud worker and when it receives a response.
-   **wbt**: Cloud worker billed time. Indicates the total billed time in milliseconds. This measurement may be higher than `wt`, since it includes cloud workload time and time spent capturing cloud log data.
-   **wbm**: Cloud worker billed memory. Indicates billed memory usage in Megabytes. This metric measures memory allocated to the cloud worker.
-   **wm**: Cloud worker memory. Indicates actual cloud worker memory usage in Megabytes.
-   **wt**: Cloud worker time. Indicates the total time, in milliseconds, it took for the cloud worker to generate a response.
-   **wc**: Cloud worker count. Indicates the number of times that a cloud worker was invoked for this request.
-   **wg**: Cloud worker age. Indicates the amount of time, in milliseconds, that the instance of the cloud worker that processed the request has been running.
-   **wl**: Cloud worker lifetime. Indicates the total processing time, in milliseconds, for all cloud workers for all requests.
<!--
-   **pu:** Cloud load balancer upstream fetch time. Indicates the total time, in milliseconds, it took to fetch a response from an origin. Specifically, it measures the amount of time between when the cloud load balancer forwards a request to an origin and when it receives a response.
-   **wa:** Indicates the `transformRequest` time, in milliseconds, as measured by a cloud worker.
-   **wp:** Indicates the fetch or proxy time, in milliseconds, as measured by a cloud worker.
-   **wr:** Indicates the amount of time, in milliseconds, that the cloud worker spent evaluating the route through which this request will be processed.
-   **wz:** If the route uses `transformResponse`, then this metric measures the `transformResponse` time in milliseconds.
-->

**Example:** The following sample {{ HEADER_PREFIX }}-t response header is for a Cloud Functions request:

`{{ HEADER_PREFIX }}-t: pt=2202,pc=1,pf=2201,wbt=1379,wbm=896,wm=162,wt=1062,wc=1,wg=1320,wl=1062`

We will now examine each metric defined within the above sample response header:

| Value | Description |
| -------------- | -------------- |
| `pt=2202`   | Indicates the total time from a cloud load balancer was 2,202 milliseconds.                    |
| `pc=1`     | Indicates the request count for a cloud load balancer was 1.                                 |
| `pf=2201`   | Indicates the fetch time from a cloud load balancer was 2,201 milliseconds.                 |
| `wbt=1379`  | Indicates that billed time for the {{ PRODUCT }} cloud was 1,379 milliseconds.                                |
| `wbm=896`  | Indicates that billed memory for {{ PRODUCT }} cloud was 896 Megabytes.                                |
| `wm=162`   | Indicates that memory usage for a cloud worker was 162 Megabytes. |
| `wt=1062`   | Indicates that the workload time for a cloud worker was 1,062 milliseconds.          |
| `wc=1`    | Indicates that this instance of {{ PRODUCT }} cloud was invoked 1 time.                    |
| `wg=1320`| Indicates that this instance of {{ PRODUCT }} cloud has been running for 1,320 seconds.                         |
| `wl=1062` | Indicates that the  total processing time for all cloud workers for all requests is 1,062 milliseconds. |

<a id="serverless-compute-cold-start-timing"></a>

## Cloud  - Cold Start Timing {/*serverless-cold-start-timing*/}

To calculate the Cloud cold start timing you must take the difference between `pf` and `wt` in the `{{ HEADER_PREFIX }}-t` header. `wt` is time taken for the Cloud worker to execute after it has started, this is can be read as the time is takes the project code to execute. If that seems large, evaluate the code within your project to see why this might be. To [track timings](/guides/performance#tracking-your-own-timings) for a function, it is possible to add specific code to do that.

Based on the example above, that would be `809 (pf) - 722 (wt) = 87ms`.

## Response Body {/*response-body*/}

Contains the data provided in response to the request.

For example, the response body for a `GET` request for a text file might look similar to the following:

```
Hello World!
```

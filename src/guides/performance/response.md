---
title: Response
---

Each request for your content will generate a response from a server. This response consists of:
-   [Protocol and version](#protocol-and-version)
-   [Status code](#status-codes)
-   [Response headers](#response-headers)
-   [Response body](#response-body)

## Protocol and Version {/*protocol-and-version*/}

Identifies the network protocol and version (e.g., HTTP/1.1) used to transmit the response to the client. This protocol and version typically matches the one defined in the request. If an invalid protocol or version was requested, then the response will return a `505 HTTP Version Not Supported`.

## Status Codes {/*status-codes*/}

[HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are how the web signals errors and other states from the server to the web browser. If there is an error from your backend website, the error is simply forwarded by {{ PRODUCT_NAME }} to the browser.

### {{ PRODUCT_NAME }} exclusive status codes {/*exclusive-status-codes*/}

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
| 539  | Project Timeout                        | The 539 status code is primarily caused by timeouts, but can also be caused by lack of allow lists (white lists) configured on your backend server. **Timeouts:** Your project's serverless code did not respond on time, either due to slow or blocking upstream or to badly handled asynchronous requests in code (e.g. missing `await` or call to `callback`). **Troubleshooting:** You can view the timings and status codes of the components in the stack in the [{{ HEADER_PREFIX }}-t header](#-t-response-header) Use [server logs](/guides/logs/server_logs) and [performance profiling](/guides/performance) to debug. You can also debug using information in [Troubleshooting 539 Status Codes](/guides/performance/troubleshooting#troubleshooting-539-status-codes), which includes information about detecting allow list errors. |
| 540  | Out of Memory                          | Your project's serverless code caused an out-of-memory situation. Use [server logs](/guides/logs/server_logs) to debug and lower the memory use.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 541  | {{ PRODUCT_NAME }} Out of Workers      | The traffic was so high that the request could not be scheduled for processing within the scheduling timeout. Please contact [support]({{ SUPPORT_URL }}) to upgrade your account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 542  | Project Header Overflow                | The {{ PRODUCT_NAME }} project's request or response had too many HTTP headers. See [limits](/guides/performance/limits)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 543  | Global Upstream Timeout                | The request failed to propagate between {{ PRODUCT_NAME }} edge and the global POP. Please contact [support]({{ HELP_URL }}).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 544  | Invalid Host Header                    | The {{ PRODUCT_NAME }} received a value in `host` header that is not a valid domain name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 545  | {{ PRODUCT_NAME }} Component Not Ready | An unprepared {{ PRODUCT_NAME }} component received traffic. Please contact [support]({{ HELP_URL }}) immediately.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 546  | {{ PRODUCT_NAME }} Global POP TLS Error | The was an error negotiating a secure TLS connection with the {{ PRODUCT_NAME }} global POP. Please contact [support]({{ HELP_URL }}) immediately. |
| 547  | {{ PRODUCT_NAME }} Global POP No HTTP Response | {{ PRODUCT_NAME }} did not receive an HTTP response from the global POP. Please contact [support]({{ HELP_URL }}) immediately. |
| 548  | {{ PRODUCT_NAME }} Global POP DNS Resolution Error | {{ PRODUCT_NAME }} failed to resolve the global POP's host name through DNS. Please contact [support]({{ HELP_URL }}) immediately. |

<!--
| 549 | {{ PRODUCT_NAME }} Captcha Served | Indicates that {{ PRODUCT_SECURITY_ADVANCED_BOT }} flagged a request as potential bot traffic. As a result, {{ PRODUCT }} served a CAPTCHA challenge instead of your site. Only visitors that can solve this challenge will be allowed to proceed to your site. |
-->

Obviously, your project can set status codes of their own, which may sometimes match codes above. We encourage you to avoid setting your own status code so as to lower troubleshooting overhead and other issues.

<a id="standard-status-codes"></a>

### Standard status codes used by {{ PRODUCT_NAME }} itself {/*standard-status-codes-used-by-itself*/}

{{ PRODUCT_NAME }} also issues these standard response codes:

| CODE | NAME                | DESCRIPTION                                                                                                                                                                                                                                                                                    |
| ---- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request         | The URL is too long or the request headers are too large. See [limits](/guides/performance/limits)                                                                                                                                                                                                         |
| 404  | Not Found           | The server cannot find the requested resource. This usually occurs when the browser requests a page that your app does not have. A 404 will also occur when a request does not match any of the routes in your {{ PRODUCT_NAME }} router. [Learn more.](/guides/performance/cdn_as_code). |
| 412  | Precondition Failed | This code is returned when the query string parameter `{{ COOKIE_PREFIX }}_prefetch` equals `1` and the content was not found in the edge cache.                                                                                                                                               |

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

### {{ PRODUCT }}-Specific Headers {/*-specific-headers*/}

{{ PRODUCT }}-specific headers are described below.

-   **x-cache: HIT:** Indicates that a cached version of the requested content was served directly to the client by an edge server.

    **Example:** `x-cache: HIT`

-  **x-ec-debug:** Contains the requested debug cache metadata when the [Debug Header feature](/guides/performance/rules/features#debug-header) has been enabled. [Learn more.](#requesting-debug-cache-information)

<!--
-   **{{ HEADER_PREFIX }}-caching-status:** Indicates cache status information. If the response was not cached or served from cache, then it will report the reason why it was not cached.

    **Example:** The following sample response header indicates that caching was explictly disabled for this request: 

    `{{ HEADER_PREFIX }}-caching-status: disabled`

    [Learn more.](/guides/performance/caching#why-is-my-response-not-being-cached)
-->
    <a id="-mr" />

-   **{{ HEADER_PREFIX }}-hit-request-id:** For responses served from cache, this header indicates the unique ID of the request that was cached on our CDN.

-   **{{ HEADER_PREFIX }}-mr:** Indicates one or more matched route(s). 

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

-   **{{ HEADER_PREFIX }}-request-id:** Indicates the request's unique ID.
-   **{{ HEADER_PREFIX }}-surrogate-key:** Contains a space-delimited list of surrogate keys (cache tags). <!-- surrogate keys can be injected when needed into your backend responses -->

    [Learn more.](/guides/performance/purging#surrogate-keys-cache-tags)

<!--
-   [{{ HEADER_PREFIX }}-t](#-t-response-header): Contains time measurements for each {{ PRODUCT }} component through which a request was routed. It also provides cache status information for edge and global POPs.
-->
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

<!--
-   [{{ HEADER_PREFIX }}-status](#-status-response-header): Contains a comma-delimited list of HTTP status codes for each POP component that processed the request.
-   **{{ HEADER_PREFIX }}-components:** Indicates the version for each POP component that processed the request and the environment ID. This response header is primarily meant for internal use when troubleshooting issues.

    **Example:** `{{ HEADER_PREFIX }}-components: eh=0.1.6,e=atl,ec=1.1.0,ed=1.0.1,gh=0.1.6,g=hef,gd=1.0.1,p=1.21.10,w=3.11.0,wi=e8ce8753-163d-4be9-a39e-40454ace5146,b=serverless`
-->

### Requesting Debug Cache Information {/*requesting-debug-cache-information*/}

The debug cache response headers provide additional information about the cache policy applied to the requested asset. The response sent from our edge servers to a user will only include debug cache response headers when the following conditions are true:

-   The [Debug Header feature](/guides/performance/rules/features#debug-header) has been enabled on the desired request.
-   The request sets a `x-ec-debug` header to the set of debug cache headers that will be included in the response.

**Syntax:** `x-ec-debug: <DEBUG CACHE HEADER>[,<DEBUG CACHE HEADER>,<DEBUG CACHE HEADER>]`

**Example:** `x-ec-debug: x-ec-cache,x-ec-check-cacheable,x-ec-cache-key,x-ec-cache-state`

Valid values for the `x-ec-debug` request header are provided below.

-   **x-ec-cache:** [Cache status code](#cache-status-code-information)
-   **x-ec-cache-remote:** [Cache status code](#cache-status-code-information)
-   **x-ec-check-cacheable:** [Cacheable](#cacheable-response-header)
-   **x-ec-cache-key:** [Cache key](#cache-key-response-header)
-   **x-ec-cache-state:** [Cache state](#cache-state-response-header)

#### Cache Status Code Information {/*cache-status-code-information*/}

The following response headers identify a server and how it handled the response:

-   **x-ec-cache:** This response header is reported whenever content is routed through the CDN. It identifies the edge server that fulfilled the request.

    **Syntax:** `x-ec-cache: <CACHE STATUS CODE> from ECAcc (<POP>/<ID>)`

    **Example:** `x-ec-cache: TCP_HIT from ECAcc (lga/0FE8)`

-   **x-ec-cache-remote:** This response header is only reported when the requested content was cached on an origin shield server.

    **Syntax:** `x-ec-cache: <CACHE STATUS CODE> from ECAcc (<POP>/<ID>)`

    **Example:** `x-ec-cache-remote: TCP_HIT from ECAcc (dca/EF00)`

The terms used in the above response header syntax are defined below:

-   **STATUS CODE:** Indicates how the requested content was handled by the CDN. This is represented through a cache status code.

    <Callout type="info">

      The `TCP_DENIED` status code may be reported instead of `NONE` when an unauthorized request is denied due to Token-Based Authentication. However, the `NONE` status code will continue to be used when viewing reports or raw log data.

    </Callout>

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

**Default syntax:** `//http/80<ACCOUNT ID>/<ORIGIN CONFIGURATION>/<DEPLOYMENT VERSION>/<RELATIVE PATH>:/hs-<URI HASH>`

Definitions for the above placeholder values are provided below.

| Placeholder  | Description  |
|---|---|
| `<ACCOUNT ID>`  | Indicates your unique customer account ID.   |
| `<ORIGIN CONFIGURATION>` | Indicates the name of the origin configuration associated with the request. <Callout type="info">Deploying a CDN-as-code configuration automatically generates the following system-defined origin configurations: `edgio_static`, `edgio_permanent_static`, `edgio_serverless`, and `edgio_image_optimizer`. Your CDN-as-code configuration  determines the origin configuration that will be applied to the cache key. View how {{ PRODUCT }} maps your code to these origin configurations from the **Rules** page. Returns `origin` when an origin configuration is inapplicable to a request.</Callout> |
| `<DEPLOYMENT VERSION>`  | Indicates the version of the deployment for the configuration that served the request whose response was cached. |
| `<RELATIVE PATH>`  | Indicates the relative path to the requested content. This relative path starts directly after the hostname. By default, query strings are ignored by the caching mechanism and therefore they will be excluded from the cache key. <Callout type ="info">If a query string is recorded in the cache key, it will be converted to its hash equivalent. After which, it will be inserted between the name of the requested asset and its file extension (e.g., asset**HashValue**.html).</Callout> |
| `<URI HASH>`  | Indicates a hash of the request URI. |

**Syntax:** `x-ec-cache-key: <CACHE KEY>`

**Example:** `x-ec-cache-key: //http/800001/web/21/images/foo.jpg:/hs-5041808438894094098`

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

<!--
### {{ HEADER_PREFIX }}-status Response Header {/*-status-response-header*/}

The `{{ HEADER_PREFIX }}-status` response header contains an HTTP status code for each POP component that processed the request. This comma-delimited list is presented sequentially according to the order in which POP components processed the request.

**Syntax:**
`{{ HEADER_PREFIX }}-status: <POP Component 1>=<Status Code 1>[,<POP Component 2>=<Status Code 2>,<POP Component n>=<Status Code n>]`

A POP component is identified through the following two abbreviations:
-    [Who handled the request.](#request-element)
-    [POP component.](#pop-component)

**Standard Traffic Example:**
The following sample response header indicates that the following POP components returned a `200 OK`: Edge POP's HAProxy, Edge POP's DPS, Global POP's HAProxy, and Global POP's DPS.

`{{ HEADER_PREFIX }}-status: eh=200,ed=200,gh=200,gd=200`

**Serverless Compute Example:**
The following sample response header indicates that the following POP components returned a `200 OK`: Edge POP's HAProxy, Edge POP's DPS, Global POP's HAProxy, Global POP's DPS, Serverless Compute (load balancer), and Serverless Compute (worker).

`{{ HEADER_PREFIX }}-status: eh=200,ed=200,gh=200,gd=200,p=200,w=200` <a id="structure-of--header_prefix--t"></a>

### {{ HEADER_PREFIX }}-t Response Header {/*-t-response-header*/}

The `{{ HEADER_PREFIX }}-t` response header contains time measurements for each {{ PRODUCT }} POP component through which a request was routed. It also provides cache status information for edge and global POPs. This data is presented sequentially according to the order in which POP components processed the request.

[Learn how {{ PRODUCT }} routes requests.](/guides/performance/request#request-flow)

<Callout type="info">

  When a request is reentrant, telemetry information is not duplicated; instead, each request logs its own telemetry but does not return it to the downstream {{ PRODUCT_NAME }} request. As a result, duplicate entries are not possible.

</Callout>

**Syntax:**

`{{ HEADER_PREFIX }}-t: <Metric 1>=<Value 1>[,<Metric 2>=<Value 2>,<Metric n>=<Value n>]`

Each metric is defined through a set of abbreviations. These abbreviations identify: <a id="request-element"></a>

-   Who handled the request:

    -   **e**: Edge POP
    -   **g**: Global POP

    <Callout type="info">

      If a global POP is the closest POP to the client, then it will act as both an edge and global POP. However, it will be assigned the `e` abbrevation instead of `g`.

      For example, you may typically measure an origin server's response time through `gdf` (Global POP's DPS Fetch Time). However, if a global POP is the closest POP to the client, then you should use `edf` instead since {{ PRODUCT }} will not return `gdf`.

    </Callout>

    -   **p**: Serverless Compute (load balancer)
    -   **w**: Serverless Compute (worker) <a id="pop-component"></a>

-   The POP component that processed the request:
    -   **h:** HAProxy (load balancer)
    -   **c:** Varnish (cache)
    -   **d:** Dynamic Proxy Service (DPS)
    -   **b:** Billing
    -   **k:** Kolben

-   The type of metric being measured:

    -   **c:** This abbreviation represents either of the following metrics:

        -   Cache status. Valid values are:

            -   **hit:** The response was served from cache.
            -   **miss:** The response was forwarded to the next hop in the route because a cached response with a valid time-to-live (TTL) was not found. This value, which may only be returned when `cached` or `pass` is inapplicable, typically indicates that the response contains a `set-cookie` header or its status code is `4xx` or higher.
            -   **cached:** The response was cached as a result of this request.
            -   **pass:** The route corresponding to this request or cache-specific response headers prohibit caching.

            For example, `gcc=miss` identifies a cache miss on a global POP. A global POP forwards requests that result in cache misses to either an origin server or Serverless Compute.

        -   Request count.

            For example, `pc=1` indicates the number of requests generated by the Serverless Compute (load balancer). A value greater than 1 indicates that the load balancer had to scale the request by adding it to a queue and then resubmitting it. Another example is `wc=19` which indicates that a Serverless Compute (worker) was invoked 19 times by this request.

    -   **d:** DNS lookup time in milliseconds.

        <Callout type="info">

          DPS uses DNS caching to accelerate requests. This means that DPS may frequently report a DNS lookup time of 0.

        </Callout>

        For example, `edd` identifies the DNS lookup time as measured by an edge POP's DPS.

    -   **f:** Fetch time in milliseconds. This metric measures the amount of time between when a POP component forwards a request and when it receives a response.

        For example, `gdf` indicates the amount of time between when a global POP's DPS forwarded a request to an origin server or Serverless Compute and when it started receiving a response.

    -   **g:** Age in seconds.

        For example, `wg=746940` indicates that the instance of the Serverless Compute (worker) that processed the request has been running for approximately 747 seconds.

    -   **l:** Sum of time in milliseconds.

        For example, `wl=30896` indicates the total processing time for all Serverless Compute (workers) for all requests is 30.8 seconds.

    -   **m:** Memory usage in Megabytes.

        For example, `wm=317` indicates that Serverless Compute (worker) used 317 Megabytes of memory for this request.

    -   **r:** Route evaluation in milliseconds.

        For example, `wr=1` indicates that Serverless Compute (worker) spent 1 millisecond evaluating the route through which this request will be processed.

    -   **t:** Total time in milliseconds. This metric measures the amount of time between the moment when the request was received to when a response was sent to the client.

        For example, `wbt` indicates billed time as measured by a Serverless Compute load balancer. This measurement includes Serverless Compute workload time and time spent capturing Serverless Compute log data.

    -   **u:** Upstream fetch time in milliseconds.

        For example, `pu` identifies the total time between when a Serverless Compute load balancer submitted a request defined within your application's code (e.g., fetch) and when it received a response.

    -   **cw:** Wait in the request coalescing queue.

        For example, `ecwt` identifies the total time the request spent waiting in the request coalescing queue on the edge POP. The analogue for the global POP is `gcwt`. These are useful to check when apparent cache hits have high total time. Those cases are actually due to request coalescing resulting in a cache hit.

#### Exceptions {/*exceptions*/}

Most metrics follow the above convention. However, there are some metrics that use a different convention. Here are a few common exceptions to the above convention:
-   **eh:** Identifies the total time, in milliseconds, as measured by an edge POP's HAProxy.
-   **gh:** Identifies the total time, in milliseconds, as measured by a global POP's HAProxy.
-   **dgpop:** Identifies the global POP to which an edge POP forwarded a request.
-   **wa:** Indicates the `transformRequest` time, in milliseconds, as measured by a Serverless Compute (worker).
-   **wp:** Indicates the fetch or proxy time, in milliseconds, as measured by a Serverless Compute (worker).

    <a id="wz"></a>
-   **wz:** Indicates either:

    -   **transformResponse:** If the route uses `transformResponse`, then this metric measures the `transformResponse` time in milliseconds.
    -   **Image Optimization:** If the route contains an image optimization tag, such as Next [Image](https://nextjs.org/docs/api-reference/next/image) or Nuxt [nuxt-img](https://image.nuxtjs.org/components/nuxt-img/),  instead of `transformResponse`, then this metric measures processing time in milliseconds.

#### Sample {{ HEADER_PREFIX }}-t Response Headers {/*sample-t-response-headers*/}

Sample response headers for both standard traffic and Serverless Compute are explained below.

##### Standard Traffic {/*standard-traffic*/}
The following sample {{ HEADER_PREFIX }}-t response header is for a request that was routed through an edge POP to a global POP:

`{{ HEADER_PREFIX }}-t: eh=325,ect=322,ecc=cached,edt=316,edd=0,edf=316,dgpop=hef,gh=7,gct=5,gcc=hit`

We will now examine each metric defined within the above sample response header:

| Value        | Description                                                                                              |
| -------------| ---------------------------------------------------------------------------------------------------------|
| `eh=325`     | Indicates the total time from an edge POP's HAProxy was 325 milliseconds.                                |
| `ect=322`    | Indicates the total time from an edge POP's Varnish (cache) was 322 milliseconds.                        |
| `ecc=cached` | Indicates that the edge POP's Varnish (cache) cached the response as a result of this request.           |
| `edt=316`    | Indicates the total time from an edge POP's DPS was 316 milliseconds.                                    |
| `edd=0`      | Indicates the DNS lookup time for an edge POP's DPS was 0 milliseconds. This typically means that DPS used DNS caching.   |
| `edf=316`    | Indicates the fetch time from an edge POP's DPS was 316 milliseconds.                                    |
| `dgpop=hef`  | Indicates that the edge POP forwarded the request to the HEF global POP.                                 |
| `gh=7`       | Indicates the total time from a global POP's HAProxy was 7 milliseconds.                                 |
| `gct=5`      | Indicates the total time from a global POP's Varnish (cache) was 5 milliseconds.                         |
| `gcc=hit`    | Indicates that the global POP's Varnish (cache) served the response from cache.                          |

##### Serverless Compute {/*serverless-compute*/}

The following sample {{ HEADER_PREFIX }}-t response header is for a Serverless Compute request. A Serverless Compute request is routed through an edge POP, global POP, and then to our Serverless Compute service. This request flow ensures optimal performance by serving requests from cache whenever possible.

`{{ HEADER_PREFIX }}-t: eh=1160,ect=1158,ecc=miss,edt=1152,edd=0,edf=1152,gh=869,gct=866,gcc=miss,gdt=853,gdd=0,gdf=853,pt=811,pc=1,pf=809,wbt=723,wm=317,wt=722,wc=19,wg=746940,wl=30896,wr=1,wp=705,wa=1,wz=1`

We will now examine each metric defined within the above sample response header:

| Value | Description |
| -------------- | -------------- |
| `eh=1160`  | Indicates the total time from an edge POP's HAProxy was 1160 milliseconds.|
| `ect=1158` | Indicates the total time from an edge POP's Varnish (cache) was 1158 milliseconds.  |
| `ecc=miss` | Indicates a cache miss on the edge POP's Varnish (cache). Requests that cannot be served from cached are forwarded to the global POP.  |
| `edt=1152` | Indicates the total time from an edge POP's DPS was 1152 milliseconds.                                    |
| `edd=0`    | Indicates the DNS lookup time for an edge POP's DPS was 0 milliseconds. This typically means that DPS used DNS caching.   |
| `edf=1152` | Indicates the fetch time from an edge POP's DPS was 1152 milliseconds.                                    |
| `gh=869`   | Indicates the total time from a global POP's HAProxy was 869 milliseconds.                                 |
| `gct=866`  | Indicates the total time from a global POP's Varnish (cache) was 866 milliseconds.                         |
| `gcc=miss` | Indicates that a cache miss on the global POP's Varnish (cache). Requests that cannot be served from cached are forwarded to Serverless Compute. |
| `gdt=853`  | Indicates the total time from a global POP's Varnish (cache) was 853 milliseconds.                          |
| `gdd=0`    | Indicates the DNS lookup time for a global POP's DPS was 0 milliseconds. This typically means that DPS used DNS caching.   |
| `gdf=853`  | Indicates the fetch time from a global POP's DPS was 853 milliseconds.                                    |
| `pt=811`   | Indicates the total time from a Serverless Compute (load balancer) was 811 milliseconds.                    |
| `pc=1`     | Indicates the request count for a Serverless Compute (load balancer) was 1.                                 |
| `pf=809`   | Indicates the fetch time from a Serverless Compute (load balancer) was 809 milliseconds.                 |
| `wbt=723`  | Indicates that billed time for Serverless Compute was 723 milliseconds.                                |
| `wm=317`   | Indicates that memory usage for a Serverless Compute (worker) was 317 MB. |
| `wt=722`   | Indicates that the workload time for a Serverless Compute (worker) was 722 milliseconds.          |
| `wc=19`    | Indicates that this instance of Serverless Compute was invoked 19 times.                    |
| `wg=746940`| Indicates that this instance of Serverless Compute has been running for 747 seconds.                         |
| `wl=30896` | Indicates that the  total processing time for all Serverless Compute (workers) for all requests is 30.8 seconds. |
| `wr=1`     | Indicates that Serverless Compute (worker) spent 1 millisecond evaluating the route through which this request will be processed. |
| `wp=705`   | Indicates the fetch or proxy time as measured by a Serverless Compute (worker) was 705 milliseconds.  |
| `wa=1`     | Indicates the `transformRequest` time as measured by a Serverless Compute (worker) was 1 millisecond. |
| `wz=1`     | Indicates either a `transformResponse` time or processing time in milliseconds. [Learn more.](#wz)
-->

## Serverless Compute - Cold Start Timing {/*serverless-compute-cold-start-timing*/}

To calculate the Serverless cold start timing you must take the difference between `pf` and `wt` in the `{{ HEADER_PREFIX }}-t` header. `wt` is time taken for the Serverless Compute worker to execute after it has started, this is can be read as the time is takes the project code to execute. If that seems large, evaluate the code within your project to see why this might be. To [track timings](/guides/performance#tracking-your-own-timings) for a function, it is possible to add specific code to do that.

Based on the example above, that would be `809 (pf) - 722 (wt) = 87ms`.

## Response Body {/*response-body*/}

Contains the data provided in response to the request.

For example, the response body for a `GET` request for a text file might look similar to the following:

```
Hello World!
```

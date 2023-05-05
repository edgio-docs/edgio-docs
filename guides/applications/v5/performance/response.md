---
title: Response
---

Each request for your content will generate a response from a server. This response consists of:
-   [Protocol and version](#protocol-and-version)
-   [Status code](#status-codes)
-   [Response headers](#reserved-response-headers)
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
| 531  | Project Upstream Connection Error | Your project failed to establish an upstream connection. This is different from 536 where your project timed out waiting for a response from the upstream. Common causes are the upstream host you specified in your project is incorrect, the DNS entry you defined points to the wrong server, your servers are not responding, or you need to add the {{ PRODUCT_NAME }} IP addresses to your allowlist. (Contact your operations team and ask them to add the IP addresses in [_Allowlisting_](/applications/production#allowing-ip-addresses) to your server's IP allowlist.) |
| 532  | Project Response Too Large             | Your project returned a response size greater than the allowed 6MB.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 533  | Project Upstream TLS Error             | The was an error negotiating a secure TLS connection with the upstream. Common causes are the host name provided does not match the name in the upstream TLS certificate, or the upstream TLS certificate has expired.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 534  | Project Error                          | Your project's serverless code has failed unexpectedly or has issued a malformed response. Use [server logs](/applications/logs#server-logs) to debug.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 535  | Unknown Project                        | The HTTP header `host` is missing or does not match any {{ PRODUCT_NAME }} deployment. Check your requesting URL and your project config.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <a id="536"></a> 536  | Project HTTP Response Timeout          | {{ PRODUCT_NAME }} did not receive an HTTP response from the upstream. Common causes are the upstream dropped the connection prematurely, the upstream application threw an exception, and the upstream took too long to respond.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 537  | Project DNS Resolution Error           | Failed to resolve the host name through DNS, which might indicate a problem with your DNS provider or incorrectly configured domain name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 538  | Project Request Loop                   | The {{ PRODUCT_NAME }} project exceeded the maximum level (3) of nested {{ PRODUCT_NAME }} requests. "Nested" means an {{ PRODUCT_NAME }} site is the upstream of itself or of another {{ PRODUCT_NAME }} site.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 539  | Project Timeout                        | The 539 status code is primarily caused by timeouts, but can also be caused by lack of allow lists (white lists) configured on your backend server. **Timeouts:** Your project's serverless code did not respond on time, either due to slow or blocking upstream or to badly handled asynchronous requests in code (e.g. missing `await` or call to `callback`). **Troubleshooting:** You can view the timings and status codes of the components in the stack in the [{{ HEADER_PREFIX }}-t header](/applications/response_headers#-t-response-header) Use [server logs](/applications/logs#server-logs) and [performance profiling](/applications/performance) to debug. You can also debug using information in [Troubleshooting 539 Status Codes](/applications/troubleshooting#troubleshooting-539-status-codes), which includes information about detecting allow list errors. |
| 540  | Out of Memory                          | Your project's serverless code caused an out-of-memory situation. Use [server logs](/applications/logs#server-logs) to debug and lower the memory use.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 541  | {{ PRODUCT_NAME }} Out of Workers      | The traffic was so high that the request could not be scheduled for processing within the scheduling timeout. Please contact [support]({{ SUPPORT_URL }}) to upgrade your account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 542  | Project Header Overflow                | The {{ PRODUCT_NAME }} project's request or response had too many HTTP headers. See [limits](/applications/limits)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
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
| 400  | Bad Request         | The URL is too long or the request headers are too large. See [limits](/applications/limits)                                                                                                                                                                                                         |
| 404  | Not Found           | The server cannot find the requested resource. This usually occurs when the browser requests a page that your app does not have. A 404 will also occur when a request does not match any of the routes in your {{ PRODUCT_NAME }} router. See [routing](/applications/routing) for more information. |
| 412  | Precondition Failed | This code is returned when the query string parameter `{{ COOKIE_PREFIX }}_prefetch` equals `1` and the content was not found in the edge cache.                                                                                                                                               |

## Reserved Response Headers {/*reserved-response-headers*/}

<Callout type="info">

  The `{{ HEADER_PREFIX }}-*` headers namespace is reserved for {{ PRODUCT_NAME }} internal use and setting them yourself, except where so noted, is unsupported. See [Prohibited Headers](/applications/performance#prohibited-headers) for more information.

</Callout>

-   `{{ HEADER_PREFIX }}-caching-status`: Indicates cache status information. If the response was not cached or served from cache, then it will report the reason why it was not cached.

    **Example:**

    The following sample response header indicates that caching was explictly disabled for this request:

    `{{ HEADER_PREFIX }}-caching-status: disabled`

   [Learn more.](/applications/caching#why-is-my-response-not-being-cached)
-   `{{ HEADER_PREFIX }}-components`: Indicates the version for each POP component that processed the request and the environment ID. This response header is primarily meant for internal use when troubleshooting issues.
<!-- `{{ HEADER_PREFIX }}-components: eh=0.1.6,e=atl,ec=1.1.0,ed=1.0.1,gh=0.1.6,g=hef,gd=1.0.1,p=1.21.10,w=3.11.0,wi=e8ce8753-163d-4be9-a39e-40454ace5146,b=serverless`
-->
-   `{{ HEADER_PREFIX }}-hit-request-id`: If the response is served from cache, this header indicates the unique ID of the request whose response was cached.
-   `{{ HEADER_PREFIX }}-request-id`: Indicates the request's unique ID.
-   [{{ HEADER_PREFIX }}-status](#-status-response-header): Contains a comma-delimited list of HTTP status codes for each POP component that processed the request.

-   `{{ HEADER_PREFIX }}-surrogate-key`: Contains a space-delimited list of surrogate keys (cache tags). <!-- that can be injected when needed into your backend responses -->

    [Learn more.](/applications/purging#surrogate-keys)
-   [{{ HEADER_PREFIX }}-t](#-t-response-header): Contains time measurements for each {{ PRODUCT }} component through which a request was routed. It also provides cache status information for edge and global POPs.
-   [{{ HEADER_PREFIX }}-version](#-version-response-header): Describes the {{ PRODUCT }} deployment.

### {{ HEADER_PREFIX }}-status Response Header {/*-status-response-header*/}

The `{{ HEADER_PREFIX }}-status` response header contains an HTTP status code for each POP component that processed the request. This comma-delimited list is presented sequentially according to the order in which POP components processed the request.

**Syntax:**
`{{ HEADER_PREFIX }}-status: <POP Component 1>=<Status Code 1>[,<POP Component 2>=<Status Code 2>,<POP Component n>=<Status Code n>]`

A POP component is identified through the following two abbreviations:
-    [Who handled the request.](#request-element)
-    [POP component.](#pop-component)

<!--
**Standard Traffic Example:**
The following sample response header indicates that the following POP components returned a `200 OK`: Edge POP's HAProxy, Edge POP's DPS, Global POP's HAProxy, and Global POP's DPS.

`{{ HEADER_PREFIX }}-status: eh=200,ed=200,gh=200,gd=200`

**Serverless Compute Example:**
The following sample response header indicates that the following POP components returned a `200 OK`: Edge POP's HAProxy, Edge POP's DPS, Global POP's HAProxy, Global POP's DPS, Serverless Compute (load balancer), and Serverless Compute (worker).

`{{ HEADER_PREFIX }}-status: eh=200,ed=200,gh=200,gd=200,p=200,w=200` <a id="structure-of--header_prefix--t"></a>
-->

### {{ HEADER_PREFIX }}-t Response Header {/*-t-response-header*/}

The `{{ HEADER_PREFIX }}-t` response header contains time measurements for each {{ PRODUCT }} POP component through which a request was routed. It also provides cache status information for edge and global POPs. This data is presented sequentially according to the order in which POP components processed the request.

[Learn how {{ PRODUCT }} routes requests.](/applications/performance/request#request-flow)

<!--
<Callout type="info">

  When a request is reentrant, telemetry information is not duplicated; instead, each request logs its own telemetry but does not return it to the downstream {{ PRODUCT_NAME }} request. As a result, duplicate entries are not possible.

</Callout>
-->

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
<!--
    -   **h:** HAProxy (load balancer)
    -   **c:** Varnish (cache)
-->

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
<!--
-   **eh:** Identifies the total time, in milliseconds, as measured by an edge POP's HAProxy.
-   **gh:** Identifies the total time, in milliseconds, as measured by a global POP's HAProxy.
-->

-   **dgpop:** Identifies the global POP to which an edge POP forwarded a request.
-   **wa:** Indicates the `transformRequest` time, in milliseconds, as measured by a Serverless Compute (worker).
-   **wp:** Indicates the fetch or proxy time, in milliseconds, as measured by a Serverless Compute (worker).

    <a id="wz"></a>
-   **wz:** Indicates either:

    -   **transformResponse:** If the route uses `transformResponse`, then this metric measures the `transformResponse` time in milliseconds.
    -   **Image Optimization:** If the route contains an image optimization tag, such as Next [Image](https://nextjs.org/docs/api-reference/next/image) or Nuxt [nuxt-img](https://image.nuxtjs.org/components/nuxt-img/),  instead of `transformResponse`, then this metric measures processing time in milliseconds.

<!--
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

### {{ HEADER_PREFIX }}-version Response Header {/*-version-response-header*/}

The `{{ HEADER_PREFIX }}-version` response header describes the latest {{ PRODUCT }} deployment using the following syntax:

`{{ HEADER_PREFIX }}-version: <Deployment Number> <Package Version> <Environment Version> <Deployment Timestamp> <Compiler Version>`

Definitions for the above variables are provided below.
-   **&lt;Deployment Number&gt;:** Identifies a deployment by its version number.
-   **&lt;Package Version&gt;:** Indicates the {{ PRODUCT }} package version.
-   **&lt;Environment Version&gt;:** Identifies an environment by its version number.
-   **&lt;Deployment Timestamp&gt;:** Indicates the date and time (UTC; 24-hour clock) at which your site was deployed.

    **Syntax:**
    `YYYY-MM-DDThh:mm:ss.msZ`
-   **&lt;Compiler Version>:** Indicates the {{ PRODUCT }} compiler version through which your site was compiled.

**Example:**

`x-0-version: 23 4.17.1 3 2022-09-15T12:54:14.721Z 1.5.0`

## Server Timing Response Header {/*server-timing-response-header*/}

{{ PRODUCT }} adds the following values to the standard [server-timing](https://www.w3.org/TR/server-timing/) response header:

-   `{{ PRODUCT_NAME_LOWER }}-cache: <Cache Status>`: Valid cache statuses are:
    - `HIT-L1`: Indicates that the request was served from an edge POP's cache.
    - `HIT-L2`: Indicates that the request was served from a global POP's cache.
    - `MISS`: Indicates that the request was not served from cache.
-   `country: <Country Code>`: Indicates the two-letter code for the country from which the request was sent.
-   `xrj: <Route>`: Indicates the route that {{ PRODUCT }} mapped to the request. This route is serialized into JSON.

## Serverless Compute - Cold Start Timing {/*serverless-compute-cold-start-timing*/}

To calculate the Serverless cold start timing you must take the difference between `pf` and `wt` in the `{{ HEADER_PREFIX }}-t` header. `wt` is time taken for the Serverless Compute worker to execute after it has started, this is can be read as the time is takes the project code to execute. If that seems large, evaluate the code within your project to see why this might be. To [track timings](/applications/performance#tracking-your-own-timings) for a function, it is possible to add specific code to do that.

Based on the example above, that would be `809 (pf) - 722 (wt) = 87ms`.

## Response Body {/*response-body*/}

Contains the data provided in response to the request.

For example, the response body for a GET request for a text file might look similar to the following:

```
Hello World!
```

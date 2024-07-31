---
title: Troubleshooting
---

Troubleshoot:

-   [General issues](#general-troubleshooting-procedures)
-   [Caching](#caching)
-   [Performance](#performance)
-   [Image Optimization](#image-optimization)
-   [Status codes](#status-codes)

[Learn more about our troubleshooting tools.](#troubleshooting-tools)

## General Troubleshooting {/*general-troubleshooting-procedures*/}

If you encounter unexpected behavior or an issue, you should:

1.  Verify that all of your traffic is being served through the [most recently deployed environment](#environment-version).
2.  Verify that the only [desired set of rules are being applied](#applied-rules) to the request experiencing unexpected behavior.
3.  [Test your site using a permalink.](#test-without-cached-content) This ensures that the unexpected behavior is not due to cached content.
4.  [Review Edge Insights data.](#review-edge-insights-data)

#### Environment Version {/*environment-version*/}

Delays in configuration propagation may cause {{ PRODUCT }} to serve some requests using an older configuration. Upon detecting unexpected behavior, it is important to verify that all requests are using the latest environment version.

1.  Find the environment version through which a request was served by checking the **Environment** column from within the [{{ CHROME_EXTENSION }}](/applications/performance/observability/developer_tools_chrome_extension).
2.  Find the latest environment version from within the {{ PORTAL }} by navigating to the desired environment, clicking **Deployments**, and then checking the **Environment** column.

For example, the {{ CHROME_EXTENSION }}'s **Environment** column should report `v3` for requests to a website powered by the following production environment:

![Sample deployments](/images/v7/performance/deployments-cropped.png?width=450)

#### Applied Rules {/*applied-rules*/}

Verify that the desired set of rules are being applied to the request by performing the following steps:

1.  Find out the set of rules that were applied to the request by checking the **Matched Rules** column within the {{ CHROME_EXTENSION }}.

    For example, the following illustration indicates that rules 0, 2, 3, and 13 were applied to a request:

    ![Matched rules](/images/v7/performance/developer-tools-matched-rules.png)

2.  Look up those rules from within the **Rules** page  of the {{ PORTAL }}.

    ![Rules page showing rule numbers](/images/v7/performance/rules-rule-numbers.png)

**Key information:**

-   Click on the `Show Rule Numbers` link to display rule numbers next to each rule.
-   Rules use zero-based numbering.
-   Use the above procedure even if you are using CDN-as-code.

    {{ PRODUCT }} automatically adds system-defined rules when you deploy your CDN-as-code configuration. As a result, counting rules within your {{ ROUTES_FILE }} will be inaccurate.

#### Test Without Cached Content {/*test-without-cached-content*/}

Use a permalink to ensure that {{ PRODUCT }} does not serve cached content when testing your website. A permalink forces {{ PRODUCT }} to proxy your request to either the {{ PRODUCT }} cloud or your origin. Although this may degrade performance, it is useful when verifying functionality.

A permalink is assigned to each deployment. View a deployment's permalink by navigating to the **Deployments** page for the desired environment and then clicking on the desired deployment version.

#### Review Edge Insights Data {/*review-edge-insights-data*/}

Edge Insights provides near real-time data for an environment's traffic over the last 6 hours through the Access Logs data source.

-   Review the timeline graph to identify issues and analyze performance. Sample use cases are provided below.
    -   Identify sudden spikes or drops in traffic.

        Once you have identified a questionable traffic spike, determine whether it is legitimate traffic by reviewing key metrics, such as the country of origin, URL path, and query strings.

    -   Identify sudden spikes in 4xx and 5xx traffic.
        1.  From the **Top Results** section, verify that `HTTP Status Code` has been selected for one of the pie charts.
        2.  From the **Timelines** section, click the **HTTP Status Code** source.
            ![Timelines - HTTP Status Code source](/images/v7/performance/edge-insights-source-http-status-code.png)
        3.  Once you have identified a spike, [analyze the corresponding log data](#status-codes) to gain insight into a specific status code.
    -   Identify caching trends.
        1.  From the **Top Results** section, verify that `Cache Status` has been selected for one of the pie charts.
        2.  From the **Timelines** section, click the **Cache Status** source.
-   Review log data to troubleshoot an issue.

    For example, if you are able to reproduce an issue on your local machine and require more information than is available through the {{ CHROME_EXTENSION }}, then you may view log data for these requests from within Edge Insights. One method for analyzing these requests is to:

    1.  Configure a catch-all rule to set a response header to the request's ID through the `%{http_x_ec_uuid}` feature variable.
        ![Add Response Header feature](/images/v7/performance/rules-add-response-header-x-request-id.png?width=450)
    2.  Find out the ID corresponding to a request issued from your local machine.
        1.  From the desired browser, open developer tools.
        2.  From the browser, issue a request.
        3.  From within developer tools, inspect the request to find out the request's ID.
            ![Chrome Developer Tools - Headers](/images/v7/performance/chrome-dev-tools-x-request-id.png)
    3.  [Filter Edge Insights](/applications/performance/observability/edge_insights#manual-filtering) by that ID (i.e., `Event ID = <EVENT ID>`).
        ![Filtering by Event ID](/images/v7/performance/edge-insights-filters-event-id.png)
    5.  From the **Logs** section, click on the log entry to view the log fields associated with the request.
        ![Log entry](/images/v7/performance/edge-insights-logs.png)

## Caching {/*caching*/}

Use the [{{ CHROME_EXTENSION }}](/applications/performance/observability/developer_tools_chrome_extension) to troubleshoot caching behavior.

#### Overall Cache Performance {/*overall-cache-performance*/}

View overall cache performance by checking the **Edge Hits** statistic at the bottom of the {{ CHROME_EXTENSION }}.

![Edge Hits](/images/v7/performance/developer-tools-edge-hits.png)

#### Cache Responses {/*cache-responses*/}

Check whether a request was served from cache through the **Cache Status** column. Look for one of the following values:

    -   **Hit (`COMPONENT`):** Indicates that the request was served from cache from either our network (Edge) or a service worker's local cache (Service Worker).

    -   **Miss (`COMPONENT`):** Indicates that {{ PRODUCT }} [could not find a cached version](#cache-miss) of the requested content with a valid time-to-live (TTL) from either our network (Edge) or a service worker's local cache (Service Worker).

    -   **No-Cache (Edge):** Indicates that a cache content freshness check was not performed. This check is skipped when an HTTP request method is used that bypasses cache (e.g., `PUT`, `DELETE`, etc).

    -   **Disabled (Edge):** Indicates that caching was disabled through the [Bypass Cache feature](/applications/performance/rules/features#bypass-cache).

        If this behavior is undesired, [review the rules applied to this request](#applied-rules).

    -   **Blank:** A blank value indicates that the request was either not served through {{ PRODUCT }} or it was served through a different property or environment on which the Debug Header feature has not been enabled.

#### Cache Miss {/*cache-miss*/}

Review the following items to find out why a request resulted in a cache miss.

-   By default, content is only cached when the response from the origin includes a caching policy. Additionally, some content types may require 2 requests before they are eligible to be cached.

    [View our default caching policy.](/applications/performance/caching#default-caching-policy)

-    If you have defined a custom cache policy through a rule, then you should [review the rules applied to this request](#applied-rules).

-   If your origin defines a custom cache policy through headers, then you should click on the desired request and then check the **Response Headers** section for [cache directives](/applications/performance/caching#cache-directives)

-   {{ PRODUCT }} associates each request with a cache key. {{ PRODUCT }} then uses this cache key to identify whether content has been cached for this request. By default, this cache key includes the query string. This configuration is ideal for a website that uses the query string to determine the content that will be served. For other sites, this can lead to cache fragmentation and a higher rate of cache misses.

    Customize the cache key to exclude query string parameters:

    -   **Rules:** Create or modify a rule that includes the  [Cache Key](/applications/performance/rules/features#cache-key) feature. Configure this feature's **Query Parameters** option to either exclude all query string parameters or to only include specific parameters.

        ![Cache Key feature set to exclude all query string parameters](/images/v7/performance/cache-key-exclude-all-qs.png?width=450)

    -   **CDN-as-Code:**

        ```js filename="./routes.js"
        export default new Router().always({
          caching: { cache_key: { exclude_all_query_params: true } },
        });
        ```

    **Key information:**

    -   If you must add query string parameters to the cache key, we recommend that you restrict it to the parameters that are critical to your business needs. This recommendation ensures optimal performance by allowing our CDN to serve more requests from cache.
    -   If you are unsure as to whether you have already defined a custom cache key, then you should review your rules for [features that modify the cache key](/applications/performance/caching/cache_key#customizing-the-cache-key).

## Website Performance {/*performance*/}

Use the [{{ CHROME_EXTENSION }}](/applications/performance/observability/developer_tools_chrome_extension) to troubleshoot performance.

#### Overall Performance {/*overall-performance*/}

View overall performance statistics at the bottom of the {{ CHROME_EXTENSION }}.
-   **TTFB:** [Time to First Byte](https://web.dev/articles/ttfb).
-   **LCP:** [Large Contentful Paint](https://web.dev/articles/lcp)
-   **INP:** [Interaction to Next Paint](https://web.dev/articles/inp)
-   **CLS:** [Cumulative Layout Shift](https://web.dev/articles/cls)
-   **FID:** [First Input Delay](https://web.dev/articles/fid)
-   **Edge Hits:** Indicates the number of requests served from cache and the total number of requests issued for the current page that were captured by {{ CHROME_EXTENSION }}. As noted above, it will only capture requests issued while the **Edgio** tab is active.
-   **Prefetches:** Indicates the number of successful prefetch requests and the total number of prefetch requests issued for the current page that were captured by {{ CHROME_EXTENSION }}. As noted above, it will only capture requests issued while the **Edgio** tab is active.

#### Request-Specific Performance {/*request-specific-performance*/}

View request-specific performance statistics by checking:
-   The **TTFB** column for a high value. This column measures time to first byte. This metric is indicative of responsiveness.
-   The **Total Time** column for a high value. This column measures the total amount of time it took to serve a response to the client.

#### Predictive Prefetching {/*predictive-prefetching*/}

Assess overall prefetching performance by checking the **Prefetches** statistic at the bottom of the {{ CHROME_EXTENSION }}.

![Prefetches](/images/v7/performance/developer-tools-prefetches.png)

By default, you may only prefetch content that is cached on the POP closest to the user and that still has a valid TTL. By default, {{ PRODUCT }} responds with a [412 Precondition Failed status code](#412-precondition-failed-status-code) for prefetch requests that result in a cache miss. This default configuration ensures that your origin servers do not experience additional load due to predictive prefetching.

Identify prefetch requests through the following query string parameter: `{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`.

**Example:** `https://cdn.example.com/css/styles.css?edgio_dt_pf=1&edgio_prefetch=1`

## Image Optimization {/*image-optimization*/}

Troubleshoot Image Optimization issues through the following procedure:

1.  Verify that Image Optimization processed the image by checking for the `x-edgeio-status` response header. 
2.  Check for warnings or errors.
3.  Analyze the source and output image.

#### Missing X-Edgeio-Status Header {/*missing-x-edgeio-status-header*/}

If the `x-edgeio-status` header is missing from the response, then Image Optimization did not process the image. Check the response's status code.

-   **2xx or 3xx Response:** Verify that the rule that enables Image Optimization was [applied to the request](#applied-rules). 
-   **5xx Response:** {{ PRODUCT }} was unable to communicate with your origin server and both the source and optimized image were not previously cached. Check your origin server's availability.
    
#### Check for Warnings and Errors {/*check-for-warnings-and-errors*/}

Check the `x-edgeio-status` header to determine whether Image Optimization returned a warning or error.

-   **OK:** Image Optimization performed one or more optimizations. 

    Check for an `x-edgeio-warning` response header to find out whether one or more optimizations were skipped. Troubleshoot warnings by analyzing image metadata.

-   **ERROR:** Perform the following steps:
    -   Check for a `400 Bad Request` response. This type of response indicates that {{ PRODUCT }} was unable to optimize the requested image due to an unsupported query string parameter or value. Fix the request URL's query string and then try again. 
    -   Check the `x-edgeio-error` response header to find out how the [optimized image exceeded our limits](/applications/performance/image_optimization#image-requirements). 

#### Image Metadata Analysis {/*image-metadata-analysis*/}

By default, {{ PRODUCT }} does not provide information about the source or output image. Include this information by setting the following header within a request to optimize an image: `x-ec-edgeio-debug: info`

The response for such a request includes a `x-edgeio-info` response header. Use this header to analyze basic properties for the source and transformed image.

[Learn more about the x-edgeio-info response header.](/applications/performance/image_optimization#troubleshooting)

## Status Codes {/*status-codes*/}

Gain insight into why {{ PRODUCT }} returned a specific status code by filtering Edge Insights by the desired status code and then reviewing log data.

1.  [Load the desired environment-specific Edge Insights page.](/applications/performance/observability/edge_insights#basic-usage)
2.  Verify that the **Data Source** option is set to `Access Logs`.
3.  Scroll down to the **Top Results** section.
4.  Verify that `HTTP Status Code` has been selected for one of the pie charts.
5.  From within the pie chart, click on the desired status code. The entire dashboard will be filtered by that status code.
6.  Scroll down to the **Logs** section.
7.  Inspect each request to gain insight into why this status code is occurring.

    <Callout type="tip">

      Filter for a specific field by typing the desired name in the upper-right hand search bar.

    </Callout>

Troubleshoot the following common status codes:

-   [404 Not Found](#404-not-found-status-code)
-   [412 Precondition Failed](#412-precondition-failed-status-code)
-   [502 Bad Gateway](#502-bad-gateway-status-code)
-   [531 Project Upstream Connection Error](#531-project-upstream-connection-error-status-code)
-   [539 Project Timeout](#troubleshooting-539-status-codes)

[Learn about other status codes.](/applications/performance/response#status-codes)

### 404 Not Found Status Code {/*404-not-found-status-code*/}

Troubleshoot this status code by performing the following steps:

-   Use Edge Insights, [as described above](#status-codes), to identify the URL and the referrer from which the request originated. Check the `url` and the `referer` field, respectively.
-   If the resource exists, use the [{{ CHROME_EXTENSION }}](/applications/performance/observability/developer_tools_chrome_extension) to find out which [rules were applied to the request](#applied-rules). Review those rules to identify how the request is being manipulated.

### 412 Precondition Failed Status Code {/*412-precondition-failed-status-code*/}

By default, {{ PRODUCT }} will only serve prefetch requests from the edge cache. If a request cannot be served from the cache, a `412 Precondition Failed` status code is returned. This protects your origin servers from additional traffic associated with prefetching.

Perform the following steps to reduce excessive `412 Precondition Failed` responses:

1.  Ensure that the URLs being prefetched are similar to those fetched during page navigation.

    Prefetch URLs contain the following query string parameters: `{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`. These parameters are automatically excluded from the cache key. Verify that this is the only difference between URLs that are prefetched and those that are requested through standard page navigation.

2.  Apply the [Stale While Revalidate (stale_while_revalidate) feature](/applications/performance/rules/features#stale-while-revalidate) to URLs that will be prefetched.

    -   **Rules Example:**

        ![Sample rule with the Stale While Revalidate feature](/images/v7/performance/troubleshooting-412-stale-while-revalidate.png?width=450)

    -   **CDN-as-Code Example:**

        ```js filename="routes.js"
        router.get('/p/:productId', {
          caching: {
            max_age: '1h',
            service_worker_max_age: '1h',
            stale_while_revalidate: '1d', // this way stale items can still be prefetched
          }
        });
        ```

3. Consider increasing the [Set Max Age (max_age) feature](/applications/performance/rules/features#set-max-age). Short time to live (TTL) intervals generate more prefetch failures.
4.  Prefetch cache misses.

    <Callout type="warning">

      Use this capability with caution since it may significantly increase the traffic to your origin or API servers.

    </Callout>

    -   **HTML Script Tag Example:**

        ```html
        <script src="/__edgio__/prefetch/install.js" data-include-cache-misses="true" defer></script>
        ```

    -   **{{ PRODUCT }} {{ PRODUCT_PLATFORM }} Example:**

        ```js filename="app.js"
        import install from '{{ PACKAGE_NAME }}/prefetch/window/install';

        // Call the following once when the page loads to allow prefetch requests to be served when responses
        // aren't available in the edge cache:
        install({includeCacheMisses: true});
        ```

### 502 Bad Gateway Status Code {/*502-bad-gateway-status-code*/}

Troubleshoot this status code by performing the following steps:

-   Identify the origin configuration that is returning a `502 Bad Gateway`. Request the origin directly to verify that it is available.

    **Example:** If your origin configuration points to `origin-1.example.com`, then you could potentially verify that this origin is available by submitting the following request:

    `https://origin-1.example.com/`

-   Check whether your site requires SNI by reviewing your server's configuration or log data.

    Alternatively, there are online tools (e.g., [Qualys SSL Labs](https://www.ssllabs.com/ssltest/)) that allow you to check whether your site requires SNI. Submit your origin's hostname to start the test. Once the test is complete, check whether your server requires SNI. For example, SSL Labs returns the following message within the summary section: `This site works only in browsers with SNI support.`

    Your origin configuration setup varies according to whether your site requires SNI.

    -   **SNI:** If your site requires SNI, then you should enable your origin configuration's **Use SNI** option and verify that the SNI hint is set to a hostname defined within your certificate’s Subject Alternative Name (SAN) or Common Name (CN).

    <Callout type="info">

      If your site requires SNI and your origin configuration is misconfigured, then Edge Insights will return a `proxy_hard_error` field set to `HARD_ERR_502_SSL_CONNECT_ERROR`. A quick way of checking for this condition is to [filter Edge Insights](#status-codes) by the `502 Bad Gateway` status code and then viewing a request from within the **Logs** section.

    </Callout>

    -   **No SNI:** If your site does not require SNI, then you should disable your origin configuration's **Use SNI** option and remove the SNI hint.

-   If the client's `Host` header does not match a hostname defined within your certificate’s Subject Alternative Name (SAN) or Common Name (CN), then you will need to update the **Override Host Header** option.
-   Is your server using a self-signed certificate?
    -   **Yes:** You must enable the **Allow Self-Signed Certs** option on the desired origin configuration.
    -   **No:** {{ PRODUCT }} requires a full chain certificate. Your certificate’s chain of trust must start with the server's certificate and terminate with the root certificate.
-   If you have pinned a certificate to the desired origin configuration, then you may need to pin an additional certificate.

### 504 Gateway Timeout Status Code {/*504-gateway-timeout-status-code*/}

Troubleshoot this status code in the same manner as a [502 Bad Gateway status code](#502-bad-gateway-status-code).

### 531 Project Upstream Connection Error Status Code {/*531-project-upstream-connection-error-status-code*/}

Common causes are:

-   The upstream host you specified in your project is incorrect.
-   The DNS entry you defined points to the wrong server.
-   Your servers are not responding.
-   You need to add the {{ PRODUCT }} IP addresses to your allowlist. Contact your operations team and ask them to add [our IP addresses](/applications/basics/serving_traffic#firewall-allowing-ip-addresses) to your firewall's IP allowlist.

### 539 Project Timeout Status Code {/* troubleshooting-539-status-codes */}

Your project's {{ PRODUCT }} cloud code did not respond on time. This issue typically arises in step 4 or 5 of the following request flow:

1.  A requesting client sends a request to {{ PRODUCT }} for an asset.
2.  {{ PRODUCT_NAME }} does not find it in its cache and examines routing rules.
3.  {{ PRODUCT_NAME }} sends requests to server-side rendering (SSR) code.
4.  The SSR code makes calls to the customer backend to get data needed for the page.
5.  The SSR assembles the page and sends it to the {{ PRODUCT_NAME }} edge.
6.  The {{ PRODUCT_NAME }} edge caches the page and returns it to the client.

This issue may be due to:

- An error in your SSR code. For example, your asynchronous requests may be missing `await` or call to `callback`.
- A backend error (server overloaded or offline).
- An allowlist issue.

Troubleshoot this status code by:

-   Viewing the timings and status codes of the components in the stack in the [{{ HEADER_PREFIX }}-t header](#-t-response-header).
-   Analyzing [server logs](/applications/logs/server_logs).
-   Performing [performance profiling](/applications/performance/observability#tracking-your-own-timings)
-   Detecting allowlist errors.
-   Loading source maps within our {{ PRODUCT }} cloud infrastructure. If this occurs, try again with sourcemaps disabled.

#### Allowlist {/* allowlist-overview */}

When you run your site on {{ PRODUCT_NAME }}, all requests come in through four IP addresses, and servers are programmed to interpret this as a DDoS attack. At this point, the server either blocks or rate-limits the requests. In either case, timeouts occur and 539 errors are returned.

A typical pattern is that your site works fine for a few days after deploying to {{ PRODUCT_NAME }}, then your server starts interpreting the requests as a DDoS attack.

To prevent this scenario, you must configure your server with allowlisted {{ PRODUCT_NAME }} IP addresses.

[Learn more.](/applications/basics/serving_traffic#firewall-allowing-ip-addresses)

#### Procedure {/* procedure */}

When you are testing a web page, you might encounter 539 status code errors. You might also see the errors in logs.

1.  Open your project in {{ PRODUCT_NAME }}, then drill down to the deployment that is experiencing the 539 errors.
<!-- ![](/images/539-errors/deployments-tab.png?width=1000) -->
1.  Click the _SERVER_ tab header at the bottom of the page, then click the _Resume logs_ arrow or the _Logging is paused_ link to resume logging.
<!-- ![](/images/539-errors/resume-logging.png?width=1000) -->

If you see 539 errors, the issue could be any of the following:

- An error in your SSR code
- A problem with the backend server
- An allowlist error

#### Good Request Example {/* good-request-example */}

Before continuing, it is helpful to see what a good request and response flow looks like. A request with no errors has four lines:

![](/images/539-errors/good-request.png?width=1000)

| Line | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Summary line.                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2    | The request from {{ PRODUCT }} to your SSR code. The line ends with a `200`, indicating success.                                                                                                                                                                                                                                                                                                                  |
| 3    | The request from your SSR code to your backend server. If this line ends with a `<status code> in XXms`, then the SSR received a response from your backend server. In this example the HTTP status code was `200`, indicating success. If the line does not end with a `<status code> in XXms`, there was a problem with the request to your backend server (see [Backend Server Error](#backend-server-error)). |
| 4    | The response from the SSR to the browser, and ends with the status code for the response. If this line is present, the SSR code ran to completion. If this line is missing there was a problem (see [Error in SSR Code](#error-in-ssr-code)).                                                                                                                                                                     |

#### Error in SSR Code {/* error-in-ssr-code */}

If a request looks like the following, your SSR code contains an error.

![](/images/539-errors/SSR-code-error.png?width=1000)

| Line | Description                                                                           |
| ---- | ------------------------------------------------------------------------------------- |
| 1    | Summary line.                                                                         |
| 2    | The request from the {{ PRODUCT }} edge to your SSR code. The line ends with a `200`. |
| 3    | The request from your SSR code to your backend server. The line ends with a `200`.    |

<Callout type="info">

  There is no response from the SSR code to the browser as shown in line 4 in [Good Request Example](#good-request-example). Troubleshoot your code and fix the error. Common errors are that your SSR code:

</Callout>

- Took too long to return a response
- Threw an exception and never returned a response

#### Backend Server Error {/* backend-server-error */}

If a request looks like the following, your backend server is either down, overloaded or has an allowlist error.

![](/images/539-errors/backend-server-error.png?width=1000)

| Line | Description                                               |
| ---- | --------------------------------------------------------- |
| 1    | Summary line.                                             |
| 2    | The request from the {{ PRODUCT }} edge to your SSR code. |
| 3    | The request from your SSR code to your backend server.    |

_Note:_ If line 3:

- Ends in a status code other than `200`, then the SSR code received a non-`200` code from the backend server.
- Does not end in a status code at all, then the SSR did not receive a response from the backend and the problem can be either an allowlist error or a timeout error. See "Distinguishing an Allow List Error from a Timeout Error." See [Distinguishing an Allowlist Error from a Timeout Error](#distinguishing-an-allowlist-error-from-a-timeout-error).

#### Distinguishing an Allowlist Error from a Timeout Error {/* distinguishing-an-allowlist-error-from-a-timeout-error */}

To determine if there is an allowlist error, do the following:

1. Expand line 3 (request from your SSR code to your backend server) and select `COPY AS CURL`

![](/images/539-errors/copy-as-curl.png?width=1000)

2. Run the `curl` command. (The command runs the same request that the SSR code made to the backend server, but from your local machine.)

The outcome will be either [SSR code error](#ssr-code-error) or an [allowlist error](#allowlist-error).

#### SSR Code Error {/* ssr-code-error */}

If the command fails or does not respond, there is an error in your code, most likely a badly formed request.

Troubleshoot your code to find and fix the error.

#### Allowlist Error {/* allowlist-error */}

If the command succeeds and finishes quickly, it is probably an allowlist error.
Contact your operations team and ask them to add the IP addresses in [_Allowlisting_](/applications/basics/serving_traffic#firewall-allowing-ip-addresses) to your server's IP allowlist.

## Edge Functions {/*edge-functions*/}

Analyze the performance of your edge function(s) by reviewing performance and custom metrics from within Edge Insights.

1.  [Load the desired environment-specific Edge Insights page.](/applications/performance/observability/edge_insights#basic-usage)
2.  Verify that the **Data Source** option is set to `Access Logs`.
3.  Scroll down to the **Top Results** section.
4.  Set one of the pie charts to the desired Edge Functions metric. These metrics start with `Edge Function`.
5.  From the **Timelines** section, click the source corresponding to the metric selected in the previous step.
6.  Optional. Filter the report to a specific edge function (i.e., `Edge Function Name = <edge_function PROPERTY>`).
    ![Filtering by edge function](/images/v7/performance/edge-insights-filters-ef.png)
7.  Analyze trends.

## Troubleshooting Tools {/*troubleshooting-tools*/}

Troubleshoot delivery and performance issues using the following tools:

| Tool                                                                                         | Description                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [{{ CHROME_EXTENSION }}](/applications/performance/observability/developer_tools_chrome_extension) | This Chrome extension describes each request associated with the current page. Use this information to gain insight into delivery issues, caching, and performance.                                   |
| [Edge Insights](/applications/performance/observability/edge_insights)                             | Review detailed information about each request to your website in near real-time.                                                                                                                     |
| [RTLD CDN](/applications/logs/rtld)                                                                | Review historical information for all requests, even those that never reach your application code (e.g., cache hits, static assets, requests routed to custom backends, edge redirects, etc.).        |
| [Visual Studio Code](#visual-studio-code)                                                    | This tool allows you to add breakpoints within your code to troubleshoot delivery issues.                                                                                                             |
| [Server Logs](#server-logs)                                                                  | Review messages from your application.                                                                                                                                                                |
| [curl](#curl)                                                                                | Issue requests to your website using curl. This tool allows you to eliminate browser-specific behavior when troubleshooting issues.                                                                   |
| [Source Maps](#source-maps)                                                                  | Review our source map to investigate runtime errors that occur during routing. Additionally, if you are using the Next or Nuxt framework, then you can enable a source map for your application code. |

## Visual Studio Code {/* visual-studio-code */}

Set up debugging within Visual Studio Code for your CDN-as-code configuration through the following steps:

1.  Open `.vscode/launch.json`.
2.  Click **Add Configuration** and select **Node.js: Launch Program**.
3.  Edit this configuration to look like this:

    ```js
    {
      "name": "Debug {{ PRODUCT_NAME }} App",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "autoAttachChildProcesses": true,
      "program": "${workspaceFolder}/node_modules/{{ PACKAGE_NAME }}/cli",
      "args": ["run"]
    }
    ```

    If your workspace folder is not located in your app's root directory, then you will need to adjust the path defined within the `program` and `cwd` keys. The `program` config should always point to `{{ PACKAGE_NAME }}/cli`. The `cwd` config should point to the root directory of your app.

This configuration allows you to set breakpoints in both your {{ PRODUCT_NAME }} router as well as your application code (e.g., Next.js, Nuxt.js, and Angular).

<a id="logs" />
## Server Logs {/* server-logs */}

By viewing the server logs in the {{ PORTAL }}, you can see all of the messages logged by your application using `console.log`, `console.warn`, etc...

By enabling [Deep Request Inspection](/applications/logs/server_logs#deep-request-inspection) in your environment, you can also see the headers and body of every request and response served by your application through the {{ PRODUCT }} cloud. You can also see each upstream API request made by your application.

Debug issues related to routing to your origin by temporarily moving the proxy from the edge to the {{ PRODUCT }} cloud:

```js
  .get('/p/:productId', ({ cache }) => {
    proxy('origin', {
      // The presence of transformRequest and transformResponse ensure that proxying is done in the {{ PRODUCT }} cloud, not at the edge.
      transformRequest: (req) => {
        console.log('Request ID', req.headers['x-request-id'])
        // Log request properties that you want to troubleshoot.
      },
      transformResponse: (res, req) => {
        console.log('Response for request ID', req.headers['x-request-id'], 'status code', res.statusCode)
        // Log response properties that you want to troubleshoot.
      }
    })
  })
```

Once it has been deployed, you can observe the output in your [server logs](/applications/logs/server_logs).

We strongly recommend to proxy traffic from the edge whenever possible, as that is more performant and avoids {{ PRODUCT }} cloud surcharges. The above solution should only be used as a temporary measure while addressing issues.

[Learn more about server logs.](/applications/logs/server_logs)

## curl {/* confirming-behavior-with-curl */}

Removing the browser as a variable in your equation is a good way to confirm what the origin server is doing. Below are a few of the common CURL commands we leverage to verify behavior.

Use the `-k` option to skip TLS validation if a TLS certificate has not been provisioned for the requested domain.

**View Headers Only**

```bash
curl -o/dev/null -vv https://www.yoursite.com
```

**Bypass DNS Resolution**

Connect directly to a specific IP address. Use this command to:
-   Send a request directly to the origin and bypass {{ PRODUCT }}
-   Test the connection to {{ PRODUCT }} before DNS cutover. The recommended method for testing this connection is to define a localhost DNS configuration.

```bash
curl -o/dev/null -vv
    https://www.yoursite.com --connect-to ::35.241.39.58
```

**Specify a Cookie**

```bash
curl -o/dev/null -vv
    -H "Cookie: cache_enabled=true" https://www.yoursite.com/main.js
```

**Send a Specific User Agent**

```bash
curl -o/dev/null -vv
    -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone10,2;FBMD/iPhone;FBSN/iOS;FBSV/13.6.1;FBSS/3;FBID/phone;FBLC/en_GB;FBOP/5];FBNV/1"
```

<!--**Skip the Cache**

Adding `{{ PRODUCT_NAME_LOWER }}_debug=true` to the query string skips the cache. This is useful when checking dynamic data. Append grep to search for specific values within the response output.

```bash
curl -vv --silent https://www.yoursite.com/?{{ PRODUCT_NAME_LOWER }}_debug=true 2>&1 | grep minicart-quantity
```

`2>&1` is only present to make terminal work with `grep`.
-->

## Source Maps {/* source-maps */}

If you are using CDN-as-code, then {{ PRODUCT }} automatically produces a source map for your router file. This source map contains a stacktrace that references the original source file for each runtime error that occurs during routing. If your application build produces source maps for the server bundle, these will also be used when reporting errors.

**Key information:**

-   By default, application-level source maps are not enabled, since they may cause the {{ PRODUCT }} cloud bundle to be larger than the 50MB limit.
-   Source maps loaded within our {{ PRODUCT }} cloud infrastructure may result in `539 Project Timeout` errors due to performance issues. If this occurs, try again with sourcemaps disabled.

{{ PRODUCT }} provides a convenient way to enable source maps when using Next and Nuxt:

-   **Next.js:** Set `{{ FULL_CLI_NAME }}SourceMaps: true` in your `next.config.js`:

    ```js filename="./next.config.js"
    const { with{{ PRODUCT }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')

    module.exports = with{{ PRODUCT }}(
      withServiceWorker({
        // Output sourcemaps so that stacktraces have original source filenames and line numbers when tailing
        // the logs in the {{ PORTAL }}.
        {{ FULL_CLI_NAME }}SourceMaps: true,
      }),
    )
    ```
-   **Nuxt.js:** Set `{{ FULL_CLI_NAME }}SourceMaps: true` in the config for `{{ PACKAGE_NAME }}/nuxt/module` in `buildModules` in `nuxt.config.js`:

    ```js filename="./nuxt.config.js"
    module.exports = {
      // ...
      buildModules: [['{{ PACKAGE_NAME }}/nuxt/module', { {{ FULL_CLI_NAME }}SourceMaps: true }]],
      // ...
    }
    ```

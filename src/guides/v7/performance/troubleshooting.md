---
title: Troubleshooting
---

Troubleshoot:

-   [General issues](#general-troubleshooting-procedures)
-   [Caching](#caching)
-   [Performance](#performance)
-   [Status codes](status-codes)

[Learn more about our troubleshooting tools.](#troubleshooting-tools)

## General Troubleshooting Procedures {/*general-troubleshooting-procedures*/}

If you encounter unexpected behavior or an issue, you should:

1.  Verify that all of your traffic is being served through the [most recently deployed environment](#environment-version). 
2.  Verify that the only [desired set of rules are being applied](#applied-rules) to the request experiencing unexpected behavior.
3.  [Test your site using a permalink.](#test-without-cached-content) This ensures that the unexpected behavior is not due to cached content. 

#### Environment Version {/*environment-version*/}

Delays in configuration propagation may cause {{ PRODUCT }} to serve some requests using an older configuration. Upon detecting unexpected behavior, it is important to verify that all requests are using the latest environment version.

1.  Find the environment version through which a request was served by checking the **Environment** column from within the [{{ CHROME_EXTENSION }}](/guides/performance/observability/developer-tools-chrome-extension).
2.  Find the latest environment version from within the {{ PORTAL }} by navigating to the desired environment, clicking **Deployments**, and then checking the **Environment** column. 
    
For example, the {{ CHROME_EXTENSION }}'s **Environment** column should report `v3` for requests to a website powered by the following production environment:
    
![Sample deployments](/images/v7/basics/deployments.png?width=600)

#### Applied Rules {/*applied-rules*/}

Verify that the desired set of rules are being applied to the request by performing the following steps:

1.  Find out the set of rules that were applied to the request by checking the **Matched Rules** column within the {{ CHROME_EXTENSION }}. 

    For example, the following illustration indicates that rules 0, 2, 3, and 13 were applied to a request:

    ![Matched rules](/images/v7/performance/developer-tools-matched-rules.png)

2.  Look up those rules from within the **Rules** page  of the {{ PORTAL }}. Click on the `Show Rule Numbers` link to display rule numbers next to each rule.
    
    ![Rules page showing rule numbers](/images/v7/performance/rules-rule-numbers.png?width=600)
    
**Key information:**
    
-   Rules use zero-based numbering.
-   Use the above procedure even if you are using CDN-as-code. 
    
    {{ PRODUCT }} automatically adds system-defined rules when you deploy your CDN-as-code configuration. As a result, counting rules within your {{ ROUTES_FILE }} will be inaccurate.

#### Test Without Cached Content {/*test-without-cached-content*/}

Use a permalink to ensure that {{ PRODUCT }} does not serve cached content when testing your website. A permalink forces {{ PRODUCT }} to proxy your request to either the {{ PRODUCT }} cloud or your origin. Although this may degrade performance, it is useful when verifying functionality. 

A permalink is assigned to each deployment. View a deployment's permalink by navigating to the **Deployments** page for the desired environment and then clicking on the desired deployment version. 

## Caching {/*caching*/}

Use the [{{ CHROME_EXTENSION }}](/guides/performance/observability/developer-tools-chrome-extension) to troubleshoot caching behavior. 

#### Overall Cache Performance {/*overall-cache-performance*/}

View overall cache performance by checking the **Edge Hits** statistic at the bottom of the {{ CHROME_EXTENSION }}.

![Edge Hits](/images/v7/performance/developer-tools-edge-hits.png?width=600)

#### Cache Responses {/*cache-responses*/}

Check whether a request was served from cache through the **Cache Status** column. Look for one of the following values:

    -   **Hit (`COMPONENT`):** Indicates that the request was served from cache from either our network (Edge) or a service worker's local cache (Service Worker). 

    -   **Miss (`COMPONENT`):** Indicates that {{ PRODUCT }} could not find a cached version of the requested content     with a valid time-to-live (TTL) from either our network (Edge) or a service worker's local cache (Service Worker). 

    -   **No-Cache (Edge):** Indicates that a cache content freshness check was not performed. This check is skipped when an HTTP request method is used that bypasses cache (e.g., `PUT`, `DELETE`, etc).

    -   **Disabled (Edge):** Indicates that caching was disabled through the [Bypass Cache feature](/guides/performance/rules/features#bypass-cache). 
    
        If this behavior is undesired, [review the rules applied to this request](#applied-rules).

    -   **Blank:** A blank value indicates that the request was either not served through {{ PRODUCT }} or it was served through a different property or environment on which the Debug Header feature has not been enabled. 

#### Cache Miss {/*cache-miss*/}

Review the following items to find out why a request resulted in a cache miss. 

-   By default, content is only cached when the response from the origin includes a caching policy. Additionally, some content types may require 2 requests before they are eligible to be cached.
    
    [View our default caching policy.](/guides/performance/caching#default-caching-policy)

-    If you have defined a custom cache policy through a rule, then you should [review the rules applied to this request](#applied-rules). 

-   If your origin defines a custom cache policy through headers, then you should click on the desired request and then check the **Response Headers** section for [cache directives](/guides/performance/caching#cache-directives)

## Performance {/*performance*/}

Use the [{{ CHROME_EXTENSION }}](/guides/performance/observability/developer-tools-chrome-extension) to troubleshoot performance.

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

![Prefetches](/images/v7/performance/developer-tools-prefetches.png?width=600)

By default, you may only prefetch content that is cached on the POP closest to the user and that still has a valid TTL. {{ PRODUCT }} responds with a `412 Precondition Failed` for prefetch requests that result in a cache miss.

Identify prefetch requests through the following query string parameter: `edgio_prefetch=1`.

**Example:** `https://cdn.example.com/css/styles.css?edgio_dt_pf=1&edgio_prefetch=1`

## Troubleshooting Tools {/*troubleshooting-tools*/}

Troubleshoot delivery and performance issues using the following tools:

| Tool                                                                                  | Description                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [{{ CHROME_EXTENSION }}](/guides/performance/observability/developer-tools-chrome-extension) | This Chrome extension describes each request associated with the current page. Use this information to gain insight into delivery issues, caching, and performance.                                   |
| [Edge Insights](#edge-insights)                                                       | Review detailed information about each request to your website in near real-time.                                                                                                                     |
| [Visual Studio Code](#visual-studio-code)                                             | This tool allows you to add breakpoints within your code to troubleshoot delivery issues.                                                                                                             |
| [Server Logs](#server-logs)                                                           | Review messages from your application.                                                                                                                                                                |
| [Access Logs](access-logs)                                                            | Review historical information for requests to your website.                                                                                                                                           |
| [curl](#curl)                                                                         | Issue requests to your website using curl. This tool allows you to eliminate browser-specific behavior when troubleshooting issues.                                                                   |
| [Source Maps](#source-maps)                                                           | Review our source map to investigate runtime errors that occur during routing. Additionally, if you are using the Next or Nuxt framework, then you can enable a source map for your application code. |

## Edge Insights {/*edge-insights*/}

[Edge Insights](/guides/performance/observability/edge_insights) allows you to view near real-time information for all requests to your website. 

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

By enabling [Deep Request Inspection](/guides/logs/server_logs#deep-request-inspection) in your environment, you can also see the headers and body of every request and response served by your application through the {{ PRODUCT }} cloud. You can also see each upstream API request made by your application.

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

Once it has been deployed, you can observe the output in your [server logs](/guides/logs/server_logs).

We strongly recommend to proxy traffic from the edge whenever possible, as that is more performant and avoids {{ PRODUCT }} cloud surcharges. The above solution should only be used as a temporary measure while addressing issues.

[Learn more about server logs.](/guides/logs/server_logs)

## Access Logs {/* access-logs */}

Access logs contain information about all requests, even those that never reach your application code (e.g. cache hits, static assets, requests routed to custom backends, edge redirects, and so on).

[Learn more about access logs.](/guides/logs/access_logs)

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

## Status Codes {/*status-codes*/}

Gain insight into why {{ PRODUCT }} returned a specific status code by filtering Edge Insights by the desired status code and then reviewing log data.

1.  [Load the desired environment-specific Edge Insights page.](/guides/performance/observability/edge_insights#basic-usage)
2.  Verify that the **Data Source** option is set to `Access Logs`.
3.  Scroll down to the **Top Results** section.
4.  Verify that `HTTP Status Code` has been selected for one of the pie charts.
5.  From within the pie chart, click on the desired status code. The entire dashboard will be filtered by that status code. 
6.  Scroll down to the **Logs** section.
7.  Inspect each request to gain insight into why this status code is occurring.

    -   `404 Not Found`: Check the `url` and the `referer` field to identify the problematic URL and the URL from which the request originated.
    -   `502 Bad Gateway`: Check whether the request contains `proxy_hard_error` set to `HARD_ERR_502_SSL_CONNECT_ERROR` to identify a [SNI issue](#502-bad-gateway-status-code). 

    <Callout type="tip">

      Filter for a specific field by typing the desired name in the upper-right hand search bar.

    </Callout>

Troubleshooting information for common status codes is provided below. [Learn more about other status codes.](/guides/performance/response#status-codes)

### 404 Not Found Status Code {/*404-not-found-status-code*/}

Troubleshoot this status code by performing the following steps:

-   Use Edge Insights, [as described above](#status-codes), to identify the URL and the referrer from which the request originated. Check the `url` and the `referer` field, respectively.
-   If the resource exists and you are using CDN-as-code, use the [{{ CHROME_EXTENSION }}](developer-tools-chrome-extension) to check whether the [request matches a rule](#applied-rules) in your {{ ROUTES_FILE }}.

### 502 Bad Gateway Status Code {/*502-bad-gateway-status-code*/}

Troubleshoot this status code by identifying the origin configuration that is experiencing an issue and then performing the following steps:

-   Use Edge Insights to check whether you need to update your origin configuration's SNI settings.

    1.  Filter Edge Insights, [as described above](#status-codes) by the `502 Bad Gateway` status code. 
    2.  Scroll down to the **Logs** section and view a request. 
    3.  Check whether the request contains `proxy_hard_error` set to `HARD_ERR_502_SSL_CONNECT_ERROR`. 
    
    If you see this error, then you need to update the SNI hint to a hostname defined within your certificate’s Subject Alternative Name (SAN) or Common Name (CN).

-   If the client's `Host` header does not match a hostname defined within your certificate’s Subject Alternative Name (SAN) or Common Name (CN), then you will need to update the **Override Host Header** option.
-   If you are using a self-signed certificate, then you must enable the **Allow Self-Signed Certs** option on the desired origin configuration.
-   If you have pinned a certificate to the desired origin configuration, then you may need to pin an additional certificate.

<!--
Troubleshooting the error with Edge Insights by looking for one of the failed requests, searching for "PROXY_HARD_ERROR" in the Log view and understanding the value. For example:

Most often you can fix this by changing the origin settings in console. Some combination of setting the SNI hint and/or host header will do the job. Sometimes you also need to allow self signed certs, depending on the cert provider the customer users.
What does the "X-Ec-Proxy-Error: 11" response error mean? I saw this when trying to access the site.
The user should be able to find this guide by searching for "502", "Bad Gateway", and "HARD_ERR_502_SSL_CONNECT_ERROR"
-->

### 531 Project Upstream Connection Error Status Code {/*531-project-upstream-connection-error-status-code*/}

Common causes are:  

-   The upstream host you specified in your project is incorrect.
-   The DNS entry you defined points to the wrong server.
-   Your servers are not responding.
-   You need to add the {{ PRODUCT }} IP addresses to your allowlist. Contact your operations team and ask them to add [our IP addresses](/guides/basics/hostnames_and_origins#firewall-allowing-ip-addresses) to your firewall's IP allowlist.

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
-   Analyzing [server logs](/guides/logs/server_logs).
-   Performing [performance profiling](/guides/performance/observability#tracking-your-own-timings) 
-   Detecting allowlist errors. 
-   Loading source maps within our {{ PRODUCT }} cloud infrastructure. If this occurs, try again with sourcemaps disabled. 
<!--
#### Assumptions {/* assumptions */}

You have deployed your site to {{ PRODUCT }}. All your website code resides with {{ PRODUCT }} as SSR (server-side rendering) code. Your backend (server) simply contains data that is needed by your website code to construct a page and return it to a requesting client or browser.
See [Architecture](/guides/performance#architecture) for more information.
<Callout type="info">

  A variant on caching is ISR where {{ PRODUCT }} caches just for a few hours or days.

</Callout>
-->

#### Allowlist {/* allowlist-overview */}

When you run your site on {{ PRODUCT_NAME }}, all requests come in through four IP addresses, and servers are programmed to interpret this as a DDoS attack. At this point, the server either blocks or rate-limits the requests. In either case, timeouts occur and 539 errors are returned.

A typical pattern is that your site works fine for a few days after deploying to {{ PRODUCT_NAME }}, then your server starts interpreting the requests as a DDoS attack.

To prevent this scenario, you must configure your server with allowlisted {{ PRODUCT_NAME }} IP addresses.

[Learn more.](/guides/basics/hostnames_and_origins#firewall-allowing-ip-addresses)

### Procedure {/* procedure */}

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
Contact your operations team and ask them to add the IP addresses in [_Allowlisting_](/guides/basics/hostnames_and_origins#firewall-allowing-ip-addresses) to your server's IP allowlist.

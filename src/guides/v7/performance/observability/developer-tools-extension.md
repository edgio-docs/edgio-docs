---
title: Edgio Developer Tools Chrome Extension 
---

The [{{ CHROME_EXTENSION }}](https://chrome.google.com/webstore/detail/edgio-developer-tools/ieehikdcdpeailgpfdbafhnbfhpdgefm) provides insight into how your site interacts with {{ PRODUCT }}. Specifically, it provides detailed information for the current page and all of the requests spawned from it. Spawned requests include everything from static assets to prefetch requests.

**Common use cases:**

-   Troubleshoot caching by viewing a request's cache status, whether it was cacheable, and its cache key.
-   Troubleshoot behavior by viewing the environment version and the deployment build through which the request was served and the rules applied to a request.
-   Verify prefetching behavior by analyzing spawned requests.
-   Troubleshoot performance by reviewing key analytics, such as time to first byte (TTFB) and total time.

## Prerequisite {/*prerequisite*/}

You must enable the [Debug Headers](/guides/performance/rules/features#debug-header) [(debug_header)](/guides/performance/cdn_as_code/route_features#debug-cache-headers) feature on all requests that you would like to inspect with the {{ CHROME_EXTENSION }}. 

The recommended configuration is to enable this feature on all requests.
-   **Rules:** Add a catch-all rule that enables the Debug Headers feature and place it at the top. This rule should not contain any match conditions.

   ![Rule with the Debug Header feature](/images/v7/performance/debug-header-rule.png?width=550)

-   **CDN-as-Code:** Create a [match all rule](/guides/performance/cdn_as_code/route_criteria#matching-all-requests) that enables the Debug Headers feature. 

    ```js
    export default new Router().always({ headers: { debug_header: true } });
    ```

## Installation {/*installation*/}

Perform the following steps:

1.  From the Chrome browser, load the [Edgio Developer Tools page in the Chrome web store](https://chrome.google.com/webstore/detail/edgio-developer-tools/ieehikdcdpeailgpfdbafhnbfhpdgefm). 
2.  Click **Add to Chrome**.
3.  When prompted, confirm that the {{ CHROME_EXTENSION }} will be installed by clicking **Add extension**.

## Usage {/*usage*/}

Load the {{ CHROME_EXTENSION }} by navigating to the **Edgio** tab within [Chrome's DevTools](https://developer.chrome.com/docs/devtools/). 

**Key information:**

-   The **Edgio** tab is only available when a request has been issued to our network through the Chrome tab from which DevTools was launched. 
-   The **Edgio** tab will only display requests issued after it has been loaded. This means that it may initally display a blank page or a partial list of requests. Refresh the page to analyze the current request and all requests spawned from it.
-   Click on a request to view more detailed information about that request. 

   ![{{ CHROME_EXTENSION }} shown with request details](/images/v7/performance/developer-tools-request-details.png?width=550)

-   View the following site performance statistics at the bottom of Chrome's DevTools:

    -   **TTFB:** [Time to First Byte](https://web.dev/articles/ttfb). 
    -   **LCP:** [Large Contentful Paint](https://web.dev/articles/lcp)
    -   **INP:** [Interaction to Next Paint](https://web.dev/articles/inp)
    -   **CLS:** [Cumulative Layout Shift](https://web.dev/articles/cls)
    -   **FID:** [First Input Delay](https://web.dev/articles/fid)
    -   **Edge Hits:** Indicates the number of requests served from cache and the total number of requests issued for the current page that were captured by {{ CHROME_EXTENSION }}. As noted above, it will only capture requests issued while the **Edgio** tab is active.
    -   **Prefetches:** Indicates the number of successful prefetch requests and the total number of prefetch requests issued for the current page that were captured by {{ CHROME_EXTENSION }}. As noted above, it will only capture requests issued while the **Edgio** tab is active.

    These statistics are highlighted in the following image:

   ![{{ CHROME_EXTENSION }} with highlighted statistics](/images/v7/performance/developer-tools-performance-statistics.png?width=550)

-   
-   




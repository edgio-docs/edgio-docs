---
title: Predictive Prefetch
---

Predictive prefetching improves performance by allowing web browsers to request popular content before it is needed. This allows pages to be rendered immediately instead of having to wait for a response from the origin.

A sample interaction with a predictive prefetching-enabled website is described below.

1.  A user visits a page on which predictive prefetching has been enabled.
2.  The user's web browser requests popular pages, resources, and API calls. It then stores this content locally.
3.  The user navigates to a different page. It is rendered immediately since that content was prefetched by the browser.

## Setup {/*setup*/}

Set up predictive prefetching using one of the following options:

| Setup                                                                          | Description                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Automatic](/guides/performance/prefetching/automatic_prefetching_setup#setup) | Automatically generate an edge function and rules that enable predictive prefetching on your web pages. This is the recommended approach if you deploy changes through the {{ PORTAL }}.  <br /><Info>Edge Functions requires activation. {{ ACCOUNT_UPGRADE }}</Info>                      |
| [Manual](/guides/performance/prefetching/prefetching_script_tag#setup)         | Manually enable predictive prefetching on each desired page by adding a script tag. Additionally, you must create a rule that defines a caching policy for the set of requests that will be prefetched by your clients.                                                                                   |
| [CDN-as-Code](/applications/performance/prefetching/prefetching_cdn_as_code)   | Build, serve, and register a service worker that will prefetch requests. Additionally, you must create a rule that defines a caching policy for the set of requests that will be prefetched by your clients. This is the recommended approach for a JavaScript front-end framework that uses CDN-as-code. |

## How Does It Work? {/*how-does-it-work*/}

Upon loading a page on which automatic predictive prefetching has been enabled, the browser will request all links that meet the following conditions:
-   The link is currently visible to the user.
-   The Set Max Age and the Set Service Worker Max Age features have been enabled on the above link.

These requests will be submitted with the following query string parameters: `{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

**Sample URL:** `https://cdn.example.com/inventory.html?{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

This workflow is illustrated below.

![Prefetch workflow](/images/v7/performance/prefetch-how-does-it-work.png)

### Sample Scenario {/*sample-scenario*/}

The following sample scenario assumes that the `Related resources` list is visible to the user as soon as the page loads:

![Prefetch sample scenario](/images/v7/performance/prefetch-example.png)

**Request flow:**

1.  The client submits a request for: `https://www.example.com`.
2.  The closest POP responds with the payload for that request. This payload:
    -   Installs the `{{ PACKAGE_NAME }}/prefetch` package. 
    -   Contains links to related resources.
3.  The predictive prefetching service worker detects that the viewport contains 4 links. As a result, it will submit the following 4 prefetch requests while the user interacts with the page:

    ```
    https://cdn.example.com/schedule.html
    https://cdn.example.com/events.html
    https://cdn.example.com/statistics.html
    https://cdn.example.com/brochure.pdf
    ```

4.  The closest POP will provide a response for each prefetching request according to whether it has been cached within that POP. 

    -   **Cache Hit:** Returns the requested content within a `200 OK` response.
    -   **Cache Miss:** Returns a `412 Precondition Failed` response.

Retrieving content before it is requested can potentially make it immediately available when it is requested by the client.
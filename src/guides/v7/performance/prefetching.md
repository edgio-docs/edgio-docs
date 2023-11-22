---
title: Predictive Prefetch
---

Improve performance by instructing web browsers to request popular pages and API calls before they are needed. This process, which is known as predictive prefetching, improves performance since it allows content to potentially already be cached locally when a user requests it. This means that the requested content may be rendered immediately instead of having to wait for a response from the origin.

## Quick Start {/*quick-start*/}

The quickest way to get started is to perform the following steps:

1.  Add the following tag to each of your pages:

    ```html
    <script src="/__edgio__/prefetch/install.js" defer></script>
    ```
2.  Add a rule that applies the following features to the pages that will be prefetched:

    -   [Set Max Age (max_age)](/guides/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/guides/performance/rules/features#set-service-worker-max-age) 

    **Sample Configuration:**

    ![Prefetch rule](/images/v7/performance/prefetch_rule.png)

[Learn more about setting up predictive prefetching through a script tag.](/guides/performance/prefetching/prefetching_script_tag)

<Callout type="tip">

  If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or a JavaScript front-end framework, then you may either perform the above steps or install the `{{ PACKAGE_NAME }}/prefetch` package directly. Installing this package allows you to take advantage of additional package features, and achieve deeper prefetch integration with your site. [Learn how to install and use this package](/guides/performance/prefetching/prefetching_edgio_sites).

</Callout>

## How Does It Work? {/*how-does-it-work*/}

Upon loading a page on which automatic predictive prefetching has been enabled, the browser will request all links that meet the following conditions:
-   The link is currently visible to the user.
-   The Set Max Age and the Set Service Worker Max Age features have been enabled on the above link.

These requests will be submitted with the following query string parameters: `{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

**Sample URL:** `https://cdn.example.com/inventory.html?{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

This workflow is illustrated below.

![Prefetch workflow](/images/v7/performance/prefetch-how-does-it-work.png)
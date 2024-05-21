---
title: Predictive Prefetch
---

Predictive prefetching improves performance by allowing web browsers to request popular content before it is needed. This allows pages to be rendered immediately instead of having to wait for a response from the origin.

A sample interaction with a predictive prefetching-enabled website is described below.

1.  A user visits a page on which predictive prefetching has been enabled.
2.  The user's web browser requests popular pages, resources, and API calls. It then stores this content locally.
3.  The user navigates to a different page. It is rendered immediately since that content was prefetched by the browser.

## Quick Start {/*quick-start*/}

The quickest way to get started is to perform the following steps:

1.  Add the following tag to each of your pages:

    ```html
    <script src="/__edgio__/prefetch/install.js" defer></script>
    ```
2.  Add a rule that applies the following features to the pages that will be prefetched:

    -   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

    **Sample Configuration:**

    ![Prefetch rule](/images/v7/performance/prefetch_rule.png)

[Learn more about setting up predictive prefetching through a script tag.](/applications/performance/prefetching/prefetching_script_tag)

<Callout type="tip">

  If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or a JavaScript front-end framework, then you may either perform the above steps or install the `{{ PACKAGE_NAME }}/prefetch` package directly. Installing this package allows you to take advantage of additional package features, and achieve deeper prefetch integration with your site. [Learn how to install and use this package](/applications/performance/prefetching/prefetching_edgio_sites).

</Callout>

## How Does It Work? {/*how-does-it-work*/}

Upon loading a page on which automatic predictive prefetching has been enabled, the browser will request all links that meet the following conditions:
-   The link is currently visible to the user.
-   The Set Max Age and the Set Service Worker Max Age features have been enabled on the above link.

These requests will be submitted with the following query string parameters: `{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

**Sample URL:** `https://cdn.example.com/inventory.html?{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

This workflow is illustrated below.

![Prefetch workflow](/images/v7/performance/prefetch-how-does-it-work.png)

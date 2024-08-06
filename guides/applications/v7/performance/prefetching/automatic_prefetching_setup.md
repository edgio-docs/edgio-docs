---
title: Automatic Predictive Prefetching Setup
---

{{ PRODUCT }} can automatically set up predictive prefetching across your entire website. 

## How Does It Work? {/**/}

By default, our automated setup configures {{ PRODUCT }} to automatically inject the following tag into each web page on which the edge function is applied:

```html
<script src="/__edgio__/prefetch/install.js" defer></script>
```

This script tag installs the latest version of the [`{{ PACKAGE_NAME }}/prefetch`](https://www.npmjs.com/package/@edgio/prefetch?activeTab=versions) package. This package automatically prefetches links displayed in the viewport that have been assigned a caching policy through both of the following features:
-   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
-   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

## Setup {/*setup*/}

Automated setup involves adding the Predictive Prefetching edge function to your configuration. This edge function automatically injects the predictive prefetching script tag into your web pages. In addition to generating this edge function, {{ PRODUCT }} will automatically add the following rules:

1.  A rule that runs the newly generated edge function for each request for HTML content. This edge function automatically injects a script tag for these types of requests.
2.  A rule that sets a caching policy for requests that start with `/pages/`. This caching policy consists of the following features:

    -   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

**To inject Predictive Prefetching within your requests**

1.  Add the Predictive Prefetching edge function to the desired environment. 

    1.  Navigate to the desired environment's **Edge Functions** page.

        1.  From the {{ PORTAL_LINK }}, select the desired private space or organization.
        2.  Select the desired property.
        3.  From the left-hand pane, select the desired environment from under the **Environments** section.
        4.  From the left-hand pane, select **Edge Functions**.

    2.  Click **+ Create New** and then select `Generate Edge Function`. 
    3.  Select `Predictive Prefetching` and then click **Add Edge Function**.
    
        ![Edge Function Generators - Predictive Prefetching](/images/v7/performance/prefetch-edge-function-generator.png)
    
    {{ PRODUCT }} will now create an edge function and add two rules to invoke and configure Predictive Prefetching.

2.  Review the newly created rules to ensure that:
    -   Predictive prefetching will be enabled on the desired pages. Check the match condition for the rule that runs the Preditive Prefetching edge funtion.
    -   The desired links will be prefetched. Check the match condition for the rule that defines the Set Max Age and Set Service Worker Max Age features.

    ![Rules - Prefetching rules](/images/v7/performance/prefetch-rules.png)

3.  Click **Deploy Changes**.
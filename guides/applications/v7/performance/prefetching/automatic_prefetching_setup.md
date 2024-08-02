---
title: Automatic Predictive Prefetching Setup
---

{{ PRODUCT }} can automatically set up predictive prefetching across your entire website. 

## How Does It Work? {/**/}

Once you have enabled automated setup, {{ PRODUCT }} automatically injects the following tag into your web pages:

```html
<script src="/__edgio__/prefetch/install.js" defer></script>
```

This script tag installs the latest version of the [`{{ PACKAGE_NAME }}/prefetch`](https://www.npmjs.com/package/@edgio/prefetch?activeTab=versions) package. This package automatically prefetches links displayed in the viewport that have been granted the following features:
-   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
-   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

## Setup {/*setup*/}

Set up involves adding an edge function from our library that automatically injects the predictive prefetching script tag into your web pages. In addition to adding this edge function to your configuration, this step adds the following rules:

1.  A rule that runs the newly generated edge function for each request for HTML content. This edge function automatically injects a script tag into these types of requests.
2.  A rule that sets a caching policy for requests that start with `/pages/`. This caching policy consists of the following features:

    -   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
    -   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

**{{ PORTAL }}: To inject Predictive Prefetching within your requests**

1.  Navigate to the desired environment's **Edge Functions** page.

    {{ ENV_NAV }} **Edge Functions**.

2.  Click **+ Create New** and then select **Generate Edge Function**.
3.  From the **Edge Function Generators** pane, select `Predictive Prefetching` and then click **Add Edge Function**.

    {{ PRODUCT }} will now create an edge function and add two rules to invoke and configure Predictive Prefetching.

4.  Click **Open Rules**.
5.  Review your rules.
    -   If
    -   
6.  Click **Deploy Changes**.

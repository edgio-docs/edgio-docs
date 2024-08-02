---
title: Predictive Prefetch
---

Predictive prefetching improves performance by allowing web browsers to request popular content before it is needed. This allows pages to be rendered immediately instead of having to wait for a response from the origin.

A sample interaction with a predictive prefetching-enabled website is described below.

1.  A user visits a page on which predictive prefetching has been enabled.
2.  The user's web browser requests popular pages, resources, and API calls. It then stores this content locally.
3.  The user navigates to a different page. It is rendered immediately since that content was prefetched by the browser.

## Quick Start {/*quick-start*/}

The quickest way to get started is to automatically inject a tag that installs Predictive Prefetching to each of your pages and then add a rule that contains the following features:

-   [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age)
-   [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age)

The quickest method for achieving this configuration is through Edge Functions. The method for implementing an edge function varies according to whether you are using CDN-as-code or the {{ PORTAL }} to deploy changes.

<Info>

Edge Functions requires activation. {{ ACCOUNT_UPGRADE }}

</Info>

**{{ PORTAL }}: To inject Predictive Prefetching within your requests**

1.  Add the Predictive Prefetching edge function to the desired environment. 

    1.  From the **Edge Functions** page, click **+ Create New** and then select `Generate Edge Function`. 
    2.  Select `Predictive Prefetching` and then click **Add Edge Function**.
    
        ![Edge Function Generators - Predictive Prefetching](/images/v7/performance/prefetch-edge-function-generator.png)
    
    {{ PRODUCT }} will now create an edge function and add two rules to invoke and configure Predictive Prefetching.

2.  Review the newly created rules to ensure that:
    -   Predictive prefetching will be enabled on the desired pages. Check the match condition for the rule that runs the Preditive Prefetching edge funtion.
    -   The desired links will be prefetched. Check the match condition for the rule that defines the Set Max Age and Set Service Worker Max Age features.

    ![Rules - Prefetching rules](/images/v7/performance/prefetch-rules.png)

3.  Click **Deploy Changes**.

[View detailed procedure.](/applications/performance/prefetching/automatic_prefetching_setup#setup)

**CDN-as-Code: To inject Predictive Prefetching within your requests**

<Callout type="tip">

  If you are using {{ PRODUCT }} {{ PRODUCT_PLATFORM }} or a JavaScript front-end framework, then you may either perform the following steps or install the `{{ PACKAGE_NAME }}/prefetch` package directly. Installing this package allows you to take advantage of additional package features, and achieve deeper prefetch integration with your site. [Learn how to install and use this package](/applications/performance/prefetching/prefetching_edgio_sites).

</Callout>

1.  In the {{ PRODUCT }} router, add a rule that:

    -   Initializes an edge function at the specified path through the `edge_function` feature.
    -   Sets the `max_age` and `service_worker_max_age` features.

    ```js filename="routes.js"
    // This file was added by edgio init.
    // You should commit this file to source control.
    import {Router, edgioRoutes} from '@edgio/core';

    export default new Router()
      // Built-in Edgio routes
      .use(edgioRoutes)

    // Predictive Prefetching edge function and cache policy for product API calls
    .get('/api/products/:id.json', {
      edge_function: './edge-functions/main.js',
      caching: {
        max_age: '1h',
        stale_while_revalidate: '1d',
        service_worker_max_age: '1h',
      }
    })
    ```

2.  Add the following edge function:

    ```js filename="edge-functions/main.js"
    export async function handleHttpRequest(request, context) {
      const originResponse = await fetch(request.url, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        edgio: {
          origin: context.requestVars.matched_origin_name
        }
      })

      // Return origin response if not HTML
      if(!originResponse.headers.get("content-type").startsWith('text/html')){
        return originResponse;
      }

      let html = await originResponse.text()
      html = html.replace(
        '</body>', `
          <script src="/__edgio__/prefetch/install.js" defer></script>
        </body>`
      )
      return new Response(html, originResponse)
    }
    ```
    
    <Info>
    
    If you also plan on injecting Core Web Vitals tracking, then you should insert both through the above edge function. 
    
    [Learn how to insert both edge functions.](/applications/performance/observability/real_user_monitoring#edge-functions)

    </Info>

3.  Deploy your changes to this environment by running the following command from your property’s root directory:

    ```bash
    {{ CLI_CMD(deploy) }}
    ```

## How Does It Work? {/*how-does-it-work*/}

Upon loading a page on which automatic predictive prefetching has been enabled, the browser will request all links that meet the following conditions:
-   The link is currently visible to the user.
-   The Set Max Age and the Set Service Worker Max Age features have been enabled on the above link.

These requests will be submitted with the following query string parameters: `{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

**Sample URL:** `https://cdn.example.com/inventory.html?{{ PRODUCT_NAME_LOWER }}_dt_pf=1&{{ PRODUCT_NAME_LOWER }}_prefetch=1`

This workflow is illustrated below.

![Prefetch workflow](/images/v7/performance/prefetch-how-does-it-work.png)

### Sample Scenario {/*sample-scenario*/}

The following sample scenario assumes that the `Related resources` list is currently visible to the user:

![Prefetch sample scenario](/images/v7/performance/prefetch-example.png)

In this scenario, the client will immediately submit the following requests while the user interacts with the page:

-   https://cdn.example.com/schedule.html
-   https://cdn.example.com/events.html
-   https://cdn.example.com/statistics.html
-   https://cdn.example.com/brochure.pdf

Retrieving content before it is requested can potentially make it immediately available when it is requested by the client.
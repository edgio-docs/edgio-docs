---
title: Sites (Frameworks)
---

{{ PRODUCT }} {{ PRODUCT_PLATFORM }}, which provides optimal performance for your Jamstack sites or applications, is powered by [{{ PRODUCT }} {{ PRODUCT_EDGE }}](/guides/performance). This means that you will be able to develop your application at a faster rate and it empowers you to define performance optimizations within your application code. 

Build upon these performance improvements through Server-Side Rendering (SSR). SSR allows you to compute code embedded within your web application using our Serverless Compute workers. Processing your code  within the {{ PRODUCT }} cloud eliminates the need for web servers to run that code. More importantly, it improves performance  through caching without compromising the dynamic nature of these requests. Responses served from cache will achieve a comparable Time to First Byte (TTFB) as static cached content.

We also support static page generation:
-   At build time through Static Site Generation (SSG).
-   After your site has been built through [Incremental Static Regeneration (ISR)](/guides/sites_frameworks/isg).

## Getting Started {/*getting-started*/}

{{ PRODUCT }} {{ PRODUCT_PLATFORM }} provides over [40 popular frameworks integrations](/guides/sites_frameworks/getting_started) through which you can deploy your websites and applications to {{ PRODUCT }}. Getting started with {{ PRODUCT }} {{ PRODUCT_PLATFORM }} involves initializing your {{ PRODUCT }} property through our CLI. Our CLI will then automatically detect your framework and configure your app accordingly.

<Callout type="tip">

  If you are still planning or developing your website or application, then consider using our [Traffic Splitting](/guides/performance/traffic_splitting) capability to migrate to a Jamstack site or application in stages.

</Callout>

## Compute Regions {/*regions*/}

{{ PRODUCT }} allows you to cache and deliver your content through any of our points of presence (POPs) around the world. However, your serverless code will be computed within one of the following global regions:

-   **Americas**: Eastern US and Western US
-   **Europe**: Ireland, UK, Western Europe, Northern Europe, Central Europe
-   **Asia**: Japan
-   **Oceania**: Australia

<Callout type="info">

  Enterprise customers may choose the region where their workloads will run. Alternatively, if you are using our free tier, then your workloads will run in the Eastern US region.

</Callout>

Edgio ensures high availability for your computing workloads by:

-   Running your code within two separate data centers.
-   Setting up automatic DNS failover between those data centers.
-   Load balancing computing requests between redundant processes.
-   Applying an Origin Shield to our Serverless Compute workers. If your requests are cacheable, then this allows more requests to be served from cache.

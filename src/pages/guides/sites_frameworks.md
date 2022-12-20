---
title: Sites (Frameworks)
---

{{ PRODUCT }} {{ PRODUCT_PLATFORM }}, which provides optimal performance for your headless Jamstack applications, is powered by [{{ PRODUCT }} {{ PRODUCT_EDGE }}](/guides/performance). This means that you will be able to develop your application at a faster rate and it empowers you to define performance optimizations within your application code. Build upon these performance improvements through static page generation:
-   At build time through Static Site Generation (SSG).
-   After your site has been built through [Incremental Static Regeneration (ISR)](/guides/sites_frameworks/isg).
-   When a client requests a page through Server-Side Rendering (SSR). SSR generates static pages through our Serverless Compute workers. In addition to either eliminating the need for web servers or reducing their load, this improves performance by processing requests closer to your users.

## Getting Started

{{ PRODUCT }} {{ PRODUCT_PLATFORM }} provides over [40 popular frameworks integrations](/guides/sites_frameworks/getting_started) through which you can deploy your headless Jamstack applications to {{ PRODUCT }}. Getting started with {{ PRODUCT }} {{ PRODUCT_PLATFORM }} involves initializing your {{ PRODUCT }} property through our CLI. Our CLI will then automatically detect your framework and configure your app accordingly.

<Callout type="tip">

  If you are still planning or developing your headless Jamstack application, then consider using our [Traffic Splitting](/guides/performance/traffic_splitting) capability to migrate to headless Jamstack in stages.

</Callout>

## Regions {/*regions*/}

{{ PRODUCT }} {{ PRODUCT_PLATFORM }} is available in the following global regions:

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
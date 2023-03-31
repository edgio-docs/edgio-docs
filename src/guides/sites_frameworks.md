---
title: Sites
---

{{ PRODUCT }} {{ PRODUCT_PLATFORM }} is a Jamstack platform built from the ground up to run high-performance websites and web apps. It is the only Jamstack platform with an integrated world-class CDN ([{{ PRODUCT }} {{ PRODUCT_EDGE }}](/guides/performance)) and a state-of-the-art [web security suite](/guides/security). {{ PRODUCT }} {{ PRODUCT_PLATFORM }} enables you to build your web apps faster and leverage a global CDN in your application code to achieve optimal performance for your production traffic. 

Build upon these performance improvements through Server-Side Rendering (SSR). {{ PRODUCT }} {{ PRODUCT_PLATFORM }} takes an SSR-first approach that enables you to render your web apps using our Serverless Compute at any scale. This allows your teams to focus on shipping features that your customers will love instead of maintaining and scaling your backend server infrastructure. {{ PRODUCT }} {{ PRODUCT_PLATFORM }} improves real-world performance through [precise control over caching](/guides/performance/caching#cache-key) that allows you to cache highly dynamic content. Responses served from the CDN cache will achieve a comparable Time to First Byte (TTFB) as static cached content.

We also support static page generation:
-   At build time through Static Site Generation (SSG).
-   After your site has been built through [Incremental Static Regeneration (ISR)](/guides/sites_frameworks/isg).

## Getting Started {/*getting-started*/}

{{ PRODUCT }} {{ PRODUCT_PLATFORM }} provides <Condition version="<=6">over [40 popular frameworks integrations](/guides/sites_frameworks/getting_started)</Condition><Condition version="7">[Next](/guides/sites_frameworks/getting_started/next) and [Nuxt](/guides/sites_frameworks/getting_started/nuxt) integrations</Condition> through which you can deploy your websites and applications to {{ PRODUCT }}. Getting started with {{ PRODUCT }} {{ PRODUCT_PLATFORM }} involves initializing your {{ PRODUCT }} property through our CLI. Our CLI will then automatically detect your framework and configure your app accordingly.

<Condition version="<=6">
<Callout type="tip">

  If you are still planning or developing your website or application, then consider using our [Traffic Splitting](/guides/performance/traffic_splitting) capability to migrate to a Jamstack site or application in stages.

</Callout>
</Condition>

## Compute Regions {/*regions*/}

{{ PRODUCT }} allows you to cache and deliver your content through any of our points of presence (POPs) around the world. However, your serverless code will run in one of the following global regions:

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

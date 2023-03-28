---
title: Performance
---

{{ PRODUCT }} {{ PRODUCT_EDGE }} allows you to quickly develop sites with sub-second page load-times and instantaneous client-side page transitions. 

Improve your site's performance through:

-   Full control over when to [cache](/guides/performance/caching) and [prefetch](/guides/performance/prefetching) your content. Caching improves performance by bringing the data closer to your users, while prefetching anticipates your user's needs by instructing the browser to request content before it is neeeded. 
-   [Serverless computing](/guides/performance/serverless_compute). Computing your JavaScript functions within our cloud reduces latency and origin server load.
-   On the fly [image optimization](/guides/performance/image_optimization).

Speed up your development lifecycle through:

-   A [CDN-as-code](/guides/performance/cdn_as_code) approach to configuration that empowers developers to define caching and edge logic capabilities from within their application code using an {{ EDGEJS_LABEL }} JavaScript API. 

    <Callout type="info">

      If you prefer setting up your configuration through the {{ PORTAL_LINK }}, then you may create [rules](/guides/performance/rules) instead.

    </Callout>

-   [Observability](/guides/performance/observability) that provides performance insights through which you may troubleshoot and fine-tune your configuration. 
-   Automatic previews of your site whenever a developer pushes commits to source control. These site previews allow QA testers, code reviewers, and other stakeholders to immediately try out newly introduced changes. 
-   Versioned deployments. This allows you to view or even roll back to an old version of your site. Access to old versions of your site allow you to discover when a bug was introduced or to quickly compare speed measurements between multiple iterations of your app. The ability to quickly roll back your site at anytime allows you to release at a rapid pace with minimal risk.
<Condition version="<=6">
-   [Traffic Splitting](/guides/performance/traffic_splitting) which controls traffic distribution for the purpose of A/B testing and iterative site migrations. 
</Condition>

![architecture](/images/overview/architecture.png)

{{ PRODUCT }} ensures high availability when optimizing site performance through:

-   Scalability. {{ PRODUCT }} automatically scales resources whenever it detects increased traffic levels. 
-   Origin Shield. This promotes high availability by funneling requests to a second caching layer instead of your web servers or our Serverless Compute workers. The first caching layer consists of our edge POPs, while the second caching layer consists of our global POPs.
-   Redundancy. {{ PRODUCT }} computes your code within two data centers. These data centers, which are located close to your API servers, are configured with automatic DNS failover. Additionally, each data center provides redundancy for individual processes and load balances the traffic between them.

[Learn how to get started with {{ PRODUCT }} {{ PRODUCT_EDGE }}.](/guides/performance/getting_started) 

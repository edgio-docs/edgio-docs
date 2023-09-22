---
title: Cache Request Flow
---

{{ PRODUCT }} can cache the response provided by an origin server or the {{ PRODUCT }} cloud on either an edge POP or an Origin Shield POP. The following diagrams demonstrate how we determine whether a response is served from cache for each of these components.

## Origin Server

Once the asset has been cached on a POP, all future requests from the region served by that POP will be served directly from that POP while the cached content's TTL has not expired. Once the TTL has expired, an edge server from that POP may [revalidate](/guides/performance/caching#revalidation) the asset with either an Origin Shield POP or the origin server. The request flow for an origin configuration on which Origin Shield has not been enabled is illustrated below.

![](/images/v7/performance/request-flow-edge-origin.png)

### Origin Shield 

If Origin Shield has been enabled on your origin, then the edge server may revalidate with an Origin Shield server. If the TTL for the asset cached on the Origin Shield server has not expired, then the edge server will use the `Age` header to extend its cached asset's TTL. 

![](/images/v7/performance/request-flow-edge-origin-shield-origin.png)

### {{ PRODUCT }} Cloud

{{ PRODUCT }} routes [Cloud Functions](/guides/performance/serverless_compute) and [{{ PRODUCT }} {{ PRODUCT_PLATFORM }}](/guides/sites_frameworks) requests similar to traffic sent to your origin servers. However, cache misses are forwarded to a cloud load balancer which distributes requests to a cloud worker.

![](/images/v7/performance/request-flow-serverless.png)
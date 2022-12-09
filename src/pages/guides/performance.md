---
title: Performance
---

{{ PRODUCT }} {{ PRODUCT_EDGE }} allows you to quickly develop sites with sub-second page load-times and instantaneous client-side page transitions. Achieve these results through:

-   Full control over when to [cache](/guides/performance/caching) and [prefetch](/guides/performance/prefetching) your content. Prefetching content anticipates your user's needs by instructing the browser to request content before it is neeeded. 
-   A [CDN-as-code](/guides/performance/cdn_as_code) approach to configuration that empowers developers to define caching and edge logic capabilities from within their application code using an {{ EDGEJS_LABEL }} JavaScript API. 
-   [Performance insights](/guides/performance/observability) that allow you to troubleshoot and fine-tune your configuration. 
-   [Serverless computing](/guides/performance/serverless_compute) for your JavaScript functions.
-   Control over [traffic distribution](/guides/performance/traffic_splitting) for the purpose of A/B testing and iterative site migrations. 
-   On the fly [image optimization](/guides/performance/image_optimization).

![architecture](/images/overview/architecture.png)

In addition to optimizing the speed at which your site is delivered, {{ PRODUCT_EDGE }} ensures high availability through:

-   Scaling. {{ PRODUCT_EDGE }} automatically scales resources whenever it detects increased traffic levels. 
-   Origin Shield. This promotes high availability by funneling requests to a second caching layer instead of your web servers or our Serverless Compute Lambda workers. The first caching layer consists of our edge POPs, while the second caching layer consists of our global POPs.
-   Redundancy. {{ PRODUCT }} computes your code within two data centers. These data centers, which are located close to your API servers, are configured with automatic DNS failover. Additionally, each data center provides redundancy for individual processes and load balances the traffic between them. This architecture minimizes the chances of traffic loss.

## Regions

{{ PRODUCT }} is available in the following global regions:

-   **Americas**: Eastern US and Western US
-   **Europe**: Ireland, UK, Western Europe, Northern Europe, Central Europe
-   **Asia**: Japan
-   **Oceania**: Australia

<Callout type="info">

  Enterprise customers may choose the region where their workloads will run. Alternatively, if you are using our free tier, then your workloads will run in the Eastern US region.

</Callout>

## Productivity {/*productivity*/}

{{ PRODUCT }} empowers your team to build apps faster and be more transparent. Every time a developer pushes commits to source control, that version of the site is automatically given a permanent preview URL so that QA testers, code reviewers, and other stakeholders can try out the changes immediately. Find a bug in your app? {{ PRODUCT }} makes it easy to go back in time and try out older versions of the app to discover when the bug was introduced. This is especially useful for meeting performance targets as it makes it easy to compare speed measurements between multiple iterations of your app.

## Limits {/*limitations*/}

{{ PRODUCT_EDGE }} sets limits on requests, responses, and access logs.

### Units

Data storage units are defined below.

- `Kb` stands for kilobytes and means 1,024 bytes (2^10 bytes)
- `Mb` stands for megabytes and means 1,024 kilobytes (2^20 bytes)
- `Gb` stands for gigabytes and means 1,024 megabytes (2^30 bytes)

### Request and Response Limits {/*request-and-response-limits*/}

{{ PRODUCT }} requires that all requests and responses meet the following requirements:

| Type                                                  | Limit                 | Description                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response time from origin server                      | 60 seconds            | The maximum number of seconds that {{ PRODUCT }} will wait for a response from an origin server (e.g., your web server). The response for a request that exceeds this limit is a `531 Project Upstream Connection Error`. <br /><br /><Callout type="warning">Requests that exceed this limit should return a [536 Project HTTP Response Timeout](/guides/performance/response#status-codes#536). We will update our service to return this status code instead of a `531 Project Upstream Connection Error` response in the near future. </Callout>  |
| Response body size from static                        | 2Gb                   | The maximum size of a response body of {{ PRODUCT }} static assets.                                                                                                              |
| Response body size from custom origin                 | 2Gb                   | The maximum size of a response body from a custom origin.                                                                                                                             |
| Response body size from {{ PRODUCT }} serverless | 6Mb                   | The maximum size of a response body from {{ PRODUCT }} serverless.                                                                                                               |
| Path and query string size                            | 8Kb                   | The maximum bytes (not characters) that {{ PRODUCT }} will accept in path and query string.                                                                                      |
| Cookie size                                           | 32Kb                  | The maximum bytes that {{ PRODUCT }} will accept in request or response cookies.                                                                                                 |
| HTTP header size                                      | 64Kb                  | The maximum bytes that {{ PRODUCT }} will accept in request or response HTTP headers.                                                                                            |
| HTTP header count                                     | 70                    | The maximum number of developer-controlled headers {{ PRODUCT }} will accept in HTTP request or response. Exceeding this will result in 542 [status code](/guides/performance/response#status-codes). |
| Scheduling timeout                                    | 60 seconds            | The number of seconds {{ PRODUCT }} will try to schedule a request processing before timing out. Exceeding this will result in 541 [status code](/guides/performance/response#status-codes).          |
| Worker timeout                                        | 20 seconds            | The number of seconds {{ PRODUCT }} will wait for project code to process the request before timing out. Exceeding this will result in 539 [status code](/guides/performance/response#status-codes).  |
| Prerender concurrency                                 | 200                   |
| Total number of prerendered requests                  | 25,000 per deployment |
| Maximum number of nested requests                     | 3                     | "Nested" means an {{ PRODUCT }} site is the upstream of itself or of another {{ PRODUCT }} site. Exceeding this will result in 538 [status code](/guides/performance/response#status-codes).     |

#### Reserved Headers {/*prohibited-headers*/}

The following headers are served for use by {{ PRODUCT }}. You may not modify these request headers. 

* `{{ HEADER_PREFIX }}-platform`
* `{{ HEADER_PREFIX }}-version`
* `{{ HEADER_PREFIX }}-t`
* `{{ HEADER_PREFIX }}-components`
* `{{ HEADER_PREFIX }}-status`
* `host`
* `x-request-id`
* `content-length`
* `via`

### Access Logs {/*access-logs*/}

| Value | Limit     | Description                                                                                         |
| ----- | --------- | --------------------------------------------------------------------------------------------------- |
| Size  | Unlimited | All access logs will always be [logged](/guides/logs#access-logs).                          |
| Time  | 2 hours   | The minimum time that {{ PRODUCT }} guarantees that access logs will be available for reading. |
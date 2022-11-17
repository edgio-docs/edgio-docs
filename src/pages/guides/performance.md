---
title: Performance
---

{{ PRODUCT }} {{ PRODUCT_EDGE }} provides:
- Full control over how your content will be accelerated. 
- Performance insights that you can use to fine-tune your configuration. 
- The ability to compute your JavaScript functions within our service.
- The ability to control traffic distribution for the purpose of A/B testing and iterative site migrations.

## Architecture {/*architecture*/}

![architecture](/images/overview/architecture.png)

### Edge (L1 Edge Cache) {/*l1-edge-cache*/}

{{ PRODUCT }} features a global network of over 80 global points of presence, ensuring that each user experiences minimal latency when connecting to your site.

### Global (L2 Shield Cache) {/*l2-shield-cache*/}

{{ PRODUCT }} employs a second caching layer that maximizes global cache hit rates and reduces traffic on your servers by coalescing requests. If more than one request for a given URL simultaneously arrives at our second caching layer, all requests, except for one, are held up while the result is retrieved from a JS worker. All requests are fulfilled with the same response. This reduces the concurrent load on your APIs and allows you to run with lower costs.

### Server-Side Rendering

{{ PRODUCT }} provides server-side rendering (SSR) through serverless workers in multiple regions.

## Speed {/*speed*/}

{{ PRODUCT }} makes it possible to deliver sub-second page load-times and instantaneous client-side page transitions through the use of prefetching and caching. It empowers developers to optimize performance by leveraging powerful caching and edge logic capabilities right from their application code using an {{ EDGEJS_LABEL }} JavaScript API. Rather than manually configuring your CDN through a web portal, {{ PRODUCT }} allows you to put your edge logic in code, so that it's source-controlled, reviewed, and tested using the same software development lifecycle as the rest of your vital application code. You can even A/B test edge logic in production!

```js
// Example {{ PRODUCT }} routes file for a Next.js app

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { nextRoutes } = require('{{ PACKAGE_NAME }}/next')

export default nextJSApp => {
  return new Router()
    .get('/p/:productId', ({ cache }) => {
      cache({
        edge: {
          // cache the SSR response at the edge
          maxAgeSeconds: 60 * 60, // one hour
          staleWhileRevalidateSeconds: 60 * 60 * 24, // one day
        },
      })
    })
    .use(nextRoutes) // serve pages using Next.js's built-in routing
    .fallback(({ proxy }) => proxy('legacy')) // serve unmatched URLs from the legacy implementation of the site so we can gradually role out the new PWA page by page.
}
```

## Scalability {/*scalability*/}

{{ PRODUCT }} automatically scales to handle increased traffic. No configuration is required. You simply write your application code and {{ PRODUCT }} provides compute resources to handle any level of traffic.

## Availability {/*high-availability*/}

{{ PRODUCT }} provides high availability for all of its components. You can choose a particular [region](regions) of the world in which your API servers are located. {{ PRODUCT }} will provision two data centers closest to it, connecting them with automatic DNS failover. High availability is also provided within the data centers themselves, with all individual processes being (at least) duplicated and sharing the traffic load among themselves. This architecture minimizes the chances of traffic loss.

{{ PRODUCT }} is available in the following global regions:

* **Americas**: Eastern US and Western US
* **Europe**: Ireland, UK, Western Europe, Northern Europe, Central Europe
* **Asia**: Japan
* **Oceania**: Australia

Enterprise customers may choose the region where their workloads will run. If you have particular needs, other regions may be configured specifically for you.

<Callout type="info">

  If you are using our free tier, then your workloads will run in the Eastern US region.

</Callout>

## Productivity {/*productivity*/}

{{ PRODUCT }} empowers your team to build apps faster and be more transparent. Every time a developer pushes commits to source control, that version of the site is automatically given a permanent preview URL so that QA testers, code reviewers, and other stakeholders can try out the changes immediately. Find a bug in your app? {{ PRODUCT }} makes it easy to go back in time and try out older versions of the app to find the point in when the bug was introduced. This is especially useful for meeting performance targets as it makes it easy to compare speed measurements between multiple iterations of your app.

## React, Vue, and Angular {/*react-vue-and-angular*/}

{{ PRODUCT }} supports the most widely used technologies for building progressive web applications. The {{ PRODUCT }} CLI automatically detects whether you're using [React (Next.js)](next), [Vue (Nuxt.js)](nuxt), or [Angular](angular) and configures your app accordingly so you can publish your app to the cloud in seconds.

## Limitations

### Legend {/*legend*/}

- `Kb` stands for kilobytes and means 1,024 bytes (2^10 bytes)
- `Mb` stands for megabytes and means 1,024 kilobytes (2^20 bytes)
- `Gb` stands for gigabytes and means 1,024 megabytes (2^30 bytes)

### Request and Response Limits {/*request-and-response-limits*/}

| Type                                                  | Limit                 | Description                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response time from origin server                      | 60 seconds            | The maximum number of seconds that {{ PRODUCT }} will wait for a response from an origin server (e.g., your web server). The response for a request that exceeds this limit is a `531 Project Upstream Connection Error`. <br /><br /><Callout type="warning">Requests that exceed this limit should return a [536 Project HTTP Response Timeout](status_codes#536). We will update our service to return this status code instead of a `531 Project Upstream Connection Error` response in the near future. </Callout>  |
| Response body size from static                        | 2Gb                   | The maximum size of a response body of {{ PRODUCT }} static assets.                                                                                                              |
| Response body size from custom origin                 | 2Gb                   | The maximum size of a response body from a custom origin.                                                                                                                             |
| Response body size from {{ PRODUCT }} serverless | 6Mb                   | The maximum size of a response body from {{ PRODUCT }} serverless.                                                                                                               |
| Path and query string size                            | 8Kb                   | The maximum bytes (not characters) that {{ PRODUCT }} will accept in path and query string.                                                                                      |
| Cookie size                                           | 32Kb                  | The maximum bytes that {{ PRODUCT }} will accept in request or response cookies.                                                                                                 |
| HTTP header size                                      | 64Kb                  | The maximum bytes that {{ PRODUCT }} will accept in request or response HTTP headers.                                                                                            |
| HTTP header count                                     | 70                    | The maximum number of developer-controlled headers {{ PRODUCT }} will accept in HTTP request or response. Exceeding this will result in 542 [status code](/guides/status_codes). |
| Scheduling timeout                                    | 60 seconds            | The number of seconds {{ PRODUCT }} will try to schedule a request processing before timing out. Exceeding this will result in 541 [status code](/guides/status_codes).          |
| Worker timeout                                        | 20 seconds            | The number of seconds {{ PRODUCT }} will wait for project code to process the request before timing out. Exceeding this will result in 539 [status code](/guides/status_codes).  |
| Prerender concurrency                                 | 200                   |
| Total number of prerendered requests                  | 25,000 per deployment |
| Maximum number of nested requests                     | 3                     | "Nested" means an {{ PRODUCT }} site is the upstream of itself or of another {{ PRODUCT }} site. Exceeding this will result in 538 [status code](/guides/status_codes).     |

### Access Logs {/*access-logs*/}

| Value | Limit     | Description                                                                                         |
| ----- | --------- | --------------------------------------------------------------------------------------------------- |
| Size  | Unlimited | All access logs will always be [logged](/guides/logs#access-logs).                          |
| Time  | 2 hours   | The minimum time that {{ PRODUCT }} guarantees that access logs will be available for reading. |

### Prohibited Headers {/*prohibited-headers*/}

The following is a list of headers that cannot be modified by your project code. These values are immutable and can only be set by the {{ PRODUCT }} platform.

* `{{ HEADER_PREFIX }}-platform`
* `{{ HEADER_PREFIX }}-version`
* `{{ HEADER_PREFIX }}-t`
* `{{ HEADER_PREFIX }}-components`
* `{{ HEADER_PREFIX }}-status`
* `host`
* `x-request-id`
* `content-length`
* `via`


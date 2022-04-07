---
title: Overview
---

This guide introduces the high-level concepts behind {{ PRODUCT_NAME }}.

<Video src="https://www.youtube.com/watch?v=u7ed4HFzR8A"/>

## What is {{ PRODUCT_NAME }}? {/*what-is--product_name-*/}

{{ PRODUCT_NAME }} extends the capabilities of a traditional **CDN** by not only hosting your static content, but also providing **server-side rendering** for progressive web applications as well as caching both your APIs and HTML at the network edge to provide your users with the **fastest browsing experience**.

Check out our video [{{ PRODUCT_NAME }} - What & Why](https://www.youtube.com/watch?v=u7ed4HFzR8A) for more details.

## Architecture {/*architecture*/}

![architecture](/images/overview/architecture.svg)

### L1 Edge Cache {/*l1-edge-cache*/}

{{ PRODUCT_NAME }} features a global network of over 80 global points of presence, ensuring that each user experiences minimal latency when connecting to your site

### L2 Shield Cache {/*l2-shield-cache*/}

{{ PRODUCT_NAME }} employs an L2 cache that maximizes global cache hit rates and reduces traffic on your servers by coalescing requests. If more than one request for a given URL arrives at the L2 cache simultaneously, all but one are held up while the result is retrieved from a JS worker. All requests are fulfilled with the same response. This reduces the concurrent load on your APIs and allows you to run with lower costs.

### JS Workers {/*js-workers*/}

{{ PRODUCT_NAME }} provides server side rendering (SSR) via JS workers in multiple regions.

## Speed {/*speed*/}

{{ PRODUCT_NAME }} makes it possible to deliver sub-second page load-times and instantaneous client-side page transitions through the use of prefetching and caching. It empowers developers to optimize performance by leveraging powerful caching and edge logic capabilities right from their application code using an {{ EDGEJS_LABEL }} JavaScript API. Rather than manually configuring your CDN through a web portal, {{ PRODUCT_NAME }} allows you to put your edge logic in code, so that it's source-controlled, reviewed, and tested using the same software development lifecycle as the rest of your vital application code. You can even A/B test edge logic in production!

```js
// Example {{ PRODUCT_NAME }} routes file for a Next.js app

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

{{ PRODUCT_NAME }} automatically scales to handle increased traffic. No configuration is required. You simply write your application code and {{ PRODUCT_NAME }} provides compute resources to handle any level of traffic.

## High Availability {/*high-availability*/}

{{ PRODUCT_NAME }} provides high availability (HA) in all of its components. You can choose a particular [region](regions) of the world in which your API servers are located. {{ PRODUCT_NAME }} will provision two data centers closest to it, connecting them with automatic DNS failover. HA is also provided within the data centers themselves, with all individual processes being (at least) duplicated and sharing the traffic load among themselves. This in-depth HA architecture minimizes the chances of loss of traffic.

## Productivity {/*productivity*/}

{{ PRODUCT_NAME }} empowers your team to build apps faster and be more transparent. Every time a developer pushes commits to source control, that version of the site is automatically given a permanent preview URL so that QA testers, code reviewers, and other stakeholders can try out the changes immediately. Find a bug in your app? {{ PRODUCT_NAME }} makes it easy to go back in time and try out older versions of the app to find the point in when the bug was introduced. This is especially useful for meeting performance targets as it makes it easy to compare speed measurements between multiple iterations of your app.

## React, Vue, and Angular {/*react-vue-and-angular*/}

{{ PRODUCT_NAME }} supports the most widely used technologies for building progressive web applications. The {{ PRODUCT_NAME }} CLI automatically detects whether you're using [React (Next.js)](next), [Vue (Nuxt.js)](nuxt), or [Angular](angular) and configures your app accordingly so you can publish your app to the cloud in seconds.

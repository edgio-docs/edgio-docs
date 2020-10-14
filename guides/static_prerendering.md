# Static Prerendering

This guide shows you how to configure the XDN to prenderer pages to the edge cache to improve the performance of your site.

## Overview

The XDN allows you to specify the set of URLs that should be prerendered and cached at the edge during deployment to ensure that users get a subsecond
experience when accessing your site. Static prerendering works by sending requests to your application code and caching the result right after your site is deployed.
In this way, you simply build your app to implement server-side rendering and get the speed benefits of a static site for some or all of your pages. This feature is especially useful for large, complex sites that have too many URLs to prerender without incurring exceptionally long build times.

## Specifying the URLs to Prerender

To specify which URLs should prerendered, use the Router's [prerender](https://developer.moovweb.com/docs/api/core/classes/_router_router_.router.html#prerender) function. The prerender function accepts an array of [PrerenderRequest] objects or an async function that returns the same:

### Example: Hardcoded Paths

```js
const { Router } = require('@xdn/core/router')

module.exports = new Router().prerender([
  // HTML pages
  { path: '/' },
  { path: '/categories/mens' },
  { path: '/categories/mens/shirts' },
  { path: '/categories/mens/pants' },
  { path: '/categories/womens' },
  { path: '/categories/womens/shirts' },
  { path: '/categories/womens/pants' },

  // API responses
  { path: '/api/index.json' },
  { path: '/api/categories/mens.json' },
  { path: '/api/categories/mens/shirts.json' },
  { path: '/api/categories/mens/pants.json' },
  { path: '/api/categories/womens.json' },
  { path: '/api/categories/womens/shirts.json' },
  { path: '/api/categories/womens/pants.json' },
])
```

### Example: Async Paths

```js
const { Router } = require('@xdn/core/router')

module.exports = new Router().prerender(async () => {
  const paths = await fetchCategoryPathsFromAPI()
  return paths.map(path => ({ path }))
})
```

### Example: Defining Paths via an Environment Variable

```js
const { Router } = require('@xdn/core/router')

module.exports = new Router().prerender(async () => {
  const paths = process.env.PRERENDER_PATHS.split(/\n/) // define the list of paths to prerender in the XDN Developer Console.
  return paths.map(path => ({ path }))
})
```

## Prerendering API Calls

It is important to prerender not just HTML responses, but API calls as well, to ensure that client-side navigation is as fast as possible. Some frameworks, such as Next.js, embed a build ID in API URLs to ensure that client receives responses from the correct version of the back end. In other frameworks the convention for how API URLs are structured is left to the developer.

### Example: Next.js getServerSideProps

```js
const { Router } = require('@xdn/core/router')
const { nextRoutes } = require('@xdn/next')
const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

// Read the Next.js build ID from '.next/BUILD_ID
const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID')

function getPrerenderRequests() {
  const prerenderRequests = [
    { path: '/' },
    { path: '/categories/mens' },
    { path: '/categories/mens/shirts' },
    { path: '/categories/mens/pants' },
    { path: '/categories/womens' },
    { path: '/categories/womens/shirts' },
    { path: '/categories/womens/pants' },
  ]

  if (existsSync(buildIdPath)) {
    // Derive the API requests from the HTML page URLs
    const buildId = readFileSync(buildIdPath, 'utf8')
    const apiPaths = prerenderRequests.map(path => ({ path: `/data/${buildId}${path}.json` }))
    prerenderRequests.push(...apiPaths)
  }

  return prerenderRequests
}

module.exports = new Router().prerender(getPrerenderRequests).use(nextRoutes)
```

## Advanced Configuration: Custom Cache Keys

If you're splitting the cache by cookies or headers using a `CustomCacheKey`, you'll need to include the cookie or header values in
your preload configuration. For example, if you're splitting the cache by a `language` cookie:

```js
const { Router, CustomCacheKey } = require('@xdn/core/router')

module.exports = new Router()
  .prerender([
    // German
    { path: '/categories/mens', headers: { cookie: 'language=de' } },
    { path: '/categories/mens/shirts', headers: { cookie: 'language=de' } },
    { path: '/categories/mens/pants', headers: { cookie: 'language=de' } },
    { path: '/categories/womens', headers: { cookie: 'language=de' } },
    { path: '/categories/womens/shirts', headers: { cookie: 'language=de' } },
    { path: '/categories/womens/pants', headers: { cookie: 'language=de' } },

    // English
    { path: '/categories/mens', headers: { cookie: 'language=en' } },
    { path: '/categories/mens/shirts', headers: { cookie: 'language=en' } },
    { path: '/categories/mens/pants', headers: { cookie: 'language=en' } },
    { path: '/categories/womens', headers: { cookie: 'language=en' } },
    { path: '/categories/womens/shirts', headers: { cookie: 'language=en' } },
    { path: '/categories/womens/pants', headers: { cookie: 'language=en' } },
  ])
  .get('/categories/:slug*', ({ cache }) => {
    cache({
      key: new CustomCacheKey().addCookie('language'),
      edge: { maxAgeSeconds: 60 * 60 * 24, staleWhileRevalidate: 60 * 60 * 24 * 365 },
    })
  })
```

## Concurrency and Limits

By default, the XDN prerenders a maximum of 200 URLs at a time. This can create significant additional load on your APIs at the time of deployment. You can lower this limit by setting the [prerenderConcurrency](/guides/xdn_config#section_prerenderconcurrency) property in `xdn.config.js`. The XDN imposes the following limits on prerendering:

| Tier       | Concurrency | Total number of requests |
| ---------- | ----------- | ------------------------ |
| ENTERPRISE | 200         | 25,000 per deployment    |
| FREE       | 10          | 100 per deployment       |

## Viewing Prerendering Results in the XDN Developer Console

When you deploy a new version of your site, you can view the progress and results of prerendering from the deployment
view in XDN Developer Console:

![progress](/images/static-prerendering/progress.png)

This section updates in real time as pages are prerendered and will show you any errors that occur. If an error occurs, more
information can be found in the build logs.

---
title: Static Prerendering
---

<ButtonLinksGroup>
 <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-prerender-example">
  View the Code
 </ButtonLink>
 <ButtonLink variant="stroke" type="deploy" withIcon={true} href="{{ APP_URL }}/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-prerender-example" />
</ButtonLinksGroup>

This guide shows you how to configure {{ PRODUCT_NAME }} to prerender pages to the edge cache and improve the performance of your site.

{{ PRODUCT_NAME }} allows you to specify the set of URLs that should be prerendered and cached at the edge during deployment to ensure that users get a subsecond
experience when accessing your site. Static prerendering works by sending requests to your application code and caching the result right after your site is deployed.
In this way, you simply build your app to implement server-side rendering and get the speed benefits of a static site for some or all of your pages. This feature is especially useful for large, complex sites that have too many URLs to prerender without incurring exceptionally long build times.

## Specifying the URLs to Prerender {/*specifying-the-urls-to-prerender*/}

To specify which URLs should be prerendered, use the Router's [prerender]({{ DOCS_URL }}/docs/api/core/classes/_router_router_.router.html#prerender) function. The `prerender` function accepts an array of [PrerenderRequest] objects or an async function that returns the same:

### Example: Hardcoded Paths {/*example-hardcoded-paths*/}

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

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

### Example: Async Paths {/*example-async-paths*/}

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router().prerender(async () => {
  const paths = await fetchCategoryPathsFromAPI()
  return paths.map(path => ({ path }))
})
```

### Example: Defining Paths via an Environment Variable {/*example-defining-paths-via-an-environment-variable*/}

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router().prerender(async () => {
  const paths = process.env.PRERENDER_PATHS.split(/\n/) // define the list of paths to prerender in the {{ PRODUCT_NAME }} Developer Console.
  return paths.map(path => ({ path }))
})
```

## Prerendering with Traffic Data {/*prerendering-with-traffic-data*/}

{{ PRODUCT_NAME }} can choose which pages to prerender based on site traffic, ensuring the most popular pages are always available in the edge cache.

### Example: Basic Usage {/*example-basic-usage*/}

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

router = new Router().prerender([
  {
    // the maximum number of pages that should be prerendered based on site traffic.
    top: 50,
  },
])
```

### Example: With Cache Splitting {/*example-with-cache-splitting*/}

```js
router = new Router().prerender([
  // Prerender with language cookie
  {
    top: 10,
    // Request headers that will be passed to your prerender request.
    // If you're splitting the cache by cookies or headers you can provide them
    // using headers option.
    headers: {
      cookie: 'language=en',
    },
  },
  // Prerender other language
  {
    top: 10,
    headers: {
      cookie: 'language=de',
    },
  },
])
```

## Prerendering API Calls {/*prerendering-api-calls*/}

To ensure that client-side navigation is as fast as possible, it is important to prerender not just HTML responses but API calls as well. Some frameworks, such as Next.js, embed a build ID in API URLs to ensure the client receives responses from the correct version of the backend. In other frameworks, the convention for how API URLs are structured is left to the developer.

### Example: Next.js getServerSideProps {/*example-nextjs-getserversideprops*/}

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { nextRoutes } = require('{{ PACKAGE_NAME }}/next')
const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

// Read the Next.js build ID from '.next/BUILD_ID'
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
    const apiPaths = prerenderRequests.map(path => ({ path: `/_next/data/${buildId}${path}.json` }))
    prerenderRequests.push(...apiPaths)
  }

  return prerenderRequests
}

module.exports = new Router().prerender(getPrerenderRequests).use(nextRoutes)
```

## Advanced Configuration: Custom Cache Keys {/*advanced-configuration-custom-cache-keys*/}

If you're splitting the cache by cookies or headers using a `CustomCacheKey`, you'll need to include the cookie or header values in
your prerender configuration. For example, if you're splitting the cache by a `language` cookie:

```js
const { Router, CustomCacheKey } = require('{{ PACKAGE_NAME }}/core/router')

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

## Concurrency and Limits {/*concurrency-and-limits*/}

By default, {{ PRODUCT_NAME }} prerenders a maximum of 200 URLs at a time. This can create significant additional load on your APIs at the time of deployment. You can lower this limit by setting the [prerenderConcurrency](/guides/edgio_config#prerenderconcurrency) property in `{{ CONFIG_FILE }}`. {{ PRODUCT_NAME }} imposes the following limits on prerendering:

| Tier       | Concurrency | Total Number of Requests |
| ---------- | ----------- | ------------------------ |
| ENTERPRISE | 200         | 25,000 per deployment    |
| FREE       | 10          | 100 per deployment       |

<a id="viewing-prerendering-results-in-the-layer0-developer-console"></a>

## Viewing Prerendering Results in the {{ PRODUCT_NAME }} Developer Console {/*viewing-prerendering-results-in-the-edgio-developer-console*/}

When you deploy a new version of your site, you can view the progress and results of prerendering from the deployment
view in {{ PRODUCT_NAME }} Developer Console:

![progress](/images/static-prerendering/progress.png)

This section updates in real time as pages are prerendered and will show you any errors that occur. If an error occurs, more
information can be found in the build logs.

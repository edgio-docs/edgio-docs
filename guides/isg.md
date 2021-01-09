# Incremental Static (Re)Generation

The Next.js framework first introduced the pattern of Incremental Static (Re)Generation (commonly referred to as **ISG**) to the JAMStack community. With ISG, some URLs are rendered at build time, while others aren't rendered until a user actually visits the page (the app essentially falls back to server-side rendering). A static loading page is returned while server-side rendering is in progress. Individual statically rendered URLs can also be configured to expire after some time (this is the *re*generation part).

The Moovweb XDN provides full support for Incremental Static (Re)Generation, not just on apps built with Next.js (where the `@xdn/next` package makes this automatic), but on apps built with any framework.

## Adding ISG to Next.js apps

Developers using Next.js don't need to do anything special to support ISG on the Moovweb XDN. Simply use the `NextRoutes` router plugin:

```js
// routes.js

const { Router } = require('@xdn/core/router')
const { nextRoutes } = require('@xdn/next')

module.exports = new Router().use(nextRoutes)
```

## Adding ISG to an app built with any framework

To enable ISG on any framework, statically render a subset of your app's pages at build time as well as a static loading page. You can have a single loading page for your app or a separate one for each route. Then, configure your XDN router to serve the statically rendered pages using `serveStatic`. Use the `onNotFound` and `loadingPage` options to fall back to SSR while displaying the loading page when a request for a page that has not been statically rendered is received.

```js
// The HTML route
router.get('/products/:id', ({ serveStatic, cache, renderWithApp }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
  })
  serveStatic('dist/products/:id.html', {
    // When the user requests a page that is not already statically rendered, fall back to SSR.
    onNotFound: () => renderWithApp(),

    // While SSR is in progress, display a static loading page.
    loadingPage: 'dist/products/loading.html',
  })
})
```

Your loading page will need to fetch the data to render the full page, so you'll likely need a data route as well, which can also be statically rendered. When a request for data that has not been statically rendered has been received, the system should block and wait for SSR to finish rather than returning a loading page (since the user is already seeing a loading page). For example:

```js
// The data route
router.get('/api/products/:id.json', ({ serveStatic, cache, renderWithApp }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
  })
  serveStatic('dist/products/:id.json', {
    // When the user requests data that is not already statically rendered, fall back to SSR.
    onNotFound: () => renderWithApp(),
  })
})
```

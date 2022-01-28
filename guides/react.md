# React

This guide shows you how to serve a React application on {{ PRODUCT_NAME }}. If you're using Next.js specifically, we suggest using the [Next.js guide](/guides/next).

## Example

Here's an example React app running on Layer0:

[Try the React Example Site](https://layer0-docs-layer0-static-react-example-default.layer0.link/?button)
[View the Code](https://github.com/layer0-docs/static-react-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/static-react-example)

{{ SYSTEM_REQUIREMENTS }}

## Getting Started

To prepare your React app for deployment on {{ PRODUCT_NAME }}, install the {{ PRODUCT_NAME }} CLI globally:

```bash
npm install -g {{ PACKAGE_NAME }}/cli
```

Then, in the root folder of your project, run:

```bash
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed.
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages.
- `{{ CONFIG_FILE }}` - The main configuration file for {{ PRODUCT_NAME }}.
- `routes.js` - A default routes file that sends all requests to React. This file can be updated add caching or proxy URLs to a different origin.
- `sw/service-worker.js` - A service worker implemented using Workbox.

## Server Side Rendering

React offers a great amount of flexibility in how you set up server side rendering. Frameworks like Next.js offer a standardized, built-in way of implementing SSR. If you're using Next.js specifically, we suggest using the [Next.js guide](/guides/next). We'll assume at this point that you're not using Next.js, but have an existing Node app that is doing server-side rendering.

In order to render on {{ PRODUCT_NAME }}, you need to provide a function that takes a Node `Request` and `Response` and sends the HTML that results from the `renderToString()` method from `react-dom/server`. Configure that function using the `server` property of `{{ CONFIG_FILE }}`. Here's an example:

```js
// {{ CONFIG_FILE }}

module.exports = {
  server: {
    path: '{{ CLI_NAME }}/server.js',
  },
}
```

```js
// server.js - basic node example

const ReactDOMServer = require('react-dom/server')
const App = require('./app')

module.exports = function server(request, response) {
  const html = ReactDOMServer.renderToString(React.createElement(App, { url: request.url }))
  response.set('Content-Type', 'text/html')
  response.send(html)
}
```

### Express Example

If you already have an express app set up to do server side rendering, the server module can also export that instead:

```js
// server.js - express example

const express = require('express')
const app = express()
const ReactDOMServer = require('react-dom/server')
const App = require('./app')

app.use((request, response, next) => {
  const html = ReactDOMServer.renderToString(React.createElement(App, { url: request.url }))
  response.set('Content-Type', 'text/html')
  response.send(html)
})

module.exports = app
```

## Bundling your server with Webpack

We recommend bundling your server with [Webpack](https://webpack.js.org/). Your webpack config should use the following settings:

```js
module.exports = {
  target: 'node',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'), // should match server.path in {{ CONFIG_FILE }}
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  entry: {
    server: './{{ PRODUCT_NAME_LOWER }}/server.js', // this should point to your server entry point, which should export a function of type (request: Request, response: Response) => void or an express app as the default export.
  },
}
```

## Configuring the {{ PRODUCT_NAME }} Router

Using the `Router` class from `{{ PACKAGE_NAME }}/core`, you'll configure caching for each of your routes, and forward requests to the server module you configured in the previous section using the `proxy` function.

```js
// routes.js

import { Router } from '{{ PACKAGE_NAME }}/core/router'
import { BACKENDS } from '{{ PACKAGE_NAME }}/core'

new Router()
  .get('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })
  .get('/p/:id', ({ cache }) => {
    // cache product pages at the edge for 1 day
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24, // 1 day
      },
    })
  })
  .fallback(({ renderWithApp }) => {
    // send all requests to the server module configured in {{ CONFIG_FILE }}
    renderWithApp()
  })
```

## Prefetching

Add the `Prefetch` component from `{{ PACKAGE_NAME }}/react` to your links to cache pages before the user clicks on them. Here's an example:

```js
import { Link } from 'react-router'
import { Prefetch } from '{{ PACKAGE_NAME }}/react'

export default function ProductListing() {
  return (
    <div>
      {/* ... */}
      {/* The URL you need to prefetch is the API call that the page component will make when it mounts. It will vary based on how you've implemented your site. */}
      <Prefetch url="/api/products/1.json">
        <Link to="/p/1">Product 1</Link>
      </Prefetch>
      {/* ... */}
    </div>
  )
}
```

By default, `Prefetch` waits until the link appears in the viewport before prefetching. You can prefetch immediately by setting the `immediately` prop:

```js
<Prefetch url="/api/products/1.json" immediately>
  <Link to="/p/1">Product 1</Link>
</Prefetch>
```

## Service Worker

In order for prefetching to work, you need to configure a service worker that uses the `Prefetcher` class from `{{ PACKAGE_NAME }}/prefetch`. Here is an example service worker built using workbox:

```js
// sw/service-worker.js

import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'

skipWaiting()
clientsClaim()

new Prefetcher().route()
```

In order to install the service worker in the browser when your site loads, call the `install` function from `{{ PACKAGE_NAME }}/prefetch`:

```js
import { install } from '{{ PACKAGE_NAME }}/prefetch/window'

install()
```

### Create React App Example

If you're building an app with [create-react-app](https://github.com/facebook/create-react-app), you can use this router to get started:

```js
// routes.js

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

const edgeOnly = {
  browser: false,
  edge: { maxAgeSeconds: ONE_YEAR },
}

const edgeAndBrowser = {
  browser: { maxAgeSeconds: ONE_YEAR },
  edge: { maxAgeSeconds: ONE_YEAR },
}

module.exports = new Router()
  .prerender([{ path: '/' }])
  // js and css assets are hashed and can be far-future cached in the browser
  .get('/static/:path*', ({ cache, serveStatic }) => {
    cache(edgeAndBrowser)
    serveStatic('build/static/:path*')
  })
  // all paths that do not have a "." as well as "/"" should serve the app shell (index.html)
  .get('/:path*/:file([^\\.]+|)', ({ cache, appShell }) => {
    cache(edgeOnly)
    appShell('build/index.html')
  })
  // all other paths should be served from the build directory
  .get('/:path*', ({ cache, serveStatic }) => {
    cache(edgeOnly)
    serveStatic('build/:path*')
  })
```

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project:

```
{{ CLI_NAME }} deploy
```

For more on deploying, see [Deploying](/guides/deploying).

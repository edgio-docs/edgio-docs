# React

This guide shows you how to a React application on the Moovweb XDN. If you're using Next.js specifically, we suggest using the [Next.js guide](/guides/next).

## Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

To prepare your React app for deployment on the Moovweb XDN, install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

Then, in the root folder of your project, run:

```bash
xdn init
```

This will automatically add all of the required dependencies and files to your
project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `@xdn/react` package - Provides a `Prefetch` component for prefetching pages
- `xdn.config.js` - The main configuration file for the XDN.
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

## Server Side Rendering

React offers a great amount of flexibility in how you set up server side rendering. Frameworks like Next.js offer a standardized, built-in way of implementing SSR. If you're using Next.js specifically, we suggest using the [Next.js guide](/guides/next). We'll assume at this point that you're not using Next.js, but have an existing Node app that is doing server-side rendering.

In order to render on the XDN, you need to provide a function that takes a node `Request` and `Response` and sends the HTML that results from the `renderToString()` method from `react-dom/server`. Configure that function using the `server` property of `xdn.config.js`. Here's an example:

```js
// xdn.config.js

module.exports = {
  server: {
    path: 'xdn/server.js',
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
  devtool: 'none',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'), // should match server.path in xdn.config.js
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  entry: {
    server: './xdn/server.js', // this should point to your server entry point, which should export a function of type (request: Request, response: Response) => void or an express app as the default export.
  },
}
```

## Configuring the XDN Router

Using the `Router` class from `@xdn/core`, you'll configure caching for each of your routes, and forward requests to the server module you configured in the previous section using the `proxy` function.

```js
// routes.js

import { Router } from '@xdn/core/router'
import { BACKENDS } from '@xdn/core'

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
  .fallback(({ proxy }) => {
    // send all requests to the server module configured in xdn.config.js
    proxy(BACKENDS.js)
  })
```

## Prefetching

Add the `Prefetch` component from `@xdn/react` to your links to cache pages before the user clicks on them. Here's an example:

```js
import { Link } from 'react-router'
import { Prefetch } from '@xdn/react'

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

In order for prefetching to work, you need to configure a service worker that uses the `Prefetcher` class from `@xdn/prefetch`. Here is an example service worker built using workbox:

```js
// sw/service-worker.js

import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher } from '@xdn/prefetch/sw'

skipWaiting()
clientsClaim()

new Prefetcher().route()
```

In order to install the service worker in the browser when your site loads, call the `install` function from `@xdn/prefetch`:

```js
import { install } from '@xdn/prefetch/window'

install()
```

### Create React App Example

If you're building an app with [create-react-app](https://github.com/facebook/create-react-app), you can use this router to get started:

```js
// routes.js

const { Router } = require('@xdn/core/router')

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

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```
xdn deploy
```

For more on deploying, see [Deploying](/guides/deploying).

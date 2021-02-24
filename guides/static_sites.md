# Serving Static Sites

This guide shows you how to serve generic static sites on the Moovweb XDN.

## Example Static Sites

Here are a few examples of common static sites served by the XDN.

[Static Backbone.js](https://github.com/moovweb-docs/xdn-examples/tree/main/static-backbonejs-example?button)
[Static React](https://github.com/moovweb-docs/xdn-examples/tree/main/static-react-example?button)
[Static Vue.js](https://github.com/moovweb-docs/xdn-examples/tree/main/static-vuejs-example?button)

## Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

To prepare your static app for deployment on the Moovweb XDN, install the XDN CLI globally:

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
- `xdn.config.js` - The main configuration file for the XDN.
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

## Generate Static Resources

If you're building an app that bundles static resources, you will want to generate those files before contuining. Typically, this is handled using a build script such as `npm run build`. This may differ depending on your framework.

The built version of your app will typically reside in a `/build` or `/dist` directory.

## Router Configuration

The XDN router is used for configuring where the static resources reside and how to serve them. Using the example above, let's assume your site is bundled under the `/build` directory and has the following structure:

- `/build/index.html`
- `/build/static/css/main.css`
- `/build/static/js/main.js`

You will need to define route handlers to serve `index.html` and the CSS/JS resources. This example router will serve and cache requests to `/index.html` and its resources referenced within:

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

If your site does not use a bundler for generating a build output, you can still serve the assets using `serveStatic` and reference the relative path to the resources. Any resource referenced using `serveStatic` or `appShell` will automatically be included in the XDN deployment. An example of serving assets from your `src` directory:

```js
// routes.js
...

module.exports = new Router()
  .prerender([{ path: '/' }])
  // js and css assets are hashed and can be far-future cached in the browser
  .get('/css/:path*', ({ cache, serveStatic }) => {
    cache(edgeAndBrowser)
    serveStatic('src/css/:path*')
  })
  .get('/js/:path*', ({ cache, serveStatic }) => {
    cache(edgeAndBrowser)
    serveStatic('src/js/:path*')
  })
  // all paths that do not have a "." as well as "/"" should serve the app shell (index.html)
  .get('/:path*/:file([^\\.]+|)', ({ cache, appShell }) => {
    cache(edgeOnly)
    appShell('src/index.html')
  })
  // all other paths should be served from the src directory
  .get('/:path*', ({ cache, serveStatic }) => {
    cache(edgeOnly)
    serveStatic('src/:path*')
  })
```

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```
xdn deploy
```

For more on deploying, see [Deploying](/guides/deploying).

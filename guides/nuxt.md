# Nuxt.js

This guide shows you how to deploy a Nuxt.js application on the Moovweb XDN. If you run into any issues please consult the [Troubleshooting](#section_troubleshooting) section.

## Example SSR Site

This Nuxt.js example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

[Try the Nuxt.js SSR Example Site](https://moovweb-docs-xdn-nuxt-example-default.moovweb-edge.io/category/hats?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-nuxt-example?button)

## Connector

This framework has a connector developed for the XDN. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/moovweb-docs/xdn-connectors/tree/main/xdn-nuxt-connector?button)

## Install Node.js and npm

**XDN only supports Node.js version 12.x**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

If you have not already done so, install the [XDN CLI](cli)

```bash
npm i -g @xdn/cli
```

## Creating a new Nuxt app

If you don't already have a nuxt.js application, you can create one using:

```bash
npm create nuxt-app my-nuxt-app
```

Nuxt's create module will ask you a series of questions to configure your app. Make sure you answer as follows:

- For `Choose custom server framework` select `None`
- For `Choose rendering mode` select `Universal (SSR)`
- Your answers to the other questions should not matter for the purposes of this guide.

## Adding the XDN to an existing Nuxt app

To prepare your Nuxt.js application for the Moovweb XDN:

1. In `nuxt.config.js`, add "@xdn/nuxt/module" to `buildModules`:

```js
// nuxt.config.js

module.exports = {
  buildModules: ['@xdn/nuxt/module'],
}
```

2. Run `xdn init` to configure your project for the XDN.

```bash
xdn init
```

The `xdn init` command will automatically add all the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/nuxt` package
- The `@xdn/vue` package
- `xdn.config.js` - Contains various configuration options for the XDN.
- `routes.js` - A default routes file that sends all requests to `nuxt.js`. You can update this file to add caching or proxy some URLs to a different origin as described later in this guide.
- `sw/service-worker.js` - A service worker that provides static asset and API prefetching.

This command will also update your `package.json` with the following changes:

- Moves all packages in `dependencies` to `devDependencies` except those listed in the `modules` property of `nuxt.config.js`.
- Adds `@nuxt/core` to `dependencies`
- Adds several `scripts` to run the available `xdn` commands

As an example, here's the original `package.json` from Nuxt's create step:

```json
{
  "name": "my-nuxt-app",
  "version": "1.0.0",
  "description": "My remarkable Nuxt.js project",
  "author": "Techy Ted",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@xdn/cli": "^2.0.0",
    "@xdn/core": "^2.0.0",
    "@xdn/nuxt": "^2.0.0",
    "nuxt": "^2.0.0"
  },
  "devDependencies": {}
}
```

And here is the `package.json` after modifications by `xdn init`:

```json
{
  "name": "my-nuxt-app",
  "version": "1.0.0",
  "description": "My remarkable Nuxt.js project",
  "author": "Techy Ted",
  "private": true,
  "scripts": {
    "dev": "xdn run",
    "build": "xdn build",
    "start": "xdn run",
    "prod": "xdn run --production",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@nuxt/core": "^2.12.2"
  },
  "devDependencies": {
    "@xdn/cli": "^2.0.0",
    "@xdn/core": "^2.0.0",
    "@xdn/nuxt": "^2.0.0",
    "@xdn/vue": "^2.0.0",
    "dotenv": "^8.2.0",
    "nuxt": "^2.0.0",
    "serverless": "^1.64.0",
    "serverless-dotenv-plugin": "^2.3.2",
    "serverless-offline": "^5.12.1"
  }
}
```

## modules vs buildModules

Nuxt does not bundle packages listed in the `modules` property of `nuxt.config.js` when building your app for production.
This can lead to an increased bundle size and slow down server-side rendering. Most Nuxt modules can be moved to
`buildModules`. We recommend the following to maximize performance of server-side rendering in the cloud:

- Move all entries from `modules` to `buildModules` in `nuxt.config.js`
- Move all corresponding packages from `dependencies` to `devDependencies` in package.json
- Run `yarn install` or `npm install` to update your lock file.

Doing so will exclude these modules from your production deployment and keep the bundle size as small as possible.

## Routing

The next few sections of this guide explain how the XDN interacts with Nuxt's routing, which is important if you are migrating an existing application. If you just created a new nuxt app, you can jump to [Running Locally](#section_running_locally) and come back to these sections later.
The XDN supports Nuxt.js's built-in routing scheme. The default `routes.js` file created by `xdn init` sends all requests to Nuxt.js via a fallback route:

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router')
const { nuxtRoutes, renderNuxtPage } = require('@xdn/nuxt')

module.exports = new Router().use(nuxtRoutes)
```

### nuxtRoutes Middleware

In the code above, `nuxtRoutes` adds all Nuxt.js routes based on the `/pages` directory. It's also compatible with extending Nuxt's router via the `router` config in `nuxt.config.js`, for example:

```js
// nuxt.config.js
export default {
  // ... more config ...
  router: {
    // For example, we can extend the nuxt router to accept /products in addition to /p.
    // The nuxtRoutes middleware automatically picks this up and adds it to the XDN router
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/products/:id?',
        component: resolve(__dirname, 'pages/p/_id.vue'),
      })
    },
  },
  // ... more config ...
}
```

You can add additional routes before and after `nuxtRoutes`, for example to send some URLs to an alternate backend. This is useful for gradually replacing an existing site with a new Nuxt.js app.

A popular use case is to fallback to a legacy site for any route that your Nuxt.js app isn't configured to handle:

```js
new Router().use(nuxtRoutes).fallback(({ proxy }) => proxy('legacy'))
```

To configure the legacy backend, use xdn.config.js:

```js
module.exports = {
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'legacy.my-site.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'legacy.my-site.com',
    },
  },
}
```

Using environment variables here allows you to configure different legacy domains for each XDN environment.

### Caching

The easiest way to add edge caching to your nuxt.js app is to add caching routes before the middleware. For example,
imagine you have `/pages/c/_categoryId.js`:

```js
new Router()
  .get('/pages/c/:categoryId', ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
    })
  })
  .use(nuxtMiddleware)
```

## Prefetching

The `@xdn/nuxt/module` builds a service worker that enables prefetching using the XDN and injects it into your app's browser code. The service worker is based on Google's [Workbox](https://developers.google.com/web/tools/workbox) library. The entry point for the service worker source code is `sw/service-worker.js`. If your app has an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js` and simply add the following to your service worker:

```js
import { Prefetcher } from '@xdn/prefetch/sw'
new Prefetcher().route()
```

The above allows you to prefetch pages from the XDN's edge cache to greatly improve browsing speed. To prefetch a page, add the `Prefetch` component from `@xdn/vue` to any `router-link` or `nuxt-link` element:

```jsx
<template>
  <ul v-for="product in products">
    <li>
      <Prefetch v-bind:url="'/api/' + product.url">
        <nuxt-link v-bind:to="product.url">
          <img v-bind:src="product.thumbnail" />
        </nuxt-link>
      </Prefetch>
    </li>
  </ul>
</template>
<script>
  import { Prefetch } from '@xdn/vue'
  export default {
    components: {
      Prefetch,
    },
  }
</script>
```

The `Prefetch` component fetches data for the linked page from the XDN's edge cache based on the `url` property and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

## Static Sites

The XDN supports fully and partially static sites using Nuxt [generate](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate). To deploy a static Nuxt site on the XDN, simply set `target: 'static'` in `nuxt.config.js` and run `xdn deploy`. This will run `nuxt build` and `nuxt generate` to generate a static version of your site.

### Incremental Static Rendering (ISG)

By default, requests for any pages that are not statically rendered at build time will fall back to server side rendering. If you use the XDN router to cache pages that are not statically rendered, the first user who attempts to access the page will see the fallback HTML page generated by Nuxt (200.html by default). The XDN will render and cache the HTML in the background so that subsequent visits result in a full HTML response. This behavior is similar to Next.js incremental static rendering (ISG). Here is an example route that adds caching for a partially static page:

```js
import { Router } from '@xdn/core/router'
import { nuxtRoutes } from '@xdn/nuxt'

export default new Router()
  .get('/products/:id', ({ cache }) => {
    cache({
      edge: {
        // Requests for product pages that are not statically generated will fall back to SSR.
        // The first user will see the 200.html loading page generated by Nuxt.
        // The XDN will render full HTML response in the background and cache it for one hour at the edge.
        // All future requests to the page will result in the full HTML response.
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60, // continue to serve stale responses from the edge cache while refreshing via SSR in the background
      },
    })
  })
  .use(nuxtRoutes)
```

### Rendering a 404 Page

If you set the `fallback` property in the [generate](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#fallback) config to `true`, Nuxt.js will generate a 404.html page that will be served whenever the URL does not match a static page. The XDN will send a 404 http status for these URLs. Note that if you set the fallback property to a string, Nuxt will generate a fallback page with that name, and the XDN will serve it with a 200 http status when the URL does not match a statically generated page.

## Running Locally

To test your app locally, run:

```bash
xdn run
```

You can do a production build of your app and test it locally using:

```bash
xdn build && xdn run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the Moovweb cloud using serverless-offline.

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```bash
xdn deploy
```

See [deploying](deploying) for more information.

## Troubleshooting

The following section describes common gotchas and their workarounds.

### I get an error message `Nuxt.js Internal Server Error`

This may be because you have a custom server framework (such as Express). Please make sure you selected `None` when asked to choose `Choose custom server framework` during the creation of your nuxt app.

### xdn init doesn't work

If you get a command not found error such as:

```bash
$ xdn init
- bash: xdn: command not found
```

Make sure you installed the XDN CLI

```bash
npm i -g @xdn/cli
```

### Make sure your version of XDN CLI is current

If you previously installed the XDN CLI, make sure your version is current.

Check npm for the latest released version of the CLI:

```bash
$ npm show @xdn/cli version
1.16.2
```

Compare the latest release against the version currently installed on your system:

```bash
$ xdn --version
1.16.2
```

If your version is out of date you can update it by running

```bash
npm update -g @xdn/cli
```

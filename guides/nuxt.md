# Nuxt.js

This guide shows you how to deploy a Nuxt.js application on the Moovweb XDN. If you run into any issues please consult the [Troubleshooting](#section_troubleshooting) section.

## Install Node.js and npm

If you do not have Node.js installed on your system, download and install it from official [Node.js downloads](https://nodejs.org/en/download/) page. Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

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

1. In `nuxt.config.js`, set `mode` to "universal" and add "@xdn/nuxt/module" to `modules`:

```js
// nuxt.config.js

module.exports = {
  mode: 'universal',
  modules: ['@xdn/nuxt/module'],
}
```

2. Run `xdn init` which will configure your project for the XDN.

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

- Moves all of the `dependencies` to `devDependencies`
- Adds `dotenv`, `serverless`, `serverless-dotenv-plugin`, and `serverless-offline` to the `devDependencies`
- Adds `nuxt-start` as the sole module in `dependencies`
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
    "nuxt-start": "^2.12.2"
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

The next few sections of this guide explain how the XDN interacts with Nuxt's routing, which is important if you are migrating an existing application. If you just created a new nuxt app, you can jump to [Running Locally](#section_running_locally) and come back to these sections later.

## Routing

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

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN:

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

# Vue Storefront

Follow these steps to deploy a Vue Storefront app on the Moovweb XDN. As of now the XDN is only compatible with [Vue Storefront Next](https://github.com/DivanteLTD/vue-storefront#about-vue-storefront-next).

## Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from official [Node.js downloads](https://nodejs.org/en/download/) page. Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

To prepare your Vue Storefront app for deployment on the Moovweb XDN, run the following commands in the root folder of your project:

```
npm install -g @xdn/cli
cd packages/<platform>/theme # where platform is the ecommerce platform you're deploying on. For example, "shopify".
xdn init
```

## Changes necessary to deploy to the XDN

### package.json

Update the xdn:build and xdn:deploy scripts as follows:

```js
"xdn:build": "xdn build && cp -r lang .xdn/lambda/lang",
"xdn:deploy": "yarn xdn:build && xdn deploy --skip-build platform",
```

### nuxt.config.js

Make the following changes to `nuxt.config.js`:

1. Move all entries in `modules` to `buildModules`
2. Remove `@nuxtjs/pwa` from `buildModules`. It is not needed because `@xdn/nuxt/module` builds and injects its own service worker.
3. Add `@xdn/nuxt/module` to `buildModules`
4. Ensure that loading `nuxt.config.js` does not fail when webpack is not present.

In nuxt.config.js, replace this:

```js
require('dotenv').config()
const webpack = require('webpack')
```

with this:

```js
let webpack

try {
  require('dotenv').config()
  webpack = require('webpack')
} catch (e) {
  // will get here in the cloud, but we can just catch this error because webpack is only needed during the build phase
}
```

And replace this:

```js
build: {
  transpile: ['vee-validate/dist/rules'],
  plugins: [
    new webpack.DefinePlugin({
      'process.VERSION': JSON.stringify({
        // eslint-disable-next-line global-require
        version: require('./package.json').version,
        lastCommit: process.env.LAST_COMMIT || ''
      })
    })
  ]
}
```

with this:

```js
build: webpack && {
  transpile: ['vee-validate/dist/rules'],
  plugins: [
    new webpack.DefinePlugin({
      'process.VERSION': JSON.stringify({
        // eslint-disable-next-line global-require
        version: require('./package.json').version,
        lastCommit: process.env.LAST_COMMIT || '',
      }),
    }),
  ],
}
```

### tsconfig.json

In tsconfig.json, add `"sw"` to `exclude`.

### routes.js

Update the XDN router located in `packages/<platform>/theme/routes.js`:

```js
const { Router } = require('@xdn/core/router')
const { nuxtRoutes, renderNuxtPage } = require('@xdn/nuxt')

const HTML = {
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60 * 24,
    forcePrivateCaching: true,
  },
  browser: false,
}

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .get('/', ({ cache }) => {
    cache(HTML)
  })
  .get('/c/:id', ({ cache }) => {
    cache(HTML)
  })
  .get('/p/:id', ({ cache }) => {
    cache(HTML)
  })
  .use(nuxtRoutes)
  .fallback(renderNuxtPage)
```

## Install additional webpack loaders

Run the following in `packages/<platform>/theme`:

```
yarn add --dev  css-loader@^3.6.0 file-loader@^6.1.0 url-loader@^4.1.0 vue-loader@^15.9.3
```

## Building and Deploying

To build and deploy your app to the XDN, run the following from the root directory of your app:

```
yarn build:core
cd packages/<platform>/theme # where platform is the ecommerce platform you're deploying on. For example, "shopify".
yarn xdn:deploy <team> # where team is the name of the XDN team to which the app should be deployed.
```

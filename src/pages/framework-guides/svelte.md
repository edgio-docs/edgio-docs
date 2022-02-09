---
title: Svelte
---

# Svelte

This guide shows you how to deploy a [Svelte](https://svelte.dev/) application on Layer0.

## Example

[Try the Svelte example site](https://layer0-docs-layer0-svelte-example-default.layer0-limelight.link/?button)
[View the code](https://github.com/layer0-docs/layer0-svelte-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-svelte-example)

{{ SIGN_UP_LAYER0 }}

## Install the Layer0 CLI

If you have not already done so, install the [Layer0 CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

{{SYSTEM_REQUIREMENTS}}

## Create a new Svelte app

If you don't already have a Svelte app, create one by running the following:

```bash
npx degit sveltejs/template-webpack svelte-app
cd svelte-app
npm install
```

You can verify your app works by running it locally with:

```bash
npm run dev
```

## Configuring your Svelte app for Layer0

### Initialize your project

In the root directory of your project run `0init`:

```bash
0init
```

This will automatically update your `package.json` and add all of the required Layer0 dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on Layer0
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for Layer0
- `routes.js` - A default routes file that sends all requests to Svelte.

### Adding Layer0 Service Worker

To add service worker to your Svelte app, run the following in the root folder of your project:

```bash
npm i process register-service-worker workbox-webpack-plugin
```

Create `service-worker.js` at the root of your project with the following:

```js
import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@layer0/prefetch/sw'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher().route()
```

To register the service worker, first create `registerServiceWorker.js` in the `src` folder:

```js
/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`/service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB',
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
```

and to include the service worker in the app, edit `main.js` (in the `src` folder) as follows:

```diff
import './global.css'
import App from './App.svelte'
+ import './registerServiceWorker'

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
})

export default app
```

Now, in `webpack.config.js` make the following additions:

```js
+ const { InjectManifest } = require("workbox-webpack-plugin");
+ const webpack = require('webpack')

  plugins: [
    + new webpack.ProvidePlugin({
    +   process: 'process/browser',
    + }),
    + new InjectManifest({
    +   swSrc: "./service-worker.js",
    + })
  ]
```

### Configure the routes

Next you'll need to configure Layer0 routing in the `routes.js` file.
Replace the `routes.js` file that was created during `0init` with the following:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  // Send requests to static assets in the build output folder `public`
  .static('public')

  // Send everything else to the App Shell
  .fallback(({ appShell }) => {
    appShell('public/index.html')
  })
```

The example above assumes you're using Svelte as a single page app. It routes the static assets (JavaScript, CSS, and Images) in the production build folder `public` and maps all other requests to the app shell in `public/index.html`.

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Svelte app locally on Layer0

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run Layer0 on your local machine:

```bash
npm run {{ CLI_NAME }}:dev
```

Load the site http://127.0.0.1:3000

## Deploying

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Next, deploy the build to Layer0 by running the `0 deploy` command:

```bash
0 deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

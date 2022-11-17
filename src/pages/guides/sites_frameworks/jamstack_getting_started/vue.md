---
title: Vue.js
---

This guide shows you how to deploy a [Vue.js](https://vuejs.org/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Vue.js"
  siteUrl="https://layer0-docs-layer0-static-vuejs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-static-vuejs-example" 
  deployFromRepo />

{{ PREREQ }}

## Create a new Vue.js app {/*create-a-new-vuejs-app*/}

If you don't already have a Vue.js app, create one by using the Vue CLI:

```bash
npm install -g @vue/cli @vue/cli-service-global
vue create hello-world
```

When running `vue create` select `Vue 2` or `Vue 3` as a preset,

```bash
Vue CLI v4.5.13
? Please pick a preset: (Use arrow keys)
❯ Default ([Vue 2] babel, eslint)
  Default (Vue 3) ([Vue 3] babel, eslint)
  Manually select features
```

You can verify your app works by running it locally:

```bash
cd hello-world
npm run serve
```

## Configuring your Vue.js app for {{ PRODUCT }} {/*configuring-your-vuejs-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application to {{ PRODUCT }}.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Vue.js.

### Adding {{ PRODUCT }} Service Worker {/*adding-service-worker*/}

To add service worker to your Vue app, run the following in the root folder of your project:

```bash
npm i register-service-worker workbox-webpack-plugin
```

Create `service-worker.js` at the root of your project with the following:

```js
import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'

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
  register(`${process.env.BASE_URL}service-worker.js`, {
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
import { createApp } from 'vue'
import App from './App.vue'
+ import './registerServiceWorker'

createApp(App).mount('#app')
```

Now, create `vue.config.js` at the root of your project with the following config:

```js
const { InjectManifest } = require('workbox-webpack-plugin')

const config = {}

if (process.env.NODE_ENV === 'production') {
  config['configureWebpack'] = {
    plugins: [
      new InjectManifest({
        swSrc: './service-worker.js',
      }),
    ],
  }
}

module.exports = config
```

### Configure the routes {/*configure-the-routes*/}

Next you'll need to configure {{ PRODUCT }} routing in the `routes.js` file.

For the Vue `hello-world` template, replace the `routes.js` file that was created during `{{ FULL_CLI_NAME }} init` with the following:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: {{ DOCS_URL }}/guides/cookbook#blocking-search-engine-crawlers
  .noIndexPermalink()
  // Send requests to static assets in the build output folder `dist`
  .static('dist')

  // Send everything else to the App Shell
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })
```

The example above assumes you're using Vue as a single page app. It routes the static assets (JavaScript, CSS, and Images) in the production build folder `dist` and maps all other requests to the app shell in `dist/index.html`.

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Vue.js app locally on {{ PRODUCT }} {/*run-the-vuejs-app-locally-on*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site: http://127.0.0.1:3000 !

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deploying](deploy_apps) guide for more information on the `deploy` command and its options.

## Server Side Rendering {/*server-side-rendering*/}

For server side rendered Vue.js apps we recommend using the Nuxt.js framework which is supported on {{ PRODUCT }}. Refer to the [Nuxt](nuxt) guide for more information.

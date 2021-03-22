# Vue.js

This guide shows you how to deploy a Vue.js application on {{ PRODUCT_NAME }}.

## Install Node.js and npm

**XDN only supports Node.js version 12.x**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node 12 for all development._

## Sign up for {{ PRODUCT_NAME }}

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.](https://moovweb.app/signup).

## Install the {{ PRODUCT_NAME }} CLI

If you have not already done so, install the [XDN CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Create a new Vue.js app

If you don't already have a Vue.js app, create one by using the Vue CLI:

```bash
npm install -g @vue/cli @vue/cli-service-global
vue create hello-world
```

When running `vue create` select `Vue 2` as a preset,

```bash
Vue CLI v4.5.7
? Please pick a preset: (Use arrow keys)
❯ Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features
```

You can verify your app works by running it locally:

```bash
cd hello-world
npm run serve
```

You should see an output like this in the terminal:

```bash
 DONE  Compiled successfully in 1667ms                                9:54:44 AM


  App running at:
  - Local:   http://localhost:8080/
  - Network: http://172.20.10.8:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

```

## Configuring your Vue.js app for {{ PRODUCT_NAME }}

### Initialize your project

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required XDN dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Vue.js.

### Configure the routes

Next you'll need to configure {{ PRODUCT_NAME }} routing in the `routes.js` file.

For the Vue `hello-world` template, replace the `routes.js` file that was created during `{{ CLI_NAME }} init` with the following:

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  // Send requests to static assets in the build output folder `dist`
  .static('dist')

  // Send everything else to the App Shell
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })
```

The example above assumes you're using Vue as a single page app. It routes the static assets (JavaScript, CSS, and Images) in the production build folder `dist` and maps all other requests to the app shell in `dist/index.html`.

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Vue.js app locally on {{ PRODUCT_NAME }}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
npm run {{ CLI_NAME }}:dev
```

Load the site: http://127.0.0.1:3000 !

## Deploying

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Next, deploy the build to {{ PRODUCT_NAME }} by running the `{{ CLI_NAME }} deploy` command:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

## Server Side Rendering

For server side rendered Vue.js apps we recommend using the Nuxt.js framework which is supported on {{ PRODUCT_NAME }}. Refer to the [Nuxt](nuxt) guide for more information.

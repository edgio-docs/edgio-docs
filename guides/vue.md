# Vue.js

This guide shows you how to deploy a Vue.js application on the Moovweb XDN.

## Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from official [Node.js downloads](https://nodejs.org/en/download/) page. Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

## Sign up for the XDN

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup).

## Install the XDN CLI

If you have not already done so, install the [XDN CLI](cli)

```bash
npm i -g @xdn/cli
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

## Configuring your Vue.js app for the XDN

###  Initialize your project

In the root directory of your project run `xdn init`:

```bash
xdn init
```

This will automatically update your `package.json` and add all of the required XDN dependencies and files to your project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `xdn.config.js` - A configuration file for the XDN
- `routes.js` - A default routes file that sends all requests to Vue.js. 

### Configure the routes

Next you'll need to configure the XDN routing in the `routes.js` file. 

For the Vue `hello-world` template, replace your `routes.js` file with the following:

```js
const { Router } = require('@xdn/core/router')

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

## Deploying

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Next, deploy the build to the Moovweb XDN by running the `xdn deploy` command:

```bash
xdn deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

## Server Side Rendering

For server side rendered Vue.js apps we recommend using the Nuxt.js framework which is supported on the XDN. Refer to the [Nuxt](nuxt) guide for more information.

# Fastboot

This guide shows you how to deploy [Ember Fastboot](https://ember-fastboot.com/) apps on the Moovweb XDN.

## Example Site

Here is an example of a Fastboot app running on the XDN:

[Try the Fastboot Example Site](https://moovweb-docs-xdn-ember-fastboot-example-default.moovweb-edge.io?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-ember-fastboot-example?button)

## Connector

This framework has a connector developed for the XDN. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/moovweb-docs/xdn-connectors/tree/main/xdn-fastboot-connector?button)

## Install Node.js and npm

**XDN only supports Node.js version 12.x**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

To prepare your Fastboot app for deployment on the Moovweb XDN, run the following in the root folder of your project:

```
npm install -g @xdn/cli
xdn init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/fastboot` package - Provides router middleware that automatically adds Fastboot routes to the XDN router.
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `@xdn/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Fastboot. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on the XDN.
- `xdn.config.js` - Contains configuration options for deploying on the XDN.

## Adding the XDN Service Worker

To add the XDN service worker to your app, call the `install` function from `@xdn/prefetch/window` hook when the app first loads. For example, you can alter
`app/app.js` as follows:

```js
import Application from '@ember/application'
import Resolver from 'ember-resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'

// add this to import the XDN service worker prefetching functionality
import { install } from '@xdn/prefetch/window'

export default class App extends Application {
  modulePrefix = config.modulePrefix
  podModulePrefix = config.podModulePrefix
  Resolver = Resolver
}

loadInitializers(App, config.modulePrefix)

// add this to install the service worker when your app loads
if (typeof navigator != 'undefined') {
  install()
}
```

## dependencies vs devDependencies

To reduce serverless cold-start times, limit the packages listed in the `dependencies` section of your `package.json` to only those packages used at runtime. The `@xdn/fastboot` package must also be included in `dependencies`. Other packages not used at runtime should be included in `devDependencies`. Only those packages listed in `dependencies` are deployed to the XDN along with your application code.

## xdn.config.js

Ember fastboot apps should always have the following in xdn.config.js:

```js
module.exports = {
  connector: '@xdn/fastboot',
  includeNodeModules: true, // this ensures that package.json dependencies are uploaded to the cloud
}
```

## Running Locally

To simulate your app within the XDN locally, run:

```
xdn dev
```

### Simulate edge caching locally

To simulate edge caching locally, run:

```
xdn dev --cache
```

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project

```
xdn deploy
```

See [deploying](deploying) for more information.

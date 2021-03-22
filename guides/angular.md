# Angular

This guide shows you how to deploy an Angular application on the Moovweb XDN:

## Example SSR Site

This Angular example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

[Try the Angular SSR Example Site](https://moovweb-docs-xdn-angular-example-default.moovweb-edge.io/category/hats?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-angular-example?button)

## Connector

This framework has a connector developed for the XDN. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/moovweb-docs/xdn-connectors/tree/main/xdn-angular-connector?button)

## Install Node.js and npm

**XDN only supports Node.js version 12.x**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

If you don't already have an Angular application, you can create one using the following steps:

#### 1. Create a new Angular App

```bash
npm install -g @angular/cli
ng new my-xdn-angular-app
```

You should now have a working starter app. Run `ng serve` to see the application running on `localhost:4200`.

#### 2. Add SSR

To deploy your Angular application on the Moovweb XDN it needs to support server-side rendering (SSR). To add SSR support, run:

```bash
ng add @nguniversal/express-engine
```

Read more about server-side rendering in Angular [here](https://angular.io/guide/universal).

The previous command created:

- A server-side application module (`app.server.module.ts`)
- A bootstrapper for the server app (`main.server.ts`)
- `server.ts` which exports an Express app
- TypeScript configuration for the server (`tsconfig.server.json`)

You can now run `npm run build:ssr && npm run serve:ssr` to access your server-side rendered app at `localhost:4000`.

To prepare your Angular application for deployment on the Moovweb XDN:

#### 1. Install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

#### 2. Run the following in the root folder of your project. This will configure your project for the XDN.

```bash
xdn init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/angular` package
- The `@xdn/cli` package
- `xdn.config.js`- Contains various configuration options for the XDN.
- `routes.js` - A default routes file that sends all requests to the Angular Universal server. Update this file to add caching or proxy some URLs to a different origin.

#### 3. Use the right angular project

If you have several projects and the `defaultProject` as specified in `angular.json` is not the project with the SSR build, specify the correct project with the `ANGULAR_PROJECT` environment variable. For example: `ANGULAR_PROJECT=my-ssr-project xdn build`.

## Routing

The default `routes.js` file created by `xdn init` sends all requests to Angular server via a fallback route.

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { Router } = require('@xdn/core/router')
import { angularRoutes } from '@xdn/angular'

export default new Router().use(angularRoutes)
```

## Caching

The easiest way to add edge caching to your Angular app is to add caching routes before the middleware. For example,
imagine you have a route `/pages/c/:categoryId`:

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
  .use(angularRoutes)
```

## Running Locally

To test your app locally, run:

```bash
xdn run
```

You can do a production build of your app and test it locally using:

```bash
xdn build && xdn run --production
```

Setting `--production` runs your app exactly as it will be when deployed to the Moovweb cloud.

If you have several projects and the `defaultProject` in `angular.json` is not the project you would like to deploy, specify the correct project by setting the `ANGULAR_PROJECT` environment variable when running `xdn run`.

For example:

```
ANGULAR_PROJECT=my-project xdn run
```

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```bash
xdn deploy
```

If you have several projects and the `defaultProject` in `angular.json` is not the project you would like to deploy, specify the correct project by setting the `ANGULAR_PROJECT` environment variable when running `xdn deploy`.

For example:

```
ANGULAR_PROJECT=my-project xdn deploy
```

See [deploying](deploying) for more information.

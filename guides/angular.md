# Angular

This guide shows you how to deploy an Angular application on {{ PRODUCT_NAME }}:

## Example SSR Site

This Angular example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

[Try the Angular SSR Example Site](https://layer0-docs-layer0-angular-example-default.layer0.link/category/hats?button)
[View the Code](https://github.com/{{ EXAMPLES_REPO }}/tree/main/layer0-angular-example?button)

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-angular-connector?button)

## Install Node.js and npm

**{{ PRODUCT_NAME }} only supports Node.js version {{ NODE_VERSION }}**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 14 locally, your app will run in Node 14 when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node 14 for all development._

## Getting Started

If you don't already have an Angular application, you can create one using the following steps:

#### 1. Create a new Angular App

```bash
npm install -g @angular/cli
ng new my-{{ PRODUCT_NAME_LOWER }}-angular-app
```

You should now have a working starter app. Run `ng serve` to see the application running on `localhost:4200`.

#### 2. Add SSR

To deploy your Angular application on {{ PRODUCT_NAME }} it needs to support server-side rendering (SSR). To add SSR support, run:

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

To prepare your Angular application for deployment on {{ PRODUCT_NAME }}:

#### 1. Install {{ PRODUCT_NAME }} CLI globally:

```bash
npm install -g {{ PACKAGE_NAME }}/cli
```

#### 2. Run the following in the root folder of your project. This will configure your project for {{ PRODUCT_NAME }}.

```bash
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/angular` package
- The `{{ PACKAGE_NAME }}/cli` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT_NAME }}.
- `routes.js` - A default routes file that sends all requests to the Angular Universal server. Update this file to add caching or proxy some URLs to a different origin.

#### 3. Use the right angular project

If you have several projects and the `defaultProject` as specified in `angular.json` is not the project with the SSR build, specify the correct project with the `ANGULAR_PROJECT` environment variable. For example: `ANGULAR_PROJECT=my-ssr-project {{ CLI_NAME }} build`.

## Routing

The default `routes.js` file created by `{{ CLI_NAME }} init` sends all requests to Angular server via a fallback route.

```js
// This file was automatically added by {{ CLI_NAME }} deploy.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
import { angularRoutes } from '{{ PACKAGE_NAME }}/angular'

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
{{ CLI_NAME }} run
```

You can do a production build of your app and test it locally using:

```bash
{{ CLI_NAME }} build && {{ CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be when deployed to the {{ PRODUCT_NAME }} cloud.

If you have several projects and the `defaultProject` in `angular.json` is not the project you would like to deploy, specify the correct project by setting the `ANGULAR_PROJECT` environment variable when running `{{ CLI_NAME }} run`.

For example:

```
ANGULAR_PROJECT=my-project {{ CLI_NAME }} run
```

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project:

```bash
{{ CLI_NAME }} deploy
```

If you have several projects and the `defaultProject` in `angular.json` is not the project you would like to deploy, specify the correct project by setting the `ANGULAR_PROJECT` environment variable when running `{{ CLI_NAME }} deploy`.

For example:

```
ANGULAR_PROJECT=my-project {{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

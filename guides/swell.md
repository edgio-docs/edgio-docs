# Swell

This guide shows you how to deploy a Swell application on {{ PRODUCT_NAME }}. Clone the repo [layer0-swell](https://github.com/layer0-docs/layer0-swell) to get the entire setup.

## What is Swell?

[Swell](https://www.swell.is/) is a customizable headless ecommerce platform that supports unique business models and customer experiences for global B2C and B2B merchants. Swell's API-first backend and modern development tools provide a future-proof platform for innovative businesses from small coffee roasters to international enterprises.

## Example

A Swell powered ecommerce backend and a Nuxt.js app for the framework.

[Try the Swell with Nuxt.js Example Site](https://layer0-docs-swell-origin-theme-default.layer0-limelight.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-swell-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-swell-example)

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
```

{{ SYSTEM_REQUIREMENTS }}

## Create a new Swell app

If you don't already have a Swell app, create one by running the following:

```bash
# Clone the app
git clone https://github.com/swellstores/origin-theme
# Install dependencies
yarn install
```

## Connecting to Swell

### Authentication with Swell

This account enables access to your store ID and API key which are necessary for API access. To access API keys, follow these steps, beginning on the left sidebar of the admin dashboard.

- Navigate to "Admin".
- Navigate to "Settings".
- Click on "API".
- At the top of the page, copy the Store ID.
- Under one of the secret keys, click on the eye icon to make the key visible.
- Copy the secret key.

### Add variables to .env

Add your Swell store ID, public key and url to `.env`:

```
SWELL_STORE_ID=your_store_id
SWELL_PUBLIC_KEY=GET_YOUR_PK_FROM_THE_ADMIN_DASHBOARD
SWELL_STORE_URL=https://your_store_id.swell.store
```

You can now verify that your app works by running it locally with:

```bash
yarn run dev
```

## Configuring your Swell app for {{ PRODUCT_NAME }}

### Modify nuxt.config.js

In the existing `nuxt.config.js` configuration, add "{{ PACKAGE_NAME }}/nuxt/module" to `buildModules`:

```js
// nuxt.config.js

module.exports = {
  ...
  buildModules: [['{{ PACKAGE_NAME }}/nuxt/module', { {{ FULL_CLI_NAME }}SourceMaps: true }]],
  ...
}
```

Options:

- `{{ FULL_CLI_NAME }}SourceMaps: true|false`: when true, the serverless build includes sourcemap files which make debugging easier when tailing the server logs in the Layer0 Developer Console. It also increases the serverless bundle size, which may push your deployments over the 50MB (compressed) limit.

### Initialize your project

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

The `{{ CLI_NAME }} init` command will automatically add all the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/nuxt` package
- The `{{ PACKAGE_NAME }}/vue` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT_NAME }}.
- `routes.js` - A default routes file that sends all requests to `nuxt.js`. You can update this file to add caching or proxy some URLs to a different origin as described later in this guide.
- `sw/service-worker.js` - A service worker that provides static asset and API prefetching.

This command will also update your `package.json` with the following changes:

- Moves all packages in `dependencies` to `devDependencies` except those listed in the `modules` property of `nuxt.config.js`.
- Adds `@nuxt/core` to `dependencies`
- Adds several `scripts` to run the available `{{{ CLI_NAME }}` commands

## Run Swell app locally on Layer0

Run the Swell app with the command:

```bash
{{ CLI_NAME }} build && {{ CLI_NAME }} run --production
```

Load the site: http://127.0.0.1:3000

Setting --production runs your app exactly as it will be uploaded to the Layer0 cloud using serverless-offline.

## Deploying

Deploy the build to {{ PRODUCT_NAME }} by running the `{{ CLI_NAME }} deploy` command:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

## Bonus: Generate pages on demand

1. To preserve packages that are imported in the `modules` directories required in the generating pages on the server, update `package.json` as follows:

```diff
"dependencies": {
  "@nuxtjs/sitemap": "2.4.0",
  "@nuxt/core": "2.15.7"
+ "lodash": "4.17.21",
+ "mitt": "2.1.0",
+ "consola": "2.15.3",
+ "build-url": "6.0.1",
+ "deepmerge": "4.2.2",
+ "swell-js": "3.10.0",
+ "p-map": "5.2.0"
}
```

2. To include the `confing` and `modules` directories in the production build, update your `layer0.config.js` as follows:

```diff
'use strict'

// This file was automatically added by layer0 deploy.
// You should commit this file to source control.

module.exports = {
  backends: {},
  includeNodeModules: true,
  connector: '@layer0/nuxt',
+ includeFiles: {
+   config: true,
+   modules: true,
+   'static/lang/**/*': true,
+ },
}

```

3. Update the `routes.js` as following to enable ISG with your Swell app:

```js
// This file was added by layer0 init.
// You should commit this file to source control.

const { Router } = require('@layer0/core/router')
const { nuxtRoutes } = require('@layer0/nuxt')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .get('/products/:product', ({ serveStatic, cache, renderWithApp }) => {
    cache({
      edge: {
        maxAgeSeconds: 60,
        staleWhileRevalidateSeconds: 1,
      },
      browser: false,
    })
    serveStatic('dist/products/:product/index.html', {
      onNotFound: () => renderWithApp(),
    })
  })
  .use(nuxtRoutes)
```

4. Deploy!

```bash
{{ CLI_NAME }} deploy
```

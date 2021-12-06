# Ionic React

This guide shows you how to deploy a Ionic React application on {{ PRODUCT_NAME }}.

## Example

[Try the Ionic React Example Site](https://layer0-docs-layer0-ionic-react-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/layer0-ionic-react-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-ionic-react-example)

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Create a new Ionic React app

If you don't already have a Ionic React app, create one by running the following:

```bash
npm install -g @ionic/cli
ionic start myApp tabs --type react
cd myApp
```

You can verify your app works by running it locally with:

```bash
npm run start
```

## Configuring your Ionic React app for {{ PRODUCT_NAME }}

### Initialize your project

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Ionic React.

### Configure the routes

Update `routes.js` at the root of your project to the following:

```js
// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'

export default new Router()
  .static('build', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 60 * 365,
        forcePrivateCaching: true,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
    })
  })
  .fallback(({ appShell }) => {
    appShell('build/index.html')
  })
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Ionic React app locally on {{ PRODUCT_NAME }}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

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
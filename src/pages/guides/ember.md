---
title: Ember.js
---

This guide shows you how to deploy an [Ember.js](https://emberjs.com/) application on the {{ COMPANY_NAME }} {{ PRODUCT }} platform.

## Example {/*example*/}

<ExampleButtons
  title="Ember.js"
  siteUrl="https://layer0-docs-layer0-emberjs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-emberjs-example" 
  deployFromRepo />

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP }}

{{ INSTALL_CLI }}

## Create a new Ember.js app {/*create-a-new-emberjs-app*/}

If you don't already have an Ember.js app, create one by running the following:

```bash
npm install -g ember-cli
ember new ember-quickstart --lang en
cd ember-quickstart
```

You can verify your app works by running it locally with:

```bash
ember serve
```

## Configuring your Ember.js app for {{ PRODUCT }} {/*configuring-your-emberjs-app-for-appops*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Ember.js.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ PRODUCT_NAME_LOWER }} init.
// You should commit this file to source control.

import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core/router'

export default new Router()
  .match('/robots.txt', ({ serveStatic }) => {
    serveStatic('dist/robots.txt')
  })
  .match('/assets/:path*', ({ cache, serveStatic }) => {
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
    serveStatic('dist/assets/:path*')
  })
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Ember.js app locally on the {{ PRODUCT_PLATFORM }} {/*run-the-emberjs-app-locally-on-the-app-platform*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

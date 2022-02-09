---
title: VitePress
---

# VitePress

This guide shows you how to deploy a [VitePress](https://vitepress.vuejs.org/) application on Layer0.

## Example

[Try the VitePress Example Site](https://layer0-docs-layer0-vitepress-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/layer0-vitepress-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-vitepress-example)

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP_LAYER0 }}

## Install the Layer0 CLI

If you have not already done so, install the [Layer0 CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Create a new VitePress app

If you don't already have a VitePress app, create one by following the [official guide](https://vitepress.vuejs.org/guide/getting-started.html#getting-started).

## Configuring your VitePress app for Layer0

### Initialize your project

In the root directory of your project run `0init`:

```bash
0init
```

This will automatically update your `package.json` and add all of the required Layer0 dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on Layer0
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for Layer0
- `routes.js` - A default routes file that sends all requests to VitePress.

### Configure the routes

Update `routes.js` at the root of your project to the following:

```js
// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'

export default new Router().static('docs/.vitepress/dist', ({ cache }) => {
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
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the VitePress app locally on Layer0

Create a production build of your app by running the following in your project's root directory:

```bash
yarn docs:build
```

Run Layer0 on your local machine:

```bash
0dev
```

Load the site http://127.0.0.1:3000

## Deploying

Create a production build of your app by running the following in your project's root directory:

```bash
yarn docs:build
```

Next, deploy the build to Layer0 by running the `0 deploy` command:

```bash
0 deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

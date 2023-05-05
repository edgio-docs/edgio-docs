---
title: Ember.js
---

This guide shows you how to deploy an [Ember.js](https://emberjs.com/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Ember.js"
  siteUrl="https://edgio-community-examples-emberjs-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-emberjs-example" 
  deployFromRepo />

{{ PREREQ }}

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

## Configuring your Ember.js app for {{ PRODUCT }} {/*configuring-your-emberjs-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Ember.js.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

import { Router } from '{{ PACKAGE_NAME }}/core/router'

export default new Router()
  // Create serveStatic route for each file in the folder dist with a cache-control header of 's-maxage=315360000'
  .static('dist')
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })
```

Refer to the [CDN-as-code](/applications/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Ember.js app locally on the {{ PRODUCT_PLATFORM }} {/*run-the-emberjs-app-locally-on-the*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/applications/basics/deployments) guide for more information on the `deploy` command and its options.

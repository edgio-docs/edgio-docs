---
title: Gridsome
---

This guide shows you how to deploy a [Gridsome](https://gridsome.org/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Gridsome"
  siteUrl="https://edgio-community-examples-gridsome-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-gridsome-example" 
  deployFromRepo />

{{ PREREQ }}

## Create a new Gridsome app {/*create-a-new-gridsome-app*/}

If you don't already have a Gridsome app, create one by running the following:

```bash
npm install --global @gridsome/cli
gridsome create my-gridsome-site
cd my-gridsome-site
```

You can verify your app works by running it locally with:

```bash
gridsome develop
```

## Configuring your Gridsome app for {{ PRODUCT_NAME }} {/*configuring-your-gridsome-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Gridsome.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

import { Router } from '{{ PACKAGE_NAME }}/core/router'

export default new Router()
  // Create serveStatic route for each file in the folder dist with a cache-control header of 's-maxage=315360000'
  .static('dist')
```

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Gridsome app locally on {{ PRODUCT_NAME }} {/*run-the-gridsome-app-locally-on*/}

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

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.

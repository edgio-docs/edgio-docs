---
title: React Static
---

This guide shows you how to deploy a [React Static](https://github.com/react-static/react-static) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="React Static"
  siteUrl="https://layer0-docs-layer0-react-static-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-react-static-example" 
  deployFromRepo />

{{ PREREQ }}

## Create a new React Static app {/*create-a-new-react-static-app*/}

If you don't already have a React Static app, create one by running the following:

```bash
npm i -g react-static
react-static create
cd project-name # The root directory of your project
```

You can verify your app works by running it locally with:

```bash
yarn start
```

## Configuring your React Static app for {{ PRODUCT }} {/*configuring-your-react-static-app-for-edgio*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to React Static.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ PRODUCT_NAME_LOWER }} init.
// You should commit this file to source control.

import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core/router'

export default new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  . noIndexPermalink()
  .static('dist', ({ cache }) => {
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

### Run the React Static app locally on {{ PRODUCT }} {/*run-the-react-static-app-locally-on-edgio*/}

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

---
title: Remix
---

This guide shows you how to deploy a [Remix](https://remix.run/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Remix Express"
  siteUrl="https://layer0-docs-layer0-remix-express-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-remix-express-example" 
  deployFromRepo />

{{ PREREQ }}

## Create a new Remix app {/*create-a-new-remix-app*/}

If you don't already have a Remix app, create one by running the following:

```bash
npx create-remix@latest
# Choose express server
cd project-name
```

You can verify your app works by running it locally with:

```bash
npm run dev
```

## Configuring your Remix app for {{ PRODUCT }} {/*configuring-your-remix-app-for-edgio*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Remix.

### Install {{ PACKAGE_NAME }}/express {/*install-layer0express*/}

Install {{ PACKAGE_NAME }}/express by running the following:

```bash
npm install {{ PACKAGE_NAME }}/express
```

### Update {{ PRODUCT }} Configuration {/*update-edgio-configuration*/}

Update `{{ CONFIG_FILE }}` at the root of your project to the following:

```js
// This file was automatically added by {{ PRODUCT_NAME_LOWER }} deploy.
// You should commit this file to source control.
module.exports = {
  connector: '{{ PACKAGE_NAME }}/express',
  express: {
    appPath: './server/index.js',
  },
  includeFiles: {
    public: true,
  },
}
```

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ PRODUCT_NAME_LOWER }} init.
// You should commit this file to source control.
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

const { Router } = require('@{{ PACKAGE_NAME }}/core/router')

module.exports = new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  .noIndexPermalink()
  .match('/', ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
  })
  .match('/example-path', ({ cache }) => {
    // other paths
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
      },
      browser: false,
    })
  })
  .match('/build/:path*', ({ cache }) => {
    // route build output files through {{ PRODUCT }}
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
        forcePrivateCaching: true,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
      },
    })
  })
  .fallback(({ renderWithApp }) => renderWithApp())
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Remix app locally on {{ PRODUCT }} {/*run-the-remix-app-locally-on-edgio*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run {{ PRODUCT }} on your local machine:

```bash
{{ CLI_NAME }} run --production
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

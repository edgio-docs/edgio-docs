# Gatsby

This guide shows you how to deploy an Gatsby application on {{ PRODUCT_NAME }}:

![video](https://www.youtube.com/watch?v=ici9j6oF_5E)

## Example SSG Site

This Gatsby example app uses static site generation and prefetching to provide lightning-fast transitions between pages.

[Try the Gatsby SSR Example Site](https://layer0-docs-layer0-gatsby-example-default.layer0.link?button)
[View the Code](https://github.com/layer0-docs/gatsby?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/gatsby)

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-gatsby-connector?button)

## Install Node.js and npm

**{{ PRODUCT_NAME }} only supports Node.js version 14**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 14 locally, your app will run in Node 14 when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node 14 for all development._

## Getting Started

If you don't already have a Gatsby application, you can create one using:

```bash
npm install -g gatsby-cli
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

You should now have a working Gatsby site. Run `gatsby develop` to see the application running on `localhost:8000`.

To deploy your Gatsby on {{ PRODUCT_NAME }}:

1. Install the {{ PRODUCT_NAME }} CLI globally:

```bash
npm install -g {{ PACKAGE_NAME }}/cli
```

2. Run the following in the root folder of your project. This will configure your project for {{ PRODUCT_NAME }}.

```bash
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/gatsby` package
- The `{{ PACKAGE_NAME }}/cli` package
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to your Gatsby static site. Update this file to add caching or proxy some URLs to a different origin.

## Running Locally

You can test the integration of the {{ PRODUCT_NAME }} router with your gatsby site locally using:

```bash
{{ CLI_NAME }} dev
```

## Deploying

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project:

```bash
{{ CLI_NAME }} deploy
```

See [Deploying](deploying) guide for more information.

## Routing

The default `routes.js` file created by `{{ CLI_NAME }} init` sends all requests to the Gatsby static site.

```js
// This file was automatically added by {{ CLI_NAME }} deploy.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { gatsbyRoutes } = require('{{ PACKAGE_NAME }}/gatsby')

module.exports = new Router().use(gatsbyRoutes)
```

### Adding routes to a different origin

To proxy some URLs to a different origin, you need first to configure that origin in your `{{ CONFIG_FILE }}` file.

For example:

```js
// {{ CONFIG_FILE }}

module.exports = {
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'legacy.my-site.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'legacy.my-site.com',
    },
  },
}
```

Using environment variables here allows you to configure different legacy domains for each {{ PRODUCT_NAME }} environment.

Then you can add routing and caching rules to your `routes.js` file. Note that gatsbyRoute must be declared last as it acts as a fallback route.

For example:

```js
// routes.js

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { gatsbyRoutes } = require('{{ PACKAGE_NAME }}/gatsby')

module.exports = new Router()
  .get('/some/legacy/url/:p', ({ proxy }) => {
    proxy('legacy')
  })
  .use(gatsbyRoutes)
```

Check [Routing](routing) and [Caching](caching) guides for more information.

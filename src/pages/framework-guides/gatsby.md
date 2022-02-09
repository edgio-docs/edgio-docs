---
title: Gatsby
---

# Gatsby

This guide shows you how to deploy an [Gatsby](https://www.gatsbyjs.com/) application on Layer0.

![video](https://www.youtube.com/watch?v=ici9j6oF_5E)

## Example

[Try the Gatsby SSG Example Site](https://layer0-docs-layer0-gatsby-example-default.layer0-limelight.link?button)
[View the Code](https://github.com/layer0-docs/layer0-gatsby-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-gatsby-example)

## Connector

This framework has a connector developed for Layer0. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-gatsby-connector?button)

{{ SYSTEM_REQUIREMENTS }}

## Getting Started

If you don't already have a Gatsby application, you can create one using:

```bash
npm install -g gatsby-cli
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

You should now have a working Gatsby site. Run `gatsby develop` to see the application running on `localhost:8000`.

To deploy your Gatsby on Layer0:

1. Install the Layer0 CLI globally:

```bash
npm install -g {{ PACKAGE_NAME }}/cli
```

2. Run the following in the root folder of your project. This will configure your project for Layer0.

```bash
0init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/gatsby` package
- The `{{ PACKAGE_NAME }}/cli` package
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to your Gatsby static site. Update this file to add caching or proxy some URLs to a different origin.

## Running Locally

You can test the integration of the Layer0 router with your gatsby site locally using:

```bash
0dev
```

## Deploying

Deploying requires an account on Layer0. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to Layer0 by running the following in the root folder of your project:

```bash
0 deploy
```

See [Deploying](deploying) guide for more information.

## Routing

The default `routes.js` file created by `0init` sends all requests to the Gatsby static site.

```js
// This file was automatically added by 0 deploy.
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

Using environment variables here allows you to configure different legacy domains for each Layer0 environment.

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

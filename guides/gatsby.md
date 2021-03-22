# Gatsby

This guide shows you how to deploy an Gatsby application on the Moovweb XDN:

![video](https://www.youtube.com/watch?v=ici9j6oF_5E)

## Connector

This framework has a connector developed for the XDN. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/moovweb-docs/xdn-connectors/tree/main/xdn-gatsby-connector?button)

## Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Getting Started

If you don't already have a Gatsby application, you can create one using:

```bash
npm install -g gatsby-cli
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

You should now have a working Gatsby site. Run `gatsby develop` to see the application running on `localhost:8000`.

To deploy your Gatsby on Moovweb XDN:

1. Install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

2. Run the following in the root folder of your project. This will configure your project for the XDN.

```bash
xdn init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/gatsby` package
- The `@xdn/cli` package
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to your Gatsby static site. Update this file to add caching or proxy some URLs to a different origin.

## Running Locally

You can test the integration of the XDN router with your gatsby site locally using:

```bash
xdn dev
```

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```bash
xdn deploy
```

See [Deploying](deploying) guide for more information.

## Routing

The default `routes.js` file created by `xdn init` sends all requests to the Gatsby static site.

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { Router } = require('@xdn/core/router')
const { gatsbyRoutes } = require('@xdn/gatsby')

module.exports = new Router().use(gatsbyRoutes)
```

### Adding routes to a different origin

To proxy some URLs to a different origin, you need first to configure that origin in your `xdn.config.js` file.

For example:

```js
// xdn.config.js

module.exports = {
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'legacy.my-site.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'legacy.my-site.com',
    },
  },
}
```

Using environment variables here allows you to configure different legacy domains for each XDN environment.

Then you can add routing and caching rules to your `routes.js` file. Note that gatsbyRoute must be declared last as it acts as a fallback route.

For example:

```js
// routes.js

const { Router } = require('@xdn/core/router')
const { gatsbyRoutes } = require('@xdn/gatsby')

module.exports = new Router()
  .get('/some/legacy/url/:p', ({ proxy }) => {
    proxy('legacy')
  })
  .use(gatsbyRoutes)
```

Check [Routing](routing) and [Caching](caching) guides for more information.

# Gatsby

This guide shows you how to deploy an Gatsby application on the Moovweb XDN:

## Getting Started

If you don't already have a Gatsby application, you can create one using:

```bash
npm install -g gatsby-cli
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

You should now have a working Gatsby site. Run `gatsby serve` to see the application running on `localhost:8000`.

To deploy your Gatsby on Moovweb XDN:

1. Install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

2. Run `xdn init`

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/gatsby` package
- The `@xdn/cli` package
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to your Gatsby static site. Update this file to add caching or proxy some URLs to a different origin.


## Routing

The default `routes.js` file created by `xdn init` sends all requests to the Gatsby static site.

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { Router } = require('@xdn/core/Router')
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

const { Router } = require('@xdn/core/Router')
const { gatsbyRoutes } = require('@xdn/gatsby')

module.exports = new Router()
  .get('/some/legacy/url/:p', ({ proxy }) => {
    proxy('legacy')
  })
  .use(gatsbyRoutes)

````

Check [routing](routing) and [caching](caching) for more information.

### Running Locally

You can test the integration of the XDN router with your gatsby site locally using:

```bash
xdn build && xdn run
```

### Deploying

To deploy your app to the Moovweb XDN, run:

```bash
xdn deploy
```

See [deploying](deploying) for more information.

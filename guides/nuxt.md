# Nuxt.js

This guide shows you how to deploy a Nuxt.js application on the Moovweb XDN:

## Getting Started

If you don't already have a nuxt.js application, you can create one using:

```
npm create nuxt-app my-nuxt-app
```

To deploy your Nuxt.js application on the Moovweb XDN:

1. Set `mode: 'universal'` in `nuxt.config.js`. Also, ensure that this file uses `module.exports = {`, rather than `export default {`. If this file doesn't exist, create it with the following content:

```js
module.exports = {
  mode: 'universal',
}
```

2. Run `xdn init`

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/nuxt` package
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to `nuxt.js`. Update this file to add caching or proxy some URLs to a different origin.

## Routing

The XDN supports Nuxt.js's built-in routing scheme. The default `routes.js` file created by `xdn init` sends all requests to Nuxt.js via a fallback route:

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router')
const { createNuxtPlugin } = require('@xdn/nuxt')
const { nuxtMiddleware } = createNuxtPlugin()

module.exports = new Router().use(nuxtMiddleware)
```

### Middleware

In the code above, `nuxtMiddleware` adds all Nuxt.js routes based on the `/pages` directory. You can add additional routes before and after the middleware, for example to send some URLs to an alternate backend. This is useful for gradually replacing an existing site with a new Nuxt.js app.

A popular use case is to fallback to a legacy site for any route that your Nuxt.js app isn't configured to handle:

```js
new Router()
  .use(nuxtMiddleware)
  .fallback(({ proxy }) => proxy('legacy'))
```

To configure the legacy backend, use xdn.config.js:

```js
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

### Vanity Routes

For SEO purposes, you may want to add additional "vanity" routes that point to Nuxt.js. You can do this by combining the [@nuxtjs/router-extras](https://github.com/nuxt-community/router-extras-module) library with an update to your XDN Router.

First, install the `@nuxtjs/router-extras` library:
```bash
npm install --save-dev @nuxtjs/router-extras
```

In your `xdn.config.js` file, add the module under the `buildModules` config (*Note*: use `modules` if using Nuxt `< 2.9.0`):
```js
{
  buildModules: [
    '@nuxtjs/router-extras',
  ]
}
```

Now, using the `renderNuxt` function returned from `createNuxtPlugin()`, update your router to use the vanity route:

```js
const { Router } = require('@xdn/core/router')
const { createNuxtPlugin } = require('@xdn/nuxt')
const { renderNuxt, nuxtMiddleware } = createNuxtPlugin()

module.exports = new Router()
  .use(nuxtMiddleware)
  .match('/some/vanity/url/:p', async ({ render }) => {
    await render(async (req, res, params) =>
      renderNuxt(req, res, "/p/{p}", { id: params.p })
    )
  })
```

Finally, define the vanity route as an `alias` in a `<router>` tag within the page file:

```vue
<router>
{
  alias: [
    '/some/vanity/url/:p',
  ]
}
</router>
```

### Caching

The easiest way to add edge caching to your nuxt.js app is to add caching routes before the middleware.  For example, 
imagine you have `/pages/c/_categoryId.js`:


```js
new Router()
  .match('/pages/c/:categoryId', async ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60
      }
    })
  })
  .use(nuxtMiddleware)
```

### Running Locally

To test your app locally, run:

```
xdn run
```

You can do a production build of your app and test it locally using:

```
xdn build && xdn run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the Moovweb cloud using serverless-offline.

### Deploying

To deploy your app to the Moovweb XDN, run:

```
xdn deploy
```

See [deploying](deploying) for more information.

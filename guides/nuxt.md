# Nuxt.js

This guide shows you how to deploy a Nuxt.js application on the Moovweb XDN. If you run into any issues please consult the [Troubleshooting](#section_troubleshooting) section.

## Install Node.js and npm

If you do not have Node.js installed on your system, download and install it from official [Node.js downloads](https://nodejs.org/en/download/) page. Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

## Getting Started

If you have not already done so, install the [XDN CLI](cli)

```bash
npm i -g @xdn/cli
```

If you don't already have a nuxt.js application, you can create one using:

```bash
npm create nuxt-app my-nuxt-app
```

Nuxt's create module will ask you a series of questions to configure your app. Make sure you answer as follows:

- For `Choose custom server framework` select `None`
- For `Choose rendering mode` select `Universal (SSR)`
- Your answers to the other questions should not matter for the purposes of this guide. 

To prepare your Nuxt.js application for the Moovweb XDN:

1. Set `mode: 'universal'` in `nuxt.config.js`. Also, ensure that this file uses `module.exports = {`, rather than `export default {`. If this file doesn't exist, create it with the following content:

```js
module.exports = {
  mode: 'universal',
}
```

2. Install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

3. Run `xdn init`

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/nuxt` package
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to `nuxt.js`. You can update this file to add caching or proxy some URLs to a different origin as described later this in guide.

3. Update your `package.json` with the following changes:

- Move all of the `dependencies` in `package.json` to `devDependencies`
- Add `dotenv`, `serverless`, `serverless-dotenv-plugin`, and `serverless-offline` to the `devDependencies`
- Add `nuxt-start` as the sole module in `dependencies`
- Change the `scripts` to call `xdn` instead of `nuxt.

As an example, here's the original `package.json` from Nuxt's create step:

```json
{
  "name": "my-nuxt-app",
  "version": "1.0.0",
  "description": "My remarkable Nuxt.js project",
  "author": "Techy Ted",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@xdn/cli": "^1.16.2",
    "@xdn/core": "^1.16.2",
    "@xdn/nuxt": "^1.16.2",
    "nuxt": "^2.0.0"
  },
  "devDependencies": {}
}
```

And here is the `package.json` after the required modifications:

```json
{
  "name": "my-nuxt-app",
  "version": "1.0.0",
  "description": "My remarkable Nuxt.js project",
  "author": "Techy Ted",
  "private": true,
  "scripts": {
    "dev": "xdn run",
    "build": "xdn build",
    "start": "xdn run",
    "prod": "xdn run --production",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "nuxt-start": "^2.12.2"
  },
  "devDependencies": {
    "@xdn/cli": "^1.16.2",
    "@xdn/core": "^1.16.2",
    "@xdn/nuxt": "^1.16.2",
    "dotenv": "^8.2.0",
    "nuxt": "^2.0.0",
    "serverless": "^1.64.0",
    "serverless-dotenv-plugin": "^2.3.2",
    "serverless-offline": "^5.12.1"
  }
}
```

The next few sections of this guide explain how the XDN interacts with Nuxt's routing, which is important if you are migrating an existing application. If you just created a new nuxt app, you can jump to [Running Locally](#section-running-locally) and come back to these sections later.

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

```jsx
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

## Running Locally

To test your app locally, run:

```bash
xdn run
```

You can do a production build of your app and test it locally using:

```bash
xdn build && xdn run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the Moovweb cloud using serverless-offline.

## Deploying

Deploying requires an account on the Moovweb XDN. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to the Moovweb XDN:

```bash
xdn deploy
```

See [deploying](deploying) for more information.


## Troubleshooting

The following section describes common gotchas and their workarounds.

### I get an error message `Nuxt.js Internal Server Error`

This may be because you have a custom server framework (such as Express). Please make sure you selected `None` when asked to choose `Choose custom server framework` during the creation of your nuxt app.

### xdn init doesn't work 

If you get a command not found error such as:

```bash
$ xdn init
- bash: xdn: command not found
```

Make sure you installed the XDN CLI

```bash
npm i -g @xdn/cli
```


### Make sure your version of XDN CLI is current

If you previously installed the XDN CLI, make sure your version is current.

Check npm for the latest released version of the CLI:

```bash
$ npm show @xdn/cli version
1.16.2
```

Compare the latest release against the version currently installed on your system:

```bash
$ xdn --version
1.16.2
```

If your version is out of date you can update it by running

```bash
npm update -g @xdn/cli
```

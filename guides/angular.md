# Angular

This guide shows you how to deploy an Angular application on the Moovweb XDN:

## Getting Started

If you don't already have an Angular application, you can create one using:

```bash
npm install -g @angular/cli
ng new my-xdn-angular-app
```

You should now have a working starter app. Run `ng serve` to see the application running on `localhost:4200`.
To deploy your Angular application on the Moovweb XDN it needs to support server-side rendering (SSR). To add SSR support run:

```bash
ng add @nguniversal/express-engine
```

Read more about server-side rendering in Angular here: https://angular.io/guide/universal

The previous command created:

- A server-side application module (`app.server.module.ts`)
- A bootsrapper for the server app (`main.server.ts`)
- `server.ts` which exports an Express app
- TypeScript configuration for the server (`tsconfig.server.json`)

You can now run `npm run build:ssr && npm run serve:ssr` to access your server-side rendered app at `localhost:4000`.

To integrate XDN:

1. Install the XDN CLI globally:

```bash
npm install -g @xdn/cli
```

2. Run `xdn init`

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package
- The `@xdn/angular` package
- The `@xdn/cli` package
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to the Angular Universal server. Update this file to add caching or proxy some URLs to a different origin.

The location of the `server.ts` build needs to be specified in `xdn.config.js`. `xdn init` will read the project's `angular.json` and derive a server build location. For an app called `my-xdn-angular-app` the XDN config file created by `xdn init` will look like so:

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { join } = require('path')

module.exports = {
  server: {
    path: join(__dirname, 'dist/my-xdn-angular-app/server/main.js'),
    export: 'app',
  },
}
```

If your project's server build path or name is different, you will need to make changes to `xdn.config.js`. The `export` key specifies the name of the function exported that returns an Express app. With a UMD build and default export of the Express app only specifying the path is enough.

## Routing

The default `routes.js` file created by `xdn init` sends all requests to Angular server via a fallback route.

```js
// This file was automatically added by xdn deploy.
// You should commit this file to source control.
const { Router } = require('@xdn/core/router')

const createAngularPlugin = require('@xdn/angular/router/createAngularPlugin')

module.exports = app => {
  const { angularMiddleware } = createAngularPlugin(app)
  return new Router().use(angularMiddleware)
}
```

### Caching

The easiest way to add edge caching to your Angular app is to add caching routes before the middleware. For example,
imagine you have a route `/pages/c/:categoryId`:

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
        staleWhileRevalidateSeconds: 60 * 60,
      },
    })
  })
  .use(angularMiddleware)
```

### Running Locally

To test your app locally, run:

```bash
xdn run
```

You can do a production build of your app and test it locally using:

```bash
xdn build && xdn run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the Moovweb cloud using serverless-offline.

### Deploying

To deploy your app to the Moovweb XDN, run:

```bash
xdn deploy
```

See [deploying](deploying) for more information.

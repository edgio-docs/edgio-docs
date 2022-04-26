---
title: Express
---

[Express](https://expressjs.com) is a fast, unopinionated, minimalist web framework for Node.js. The Layer0 serverless environment makes it easy to run apps without managing Node.js servers.

## Getting Started {/*getting-started*/}

To add {{ PRODUCT_NAME }} to your Express app, run the following in the root directory of your express app:

```bash
npm i -g @layer0/cli
0 init
```

## Running your app locally {/*running-your-app-locally*/}

To run your app behind Layer0 locally, run:

```bash
0 dev
```

## Deploying your app to {{ PRODUCT_NAME }} {/*deploying-your-app-to-{{PRODUCT_NAME_LOWER}}*/} {/*deploying-your-app-to--product_name--deploying-your-app-to-product_name_lower*/}

To deploy your app to {{ PRODUCT_NAME }}, run:

```bash
0 deploy
```

## Overriding the default app location {/*overriding-the-default-app-location*/}

When you deploy your Express app to {{ PRODUCT_NAME }}, the {{ PRODUCT_NAME }} CLI bundles your app as a single javascript file so that it can be run as a serverless function. By default Layer0 looks for your app in a few common locations:

- src/server.ts
- src/server.js
- src/app.ts
- src/app.js
- src/index.ts
- src/index.js
- server.js
- app.js
- index.js

If it cannot find one of these files, you can specify the path to the app in `layer0.config.js`:

```js
const { join } = require('path')

// layer0.config.js
module.exports = {
  connector: '@layer0/express',
  express: {
    appPath: join(process.cwd(), 'path', 'to', 'app.js'),
  },
}
```

The file you specify in `appPath` should export an instance of an express app using `export default` or `module.exports`.

## Serving Static Assets {/*serving-static-assets*/}

If your express app serves any static assets, you'll need to add routes to your Layer0 router to serve them from the edge. For example, to serve all paths under `/assets` from `dist/client/assets`:

```js
// routes.js
import { Router } from '@layer0/core'

export default new Router()
  .match('/assets/:path*', ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 365, // cache at the edge for one year
      },
      browser: {
        maxAgeSeconds: 60 * 60 * 365, // cache in the browser for one year - only do this if you include hashes in your client asset filenames
      },
    })
    serveStatic('dist/client/assets/:path*')
  })
  .fallback(({ renderWithApp }) => renderWithApp()) // serve all unmatched URLs from express
```

## Adding Additional Files Needed during SSR {/*adding-additional-files-needed-during-ssr*/}

If your express app expects to be able to read files from the filesystem at runtime, for example an index.html template, you can ensure they are included in the app bundle that is deployed to Layer0's serverless workers by adding the following to layer0.config.js

```js
module.exports = {
  /* ... */

  includeFiles: {
    // Include index.html in the serverless bundle
    'dist/client/index.html': true,
  },
}
```

## Transpiling and TypeScript support {/*transpiling-and-typescript-support*/}

Layer0 will automatically transpile JavaScript and TypeScript source code for running on Node.js version 14. If you want to control how
source files are compiled, you can transpile your app on your own and point your `appPath` config to the transpiled version of your app's main entry point.

---
title: Express
---

[Express](https://expressjs.com) is a fast, unopinionated, minimalist web framework for Node.js. The {{ PRODUCT_PLATFORM }}'s serverless environment makes it easy to run apps without managing Node.js servers.

## Getting Started {/_getting-started_/} {/*getting-started-getting-started*/}

Add your Express app to {{ PRODUCT }} by running the following command in your project's root directory:

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

## Running your app locally {/_running-your-app-locally_/} {/*running-your-app-locally-running-your-app-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

## Deploying {/_deploying_/} {/*deploying-deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

## Overriding the default app location {/_overriding-the-default-app-location_/} {/*overriding-the-default-app-location-overriding-the-default-app-location*/}

When you deploy your Express app to the {{ PRODUCT_PLATFORM }}, the {{ PRODUCT }} CLI bundles your app as a single javascript file so that it can be run as a serverless function. By default, {{ COMPANY_NAME }} looks for your app in the following common locations:

- src/server.ts
- src/server.js
- src/app.ts
- src/app.js
- src/index.ts
- src/index.js
- server.js
- app.js
- index.js

If it cannot find one of these files, you can specify the path to the app in `{{ CONFIG_FILE }}`:

```js
const {join} = require('path');

// {{ CONFIG_FILE }}
module.exports = {
  connector: '@layer0/express',
  express: {
    appPath: join(process.cwd(), 'path', 'to', 'app.js'),
  },
};
```

The file you specify in `appPath` should export an instance of an express app using `export default` or `module.exports`.

## Serving Static Assets {/_serving-static-assets_/} {/*serving-static-assets-serving-static-assets*/}

If your express app serves any static assets, you'll need to add routes to your {{ PRODUCT }} router configuration to serve them from the edge. For example, to serve all paths under `/assets` from `dist/client/assets`:

```js
// routes.js
import {Router} from '@layer0/core';

export default new Router()
  .match('/assets/:path*', ({cache, serveStatic}) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 365, // cache at the edge for one year
      },
      browser: {
        maxAgeSeconds: 60 * 60 * 365, // cache in the browser for one year - only do this if you include hashes in your client asset filenames
      },
    });
    serveStatic('dist/client/assets/:path*');
  })
  .fallback(({renderWithApp}) => renderWithApp()); // serve all unmatched URLs from express
```

## Adding Additional Files Needed during SSR {/_adding-additional-files-needed-during-ssr_/} {/*adding-additional-files-needed-during-ssr-adding-additional-files-needed-during-ssr*/}

If your express app expects to be able to read files from the filesystem at runtime, for example an index.html template, you can ensure they are included in the app bundle that is deployed to {{ PRODUCT_PLATFORM }}'s serverless workers by adding the following to {{ CONFIG_FILE }}

```js
module.exports = {
  /* ... */

  includeFiles: {
    // Include index.html in the serverless bundle
    'dist/client/index.html': true,
  },
};
```

## Transpiling and TypeScript support {/_transpiling-and-typescript-support_/} {/*transpiling-and-typescript-support-transpiling-and-typescript-support*/}

{{ PRODUCT }} will automatically transpile JavaScript and TypeScript source code for running on Node.js version 14. If you want to control how
source files are compiled, you can transpile your app on your own and point your `appPath` config to the transpiled version of your app's main entry point.

## Bundling Options {/*bundling-options*/}

By default Layer0 uses ESBuild to transpile and bundle your application code. If you're having difficulty fitting your app within the limit for serverless bundles, you can try bundling with [ncc](https://github.com/vercel/ncc), which should produce smaller bundles, by adding the following to layer0.config.js:

```js
module.exports = {
  express: {
    bundler: '@vercel/ncc',
  },
};
```

Then add ncc to your app's build dependencies:

```
npm i -D @vercel/ncc@^0.34.0
```

Or, using yarn:

```
yarn add --dev @vercel/ncc@^0.34.0
```

NCC produces a tree-shaken, bundle which includes your application code and all of its dependencies in a single file (written to .layer0/lambda/backends/index.js). [NFT](https://github.com/vercel/nft) is also supported:

```js
module.exports = {
  express: {
    bundler: '@vercel/nft',
  },
};
```

Then add nft to your app's build dependencies:

```
npm i -D @vercel/nft@^0.21.0
```

Or, using yarn:

```
yarn add --dev @vercel/nft@^0.21.0
```

NFT is similar to NCC, but it produces an exploded directory tree instead of including all of your code in a single file. We recommend trying ncc first.

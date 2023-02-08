---
title: Express
---

[Express](https://expressjs.com) is a fast, unopinionated, minimalist web framework for Node.js. The {{ PRODUCT_PLATFORM }}'s serverless environment makes it easy to run apps without managing Node.js servers.

<Video src="https://youtu.be/HnDR07NCVoI" />

## Getting Started {/*getting-started*/}

Add your Express app to {{ PRODUCT }} by running the following command in your project's root directory:

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
{{ FULL_CLI_NAME }} init
```

## Running your app locally {/*running-your-app-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

## Overriding the default app location {/*overriding-the-default-app-location*/}

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

```js filename='{{ CONFIG_FILE }}' ins={1,7}
const { join } = require('path')

module.exports = {
  connector: '{{ PACKAGE_NAME }}/express',
  express: {
    appPath: join(process.cwd(), 'path', 'to', 'app.js'),
  },
}
```

The file you specify in `appPath` should export an instance of an express app using `export default` or `module.exports`.

## Serving Static Assets {/*serving-static-assets*/}

If your express app serves any static assets, you'll need to add routes to your {{ PRODUCT }} router configuration to serve them from the edge. For example, to serve all paths under `/assets` from `dist/client/assets`:

```js filename='routes.js' ins={8-18}
import { Router } from '{{ PACKAGE_NAME }}/core'

export default new Router()
  // Create serveStatic route for each file in the folder build 
  // dist/client/assets with a cache-control header of 's-maxage=315360000'
  // and serve them under the /assets route
  .match('/assets/:path*', ({ cache, serveStatic }) => {
      serveStatic('dist/client/assets/:path*')
  })
  // serve all unmatched URLs from express
  .fallback(({ renderWithApp }) => {
    renderWithApp()
  }) 
```

## Adding Additional Files Needed during SSR {/*adding-additional-files-needed-during-ssr*/}

If your express app expects to be able to read files from the filesystem at runtime, for example an index.html template, you can ensure they are included in the app bundle that is deployed to {{ PRODUCT_PLATFORM }}'s serverless workers by adding the following to {{ CONFIG_FILE }}

```js filename='{{ CONFIG_FILE }}' ins={4,6-7}
module.exports = {
  connector: '{{ PACKAGE_NAME }}/express',
  // Rest of the config
  includeFiles: {
    // Include index.html in the serverless bundle
    'dist/client/index.html': true,
  },
}
```

## Transpiling and TypeScript support {/*transpiling-and-typescript-support*/}

{{ PRODUCT }} will automatically transpile JavaScript and TypeScript source code for running on Node.js version 14. If you want to control how
source files are compiled, you can transpile your app on your own and point your `appPath` config to the transpiled version of your app's main entry point.

## Bundling Options {/*bundling-options*/}

By default, {{ PRODUCT }} uses ESBuild to transpile and bundle your application code. If you're having difficulty fitting your app within the limit for serverless bundles, you can try bundling with [ncc](https://github.com/vercel/ncc), which should produce smaller bundles, by adding the following to {{ CONFIG_FILE }}:

```js filename='{{ CONFIG_FILE }}' highlight={3}
module.exports = {
  express: {
    bundler: '@vercel/ncc',
  },
}
```

Then add ncc to your app's build dependencies:

```bash
npm i -D @vercel/ncc@^0.34.0
```

Or, using yarn:

```bash
yarn add --dev @vercel/ncc@^0.34.0
```

NCC produces a tree-shaken, bundle which includes your application code and all of its dependencies in a single file (written to .edgio/lambda/backends/index.js). [NFT](https://github.com/vercel/nft) is also supported:

```js filename='{{ CONFIG_FILE }}' highlight={3}
module.exports = {
  express: {
    bundler: '@vercel/nft',
  },
}
```

Then add nft to your app's build dependencies:

```bash
npm i -D @vercel/nft@^0.21.0
```

Or, using yarn:

```bash
yarn add --dev @vercel/nft@^0.21.0
```

NFT is similar to NCC, but it produces an exploded directory tree instead of including all of your code in a single file. We recommend trying ncc first.

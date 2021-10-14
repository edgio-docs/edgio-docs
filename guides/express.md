# Express

[Express](https://expressjs.com) is a fast, unopinionated, minimalist web framework for Node.js. The Layer0 serverless environment makes it easy to run apps without managing Node.js servers.

## Getting Started

To add {{ PRODUCT_NAME }} to your Express app, run the following in the root directory of your express app:

```
npm i -g @layer0/cli
0 init
```

## Running your app locally

To run your app behind Layer0 locally, run:

```
0 dev
```

## Deploying your app to {{ PRODUCT_NAME }}

To deploy your app to {{ PRODUCT_NAME }}, run:

```
0 deploy
```

## Overriding the default app location

When you deploy your Express app to {{ PRODUCT_NAME }}, the {{ PRODUCT_NAME }} CLI bundles your app as a single javascript file so that it can be run as a serverless function. By default Layer0 looks for your app in a few common locations:

- src/server.ts
- src/server.js
- src/app.ts
- src/app.js
- src/index.ts
- src/index.js
- app.js
- index.js

If it cannot find one of these files, you can specify the path to the app in `layer0.config.js`:

```js
// layer0.config.js
module.exports = {
  connector: '@layer0/express',
  express: {
    appPath: './path/to/app.js',
  },
}
```

The file you specify in `appPath` should export an instance of an express app using `export default` or `module.exports`.

## Transpiling and TypeScript support

Layer0 will automatically transpile JavaScript and TypeScript source code for running on Node.js version 14. If you want to control how
source files are compiled, you can transpile your app on your own and point your `appPath` config to the transpiled version of your app's main entry point.

# NX

[NX](https://nx.dev/) is a tool for managing monorepos.

This guide shows you how to create a [connector](/guides/connectors) for your NX application on the Moovweb XDN. Here we use [Next.js](https://nextjs.org/) for the default NX project.

## Example App

[Try the Nx Example App](https://moovweb-docs-xdn-nx-example-default.moovweb-edge.io?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-next-example?button)

## 1. Install the XDN CLI and run xdn init

In the root of your nx monorepo, run:

```sh
npm i -g @xdn/cli
xdn init
```

## 2. Create a custom XDN connector

Since our Next.js app isn't located in the root of the project as the `@xdn/next` connector expects, we'll need to define our own custom connector. To do so:

1. Set `connector: './xdn'` in `xdn.config.js`
2. Copy the [xdn directory from the example](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-nx-example/xdn) into the root of your monorepo.

## 3. Update routes.js

```js
const { Router } = require('@xdn/core/router')
const { default: NextRoutes } = require('@xdn/next/router/NextRoutes')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .use(new NextRoutes('apps/next-app')) // provide the path to your Next.js app relative to the root of the monorepo here
```

## Development: Run your nx app behind the XDN

To run your Next.js app in development mode behind the XDN, run:

```sh
xdn dev
```

## Deploy to the XDN

To deploy your app to the XDN, run:

```sh
xdn deploy
```

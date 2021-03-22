# NX

[NX](https://nx.dev/) is a tool for managing monorepos.

This guide shows you how to create a [connector](/guides/connectors) for your NX application on {{ PRODUCT_NAME }}. Here we use [Next.js](https://nextjs.org/) for the default NX project.

## Example App

[Try the Nx Example App](https://moovweb-docs-xdn-nx-example-default.moovweb-edge.io?button)
[View the Code](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-next-example?button)

## 1. Install the {{ PRODUCT_NAME }} CLI and run {{ CLI_NAME }} init

In the root of your nx monorepo, run:

```sh
npm i -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

## 2. Create a custom {{ PRODUCT_NAME }} connector

Since our Next.js app isn't located in the root of the project as the `{{ PACKAGE_NAME }}/next` connector expects, we'll need to define our own custom connector. To do so:

1. Set `connector: './xdn'` in `{{ CONFIG_FILE }}`
2. Copy the [xdn directory from the example](https://github.com/moovweb-docs/xdn-examples/tree/main/xdn-nx-example/xdn) into the root of your monorepo.

## 3. Update routes.js

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { default: NextRoutes } = require('{{ PACKAGE_NAME }}/next/router/NextRoutes')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .use(new NextRoutes('apps/next-app')) // provide the path to your Next.js app relative to the root of the monorepo here
```

## Development: Run your nx app behind {{ PRODUCT_NAME }}

To run your Next.js app in development mode behind {{ PRODUCT_NAME }}, run:

```sh
{{ CLI_NAME }} dev
```

## Deploy to {{ PRODUCT_NAME }}

To deploy your app to {{ PRODUCT_NAME }}, run:

```sh
{{ CLI_NAME }} deploy
```

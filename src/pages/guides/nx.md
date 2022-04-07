---
title: NX
---

[NX](https://nx.dev/) is a tool for managing monorepos.

This guide shows you how to create a [connector](/guides/connectors) for your NX application on {{ PRODUCT_NAME }}. Here we use [Next.js](https://nextjs.org/) for the default NX project.

## Example App {/*example-app*/}

<ButtonLinksGroup>
  <ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-nx-example-default.layer0.link">
   Try the Nx Example Site
  </ButtonLink>
  <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-nx-example">
   View the Code
  </ButtonLink>
  <ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nx-example">
    Deploy to Layer0
  </ButtonLink>
</ButtonLinksGroup>

## 1. Install the {{ PRODUCT_NAME }} CLI and run {{ CLI_NAME }} init {/*1-install-the--product_name--cli-and-run--cli_name--init*/}

In the root of your nx monorepo, run:

```sh
npm i -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

## 2. Create a custom {{ PRODUCT_NAME }} connector {/*2-create-a-custom--product_name--connector*/}

Since our Next.js app isn't located in the root of the project as the `{{ PACKAGE_NAME }}/next` connector expects, we'll need to define our own custom connector. To do so:

1. Set `connector: './{{ PRODUCT_NAME_LOWER }}'` in `{{ CONFIG_FILE }}`
2. Copy the [layer0 directory from the example](https://github.com/layer0-docs/layer0-nx-example/tree/master/layer0) into the root of your monorepo.

## 3. Update routes.js {/*3-update-routesjs*/}

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { default: NextRoutes } = require('{{ PACKAGE_NAME }}/next/router/NextRoutes')

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .use(new NextRoutes('apps/next-app')) // provide the path to your Next.js app relative to the root of the monorepo here
```

## Development: Run your nx app behind {{ PRODUCT_NAME }} {/*development-run-your-nx-app-behind--product_name-*/}

To run your Next.js app in development mode behind {{ PRODUCT_NAME }}, run:

```sh
{{ CLI_NAME }} dev
```

## Deploy to {{ PRODUCT_NAME }} {/*deploy-to--product_name-*/}

To deploy your app to {{ PRODUCT_NAME }}, run:

```sh
{{ CLI_NAME }} deploy
```

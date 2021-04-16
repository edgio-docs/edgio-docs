# Vue Storefront

Follow these steps to deploy a Vue Storefront app on {{ PRODUCT_NAME }}. As of now {{ PRODUCT_NAME }} is only compatible with the [Vue Storefront Next CLI tool](https://docs-next.vuestorefront.io/commercetools/getting-started.html#with-vue-storefront-cli-recommended).

For adding {{ PRODUCT_NAME }} to Vue Storefront 1 app follow this [guide](/guides/vsf1).

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-vue-storefront-connector?button)

## Install Node.js and npm

**{{ PRODUCT_NAME }} only supports Node.js version {{ NODE_VERSION }}**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 14 locally, your app will run in Node 14 when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node 14 for all development._

## Install the VSF CLI

The Vue Storefront CLI tool will generate a preconfigured boilerplate project for you. Use these commands to create a new project and update to the latest dependencies.

```
npm i -g @vue-storefront/cli@next
vsf init <project-name>
cd <project-name>
npm install
```

## Install the {{ PRODUCT_NAME }} CLI

To prepare your Vue Storefront app for deployment on {{ PRODUCT_NAME }}, run the following commands in the root folder of your project:

```
npm install -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

### nuxt.config.js

The {{ PRODUCT_NAME }} init command should have automatically moved all your `modules` to `buildModules` in order to deploy the smallest possible build to {{ PRODUCT_NAME }}.

Ensure `@nuxtjs/pwa` is not present in the `buildModules`. It is not needed because `{{ PACKAGE_NAME }}/nuxt/module` builds and injects its own service worker.

## Development

To run locally in development mode, use this command:

```
{{ CLI_NAME }} dev --cache
```

## Building and Deploying

To build and deploy your app to {{ PRODUCT_NAME }}, run the following from the root directory of your app:

```
{{ CLI_NAME }} deploy
```

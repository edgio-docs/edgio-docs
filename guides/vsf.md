# Vue Storefront

Follow these steps to deploy a Vue Storefront app on the Moovweb XDN. As of now the XDN is only compatible with the [Vue Storefront Next CLI tool](https://docs-next.vuestorefront.io/commercetools/getting-started.html#with-vue-storefront-cli-recommended).

For adding XDN to Vue Storefront 1 app follow this [guide](/guides/vsf1).

## Connector

This framework has a connector developed for the XDN. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/moovweb-docs/xdn-connectors/tree/main/xdn-vue-storefront-connector?button)

## Install Node.js and npm

**XDN only supports Node.js version 12.x**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the XDN cloud. Therefore we highly suggest using Node 12 for all development._

## Install the VSF CLI

The Vue Storefront CLI tool will generate a preconfigured boilerplate project for you. Use these commands to create a new project and update to the latest dependencies.

```
npm i -g @vue-storefront/cli@next
vsf init <project-name>
cd <project-name>
npm install
```

## Install the XDN CLI

To prepare your Vue Storefront app for deployment on the Moovweb XDN, run the following commands in the root folder of your project:

```
npm install -g @xdn/cli
xdn init
```

### nuxt.config.js

The XDN init command should have automatically moved all your `modules` to `buildModules` in order to deploy the smallest possible build to the XDN.

Ensure `@nuxtjs/pwa` is not present in the `buildModules`. It is not needed because `@xdn/nuxt/module` builds and injects its own service worker.

## Development

To run locally in development mode, use this command:

```
xdn dev --cache
```

## Building and Deploying

To build and deploy your app to the XDN, run the following from the root directory of your app:

```
xdn deploy <team> # where team is the name of the XDN team to which the app should be deployed.
```

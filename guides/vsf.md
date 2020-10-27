# Vue Storefront

Follow these steps to deploy a Vue Storefront app on the Moovweb XDN. As of now the XDN is only compatible with the [Vue Storefront Next CLI tool](https://docs-next.vuestorefront.io/commercetools/getting-started.html#with-vue-storefront-cli-recommended).

## Install Node.js and npm

**XDN only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from official [Node.js downloads](https://nodejs.org/en/download/) page. Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

To prepare your Vue Storefront app for deployment on the Moovweb XDN, run the following commands in the root folder of your project:

```
npm install -g @xdn/cli
cd <vue-storefront-project-directory>
xdn init
```

## Vue Storefront compatible package versions

The VSF team is still working on the next version of VSF. Currently, the XDN only works with these package versions:

```
"@vue-storefront/commercetools": "0.2.4",
"@vue-storefront/nuxt": "0.0.8",
"@vue-storefront/nuxt-theme": "0.0.4"
```

Please update your package.json with these changes and re-run `npm install`

### nuxt.config.js

The XDN init command should have automatically moved all your `modules` to `buildModules` in order to deploy the smallest possible build to the XDN.

Ensure `@nuxtjs/pwa` is not present in the `buildModules`. It is not needed because `@xdn/nuxt/module` builds and injects its own service worker.

## Building and Deploying

To build and deploy your app to the XDN, run the following from the root directory of your app:

```
npm run xdn:build
npm run xdn:deploy <team> # where team is the name of the XDN team to which the app should be deployed.
```

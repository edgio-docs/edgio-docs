---
title: Vue Storefront Next
---

Follow these steps to deploy a Vue Storefront Next app on {{ PRODUCT_NAME }}. As of now {{ PRODUCT_NAME }} is only compatible with the [Vue Storefront Next CLI tool](https://docs-next.vuestorefront.io/commercetools/getting-started.html#with-vue-storefront-cli-recommended).

For adding {{ PRODUCT_NAME }} to Vue Storefront 1 app follow this [guide](/guides/vsf1).

## Example

Here's an example Vue Storefront 2 app running on Layer0:

[Try the Vue Storefront Example](https://layer0-docs-layer0-vue-storefront-commercetools-example-default.layer0.link?button)
[View the Code](https://github.com/layer0-docs/layer0-vue-storefront-commercetools-example?button)

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-vue-storefront-connector?button)

{{ SYSTEM_REQUIREMENTS }}

## Install the {{ PRODUCT_NAME }} CLI

To prepare your Vue Storefront app for deployment on {{ PRODUCT_NAME }}, install the {{ PRODUCT_NAME }} CLI:

```
npm install -g {{ PACKAGE_NAME }}/cli
```

## Install the VSF CLI

The Vue Storefront CLI tool will generate a preconfigured boilerplate project for you. Use these commands to create a new project and update to the latest dependencies.

```
npm i -g @vue-storefront/cli@next
vsf init <project-name>
cd <project-name>
npm install
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

---
title: Vue Storefront Next
---

Follow these steps to deploy a Vue Storefront Next app on {{ PRODUCT_NAME }}. As of now {{ PRODUCT_NAME }} is only compatible with the [Vue Storefront Next CLI tool](https://docs.vuestorefront.io/v2/getting-started/installation.html).

For adding {{ PRODUCT_NAME }} to Vue Storefront 1 app follow this [guide](/guides/vsf1).

## Example {/*example*/}

Here's an example Vue Storefront 2 app running on Layer0:

<ExampleButtons
  title="Vue Storefront"
  siteUrl="https://layer0-docs-layer0-vue-storefront-commercetools-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-vue-storefront-commercetools-example" 
  deployFromRepo />

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI {/*install-the-layer0-cli*/}

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
```

## Run the VSF CLI {/*run-the-vsf-cli*/}

The Vue Storefront CLI tool will generate a preconfigured boilerplate project for you. Use these commands to create a new project and update to the latest dependencies.

```bash
npx @vue-storefront/cli generate store
```

When prompted, enter the name of your project and the integration template:

```
$ npx @vue-storefront/cli generate store
? What's your project name? new-vsf-app
? Choose an integration template: (Use arrow keys)
❯ Shopify 
  Magento 2 
  Vendure 
  Kibo Commerce (beta) 
  Odoo 
  Prestashop 
  Spree 
(Move up and down to reveal more choices)
```

Once the generator has completed, go into the new project directory and install the Node dependencies:

```bash
cd <project-name>
npm install
```

## Configuring your Vue Storefront app for {{ PRODUCT_NAME }} {/*configuring-your-vue-storefront-app-for-layer0*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

The {{ PRODUCT_NAME }} init command should have automatically moved all your `modules` to `buildModules` in order to deploy the smallest possible build to {{ PRODUCT_NAME }}.

Ensure `@nuxtjs/pwa` is not present in the `buildModules`. It is not needed because `{{ PACKAGE_NAME }}/nuxt/module` builds and injects its own service worker.

## Development {/*development*/}

To run locally in development mode, use this command:

```bash
{{ CLI_NAME }} dev --cache
```

## Building and Deploying {/*building-and-deploying*/}

To build and deploy your app to {{ PRODUCT_NAME }}, run the following from the root directory of your app:

```bash
{{ CLI_NAME }} deploy
```

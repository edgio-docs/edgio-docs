---
title: Vue Storefront Next
---

Follow these steps to deploy a Vue Storefront Next app on {{ PRODUCT_NAME }}. As of now {{ PRODUCT_NAME }} is only compatible with the [Vue Storefront Next CLI tool](https://docs-next.vuestorefront.io/commercetools/getting-started.html#with-vue-storefront-cli-recommended).

For adding {{ PRODUCT_NAME }} to Vue Storefront 1 app follow this [guide](/guides/vsf1).

## Example {/*example*/}

Here's an example Vue Storefront 2 app running on Layer0:

<ButtonLinksGroup>
  <ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-vue-storefront-commercetools-example-default.layer0.link">
   Try the Vue Storefront Example
  </ButtonLink>
  <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-vue-storefront-commercetools-example?button">
   View the Code
  </ButtonLink>
  <ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-vue-storefront-commercetools-example">
    Deploy to Layer0
  </ButtonLink>
</ButtonLinksGroup>

{{ SIGN_UP_LAYER0 }}

## Install the {{ PRODUCT_NAME }} CLI {/*install-the-{{PRODUCT_NAME_LOWER}}-cli*/} {/*install-the--product_name--cli-install-the-product_name_lower-cli*/}

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Install the VSF CLI {/*install-the-vsf-cli*/}

The Vue Storefront CLI tool will generate a preconfigured boilerplate project for you. Use these commands to create a new project and update to the latest dependencies.

```bash
npm i -g @vue-storefront/cli@next
vsf init <project-name>
cd <project-name>
npm install
```

## Configuring your Vue Storefront app for {{ PRODUCT_NAME }} {/*configuring-your-vue-storefront-app-for-{{PRODUCT_NAME_LOWER}}*/} {/*configuring-your-vue-storefront-app-for--product_name--configuring-your-vue-storefront-app-for-product_name_lower*/}

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

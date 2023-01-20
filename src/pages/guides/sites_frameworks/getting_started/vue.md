---
title: Vue.js
---

[Vue.js](https://vuejs.org/) is a progressive javascript framework. This guide walks you through deploying Vue.js sites to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Vue 3"
  repoUrl="https://github.com/edgio-docs/edgio-vue3-example"
  siteUrl="https://layer0-docs-layer0-vue3-example-default.layer0-limelight.link/"
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-vue-3-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ }}

## Create your Vue 3 site {/*create-your-vue-3-site*/}

If you don't have an existing Vue 3 site, you can create one by running:

```bash
npm init vue@latest
```

## Initializing your Project {/*initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/vue-3` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Vite. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Vite server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { vue3Routes } = require('{{ PACKAGE_NAME }}/vue-3')

export default new Router().use(vue3Routes)
```

## Running Locally {/*running-locally*/}

To test your app locally, run:

```bash
{{ FULL_CLI_NAME }} dev
```

You can do a production build of your app and test it locally using:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be when deployed to the {{ PRODUCT }} cloud.

## Deploy to {{ PRODUCT }} {/*deploy-to*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [deploying](deploy_apps) for more information.


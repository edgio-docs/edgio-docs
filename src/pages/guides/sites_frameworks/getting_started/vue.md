---
title: Vue.js
---

[Vue.js](https://vuejs.org/) is a progressive javascript framework. This guide walks you through deploying Vue.js sites to {{ PRODUCT }}.

Edgio supports both Vue 2 and Vue 3, using both CLIs - `@vue/cli` and `vite`.


## Example {/*example*/}

<ExampleButtons
  title="Vue 3"
  repoUrl="https://github.com/edgio-docs/edgio-vue3-example"
  siteUrl="https://layer0-docs-layer0-vue3-example-default.layer0-limelight.link/"
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-vue-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ }}

## Create your Vue site {/*create-your-vue-site*/}

If you don't have an existing Vue 3 site, you can create one by running:

```bash
npm init vue@latest
```

This command will create a project based on `vite`. 

If you need help with Vue initialization, please follow the [create-vue project's readme](https://github.com/vuejs/create-vue).

{{ PRODUCT }} also supports the older, Webpack-based `@vue/cli` - more on that in the [Vue CLI documentation](https://cli.vuejs.org).


## Initializing your Project {/*initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

{{ INIT_DEFAULT_PACKAGES }}
- The `{{ PACKAGE_NAME }}/vue` package - Provides a `Prefetch` component for prefetching pages.
- The `{{ PACKAGE_NAME }}/vue-cva` package - Provides build and routing mechanisms for Vue projects.

{{ INIT_TIER1_FILES }}


## Prefetching {/*prefetching*/}

{{ PREFETCH_TIER1_INTRO }}

The code above allows you to prefetch pages from {{ PRODUCT }}'s edge cache to greatly improve browsing speed. To prefetch a page, add the `Prefetch` component from `@edgio/vue` around any rendered component, as such:

```js ins={2,7,9}
<script>
  import { Prefetch } from '{{ PACKAGE_NAME }}/vue'
</script>

<template>
  {/* The URL you need to prefetch is the API call that the page component will make when it mounts. It will vary based on how you've implemented your site. */}
  <Prefetch :url='/api/products/1.json'>
    <a :href='/api/products/1.json'>Product 1</Link>
  </Prefetch>
</template>
```

The `Prefetch` component fetches data for the linked page from {{ PRODUCT }}'s edge cache and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

By default, `Prefetch` waits until the link appears in the viewport before prefetching. You can prefetch immediately by setting the `immediately` prop:

```js
<Prefetch :url="/api/products/1.json" immediately>
  <a href="/p/1">Product 1</Link>
</Prefetch>
```

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Vue server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { vueRoutes } = require('{{ PACKAGE_NAME }}/vue-cva')

export default new Router().use(vueRoutes)
```

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

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

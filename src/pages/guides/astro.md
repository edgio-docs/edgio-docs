---
title: Astro
---

[Astro](https://astro.build/) is a modern static site builder. This guide walks you through deploying Astro sites to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Astro"
  siteUrl="https://layer0-docs-layer0-astro-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-astro-example" 
  deployFromRepo />

## Example SSR Site {/*example-ssr-site*/}

This Astro example app uses server-side rendering.

<ExampleButtons
  title="Astro SSR"
  siteUrl="https://layer0-docs-layer0-astro-ssr-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-astro-ssr-example" 
  deployFromRepo />

{{ PREREQ }}

## Create your Astro site {/*create-your-astro-site*/}

If you don't have an existing Astro site, you can create one by running:

```bash
npm create astro@latest

npm run dev

npm run build
```

## Initialize {{ PRODUCT }} {/*initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init
```

## Update {{ PRODUCT }} Router {/*update-your-router*/}

Paste the following into `routes.js` or `routes.ts`, depending on the results of the `{{ FULL_CLI_NAME }} init` command:

```js
import { Router } from '{{ PACKAGE_NAME }}/core'

export default new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: {{ DOCS_URL }}/guides/cookbook#blocking-search-engine-crawlers
  .noIndexPermalink()
  .static('dist')
```

## [Optional] Update {{ PRODUCT }} {{ CONFIG_FILE }} {/*update-your-config-file*/}

Modify `{{ CONFIG_FILE }}` to be as follows:

```js
module.exports = {}
```

## Deploy to {{ PRODUCT }} {/*deploy-to*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
# Create a production build of your astro site
npm run build

# Deploy it to {{ PRODUCT }}
{{ FULL_CLI_NAME }} deploy
```

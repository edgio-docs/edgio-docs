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

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-astro-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ }}

## Create your Astro site {/*create-your-astro-site*/}

If you don't have an existing Astro site, you can create one by running:

```bash
npm create astro@latest
```

## Initializing your Project {/*initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/angular` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/astro` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Astro. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Astro server via a fallback route.

```js
// This file was automatically added by {{ FULL_CLI_NAME }} deploy.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { astroRoutes } = require('{{ PACKAGE_NAME }}/astro')

export default new Router()
  // Prevent search engines from indexing permalink URLs
  .noIndexPermalink()
  .use(astroRoutes)
```

## Enable Server Side Rendering {/*enable-server-side-rendering*/}

After you've setup [Server Side Rendering with Astro](https://docs.astro.build/en/guides/server-side-rendering/), specify server file path in {{ CONFIG_FILE }} as below:

```js filename={{ CONFIG_FILE }} ins={1,4,5,6}
import { join } from 'path'

module.exports = {
  astro: {
    appPath: join(process.cwd(), 'dist', 'server', 'entry.mjs'),
  },
  // Rest of the config
}
```

If you're using custom server file for enabling server side rendering, make sure your server is listening to port via process.env['PORT'].

## Running Locally {/*running-locally*/}

To test your app locally, run:

```bash
{{ FULL_CLI_NAME }} run
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

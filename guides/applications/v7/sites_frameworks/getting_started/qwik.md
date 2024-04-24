---
title: Qwik
---

[Qwik](https://qwik.dev) is a modern framework designed for high-performance websites. This guide walks you through deploying Qwik projects to {{ PRODUCT }}.

## Example {/* example */}

This examples uses a Qwik boilerplate project that you can deploy to {{ PRODUCT }}.

<ExampleButtons
  title="Qwik"
  siteUrl="https://edgio-community-examples-v7-qwik-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-qwik-example"
/>

{{ PREREQ.md }}

## Create your Qwik project {/* create-your-qwik-project */}

If you don't have an existing Qwik project, you can create one by running:

```bash
npm create qwik@latest
```

## Initializing your Project {/* initializing-your-project */}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project, including:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/connectors` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Qwik server. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/* routing */}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Qwik server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const {Router} = require('{{ PACKAGE_NAME }}/core/router');
const {connectorRoutes} = require('{{ PACKAGE_NAME }}/connectors');

export default new Router().use(connectorRoutes);
```

## Running Locally {/* running-locally */}

To test your app locally, run:

```bash
{{ CLI_CMD(dev) }}
```

You can do a production build of your app and test it locally using:

```bash
{{ CLI_CMD(build) }} && {{ CLI_CMD(run --production) }}
```

Setting `--production` ensures your app runs exactly as it will when deployed to the {{ PRODUCT }} cloud.

## Deploy to {{ PRODUCT }} {/* deploy-to */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
{{ CLI_CMD(deploy) }}
```

{{ system_origins_callout.md }}

See [Deployments](/applications/basics/deployments) for more information.

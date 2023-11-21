---
title: Astro
---

[Astro](https://astro.build/) is a modern static site builder. This guide walks you through deploying Astro sites to {{ PRODUCT }}.

<Callout type="important">

  Astro 2.x is supported in all versions of {{ PRODUCT }} v7. 

  Astro 3.x requires {{ PRODUCT }} v7.4.0 or later which introduces Node.js 18 support.

</Callout>

<!-- ## Example {/* example */}

<ExampleButtons
  title="Astro"
  siteUrl="https://edgio-community-examples-astro-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-astro-example"
  deployFromRepo
/> -->

<!-- ## Example SSR Site {/* example-ssr-site */}

This Astro example app uses server-side rendering.

<ExampleButtons
  title="Astro SSR"
  siteUrl="https://edgio-community-examples-astro-ssr-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-astro-ssr-example"
  deployFromRepo
/> -->

## Connector {/* connector */}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-astro-connector">
  View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Create your Astro site {/* create-your-astro-site */}

If you don't have an existing Astro site, you can create one by running:

```bash
npm create astro@latest
```

<Callout type="important">

  Recent versions of Astro require Node.js >=18.14.1. You may need to update your `{{ CONFIG_FILE }}` file to specify Node.js 18 as the [cloud runtime](/guides/performance/cdn_as_code/edgio_config#cloudruntime).

</Callout>

## Initializing your Project {/* initializing-your-project */}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init --connector={{ PACKAGE_NAME }}/astro {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/angular` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/astro` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Astro. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/* routing */}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Astro server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const {Router} = require('{{ PACKAGE_NAME }}/core/router');
const {astroRoutes} = require('{{ PACKAGE_NAME }}/astro');

export default new Router().use(astroRoutes);
```

## Enable Server Side Rendering {/* enable-server-side-rendering */}

### Specify appPath inside {{ CONFIG_FILE }} {/* specify-apppath-inside */}

After you've setup [@astrojs/node with Astro](https://docs.astro.build/en/guides/integrations-guide/node/), specify server file path in {{ CONFIG_FILE }} as below:

```js filename="{{ CONFIG_FILE }}" ins="1,4-6"
const {join} = require('path');

module.exports = {
  astro: {
    appPath: join(process.cwd(), 'dist', 'server', 'entry.mjs'),
  },
  // Rest of the config
};
```

If you're using custom server file for enabling server side rendering, make sure your server is listening to port via `process.env['PORT']`.

## Running Locally {/* running-locally */}

To test your app locally, run:

```bash
{{ CLI_CMD(dev) }}
```

You can do a production build of your app and test it locally using:

```bash
{{ CLI_CMD(build) }} && {{ CLI_CMD(run --production) }}
```

Setting `--production` runs your app exactly as it will be when deployed to the {{ PRODUCT }} cloud.

## Deploy to {{ PRODUCT }} {/* deploy-to */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
{{ CLI_CMD(deploy) }}
```

{{ system_origins_callout.md }}

See [Deployments](/guides/basics/deployments) for more information.

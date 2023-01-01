---
title: Hexo
---

This guide shows you how to deploy a [Hexo](https://hexo.io/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Hexo"
  siteUrl="https://layer0-docs-layer0-hexo-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-hexo-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-hexo-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ }}

## Create a new Hexo app {/*create-a-new-hexo-app*/}

If you don't already have a Hexo app, create one by running the following:

```bash
npm install -g hexo-cli
hexo init blog
cd blog
npm install
```

You can verify your app works by running it locally with:

```bash
hexo server
```

## Configuring your Hexo app for {{ PRODUCT }} {/*configuring-your-hexo-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/hexo` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to Hexo. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Hexo server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const { hexoRoutes } = require('{{ PACKAGE_NAME }}/hexo')
const { Router } = require('{{ PACKAGE_NAME }}/core/router')

export default new Router({ indexPermalink: false }).use(hexoRoutes)
```

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

---
title: MkDocs
---

[MkDocs](https://www.mkdocs.org/) is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Follow the steps below to deploy your MkDocs site to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="MkDocs"
  siteUrl="https://layer0-docs-layer0-mkdocs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/edgio-docs/edgio-mkdocs-example"
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-mkdocs-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ }}
  
## Create your MkDocs site {/*create-your-mkdocs-site*/}

If you don't have an existing MkDocs site, you can create one by following:

```bash
# https://www.mkdocs.org/getting-started

pip3 install mkdocs
mkdocs new my-mkdocs-app
cd my-mkdocs-app
```

## Initializing your project with {{ PRODUCT }} {/*initialize-your-project*/}

Then, in the root folder of your project, run:

```bash
{{ FULL_CLI_NAME }} init --connector={{ PACKAGE_NAME }}/mkdocs
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/mkdocs` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the MkDocs. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to MkDocs server via a fallback route.

```js
// This file was automatically added by {{ FULL_CLI_NAME }} deploy.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { mkdocsRoutes } = require('{{ PACKAGE_NAME }}/mkdocs')

export default new Router()
  // Prevent search engines from indexing permalink URLs
  .noIndexPermalink()
  .use(mkdocsRoutes)
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

See [Deployments](/guides/basics/deployments) for more information.

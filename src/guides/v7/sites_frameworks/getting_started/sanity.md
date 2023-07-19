---
title: Sanity Studio
---

This guide shows you how to deploy a [Sanity Studio](https://www.sanity.io/docs/sanity-studio) application to {{ PRODUCT }}.

Sanity Studio is a single page app (SPA) written in React, where you can configure the document types and input fields, with simple JavaScript objects. This guide will walk you through how to deploy Sanity Studio with {{ PRODUCT }}.

<!-- ## Example {/*example*/}

<ExampleButtons
  title="Sanity Studio"
  siteUrl="https://layer0-docs-layer0-sanity-studio-example-default.layer0-limelight.link"
  repoUrl="https://github.com/edgio-docs/edgio-v7-sanity-studio-example"
  deployFromRepo /> -->

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-sanity-studio-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Create a new Sanity Studio app {/*create-a-new-sanity-studio-app*/}

The command below will help you set up Sanity Studio:

```bash
npm create @sanity/latest
```

## Configuring your Sanity Studio app for {{ PRODUCT }} {/*configuring-your-sanity-studio-app-for*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init --connector={{ PACKAGE_NAME }}/sanity-studio
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/sanity-studio` package
- `{{ CONFIG_FILE }}`- Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Sanity Studio. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Sanity Studio server via a fallback route.

```js
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { sanityRoutes } = require('{{ PACKAGE_NAME }}/sanity-studio')

export default new Router().use(sanityRoutes)
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

Deploy your app to the {{ PRODUCT }} cloud by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

[Learn more about deployments.](/guides/basics/deployments)

## Post Deployment Whitelisting {/*post-deployment-whitelisting*/}

Once Sanity Studio is deployed, you will need to add it's URL to Sanity’s [CORS origins settings](https://www.sanity.io/docs/front-ends/cors). You can do this from the command line:

```bash
sanity cors add https://your-url.edgio.link --credentials
```

Alternatively, you can navigate to [manage.sanity.io](https://manage.sanity.io), find your project and under Settings > API, add the Studio URL to the CORS origins list. You should allow credentials as the Studio requires authentication for added security.

---
title: Angular
---

This guide shows you how to deploy an [Angular](https://angular.io) application to {{ PRODUCT }}.

<!-- ## Example {/*example*/}

<ExampleButtons
  title="Angular SSR"
  siteUrl="https://edgio-community-examples-angular-live.layer0-limelight.link/commerce/jacket"
  repoUrl="https://github.com/edgio-docs/edgio-angular-example"
  deployFromRepo /> -->

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/applications/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-angular-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Getting Started {/*getting-started*/}

If you don't already have an Angular application, you can create one using the following steps:

#### 1. Create a new Angular App {/*1-create-a-new-angular-app*/}

```bash
npm install -g @angular/cli
ng new my-{{ PRODUCT_NAME_LOWER }}-angular-app
```

You should now have a working starter app. Run `ng serve` to see the application running on `localhost:4200`.

#### 2. Initializing your Project {/*2-initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/connectors` package
- The `{{ PACKAGE_NAME }}/cli` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the Angular Universal server. Update this file to add caching or proxy some URLs to a different origin.

#### 3. Use the right angular project {/*3-use-the-right-angular-project*/}

If you have several projects and the `defaultProject` as specified in `angular.json` is not the project with the SSR build, specify the correct project with the `ANGULAR_PROJECT` environment variable. For example: `ANGULAR_PROJECT=my-ssr-project {{ FULL_CLI_NAME }} build`.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Angular server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const { Router } = require('@edgio/core/router')
const { connectorRoutes } = require('@edgio/connectors')

module.exports = new Router().use(connectorRoutes)
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

If you have several projects and the `defaultProject` in `angular.json` is not the project you would like to deploy, specify the correct project by setting the `ANGULAR_PROJECT` environment variable when running `{{ FULL_CLI_NAME }} run`.

For example:

```bash
ANGULAR_PROJECT=my-project {{ FULL_CLI_NAME }} run --production
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

{{ system_origins_callout.md }}

If you have several projects and the `defaultProject` in `angular.json` is not the project you would like to deploy, specify the correct project by setting the `ANGULAR_PROJECT` environment variable when running `{{ FULL_CLI_NAME }} deploy`.

For example:

```json
ANGULAR_PROJECT=my-project {{ FULL_CLI_NAME }} deploy
```

See [Deployments](/applications/basics/deployments) for more information.

---
title: Razzle
---

This guide shows you how to deploy [Razzle](https://razzlejs.org/) apps on {{ PRODUCT_NAME }}.

## Example {/*example*/}

<ExampleButtons
  title="Razzle"
  siteUrl="https://layer0-docs-layer0-razzle-example-default.layer0-limelight.link"
  repoUrl=https://github.com/layer0-docs/layer0-razzle-example"" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-razzle-connector">
  View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

## Getting Started {/*getting-started*/}

To prepare your Razzle app for deployment on {{ PRODUCT_NAME }}, run the following in the root folder of your project:

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ CLI_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ CLI_NAME }}/razzle` package - Provides router middleware that automatically adds Razzle routes to {{ PRODUCT_NAME }} router.
- The `{{ CLI_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ CLI_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Razzle. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on {{ PRODUCT_NAME }}.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT_NAME }}.

## Running Locally {/*running-locally*/}

To simulate your app within {{ PRODUCT_NAME }} locally, run:

```bash
{{ CLI_NAME }} dev
```

### Simulate edge caching locally {/*simulate-edge-caching-locally*/}

To simulate edge caching locally, run:

```bash
{{ CLI_NAME }} dev --cache
```

## Deploying {/*deploying*/}

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.](https://app.layer0.co/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project

```bash
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

---
title: Razzle
---

{{ sites_connector_eol.md }}

This guide shows you how to deploy a [Razzle](https://razzlejs.org/) application to {{ PRODUCT }}.

<!-- ## Example {/*example*/}

<ExampleButtons
  title="Razzle"
  siteUrl="https://edgio-community-examples-razzle-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-razzle-example"
  deployFromRepo /> -->

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-razzle-connector">
  View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Getting Started {/*getting-started*/}

To prepare your Razzle app for deployment on {{ PRODUCT }}, run the following in the root folder of your project:

```bash
{{ FULL_CLI_NAME }} init {{ LEGACY_FW_INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/razzle` package - Provides router middleware that automatically adds Razzle routes to {{ PRODUCT }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Razzle. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on {{ PRODUCT }}.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT }}.

## Running Locally {/*running-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

### Simulate edge caching locally {/*simulate-edge-caching-locally*/}

To simulate edge caching locally, run:

```bash
{{ FULL_CLI_NAME }} dev --cache
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

{{ system_origins_callout.md }}

See [Deployments](/guides/basics/deployments) for more information.

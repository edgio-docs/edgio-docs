---
title: SvelteKit
---

[SvelteKit](https://kit.svelte.dev/) is the official application framework from the Svelte team. This guide walks you through deploying SvelteKit sites to {{ PRODUCT }}.

<!-- ## Example {/* example */}

<ExampleButtons
  title="SvelteKit"
  siteUrl="https://edgio-community-examples-svelte-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-svelte-example"
  deployFromRepo
/> -->

<!-- ## Connector {/* connector */}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-sveltekit-connector">
  View the Connector Code
</ButtonLink> -->

{{ PREREQ.md }}

## Create Your Sveltekit App {/* create-your-sveltekit-app */}

If you don't have an existing SvelteKit app, you can create one by running:

```bash
npm create svelte@latest my-svelte-app
```

To use the default app, make the following selections when prompted:

```plaintext diff highlight="2,8"
◆ Which Svelte app template?
  ❯ SvelteKit demo app (A demo app showcasing some of the features of SvelteKit - play a word guessing game that works without JavaScript!)
◆ Add type checking with TypeScript?
  ❯ Yes, using JavaScript with JSDoc comments
◆ Select additional options (use arrow keys/space bar)
  ❯ none
```

Install all dependencies of your new project by running:
```bash
cd my-svelte-app
npm install
```

## Initializing Your Project {/* initializing-your-project */}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init --connector={{ PACKAGE_NAME }}/sveltekit {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/sveltekit` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that adds routes for pre-rendered pages, assets and sends all unmatched requests to the SvelteKit server. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/* routing */}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to SvelteKit server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const {Router} = require('{{ PACKAGE_NAME }}/core/router');
const {svelteKitRoutes} = require('{{ PACKAGE_NAME }}/sveltekit');

export default new Router().use(svelteKitRoutes);
```

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.


### Run the Sveltekit App Locally on {{ PRODUCT_NAME }} {/*run-the-sveltekit-app-locally-on*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.

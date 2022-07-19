---
title: Fastboot
---

This guide shows you how to deploy an [Ember Fastboot](https://ember-fastboot.com/) application on the {{ PRODUCT }} platform.

## Example {/*example*/}

<ExampleButtons
  title="Fastboot"
  siteUrl="https://layer0-docs-layer0-ember-fastboot-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-ember-fastboot-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-fastboot-connector">
  View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP }}

## Getting Started {/*getting-started*/}

To prepare your Fastboot app for deployment on the {{ PRODUCT }}, run the following command in the root folder of your project:

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ CLI_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ CLI_NAME }}/fastboot` package - Provides router middleware that automatically adds Fastboot routes to the {{ PRODUCT }} router.
- The `{{ CLI_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ CLI_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Fastboot. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on {{ PRODUCT }}.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT }}.

## Adding {{ PRODUCT_NAME }} Service Worker {/*adding-layer0-service-worker*/}

To add {{ PRODUCT_NAME }} service worker to your app, call the `install` function from `{{ CLI_NAME }}/prefetch/window` hook when the app first loads. For example, you can alter
`app/app.js` as follows:

```js
import Application from '@ember/application'
import Resolver from 'ember-resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'

// add this to import {{ PRODUCT_NAME }} service worker prefetching functionality
import { install } from '{{ CLI_NAME }}/prefetch/window'

export default class App extends Application {
  modulePrefix = config.modulePrefix
  podModulePrefix = config.podModulePrefix
  Resolver = Resolver
}

loadInitializers(App, config.modulePrefix)

// add this to install the service worker when your app loads
if (typeof navigator != 'undefined') {
  install()
}
```

## dependencies vs devDependencies {/*dependencies-vs-devdependencies*/}

To reduce serverless cold-start times, limit the packages listed in the `dependencies` section of your `package.json` to only those packages used at runtime. The `{{ CLI_NAME }}/fastboot` package must also be included in `dependencies`. Other packages not used at runtime should be included in `devDependencies`. Only those packages listed in `dependencies` are deployed to {{ PRODUCT_NAME }} along with your application code.

## {{ CONFIG_FILE }} {/*-config_file-*/}

Ember fastboot apps should always have the following in {{ CONFIG_FILE }}:

```js filename="/{{ CONFIG_FILE }}"
module.exports = {
  connector: '{{ CLI_NAME }}/fastboot',
  includeNodeModules: true, // this ensures that package.json dependencies are uploaded to the cloud
}
```

## Running Locally {/*running-locally*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

### Simulate edge caching locally {/*simulate-edge-caching-locally*/}

To simulate edge caching locally, run:

```bash
{{ CLI_NAME }} dev --cache
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

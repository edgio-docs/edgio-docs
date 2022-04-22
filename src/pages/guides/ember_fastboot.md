---
title: Fastboot
---

This guide shows you how to deploy [Ember Fastboot](https://ember-fastboot.com/) apps on {{ PRODUCT_NAME }}.

## Example {/*example*/}

<ButtonLinksGroup>
  <ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-ember-fastboot-example-default.layer0.link">
   Try the Fastboot Example Site
  </ButtonLink>
  <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-ember-fastboot-example">
   View the Code
  </ButtonLink>
  <ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-ember-fastboot-example">
    Deploy to Layer0
  </ButtonLink>
</ButtonLinksGroup>

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-fastboot-connector">
  View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

## Getting Started {/*getting-started*/}

To prepare your Fastboot app for deployment on {{ PRODUCT_NAME }}, run the following in the root folder of your project:

```bash
npm install -g {{ CLI_NAME }}/cli
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ CLI_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ CLI_NAME }}/fastboot` package - Provides router middleware that automatically adds Fastboot routes to {{ PRODUCT_NAME }} router.
- The `{{ CLI_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ CLI_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages
- `routes.js` - A default routes file that sends all requests to Fastboot. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` - The source code for your service worker, which enables prefetching when running on {{ PRODUCT_NAME }}.
- `{{ CONFIG_FILE }}` - Contains configuration options for deploying on {{ PRODUCT_NAME }}.

## Adding {{ PRODUCT_NAME }} Service Worker {/*adding-{{PRODUCT_NAME_LOWER}}-service-worker*/} {/*adding--product_name--service-worker-adding-product_name_lower-service-worker*/}

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

```js
module.exports = {
  connector: '{{ CLI_NAME }}/fastboot',
  includeNodeModules: true, // this ensures that package.json dependencies are uploaded to the cloud
}
```

## Running Locally {/*running-locally*/}

To simulate your app within {{ PRODUCT_NAME }} locally, run:

```
{{ CLI_NAME }} dev
```

### Simulate edge caching locally {/*simulate-edge-caching-locally*/}

To simulate edge caching locally, run:

```
{{ CLI_NAME }} dev --cache
```

## Deploying {/*deploying*/}

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.](https://moovweb.app/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project

```
{{ CLI_NAME }} deploy
```

See [deploying](deploying) for more information.

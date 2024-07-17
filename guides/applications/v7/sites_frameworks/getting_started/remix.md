---
title: Remix
---

This article guides you through the setup and deployment of a [Remix](https://remix.run/) + Express application to {{ PRODUCT }}.

## Example {/* example */}

<ExampleButtons
  title="Remix + Express"
  siteUrl="https://edgio-community-examples-v7-remix-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-remix-example"
/>

{{ PREREQ.md }}

## Create a new Remix app {/* create-a-new-remix-app */}

If you don't already have a Remix app that uses an Express server, create one using a template by running the following:

```bash
npx create-remix@latest --template remix-run/remix/templates/express
```

In the root of your project, you can verify your app works by running it locally with:

```bash
npm run dev
```

## Configuring your Remix app for {{ PRODUCT }} {/* configuring-your-remix-app-for-edgio */}

<Info>

This section is relevant only if you have an existing Remix project without Express or the Remix adapter installed. If you already have Express and the Remix adapter installed or have created a new Remix app as described under [Create a new Remix app](#create-a-new-remix-app), you may skip this step.

</Info>

### Configure Express Middleware {/* configure-express-middleware */}

{{ PRODUCT }} requires an Express server to run your Remix app. The following sections will help you configure your Express server. Refer to the [Remix Quick Start](https://remix.run/docs/en/main/start/quickstart#bring-your-own-server) guide for more information.

#### Install Express and Remix Adapter {/* install-express-and-remix-adapter */}

Install Express and the Remix Express adapter. You should also uninstall the default Remix server or any other server you are using:

```bash
# Install Express and Remix adapter
npm i express @remix-run/express cross-env

# Uninstall the default Remix server
npm uninstall @remix-run/serve
```

#### Create an Express server {/* create-an-express-server */}

Create an Express server at the root of your project named `./server.js` with the following content:

```js filename="./server.js"
import {createRequestHandler} from '@remix-run/express';
import express from 'express';

import * as build from './build/server/index.js';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('build/client'));

app.all('*', createRequestHandler({build}));

app.listen(port, () => {
  console.log(`Express listening on http://localhost:${port}`);
});

export default app;
```

<Important>

If you already have an existing Express server, it should conform to the structure above to ensure {{ PRODUCT }} is able to run the server.

</Important>

With the Express server in place, you can verify that it works by running the following command in the root directory of your project:

```bash
node server.js
```

<Info>

When the {{ PRODUCT }} CLI dev server is running, it will automatically detect the Express server and use it to serve your Remix app.

</Info>

## Initialize with {{ PRODUCT }} {/* initialize-with-edgio */}

To initialize your project for deployment on {{ PRODUCT }}, run the following command in the root directory of your project:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/connectors` package - Handles requests to the Express server
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Remix.

## Routing {/* routing */}

{{ PRODUCT }} uses a `routes.js` file to define how requests are routed to your application. By default, all requests are sent to Remix. You can customize this file to add additional routes or modify the default behavior such as defining cache rules.

```js filename="./routes.js"
// This file was automatically added by edgio init.
// You should commit this file to source control.
import {Router} from '@edgio/core';
import {connectorRoutes} from '@edgio/connectors';

export default new Router().use(connectorRoutes).static('public');
```

Refer to the [CDN-as-code](/applications/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

## Run the Remix app locally on {{ PRODUCT }} {/* run-the-remix-app-locally-on */}

Before running your app using the {{ PRODUCT }} CLI, you must first build your Remix app. To do this, run the following command in the root directory of your project:

```bash
npm run build
```

This will create a production build of your app in the `build` directory that the {{ PRODUCT }} CLI will use to serve your app.

<Important>

Always be sure to build your app before running it with the {{ PRODUCT }} CLI.

</Important>

To start the Remix app in development mode, run the following command in the root directory of your project:

```bash
{{ CLI_CMD(dev) }}
```

To start the Remix app simulating an {{ PRODUCT }} production environment, first create a production build

```bash
{{ CLI_CMD(build) }}
```

Then run the following command in the root directory of your project:

```bash
{{ CLI_CMD(run) }} --production
```

Load the site http://127.0.0.1:3000

## Deploying {/* deploying */}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ CLI_CMD(build) }}
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/applications/basics/deployments) guide for more information on the `deploy` command and its options.

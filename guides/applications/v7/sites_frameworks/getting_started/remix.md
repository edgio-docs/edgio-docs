---
title: Remix
---

This guide shows you how to deploy a [Remix](https://remix.run/) application to {{ PRODUCT }}.

<Callout type="warning">

  {{ PRODUCT }} only supports Remix 1.x. Remix 2.x is unsupported due to Node.js requirements and its usage will generate runtime errors.

</Callout>

## Example {/*example*/}

<ExampleButtons
  title="Remix Express"
  siteUrl="https://edgio-community-examples-v7-remix-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-remix-example" />

{{ PREREQ.md }}

## Create a New Remix App {/*create-a-new-remix-app*/}

If you don't already have a Remix app, create one by running the following:

```bash
npx create-remix@latest
```

To ensure your Remix app works with {{ PRODUCT }}, make the following selections when prompted:

```plaintext diff highlight="2,7"
? What type of app do you want to create? (Use arrow keys)
❯ Just the basics
  A pre-configured stack ready for production
...
? Where do you want to deploy? Choose Remix App Server if you're unsure; it's easy to change deployment targets.
  Remix App Server
❯ Express Server
  Architect
  Fly.io
  Netlify
  Vercel
  Cloudflare Pages
```

You can verify your app works by running it locally with:

```bash
npm run dev
```

## Configuring Your Remix App for {{ PRODUCT }} {/*configuring-your-remix-app-for*/}

### Update the type Property in package.json {/*update-the-type-property-in-packagejson*/}

In most cases, a Remix app will have `"type": "module"` in the `package.json` file. This property should be removed as {{ PRODUCT }} does not support it at this time.

```js diff filename="package.json"
{
  "name": "remix-app",
  "version": "0.0.0",
  "description": "A Remix app",
  "main": "index.js",
-  "type": "module",
  "scripts": {
    "dev": "remix dev",
    "build": "remix build",
    "start": "remix run"
  },
  ...
}
```

### Initialize Your Project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }} --connector @edgio/express
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/express` package - Allows you to run your application using the configured Express server
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Remix.

### Modify Remix's Server Configuration {/*modify-remixs-server-configuration*/}

{{ PRODUCT }} requires a few changes to your configuration to correctly bundle your app.

#### Set Up the Express Server {/*set-up-the-express-server*/}

If you created a Remix application by following the above steps, you will have already selected the Express server as your deployment target. If you are using an existing Remix application, you will need to update your `server.js` file with a compatible Express server.

For either scenario, we've provided a sample Express server below that you can use to replace the default `server.js` file in your project.

```js diff filename="server.js"
- import * as fs from "node:fs";
+ const fs = require("node:fs");

- import { createRequestHandler } from "@remix-run/express";
+ const { createRequestHandler } = require("@remix-run/express");
- import { broadcastDevReady, installGlobals } from "@remix-run/node";
+ const { broadcastDevReady, installGlobals } = require("@remix-run/node");
- import chokidar from "chokidar";
+ const chokidar = require("chokidar");
- import compression from "compression";
+ const compression = require("compression");
- import express from "express";
+ const express = require("express");
- import morgan from "morgan";
+ const morgan = require("morgan");

installGlobals();

const BUILD_PATH = "./build/index.js";
/**
 * @type { import('@remix-run/node').ServerBuild | Promise<import('@remix-run/node').ServerBuild> }
 */
- let build = await import(BUILD_PATH);
+ let build = require(BUILD_PATH);

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? createDevRequestHandler()
    : createRequestHandler({
        build,
        mode: process.env.NODE_ENV,
      })
);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Express server listening on port ${port}`);

  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
});

function createDevRequestHandler() {
  const watcher = chokidar.watch(BUILD_PATH, { ignoreInitial: true });

  watcher.on("all", async () => {
    // 1. purge require cache && load updated server build
    const stat = fs.statSync(BUILD_PATH);
    build = import(BUILD_PATH + "?t=" + stat.mtimeMs);
    // 2. tell dev server that this app server is now ready
    broadcastDevReady(await build);
  });

  return async (req, res, next) => {
    try {
      //
      return createRequestHandler({
        build: await build,
        mode: "development",
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
```

<Callout type="important">
  Note that the `server.js` file is using CommonJS `require` instead of ES `import`. This is required for {{ PRODUCT }} to correctly bundle your app.
</Callout>

#### Update the servermoduleformat Property in  remix.config.js {/*update-the-servermoduleformat-property-in-remixconfigjs*/}

Use the CommonJS module format by setting the `serverModuleFormat` property in the `remix.config.js` file to `cjs`.

```js diff filename="remix.config.js"
/** @type {import('@remix-run/dev').AppConfig} */
- export default {
+ module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
-  serverModuleFormat: "esm",
+  serverModuleFormat: "cjs",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
```

<Callout type="important">
  With various changes made to the Remix app configuration, it's important to ensure that the app still works as expected. Build the app locally using `npm run build` to verify there are no errors.
</Callout>

### Update {{ PRODUCT }} Configuration File {/*update-configuration-file*/}

Update `{{ CONFIG_FILE }}` `serverless` property to include the `public` and `build` directories:

```js diff filename="{{ CONFIG_FILE }}" highlight="10,17,18"
// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/guides/edgio_config
module.exports = {
  connector: '@edgio/express',

  /* ... */

  // Options for hosting Cloud Functions on Edgio
  serverless: {
    // Set to true to include all packages listed in the dependencies property of package.json when deploying to Edgio.
    // This option generally isn't needed as Edgio automatically includes all modules imported by your code in the bundle that
    // is uploaded during deployment
    // includeNodeModules: false,
  
    // Include additional paths that are dynamically loaded by your app at runtime here when building the serverless bundle.
    include: ['public/**/*', 'build/**/*'],
  },

  /* ... */
}

```

### Configure the Caching Policy {/*configure-the-caching-policy*/}

Update the {{ ROUTES_FILE }} to add a caching policy for your app's SSR pages and static assets:

```js diff filename="routes.js" ins="7-11"
/// This file was automatically added by edgio init.
// You should commit this file to source control.
import { Router } from '@edgio/core'

export default new Router()
  .match('/:path*', {
    caching: {
      max_age: '1d',
      stale_while_revalidate: '1d',
      service_worker_max_age: '1h',
    },

    origin: {
      set_origin: 'edgio_serverless',
    },
  })
  .static('public')
```

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Remix App Locally on {{ PRODUCT }} {/*run-the-remix-app-locally-on*/}

Create a development build of your app by running the following in your project's root directory:

```bash
# start the {{ PRODUCT }} dev server
{{ CLI_CMD(dev) }}
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
# build your app for production
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
# deploy the {{ PRODUCT }} production bundle
{{ CLI_CMD(deploy) }}
```

{{ system_origins_callout.md }}

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.

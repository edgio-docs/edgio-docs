---
title: Nuxt.js
---

This guide shows you how to deploy a Nuxt.js application to {{ PRODUCT }}. If you run into any issues please consult the [Troubleshooting](#troubleshooting) section.

<!-- ## Example SSR Site {/* example-ssr-site */}

This Nuxt.js example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

<ExampleButtons
  title="Nuxt.js SSR"
  siteUrl="https://edgio-community-examples-nuxt-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-nuxt-example"
  deployFromRepo
/>

## Example ISG Site {/* example-isg-site */}

This Nuxt.js example app uses ISG (Incremental Static Generation) to provide lightening-fast transitions between pages.

<ExampleButtons
  title="Nuxt.js ISG"
  siteUrl="https://edgio-community-examples-nuxt-isg-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-nuxt-isg-example"
  deployFromRepo
/>

## Connector {/* connector */}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-nuxt-connector">
  View the Connector Code
</ButtonLink> -->

{{ PREREQ.md }}

## Creating a new Nuxt app {/* creating-a-new-nuxt-app */}

If you don't already have a nuxt.js application, you can create one using:

```bash
npm create nuxt-app my-nuxt-app
```

Nuxt's create module will ask you a series of questions to configure your app. Make sure you answer as follows:

- For `Choose rendering mode` select `Universal (SSR / SSG)`
- Your answers to the other questions should not matter for the purposes of this guide.

## Adding {{ PRODUCT }} to an existing Nuxt app {/* adding-to-an-existing-nuxt-app */}

To prepare your Nuxt.js application for {{ PRODUCT }}:

1. In the existing `nuxt.config.js` configuration, add "{{ PACKAGE_NAME }}/nuxt/module" to `buildModules`:

```js ins="5"
// nuxt.config.js

module.exports = {
  /* ... */
  buildModules: [['{{ PACKAGE_NAME }}/nuxt/module', { {{ FULL_CLI_NAME }}SourceMaps: true }]],
}
```

Options:

- `{{ FULL_CLI_NAME }}SourceMaps: true|false`: when true, the serverless build includes sourcemap files which make debugging easier when tailing the server logs in the {{ PORTAL }}. It also increases the serverless bundle size, which may push your deployments over the 50MB (compressed) limit.

<Callout type="warning">

We noticed some performance issues related to sourcemaps being loaded in our Serverless infrastructure, which may result in 539 project timeout errors. In case you encounter such errors, please try again with sourcemaps disabled. This document will be updated once the problem is fully resolved.

</Callout>

2. Run `{{ FULL_CLI_NAME }} init` to configure your project for {{ PRODUCT }}.

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

The `{{ FULL_CLI_NAME }} init` command will automatically add all the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/nuxt` package
- The `{{ PACKAGE_NAME }}/vue` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to `nuxt.js`. You can update this file to add caching or proxy some URLs to a different origin as described later in this guide.
- `sw/service-worker.js` - A service worker that provides static asset and API prefetching.

This command will also update your `package.json` with the following changes:

- Moves all packages in `dependencies` to `devDependencies` except those listed in the `modules` property of `nuxt.config.js`.
- Adds `@nuxt/core` to `dependencies`
- Adds several `scripts` to run the available `{{ FULL_CLI_NAME }}` commands

As an example, here's the original `package.json` from Nuxt's create step:

```json
{
  "name": "my-nuxt-app",
  "version": "1.0.0",
  "description": "My remarkable Nuxt.js project",
  "author": "Techy Ted",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "{{ PACKAGE_NAME }}/cli": "^7.0.0",
    "{{ PACKAGE_NAME }}/core": "^7.0.0",
    "{{ PACKAGE_NAME }}/nuxt": "^7.0.0",
    "nuxt": "^2.0.0"
  },
  "devDependencies": {}
}
```

And here is the `package.json` after modifications by `{{ FULL_CLI_NAME }} init`:

```json
{
  "name": "my-nuxt-app",
  "version": "1.0.0",
  "description": "My remarkable Nuxt.js project",
  "author": "Techy Ted",
  "private": true,
  "scripts": {
    "dev": "{{ FULL_CLI_NAME }} run",
    "build": "{{ FULL_CLI_NAME }} build",
    "start": "{{ FULL_CLI_NAME }} run",
    "prod": "{{ FULL_CLI_NAME }} run --production",
    "generate": "nuxt generate"
  },
  "dependencies": {
    "@nuxt/core": "^2.14.2"
  },
  "devDependencies": {
    "{{ PACKAGE_NAME }}/cli": "^7.0.0",
    "{{ PACKAGE_NAME }}/core": "^7.0.0",
    "{{ PACKAGE_NAME }}/nuxt": "^7.0.0",
    "{{ PACKAGE_NAME }}/vue": "^7.0.0",
    "dotenv": "^8.2.0",
    "nuxt": "^2.0.0",
    "serverless": "^1.64.0",
    "serverless-dotenv-plugin": "^2.3.2",
    "serverless-offline": "^5.14.1"
  }
}
```

## Run the Nuxt.js app locally on {{ PRODUCT }} {/* run-the-nuxtjs-app-locally-on */}

Run the Nuxt.js app with the command:

```bash
npm run {{ FULL_CLI_NAME }}:dev
```

Load the site: http://127.0.0.1:3000

## modules vs buildModules {/* modules-vs-buildmodules */}

Nuxt does not bundle packages listed in the `modules` property of `nuxt.config.js` when building your app for production.
This can lead to an increased bundle size and slow down server-side rendering. Most Nuxt modules can be moved to
`buildModules`. We recommend the following to maximize performance of server-side rendering in the cloud:

- Move all entries from `modules` to `buildModules` in `nuxt.config.js`
- Move all corresponding packages from `dependencies` to `devDependencies` in package.json
- Run `yarn install` or `npm install` to update your lock file.

Doing so will exclude these modules from your production deployment and keep the bundle size as small as possible.

## Routing {/* routing */}

The next few sections of this guide explain how {{ PRODUCT_NAME }} interacts with Nuxt's routing, which is important if you are migrating an existing application. If you just created a new nuxt app, you can jump to [Running Locally](#running-locally) and come back to these sections later.
{{ PRODUCT_NAME }} supports Nuxt.js's built-in routing scheme. The default {{ ROUTES_FILE }} file created by `{{ FULL_CLI_NAME }} init` sends all requests to Nuxt.js via a fallback route:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

import {Router} from '{{ PACKAGE_NAME }}/core/router';
import {nuxtRoutes} from '{{ PACKAGE_NAME }}/nuxt';

export default new Router()
  .match('/service-worker.js', ({serviceWorker}) => {
    serviceWorker('.nuxt/dist/client/service-worker.js');
  })
  .use(nuxtRoutes);
```

### nuxtRoutes Middleware {/* nuxtroutes-middleware */}

In the code above, `nuxtRoutes` adds all Nuxt.js routes based on the `/pages` directory. It's also compatible with extending Nuxt's router via the `router` config in `nuxt.config.js`, for example:

```js filename="nuxt.config.js"
export default {
  // ... more config ...
  router: {
    // For example, we can extend the nuxt router to accept /products in addition to /p.
    // The nuxtRoutes middleware automatically picks this up and adds it to the {{ PRODUCT }} router
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/products/:id?',
        component: resolve(__dirname, 'pages/p/_id.vue'),
      });
    },
  },
  // ... more config ...
};
```

You can add additional routes before and after `nuxtRoutes`, for example to send some URLs to an alternate backend. This is useful for gradually replacing an existing site with a new Nuxt.js app.

A popular use case is to fallback to a legacy site for any route that your Nuxt.js app isn't configured to handle:

```js
import {Router} from '{{ PACKAGE_NAME }}/core/router';
import {nuxtRoutes} from '{{ PACKAGE_NAME }}/nuxt';

export default new Router()
  .use(nuxtRoutes)

  // Proxy non-Nuxt.js routes to your origin site
  .match('/:path*', {
    origin: {
      set_origin: 'origin',
    },
  });
```

To configure the origin backend, use {{ CONFIG_FILE }}:

```js filename="{{ CONFIG_FILE }}"
module.exports = {
  // Other config options...

  // If you need to proxy some URLs to an origin instead of your Nuxt.js app, you can configure the origins here:
  origins: [
    {
      // The name of the backend origin
      name: 'origin',

      // When provided, the following value will be sent as the host header when connecting to the origin.
      // If omitted, the host header from the browser will be forwarded to the origin.
      override_host_header: 'example.com',

      // The list of backend hosts
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: 'example.com',
        },
      ],
    },
  ],
};
```

{{ origins_config_warning.md }}

### Caching {/* caching */}

The easiest way to add edge caching to your nuxt.js app is to add caching routes before the middleware. For example,
imagine you have `/pages/c/_categoryId.js`:

```js
export default new Router().use(nuxtRoutes).get('/pages/c/:categoryId', {
  caching: {
    max_age: '1d',
    stale_while_revalidate: '1h',
    service_worker_max_age: '1d',
    bypass_client_cache: true,
  },
  headers: {
    set_response_headers: {
      'x-sw-cache-control': 'max-age=86400',
    },
  },
});
```

## Prefetching {/* prefetching */}

The `{{ PACKAGE_NAME }}/nuxt/module` builds a service worker that enables prefetching using {{ PRODUCT }} and injects it into your app's browser code. The service worker is based on Google's [Workbox](https://developers.google.com/web/tools/workbox) library. The entry point for the service worker source code is `sw/service-worker.js`. If your app has an existing service worker that uses workbox, you can copy its contents into `sw/service-worker.js` and simply add the following to your service worker:

```js
import {Prefetcher} from '{{ PACKAGE_NAME }}/prefetch/sw';
new Prefetcher().route();
```

The above allows you to prefetch pages from {{ PRODUCT_EDGE }}'s cache to greatly improve browsing speed. To prefetch a page, add the `Prefetch` component from `{{ PACKAGE_NAME }}/vue` to any `router-link` or `nuxt-link` element:

```js ins="4,8,13-18"
<template>
  <ul v-for="product in products">
    <li>
      <Prefetch v-bind:url="'/api/' + product.url">
        <nuxt-link v-bind:to="product.url">
          <img v-bind:src="product.thumbnail" />
        </nuxt-link>
      </Prefetch>
    </li>
  </ul>
</template>
<script>
  import { Prefetch } from '{{ PACKAGE_NAME }}/vue'
  export default {
    components: {
      Prefetch,
    },
  }
</script>
```

The `Prefetch` component fetches data for the linked page from {{ PRODUCT_EDGE }}'s cache based on the `url` property and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

## Serving Sitemap with SSR {/* serving-sitemap-with-ssr */}

You can configure Nuxt to generate a sitemap in SSR mode with the following configuration:

```js filename="nuxt.config.*" ins="6,9-17"
export default {
  /* ... */

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/sitemap'],

  sitemap: {
    hostname: 'yourhost.com',
    path: '/sitemap.xml',
    defaults: {
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.8,
    },
  },
};
```

Within the {{ PRODUCT }} router, add the following:

```js filename="routes.js"
import {Router} from '{{ PACKAGE_NAME }}/core/router';
import {nuxtRoutes} from '{{ PACKAGE_NAME }}/nuxt';
import { EDGIO_SERVERLESS_HINT_HEADER, EDGIO_SERVERLESS_HINTS } from '@edgio/core/constants'
import { SERVERLESS_ORIGIN_NAME } from '@edgio/core/origins'

export default new Router()
  .use(nuxtRoutes)

  // Instruct {{ PRODUCT }} to send traffic for /sitemap.xml to Nuxt middleware
  .match('/sitemap.xml', {
    headers: {
      set_request_headers: {
        `+${EDGIO_SERVERLESS_HINT_HEADER}`: EDGIO_SERVERLESS_HINTS.app,
      },
    },
    origin: {
      set_origin: SERVERLESS_ORIGIN_NAME,
    },
  })
```

This will send all traffic for `/sitemap.xml` to Nuxt middleware for server-side rendering.

## Static Sites {/* static-sites */}

{{ PRODUCT }} supports fully and partially static sites using Nuxt [generate](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate). To deploy a static Nuxt site on {{ PRODUCT }}, simply set `target: 'static'` in `nuxt.config.js` and run `{{ FULL_CLI_NAME }} deploy`. This will run `nuxt build` and `nuxt generate` to generate a static version of your site.

### Incremental Static Rendering (ISG) {/* incremental-static-rendering-isg */}

By default, requests for any pages that are not statically rendered at build time will fall back to server side rendering. If you use the {{ PRODUCT }} router to cache pages that are not statically rendered, the first user who attempts to access the page will see the fallback HTML page generated by Nuxt (200.html by default). {{ PRODUCT }} will render and cache the HTML in the background so that subsequent visits result in a full HTML response. This behavior is similar to Next.js incremental static rendering (ISG). Here is an example route that adds caching for a partially static page:

```js filename="routes.js"
import {Router} from '{{ PACKAGE_NAME }}/core/router';
import {nuxtRoutes} from '{{ PACKAGE_NAME }}/nuxt';

export default new Router().use(nuxtRoutes).get('/products/:id', {
  caching: {
    // Requests for product pages that are not statically generated will fall back to SSR.
    // The first user will see the 200.html loading page generated by Nuxt.
    // {{ PRODUCT }} will render full HTML response in the background and cache it for one day at the edge.
    // All future requests to the page will result in the full HTML response.
    max_age: '1d',
    // continue to serve stale responses from the edge cache while refreshing via SSR in the background
    stale_while_revalidate: '1h',
  },
});
```

### Rendering a 404 Page {/* rendering-a-404-page */}

If you set the `fallback` property in the [generate](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/#fallback) config to `true`, Nuxt.js will generate a 404.html page that will be served whenever the URL does not match a static page. {{ PRODUCT_NAME }} will send a 404 http status for these URLs. Note that if you set the fallback property to a string, Nuxt will generate a fallback page with that name, and {{ PRODUCT_NAME }} will serve it with a 200 http status when the URL does not match a statically generated page.

## includeFiles {/* includefiles */}

Nuxt requires that certain resources are included in a build and deploy to have access to them. As such, at times this will require additional configuration. To include additional resources for server side rendering, API calls, etc., use the `includeFiles` option in your `{{ CONFIG_FILE }}` file. [Read more](/guides/performance/cdn_as_code/edgio_config#includefiles)

In this example, we would have an `api` folder that we want to include all items from.

```js
module.exports = {
  connector: '{{ PACKAGE_NAME }}/nuxt',

  serverless: {
    // Set to true to include all packages listed in the dependencies property of package.json when deploying to Edgio.
    // This option generally isn't needed as Edgio automatically includes all modules imported by your code in the bundle that
    // is uploaded during deployment
    // includeNodeModules: true,

    // Include additional paths that are dynamically loaded by your app at runtime here when building the serverless bundle.
    include: ['api/**/*'],
  },
};
```

In addition, if `includeNodeModules` does not copy over the necessary package that may be needed in production, it can be included via this key as well. For instance,

```js
module.exports = {
  /* ... */
  serverless: {
    includeFiles: ['api/**/*', 'node_modules/some_package/**/*'],
  },
};
```

## Nitro {/* nitro */}

The Nuxt team provides a renderer called [Nitro](https://www.npmjs.com/package/@nuxt/nitro) which optimizes your application for serverless deployment and greatly minimizes the size of your server application bundle. If you're running into the size limitation for serverless bundles (50MB), you might try adding Nitro to your app. As of June 2021 Nitro is still not production ready, so use at your own risk.

{{ PRODUCT }} provides a connector specifically for Nuxt apps that use nitro called `{{ PACKAGE_NAME }}/nuxt-nitro`.

<Video src="https://www.youtube.com/watch?v=cZt27HOhmLQ" />

To add Nitro to your app, make the following changes:

1. Install nitro and the connector as dev dependencies:

```bash
npm install -D @nuxt/nitro {{ PACKAGE_NAME }}/nuxt-nitro`
```

2. Ensure `buildModules` in nuxt.config.js contains the following:

```js
buildModules: [
  '@nuxt/nitro/compat',
  '{{ PACKAGE_NAME }}/nuxt-nitro/module', // If you have previously added {{ PACKAGE_NAME }}/nuxt/module you can remove it.
  // ...others...
],
```

3. Add the following to nuxt.config.js:

```js
publicRuntimeConfig: {
  nitroVersion: require('@nuxt/nitro/package.json').version,
},
```

4. If your nuxt.config.js has a `target` property, remove it.

5. If you've previously added `{{ PACKAGE_NAME }}/nuxt` as a dependency, you can remove it.

### Additional Nitro Resources {/* additional-nitro-resources */}

- [Nitro Demo Application from the Nuxt Team](https://github.com/nuxt/nitro-demo)

## Running Locally {/* running-locally */}

Test your app with {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run
```

You can do a production build of your app and test it locally using:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be uploaded to the {{ PRODUCT_NAME }} cloud using serverless-offline.

## Deploying {/* deploying */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) for more information.

{{ related_resources.md }}

## Troubleshooting {/* troubleshooting */}

The following section describes common issues and their workarounds.

---

### I get an error message `Nuxt.js Internal Server Error` {/* i-get-an-error-message-nuxtjs-internal-server-error */}

This may be because you have a custom server framework (such as Express). Please make sure you selected `None` when asked to choose `Choose custom server framework` during the creation of your nuxt app.

---

### {{ FULL_CLI_NAME }} init doesn't work {/* init-doesnt-work */}

If you get a command not found error such as:

```bash
{{ FULL_CLI_NAME }} init
- bash: {{ FULL_CLI_NAME }}: command not found
```

Make sure you installed the {{ PRODUCT }} CLI

```bash
npm i -g {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }}
```

---

### Make sure your version of the {{ PRODUCT }} CLI is current {/* make-sure-your-version-of-the-cli-is-current */}

If you previously installed the {{ PRODUCT }} CLI, make sure your version is current.

Check npm for the latest released version of the CLI:

```bash
npm show {{ PACKAGE_NAME }}/cli version
4.0.0
```

Compare the latest release against the version currently installed on your system:

```bash
{{ FULL_CLI_NAME }} --version
7.0.0
```

If your version is out of date you can update it by running

```bash
npm update -g {{ PACKAGE_NAME }}/cli
```

---

<a id="error-on-deploy-layer0-deploy-lambda-unzipped-size-must-be-smaller-than-"></a>

### Error on deploy: `{{ PRODUCT_NAME_LOWER }}-deploy-lambda: Unzipped size must be smaller than...` {/* error-on-deploy-deploy-lambda-unzipped-size-must-be-smaller-than */}

As the error states, there is an upper limit on how big a package can be when deployed to our serverless infrastructure. Some common strategies for solving:

- You may need to move some dependencies as [described here](#modules-vs-buildmodules). Only dependencies are copied up to the lambda.
- Make sure you are using imports in a smart way. A common example is changing: `import { get } from lodash` to `import get from lodash/get` to avoid unnecessary bloat in your modules

You can view what is included in your package under `.{{ PRODUCT_NAME_LOWER }}/lambda/` after a build, and running `du -h -d 1` on the directories in a shell will output the size of each directory and help you identify where space savings can be found, ie `du -h -d 1 .{{ PRODUCT_NAME_LOWER }}/lambda/.nuxt`

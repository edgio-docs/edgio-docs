---
title: Sapper
---

This guide shows you how to deploy a [Sapper](https://sapper.svelte.dev/) application to {{ PRODUCT }}.

<Video src="https://www.youtube.com/watch?v=Xt_UlQiXDgQ"/>

## Example SSR Site {/*example-ssr-site*/}

This Sapper example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

<ExampleButtons
  title="Sapper SSR"
  siteUrl="https://layer0-docs-layer0-sapper-example-default.layer0-limelight.link/category/hats"
  repoUrl="https://github.com/layer0-docs/layer0-sapper-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-sapper-connector">
  View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS.md }}

{{ SIGN_UP }}

## Getting Started {/*getting-started*/}

If you don't already have a Sapper app, use the terminal (or command prompt on Windows) to create one using the commands below:

```bash
# for Rollup
npx degit "sveltejs/sapper-template#rollup" my-app

# for webpack
npx degit "sveltejs/sapper-template#webpack" my-app

cd my-app
npm install
npm run dev & open http://localhost:3000
```

To prepare your Sapper app for deployment on {{ PRODUCT }}, run the following in the root folder of your project:

```bash
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/sapper` package - Provides router middleware that automatically adds Sapper routes to the {{ PRODUCT }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/svelte` package - Provides a `Prefetch` component for prefetching pages
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to Sapper. Update this file to add caching or proxy some URLs to a different origin.

## Webpack {/*webpack*/}

If you're using webpack to build your app, update `webpack.config.js` to bundle all dependencies in the server build:

```js
 output: config.server.output(),
 target: 'node',
 resolve: { alias, extensions, mainFields },
-externals: Object.keys(pkg.dependencies).concat('encoding'),
+externals: ['encoding'],
 module: {
         rules: [
                 {
```

## Rollup {/*rollup*/}

If you're using Rollup to build your app, install `@rollup/plugin-json`:

```bash
npm i -D @rollup/plugin-json
```

Then make the following changes to `rollup.config.js`:

```js
 import babel from '@rollup/plugin-babel';
 import { terser } from 'rollup-plugin-terser';
 import config from 'sapper/config/rollup.js';
-import pkg from './package.json';
+import json from '@rollup/plugin-json';

 const mode = process.env.NODE_ENV;
 const dev = mode === 'development';
```

... and make the following changes to the `server` config ...

```js
 input: config.server.input(),
 output: config.server.output(),
 plugins: [
+        json(),
         replace({
                 'process.browser': false,
                 'process.env.NODE_ENV': JSON.stringify(mode)
```

and

```js
-external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
+external: require('module').builtinModules,
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

See [deploying](deploy_apps) for more information.

## Prefetching {/*prefetching*/}

Follow these steps to add prefetching to your app:

### Service Worker {/*service-worker*/}

Add the following to `src/service-worker.js`:

```js
import { timestamp, files, shell, routes } from '@sapper/service-worker'

/* begin: add this to src/service-worker.js */
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'

precacheAndRoute([])
new Prefetcher().route()
/* end: add this to src/service-worker.js */
```

### Prefetch Component {/*prefetch-component*/}

To prefetch data when links become visible in the viewport, wrap the link in the `Prefetch` component from `{{ PACKAGE_NAME }}/svelte`

```html
<script>
  import { Prefetch } from '{{ PACKAGE_NAME }}/svelte'
</script>

<Prefetch url="/blog.json">
  <a href="blog">Blog</a>
</Prefetch>
```

Note that the behavior of the `Prefetch` component is different from Sapper's built-in support for `<a rel="prefetch">` in two ways:

- `rel="prefetch"` only prefetches data when the user hovers over the link. The `Prefetch` component will prefetch data when the link becomes visible, or, if the `immediately` prop is present, as soon as the page loads.
- `Prefetch` will only prefetch from the {{ PRODUCT_EDGE }} cache, which means that additional traffic due to prefetching will never reach your API servers.

See [Prefetching](/guides/prefetching) for more information.

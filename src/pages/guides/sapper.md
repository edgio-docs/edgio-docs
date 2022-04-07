---
title: Sapper
---

This guide shows you how to deploy [Sapper](https://sapper.svelte.dev/) apps on {{ PRODUCT_NAME }}

<Video src="https://www.youtube.com/watch?v=Xt_UlQiXDgQ"/>

## Example SSR Site {/*example-ssr-site*/}

This Sapper example app uses server-side rendering and prefetching to provide lightening-fast transitions between pages.

<ButtonLinksGroup>
  <ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-sapper-example-default.layer0.link/category/hats">
   Try the Sapper SSR Example Site
  </ButtonLink>
  <ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-sapper-example">
   View the Code
  </ButtonLink>
  <ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-sapper-example">
    Deploy to Layer0
  </ButtonLink>
</ButtonLinksGroup>

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-sapper-connector">
  View the Connector Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

## Getting Started {/*getting-started*/}

If you don't already have a Sapper app, use the terminal (or command prompt on Windows) to create one using the commands below:

```
# for Rollup
npx degit "sveltejs/sapper-template#rollup" my-app

# for webpack
npx degit "sveltejs/sapper-template#webpack" my-app

cd my-app
npm install
npm run dev & open http://localhost:3000
```

To prepare your Sapper app for deployment on {{ PRODUCT_NAME }}, run the following in the root folder of your project:

```
npm install -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/sapper` package - Provides router middleware that automatically adds Sapper routes to the {{ PRODUCT_NAME }} router.
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `{{ PACKAGE_NAME }}/svelte` package - Provides a `Prefetch` component for prefetching pages
- `{{ CONFIG_FILE }}`
- `routes.js` - A default routes file that sends all requests to Sapper. Update this file to add caching or proxy some URLs to a different origin.

## Webpack {/*webpack*/}

If you're using webpack to build your app, update `webpack.config.js` to bundle all dependencies in the server build:

```diff
                output: config.server.output(),
                target: 'node',
                resolve: { alias, extensions, mainFields },
-               externals: Object.keys(pkg.dependencies).concat('encoding'),
+               externals: ['encoding'],
                module: {
                        rules: [
                                {
```

## Rollup {/*rollup*/}

If you're using Rollup to build your app, install `@rollup/plugin-json`:

```
npm i -D @rollup/plugin-json
```

Then make the following changes to `rollup.config.js`:

```diff
 import babel from '@rollup/plugin-babel';
 import { terser } from 'rollup-plugin-terser';
 import config from 'sapper/config/rollup.js';
-import pkg from './package.json';
+import json from '@rollup/plugin-json';

 const mode = process.env.NODE_ENV;
 const dev = mode === 'development';
```

... and make the following changes to the `server` config ...

```diff
                input: config.server.input(),
                output: config.server.output(),
                plugins: [
+                       json(),
                        replace({
                                'process.browser': false,
                                'process.env.NODE_ENV': JSON.stringify(mode)
```

and

```diff
-		            external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
+		            external: require('module').builtinModules,
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

Deploying requires an account on {{ PRODUCT_NAME }}. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy to {{ PRODUCT_NAME }} by running the following in the root folder of your project

```

{{ CLI_NAME }} deploy

```

See [deploying](deploying) for more information.

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
- `Prefetch` will only prefetch from the {{ PRODUCT_NAME }} edge cache, which means that additional traffic due to prefetching will never reach your API servers.

See [Prefetching](/guides/prefetching) for more information.

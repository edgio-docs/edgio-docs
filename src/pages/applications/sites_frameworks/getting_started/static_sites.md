---
title: Serving Static Sites
---

This guide shows you how to serve generic static sites to {{ PRODUCT }}.

<Video src="https://player.vimeo.com/video/691615425"/>

## Example Static Sites {/*example-static-sites*/}

Here are a few examples of common static sites served by {{ PRODUCT }}.

<ExampleButtons
  title="(Static) Backbone.js"
  siteUrl="https://layer0-docs-layer0-static-backbonejs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/static-backbonejs-example" 
  deployFromRepo />

<ExampleButtons
  title="(Static) React"
  siteUrl="https://layer0-docs-layer0-static-react-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-static-react-example" 
  deployFromRepo />

<ExampleButtons
  title="(Static) Vue.js"
  siteUrl="https://layer0-docs-layer0-vue3-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-vue3-example" 
  deployFromRepo />

{{ PREREQ }}

## Getting Started {/*getting-started*/}

To prepare your static app for deployment on {{ PRODUCT }}, run the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} init
```

This will automatically add all of the required dependencies and files to your
project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - The main configuration file for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to Next.js. Update this file to add caching or proxy some URLs to a different origin.
- `sw/service-worker.js` A service worker implemented using Workbox.

## Generate Static Resources {/*generate-static-resources*/}

If you're building an app that bundles static resources, you will want to generate those files before contuining. Typically, this is handled using a build script such as `npm run build`. This may differ depending on your framework.

The built version of your app will typically reside in a `/build` or `/dist` directory.

## Router Configuration {/*router-configuration*/}

The {{ PRODUCT }} router is used for configuring where the static resources reside and how to serve them. Using the example above, let's assume your site is bundled under the `/build` directory and has the following structure:

- `/build/index.html`
- `/build/static/css/main.css`
- `/build/static/js/main.js`

You can use the router's `static` method to serve everything in the `build` directory:

```js
// routes.js

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

module.exports = new Router().static('build')
```

If your site does not use a bundler for generating a build output, you can still serve the assets using `serveStatic` and reference the relative path to the resources. Any resource referenced using `serveStatic` or `appShell` will automatically be included in the {{ PRODUCT }} deployment. An example of serving assets from your `src` directory:

```js
// routes.js

const { Router } = require('{{ PACKAGE_NAME }}/core/router')

const ONE_YEAR = 365 * 24 * 60 * 60

const edgeOnly = {
  browser: false,
  edge: { maxAgeSeconds: ONE_YEAR },
}

const edgeAndBrowser = {
  browser: { maxAgeSeconds: ONE_YEAR },
  edge: { maxAgeSeconds: ONE_YEAR },
}

const handler = ({ cache, serveStatic }, cacheConfig, path) => {
  cache(cacheConfig)
  serveStatic(path)
}

module.exports = new Router()

  // Assets (Hashed and Cached on Edge and in the Browser)
  .get('/css/:path*', res => handler(res, edgeAndBrowser, 'src/css/:path*')) 
  .get('/js/:path*', res => handler(res, edgeAndBrowser, 'src/js/:path*')) 
  
  // Path(s) that do not have a "." as well as "/" to serve the fallback page
  .get('/:path*/:file([^\\.]+|)', res => handler(res, edgeOnly, 'src/index.html')) 
  
  // All other paths to be served from the src directory
  .get('/:path*', res => handler(res, edgeOnly, 'src/:path*'))
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

For more on deploying, see [Deploying](/applications/deploy_apps).

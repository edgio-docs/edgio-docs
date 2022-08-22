---
title: Serving Static Sites
---

This guide shows you how to serve generic static sites to {{ PRODUCT }}.

<Video src="https://player.vimeo.com/video/691615425"/>

## Example Static Sites {/*example-static-sites*/}

Here are a few examples of common static sites served by {{ PRODUCT }}.

<ExampleButtons
  title="Backbone.js Static"
  siteUrl="https://layer0-docs-layer0-static-backbonejs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/static-backbonejs-example" 
  deployFromRepo />

<ExampleButtons
  title="React Static"
  siteUrl="https://layer0-docs-layer0-static-react-example-default.layer0-limelight.link/"
  repoUrl="https://github.com/layer0-docs/static-react-example" 
  deployFromRepo />

<ExampleButtons
  title="Vue.js Static"
  siteUrl="https://layer0-docs-layer0-static-vuejs-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/static-vuejs-example" 
  deployFromRepo />

{{ PREREQ }}

## Getting Started {/*getting-started*/}

To prepare your static app for deployment on {{ PRODUCT }}, run the following command in your project's root directory:

```bash
{{ CLI_NAME }} init
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

const router = new Router()

router.static('build')

export default router
```

If your site does not use a bundler for generating a build output, you can still serve the assets using `serveStatic` and reference the relative path to the resources. Any resource referenced using `serveStatic` or `appShell` will automatically be included in the {{ PRODUCT }} deployment. An example of serving assets from your `src` directory:

```js
// routes.js

const { Router } = require('@layer0/core/router')

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

const edgeOnly = {
  browser: false,
  edge: { maxAgeSeconds: ONE_YEAR },
}

const edgeAndBrowser = {
  browser: { maxAgeSeconds: ONE_YEAR },
  edge: { maxAgeSeconds: ONE_YEAR },
}

module.exports = new Router()
  .prerender([{ path: '/' }])
  // js and css assets are hashed and can be far-future cached in the browser
  .get('/css/:path*', ({ cache, serveStatic }) => {
    cache(edgeAndBrowser)
    serveStatic('src/css/:path*')
  })
  .get('/js/:path*', ({ cache, serveStatic }) => {
    cache(edgeAndBrowser)
    serveStatic('src/js/:path*')
  })
  // all paths that do not have a "." as well as "/"" should serve the app shell (index.html)
  .get('/:path*/:file([^\\.]+|)', ({ cache, appShell }) => {
    cache(edgeOnly)
    appShell('src/index.html')
  })
  // all other paths should be served from the src directory
  .get('/:path*', ({ cache, serveStatic }) => {
    cache(edgeOnly)
    serveStatic('src/:path*')
  })
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

For more on deploying, see [Deploying](/guides/deploying).

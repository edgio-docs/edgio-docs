# Astro

[Astro](https://astro.build/) is a modern static site builder. This guide walks you through deploying Astro sites to Layer0.

## Example Site

Here is an example Astro app running on Layer0:

[Try the Astro Example Site](https://layer0-docs-layer0-astro-example-default.layer0.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-astro-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https%253A%252F%252Fgithub.com%252Flayer0-docs%252Flayer0-astro-example)

## Create your Astro site

If you don't have an existing Astro site, you can create one by running:

```bash
# Make a new project directory, and navigate directly into it
$ mkdir my-astro-project && cd $_

# prepare for liftoff...
$ npm init astro

# install dependencies
$ npm install

# start developing!
$ npm run dev

# when you're ready: build your static site to `dist/`
$ npm run build
```

## Add Layer0

```bash
# First, globally install the Layer0 CLI:
$ npm i -g @layer0/cli

# Then, add Layer0 to your MkDocs site:
$ 0 init
```

## Update your Layer0 Router

Paste the following into routes.ts:

```js
// routes.ts
import { Router } from '@layer0/core'

export default new Router()
  .get('/:path*/:file.:ext(js|css|png|ico|jpg|gif|svg)', ({ cache, serveStatic }) => {
    cache({
      browser: {
        // cache js, css, and images in the browser for one hour...
        maxAgeSeconds: 60 * 60,
      },
      edge: {
        // ... and at the edge for one year
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
    serveStatic('dist/:path*/:file.:ext')
  })
  .match('/:path*', ({ cache, serveStatic, setResponseHeader }) => {
    cache({
      // prevent the browser from caching html...
      browser: false,
      edge: {
        // ...cache html at the edge for one year
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
    setResponseHeader('content-type', 'text/html; charset=UTF-8')
    serveStatic('dist/:path*')
  })
```

You can remove the origin backend from `layer0.config.js`:

```js
module.exports = {}
```

## Deploy to Layer0

To deploy your site to Layer0, run:

```bash
# Create a production build of your astro site
$ npm run build

# Deploy it to Layer0
$ 0 deploy
```

---
title: Astro
---

[Astro](https://astro.build/) is a modern static site builder. This guide walks you through deploying Astro sites to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons
  title="Astro"
  siteUrl="https://layer0-docs-layer0-astro-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-astro-example" 
  deployFromRepo />

{{ PREREQ }}

## Create your Astro site {/*create-your-astro-site*/}

If you don't have an existing Astro site, you can create one by running:

```bash
# Make a new project directory, and navigate directly into it
mkdir my-astro-project && cd $_

# prepare for liftoff...
npm init astro

# install dependencies
npm install

# start developing!
npm run dev

# when you're ready: build your static site to `dist/`
npm run build
```

## Initializing your Project {/*initializing-your-project*/}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} init
```

## Update your {{ PRODUCT }} Router {/*update-your-edgio-router*/}

Paste the following into `routes.js` or `routes.ts`, depending on the results of the `{{ CLI_NAME }} init` command:

```js
import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core'

export default new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  .noIndexPermalink()
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

You can remove the origin backend from `{{ CONFIG_FILE }}`:

```js
module.exports = {}
```

## Deploy to {{ PRODUCT }} {/*deploy-to-edgio*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
# Create a production build of your astro site
npm run build

# Deploy it to {{ PRODUCT }}
{{ CLI_NAME }} deploy
```
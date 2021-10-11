# MkDocs

[MkDocs](https://www.mkdocs.org/) is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Follow the steps below to deploy your MkDocs site to Layer0

## Create your MkDocs site

If you don't have an existing MkDocs site, you can create one by running:

```
pip install mkdocs
mkdocs new my-project
cd my-project
```

## Add Layer0

First, globally install the Layer0 CLI:

```
npm i -g @layer0/cli
```

Then, add Layer0 to your MkDocs site:

```
0 init
```

## Update your Layer0 Router

Paste the following into routes.js:

```js
import { Router } from '@layer0/core/router'

const ONE_MINUTE = 60
const FAR_FUTURE = 60 * 60 * 24 * 365 * 10

export default new Router()
  .match('/assets/:path*', ({ serveStatic, cache }) => {
    cache({
      browser: {
        maxAgeSeconds: FAR_FUTURE,
      },
      edge: {
        maxAgeSeconds: ONE_MINUTE,
        staleWhileRevalidateSeconds: FAR_FUTURE,
      },
    })
    serveStatic('site/assets/:path*')
  })
  .match('/:path*', ({ serveStatic, cache }) => {
    cache({
      browser: false,
      edge: {
        maxAgeSeconds: FAR_FUTURE,
      },
    })
    serveStatic('site/:path*')
  })
```

## Deploy to Layer0

To deploy your site to Layer0, run:

```
mkdocs build
0 deploy
```

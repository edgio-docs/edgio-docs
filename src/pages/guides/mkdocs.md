---
title: MkDocs
---

[MkDocs](https://www.mkdocs.org/) is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Follow the steps below to deploy your MkDocs site to Layer0

## Create your MkDocs site

If you don't have an existing MkDocs site, you can create one by running:

```bash
# https://www.mkdocs.org/getting-started

pip install mkdocs
mkdocs new my-project
cd my-project
```

## Add Layer0

Create a `package.json` at the root of your project with the following:
```json
{
  "name": "mkdocs",
  "version": "1.0.0",
  "scripts": {
    "build": "python3 -m mkdocs build",
    "server": "python3 -m mkdocs serve",
    "layer0:dev": "layer0 dev",
    "postinstall": "pip3 install mkdocs",
    "layer0:build": "npm run build && layer0 build",
    "layer0:deploy": "npm run build && layer0 deploy"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

```bash
# First, globally install the Layer0 CLI:
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli

# Then, add Layer0 to your MkDocs site:
0 init
```

## Update your Layer0 Router

Paste the following into routes.js:

```js
import { Router } from '@layer0/core'

const ONE_MINUTE = 60
const FAR_FUTURE = 60 * 60 * 24 * 365 * 10

const dynamicPaths = ['css', 'fonts', 'img', 'js', 'search']

const router = new Router()

dynamicPaths.forEach((i) => {
  router.match(`/${i}/:path*`, ({ serveStatic, cache }) => {
    cache({
      browser: {
        maxAgeSeconds: FAR_FUTURE,
      },
      edge: {
        maxAgeSeconds: ONE_MINUTE,
        staleWhileRevalidateSeconds: FAR_FUTURE,
      },
    })
    serveStatic(`site/${i}/:path*`)
  })
})

router.match('/:path*', ({ serveStatic, cache }) => {
  cache({
    browser: false,
    edge: {
      maxAgeSeconds: FAR_FUTURE,
    },
  })
  serveStatic('site/:path*')
})

export default router
```

## Deploy to Layer0

To deploy your site to Layer0, run:

```bash
# Create a production build of your mkdocs site
npm run build

# Deploy it to Layer0
0 deploy
```

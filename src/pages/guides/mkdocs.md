---
title: MkDocs
---

[MkDocs](https://www.mkdocs.org/) is a fast, simple and downright gorgeous static site generator that's geared towards building project documentation. Follow the steps below to deploy your MkDocs site to the {{ COMPANY_NAME }} {{ PRODUCT }} platform.

## Create your MkDocs site {/*create-your-mkdocs-site*/}

If you don't have an existing MkDocs site, you can create one by running:

```bash
# https://www.mkdocs.org/getting-started

pip install mkdocs
mkdocs new my-project
cd my-project
```

## Add {{ PRODUCT }} {/*add-appops*/}

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
# First, globally install the  {{ PRODUCT }} CLI:
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli

# Then, add  {{ PRODUCT }} to your MkDocs site:
{{ CLI_NAME }} init
```

## Update your  {{ PRODUCT }} Router {/*update-your-appops-router*/}

Paste the following into routes.js:

```js
import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core'

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

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
# Create a production build of your mkdocs site
npm run build

# Deploy it to the {{ PRODUCT_PLATFORM }}
{{ CLI_NAME }} deploy
```

---
title: Jekyll
---

[Jekyll](https://jekyllrb.com/) is a static site generator. It takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site's look and feel, URLs, the data displayed on the page, and more.

 ## Create your Jekyll site {/*create-your-jekyll-site*/}

If you don't have an existing Jekyll site, you can create one by running:

```bash
gem install bundler jekyll
jekyll new my-jekyll-site
cd my-jekyll-site
```

 ## Add {{ PRODUCT }} {/*add-appops*/}

```bash
# First, globally install the {{ PRODUCT }} CLI:
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
# Next, create a stub package.json:
npm init
# Then, add {{ PRODUCT }} to your Jekyll site:
{{ CLI_NAME }} init
```

 ## Update your {{ PRODUCT }} Router {/*update-your-appops-router*/}

Paste the following into `routes.js`:

```js
import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core'

const ONE_DAY = 60 * 60 * 24
const FAR_FUTURE = ONE_DAY * 365 * 10

export default new Router()
  .match('/assets/:path*', ({ serveStatic, cache }) => {
    cache({
      browser: {
        maxAgeSeconds: ONE_DAY,
      },
      edge: {
        maxAgeSeconds: ONE_DAY,
        staleWhileRevalidateSeconds: FAR_FUTURE,
      },
    })
    serveStatic('_site/assets/:path*')
  })
  .match('/:path*', ({ serveStatic, cache }) => {
    cache({
      browser: false,
      edge: {
        maxAgeSeconds: ONE_DAY,
        staleWhileRevalidateSeconds: FAR_FUTURE,
      },
    })
    serveStatic('_site/:path*')
  })
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
# Create a production build of your Jekyll site
bundle exec jekyll build

# Deploy it to {{ PRODUCT_PLATFORM }}
{{ CLI_NAME }} deploy
```

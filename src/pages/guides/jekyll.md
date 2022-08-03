---
title: Jekyll
---

[Jekyll](https://jekyllrb.com/) is a static site generator. It takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site's look and feel, URLs, the data displayed on the page, and more.

## Create your Jekyll site

If you don't have an existing Jekyll site, you can create one by running:

```bash
gem install bundler jekyll
jekyll new my-jekyll-site
cd my-jekyll-site
```

## Add Layer0

```bash
# First, globally install the Layer0 CLI:
npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
# Next, create a stub package.json:
npm init
# Then, add Layer0 to your Jekyll site:
0 init
```

## Update your Layer0 Router

Paste the following into `routes.js`:

```js
import { Router } from '@layer0/core'

const ONE_DAY = 60 * 60 * 24
const FAR_FUTURE = ONE_DAY * 365 * 10

export default new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  . noIndexPermalink()
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

## Deploy to Layer0

To deploy your site to Layer0, run:

```bash
# Create a production build of your Jekyll site
bundle exec jekyll build

# Deploy it to Layer0
0 deploy
```

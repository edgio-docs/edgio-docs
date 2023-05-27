---
title: Jekyll
---

[Jekyll](https://jekyllrb.com/) is a static site generator. It takes text written in your favorite markup language and uses layouts to create a static website. You can tweak the site's look and feel, URLs, the data displayed on the page, and more.

{{ PREREQ.md }}

## Create your Jekyll site {/*create-your-jekyll-site*/}

If you don't have an existing Jekyll site, you can create one by running:

```bash
gem install bundler jekyll
jekyll new my-jekyll-site
cd my-jekyll-site
```

## Add {{ PRODUCT }} {/*add*/}

```bash
# Next, create a stub package.json:
npm init

# Then, add {{ PRODUCT }} to your Jekyll site:
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

## Update your {{ PRODUCT }} Router {/*update-your-router*/}

Paste the following into `routes.js`:

```js
import { Router } from '{{ PACKAGE_NAME }}/core'

const ONE_DAY = 60 * 60 * 24
const FAR_FUTURE = ONE_DAY * 365 * 10

export default new Router()
  // Create serveStatic route for each file in the folder _site with a cache-control header of 's-maxage=315360000'
  .static('_site')
```

## Deploying {/*deploying*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
# Create a production build of your Jekyll site
bundle exec jekyll build

# Deploy it to {{ PRODUCT_PLATFORM }}
{{ FULL_CLI_NAME }} deploy
```

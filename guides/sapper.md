# Sapper

This guide shows you how to deploy [Sapper](https://sapper.svelte.dev/) apps on the Moovweb XDN

## Install Node.js and npm

__XDN only supports Node.js version 12 and higher__

If you do not have Node.js installed on your system, download and install it from official [Node.js downloads](https://nodejs.org/en/download/) page. Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

## Getting Started

If you don't already have a Sapper app, you can create one using the commands below:

```
# for Rollup
npx degit "sveltejs/sapper-template#rollup" my-app

# for webpack
npx degit "sveltejs/sapper-template#webpack" my-app

cd my-app
npm install
npm run dev & open http://localhost:3000
```

To prepare your Sapper app for deployment on the Moovweb XDN:

```
npm install -g @xdn/cli
xdn init
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `@xdn/core` package - Allows you to declare routes and deploy your application on the Moovweb XDN
- The `@xdn/sapper` package - Provides router middleware that automatically adds Sapper routes to the XDN router.
- The `@xdn/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- The `@xdn/svelte` package - Provides a `Prefetch` component for prefetching pages
- `xdn.config.js`
- `routes.js` - A default routes file that sends all requests to Sapper. Update this file to add caching or proxy some URLs to a different origin.

## Running Locally

To simulate your app within the XDN locally, run:

```
xdn run
```

To simulate edge caching locally, run:

```
xdn run --cache
```

To deploy your app to the XDN, run:

```
xdn deploy
```

See [deploying](deploying) for more information.

## Prefetching

Follow these steps to add prefetching to your app:

### Service Worker

Add the following to `src/service-worker.js`:

```js
import { timestamp, files, shell, routes } from '@sapper/service-worker'

/* begin: add this to src/service-worker.js */
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@xdn/prefetch/sw'

precacheAndRoute([])
new Prefetcher().route()
/* end: add this to src/service-worker.js */
```

### Prefetch Component

To prefetch data when links become visible in the viewport, wrap the link in the `Prefetch` component from `@xdn/svelte`

```html
<script>
  import { Prefetch } from '@xdn/svelte'
</script>

<Prefetch url="/blog.json">
  <a href="blog">Blog</a>
</Prefetch>
```

Note that the behavior of the `Prefetch` component is different from Sapper's built-in support for `<a rel="prefetch">` in two ways:

- `rel="prefetch"` only prefetches data when the user hovers over the link. The `Prefetch` component will prefetch data when the link becomes visible, or, if the `immediately` prop is present, as soon as the page loads.
- `Prefetch` will only prefetch from the XDN edge cache, which means that additional traffic due to prefetching will never reach your API servers.

See [Prefetching](/guides/prefetching) for more information.

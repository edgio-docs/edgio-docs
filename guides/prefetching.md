# Prefetching

The XDN allows you to speed up the user's browsing experience by prefetching pages and API calls that they are likely to need.

## Traffic Shielding

You might think that prefetching will put significant additional load on the infrastructure hosting your APIs. That's actually not the case! The Moovweb XDN only serves prefetch requests from the edge cache. It will never make a request to the origin if a prefetch request cannot be served from the edge cache, so your servers will never see an increased load.

## Service Worker

To enable prefetching, your site's service worker needs to use the `@xdn/prefetch` library's `Prefetcher` class.  If your site doesn't currently have a service worker, one can easily be created using Google's [Workbox](https://developers.google.com/web/tools/workbox)

Here's an example service worker based on Workbox:

```js
import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@xdn/prefetch/sw'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher().route()
```

## Window

Once you've created a service worker, code running in the browser window needs to register the service worker before prefetching can begin.  How you do this depends on the front-end framework that you use.

If you're not using a front-end framework, you can use the `install` function from `@xdn/prefetch` to install the service worker.  Here's an example:

```js
import install from '@xdn/prefetch/window/install'

install()
```

## Prefetching a URL

To prefetch a URL, call the `prefetch` function from `@xdn/prefetch/window`:

```js
import { prefetch } from '@xdn/prefetch/window'

prefetch('/some/url')
```

Prefetch requests are given the lowest priority. This ensures that they do not block more critical requests like API calls, images, scripts, and navigation.

## React

The `@xdn/react` package provides a `Prefetch` component that you can wrap around any link to prefetch the link when it becomes visible in the viewport:

```js
import { Prefetch } from '@xdn/react'

function MyComponent() {
  return (
    <Prefetch url="/api/for/some/page">
      <a href="/some/page">Some Page</a>
    </Prefetch>
  )
}
```

By default, `Prefetch` will fetch and cache the URL in the link's `href` attribute. If you have a single page app, you most likely want to prefetch an API call for the page rather than the page's HTML.  The example above shows you how to set the `url` property to control which URL is prefetched.

If you're using Next.js, the `Prefetch` component assumes you're using `getServerSideProps` and will prefetch the corresponding URL unless your specify a `url` prop. The `Prefetch` component should be placed between Next's `<Link>` and the `<a>` element:

```js
import Link from 'next/link'
import { Prefetch } from '@xdn/react'

export default function ProductListingPage() {
  return (
    <Link as="/p/1" href="/p/[productId]">
      <Prefetch>
        <a>Some Page</a>
      </Prefetch>
    </Link>
  )
}

export function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
```

If you need to prefetch a different url, you can do so using the `url` prop:

```js
<Link as="/p/1" href="/p/[productId]">
  <Prefetch url="/some/url/to/prefetch">
    <a>Some Page</a>
  </Prefetch>
</Link>
```

## Vue

The `@xdn/vue` package provides a `Prefetch` component that you can wrap around any link to prefetch the link when it becomes visible in the viewport:

```jsx
<script>
  import Prefetch from '@xdn/vue/Prefetch'
</script>

<template>
  <Prefetch v-bind:url="/api/for/some/page">
    <router-link v-bind:to="/some/page">Some page</router-link>
  </Prefetch>
</template>
```

By default `Prefetch` will fetch and cache the URL in the link's `to` attribute (for both `router-link` and `nuxt-link`). If you have a single page app, you most likely want to prefetch an API call for the page rather than the page's HTML.  The example above shows you how to set the `url` property to control which URL is prefetched.

## Using the XDN for Prefetching Only

If you have an existing site already in production, it is possible to prefetch from the XDN while still serving the from the existing CDN.

To achieve this:

1. Create a new XDN app using `npm create xdn-app`.
2. Use your site's hostname as the origin site.
3. Once the app is created, configure your routes file to cache the URLs you want to prefetch.
4. Deploy your XDN app.
5. Optionally give it a custom domain by creating a production environment, assigning a custom domain, and uploading an SSL certificate.
6. In your service-worker source, use the `cacheHost` option when configuring the `Prefetcher`. For example:

```js
import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher } from '@xdn/prefetch/sw'

skipWaiting()
clientsClaim()

new Prefetcher({
  cacheHost: 'your.xdn.domain.here.com', // specify the domain name for your XDN app here
})
```

7. Serve the service worker from your site's origin domain. This is critical because service-worker's can only intercept fetch calls from apps served from the same origin as the service worker.
8. Add a script to your app's source to install the service worker on each page. Here's an example:

```js
import install from '@xdn/prefetch/window/install'
import prefetch from '@xdn/prefetch/window/prefetch'

document.addEventListener('DOMContentLoaded', function () {
  install({ 
    // Since there is no direct traffic to the XDN, the cache will only be populated from prefetch 
    // requests, so we need to serve prefetch requests even when they are not cached.
    includeCacheMisses: true, 

    // You can change this if you need to serve the service worker on a different path
    serviceWorkerPath: '/service-worker.js',

    // If you don't have links specified with a `<a>` tags with `href` attributes, you can also
    // specify watchers to prefetch when other elements are added to the page:
    watch: [{
      selector: 'div.product-tile',
      callback: el => {
        const productId = el.getAttribute('data-product-id')
        const catId = document.getElementById('cat-listing').getAttribute('data-category-id')
        prefetch(`/api/${catId}/${productId}`, 'fetch')
      }
    }]
  }) 
})
```

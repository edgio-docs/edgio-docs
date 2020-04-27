# Prefetching

The XDN allows you to speed up the user's browsing experience by prefetching pages and API calls that they are likely to need.

## Traffic Shielding

You might think that prefetching will put siginifcant additional load on the infrastructure hosting your APIs. That's actually not the case! The Moovweb XDN only serves prefetch requests from the edge cache. It will never make a request to the origin if a prefetch request cannot be served from the edge cache, so your servers will never see an increased load.

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

Once you've created a service worker, code running in the browser window needs to register the service worker before pretching can begin.  How you do this depends on the front-end framework that you use.

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

By default `Prefetch` will fetch and cache the URL in the link's `href` attribute. If you have a single page app, you most likely want to prefetch an API call for the page rather than the page's HTML.  The example above shows you how to set the `url` property to control which URL is prefetched.

If you're using Next.js, the `Prefetch` component assumes you're using `getServerSideProps` and will prefetch the corresponding URL unless your specify a `url` prop. The `Prefetch` component should be placed between Next's `<Link>` and the `<a>` element:

```js
import Link from 'next/link'
import { Prefetch } from '@xdn/react'

export default function ProductListingPage() {
  return (
    <Link as="/p/1" href="/p/[productId]">
      <Prefetch>
        {/* Without a url prop, this will prefetch the URL for getServerSideProps*/}
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


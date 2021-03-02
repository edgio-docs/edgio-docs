# Core Web Vitals

This guide shows you how to track your website's [Core Web Vitals](https://web.dev/vitals/) in real time using the XDN.

## What are Core Web Vitals?

As of May 2021, Google will begin ranking websites based on a set of performance metrics called [Core Web Vitals](https://web.dev/vitals/). Websites with
good Core Web Vitals will be placed higher in search results, while those with poor Core Web Vitals will be placed lower. Core Web Vitals can
be tracked via [Google Search Console](https://search.google.com/search-console/welcome), but the experience presents a number of challenges:

- It can take weeks to see the affect that changes to your site have on Core Web Vitals in Google Search Console.
- Google Search Console provides little help with diagnosing the cause or severity of Core Web Vitals issues.

## Why use the XDN to track Core Web Vitals?

Instead of relying solely on Google Search Console, we recommend tracking Core Web Vitals using the XDN so that you can:

- See how changes to your site impact Core Web Vitals in real time
- Correlate web vitals to your application's routes
- Analyze score across a number of dimensions such as country, device, and connection type
- Identify which pages are most negatively impacting your search ranking.

## Installation

In order to start tracking Core Web Vitals on the Moovweb XDN, you need add the `@xdn/rum` client library to your application. There are a number of ways to do this:

### Script Tag

To add Core Web Vitals tracking via a script tag, add the following to each page in your application:

```html
<script defer>
  function initXdnRum() {
    new XDN.Metrics({
      token: 'your-token-here', // get this from https://moovweb.app
    }).collect()
  }
</script>
<script src="https://rum.moovweb.app/latest.js" defer onload="initXdnRum()"></script>
```

### Google Tag Manager

```html
<script>
  function initXDNMetrics() {
    new XDN.Metrics({
      token: 'your-token-here', // get this from https://moovweb.app
    }).collect()
  }
  var rumScriptTag = document.createElement('script')
  rumScriptTag.src = 'https://rum.moovweb.app/latest.js'
  rumScriptTag.setAttribute('defer', '')
  rumScriptTag.type = 'text/javascript'
  rumScriptTag.onload = initXDNMetrics
  document.body.appendChild(rumScriptTag)
</script>
```

### NPM or Yarn

To install the Core Web Vitals library using npm, run:

```
npm install --save @xdn/rum
```

Or, using yarn:

```
yarn add @xdn/rum
```

Then, add the following to your application's browser bundle:

```js
import { Metrics } from '@xdn/rum'

new Metrics({
  token: 'your-token-here', // get this from https://moovweb.app
}).collect()
```

## Tying URLs to Page Templates

You can tie URLs to pages templates by providing an optional `router` parameter to `Metrics`.

When installing @xdn/rum using a script tag, use:

```js
new XDN.Metrics({
  // get this from https://moovweb.app
  token: 'your-token-here',

  // assign a page label for each route:
  router: new XDN.Router()
    .match('/', ({ setPageLabel }) => setPageLabel('home'))
    .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
    .match('/c/:id', ({ setPageLabel }) => setPageLabel('category')),
}).collect()
```

When installing @xdn/rum via NPM or Yarn use:

```js
import { Router } from '@xdn/core/router'
import { Metrics } from '@xdn/rum'

new Metrics({
  // get this from https://moovweb.app
  token: 'your-token-here',

  // assign a page label for each route:
  router: new Router()
    .match('/', ({ setPageLabel }) => setPageLabel('home'))
    .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
    .match('/c/:id', ({ setPageLabel }) => setPageLabel('category')),
}).collect()
```

The router supports the same pattern syntax as Express. [More information on routing syntax.](/guides/routing#section_route_pattern_syntax)

## Tracking Additional Data

Additionally, you can tie the following data to Core Web Vitals:

```js
new XDN.Metrics({
  // Rather than providing a router, you can also define the page label for each page explicitly.
  // Use this option if it is more convenient to add the script tag to each page template individually
  // rather than adding it to the main application template.
  pageLabel: 'home',

  // The version of your application that is running.
  appVersion: 'v1.0.0',

  // Whether or not the page was served from the CDN cache, if this is known.
  cacheHit: true | false,

  // The country code in which the browser is running. This is often provided by CDNs
  // as a request header that can be embedded in your script tab by your application code.
  country: 'US',
})
```

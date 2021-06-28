# Core Web Vitals

This guide shows you how to track your website's [Core Web Vitals](https://web.dev/vitals/) on {{ PRODUCT_NAME }} in real time using real user monitoring (RUM).

![video](https://youtu.be/XNsCMaHt3DI)

## What are Core Web Vitals?

As of [May 2021](https://developers.google.com/search/blog/2020/11/timing-for-page-experience), Google will begin ranking websites based on a
set of performance metrics called [Core Web Vitals](https://web.dev/vitals/). This change effectively makes site performance an SEO ranking factor.
Websites with good Core Web Vitals may be placed higher in search results, while those with poor Core Web Vitals may be placed lower.

Unlike Lighthouse performance scores which are based on synthetic tests, Core Web Vitals scores are based on measurements from real users of Chrome as reported in the [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report). Core Web Vitals can
be tracked via [Google Search Console](https://search.google.com/search-console/welcome) and [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). Optimizing Core Web Vitals using the official tools presents a number of challenges:

- It can take days to weeks to see the affect that changes to your site have on Core Web Vitals.
- It's hard to diagnose Core Web Vitals by page type or URL.
- It's impossible to A/B test the impact of site optimizations on Core Web Vitals. Note that to effectively A/B test performance optimizations you need both a RUM measurement tool and split testing at the edge, both of which {{ PRODUCT_NAME }} provides.

## Why use {{ PRODUCT_NAME }} to track Core Web Vitals?

Instead of relying solely on Google Search Console, we recommend tracking Core Web Vitals using {{ PRODUCT_NAME }} so that you can:

- See how changes to your site impact Core Web Vitals in real time
- Correlate web vitals to your application's routes
- Analyze score across a number of dimensions such as country, device, and connection type
- Identify which pages are most negatively impacting your search ranking.
- Use {{ PRODUCT_NAME }}'s [Edge based split testing](split_testing) to A/B test the impact of performance optimizations on Core Web Vitals.

## Installation

In order to start tracking Core Web Vitals on {{ PRODUCT_NAME }}, you need add the `{{ PACKAGE_NAME }}/rum` client library to your application. There are a number of ways to do this:

### Script Tag

To add Core Web Vitals tracking via a script tag, add the following to each page in your application:

```html
<script defer>
  function initRum() {
    new {{ PRODUCT_NAME }}.Metrics({
      token: 'your-token-here', // get this from {{ APP_URL }}
    }).collect()
  }
</script>
<script src="https://rum.{{ DOMAIN }}/latest.js" defer onload="initRum()"></script>
```

### Google Tag Manager

```html
<script>
  function initMetrics() {
    new {{ PRODUCT_NAME }}.Metrics({
      token: 'your-token-here', // get this from {{ APP_URL }}
    }).collect()
  }
  var rumScriptTag = document.createElement('script')
  rumScriptTag.src = 'https://rum.{{ DOMAIN }}/latest.js'
  rumScriptTag.setAttribute('defer', '')
  rumScriptTag.type = 'text/javascript'
  rumScriptTag.onload = initMetrics
  document.body.appendChild(rumScriptTag)
</script>
```

### NPM or Yarn

To install the Core Web Vitals library using npm, run:

```
npm install --save {{ PACKAGE_NAME }}/rum
```

Or, using yarn:

```
yarn add {{ PACKAGE_NAME }}/rum
```

Then, add the following to your application's browser bundle:

```js
import { Metrics } from '{{ PACKAGE_NAME }}/rum'

new Metrics({
  token: 'your-token-here', // get this from {{ APP_URL }}
}).collect()
```

## Tying URLs to Page Templates

You can tie URLs to pages templates by providing an optional `router` parameter to `Metrics`.

When installing {{ PACKAGE_NAME }}/rum using a script tag, use:

```js
new {{ PRODUCT_NAME }}.Metrics({
  // get this from {{ APP_URL }}
  token: 'your-token-here',

  // assign a page label for each route:
  router: new {{ PRODUCT_NAME }}.Router()
    .match('/', ({ setPageLabel }) => setPageLabel('home'))
    .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
    .match('/c/:id', ({ setPageLabel }) => setPageLabel('category')),
}).collect()
```

When installing {{ PACKAGE_NAME }}/rum via NPM or Yarn use:

```js
import { Router } from '{{ PACKAGE_NAME }}/rum/Router'
import { Metrics } from '{{ PACKAGE_NAME }}/rum'

new Metrics({
  // get this from {{ APP_URL }}
  token: 'your-token-here',

  // assign a page label for each route:
  router: new Router()
    .match('/', ({ setPageLabel }) => setPageLabel('home'))
    .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
    .match('/c/:id', ({ setPageLabel }) => setPageLabel('category')),
}).collect()
```

The router supports the same pattern syntax as Express. [More information on routing syntax.](/guides/routing#section_route_pattern_syntax)

For non single page applications (e.g. traditional "multi-page apps"), you can also explicitly set the page label by passing a `pageLabel` property during initialization. An example is shown below where the `pageLabel` is pulled from `document.title`:

```js
<script>
  function initMetrics() {
    new {{ PRODUCT_NAME }}.Metrics({
      token: 'your-token-here',
      pageLabel: document.title ? document.title : "(No title)",
    }).collect();
  }
  var rumScriptTag = document.createElement('script');
  rumScriptTag.src = "https://rum.{{ DOMAIN }}/latest.js";
  rumScriptTag.setAttribute("defer", "");
  rumScriptTag.type = "text/javascript";
  rumScriptTag.onload = initMetrics;
  document.body.appendChild(rumScriptTag);
</script>
```

## Tracking Additional Data

Additionally, you can tie the following data to Core Web Vitals:

```js
new {{ PRODUCT_NAME }}.Metrics({
  // Rather than providing a router, you can also define the page label for each page explicitly.
  // Use this option if it is more convenient to add the script tag to each page template individually
  // rather than adding it to the main application template.
  pageLabel: 'home',

  // When running a split test, use this field to specify which variant is active.
  // This is automatically set for sites that are deployed on {{ PRODUCT_NAME }}.
  splitTestVariant: 'name-of-variant',

  // The version of your application that is running.
  appVersion: 'v1.0.0',

  // Whether or not the page was served from the CDN cache, if this is known.
  // This is automatically set for sites that are deployed on {{ PRODUCT_NAME }}.
  cacheHit: true | false,

  // The country code in which the browser is running. This is often provided by CDNs
  // as a request header that can be embedded in your script tab by your application code.
  // This is automatically set for sites that are deployed on {{ PRODUCT_NAME }}.
  country: 'US',
})
```

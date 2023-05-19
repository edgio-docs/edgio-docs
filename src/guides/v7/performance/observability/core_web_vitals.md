---
title: Core Web Vitals 
---

This guide shows you how to track your website's [Core Web Vitals](https://web.dev/vitals/) on {{ PRODUCT_NAME }} in real time using real user monitoring (RUM).

<Callout type="info">

  {{ PRODUCT }} tracks Core Web Vitals for Chromium-based browsers and Firefox.

</Callout>

<Video src="https://player.vimeo.com/video/691615391"/>

## What are Core Web Vitals? {/*what-are-core-web-vitals*/}

In [May of 2021](https://developers.google.com/search/blog/2020/11/timing-for-page-experience), Google began ranking websites based on a
set of performance metrics called [Core Web Vitals](https://web.dev/vitals/). This change effectively made site performance an SEO ranking factor.
Websites with good Core Web Vitals may be placed higher in search results, while those with poor Core Web Vitals may be placed lower.

Unlike Lighthouse performance scores which are based on synthetic tests, Core Web Vitals scores are based on measurements from real users of Chrome as reported in the [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report). Core Web Vitals can
be tracked via [Google Search Console](https://search.google.com/search-console/welcome) and [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). Optimizing Core Web Vitals using the official tools presents a number of challenges:

- It can take days to weeks to see the effect of changes to your site on Core Web Vitals.
- It's hard to diagnose Core Web Vitals by page type or URL.
<Condition version="<=6">
- It's impossible to A/B test the impact of site optimizations on Core Web Vitals. Note that to effectively A/B test performance optimizations you need both a RUM measurement tool and split testing at the edge, both of which {{ PRODUCT_NAME }} provides. 
</Condition>
<a id="why-use-layer0-to-track-core-web-vitals"></a>

## Why use {{ PRODUCT_NAME }} to track Core Web Vitals? {/*why-use-to-track-core-web-vitals*/}

The benefits of using {{ PRODUCT }} instead of Google Search Console to track Core Web Vitals are that it allows you to:

- See how changes to your site impact Core Web Vitals in real time
- Correlate web vitals to your application's routes
- Analyze score across a number of dimensions such as country, device, and connection type
- Identify which pages are most negatively impacting your search ranking.
<Condition version="<=6">
- Use {{ PRODUCT_NAME }}'s [Edge-based A/B testing](/guides/performance/traffic_splitting/a_b_testing) to A/B test the impact of performance optimizations on Core Web Vitals.
</Condition>

## Installing Real User Monitoring (RUM) {/*installation*/}

Tracking Core Web Vitals on {{ PRODUCT_NAME }} requires adding the `{{ PACKAGE_NAME }}/rum` client library to your application. The {{ PORTAL_LINK }} provides information on how to install this library using a script tag, Google tag manager, npm, and yarn. 

**To view {{ PACKAGE_NAME }}/rum installation instructions**

1.  Load the **Core Web Vitals** page.
    {{ ENV_NAV }} **Core Web Vitals**.

2.  Click on the tab for the desired installation method. 

    ![RUM Package Installation](/images/v7/performance/cwv-configuration-guide.png?width=450)

    <Callout type="info">

      The {{ PORTAL }} provides installation instructions that contain a token that is specific to your property. 

    </Callout>

### Script Tag and Google Tag Manager {/*google-tag-manager*/}

Add Core Web Vitals tracking by adding the following code to each page in your application:

<SnippetGroup>

```Script tabLabel="Script Tag"
<script defer>
  function init{{ PRODUCT }}Rum() {
    new {{ RUM_NS }}.Metrics({
      token: '<TOKEN>' // Get your token from the {{ PORTAL }}
    }).collect()
  }
</script>
<script src="https://{{ RUM_DOMAIN }}/latest.js" defer onload="init{{ PRODUCT }}Rum()"></script>
```

```Script tabLabel="Google Tag Manager"
<script>
  function init{{ PRODUCT }}Rum() {
    new {{ RUM_NS }}.Metrics({
      token: '<TOKEN>' // Get your token from the {{ PORTAL }}
    }).collect()
  }
  var rumScriptTag = document.createElement('script')
  rumScriptTag.src = 'https://{{ RUM_DOMAIN }}/latest.js'
  rumScriptTag.setAttribute('defer', '')
  rumScriptTag.type = 'text/javascript'
  rumScriptTag.onload = init{{ PRODUCT }}Rum
  document.body.appendChild(rumScriptTag)
</script>
```

</SnippetGroup>

### NPM or Yarn {/*npm-or-yarn*/}

Install the Core Web Vitals library using npm or yarn by running the following command:

<SnippetGroup>

```bash tabLabel="npm"
npm install --save {{ PACKAGE_NAME }}/rum
```

```bash tabLabel="Yarn"
yarn add {{ PACKAGE_NAME }}/rum
```

</SnippetGroup>

Add the following code to your application's browser bundle:

```js
import { Metrics } from '@edgio/rum'

new Metrics({
  token: '<TOKEN>' // Get your token from the {{ PORTAL }}
}).collect()
```

## Tie URLs to Page Templates {/*tie-urls-to-page-templates*/}

Tie URLs to page templates by passing an optional `router` parameter to `Metrics`.

Define page labels by adding a route for each page template:

<SnippetGroup>

```bash tabLabel="Script Tag"
<script defer>
  function init{{ PRODUCT }}Rum() {
    new {{ RUM_NS }}.Metrics({
      token: '<TOKEN>', // Get your token from the {{ PORTAL }}

      // assign a page label for each route
      router: new {{ PRODUCT }}.Router()
        .match('/', ({ setPageLabel }) => setPageLabel('home'))
        .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
        .match('/c/:id', ({ setPageLabel }) => setPageLabel('category'))
    }).collect()
  }
</script>
<script src="https://{{ RUM_DOMAIN }}/latest.js" defer onload="init{{ PRODUCT }}Rum()"></script>
```

```bash tabLabel="Google Tag Manager"
<script>
  function init{{ PRODUCT }}Rum() {
    new {{ RUM_NS }}.Metrics({
      token: '<TOKEN>', // Get your token from the {{ PORTAL }}

      // assign a page label for each route
      router: new {{ PRODUCT }}.Router()
        .match('/', ({ setPageLabel }) => setPageLabel('home'))
        .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
        .match('/c/:id', ({ setPageLabel }) => setPageLabel('category'))
    }).collect()
  }
  var rumScriptTag = document.createElement('script')
  rumScriptTag.src = 'https://{{ RUM_DOMAIN }}/latest.js'
  rumScriptTag.setAttribute('defer', '')
  rumScriptTag.type = 'text/javascript'
  rumScriptTag.onload = init{{ PRODUCT }}Rum
  document.body.appendChild(rumScriptTag)
</script>
```

```bash tabLabel="npm"
import Router from '@edgio/rum/Router'
import { Metrics } from '@edgio/rum'

new Metrics({
  token: '<TOKEN>', // Get your token from the {{ PORTAL }}

  // assign a page label for each route
  router: new Router()
        .match('/', ({ setPageLabel }) => setPageLabel('home'))
        .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
        .match('/c/:id', ({ setPageLabel }) => setPageLabel('category'))
}).collect()
```

```bash tabLabel="Yarn"
import Router from '@edgio/rum/Router'
import { Metrics } from '@edgio/rum'

new Metrics({
  token: '<TOKEN>', // Get your token from the {{ PORTAL }}

   // assign a page label for each route
  router: new Router()
        .match('/', ({ setPageLabel }) => setPageLabel('home'))
        .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
        .match('/c/:id', ({ setPageLabel }) => setPageLabel('category'))
}).collect()
```

</SnippetGroup>

[Learn more about route syntax.](/guides/performance/cdn_as_code#route-pattern-syntax)

For non single page applications (e.g. traditional "multi-page apps"), you can also explicitly set the page label by passing a `pageLabel` property during initialization. An example is shown below where the `pageLabel` is pulled from `document.title`:

```js
<script>
  function init{{ PRODUCT }}Rum() {
    new {{ RUM_NS }}.Metrics({
      token: '<TOKEN>', // Get your token from the {{ PORTAL }}
      pageLabel: document.title ? document.title : "(No title)",
    }).collect()
  }
  var rumScriptTag = document.createElement('script')
  rumScriptTag.src = 'https://{{ RUM_DOMAIN }}/latest.js'
  rumScriptTag.setAttribute('defer', '')
  rumScriptTag.type = 'text/javascript'
  rumScriptTag.onload = init{{ PRODUCT }}Rum
  document.body.appendChild(rumScriptTag)
</script>
```

## Track Additional Data {/*track-additional-data*/}

You can tie the following data to Core Web Vitals:

```js
new {{ RUM_NS }}.Metrics({
  // Rather than providing a router, you can also define the page label for each page explicitly.
  // Use this option if it is more convenient to add the script tag to each page template individually
  // rather than adding it to the main application template.
  pageLabel: 'home',

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

<!--
  // When running a split test, use this field to specify which variant is active.
  // This is automatically set for sites that are deployed on {{ PRODUCT_NAME }}.
  splitTestVariant: 'name-of-variant',

## Custom cache TTL {/*custom-cache-ttl*/}

Information about routes is fetched from `/__edgio__/cache-manifest.js` file and then cached in `localStorage`.
The default expiration time is set to 1 hour and it's possible to change it by providing `cacheManifestTTL` option.

```js
new Metrics({
      token: 'your-token-here',
      cacheManifestTTL: 300 // 5 minutes
}).collect()
```
-->

---
title: Real User Monitoring (RUM)
---

Our real user monitoring (RUM) library allows real-time tracking of your website's [Core Web Vitals](https://web.dev/vitals/) for Chromium-based browsers and Firefox.

<Video src="https://player.vimeo.com/video/691615391" />

## What are Core Web Vitals? {/* what-are-core-web-vitals */}

In [May of 2021](https://developers.google.com/search/blog/2020/11/timing-for-page-experience), Google began ranking websites based on a
set of performance metrics called [Core Web Vitals](https://web.dev/vitals/). This change effectively made site performance an SEO ranking factor.
Websites with good Core Web Vitals may be placed higher in search results, while those with poor Core Web Vitals may be placed lower.

Unlike Lighthouse performance scores which are based on synthetic tests, Core Web Vitals scores are based on measurements from real users of Chrome as reported in the [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report). Core Web Vitals can
be tracked via [Google Search Console](https://search.google.com/search-console/welcome) and [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). Optimizing Core Web Vitals using the official tools presents a number of challenges:

- It can take days to weeks to see the effect of changes to your site on Core Web Vitals.
- It's hard to diagnose Core Web Vitals by page type or URL.

<a id="why-use-layer0-to-track-core-web-vitals"></a>

## Why use {{ PRODUCT }} to track Core Web Vitals? {/* why-use-to-track-core-web-vitals */}

The benefits of using {{ PRODUCT }} instead of Google Search Console to track Core Web Vitals are that it allows you to:

- See how changes to your site impact Core Web Vitals in real time
- Correlate web vitals to your application's routes
- Analyze score across a number of dimensions such as country, device, and connection type
- Identify which pages are most negatively impacting your search ranking.

## Installing Real User Monitoring (RUM) {/* installation */}

Tracking Core Web Vitals on {{ PRODUCT }} requires adding the `{{ PACKAGE_NAME }}/rum` client library to your application. The {{ PORTAL_LINK }} provides information on how to install this library using an edge function, a script tag, Google tag manager, npm, and yarn.

**To view {{ PACKAGE_NAME }}/rum installation instructions**

1.  Load the **Core Web Vitals** page.
    {{ ENV_NAV }} **Core Web Vitals**.

2.  Click on the tab for the desired installation method.

    ![RUM Package Installation](/images/v7/performance/cwv-configuration-guide.png?width=450)

    <Callout type="info">

    The {{ PORTAL }} provides installation instructions that contain a token that is specific to your property.

    </Callout>

### Edge Functions {/*edge-functions*/}

An edge function can automatically inject Core Web Vitals tracking to all of your web pages. The method for generating this edge function varies according to whether you are using CDN-as-code or the {{ PORTAL }} to deploy changes.

**{{ PORTAL }}: To inject Core Web Vitals tracking within your requests**

1.  Click **Create Edge Function** from the **Edge Function** tab of the **Real User Monitoring** page.

    {{ PRODUCT }} will automatically generate an edge function that adds Core Web Vitals tracking to a request and a rule that invokes that edge function. 

2.  Review your rules.
3.  Deploy your changes to this environment.


**CDN-as-Code: To inject Core Web Vitals tracking within your requests**

1.  In the {{ PRODUCT }} router, use the `edge_function` feature to specify the path to the edge function that will add Core Web Vitals tracking.

    ```js filename="routes.js"
    // This file was added by edgio init.
    // You should commit this file to source control.
    import {Router, edgioRoutes} from '@edgio/core';

    export default new Router()
      // Built-in Edgio routes
      .use(edgioRoutes)

      // Specifies the edge function for all paths. Modify the path as needed.
      .match({}, {
        edge_function: './edge-functions/main.js',
      });
    ```

2.  Add the following edge function:

    ```js filename="edge-functions/main.js"
    export async function handleHttpRequest(request, context) {
      const originResponse = await fetch(request.url, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        edgio: {
          origin: context.requestVars.matched_origin_name
        }
      })

      // Return origin response if not HTML
      if(!originResponse.headers.get("content-type").startsWith('text/html')){
        return originResponse;
      }

      let html = await originResponse.text()
      html = html.replace(
        '</body>', `
          <script defer>
            function initEdgioRum() {
              new Edgio.Metrics({
                token: '<TOKEN>'
              }).collect()
            }
          </script>
          <script src="https://rum.edgio.net/latest.js" defer onload="initEdgioRum()"></script>
        </body>`
      )
      return new Response(html, originResponse)
    }
    ```

3.  Replace `<TOKEN>` with your RUM token.

    You can find this token on the **Script tag** tab. 

    `token: 'ab1234c7-fe39-4a0e-8b3c-1ddf837a5c90'`

4.  Optional. If you are also injecting Predictive Prefetching, then you should insert a script tag that installs it as shown below.

    ```js filename="edge-functions/main.js"
    ...
      html = html.replace(
        '</body>', `
          <script defer>
            function initEdgioRum() {
              new Edgio.Metrics({
                token: '<TOKEN>'
              }).collect()
            }
          </script>
          <script src="https://rum.edgio.net/latest.js" defer onload="initEdgioRum()"></script>
          <script src="/__edgio__/prefetch/install.js" defer></script>
        </body>`
      )
      return new Response(html, originResponse)
    }
    ```
    
    <Info>
    
    [Predictive Prefetching also requires a rule](/applications/performance/prefetching) that applies the [Set Max Age (max_age)](/applications/performance/rules/features#set-max-age) and [Set Service Worker Max Age (service_worker_max_age)](/applications/performance/rules/features#set-service-worker-max-age) features to the pages that will be prefetched. 

    </Info>


5.  Deploy your changes to this environment by running the following command from your property’s root directory:

    ```bash
    {{ CLI_CMD(deploy) }}
    ```

### Script Tag and Google Tag Manager {/* google-tag-manager */}

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

### NPM or Yarn {/* npm-or-yarn */}

Install the Core Web Vitals library by running the following npm or yarn command:

<SnippetGroup>

```bash tabLabel="npm"
npm install --save {{ PACKAGE_NAME }}/rum
```

```bash tabLabel="Yarn 1 (Classic)"
yarn add {{ PACKAGE_NAME }}/rum
```

</SnippetGroup>

Add the following code to your application's browser bundle:

```js
import {Metrics} from '@edgio/rum';

new Metrics({
  token: '<TOKEN>', // Get your token from the {{ PORTAL }}
}).collect();
```

## Tie URLs to Page Templates {/* tie-urls-to-page-templates */}

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

```bash tabLabel="Yarn 1 (Classic)"
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

[Learn more about route syntax.](/applications/performance/cdn_as_code#route-pattern-syntax)

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

## Track Additional Data {/* track-additional-data */}

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
  // This is automatically set for sites that are deployed on {{ PRODUCT }}.
  cacheHit: true | false,

  // The country code in which the browser is running. This is often provided by CDNs
  // as a request header that can be embedded in your script tab by your application code.
  // This is automatically set for sites that are deployed on {{ PRODUCT }}.
  country: 'US',
})
```

<!--
  // When running a split test, use this field to specify which variant is active.
  // This is automatically set for sites that are deployed on {{ PRODUCT }}.
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

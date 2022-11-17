---
title: Getting Started with Performance
---

Deploying your web application behind {{ PRODUCT }} is the fastest and easiest way to start seeing the performance benefits made possible by the {{ PRODUCT_EDGE }} network. As illustrated below, requests for your site will pass through {{ PRODUCT }}'s globally distributed edge network and then to your origin server.
![traffic](/images/starter/traffic.png)

<Callout type="info">

  Serving production traffic over {{ PRODUCT }} requires updating your site's DNS to point to our service. 

  [Learn more.](/guides/production)

</Callout>

Learn how to use CDN-as-code to:
-   Define routes.
-   Set up edge caching.

## Prerequisites {/*prerequisites*/}

Before proceeding, you will need to create and deploy a property to {{ PRODUCT }}.

[Learn more.](getting_started)

## Project Files {/*project-structure*/}

Upon initializing a property (`{{ FULL_CLI_NAME }} init`), {{ PRODUCT }} creates the following files:

- `routes.js`: Defines the set of routes that determine will be cached, prefetched, passed through without modification, or served as static content.
- `{{ CONFIG_FILE }}`: Defines settings through which you may fine-tune your project.

## Configure Caching {/*configure-caching*/}

Set up caching by defining routes within your property's `routes.js` file. The following sample configuration proxies and caches all requests whose relative path matches the pattern defined using `.match(...)`. In this case, this relative path must start with `/api/`. The `.fallback(...)` handler takes all unmatched requests and also proxies them to the `origin` backend. This backend is defined within the [`{{ CONFIG_FILE }}`](edgio_config) file.

```js filename="./routes.js"
import { Router } from '{{ PACKAGE_NAME }}/core/router'

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR

export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  .match('/api/:path*', ({ proxy, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: ONE_DAY,
        staleWhileRevalidateSeconds: ONE_HOUR,
      },
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: ONE_DAY,
      },
    })
    proxy('origin')
  })

  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))
```

#### Cache Constants {/*cache-constants*/}
Cache constants in the `routes.js` have been abstracted out to enable reuse across different routes. You can also add additional constants such as year.

```js filename="./routes.js"
import { Router } from '{{ PACKAGE_NAME }}/core/router'

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY
// ...
```

Learn more about:
-   [Routing](routing)
-   [Caching](caching)
-   [Predictive Prefetching](prefetching)

## Deploy Locally {/*deploy-locally*/}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by allowing you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ FULL_CLI_NAME }} dev`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

## Deploy to {{ PRODUCT }} {/*deploy-to*/}

Evaluate site performance and QA functionality by deploying your property to {{ PRODUCT }}. Run the following command from your property's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Assess performance and caching behavior from the {{ PORTAL }}. Fine-tune your configuration by adding routes and then redeploying your property. 

## Example {/*example*/}

<ExampleButtons
  title="Web CDN"
  siteUrl="https://layer0-docs-cdn-starter-template-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-cdn-example" 
  deployFromRepo />

## Issues? {/*issues*/}

If you have any issues during this process, check our [forums]({{ FORUM_URL }}) for assistance.
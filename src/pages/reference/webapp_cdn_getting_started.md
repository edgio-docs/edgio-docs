---
title: WebApp CDN
---

<Intro>

Deploying your web application behind Layer0 is the fastest and easiest way to start seeing the performance benefits made possible by the Layer0 edge network. In this guide we'll show you how to:

</Intro>

- Create a new Layer0 project
- Configure edge caching using EdgeJS
- Deploy your site

If any point, you want a more [detailed guide](/guides/traditional_sites), we've got that too.

## Example {/*example*/}

[Try the WebApp CDN Example Site](https://layer0-docs-cdn-starter-template-default.layer0-limelight.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-cdn-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-cdn-example)

## Network Diagram {/*network-diagram*/}

As shown below, PRODUCT_NAMEbecomes the main CDN for your site:

![traffic](/images/starter/traffic.svg)

Requests for your site will now pass through PRODUCT_NAME }}'s globally distributed edge network and then to your origin server.

A full production deployment requires changing your site's DNS to allow requests to come to Layer0 first. View our [production guide](/guides/production) for that process.

## Create an Account {/*create-an-account*/}

If you do not have an account yet, visit [PRODUCT_NAME }}](APP_URL }}/signup) to create one.

SYSTEM_REQUIREMENTS

## Create a New Layer0 Project {/*new-project*/}

```bash
npm i -g PACKAGE_NAME }}/cli # yarn global add PACKAGE_NAME }}/cli
```

Create your project by running:

```bash
npx @layer0/cli@latest init
```

### Project Structure {/*project-structure*/}

In the `src` folder, there are the following files:

- `service-worker.ts`: prefetches content and stores in cache
- `route-handler.ts`: implements caching rules
- `cache.ts`: contains values applied to caching rules in `route-handler.ts`
- `routes.ts`: routes to be cached and prefetched are defined, as well as what to pass through without modification and what to serve up as static content
- `browser.ts`: entry point for the `main.js` javascript bundle which is added to the window

## Configure Caching {/*configure-caching*/}

We need to configure caching in our newly created project. The project contains some generic starter routes already, but these should be customized to fit your site. These routes should be added in the `routes.ts` file.

At this point, the only item that should require changing is a path match. We suggest starting with a few basic routes to get the feel for how it works.

### Routes File {/*routes-file*/}

```typescript
// src/routes.ts
import { Router } from 'PACKAGE_NAME }}/core/router'
import shoppingFlowRouteHandler from './route-handler'

export default new Router()
  .get('/', shoppingFlowRouteHandler)
  .get('/collections/*path', shoppingFlowRouteHandler)
  .get('/products/*path', shoppingFlowRouteHandler)
```

### Route Handler {/*route-handler*/}

The handler function passed into a route match will determine the behavior of the cache for the request. Abstracting this handler function, allows it to apply to multiple routes.

```typescript
// src/route-handler.ts
import { CACHE_PAGES } from './cache'
import { RouteHandler } from 'PACKAGE_NAME }}/core/router/Router'

const handler: RouteHandler = async ({ cache, removeUpstreamResponseHeader, updateResponseHeader, proxy }) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie') // The presence of a set-cookie header would prevent the response from being cached, so ensure set-cookie headers are removed.
  // updateResponseHeader('location', /https:\/\/origin.site.com\//gi, '/') // Makes 302 redirects relative. Uncomment if existing origin site issues 302s with full domain
  proxy('origin')
}

export default handler
```

#### Cache Constants {/*cache-constants*/}

Abstracting out the constants of the cache allows them to be reused across different routes.

```typescript
// src/cache.ts
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

/**
 * The default cache setting for pages in the route handler flow
 */
export const CACHE_PAGES = {
  edge: {
    maxAgeSeconds: ONE_HOUR,
  },
  browser: {
    maxAgeSeconds: 0,
    serviceWorkerSeconds: ONE_HOUR,
  },
}
```

Refer to the guides on [Routing](routing) and [Caching](caching) for the full syntax to use in your `routes.ts` file.

Learn [advanced prefetching techniques](#section_advanced_prefetching_techniques) to achieve the best possible performance.

## Deploy to Layer0 {/*deploy*/}

Now that you're satisfied with your site in local development, it's time to deploy it to the PRODUCT_NAMECloud. Once deployed, you can formally evaluate site performance and QA functionality.

Deploy your site with the following command:

```bash
CLI_NAMEdeploy # Root of project
```

Once your project code is up and running, you can view its performance from within the [app.layer0.co](APP_URL }}) cockpit. Using the tools available here, you can understand the caching behavior of the routes you have added. Continue adding routes and dialing in your config until you are ready to launch the site and code.

## Issues? {/*issues*/}

If you have any issues during this process, check our [forums](FORUM_URL) for assistance.

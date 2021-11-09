# Enable {{ PRODUCT_NAME }}'s Edge Network on an existing site

Enabling Layer0 on an existing site is the fastest and easiest way to start seeing performance benefits made possible by the Layer0 Edge Network. In the guide below, we will generate a node project, configure it to cache some static assets, deploy it, and visit the live site. By enabling the Edge Network, we will get both edge caching and predictive prefetching.

If any point, you want a more [detailed guide](/guides/traditional_sites), we've got that too.

## Network Diagram

As shown below, {{ PRODUCT_NAME }} becomes the main CDN for your site:

![traffic](/images/starter/traffic.svg)

Requests for your site will now pass through {{ PRODUCT_NAME }}'s globally distributed edge network and then to your origin server. A full production deployment requires changing your site's DNS, view our [production](/guides/production) guide for that process.

## Requirements

This guide will require the following knowledge:

- Terminal
- Deploy
- Acct on Layer0

## Connector

This framework has a connector developed for {{ PRODUCT_NAME }}. See [Connectors](connectors) for more information.

[View the Connector Code](https://github.com/layer0-docs/layer0-connectors/tree/main/layer0-starter-connector?button)

{{ SYSTEM_REQUIREMENTS }}

## Setup a project

Next, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

Create your project using {{ PRODUCT_NAME }}'s create module:

```bash
npm create {{ STARTER_NAME }}@latest
```

The {{ PRODUCT_NAME }} create module will prompt you for the following information:

- Name: Give your project name.
- Template: Select the `Default template` option.
- Hostname: Enter the domain of the origin server that {{ PRODUCT_NAME }} will be accelerating.
- Package manager: Pick `npm` unless you have strong preference and experience with `yarn`. This guide will assume `npm`.

Refer to the [{{ CONFIG_FILE }}](layer0_config) guide for more details

### Project Structure

Before we get started, you should familiarize yourself with some of the key files in the {{ PRODUCT_NAME }} project:

- `service-worker.ts`: Is run on the browser. The service worker is able to prefetch content (main product image, scripts, fonts, links, etc. as defined here) from within the potential next page’s document. We call this method "deepfetching".
  This file is where deepfetching rules are defined: the selector, how many elements, which attribute to fetch, resource type, and an optional callback function for more complex fetches (as shown in the example). More detailed info about deepfetching is [described below](#section_deep_fetching).
- `shoppingFlowRouteHandler.ts`: Is run on {{ PRODUCT_NAME }}. It’s where the caching rules get implemented, as well as where the modifications to be made to the requests and/or responses to support caching of dynamic content are defined.
- `cache.ts`: This is where the caching rules are defined for both {{ PRODUCT_NAME }} (edge) and the browser.
- `routes.ts`: This is where the routes to be cached and prefetched are defined, as well as what to pass through without modification and what to serve up as static content.
- `browser.ts`: This is entry point for the `main.js` javascript bundle which is added to the window.

## Configure Caching and Prefetching

Next we need to configure the caching in our newly created project. To do so, add a route for each URL you want to cache to the `routes.ts` file. For example, consider a site where the homepage (`/`), category pages (`/category/xxxx`), and product pages (`/product/yyyy`) are to be cached. Then your `routes.ts` file would look like:

```typescript
// routes.ts
import { Router } from '{{ PACKAGE_NAME }}/core/router'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  .get('/', shoppingFlowRouteHandler)
  .get('/collections/*path', shoppingFlowRouteHandler)
  .get('/products/*path', shoppingFlowRouteHandler)
```

```typescript
// shoppingFlowRouteHandler.ts
import { CACHE_PAGES } from './cache'
import { RouteHandler } from '{{ PACKAGE_NAME }}/core/router/Router'

const handler: RouteHandler = async ({ cache, removeResponseHeader, proxy }) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie') // The presence of a set-cookie header would prevent the response from being cached, so ensure set-cookie headers are removed.
  proxy('origin')
}

export default handler
```

```typescript
// cache.ts
const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY

/**
 * The default cache setting for pages in the shopping flow
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

Refer to the guides on [Routing](routing) and [Caching](caching) for the full syntax to use in your `routes.js` file.

In addition to configuring your caching in `routes.ts` as shown above, you may need to employ [advanced prefetching techniques](#section_advanced_prefetching_techniques) to achieve the best possible performance

## Test your code locally and on {{ PRODUCT_NAME }}

Now that you've configured your caching in `routes.ts`, you should test it in your local development environment and on {{ PRODUCT_NAME }}.

### Running Locally

To test the caching behavior locally, run your project with the [local cache option](caching#section_caching_during_development) as shown below:

```bash
{{ CLI_NAME }} dev --cache
```

### Running on {{ PRODUCT_NAME }}

Now that you're satisfied with your site in local development, it's time to deploy it to {{ PRODUCT_NAME }} Cloud. Once your code is deployed to {{ PRODUCT_NAME }} Cloud, you can formally evaluate site performance and QA functionality.

To deploy your site to {{ PRODUCT_NAME }}, you must first sign up for an account. [Sign up here for free.]({{ APP_URL }}/signup) Once you have an account, you can deploy your site using the `deploy` command:

```bash
{{ CLI_NAME }} deploy --team=[team-name]
```

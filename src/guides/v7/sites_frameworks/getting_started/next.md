---
title: Next.js
---

This guide shows you how to deploy a [Next.js](https://nextjs.org/) application to {{ PRODUCT }}.

## Example {/* example */}

<ExampleButtons
  title="Next.js SSR"
  siteUrl="https://edgio-community-examples-v7-nextjs-live.edgio.link/"
  repoUrl="https://github.com/edgio-docs/edgio-v7-nextjs-example"
/>

<!-- ## Next.js Commerce {/* nextjs-commerce */}

For details on using the Next.js Commerce template with {{ PRODUCT }}, refer to our [Next.js Commerce Guide](/guides/sites_frameworks/getting_started/next_commerce).

-->

## Supported Versions {/* supported-versions */}

{{ PRODUCT_NAME }} supports Next.js version 9 through 13.

## Supported Features {/* supported-features */}

{{ PRODUCT_NAME }} supports all of the most powerful features of Next.js, including:

- [Static Site Generation (SSG)](https://nextjs.org/docs/basic-features/pages#static-generation)
- [Server Side Rendering (SSR)](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- Localization
- Image Optimization
- [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) (including `fallback: (true|false|'blocking')`)
- [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) (including `revalidate`)
- [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
- [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props)

## Connector {/* connector */}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-next-connector">
  View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Getting Started {/* getting-started */}

### Create a Next.js Application {/* create-a-nextjs-application */}

If you don't already have a Next.js application, you can create one using:

```bash
npx create-next-app@latest
```

### Initializing your Project {/* initializing-your-project */}

Initialize your project for use with {{ PRODUCT }} by running the following command in your project's root directory:

```bash
cd my-next-app
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically add all of the required dependencies and files to your project. These include:

{{ INIT_DEFAULT_PACKAGES.md }}

- The `{{ PACKAGE_NAME }}/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the {{ PRODUCT }} router.
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages.
  {{ INIT_DEFAULT_FILES.md }}

## Config Options {/* config-options */}

In the generated `{{ CONFIG_FILE }}` file, you can customize how {{ PRODUCT }} builds and runs your Next.js application. Using the `next` key, you can configure the following options:

| Option                       | Description                                                                                                                                                                                                               | Default |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `generateSourceMaps`         | Output sourcemaps so that stack traces have original source filenames and line numbers when tailing the logs in the {{ PORTAL }}.                                                                                         | `true`  |
| `disableImageOptimizer`      | Disables the {{ PRODUCT }} image optimizer and allows to use the Next's built in image optimizer. <a id="disableImageOptimizer"></a>                                                                                      | `false` |
| `disableDevtools`            | Disables the {{ PRODUCT }} development tools widget on the site. <a id="disableDevtools"></a>                                                                                                                             | `false` |
| `disableServiceWorker`       | Disables the build of the service worker.                                                                                                                                                                                 | `false` |
| `forceServerBuild`           | Forces the `{{ PACKAGE_NAME }}/next` connector to use the server build. This config option replaces the NEXT_FORCE_SERVER_BUILD env variable.                                                                             | `false` |
| `optimizeServerBuild`        | Optimizes the server build by bundling all server assets and decreasing the overall startup time. This option has no effect on apps with serverless build. This option is set to `false` for Next 13.x apps.              | `true`  |
| `proxyToServerlessByDefault` | Reduces the number of generated rules by adding the default catch-all rule that proxies all requests to Next.js in serverless. Set this option to `false` if you want to proxy all unmatched pages to a different origin. | `true`  |
| `enforceTrailingSlash`       | Adds rules with Next's internal redirects that either add or remove a trailing slash. When set to `false`, the redirect is performed only by the Next.js server itself and doesn't affect other origins.                  | `true`  |

## {{ PRODUCT }} Next.js Plugin {/* next-plugin */}

{{ PRODUCT_NAME }} provides the following plugin for Next.js. This plugin is automatically added to your project when you run `{{ FULL_CLI_NAME }} init`.

If your project does not have a `next.config.js` file, one will automatically be added when you run `{{ FULL_CLI_NAME }} init`. Doing so adds the following plugin:

### with{{ PRODUCT }} (required)

The `with{{ PRODUCT }}` plugin optimizes the Next.js build for running on {{ PRODUCT }}. It is required to deploy your application on {{ PRODUCT }}.

If your project already has this config file, you need to add these plugins yourself.

```js filename="next.config.js"
const { with{{ PRODUCT }} } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = with{{ PRODUCT }}({
    // Next.js config options
})
```

## {{ PRODUCT_NAME }} Devtools {/* devtools */}

To understand better the caching mechanism, you can add {{ PRODUCT }} Devtools to see the caching metrics. Add the following code to your `_app.tsx` file:

```js filename='_app.tsx'
import {useDevtools} from '@edgio/react';

const MyApp = ({Component, pageProps}) => {
  useDevtools();
  // ... rest of your _app.tsx code
};
```

## Running Locally {/* running-locally */}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

## Deploying {/* deploying */}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) for more information.

## Prefetching {/* prefetching */}

{{ PREFETCH_TIER1_INTRO }}

The above code allows you to prefetch pages from {{ PRODUCT }}'s edge cache to significantly improve browsing speed. To prefetch a page, add the `Prefetch` component from `{{ PACKAGE_NAME }}/react` to any Next.js `Link` element. The following example shows you how to prefetch JSON data from `getServerSideProps` or `getStaticProps` using the `createNextDataUrl` function from `{{ PACKAGE_NAME }}/next/client`.

```js ins="4,14-23,27"
import {Prefetch} from '{{ PACKAGE_NAME }}/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {createNextDataURL} from '{{ PACKAGE_NAME }}/next/client';

export default function ProductListing({products}) {
  const {locale} = useRouter(); // you can omit this if you're not using localization

  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>
          <Link href={product.url} passHref>
            <Prefetch
              url={createNextDataURL({
                href: product.url,
                locale, // you can omit this if you're not using localization
                routeParams: {
                  // keys must match the param names in your next page routes
                  // So for example if your product page is /products/[productId].js:
                  productId: product.id,
                },
              })}>
              <a>
                <img src={product.thumbnail} />
              </a>
            </Prefetch>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getServerSideProps({params: {id}}) {
  const products = await fetch(/* fetch from your api */).then((res) =>
    res.json()
  );

  return {
    props: {
      products,
    },
  };
}
```

The `Prefetch` component fetches data for the linked page from {{ PRODUCT }}'s edge cache and adds it to the service worker's cache when the link becomes visible in the viewport. When the user taps on the link, the page transition will be instantaneous because the browser won't need to fetch data from the network.

### Registering the Service Worker {/* registering-the-service-worker */}

To enable prefetching, you need to register the service worker in your app. You can skip this step if your app is already using a service worker. If not, add the following code to your `pages/_app.js` file:

```js filename='_app.js'
import {useServiceWorker} from '@edgio/react';
const MyApp = ({Component, pageProps}) => {
  useServiceWorker({
    // set to `true` to install the service worker in development mode
    dev: false,
  });
  // ... rest of your _app.js code
};
```

<Callout type="info">

Starting with Next.js 13, when the `app` directory is used, adding `useServiceWorker` hook may break the build, as all pages in the `app` directory are by default server components. In order to avoid this, hooks must be placed in a client-only component. To do this, add [`use client` directive](https://nextjs.org/docs/getting-started/react-essentials#the-use-client-directive) at the top of the component.

</Callout>

## Routing {/* routing */}

{{ PRODUCT }} supports Next.js's built-in routing scheme. The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to Next.js:

```js filename='routes.js'
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
import {Router} from '{{ PACKAGE_NAME }}/core/router';

export default new Router()
  // By default send all requests to the Next.js app
  .use(nextRoutes);
```

### Routing Requests to Other Origins {/* routing-requests-to-other-origins */}

To route certain requests to an origin other than your Next.js app, first add the origin to `edgio.config.js`:

```js filename='{{CONFIG_FILE}}' ins="3-17"
module.exports = {
  connector: '@edgio/next',
  origins: [
    {
      name: 'api',
      hosts: [
        {
          scheme: 'match',
          location: [
            {
              hostname: 'api-origin.myapp.com',
            },
          ],
        },
      ],
    },
  ],
};
```

Then use the `match` method to define a route and specify the `origin` option:

```js filename='routes.js' ins='5-9'
export default new Router()
  // By default send all requests to the Next.js app
  .use(nextRoutes)
  // Override the default behavior to route requests to /api/* to the api origin
  .match('/api/:path*', {
    origin: {
      set_origin: 'api',
    },
  });
```

### Preview Mode {/* preview-mode */}

To be able to use [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) while being able to cache the respective pages, update your routes to match the requests that contain the two cookies `__prerender_bypass` & `__next_preview_data`, and send those to serverless for rendering.

```js filename="routes.js" ins="8-21"
import {Router} from '{{ PACKAGE_NAME }}/core/router';
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';

export default new Router()
  // By default send all requests to the Next.js app
  .use(nextRoutes)
  // Disable caching for preview mode
  .match(
    {
      cookies: {
        __prerender_bypass: /.*/g,
        __next_preview_data: /.*/g,
      },
    },
    {
      caching: {
        bypass_cache: true,
        bypass_client_cache: true,
      },
    }
  );
```

### Rewrites and Redirects {/* rewrites-and-redirects */}

The `nextRoutes` plugin automatically adds routes for [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) and [redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects) specified in `next.config.js`. Redirects are served directly from the network edge to maximize performance.

### Caching {/* caching */}

The easiest way to add edge caching to your Next.js app is to add caching routes after `nextRoutes`. For example,
imagine you have `/pages/p/[productId].js`. Here's how you can SSR responses as well as cache calls to `getServerSideProps`:

```js filename="routes.js"
export default new Router()
  .use(nextRoutes)
  // Products - SSR
  .get('/p/:productId', {
    caching: {
      // Ignore the cache-control header generated by Next.js
      ignore_origin_no_cache: [200],
      // cache at the edge for one day
      max_age: '1d',
      // continue to serve stale responses for up to one hour while revalidating
      stale_while_revalidate: '1h',
      // don't cache the response in the browser
      bypass_client_cache: true
    },
  })
  // Products - getServerSideProps
  .get('/_next/data/:version/p/:productId.json', {
    caching: {
      // Ignore the cache-control header generated by Next.js
      ignore_origin_no_cache: [200],
      // cache at the edge for one day
      max_age: '1d',
      // continue to serve stale responses for up to one hour while revalidating
      stale_while_revalidate: '1h',
      // disable caching in the browser's http cache
      bypass_client_cache: true
      // instead cache in the browser using the service worker for one hour - this allows us to prefetch API calls
      service_worker_max_age: '1h'
    },
  })
```

### Preventing Next.js pages from being cached by other CDNs {/* preventing-nextjs-pages-from-being-cached-by-other-cdns */}

If you are using a CDN in front of {{ PRODUCT_NAME }} and you want to prevent it from caching Next.js pages, you can do so by setting the `bypass_client_cache` option to `true`:

```js filename='routes.js' ins='5-9'
new Router()
  // By default send all requests to the Next.js app
  .use(nextRoutes)
  // Disable caching in downstream CDNs for a specific page
  .get('/my-private-page', {
    caching: {
      bypass_client_cache: true, // this will prevent downstream CDNs from caching the response
    },
  });
```

## Using next-i18next {/* using-next-i18next */}

The [next-i18next](https://github.com/isaachinman/next-i18next) package is a popular solution for adding localization to Next.js apps. It has some issues when running in serverless deployments, but you can work around these:

First, you need to _not_ use the default name for the `next-i18next.config.js` file. We recommend renaming it `i18next.config.js`. When you use the default name, next-i18next will try to load the config when the serverless function starts and since it is not bundled with the app, it will fail.

Then, you need to explicitly provide the config to `appWithTranslation` and `serverSideTranslations`.

So in your `pages/_app.js`:

```js filename='pages/_app.js'
export default appWithTranslation(MyApp, require('../i18next.config')); // <~ need to explicitly pass the config here
```

and in your pages:

```js
export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'footer'],
        require('../i18next.config') // <~ need to explicitly pass the config here.
      )),
      // Will be passed to the page component as props
    },
  };
}
```

Make sure you also import the config correctly with the new name into your `next.config.js`:

```js filename="next.config.js" ins="5"
const { with{{ PRODUCT }} } = require('{{ PACKAGE_NAME }}/next/config')
const { i18n } = require('./i18next.config')

module.exports = with{{ PRODUCT }}({
    i18n,
  });
```

Finally, you will need to update your `{{ CONFIG_FILE }}` to [include](/guides/performance/cdn_as_code/edgio_config#serverless) where the locale files are stored. Here is an using the default location `/public`:

```js filename='{{ CONFIG_FILE }}' ins="13"
module.exports = {
  connector: '{{ PACKAGE_NAME }}/next',

  serverless: {
    include: ['public/**/*'],
  },
};
```

<!-- A working example app can be found [here](https://github.com/edgio-docs/edgio-next-i18n-example). -->

## Image optimizer {/* image-optimizer */}

By default, Next.js image optimizer is replaced by our image optimizer, which is available in all build modes. You can disable it and use the built-in Next.js image optimizer instead by adding `disableImageOptimizer: true` to the `next` config in the `{{ CONFIG_FILE }}` file.

```js filename='{{ CONFIG_FILE }}' ins="3"
module.exports = {
  next: {
    disableImageOptimizer: true,
  },
};
```

<Callout type="info">

Note that Next.js apps built in serverless mode don't include a Next.js image optimizer. Disabling our image optimizer without providing an alternative may cause them to fail.

</Callout>

## Serverless Bundling {/* serverless-bundling */}

Next.js has continued to improve how it bundles production builds for deployment on serverless architectures. {{ PRODUCT_NAME }} takes advantage of these improvements by applying different configuration options depending on the version of Next.js being used:

| Version           | Next.js configs applied                   |
| ----------------- | ----------------------------------------- |
| Next.js < 12.2.0  | `target: 'experimental-serverless-trace'` |
| Next.js >= 12.2.0 | `output: 'standalone'`                    |

For backwards compatibility, {{ PRODUCT_NAME }} will also respect `target: 'serverless'` in your next.config.js for Next.js versions prior to 12.0.0.

<Callout type="info">

Note that NextRouter.render404 and renderNextPage are retired when using Next.js 12.2.0+. Requests are delegated to a Next.js server instance which will handle determining which page to render based on the request. Prior use cases should now be achieved via using Next.js redirects and rewrites.

</Callout>

## Support for Next.js Middleware (BETA) {/* support-for-nextjs-middleware-beta */}

{{ PRODUCT_NAME }} supports Next.js middleware starting with Next.js 12.2.0.

When using Next.js middleware it should be noted that the middleware functions are only executed at the serverless layer, after the edge cache. Middleware that you want to execute on each request needs to have caching disabled explicitly for the route on which the middleware is enabled. Some Middleware use cases such as rewriting the request to another route would be fine to cache. These use cases need to be evaluated on a per route basis with caching enabled/disabled based on the desired result.

## Runtime Variables Configuration {/* runtime-variables-configuration */}

{{ PRODUCT }} supports runtime variables in `serverRuntimeConfig` and `publicRuntimeConfig` properties of `next.config.js`. For more information, visit the [Next.js Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) documentation.

{{ related_resources.md }}

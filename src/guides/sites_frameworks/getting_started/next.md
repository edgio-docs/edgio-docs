---
title: Next.js
---

This guide shows you how to deploy a [Next.js](https://nextjs.org/) application to {{ PRODUCT }}.

<Video src="https://www.youtube.com/watch?v=ZN5oYSSpnmc" />

<Condition version="<7">

## Example {/* example */}

<ExampleButtons
  title="Next.js SSR"
  siteUrl="https://edgio-community-examples-nextjs-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-nextjs-example"
  deployFromRepo
/>

</Condition>

## Next.js Commerce {/* nextjs-commerce */}

For details on using the Next.js Commerce template with {{ PRODUCT }}, refer to our [Next.js Commerce Guide](/guides/sites_frameworks/getting_started/next_commerce).

<Condition version="<7">

## Connector {/* connector */}

{{ PRODUCT }} provides a connector for this framework. [Learn more.](/guides/sites_frameworks/connectors)

<ButtonLink
  variant="stroke"
  type="code"
  withIcon={true}
  href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-next-connector">
  View the Connector Code
</ButtonLink>

</Condition>

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

{{ PREREQ }}

When installing the {{ PRODUCT }} CLI globally in a virtual environment that has Node and NPM installed globally, you [may run into permission issues]({{ FORUM_URL }}/t/xdn-cli-npm-install-error/83). In that case, you can install the {{ PRODUCT }} CLI locally within your app using `npm i -D {{ PACKAGE_NAME }}/cli` and running commands using `./node_modules/{{ PACKAGE_NAME }}/cli` instead of `{{ FULL_CLI_NAME }}`.

If you run into permission issues while attempting to install the {{ PRODUCT }} CLI globally on your local development machine, these may be fixed by using [nvm](https://github.com/nvm-sh/nvm) to manage Node and NPM.

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

{{ INIT_DEFAULT_PACKAGES }}

- The `{{ PACKAGE_NAME }}/next` package - Provides router middleware that automatically adds Next.js pages and api routes to the {{ PRODUCT }} router.
- The `{{ PACKAGE_NAME }}/react` package - Provides a `Prefetch` component for prefetching pages.
  {{ INIT_DEFAULT_FILES }}

## Next.js Config Plugins {/* nextjs-config-plugins */}

If your project does not have a `next.config.js` file, one will automatically be added when you run `{{ FULL_CLI_NAME }} init`. Doing so adds two plugins:

- `with{{ PRODUCT }}` (required)
- `withServiceWorker` (optional)

If your project already has this config file, you need to add these plugins yourself.

```js filename='next.config.js'
const { with{{ PRODUCT }} } = require('{{ PACKAGE_NAME }}/next/config')

module.exports = with{{ PRODUCT }}({
  // Output source maps so that stack traces have original source filenames and line numbers when tailing
  // the logs in the {{ PORTAL }}.
  {{ FULL_CLI_NAME }}SourceMaps: true,
})
```

<a id="with"></a>

### with{{ PRODUCT }} {/* with */}

The `with{{ PRODUCT }}` plugin optimizes the Next.js build for running on {{ PRODUCT }}. It is required to deploy your application on {{ PRODUCT }} and accepts the following parameters:

- `{{ FULL_CLI_NAME }}SourceMaps`: Defaults to `false`. Set to `true` to add server-side source maps so that stack traces have original source filenames and line numbers when tailing the logs in the {{ PORTAL }}. This will increase the serverless bundle size but will not affect performance. If you find that your app exceeds the maximum serverless bundle size allowed by {{ PRODUCT_NAME }}, you can disable this option to conserve space.

<Callout type="warning">

We noticed some performance issues related to sourcemaps being loaded in our
Serverless infrastructure, which may result in 539 project timeout errors. In
case you encounter such errors, please try again with sourcemaps disabled.
This document will be updated once the problem is fully resolved.

</Callout>

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
    dev: false /* set to true to install the service worker in development mode */,
  });

  // ... rest of your _app.js code
};
```

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

The easiest way to add edge caching to your Next.js app is to add caching routes before `nextRoutes`. For example,
imagine you have `/pages/p/[productId].js`. Here's how you can SSR responses as well as cache calls to `getServerSideProps`:

```js filename="routes.js"
export default new Router()
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
  .use(nextRoutes);
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
        require('../i18next.config')
      )), // <~ need to explicitly pass the config here.
      // Will be passed to the page component as props
    },
  };
}
```

Make sure you also import the config correctly with the new name into your `next.config.js`:

```js filename="next.config.js" ins="5"
const { with{{ PRODUCT }}, withServiceWorker } = require('{{ PACKAGE_NAME }}/next/config')
const { i18n } = require('./i18next.config')

module.exports = with{{ PRODUCT }}({
  i18n,
})
```

<Condition version="<7">

Finally, you will need to update your `{{ CONFIG_FILE }}` to [includeFiles](/guides/basics/edgio_config#includefiles) where the locale files are stored. Example using the default of `/public`:

```js filename='{{ CONFIG_FILE }}' ins="3-5"
module.exports = {
  connector: '{{ PACKAGE_NAME }}/next',
  includeFiles: {
    public: true,
  },
};
```

</Condition>

<Condition version="7">

Finally, you will need to update your `{{ CONFIG_FILE }}` to [include](/guides/performance/cdn_as_code/edgio_config#serverless) where the locale files are stored. Here is an example using the default location `/public`:

```js filename='{{ CONFIG_FILE }}' ins="3-5"
module.exports = {
  connector: '{{ PACKAGE_NAME }}/next',
  serverless: {
    include: ['public/**/*'],
  },
};
```

</Condition>

A working example app can be found [here](https://github.com/edgio-docs/edgio-next-i18n-example).

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

Next.js has continued to improve how it bundles production builds for deployment on serverless architectures. {{ PRODUCT_NAME }} takes advantage of these improvementsby applying different configuration options depending on the version of Next.js being used:

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

<Callout type="info">

Next.js Runtime Configuration requires {{ PRODUCT }} 6.0.5+. See <a href="/guides/develop/cli#upgrade-project-to-latest-version">Upgrading</a>.

</Callout>

{{ PRODUCT }} supports runtime variables in `serverRuntimeConfig` and `publicRuntimeConfig` properties of `next.config.js`. For more information, visit the [Next.js Runtime Configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) documentation.

<Condition version="<7">

## Additional Route Handling Options {/* additional-route-handling-options */}

These additional options allow you to change certain behavior of routes that are generated by `nextRoutes`.

### `setEnforceTrailingSlash` {/* set-enforce-trailing-slash */}

Set this option to `true` to suppress the default Next.js behavior of removing trailing slashes when performing a redirect.

If `trailingSlash: true` is set in `next.config.js`, setting this option to `false`, or removing it, will remove the redirect that adds the trailing slash.

```js filename='routes.js'
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
import {Router} from '{{ PACKAGE_NAME }}/core/router';

nextRoutes.setEnforceTrailingSlash(true);

export default new Router().use(nextRoutes);
```

### `setQueryDuplicatesToArrayOnly` {/* set-query-duplicates-to-array-only */}

This option allows you to change the way Next.js duplicate query parameters are parsed by the `renderNextPage` function.

By default, the duplicate query parameters are parsed as an array for the param name, as well as array notation. For example:

```js
const params = {
  query: {
    slug: ['value', 'value2'],
    'slug[0]': 'value',
    'slug[1]': 'value2',
  },
};
```

Set `setQueryDuplicatesToArrayOnly` to `true` to parse them only as an array:

```js
const params = {
  query: {
    slug: ['value', 'value2'],
  },
};
```

```js filename='routes.js'
import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
import {Router} from '{{ PACKAGE_NAME }}/core/router';

nextRoutes.setQueryDuplicatesToArrayOnly(true);

export default new Router().use(nextRoutes);
```

<Callout type="info">

This option has no effect on Next.js apps with Next.js 12 and newer, which are built in server mode.

</Callout>

</Condition>

---
title: React
---

This guide shows you how to serve a [React](https://reactjs.org/) application to {{ PRODUCT }}. If you're using Next.js specifically, we suggest using the [Next.js guide](/guides/sites_frameworks/getting_started/next).

## Example {/*example*/}

<ExampleButtons
  title="React"
  siteUrl="https://edgio-community-examples-static-react-live.layer0-limelight.link/"
  repoUrl="https://github.com/edgio-docs/edgio-static-react-example" 
  deployFromRepo />

## Connector {/*connector*/}

This framework has a connector developed for {{ PRODUCT }}. See [Connectors](/guides/sites_frameworks/connectors) for more information.

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/edgio-docs/edgio-connectors/tree/main/edgio-react-cra-connector">
 View the Connector Code
</ButtonLink>

{{ PREREQ.md }}

## Create React App {/*create-react-app*/}

<Video src="https://www.youtube.com/watch?v=O-7YqHqAIJA" />

This guide will use [Create React App](https://create-react-app.dev/) to generate a project.

```bash
npx create-react-app my-app
```

## Initializing your project with {{ PRODUCT }} {/*initializing-your-project-with*/}

Then, in the root folder of your project, run:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }} --connector={{ PACKAGE_NAME }}/react-cra
```

This will automatically add all of the required dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package
- The `{{ PACKAGE_NAME }}/cli` package
- The `{{ PACKAGE_NAME }}/react-cra` package
- `{{ CONFIG_FILE }}` - Contains various configuration options for {{ PRODUCT }}.
- `routes.js` - A default routes file that sends all requests to the React. Update this file to add caching or proxy some URLs to a different origin.

## Routing {/*routing*/}

The default `routes.js` file created by `{{ FULL_CLI_NAME }} init` sends all requests to React server via a fallback route.

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

const { Router } = require('{{ PACKAGE_NAME }}/core/router')
const { reactCRARoutes } = require('{{ PACKAGE_NAME }}/react-cra')

module.exports = new Router().use(reactCRARoutes)
```

## Running Locally {/*running-locally*/}

To test your app locally, run:

```bash
{{ FULL_CLI_NAME }} dev
```

You can do a production build of your app and test it locally using:

```bash
{{ FULL_CLI_NAME }} build && {{ FULL_CLI_NAME }} run --production
```

Setting `--production` runs your app exactly as it will be when deployed to the {{ PRODUCT }} cloud.

## Deploy to {{ PRODUCT }} {/*deploy-to*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following commands in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

See [Deployments](/guides/basics/deployments) for more information.

## Prefetching {/*prefetching*/}

Install the `{{ PACKAGE_NAME }}/react` to enable [prefetching](/guides/performance/prefetching).

```bash
npm i -D {{ PACKAGE_NAME }}/react
```

Add the `Prefetch` component from `{{ PACKAGE_NAME }}/react` to your links to cache pages before the user clicks on them. Here's an example:

```js ins="2,8,10"
import { Link } from 'react-router'
import { Prefetch } from '{{ PACKAGE_NAME }}/react'

export default function ProductListing() {
  return (
    <div>
      {/* The URL you need to prefetch is the API call that the page component will make when it mounts. It will vary based on how you've implemented your site. */}
      <Prefetch url="/api/products/1.json">
        <Link to="/p/1">Product 1</Link>
      </Prefetch>
    </div>
  )
}
```

By default, `Prefetch` waits until the link appears in the viewport before prefetching. You can prefetch immediately by setting the `immediately` prop:

```js
<Prefetch url="/api/products/1.json" immediately>
  <Link to="/p/1">Product 1</Link>
</Prefetch>
```

## Service Worker {/*service-worker*/}

In order for prefetching to work, you need to configure a service worker that uses the `Prefetcher` class from `{{ PACKAGE_NAME }}/prefetch`.

Following the Create React App example from above? Make sure to create a file in `src/service-worker.js`. Paste the code example below into that file.

```js
import { precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher().route()
```

In order to install the service worker in the browser when your site loads, call the `install` function from `{{ PACKAGE_NAME }}/prefetch`.

```js filename='index.js'
import { install } from '{{ PACKAGE_NAME }}/prefetch/window'

// Install {{ PRODUCT }} Service Worker
install()

// import installDevtools from '{{ PACKAGE_NAME }}/devtools/install'

// Enable {{ PRODUCT }} Devtools
// installDevtools()
```

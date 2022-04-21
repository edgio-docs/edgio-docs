# WebApp CDN

_Approximate time to completion: 7 mins_

Deploying your web application behind Layer0 is the fastest and easiest way to start seeing the performance benefits made possible by the Layer0 edge network. In this guide we'll show you how to:

- Create a new Layer0 project
- Configure edge caching using EdgeJS
- Deploy your site

If any point, you want a more [detailed guide](/guides/traditional_sites), we've got that too.

## Example

[Try the WebApp CDN Example Site](https://layer0-docs-cdn-starter-template-default.layer0-limelight.link/?button)
[View the Code](https://github.com/layer0-docs/layer0-cdn-example?button)
[Deploy to Layer0](https://app.layer0.co/deploy?button&deploy&repo=https://github.com/layer0-docs/layer0-cdn-example)

## Network Diagram

As shown below, {{ PRODUCT_NAME }} becomes the main CDN for your site:

![traffic](/images/starter/traffic.svg)

Requests for your site will now pass through {{ PRODUCT_NAME }}'s globally distributed edge network and then to your origin server.

A full production deployment requires changing your site's DNS to allow requests to come to Layer0 first. View our [production guide](/guides/production) for that process.

## Create an Account

If you do not have an account yet, visit [{{ PRODUCT_NAME }}]({{ APP_URL }}/signup) to create one.

{{ SYSTEM_REQUIREMENTS }}

## Create a New Layer0 Project

1. Install the {{ PRODUCT_NAME }} CLI.
You can use either `npm` or `yarn`.

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

```bash
yarn global add {{ PACKAGE_NAME }}/cli
```

2. Create your project with the following command:

```bash
{{ CLI_NAME }} init
```

### Project Structure

After you run `{{ CLI_NAME }} init`, {{ PRODUCT_NAME }} creates the following files:

- `routes.js`: defines routes to be cached and prefetched, as well as what to pass through without modification and what to serve up as static content
- `layer0.config.js`: various configuration options to tune your project
## Configure Caching

We need to configure caching in our newly created project. The project contains some generic starter routes already, but these should be customized to fit your site. These routes should be added in the `routes.js` file.

At this point, the only item that should require changing is a path match. We provide a basic sample to get you started.
### Routes File

```js
// routes.js
import { Router } from '@layer0/core/router'

// const ONE_HOUR = 60 * 60
// const ONE_DAY = 24 * ONE_HOUR

export default new Router()
  // Here is an example where we cache api/* at the edge but prevent caching in the browser
  // .match('/api/:path*', ({ proxy, cache }) => {
  //   cache({
  //     edge: {
  //       maxAgeSeconds: ONE_DAY,
  //       staleWhileRevalidateSeconds: ONE_HOUR,
  //     },
  //     browser: {
  //       maxAgeSeconds: 0,
  //       serviceWorkerSeconds: ONE_DAY,
  //     },
  //   })
  //   proxy('origin')
  // })

  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))
```
#### Cache Constants
Cache constants in the `routes.js` have been abstracted out to enable reuse across different routes. You can also add additional constants such as year.
```js
// routes.js
import { Router } from '@layer0/core/router'

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY
// ...
```

Refer to the guides on [Routing](routing) and [Caching](caching) for the full syntax to use in your `routes.js` file.

Learn [advanced prefetching techniques](prefetching) to achieve the best possible performance.

## Deploy to {{ PRODUCT_NAME }}

Now that you're satisfied with your site in local development, it's time to deploy it to the {{ PRODUCT_NAME }} Cloud. Once deployed, you can formally evaluate site performance and QA functionality.

Deploy your site with the following command:

```bash
{{ CLI_NAME }} deploy # Root of project
```

Once your project code is up and running, you can view its performance from within the [app.layer0.co]({{ APP_URL }}) cockpit. Using the tools available here, you can understand the caching behavior of the routes you have added. Continue adding routes and dialing in your config until you are ready to launch the site and code.

## Issues?

If you have any issues during this process, check our [forums](FORUM_URL) for assistance.

---
title: Web CDN
---

Deploying your web application behind {{ PRODUCT }} is the fastest and easiest way to start seeing the performance benefits made possible by the {{ PRODUCT }} network. In this guide we'll show you how to:

- Create a new {{ PRODUCT }} project
- Configure edge caching using EdgeJS
- Deploy your site

If any point, you want a more [detailed guide](/guides/traditional_sites), we've got that too.

## Example {/*example*/}

<ExampleButtons
  title="Web CDN"
  siteUrl="https://layer0-docs-cdn-starter-template-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-cdn-example" 
  deployFromRepo />

## Network Diagram {/*network-diagram*/}

As shown below, {{ PRODUCT }} becomes the main CDN for your site:

![traffic](/images/starter/traffic.png)

Requests for your site will now pass through {{ PRODUCT }}'s globally distributed edge network and then to your origin server.

A full production deployment requires changing your site's DNS to allow requests to come to {{ PRODUCT }} first. View our [production guide](/guides/production) for that process.

{{ PREREQ }}

## Create your project {/*create-your-project*/}

For creating a new site on {{ PRODUCT }}, you can choose between:
- [{{ PRODUCT }} Developer Console](#create-via-edgio-developer-console) - interactive UI for creating your site and deploy using generated command
- [{{ PRODUCT }} CLI](#create-via-cli) - interactively initialize your project directly from the command line

### Create via {{ PRODUCT }} Developer Console {/*create-via-edgio-developer-console*/}

1. First, [login to the Developer Console]({{ LOGIN_URL }}) and locate the **New Site** button.
  ![New Site button](/images/app-edge/new-site-button.png)

2. Next, enter your site's domain name. This will eventually become the origin backend that you can [proxy to](cookbook#proxying-an-origin) once your site is setup.
  ![Add New Site dialog](/images/app-edge/add-new-site-dialog.png)

3. Once your site is created, copy the generated command into your terminal (💻) and run it at the root of your project. This will initialize your project source code with {{ PRODUCT }} and automatically deploy your site.
  ![Quick Start Deploy Command](/images/app-edge/quickstart-deploy-command.png)

  An example command for **www.yourdomain.com**:
  ```bash
    npx @layer0/cli@latest init \
      --name yourdomain.com \
      --environment production \
      --origin www.yourdomain.com \
      --deploy
  ```

4. Finally, you can start to update your {{ PRODUCT }} router (`routes.js`) and configuration file (`{{ CONFIG_FILE }}`) to [proxy your origin](#configure-backend-to-proxy) and [setup caching rules](#configure-caching).
### Create via CLI {/*create-via-cli*/}
Now that the CLI has been installed, create a new project using:

```bash
{{ CLI_NAME }} init
```

### Project Structure {/*project-structure*/}

After you run `{{ CLI_NAME }} init`, {{ PRODUCT }} creates the following files:

- `routes.js`: defines routes to be cached and prefetched, as well as what to pass through without modification and what to serve up as static content
- `{{ CONFIG_FILE }}`: various configuration options to tune your project

## Configure Backend to Proxy {/*configure-backend-to-proxy*/}

To proxy your existing site with {{ PRODUCT }}, we'll need to define that backend in the [`{{ CONFIG_FILE }}`]({{ PRODUCT_NAME_LOWER }}_config) file that was just created.

```js filename="./{{ CONFIG_FILE}}"
// This file was automatically added by {{ PRODUCT_NAME_LOWER }} deploy.
// You should commit this file to source control.
module.exports = {
  backends: {
    origin: {
      // The domain name or IP address of the origin server
      domainOrIp: "example.com",

      // When provided, the following value will be sent as the host header 
      // when connecting to the origin. If omitted, the host header from 
      // the browser will be forwarded to the origin.
      hostHeader: "example.com"
    },
  },
}
```

## Configure Caching {/*configure-caching*/}

We need to configure caching in our newly-created project. The project contains some generic starter routes already, but these should be customized to fit your site. These routes should be added in the `routes.js` file.

At this point, the only item that should require changing is a path match. We provide a basic sample to get you started.
### Routes File {/*routes-file*/}

```js filename="./routes.js"
import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core/router'

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

This example will proxy and cache at the edge all requests that match the path pattern defined using `.match(...)`. The `.fallback(...)` handler takes all unmatched requests and also proxies them to `origin`, a backend that we just defined inside the [`{{ CONFIG_FILE }}`]({{ PRODUCT_NAME_LOWER }}_config) file.

#### Cache Constants {/*cache-constants*/}
Cache constants in the `routes.js` have been abstracted out to enable reuse across different routes. You can also add additional constants such as year.

```js filename="./routes.js"
import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core/router'

const ONE_HOUR = 60 * 60
const ONE_DAY = 24 * ONE_HOUR
const ONE_YEAR = 365 * ONE_DAY
// ...
```

Refer to the guides on [Routing](routing) and [Caching](caching) for the full syntax to use in your `routes.js` file.

Learn [advanced prefetching techniques](prefetching) to achieve the best possible performance.

## Deploy to {{ PRODUCT_NAME }} {/*deploy-to-edgio*/}

Now that you're satisfied with your site in local development, it's time to deploy it to the {{ PRODUCT_NAME }} Cloud. Once deployed, you can formally evaluate site performance and QA functionality.

Deploy your site with the following command:

```bash
{{ CLI_NAME }} deploy # Root of project
```

Once your project code is up and running, you can view its performance from within the [app.layer0.co]({{ APP_URL }}) cockpit. Using the tools available here, you can understand the caching behavior of the routes you have added. Continue adding routes and dialing in your config until you are ready to launch the site and code.

## Issues? {/*issues*/}

If you have any issues during this process, check our [forums]({{ FORUM_URL }}) for assistance.

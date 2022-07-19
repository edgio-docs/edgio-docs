---
title: Sanity Studio
---

This guide shows you how to deploy a [Sanity Studio](https://www.sanity.io/docs/sanity-studio) application on the {{ PRODUCT }} platform.

Sanity Studio is a single page app (SPA) written in React, where you can configure the document types and input fields, with simple JavaScript objects. This guide will walk you through how to deploy Sanity Studio with {{ PRODUCT }} in four simple steps.

## Example {/*example*/}

<ExampleButtons
  title="Sanity Studio"
  siteUrl="https://layer0-docs-layer0-sanity-studio-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-sanity-studio-example" 
  deployFromRepo />

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP }}

{{ INSTALL_CLI }}

## Create a new Sanity Studio app {/*create-a-new-sanity-studio-app*/}

First, install the [Sanity CLI](https://www.npmjs.com/package/@sanity/cli):

```bash
npm i -g @sanity/cli
```

To initiate a new project and download the Studio code to your computer, run the following in the command line:

```bash
sanity init
```

The Sanity CLI will walk you through the necessary steps to set up a project, letting you choose a schema template. When you're done with these steps, the CLI will download the source code and configuration to get you started. To start a local development server, cd into the project folder and run the following command:

```bash
sanity start
```

## Configuring your Sanity Studio app for {{ PRODUCT }} {/*configuring-your-sanity-studio-app-for-appops*/}

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Sanity Studio.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ PRODUCT_NAME_LOWER }} init.
// You should commit this file to source control.

import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core/router'

export default new Router()
    .static('dist', ({ cache }) => {
        cache({
            edge: {
                maxAgeSeconds: 60 * 60 * 60 * 365,
                forcePrivateCaching: true,
            },
            browser: {
                maxAgeSeconds: 0,
                serviceWorkerSeconds: 60 * 60 * 24,
            },
        })
    })
    .fallback(({ appShell }) => {
        appShell('dist/index.html')
    })
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Sanity Studio app locally on {{ PRODUCT }} {/*run-the-Sanity Studio-app-locally-on-appops*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Set default port number for the app to run on 3333:

```bash
set PORT= 3333 # windows
export PORT= 3333 # linux
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3333

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

## Post Deployment Whitelisting {/*post-deployment*/}

Once Sanity Studio is deployed, you will need to add it's URL to Sanity’s [CORS origins settings](https://www.sanity.io/docs/front-ends/cors). You can do this from the command line:

```bash
sanity cors add https://your-url.{{ PRODUCT_NAME_LOWER }}-limelight.link --credentials
```

Alternatively, you can navigate to [manage.sanity.io](https://manage.sanity.io), find your project and under Settings > API, add the Studio URL to the CORS origins list. You should allow credentials as the Studio requires authentication for added security.

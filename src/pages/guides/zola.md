---
title: Zola
---

This guide shows you how to deploy a [Zola](https://www.getzola.org/) application on {{ PRODUCT_NAME }}.

## Example {/*example*/}

<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-zola-example?button">
 View the Code
</ButtonLink>

{{ SYSTEM_REQUIREMENTS }}

{{ SIGN_UP_LAYER0 }}

<!-- ## Install the {{ PRODUCT_NAME }} CLI {/*install-the-{{PRODUCT_NAME_LOWER}}-cli*/} -->

If you have not already done so, install the [{{ PRODUCT_NAME }} CLI](cli)

```bash
npm i -g {{ PACKAGE_NAME }}/cli
```

## Create a new Zola app {/*create-a-new-zola-app*/}

### Step 1: Install Zola {/*step-1-install-zola*/}

```bash
brew install zola
# or
sudo port install zola
```

To verify your new install:

```bash
zola --version
```

### Step 2: Create a New Site {/*step-2-create-a-new-site*/}

```bash
zola init myblog
```

You will be asked a few questions.

```bash
> What is the URL of your site? (https://example.com):
> Do you want to enable Sass compilation? [Y/n]:
> Do you want to enable syntax highlighting? [y/N]:
> Do you want to build a search index of the content? [y/N]:
```

 For our blog, let's accept the default values (i.e., press Enter for each question). We now have a `myblog` directory with the following structure:

```dir
├── config.toml
├── content
├── sass
├── static
├── templates
└── themes
```

For reference, by the **end** of this overview, our `myblog` directory will have the following structure:

```dir
├── config.toml
├── content/
│   └── blog/
│       ├── _index.md
│       ├── first.md
│       └── second.md
├── sass/
├── static/
├── templates/
│   ├── base.html
│   ├── blog-page.html
│   ├── blog.html
│   └── index.html
└── themes/
```

### Step 3: Start the Zola server {/*step-3-start-the-zola-server*/}

Let's start the Zola development server with:

```bash
$ zola serve
Building site...
-> Creating 0 pages (0 orphan), 0 sections, and processing 0 images
```

## Configuring your Zola app for {{ PRODUCT_NAME }} {/*configuring-your-zola-app-for--product_name-*/}

Create a `package.json` at the root of your project with the following:

```bash
npm init
```

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ CLI_NAME }} init`:

```bash
{{ CLI_NAME }} init
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT_NAME }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT_NAME }}
- `routes.js` - A default routes file that sends all requests to Zola.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'

export default new Router().static('public', ({ cache }) => {
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
```

Refer to the [Routing](routing) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Zola app locally on {{ PRODUCT_NAME }} {/*run-the-zola-app-locally-on--product_name-*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Run {{ PRODUCT_NAME }} on your local machine:

```bash
{{ CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Next, deploy the build to {{ PRODUCT_NAME }} by running the `{{ CLI_NAME }} deploy` command:

```bash
{{ CLI_NAME }} deploy
```

Refer to the [Deploying](deploying) guide for more information on the `deploy` command and its options.

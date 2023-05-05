---
title: Zola
---

This guide shows you how to deploy a [Zola](https://www.getzola.org/) application to {{ PRODUCT }}.

## Example {/*example*/}

<ExampleButtons repoUrl="https://github.com/edgio-docs/edgio-zola-example" />

{{ PREREQ }}

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
zola serve
Building site...
-> Creating 0 pages (0 orphan), 0 sections, and processing 0 images
```

## Configuring your Zola app for {{ PRODUCT }} {/*configuring-your-zola-app-for*/}

Create a `package.json` at the root of your project with the following:

```bash
npm init
```

### Initialize your project {/*initialize-your-project*/}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Zola.

### Configure the routes {/*configure-the-routes*/}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

import { Router } from '{{ PACKAGE_NAME }}/core/router'

export default new Router()
  // Create serveStatic route for each file in the folder public with a cache-control header of 's-maxage=315360000'
  .static('public')
```

Refer to the [CDN-as-code](/applications/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Zola app locally on {{ PRODUCT }} {/*run-the-zola-app-locally-on*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/applications/basics/deployments) guide for more information on the `deploy` command and its options.

---
title: Hugo
---

This guide shows you how to deploy a [Hugo](https://gohugo.io) application to {{ PRODUCT }}.

<!-- ## Example {/* example */}

<ExampleButtons repoUrl="https://github.com/edgio-docs/edgio-hugo-example" /> -->

{{ PREREQ.md }}

## Create a new Hugo app {/* create-a-new-hugo-app */}

### Step 1: Install Hugo {/* step-1-install-hugo */}

<SnippetGroup>

```bash tabLabel="Brew"
brew install hugo
```

```bash tabLabel="Port"
port install hugo
```

</SnippetGroup>

To verify your new install:

```bash
hugo version
```

### Step 2: Create a New Site {/* step-2-create-a-new-site */}

```bash
hugo new site quickstart
```

### Step 3: Add a Theme {/* step-3-add-a-theme */}

See [themes.gohugo.io](https://themes.gohugo.io/) for a list of themes to consider. This quickstart uses the beautiful [Ananke theme](https://themes.gohugo.io/gohugo-theme-ananke/).

First, download the theme from GitHub and add it to your site's `themes` directory:

```bash
cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

_Note for non-git users:_

- If you do not have git installed, you can download the archive of the latest
  version of this theme from:
  https://github.com/theNewDynamic/gohugo-theme-ananke/archive/master.zip
- Extract that .zip file to get a "gohugo-theme-ananke-master" directory.
- Rename that directory to "ananke", and move it into the "themes/" directory.

Then, add the theme to the site configuration:

```bash
echo theme = \"ananke\" >> config.toml
```

### Step 4: Add Some Content {/* step-4-add-some-content */}

You can manually create content files (for example as `content/<CATEGORY>/<FILE>.<FORMAT>`) and provide metadata in them, however you can use the `new` command to do a few things for you (like add title and date):

```bash
hugo new posts/my-first-post.md
```

### Step 5: Start the Hugo server {/* step-5-start-the-hugo-server */}

```bash
hugo server -D
```

## Configuring your Hugo app for {{ PRODUCT }} {/* configuring-your-hugo-app-for */}

Create a `package.json` at the root of your project with the following:

```json
{
  "name": "hugo",
  "version": "1.0.0",
  "scripts": {
    "build": "hugo -D",
    "deploy": "{{ FULL_CLI_NAME }} deploy"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### Initialize your project {/* initialize-your-project */}

In the root directory of your project run `{{ FULL_CLI_NAME }} init`:

```bash
{{ FULL_CLI_NAME }} init {{ INIT_ARG_EDGIO_VERSION }}
```

This will automatically update your `package.json` and add all of the required {{ PRODUCT_NAME }} dependencies and files to your project. These include:

- The `{{ PACKAGE_NAME }}/core` package - Allows you to declare routes and deploy your application on {{ PRODUCT }}
- The `{{ PACKAGE_NAME }}/prefetch` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed
- `{{ CONFIG_FILE }}` - A configuration file for {{ PRODUCT }}
- `routes.js` - A default routes file that sends all requests to Hugo.

### Configure the routes {/* configure-the-routes */}

Update `routes.js` at the root of your project to the following:

```js
// This file was added by {{ FULL_CLI_NAME }} init.
// You should commit this file to source control.

import {Router} from '{{ PACKAGE_NAME }}/core/router';

export default new Router()
  // Create serveStatic route for each file in the folder public with a cache-control header of 's-maxage=315360000'
  .static('public');
```

Refer to the [CDN-as-code](/guides/performance/cdn_as_code) guide for the full syntax of the `routes.js` file and how to configure it for your use case.

### Run the Hugo app locally on {{ PRODUCT }} {/* run-the-hugo-app-locally-on */}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/* deploying */}

Create a production build of your app by running the following in your project's root directory:

```bash
npm run build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.

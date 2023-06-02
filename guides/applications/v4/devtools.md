---
title: Devtools
---

{{ PRODUCT_NAME }} Devtools is a widget that helps developers understand how their site interacts with {{ PRODUCT_NAME }}, including:

- Edge and browser caching
- Prefetching
- The flow of responses from serverless to the edge and browser caches

![devtools](/images/devtools/devtools.png?width=300)

[Live demo of {{ PRODUCT_NAME }} Devtools running on a React Storefront site](https://demo.reactstorefront.io/__edgio__/devtools/enable)

<Video src="https://player.vimeo.com/video/691580899" />

## Installation {/*installation*/}

It's likely that Devtools was added to your app when you ran `{{ CLI_NAME }} init`. If that's not the case, or your app predates {{ PRODUCT_NAME }} v2.22.0, follow these steps to add the Devtools to your app:

### Packages {/*packages*/}

In order to enable {{ PRODUCT_NAME }} Devtools, first ensure that the `{{ PACKAGE_NAME }}/devtools` and `{{ PACKAGE_NAME }}/prefetch` packages have been added to your project. To install them using NPM, run:

```bash
npm i -D {{ PACKAGE_NAME }}/devtools {{ PACKAGE_NAME }}/prefetch
```

Or with Yarn

```bash
yarn add --dev {{ PACKAGE_NAME }}/devtools {{ PACKAGE_NAME }}/prefetch
```

### Client Widget {/*client-widget*/}

**Note**: you can skip this step if you are using `{{ PACKAGE_NAME }}/next` or `{{ PACKAGE_NAME }}/nuxt`

Add the following to your client JavaScript bundle:

```js
import installDevtools from '{{ PACKAGE_NAME }}/devtools/install'

installDevtools()
```

Alternatively, you can add the following `script` tag to your app's HTML:

```html
<script defer src="/__layer0__/devtools/install.js"></script>
```

### Service Worker {/*service-worker*/}

Then, if you haven't already, enable `{{ PACKAGE_NAME }}/prefetch` in your service worker. See [Prefetching]({{ DOCS_URL }}/guides/prefetching) for more information on enabling `{{ PACKAGE_NAME }}/prefetch`.

## Enabling or Disabling the Devtools {/*enabling-or-disabling-the-devtools*/}

By default, {{ PRODUCT_NAME }} Devtools is enabled when your app is served from `localhost`, `127.0.0.1` or any `*.layer0-limelight.link` domain.

To customize when {{ PRODUCT_NAME }} Devtools appear:

### Per Environment {/*per-environment*/}

Using the [{{ PRODUCT_NAME }} Developer Console]({{ APP_URL }}), navigate to your environment and create an environment variable named `PREVIEW_{{ PRODUCT_NAME_UPPER }}_DEVTOOLS_ENABLED`. Set the value to `true` or `false` to explicitly enable or disable the Devtools on the given environment.

### Per Browsing Session {/*per-browsing-session*/}

Point your browser to `/__layer0__/devtools/enable` or `/__layer0__/devtools/disable` to explicitly enable or disable {{ PRODUCT_NAME }} Devtools for your browsing session. This takes precedence over the environment config and the domain default.

If the Devtools were previously enabled and you disable them, you may want to remove the service worker to get rid of the Devtools-specific route handlers that were installed on-demand when enabling it. This can be done using the Application tab in Chrome Developer Tools.

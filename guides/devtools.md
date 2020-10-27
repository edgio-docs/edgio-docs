# Devtools

The XDN Devtools is a widget that helps developers understand how their site interacts with the XDN, including:

- Edge and browser caching
- Prefetching
- The flow of responses from serverless to the edge and browser caches

![devtools](/images/devtools/devtools.png?width=275)

[Live demo of XDN Devtools running on a React Storefront site](https://demo.reactstorefront.io/__xdn__/devtools/enable)

## Installation

It's likely that the Devtools was added to your app when you ran `xdn init`. If that's not the case, or your app predates XDN v2.22.0, follow these steps to add the Devtools to your app:

### Packages

In order to enable the XDN Devtools, first ensure that the `@xdn/devtools` and `@xdn/prefetch` packages have been added to your project. To install them using NPM, run:

```
npm i -D @xdn/devtools @xdn/prefetch
```

Or with Yarn:

```
yarn add --dev @xdn/devtools @xdn/prefetch
```

### Client widget

**Note**: you can skip this step if you are using `@xdn/next` or `@xdn/nuxt`

Add the following to your client JavaScript bundle:

```js
import installDevtools from '@xdn/devtools/install'

installDevtools()
```

Alternatively, you can add the following `script` tag to your app's HTML:

```html
  <script defer src="/__xdn__/devtools/install.js"></script>
```

### Service Worker

Then, if you haven't already, enable `@xdn/prefetch` in your service worker. See [Prefetching](https://developer.moovweb.com/guides/prefetching) for more information on enabling `@xdn/prefetch`.

## Enabling or Disabling the Devtools

By default, XDN Devtools is enabled when your app is served from `localhost`, `127.0.0.1` or any `*.moovweb-edge.io` domain.

To customize when the XDN Devtools appear:

### Per Environment

Using the [XDN Developer Console](https://moovweb.app), navigate to your environment and create an environment variable named `PREVIEW_XDN_DEVTOOLS_ENABLED`. Set the value to `true` or `false` to explicitly enable or disable the Devtools on the given environment.

### Per Browsing Session

Point your browser to `/__xdn__/devtools/enable` or `/__xdn__/devtools/disable` to explicitly enable or disable the XDN Devtools for your browsing session. This takes precedence over the environment config and the domain default.

If the Devtools were previously enabled and you disable them, you may want to remove the service worker to get rid of the Devtools-specific route handlers that were installed on-demand when enabling it. This can be done using the Application tab in Chrome Developer Tools.

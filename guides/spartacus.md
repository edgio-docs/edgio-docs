# Creating Spartacus app

The steps below are pulled from the Spartacus official docs, which are published here: https://sap.github.io/spartacus-docs/building-the-spartacus-storefront-from-libraries/

Make sure to install @angular/cli 8. Spartacus does not support 9. `npm install -g @angular/cli@8`

Create an angular app

> When prompted if you would like to add Angular routing, enter n for ‘no’.

```
ng new xdn-spartacus-app --style=scss
cd xdn-spartacus-app
```

Add the Spartacus scaffold via schematic

```
ng add @spartacus/schematics --pwa --ssr
```

Note the PWA and SSR parameters. These are needed for server-side rendering to work properly when deploying on the XDN.

Replace the contents of src/app/app.component.html with:

```html
<cx-storefront>Loading...</cx-storefront>
```

Update `app.module.ts` to include a `baseSite` configuration:

```diff
 B2cStorefrontModule.withConfig({
  backend: {
    occ: {
      baseUrl: 'https://localhost:9002',
      prefix: '/rest/v2/'
    }
  },
+ context: {
+   baseSite: ['electronics-spa']
+ },
  i18n: {
    resources: translations,
    chunks: translationChunksConfig,
    fallbackLang: 'en'
  },
  features: {
    level: '1.5',
    anonymousConsents: true
  }
 }),
```

# Preparing for deployment on the XDN

```
npm install -g @xdn/cli
xdn init
```

The app should now have @xdn dependencies installed and auto-generated `routes.js` and `xdn.config.js` files created by @xdn/angular.

@xdn/angular follows Angular 9 SSR scaffolding so the following changes are necessary to the server build:

1. Modify the `output` block of `webpack.server.config.js` to a UMD library target with `default` export

```diff
output: {
+   libraryTarget: 'umd',
+   libraryExport: 'default',
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
```

2. Have `server.ts` export the Express app and remove server initialization:

```diff
-// Start up the Node server
-app.listen(PORT, () => {
-  console.log(`Node server listening on http://localhost:${PORT}`);
-});
+export default app
```

3. Update `xdn.config.js` to specify the location of the server build:

```diff
"use strict";

// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { join } = require('path')

module.exports = {
  server: {
+   path: join(__dirname, 'dist/server.js')
-   path: join(__dirname, 'dist/xdn-spartacus-app-server/main.js'),
-   export: 'app'
  },
}
```

Configure a backend in `xdn.config.js` with your Commerce API:

```diff
"use strict";

// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { join } = require('path')

module.exports = {
  server: {
    path: join(__dirname, 'dist/server.js')
    export: 'app'
  },
+ backends: {
+   commerce: {
+     domainOrIp: 'aemspartacusapi.tmg.codes',
+     hostHeader: 'aemspartacusapi.tmg.codes',
+   },
+ }
}
```

Configure `routes.js` to proxy API and media requests to the Commerce backend:

```diff
// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { Router } = require('@xdn/core/Router')
const createAngularPlugin = require('@xdn/angular/router/createAngularPlugin')

module.exports = app => {
  const { angularMiddleware } = createAngularPlugin(app)
- return new Router().use(angularMiddleware)
+ return new Router()
+   .match('/rest/v2/*path', ({ proxy }) => {
+     return proxy('commerce')
+   })
+   .match('/medias/*path', ({ proxy }) => {
+     return proxy('commerce')
+   })
+   .use(angularMiddleware)
}
```

Here you can also configure all caching for individual paths.

Configure Commerce baseUrl to point to XDN.

In `app.module.ts`:

```diff
 B2cStorefrontModule.withConfig({
  backend: {
    occ: {
-     baseUrl: 'https://localhost:9002',
+     baseUrl: 'https://YOUR_XDN_DEPLOYMENT_URL'
      prefix: '/rest/v2/'
    }
  },
  context: {
    baseSite: ['electronics-spa']
  },
  i18n: {
    resources: translations,
    chunks: translationChunksConfig,
    fallbackLang: 'en'
  },
  features: {
    level: '1.5',
    anonymousConsents: true
  }
 }),
```

In `ìndex.html`:

```diff
-<meta name="occ-backend-base-url" content="https://localhost:9002" />
+<meta name="occ-backend-base-url" content="https://YOUR_XDN_DEPLOYMENT_URL" />
```

In `environment.prod.ts`:

```diff
environment = {
  production: true,
+ occBaseUrl: 'https://YOUR_XDN_DEPLOYMENT_URL',
};
```

# Deploying to XDN

```
xdn deploy
```

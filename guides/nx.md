# NX

[NX](https://nx.dev/) is a tool for managing monorepos.

This guide shows you how to create a [connector](/guides/connectors) for your [NX](https://nx.dev/) application on the Moovweb XDN.

In the example, we consider that default NX project uses [NextJS](https://nextjs.org/) framework

## 1. Install XDN packages

```sh
yarn add -D @xdn/cli @xdn/core
```

## 2. Add XDN connector files

<em>followed by [Writing a connector](https://developer.moovweb.com/guides/connectors) guide</em>

```js
// xdn/NX_APP.js
const NX_DEFAULT_PROJECT = require('../workspace.json').defaultProject
module.exports = NX_DEFAULT_PROJECT
```

```js
// xdn/connector/build.js
const path = require('path')
const fs = require('fs-extra');
const { DeploymentBuilder } = require('@xdn/core/deploy')
const FrameworkBuildError = require('@xdn/core/errors/FrameworkBuildError')
const NX_APP = require('../NX_APP')
const rootDir = process.cwd()
const distDir = path.join(rootDir, `./dist/apps/${NX_APP}`)
const lambdaDir = path.join(rootDir, './.xdn/lambda')
async function build({ skipFramework }) {
  const builder = new DeploymentBuilder()
  builder.clearPreviousBuildOutput()
  if (!skipFramework) {
    // run the NX build
    try {
      await builder.exec('nx build --prod')
    } catch (e) {
      // this lets the user know that the build error was within their application code, not their XDN router or configuration.
      throw new FrameworkBuildError('NX')
    }
  }
  // include nextjs server files
  await fs.copy(path.join(distDir, '.next'), path.join(lambdaDir, '.next'))
  
  // build the XDN deployment bundle in the .xdn directory
  await builder.build()
}
module.exports = build
```

```js
// xdn/connector/prod.js
const http = require('http')
const url = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
async function prod(port) {
  await app.prepare()
  http.createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = url.parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready`)
  })
}
module.exports = prod
```

## 3. Add XDN router (example)

```js
// xdn/routes.js
const path = require('path')
const { Router } = require('@xdn/core/router')
const NX_APP = require('./NX_APP')
const TIME_1H = 60 * 60;
const TIME_1D = TIME_1H * 24;
const CACHE = {
  edge: {
    maxAgeSeconds: TIME_1D,
    forcePrivateCaching: true,
  },
  browser: {
    maxAgeSeconds: TIME_1D,
    serviceWorkerSeconds: TIME_1D,
  },
};
const distRoot = `./dist/apps/${NX_APP}`
const distPublic = path.join(distRoot, 'public')
const distNext = path.join(distRoot, '.next')
const router = new Router()
// assets
router.get('/star.svg', ({ cache, serveStatic }) => {
  cache(CACHE)
  serveStatic(path.join(distPublic, 'star.svg'))
})
router.get('/nx-logo-white.svg', ({ cache, serveStatic }) => {
  cache(CACHE)
  serveStatic(path.join(distPublic, 'nx-logo-white.svg'))
})
// point nextjs static files
router.get('/_next/static/:path*', ({ cache, serveStatic }) => {
  cache(CACHE)
  serveStatic(`${path.join(distNext, 'static')}/:path*`)
})
// pages
router.get('/', ({ cache, renderWithApp }) => {
  cache(CACHE)
  renderWithApp()
})
// fallback
router.fallback(({ renderWithApp }) => {
  renderWithApp()
})
module.exports = router
```

## 4. Add xdn.config.js

```js
// xdn.config.js
module.exports = {
  connector: './xdn/connector', // use the local connector
  routes: './xdn/routes.js', // the path to your routes file relative to the root of your app
  includeNodeModules: true, // include package.json "dependencies" in the build to be able to run the lambda app on cloud
}
```

## 5. Gitignore XDN build files

```bash
/.xdn
```

## 6. Add XDN scripts in package.json

```json
// package.json
  // ...
  "xdn:build": "xdn build",
  "xdn:run": "xdn run --production",
  "xdn:deploy": "xdn deploy --skip-build"
  // ...
```

<hr>
<i>Now you're ready to develop your app for XDN. Use the following commands to do that:</i>

## Development: run NX app

```sh
yarn start
```

## Build

```sh
yarn xdn:build
```

## Production: run XDN app

```sh
yarn xdn:run
```

## Deployment: XDN

```sh
yarn xdn:deploy
```

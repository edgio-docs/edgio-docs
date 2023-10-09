---
title: Vue Storefront 1
---

## Example Site {/*example-site*/}

<ExampleButtons
  title="VSF1"
  repoUrl="https://github.com/layer0-docs/layer0-vue-storefront-example" 
  deployFromRepo />

## 1. Install Vue Storefront {/*1-install-vue-storefront*/}

Install the Vue Storefront application using this guide: https://docs.vuestorefront.io/guide/installation/linux-mac.html

<b>Note</b>: {{ PRODUCT_NAME }} requires Node version >= 14, so before the installation it's recommended to run:

```bash
nvm use 14
```

## 2. Prepare VSF files for {{ PRODUCT_NAME }} {/*2-prepare-vsf-files-for-layer0*/}

- In the new VSF project, go to `src/themes/default` (or any theme you're using) and remove `.git` folder from it to save that in Git VCS.
- Go to `.gitignore` file and remove `config/local.json` line to keep it tracked.

## 3. Install {{ PRODUCT_NAME }} {/*3-install-layer0*/}

- Install {{ PRODUCT_NAME }} packages: `yarn add -D -W {{ PACKAGE_NAME }}/cli && yarn add -W {{ PACKAGE_NAME }}/core {{ PACKAGE_NAME }}/prefetch {{ PACKAGE_NAME }}/devtools`
- Create a file called `{{ CONFIG_FILE }}` in the root directory of your project and configure your origin and images hosts as backends. For example:

```js
module.exports = {
  routes: './{{ PRODUCT_NAME_LOWER }}/routes.js',
  backends: {
    origin: {
      domainOrIp: 'demo.vuestorefront.io',
      hostHeader: 'demo.vuestorefront.io',
    },
  },
  connector: './{{ PRODUCT_NAME_LOWER }}',
  includeNodeModules: true,
  includeFiles: {
    './dist-{{ PRODUCT_NAME_LOWER }}-server/server.js': true,
    './dist': true,
    './config/default.json': 'config/production.json',
  },
}
```

- Create `{{ PRODUCT_NAME_LOWER }}/service-worker.js`, which will contain the source code for your service worker:

```js
import { Prefetcher } from '{{ PACKAGE_NAME }}/prefetch/sw'
import { clientsClaim, skipWaiting } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

skipWaiting()
clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

new Prefetcher().route()
```

- Create `{{ PRODUCT_NAME_LOWER }}/browser.js` with the following content:

```js
import install from '{{ PACKAGE_NAME }}/prefetch/window/install'
import installDevtools from '{{ PACKAGE_NAME }}/devtools/install'

document.addEventListener('DOMContentLoaded', () => {
  install()
  installDevtools()
})
```

- Create `{{ PRODUCT_NAME_LOWER }}/routes.js`. Here you will configure caching for each route in your application. Here is an example:

```js
import { CACHE_ASSETS, CACHE_PAGES } from './cache'
import { Router } from '{{ PACKAGE_NAME }}/core/router'
import { BACKENDS } from '{{ PACKAGE_NAME }}/core/constants'

const DIST_APP = 'dist'
const DIST_{{ PRODUCT_NAME_UPPER }}_CLIENT = 'dist-{{ PRODUCT_NAME_LOWER }}-client'
const DIST_{{ PRODUCT_NAME_UPPER }}_ASSETS = 'dist-{{ PRODUCT_NAME_LOWER }}-assets'

const SPLAT = ':path*'
const SUFFIX_SPLAT = `:suffix/${SPLAT}`

const router = new Router()

const pages = [
  // home
  `/`,
  // plp
  `/men.html`,
  `/men${SUFFIX_SPLAT}`,
  `/women.html`,
  `/women${SUFFIX_SPLAT}`,
  `/gear.html`,
  `/gear${SUFFIX_SPLAT}`,
  `/training.html`,
  `/training${SUFFIX_SPLAT}`,
  // other
  `/sale`,
  `/sale${SUFFIX_SPLAT}`,
  `/about-us`,
  `/about-us${SUFFIX_SPLAT}`,
  `/i/about-us`,
  `/i/about-us${SUFFIX_SPLAT}`,
  `/i/customer-service`,
  `/i/customer-service${SUFFIX_SPLAT}`,
  `/store-locator`,
  `/store-locator${SUFFIX_SPLAT}`,
  `/delivery`,
  `/delivery${SUFFIX_SPLAT}`,
  `/returns`,
  `/returns${SUFFIX_SPLAT}`,
  `/privacy`,
  `/privacy${SUFFIX_SPLAT}`,
  `/size-guide`,
  `/size-guide${SUFFIX_SPLAT}`,
  `/contact`,
  `/contact${SUFFIX_SPLAT}`,
  // pdp
  `/abominable-${SUFFIX_SPLAT}`,
  `/adrienne-${SUFFIX_SPLAT}`,
  `/advanced-${SUFFIX_SPLAT}`,
  `/aeon-${SUFFIX_SPLAT}`,
  `/aero-${SUFFIX_SPLAT}`,
  `/aether-${SUFFIX_SPLAT}`,
  `/affirm-${SUFFIX_SPLAT}`,
  `/aim-${SUFFIX_SPLAT}`,
  `/ajax-${SUFFIX_SPLAT}`,
  `/ana-${SUFFIX_SPLAT}`,
  `/angel-${SUFFIX_SPLAT}`,
  `/antonia-${SUFFIX_SPLAT}`,
  `/apollo-${SUFFIX_SPLAT}`,
  `/arcadio-${SUFFIX_SPLAT}`,
  `/argus-${SUFFIX_SPLAT}`,
  `/ariel-${SUFFIX_SPLAT}`,
  `/artemis-${SUFFIX_SPLAT}`,
  `/atlas-${SUFFIX_SPLAT}`,
  `/atomic-${SUFFIX_SPLAT}`,
  `/augusta-${SUFFIX_SPLAT}`,
  `/autumn-${SUFFIX_SPLAT}`,
  `/bag/endeavor-${SUFFIX_SPLAT}`,
  `/balboa-${SUFFIX_SPLAT}`,
  `/bardot-${SUFFIX_SPLAT}`,
  `/beaumont-${SUFFIX_SPLAT}`,
  `/beginner-${SUFFIX_SPLAT}`,
  `/bella-${SUFFIX_SPLAT}`,
  `/bess-${SUFFIX_SPLAT}`,
  `/bolo-${SUFFIX_SPLAT}`,
  `/breathe-${SUFFIX_SPLAT}`,
  `/bruno-${SUFFIX_SPLAT}`,
  `/caesar-${SUFFIX_SPLAT}`,
  `/carina-${SUFFIX_SPLAT}`,
  `/cassia-${SUFFIX_SPLAT}`,
  `/cassius-${SUFFIX_SPLAT}`,
  `/celeste-${SUFFIX_SPLAT}`,
  `/chaz-${SUFFIX_SPLAT}`,
  `/chloe-${SUFFIX_SPLAT}`,
  `/circe-${SUFFIX_SPLAT}`,
  `/clamber-${SUFFIX_SPLAT}`,
  `/cobalt-${SUFFIX_SPLAT}`,
  `/compete-${SUFFIX_SPLAT}`,
  `/cora-${SUFFIX_SPLAT}`,
  `/cronus-${SUFFIX_SPLAT}`,
  `/crown-${SUFFIX_SPLAT}`,
  `/cruise-${SUFFIX_SPLAT}`,
  `/daphne-${SUFFIX_SPLAT}`,
  `/daria-${SUFFIX_SPLAT}`,
  `/dash-${SUFFIX_SPLAT}`,
  `/deion-${SUFFIX_SPLAT}`,
  `/deirdre-${SUFFIX_SPLAT}`,
  `/desiree-${SUFFIX_SPLAT}`,
  `/diana-${SUFFIX_SPLAT}`,
  `/didi-${SUFFIX_SPLAT}`,
  `/diva-${SUFFIX_SPLAT}`,
  `/driven-${SUFFIX_SPLAT}`,
  `/dual-${SUFFIX_SPLAT}`,
  `/echo-${SUFFIX_SPLAT}`,
  `/electra-${SUFFIX_SPLAT}`,
  `/elisa-${SUFFIX_SPLAT}`,
  `/emma-${SUFFIX_SPLAT}`,
  `/endurance-${SUFFIX_SPLAT}`,
  `/eos-${SUFFIX_SPLAT}`,
  `/erica-${SUFFIX_SPLAT}`,
  `/erikssen-${SUFFIX_SPLAT}`,
  `/fiona-${SUFFIX_SPLAT}`,
  `/frankie-${SUFFIX_SPLAT}`,
  `/fusion-${SUFFIX_SPLAT}`,
  `/gabrielle-${SUFFIX_SPLAT}`,
  `/geo-${SUFFIX_SPLAT}`,
  `/go-${SUFFIX_SPLAT}`,
  `/gobi-${SUFFIX_SPLAT}`,
  `/grayson-${SUFFIX_SPLAT}`,
  `/gwen-${SUFFIX_SPLAT}`,
  `/gwyn-${SUFFIX_SPLAT}`,
  `/harmony-${SUFFIX_SPLAT}`,
  `/hawkeye-${SUFFIX_SPLAT}`,
  `/helena-${SUFFIX_SPLAT}`,
  `/helios-${SUFFIX_SPLAT}`,
  `/hera-${SUFFIX_SPLAT}`,
  `/hollister-${SUFFIX_SPLAT}`,
  `/hyperion-${SUFFIX_SPLAT}`,
  `/ida-${SUFFIX_SPLAT}`,
  `/impulse-${SUFFIX_SPLAT}`,
  `/ina-${SUFFIX_SPLAT}`,
  `/inez-${SUFFIX_SPLAT}`,
  `/ingrid-${SUFFIX_SPLAT}`,
  `/iris-${SUFFIX_SPLAT}`,
  `/jade-${SUFFIX_SPLAT}`,
  `/josie-${SUFFIX_SPLAT}`,
  `/joust-${SUFFIX_SPLAT}`,
  `/juliana-${SUFFIX_SPLAT}`,
  `/juno-${SUFFIX_SPLAT}`,
  `/jupiter-${SUFFIX_SPLAT}`,
  `/karissa-${SUFFIX_SPLAT}`,
  `/karmen-${SUFFIX_SPLAT}`,
  `/kenobi-${SUFFIX_SPLAT}`,
  `/kratos-${SUFFIX_SPLAT}`,
  `/lando-${SUFFIX_SPLAT}`,
  `/layla-${SUFFIX_SPLAT}`,
  `/leah-${SUFFIX_SPLAT}`,
  `/lifelong-${SUFFIX_SPLAT}`,
  `/livingston-${SUFFIX_SPLAT}`,
  `/logan-${SUFFIX_SPLAT}`,
  `/lono-${SUFFIX_SPLAT}`,
  `/lucia-${SUFFIX_SPLAT}`,
  `/luma-${SUFFIX_SPLAT}`,
  `/mach-${SUFFIX_SPLAT}`,
  `/marco-${SUFFIX_SPLAT}`,
  `/mars-${SUFFIX_SPLAT}`,
  `/maxima-${SUFFIX_SPLAT}`,
  `/maya-${SUFFIX_SPLAT}`,
  `/meteor-${SUFFIX_SPLAT}`,
  `/miko-${SUFFIX_SPLAT}`,
  `/mimi-${SUFFIX_SPLAT}`,
  `/minerva-${SUFFIX_SPLAT}`,
  `/mona-${SUFFIX_SPLAT}`,
  `/montana-${SUFFIX_SPLAT}`,
  `/nadia-${SUFFIX_SPLAT}`,
  `/neve-${SUFFIX_SPLAT}`,
  `/nona-${SUFFIX_SPLAT}`,
  `/nora-${SUFFIX_SPLAT}`,
  `/olivia-${SUFFIX_SPLAT}`,
  `/orestes-${SUFFIX_SPLAT}`,
  `/orion-${SUFFIX_SPLAT}`,
  `/oslo-${SUFFIX_SPLAT}`,
  `/overnight-${SUFFIX_SPLAT}`,
  `/phoebe-${SUFFIX_SPLAT}`,
  `/pierce-${SUFFIX_SPLAT}`,
  `/portia-${SUFFIX_SPLAT}`,
  `/prima-${SUFFIX_SPLAT}`,
  `/primo-${SUFFIX_SPLAT}`,
  `/proteus-${SUFFIX_SPLAT}`,
  `/pursuit-${SUFFIX_SPLAT}`,
  `/push-${SUFFIX_SPLAT}`,
  `/quest-${SUFFIX_SPLAT}`,
  `/radiant-${SUFFIX_SPLAT}`,
  `/rapha-${SUFFIX_SPLAT}`,
  `/riona-${SUFFIX_SPLAT}`,
  `/rival-${SUFFIX_SPLAT}`,
  `/rocco-${SUFFIX_SPLAT}`,
  `/ryker-${SUFFIX_SPLAT}`,
  `/sahara-${SUFFIX_SPLAT}`,
  `/savvy-${SUFFIX_SPLAT}`,
  `/selene-${SUFFIX_SPLAT}`,
  `/set-${SUFFIX_SPLAT}`,
  `/sinbad-${SUFFIX_SPLAT}`,
  `/sol-${SUFFIX_SPLAT}`,
  `/solo-${SUFFIX_SPLAT}`,
  `/sparta-${SUFFIX_SPLAT}`,
  `/sprite-${SUFFIX_SPLAT}`,
  `/stark-${SUFFIX_SPLAT}`,
  `/stellar-${SUFFIX_SPLAT}`,
  `/strike-${SUFFIX_SPLAT}`,
  `/strive-${SUFFIX_SPLAT}`,
  `/summit-${SUFFIX_SPLAT}`,
  `/supernova-${SUFFIX_SPLAT}`,
  `/sybil-${SUFFIX_SPLAT}`,
  `/sylvia-${SUFFIX_SPLAT}`,
  `/taurus-${SUFFIX_SPLAT}`,
  `/teton-${SUFFIX_SPLAT}`,
  `/thorpe-${SUFFIX_SPLAT}`,
  `/tiberius-${SUFFIX_SPLAT}`,
  `/tiffany-${SUFFIX_SPLAT}`,
  `/torque-${SUFFIX_SPLAT}`,
  `/tristan-${SUFFIX_SPLAT}`,
  `/troy-${SUFFIX_SPLAT}`,
  `/typhon-${SUFFIX_SPLAT}`,
  `/viktor-${SUFFIX_SPLAT}`,
  `/voyage-${SUFFIX_SPLAT}`,
  `/vulcan-${SUFFIX_SPLAT}`,
  `/wayfarer-${SUFFIX_SPLAT}`,
  `/yoga-${SUFFIX_SPLAT}`,
  `/zeppelin-${SUFFIX_SPLAT}`,
  `/zing-${SUFFIX_SPLAT}`,
  `/zoe-${SUFFIX_SPLAT}`,
  `/zoltan-${SUFFIX_SPLAT}`,
]

// Prevent search engine bot(s) from indexing
// Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
router.noIndexPermalink()

// static prerendering
router.prerender(pages.filter(page => !page.includes(SPLAT)).map((i) => ({ path: i })))

// {{ PRODUCT_NAME_LOWER }} static files
router.get('/service-worker.js', ({ serviceWorker, cache }) => {
  cache(CACHE_ASSETS)
  serviceWorker(`${DIST_{{ PRODUCT_NAME_UPPER }}_CLIENT}/service-worker.js`)
})
router.get('/main.js', ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS)
  serveStatic(`${DIST_{{ PRODUCT_NAME_UPPER }}_CLIENT}/browser.js`)
})

// assets
router.get(`/dist/${SPLAT}`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS)
  serveStatic(`${DIST_APP}/${SPLAT}`)
})
router.get(`/assets/${SPLAT}`, ({ serveStatic, cache }) => {
  cache(CACHE_ASSETS)
  serveStatic(`${DIST_{{ PRODUCT_NAME_UPPER }}_ASSETS}/${SPLAT}`)
})
router.get(`/img/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_ASSETS)
  proxy('origin')
})

// api
router.get(`/api/catalog/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_PAGES)
  proxy('origin')
})
router.get(`/api/stock/${SPLAT}`, ({ proxy, cache }) => {
  cache(CACHE_PAGES)
  proxy('origin')
})

// pages
pages.forEach(page => {
  router.get(page, ({ cache, renderWithApp }) => {
    cache(CACHE_PAGES)
    renderWithApp()
  })
})

// fallback
router.fallback(({ renderWithApp }) => {
  renderWithApp()
})

export default router
```

- Add `{{ PRODUCT_NAME_LOWER }}/cache.js` file. For example:

```js
const TIME_1H = 60 * 60
const TIME_4H = TIME_1H * 4
const TIME_1D = TIME_1H * 24
/**
 * The default cache setting for pages in the shopping flow
 */
export const CACHE_PAGES = {
  edge: {
    maxAgeSeconds: TIME_4H,
    forcePrivateCaching: true,
    staleWhileRevalidateSeconds: TIME_1H, // this way stale items can still be prefetched
  },
  browser: {
    maxAgeSeconds: TIME_4H,
    serviceWorkerSeconds: TIME_4H,
  },
}
/**
 * The default cache setting for static assets like JS, CSS, and images.
 */
export const CACHE_ASSETS = {
  edge: {
    maxAgeSeconds: TIME_1D,
    forcePrivateCaching: true,
    staleWhileRevalidateSeconds: TIME_1H, // this way stale items can still be prefetched
  },
  browser: {
    maxAgeSeconds: TIME_1D,
    serviceWorkerSeconds: TIME_1D,
  },
}
```

- Create `{{ PRODUCT_NAME_LOWER }}/webpack.{{ PRODUCT_NAME_LOWER }}.client.config.js`. This webpack configuration will bundle the service worker and the code to install it when the app loads in the browser.

```js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    browser: './{{ PRODUCT_NAME_LOWER }}/browser.js',
    'service-worker': './{{ PRODUCT_NAME_LOWER }}/service-worker.js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist-{{ PRODUCT_NAME_LOWER }}'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG_SW': JSON.stringify(process.env.DEBUG_SW || false),
    }),
  ],
}
```

- Add `{{ PRODUCT_NAME_LOWER }}/prod.js`:

```js
const { createServer } = require('http')
const { join } = require('path')

module.exports = function prod(port) {
  const server = require(join(process.cwd(), 'dist-{{ PRODUCT_NAME_LOWER }}-server', 'server.js'))
    .default
  return new Promise(resolve => createServer(server).listen(port, resolve))
}
```

- Add `core/build/webpack.{{ PRODUCT_NAME_LOWER }}.config.ts` file:

```ts
import { buildLocaleIgnorePattern } from '@vue-storefront/i18n/helpers'
import path from 'path'
import fs from 'fs'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import dayjs from 'dayjs'
import config from 'config'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// eslint-disable-next-line import/first
import themeRoot from './theme-path'

const themesRoot = '../../src/themes'
const themeResources = themeRoot + '/resource'
const themeCSS = themeRoot + '/css'
const themeApp = themeRoot + '/App.vue'
const themedIndex = path.join(themeRoot, '/templates/index.template.html')
const themedIndexMinimal = path.join(themeRoot, '/templates/index.minimal.template.html')
const themedIndexBasic = path.join(themeRoot, '/templates/index.basic.template.html')
const themedIndexAmp = path.join(themeRoot, '/templates/index.amp.template.html')
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: loader => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        flexbox: 'no-2009',
      }),
    ],
  },
}
var nodeModules = {}
fs.readdirSync(path.resolve(__dirname, '../../node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })
const isProd = process.env.NODE_ENV === 'production'
// todo: usemultipage-webpack-plugin for multistore
export default {
  plugins: [
    new webpack.ContextReplacementPlugin(/dayjs[/\\]locale$/, buildLocaleIgnorePattern()),
    new webpack.ProgressPlugin(),
    /* new BundleAnalyzerPlugin({
      generateStatsFile: true
    }), */
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.__APPVERSION__': JSON.stringify(require('../../package.json').version),
      'process.env.__BUILDTIME__': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
    }),
    // Server
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"',
    }),
    // define `config` package
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
  ],
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../../dist-{{ PRODUCT_NAME_LOWER }}-server'),
    publicPath: '/dist-{{ PRODUCT_NAME_LOWER }}-server/',
    filename: 'server.js',
    libraryTarget: 'commonjs',
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, themesRoot)],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, themesRoot)],
    extensions: ['.js', '.vue', '.gql', '.graphqls', '.ts'],
    alias: {
      // Main aliases
      // 'config': path.resolve(__dirname, './config.json'),
      src: path.resolve(__dirname, '../../src'),
      // Theme aliases
      theme: themeRoot,
      'theme/app': themeApp,
      'theme/css': themeCSS,
      'theme/resource': themeResources,
      // Backward compatible
      '@vue-storefront/core/lib/store/multistore': path.resolve(__dirname, '../lib/multistore.ts'),
      'src/modules/order-history/components/UserOrders': path.resolve(
        __dirname,
        '../../core/modules/order/components/UserOrdersHistory',
      ),
      '@vue-storefront/core/modules/social-share/components/WebShare': path.resolve(
        __dirname,
        '../../src/themes/default/components/theme/WebShare.vue',
      ),
      '@vue-storefront/core/helpers/initCacheStorage': path.resolve(
        __dirname,
        '../lib/storage-manager.ts',
      ),

      // Server aliases
      'create-api': './create-api-server.js',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue,ts)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /test/],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          postcss: [autoprefixer()],
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../../node_modules/@vue-storefront'),
          path.resolve(__dirname, '../../src'),
          path.resolve(__dirname, '../../core'),
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', postcssConfig],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', postcssConfig, 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          postcssConfig,
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=10000',
      },
      {
        test: /\.(graphqls|gql)$/,
        exclude: /node_modules/,
        loader: ['graphql-tag/loader'],
      },
      // {
      //   test: /core\/build\/config\.json$/,
      //   loader: path.resolve('core/build/purge-config.js')
      // }
    ],
  },
  // Server
  mode: 'production',
  devtool: 'sourcemap',
  optimization: {
    minimize: false,
  },
  // isClient: false,
  // isDev: false,
  target: 'node',
  entry: ['@babel/polyfill', './core/scripts/server.ts'],
  externals: nodeModules,
}
```

- Add `{{ PRODUCT_NAME_LOWER }}:*` scripts into `package.json` file:

```json
...
"{{ PRODUCT_NAME_LOWER }}:build:server": "cross-env NODE_ENV=production TS_NODE_PROJECT=\"tsconfig-build.json\" webpack --config ./core/build/webpack.{{ PRODUCT_NAME_LOWER }}.config.ts --mode production --hide-modules",
"{{ PRODUCT_NAME_LOWER }}:build:assets": "ncp ./src/themes/default/assets ./dist-{{ PRODUCT_NAME_LOWER }}-assets",
"{{ PRODUCT_NAME_LOWER }}:build:client": "cross-env NODE_ENV=production webpack --progress --config {{ PRODUCT_NAME_LOWER }}/webpack.{{ PRODUCT_NAME_LOWER }}.client.config.js && {{ CLI_NAME }} build",
"{{ PRODUCT_NAME_LOWER }}:build": "yarn {{ PRODUCT_NAME_LOWER }}:build:server && yarn {{ PRODUCT_NAME_LOWER }}:build:assets && yarn {{ PRODUCT_NAME_LOWER }}:build:client",
"{{ PRODUCT_NAME_LOWER }}:clean": "rimraf dist-{{ PRODUCT_NAME_LOWER }}-assets && rimraf dist-{{ PRODUCT_NAME_LOWER }}-client && rimraf dist-{{ PRODUCT_NAME_LOWER }}-server && rimraf .{{ PRODUCT_NAME_LOWER }}",
"{{ PRODUCT_NAME_LOWER }}:start:prod": "{{ CLI_NAME }} run --production",
"{{ PRODUCT_NAME_LOWER }}:deploy": "{{ CLI_NAME }} deploy --team=my-team --skip-build",
...
```

- Ignore {{ PRODUCT_NAME }} build in `.gitignore`:

```bash
# {{ PRODUCT_NAME }}
/dist-{{ PRODUCT_NAME_LOWER }}-assets
/dist-{{ PRODUCT_NAME_LOWER }}-client
/dist-{{ PRODUCT_NAME_LOWER }}-server
/.{{ PRODUCT_NAME_LOWER }}
```

- Find all `*.template.html` files in VSF app and add {{ PRODUCT_NAME }} scripts into `<head>` there:

```html
<!-- {{ PRODUCT_NAME }} -->
<script src="/service-worker.js" defer></script>
<script src="/__{{ PRODUCT_NAME_LOWER }}__/cache-manifest.js" defer></script>
<script src="/main.js" defer></script>
<script src="/__{{ PRODUCT_NAME_LOWER }}__/devtools/install.js" defer></script>
```

- Finally, you are ready to build and deploy the app:

```bash
yarn build
yarn {{ PRODUCT_NAME_LOWER }}:build
yarn {{ PRODUCT_NAME_LOWER }}:deploy
```

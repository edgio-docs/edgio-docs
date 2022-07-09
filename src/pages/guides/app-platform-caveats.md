---
title: {{ PRODUCT_NAME }} Caveats
---

This guide covers caveats specific to {{ PRODUCT_NAME }}.

## NodeJS native extensions {/*nodejs-native-extensions*/}

In a lof of scenarios, NodeJS native extensions might be required to perform specific tasks related to your application.
For example, you might need to use [OpenCV](https://github.com/peterbraden/node-opencv) to perform some checks on an image before making it publicly available.
Or you might need to use extensions like [`node-microtime`](https://github.com/wadey/node-microtime) for finer-grained performance analysis.

When {{ PRODUCT_NAME }} bundles your application for deployment, we also do some "tree-shaking" to remove unnecessary files in your build.
This makes the bundle size smaller and more efficient to load on our serverless platform during a cold-start.
But it could have unintended consequences where we might strip away native extension binaries required for your
application to function.

If that is the case, you might encounter an error like the following when trying to use modules that depend on the native binaries.
```
Error: No native build was found for runtime=node abi=83 platform=linuxglibc arch=x64
at Function.load.path (/var/task/node_modules/microtime/node_modules/node-gyp-build/index.js:59:9)
at load (/var/task/node_modules/microtime/node_modules/node-gyp-build/index.js:19:30)
at Object.<anonymous> (/var/task/node_modules/microtime/index.js:1:43)
at Module._compile (internal/modules/cjs/loader.js:1085:14)
at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
at Module.load (internal/modules/cjs/loader.js:950:32)
at Function.Module._load (internal/modules/cjs/loader.js:790:12)
at Module.require (internal/modules/cjs/loader.js:974:19)
at require (internal/modules/cjs/helpers.js:101:18)
at Object.<anonymous> (/var/task/node_modules/broadcast-channel/dist/es5node/methods/node.js:57:41)
```

To fix this issue, you need to instruct {{ PRODUCT_NAME }} to include the binary files that your application requires.
This can be done by using the [`includeFiles` property  in `{{ CONFIG_FILE }}`](/guides/layer0_config#includefiles) like so:
```js
includeFiles: {
  'node_modules/microtime/**/*': true,
},
```
Or you could choose to bundle everything in the packages listed in the `dependencies` property of `package.json` by using
[`includeNodeModules` property](/guides/layer0_config#includenodemodules).


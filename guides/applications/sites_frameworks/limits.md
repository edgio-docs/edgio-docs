---
title: Limits
---

{{ PRODUCT }} {{ PRODUCT_PLATFORM }}'s limits and caveats are listed below.

- You may need to [manually include NodeJS addons (aka native extensions).](#nodejs-native-extensions)
- Your code will only be granted [read-only access to the file system.](#readonly-filesystem-in-serverless-runtime)
- [Your project's bundle size](#serverless-bundle-size-limitation) cannot exceed 50 MB compressed or 250 MB uncompressed.
- Our serverless functions have a maximum runtime of 20 seconds per request. The response for a function that exceeds this limit is a [539 Project Timeout](/applications/performance/response#exclusive-status-codes).
- Our Serverless Compute workers are allowed to generate a response body with a maximum file size of 6 MB.
- Your project must comply with all applicable [{{ PRODUCT }} {{ PRODUCT_EDGE }} limitations.](/applications/performance/limits)

## NodeJS native extensions {/* nodejs-native-extensions */}

In a lot of scenarios, NodeJS native extensions might be required in order to perform specific tasks related to your application.
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

<Condition version="<7">

To fix this issue, you need to instruct {{ PRODUCT_NAME }} to include the binary files that your application requires.
This can be done by using the [`includeFiles` property in `{{ CONFIG_FILE }}`](/applications/basics/edgio_config#includefiles) like so:

```js
includeFiles: {
  'node_modules/microtime/**/*': true,
}
```

Or you could choose to bundle everything in the packages listed in the `dependencies` property of `package.json` by using
[`includeNodeModules` property](/applications/basics/edgio_config#includenodemodules).

</Condition>

<Condition version="7">

To fix this issue, you need to instruct {{ PRODUCT_NAME }} to include the binary files that your application requires.
This can be done by using the [`serverless.includeFiles` property in `{{ CONFIG_FILE }}`](/applications/performance/cdn_as_code/edgio_config#serverless) like so:

```js
serverless: {includeFiles: {
  'node_modules/microtime/**/*': true,
}}
```

Or you could choose to bundle everything in the packages listed in the `dependencies` property of `package.json` by using
[`serverless.includeNodeModules` property](/applications/performance/cdn_as_code/edgio_config#serverless).

</Condition>

## Readonly filesystem in serverless runtime {/* readonly-filesystem-in-serverless-runtime */}

Web developers often use the filesystem as a temporary data source for their applications. That includes creating and/or
manipulating files based on user requests. For example, storing user uploaded files locally and stripping metadata
before proceeding. But this can open up security vulnerabilities where a bug in the application can be used to modify
the application itself.

So, as a best practice {{ PRODUCT_NAME }} {{ PRODUCT_PLATFORM }} does not allow you to change the content of application files on
the filesystem during runtime. If you need to modify an application file, you must make those changes locally and make
a new deployment. This limits the attack surface of your potential application vulnerabilities. It also allows us to
make your application more distributed and resilient to outages. {{ PRODUCT_NAME }} takes your application code and
deploys it to multiple regions with a read-only filesystem. This way, if the primary availability zone or region is
unavailable, your application will still be accessible from another region.

{{ PRODUCT_NAME }} {{ PRODUCT_PLATFORM }} runs your application in `/var/task` directory. If you attempt to write a file in that
directory, you may come across an error like the following:

```
EROFS: read-only file system, open '/var/task/temp-upload.jpg'
```

To resolve issues like this you can use "tmp" directory to store any temporary files. But this directory might be
different on you local environment vs {{ PRODUCT_NAME }} serverless runtime. So, following is a good way to write code
that will work on your local machine as well as {{ PRODUCT_NAME }} serverless runtime.

```js
import {tmpdir} from 'os';
import * as path from 'path';
const tmpFilePath = path.join(tmpdir(), 'temp-upload.jpg');
```

Another thing to keep in mind is that "tmp" directory is ephemeral, meaning that it gets reset/recycled. If you store a
file in "tmp", it most likely won’t be available in the next request. That’s why you’ll need to use external services
to store permanent file storage. These external services can be Amazon S3, Google Cloud Storage, or any other storage service.

## Serverless Bundle Size Limitation {/* serverless-bundle-size-limitation */}

{{ PRODUCT }} has a serverless bundle limit for your project of 50 MB (250 MB uncompressed). If your deployment to {{ PRODUCT }} fails due to exceeding the bundle limit, you will see the following error message:

```
2022-08-08T13:47:13Z - internal error - Error in xdn-deploy-lambda: Your production build exceeds the maximum allowed size of 50 MB (compressed) / 250 MB (uncompressed).
The current size is 51.19 MB (compressed).
Please ensure that list of dependencies in package.json contains only those packages that are needed at runtime.
Move all build-time dependencies such as webpack, babel, etc... to devDependencies, rerun npm | yarn install, and try to deploy again.
```

Following are the possible fixes that would help you reduce serverless bundle size by better engineering. If none of these does it, feel free to raise an issue on [{{ PRODUCT }} Forums]({{ FORUM_URL }}).

### [1]: Segregating devDependencies from dependencies {/* possible-fix-1-segregating-devdependencies-from-dependencies */}

Typically, this is due to node_modules marked as `dependencies` when they are more appropriate in `devDependencies` within the `package.json` file. Modules marked as dependencies will be included in the serverless bundle. Dev-only modules such as `babel`, `jest`, `webpack`, etc. should be moved to `devDependencies` as shown:

```diff
"dependencies": {
  "@nuxtjs/sitemap": "2.4.0",
  "@nuxt/core": "2.15.7"
-   "babel": "7.12.7",
-   "jest": "28.1.3"
+ },
+ "devDependencies": {
+   "babel": "7.12.7",
+   "jest": "28.1.3"
}
```

### [2]: Segregating assets from serverless bundle {/* possible-fix-2-segregating-assets-from-serverless-bundle */}

Additionally, this can be related to assets (such as fonts or images) that are imported into your project code. These resources are typically better referenced as static assets which are stored outside of the serverless bundle.

You can remedy this by creating a `public` directory in the root of your project. Move all of your font and image assets to this path. Then, create a route in `routes.js` to serve those requests as static assets using the following as an example:

```javascript
router.get('/assets/:path*', ({serveStatic}) => {
  serveStatic('public/:path*');
});
```

Now, you can update your code references from importing the assets to referencing the static path, such as:

```diff
- import myImage from 'public/images/Image1.png'
...
- <div><img src={myImage}/></div>
+ <div><img src="/assets/images/Image1.png"/></div>
```

### [3]: Computing which node_modules be included in the serverless bundle {/* possible-fix-3-computing-which-node_modules-be-included-in-the-serverless-bundle */}

It might be possible, that [[1]](#possible-fix-1-segregating-devdependencies-from-dependencies) reduces your serverless bundle size, but not reduce it to less than 50 MB (250 MB Uncompresssed). Another way to identify which dependencies would be required in the runtime is to use `@vercel/nft` package (a "Node.js dependency tracing utility").

Step 1. Install `@vercel/nft` as devDependency:

```bash
npm i -D @vercel/nft
```

Step 2. Create a file named `setNodeModules.js` in the root directory of your project with the following code:

```javascript
const fs = require('fs');
const {nodeFileTrace} = require('@vercel/nft');

const setNodeModules = async () => {
  // Enter an entry point to the app, for example in Nuxt(2), the whole app inside core.js
  const files = ['./node_modules/@nuxt/core/dist/core.js'];
  // Compute file trace
  const {fileList} = await nodeFileTrace(files);
  // Store set of packages
  let packages = {};
  fileList.forEach((i) => {
    if (i.includes('node_modules/')) {
      let temp = i.replace('node_modules/', '');
      temp = temp.substring(0, temp.indexOf('/'));
      packages[`node_modules/${temp}`] = true;
    } else {
      packages[i] = true;
    }
  });
  // Sort the set of packages to maintain differences with git
  fs.writeFileSync(
    './getNodeModules.js',
    `module.exports=${JSON.stringify(
      Object.keys(packages)
        .sort()
        .reduce((obj, key) => {
          obj[key] = packages[key];
          return obj;
        }, {})
    )}`
  );
};

setNodeModules();
```

Step 3. Change your existing `package.json` to have `node setNodeModules.js` before each command as follows:

```diff
- "{{ PRODUCT_NAME_LOWER }}:dev": "{{ FULL_CLI_NAME }} dev",
- "{{ PRODUCT_NAME_LOWER }}:build": "{{ FULL_CLI_NAME }} build",
- "{{ PRODUCT_NAME_LOWER }}:deploy": "{{ FULL_CLI_NAME }} deploy"

+ "{{ PRODUCT_NAME_LOWER }}:dev": "node setNodeModules.js && {{ FULL_CLI_NAME }} dev",
+ "{{ PRODUCT_NAME_LOWER }}:build": "node setNodeModules.js && {{ FULL_CLI_NAME }} build",
+ "{{ PRODUCT_NAME_LOWER }}:deploy": "node setNodeModules.js && {{ FULL_CLI_NAME }} deploy"
```

Step 4. Change your `{{ CONFIG_FILE }}` to have:

<Condition version="<7">

```js
// {{ DOCS_URL }}/guides/basics/edgio_config
module.exports = {
  includeFiles: require('./getNodeModules'),
};
```

</Condition>

<Condition version="7">

```js
// {{ DOCS_URL }}/guides/performance/cdn_as_code/edgio_config
module.exports = {
  serverless: {
    includeFiles: require('./getNodeModules'),
  },
};
```

</Condition>

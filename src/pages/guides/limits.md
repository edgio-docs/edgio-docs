---
title: Limits and Caveats
---

## {{ PRODUCT_NAME }} Platform Limits {/*layer0-platform-limits*/}

This guide describes caveats and limits of {{ PRODUCT_NAME }} platform as applied to all projects running on it.

### Legend {/*legend*/}

- `Kb` stands for kilobytes and means 1,024 bytes (2^10 bytes)
- `Mb` stands for megabytes and means 1,024 kilobytes (2^20 bytes)
- `Gb` stands for gigabytes and means 1,024 megabytes (2^30 bytes)

### Request and Response Limits {/*request-and-response-limits*/}

| Value                                                 | Limit                 | Description                                                                                                                                                                           |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Response body size from static                        | 2Gb                   | The maximum size of a response body of {{ PRODUCT_NAME }} static assets.                                                                                                              |
| Response body size from custom origin                 | 2Gb                   | The maximum size of a response body from a custom origin.                                                                                                                             |
| Response body size from {{ PRODUCT_NAME }} serverless | 6Mb                   | The maximum size of a response body from {{ PRODUCT_NAME }} serverless.                                                                                                               |
| Path and query string size                            | 8Kb                   | The maximum bytes (not characters) that {{ PRODUCT_NAME }} will accept in path and query string.                                                                                      |
| Cookie size                                           | 32Kb                  | The maximum bytes that {{ PRODUCT_NAME }} will accept in request or response cookies.                                                                                                 |
| HTTP header size                                      | 64Kb                  | The maximum bytes that {{ PRODUCT_NAME }} will accept in request or response HTTP headers.                                                                                            |
| HTTP header count                                     | 70                    | The maximum number of developer-controlled headers {{ PRODUCT_NAME }} will accept in HTTP request or response. Exceeding this will result in 542 [status code](/guides/status_codes). |
| Scheduling timeout                                    | 60 seconds            | The number of seconds {{ PRODUCT_NAME }} will try to schedule a request processing before timing out. Exceeding this will result in 541 [status code](/guides/status_codes).          |
| Worker timeout                                        | 20 seconds            | The number of seconds {{ PRODUCT_NAME }} will wait for project code to process the request before timing out. Exceeding this will result in 539 [status code](/guides/status_codes).  |
| Prerender concurrency                                 | 200                   |
| Total number of prerendered requests                  | 25,000 per deployment |

### Access Logs {/*access-logs*/}

| Value | Limit     | Description                                                                                         |
| ----- | --------- | --------------------------------------------------------------------------------------------------- |
| Size  | Unlimited | All access logs will always be [logged](/guides/logs#section_access_logs).                          |
| Time  | 2 hours   | The minimum time that {{ PRODUCT_NAME }} guarantees that access logs will be available for reading. |

### Prohibited Headers {/*prohibited-headers*/}

The following is a list of headers that cannot be modified by your project code. These values are immutable and can only be set by the {{ PRODUCT }} platform.

* `{{ HEADER_PREFIX }}-platform`
* `{{ HEADER_PREFIX }}-version` 
* `{{ HEADER_PREFIX }}-t` 
* `{{ HEADER_PREFIX }}-components`
* `{{ HEADER_PREFIX }}-status`
* `host`
* `x-request-id`
* `content-length`
* `via`

### Serverless Bundle Size {/*serverless-bundle-size*/}

{{ PRODUCT }} has a serverless bundle limit for your project of 50 MB (250 MB uncompressed). If your deployment to {{ PRODUCT }} fails due to exceeding the bundle limit, you will see the following error message:

```
2022-08-08T13:47:13Z - internal error - Error in xdn-deploy-lambda: Your production build exceeds the maximum allowed size of 50 MB (compressed) / 250 MB (uncompressed).
The current size is 51.19 MB (compressed).
Please ensure that list of dependencies in package.json contains only those packages that are needed at runtime.
Move all build-time dependencies such as webpack, babel, etc... to devDependencies, rerun npm | yarn install, and try to deploy again.
```

Typically, this is due to Node modules marked as `dependencies` when they are more appropriate in `devDependencies` within the `package.json` file. Modules marked as dependencies will be included in the serverless bundle. Dev-only modules such as `babel`, `jest`, `webpack`, etc. should be moved to `devDependencies` as shown:

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

Additionally, this can be related to assets (such as fonts or images) that are imported into your project code. These resources are typically better referenced as static assets which are stored outside of the serverless bundle.

You can remedy this by creating a `public` directory in the root of your project. Move all of your font and image assets to this path. Then, create a route in `routes.js` to serve those requests as static assets using the following as an example:

```javascript
router.get('/assets/:path*', ({ serveStatic, cache }) => {
  cache({
    edge: {
      maxAgeSeconds: 60 * 60 * 24, // cache at the edge for 24 hours
    },
    browser: false, // prevent caching of stale html in the browser
  })
  serveStatic('public/:path*')
})
```

Now, you can update your code references from importing the assets to referencing the static path, such as:

```diff
- import myImage from 'public/images/Image1.png'
...
- <div><img src={myImage}/></div>
+ <div><img src="/assets/images/Image1.png"/></div>
```

## {{ PRODUCT_NAME }} Platform Caveats {/*layer0-platform-caveats*/}
### NodeJS native extensions {/*nodejs-native-extensions*/}

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

### Readonly filesystem in serverless runtime {/*readonly-filesystem-in-serverless-runtime*/}

Web developers often use the filesystem as a temporary data source for their applications. That includes creating and/or
manipulating files based on user requests. For example, storing user uploaded files locally and stripping metadata
before proceeding. But this can open up security vulnerabilities where a bug in the application can be used to modify
the application itself.

So, as a best practice {{ PRODUCT_NAME }} App Platform does not allow you to change the content of application files on
the filesystem during runtime. If you need to modify an application file, you must make those changes locally and make
a new deployment. This limits the attack surface of your potential application vulnerabilities. It also allows us to
make your application more distributed and resilient to outages. {{ PRODUCT_NAME }} takes your application code and
deploys it to multiple regions with a read-only filesystem. This way, if the primary availability zone or region is
unavailable, your application will still be accessible from another region.

{{ PRODUCT_NAME }} App Platform runs your application in `/var/task` directory. If you attempt to write a file in that
directory, you may come across an error like the following:
```
EROFS: read-only file system, open '/var/task/temp-upload.jpg'
```
To resolve issues like this you can use "tmp" directory to store any temporary files. But this directory might be
different on you local environment vs  {{ PRODUCT_NAME }} serverless runtime. So, following is a good way to write code
that will work on your local machine as well as {{ PRODUCT_NAME }} serverless runtime.

```js
import { tmpdir } from 'os';
import * as path from 'path';
const tmpFilePath = path.join(tmpdir(), 'temp-upload.jpg');
```


Another thing to keep in mind is that "tmp" directory is ephemeral, meaning that it gets reset/recycled. If you store a
file in "tmp", it most likely won’t be available in the next request. That’s why you’ll need to use external services
to store permanent file storage. These external services can be Amazon S3, Google Cloud Storage, or any other storage.

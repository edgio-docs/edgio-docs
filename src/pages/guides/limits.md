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

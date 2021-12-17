# Layer0 Version 2.x.x to 3.x.x Migration Guide

This guide describes what you need to know when migrating from version 2.x.x to version 3.x.x. Note that you can continue to use version 2.x.x but we highly recommend upgrading to version 3.x.x. The biggest key change is that in keeping with industry best practices, v3 of the platform now requires Node 14 whereas v2 was on Node 12. 

### Node Version

With Layer0 v3, your app will run in Node v{{ NODE_VERSION }} when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node v{{ NODE_VERSION }} for all development. All previous versions of Node are not supported and may cause instability in your application.

If you do not have Node.js installed on your system, download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

If you are currently on a version of Node < v{{ NODE_VERSION }}, we recommend using `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm)) to switch between your current version and our supported version. This will help test and resolve any issues you may face during migration before deploying your site live on Layer0.

### Upgrading Packages

You will need to upgrade to the latest Layer0 packages available on NPM and remove the equivalent XDN packages. To upgrade your packages, you will need to install the latest version of the Layer0 CLI. You should install this globally using: `npm i -g @layer0/cli`.

Once installed, change into your project’s directory. The original XDN configuration file has been renamed. Run `mv xdn.config.js layer0.config.js` or manually rename the file to move the configuration to Layer0.

The dependencies defined in `package.json` have changed scope from `@xdn` to `@layer0`. To install the latest Layer0 dependencies, run `layer0 init`. This will update `package.json` with the new Layer0 dependencies and scripts for building and deploying your site. You can then remove any entries for dependencies beginning with `@xdn` as they will no longer be used. Note: if you had modified the original scripts such as `xdn:deploy`, ensure those changes are moved over to the new `layer0:\*` script entries.

Lastly, your site code will need to be updated to reference the new `@layer0` modules. Using the find-and-replace method, you can update these references from `@xdn/` to `@layer0/`. Be cautious about a global replacement of these instances. Be sure you are only updating references within your project code and not other resources such as:

- `node_modules/\*`
- `package.json`
- `package-lock.json`
- `yarn.lock`
- etc.

Build your project and verify everything is functioning as expected. You should then deploy your site to your testing environment and re-verify functionality.

## Edge and Permalinks will Change Automatically

Once you deploy the new version of Layer0, you Edge links will change to have the format `*.layer0.link`. Your current edge links will switch to the new format on the next deployment for that environment. Old edge links will continue to work even after the first deployment.

Permalinks will become `*.free.layer0-perma.link`. These links will all automatically switch to the new links in the Developer Console and, unlike edge links, will be available without needing a deployment of your site. However, we will continue to support old and new permalinks.

During this transition, your live site is unaffected and custom domains URLs are not affected.

## What Else Will Change?

### Access Logs

The `xdn` field in the access logs has been renamed to `v`: https://developer.moovweb.com/guides/logs#section_xdn

#### Response Headers

The prefixes of the response headers have changed from `x-xdn-*` to `x-0-*`. For example, `x-xdn-t` is now `x-0-t`.

#### Cookies

The prefixes of the cookies have changed from `xdn` to `layer0`. For example, `xdn_destination` is now `layer0_destination`.

#### REST API

If you are using the REST API, it is recommended to update to the new endpoint, https://app.layer0.co/api/v1/.

#### Cache Manifest

The file `/__xdn__/cache-manifest.js` has changed to `/__layer0__/cache-manifest.js`. A quick way of implementing this change is to add redirect in your existing routes config:
```js
router.match('/__xdn__/cache-manifest.js', ({ redirect }) => {
  redirect('/__layer0__/cache-manifest.js')
})
```

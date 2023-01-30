---
title: {{ PRODUCT }} Version 4.x Migration Guide
---

This guide describes what you need to know when migrating from {{ PRODUCT }} version 1.x/2.x/3.x to version 4.x. Note that while your site continues to function on a version previous to 4.x at this time, versions older than 4.x are deprecated and we urge you to upgrade to 4.x to avoid any interruptions. The biggest key change is that 4.x sites now run on our {{ PRODUCT }} network.

## Node Version {/*node-version*/}

With {{ PRODUCT }} v4, your app will run in Node.js version 14.x when deployed to the {{ PRODUCT }} cloud. Therefore we highly suggest using Node.js version 14.x for all development. All previous versions of Node are not supported and may cause instability in your application.

If you do not have Node.js installed on your system, download and install it from the official [Node.js v14.x downloads](https://nodejs.org/dist/latest-v14.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

If you are currently on a version of Node < v14.x, we recommend using `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm)) to switch between your current version and our supported version. This will help test and resolve any issues you may face during migration before deploying your site live on {{ PRODUCT }}.

## Upgrading Packages {/*upgrading-packages*/}

You will need to upgrade to the latest {{ PRODUCT }} packages available on NPM. To upgrade your packages, you will need to install the latest version of the {{ PRODUCT }} CLI. You should install this globally using: `npm i -g @layer0/cli`.

Once installed, change into your project’s directory. To install the latest {{ PRODUCT }} dependencies, run `layer0 use latest`. This will update `package.json` with the new {{ PRODUCT }} 4.x dependencies and scripts for building and deploying your site.

**If you are currently using 1.x or 2.x**, the dependencies defined in `package.json` have changed scope from `@xdn` to `@layer0`. To install the latest {{ PRODUCT }} dependencies, run `layer0 init`. This will update `package.json` with the new {{ PRODUCT }} dependencies and scripts for building and deploying your site. You can then remove any entries for dependencies beginning with `@xdn` as they will no longer be used. Note: if you had modified the original scripts such as `xdn:deploy`, ensure those changes are moved over to the new `layer0:\*` script entries.

Lastly, your site code will need to be updated to reference the new `@layer0` modules. Using the find-and-replace method, you can update these references from `@xdn/` to `@layer0/`. Be cautious about a global replacement of these instances. Be sure you are only updating references within your project code and not other resources such as:

- `node_modules/\*`
- `package.json`
- `package-lock.json`
- `yarn.lock`
- etc.

Build your project and verify everything is functioning as expected. You should then deploy your site to your testing environment and re-verify functionality.

## Edge and Permalinks will Change Automatically {/*edge-and-permalinks-will-change-automatically*/}

Once you deploy the new version of {{ PRODUCT }}, your Edge links will change to have the format `*.layer0-limelight.link`. Your current edge links will switch to the new format on the next deployment for that environment. Old edge links may continue to work correctly for a while but they are considered deprecated and will be turned off without further notice. Permalinks will remain `*.free.layer0-perma.link`.

## DNS will Need Updating for Custom Domains {/*dns-will-need-updating-for-custom-domains*/}

If you have a custom domain pointing to {{ PRODUCT }}, you will need to update your A/CNAME record. To obtain the new network details, navigate to {{ APP_URL }} and go to your site. Click the _Environments_ tab and choose the environment that has the custom domain. From there, click on the _Configuration_ tab and scroll down to the _Domains_ section. Click _Configure_ next to the domain you wish to update.

You will see two different DNS configurations. If you are using a sub-domain, you will need to update the CNAME record with the value provided. If you are using an apex domain, you will need to update the A records to match the Anycast IP addresses listed.

These updates must be made with your domain registrar.

### Allowlisting {/*allowlisting*/}

When users access your site, {{ PRODUCT }} will send traffic to your origin servers from specific IP addresses. The list of IP addresses are on the _Origin Security_ tab for your site. You must add all these IPs to your firewall's allowlist to ensure that requests are not blocked by it.

During deployment, the {{ PRODUCT }} CLI connects to the following domains. Please add these domains to the allowlist of any firewall in all development or CI/CD environments that deploy to {{ PRODUCT }}:

```
upload.build.layer0.co
app.layer0.co
```

## Changes from 1.x/2.x to 4.x {/*changes-from-1x2x-to-4x*/}

### Access Logs {/*access-logs*/}

The `xdn` field in the [access logs](/applications/develop/logs#access-logs) has been renamed to `layer0`. 

### Response Headers {/*response-headers*/}

The prefixes of the response headers have changed from `x-xdn-*` to `{{ HEADER_PREFIX }}-*`. For example, `x-xdn-t` is now `{{ HEADER_PREFIX }}-t`.

### Cookies {/*cookies*/}

The prefixes of the cookies have changed from `xdn` to `layer0`. For example, `xdn_destination` is now `layer0_destination`.

### REST API {/*rest-api*/}

If you are using the REST API, it is recommended to update to the new endpoint, {{ APP_URL }}/api/v1/.

### Cache Manifest {/*cache-manifest*/}

The file `/__xdn__/cache-manifest.js` has changed to `/__layer0__/cache-manifest.js`. A quick way of implementing this change is to add redirect in your existing routes config:

```js
router.match('/__xdn__/cache-manifest.js', ({ redirect }) => {
  redirect('/__layer0__/cache-manifest.js')
})
```

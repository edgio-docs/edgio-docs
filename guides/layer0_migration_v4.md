# Layer0 Version 3.x to 4.x Migration Guide

This guide describes what you need to know when migrating from version 3.x to version 4.x. Note that while your site continues to function on 3.x at this time, this version is deprecated and we urge you to upgrade to 4.x to avoid any interruptions. The biggest key change is that 4.x sites now run on our Limelight network.

## Node Version

With Layer0 v4, your app will run in Node v{{ NODE_VERSION }} when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node v{{ NODE_VERSION }} for all development. All previous versions of Node are not supported and may cause instability in your application.

If you do not have Node.js installed on your system, download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

If you are currently on a version of Node < v{{ NODE_VERSION }}, we recommend using `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm)) to switch between your current version and our supported version. This will help test and resolve any issues you may face during migration before deploying your site live on Layer0.

## Upgrading Packages

You will need to upgrade to the latest Layer0 packages available on NPM. To upgrade your packages, you will need to install the latest version of the Layer0 CLI. You should install this globally using: `npm i -g @layer0/cli`.

Once installed, change into your project’s directory. To install the latest Layer0 dependencies, run `layer0 use latest`. This will update `package.json` with the new Layer0 4.x dependencies and scripts for building and deploying your site.

Build your project and verify everything is functioning as expected. You should then deploy your site to your testing environment and re-verify functionality.

## Edge links will change automatically

Once you deploy the new version of Layer0, your Edge links will change to have the format `*.layer0-limelight.link`. Your current edge links will switch to the new format on the next deployment for that environment. Old edge links may continue to work correctly for a while but they are considered deprecated and will be turned off without further notice. Permalinks will remain `*.free.layer0-perma.link`.

## DNS will need updating for custom domains

If you have a custom domain pointing to Layer0, you will need to update your A/CNAME record. To obtain the new network details, navigate to https://app.layer0.co and go to your site. Click the _Environments_ tab and choose the environment that has the custom domain. From there, click on the _Networking_ tab.

You will see two different DNS configurations. If you are using a sub-domain, you will need to update the CNAME record with the value provided. If you are using an apex domain, you will need to update the A records to match the Anycast IP addresses listed.

These updates must be made with your domain registrar.

### Whitelisting

When users access your site, Layer0 will send traffic to your origin servers from specific IP addresses. The list of IP addresses are on the _Networking_ tab as mentioned above. Please whitelist these to ensure that requests are not blocked.

During deployment, the Layer0 CLI connects to the following domains. Please whitelist these domains in all environments that deploy to Layer0:

```
upload.build.layer0.co
app.layer0.co
```

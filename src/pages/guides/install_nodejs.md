---
title: Install Node.js and npm
---

**{{ PRODUCT_NAME }} supports Node.js version 14 and 16**

**Current recommended development version is Node.js 16.18.0**

## {{ PRODUCT }} Node.js Supported Versions {/*nodejs-supported-versions*/}

{{ PRODUCT }} supports different Node.js runtimes depending on the version of your `{{ PACKAGE_NAME }}` packages.

| {{ PRODUCT }} Version | Node.js Version |
|------------------------|------------------|
| 5.x                   | 14.19.0         |
| 6.x (recommended)     | 16.18.0         |

## Node version managers {/*node-version-managers*/}

If you are using multiple versions of Node.js consider installing a Node version manager like [nvm](https://github.com/nvm-sh/nvm) or [n](https://www.npmjs.com/package/n).

Quick node install with `nvm` or `n`

```bash
# nvm
nvm install 16
# n
n install 16
```

## Package managers {/*package-managers*/}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.

## Node.js installation {/*nodejs-installation*/}

Download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

### Homebrew {/*homebrew*/}

For mac users, `brew install node` is a quick way to get the latest node. You can then use `nvm` or `n` to manage versions.

## Production version {/*production-version*/}

Note that while you can use any version of Node.js >= {{ NODE_VERSION }} locally, your app will run in Node {{ NODE_VERSION }} when deployed to the {{ PRODUCT_NAME }} cloud.

Therefore we highly suggest using Node {{ NODE_VERSION }} for all development.

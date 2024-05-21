---
title: Install Node.js and npm
---

{{ PRODUCT_NAME }} version 4.20.0 supports Node.js version 16. 

Although you may use a higher version of Node.js, your app will run using the above version when deployed to {{ PRODUCT }}. Therefore, we strongly recommend that you use the Node.js version that corresponds to your {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version when developing your web application.

{{ node_16_eol.md }}

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

Note that while you can use any version of Node.js >= 16 locally, your app will run in Node 16 when deployed to the {{ PRODUCT_NAME }} cloud.
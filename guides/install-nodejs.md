# Install Node.js and npm

**{{ PRODUCT_NAME }} only supports Node.js version 14 and higher**

**Current recommended development version is Node.js v14**

## Node version managers

If you are using multiple versions of Node.js consider installing a Node version manager like [nvm](https://github.com/nvm-sh/nvm) or [n](https://www.npmjs.com/package/n).

Quick node install with `nvm` or `n`

```bash
# nvm
nvm install 14
# n
n install 14
```

## Package managers

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.

## Node.js installation

Download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

### Homebrew

For mac users, `brew install node` is a quick way to get the latest node. You can then use `nvm` or `n` to manage versions.

## Production version

Note that while you can use any version of Node.js >= 14 locally, your app will run in Node 14 when deployed to the {{ PRODUCT_NAME }} cloud.

Therefore we highly suggest using Node 14 for all development.

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

1.  Install nvm by running the following command:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
    ```

2.   Verify that you have successfully installed nvm by running the following command:
    ```bash
    command -v nvm
    ```

```bash
# nvm
nvm install 16
# n
n install 16
```

4.  Instruct nvm to use Node v{{ NODE_VERSION }} by running the following command:
    ```bash
    nvm use {{ NODE_VERSION }}
    ```

## Package managers {/*package-managers*/}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.


Download and install it from the official [Node.js v{{ NODE_VERSION }} downloads](https://nodejs.org/dist/latest-v{{ NODE_VERSION }}/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

### Homebrew {/*homebrew*/}

For mac users, `brew install node` is a quick way to get the latest node. You can then use `nvm` or `n` to manage versions.

## Production version {/*production-version*/}

Note that while you can use any version of Node.js >= {{ NODE_VERSION }} locally, your app will run in Node {{ NODE_VERSION }} when deployed to the {{ PRODUCT_NAME }} cloud.

Therefore we highly suggest using Node {{ NODE_VERSION }} for all development.

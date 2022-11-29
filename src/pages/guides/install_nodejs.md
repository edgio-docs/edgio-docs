---
title: Install Node.js and npm
---

{{ PRODUCT }} requires Node v{{ NODE_VERSION }}. Although you may use a higher version of Node, your app will run in Node v{{ NODE_VERSION }} when deployed to {{ PRODUCT_NAME }}. Therefore, we strongly recommend that you use Node v{{ NODE_VERSION }} when developing your web application.

## Node Installation {/*node-installation*/}

The recommended method for installing Node is through a version manager called [nvm](https://github.com/nvm-sh/nvm). 

1.  Install nvm by running the following command:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
    ```

2.   Verify that you have successfully installed nvm by running the following command:
    ```bash
    command -v nvm
    ```

3.  Once you have successfully installed nvm, install Node v{{ NODE_VERSION }} by running the following command:
    ```bash
    nvm install {{ NODE_VERSION }}
    ```

4.  Instruct nvm to use Node v{{ NODE_VERSION }} by running the following command:
    ```bash
    nvm use {{ NODE_VERSION }}
    ```

## Package managers {/*package-managers*/}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.


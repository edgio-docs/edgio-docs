---
title: Install Node.js and npm
---

Although you may develop your app with any version of Node.js, {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} runs your projects within a Node.js 16 or 18 runtime environment. {{ PRODUCT }} determines the available set of runtime environments according to the version of the {{ PRODUCT }} CLI through which your project was deployed.

-   **{{ PRODUCT }} v6.1.8 or earlier:** Node.js version 16.18.0
-   **{{ PRODUCT }} v6.2.0:** Node.js version 18

We strongly recommend that you use the Node.js version that corresponds to your {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version when developing your web application.

{{ node_16_eol.md }}

## Node.js Installation {/* node-installation */}

The recommended method for installing Node.js is through a version manager like [nvm](https://github.com/nvm-sh/nvm).

1.  Install nvm by running the following command:

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
    ```

2.  Verify that you have successfully installed nvm by running the following command:

    ```bash
    command -v nvm
    ```

3.  Once you have successfully installed nvm, install Node.js by running one of the following commands:

    ```bash
    nvm install 16
    ```

4.  Instruct nvm to use the version of Node.js installed in the previous step by running the following command:

    ```bash
    nvm use 16
    ```

## Package managers {/* package-managers */}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.

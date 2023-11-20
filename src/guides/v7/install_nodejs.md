---
title: Install Node.js and npm
---

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} supports Node.js 16 and 18 runtime versions.

Although you may develop your app with any version of Node.js, it will run using a supported version of the Node.js runtime when deployed to {{ PRODUCT }}.

- {{ PRODUCT }} v7.4.0 or later is compatible with Node.js 16 and 18.
- {{ PRODUCT }} v7.3.1 or earlier is compatible with Node.js 16 only.

## Node.js Installation {/* node-installation */}

The recommended method for installing Node.js is through a version manager like [nvm](https://github.com/nvm-sh/nvm).

1.  Install nvm by running the following command:

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    ```

2.  Verify that you have successfully installed nvm by running the following command:

    ```bash
    command -v nvm
    ```

3.  Once you have successfully installed nvm, install Node.js by running one of the following commands:

    ```bash
    nvm install 16
    # or
    nvm install 18
    ```

4.  Instruct nvm to use the version of Node.js installed in the previous step by running the following command:

    ```bash
    nvm use 16
    # or
    nvm use 18
    ```

## Package managers {/* package-managers */}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.

## Node.js 18 Support {/* nodejs-18-support */}

Node.js 18 is now supported by {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} starting from version 7.4.0. {{ PRODUCT }} will detect your project's Node.js version during deployment and use the appropriate runtime version. Optionally, you can set the [`cloudRuntime`](/guides/performance/cdn_as_code/edgio_config#cloudruntime) property in the `{{ CONFIG_FILE }}` file to target a specific Node.js version.

To upgrade your project to use {{ PRODUCT }} v7.4.0 or later, perform the following steps:

1. Update the global {{ PRODUCT }} CLI:
  
   ```bash
   npm i -g {{ PACKAGE_NAME }}/cli^7.4.0
   ```

2. Update the {{ PRODUCT }} dependencies in your project:

   ```bash
   {{ CLI_CMD(use ^7.4.0) }}
   ```

3. Build your project and ensure that it works as expected.

If you're using an earlier version of {{ PRODUCT }} that doesn't support Node.js 18, your application will use Node.js 16 runtime when deployed to {{ PRODUCT }}.

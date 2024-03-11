---
title: Install Node.js and npm
---

<Callout type="info">

  Node.js is only required for [CDN-as-code (EdgeJS)](/guides/performance/cdn_as_code). The following information is inapplicable to your setup if you only deploy from the {{ PORTAL }}.

</Callout>

Although you may develop your app with any version of Node.js, {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} runs your projects within a Node.js 16, 18, or 20 runtime environment. {{ PRODUCT }} determines the available set of runtime environments according to the version of the {{ PRODUCT }} CLI through which your project was deployed. 

| Node.js Version | Requires                        |
| --------------- | ------------------------------- |
| 20              | {{ PRODUCT }} v7.5.0 or later   |
| 18              | {{ PRODUCT }} v7.4.0 or later   |
| 16 (deprecated) | {{ PRODUCT }} v7.4.4 or earlier |

{{ node_16_eol.md }}

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
    nvm install 18
    # or
    nvm install 20
    ```

4.  Instruct nvm to use the version of Node.js installed in the previous step by running the following command:

    ```bash
    nvm use 18
    # or
    nvm use 20
    ```

## Package managers {/* package-managers */}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.

## Node.js 18 and 20 Support {/* nodejs-18-20-support */}

Node.js 18 and 20 are supported by {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} starting from version 7.4.0 and 7.5.0, respectively. {{ PRODUCT }} will detect your project's Node.js version during deployment and use the appropriate runtime version. Optionally, you can set the [`cloudRuntime`](/guides/performance/cdn_as_code/edgio_config#cloudruntime) property in the `{{ CONFIG_FILE }}` file to target a specific Node.js version.

Upgrade your project by running the commands corresponding to the desired Node.js version:

<SnippetGroup>

  ```bash tabLabel="Node.js 18"
  # Update the global {{ PRODUCT }} CLI to version 7.4.0
  npm i -g {{ PACKAGE_NAME }}/cli~7.4.0

  # Update the {{ PRODUCT }} dependencies in your project
  {{ CLI_CMD(use ~7.4.0) }}
  ```

  ```bash tabLabel="Node.js 20"
  # Update the global {{ PRODUCT }} CLI to version 7.5.0
  npm i -g {{ PACKAGE_NAME }}/cli~7.5.0

  # Update the {{ PRODUCT }} dependencies in your project
  {{ CLI_CMD(use ~7.5.0) }}
  ```

</SnippetGroup>

Build your project and ensure that it works as expected.

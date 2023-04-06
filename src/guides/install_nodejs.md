---
title: Install Node.js and npm
---

<Condition version="<7">
{{ PRODUCT }} support for Node.js runtimes varies according to the version of your `{{ PACKAGE_NAME }}` packages.

- **{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 5:** Node.js version 14.19.0
- **{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 6:** Node.js version 16.18.0
</Condition>

<Condition version=">=7">
{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} requires Node.js 16.18.0 runtime version.
</Condition>

Although you may use a higher version of Node.js, your app will run using the above version when deployed to {{ PRODUCT }}. Therefore, we strongly recommend that you use the Node.js version that corresponds to your {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version when developing your web application.

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

    <Condition version="<7">
      <SnippetGroup>
  
      ```bash tabLabel="{{ PRODUCT }} Version 5"
      nvm install 14
      ```
  
      ```bash tabLabel="{{ PRODUCT }} Version 6"
      nvm install 16
      ```
  
      </SnippetGroup>
    </Condition>

    <Condition version=">=7">
      ```bash
      nvm install 16
      ```
    </Condition>

4.  Instruct nvm to use the version of Node.js installed in the previous step by running the following command:

    <Condition version="<7">
      <SnippetGroup>
  
      ```bash tabLabel="{{ PRODUCT }} Version 5"
      nvm use 14
      ```
  
      ```bash tabLabel="{{ PRODUCT }} Version 6"
      nvm use 16
      ```
  
      </SnippetGroup>
    </Condition>

    <Condition version=">=7">
      ```bash
      nvm use 16
      ```
    </Condition>

## Package managers {/* package-managers */}

[npm](https://www.npmjs.com/) is a package manager integrated into Node.

[yarn](https://classic.yarnpkg.com/en/docs/cli/) is another very popular package manager.

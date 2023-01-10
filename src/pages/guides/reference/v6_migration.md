---
title: {{ PRODUCT }} Version 6 Migration Guide
---

{{ PRODUCT }} version 6, which introduces support for Node.js v16, requires:

*   {{ PRODUCT }} version 5

    <Callout type="info">

      If you are using {{ PRODUCT }} version 4.x or earlier, [migrate to version 5](/guides/reference/v5_migration) before migrating to version 6.

    </Callout>

*   Node.js version 16

    <Callout type="important">

      {{ PRODUCT }} version 6 runs your apps in Node.js v16. Therefore, we strongly recommend that you use Node.js v16.x when developing your web application.

    </Callout>

*   Updating your application(s) to be compatible with Node.js version 16. 

<Callout type="info">

  {{ PRODUCT }} version 6 does not support [access control through JWT](#jwt-access-control-end-of-life). Additionally, [.noIndexPermalink() is now deprecated](#remove-noindexpermalink-references), since we now automatically block search engine traffic for edge links and permalinks. 

</Callout>

Migrate from version 5.x to 6 through the following steps:

1.  [Upgrade Node.js.](#upgrade-node-js)
2.  [Upgrade the {{ PRODUCT }} CLI.](#upgrade-the-cli)
3.  [Use version 6 of our {{ PRODUCT }} packages.](#use-packages-version-6)
4.  [Build your {{ PRODUCT }} properties](#build-your-properties)
5.  [Deprecated Features](#deprecated-features)
 
## Step 1: Upgrade Node.js {/*upgrade-node-js*/}

{{ PRODUCT }} version 6 runs your apps in Node.js v16. Therefore, we strongly recommend that you use Node.js v16.x when developing your web application. 

[Learn how to use nvm to install Node.js v16.x.](/guides/install_nodejs)

Once you are using Node.js v16, update your application code to be compatible with Node.js v16.

<Callout type="important">

  If `package.json` or `.npmrc` explicitly sets the Node.js engine version to `14.x`, then you will need to update it to `16.x`.

  Additionally, check your CI/CD environment for Node.js version settings. If your workflow targets Node.js 14.x, then you will need to update your files and settings to target Node.js 16.x.

</Callout>

## Step 2: Upgrade the {{ PRODUCT }} CLI {/*upgrade-the-cli*/}

Install the latest version of our CLI.

<Callout type="info">

  By default, {{ PRODUCT }} CLI v5.1.0+ collects usage and error reporting information to help improve our products. However, it omits personally identifiable information. [Learn how to opt-out](/guides/develop/cli#disable-analytics).

</Callout>

**npm:**

```bash
npm install -g @edgio/cli
```

**yarn:**

```bash
yarn global add @edgio/cli
```

## Step 3: Use {{ PRODUCT }} Packages Version 6 {/*use-packages-version-6*/}

Update all {{ PRODUCT }} packages to version 6 using the CLI.

```bash
edgio use ^6.0.0 
```

## Step 4: Build your {{ PRODUCT }} Properties {/*build-your-properties*/}

Build each of your {{ PRODUCT }} properties by running the following command in its root directory:

```bash

{{ FULL_CLI_NAME }} build

```

If you encounter a build issue as a result of upgrading Node.js, then you should perform one or more of the following troubleshooting steps:

1.  Check whether you have defined a different Node.js or npm version in either a npm config file (`.npmrc`) or within `package.json`. If so, update it to the correct version and then run `{{ FULL_CLI_NAME }} build` to rebuild your {{ PRODUCT }} property. 

    <Callout type="tip">

      Run `node --version` to check the Node.js version that you are currently using. This command should return `16.x.x` (e.g., `16.18.0`). Use this version information when updating `.npmrc` or `package.json`. 

    </Callout>

2.  Clear `node_modules` and rebundle your project by running the following command:

    ```bash
    npm ci
    ```

    Run `{{ FULL_CLI_NAME }} build` to rebuild your {{ PRODUCT }} property.

3.  Regenerate a new dependency tree by running the following command:

    ```bash
    npm i --package-lock-only
    ```

    Run `{{ FULL_CLI_NAME }} build` to rebuild your {{ PRODUCT }} property.

## Step 5: Deprecated Features {/*deprecated-features*/}

### JWT Access Control {/*jwt-access-control*/}

{{ PRODUCT }} version 6 does not support JWT access control. Previous versions allowed you to     configure on a per route basis whether requests would be allowed or denied according to a JWT token.

### GraphQL Caching  {/*graphql-caching*/}

{{ PRODUCT }} has deprecated support for caching of GraphQL operations in version 5. If your {{ PRODUCT }} router ({{ ROUTES_FILE }}) contains usage of `.graphqlOperation(...)`, you should remove it. Otherwise, your application will fail to build.

### Permalink Indexing {/*permalink-indexing*/}

By default, {{ PRODUCT }} version 6 automatically blocks search engine traffic for edge links and permalinks. As a result, the `.noIndexPermalink()` router function serves no purpose and it has been deprecated. We recommend that you remove this function from your {{ ROUTES_FILE }} file. 

Override this behavior and allow search engines to index all permalinks by adding the following route to `routes.js`:

```js
new Router({ indexPermalink: true })
```

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 6!

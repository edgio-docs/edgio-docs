---
title: {{ PRODUCT }} Version 6 Migration Guide
---

{{ PRODUCT }} version 6, which introduces support for Node.js v16, requires:

*   {{ PRODUCT }} version 5

    <Callout type="info">

      If you are using {{ PRODUCT }} version 4.x or earlier, [migrate to version 5](v5_migration) before migrating to version 6.

    </Callout>

*   Node.js version 16

    <Callout type="important">

      {{ PRODUCT }} version 6 runs your apps in Node.js v16. Therefore, we strongly recommend that you use Node.js v16.x when developing your web application.

    </Callout>

*   npm version 8
*   Updating your application(s) to be compatible with Node.js version 16 and npm version 8. 

<Callout type="info">

  {{ PRODUCT }} version 6 does not support [access control through JWT](). Additionally, [.noIndexPermalink() is now deprecated](), since we now automatically block search engine traffic for edge links and permalinks. 

</Callout>

Migrate from version 5.x to 6 through the following steps:

1.  [Upgrade the {{ PRODUCT }} CLI.](#upgrade-the-cli)
2.  [Upgrade Node.js and npm.](#upgrade-node-js-and-npm)
3.  [Use version 6 of our {{ PRODUCT }} packages.](#use-packages-version-6)
4.  [Install dependencies.](#install-dependencies)
5.  [Build your {{ PRODUCT }} properties](#build-your-properties)
6.  [Optional. Remove references to .noIndexPermalink()](#remove-noindexpermalink-references)
 
## Step 1: Upgrade the {{ PRODUCT }} CLI {/*upgrade-the-cli*/}

We have renamed the {{ PRODUCT }} CLI from `0 | layer0` to `{{ CLI_NAME }} | {{ FULL_CLI_NAME }}`. Install the latest version of our CLI.

**npm:**

```bash
npm install -g @edgio/cli
```

**yarn:**

```bash
yarn global add @edgio/cli
```

## Step 2: Upgrade Node.js and npm {/*upgrade-node-js-and-npm*/}

{{ PRODUCT }} version 6 runs your apps in Node.js v16. Therefore, we strongly recommend that you use Node.js v16.x when developing your web application. 

[Learn how to use nvm to install Node.js v16.x.](/guides/install_nodejs)

<Callout type="info">

  The Node.js v16.x installation includes npm.

</Callout>

Once you are using Node.js v16, update your application code to be compatible with Node.js v16 and npm 8.

## Step 3: Use {{ PRODUCT }} Packages Version 6 {/*use-packages-version-6*/}

For each {{ PRODUCT }} property, set all {{ PRODUCT }} packages within `package.json` to use version `^6.0.0`.

For example, the following excerpt from a `package.json` file shows that this property is using version `^5.0.0` of our {{ PRODUCT }} packages:

```
...
  "dependencies": {
    "{{ PACKAGE_NAME }}/rum": "^5.0.0",
  },          
  "devDependencies": {
    "{{ PACKAGE_NAME }}/cli": "^5.0.0",
    "{{ PACKAGE_NAME }}/core": "^5.0.0",
    "{{ PACKAGE_NAME }}/devtools": "^5.0.0",
...
```
 
You should update all of these references as shown below.

```
...  
  "dependencies": {
    "{{ PACKAGE_NAME }}/rum": "^6.0.0",
     },
  "devDependencies": {
    "{{ PACKAGE_NAME }}/cli": "^6.0.0",
    "{{ PACKAGE_NAME }}/core": "^6.0.0",
    "{{ PACKAGE_NAME }}/devtools": "^6.0.0",
...
```

<Callout type="important">

  Although the above excerpt only contains a few references to {{ PRODUCT }} packages, you must update all references in `package.json` to use version `^6.0.0`. 

</Callout>

## Step 4: Install Dependencies {/*install-dependencies*/}

Install the dependencies defined in the previous step. 

**npm:**

```bash
npm install
```

**yarn:**

```bash
yarn install
```

## Step 5: Build your {{ PRODUCT }} Properties {/*build-your-properties*/}

Build each of your {{ PRODUCT }} properties by running the following command in its root directory:

```bash

{{ PRODUCT }} build

```

If you encounter a build issue as a result of upgrading Node.js and npm, then you should perform the following steps:

1.  Check whether you have defined a different Node.js or npm version in either a npm config file (`.npmrc`) or within `package.json`. If so, update it to the correct version and then run `{{ PRODUCT }} build` to rebuild your {{ PRODUCT }} property. 

<Callout type="info">

  Run `node --version` and `npm --version` to check the version for Node.js and npm, respectively. These commands should return `16.x.x` (e.g., `16.12.0`) for Node.js and `8.x.x` (e.g., `8.1.0`) for npm. Use this version information when updating `.npmrc` or `package.json`. 

</Callout>

2.  Clear `node_modules` and rebundle your project by running the following command:

    ```bash
    npm ci
    ```

    Run `{{ PRODUCT }} build` to rebuild your {{ PRODUCT }} property.

3.  Regenerate a new dependency tree by running the following command:

    ```bash
    npm i --package-lock-only
    ```

    Run `{{ PRODUCT }} build` to rebuild your {{ PRODUCT }} property.

## Optional. Remove .noIndexPermalink() References {/*remove-noindexpermalink-references*/}

By default, {{ PRODUCT }} version 6 automatically blocks search engine traffic for edge links and permalinks. As a result, the `.noIndexPermalink()` router function serves no purpose and it has been deprecated. We recommend that you remove this function from your `router.js` file. 

Override this behavior and allow search engines to index all permalinks by adding the following route to `router.js`:

```js
new Router({ indexPermalink: true })
```

## JWT Access Control End-of-Life

{{ PRODUCT }} version 6 does not support JWT access control. Previous versions allowed you to configure on a per route basis whether requests would be allowed or denied according to a JWT token. 

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 6!
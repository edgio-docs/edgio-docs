---
title: {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 5 Migration Guide 
---

<Callout type="important">

  If you are using {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 3.x or earlier, you should review the [v4 Migration Guide](/guides/upgrading/layer0_migration) before migrating to version 5.

</Callout>

<Callout type="tip">

  Consider upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6. It introduces support for running your app in the cloud using Node.js version 16. {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6 requires:
  *   {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5
  *   Node.js version 16
  *   Updating your application(s) to be compatible with Node.js version 16. 

We recommend that you perform the seamless {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5 migration now. Once you are ready to update your application to be compatible with Node.js version 16, you should migrate to version 6.

</Callout>

<Callout type="info">

  {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.1+ [.noIndexPermalink() is now deprecated](#permalink-indexing), since we now automatically block search engine traffic for edge links and permalinks. 

</Callout>

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5 updates our CLI, packages, and a configuration file with {{ PRODUCT }} branding. Additionally, our service will no longer modify duplicate query string parameters.

<Video src="https://youtu.be/hn20Aghn9Nc" />

Migrate from version 4.x to 5 through the following steps:

1.  [Upgrade the {{ PRODUCT }} CLI.](#upgrade-the-cli)
2.  [Rename layer0.config.js.](#rename-layer0configjs)
3.  [Rename {{ PRODUCT }} packages.](#rename-packages)
4.  [Install dependencies.](#install-dependencies)
5.  [Update scripts that reference the {{ PRODUCT }} CLI.](#update-scripts-that-reference-the-cli)
6.  [Ignore {{ PRODUCT }} Build Artifacts](#ignore-build-artifacts)
(#optional-review-your-code-for-duplicate-query-string-parameters)
7.  [GraphQL Caching End-of-Life](#graphql-caching-eol)
8.  [Optional: Review your code for duplicate query string parameters.](#optional-review-your-code-for-duplicate-query-string-parameters)
9.  [Optional: Permalink Indexing](#permalink-indexing)

## Step 1: Upgrade the {{ PRODUCT }} CLI {/*upgrade-the-cli*/}
 
We have renamed the {{ PRODUCT }} CLI from `0 | layer0` to `{{ CLI_NAME }} | {{ FULL_CLI_NAME }}`. Install the latest version of our CLI.

<Callout type="info">

  By default, {{ PRODUCT }} CLI v5.1.0+ collects usage and error reporting information to help improve our products. However, it omits personally identifiable information. [Learn how to opt-out](/guides/develop/cli#disable-analytics).

</Callout>

**npm:**

```bash
npm install -g @edgio/cli@^5.0.0
```

**yarn:**

```bash
yarn global add @edgio/cli@^5.0.0
```

## Step 2: Rename layer0.config.js {/*rename-layer0configjs*/}

For each site, rename `layer0.config.js` to `edgio.config.js`. 

<Callout type="important">

  {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.x ignores the `layer0.config.js` configuration file.

</Callout>

## Step 3: Rename {{ PRODUCT }} Packages {/*rename-packages*/}

For each site, rename all references to {{ PRODUCT }} packages from `@layer0` to `{{ PACKAGE_NAME }}`.

-   **package.json:** In addition to renaming the {{ PRODUCT }} packages, you should also set their version to `^5.0.0`.

    For example, the following excerpt from a `package.json` file references several `@layer0` packages:

    ```
    ...
      "dependencies": {
        "@layer0/rum": "4.18.1",
      },          
      "devDependencies": {
        "@layer0/cli": "4.18.1",
        "@layer0/core": "4.18.1",
        "@layer0/devtools": "4.18.1",
    ...
    ```
       
    You should update all of these references as shown below.

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

<Callout type="important">

  There may be additional `@layer0/*` dependencies listed in your site's `package.json` file that are not listed above. They too should be updated to `{{ PACKAGE_NAME }}/*`. There should be no remaining `@layer0/*` references in the file.

</Callout>

-   **Import Statements:** Rename {{ PRODUCT }} packages within each `import` statement from `@layer0` to `{{ PACKAGE_NAME }}`. You can find these `import` statements within various files, such as `routes.ts`, `sw/service-worker.js`, and your Next and Nuxt configuration files.

    For example, the following excerpt from a `routes.ts` file imports various `@layer0` packages:

    ```
    import {isProductionBuild} from '@layer0/core/environment';
    import {Router, CustomCacheKey} from '@layer0/core/router';
    import {nextRoutes} from '@layer0/next';
    ...
    ```

    You should update all of these `import` statements as shown below.

    ```
    import {isProductionBuild} from '{{ PACKAGE_NAME }}/core/environment';
    import {Router, CustomCacheKey} from '{{ PACKAGE_NAME }}/core/router';
    import {nextRoutes} from '{{ PACKAGE_NAME }}/next';
    ...
    ```
-   **Next app:** Rename all {{ PRODUCT }} references within your `next.config.js` from `@layer0` to `{{ PACKAGE_NAME }}`.

    For example, the following excerpt from a `next.config.js` file contains several `@layer0` references:

    ```
    const { withServiceWorker } = require('@layer0/next/sw')
    const withLayer0 = require('@layer0/next/withLayer0')
    module.exports = withLayer0(
    ...
    ```

    You should update all of these references as shown below.
    ```
    const { withServiceWorker } = require('@edgio/next/sw')
    const withEdgio = require('@edgio/next/withEdgio')
    module.exports = withEdgio(
    ...
    ```

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

<Callout type="important">

  This should generate an updated dependency tree in your `package-lock.json` or `yarn.lock` file. Be sure to commit these changes.

</Callout>

## Step 5: Update Scripts that Reference the {{ PRODUCT }} CLI {/*update-scripts-that-reference-the-cli*/}

Update all references to the {{ PRODUCT }} CLI within your `package.json` scripts from `0 | layer0` to either `{{ CLI_NAME }}` or `{{ FULL_CLI_NAME }}`.

## Step 6: Ignore {{ PRODUCT }} Build Artifacts {/*ignore-build-artifacts*/}

To exclude build artifacts from being tracked in version control, update your `.gitignore` file with the following:

```bash filename=".gitignore"
...
# Edgio generated build directory
.edgio
```

## Step 7: GraphQL Caching End-of-Life {/*graphql-caching-eol*/}

{{ PRODUCT }} has ended support for caching of GraphQL operations in version 5. If your {{ PRODUCT }} router ({{ ROUTES_FILE }}) contains usage of `.graphqlOperation(...)`, you should remove it. Otherwise, your application will fail to build.

## Step 8 (Optional): Review Your Code for Duplicate Query String Parameters {/*optional-review-your-code-for-duplicate-query-string-parameters*/}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5 will no longer modify the request's query string when it detects a duplicate query string parameter.

For example, we will examine how both versions of {{ PRODUCT }} handle the following request:

`https://sports.example.com/index.html?id=123&type=Sports&type=Basketball`

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 4 will modify the duplicate query string parameters as shown below.

`https://sports.example.com/index.html?id=123&type=Sports%5B0%5D&type%5B1%5D=Basketball`

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5, on the other hand, will not modify the query string as shown below.

`https://sports.example.com/index.html?id=123&type=Sports&type=Basketball`

Review your code to see whether it generates duplicate query string parameters. If it does, update it to handle multiple query string parameters with the same name.

## Step 9: (Optional) Permalink Indexing {/*permalink-indexing*/}

For {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 5.1 and above, the `x-robots-tag: noindex` header is automatically added to all responses being served from edge links and permalinks to prevent search engines from indexing those links. By default, this header will not be added to any responses served from a custom domain. Prior to version 5.1, the `.noIndexPermalink()` function was an opt-in solution to achieve the same effect.

As a result, the `.noIndexPermalink()` router function is now deprecated and serves no purpose. We recommend that you remove this function from your {{ ROUTES_FILE }} file.

However, if you want to override this default behavior and allow search engines to index all permalinks, you can pass the option `indexPermalink` set to `true` to the `Router` constructor:

```js
new Router({ indexPermalink: true })
```

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 5! Once you are ready to make your application compatible with Node.js version 16, you should migrate to [{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 6](/guides/upgrading/v6_migration).

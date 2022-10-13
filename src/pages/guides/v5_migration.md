---
title: {{ PRODUCT }} Version 5 Migration Guide 
---

<Callout type="important">

  If you are using {{ PRODUCT }} version 3.x or earlier, you should review the [v4 Migration Guide](layer0_migration) before migrating to version 5.

</Callout>

<Callout type="tip">

  In the near future, we will release {{ PRODUCT }} version 6 that introduces support for running your app in the cloud using Node.js version 16. {{ PRODUCT }} version 6 requires:
  *   {{ PRODUCT }} version 5
  *   Node.js version 16
  *   npm version 8
  *   Updating your application(s) to be compatible with Node.js version 16 and npm version 8. 

In order to simplify this migration, we have split Node.js version 16 support from the branding changes introduced by {{ PRODUCT }} version 5. We recommend that you perform the seamless {{ PRODUCT }} version 5 migration now and prepare for the changes that will be required by {{ PRODUCT }} version 6.

</Callout>

{{ PRODUCT }} version 5 updates our CLI, packages, and a configuration file with {{ PRODUCT }} branding. Additionally, our service will no longer modify duplicate query string parameters.

Migrate from version 4.x to 5 through the following steps:

1.  [Upgrade the {{ PRODUCT }} CLI.](#step-1-upgrade-the-edgio-cli)
2.  [Rename layer0.config.js.](#step-2-rename-layer0configjs)
3.  [Rename {{ PRODUCT }} packages.](#step-3-rename-edgio-packages)
4.  [Run {{ FULL_CLI_NAME }} init.](#step-4-run-edgio-init)
5.  [Update scripts that reference the {{ PRODUCT }} CLI.](#step-5-update-scripts-that-reference-the-edgio-cli)
6.  [Optional: Redirect cache manifest requests.](#optional-redirect-cache-manifest-requests)
7.  [Optional: Review your code for duplicate query string parameters.](#optional-review-your-code-for-duplicate-query-string-parameters)

## Step 1: Upgrade the {{ PRODUCT }} CLI {/*step-1-upgrade-the-cli*/}
 
We have renamed the {{ PRODUCT }} CLI from `0 | layer0` to `{{ CLI_NAME }} | {{ FULL_CLI_NAME }}`. Run the following command to install the latest version of our CLI:

`npm i -g @edgio/cli`

## Step 2: Rename layer0.config.js {/*step-2-rename-layer0configjs*/}

For each site, rename `layer0.config.js` to `edgio.config.js`. 

<Callout type="important">

  {{ PRODUCT }} version 5.x ignores the `layer0.config.js` configuration file.

</Callout>

## Step 3: Rename {{ PRODUCT }} Packages {/*step-3-rename-packages*/}

For each site, rename all references to {{ PRODUCT }} packages from `@layer0` to `{{ PACKAGE_NAME }}`.

-   **package.json:** In addition to renaming all {{ PRODUCT }} packages, you should also set their version to `5.0.0`.

    For example, the following excerpt from a `package.json` file references several @layer0 packages:

    ```
    ...          
      "devDependencies": {
        "@layer0/cli": "4.18.1",
        "@layer0/core": "4.18.1",
        "@layer0/devtools": "4.18.1",
    ...
    ```
       
    You should update all of these references as shown below.

    ```
    ...  
      "devDependencies": {
        "{{ PACKAGE_NAME }}/cli": "5.0.0",
        "{{ PACKAGE_NAME }}/core": "5.0.0",
        "{{ PACKAGE_NAME }}/devtools": "5.0.0",
    ...
    ```

-   **Import Statements:** Rename {{ PRODUCT }} packages within each `import` statement from `@layer0` to `{{ PACKAGE_NAME }}`. You can find these `import` statements within various files, such as `routes.ts`, `service-worker.js`, and your Next and Nuxt configuration files.

    For example, the following excerpt from a `routes.ts` file imports various @layer0 packages:

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

    For example, the following excerpt from a `next.config.js` file contains several @layer0 references:

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

## Step 4: Run {{ FULL_CLI_NAME }} init {/*step-4-run-init*/}

For each site, run the following command:

`{{ FULL_CLI_NAME }} init`

Proceed to the next step if this command is successful.

## Step 5: Update Scripts that Reference the {{ PRODUCT }} CLI {/*step-5-update-scripts-that-reference-the-cli*/}

Update all references to the {{ PRODUCT }} CLI within your scripts from `0 | layer0` to either `{{ CLI_NAME }}` or `{{ FULL_CLI_NAME }}`.

## Optional: Redirect Cache Manifest Requests {/*optional-redirect-cache-manifest-requests*/}

We have updated the location of the cache manifest file from `/__layer0__/cache-manifest.js` to `/__edgio__/cache-manifest.js`. This update may interfere with predictive prefetching for users that are active on your site during this migration. Ensure optimal performance during this migration by adding a route to `routes.ts` that redirects requests for the cache manifest to the new location:


```js
router.match('/__layer0__/', ({ redirect }) => {
  redirect('/__edgio__/')
})
```

## Optional: Review Your Code for Duplicate Query String Parameters {/*optional-review-your-code-for-duplicate-query-string-parameters*/}

{{ PRODUCT }} version 5 will no longer modify the request's query string when it detects a duplicate query string parameter.

For example, we will examine how both versions of {{ PRODUCT }} handle the following request:

`https://cdn.example.com/index.html?id=123&type=Sports&type=Basketball`

{{ PRODUCT }} version 4 will modify the duplicate query string parameters as shown below.

`https://cdn.example.com/index.html?id=123&type=Sports%5B0%5D&type%5B1%5D=Basketball`

{{ PRODUCT }} version 5, on the other hand, will not modify the query string as shown below.

`https://cdn.example.com/index.html?id=123&type=Sports&type=Basketball`

Review your code to see whether it generates duplicate query string parameters. If it does, update it to handle multiple query string parameters with the same name.

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 5!

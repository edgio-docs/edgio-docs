---
title: {{ PRODUCT }} Version 5 Migration Guide 
---

<Callout type="important">

  If you are using {{ PRODUCT }} version 3.x or earlier, you should review the [v4 Migration Guide](layer0_migration) before migrating to version 5.

</Callout>

<Callout type="tip">

   In the near future, we plan to release {{ PRODUCT }} version 6 that introduces support for running your app in the cloud using Node.js version 16. Before you can migrate to {{ PRODUCT }} version 6, you will first need to migrate to version 5. Once you have migrated to {{ PRODUCT }} version 6, you will need to update your application(s) to be compatible with Node.js version 16. Although we are introducing 2 major version changes within a short time period, both migrations should be seamless and may be performed as your schedule allows.

</Callout>

{{ PRODUCT }} version 5 updates our CLI, packages, and a configuration file with {{ PRODUCT }} branding. Migrate from version 4.x to 5 through the following steps:
1.  [Upgrade the {{ PRODUCT }} CLI.](#step-1-upgrade-the-edgio-cli)
2.  [Rename layer0.config.js.](#step-2-rename-layer0configjs)
3.  [Rename {{ PRODUCT }} packages.](#step-3-rename-edgio-packages)
4.  [Run {{ FULL_CLI_NAME }} init.](#step-4-run-edgio-init)
5.  [Update scripts that reference the {{ PRODUCT }} CLI.](#step-5-update-scripts-that-reference-the-edgio-cli)

## Step 1: Upgrade the {{ PRODUCT }} CLI {/*step-1-upgrade-the-edgio-cli*/}
 
We have renamed the {{ PRODUCT }} CLI from `0 | layer0` to `{{ CLI_NAME }} | {{ FULL_CLI_NAME }}`. As a result, upgrading the {{ PRODUCT }} CLI requires passing the `--force` flag as shown below:

`npm i -g @edgio/cli --force`

## Step 2: Rename layer0.config.js {/*step-2-rename-layer0configjs*/}

For each site, rename `layer0.config.js` to `edgio.config.js`. 

<Callout type="important">

  {{ PRODUCT }} version 5.x ignores the `layer0.config.js` configuration file.

</Callout>

## Step 3: Rename {{ PRODUCT }} Packages {/*step-3-rename-edgio-packages*/}

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

## Step 4: Run {{ FULL_CLI_NAME }} init {/*step-4-run-edgio-init*/}

For each site, run the following command:

`{{ FULL_CLI_NAME }} init`

Proceed to the next step if this command is successful.

## Step 5: Update Scripts that Reference the {{ PRODUCT }} CLI {/*step-5-update-scripts-that-reference-the-edgio-cli*/}

Update all references to the {{ PRODUCT }} CLI within your scripts from `0 | layer0` to either `{{ CLI_NAME }}` or `{{ FULL_CLI_NAME }}`.

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 5! 

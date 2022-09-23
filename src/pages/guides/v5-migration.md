---
title: {{ PRODUCT }} Version 5 Migration Guide 
---

Migrate from {{ PRODUCT }} version 4.x to 5 through the following steps:
1.  [Upgrade the {{ PRODUCT }} CLI.](#step-1-upgrade-the-edgio-cli)
2.  [Rename {{ PACKAGE_NAME }} layer0.config.js.](#step-2-rename-layer0configjs)
3.  [Rename {{ PACKAGE_NAME }} packages.](#step-3-rename-edgio-packages)

## Step 1: Upgrade the {{ PRODUCT }} CLI {/*step-1-upgrade-the-edgio-cli*/}
 
Upgrade your existing {{ FULL_CLI_NAME }} CLI through the `--force` flag as shown below:

`npm i -g @edgio/cli --force`

## Step 2: Rename layer0.config.js {/*step-2-rename-layer0configjs*/}

For each site, rename `layer0.config.js` to `edgio.config.js`. 

<Callout type="important">

  {{ PRODUCT }} version 5.x ignores the `layer0.config.js` configuration file.

</Callout>

## Step 3: Rename {{ PACKAGE_NAME }} Packages {/*step-3-rename-edgio-packages*/}

For each site, rename all references to {{ PACKAGE_NAME }} packages from `@layer0` to `{{ PACKAGE_NAME }}`.

-   **package.json:** In addition to renaming all {{ PACKAGE_NAME }} packages, you should also set their version to `5.0.0`.

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

-   **Import Statements:** Rename {{ PACKAGE_NAME }} packages within each `import` statement from `@layer0` to `{{ PACKAGE_NAME }}`. You can find these `import` statements within various files, such as `routes.ts`, `service-worker.js`, and your Next and Nuxt configuration files.

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
-   **Next app:** Rename all {{ PACKAGE_NAME }} references within your `next.config.js` from `@layer0` to `{{ PACKAGE_NAME }}`.

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

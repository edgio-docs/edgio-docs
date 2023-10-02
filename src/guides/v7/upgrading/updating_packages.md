---
title: Updating {{ PRODUCT }} Packages
---

This guide outlines how to update {{ PRODUCT }} packages using our CLI - covering version updates, dependency synchronization, and adjustments needed for compatibility across minor versions.


## Updating Your Project {/* updating-your-project */}

To update your project to the latest version of {{ PRODUCT }}, run the following command within the root directory of your project:

```bash
npx @edgio/cli use latest
```

This command will use the latest version of {{ PRODUCT }} available on npm. If you want to use a specific version, you can specify it as follows:

```bash
npx @edgio/cli use 7.2.0
```

### Verifying the Update {/* verifying-the-update */}

After updating your project, compare the dependency versions in your `package.json` file under the `@edgio` namespace. Ensure that all dependencies are using the same version. For example:

```json
  "devDependencies": {
    "@edgio/cli": "^7.2.5",
    "@edgio/core": "^7.2.5",
    "@edgio/devtools": "^7.2.5",
    "@edgio/next": "^7.2.5",
    "@edgio/prefetch": "^7.2.5",
    "@edgio/react": "^7.2.5",
    /* ... */
  }
```

<Callout type="info">

  The `{{ PACKAGE_NAME }}/rum` package dependency is not automatically update or synchronized with other `{{ PACKAGE_NAME }}` dependencies. If you are using this package, you must use a package manager to update this dependency manually.

</Callout>

## Changes from v7.x to v7.2 {/* changes-from-v7-v72 */}

{{ PRODUCT }} v7.2.0 introduces support for ESM-based user projects which may require some changes to your project. 

### External Dependencies in routes.js {/* external-dependencies-in-routesjs */}

If your `routes.js` file is loading external dependencies that are copied to the `.edgio` build folder, you may need to adjust the relative paths of imported assets based on their location. 

For example:

```js
require('server.js')
```

Should change to:

```js
require(join(process.cwd(), 'server.js'))
```

### Version Sync of @edgio Packages {/* version-sync-of-edgio-packages */}

Errors such as `TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined` might occur after updating Edgio packages. Often, these arise because versions of the `@edgio/` packages aren't synchronized. Ensure all related packages in `package.json` have consistent versions:

```json
"devDependencies": {
    "@edgio/cli": "^7.2.0",
    "@edgio/core": "^7.2.0",
    "@edgio/astro": "^7.2.0",
}
```

<Callout type="info">

  Fixing version sync issues may require deleting the `node_modules` directory, the `package-lock.json/yarn.lock` file, or both. After which, you must run the `npm install` or `yarn install` command.

</Callout>

If using npm/yarn workspaces, even if the versions are synchronized, you might encounter errors if the monorepo contains projects with different `@edgio` package versions. In such cases:

1. Update all projects in the monorepo to use the same version range of `@edgio` packages.
2. Lock the project to a specific version rather than a range. For instance, change `"@edgio/core": "^7.2.0"` to `"@edgio/core": "7.2.0"`.

### {{ PRODUCT }} Connectors {/* edgio-connectors */}

If your project uses a connector in `edgio.config.js` matching `@edgio/*`, no changes are required. These connectors are maintained by {{ PRODUCT }}.

### Custom Connectors {/* custom-connectors */}

If your project uses a [custom connector](/guides/sites_frameworks/connectors#writing-a-connector), the following adjustments may be necessary:

#### build.js: 

- Use `DeploymentBuilder.jsAppDir` instead of `DeploymentBuilder.jsDir`.
- Replace the `JS_DIR` constant with `JS_APP_DIR`.
- Change the destination folder when copying files from `.edgio/lambda` to `.edgio/lambda/app`.

#### prod.js:

Convert relative paths to absolute paths when importing files:

```js filename="prod.js ({{ PRODUCT }} v7.1 and earlier)"
require('../server.js')
// or
require('server.js')
``` 

Should change to:

```js filename="prod.js ({{ PRODUCT }} v7.2)"
require(join(process.cwd(), 'server.js'))
// or
require(resolve('server.js'))
```

### Working Path in Lambda:

The working path for the Lambda bundle has changed. If your project is referencing this path, you will need to update it. In most cases, this would only be necessary if you are using a custom connector.

- Old Path: `.edgio/lambda`
- New Path: `.edgio/lambda/app`

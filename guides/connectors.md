# Connectors

Connector packages help build and run your app within {{ PRODUCT_NAME }}. When you run `{{ CLI_NAME }} init`, {{ PRODUCT_NAME }} CLI detects the framework used by your app and installs the corresponding connector package. For example, if you use Next.js, `{{ PACKAGE_NAME }}/next` will be installed. If no connector package exists for the framework that you use, you can still deploy to {{ PRODUCT_NAME }} by implementing the connector interface directly in your app.

## Writing a connector

A {{ PRODUCT_NAME }} connector consists of four entry points:

- `init.js` - Called when the user runs `{{ CLI_NAME }} init`, adding resources to the project necessary for deploying on {{ PRODUCT_NAME }}. May also modify existing files with the project.
- `dev.js` - Called when the user runs `{{ CLI_NAME }} dev` to run their app in development mode.
- `build.js` - Called when the user runs `{{ CLI_NAME }} build` or `{{ CLI_NAME }} deploy`. Builds the application, copying resources into the `.{{ PRODUCT_NAME_LOWER }}` directory, which is ultimately zipped and uploaded to {{ PRODUCT_NAME }}.
- `prod.js` - Starts the application server in {{ PRODUCT_NAME }} cloud's serverless environment.

These files should be placed in the root directory of your connector package.

## init.js

Called when the user runs `{{ CLI_NAME }} init`. This entry point adds resources to the project necessary for deploying on {{ PRODUCT_NAME }}. It may also modify existing files within the project.

_Optional, if not provided, {{ CLI_NAME }} init will add a default router and {{ CONFIG_FILE }} to the user's project._

Example:

```js
/* istanbul ignore file */
const { join } = require('path')
const { DeploymentBuilder } = require('{{ PACKAGE_NAME }}/core/deploy')

/**
 * Called when the user runs {{ CLI_NAME }} init.
 */
export default async function init() {
  new DeploymentBuilder(process.cwd())
    // Copy files from the default-app directory within the connector package.
    // These typically include the routes.js file and {{ CONFIG_FILE }}. Typescript alternatives are often provided.
    .addDefaultAppResources(join(__dirname, 'default-app'))

    // Adds xdn:* scripts to package.json
    .addDefaultXdnScripts()
}
```

The default-app directory typically contains the following files:

```
/(connector-root)
  /default-app
    /all              # resources to be added to both JavaScript and TypeScript projects
      {{ CONFIG_FILE }}   # a default {{ CONFIG_FILE }} file
    /js               # resources to be added to projects that do not use TypeScript
      routes.js       # a JavaScript implementation of the default routes file
    /ts               # resouces to be added to projects that use TypeScript
      routes.ts       # a TypeScript implementation of the default routes file
```

Additional files can be added beyond the ones listed above. They will be copied into the root directory of the user's application.

## dev.js

Called when the user runs `{{ CLI_NAME }} dev`. This entry point is responsible for starting the user's application in development mode. The `{{ PACKAGE_NAME }}/core` library provides a `createDevServer` function to help with this.

_Optional, if not provided, {{ CLI_NAME }} dev will simply start {{ PRODUCT_NAME }} in local development mode, but will not start a framework application server._

Example:

```js
const { createDevServer } = require('{{ PACKAGE_NAME }}/core/dev')

module.exports = function() {
  return createDevServer({
    // All console output from your app will be prefixed with this label
    label: 'Sapper',

    // The command to start your app in dev mode
    command: () => 'npx sapper dev',

    // Once your app's console output has matched all of the following patterns, the "{{ PRODUCT_NAME }} ready on ..." message will be displayed
    ready: [/listening on/i],

    // A function that is called with every line of output from your app. Return true to show that line to the user, false to hide it.
    // Many connectors use this to hide lines like "Next.js ready on http://localhost:3001", which might confuse the user as to
    // which URL to use when testing their app behind {{ PRODUCT_NAME }}.
    filterOutput: line => !line.match(/some pattern/),
  })
}
```

## build.js

Exports a function that is called when you run `{{ CLI_NAME }} build`. It is responsible for constructing the bundle that is deployed to the {{ PRODUCT_NAME }} cloud. This function typically uses `{{ PACKAGE_NAME }}/core/deploy/DeploymentBuilder` to stage the exploded bundle in the `.xdn` directory.

_Optional, and not needed in most cases. The {{ CLI_NAME }} build command automatically creates a bundle that includes all static assets referenced in your routes file as well as the `prod` entry point mentioned above._

Example:

```js
const { DeploymentBuilder } = require('{{ PACKAGE_NAME }}/core/deploy')
const FrameworkBuildError = require('{{ PACKAGE_NAME }}/core/errors/FrameworkBuildError')

export default async function build({ skipFramework }) {
  const builder = new DeploymentBuilder(appDir)
  builder.clearPreviousBuildOutput()

  if (!skipFramework) {
    // run the sapper build
    try {
      await builder.exec('npx sapper build')
    } catch (e) {
      // this lets the user know that the build error was within their application code, not their {{ PRODUCT_NAME }} router or configuration.
      throw new FrameworkBuildError('Sapper')
    }
  }

  builder
    // optionally add some file required by the app at runtime.  This is equivalent to setting the includeFiles config in {{ CONFIG_FILE }}
    .addJSAsset('path/to/file/in/project')

  // build the {{ PRODUCT_NAME }} deployment bundle in the .xdn directory
  await builder.build()
}
```

## prod.js

{{ PRODUCT_NAME }} runs your application in its serverless cloud by proxying requests to your framework's application server, which it expects to be running on a specific port. The prod.js entry point exports a function that is called when a new serverless function is provisioned. It is responsible for starting your app on the provided port so that it can receive requests from {{ PRODUCT_NAME }}.

_Optional. This entry point is only needed if your app uses server-side rendering or calls the_ [renderWithApp](/docs/api/core/classes/_router_responsewriter_.responsewriter.html#renderwithapp) _method on ResponseWriter._

For example:

```js
module.exports = async function prod(port) {
  process.env.PORT = port.toString()

  // Most frameworks export some kind of express server or other http listener. Your prod script
  // just needs to start it and bind it to the provided port.  In the case of Sapper, the way to do
  // this is to set the PORT environment variable and run the provided server script
  require('./__sapper__/build/server/server')
}
```

Note that the prod entry point cannot have any external dependencies. If your prod entry point imports any non-native node modules, you'll need to bundle it with something like webpack or rollup before publishing your package.

Here is an example webpack config:

```js
// webpack.config.js
module.exports = {
  target: 'node',
  entry: {
    prod: './src/prod.js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].js',
    path: './dist',
    libraryTarget: 'umd',
  },
}
```

## Testing your connector locally before publishing it to NPM

To test your connector locally without publishing it to NPM:

1. Use `npm link`, `yarn link` or `yalc add` to add the local connector package as a project dependency.
2. Create an `{{ CONFIG_FILE }}` file in the root directory of your project.
3. Set the `connector` property to name of the connector package.

Now `{{ CLI_NAME }} init`, `{{ CLI_NAME }} dev`, `{{ CLI_NAME }} build`, and `{{ CLI_NAME }} deploy` commands will use the entry points in the connector, and your `prod.js` entrypoint will be used to serve requests in the {{ PRODUCT_NAME }} cloud.

## Implementing a connector directly within your project

If your project uses a framework that isn't supported by one of the official connector packages, you can still deploy to {{ PRODUCT_NAME }} by implementing your own connector directly within your project. To do so:

1. Create a directory for your connector.
2. Implement the entry points listed above.
3. Create an `{{ CONFIG_FILE }}` file in the root directory of your project.
4. Set the `connector` property to the relative path to the directory containing the connector

Example project structure:

```
/my-project
  /xdn              # reference this directory in the connector property in {{ CONFIG_FILE }}
    dev.js
    prod.js
    build.js
  {{ CONFIG_FILE }}
  ... other source files and directories ...
```

Example {{ CONFIG_FILE }}:

```js
module.exports = {
  connector: './xdn', // use the local connector located in the xdn directory
}
```

Once the connector is in place, `{{ CLI_NAME }} dev`, `{{ CLI_NAME }} build`, and `{{ CLI_NAME }} deploy` commands will use the entry points in the connector, and your `prod.js` entrypoint will be used to serve requests in the {{ PRODUCT_NAME }} cloud.

# Connectors

Connector packages help build and run your app within the XDN. When you run `xdn init`, the XDN CLI detects the framework used by your app and installs the corresponding connector package. For example, if you use Next.js, `@xdn/next` will be installed. If no connector package exists for the application framework that you use, you can still deploy to the XDN by adding the following files to your application:

## xdn/dev.js

Exports a function that is called when you run `xdn dev`. It should start your application in development. The `@xdn/core` library provides a `createDevServer` function to help with this.

Example:

```js
const { createDevServer } = require('@xdn/core/dev')

module.exports = function() {
  return createDevServer({
    // All console output from your app will be prefixed with this label
    label: 'Sapper',

    // The command to start your app in dev mode
    command: () => 'npx sapper dev',

    // Once your app's console output has matched all of the following patterns, the "MOOVWEB XDN ready on ..." message will be displayed
    ready: [/listening on/i],

    // A function that is called with every line of output from your app. Return true to show that line to the user, false to hide it.
    // Many connectors use this to hide lines like "Next.js ready on http://localhost:3001", which might confuse the user as to
    // which URL to use when testing their app behind the XDN.
    filterOutput: line => {
      return !line.match(/some pattern/)
    },
  })
}
```

## xdn/prod.js

Exports a function that is called when a new serverless function is provisioned in the XDN cloud. It is responsibility for starting your app on the provided port.

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

## xdn/build.js

_An xdn/build.js script is not required, and in many cases is not needed. The xdn build command automatically creates a bundle that includes all static assets referenced in your routes file as well as the `prod` entrypoint mentioned above._

Exports a function that is called when you run `xdn build`. It is responsible for constructing the bundle that is deployed to the XDN cloud. This function typically uses `@xdn/core/deploy/DeploymentBuilder` to stage the exploded bundle in the `.xdn` directory.

Example:

```js
const { DeploymentBuilder } = require('@xdn/core/deploy')

export default async function build({ skipFramework }) {
  const builder = new DeploymentBuilder(appDir)
  builder.clearPreviousBuildOutput()

  if (!skipFramework) {
    // run the sapper build
    try {
      await builder.exec('npx sapper build')
    } catch (e) {
      throw new FrameworkBuildError('Sapper')
    }
  }

  builder
    // add the xdn/prod.js entrypoint
    .addProdEntrypoint(join(__dirname, 'prod.js'))

    // optionally add some file required by the app at runtime.  This is equivalent to setting the includeFiles config in xdn.config.js
    .addJSAsset('path/to/file/in/project')

  // build the XDN deployment bundle in the .xdn directory
  await builder.build()
}
```

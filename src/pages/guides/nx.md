---
title: Nx
---

[Nx](https://nx.dev/) is a smart, fast and extensible build system with first class monorepo support and powerful integrations. It has a powerful core and a rich plugin ecosystem.

## Nx and {{ PRODUCT_NAME }} {/*nx-and-layer0*/}

Because every Nx project can be different, there are a couple ways to implement it.

1. Implement the connector at the root level of the Nx repo and specify in the connector which projects to configure.
2. Implement within the specific project folder inside your Nx repo. Specify commands at the root level Nx repo for interacting.

To learn more about what goes into making a connector, view this [connector guide](/guides/connectors).

## Example App {/* example-app */}

Here we use [Next.js](https://nextjs.org/) for the example Nx project.

<ExampleButtons
  title="Nx"
  siteUrl="https://layer0-docs-layer0-nx-example-default.layer0-limelight.link"
  repoUrl="https://github.com/layer0-docs/layer0-nx-example" 
  deployFromRepo />

{{ SIGN_UP_LAYER0 }}

{{ INSTALL_LAYER0_CLI }}

{{ SYSTEM_REQUIREMENTS }}

## Start a Nx project from scratch {/*start-a-nx-project-from-scratch*/}

The following steps take you through set-up of a new Nx workspace. The same process can be used to add Layer0 to your existing Nx repo.

### Generate the Nx workspace {/*generate-the-nx-workspace*/}

To create the starter workspace, we will us Nx to generate the workspace. For this example, we will use the Next.js preset, but you can easily adapt this to any framework. Visit the Nx [docs](https://nx.dev/getting-started/intro) for more information on the available [presets](https://nx.dev/cli/create-nx-workspace#preset).

Optionally, install nx globally.

```bash
npm i -g nx # optional but makes running nx commands easier
```

To create the workspace, run

```bash
npx create-nx-workspace --preset=next
```

There will be a series of questions. When the one to choose the `Application name` comes, enter __`layer0-nx-next-app`__. The other answers can be of your choosing.

### Add {{ PRODUCT_NAME }} to the application {/*add-layer0-to-the-application*/}

Because Nx wants dependencies installed at root level, we will `init` the project at root level to install the necesssary packages, but setup configurations to read into the next app we generated. The {{ PRODUCT_NAME }} next connector expects to be in the project repo, so we will create our own custom connector with the necesssary configurations.

```bash
0 init # installs necessary packages
```

Reorganize project

```bash
mv routes.js apps/layer0-nx-next-app/routes.ts
mv next.config.js apps/layer0-nx-next-app
```

Open `package.json` and change the `scripts > build` to the following:

```json
"build": "nx build layer0-nx-next-app",
```

Open `{{ CONFIG_FILE }}` and change the contents to the following:

```js
module.exports = {
  connector: './layer0',
  routes: './apps/layer0-nx-next-app/routes.ts',
};
```

Open `routes.ts` and change to the following:

```js
import { Router } from '@layer0/core/router';
import { nextRoutes } from '@layer0/next';

export default new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages
```

We need to add a custom connector now. You can either copy the whole folder from the example, or create each file below as instructed.

```
mkdir layer0
touch layer0/build.js
touch layer0/dev.js
touch layer0/nextSrcDir.js
touch layer0/prod.js
```

__build.js__
```js
const createBuilder =
  require('@layer0/next/build/createBuildEntryPoint').default;
const { join } = require('path');
const srcDir = require('./nextSrcDir');

module.exports = createBuilder({
  srcDir,
  distDir: join('dist', 'apps', 'layer0-nx-next-app', '.next'),
  buildCommand: 'npm run build',
});
```

__dev.js__
```js
const next = require('next');
const createDevServer = require('@layer0/core/dev/createDevServer').default;
const srcDir = require('./nextSrcDir');
const cwd = process.cwd();

module.exports = async function dev() {
  process.chdir(srcDir);
  global.LAYER0_NEXT_APP = next({ dev: true });
  process.chdir(cwd);

  return createDevServer({
    label: 'Next',
    command: (port) => `npx nx run layer0-nx-next-app:serve -- --port=${port}`,
    ready: [/on http:\/\/localhost:3001/i],
  });
};
```

__prod.js__
```js
module.exports = require('@layer0/next/prod').default;
```

__nextSrcDir.js__
```js
const { join } = require('path');
module.exports = join('apps', 'layer0-nx-next-app');
```

### Development {/*development*/}

To start the app locally running with {{ PRODUCT_NAME }}, run

```bash
0 dev
```

### Deploy {/*deploy*/}

To deploy the app to {{ PRODUCT_NAME }}, run

```bash
0 deploy
```

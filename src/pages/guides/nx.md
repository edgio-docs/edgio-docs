---
title: Nx
---

[Nx](https://nx.dev/) is a smart, fast and extensible build system with first class monorepo support and powerful integrations. It has a powerful core and a rich plugin ecosystem.

## Nx and {{ PRODUCT }} {/*nx-and-edgio*/}

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

{{ PREREQ }}

## Start a Nx project from scratch {/*start-a-nx-project-from-scratch*/}

The following steps take you through set-up of a new Nx workspace. The same process can be used to add {{ PRODUCT }} to your existing Nx repo.

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

There will be a series of questions. When the one to choose the `Application name` comes, enter __`{{ PRODUCT_NAME_LOWER }}-nx-next-app`__. The other answers can be of your choosing.

### Add {{ PRODUCT }} to the application {/*add-edgio-to-the-application*/}

Because Nx wants dependencies installed at root level, we will `init` the project at root level to install the necesssary packages, but setup configurations to read into the next app we generated. The {{ PRODUCT }} next connector expects to be in the project repo, so we will create our own custom connector with the necesssary configurations.

```bash
{{ CLI_NAME }} init # installs necessary packages
```

Reorganize project

```bash
mv routes.js apps/{{ PRODUCT_NAME_LOWER }}-nx-next-app/routes.ts
mv next.config.js apps/{{ PRODUCT_NAME_LOWER }}-nx-next-app
```

Open `package.json` and change the `scripts > build` to the following:

```json
"build": "nx build {{ PRODUCT_NAME_LOWER }}-nx-next-app",
```

Open `{{ CONFIG_FILE }}` and change the contents to the following:

```js
module.exports = {
  connector: './{{ PRODUCT_NAME_LOWER }}',
  routes: './apps/{{ PRODUCT_NAME_LOWER }}-nx-next-app/routes.ts',
};
```

Open `routes.ts` and change to the following:

```js
import { Router } from '@{{ PRODUCT_NAME_LOWER }}/core/router';
import { nextRoutes } from '@{{ PRODUCT_NAME_LOWER }}/next';

export default new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  .noIndexPermalink()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js');
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages
```

We need to add a custom connector now. You can either copy the whole folder from the example, or create each file below as instructed.

```
mkdir {{ PRODUCT_NAME_LOWER }}
touch {{ PRODUCT_NAME_LOWER }}/build.js
touch {{ PRODUCT_NAME_LOWER }}/dev.js
touch {{ PRODUCT_NAME_LOWER }}/nextSrcDir.js
touch {{ PRODUCT_NAME_LOWER }}/prod.js
```

__build.js__
```js
const createBuilder =
  require('@{{ PRODUCT_NAME_LOWER }}/next/build/createBuildEntryPoint').default;
const { join } = require('path');
const srcDir = require('./nextSrcDir');

module.exports = createBuilder({
  srcDir,
  distDir: join('dist', 'apps', '{{ PRODUCT_NAME_LOWER }}-nx-next-app', '.next'),
  buildCommand: 'npm run build',
});
```

__dev.js__
```js
const next = require('next');
const createDevServer = require('@{{ PRODUCT_NAME_LOWER }}/core/dev/createDevServer').default;
const srcDir = require('./nextSrcDir');
const cwd = process.cwd();

module.exports = async function dev() {
  process.chdir(srcDir);
  global.LAYER0_NEXT_APP = next({ dev: true });
  process.chdir(cwd);

  return createDevServer({
    label: 'Next',
    command: (port) => `npx nx run {{ PRODUCT_NAME_LOWER }}-nx-next-app:serve -- --port=${port}`,
    ready: [/on http:\/\/localhost:3001/i],
  });
};
```

__prod.js__
```js
module.exports = require('@{{ PRODUCT_NAME_LOWER }}/next/prod').default;
```

__nextSrcDir.js__
```js
const { join } = require('path');
module.exports = join('apps', '{{ PRODUCT_NAME_LOWER }}-nx-next-app');
```

### Development {/*development*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} dev
```

### Deploy {/*deploy*/}

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ CLI_NAME }} deploy
```

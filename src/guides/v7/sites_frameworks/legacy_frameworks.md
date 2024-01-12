---
title: Legacy Connectors
---

{{ PRODUCT }} v7.5.0 and below integrates the frameworks listed below through framework-specific connectors. These connectors are unsupported for use with {{ PRODUCT }} v7.6.0.

<Callout type="important">

  If your project uses one of these frameworks, then we recommend integrating it through our generic [Node.js connector](/guides/sites_frameworks/getting_started/nodejs_connector) instead.

</Callout>

<V7LegacyFrameworks />

[View additional frameworks.](/guides/sites_frameworks/getting_started)

## Pinning Your {{ PRODUCT }} Version {/*pinning-your-version*/}

If you wish to continue using a legacy connector, you may pin your {{ PRODUCT }} version to v7.5.0 or earlier using one of the following methods:

<SnippetGroup>

```bash tabLabel="npm"
#!/bin/bash

# Get a list of @edgio/* packages
packages=$(npm list --depth=0 | grep '@edgio/' | awk '{print $1}')

# Loop through each package and update it to version 7.5.0
for package in $packages; do
    npm install "${package}@7.5.0" --save
done

echo "All @edgio/* packages have been updated to version 7.5.0."

```

```bash tabLabel="Yarn 1 (Classic)"
#!/bin/bash

# Get a list of @edgio/* packages
packages=$(yarn list --depth=0 | grep '@edgio/' | awk '{print $2}' | awk -F@ '{print $1}')

# Loop through each package and update it to version 7.5.0
for package in $packages; do
    yarn add "${package}@7.5.0"
done

echo "All @edgio/* packages have been updated to version 7.5.0."
```

</SnippetGroup>

You can also manually set the version of each `{{ PACKAGE_NAME }}/*` package in your `package.json` file to `7.5.0`. Once you have updated all of your packages, run `npm install` or `yarn install` to install the new versions.

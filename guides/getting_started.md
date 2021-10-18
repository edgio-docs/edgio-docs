# Getting started

The easiest way to get started is using one of our "Deploy to Layer0" buttons listed below. Choose from a couple popular frameworks listed, or expand the menu item for Frameworks and choose your preferred option.

### Vue.js

[Deploy Vue.js to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Fstatic-vuejs-example&button&deploy)

### Next.js

[Deploy Next.js to Layer0](https://app.layer0.co/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-example&button&deploy)

## New or existing applications

Generate a new app or deploy an existing one to {{ PRODUCT_NAME }}. You will need to already have a [{{ PRODUCT_NAME}} account](https://app.layer0.co/signup). Follow the steps below.

#### Required

[Install Node.js](/guides/install-nodejs) (>= 14)

### Existing app

To add {{ PRODUCT_NAME }} to an existing app, run the following:

```bash
npm i -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
{{ CLI_NAME }} deploy
```

### New app

To create a new {{ PRODUCT_NAME }} compatible app, run:

```bash
# npm
npm create {{ STARTER_NAME }}@latest
{{ CLI_NAME }} deploy
```

or

```bash
# yarn
yarn create {{ STARTER_NAME }}@latest
{{ CLI_NAME }} deploy
```

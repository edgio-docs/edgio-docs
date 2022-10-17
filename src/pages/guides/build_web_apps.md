---
title: Build web apps
---

The easiest way to get started is by using one of our "Deploy to {{ PRODUCT }}" buttons.

{{ PRODUCT }} supports many frameworks out of the box. Choose from two of the most popular frameworks below, or expand the menu item for Frameworks and choose your preferred framework to view the specific guide.

**{{ PRODUCT_NAME }} only supports Node.js version 14**

### Nuxt.js {/*nuxtjs*/}

[Deploy Nuxt.js to {{ PRODUCT }}]({{ APP_URL }}/deploy?button&deploy&repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nuxt-example)

### Next.js {/*nextjs*/}

[Deploy Next.js to {{ PRODUCT }}]({{ APP_URL }}/deploy?repo=https%3A%2F%2Fgithub.com%2Flayer0-docs%2Flayer0-nextjs-example&button&deploy)

**More frameworks available under "Frameworks" in the nav.**

## New or existing applications {/*new-or-existing-applications*/}

Generate a new app or deploy an existing one to {{ PRODUCT_NAME }}. You will need to already have a [{{ PRODUCT_NAME}} account]({{ APP_URL }}/signup). Follow the steps below.

{{ SYSTEM_REQUIREMENTS_H3 }}

### Existing app {/*existing-app*/}

To add {{ PRODUCT_NAME }} to an existing app, run the following:

```bash
$ npm i -g {{ PACKAGE_NAME }}/cli # yarn global add {{ PACKAGE_NAME }}/cli
$ {{ FULL_CLI_NAME }} init
$ {{ FULL_CLI_NAME }} deploy
```

### New app {/*new-app*/}

To create a new {{ PRODUCT_NAME }} compatible app, run:

```bash
# npm
npm create {{ STARTER_NAME }}@latest
{{ FULL_CLI_NAME }} deploy
```

or

```bash
# yarn
yarn create {{ STARTER_NAME }}@latest
{{ FULL_CLI_NAME }} deploy
```

# Getting Started

## Install Node.js and npm

**{{ PRODUCT_NAME }} only supports Node.js version 12 and higher**

If you do not have Node.js installed on your system, download and install it from the official [Node.js v12.x downloads](https://nodejs.org/dist/latest-v12.x/) page. Select the download that matches your operating system and run the installer. Note that the installer for Node.js will also install npm.

_Note that while you can use any version of Node.js >= 12 locally, your app will run in Node 12 when deployed to the {{ PRODUCT_NAME }} cloud. Therefore we highly suggest using Node 12 for all development._

## Adding {{ PRODUCT_NAME }} to an existing app

To add {{ PRODUCT_NAME }} to an existing app, run the following:

```bash
npm i -g {{ PACKAGE_NAME }}/cli
{{ CLI_NAME }} init
```

## Creating a new {{ PRODUCT_NAME }} app

To create a new {{ PRODUCT_NAME }} app, run:

```bash
npm create xdn-app@latest
```

... or using yarn ...

```bash
yarn create xdn-app@latest
```

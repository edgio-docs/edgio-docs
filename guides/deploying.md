# Deploying 

This guide walks you through deploying your first site to the Moovweb XDN.

## Create your Account

To deploy your site to the Moovweb XDN, you must first sign up for a free account.  [Sign up here.](https://moovweb.app/signup)

## Install the XDN CLI

Next, globally install the XDN cli using npm:

```js
npm i -g @xdn/cli
```

Or using yarn:

```js
yarn global add @xdn/cli
```

## xdn deploy

Then, run the following to deploy your site to your private space on the Moovweb XDN:

```
xdn deploy
```

The CLI will automatically detect the framework you're using, create an optimized production build, and upload it to the Moovweb XDN.  This takes about a minute for most applications.

Once the deployment is complete, the CLI will output the URL for your site.  The site name is automatically derived from the `name` field in `package.json`.  This can be overriden by using `--site` option when running `xdn deploy`.

## Branches and Deployments

Each time you deploy your site to the Moovweb XDN a "deployment" is created and given a unique and permanent URL based on the team name, site name, branch name in source control, and an incrementing deployment number.  If you use Git, the branch name is set by the default.  If not, you can specify the `--branch` option when running `xdn deploy`.

![deployments](../images/deploying/deployments.png)

Having each deployment be simultaneaously and permanently accessible makes it easy to preview other developer's work before merging a pull request and enables you to "go back in time" to find where a bug or change in behavior originated.  We recommend configuring your CI environment to deploy every push to the XDN.  For more information, see [CI](../ci)

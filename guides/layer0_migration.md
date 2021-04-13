We are excited to announce that our company and platform name will be changing as of April 13, 2021 to Layer0. Our product will remain the same and your site will not be affected.

After April 13th, you'll login to a new Layer0 branded console at [app.layer0.co]() instead of [moovweb.app]() but can continue to use the same login method and credentials you use today. We look forward to launching this new branding with you!

## What will change automatically?

During the migration, there are a few key items that will automatically be updated that you should be aware of.

### Developer Console

https://moovweb.app will become https://app.layer0.co. Use this new link going forward to access your site(s).

### Edge and Permalinks

Edge links with `*.moovweb-edge.io` will become `*.layer0.link`. Your current edge links will switch to the new format on the next deployment for that environment. Old edge links will continue to work even after the first deployment.

Permalinks with `*.free.moovweb.io` will become `*.free.layer0-perma.link`. These links will all automatically switch to the new Layer0 links in the Developer Console and, unlike edge links, will be available without needing a deployment of your site. However, we will continue to support old and new permalinks.

During this transition, your live site is unaffected and custom domains URLs are not affected.

## What will I need to change going forward?

Going forward, you will access your site(s) via https://app.layer0.co. For developer documentation about Layer0, visit https://docs.layer0.co.

In the meantime, your site will continue to function as normal with no code changes. However, to ensure your project remains up-to-date with the latest platform features, you will need to upgrade to the latest Layer0 packages available on NPM.

### Upgrading Packages

To upgrade your packages, you will need to install the latest version of the Layer0 CLI. You should install this globally using: `npm i -g @layer0/cli`.

Once installed, change into your project’s directory. The original XDN configuration file has been renamed. Run `mv xdn.config.js layer0.config.js` or manually rename the file to move the configuration to Layer0.

The dependencies defined in `package.json` have changed scope from `@xdn` to `@layer0`. To install the latest Layer0 dependencies, run `layer0 init`. This will update `package.json` with the new Layer0 dependencies and scripts for building and deploying your site. You can then remove any entries for dependencies beginning with `@xdn` as they will no longer be used. Note: if you had modified the original scripts such as `xdn:deploy`, ensure those changes are moved over to the new `layer0:\*` script entries.

Lastly, your site code will need to be updated to reference the new `@layer0` modules. Using the find-and-replace method, you can update these references from `@xdn/` to `@layer0/`. Be cautious about a global replacement of these instances. Be sure you are only updating references within your project code and not other resources such as:

- `node_modules/\*`
- `package.json`
- `package-lock.json`
- `yarn.lock`
- etc.

Build your project and verify everything is functioning as expected. You should then deploy your site to your testing environment and re-verify functionality.

## What else has changed?

### Access Logs

The `xdn` field in the access logs has been renamed to `v`: https://developer.moovweb.com/guides/logs#section_xdn

#### Response Headers

The prefixes of the response headers have changed from `x-xdn-*` to `x-0-*`. For example, `x-xdn-t` is now `x-0-t`.

#### Cookies

The prefixes of the cookies have changed from `xdn` to `layer0`. For example, `xdn_destination` is now `layer0_destination`.

#### REST API

If you are using the REST API, the current URL will continue to work, but it is recommended to update to the new endpoint. For example, https://moovweb.app/api/v1/ should be changed to https://app.layer0.co/api/v1/.

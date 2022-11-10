---
title: WordPress Integration
---

Improve performance for a website powered by a [WordPress](https://www.wordpress.com) instance by proxying traffic through {{ PRODUCT }}. This reduces latency by allowing your website content to be cached across our global network. It also empowers you to securely deliver your website content and to take advantage of other performance enhancements, such as Predictive Prefetching. Finally, you may manage cached website content from within your WordPress control panel through our free WordPress plugin.

## What is WordPress? {/*what-is-wordpresss*/}

WordPress is a content management system (CMS) that allows you to host and build websites. WordPress contains plugin architecture and a template system, so you can customize any website to fit your business, blog, portfolio, or online store.

{{ PREREQ }}

## Getting Started {/*getting-started*/}

### Create a new WordPress site {/*create-a-new-wordpress-site*/}

If you don't already have a WordPress site, create one by following the [official WordPress.com guide](https://wordpress.com/support/start/). You may also use other WordPress providers, but setup instructions may differ.

### Create via {{ PRODUCT }} Developer Console {/*create-via-developer-console*/}

1. First, [login to the Developer Console]({{ LOGIN_URL }}) and locate the **New Site** button.

![New Site button](/images/app-edge/new-site-button.png)

2. Next, enter your WordPress site's domain name. This will eventually become the origin backend that you will [proxy to](cookbook#proxying-an-origin) once your site is setup.

![Add New Site dialog](/images/app-edge/add-new-site-dialog.png)

3. Once your site is created, copy the generated command into your terminal (💻) and run it at the root of your project. This will initialize your project source code with {{ PRODUCT }} and automatically deploy your site. If you do not have your WordPress source code locally, choose the **Create a new directory** option from the CLI.

![Quick Start Deploy Command](/images/app-edge/quickstart-deploy-command.png)

An example command for **www.yourdomain.com**:
```bash
  npx {{ PACKAGE_NAME }}/cli@latest init \
    --name yourdomain.com \
    --environment production \
    --origin www.yourdomain.com \
    --deploy
```

4. Finally, you can start to update your {{ PRODUCT }} router (`routes.js`) and configuration file (`{{ CONFIG_FILE }}`) to [proxy your origin](#configure-backend-to-proxy) and [setup caching rules](#configure-caching).

### Run the WordPress app locally on {{ PRODUCT }} {/*run-the-wordpress-app-locally-on*/}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/*deploying*/}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ FULL_CLI_NAME }} build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deploying](deploy_apps) guide for more information on the `deploy` command and its options.

## Direct Traffic to {{ PRODUCT_PLATFORM }} {/*direct-traffic-to*/}

Once you have confirmed that your deployed {{ PRODUCT }} site is proxying content from your hosted WordPress site, you may go back to your site in the [Developer Console]({{ LOGIN_URL }}) and follow the instructions on configuring your production DNS to point to {{ PRODUCT }}. Refer to the [Custom Domains and SSL guide](production) to additional defails.

## WordPress Plugin {/*wordpress-plugin*/}

{{ PRODUCT }} provides a WordPress plugin you may leverage to automatically clear the {{ PRODUCT }} cache when a change is made to your site.

First, to obtain the latest plugin version, [click here](/archive/github/edgio/edgiowordpress/wp-content/plugins/edgio) to download the ZIP file.

<ButtonLink href="/archive/github/edgio/edgiowordpress/wp-content/plugins/edgio">
  Download Plugin
</ButtonLink>

Next, in your WordPress control panel, navigate to the **Plugins** page and click **Upload**. Navigate to your local download directory and select the **edgio.zip** file for upload.

![plugins page](/images/wordpress/plugins_page.png)

Once the plugin has been uploaded, click **Manage Plugin**.

![manage plugin](/images/wordpress/manage_plugin.png)

Navigate to **Settings > {{ PRODUCT }}** to pull up the form for the required information. You may see errors indicating that the {{ PRODUCT }} plugin is missing information. 

![plugin settings](/images/wordpress/plugin_settings.png)

In order for the plugin to be able to interact with the {{ PRODUCT_PLATFORM }}, you'll need to provide the following:

- Environment Name
- API Key

![plugin fields](/images/wordpress/plugin_fields.png)

**Environment Name** refers to the {{ PRODUCT }} environment as defined in the [Developer Console]({{ LOGIN_URL }}) for your site. This value will typically be `default` or `production` depending on how your site is setup, but can be any valid environment that you have created.

To obtain the **API Key**, go to your site within the [{{ PRODUCT }} Developer Console]({{ LOGIN_URL }}). Click **Settings > Create new Deploy Token** and enter in a name for the token.

![plugin fields](/images/wordpress/deploy_token.png)

Once created, copy the token to the **API Key** field of the WordPress plugin. After you've completed all the fields, click **Save Changes**. 

Lastly, test the behavior by clicking **Clear Cache**. You can validate the cache clearing was successful by checking the **Activity** tab of your site:

![purge activity](/images/wordpress/purge_activity.png)

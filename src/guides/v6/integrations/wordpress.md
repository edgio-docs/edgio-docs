---
title: WordPress Integration
---

Optimize your [WordPress](https://www.wordpress.com) website's performance and security with {{ PRODUCT }}. Proxying traffic through our global network reduces latency and enhances the delivery of your website content. With our free WordPress plugin, you can manage cached website content directly from your control panel. Additionally, {{ PRODUCT }} offers advanced performance enhancements such as Predictive Prefetching for an even better user experience. Upgrade your website's performance today with {{ PRODUCT }}!

## What is WordPress? {/* what-is-wordpresss */}

WordPress is a content management system (CMS) that allows you to host and build websites. WordPress contains plugin architecture and a template system, so you can customize any website to fit your business, blog, portfolio, or online store.

{{ PREREQ.md }}

## Getting Started {/* getting-started */}

### Create a new WordPress site {/* create-a-new-wordpress-site */}

If you don't already have a WordPress site, create one by following the [official WordPress.com guide](https://wordpress.com/support/start/). You may also use other WordPress providers, but setup instructions may differ.

### Create via {{ PORTAL }} {/* create-via-developer-console */}

1. First, [log in to the {{ PORTAL }}]({{ LOGIN_URL }}) and locate the **New Site** button.

![New Site button](/images/app-edge/new-site-button.png)

2. Next, enter your WordPress site's domain name. This will eventually become the origin backend that you will [proxy to](/guides/performance/cdn_as_code/common_routing_patterns#proxying-an-origin) once your site is setup.

![Add New Site dialog](/images/app-edge/add-new-site-dialog.png)

3. Once your site is created, copy the generated command into your terminal (💻) and run it at the root of your project. This will initialize your project source code with {{ PRODUCT }} and automatically deploy your site. If you do not have your WordPress source code locally, choose the **Create a new directory** option from the CLI.

![Quick Start Deploy Command](/images/app-edge/quickstart-deploy-command.png)

An example command for **www.yourdomain.com**:

```bash
  npx {{ PACKAGE_NAME }}/cli@{{ PACKAGE_VERSION }} init \
    {{ INIT_ARG_EDGIO_VERSION }} \
    --name yourdomain.com \
    --environment production \
    --origin www.yourdomain.com \
    --deploy
```

4. Finally, you can start to update your {{ PRODUCT }} router (`routes.js`) and configuration file (`{{ CONFIG_FILE }}`) to [proxy your origin](#configure-backend-to-proxy) and [setup caching rules](#configure-caching).

### Run the WordPress app locally on {{ PRODUCT }} {/* run-the-wordpress-app-locally-on */}

Test your app with the {{ PRODUCT_PLATFORM }} on your local machine by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} dev
```

Load the site http://127.0.0.1:3000

## Deploying {/* deploying */}

Create a production build of your app by running the following in your project's root directory:

```bash
{{ FULL_CLI_NAME }} build
```

Deploy your app to the {{ PRODUCT_PLATFORM }} by running the following command in your project's root directory:

```bash
{{ FULL_CLI_NAME }} deploy
```

Refer to the [Deployments](/guides/basics/deployments) guide for more information on the `deploy` command and its options.

## Direct Traffic to {{ PRODUCT_PLATFORM }} {/* direct-traffic-to */}

Once you have confirmed that your deployed {{ PRODUCT }} site is proxying content from your hosted WordPress site, you may go back to your site in the {{ PORTAL_LINK }} and follow the instructions on configuring your production DNS to point to {{ PRODUCT }}.

[Learn more.](/guides/basics/domains)

## WordPress Plugin {/* wordpress-plugin */}

{{ PRODUCT }} provides a WordPress plugin you may leverage to set cache TTL and automatically clear the {{ PRODUCT }} cache when a change is made to your site.

First, to obtain the latest plugin version, [click here](/zip/edgio_wordpress_plugin.zip) to download the ZIP file.

<ButtonLink href="/zip/edgio_wordpress_plugin.zip">
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
- Browser Cache TTL (seconds)
- Edge Cache TTL (seconds)
- Cache Stale-While-Revalidate (seconds)

![plugin fields](/images/wordpress/plugin_fields.png)

**Environment Name** refers to the {{ PRODUCT }} environment as defined in the {{ PORTAL_LINK }} for your site. This value will typically be `default` or `production` depending on how your site is setup, but can be any valid environment that you have created.

To obtain the **API Key**, go to your site within the [{{ PORTAL }}]({{ LOGIN_URL }}). Click **Settings > Create new Deploy Token** and enter in a name for the token.

For information on the **Browser Cache TTL**, **Edge Cache TTL**, and **Cache Stale-While-Revalidate** fields, refer to the [Caching guide](/guides/performance/caching).

![plugin fields](/images/wordpress/deploy_token.png)

Once created, copy the token to the **API Key** field of the WordPress plugin. After you've completed all the fields, click **Save Changes**.

Lastly, test the behavior by clicking **Clear Cache**. You can validate the cache clearing was successful by checking the **Activity** tab of your site:

![purge activity](/images/wordpress/purge_activity.png)

With {{ PRODUCT }}, you never have to worry about outdated content. Whenever you make updates to a page on your WordPress site, our plugin automatically clears the cache for the changed page. This ensures that your viewers will always have access to the most up-to-date content. The {{ PRODUCT }} plugin provides a seamless, efficient solution to keep your website's content fresh and accessible to your audience, without any manual intervention required.

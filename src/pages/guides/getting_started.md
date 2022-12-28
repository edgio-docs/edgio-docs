---
title: Getting Started
---

Get started with {{ PRODUCT }} by satisfying our [prerequisites](#prerequisites) and then performing these steps:

1.  [Create an {{ PRODUCT }} property.](#create-property)
2.  [Test your property.](#testing-locally)
3.  [Deploy your property to {{ PRODUCT }}.](#deploy-property)
4.  [Next steps.](#next-steps)

## Quick Start {/*quick-start*/}

If you already have [Node.js v{{ NODE_VERSION }}](/guides/install_nodejs) and an [{{ PRODUCT }} account](#account-creation), then you can use a single command to:
-   Install the {{ PRODUCT }} CLI.
-   Create an {{ PRODUCT }} property for your website.
-   Deploy a property to {{ PRODUCT }}.

<Callout type="tip">

  An alternative approach is to perform each of the above tasks individually. 

  [Learn more.](#prerequisites)

</Callout>

Run one of the following commands from the root directory of your web application or website:
-   **Origin:** Run this command if you have web servers that will serve as the origin.
-   **Framework:** Run this command to render your web app within our cloud through {{ PRODUCT_PLATFORM }}.

<Callout type="info">

  Replace `<PROPERTY>` with the name for this configuration. If you are also setting `<DOMAIN>`, then you should replace it with your website's domain or IP address.

</Callout>

<SnippetGroup>

```bash tabLabel=Origin
  npx {{ PACKAGE_NAME }}/cli@latest init \
	--name <PROPERTY> \
	--environment default \
	--origin <DOMAIN> \
	--deploy
```

```bash tabLabel=Framework
  npx {{ PACKAGE_NAME }}/cli@latest init \
        --name <PROPERTY> \
        --environment default \
        --deploy
```

</SnippetGroup>

You are now ready to optimize and secure the delivery of your website. 
[Learn more.](#next-steps)

## Prerequisites {/*prerequisites*/}

{{ PRODUCT }} requires:
-   [Node.js v{{ NODE_VERSION }}](/guides/install_nodejs)
-   npm or yarn package manager

    <Callout type="info">

      npm is installed with Node.js, while yarn requires a separate installation.

    </Callout>

-   {{ PRODUCT }} CLI
-   {{ PRODUCT }} account

### {{ PRODUCT }} CLI Installation {/*cli-installation*/}

Use the [{{ PRODUCT }} CLI](/guides/develop/cli) to build, test, and deploy your website to {{ PRODUCT }}. Install it through either npm or yarn.

<SnippetGroup>

```bash tabLabel=npm
npm i -g {{ PACKAGE_NAME }}/cli
```

```bash tabLabel=Yarn
yarn global add {{ PACKAGE_NAME }}/cli
```

</SnippetGroup>

### {{ PRODUCT }} Account Creation {/*account-creation*/}

Signing up for an {{ PRODUCT }} account is free and quick.

1.  [Sign up now by either:]({{ APP_URL }}/signup)

    -   Manually creating an account.
        1.   Provide your name, email (user name), and a password. Click **Create Account**.
        2.   Check your email for confirmation instructions. Click **CONFIRM MY ACCOUNT** to load the {{ PRODUCT }} Developer console.
    -   Using your existing Github or Google account. You will need to log in to Github or Google and then authorize linking Edgio to your account.

2.  Click **Accept** to accept our terms of service and privacy policy.

## Step 1: Create an {{ PRODUCT }} Property {/*create-property*/}

Each website that will run behind {{ PRODUCT }} requires an {{ PRODUCT }} property. A property determines how {{ PRODUCT }} will process your website's traffic.

1.  From the {{ PRODUCT }} Developer console, set the **What is your website's URL?** option to your website's URL and then click **Launch my site**.

    <Callout type="info">

      If you have previously created a site, you will need to click **+ New Site**, provide your website's URL, and then click **Create my site**.

    </Callout>

2.  From the command line or terminal, navigate to a directory where project files will be stored.

    <Callout type="tip">

      If possible, try to use your website's root directory.

    </Callout>

3.  Run one of the following commands:
    -   **Origin:** Run this command if you have web servers that will serve as the origin.
    -   **Framework:** Run this command to render your web apps within our cloud through {{ PRODUCT_PLATFORM }}.

    <Callout type="info">

      Replace `<PROPERTY>` with the domain defined in step 1. If you are also setting `<DOMAIN>`, then you should replace it with your website's domain or IP address.

    </Callout>

    <SnippetGroup>

    ```bash tabLabel=Origin
      {{ FULL_CLI_NAME }} init --name <PROPERTY> \
        --environment production \
        --origin <DOMAIN> 
    ```

    ```bash tabLabel=Framework
      {{ FULL_CLI_NAME }} init --name <PROPERTY> \
        --environment production 
    ```

    </SnippetGroup>

4.  When prompted, confirm the selection of `Use the current directory` by pressing the `ENTER` key.
5.  When prompted, select either the `npm` or `yarn` package manager and then press the `ENTER` key.

## Step 2: Testing Locally {/*testing-locally*/}

You may run {{ PRODUCT }} in local development mode to preview your website on your local machine prior to deployment. Local development mode allows for rapid development by allowing you to quickly test changes prior to deployment.

1.  From the command line or terminal, type `{{ FULL_CLI_NAME }} dev`.
2.  Preview your website by loading `https://127.0.0.1:3000` from within your preferred web browser.

## Step 3: Deploying Your Property {/*deploy-property*/}

Run the following command from your property's root directory to deploy it to {{ PRODUCT }}:

```bash
{{ FULL_CLI_NAME }} deploy
```

## Next Steps {/*next-steps*/}

Once you have successfully deployed your property to {{ PRODUCT }}, our CLI provides the following edge URLs:
-   The first edge URL corresponds to production traffic. {{ PRODUCT }} will not serve this URL until you set up a TLS certificate and update your DNS configuration to point to our service. [Learn more.](/guides/basics/domains)
-   Use the second edge URL to preview your website behind {{ PRODUCT }}.

You are now ready to set up:

-   [Performance.](/guides/performance/getting_started) Learn how to:
    -   Optimize website performance through our CDN-as-code approach to [caching](/guides/performance/getting_started#configure-caching), [routing](/guides/performance/cdn_as_code) your content, and [predictive prefetching](/guides/performance/prefetching).
    -   Gain performance insights through which you can fine-tune your configuration through our [Observability](/guides/performance/observability/core_web_vitals) solution.
    -   Speed up development by quickly iterating through different variations of your site through our [Traffic Splitting](/guides/performance/traffic_splitting) solution.
-   [Security.](/guides/security) We automatically provide distributed denial-of-service (DDOS) protection to traffic that runs behind {{ PRODUCT }}. Apply additional protection to your web applications and APIs through our Web Application Firewall and Advanced Bot Management solutions. {{ ACCOUNT_UPGRADE }}
-   [Sites.](/guides/sites_frameworks/getting_started) If you are currently using a JavaScript framework, then you can improve your website's performance by using our serverless workers to quickly render server-side content in a scalable manner.

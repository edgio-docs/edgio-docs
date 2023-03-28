---
title: Getting Started
---

Get started with {{ PRODUCT }} by performing these steps:

1.  [Create an {{ PRODUCT }} account.](#create-account)
2.  [Create an {{ PRODUCT }} property.](#create-property)
3.  [Test your property.](#testing)
4.  [Next steps.](#next-steps)

## Step 1: Create an {{ PRODUCT }} Account {/*create-account*/}

Signing up for an {{ PRODUCT }} account is free and quick.

1.  [Sign up now by either:]({{ APP_URL }}/signup)

    -   Manually creating an account.
        1.   Provide your name, email (user name), and a password. Click **Create Account**.
        2.   Check your email for confirmation instructions. Click **CONFIRM MY ACCOUNT** to load the {{ PORTAL }}.
    -   Using your existing Github or Google account. You will need to log in to Github or Google and then authorize linking Edgio to your account.

2.  Click **Accept** to accept our terms of service and privacy policy.

## Step 2: Create an {{ PRODUCT }} Property {/*create-property*/}

Each website that will run behind {{ PRODUCT }} requires an {{ PRODUCT }} property. A property determines how {{ PRODUCT }} will process your website's traffic.

1.  From the {{ PORTAL }}, click **+ New Property**.

    ![+ New Property](/images/v7/basics/property-create-1.png?width=450)

2.  In the **Property Name** option, assign a name to your new property (e.g., `My Property`).
3.  Under the **Hostnames** section, click **+ Add Hostname** and then type a domain (e.g., `www.example.com` or `cdn.example.com`) that will be served through {{ PRODUCT }}.

    ![+ New Property](/images/v7/basics/property-create-2.png?width=450)

4.  An origin configuration identifies a set of web servers that will serve as the source for the content served through {{ PRODUCT }}.

    <Callout type="info">

      If you are integrating a JavaScript framework with {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, then you will take advantage of our CDN-as-code approach to configuration. This approach allows you to define your CDN configuration, including backends, within your code. Additionally, it allows you to fulfill requests through [Serverless Compute](/guides/performance/serverless_compute). As a result, you are not required to define an origin configuration.

    </Callout>

    Perform one of the following steps:

    -   **Origin:** Define the set of web servers that will serve as the origin for the hostname defined in step 3 by setting the **Origin Hostname** option to a domain or an IP address (e.g., `www-origin.example.com` or `192.0.2.222`) that points to them. 

        <Callout type="info">

          You may safely ignore the other origin settings until you are ready to fine-tune your setup. [Learn more about origins.](/guides/basics/hostnames_and_origins#origin)

        </Callout>

        Your origin configuration should now look similar to this:

        ![+ New Property](/images/v7/basics/property-create-3-a.png?width=450)

    -   **Framework:** If you are integrating a JavaScript framework with {{ PRODUCT }} {{ PRODUCT_PLATFORM }}, then delete the `web` origin by clicking the <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon that appears next to it. 

        Your origin configuration should now look similar to this:

        ![+ New Property](/images/v7/basics/property-create-3-b.png?width=450)

5.  Click **Create Property**.
6.  If you have defined at least one origin configuration, your property will be automatically deployed to the {{ PRODUCT }} network. [Proceed to Step 3: Test Your Property.](#test-your-property)

    **JavaScript Framework Only:** If you are using a JavaScript framework, then you should use the {{ PRODUCT }} CLI to initialize your property. 

    <Callout type="info">

      This step requires [Node.js v{{ NODE_VERSION }}](/guides/install_nodejs). 

    </Callout>

    Install the {{ PRODUCT }} CLI, initialize your property, and then deploy it by running the following command from the root directory of your web application or website:

    ```bash
    npx {{ PACKAGE_NAME }}/cli@latest init \
      --name <PROPERTY> \
      --api-url https://api.edgio.app \
      --deploy
    ```

    Replace `<PROPERTY>` with the name of the property defined in step 2. You should only use lower-case characters and replace spaces with dashes (e.g., `my-property`). 

    Once you have successfully deployed your property to {{ PRODUCT }}, our CLI provides an edge URL that allows you to preview your site. Learn how to [get started with CDN-as-code.](/guides/performance/cdn_as_code/getting_started)

## Step 3: Test Your Property

Once your property is successfully deployed to the {{ PRODUCT }} network, a URL will appear within the **Latest Production Deployment** section. Follow that link to preview your site behind {{ PRODUCT }}.

![Latest Production Deployment](/images/v7/basics/deployment-latest-production.png)

## Next Steps {/*next-steps*/}

Congratulations on setting up a basic property on {{ PRODUCT }}! 

You are now ready to:

-   Fine-tune your [origin configuration](/guides/basics/hostnames_and_origins#origin).

    For example, you can enable Server Name Indication (SNI) on an origin configuration or shield it from requests to reduce network bandwith usage and the load on your web servers.

-   If you plan on collaborating with other team members, then you should [create a team](/guides/basics/collaboration). After which, you will need to either create a property for that team or [transfer the ownership of your new property](/guides/basics/properties#transfer-ownership) to that team.
-   [Create environments](/guides/basics/environments) to match your software development workflow. Each environment provides site previews that allow QA testers, code reviewers, and other stakeholders to immediately try out newly introduced changes before they are introduced into your production environment. 
-   Set up {{ PRODUCT }} [Performance.](/guides/performance/getting_started) Learn how to:
    -   Optimize website performance by defining a [caching policy](/guides/performance/caching), [predictive prefetching](/guides/performance/prefetching), and other edge logic through [Rules](/guides/performance/rules). Alternatively, if you prefer code to UI, then you can take advantage of our [CDN-as-code approach](/guides/performance/cdn_as_code/getting_started) to CDN configuration.
    -   Gain performance insights through which you can fine-tune your configuration through our [Observability](/guides/performance/observability/core_web_vitals) solution.
<Condition version="<=6">
    -   Speed up development by quickly iterating through different variations of your site through our [Traffic Splitting](/guides/performance/traffic_splitting) solution.
</Condition>
-   Set up {{ PRODUCT }} [Security.](/guides/security) We automatically provide distributed denial-of-service (DDOS) protection to traffic that runs behind {{ PRODUCT }}. Apply additional protection to your web applications and APIs through our Web Application Firewall and {{ PRODUCT_SECURITY_ADVANCED_BOT }} solutions. {{ ACCOUNT_UPGRADE }}
-   Set up {{ PRODUCT }} [Sites.](/guides/sites_frameworks/getting_started) If you are currently using a JavaScript framework, then you can improve your website's performance by using our serverless workers to quickly render server-side content in a scalable manner.

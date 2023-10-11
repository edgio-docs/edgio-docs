---
title: Getting Started
---

Get started with {{ PRODUCT }} by performing these steps:

1.  [Create an {{ PRODUCT }} account.](#create-account)
2.  [Create an {{ PRODUCT }} property.](#create-property)
3.  [Test your property.](#test-your-property)
4.  [Next steps.](#next-steps)

## Step 1: Create an {{ PRODUCT }} Account {/*create-account*/}

Signing up for an {{ PRODUCT }} account is free and quick.

1.  [Sign up now by either:]({{ APP_URL }}/signup)

    -   Manually creating an account.
        1.   Provide your name, email (user name), and a password. Click **Create Account**.
        2.   Check your email for confirmation instructions. Click **CONFIRM MY ACCOUNT** to load the {{ PORTAL }}.
    -   Using your existing Github or Google account. You will need to log in to Github or Google and then authorize linking {{ PRODUCT }} to your account.

2.  Click **Accept** to accept our terms of service and privacy policy.

## Step 2: Create an {{ PRODUCT }} Property {/*create-property*/}

Each website that will run behind {{ PRODUCT }} requires an {{ PRODUCT }} property. A property determines how {{ PRODUCT }} will process your website's traffic. Setup for a new property varies according to your needs.

I would like to:

-   **Connect {{ PRODUCT }} to a site that uses Next.js, Nuxt3, Astro, Remix, Qwik, or Vue.**

    Use our CLI to take a CDN-as-code approach when managing your CDN configuration. Choose from one of the following options:

    -   Automate branch previews and deployments whenever you commit changes by [connecting your Github repository to {{ PRODUCT }}](#creating-a-property--cli-with-automation-). 
    -   Manually deploy changes to your CDN configuration [through our CLI](#creating-a-property--cli-without-automation-).

-   **Use {{ PRODUCT }} to serve traffic for a site that is hosted on your web server(s).**

    For example, you may serve traffic for content that is available through web hosting or virtual cloud services. Choose from one of the following options:

    -   Manage and deploy changes to your CDN configuration [through the {{ PORTAL }}](#creating-a-property-).
    
        <Callout type="tip">

          This is the recommended option if you are not integrating a web application framework, such as Next.js, Nuxt3, Astro, Remix, Qwik, or Vue.

        </Callout>

    -   Manage and deploy changes to your CDN configuration [through our CLI](#creating-a-property--cli-without-automation-).

-   **Interact with a sample Next.js, Nuxt3, Astro, Remix, Qwik, or Vue project on {{ PRODUCT }}.**

    [Set up a sample project](#creating-a-property--sample-project-) by autogenerating a Github repository and connecting it to {{ PRODUCT }}. This project uses our CLI to take a CDN-as-code approach for CDN configuration management.

### Creating a Property ({{ PORTAL }}) {/*creating-a-property-*/}

Manage and deploy changes to your CDN configuration through the {{ PORTAL }}.

<Callout type="info">

  Although we do not recommend managing your CDN configuration using both the {{ PORTAL }} and our CLI, you may switch to a CDN-as-code approach at any time. Switch to a CLI-based approach to CDN configuration by [initalizing an existing property within your project's root directory](/guides/performance/cdn_as_code#initialize-property) and then deploying the desired changes.

</Callout>

1.  From the {{ PORTAL }}, click **+ New Property**.

    ![+ New Property](/images/v7/basics/property-create-1.png?width=450)

2.  From under the **Self Host Property**, click **Create Property**. 
3.  In the **Property Name** option, assign a name to your new property (e.g., `My Property`).
4.  Under the **Hostnames** section, click **+ Add Hostname** and then type a domain (e.g., `www.example.com` or `cdn.example.com`) that will be served through {{ PRODUCT }}.

    ![+ New Property](/images/v7/basics/property-create-2.png?width=450)

5.  An origin configuration identifies a set of web servers that will serve as the source for the content served through {{ PRODUCT }}.

    Perform one of the following steps:

    -   **Origin:** Define the set of web servers that will serve as the origin for the hostname defined in step 3 by setting the **Origin Hostname** option to a domain or an IP address (e.g., `www-origin.example.com` or `192.0.2.222`) that points to them. 

        <Callout type="info">

          You may safely ignore the other origin settings until you are ready to fine-tune your setup. [Learn more about origins.](/guides/basics/hostnames_and_origins#origin)

        </Callout>

        Your origin configuration should now look similar to this:

        ![+ New Property](/images/v7/basics/property-create-3-a.png?width=450)

6.  Click **Create Property**.
7.  If you have defined at least one origin configuration, your property will be automatically deployed to the {{ PRODUCT }} network. [Proceed to Step 3: Test Your Property.](#test-your-property)

### Creating a Property (CLI with Automation) {/*creating-a-property--cli-with-automation-*/}

If your existing project is stored within a Git repository and it is powered by Next.js, Nuxt3, Astro, Remix, Qwik, or Vue, then you can automate branch previews and deployments. Specifically, we will automatically create a `default` environment for pull requests  and a `staging` environment for [push events](https://docs.github.com/en/webhooks/webhook-events-and-payloads#push). If you [create a release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository), {{ PRODUCT }} will deploy to the `production` environment. If that environment does not already exist, then it will create one.

<Callout type="important">

  If you plan on using releases to deploy changes that affect your production traffic, then you should mark the `production` environment as the one that will serve production traffic.

</Callout>

1.  From the {{ PORTAL }}, click **+ New Property**.

    ![+ New Property](/images/v7/basics/property-create-1.png?width=450)

2.  From under the **Host Property on {{ PRODUCT }}**, click **Create Property**.
3.  From the **Property Name** option, assign a name to your property. 
4.  Click **Import an existing project**.
5.  Click on your project's web application framework. 

    If your desired framework is not listed, then you will need to [create a property without automation](#creating-a-property--cli-without-automation-).
    
6.  If you have not already connected your Github account to {{ PRODUCT }}, then you will need to do so now.

    1.  Click **Connect to Github**. 
    2.  Sign in to your account using either a passkey or your user name and password.
    3.  When prompted, authorize {{ PRODUCT }} access to your Github account.

7.  From the **Select a Repository** option, select your project's repository.
8.  Click **Create Property**.
9.  As a part of the property creation workflow, {{ PRODUCT }} Bot generates a pull request called `{{ PRODUCT }} Init` that adds both our service to your project and a Github workflow for the automation of branch previews and deployments.

    Review this PR and merge it into your main branch.

[Learn more about CDN-as-code.](/guides/performance/cdn_as_code)

### Creating a Property (CLI without Automation) {/*creating-a-property--cli-without-automation-*/}

Use a CDN-as-code approach to CDN configuration with any existing project.

1.  From the {{ PORTAL }}, click **+ New Property**.

    ![+ New Property](/images/v7/basics/property-create-1.png?width=450)

2.  From under the **Host Property on {{ PRODUCT }}**, click **Create Property**.
3.  From the **Property Name** option, assign a name to your property. 
4.  Verify that the **Create using CLI** option is selected.
5.  Click **Create Property**.
6.  A quick start page will display a npx command. Initialize your property by running this command from your project's root directory. 
                
[Learn more about initialization.](/guides/performance/cdn_as_code#initialize-property)

### Creating a Property (Sample Project) {/*creating-a-property--sample-project-*/}

We provide sample Next.js, Nuxt3, Astro, Remix, Qwik, and Vue projects through which you may learn how to optimize site delivery. This option requires you to connect your Github account to your {{ PRODUCT }} account. 

1.  From the {{ PORTAL }}, click **+ New Property**.

    ![+ New Property](/images/v7/basics/property-create-1.png?width=450)

2.  From under the **Host Property on {{ PRODUCT }}**, click **Create Property**.
3.  From the **Property Name** option, assign a name to your property. 
4.  Click **Start from a template**.
5.  Click on your project's web application framework. 

    If your desired framework is not listed, then you will need to [create a property without automation](#creating-a-property--cli-without-automation-).

6.  If you have not already connected your Github account to {{ PRODUCT }}, then you will need to do so now.

    1.  Click **Connect to Github**. 
    2.  Sign in to your account using either a passkey or your user name and password.
    3.  When prompted, authorize {{ PRODUCT }} access to your Github account.

7.  Click **Create Property**. {{ PRODUCT }} will now perform the following actions:

    -   It will create a property.
    -   It will create a Github repository for this property.
    -   It will add all of the project's files to this Github repository.
    -   It will deploy the sample project to {{ PRODUCT }}. Once the deployment completes, you may follow the URL displayed under the **URL** label to load the sample site.

8.  Optional. Clone the Github repository to your local drive. Test different configurations by committing changes to this repository. {{ PRODUCT }} will automatically deploy those changes. 

[Learn more about CDN-as-code.](/guides/performance/cdn_as_code)

## Step 3: Test Your Property {/*test-your-property*/}

Once your property is successfully deployed to the {{ PRODUCT }} network, a URL will appear within the **Latest Production Deployment** section. Follow that link to preview your site behind {{ PRODUCT }}.

![Latest Production Deployment](/images/v7/basics/deployment-latest-production.png)

## Next Steps {/*next-steps*/}

Congratulations on setting up a basic property on {{ PRODUCT }}! 

You are now ready for:

-   Collaboration. If you plan on collaborating with other team members, then you should [create an organization](/guides/basics/collaboration). After which, you will need to <!--either -->create a property for that organization<!-- or [transfer the ownership of your new property](/guides/basics/properties#transfer-ownership) to that organization-->.

-   [{{ PRODUCT }} Security.](/guides/security). We automatically provide distributed denial-of-service (DDOS) protection to traffic that runs behind {{ PRODUCT }}. Apply additional protection to your organization's web applications and APIs through our [Web Application Firewall solution](/guides/security/waf). {{ ACCOUNT_UPGRADE }}

-   [Create environments](/guides/basics/environments) to match your software development workflow. Each environment provides site previews that allow QA testers, code reviewers, and other stakeholders to immediately try out newly introduced changes before they are introduced into your production environment. 

    <Callout type="info">
    
      If you are using [our Github automation workflow](#creating-a-property--cli-with-automation-), then we will create environments for you. You do not need to create additional environments.

    </Callout>

-   [CDN-as-code:](/guides/performance/cdn_as_code) If your new property uses CDN-as-code, then you will need to define CDN behavior within a file ({{ ROUTES_FILE }}) stored alongside your code. Additionally, if this project uses a JavaScript framework, then you can use [{{ PRODUCT }} Sites.](/guides/sites_frameworks/getting_started) to improve your website's performance by using our cloud workers to quickly render server-side content in a scalable manner.

-   **{{ PORTAL }}:** If your new property is for a site hosted on your web server(s), then you should fine-tune your [origin configuration](/guides/basics/hostnames_and_origins#origin).

    For example, you can enable Server Name Indication (SNI) on an origin configuration or shield it from requests to reduce network bandwith usage and the load on your web servers.

-   Set up {{ PRODUCT }} [Performance.](/guides/performance/getting_started) Learn how to:
    -   Optimize website performance by defining a [caching policy](/guides/performance/caching), [predictive prefetching](/guides/performance/prefetching), and other edge logic through [Rules](/guides/performance/rules). 

-   Gain performance insights through which you can fine-tune your configuration through our [Observability](/guides/performance/observability/real_user_monitoring) solution.
-   Speed up development by quickly iterating through different variations of your site through our [Traffic Splitting](/guides/performance/traffic_splitting) solution.


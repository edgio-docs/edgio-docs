---
title: Basics
---

The {{ PRODUCT }} Applications platform consists of the following products:
-   {{ PRODUCT }} {{ PRODUCT_EDGE }} provides:
    -   Full control over how your content will be accelerated.
    -   Performance insights that you can use to fine-tune your configuration.
    -   The ability to compute your JavaScript functions within our service.
    -   The ability to control traffic distribution for the purpose of A/B testing and iterative site migrations.
-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} provides:
    -   Distributed Denial-of-Service (DDoS) protection for all traffic served through our network.
    -   An Origin Shield that reduces traffic to your origin servers through an additional caching layer.
    -   A Web Application Firewall through which you can monitor, detect, and prevent application layer attacks.
    -   Basic website security, such as a Content Security Policy (CSP), a TLS certificate, Basic Authentication enforcement, variables for sensitive data (e.g., API keys), and protection against cache poisoning.
-   {{ PRODUCT }} {{ PRODUCT_PLATFORM }} allows you to quickly integrate your headless Jamstack applications with {{ PRODUCT }}. This integration allows {{ PRODUCT }} to further improve your website's performance through the server-side rendering (SSR) of your website's JavaScript.

All of the above solutions are compatible with each other. Combine all three solutions to ensure the secure delivery of your website while drastically improving performance.

## Setup {/*setup*/}

Before you can take advantage of {{ PRODUCT_EDGE }}, {{ PRODUCT_SECURITY }}, and {{ PRODUCT_PLATFORM }}, you should set up the following basic {{ PRODUCT }} configuration:

-   [An {{ PRODUCT }} team space.](/guides/basics/collaboration) By default, your account will only have a private space that may only be accessed through your user account. Create a team space if you plan on collaborating with other teammates.
-   [An {{ PRODUCT }} property.](/guides/getting_started#create-property) A property instructs {{ PRODUCT }} how to process requests to your website.
-   [An environment.](/guides/basics/environments) An environment allows you to serve your site on different domains. For example, you can create environments for development, staging, and production to which you can deploy builds as they progress through your release workflow.
-   [A domain configuration that supports HTTPS.](/guides/basics/domains) In addition to setting up a domain configuration on the desired environment, {{ PRODUCT }} needs to generate a TLS certificate for it. After which, you may update your DNS configuration to point your website's domain to our service. Once your updated DNS configuration takes effect, {{ PRODUCT }} will serve your production traffic.

![setup](/images/basics/setup-overview.png)

Once you have set up a basic configuration, you are ready to take full advantage of our {{ PRODUCT_APPLICATIONS }}:

-   {{ PRODUCT_EDGE }}. Learn how to:
    -   Optimize website performance through our CDN-as-code approach to:
        -   [Cache](/guides/performance/getting_started#configure-caching) your content.
        -   Determine how your content is [routed](/guides/performance/cdn_as_code) through our network.
        -   Define when web browsers should use [predictive prefetching](/guides/performance/prefetching) and the content that will be delivered before it is requested by your users.
    -   Gain performance insights through which you can fine-tune your configuration through our [Observability](/guides/performance/observability) solution.
    -   Speed up development by quickly iterating through different variations of your site through our [Traffic Splitting](/guides/performance/traffic_splitting) solution.
-   [{{ PRODUCT_SECURITY }}.](/guides/security) We automatically provide distributed denial-of-service (DDOS) protection to traffic that runs behind {{ PRODUCT }}. Apply additional protection to your web applications and APIs through our Web Application Firewall and Advanced Bot Management solutions.
-   [{{ PRODUCT_PLATFORM }}.](/guides/sites_frameworks/getting_started) If you are currently using a JavaScript framework, then you can improve your website's performance by using our serverless workers to quickly render server-side content in a scalable manner.



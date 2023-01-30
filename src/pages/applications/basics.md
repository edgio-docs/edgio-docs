---
title: Basics
---

The {{ PRODUCT }} Applications platform consists of the following products:
-   {{ PRODUCT }} {{ PRODUCT_EDGE }} improves your site's performance through caching, predictive prefetching, and serverless computing. Streamline your development workflow through a CDN-as-code approach to configuration, performance insights, and site previews.
-   {{ PRODUCT }} {{ PRODUCT_SECURITY }} protects your web infrastructure through:
    -   Distributed Denial-of-Service (DDoS) protection for all traffic served through our network.
    -   An Origin Shield that reduces traffic to your origin servers through an additional caching layer.
    -   A Web Application Firewall through which you can monitor, detect, and prevent application layer attacks.
    -   Basic website security, such as a Content Security Policy (CSP), a TLS certificate, Basic Authentication enforcement, variables for sensitive data (e.g., API keys), and protection against cache poisoning. 
-   {{ PRODUCT }} {{ PRODUCT_PLATFORM }} provides optimal performance and development efficiency to your headless Jamstack applications. In addition to allowing you to define performance configurations within your application code, it supports server-side rendering and static page generation.

Combine the above solutions to ensure the secure delivery of your website while drastically improving performance.

## Setup {/*setup*/}

Before you can take advantage of {{ PRODUCT_EDGE }}, {{ PRODUCT_SECURITY }}, and {{ PRODUCT_PLATFORM }}, you should set up the following basic {{ PRODUCT }} configuration:

-   [An {{ PRODUCT }} team space.](/applications/basics/collaboration) By default, your account will only have a private space that may only be accessed through your user account. Create a team space if you plan on collaborating with other teammates.
-   [An {{ PRODUCT }} property.](/applications/getting_started#create-property) A property instructs {{ PRODUCT }} how to process requests to your website.
-   [An environment.](/applications/basics/environments) An environment allows you to serve your site on different domains. For example, you can create environments for development, staging, and production to which you can deploy builds as they progress through your release workflow.
-   [A domain configuration that supports HTTPS.](/applications/basics/domains) In addition to setting up a domain configuration on the desired environment, {{ PRODUCT }} needs to generate a TLS certificate for it. After which, you may update your DNS configuration to point your website's domain to our service. Once your updated DNS configuration takes effect, {{ PRODUCT }} will serve your production traffic.

![setup](/images/basics/setup-overview.png)

Once you have set up a basic configuration, you are ready to take full advantage of our {{ PRODUCT_APPLICATIONS }}:

-   [{{ PRODUCT_EDGE }}](/applications/performance). Learn how to:
    -   Optimize website performance through our CDN-as-code approach to:
        -   [Cache](/applications/performance/getting_started#configure-caching) your content.
        -   Determine how your content is [routed](/applications/performance/cdn_as_code) through our network.
        -   Define when web browsers should use [predictive prefetching](/applications/performance/prefetching) and the content that will be delivered before it is requested by your users.
    -   Gain performance insights through which you can fine-tune your configuration through our [Observability](/applications/performance/observability) solution.
    -   Speed up development by quickly iterating through different variations of your site through our [Traffic Splitting](/applications/performance/traffic_splitting) solution.
-   [{{ PRODUCT_SECURITY }}.](/applications/security) We automatically provide distributed denial-of-service (DDOS) protection to traffic that runs behind {{ PRODUCT }}. Apply additional protection to your web applications and APIs through our Web Application Firewall and [Advanced Bot Management](/applications/security/advanced_bot_management) solutions.
-   [{{ PRODUCT_PLATFORM }}.](/applications/sites_frameworks/getting_started) If you are currently using a JavaScript framework, then you can improve your website's performance by using our serverless workers to quickly render server-side content in a scalable manner.

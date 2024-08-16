---
title: {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 7
---

Learn about the benefits of upgrading to {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 by reviewing our [Benefits For Layer0 Customers: Edgio Applications v7 article](https://edg.io/resources/blog/benefits-for-layer0-customers-edgio-applications-v7/).

{{ ROUTEHELPER.md }}

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 introduces:

-   The capability to define your entire CDN configuration within the {{ PORTAL_LINK }}. If you prefer code to UI, you can still use our CDN-as-code approach to CDN configuration.

    ![Add Origin](/images/v7/basics/origins-add-origin.png)

-   [Rules](/applications/performance/rules) that identify a set of traffic and how {{ PRODUCT }} will process those requests.

    ![Rule Example](/images/v7/performance/rule-condition-feature-example.png)

-   [Real-Time Log Delivery (RTLD)](/applications/logs/rtld). RTLD allows you to deliver CDN, WAF, and Rate Limiting log data to a variety of destinations in near real-time. RTLD provides complete control over the type of traffic and the type of log data that will be delivered.

    For example, you may choose to only deliver log data for `2xx` responses to `cdn.example.com` to Splunk Enterprise.

    ![RTLD Workflow](/images/v7/logs/rtld-workflow.png)

-   [Edge Insights](/applications/performance/observability/edge_insights). Edge Insights allows you to gain historical and near real-time insights into threat profiles, performance, and CDN usage.

    ![Edge Insights](/images/v7/performance/edge-insights-example.png)

-   A refreshed UI for [Web Application Firewall (WAF)](/applications/security/waf). You may now apply WAF protection to all of your properties at the organization level. <a id="cdn-as-code" />
-   CDN-as-code has undergone significant changes. Key changes are listed below:
    -   The [{{ CONFIG_FILE }}](/applications/performance/cdn_as_code/edgio_config) file now uses `origins` instead of `backends`. Each origin configuration may contain various hosts. Each host identifies a hostname or IP address. Each origin configuration supports an origin shield configuration and TLS settings.
    -   You may now set up environments within the {{ CONFIG_FILE }}. Assign one or more hostnames to each environment. A hostname identifies the domain (e.g., `www.example.com`) through which users access your site.
    -   Routes now support JSON syntax. A sample route that uses this new syntax is shown below.

        ```
        new Router()
          .get('/', {
            caching: {
              max_age: '1d' // cache for 1 day at the edge
            }
          })
        ```
    -   Version 7 provides [limited support for legacy syntax](/applications/upgrading/upgrading#legacy-syntax).
    -   All routes that match a request are executed. In previous versions, [various methods](/applications/upgrading/upgrading#matching-behavior) return a response and prevent additional routes from being matched.
    -   We have introduced a new method called `conditional` to Router that uses a new JSON syntax and supports conditional logic.

[View additional changes introduced by version 7.](/applications/release_notes)

## Try It Out  {/*try-it-out*/}

Try {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 by creating an account at [{{ APP_DOMAIN }}](https://{{ APP_DOMAIN }}).

[Learn how to get started.](/applications/getting_started)

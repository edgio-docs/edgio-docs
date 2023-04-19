---
title: {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 7
---

<Callout type="important">

  If you are an existing customer, we know that you may be excited to try out {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} v7. However, this major version upgrade may require [significant changes to your CDN-as-code configuration](#cdn-as-code) as certain core legacy components have limited support. In the near future, we plan on introducing a migration guide to ease this transition. In the meantime, if you have questions, contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463.

</Callout>

{{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 introduces:

-   The capability to define your entire CDN configuration within the {{ PORTAL_LINK }}. If you prefer code to UI, you can still use our CDN-as-code approach to CDN configuration. 

    ![Add Origin](/images/v7/basics/origins-add-origin.png)

-   [Rules](/guides/performance/rules) that identify a set of traffic and how {{ PRODUCT }} will process those requests. 

    ![Rule Example](/images/v7/performance/rule-condition-feature-example.png)

-   [Real-Time Log Delivery (RTLD)](/guides/logs/rtld). RTLD allows you to deliver CDN, WAF, and Rate Limiting log data to a variety of destinations in near real-time. RTLD provides complete control over the type of traffic and the type of log data that will be delivered. 

    For example, you may choose to only deliver log data for `2xx` responses to `cdn.example.com` to Splunk Enterprise.

    ![RTLD Workflow](/images/v7/logs/rtld-workflow.png)

-   [Edge Insights](/guides/performance/observability/edge_insights). Edge Insights allows you to gain historical and near real-time insights into threat profiles, performance, and CDN usage.

    ![Edge Insights](/images/v7/performance/edge-insights-example.png)

-   A refreshed UI for [Web Application Firewall (WAF)](/guides/security/waf). You may now apply WAF protection to all of your properties at the team level.
-   {{ PRODUCT }} {{ PRODUCT_PLATFORM }} now supports Next, Nuxt 2, and Nuxt 3. We plan on introducing support for additional web application frameworks in the near future. <a id="cdn-as-code" />
-   CDN-as-code has undergone significant changes. Key changes are listed below:
    -   The [{{ CONFIG_FILE }}](/guides/basics/edgio_config) now uses `origins` instead of `backends`. Each origin configuration may contain various hosts. Each host identifies a hostname or IP address. Each origin configuration supports an origin shield configuration and TLS settings.
    -   The {{ CONFIG_FILE }} now supports environments. Define the desired environments within this file.
    -   Routes now support JSON syntax. A sample route that uses this new syntax is shown below.

        ```
        new Router()
          .get('/', {
            caching: {
              max_age: '1d' // cache for 1 day at the edge
            }
          })
        ```
    -   Version 7 provides limited support for legacy syntax. It does not support the `fallback()`, `catch()`, and `destination()` methods. It also does not provide full support for the following `ResponseWriter` methods: 
        -   updateResponseCookie
        -   removeResponseCookie
        -   addUpstreamResponseCookie
        -   removeUpstreamResponseCookie
        -   setUpstreamResponseHeader
        -   updateUpstreamResponseCookie
    -   All routes that match a request are executed. In previous versions, the following methods return a response and prevent additional routes from being matched:
        -   proxy
        -   renderWithApp
        -   serveStatic
        -   dir
        -   static
        -   send
        -   compute
        -   redirect
        -   appShell
        -   serviceWorker
        -   render
    
    -   We have introduced a new method called `conditional` to Router that uses a new JSON syntax and supports conditional logic.

## Try It Out  {/*try-it-out*/}

Try {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 by creating an account at [{{ APP_DOMAIN }}](https://{{ APP_DOMAIN }}). 

[Learn how to get started.](/guides/getting_started)

---
title: {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} Version 7
---

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
-   {{ PRODUCT }} {{ PRODUCT_PLATFORM }} now supports Next, Nuxt 2, and Nuxt 3. We plan on introducing support for additional web application frameworks in the near future. <a id="routehelper" />
-   Our CDN-as-code syntax now uses JSON instead of RouteHelper, which has been deprecated in version 7. {{ PRODUCT }} provides limited backward-compatibility for RouteHelper. The following methods are currently unsupported in {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} v7:
    -   fallback
    -   destination
    -   addUpstreamResponseCookie
    -   removeUpstreamResponseCookie
    -   removeUpstreamResponseHeader
    -   setUpstreamResponseHeader
    -   updateUpstreamResponseCookie
    -   updateUpstreamResponseHeader

    We have introduced a new method called `conditional` to Router that uses a new JSON syntax and supports conditional logic.

## Try It Out  {/*try-it-out*/}

Try {{ PRODUCT }} {{ PRODUCT_APPLICATIONS }} version 7 by creating an account at [{{ APP_DOMAIN }}](https://{{ APP_DOMAIN }}). 

[Learn how to get started.](/guides/getting_started)

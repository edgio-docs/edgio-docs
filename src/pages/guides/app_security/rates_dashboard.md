---
title: Rates Dashboard
---

Use the Rates dashboard to analyze recently rate limited requests to:

-   Understand the severity of rate limited requests.
-   Identify the countries from which rate limited traffic originated.
-   Identify key individual offenders by their IP address.
-   View detailed information that describes a rate limited request.

Logging for rate limited requests is downsampled to 10% due to the
volume of requests that may occur during a single incident (e.g.,
volumetric Distributed Denial-of-Service attack).

Log data is retained for 30 days for most {{ PRODUCT_SECURITY }} solutions. The exception
is WAF Insights which only retains data for 7 days.

This article describes:

-   [Overview](#Overview)
-   [Event log view](#Event)
-   [Filters](#filters)
-   [Fields](#fields)

## Usage {/*usage*/}

The Rates dashboard contains two different views through which rate
limit analysis may be performed, which are:

-   [Overview](#Overview)
-   [Event log](#Event)

To view the Rates dashboard

1.  Navigate to the [[Rates dashboard (Rates tab of the Overview
    page)](https://%5B%=Domains.Portal%%5D/Defend/ConsolidatedDashboard#/defend/dashboard/overview?dataType=hrl){target="_blank"
    madcap:conditions="General.EdgeCast,General.TransactOnly"
    madcap:excludeaction="unbind"}]{.portal}. How?From the [main
    menu](../Getting_to_Know_the_Media_Control_Center/Navigating_within_the_MCC.htm),
    navigate to **More** \| **Security** \| ***WAF*** **Tier** \| **Dashboard**. Click
    **Rates**.

    The Rates dashboard will display a chart showing recent violations
    of your security policy.

2.  Optional. View event log data by clicking **Event Logs** from
    the side navigation bar. Verify that the **Rates** tab is
    selected.

### Overview {/*overview*/}

The Overview is a useful tool for detecting patterns for rate limited
traffic directed to your origin servers. This view consists of a chart
and statistics for a given time period.

#### Chart {/*chart*/}

A chart or line graph displays the number of rate limited requests over
a given time period.

By default, a single line on the graph represents all downsampled rate
limited traffic. Alternatively, categorize rate limited traffic by
selecting the desired categorization criteria from the option that
appears directly above the graph. A line will be drawn on the chart for
each unique value. For example, if you select [Top Action
Types]{.listitem} and rate limited requests were either dropped or
redirected, then the graph will contain a line for
`REDIRECT-302` and another one for `DROP-REQUEST`.

Categorize traffic by:

-   **Top Rule Names:** Graphs rate limited traffic according to
    the rate rule that the request satisfied.

-   **Top Urls:** Graphs rate limited traffic according to the URL
    that was requested.

-   **Top Client IPs:** Graphs rate limited traffic according to IP
    address (IPv4).

    A single IP address may identify multiple clients. For example, all
    users from a single corporation may be proxied via a single network
    device (e.g., firewall). Since the client's IP address is not being
    exposed, only the device's IP address may be eligible for rate
    limiting.

-   **Top User Agents:** Graphs rate limited traffic according to
    the user agent (e.g., web browser) that submitted the request. A
    request's user agent is defined in the User-Agent request header.

-   **Top Countries:** Graphs rate limited traffic according to the
    country from which the request originated. Countries are indicated
    by their two-letter ISO 3166 country code.

    [View a list of countries codes.](../Reference/Country_Codes.htm)

-   **Top Action Types:** Graphs rate limited traffic according to
    the type of action (e.g., `REDIRECT_302`) that was applied to the
    request.

-   **Top Referers:** Graphs rate limited traffic according to
    referrer. A referrer identifies the address of the resource that
    linked to the requested content. A request's referrer is defined in
    the `Referer` request header.

Key information:

-   By default, the chart includes all rate limited requests within the
    last seven days.
    -   The chart may be filtered by the criteria listed directly below
        it. Additional filters are available when viewing an individual
        event from the event log.
    -   The time period being charted may be adjusted through the **Time
        Range** option. This option is displayed directly to the
        left of the chart.
-   Hovering over the line graph will indicate the number of rate
    limited requests that took place during that time slot.

#### Statistics {/*statistics*/}

Statistics for rate limited traffic over a given time period are
displayed directly below the chart. Statistics are broken down by
category.

[View a brief description for each category.](#fields)

The following information is displayed for each category:

-   ***Value:*** Groups rate limited traffic by a
    specific value.

-   **Percentage (%):** Indicates the percentage of rate limited
    traffic over a given time period for the current group.

    Percentages are calculated from the total rate limited requests
    during the given time period. The **Max Top Number** option
    determines the limit of entries per category. If the number of
    entries exceeds this limit, then the sum of the percentages for that
    category will not add up to 100%.

-   **Events:** Indicates the number of rate limited requests over
    a given time period for the current group.

### Event Log View {/*event-log-view*/}

This view provides the means to delve into the details of a rate limited
request. The information derived from this view provides a deeper
understanding as to why rate limiting was applied to the request.

The event log contains a list of recent rate limited requests. Each
request is described as follows:

```
Enforced Rule: Rule Identifies the rate rule that was violated by its
name. Elapsed Time Indicates the amount of time that has passed since
the request was screened. Time Indicates the time (UTC) at which the
request was screened.

Action Type: Action Type Represents the type of action that was applied
to the rate limited request. This action is determined by the rate rule
that it violated.
```

A sample rule violation is provided below.

```
Enforced Rule: Marketing [10s ago 12:00:00.00 UTC]

Action Type: CUSTOM-RESPONSE
```

Clicking on an event will expand that entry and display detailed
information about it.

[View a brief description for each event log entry field.](#fields)

Key information:

-   Blue font indicates a value that may be used to filter the entire
    dashboard. Click on that value to filter events by it.
-   The ![](/images/icons/filter.png) icon appears next
    to each field that is currently filtering the dashboard.

## Filters {/*filters*/}

Filters are applied to both the Overview and the Event Log views. Most
fields support filtering.

The Overview and the Event Log views cannot be filtered by the
**Timestamp** field. Use the **Time Range** option instead.
This option filters the dashboard for events that occurred during a
relative time period from the present (e.g., Last 24 hours or Last 7
days).

Key information:

## Fields {/*fields*/}

A brief description for each field used to describe/categorize rate
limited requests is provided below.

| Field          | Description                                        |
| ----------- | ----------- |
| Client IP      | Identifies the IP address (IPv4) of the client from which the request originated.                 |
| Country Name   | Identifies the country from which the request originated.                                        |
| Action Type    | Indicates the action (e.g., `CUSTOM-RESPONSE`) that was applied to the rate limited request.                       |
| Referer        | Indicates the request's referrer as defined by the `Referer` request header. A referrer identifies the address of the resource that linked to the requested content.                          |
| Request Method | Indicates the request's HTTP method.  Format:  `HTTP_METHOD\_*NAME*` <br /><br /> **Example:**   `HTTP_METHOD_GET`                                                |
| Rule Name      | Indicates the name of the rule that was applied to the rate limited request.                          |
| Timestamp      | Indicates the date and time (UTC) at which the request was rate limited.  This field is only available from within the Event Log view. Requests may not be filtered by this field. Filter by time through the **Time Range** option that appears on the left-hand side of the dashboard.  Local time is displayed on the right-hand side of the event log entry header that appears directly above this field.                                  |
| URL            | Indicates the URL of the request that was rate limited.                                           |
| User Agent     | Indicates the user agent that submitted the request that was rate limited. A request's user agent is defined in the `User-Agent` request header.                                    |

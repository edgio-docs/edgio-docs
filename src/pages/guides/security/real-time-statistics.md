---
title: Real-Time Statistics
---

Real-Time Statistics provides the following real-time data:

-   [Bandwidth](#bandwidth-graph)
-   [Status Codes](#status-codes-graph)
-   [Cache Statuses](#cache-statuses-graph)
-   [Connections](#connections-graph)

**What is the difference between Real-Time Statistics and our security dashboards?**

Our security dashboards provide information about traffic flagged by {{ PRODUCT_SECURITY }}. Real-Time Statistics, on the other hand, provide real-time data for all requests regardless of whether they were screened by {{ PRODUCT_SECURITY }}.

<Callout type="info">

  Real-Time Statistics requires {{ PRODUCT_SECURITY }}. Although our service includes a basic offering called {{ PRODUCT_SECURITY }} Insights, it may require activation. We also offer more comprehensive security soutions. {{ ACCOUNT_UPGRADE }}

</Callout>

## Sliding Window of Data Availability {/*sliding-window-of-data-availability*/}

Real-Time Statistics consists of various graphs that display a sliding window of real-time data for a specific time span (e.g., 5, 15, or 30 minutes). Specifically, real-time data shifts to the left whenever a data point is added to it. Real-time data is continually shifted until the graph's time span has been exceeded. At which point, the oldest data point disappears from view.

Set the duration of this sliding window through the **Time
span of graphs** option.

## Filters {/*filters*/}

You may filter real-time data by domain, POP (Point of Presence), or country.

<Callout type="info">

  Only a single filter may be applied at any given time.

</Callout>

<Callout type="info">

  A POP or edge node identifies a location within our network through which users can request and receive content.

</Callout>

**To filter real-time data**

1.  Navigate to the **Real-Time Stats** page.
    1.  From the {{ PORTAL }}, click on the **AppOps** tab.
    2.  Click **Open on my.edgecast.com** to load the **Security** page.
    3.  Click **Real-Time Stats**. By default, our graphs are configured to display real-time data for the last five minutes.
2.  From the **Filtering Options** option, select one of the following:
    -   **CNAME:** After selecting this filter, select the desired domain.
    -   **POP:** After selecting this filter, select the desired POP.
    -   **Country:** After selecting this filter, select the desired country.
3.  Click **Apply** to filter real-time data. 

<Callout type="info">

  Our service only filters new data. As a result, applying a filter clears real-time data from all graphs.

</Callout>

<Callout type="info">

  Remove a filter by setting the **Filtering Options** option to **All** and then clicking **Apply**.

</Callout>

## Bandwidth Graph {/*bandwidth-graph*/}

The Bandwidth graph contains recent bandwidth usage statistics. The shaded portion of the graph
represents bandwidth usage. The exact amount of bandwidth currently being
used is displayed directly below the line graph.

Our service reports bandwidth usage using one of the following units: bits per second (b/s), Kilobits per second (Kb/s), Megabits per second
(Mb/s), or Gigabits per second (Gb/s).

## Status Codes Graph {/*status-codes-graph*/}

The Status Codes graph consists of color-coded lines that track recent HTTP response codes.
The left side of the graph (y-axis) indicates the number of recent requests that resulted in a specific status code, while the bottom of the graph (x-axis) tracks time.

All available status codes are listed directly above the graph. Directly to the right of each status code, we display the average number of times per second that our service is currently returning that status code.
By default, the Status Codes graph displays a line for each of these status codes. However, you may choose to only monitor specific status codes by clearing the checkbox next to each undesired status code. Once you are satisfied with your selections, click **Refresh
Graph** to refresh the graph to only display marked status codes.

A brief description is provided for each status code below.

| Name                  | Description                                                                                                                                                                                                                                                                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Total Hits per second | Represents the total number of requests per second. Use this option as a baseline indicator to see the percentage of total hits that a particular status code comprises.                                                                                                                   |
| 2xx per second        | Represents the total number of `2xx` status codes (e.g., `200`, `201`, `202`, etc.) that occur per second. This type of status code indicates that the request was successfully delivered to the client.                               |
| 304 per second        | Represents the total number of `304` status codes that occur per second. This status code indicates that the requested asset has not been modified since it was last retrieved by the HTTP client.                                                                            |
| 3xx per second        | Represents the total number of `3xx` status codes (e.g., `300`, `301`, `302`, etc.) that occur per second. This type of status code indicates that the request resulted in a redirection.                                              |
| 403 per second        | Represents the total number of `403` status codes that occur per second. This status code indicates that the request was deemed unauthorized. |
| 404 per second        | Represents the total number of `404` status codes that occur per second. This status code indicates that the requested asset could not be found.                                                                                                                              |
| 4xx per second        | Represents the total number of `4xx` status codes (e.g., `400`, `401`, `402`, `405`, etc.) that occur per second. This status code indicates that the requested asset was not delivered to the client.                    |
| 5xx per second        | Represents the total number of `5xx` status codes (e.g., `500`, `501`, `502`, etc.) that occur per second.                                                                                                                             |
| Other per second      | Represents the total occurrences for all other status codes will be reported in the graph.                                                                                                                                                                                                                                                         |
<Callout type="info">

  The color-coded list of status codes provided directly below the graph only affect what is
displayed in the graph. It does not affect whether the graph will keep
track of that status code. Temporarily hide a status code by clicking on it from the list shown directly below the graph. Toggle it back on by clicking on it again.

</Callout>

## Cache Statuses Graph {/*cache-statuses-graph*/}

Use the Cache Statuses graph to track all requests screened through {{ PRODUCT }} security through the Total Hits per second metric.

## Connections Graph {/*connections-graph*/}

This line graph reports the average number of new connections per second.

**Key information:**
-   A user agent's (e.g., web browser) initial request for content will
    always establish a connection. After which, the user agent
    determines whether future requests within that session will reuse
    that connection or whether new connections will be established.
-   This statistic is calculated using the following two steps:
    1.  Each edge server calculates the number of new connections per
        second over the course of a minute.
    2.  This data is collected from all edge servers and then averaged.

---
title: Dashboard
---
# Dashboard {/*dashboard*/}

The Control Dashboard provides information about these:

* Information such as segments and number of configurations for each of your accounts
* Recent activities and events regarding your accounts
* Popular data segments related to your accounts

You can access by clicking _Dashboard_ from the left navigation.

<Callout type="info"> You can view traffic performance metrics from the Performance Dashboard. </Callout>

## Accounts {/*accounts*/}

The Accounts section displays summary information for each Account within the currently-selected Company. The default view shows the first three Accounts. You can view other accounts  by selecting one of the position markers immediately below. The marker for the currently displayed Account is shown in gray.

### About Data Segments {/*about-data-segments*/}

  Data Segments are filters that gather traffic data. They are powered by EdgeQuery, and are used by the Traffic Report and these endpoints:

* /realtime-reporting-api/traffic
* /realtime-reporting-api/traffic/geo

Each Data Segment gathers the following data for a source or published host, a specific account, and a specific protocol (HTTP, HTTPS):

  * Total traffic throughput.
  * Percentage of total traffic relative to all Data Segments.
  * Number of requests.
  * CDN efficiency.

  Data Segments gather daily data, providing 24-hour latency, and granularity. A Data Segment can optionally gather realtime data, providing  5-minute latency and granularity.

Data segments require significant system resources to process. A Data Segment is considered dormant if the Data Segment has not collected data within the last 100 days. Segments without data are removed weekly to improveEdgeQuery backend performance.

### Account Summary Information {/*account-summary-information*/}

The summary information provided for each Account includes:
  * segments - If Segments are configured for an account, the number of segments represents the number of Segments associated with the Account, plus one for the Master view. If no Segments are configured, the segments count will be zero.
  * published hosts - The number of Published Hosts configured for the Account. A Published Host must be specified for each configuration.
  * origin hosts - The number of Origin Hosts configured for the Account. An Origin Host must be specified for each configuration.
  * delivery (static) configs - The number of Content Delivery "static content" configurations created for the Account
  * performance (dynamic) configs - The number of Performance "websites and apps" configurations created for the Account
  * (chunked) streaming configs - The number of Chunked Streaming Configurations created for the Account

<Callout type="info">You can change the selected Company (and Account) using the Company/Account icon at the top right of the page.</Callout>

## Activity and Events {/*activity-and-events*/}

User activity for the current Company (across all Accounts) is shown for the last 12 hours and includes common activities such as Purge request, Configuration changes, and User account updates.

## Segments {/*segments*/}

The most popular segments for the current Company (across all Accounts) are displayed for the current month.

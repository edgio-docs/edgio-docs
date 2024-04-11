---
title: Performance Dashboard
---
# Performance Dashboard {/*performance-dashboard*/}

The Performance Dashboard provides a comprehensive snapshot of your company's performance and summarizes information in the Traffic Report and Status Codes Report. The Performance Dashboard is different from the older [Dashboard](/delivery/control/dashboard), which is also available.

The Performance Dashboard comprises two sections:

- The top section consists of tabs that show key performance metrics for the Delivery product, such as average bandwidth.

- The lower section provides information about leading metrics, such as locations with the highest data transfer rate. Information is displayed in card format.

<Callout type="info">The content of the lower section does not vary when you select a different tab in the top section; the two sections are independent.</Callout>

By default, data presented is an aggregate of all your company's accounts.

Instructions for using the Performance Dashboard are in these sections:

[Displaying the Performance Dashboard](#displaying-the-performance-dashboard)

[Selecting Accounts and Date Ranges](#selecting-accounts-and-date-ranges)

[Key Performance Metrics Tabs](#key-performance-metrics-tabs)

[Leading Metrics Cards](#leading-metrics-cards)

## Displaying the Performance Dashboard {/*displaying-the-performance-dashboard*/}

To view the Performance Dashboard, you must set it as your default landing page. - After logging into , click the Profile icon (see [Menus and Links](../../User Guide Pages/Menus and Links.md)) at the top right of the screen.

Select My Account from the subsequent .

The Edit My Account page is displayed.

*   Select Performance Dashboard from the Landing Page.

*   Click the Save button.

    When you next log into , the Performance Dashboard is automatically displayed.

\## Selecting Accounts and Date Ranges {/\*selecting-accounts-and-date-ranges\*/}

Limit Performance Dashboard data to specific accounts and date ranges by making selections in the s at the top of the screen:

!\[\](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard Config Controls.png) A - Account Selector B - Date Range Selector For additional information on selecting date ranges, see \[Selecting a Date Range\](../Report/General Information.md#Selectin). ## Key Performance Metrics Tabs {/\*key-performance-metrics-tabs\*/} \[Overview\](#Tab2) \[Working with Tabs\](#Working) ### Overview The following table describes each tab.



Tab

Description

Additional Information

Throughput

Average data transfer rate measured in bits per second

[Traffic Report](../Report/Traffic Report.md): Overview Tab

Data Transfer

Average amount of data transferred, measured in bytes

[Traffic Report](../Report/Traffic Report.md): Overview Tab

Requests

Average number of requests

[Traffic Report](../Report/Traffic Report.md): Overview Tab

Requests Efficiency

How the CDN performed in terms of serving end-user requests from the cache instead of from the origin.

Expressed as a percentage according to the formula:

Responses Served from the Cache/All Incoming Requests + All Outgoing Responses) \* 100%

[Traffic Report](../Report/Traffic Report.md): CDN Efficiency Tab

Data Transfer Efficiency

How the CDN performed in terms of serving data from the cache instead of from the origin.

Expressed as a percentage according to the formula:

Responses Served from the Cache/All Incoming Requests + All Outgoing Responses) \* 100%

[Traffic Report](../Report/Traffic Report.md): CDN Efficiency Tab

Errors

Summary of requests for content that resulted in the following non-200 status codes:

206

400

403

404

503

Only error codes returned for the selected account and date range are displayed.

[Status Codes Report](../Report/Status Codes Report.md): Overview Tab, URLs Tab

Services

Data transfer rate in bits per second for each service (HTTP and HTTPS) enabled for the account.

[Traffic Report](../Report/Traffic Report.md): Overview Tab, Details Tab, Geography Tab

In the Traffic Report, services are referred to as "Protocols."

If traffic has not been generated for an account, indicators are displayed in the tab headers:

*   The words "Not available" are displayed for the Errors and Services tabs.

*   The other tabs display a zero.


\### Working with Tabs Each tab displays data for the metric displayed in the tab name. The average of the tab's metric for the selected accounts and date range is displayed below the tab name. The following example shows that the average Throughput is 192.19 Kbps: !\[\](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard Tab and Metric.png) If a metric has not been produced for the selected account and reporting period, the message "Not available" is displayed.

In the Throughput, Data Transfer, and Requests tabs, a toggle on the right above the chart allows you to specify chart content:

!\[\](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard Chart Buttons.png)



Toggle

Description

IN &amp; OUT

Data broken out by IN and OUT where:

*   IN is traffic coming into the CDN from customer origins.

*   OUT is traffic leaving through published hosts to the requesting client.


Chart lines are color coded and identified by labels under the chart.

TOTAL

Sum of IN and OUT

Configure chart content by making a selection in the toggle. ## Leading Metrics Cards {/\*leading-metrics-cards\*/} \[Overview\](#Leading) \[Working with Cards\](#Working2) ### Overview Each Leading Metric card displays the entities with the highest metric for the measure displayed in the card. Each card displays at most five entities; if fewer entities are available, only those are displayed. If more entities are available, you can view them in the card's expanded view (see \[Working with Cards\](#Working2)).



Card

Card Content

Additional Information

Top locations

Geographical locations from which requests for content originated

[Traffic Report](../Report/Traffic Report.md): Geography Tab

Top URLS\*

URLS (non-referrer and non-published) that received requests

[Traffic Report](../Report/Traffic Report.md): Hosts &amp; URLs Tab

Top URLS w/errors\*

URLS (non-referrer and non published) that received requests and responded with HTTP error codes

[Status Codes Report](../Report/Status Codes Report.md): Overview Tab, URLs Tab

Top file types\*

Sort of file (for example 'text/html', 'text/plan') requested

[Traffic Report](../Report/Traffic Report.md): Hosts &amp; URLs Tab

Top referred URLs\*

Referrer URLs that received requests

[Traffic Report](../Report/Traffic Report.md): Hosts &amp; URLs Tab

Top published hosts URLs\*

Published hostnames that received requests

[Traffic Report](../Report/Traffic Report.md): Hosts &amp; URLs Tab

\*Because this report uses data with daily granularity, date range selections of "Today" and "Last 24 hours" are not available (see \[Request Proration\](../Report/General Information.md#Request)). Also, only the top 50 URLs per day data is shown. Data for those metrics is only in GMT-7. ### Working with Cards

Each card except Top URLs w/errors includes a toggle, and all cards include an expand icon:

!\[\](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard card controls.png) A - Toggle B - Expand Icon You can take the following actions: \* Click the toggle to switch between Requests view and Data Transfer view. Text below the toggle changes to reflect the view: !\[\](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dashboard card view text.png) A - Card in Data Transfer view B - Card in Requests view \* Click the expand icon to switch to expanded view, where data is displayed in a dialog. !\[\](../../../../Resources/Images/Control Portal User Guide - Home Chapter/Dahboard card expanded view.png) \* Click the minimize icon in the dialog to switch back to minimized view. \* Hover the pointer over a URL to view the complete URL.

If a metric has not been produced for the selected account and reporting period, the message "No data available" is displayed.

---
title: Performance Dashboard
---
# Performance Dashboard {/*performance-dashboard*/}

The Performance Dashboard provides a comprehensive snapshot of your company's performance and summarizes information in the Traffic Report and Status Codes Report. The Performance Dashboard is different from the older [Dashboard](/delivery/control/support_tools/dashboard), which is also available.

The Performance Dashboard comprises two sections:

- The top section consists of tabs that show key performance metrics for the Delivery product, such as average bandwidth.

- The lower section provides information about leading metrics, such as locations with the highest data transfer rate. Information is displayed in card format.

<Callout type="info">The content of the lower section does not vary when you select a different tab in the top section; the two sections are independent.</Callout>

By default, data presented is an aggregate of all your company's accounts.

## Displaying the Performance Dashboard {/*displaying-the-performance-dashboard*/}

To view the Performance Dashboard, you must set it as your default landing page.

1. After logging into , click the **Profile** icon (see [Menus and Icons](/delivery/control/support_tools/menus_and_icons)) at the top right of the screen.

2. Select **My Account** from the subsequent dropdown menu.

    The *Edit My Account* page is displayed.

3. Select **Performance Dashboard** from the Landing Page dropdown menu.

4. Click the **Save** button.

    When you next log into , the Performance Dashboard is automatically displayed.

## Selecting Accounts and Date Ranges {/*selecting-accounts-and-date-ranges*/}

Limit Performance Dashboard data to specific accounts and date ranges by making selections in the drop-down menus at the top of the screen:

![Performance Dashboard](/images/delivery/control/performance-dashboard.png)

A - Account Selector

B - Date Range Selector

For additional information on selecting date ranges, see Selecting a Date Range.

## Key Performance Metrics Tabs {/*key-performance-metrics-tabs*/}

### Overview {/*overview*/}

The following table describes each tab.

| Tab | Description | Additional Information |
| --- | --- | --- |
| Throughput | Average data transfer rate measured in bits per second | [Traffic Report: Overview Tab ](/delivery/control/reports/traffic/traffic/#overview-tab)|
| Data Transfer | Average amount of data transferred, measured in bytes | [Traffic Report: Overview Tab ](/delivery/control/reports/traffic/traffic/#overview-tab) |
| Requests | Average number of requests | [Traffic Report: Overview Tab ](/delivery/control/reports/traffic/traffic/#overview-tab) |
| Requests Efficiency | How the CDN performed in terms of serving end-user requests from the cache instead of from the origin.<br />Expressed as a percentage according to the formula:<br />(*Responses Served from the Cache/All Incoming Requests* + *All Outgoing Responses) * 100%* | [Traffic Report: CDN Efficiency Tab](/delivery/control/reports/traffic/traffic/#cdn-efficiency-tab).|
| Data Transfer Efficiency | How the CDN performed in terms of serving data from the cache instead of from the origin.<br />Expressed as a percentage according to the formula:<br />*Responses Served from the Cache/All Incoming Requests* + *All Outgoing Responses * 100%* | [Traffic Report: CDN Efficiency Tab](/delivery/control/reports/traffic/traffic/#cdn-efficiency-tab) |
| Errors | Summary of requests for content that resulted in the following non-200 status codes:<br />206<br />400<br />403<br />404<br />503<br />Only error codes returned for the selected account and date range are displayed. | [Status Codes Report](/delivery/control/reports/content/status_codes): Overview Tab, URLs Tab |
| Services | Data transfer rate in bits per second for each service (HTTP and HTTPS) enabled for the account. | [Traffic Report](/delivery/control/reports/traffic/traffic): Overview Tab, Details Tab, Geography Tab <br /> <Callout type="info">In the Traffic Report, services are referred to as "Protocols."</Callout> |

<Callout type="info">If traffic has not been generated for an account, indicators are displayed in the tab headers: <br /> - The words "Not available" are displayed for the Errors and Services tabs. <br /> - The other tabs display a zero.</Callout>

#### Working with Tabs {/*working-with-tabs*/}

Each tab displays data for the metric displayed in the tab name.

The average of the tab's metric for the selected accounts and date range is displayed below the tab name.

If a metric has not been produced for the selected account and reporting period, the message "Not available" is displayed.

In the *Throughput*, *Data Transfer*, and *Requests* tabs, a toggle on the right above the chart allows you to specify chart content:

| Toggle | Description |
| --- | --- |
| IN & OUT | Data broken out by **IN** and **OUT** where:<br><br> - **IN** is traffic coming into the CDN from customer origins.<br /> - **OUT** is traffic leaving through published hosts to the requesting client.<br /><br />Chart lines are color coded and identified by labels under the chart. |
| TOTAL | Sum of **IN** and **OUT** |

Configure chart content by making a selection in the toggle.

## Leading Metrics Cards {/*leading-metrics-cards*/}

Each Leading Metric card displays the entities with the highest metric for the measure displayed in the card. Each card displays at most five entities; if fewer entities are available, only those are displayed. If more entities are available, you can view them in the card's expanded view (see [Working with Cards](#working-with-cards)).

| Card | Card Content | Additional Information |
| --- | --- | --- |
| Top locations | Geographical locations from which requests for content originated | [Traffic Report](/delivery/control/reports/traffic/traffic/#geography-tab): Geography Tab |
| Top URLS* | URLS (non-referrer and non-published) that received requests | [Traffic Report: Hosts & URLS tab](/delivery/control/reports/traffic/traffic/#hosts-and-urls-tab).|
| Top URLS w/errors* | URLS (non-referrer and non published) that received requests and responded with HTTP error codes | [Status Codes Report](/delivery/control/reports/content/status_codes): Overview Tab, URLs Tab |
| Top file types* | Sort of file (for example 'text/html', 'text/plan') requested | [Traffic Report: Hosts & URLS tab](/delivery/control/reports/traffic/traffic/#hosts-and-urls-tab) |
| Top referred URLs* | Referrer URLs that received requests | [Traffic Report: Hosts & URLS tab](/delivery/control/reports/traffic/traffic/#hosts-and-urls-tab) |
| Top published hosts URLs* | Published hostnames that received requests | [Traffic Report: Hosts & URLS tab](/delivery/control/reports/traffic/traffic/#hosts-and-urls-tab)|

*Because this report uses data with daily granularity, date range selections of "Today" and "Last 24 hours" are not available (see [Request Proration](/delivery/control/reports)). Also, only the top 50 URLs per day data is shown. Data for those metrics is only in GMT-7.

### Working with Cards {/*working-with-cards*/}

Each card except Top URLs w/errors includes a toggle, and all cards include an expand icon:

![Card Toggle](/images/delivery/control/card-toggle.png)

A - Toggle

B - Expand Icon

You can take the following actions:

-   Click the toggle to switch between Requests view and Data Transfer view. Text below the toggle changes to reflect the view.

-   Click the expand icon to switch to expanded view, where data is displayed in a dialog.

-   Click the minimize icon in the dialog to switch back to minimized view.

-   Hover the pointer over a URL to view the complete URL.

<Callout type="info">If a metric has not been produced for the selected account and reporting period, the message "No data available" is displayed.</Callout>

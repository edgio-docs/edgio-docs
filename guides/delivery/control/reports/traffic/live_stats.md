---
title: Live Stats Report
---
The *Live Stats* Report shows real-time bandwidth usage and can be used to monitor real-time traffic trends.

The report displays usage in Bits/Sec for one or more services for the preceding 6 hours.

![Live Stats Report](/images/delivery/control/live-stats-report.png)

## Report Specifications  {/*report-specifications*/}

The report automatically refreshes data every 30 seconds but contains an Auto refresh toggle in both tabs that allows you to enable or disable automatic refresh. The selection you make in one tab is reflected in the other tab.

The report has these tabs:
- [Overview](#overview-tab)
- [Geography](#geography-tab)

|Specification|Description|
|---|---|
|Latency| One minute|
|Granularity| One minute|
|Dimensions|Account, Protocol|
|Metrics - Summary Area in Overview Tab	|Average, Peak Value|
|Metrics - Chart in Overview Tab, Map in Geography Tab|Throughput In and Out <br /> Data Transfer In and Out <br /> Requests In and Out|
|Delivery Mechanism	|Realtime Reporting API|
| Associated API Endpoint(s) | -   `/realtime-reporting-api/traffic/livestats` retrieves report data based on the filters applied.<br />    <br />-   `/realtime-reporting-api/traffic/livestats/geo` retrieves geo report data based on the filters applied. |

## Choosing Accounts  {/*choosing-accounts*/}

You can choose accounts for which you wish to see live stats information. Click the drop-down menu to the right of the *LIVE STATS FOR* title and select the desired accounts.

<Callout type="info">You must select at least one name; otherwise, the default company is automatically selected, and a warning is displayed.</Callout>

## Choosing a Time Zone  {/*choosing-a-time-zone*/}

Use the *Time Zone Control* at the top right of the page to select a timezone. The top five most commonly used timezones in are at the top of the dropdown. Scroll down for additional time zones.

## Overview Tab  {/*overview-tab*/}

This tab summarizes your data in a summary area and a chart with a legend to its right.

### Filtering Protocols for Display  {/*filtering-protocols*/}

Use the *Protocol Filter* to determine which protocols to display in the chart.

The filter icon (a funnel) on the left side of the tab header allows you to filter by protocol. The icon is a toggle that displays or hides the filter control.

1.  Click the filter icon.
2.  Make a selection in the subsequent *Filter by* dropdown.

    By default, the *Protocol* entry is unchecked. As such, data for all protocols is displayed in the chart.

3.  If desired, select **Protocol** to display a with protocols you can select for display in the chart.
4.  Click the **Apply** button.

### Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

On the left under the tab header is the Live Stats Aggregate Data by that allows you to determine how data is broken out in the chart: by Account or Protocol.

Make a selection:


| Selection | Data Displayed in Chart | Information Displayed in Legend |
| --- | --- | --- |
| Not Selected | All data for the selected metric. | Single entry: *All Data*. |
| Account | Data for the accounts you selected (see [Choosing Accounts](#choosing-accounts)). | List of all accounts you selected. |
| Protocol | Data for all protocols associated with the accounts you selected. | List of protocols. |

The chart reflects your selection, and the [Summary Area](#summary-area) displays data for the selected metric.

### Choosing Metrics  {/*choosing-metrics*/}

See [Choosing Metrics for the Overview and Geography Tab](#choosing-metrics-overview-geography).

### Summary Area  {/*summary-area*/}

The *Summary Area* summarizes the metrics you selected (see [Choosing Metrics for the Overview and Geography Tab](#choosing-metrics-overview-geography)) for the last six hours.

Units depend on the selected direction (In, Out, Total) and metric:
-   Throughput - bits per second
-   Data Transfer - bytes
-   Requests - number of requests


| Statistic | Description |
| --- | --- |
| Average | Average for the selected metric and direction. |
| Peak Value | Highest value of the selected metric and direction. |

### Exporting Chart Data  {/*export-chart-data*/}

To export data currently displayed in the chart, click the Export drop-down menu on the right above the chart; then choose an option:
- *PowerPoint*: Export to a PowerPoint file that contains a screenshot of the chart.
- *CSV*: Export data to a Comma-Separated Values (CSV) file that reflects the currently selected chart options.

After you choose an option, Control creates and downloads the report.

### Toggling Chart Data  {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color. The legend reflects the choices that you made in the *Grouping* dropdown menu.

For example, if you selected **Protocol** in the aggregate drop-down menu, the legend contains a list of all protocols associated with the account.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

## Geography Tab  {/*geography-tab*/}

This tab shows usage in *Bits/Sec* over the last 12 hours on an interactive map.

<Callout type="info">The map shows data only if your account has the 'POP view' and 'Region view' products.</Callout>

In the *Region Data* chart, individual POP traffic is stacked for each region, and you can mouse over any bar segment to view POP traffic details.

Click a continent to view data at the country level.

### Choosing Metrics {/*choosing-metrics*/}

See [Choosing Metrics for the Overview and Geography Tab](#choosing-metrics-overview-geography).

### Exporting Data  {/*exporting-data*/}

You can export data to a Comma-Separated Values (CSV) file that reflects the currently selected map metrics.

Click the **Export** dropdown on the right above the map, then select CSV.

After you select **CSV**, Control creates and downloads the report.

## Choosing Metrics for the Overview and Geography Tab  {/*choosing-metrics-overview-geography*/}

On the right under the tab header are s that allow you to select metrics (Throughput, Data Transfer, Requests) and direction (In, Out, Total).

Make selections:


| Metric | Metric Description | Direction |
| --- | --- | --- |
| Throughput | Traffic flow measured in bps. | In: Through the network from the origin.<br /><br />Out: through the network to the requestor, |
| Data Transfer | Data flow measured in bytes. | In: Into the CDN from the origin.<br /><br />Out: From the published host to the requestor. |
| Requests | Number of requests. | In: Into the CDN from the origin.<br /><br />Out: From the published host to the requestor. |

<Callout type="info">For all metrics, Total = In + Out.</Callout>

The metrics you select are reflected in the summary area and chart in the Overview tab, and the map in the Geography tab.

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

### Overview Tab - Summary Area {/*overview-tab-summary*/}

| Metric | Calculation |
| --- | --- |
| Average Throughput | Average of all throughput values for the reporting period. |
| Average Data Transfer | Average of all data transfer values for the reporting period. |
| Average Requests | Average of all request values for the reporting period. |
| Peak Value Throughput, Data Transfer, Requests | Max value of the selected metric for the reporting period. |

### Overview Tab Chart and Geography Map {/*overview-tab-chart-map*/}

| Metric | Calculation |
| --- | --- |
| Throughput In | No calculation. Data provided by EdgeQuery. |
| Throughput Out | No calculation. Data provided by EdgeQuery. |
| Data Transfer In | No calculation. Data provided by EdgeQuery. |
| Data Transfer Out | No calculation. Data provided by EdgeQuery. |
| Requests In | No calculation. Data provided by EdgeQuery. |
| Requests Out | No calculation. Data provided by EdgeQuery. |

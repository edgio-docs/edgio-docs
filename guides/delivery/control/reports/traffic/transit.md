---
title: Transit Report
---

The Transit Report shows CDN transit usage (access to the CDN backbone) for the currently selected company. You can use the report to monitor traffic trends for the IP Connect service. The report shows throughput and data transfer.

![Transit Report](/images/delivery/control/transit-report.png)

<Callout type="info">Backbones and circuits are the private infrastructure that connect Edgio's PoPs.</Callout>

Data is displayed in an interactive chart.

## Report Specifications  {/*report-specifications*/}

| Specification    |   Description  |
| --- | --- |
| Latency | Depends on the selected granularity.<br />-   Hour granularity: latency = 1 hour + Delta<br />-   Day granularity: latency = 1 day + Delta<br /><br />Delta = approximately 5-10 minutes |
| Granularity | Hour, Day |
| Dimensions | Circuit |
| Metrics | -   Throughput in, throughput out, and throughput total (in + out).<br />-   Data transfer in, data transfer out, and data transfer total (in + out).<br /><br />See [How Metrics Are Calculated](#how-metrics-are-calculated) for details. |
| Delivery Mechanism | Realtime Reporting API |
| Associated API Endpoint | `http://{host}/realtime-reporting-api/transit`<br /><br />Returns transit data for the requested time period. |

## Choosing Date Range and Time Zone  {/*choosing-date-range*/}

Use the controls at the top right of the page:
-    *Date Range Control*. Pick from pre-set time frames or choose custom date ranges in the dropdown. Click the Apply button to set a custom range.
-    *Time Zone Control*. Select a timezone. The five most commonly used timezones in are at the top of the dropdown. Scroll down for additional time zones.

## Choosing Circuits to Display  {/*choosing-circuits-to-display*/}

Use the *Circuit Name Filter* and the *Grouping* to determine circuit data to display.

### Circuit Name Filter {/*circuit-name-filter*/}

The filter icon (a funnel) on the left side of the TRANSIT FOR title allows you to filter by circuit name. The icon is a toggle that displays and hides the circuit filter control.

1.  Click the filter icon.
2.  Make a selection in the subsequent *Filter by* dropdown.

    By default, the *Circuit Name* entry is unchecked. As such, data for all circuits is displayed in the chart.

3.  If desired, select **Circuit Name** to display a with circuit names you can select to display in the chart.
4.  Click the **Apply** button.

### Grouping Dropdown {/*grouping-dropdown*/}

Beneath the TRANSIT FOR title is a that allows you to display all circuit data or data for specific circuit names.

Make a selection:

*   Choose **Not Selected** to display all data. The legend displays a single entry, *All Data*.
*   Select **Circuit** to display data broken out by circuit name in the legend.

## Choosing Chart Metrics  {/*choosing-chart-metrics*/}

Beneath the Date Range Control and Timezone Control are s that allow you to select report metrics.

**Throughput/Data Transfer**

Make a selection:
*   Throughput - Data flow rate through the network expressed in Kbps.
*   Data Transfer - Amount of data transferred expressed in GB.

**In/Out/Total**

This is a second-level qualifier for the Throughput/Data Transfer. Make a selection:
*   In - From origin to the CDN.
*   Out - From the CDN to the end user.
*   Total - Total of In + Out

For example, if you choose Data Transfer and Total, the chart displays total (transfer in + transfer out).


## Setting Chart Date Granularity  {/*setting-chart-date-granularity*/}

The chart X-axis displays date/time units, which are determined by the *Granularity Controls* and the *Date Range Control*.

### Granularity Controls {/*granularity-controls*/}
*
Granularity Controls* are located above the chart on the left. The selection you make determines the data available in the chart.

*   *Hour* - Display hourly data.
*   *Day* - Display only daily data.

### Date Range Control {/*date-range-control*/}

You can select ranges as small as a day or ranges spanning multiple months.

Scenario 1: You select a single day or last twenty-four hours.

| Hour Granularity | Day Granularity |
| --- | --- |
| Hours for the day are displayed on the X-axis. Move your cursor across the chart to see metrics for each hour. | One data point representing midnight on the selected day is displayed on the X-axis. Move your cursor over the chart to see metrics for the date. |

Scenario 2: You select a date range that includes more than one day.

| Hour Granularity | Day Granularity |
| --- | --- |
| Dates are displayed on the X-axis.<br /><br />Move your cursor across the chart to see metrics for each hour in the dates. | Data points representing dates at midnight are displayed on the X-axis. Move your cursor across the chart to see metrics for each date. |

<Callout type="info">For 'Day' granularity, the dates displayed depend on the size of the date range. The larger the range, the fewer the dates displayed, but data for all dates can be viewed. For example, for smaller date ranges, a data point for each date is displayed. For larger ranges, data points for every seven days might be displayed, but by moving the cursor across the chart, you can see popups with data for each day.</Callout>

## Toggling Chart Data  {/*toggling-chart-data*/}

A legend beneath the chart identifies the chart content by color. The legend reflects the choices that you made in the *Circuit Name Filter* and the *Grouping* dropdown.

For example, if you filtered by two specific circuit names and you selected Circuit in the dropdown, data for the circuit names displays in the chart. Labels for the two names display in the chart legend.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

<Callout type="info">If you chose *Not Selected* in the *Grouping* dropdown, the label *All Data* is displayed. Toggling the label hides or reveals all chart data.</Callout>

## Exporting Chart Data  {/*exporting-chart-data*/}

To export data currently displayed in the chart, click the *Export* drop-down menu on the right above the chart; then choose an option:

- *PowerPoint*: Export to a PowerPoint file that contains a screenshot of the chart.
- *CSV*: Export data to a Comma-Separated Values (CSV) file that reflects the currently selected chart options.

After you choose an option, Control creates and downloads the report.

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

| Metric | Calculation |
| --- | --- |
| Data transfer in | No calculation. Data provided by |
| Data transfer out | No calculation. Data provided by |
| Data transfer total | Data transfer in + Data transfer out |
| Throughput in | "Data transfer in" divided by "duration," where duration depends on the chosen granularity.<br /><br />-   Day granularity: For each day, the system divides Data transfer in by the number of seconds in the day.<br />-   Hour granularity: For each hour, the system divides Data transfer in by the number of seconds in an hour.<br /><br />Hover the mouse pointer over a day or hour to display the results of the calculation. |
| Throughput out | Calculation is identical to 'Throughput in', but applied to Data transfer out. |
| Throughput total | Throughput in + Throughput out |
| --- | --- |
| In  | Ingested into the CDN from the origin. |
| Out | Bytes from the published host to the end user. |
| Total | Sum of 'In' and 'Out'. |

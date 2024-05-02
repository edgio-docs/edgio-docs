---
title: Origin Storage Report
---
The Origin Storage Report lets Origin Storage users view consolidated storage data for any combination of accounts and policies in a single, comprehensive report. Users with permissions for the report can view a summary of stored content across time, peak storage, total stored on disk and total unique objects.

Data is displayed in an interactive area chart.

![Origin Storage Report](/images/delivery/control/origin-storage.png)

## Report Specifications  {/*report-specifications*/}
|Specification|Description|
|---|---|
|Latency| Latency depends on the selected granularity. <br /> - 5 minutes: 5 to ten minutes<br />- Hour: 1 hour + delta (approximately 5-10 minutes)<br />- Day: 1 day + delta (approximately 5-10 minutes)|
|Granularity| Hour, day|
|Dimensions|Policy, Account|
|Metrics - Summary Area	|Total Storage in bytes, Unique Objects, Peak Storage in bytes|
|Delivery Mechanism	|EdgeQuery|
|Associated API Endpoint(s)|None |

## Selecting Accounts, Date Range, and Time Zones  {/*selecting-accounts-data-range-time-zones*/}

You can make selections in the controls above the tab header:

*   *ORIGIN STORAGE FOR*. Select one or more accounts to which you have access for cross-account analysis. Click the **Select All** button to select all accounts.

    <Callout type="info">You must select at least one account; otherwise, the default company is automatically selected, and a warning is displayed.</Callout>

*   *Date range*. Pick from pre-set time frames or choose custom date ranges in the . Click the **Apply** button on custom ranges.

*   *Time zone*. The top five most commonly used timezones in are at the top of the . Scroll down for additional time zones.

    <Callout type="info">Data in the *Hosts & URLs* tab is of DAY granularity and is always stored in GMT-7, so the *Time zone* dropdown menu is disabled when you select the tab.</Callout>

## Filtering  {/*filtering*/}

A filter icon on the top left side of the page allows you to filter by policy. The icon is a toggle that displays and hides the filter controls.

1. Click the icon to display a drop-down menu.
2. Select **Policy** in the drop-down menu to display a drop-down menu with policy names related to the selected accounts.
3. Select the desired policies, then click the **Apply** button to apply your filter choices.

Your filter choices are applied to the *Summary Area* and area chart.

## Summary Area  {/*summary-area*/}

For various statistics, the *Summary Area* shows the percent change for the selected reporting date range relative to the previous time range of the same duration.

Colors and arrows represent changes:
- An increase displays in green with an arrow pointing up.
- A decrease displays in red with an arrow pointing down.
- If there was no change from the previous period, the text is gray with an empty circle instead of an arrow.
- Percentage up or down is in bold text to the right of the arrow or empty circle.
- Information in gray text beneath the percentage up or down indicates the total date range covered minus any time remaining in the current period. For example, if you select **Last 7 days** as the reporting period and the current date is part of the past seven days, the past 13 days' information is displayed.


<Callout type="info">Information in the Summary Area is determined only by the selected account and reporting date range. It is not affected by the selections you make in any other controls on the page.</Callout>

## Selecting a Data Grouping  {/*selecting-a-data-grouping*/}

Beneath the *Summary Area* title is a drop-down menu that allows you to determine how data is broken out in the chart, by Policy, Account or all data.

Make a selection.

| Selection | Data Displayed in Chart | Information Displayed in Legend |
| --- | --- | --- |
| Not Selected | All data for the selected metric. | Single entry: *All Data*. |
| Policy | Data for the filtered policies. | List of filtered policies. |
| Account | Data for all selected accounts. | List of selected accounts. |

## Choosing Metrics {/*choosing-metrics*/}

On the right beneath the *Summary Area* is a that allows you to select chart metrics.

Make a selection.

| Selection | Description |
| --- | --- |
| Total Stored | Total size in bytes of all objects stored. |
| Unique Objects | Number of objects stored in Origin Storage at any given moment of time, not including copies. According to some storage policies , Edgio maintains several copies. The Unique Objects value does not include copies in the count. |

The chart reflects your selection.

## Choosing Granularity {/*choosing-granularity*/}

The chart can be further refined by selecting one of the *Increment* values:
-   Hour
-   Day

The selection you make determines increments along the Y-axis.

## Exporting Chart Data {/*exporting-chart-data*/}

To export chart data to a PowerPoint file that contains a screenshot of the chart, click the *Export* drop-down menu on the right above the chart; then select **PowerPoint**.

After you select **PowerPoint**; Control creates and downloads the report.

## Toggling Chart Data {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color. The legend reflects the choices that you made in the *Grouping* dropdown menu.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

## How Metrics Are Calculated  {/*how-metrics-are-calculated*/}

| Metric | Calculation |
| --- | --- |
| Total of stored objects' sizes | No calculation. Data provided by EdgeQuery. |
| Unique objects | Total number of objects minus copies. |
| Peak storage | No calculation. Data provided by EdgeQuery. |

### Summary Area - Percentage Up and Down {/*summary-area*/}

The up or down change for a given metric is calculated by comparing the metric from the previous period to the metric from the current period.

| Comparison Results | Metric Presentation |
| --- | --- |
| Selected time period value equals previous time period. | Presented as no change. |
| Previous period value is smaller than current period. | Presented as up from previous period.<br /><br />See also [Percentage Calculation](#percentage-calculation). |
| Previous period value is greater than current period. | Presented as down from previous period.<br /><br />See also [Percentage Calculation](#percentage-calculation). |

### Percentage Calculation {/*percentage-calculation*/}

The 'Up' and 'Down' presentations include a percentage.

`Percentage = ((newValue - oldValue) / oldValue) * HUNDRED_PERCENT`

---
title: Reports
---
To access reports, click **Analytics** from the left navigation; then select the desired report from the left-hand pane.

<Callout type="info">If a report displays an AWS error message indicating that you are not authorized to view it, then you must adjust your browser's security configuration to allow `cms.uplynk.com` to use third-party cookies. <br />[Learn more](#aws-report-error).</Callout>

[Reports](https://cms.uplynk.com/static/cms2/index.html#/analytics) (log-in required) provide insight into billing, usage data, live channel viewership, live event metrics, on-demand metrics, and ads.

## Controls and Functions {/*controls-and-functions*/}

Customize your report data using controls. Functions allow you to view and print your selections.

### Data Controls  {/*data-controls*/}

![Data Controls](/images/uplynk/reports-data-controls.png)

Click **Controls** or a Control option to expand the panel where you can customize your metrics to view, print, or export.

<Tip>Reports include only data that satisfies all filters specified in the Control panel.</Tip>

#### Control Panel Options  {/*control-panel-options*/}

|Option| Description| Details|
|---|---|---|
|Time Range| Select a custom date range, the **relative by** granularity, and exclusion options.|To view metrics for a different time period, select an option from the **Time Range** section:<ul><li>Custom date range. From the **Date range** option, set a start and end date/time.</li><li>Predefined date range. Customize your metric choices via the **Relative by** section (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Exclude dates. Check the **Exclude last** box to select your exclusion options.</li></ul><br /><Callout type="info">By default, all dates/times are specified in UTC.</Callout>|
|Account|Filter by one or multiple account name(s).|<ol><li>Click on the Account drop-down.</li><li>Optional. Search for an account by typing its name.</li><li>Add accounts to the report by marking the desired accounts.</li><li>Remove accounts from the report by clearing the desired accounts.</li><li>Optional. Click **SHOW SELECTED VALUES** to list all the accounts you've included.</li></ol>|
|Playback Type|Choose between (`live` or `vod`). This option also determines the metrics that are displayed.||
|Channel/ Event|`live` Playback Type only. Filter by channel or event name.|The default values for this dropdown and the associated analytics are based on the Playback Type selected. This option is NULL for `vod` Playback Type.|
|Asset|`vod` Playback Type only. Search for then select the assets you want included.|The default values for this dropdown and the associated analytics are based on the **Playback Type** selected. This option is NULL for `live` Playback Type.|
|Granularity|Error Details report only. Change the interval for this report by selecting the desired granularity. Choose from `Day`, `Hour`, `Month`, `Quarter`, `Year`.||

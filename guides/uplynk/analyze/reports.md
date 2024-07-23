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

#### View/ Export individual data metrics  {/*view-export*/}

Access these features by hovering in the top right corner of any tile, clicking the three dots <Image inline src="/images/uplynk/three-dots.png" alt="Revert" />, and selecting the option.

![Report Features](/images/uplynk/report-features.png)

|Option| Access|
|---|---|
| Maximize/ minimize data category. |Toggle the maximize icon <Image inline src="/images/uplynk/minmax.png" alt="Revert" /> to enlarge or reduce the data view.|
| View summary of metric. |Click the three dots <Image inline src="/images/uplynk/three-dots.png" alt="Revert" />; then select **View Summary Data**.|
| Export data summary. |Click the three dots <Image inline src="/images/uplynk/three-dots.png" alt="Revert" /> next to the data metric; then select **Export to CSV**. Your file will be saved to your default location.|

#### Export reports {/*export-reports*/}

1. Click on the **Controls** bar to define the report metrics. See [Data Controls](#data-controls) for details and options.

    <Tip>Reports include only data that satisfies all filters specified in the Control panel.</Tip>

2. Select the **Export** icon <Image inline src="/images/uplynk/export-icon.png" alt="Revert" /> from the top, right corner. Then click **Print**.

3. Choose your print options, then **GO TO PREVIEW**.

4. Optional. Click **Configure** to change the print options again.

5. Click **Print** from the top left, select your printer options, then click **Print**.

#### View exported reports {/*view-exported-reports*/}

1. Select the Export icon <Image inline src="/images/uplynk/export-icon.png" alt="Revert" /> from the top, right corner. Then click **View exports** to list your PDF, CSV and XLS files.

2. Click on a report to view it.

3. Select **Hide exports** to close the export list.

## Ad Summary  {/*ad-summary*/}

{{ COMPANY_NAME }} provides these reports for analyzing ad performance: Ad Delivery, Errors Summary, and Error Details.

### Ad Delivery  {/*ad-delivery*/}

The Ad Delivery report provides the following analytics related to ad delivery: OVERVIEW, AD IMPRESSIONS BY ENVIRONMENT, ADD IMPRESSIONS BY OTT DEVICE GROUP, OVERVIEW BY DEMAND PARTNER.

#### OVERVIEW {/*overview*/}

Analyze core ad-related analytics.

|Analytic|Details|
|---|---|
|AD BREAKS| The number of ad breaks that was triggered as a result of playback. `vod` or `live` indicates the current Playback Type selected.|
|OPPORTUNITIES| `live` Playback Type only. The total number of ad opportunities that was requested. The calculation of this statistic is based on the assumption that each ad has a duration of 30 seconds.|
|AD COUNT| `vod` Playback Type only. The total number of ads served across all ad breaks.|
|IMPRESSIONS| The total number of ads that was served.|
|REQUESTED BREAK DUR| The total number of hours of ad break duration requested from ad decision servers. As part of an ad request, Uplynk indicates the duration of the ad break to the ad decision server. The ad decision server uses this information to determine how much time needs to be filled with ads.|
|RESPONSE BREAK DUR| The total number of hours for the ad creatives that our service prepared for stream insertion.<br /><Tip>This metric omits response durations associated with ad break requests whose duration is 0.</Tip>|
|FILL RATE| `live` Playback Type only. The percentage of ads that was served. This statistic is calculated using the following formula:<br />`Fill Rate = (Ad Impressions / Opportunities ) * 100`|
|AVG AD COUNT| `vod` Playback Type only. The average number of ads served per ad break.|
|100% VIEW RATE|  The percentage of ads that was viewed to completion.|
|COMPLETION RATE| The percentage of ad breaks that was viewed to completion.|
|AD SERVER FILL RATE| The percentage of ad break duration that was filled. This statistic is calculated using the following formula:<br />`Ad Server Fill Rate = (Response Break Dur / Requested Break Dur) * 100`|

#### AD IMPRESSIONS BY ENVIRONMENT  {/*ad-impressions-by-environment*/}

Breaks down the number of ads that were served by environment (e.g., CTV, Mobile App, or Desktop).

#### AD IMPRESSIONS BY OTT DEVICE GROUP {/*ad-impressions-by-ott-device-group*/}

Breaks down the number of ads that were served by OTT device category (e.g., OTT & Streaming Media Player, Smart TV, Smartphone & Tablet, or Desktop).

#### OVERVIEW BY DEMAND PARTNER {/*overview-by-demand-partner*/}

Breaks down ad requests and responses for each of your ad demand partners.

### Errors Summary {/*errors-summary*/}

The Errors Summary report provides the following analytics for ad breaks that did not contain ads due to errors and timeouts:

#### OVERVIEW {/*errors-summary-overview*/}

Analyze analytics on ad errors and timeouts.

|Analytic|Details|
|---|---|
|AD BREAK SUCCESS| The total number of ad breaks that successfully served at least one ad.|
|AD BREAK ERRORS| The number of ad breaks that did not contain ads due to an error.|
|AD BREAK TIMEOUTS| The number of ad breaks that did not contain ads due to the amount of time it took to receive a response from the ad decision server.|
|AD BREAK TOTAL| The number of ad breaks.|
|AD REQUEST ERROR RATE| The percentage of ad requests that did not return an ad due to an error.|
|AD BREAK TIMEOUT RATE| The percentage of ad breaks that did not contain ads due to the amount of time it took to receive a response from the ad decision server.|

#### AD BREAK ERRORS & TIMEOUTS BY ENVIRONMENT {/*ad-break-errors-and-timeouts-by-environment*/}

Breaks down ad breaks that did not contain ads due to an error or timeout by the type of device (e.g., CTV, Mobile App, and Desktop).

#### AD BREAK ERRORS & TIMEOUTS TREND {/*ad-break-errors-and-timeouts-trend*/}

This line chart contains color-coded lines that track over time the number of ad breaks that did not contain ads due to an error or timeout.

### Error Details {/*error-details*/}

The Errors Details report provides the following analytics for ad errors:

#### AD REQUEST TRANSACTION SUMMARY {/*ad-request-transaction-summary*/}

Breaks down ad errors by third-party ad provider (i.e., demand partner).

|Analytic|Details|
|---|---|
|Demand Partner| A third-party ad provider by name.|
|Requests| The total number of ad requests submitted to a third-party ad provider.|
|Errors| The total number of ad requests that resulted in an error.|
|Time Outs| The total number of ad requests that failed due to a connection timeout. This means that the ad decision server took too long to provide a response.|
|Fail % of Requests| The percentage of ad requests that failed.|
|Fail % of Total Requests| The percentage of total ad requests that failed.|

#### DEMAND PARTNER BREAKDOWN  {/*demand-partner-breakdown*/}

Hover over the slices in this pie graph to view the number and contributing percentage of requests by demand partner.

#### ERROR TRANSACTION BREAKDOWN  {/*error-transaction-breakdown*/}

|Analytic|Details|
|---|---|
|Account Name| An Uplynk account by name.|
|Request Type| Indicates whether the error occurred with the initial request to the ad decision server or a wrapper request spawned from it. <ul><li>**Main Provider**: Initial request.</li><li>**Wrapper**: Wrapper request.</li></ul>|
|Demand Partner| A third-party ad provider by name.|
|Error Message| A brief description for the error.|
|Error Category| The [type of error](#ad-error-categories) that occurred.|
|Count| The number of ad requests that resulted in a specific type of error for the current third-party ad provider.|
|Total Errors|The percentage of ad requests that resulted in a specific type of error for the current third-party ad provider.|
|Fail % of Total Errors| The percentage of ad requests that resulted in a specific type of error for the current third-party ad provider.|
|Fail % of Total Requests| The percentage of total ad requests that failed.|

#### ERROR TREND  {/*error-trend*/}

This line graph plots [ad error categories](#ad-error-categories) over time.

#### Ad Error Categories {/*ad-error-categories*/}

Each error type is briefly described below.

|Error|Details|
|---|---|
|Connection| An issue occurred when establishing a connection to the ad decision server. For example, an error occurred during the TLS handshake error or the ad decision server returned a non-`200` response.|
|Encode Decode| An encoding or decoding issue occurred with the response provided by the ad decision server. For example, an incomplete ad response may cause this type of error.|
|Invalid Url| The ad decision server provided an invalid URL for the ad wrapper.|
|Large Content| The response from the ad decision server exceeded our file size requirements.|
|No Ads| An ad creative was not included in the response provided by the ad decision server.|
|No Media File| The response provided by the ad decision server did not contain a media file.|
|Time Out| The third-party ad server took too long to provide a response.|
|Undefined| An error that does not match any of the above categories occurred.|

## Asset Summary  {/*asset-summary*/}

The Asset Summary report provides the following analytics for your CMS assets:

#### ASSET PLAYBACK STATISTICS  {/*asset-playback-stats*/}

Analyze asset-specific statistics.

|Analytic|Details|
|---|---|
|Asset Description| Indicates the asset's name.|
|Channel Hours| Indicates the number of hours that assets were played as a result of a live channel.|
|Event Hours| Indicates the number of hours that assets were played as a result of a live event.|
|VOD Hours| Indicates the number of hours that assets were played as on-demand content.|
|Total Hours Watched| Indicates the total number of hours that assets were played.|
|Asset Views| Indicates the total number of times that assets were requested as a result of a live channel, live event, or VOD.|

#### PLAYBACK HOURS BY COUNTRY  {/*playback-hours-by-country*/}

Breaks down your audience by country.

#### PLAYBACK HOURS BY PLATFORM  {/*playback-hours-by-platform*/}

Breaks down your audience by operating system.

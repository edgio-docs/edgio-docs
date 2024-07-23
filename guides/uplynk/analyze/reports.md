---
title: Reports
---
To access reports, click **Analytics** from the left navigation; then select the desired report from the left-hand pane.

<Callout type="info">If a report displays an AWS error message indicating that you are not authorized to view it, then you must adjust your browser's security configuration to allow `cms.uplynk.com` to use third-party cookies. <br />[Learn more](#aws-report-error).</Callout>

[Reports](https://cms.uplynk.com/static/cms2/index.html#/analytics) (log-in required) provide insight into billing, usage data, live channel viewership, live event metrics, on-demand metrics, and ads.

## Controls and Functions {/*controls-and-functions*/}

Customize your dashboards and report data using controls. Functions allow you to view and print your selections.

### Data Controls  {/*data-controls*/}

![Data Controls](/images/uplynk/reports-data-controls.png)

Click **Controls** or a Control option to expand the panel where you can customize your metrics to view, print, or export.

<Tip>Dashboard views and reports include only data that satisfies all filters specified in the Control panel.</Tip>

#### Control Panel Options  {/*control-panel-options*/}

|Option| Description| Details|
|---|---|---|
|Time Range| Select a custom date range, the **relative by** granularity, and exclusion options.|To view metrics for a different time period, select an option from the **Time Range** section:<ul><li>Custom date range. From the **Date range** option, set a start and end date/time.</li><li>Predefined date range. Customize your metric choices via the **Relative by** section (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Exclude dates. Check the **Exclude last** box to select your exclusion options.</li></ul><br /><Callout type="info">By default, all dates/times are specified in UTC.</Callout>|
|Account|Filter by one or multiple account name(s).|<ol><li>Click on the Account drop-down.</li><li>Optional. Search for an account by typing its name.</li><li>Add accounts to the report by marking the desired accounts.</li><li>Remove accounts from the report by clearing the desired accounts.</li><li>Optional. Click **SHOW SELECTED VALUES** to list all the accounts you've included.</li></ol>|
|Playback Type|Choose between (`live` or `vod`). This option also determines the metrics that are displayed.||
|Channel/ Event|`live` Playback Type only. Filter by channel or event name.|The default values for this dropdown and the associated analytics are based on the Playback Type selected. This option is NULL for `vod` Playback Type.|
|Asset|`vod` Playback Type only. Search for then select the assets you want included.|The default values for this dropdown and the associated analytics are based on the **Playback Type** selected. This option is NULL for `live` Playback Type.|
|Granularity|Error Details report only. Change the interval for this report by selecting the desired granularity. Choose from `Day`, `Hour`, `Month`, `Quarter`, `Year`.||

### Functions {/*functions*/}

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

#### ENCODING BREAKDOWN  {/*encoding-breakdown*/}

Breaks down your encoding analytics.

|Analytic|Details|
|---|---|
|Content Type|The content to included in the report. Select from: All, Channel, Event, VOD.|
|Asset Description|The name created for the asset.|
|Slicer Name|The name of the slicer associated with the content.|
|Account|The name of the account associated with the asset.|
|Profile Rate Card|The encoding profiles used by the Cloud Slicers to encode your content.|

#### Generate the Asset Summary report  {/*asset-summary-report*/}

1. Navigate to the Asset Summary page. From the main menu, click **Analytics** and then select **Asset Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. Optional. Generate a report for a different time period. From the **Time Range** option, select either:<ul><li>Predefined date range (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Custom date range. From the **Date range** option, set a start and end date/time.</li></ul>

    <Tip>By default, all dates/times are specified in UTC.</Tip>

4. Optional: Generate a report for a different or multiple accounts:<br /><ul><li>Click on the **Account** drop-down.</li><li>Optional. Search for an account by typing its name.</li></ul><li>Add accounts to the report by marking the desired accounts.</<li>Remove accounts from the report by clearing the desired accounts.
5. Optional. Filter report data by asset(s).<br />a. Click on the **Assets** drop-down to filter by CMS assets.<br />b. Mark the assets that will be included in the report. <br />c. Clear the assets that will be excluded from the report.

## Billing Summary  {/*billing-summary*/}

<Info>The Billing Summary is only available for date ranges spanning a month or longer.</Info>

Gain deeper insights into the following billing categories:

#### PLAYBACK  {/*playback*/}

View statistics on:

|Report Data|Details|
|---|---|
|Account Name| The account for which billing statistics are provided.|
|Channel Hours| The number of hours that the account's live channels were streamed.|
|VOD Hours| The number of hours that the account's on-demand content was streamed.|
|Event Hours| The number of hours that the account's live events were streamed.|
|Total Hours Watched| The total number of hours that the account's content was streamed.|

#### ENCODING  {/*encoding*/}

View statistics on:

|Report Data|Details|
|---|---|
|Account Name| The account for which billing statistics are provided.|
|Channel Encoding Hours| The number of hours for which content was encoded due to a live channel.|
|VOD Encoding Hours| The number of hours for which content was encoded for on-demand playback. This metric excludes content encoded for a live channel or a live event.|
|Live Event Encoding Hours| The number of hours for which content was encoded due to a live event.|
|CloudSlicer Live Encoding Hours| The number of hours for which content was encoded due to a live event originated from Cloud Slicers.|
|CloudSlicer VOD Encoding Hours| The number of hours for which content was encoded for on-demand playback originated from Cloud Slicers.|
|Total Encoding Hours| The total number of hours for which content was encoded.|

#### STORAGE  {/*storage*/}

View statistics on:

|Report Data|Details|
|---|---|
|Account Name| The account for which billing statistics are provided.|
|Channel Storage Hours| The number of hours of on-demand content stored in a library that was generated from a live channel.|
|VOD Storage Hours| The number of hours of on-demand content stored in a library that was not generated for a live channel or a live event.|
|Live Event Storage Hours| The number of hours of on-demand content stored in a library that was generated from a live event.|
|Storage Hours| The total number of hours of on-demand content stored during the report's time period.|

#### CLOUD SLICING  {/*cloud-slicing*/}

View statistics on:

|Report Data|Details|
|---|---|
|Account Name| The account for which billing statistics are provided.|
|Channel Cloud Slicing Hours| The number of hours of content sliced by a Cloud Slicer due to a live channel.|
|VOD Cloud Slicing Hours| The number of hours of content sliced by a Cloud Slicer for on-demand playback. This metric excludes content sliced for a live channel or a live event.|
|Live Event Cloud Slicing Hours| The number of hours of content sliced by a Cloud Slicer due to a live event.|
|Cloud Slicing Hours| The total number of hours of content sliced by a Cloud Slicer.|
|Spot Slicing Hours| The number of hours of content sliced by a VOD Cloud Slicer. This includes ingest (via S3 bucket ingest and VoD uploader) and post ingest asset processing (clipping, VoD Concat, ad-break modifications, supplemental audio tracks and captioning, etc.).|

#### To generate the Billing Summary report  {/*generate-billing-summary-report*/}

1. Navigate to the Billing Summary Report page. From the main menu, click **Analytics** and then select **Billing Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. From the **Time Range** option, define a time period that spans at least a month by selecting either:
    - One of the predefined date ranges: `Previous month`, `This month`, `Month to date`, `Last n months`, `Next n months`.
    - Custom date range. From the **Date range** option, set a start and end date/time.

<Tip>By default, all dates/times are specified in UTC.</Tip>

## Channel Summary  {/*channel-summary*/}

The Channel Summary report provides the following analytics for one or more live channel(s):

#### AUDIENCE  {/*audience*/}

Track the total number of peak concurrent viewers. This metric identifies the maximum number of viewers that were simultaneously watching a live channel. If the current report contains multiple live channels, then this metric provides the sum of the peak concurrent viewers for each live channel over the time period identified on the x-axis.

#### CHANNEL VIEWS  {/*channel-views*/}

Track the total number of viewers that were watching a live channel. If the current report contains multiple live channels, then this metric provides the total number of viewers for all live channels over the time period identified on the x-axis.

#### CHANNEL PLAYBACK STATISTICS  {/*channel-playback-stats*/}

Analyze live channel-specific statistics.

|Analytic|Details|
|---|---|
|Channel Description| Indicates the live channel's name.|
|Channel Hours| Indicates the number of hours that content was played during the live channel.|
|Channel Views| Indicates the total number of live channel viewers.|

#### ASSET PLAYBACK STATISTICS  {/*asset-playback-stats*/}

Analyze statistics for assets played through your live channel.

|Analytic|Details|
|---|---|
|Channel Description| Indicates the live channel's name.|
|Asset Description| Indicates the asset's name.|
|Total Hours Watched| Indicates the number of hours that the asset defined within the Asset Description field was played through this live channel.|
|Asset Views (Channel)| Indicates the total number of instances that playback of the asset defined within the Asset Description field was initiated through this live channel. <br /><Tip>This statistic is incremented whenever asset playback is initiated. For the purpose of this statistic, resuming playback of an asset after an ad break counts as a separate view. As a result, multiple views can be generated for the same asset during a single playback session. For example, if a user plays an entire asset that contains 3 ad breaks, then that playback session will generate 4 views.</Tip>|

#### PLAYBACK HOURS BY COUNTRY  {/*playback-hours-by-country-asset*/}

Breaks down your audience by country.

#### PLAYBACK HOURS BY PLATFORM  {/*playback-hours-by-platform*/}

Breaks down your audience by operating system.

#### ENCODING BREAKDOWN  {/*encoding-breakdown*/}

Breaks down your encoding analytics.

|Analytic|Details|
|---|---|
|Channel|The name given the channel.|
|Slicer Name|The name of the slicer associated with the content.|
|Account|The name of the account associated with the asset.|
|Profile Rate Card|The encoding profiles used by the Cloud Slicers to encode your content|

#### To generate the Channel Summary report  {/*generate-channel-summary-report*/}

1. Navigate to the Channel Summary page. From the main menu, click **Analytics** and then select **Channel Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. Optional. Generate a report for a different time period. From the *Time Range* option, select either:<br />- Predefined date range (e.g., `Previous day`, `This day`, and `Last n` days).<br />- Custom date range. From the **Date range** option, set a start and end date/time.<br /><Tip>By default, all dates/times are specified in UTC.</Tip>
4. Optional: Generate a report for a different or multiple accounts:<br />a. Click on the **Account** drop-down.<br />b. Optional. Search for an account by typing its name.<br />c. Add accounts to the report by marking the desired accounts.<br />d. Remove accounts from the report by clearing the desired accounts.
5. Optional. Filter report data by asset(s).<br />a. Click on the **Channel** drop-down to filter by live channels.<br />b. Mark the live channels that will be included in the report. <br />c. Clear the live channels that will be excluded from the report.

## CSL Summary  {/*csl-summary*/}

The Cloud Slicer Live Summary report provides insights into the usage of the Cloud Slicer for live content.

#### RUNTIME  {/*runtime*/}

Indicates the total number of hours that Cloud Slicers were running.

<Info>This metric does not measure the Cloud Slicer's encoding hours.</Info>

#### CLOUD SLICING HOURS  {/*cloud-slicing-hours*/}

Indicates the number of hours that Cloud Slicers spent slicing your content.

#### PROFILE RATE CARD  {/*profile-rate-card*/}

Indicates the encoding profiles used by the Cloud Slicers to encode your content.

#### IS MANAGED  {/*is-managed*/}

Visualize Cloud Slicer usage by whether the Cloud Slicers were managed by Uplynk.

#### DETAILED BREAKDOWN  {/*detailed-breakdown*/}

This report shows the following statistics by Cloud Slicer

|Report Data|Details|
|---|---|
|Account| Identifies the account associated with the Cloud Slicer.|
|Slicer Name| Indicates the name of the Cloud Slicer.|
|Profile Rate Card| Indicates the encoding profile assigned to that Cloud Slicer.|
|Is Managed| Indicates whether the Cloud Slicer is managed by Uplynk.|
|Runtime Hours| Indicates the total number of hours that the Cloud Slicer ran.|

#### To generate the CSL Summary report  {/*csl-summary-report*/}

1. Navigate to the **CSL Summary** page. From the main menu, click **Analytics** and then select **CSL Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. From the **Time Range** option, define a time period that spans at least a month by selecting either:<ul><li>One of the predefined date ranges: `Previous month`, `This month`, `Month to date`, `Last n months`, `Next n months`</li><li>Custom date range. From the **Date range** option, set a start and end date/time.</li></ul><br /><Tip>By default, all dates/times are specified in UTC.</Tip>
4. Optional: Generate a report for a different or multiple accounts:<br />a. Click on the **Account** drop-down.<br />b. Optional. Search for an account by typing its name.<br />c. Add accounts to the report by marking the desired accounts.<br />d. Remove accounts from the report by clearing the desired accounts.

## Event Summary  {/*event-summary*/}

The Event Summary report provides the following analytics for one or more live event(s):

#### AUDIENCE  {/*audience*/}

Track the number of peak concurrent viewers. This metric identifies the maximum number of viewers that were simultaneously watching a live event. If the current report contains multiple live events, then this metric provides the average of the peak concurrent viewers for all live events over the time period identified on the x-axis.

#### EVENT VIEWS  {/*event-views*/}

Track the total number of live event viewers. This metric identifies the number of viewers that were watching a live event. If the current report contains multiple live events, then this metric provides the total number of viewers for all live events over the time period identified on the x-axis.

#### PLAYBACK STATISTICS  {/*playback-stats*/}

Analyze live event-specific statistics.

|Analytic|Details|
|---|---|
|Event Description| Indicates the live event's name.|
|Event Hours| Indicates the number of hours that live content was played during the live event.|
|VOD Hours| Indicates the number of hours that assets were played during the live event.|
|Total Hours Watched| Indicates the total number of hours that the live event was played.|
|Event Views| Indicates the total number of live event viewers.|

#### PLAYBACK HOURS BY COUNTRY  {/*playback-hours-by-country*/}

Breaks down your audience by country.

#### PLAYBACK HOURS BY PLATFORM  {/*playback-hours-by-platform*/}

Breaks down your audience by operating system.

#### ENCODING BREAKDOWN  {/*encoding-breakdown*/}

Breaks down your encoding analytics.

|Analytic|Details|
|---|---|
|Slicer Name|The name of the slicer associated with the content.|
|Account|The name of the account associated with the asset.|
|Profile Rate Card|The encoding profiles used by the Cloud Slicers to encode your content.|
|Is CloudSliced|If TRUE, this event uses cloud slicing for encoding.|

#### To generate the Event Summary report  {/*event-summary-report*/}

1. Navigate to the Event Summary page. From the main menu, click **Analytics** and then select **Event Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. Optional. Generate a report for a different time period. From the **Time Range** option, select either:<ul><li>Predefined date range (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Custom date range. From the **Date range** option, set a start and end date/time.</li></ul><br /><Tip>By default, all dates/times are specified in UTC.</Tip>
4. Optional: Generate a report for a different or multiple accounts:<br />a. Click on the **Account** drop-down.<br />b. Optional. Search for an account by typing its name.<br />c. Add accounts to the report by marking the desired accounts.<br />d. Remove accounts from the report by clearing the desired accounts.
5. Optional. Filter report data by live event(s).<br />a. Click on the **Event** drop-down to filter by live events.<br />b. Mark the live event that will be included in the report. <br />c. Clear the live event that will be excluded from the report.

## Multi-CDN Summary  {/*multi-cdn-summary*/}

The Multi-CDN Summary report provides statistics for the distribution of your content via CDNs:

#### PLAYBACK  {/*playback*/}

Indicates the total numbers of hours that your content was watched (aka playback hours) broken down by customer account and CDN.

#### CDN DISTRIBUTION  {/*cdn-distribution*/}

This pie chart contains a slice for each CDN through which your content was distributed.

#### PLAYBACK BY CONTENT TYPE  {/*playback-by-content-type*/}

Indicates the total numbers of hours that your content was watched (aka playback hours) broken down by each unique combination of customer account, CDN, and one of the following content types:

- **Channel**: Live channels
- **Event**: Live events
- **VOD**: On-demand content

#### CONTENT TYPE DISTRIBUTION  {/*content-type-distribution*/}

This bar chart, which shows the number of hours that your content was watched (aka playback hours), contains a color-coded bar for each unique combination of CDN and one of the following content types:

- **Channel**: Live channels
- **Event**: Live events
- **VOD**: On-demand content

#### COUNTRY BREAKDOWN  {/*country-breakdown*/}

Indicates the total numbers of hours that your content was watched (aka playback hours) broken down by each unique combination of CDN, country, and one of the following content types:

- **Channel**: Live channels
- **Event**: Live events
- **VOD**: On-demand content

<Info>This report is useful to analyze CDN usage when leveraging our Multi-CDN solution.</Info>

#### To generate the Multi-CDN Summary report  {/*multi-cdn-report*/}

1. Navigate to the Multi-CDN Summary page. From the main menu, click **Analytics** and then select **Multi-CDN Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. Optional. Generate a report for a different time period. From the **Time Range** option, select either:<ul><li>Predefined date range (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Custom date range. From the **Date range** option, set a start and end date/time.</li></ul><br /><Tip>By default, all dates/times are specified in UTC.</Tip>
4. Optional: Generate a report for a different or multiple accounts:<br />a. Click on the **Account** drop-down.<br />b. Optional. Search for an account by typing its name.<br />c. Add accounts to the report by marking the desired accounts.<br />d. Remove accounts from the report by clearing the desired accounts.
5. Optional. Filter report data by live event(s).<br />a. Click on the **Event** drop-down to filter by live events.<br />b. Mark the live event that will be included in the report. <br />c. Clear the live event that will be excluded from the report.
6. Optional. Change the granularity of this report by selecting the desired interval from the **Granularity** option.

## Syndication Summary  {/*syndication-summary*/}

The Syndication Summary report provides statistics for content published to social media and content distribution platforms:

#### OVERVIEW  {/*overview*/}

View statistics on:

|Analytic|Details|
|---|---|
|SYNDICATION HOURS PUBLISHED| Indicates the total number of hours that were published to social media and content distribution platforms. This statistic includes content published from both live channels and live events.|
|CHANNEL HOURS PUBLISHED| Indicates the total number of hours that were published to social media and content distribution platforms as a result of your live channel(s).|
|EVENT HOURS PUBLISHED| Indicates the total number of hours that were published to social media and content distribution platforms as a result of your live event(s).|
|SYNDICATION GB DELIVERED| Indicates the total amount of data, in GB, that was published to social media and content distribution platforms.|
|SYNDICATION HLS PULL HOURS| Indicates the total number of hours of content that social media and content distribution platforms pulled from AWS S3 via HLS.|

#### SYNDICATION HOURS BY CONTENT TYPE  {/*syndication-hours-by-content-type*/}

This bar chart, which tracks the number of hours that were published to social media and content distribution platforms, contains a color-coded bar for each of the following content types

- **Channel**: Live channels
- **Event**: Live events

#### SYNDICATION HOURS  {/*syndication-hours*/}

This chart tracks the total number of hours published to social media and content distribution platforms over time.

#### PLATFORMS PUBLISHED  {/*platforms-published*/}

This pie chart contains shows how your content was published. Each slice represents either of the following items:

- Social media or content distribution platform. This occurs when a publishing target's Platform option is set to a specific social media or content distribution platform.
- Protocol. This occurs when a publishing target's Platform option is set to Other. Valid values are: HLS, Zixi, Other.

#### DETAILED VIEW  {/*detailed-view*/}

Indicates the total number of hours published and data delivered for each unique combination of platform/protocol and live channel/live event.

|Data|Details|
|---|---|
|Account Name| Identifies the account for which syndication publishing statistics are provided.|
|Syndication Target| Indicates where or how your content was published. This field identifies either:<br />- Social media or content distribution platform. This occurs when a publishing target's Platform option is set to a specific social media or content distribution platform.<br />- Protocol. This occurs when a publishing target's Platform option is set to Other. Valid values are: `HLS \| Zixi \| Other` |
|Content Type| Indicates the source from which your content was published. Valid values are: <br />- Channel: Live channels<br />- Event: Live events|
|Channel Description| Indicates the name of the live channel from which your content was published. This cell is blank when this row reports content published from a live event.|
|Event Description| Indicates the name of the live event from which your content was published. This cell is blank when this row reports content published from a live channel.|
|Syndication Hours Published| Indicates the number of hours that were published for this unique combination of platform/procotol and live channel/live event.|
|Syndication GB Delivered| Indicates the amount of data, in GB, that were published for this unique combination of platform/procotol and live channel/live event.|

#### To Generate the Syndication Summary Report  {/*syndication-summary-report*/}

1. Navigate to the Syndication Summary page. From the main menu, click **Analytics** and then select **Syndication Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. Optional: Generate a report for a different time period. From the **Time Range** option, select either:<ul><li>Predefined date range (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Custom date range: From the **Date range** option, set a start and end date/time.</li></ul><br /><Tip>By default, all dates/times are specified in UTC.</Tip>
4. Optional: Generate a report for a different or multiple accounts:<br />a. Click on the **Account** drop-down.<br />b. Optional. Search for an account by typing its name.<br />c. Add accounts to the report by marking the desired accounts.<br />d. Remove accounts from the report by clearing the desired accounts.
5. Optional: Change the granularity of this report by selecting the desired interval from the **Granularity** option.

## Usage Summary  {/*usage-summary*/}

The **Usage Summary** report provides the following analytics:

#### OVERVIEW   {/*usage-summary-overview*/}

View statistics on:

|Analytic|Details|
|---|---|
|Total Hours Watched| Indicates the total number of hours that your content was watched (aka playback hours).|
|Channel Views| Indicates the total number of times that your live channels were viewed.|
|Event Views| Indicates the total number of times that your live events were viewed.|
|VOD Views| Indicates the total number of times that your on-demand content was requested.|

#### BREAKDOWN  {/*breakdown*/}

Indicates the number of hours that your ads, live channels, live events, and VOD assets were watched.

#### HOURS WATCHED BY PLAYBACK CONTEXT (STACKED BAR)  {/*hours-watched*/}

This bar chart, which shows the number of hours that your content was watched (aka playback hours), contains a color-coded bar for the following content types:

- **Channel**: Live channels
- **Event**: Live events
- **VOD**: On-demand content

Additionally, the top of each bar indicates the total number of playback hours for the time period indicated in the x-axis.

#### VIEWS BY PLAYBACK CONTEXT  {/*views-by-playback-type*/}

This line chart contains color-coded lines that track the number of times that your live channels (`Channel Views`), live events (`Event Views`), and on-demand content (`VOD Views`) were viewed.

#### COUNTRY BREAKDOWN  {/*country-breakdown*/}

This report shows the following statistics for each country:

|Analytic|Details|
|---|---|
|Country| Identifies the country for which statistics are reported.|
|Total Hours Watched| Indicates the total number of hours that your content was watched.|
|Channel Views| Indicates the total number of times that your live channels were viewed.|
|Event Views| Indicates the total number of times that your live events were viewed.|
|VOD Views| Indicates the total number of times that your on-demand content was viewed.|

#### PLAYBACK HOURS BY PLATFORM  {/*playback-by-platform*/}

Breaks down your audience by operating system.

#### To Generate the Usage Summary Report  {/*usage-summary-report*/}

1. Navigate to the Usage Summary page. From the main menu, click **Analytics** and then select **Usage Summary** from the left-hand pane.
2. Click on the **Controls** bar to define this report.
3. Optional: Generate a report for a different time period. From the **Time Range** option, select either:<ul><li>Predefined date range (e.g., `Previous day`, `This day`, and `Last n` days).</li><li>Custom date range: From the **Date range** option, set a start and end date/time.</li></ul><br /><Tip>By default, all dates/times are specified in UTC.</Tip>
4. Optional: Generate a report for a different or multiple accounts:<br />a. Click on the **Account** drop-down.<br />b. Optional. Search for an account by typing its name.<br />c. Add accounts to the report by marking the desired accounts.<br />d. Remove accounts from the report by clearing the desired accounts.
5. Optional: Change the granularity of this report by selecting the desired interval from the **Granularity** option.

## AWS (Not Authorized) Report Error  {/*aws-report-error*/}

Navigating to a report may return the following error message:

`We can't display this page (Not Authorized).`

This error occurs because your browser's security policy does not allow `cms.uplynk.com` to use third-party cookies.

Fix this issue by performing either of the following steps:

- Chrome: Add cms.uplynk.com as a site that can always use cookies.

    See Google's documentation ([Allow or block cookies for a specific site](https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies-for-a-specific-site)) to learn more.

- Firefox: Turn off Enhanced Tracking Protection for cms.uplynk.com.

    See Firefox's documentation ([Enable third-party cookies for specific sites](https://support.mozilla.org/en-US/kb/third-party-cookies-firefox-tracking-protection#w_enable-third-party-cookies-for-specific-sites)) to learn more.

- Safari: Disable the Prevent cross-site tracking option.

    See Apple's [documentation](https://support.apple.com/guide/safari/prevent-cross-site-tracking-sfri40732/16.1/mac/13.0) to learn more.

<Callout type="info">An alternative to modifying your browser's security policy is to refresh the page whenever you encounter this error.</Callout>

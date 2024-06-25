---
title: CMCD Report
---
CMCD (Common Media Client Data) is a specification from the WAVE standards project that allows CDN providers to receive player statistics and the requesting object metadata in each HTTP request. See [CTA-5004](https://cta.tech/Resources/Standards/WAVE-Project).

In addition to video playback analytics, CMCD data allows Edgio to collect player CMCD metrics with CDN metrics. This data can be used for more real-time action and to troubleshoot and diagnose issues.

<Info> If you don’t see the CMCD report listed, contact your account representative. </Info>

## Architecture  {/*architecture*/}

This high-level diagram shows the architecture of a multi-CDN with CMCD:

![CMCD and CDN](/images/delivery/storage/cdn-cmcd.png)

## CMCD Keys  {/*cmcd_keys*/}

These keys can be transmitted from players to Edgio:

|Description|Key|Definition|Purpose|
|---|---|---|---|
| Encoded Bitrate | br | Encoded bitrate of the audio or video object being requested. | Shows actual bitrate delivered and can be used by CDN to infer the object size. |
| Buffer Length | bl | Player Buffer length at the time of request. | Can be used by CDN to infer the health of the playback. |
| Buffer Starvation | bs | Buffer starvation event. Indicates rebuffer/stalling in playback. | Rebuffer percent is calculated as total number of sessions vs sessions with at least one rebuffer event over given period of time. |
| Content ID | cid | Unique string identifying the current content. | Useful for tracking down problematic content but is rarely used by players. |
| Object Duration | d | Playback duration in milliseconds of the object being requested. | When aggregated it can be used as an estimate of hours watched.<br />Can be used to determine if the content is in an ad break and type of video being watched.<br />Can be used to determine the chunk size. |
| Deadline | dl | Deadline from the request time until the first sample of this Segment/Object needs to be available in order to not create a buffer underrun or any other playback problems. |  |
| Measure Throughput | mtp | Throughput between the client and server, as measured by the client. | Estimated throughput bandwidth between CDN to player. Useful for comparing CDN and external metrics. |
| Next Object Request | nor | Relative path of the next object to be requested. | Used for prefetching. |
| Next Range Request | nrr | If the next request will be a partial object request, then this string denotes the byte range to be requested. If the ‘nor’ field is not set, then the object is assumed to match the object currently being requested. | Used for prefetching. |
| Object Type | ot | Media type of the current object being requested:<br />m = text file, such as a manifest or playlist<br />a = audio only<br />v = video only<br />av = muxed audio and video<br />i = init segment<br />c = caption or subtitle<br />tt = ISOBMFF timed text track<br />k = cryptographic key, license or certificate.<br />= other<br />If the object type being requested is unknown, then this key MUST NOT be used. | Used for troubleshooting. Can be used to determine encoding and DRM issues. DRM providers have limited visibility on what versions/browsers are currently used/supported and so “k” is extra helpful.<br />"c” can be used to alert potential compliance issues. |
| Playback Rate | pr | 1 if real-time, 2 if double speed, 0 if not playing. SHOULD only be sent if not equal to 1. | Can be used to infer if player if player is adjusting playback rate to make up for other issues (such as the origin or CDN is failing to delivery segments quick enough). |
| Requested Maximum Throughput | rtp | Requested maximum throughput that the client considers sufficient for delivery of the asset.<br /><br />***Throughput refers to the amount of data that is transmitted. | Will tell you player and CDN performance. This can be used for more efficient data management and in effect, save resources.<br />This can benefit clients by preventing buffer saturation through over-delivery and can also deliver a community benefit through fair-share delivery. The concept is that each client receives the throughput necessary for great performance, but no more. |
| Streaming Format | sf | d = MPEG DASH<br />h = HTTP Live Streaming (HLS)<br />s = Smooth Streaming<br />o = other | Helps determine stream related issues for players that support DASH/HLS. Can compare performance based on streaming format for players that have multi-format support. |
| Session ID | sid | GUID identifying the current playback session. A playback session typically ties together segments belonging to a single media asset. Maximum length is 64 characters. It is RECOMMENDED to conform to the UUID specification. | This key is always recommended to be included in CMCD logging. It is arguably the most useful key as it is used for aligning logs together.<br />Can be helpful troubleshooting for caching issues. Same content ID with two session IDs strongly indicates a caching issue. |
| Stream Type | st | v = all segments are available – e.g., VOD<br />l = segments become available over time – e.g., LIVE | Invaluable key for troubleshooting. |
| Startup | su | Signals startup of content. | Removes the need for beaconing.<br />CDNs knowing the startup of content can be helpful for optimizing subsequent playback.<br />This flag is also sent after buffer flag (bs). |
| Top Bitrate | tb | Highest bitrate rendition in the manifest or playlist that the client is allowed to play. | Used to determine bitrate or bitrate laddering issues.<br />Shows the top bitrate that the player could play at that time. Can be used for comparing to available bitrates. |
| CMCD Version | v | Version of CMCD specification used. | This key allows for version control and indicates that there will be future CMCD versions released. |
| Custom Key |  | Custom keys requires “cmcd-“ prefix.<br />Fictional example: cmcd-edgio. | Allows for unique CMCD keys to be sent which extends CMCD to be fully customizable. |

## Data Transmission  {/*transmission*/}

Edgio supports all CMCD keys. Keys can be transmitted in three delivery modes from players to CDNs:

1. Custom HTTP header in each request. The keys can be used with four header names based on their expected level of variability:.
    - CMCD-Request: Values vary with each request.
    - CMCD-Object: Values vary with the object being requested.
    - CMCD-Status: Values do not vary with every request or object.
    - CMCD-Session: Values are expected not to vary over the life of the session.
2. HTTP query arguments.
3. JSON object independent of each HTTP request.

This diagram shows buffer starvation and startup in CMCD format for these transmission modes:

![CMCD Delivery](/images/delivery/storage/cmcd-delivery.png)

## Enable CMCD Logging  {/*enabling-cmcd-logging*/}

Due to the nature of the CMCD specification, it is essential to enable CMCD logging on both the client and server sides.

### Client Side  {/*client-side*/}

Given the diverse range of players, each with their own CMCD implementation, please consult the player documentation of your choice for instructions on enabling CMCD reporting.

### Server Side  {/*server-side*/}

For the EdgePrism server, you must configure it to log additional client Request Headers. You can configure through the Control SSUI or request the Edgio team implement the change.

To enable CMCD request header logging in the SSUI, navigate to the *OTHERS* > *Other* Options section in the configuration and add (any of) these Header names in the *LOG REQ HEADER* field: `CMCD-Request`, `CMCD-Object`, `CMCD-Status`, `CMCD-Session` or enable CMCD headers by ticking the *CMCD HEADER ADD* option.

## Report Specifications  {/*report-specifications*/}

![CMCD Report](/images/delivery/control/cmcd-report.png)

The report has these tabs:

[Overview](#overview-tab)

[Details](#details-tab)

[Geography](#geography-tab)

|Specification|Description|
|---|---|
|Latency| Latency depends on the selected granularity. <br /> - 5 minutes: 5 to ten minutes<br />- Hour: 1 hour + delta (approximately 5-10 minutes)<br />- Day: 1 day + delta (approximately 5-10 minutes)|
|Granularity| 5 minutes, hour, day|
|Dimensions|Account, Continent, Country, Stream Type, Stream Format|
|Metrics - Summary Area |Vide0 Egress<br />Video Play time<br />Session Rebuffer %<br />Average Client Throughput<br />Average Video Bitrate<br />Slow TTFB|
|Metrics - Elsewhere|Unique session count<br />Session rebuffer %<br />Average Client Throughput<br />Average Video Bitrate<br />Slow TTFB|
|Delivery Mechanism |EdgeQuery|
|Associated API Endpoint(s)|`POST /realtime-reporting-api/cmcd` returns Realtime Reporting API CMCD data according to parameters passed in request body |

## Select Accounts, Date Range, and Time Zones  {/*selecting-accounts*/}

You can make selections in the controls above the tab header:

- *TRAFFIC FOR*. Select one or more accounts to which you have access for cross-account analysis. Click the **Select All** button to select all accounts.

    <Callout type="info">You must select at least one account; otherwise, the default company is automatically selected, and a warning is displayed.</Callout>

- *Date range*. Pick from pre-set time frames or choose custom date ranges in the . Click the **Apply** button on custom ranges.

- *Time zone*. The top five most commonly used timezones in are at the top of the . Scroll down for additional time zones.

## Filter Report Data  {/*filtering-report-data*/}

You can filter report data using filter controls on the *Overview*, *Details*, and *Geography* tabs. You can filter on Continents, Countries, Stream Types, and Stream Formats.

Make the desired selections, then click the **Apply** button to apply your filter choices.

To reset filters to the default, click the **Reset** button.

<Callout type="info"> -    Filter controls default to All.<br />- Some filter selections are mutually exclusive. For example, if you select North America as the continent, you cannot select individual countries.<br />- The Geography tab only contains filter controls for Protocols and Segments.<br />- Filter selections you make on one tab are automatically applied to other tabs.<br />- When you make filter selections on a tab then navigate to another tab, then navigate back to the original tab, the selections are preserved in the original tab.</Callout>

### Overview Tab  {/*overview-tab*/}

The *Overview* tab serves as a high-level snapshot of your aggregated data.

#### Summary Area  {/*summary-area*/}

For various statistics, the *Summary Area* shows the percent change for the selected reporting date range relative to the prior time period of the same length. For example, if you select **This Month**, the statistics show a comparison between this month's data and the previous month's.

Colors and arrows represent changes:

- An increase displays in green with an arrow pointing up.
- A decrease displays in red with an arrow pointing down.
- If there was no change from the previous period, the text is gray with an empty circle instead of an arrow.
- Percentage up or down is in bold text to the right of the arrow or empty circle.
- Information in gray text beneath the percentage up or down indicates the total date range covered minus any time remaining in the current period. For example, if you select Last 7 days as the reporting period and the current date is part of the past seven days, the past 13 days' information is displayed.

<Callout type="info">Information in the *Summary Area* depends on the selected accounts, time range, time zone, and dimensions.</Callout>

Statistics in the *Summary Area* are:

| Statistic | Unit | Description |
| --- | --- | --- |
| Video Egress | From bps to Gbps | Total Egress for video content only from CDN logs . Video content egress typically ranges between 92%-99% of all CMCD traffic. |
| Video Play Time | From milliseconds to hours | Total video play time from CMCD data |
| Session Rebuffer % | Percent | Percent of sessions with at least one rebuffer to total number of sessions in the given time interval |
| Average Client Throughput | From kbps to Mbps | Average video throughput as reported by CMCD |
| Average Video Bitrate | From kbps to Mbps | Average video bitrate as reported by CMCD |
| Slow TTFB % | Percent | Share of request with Time to First Byte greater/larger than 15 milliseconds, which indicates non-local cache fill on the edge |

#### Chart  {/*chart*/}

Data is presented in a chart that shows the total throughput of in bytes plus out bytes across the selected date range by default. The label on the left beneath the summary panel reflects the defaults.

Hover the mouse pointer over the chart to view details in tooltips.

##### Selecting Chart Granularity  {/*selecting-chart-granularity*/}

You can refine the chart by selecting a granularity value in the toggle above the chart. Toggles are active depending on the reporting date range.

Make a selection in the toggle. The time units on the chart's X-axis are updated to reflect your selection.

Each value has its own retention policy.

|Granularity| Data Retention Policy|
|---|---|
|5 min| One week|
|Hour| Five weeks|
|Day| One year|

##### Toggling Chart Data  {/*toggling-chart-data*/}

A legend below the chart identifies the chart content by color. The legend reflects the choices that you made in the *Grouping* dropdown menu.

For example, if you Chose **Continent** in the dropdown menu, data for continents displays in the chart. Labels for the contents are displayed in the chart legend.

The legend labels are toggles that you can use to display or hide the corresponding chart data. By default, all labels are toggled on. Click a label to hide or show the corresponding data in the chart. Labels that are toggled off have a gray font color.

### Details Tab  {/*details-tab*/}

The *Details* tab allows you to see a unique session per country as well as rebuffer and TTFB percent for a selected time range.

#### Viewing Details in the Table  {/*viewing-details*/}

The *Details* tab contains unique session count, rebuffer, and slow TTFB by country.

Sort the data in the table by clicking a column header. When you sort on a field, the sort occurs on all pages of data rather than just the current page.

### Geography Tab  {/*geography-tab*/}

The *Geography* tab shows traffic for your data categories on an interactive map. The map can be used to understand how your audience traffic varies across the world or your chosen continents or countries.

Hover your mouse pointer over a geographical region to view popups with details about

- Total Sessions
- Rebuffer Ratio
- Client Throughput
- Average Video Bitrate
- Average Slow TTFB

#### Filtering Data  {/*filtering-data*/}

Select the filter control from the on the left above the map:

- Stream Type
- Stream Format

From the top right corner of the chart, you can change the gradient shade of the map by these metrics:

- Client Throughput (default)
- Average Video Bitrate
- Total Sessions
- Average Slow TTFB
- Rebuffer Ratio

#### Zooming in and out  {/*zooming-in-and-out*/}

To zoom in on the chart do either of the following:

- Click the **[+]** control on the upper left of the map .
- Click a region (continent, country, or state).

To zoom out, do either of the following:

- Click the **[-]** control on the upper left of the map .
- Click the **Continent** and **Whole World** controls on the right above the chart.

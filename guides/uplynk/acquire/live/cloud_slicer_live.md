---
title: Cloud Slicer Live
---


Cloud Slicer Live (CSL) allows you to run a slicer in our cloud. This allows you to ingest and encode content without on-premise hardware. You may customize this slicer in the following ways:

- Choose an ingest point that defines where it will be hosted and the streaming protocol for the audio / video feed that will be ingested.
- Select the version of the slicer software that it will run.
- Define a slicer configuration that determines how the audio / video feed will be ingested and processed.

Create and delete slicers as required by your business needs.

## Quick Start  {/*quick-start*/}

Set up a streaming workflow by performing the following steps:

1. **Create an Ingest Point** in the region where your CSL slicer will be hosted.

    <Tip>The purpose of an ingest point is to persist your ingest URLs even when switching to a different CSL slicer. This means you will not have to update your encoder's publishing configuration when switching to a different CSL slicer.</Tip>

2. **Create a CSL Slicer** in the same region as the above ingest point.

3. **Add CSL Slicer** to the desired live channel, live event, or failover group.

4. **Push Video Feed** from your encoder to the ingest point created in step 1.

5. **Point Your Player** to your live channel or live event's playback URL.

## Ingest Point Administration  {/*ingest-point-administration*/}

An ingest point identifies a URL and ports to which an encoder should push an audio/video feed.

Upon creating a CSL slicer, you must associate it with an ingest point from which it will ingest an audio/video feed.

### Key Information  {/*key-information*/}

- An ingest point is restricted to a specific region and streaming protocol.
- An ingest point can be in either of the following states:
  - **IN_USE**: This state indicates that it has been associated with a CSL slicer.
  - **NOT_IN_USE**: This state indicates that it is available for assignment to a CSL slicer.
- Deleting a CSL slicer changes the state of the ingest point that was associated with it from **IN_USE** to **NOT_IN_USE**. This allows you to reuse the same ingest point with a different CSL slicer.

### Create an Ingest Point  {/*create-ingest-point*/}

1. Navigate to **[Ingest Points](https://cms.uplynk.com/static/cms2/index.html#/slicers/ingest-points)**: From the main navigation, go to **Slicers** > **Ingest Points**.
2. Click **+ Ingest Point**.
3. In the **Endpoint Name** option, assign a name to the ingest point.
4. In the **Type** option, select the streaming protocol for the feed that will be ingested.
5. In the **Region** option, select the region where the CSL slicer that will ingest this feed will be hosted.
6. Optional: In the **Endpoint Description** option, type a description for this ingest point.
7. Click **Create**.

### Modify an Ingest Point  {/*modify-ingest-point*/}

<Info>You may not reassign an ingest point to a different region. Create a new ingest point if you require one for a different region.</Info>

1. Navigate to **[Ingest Points](https://cms.uplynk.com/static/cms2/index.html#/slicers/ingest-points)**: From the main navigation, go to **Slicers** > **Ingest Points**.
2. Click on the desired ingest point.
3. In the **Name** option, modify the name assigned to this ingest point.
4. Optional: In the **Description** option, modify the description assigned to this ingest point.
5. Click **Save**.

### Delete an Ingest Point  {/*delete-ingest-point*/}

1. Navigate to **[Ingest Points](https://cms.uplynk.com/static/cms2/index.html#/slicers/ingest-points)**: From the main navigation, go to **Slicers** > **Ingest Points**.
2. Check the ingest point's status:
   - **IN_USE**: You cannot delete an ingest point that is in this state. You must first delete the CSL slicer associated with it.
   - **NOT_IN_USE**: Proceed to the next step.
3. Click on the desired ingest point.
4. Click **Delete Ingest Point**.
5. Click **Yes** > **Delete** to confirm the deletion.

## Cloud Slicer Live Administration  {/*cloud-slicer-live-administration*/}

Before creating a CSL slicer, you must first perform the following steps:

1. **Identify the Region** (e.g., Oregon or Ohio) where your CSL slicer will be created.

2. **Identify the Streaming Protocol** through which your feed will be published to a CSL slicer. A CSL slicer supports the following protocols: `RTP | RTMP | SRT | RIST`

<Info>The SRT streaming protocol requires slicer version 22060200 or higher.</Info>

3. **[Create an Ingest Point](#create-ingest-point)** point within the region identified in step 1.

### Key Information  {/*key-info*/}

- You may assign a custom slicer configuration to your CSL slicer. You can define this custom configuration by:
  - Importing settings from a file
  - Manually adding settings
  - A combination of both

- You may import settings from a file. We support the following formats:
  - **Text File**: Import a file that uses the same format as a Live Slicer configuration file. Specify each [desired setting](#slicer-config-file) on a separate line.
  - **JSON**: Import a file containing [settings](#slicer-config-file) defined as key-value pairs using JSON notation.

    [Learn more](#slicer-configuration-file).

- Our service manages certain slicer configuration settings. You should not manually assign these [reserved settings](#reserved-slicer-config) to your CSL slicer.

### Create a CSL Slicer  {/*create-slicer*/}

1. Navigate to [**Hosted Slicers**](https://cms.uplynk.com/static/cms2/index.html#/slicers/): Go to **Slicers** > **Hosted Slicers** from the left navigation of the main page.
2. Click **+ Create Slicer**.
3. From the **Ingest Point** section, select an ingest point that corresponds to the region where this slicer will be hosted and the streaming protocol for the feed that it will ingest.
   - Click **Select Ingest Point**.
   - Select the ingest point that will be assigned to the CSL slicer.
   - Click **Save**.
    - RTP, SRT, and RIST
        - In the **Source IP Address** option, type the IP address from which your feed will be pushed. Our service will only ingest feeds served from this IP address. Allow your feed to be pushed from any IP address by setting this option to `0.0.0.0`.
        - Regardless of how this setting is configured, the encoder pushing the feed to our service must authenticate to our service by passing the CSL slicer's streaming key. <br />[Learn more](#encoder).

4. From the **Slicer Software Version** section, assign a slicer software version to the CSL slicer.
   - Click **Select Version**.
   - Select the desired slicer version.
   - Click **Save**.

        <Info>If this CSL slicer's ingest point uses the SRT streaming protocol, you must select slicer version 22060200 or higher.</Info>

5. Optional: From the **Encoding Profile** section, select the encoding profile that will be assigned to the CSL slicer.
   - Click **Change Profile**.
   - Select the encoding profile that this CSL slicer will use to encode content.
   - Click **Save**.

6. Optional: From the **Slicer Configuration** section, import, add, or remove slicer settings.
   - Define this slicer's ID through the `slicerID` setting.
   - Click **Customize**.
       - Optional: [Import slicer configuration settings](#import-slicer-configuration-settings).
       - Optional: [Add or remove settings as needed](#add-remove-settings).
   - Click **Save**.

7. Optional: From the **Slicer Notes** option, briefly describe the purpose of this CSL slicer.
8. Click **Create**.

### Modify a CSL Slicer  {/*modify-slicer*/}

1. Navigate to [**Hosted Slicers**](https://cms.uplynk.com/static/cms2/index.html#/slicers/): Go to **Slicers** > **Hosted Slicers** from the left navigation of the main page.
2. Click on the desired CSL slicer.
3. Update this CSL slicer as needed.
   - Optional: From the **Slicer Configuration** section, review your slicer configuration. Import, add, or remove slicer settings as needed.
     - Define this slicer's ID through the `slicerID` setting.
     - Click **Customize**.
       - Optional: [Import slicer configuration settings](#import-slicer-configuration-settings).
       - Optional: [Add or remove settings as needed](#add-remove-settings).
     - Click **Save**.
   - Optional: From the **Slicer Version** section, update the CSL slicer's slicer version.
   - From the **Additional Details** section, add, modify, or delete notes as needed.

4. Click **Save**.

5. Changes to your CSL slicer's slicer configuration require restarting your CSL slicer. Restart your CSL slicer.

<Info>If you modified the CSL slicer's slicer version, the CSL slicer will automatically restart. No further action is required to apply changes to your CSL slicer's slicer configuration.</Info>

### Customize a CSL Slicer     {/*customize-a-slicer*/}

You can import existing slicer configuration settings or adjust a slicer's settings.

#### Import Slicer Configuration Settings {/*import-slicer-configuration-settings*/}

1. Click **+ Import**.
2. Set the **Source** option to **File**. Select the desired file:
   - Click **Browse**
   - Navigate to the directory that contains the desired slicer configuration file
   - Select the file
   - Click **Open**
3. From the **Import Mode** option, choose one of the following:
   - **Append after configuration settings**: Choose this option to place all of your imported settings below your existing slicer configuration settings.
   - **Prepend before configuration settings**: Choose this option to place all of your imported settings above your existing slicer configuration settings.
   - **Replace all configuration settings**: Choose this option to remove all of your existing slicer configuration settings and replace them with your imported settings.

        <Info>Appending or prepending slicer configuration settings may result in duplicate settings. It is strongly recommended to avoid duplicate settings by immediately removing them from your slicer's configuration.</Info>

4. Click **Import File**.

#### Add or Remove Settings   {/*add-remove-settings*/}

- **Add a setting**

    1. Click **+ Custom**. Alternatively, add a commonly used setting by clicking **+ Standard** instead.

    2. In the **Key** option, type the name of the desired Live Slicer configuration setting.

    3. In the **Value** option, assign a value to that setting.

    4. Click **Add Custom Setting**.

- **Remove a Setting**

    1. Mark the settings you want to remove.

    2. Click **x Remove**.

### Delete a CSL Slicer  {/*delete*/}

1. Navigate to [**Hosted Slicers**](https://cms.uplynk.com/static/cms2/index.html#/slicers/): Go to **Slicers** > **Hosted Slicers** from the left navigation of the main page.
2. Click on the desired CSL slicer.
3. Click **Delete Hosted Slicer**.
4. When prompted, click **Delete** to confirm the deletion.

### Restart a CSL Slicer  {/*restart*/}

<Info>Restarting a CSL slicer typically takes around 60 seconds.</Info>

1. Navigate to the **Slicers** page.
2. Click on the desired CSL slicer.
3. Click **Restart Hosted Slicer**.
4. Click **Restart** to confirm this action.

### Slicer Status Information  {/*slicer-status*/}

Use a CSL slicer's status to find out whether it is ready to stream your content. Core CSL slicer statuses are described below:

- **pending**: Indicates that our service has not started provisioning your CSL slicer.
- **initializing**: Indicates that our service is in the process of creating your CSL slicer.
- **created**: Indicates that your CSL slicer has been created, but is not in use.
- **running**: Indicates that your CSL slicer is active. An active CSL slicer can be in any of the following states: capture, replace, ad, or blackout.
- **failed**: Indicates that our service could not create your CSL slicer.

### Reserved Slicer Configuration Settings  {/*reserved-slicer-config*/}

You may not use the following settings with a CSL slicer:

`api_port | apikey | capture_delay | multicast | no_signal_image | no_signal_pad | port | rtmp_url | rtp_backlog_dur | rtp_headers | rtp_readahead_dur | ssl_port | username`

## Slicer Configuration File  {/*slicer-config-file*/}

You may import a slicer configuration file when defining your CSL slicer's slicer configuration. You may format this slicer configuration file using either colon-separated values or JSON.

<Info>You may not define a [reserved slicer configuration](#reserved-slicer-configuration-settings) setting within a slicer configuration file. Attempting to import a file that contains a reserved setting will generate an error.</Info>

<Tip>Our service automatically detects the format when importing your slicer configuration file. It does not rely on the file extension when making this assessment.</Tip>

#### Colon-Separated Values (Live Slicer Configuration File)  {/*csv*/}

You may define slicer configuration settings using the same format as a Live Slicer configuration file. Specify each [desired setting](/uplynk/acquire/live/on_prem_slicer/#configuration-file-settings) on a separate line.

**Syntax**: "*\{Setting\}*": "*\{Value\}*"

**Example**:

```
remote:on
description:Sports
input:rtmp
autoexpire_age:3
slicerID:sports_slicer
```

#### JSON  {/*json*/}

You may define slicer configuration settings using JSON format. Define each slicer configuration setting as a key-value pair using JSON notation.

**Syntax**: "*\{Setting\}*": "*\{Value\}*"

**Example**:

```json
{
	"remote": "on",
	"description": "Sports",
	"input": "rtmp",
	"autoexpire_age": "3",
	"slicerID": "sports_slicer"
}
```

## Encoder  {/*encoder*/}

Your encoder must push an audio/video feed to an ingest point. If you have assigned that ingest point to a CSL slicer, then that CSL slicer will automatically encode your content.

Our service will only ingest your feed when the following conditions are met:

1. **Encoder Configuration**: Your encoder is configured to push an audio/video feed to the CSL slicer's streaming URL.

   **Sample publishing URL:**

   `rtmp://ingest-prod-1-us-east-1.mss.aws.oath.cloud/slicer12345`

2. **RTP, SRT, and RIST**: Your encoder's IP address matches the one defined in the ingest point's Source IP Address option.

   <Info>You may bypass this restriction and allow your feed to be pushed from any IP address when this option is set to `0.0.0.0`.</Info>

3. **SRT Only**: You must configure your encoder to pass the CSL slicer's streaming key along with your feed. This configuration varies by encoder. If your encoder does not provide a password option when defining an SRT publishing target, then you should include the `passphrase` query string parameter in the publishing URL.

   **Syntax:**   `?passphrase=Streaming Key`

   <Tip>You can find this streaming key by viewing the desired CSL slicer's Streaming Information section.</Tip>

   **Sample publishing URL:**

   `srt://ingest-prod-1-us-east-1.mss.aws.oath.cloud:48120?passphrase=7b4777ca-c0de-410b-913e-a011607ef525`

## Link Health Monitoring  {/*link-health-monitoring*/}

A link is established when an encoder starts pushing an audio/video feed to an ingest point. CSL slicer performance relies on this link, and therefore, we track key link health metrics. These metrics are measured by:

- **Session**: Provides link health, aggregated in some cases, from the moment the link was established. Use session statistics to assess the overall health of the link between the encoder and the CSL slicer.

- **Recent Interval**: Provides the most recent link health measurement. Use these statistics to identify recent trends (e.g., link health improvements or degradation).

View these metrics from within the Link Monitor section of the desired CSL slicer.

<Info>Link health metrics are described below.</Info>

| Name | Description |
|---|---|
| Round Trip Time | Indicates the round trip time between the encoder and the CSL slicer in milliseconds. |
| Link Uptime | Indicates the duration, in hours, for the connection between the encoder and the CSL slicer. |
| Latency Setting | Indicates the length of time, in milliseconds, that the CSL slicer will wait before processing data packets. This delay provides time for packet correction to take place. |
| Stream Bitrate | Indicates the rate, in Kbps, at which data is being transferred from the encoder to the CSL slicer. |
| Packets Inbound | Indicates the number of data packets received by the CSL slicer. |
| Packets Outbound | Indicates the number of data packets sent to the encoder by the CSL slicer. |
| Percent Link Success | Indicates the percentage of data packets that were successfully received by the CSL slicer. |
| Packets Errored | Indicates the number of data packets that were not successfully delivered. |
| Percent Errored | Indicates the percentage of data packets that resulted in an error. |
| Packets FEC Corrected | Indicates the number of data packets that were successfully delivered after being corrected by Forward Error Correction (FEC). |
| Percent Fixed by FEC | Indicates the percentage of data packets that were successfully delivered after being corrected by Forward Error Correction (FEC). |
| Packets ARQ Corrected | Indicates the number of data packets that were successfully delivered as a result of automatic repeat request (ARQ). |
| Percent Fixed by ARQ | Indicates the percentage of data packets that were successfully delivered as a result of automatic repeat request (ARQ). |
| ARQ Requests | Indicates the number of requests that triggered ARQ. |
| ARQ Fails | Indicates the number of requests that were unsuccessful after triggering ARQ. |
| Percent Failed ARQ | Indicates the percentage of requests that were unsuccessful after triggering ARQ. |

## Dashboard {/*dashboard*/}

The Live Slicer Monitoring dashboard provides statistics and graphs that describe Live Slicer health.

![Monitoring Landing Page](/images/uplynk/monitoring-landing.png)

**The left pane**

- Determines whether you will view the Slicer View(s) associated with your personal user account or your organization's shared ones.
- Allows you to switch to a different Slicer View.
- Indicates the current Slicer View and the number of Live Slicers associated with it by health status.
- Toggles Live Slicers from the dashboard by owner. For each owner, it also indicates the number of Live Slicers by health status.

![Monitoring Callouts](/images/uplynk/monitoring-callouts.png)

The **right pane** provides the following information and statistics for each Live Slicer associated with the current Slicer View.

| Column Name | Description  |
|---|---|
| Health  | Indicates Live Slicer health via the following color-coded icons:<ul><li><Image inline src="/images/uplynk/healthy.png" alt="Revert" /> **Healthy**: Indicates that all monitored metrics are below warning thresholds.</li><li><Image inline src="/images/uplynk/neutral.png" alt="Revert" /> **Neutral**: Indicates that the Live Slicer is not slicing content.</li><li><Image inline src="/images/uplynk/warning.png" alt="Revert" /> **Warning**: Indicates that one or more monitored metrics are at warning levels.</li><li><Image inline src="/images/uplynk/critical.png" alt="Revert" /> **Critical**: Indicates that one or more monitored metrics are at critical levels. </li></ul><br /><Tip>A Live Slicer's status is determined by [ruleset](/uplynk/acquire/live/health_monitoring/#monitoring-rules). If a Live Slicer has been [assigned multiple rulesets](/uplynk/acquire/live/health_monitoring/#assign-custom-set), then each unique combination of Live Slicer and ruleset will be listed on the dashboard.</Tip> |
| Duration| Indicates the amount of time that the Live Slicer has been in the current health state.   |
| Slicer ID     | Indicates a Live Slicer's ID. This ID is defined by the slicerID parameter in the Live Slicer's configuration file.     |
| Ruleset | Indicates the ruleset used to determine the state of Live Slicer health. |
| Owner   | Identifies the name of the user that owns the Live Slicer.   <br />[Learn how to monitor Live Slicers across multiple accounts](/uplynk/acquire/live/health_monitoring/#enable-disable).  |
| IP| Indicates the Live Slicer's IP address.   |
| Zone    | Indicates the zone to which the Live Slicer is pushing content.|
| Broker  | Identifies the name of the broker handling the Live Slicer's content.|
| Broker IP     | Indicates the IP address of the broker handling the Live Slicer's content.    |
| State**   | Indicates the Live Slicer's current state:<ul><li>**Slicing**: Indicates that the Live Slicer is currently slicing content.</li><li>**Ad Break**: Indicates that content is being driven by a third-party ad server instead of the Live Slicer.</li><li>**Replacing Content**: Indicates that content is being driven by pre-encoded content instead of the Live Slicer.</li><li>**Blackout**: Indicates that the content currently being sliced by the Live Slicer is being blacked out.</li><li>**Inactive**: Indicates that the Live Slicer was active within the last 24 hours, but is not currently slicing content, replacing content, in an ad break, or in a blackout state.</li></ul>     |
| Signal  | Indicates the input signal type:<ul><li>**Blackmagic Capture Devices**: Indicates the signal format reported by the card. Sample value: `HD 1080i 60fps`</li><li>**UDP Transport Streams**: Reports the following information: TS \{multicast unicast\}\{Source IP Address\}:\{Port\}\{Resolution Width x Height\} </li><li>**No Signal**: Reports the following value when the signal is lost: No signal</li></ul>|
| Luma    | Indicates the average luminosity percentage for the last few seconds of video. This percentage will only be returned when the Live Slicer has reported a luma value. |
| Vol     | Indicates the average loudness percentage for the last few seconds of audio. This percentage will only be returned when the Live Slicer has reported a volume value. |
| CCLS    | Indicates the number of seconds since the Live Slicer received the most recent caption. <br /> [Learn more](/uplynk/acquire/live/health_monitoring/#metrics). |
| NTLS    | Indicates the number of seconds since the Live Slicer received the most recent Nielsen tag. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics).    |
| SCTELS  | Indicates the number of seconds since the Live Slicer received the most recent SCTE signal. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics).    |
| PB| Indicates the number of packets that are queued to be read by the Live Slicer. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics). |
| DF| Indicates the number of [dropped frames](/uplynk/acquire/live/health_monitoring/#metrics).|
| UQ| Indicates the number of slices that are awaiting to be uploaded. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics).    |
| CPU     | Indicates the percentage of CPU usage for the computer hosting the Live Slicer. CPU usage is reported for 1 second, 5 seconds, and 15 seconds ago.|
| OS| Indicates the operating system for the computer hosting the Live Slicer. |
| Real MEM| Indicates the amount of physical memory, in MB, used by the Live Slicer. |
| Virt MEM| Indicates the amount of virtual memory, in MB, used by the Live Slicer.

**Key Information**

By default, all Live Slicers that have been associated with the currently selected Slicer View and that have been active within the last 24 hours are displayed on the dashboard. This list may be filtered by Live Slicer ID, health status, or account owner.

![Monitoring Filter](/images/uplynk/monitoring-filter.png)

- **Filter by Live Slicer ID**: Type the desired ID and then press the Enter key.
- **Filter by Live Slicer health status**: Click the health status filter icon <Image inline src="/images/uplynk/filter.png" alt="Revert" />, mark and/or clear the desired statuses, and then click off of it to hide the popup.
- **Choose Columns**: Select the set of columns to be displayed by clicking the columns icon <Image inline src="/images/uplynk/columns.png" alt="Revert" />.
- **View Detailed Information**: Clicking on a Live Slicer provides more detailed information about that Live Slicer and its health. This detailed view is known as Live Slicer Details.

### Live Slicer Details  {/*live-slicer-details*/}

View more detailed health information by clicking on a Live Slicer.

- **Health Measurement**: Live Slicer health is measured according to its current ruleset. View and/or set a Live Slicer's ruleset from the pane on the right-hand side of the window.
- **Assign Rulesets**: Assign rulesets to one or more Live Slicer(s) from the [Monitoring Rules](/uplynk/acquire/live/health_monitoring/#monitoring-rules) page.
- **Set Profile**: View and/or set the profile that determines when the Live Slicer will push health data to Amazon SNS or trigger audio notifications from the pane on the right-hand side of the window.

This mode consists of the following four views: Slicer Snapshot, Charts, Health Details, Status.

#### Slicer Snapshot  {/*slicer-snapshot*/}

This view consists of the following sections:

- **Preview**: Displays a thumbnail preview of the Live Slicer's output. The output for this preview varies according to its state.
  - **Slicing**: Displays recently sliced content.
  - **Ad Break**: Displays a message indicating that the thumbnail is unavailable.
  - **Replacing Content**: Displays a message indicating that the thumbnail is unavailable.
  - **Blackout**: Displays a message indicating that the thumbnail is unavailable.
  - **Offline**: By default, green frames are shown whenever the signal is lost. Black frames or an image may be shown instead when either the `no_signal_pad` or the `no_signal_image` setting is defined.
- **Health Level**: Indicates the Live Slicer's current health status and the duration that it has been in that state.
- **Slicer Status**: Indicates the Live Slicer's status and the duration that it has been in that state.
- **Health - *\{Ruleset\}***: Displays historical health status for the current Live Slicer. The line graph's title indicates the ruleset through which health status was determined.

<Tip>You may view Live Slicer health for a previous time window by clicking the **Choose Start Date** link that appears to the right of the Start Date option and then selecting the desired start date and time.</Tip>

#### Charts  {/*charts*/}

This view graphs historical statistics for key metrics. Click on a metric to view its line graph.

<Tip>You may view metric health for a previous time window by clicking the **Choose Start Date** link that appears to the right of the **Start Date** option and then selecting the desired start date and time.</Tip>

Each metric is color-coded to indicate health status:

- <Image inline src="/images/uplynk/healthy.png" alt="Revert" /> **Healthy**: Indicates that all monitored metrics are below warning thresholds.
- <Image inline src="/images/uplynk/neutral.png" alt="Revert" /> **Neutral**: Indicates that the Live Slicer is not slicing content.
- <Image inline src="/images/uplynk/warning.png" alt="Revert" /> **Warning**: Indicates that one or more monitored metrics are at warning levels.
- <Image inline src="/images/uplynk/critical.png" alt="Revert" /> **Critical**: Indicates that one or more monitored metrics are at critical levels.

Some of the metrics reported in this view may be responsible for determining Live Slicer health status in multiple ways. This relationship is explored below.

<Tip>For more information see [Monitoring Metrics](/uplynk/acquire/live/health_monitoring/#metrics).</Tip>

| Metric | Description |
|---|---|
| Signal | Indicates the input signal type. Health status is determined by Signal Status. |
| Luminosity | Indicates the average luminosity percentage for the last few seconds of video. This percentage will only be returned when the Live Slicer has reported a luma value. Health status is determined by Black Video and Static Video. |
| Volume | Indicates the average loudness percentage for the last few seconds of audio. This percentage will only be returned when the Live Slicer has reported a volume value. Health status is determined by Loss of Audio and Static Audio. |
| Closed Captions | Indicates either the number of seconds since the Live Slicer received the most recent caption or None if closed captions have never been received. Health status is determined by Closed Captions Last Seen. |
| Nielsen Tag last seen | Indicates the number of seconds since the Live Slicer received the most recent Nielsen tag. Health status is determined by Nielsen Tag Last Seen. |
| SCTE last seen | Indicates the number of seconds since the Live Slicer received the most recent SCTE signal. Health status is determined by SCTE Last Seen. |
| Processing backlog | Indicates the number of packets that are queued to be read by the Live Slicer. Health status is determined by Processing Backlog. |
| Dropped Frames | Indicates the number of dropped frames. Health status is determined by Dropped Frames. |
| Upload Queue | Indicates the number of slices that are awaiting to be uploaded. Health status is determined by Upload Queue. |
| Extended Ad Break | Indicates duration of the current ad break in seconds. Health status is determined by Extended Ad Break. |

<Info>A Live Slicer's status is determined by ruleset. If a Live Slicer has been assigned multiple rulesets, then each unique combination of Live Slicer and ruleset will be listed on the dashboard.</Info>

#### Health Details  {/*health-details*/}

This view provides detailed Live Slicer health for a given timestamp.

- **Details**: Identifies the timestamp for the current set of health data and the amount of time that the Live Slicer has been in the current state.
- **Metrics**: Provides health data for each metric. Specifically, each row identifies a metric, its health status at the time identified in the Details section, and a brief description of the last time that this metric's health status changed.

#### Status  {/*status*/}

This view provides metric data for a given timestamp.

- **Details**: Identifies the timestamp for the current set of health data.
- **Status JSON**: Provides detailed Live Slicer information, including metrics, in JSON format.
- **Metrics**: Provides data for each metric.

#### Alert Log Data  {/*alert-log-data*/}

The Alert Log page displays log data for alerts generated for the current Live Slicer over the specified date range. Leverage this historical data to discover trending issues and adjust warning/critical alert levels.

- Alert log data is paginated and limited to 10,000 entries. If you encounter this limitation, adjust your filters (e.g., reduce the time window or only show changes in health status) to reduce the number of entries.
- Alert log data is displayed in reverse chronological order (i.e., newest to oldest event).
- Log alerts are triggered according to the ruleset(s) assigned to your Live Slicer(s).

**Key Information**

Filter log data by:

- **Health Status**: Mark or clear the desired health status(es).
- **Status Change**: Filter log data to only show changes in a Live Slicer's health status by marking the **Show changes in health only** option.
- **Time**: Specify the date range for which log data will be shown by setting the **From** and **To** options and then clicking **Apply**.

The following information is provided for each logged alert:

| Column Name | Description |
|---|---|
| Slicer ID | Indicates a Live Slicer's ID. This ID is defined by the slicerID parameter in the Live Slicer's configuration file. |
| Account | Identifies the name of the user that owns the Live Slicer. |
| Previous | Indicates the Live Slicer's health status immediately prior to the point-in-time identified by the Timestamp column. |
| Current | Indicates the Live Slicer's health status at the point-in-time identified by the Timestamp column. |
| Created Date | Indicates the relative time that has elapsed since the log event took place. |
| Timestamp | Indicates the date and time (UTC) at which the log event took place. |
| Problem Metrics | Indicates zero or more metrics that caused a warning or critical health status. |

**Common Tasks**

- **View Log Data**: View the Alert Log page by clicking **Log** from the Live Slicer Monitoring dashboard.
- **Refresh Log Data**: View log events that have occurred since the start of your browsing session by clicking **Apply**.
- **Filter Log Data**: Filtering options are provided on the left-hand side of the page.
- **Navigate Log Data**: The Alert Log page can display up to 15 alert events. View older alerts by clicking on one of the following:
  - **« First**: Navigates to the first page.
  - **Previous**: Navigates to the previous page.
  - **Page_Number**: Navigates to a specific page.
  - **Next**: Navigates to the next page.
  - **Last »**: Navigates to the last page.

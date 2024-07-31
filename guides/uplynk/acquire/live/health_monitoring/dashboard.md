---
title: Dashboard
---

The Live Slicer Monitoring dashboard provides statistics and graphs that describe Live Slicer health.

![Monitoring Landing Page](/images/uplynk/monitoring-landing.png)

**The left pane **

- Determines whether you will view the Slicer View(s) associated with your personal user account or your organization's shared ones.
- Allows you to switch to a different Slicer View.
- Indicates the current Slicer View and the number of Live Slicers associated with it by health status.
- Toggles Live Slicers from the dashboard by owner. For each owner, it also indicates the number of Live Slicers by health status.

![Monitoring Callouts](/images/uplynk/monitoring-callout.png)

The right pane provides the following information and statistics for each Live Slicer associated with the current Slicer View.

| Column Name | Description  |
|---|---|
| Health  | Indicates Live Slicer health via the following color-coded icons:<ul><li><Image inline src="/images/uplynk/healthy.png" alt="Revert" /> **Healthy**: Indicates that all monitored metrics are below warning thresholds.</li><li><Image inline src="/images/uplynk/neutral.png" alt="Revert" /> **Neutral**: Indicates that the Live Slicer is not slicing content.</li><li><Image inline src="/images/uplynk/warming.png" alt="Revert" /> **Warning**: Indicates that one or more monitored metrics are at warning levels.</li><li><Image inline src="/images/uplynk/critical.png" alt="Revert" /> **Critical**: Indicates that one or more monitored metrics are at critical levels. </li></ul><Tip>A Live Slicer's status is determined by [ruleset](/uplynk/acquire/live/health_monitoring/setup/#monitoring-rules). If a Live Slicer has been [assigned multiple rulesets](/uplynk/acquire/live/health_monitoring/setup/#assign-custom-set), then each unique combination of Live Slicer and ruleset will be listed on the dashboard.</Tip> |
| Duration| Indicates the amount of time that the Live Slicer has been in the current health state.   |
| Slicer ID     | Indicates a Live Slicer's ID. This ID is defined by the slicerID parameter in the Live Slicer's configuration file.     |
| Ruleset | Indicates the ruleset used to determine the state of Live Slicer health. |
| Owner   | Identifies the name of the user that owns the Live Slicer.   <br />[Learn how to monitor Live Slicers across multiple accounts](/uplynk/acquire/live/health_monitoring/setup/#enable-disable).  |
| IP| Indicates the Live Slicer's IP address.   |
| Zone    | Indicates the zone to which the Live Slicer is pushing content.|
| Broker  | Identifies the name of the broker handling the Live Slicer's content.|
| Broker IP     | Indicates the IP address of the broker handling the Live Slicer's content.    |
| State**   | Indicates the Live Slicer's current state:<ul><li>**Slicing**: Indicates that the Live Slicer is currently slicing content.</li><li>**Ad Break**: Indicates that content is being driven by a third-party ad server instead of the Live Slicer.</li><li>**Replacing Content**: Indicates that content is being driven by pre-encoded content instead of the Live Slicer.</li><li>**Blackout**: Indicates that the content currently being sliced by the Live Slicer is being blacked out.</li><li>**Inactive**: Indicates that the Live Slicer was active within the last 24 hours, but is not currently slicing content, replacing content, in an ad break, or in a blackout state.</li></ul>     |
| Signal  | Indicates the input signal type:<ul><li>**Blackmagic Capture Devices**: Indicates the signal format reported by the card. Sample value: `HD 1080i 60fps`</li><li>**UDP Transport Streams**: Reports the following information: TS \{multicast \| unicast\}\{Source IP Address\}:\{Port\}\{Resolution Width x Height\} </li><li>**No Signal**: Reports the following value when the signal is lost: No signal</li></ul>|
| Luma    | Indicates the average luminosity percentage for the last few seconds of video. This percentage will only be returned when the Live Slicer has reported a luma value. |
| Vol     | Indicates the average loudness percentage for the last few seconds of audio. This percentage will only be returned when the Live Slicer has reported a volume value. |
| CCLS    | Indicates the number of seconds since the Live Slicer received the most recent caption.  [Learn more](/uplynk/acquire/live/health_monitoring/metrics). |
| NTLS    | Indicates the number of seconds since the Live Slicer received the most recent Nielsen tag. [Learn more](/uplynk/acquire/live/health_monitoring/metrics).    |
| SCTELS  | Indicates the number of seconds since the Live Slicer received the most recent SCTE signal. [Learn more](/uplynk/acquire/live/health_monitoring/metrics).    |
| PB| Indicates the number of packets that are queued to be read by the Live Slicer. [Learn more](/uplynk/acquire/live/health_monitoring/metrics). |
| DF| Indicates the number of [dropped frames](/uplynk/acquire/live/health_monitoring/metrics).|
| UQ| Indicates the number of slices that are awaiting to be uploaded. [Learn more](/uplynk/acquire/live/health_monitoring/metrics).    |
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

## Live Slicer Details

View more detailed health information by clicking on a Live Slicer.

- **Health Measurement**: Live Slicer health is measured according to its current ruleset. View and/or set a Live Slicer's ruleset from the pane on the right-hand side of the window.
- **Assign Rulesets**: Assign rulesets to one or more Live Slicer(s) from the [Monitoring Rules](/uplynk/acquire/live/health_monitoring/setup/#monitoring-rules) page.
- **Set Profile**: View and/or set the profile that determines when the Live Slicer will push health data to Amazon SNS or trigger audio notifications from the pane on the right-hand side of the window.

This mode consists of the following four views: Slicer Snapshot, Charts, Health Details, Status.

### Slicer Snapshot

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

### Charts

This view graphs historical statistics for key metrics. Click on a metric to view its line graph.

<Tip>You may view metric health for a previous time window by clicking the **Choose Start Date** link that appears to the right of the **Start Date** option and then selecting the desired start date and time.</Tip>

Each metric is color-coded to indicate health status:

- <Image inline src="/images/uplynk/healthy.png" alt="Revert" /> **Healthy**: Indicates that all monitored metrics are below warning thresholds.
- <Image inline src="/images/uplynk/neutral.png" alt="Revert" /> **Neutral**: Indicates that the Live Slicer is not slicing content.
- <Image inline src="/images/uplynk/warming.png" alt="Revert" /> **Warning**: Indicates that one or more monitored metrics are at warning levels.
- <Image inline src="/images/uplynk/critical.png" alt="Revert" /> **Critical**: Indicates that one or more monitored metrics are at critical levels.

Some of the metrics reported in this view may be responsible for determining Live Slicer health status in multiple ways. This relationship is explored below.

<Tip>For more information see [Monitoring Metrics](/uplynk/acquire/live/health_monitoring/metrics).</Tip>

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

### Health Details

This view provides detailed Live Slicer health for a given timestamp.

- **Details**: Identifies the timestamp for the current set of health data and the amount of time that the Live Slicer has been in the current state.
- **Metrics**: Provides health data for each metric. Specifically, each row identifies a metric, its health status at the time identified in the Details section, and a brief description of the last time that this metric's health status changed.

### Status

This view provides metric data for a given timestamp.

- **Details**: Identifies the timestamp for the current set of health data.
- **Status JSON**: Provides detailed Live Slicer information, including metrics, in JSON format.
- **Metrics**: Provides data for each metric.

### Alert Log Data

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

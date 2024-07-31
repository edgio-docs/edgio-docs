---
title: Penalty Box and Issue Remediation
---

This section details key features and functions for finding, identifying, and resolving issues.

## Penalty Box  {/*penalty-box*/}

The Penalty Box allows you to quickly review all Live Slicers that are experiencing one or more monitored metrics at warning levels, critical levels, or both.

**Key Information**

To view the [Penalty Box](https://monitor.uplynk.com/penalty-box), follow these steps:

1. From the main menu, navigate to **Services** and then click on **Monitoring 2.0**.
2. Open the **Slicers** menu and then click on **Penalty Box**.

The Penalty Box displays all unhealthy Live Slicers for any of your [monitored accounts](/uplynk/acquire/live/health_monitoring/setup/#enable-disable).

- Unhealthy Live Slicers for your own account belong to the **Personal slicers** category. This category also includes any Live Slicers to which you have been granted access that do not belong to your [organization](/uplynk/acquire/live/health_monitoring/organizations).
- If you belong to an organization, then your organization will also be displayed as a category.

Each category indicates the number of Live Slicers that are experiencing one or more monitored metrics at critical and warning levels.

![Penalty Box Indicators](/images/uplynk/penalty-box.png)

Use the **Unhealthy Only** option to determine whether to list your organization or **Personal slicers** when that category only contains healthy Live Slicers.

## Issue Identification and Remediation  {/*issue-identification-remediation*/}

Learn how to interpret status information.

It is not recommended to use log data as a monitoring mechanism. Instead, leverage log data to identify and troubleshoot issues. Common issues are typically due to:

- Egress bandwidth
- Source signal
- System resources
- Configuration

### Egress Bandwidth  {/*egress-bandwidth*/}

<Tip>Most Live Slicer issues are due to egress bandwidth.</Tip>

A Live Slicer combats latency issues by uploading up to five video slices in parallel. Under ideal circumstances, it will only upload one or two slices at a time. However, bandwidth constraints may require it to upload additional slices in an effort to catch up. If bandwidth continues to fall short of what is needed, the slicer will buffer up to 5 minutes of video before it begins dropping incoming frames.


### Confirm Egress Bandwidth Issues  {/*confirm-egress-bandwidth*/}

Confirm egress bandwidth issues through the following error messages:

| Error Message | Description |
|---|---|
| Error uploading slice X, will retry<br />Unable to upload slice X, HTTP error X<br />Failure uploading slice, will retry | These error messages are indicative of an egress bandwidth issue under the following circumstances:<ul><li>**Frequency**: Frequent occurrences of these error messages are a strong indicator of an egress bandwidth issue.</li><li>**Other Indicators**: The combination of these error messages with other indicators (e.g., outdated response parameter) are a strong indicator of egress bandwidth issues.</li></ul><br />**More Information**: <ul><li>It is not abnormal for this message to be logged due to occasional upload errors.</li><li>A slicer may upload up to five slices in parallel. This may result in up to five duplicate error messages being logged at or near the same time.</li><li>If a slice cannot be uploaded, the Live Slicer will wait for a short timeout and then retry. This timeout will double with each attempt. This process will continue until the slice is uploaded.</li></ul> |
| Upload queue depth: X | Check for messages containing a value higher than 2 or 3.<br /><br />**More Information**:<ul><li>This message, which is logged on a regular basis, indicates how many slices are waiting to be uploaded.</li><li>This message provides the same data as the waiting value returned by the status APIs.</li></ul> |
| Switching to alternate upload site | Check for frequent occurrences of this error message.<br /><br />**More Information**:<ul><li>This message indicates that the Live Slicer is trying to work around any possible route-specific problems by switching to an alternate upload location.</li><li>The Live Slicer may attempt this independently for each of the parallel uploaders.</li><li>It is not abnormal for this message to be logged due to momentary bandwidth hiccups.</li></ul> |
| Failed to send status to broker: `<message>` | This message indicates that the Live Slicer is unable to communicate with the backend.<br /><br />**More Information**:<br />The Live Slicer will retry until it is able to resume communication. |
| Clearing current broker - too many consecutive communication failures | This message indicates that the Live Slicer was unable to communicate with the backend.<br /><br />**More Information**:<br />The Live Slicer will switch to a different backend component and then retry. |
| Unable to mark slice X delivered, `<reason>` | Check for frequent occurrences of this error message.<br /><br />**More Information**:<ul><li>This message indicates that the Live Slicer was unable to provide a report of recently uploaded slices to the backend. The Live Slicer will retry until it successfully reports to the backend.</li><li>This message is uncommon due to the small size of the data being sent.</li></ul> |

### Testing  {/*testing*/}

<Tip>This tool only tests burst bandwidth and is not a good indicator of average bandwidth.</Tip>

The Live Slicer includes a tool that reports the bandwidth, in Megabits per second, between the Live Slicer and the backend. Use this tool to assess whether a Live Slicer is experiencing network connectivity issues with the backend.

**Usage**

Run the following command:

```bash
$ cd /opt/uplynk/latest
$ ./slicer -u <username> -apikey <APIKey> -bandwidth
```

### Source Signal  {/*source-signal*/}

A Live Slicer that is not receiving a video signal will output blank green frames with silent audio. This state is indicated by the status methods when the signal response parameter returns **No signal**.

#### Diagnosis  {/*diagnosis*/}

A source signal issue may arise due to the SDI source or the UDP transport stream.

#### SDI Source  {/*SDI-source*/}

The following message indicates that the Live Slicer is unable to receive the source signal from the capture card:

| Error Message | Description |
|---|---|
| Card thinks signal dropped | The Live Slicer will log this message up to 5 consecutive frames before it begins outputting green frames. |

### UDP Transport Streams  {/*udp-transport-streams*/}

Under normal circumstances, a UDP transport stream may drop packets in transit to the Live Slicer and generate any of the error messages listed below. Identify signal issues by the frequency of these error messages.

| Error Message | Description |
|---|---|
| injecting Xms of blank video | Indicates that blank green frames were inserted as a result of video decoding inactivity. This action will only be taken after a full second of missing video. |
| injecting Xms of blank audio | Indicates that silent audio was inserted as a result of audio decoding inactivity. This action will only be taken after a full second of missing audio. |
| tossing frame until we have audio to match<br />tossing frame until timestamps synchronize | Indicates that the Live Slicer has started receiving data again after signal loss, but it is unable to synchronize the audio/video data. It will continue to retry as it receives new audio/video data. |
| Guesstimating frame timestamp ... | Indicates that the Live Slicer has estimated the timing information relative to previous frames due to an in-stream timing information change.<br /><br />**More Information**:<ul><li>This issue is commonly caused by dropped frames. This will create a gap in the timing.</li><li>Another cause for this issue is a change in source content (e.g., splicing from one program to another).</li></ul>|
| Invalid pts delta ... | Indicates that the Live Slicer is attempting to resynchronize audio/video after encountering a large discrepancy between the current and previous frame. |
| frame older than recent estimation | Indicates that the Live Slicer dropped a frame that was older than the previous frame and then attempted to resynchronize the audio/video. |
| Unable to decode frame, skipping | Indicates that the Live Slicer was unable to decode a video frame.<br /><br />**More Information**:<br />This issue is commonly caused by dropped packets. This will prevent the frame from containing sufficient information for the purpose of decoding it. |
| Unable to decode audio, skipping | Indicates that the Live Slicer was unable to decode an audio frame.<br /><br />**More Information**:<br />This issue is commonly caused by dropped packets. This will prevent the frame from containing sufficient information for the purpose of decoding it. |

### Reverse Path Filtering  {/*reverse-path-filtering*/}

Tools that communicate directly with the network interface (e.g., Wireshark) will be unaffected by this issue. However, the Live Slicer will be unable to receive the signal.

A common obstacle with multicast UDP signals is reverse path filtering. This issue occurs when multicast packets arrive on an interface that doesn't have a route for the source address. By default, the Linux kernel will filter these packets and prevent them from being delivered to the Live Slicer.

#### Resolution/Remediation  {/*resolution-remediation*/}

Resolve this issue by either:

- Fixing the routing configuration.
- Disabling reverse path filtering through the following command:

    ```bash
    $ echo 1 > /proc/sys/net/ipv4/conf/all/rp_filter
    $ sysctl -w "net.ipv4.conf.all.rp_filter=0"
    ```

### System Resources  {/*system-resources*/}

The Live Slicer requires significant memory and CPU resources to perform real-time video processing. Insufficient resources may cause dropped frames.

#### Diagnosis  {/*diagnosis*/}

Check for dropped frames occurring without egress bandwidth symptoms. Upon detecting this condition, leverage system tools to monitor system resources (e.g., CPU usage, load average, and memory consumption).

| System Resource | Description |
|---|---|
| Load Average | Check load average by using a system tool, such as:<ul><li>uptime</li><li>top</li></ul>Verify that the load average is less than 2x the number of core processors.<br /><br />**More Information**:<ul><li>The above tools report average CPU load for the last 1, 5, and 15 minutes.</li><li>These statistics indicate the average number of tasks that were ready to be processed during that time period.<br />**Example**:<br />A load average of 12 indicates that there are 12 tasks ready to run. On a 6-core system, this means that there are twice as many tasks ready to run as there are cores available to run them.</li></ul> |
| Memory Usage | Check memory usage by using a system tool, such as:<ul><li>/proc/meminfo</li><li>top</li></ul>Check for high levels of swap usage by looking at the `SwapTotal` field in `/proc/meminfo`. This is an indicator of a performance issue that may cause dropped frames.<br /><br />**More Information**:<ul><li>A Live Slicer's memory usage depends on the following factors:<br />- The resolution and frame rate of the source material.<br />- Complexity of the video.<br />- The amount of backlog induced by poor egress bandwidth.</li><li>Typical memory usage ranges from 3 to 8 GB. However, this statistic will fluctuate significantly during operation. The system should have sufficient RAM to accommodate this fluctuation, plus some extra for operating system overhead. </li></ul>|

### Configuration  {/*configuration*/}

This section covers common configuration issues that may prevent the Live Slicer from functioning properly.

| Issue | Description |
|---|---|
| Closed captions not working with SDI feeds | Perform the following steps:<ol><li>Use the ancillary scan mode to discover the ancillary line number and/or DID/SDID. Enable `ancillary scan` mode by changing the **ancillary_scan** setting in the Live Slicer's config file from "off" to "on" and then restarting it.</li><li>Check the logs for the following message: `Unknown DID/SDID X/Y on line Z`</li><li>Set the following Live Slicer's config settings to the X, Y, and Z values defined in the log message:<br />- captions_DID<br />- captions_SDID<br />- ancillary_lines</li><li>Restart the Live Slicer.</li><li>Repeat steps 2 - 4 until the right combination is found.</li><li>Turn off ancillary scan mode.</li></ol>**More Information**:<br />The Live Slicer must be told where to look for CEA-608/708 closed captions for SDI feeds. By default, the slicer looks on ancillary line 9/13 for SMPTE 291M messages with the DID/SDID 0x61/0x01, which is the most common configuration for broadcast signals. |
| Auto expiring assets | Change the `autoexpire_age` setting in the Live Slicer's config file to the desired length of time and then restart the Live Slicer.<br /><br />**More Information**:<br />By default, the Live Slicer expires live assets after 24 hours. |
| Audio channel layout | **SDI Signal Only**<br />Update the Live Slicer's configuration file through the following steps:<ol><li>Set the desired audio channel layout through the audio_layout setting.</li><li>Add audio tracks by:<br />- Inserting the `audio_tracks` setting. Set it to the desired number of tracks.<br />- Adding an `audio_layout_X` setting for each audio track.<br />**Example**:<br />Add a second track on the second stereo pair (channels 3 and 4) by adding the following settings: `audio_tracks: 2` and `audio_layout_1: stereo 2`.</li><li>Restart the Live Slicer.</li></ol>**More Information**:<br />By default, the slicer will use the first two channels from the input signal as a stereo pair. |
| Unique Live Slicer IDs | The following log message indicates that multiple Live Slicers are using the same ID:<br />`Unable to mark slice X delivered: Deliver rejected: slicing for beam Y is already done.`<br />Resolve this issue by assigning a unique ID to each Live Slicer.<br /><br />**More Information**:<br />A unique ID must be assigned to each Live Slicer regardless of whether it is capturing the same signal as other Live Slicers. |

### Miscellaneous Troubleshooting Information  {/*misc-troubleshooting*/}

This section provides additional tips for issue identification and remediation.

#### Asset Rollover  {/*asset-rollover*/}

The maximum duration of a live asset is 8 hours. Once a live asset reaches this duration, the Live Slicer will start writing to a new asset.

#### Delayed Playback  {/*desired-playback*/}

<Info>Expired or deleted assets cannot be viewed on delay.</Info>

A live stream may either be played back in real-time or on delay. Delayed playback is useful when troubleshooting issues that occurred in the past.

To view a live stream on delay, add `delay=<seconds>` to the channel URL query parameters.

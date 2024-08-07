---
title: Failover
---

**Requires Live Slicer version 20081700 or higher**

Live Slicer failover minimizes the impact on your viewer's playback experience when a Live Slicer's performance is sub-optimal by automatically switching the live stream's source to a different Live Slicer. This is possible because each Live Slicer in a failover group provides status information to our system at regular and frequent intervals. If the primary Live Slicer is unhealthy, our system will switch the source of the live stream to a different Live Slicer. This may cause viewers to experience a few seconds of discontinuity.

## Key Information  {/*key-information*/}

- **Live Slicer failover** is only supported when streaming a live channel.
- Setting up Live Slicer failover requires:
  - Creating a failover group.
  - Defining the `failover_id` and `enable_remote_config` settings within each Live Slicer's configuration file.
- You may only assign a Live Slicer to a failover group if it has been previously started.
- You may only assign a Live Slicer to a single failover group.<br /><Tip>Reassign a Live Slicer to a different failover group by first removing it from its current failover group.</Tip>

- You may only assign a live channel to a single failover group.<br /><Tip>Reassign a Live Slicer to a different failover group by first removing it from its current failover group.</Tip>

- Live Slicer health status is assessed through one or more metrics. A Live Slicer is considered unhealthy if at least one metric falls below a custom threshold for a given duration.<br /><Tip>Restart the Live Slicers associated with a failover group to apply threshold changes.</Tip>

     <Info>Restart the Live Slicers associated with a failover group to apply threshold changes.</Info>

  [Learn more about metrics](/uplynk/acquire/live/on_prem_slicer_metrics).

- Minimize slate upon Live Slicer failover by setting at least one backup Live Slicer to hot mode. The available modes are described below:

    - **Hot-Warm Mode**:
        - This mode prioritizes cost-saving over slate by allowing only the primary Live Slicer to encode and store content.
        - Backup Live Slicers in this mode may slice content (i.e., Slicing state) but will not upload that content to our system.
        - As a result, this mode may cause a few seconds of slate upon Live Slicer failover.

    - **Hot Backup(s)**:
        - This mode balances viewer experience with cost-saving by allowing one or more backup Live Slicers within a failover group to encode and store content.
        - This mode allows near-instantaneous failover to the designated number of hot backup Live Slicers.
        - However, a viewer may experience a slight amount of discontinuity since those Live Slicers are not synchronized.
        - If your failover group contains additional backup Live Slicers, they will operate in warm mode, slicing content but not uploading it to our system.

            **Failover Workflow**:
            1. Upon detecting an issue with the current Live Slicer, our service switches to a hot backup Live Slicer.
            2. If it detects at least one warm backup Live Slicer, it will instruct it to turn hot. This process may take up to 45 seconds.

    - **Hot-Hot Mode**:
        - This mode prioritizes viewer experience over cost-saving by allowing all Live Slicers within a failover group to encode and store content.
        - Using this mode allows near-instantaneous failover.
        - However, a viewer may experience a slight amount of discontinuity since those Live Slicers are not synchronized.

- Failover mode determines how our system chooses which Live Slicer will serve as a source for your live stream. Each failover mode is described below.

    - **Prioritized**: This mode allows you to define a failover order for your Live Slicers. The source for your live stream is the Live Slicer with the highest priority, provided it is healthy. If it is unhealthy, our system will use the Live Slicer with the next highest priority.<br /><Info>The Auto Failback option determines whether to switch back to a higher priority Live Slicer when it resumes a healthy state.</Info>

    - **Flat**: The source for your live stream is a healthy Live Slicer that is randomly selected from your failover group.

- You may temporarily prevent our system from failing over to a specific Live Slicer by disabling its availability status. <br /><Info>A Live Slicer's availability status only affects failover. It does not prevent the Live Slicer from slicing and encoding your content.</Info>

- View a failover group's audit log by opening it and then clicking the **Change Log** tab.
- Review a failover group's events by opening it and then clicking on the **Event Log** tab.

## Metrics  {/*metrics*/}

| Metric | Description |
|---|---|
| Audio loss | Determines the length of time during which audio is not detected before triggering failover.<br /><Tip>Periods of silence may be normal. Consider the source content when setting thresholds.</Tip> |
| Black screen | Determines the length of time that black frames may be sent by an On Prem Slicer before triggering failover.<br /><Tip>Periods of black video may be normal. Consider the source content when setting thresholds.</Tip><br /><Info>This metric measures the duration of black video by averaging the video's luminosity percentage over the last few seconds. </Info>|
| CC last seen | Determines the amount of time that a Live Slicer may not receive closed captioning data before triggering failover.<br /><br />Key information:<br /><ul><li>This metric is reported in 10 second intervals.</li><li>This metric is inapplicable when closed captioning data has not been received from the Live Slicer.</li><li>Consider the content when setting the threshold for this metric. Some content may contain an extended time period without closed captioning data.</li></ul><br /> |
| Dropped frames | Determines how many frames may be dropped within the current reporting period before triggering failover. |
| Input loss | Determines the length of time that the system may not receive the Live Slicer's signal before triggering failover. |
| Nielsen last seen | Determines the length of time that may elapse since the Live Slicer last received a Nielsen watermark before triggering failover.<br /><br />Key information:<ul><li>Nielsen watermarks may be inserted into the audio stream sent to the Live Slicer. They are typically inserted at 10 second intervals. However, this interval may vary according to your implementation.</li><li>Nielsen watermarks are leveraged by the Live Slicer to generate ID3 tags through which a media player reports viewership data.</li></ul>|
| Processing queue | Determines how many packets may be queued to be read by the Live Slicer before triggering failover.<br /><br />Key information:<ul><li>The recommended levels for this metric varies according to the signal type. For example, a UDP Unicast stream should have a much lower threshold (e.g., 1,000) than a UDP Multicast stream (e.g., 10,000).</li><li>A high value may be indicative of insufficient CPU resources on the computer hosting the Live Slicer.</li><li>A transient spike in this metric may not be cause for concern.</li></ul> |
| SCTE last seen | Determines the length of time that may elapse since the Live Slicer last received a SCTE 35/104 signal before triggering failover. |
| Static audio | Determines the length of time during which static audio is detected before triggering failover.<br /><Info>Static audio is detected by analyzing the audio's loudness percentage over the last few seconds. This metric ignores periods of silence.</Info> |
| Static video | Determines the length of time during which static video (e.g., green screen, color bars, or a frozen frame) is detected before triggering failover.<br /><Info>Static video is detected by analyzing the video's average luminosity percentage over the last few seconds.</Info> |
| TR 101 290 P1 errors | Requires a UDP source and Live Slicer version 22083100 or higher<br /><br />Determines the number of first priority errors that may occur before triggering failover. A first priority error occurs when a Digital Video Broadcasting (DVB) measurement test identifies an issue that may prevent the MPEG-2 Transport Stream (TS) from being decoded. The parameters that are evaluated for this test are defined within an ETSI technical report (ETSI TR 101 290). |
| TR 101 290 P2 errors | Requires a UDP source and Live Slicer version 22083100 or higher<br /><br />Determines the number of second priority errors that may occur before triggering failover. A second priority error occurs when a Digital Video Broadcasting (DVB) measurement test identifies an issue with a parameter that should be continuously monitored. The parameters that are evaluated for this test are defined within an ETSI technical report (ETSI TR 101 290). |
| Upload queue | Determines how many slices may be queued for upload before triggering failover.<br /><Info>A value higher than 2 may be indicative of Live Slicer connectivity issues.</Info> |
| Video loss | Determines the length of time during which video is not detected before triggering failover.<br /><Info>Loss of video is assessed according to whether a video packet identifier (PID) is detected in the live stream.</Info> |
| Percent Failed ARQ | Indicates the percentage of requests that were unsuccessful after triggering ARQ. |

## Set up Live Slicer Failover  {/*set-up-live-slicer-failover*/}

This section details setup for one or more live channel(s).

1. **Navigate to the Slicers Page**:
   - Go to the **Slicers** page by selecting **Slicers** from the left navigation of the main page.

2. **Create a Failover Group**:
   - Click **+ Create Failover Group**.
   - In the **Failover Group Name** option, type the name for the failover group.
   - Click **Create & Edit**.

3. **Configure Hot-Warm Mode**:
   - From the **Hot-Warm Mode** option, determine whether backup live slicers will run in hot or warm mode.
   - **Recommended Mode**: `1 Hot Backups`. This ensures an optimal viewing experience by allowing quick failover to a hot backup Live Slicer if the primary Live Slicer has issues.

4. **Select Failover Mode**:
   - From the **Failover Mode** option, choose whether Live Slicer selection on failover will be determined by priority or randomly.

5. **Add Live Slicers to Failover Group**:
   - Identify the set of Live Slicers to add to the failover group. Segregate them into:
     - **Assigned**: Live Slicers already associated with a live channel.
     - **Unassigned**: All other Live Slicers.
   - Add the desired unassigned Live Slicers to the failover group.

   <Info>Add Live Slicers in 2 stages. First, add unassigned ones. After failover to a Live Slicer in your group, add the Live Slicer previously assigned to the live channel to avoid streaming slate to viewers.</Info>

6. **Start Unused Live Slicers**:
   - If any desired Live Slicers have never been used before, start them now.

7. **Add Slicers to Group**:
   - Click **Add Slicers to Group**.
   - From the **Slicers** option, select the desired Live Slicers and then click **Add**.
   - Click **Update Slicer Mapping(s)**. The selected Live Slicers will be listed in the **Slicers in Group** section.

8. **Enable Live Slicers**:
   - From the **Available** column, enable each desired Live Slicer by toggling its availability status to enabled.

9. **Configure Prioritized Failover Mode**:
   - Order the Live Slicers from highest to lowest priority by dragging the Live Slicer to the desired position.

10. **Add Live Channels to Failover Group**:
    - Click **Add Channel Mapping**.
    - From the **Channels** option, select the desired live channels and then click **Add**.
    - Click **Update Channel Mapping(s)**. The selected live channels will be listed in the **Channels using Group** section.

11. **Determine Health Metrics**:
    - Click the **Thresholds** tab.
    - Set metrics to trigger failover and define failover and recovery thresholds.

    **Metrics Configuration**:
    - **States**:
      - Set **Duration** for the number of seconds the sub-optimal state must persist before triggering failover.
      - Set **Clear Duration** for the number of seconds the optimal state must persist before the Live Slicer is considered healthy.

    - **Measurements**:
      - Set **Threshold** for the value identifying sub-optimal performance.
      - Set **Duration** for the number of seconds a metric must fall below its threshold before triggering failover.
      - Set **Clear Threshold** for the number of seconds a metric must meet or exceed its threshold before the Live Slicer is considered healthy.

12. **Copy Failover Group ID**:
    - From the **Configuration** tab, copy the failover group's system-defined ID displayed under **Failover Group ID**. This ID is used for the `failover_id` setting in Live Slicer configuration.

13. **Update Live Slicer Configuration**:
    - Open each Live Slicer’s configuration file.
    - Set the `failover_id` setting to the copied failover group ID.

      ```yaml
      failover_id: 1232b8646dea4cd0a48f5e0ffaa4f8c7
      ```

    - For Live Slicer version 21071400 or higher, add:

      ```yaml
      enable_remote_config: 1
      ```

    - For Live Slicer version 21070801 or lower, add:

      ```yaml
      remote:
      ```

    - Review the configuration file. It should look like:

      ```yaml
      description: Live Capture
      username: joe@example.com
      apikey: abcDEFghiJKLmnoPQRtuvWXYz123ABCdefGHIJKL
      slicerID: slicer1234
      failover_id: 1232b8646dea4cd0a48f5e0ffaa4f8c7
      enable_remote_config: 1
      ```

    - Save the configuration file.
    - Restart the Live Slicer.

14. **Monitor Failover**:
    - Wait until the live channel fails over to a Live Slicer in your failover group. This may take a few minutes.
    - After failover, add the Live Slicer previously assigned to your live channel to the failover group.

        <Info>If the failover group uses prioritized failover mode, ensure these Live Slicers are prioritized over others in the failover group.</Info>

15. **Reapply Failover Settings**:
    - Perform step 13 for the newly added Live Slicer(s).
    - In prioritized failover mode, the system will failover to the Live Slicer with the highest priority within a few minutes.

## Modify a Failover Group  {/*modify-failover-group*/}

1. **Navigate to the Slicers Page**:
   - Go to the **Slicers** page by selecting **Slicers** from the left navigation of the main page.

2. **Select the Failover Group**:
   - Click on the desired failover group.

3. **Perform Changes**:
   - **Failover Group Name**: Set the name for the failover group.
   - **Hot-Warm Mode**: Determine whether backup live slicers will run in hot or warm mode.
   - **Failover Mode**: Select whether Live Slicer selection on failover will be determined by priority or randomly.

4. **Add Live Slicers**:
   - Add Live Slicers to the failover group.
   - For each added Live Slicer, update the `failover_id` and `enable_remote_config` settings in its Live Slicer configuration file and restart the Slicer.

5. **Update Availability Status**:
   - Determine whether the system may failover to a Live Slicer by toggling its availability status between enabled (`✓`) and disabled (`✗`).
   - Note: It may take a minute or two before newly enabled Live Slicers are available for failover.

6. **Remove Live Slicers**:
   - From the **Slicers in Group** section, mark each Live Slicer to be removed.
   - Click **Remove**.

7. **Add Live Channels**:
   - Reassign a Live Slicer to a different failover group by first removing it from its current failover group.
   - Click **Add Channel Mapping**.
   - From the **Channels** option, select the desired live channels and then click **Add**.
   - Click **Update Channel Mapping(s)**. The selected live channels will be listed in the **Channels using Group** section.

8. **Remove Live Channels**:
   - From the **Channels using Group** section, mark each live channel to be removed.
   - Click **Remove**.

9. **Update Health Conditions**:
   - Determine the conditions under which a Live Slicer is considered healthy.
   - Click **Save**.

10. **Restart Live Slicers**:
    - Restart all Live Slicers associated with this failover group if you have updated the conditions (e.g., thresholds) for determining a Live Slicer's health.

## Failover Notifications  {/*failover-notifications*/}

Publish failover events through the following workflow:

1. **Data Push**:
   - Our service pushes data to Amazon SNS whenever we fail over to another Live Slicer.

2. **Data Broadcast**:
   - Amazon SNS broadcasts data to one or more destinations (e.g., mobile device, web server, or Slack).
   - Get started with Amazon SNS for free through its SNS free tier. [Learn more](https://aws.amazon.com/sns/).

3. **Data Formatting**:
   - Our [service formats data using JSON](#failover-notification-fields). This data may then be filtered via custom code.
   - This article explains how to strip out additional data generated by Amazon SNS via a custom function in Amazon Lambda.

### Get Started with Failover Notifications  {/*get-started-with-failover-notifications*/}

Perform the following steps to set up notifications:

1. **Set Up an Amazon SNS Topic**:
   - Our service pushes Live Slicer health and failover notifications to the same Amazon SNS topic.
   - You may skip this step if you have already created an Amazon SNS topic for Live Slicer health notifications.

2. **Configure Communication with Amazon SNS**:
   - Our service pushes Live Slicer health and failover notifications to the same Amazon SNS topic.
   - Updating the SNS topic for either Live Slicer health or failover notifications will affect both types of notifications.

3. **Navigate to the Failover Page**:
   - From the main menu, navigate to **Slicers** and then select **Failover** from the side navigation bar.

4. **Update SNS Topic**:
   - Click **Update SNS Topic** from the right-hand pane.
   - Set the **Update your SNS Topic ARN** option to the ARN for the topic created above.
   - Click **Save Topic ARN**.

5. **Configure Amazon SNS to Broadcast Notifications**:
   - Learn how to set up Amazon SNS and Lambda to broadcast notifications to a Slack channel.

### Failover Notification Fields  {/*failover-notification-fields*/}

Our service sends information that describes a failover event in JSON format. Key parameters in this notification are described here.


| Field   | Description    |
|---|---|
| **Subject**| Returns Slicer Failover |
| **Message**| Provides detailed information about the Failover event. Key parameters are described below.  |
| **Service**| Returns failover.|
| **Sender** | Returns failover.|
| **Account**| Indicates the user name (e.g., email address) associated with the account for which this failover event occurred.|
| **OID**    | Indicates the system-defined ID of the account for which this failover event occurred.  |
| **FO_Group_Name** | Indicates a failover group's name.  |
| **FO_Group_ID**   | Indicates a failover group's system-defined ID.   |
| **Channels**      | Contains an array of the live channels associated with the failover group defined by the `FO_Group_Name` property.|
| **Date_Time**     | Indicates when the notification was triggered. This timestamp is reported as Unix time in milliseconds.   |
| **Original_Slicer** | Indicates the slicerID of the Live Slicer that was the source of the live stream prior to the failover event.  |
| **Slicer** | Indicates the slicerID of the Live Slicer that was the source of the live stream after the failover event. |
| **Reason** | Provides additional information about this failover event. For example, this parameter may indicate the reason for failover.  |
| **Slicers_In_Group** | Contains a key-value pair for each Live Slicer associated with the failover group defined by the `FO_Group_Name` property.     |
|| Each key-value pair identifies the name of a Live Slicer and its failover status. Valid failover states are described below.  |

### Valid Failover States  {/*valid-failover-states*/}

- **Active**: Indicates that our service is using this Live Slicer's feed to generate the live stream for all live channels associated with this failover group.
- **Hot**: Indicates that the Live Slicer is encoding and storing content within our system. Our service can quickly fail over to a Live Slicer in this state.
- **Warm**: Indicates that the Live Slicer is currently slicing content but not uploading it to our system. Failing over to a Live Slicer in this state may cause a few seconds of slate.
- **Unhealthy**: Indicates that the Live Slicer is considered unhealthy due to at least one metric falling below a custom threshold for a given duration.
- **Disabled**: Indicates that the failover capability for this Live Slicer has been manually disabled.

**Key-Value Pair Syntax**: \{*Live Slicer*\}: \{*Failover Status*\}

**Example**

```json
{
  "Service": "failover",
  "Sender": "failover",
  "Account": "joe@example.com",
  "OID": "1ab0812e54f44b029bcae08685f025cc",
  "FO_Group_Name": "My failover group",
  "FO_Group_ID": "f18b0d3f6393428f9aca3815a17f663e",
  "Channels": ["Basketball", "News"],
  "Date_Time": 1667834461149,
  "Original_Slicer": "bball_slicer_1",
  "Slicer": "bball_slicer_2",
  "Reason": "added to denylist: Not seen since 2022-11-07 15:21:06",
  "Slicers_In_Group": {
    "bball_slicer_1": "Active",
    "bball_slicer_2": "Hot"
  }
}

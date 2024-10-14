---
title: Linear Channels
---

A live channel represents a live linear stream that adheres to a timeline that identifies content and when it should be played.

## Setup  {/*setup*/}

Add audio/video content to a live channel via the following methods:

- **Live Slicer** - Verify that the slicer ID defined in the desired live channel is a case-sensitive match to the one defined in the Live Slicer configuration file (`/etc/uplynk.conf`). This allows the Live Slicer's output to be automatically added to the live channel's timeline.
- **API** - Add pre-encoded content and/or live content from multiple Live Slicers to a live channel via our [Channel API](https://docs.edgecast.com/video/Content/Develop/Channel.htm).

**Key Information**

- **Stream a feed** by pointing a media player to the live channel's [playback URL](/uplynk/delivery/playback_urls). Additionally, quickly embed a media player within a web page by leveraging a live channel's HTML code.
- **Test playback** by leveraging a restriction-free media player associated with a live channel.
- **Secure a live linear feed** by setting up whitelisted domains, a [digital signature](/uplynk/delivery/playback_urls/#signing-playback-urls-with-token), and/or [blackout](/uplynk/manage/content_protection/blackout) within your live channel configuration.
- **Slate** is played in a loop when a live channel's timeline is missing content or during blackouts. Define the type of slate that will be played within a live channel's configuration.
- By default, a live channel trails the live horizon by ~60 seconds. See [Playback Latency](#) for reduced-latency options.
- Set up Live Slicer failover to ensure uninterrupted playback of your live stream.

[Learn more.](#)

Click **Save** to apply your changes to your live channel's configuration.

### Create a Live Channel  {/*create-a-live-channel*/}

1. Navigate to the Live Channels page.
   - **From the main menu**, navigate to Channels.
2. Click **+ Channel**.
3. In the **Channel Name** option, type the name by which this live channel will be identified.
4. In the **Slicer ID (Optional)** option, type the unique alphanumeric ID by which the Live Slicer will identify this live channel.
5. **Optional:** Set channel options:
   - Check the **Enabling Scheduling** option to use the advanced scheduling interface and the latest channel APIs.
   - Tick the **Edit after creation** box to open the record after submitting.
6. Click **Create**.

### Change the Default Playback Latency  {/*change-the-default-playback-latency*/}

1. From the **Details** tab of the Live Channels record, select the **Playback Latency** option from the dropdown:
   - **Default:** ~60 seconds
   - **Low:** Low 20s, 5+ second buffering, Missing Content Slate (MCS) is possible
   - **Lower:** Upper teens, 2+ seconds buffering, MCS is possible
   - **Lowest:** As low as 15 seconds, minimal buffering, no MCS

2. Use two-second slices. Slates must be encoded to 2 seconds.
3. Playback latency options cannot currently be used with Time Shifting.
4. Contact Support if you do not see the Playback Latency feature.

### Delete a Live Channel  {/*delete-a-live-channel*/}

1. Navigate to the Live Channels page.
   - **From the main menu**, navigate to Channels.
2. Tick the box on the live channel's tile; then click **Delete Channel** at the bottom of the pane.
3. When prompted to confirm, click **Delete**.

### Assign a Failover Group to a Live Channel  {/*assign-a-failover-group*/}

A prerequisite for this procedure is a failover group. [Learn more.](#)

1. Navigate to the Slicers page.
2. If you are trying to reassign a live channel to a different failover group, perform the following steps to remove the live channel from its current failover group:
   - Click on the desired failover group.
   - From the **Channels using Group** section, mark the desired live ch

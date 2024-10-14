---
title: Live
---

A live linear stream typically establishes a 24/7 audio/video feed from content captured via SDI or UDP. In addition to mirroring the input signal, it also supports [content and ad replacement](/uplynk/manage/channels/#ad-breaks-and-content-replacement).

## Basic Setup  {/*basic-setup*/}

Set up a live linear stream by configuring the following components:

1. [**Live Channel**](/uplynk/manage/channels): A live channel represents a live linear stream that contains a timeline identifying live and on-demand content and when it should be played.

2. **Slicer**: Use a Live Slicer, Cloud Slicer Live, or both to capture and push audio/video content to a live channel's timeline.

    - [**Live Slicer**](/uplynk/acquire/live/on_prem_slicer): A Live Slicer is a Linux daemon. Use the [Channel API](https://docs.edgecast.com/video/Content/Develop/Channel.htm#getlivechannelschedule) to populate a live channel's timeline with pre-encoded content and/or live feeds from additional Live Slicers.
    - [**Cloud Slicer Live**](/uplynk/acquire/live/cloud_slicer_live): Cloud Slicer Live allows you to run a slicer in our cloud. This allows you to ingest and encode content without on-premise hardware.

3. [**Media Player**](/uplynk/deliver/media_player)

    - Once a live linear feed has been processed into a stream, it may be played back from anywhere in the world.

    - If you are setting up an HLS player, you may add support for fast forwarding, rewinding, or pausing and resuming through the [Live Timeshifting](#live-timeshifting) capability.

## How it Works  {/*how-it-works*/}

The following diagram illustrates the flow through which a live linear feed is processed and then streamed to users around the world.

![LLS Diagram](/images/uplynk/lls-workflow.png)

As illustrated above, a stream is generated from a live linear feed through the following phases:

1. **Push to Live Slicer**: The existing broadcasting infrastructure pushes a live linear feed to a Live Slicer via either UDP or SDI.

2. **Slicing**: Both the Live Slicer and the Cloud Slicer Live slice, encrypt, and then upload content to the cloud.

3. **Encoding and Storage**: Our cloud encoders encode audio/video into H.264/H.265 and AAC. After encoding, the media is added to cloud storage.

As viewers request the live linear feed, it is served via our CDN service, ensuring an optimal viewing experience by efficiently delivering data worldwide.

<Info>Prevent hotlinking by digitally signing the playback URL.</Info>

<Info>Security measures, such as Blackout, may be applied to the stream to restrict playback to authorized users.</Info>

## Latency  {/*latency*/}

Latency measures the delay between the capture of the source video and when it is displayed to the viewer.

<Info>If you do not see the Playback Latency option, contact Support.</Info>

The following illustration provides an overview of components involved in the workflow from video capture to playback.

![Latency workflow](/images/uplynk/latency.png)

A short explanation of how each of the above components adds latency is provided below.

| Component | Latency Factors |
|---|---|
| Slicer | The amount of time it takes to slice and deliver processed media to our Streaming service. This may be exacerbated by using underpowered hardware or insufficient bandwidth for your encoding profile. |
| Streaming Service | The amount of time it takes to decode, encode, and package sliced media into an adaptive bitrate format. |
| Digital Rights Management (DRM) | The amount of time it takes to request and generate licenses for content protected by DRM. |
| Ad Decision Server | <ul><li>The amount of time it takes to request, bid, and deliver ads to our Streaming service. This may be exacerbated by complicated ad campaigns, a large waterfall, and slow responses by the ad decisioning server and third-party ad providers.</li><li>Ad breaks extending beyond their intended duration due to long ad creatives.</li><li>Delayed ad delivery due to a late notification of an upcoming ad break.</li></ul>|
| CDN | The amount of time it takes to cache and deliver your stream to the player. |
| Player | The amount of time it takes to initialize and then play your stream. This may be exacerbated by clients that use underpowered hardware or that have insufficient bandwidth. |
| Manifest Engine | Decisioning logic that controls the timing and creation of individual manifests for playback by users. |

### Best Practices for Reducing Latency  {/*best-practices-for-reducing-latency*/}

Reduce latency by applying the following best practices:

<Info>The following optimizations are listed in descending order according to the degree to which they will reduce latency.</Info>

| Type  | Optimization(s)|
|-----|-----|
| Playback Profile| <ul><li>Selectable, pre-figured control file with reduced-latency options. Selectable, pre-figured control file that contains the parameters related to reduced-latency options. Used during manifest creation and driven by selectable latency options. Use the drop-down on the Channel's **Details** tab and the Live Event's Config tabs. See [Selecting playback latency](#select-playback-latency) to choose latency options. Selecting a low latency playback option (other than default) may increase the probability of missing content slate and decrease the number of ad fills.</li><li>Contact Professional Services Group for optimization.</li><li>In addition to the selectable latency settings, a variety of factors, such as the hardware on the computer hosting the Live Slicer, ad workflow, encoding profile, and platform/ player affect the latency achieved, the quality of the customer viewing experience, and the ad monetization. Any latency numbers associated with settings are estimates, and your individual results may vary.</li></ul>**Chopping / Dropping Ads**<br /><ul><li>Reduce ad-related latency by chopping or dropping ads exceeding ad break duration.</li><li>Use `ad.flex` to determine ad extension duration.</li></ul>|
| Player | **Client**<ul><li>Use a player (e.g., [THEOplayer](https://www.theoplayer.com/)) that supports two-second media segment files and fast startup times.</li><li>The HLS specification requires that a player wait for three media segments prior to initiating playback. DASH, on the other hand, can initiate playback immediately. This, in theory, allows DASH to offer lower latency than HLS, but in practice, testing has shown little difference between the latencies achieved by HLS or DASH. Different HLS players offer varying degrees of latency.</li><li>Latency may differ based on protocol and player.</li></ul>       |
| Encoding Profile| **Two Second Media Segments**<ul><li>Reduce media segment duration to two seconds for more responsive manifest files and faster playback initiation. This allows the generation of a manifest file that is more responsive to changing conditions (e.g., ad break duration variability). Additionally, it reduces the amount of time that the player must wait before initiating playback. However, it may increase rebuffering for some players.</li><li>Update slate to match segment duration of main content. Using slate that has been encoded as four second media segments when your main content's media segment size is two seconds will cause playback issues. [Learn more about slate](/uplynk/manage/live_events/#set-up-slate).</li><li>Contact customer support to update encoding profile.</li></ul> **B-frames and DRM**<ul><li>Reduce latency by only activating necessary features.</li><li>Use recommended low latency encoding profiles.</li><li>B-frames cause latency if enabled on every ray.</li></ul>         |
| Slate | **Re-encode Slate (Two Second Media Segments)**<ul><li>A player may only switch from slate to your main content once it finishes playing the current media segment. Use slate that has been encoded in two second media segments to reduce the potential amount of time that the player must wait before switching to your main content. This recommendation should be applied regardless of whether your account has been configured to generate two second media segments for your main content.</li><li>System slate is already encoded with two-second media segments.</li></ul>  |
| Slicer| <ul><li>**GPU:** Use Nvidia Tesla T4 GPU to reduce latency and missing content slate. Required at higher resolutions.</li><li>**CPU:** Use Quad-core x86-64 (2GHz) or higher.</li><li>**Memory:** Recommend 64 GB or more of RAM.</li><li>**Upload Bandwidth:** Should exceed encoder bandwidth by 25%. The amount of bandwidth generated by your encoder varies by encoding profile. For example, the default [encoding profile](/uplynk/acquire/encoding_profiles) (i.e., HD 720p25/30) requires 5 Megabits per second (Mbps).</li><li>**Build:** Always use the [latest Live Slicer build](https://cms.uplynk.com/static/cms2/index.html#/downloads) for optimizations.</li></ul> |
| Ads   | <ul><li>**Chopping / Dropping Ads**: Reduce latency by managing ad break duration as noted above.</li><li>**Ad Slate**: Encode all slate, including ad slate, using two-second media segments.</li></ul>  |
| Automation / Playout System| **Ad Break Notifications**: Ensure timely ad breaks in the video stream with SCTE triggers for ad decisioning.       |
| Adaptive Bitrate Streaming | **Format:** Supports both DASH and HLS.   |
| Cloud | **Network Connection:** Optimize egress for encoded media with newer streaming protocols like SRT and RIST, minimizing latency based on network round-trip time.  |

### Select the Playback Latency  {/*select-playback-latency*/}

Default latency for Live Channels and Live Events is 60+ seconds. To reduce latency to ~15 seconds, refer to the Playback Latency for channels and events for setup instructions.

#### Latency Options  {/*latency options*/}

- **Default**: ~60 seconds
- **Low**: Low 20s, 5+ second buffering, Missing Content Slate (MCS) is possible
- **Lower**: Upper teens, 2+ seconds buffering, MCS is possible
- **Lowest**: As low as 15 seconds, minimal buffering, no MCS

<Info>Different protocols and platforms may affect latency beyond the control of Edgio.</Info>

#### Important Considerations  {/*Important-considerations*/}

- Many factors are in play for reduced latency. Any latency numbers referenced by Edgio documentation are estimates. Actual results may vary.
- Reducing latency does not currently work with Time Shifting.
- Inconsistent Slate Slice Duration is not recommended and will give unpredictable latency results.
- Four-second profiles may still work but won’t achieve the desired latency results and are unlikely to produce any video at the lowest setting.
- Two-second profiles without Playback Latency settings will give default delays.
- Existing V1 channels will not see the **Playback Latency** drop-down.
- MCS latency can only be removed via ad-break opportunities or new sessions.
- Player buffering cannot be controlled via Edgio's Streaming service.
- Platform specificity may vary latency by multiple seconds.
- Many factors contribute to latency, so playback latency may vary.
- If using a Channel Scheduler with historical, four-second segment assets, you cannot schedule those assets onto an Edgio-enabled channel.
- The act of ‘Creating’ a CSL slicer will always create (/override) a profile to slicer ID mapping, even if using the default profile. Slicer Resets will not update the mapping.
- Due to continued testing, new technology, and other factors, playback profile parameters used by the manifest engine may change from time to time, without notice.


## Live Timeshifting  {/*live-timeshifting*/}

<Info>Contact your account manager to enable the Live Timeshifting capability on your account.</Info>

The Live Timeshifting capability for HLS allows viewers to fast forward, rewind, or pause / resume for up to one hour from the time they join a live event or a live channel's stream. This capability is achieved by expanding the playback window up to 60 minutes.

Our implementation uses the HLS Playlist Delta Updates standard which allows us to serve historical segments on the media player's initial request and recent changes on subsequent requests. This minimizes the time required to load and maintain a larger playback window for your viewers.

**Key information**

- Historical segments exclude ads. Any ads that occurred before the media player joined the stream will be unavailable for playback. However, ads played after the media player joined the stream should be available for replay.

- If the Live Timeshifting capability is enabled and the hlsver parameter is set to a version lower than 9, then it will be overridden by version 9.

### Requirements  {/*requirements*/}

The Live Timeshifting capability requires:

- A media player that supports HLS 9 or higher.

- A playback URL for a live event or a live channel whose query string includes the hist parameter set to the desired historical playback time in minutes.

**Example**: `hist=50`

**Sample playback URL**:

`https://content.uplynk.com/event/abc580a0080e4d438a09c97a54cc7ab1.m3u8?hist=50`

### Initial and Subsequent Playlist Responses  {/*playlist-responses*/}

The initial playlist response for a playback request that meets the above requirements includes:

- The `CAN-SKIP-UNTIL` tag, which advertises Delta Updates availability, and tells the player how old a segment has to be in order to be skipped.
- The `MEDIA-SEQUENCE` tag set to 0, since this is the first response.
- The full playlist including requested historical playback segments.

**Initial Playlist Response Example**:

```
#EXTM3U

#EXT-X-VERSION:9

#EXT-X-PLAYLIST-TYPE:EVENT

#EXT-X-TARGETDURATION:4

#EXT-X-SERVER-CONTROL:CAN-SKIP-UNTIL=36.0

#EXT-X-MEDIA-SEQUENCE:0

#EXTINF:4.00,

fileSequence0.ts

#EXTINF:4.00,

fileSequence1.ts

#EXTINF:4.00,

fileSequence2.ts

#EXTINF:4.00,

fileSequence3.ts

#EXTINF:4.00,

fileSequence4.ts

...
```

The player decides whether to request a Delta Update by appending the `_HLS_SKIP=YES` directive to the stream request. When a Delta Update is requested, the server skips the old segments and only includes the most recent segments in the manifest. As playback progresses, the server notifies the media player as to:

- The number of segments that have been skipped through the `#EXT-X-SKIP` tag. This tag replaces all the segment URL lines which were added to the playlist before the skip limit.
- The number of segments that have been rolled off through the `#EXT-X-MEDIA-SEQUENCE` tag.
- Delta Updates availability through the `CAN-SKIP-UNTIL` tag.

**Subsequent Playlist Response Example**:

```
#EXTM3U

#EXT-X-VERSION:9

#EXT-X-PLAYLIST-TYPE:EVENT

#EXT-X-TARGETDURATION:4

#EXT-X-SERVER-CONTROL:CAN-SKIP-UNTIL=36.0

#EXT-X-MEDIA-SEQUENCE:266

#EXT-X-SKIP:SKIPPED-SEGMENTS=527

#EXTINF:4.00,

fileSequence793.ts

#EXTINF:4.00,

fileSequence794.ts

#EXTINF:4.00,

fileSequence795.ts

#EXTINF:4.00,

fileSequence796.ts

...
```

## Set up a Live Linear Channel  {/*set-up*/}

Learn how to stream a live linear feed. Alternatively, stream a single live event by taking advantage of our live event streaming capabilities.

**Software Prerequisites**: Linux

**Knowledge Prerequisites**: Basic understanding of Linux

**Key Steps**

1. Create a live channel.
2. Install, configure, and start the Live Slicer.
3. Capture media.
4. Test playback.

### Step 1: Set Up an Account and Sign in  {/*step-1*/}

An account is required to stream content via our service. [Learn more](/uplynk/welcome/portal).

Sign in to the [CMS](https://cms.uplynk.com/).

### Step 2: Create a Live Channel  {/*step-2*/}

A live channel determines how content generated by a Live Slicer will be made available to viewers.

1. From the Streaming section of the CMS, navigate to the **Live Channels** tab.

2. Click **+Channel** from the bottom-left hand corner of the CMS.

3. In the **Channel Name** option, type the name that will be assigned to the live channel.

4. In the **Slicer ID (Optional)** option, type the alphanumeric ID that will be assigned to the live channel.

5. (Optional) Set channel options:
   - Check the **Enabling Scheduling** option to use the advanced scheduling interface and the latest channel APIs.
   - Tick the **Edit after creation** box to open the record after submitting.

6. Click **Create**.

### Step 3: Install the Live Slicer  {/*step-3*/}

1. Install the Live Slicer on a Linux computer. [View minimum system requirements](/uplynk/acquire/live/on_prem_slicer/#pre-requisites).

    <Tip>If you plan on using a Blackmagic DeckLink SDI capture card, then the Live Slicer must be installed on the computer where that card is housed.</Tip>

2. For Live Slicer version 21092100 or higher:
   - Install the `libnl-3.200` library.

     ```bash
     sudo apt install libnl-3-200
     ```

3. Install Python and bzip2 applications.

   ```bash
   sudo apt install python bzip2
    ```
4. Download the Live Slicer by clicking Downloads from the bottom right-hand corner of the CMS and then clicking on the desired OS.

5. Extract the zip file to the desired directory.

    ```
    $ tar -xvf uplynk_slicer_linux_64-231114.04.01.tbz2
    ```

6. Navigate to the newly created directory.

    ```
    $ cd uplynk_slicer_linux_64-231114.04.01-master/
    ```

7. Run install_live.

    ```
    $ sudo ./install_live
    ```
### Step 4: Configure the Live Slicer  {/*step-4*/}

Define Live Slicer settings within the Live Slicer configuration file.

1. Open [`/etc/uplynk.conf`](https://docs.edgecast.com/video/Content/Resources/Supplemental/LiveSlicerConf) in a text editor.

2. Set the `username` setting to the email address associated with your account.

   ```plaintext
   username: joe@example.com
    ```
3. If present, delete the password line.

    ```
    password: samplepassword
    ```

4. If missing, add a line for the apikey setting. Set it to your secret API key. Find you API key via [Integration Keys](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys) > **Settings** tab > **Integration Keys** from the side navigation > **API Keys** section.

    ```
    apikey: abcDEFghiJKLmnoPQRtuvWXYz123ABCdefGHIJKL
    ```

5. Set the slicerID setting to the case-sensitive slicer ID assigned to the channel in step 2.

    ```
    slicerID: marketingvids01
    ```

6. Set the card setting to the number assigned to the Blackmagic capture card that will generate the source feed.

    ```
    card: 1
    ```

### Step 5: Start the Live Slicer  {/*step-5*/}

Start or restart the Live Slicer whenever you modify the Live Slicer configuration file.

Start the Live Slicer using one of the following commands:

- **Upstart**

    ```bash
    sudo start uplynk_liveslicer
    ```

- **systemd**

    ```
    sudo systemctl start uplynk_liveslicer.service
    ```

### Step 6: Start Audio/Video Capture  {/*step-6*/}

Set up the Blackmagic capture card to capture the audio/video feed.

1. Connect an audio and video source to the Blackmagic capture card.

2. Open Blackmagic system preferences and configure the connections as input sources.

3. Open **Preferences** (**Edit** > **Preferences**) and then:
   - Set a project format.
   - Choose a capture file format.
   - Specify a storage location.

4. Close **Preferences** and click on the **Log and Capture** tab.

5. Click **Capture**. The Live Slicer will automatically pick up the feed.

### Step 7: Test the Live Linear Stream  {/*step-7*/}

Congratulations on successfully creating and broadcasting a live linear feed. It is now time to test the stream through the test player provided from the CMS.

<Tip>A link to a test media player that has been exposed to unauthorized individuals may be invalidated at any time by clicking the rubbish bin icon within the live channel's **Test Players** (Warning: Restriction free) section.</Tip>

1. From the **Live Channels** tab in the CMS, make sure that the live channel is selected.

3. Click the **Playback** tab.

4. From the **Test Players** section, follow the **View** link corresponding to the desired test player.

<Info>Please refer to our media player tutorial to learn how to [create a media player](/uplynk/deliver/media_player/add_media_player_to_web_page).</Info>



## More Information  {/*more-information*/}

- [Live Channel Setup](/uplynk/manage/channels)
- [Cloud Slicer Live](/uplynk/acquire/live/cloud_slicer_live)
- [Live Slicer Failover](/uplynk/acquire/live/on_prem_slicer/#failover)
- [Python SCTE Plugin](/uplynk/acquire/live/scte_plugins/#python-scte-plugin)
- [Baseline SCTE Plugin](/uplynk/acquire/live/scte_plugins/#baseline-scte-plugin)

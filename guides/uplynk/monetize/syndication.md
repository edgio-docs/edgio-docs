---
title: Syndication
---

<Info>Contact your account manager to activate Syndication Publishing.</Info>

In addition to streaming content directly to your consumers, you can also simultaneously distribute it to multiple social media and content distribution platforms with minimal effort.

Perform the following steps to set up Syndication Publishing:

1. Create a publishing target for each desired social media or content distribution platform.
2. Publish to the desired platform(s) by associating the desired publishing target(s) with your live channel or live event.

## Publishing Target

Distribute your content to any social media or content distribution platform (e.g., YouTube, Twitch, and TikTok) that supports ingest through any of the following protocols:

- RTMP
- RTMPS
- HLS
- Zixi
- SRT
- RIST

<Info>You may use any of the above protocols to push a live stream to your social media or content distribution platform. Additionally, you may configure your social media or content distribution platform to pull a HLS live stream.</Info>

A publishing target configuration determines how your live stream will be published. Setup varies by platform.

| Platform    | Description     |
|--------|--------|
| AWS Elemental MediaConnect | Provide the following information: <ul><li>A hostname or IP address that points to your AWS Elemental MediaConnect server.</li><li>The ID for the stream to which we will publish content.</li><li>Optional: A password that authorizes our service to publish to a password-protected stream.</li></ul> Configure your AWS Elemental MediaConnect's output to use `Zixi` push. |
| Facebook              | Configure our service to authenticate to Facebook using either of the following methods: <ul><li>**Integrated Authentication**: Leverage credentials defined within a Clipping profile to automatically publish to a Facebook page. [Learn more](#facebook).</li><li>**Stream Key**: Provide a stream key to authorize our service to publish to a specific Facebook page.</li></ul> |
| Pluto TV              | Provide the following information: <ul><li>A hostname or IP address that points to your Pluto TV account (Zixi push).</li><li>The ID for the stream to which we will publish content.</li><li>Optional: A password that authorizes our service to publish to a password-protected stream.</li></ul>  |
| TikTok | Provide a stream key that authorizes our service to publish to a specific TikTok account. |
| Twitch | Provide a stream key that authorizes our service to publish to a specific Twitch channel.|
| YouTube| Configure our service to authenticate to YouTube using either of the following methods: <ul><li>**Integrated Authentication**: Leverage credentials defined within a Clipping profile to automatically create a scheduled live stream within the YouTube Studio dashboard. [Learn more](#youtube).</li><li>**Stream Key**: Provide a stream key to authorize our service to publish to a specific YouTube channel.</li></ul>  |
| Custom | Publish to any social media or content distribution platform using the RTMP, RTMPS, HLS, Zixi, SRT, or RIST protocol. <ul><li>**RTMP or RTMPS - Push**: <br />**Stream URL Syntax**: `{Base Stream URL}/{Stream Key}` <br /> The desired social media or content distribution platform determines whether a stream key must be defined within your stream URL. Please refer to their documentation for more information.</li><li>**HLS - Push**: <br />**Stream URL Syntax**: `{Base Stream URL}/`  <br />**Sample stream URLs**: <br /> `rtmp://platform.example.com/live/3u40-9rqs-502b-7zeq/` <br /> `http://platform.example.com/live/` </li><li>**HLS - Pull**: Our service generates a stream URL once you start publishing to this target. You will need to configure the desired platform to pull the stream using this URL.</li><li>**Zixi - Push**: Publish a feed to a Zixi-enabled device or service via the Zixi protocol by identifying the destination server and a stream ID. Optional: Provide a password for password-protected streams.</li><li>**SRT - Push**: <br />**Stream URL Syntax**: `srt://{Host}:{Port}` </li><li>**RIST - Push**: <br />**Stream URL Syntax**: `rist://{Host}:{Port}` <br /> You may only push an audio/video feed to an even port number. RIST reserves odd port numbers (`{Port}+1`) for error correction use.</li></ul>  |

### Create a Publishing Target

<Info>Contact your account manager to activate Syndication Publishing.</Info>

Setting up a publishing target varies by social media or content distribution platform. Expand the section for the platform to which your content will be published.

#### YouTube

Perform the following steps to create a publishing target for YouTube:

1. **Integrated Authentication Only**

    If you plan to use YouTube credentials defined within a Clipping profile (i.e., integrated authentication), follow these steps:

    - Create a [Clipping profile](/uplynk/manage/clipping/#setup) for YouTube.
    - Verify that a Clipping profile with a YouTube integration exists.

2. Load the [Publishing page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

3. Click **+ New Target** to load the Add Publishing Target dialog box.

4. From the **Target Name** option, assign a unique name to the new publishing target.  The sole purpose of this name is to help you identify this target when publishing content.

5. From the **Platform** option, select **YouTube**.

6. Determine whether our service will connect to YouTube using a stream key or integrated authentication. Perform either of the following steps:

   - **Stream Key:** In the **Stream Key** option, paste your stream key. Refer to YouTube's documentation to find out where your stream key can be found.

   - **Integrated Authentication:**
     - Enable the **YouTube Integrated Authentication** option.
     - From the **Clipping Profile** option, select a Clipping profile whose credentials will be used to authenticate to YouTube. If the desired Clipping profile is not listed, verify that you have defined a YouTube integration within that Clipping profile.

7. Click **Save**.

<Info>Our service will validate your stream key or credentials and attempt to connect to YouTube . If it is unable to connect, then you should either verify the stream key defined in the Stream Key option or update the credentials associated with the Clipping profile selected within the previous step.</Info>

#### Facebook

https://docs.edgecast.com/video/index.html#Setup/Syndication-Publishing.htm%3FTocPath%3DBasic%2520Setup%7C_____10

Perform the following steps to create a publishing target for Facebook:



If you plan to use Facebook credentials defined within a Clipping profile (i.e., integrated authentication), follow these steps:

1. **Integrated Authentication Only**. <br />Perform either of the following steps if you plan on using Facebook credentials defined within a Clipping profile (i.e., integrated authentication):

    - Create a [Clipping profile](/uplynk/manage/clipping/#setup) for Facebook.
    - Verify that a Clipping profile with a Facebook integration exists.

2. Load the [Publishing page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

3. Click **+ New Target** to load the Add Publishing Target dialog box.

4. From the **Target Name** option, assign a unique name to the new publishing target.
   The sole purpose of this name is to help you identify this target when publishing content.

5. From the **Platform** option, select **Facebook**.

6. Determine whether our service will connect to Facebook using a stream key or integrated authentication. Perform either of the following steps:

   - **Stream Key:**In the **Stream Key** option, paste your stream key. Refer to Facebook's documentation to find out where your stream key can be found.

   - **Integrated Authentication:**
     - Enable the **Facebook Integrated Authentication** option.
     - Enable the **Facebook Auto Re-Schedule** option to allow our service to create and then publish a new Facebook live event upon reaching Facebook's live event time limit.
        - Upon reaching Facebook's live event time limit, a new post will be created. Viewers may continue playback by starting that post's live stream.
        - If this option is disabled, your live stream will end upon reaching Facebook's live event time limit.
     - From the **Clipping Profile** option, select a Clipping profile whose credentials will be used to authenticate to Facebook. If the desired Clipping profile is not listed, verify that you have defined a Facebook integration within that Clipping profile.
     - From the **Publish to Facebook Page** option, select the page on which we will create a post for your live stream.

7. Click **Save**.

<Info>Our service will validate your stream key or credentials and attempt to connect to Facebook. If it is unable to connect, you should either verify the stream key defined in the **Stream Key** option or update the credentials associated with the Clipping profile selected in the previous step.</Info>

#### Twitch or TikTok

Perform the following steps to create a publishing target for Twitch or TikTok:

1. Load the [Publishing page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

2. Click **+ New Target** to load the Add Publishing Target dialog box.

3. From the **Target Name** option, assign a unique name to the new publishing target. The sole purpose of this name is to help you identify this target when publishing content.

4. From the **Platform** option, select **Twitch** or **TikTok**.

5. In the **Stream Key** option, paste your stream key.  Please refer to Twitch or TikTok's documentation to find out where your stream key can be found.

6. Click **Save**.

<Info>Our service will validate your stream key and attempt to connect to Twitch or TikTok. If it is unable to connect, you should verify the stream key defined in the **Stream Key** option.</Info>

#### AWS Elemental MediaConnect or Pluto TV

Perform the following steps to create a publishing target:

1. Load the [Publishing Page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

2. Add a New Publishing Target: Click **+ New Target** to open the Add Publishing Target dialog box.

3. Assign a Unique Name: From the **Target Name** option, assign a unique name to the new publishing target. The purpose of this name is to help you identify the target when publishing content.

4. Select the Platform: From the **Platform** option, select either **AWS Elemental MediaConnect** or **Pluto TV**.

5. Enter the Host Information: In the **Host** option, type the hostname or IP address that points to an AWS Elemental MediaConnect server or Pluto TV server.

6. Specify the Port: In the **Port** option, type the port on which the server identified in the previous step listens.

7. Enter the Stream ID: In the **Stream ID** option, type your stream ID.

8. Optional: Set a Password: In the **Password** option, type a password for password-protected streams (if applicable).

9. Click **Save**.

<Info>Our service will attempt to establish a connection to the AWS Elemental MediaConnect or Pluto TV server. If it is unable to connect, verify the configuration defined above.</Info>

#### Custom (RTMP, RTMPS, HLS, Zixi, SRT, or RIST)

Perform the following steps to create a custom publishing target for RTMP, RTMPS, HLS, Zixi, SRT, or RIST live stream:

1. Load the [Publishing Page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

2. Add a New Publishing Target: Click **+ New Target** to open the Add Publishing Target dialog box.

3. Assign a Unique Name: From the **Target Name** option, assign a unique name to the new publishing target. Note: The purpose of this name is to help you identify the target when publishing content.

4. Select the Platform: From the **Platform** option, select **Custom**.

5. Select the Protocol: From the **Protocol** option, select the protocol through which your video feed will be transmitted to a social media or content distribution platform.

6. Define how our service will connect to a social media or content distribution platform.

    - **RTMP or RTMPS - Push**

        In the **Stream URI** option, paste the platform's base stream URL. If the platform requires a stream key, then you should append it to this URL.

        <Tip>If the base stream URL does not include a trailing slash, please append it before pasting the stream key.</Tip>

        <Tip>Please refer to the documentation provided by the desired social media site to find out where your stream URL(s) and stream key(s) can be found.</Tip>

        **Sample RTMP stream URL:** `rtmp://platform.example.com/live/3u40-9rqs-502b-7zeq`

    - **HLS - Push**

        In the **Stream URI** option, paste the platform's base stream URL.

        **Syntax**: `https://platform.example.com/live/`


    - **HLS - Pull**

        Proceed to the next step.

        **More Information**: Our service generates a stream URL once you start publishing to this target. You will need to configure the desired social media or content distribution platform to pull the stream using this URL.

    - **Zixi - Push**

        1. Set up a live stream on your Zixi-enabled device or service.
        2. In the **Host** option, type the hostname or IP address for your Zixi-enabled device or service.
        3. In the **Port** option, type the port on which your Zixi-enabled device or service is listening.
        4. In the **Stream ID** option, type the ID assigned to the stream by your Zixi-enabled device or service.
        55. Optional. In the **Password** option, type the stream's password.

    - **SRT - Push**

        Use the following syntax when defining the **Stream URI** option: `srt://{Host}:{Port}`

    - **RIST - Push**

        Use the following syntax when defining the **Stream URI** option: `rist://{Host}:{Port}`

        <Tip>You may only push an audio/video feed to an even port number. RIST reserves odd port numbers (Port+1) for error correction use.</Tip>

7. Click **Save**.

<Info>Our service will validate your stream URL and attempt to connect to the social media or content distribution platform. If it is unable to connect, then you should verify the stream URL and stream key defined in the Stream URI option.</Info>

#### Modify a Publishing Target

1. Load the [Publishing Page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

2. Select the Publishing Target: Click on the desired publishing target.

3. Modify the Settings: Adjust the desired settings as needed.

4. Click **Save**.

## Deleting a Publishing Target

1. Ensure No Active Channels or Events: Make sure that no live channel or live event is publishing to the target(s) you want to delete.

2. Load the [Publishing Page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing): Navigate to **Settings > Publishing**.

3. Select the Targets to Delete: Mark each publishing target that will be deleted.

4. Delete the Targets: Click **Delete # Target(s)**.

5. Confirm Deletion: When prompted, confirm the deletion by clicking **Yes, Delete**.

## Publishing

Once you have created a publishing target configuration, follow these steps to publish your stream:

1. **Add the Target**: Add the target to your live channel or live event.

2. **Set Stream Quality**: Set the quality of the stream that will be published.

3. **Publish the Stream**: Initiate the publishing process.

### Key Information

- **Stream Quality Restrictions**
  - Social media or content distribution platforms may impose restrictions on stream quality.
  - The performance of your stream can be influenced by factors such as the platform's capacity.

- **Performance Tip**: To improve performance, consider publishing a lower quality stream.

- **SCTE-35 Markers**
  - Publishing via HLS (push/pull) or Zixi (push) supports **SCTE-35 marker** insertion through the SCTE-35 Marker Transmission option.
  - **SCTE-35 Marker Insertion:**
    - **Live Channel:** Whenever an ad break occurs.
    - **Live Event:** For key events defined within your live event's marker template.
  - Each SCTE-35 event's UPID field is set to the external ID of the live channel or live event.

- **Status Information**: Status information is provided for each target associated with your live channel or live event.

    | Status | Description |
    |---|---|
    | active | Indicates that your live channel or live event is currently being published to that target. |
    | stopped | Indicates that your stream is not being published to the target. |
    | scheduled | Indicates that your stream has been scheduled to be published to this target. This status occurs immediately after you start publishing a target and it should only last for a few seconds. |
    | error | Indicates that your stream could not be published to the target due to an error.<br />Examples:<ul><li>Our service was unable to connect to the social media or content distribution platform using the provided stream URL.</li><li>A social media or content distribution platform's limitation has been exceeded.</li></ul> |

- Encode all content, including slate, at the same resolution.

    <Info>Encoding content at different resolutions may cause your stream to be published at a sub-optimal resolution or bitrate. Additionally, it may cause large bitrate jumps or drop when switching between content.</Info>

    **Example**
    Let's assume that your stream contains:
    - 720p slate
    - 1080p content

    If your stream started with slate and you published your target with `High` video quality, then the resolution of your published stream may be capped at 720p.

- You may [add query string parameters](#publish-content-to-a-platform) to the playback URLs defined within the manifest file for the stream published to your social media or content distribution platform.

    <Info>[Playback URL parameters](/uplynk/deliver/playback_urls/customize_playback_via_parameters) provide more control over the live stream pushed to your social media or content distribution platform. For example, you may use them to include ad parameters or to add an artificial playback delay.</Info>

### Publish Your Content to a Platform

1. **Create a Publishing Target**.  Repeat this step as needed.

2. **HLS (Push/Pull)**: Slice content to the desired live channel or live event.

3. **Add Publishing Target Configuration** to your live channel or live event. Repeat this step as needed.

   - **Navigate to the Publish Tab** by clicking the desired live channel or live event. Click the **Publish** tab.

   - **Add a Target** by clicking **Add Target**.

   - **Select a Publishing Target** created in step 1.

   - **Determine Stream Quality**
      - **HLS (Push/Pull):**
        - From the **Rays** section, mark each ray that will be published to a social media or content distribution platform. Clear all other rays.
        - If the Rays section is empty, try slicing content to your live channel or live event.
        - The encoding profile determines the available rays.
      - **All Other Targets:**
        - Set the quality of the published stream through the **Video Quality** option, relative to your encoding profile.

    - **Optional: Enable SCTE-35 Markers** for HLS (Push/Pull) or Zixi: Toggle the **SCTE-35 Marker Transmission** option to enable SCTE-35 markers within the published stream.

    - **Optional: Set Output Location**
      - From the **Output Location** option, determine where your stream will be converted to a feed that may be ingested by the platform.
      - The recommended configuration is **Default**, which lets our system determine the optimal location. Set a specific location only under specific circumstances (e.g., locale-specific publishing).

4. **YouTube (Integrated Authentication) Only**

   - **Set Video Title** from the **YouTube Title** option.

   - **Set Video Description** from the **YouTube Description** option.

   - **Set Privacy Level** from the **YouTube Privacy** option. Set the video's privacy level to either **Public**, **Private**, or **Unlisted**.

   - **Specify Audience**
      - From the **Audience - is this video made for kids?** option, choose whether the content was "made for kids."
      - [Learn how to determine whether your content is "made for kids."](https://support.google.com/youtube/answer/9528076?hl=en)

5. **Facebook (Integrated Authentication) Only**

   - **Set Video Title** from the **Facebook Title** option.

   - **Set Video Description** from the **Facebook Description** option.

   - **Optional: Define Query String Parameters**
      - Define the query string parameters to be added to the playback URLs in the manifest file.
      - Verify that the **Key-Value Parameters** option is enabled.
      - Define a query string parameter by setting a key and a value, then click **Add**.
      - Repeat steps ii and iii as needed.
      - Remove a query string parameter by clicking **Remove**.

   - **Optional: Test Connection** by clicking **Test** to verify that our service can connect to the social media or content distribution platform.

   - **Complete Setup**
      - Click **Done**.
      - Click **Add**.
      - Click **Publish** to start publishing your stream to the desired platform.

6. **HLS Pull Only**

    Configure each desired social media or content distribution platform to pull the HLS stream published in the previous step. Perform the following steps to copy a publishing target's HLS URL.

      - Once the publishing target is in **Active** status, click on it to open it.
      - Find the **HLS Master URL** option and click **Copy** to copy the URL for pulling the HLS stream.

7. **Configure Platforms**
      - **Facebook or YouTube (Integrated Authentication):**
        - Upon detecting a stream, we will automatically submit a "go live" request.
      - **All Other Platforms:**
        - Start your live stream from within each social media or content distribution platform.

            <Info>If using a stream key for Facebook or YouTube, manually start your live stream.</Info>

### Stop Publishing

1. **Navigate to the Publish Tab** by clicking the desired live channel or live event and then the **Publish** tab.

2. **Stop Publishing** by clicking the **X** next to the desired publishing target. Repeat this step as needed for other targets.

3. **Navigate to the Publish Tab** for the desired live channel or live event.

4. **Select the Publishing Target**.

3. **Stop Publishing (If Active)**
   - If your content is currently being published to that target, click **Stop Publishing**.
   - Once the target's status indicates that it has been stopped, click on the desired publishing target again.

4. **Adjust Stream Quality** from the **Video Quality** option.

5. **Publish or Save Changes**
   - If you are ready to start publishing, click **Publish**.
   - Otherwise, click **Done** to save your changes.

### Remove a Publishing Target from a Live Channel or Live Event

1. **Navigate to the Publish Tab** by clicking the desired live channel or live event and then the **Publish** tab.

2. **Select Targets to Remove**.

3. **Remove the Targets** by clicking **Delete** (rubbish bin icon).

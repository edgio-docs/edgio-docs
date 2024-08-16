---
title: Syndication
---

<Info>Contact your account manager to activate Syndication Publishing.</Info>

In addition to streaming content directly to your consumers, you can also simultaneously distribute it to multiple social media and content distribution platforms with minimal effort.

Perform the following steps to set up Syndication Publishing:

1. Create a publishing target for each desired social media or content distribution platform.
2. Publish to the desired platform(s) by associating the desired publishing target(s) with your live channel or live event.

## Publish a Target  {/*publish-a-target*/}

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
| Facebook   | Configure our service to authenticate to Facebook using either of the following methods: <ul><li>**Integrated Authentication**: Leverage credentials defined within a Clipping profile to automatically publish to a Facebook page. [Learn more](#facebook).</li><li>**Stream Key**: Provide a stream key to authorize our service to publish to a specific Facebook page.</li></ul> |
| Pluto TV   | Provide the following information: <ul><li>A hostname or IP address that points to your Pluto TV account (Zixi push).</li><li>The ID for the stream to which we will publish content.</li><li>Optional: A password that authorizes our service to publish to a password-protected stream.</li></ul>  |
| TikTok | Provide a stream key that authorizes our service to publish to a specific TikTok account. |
| Twitch | Provide a stream key that authorizes our service to publish to a specific Twitch channel.|
| YouTube| Configure our service to authenticate to YouTube using either of the following methods: <ul><li>**Integrated Authentication**: Leverage credentials defined within a Clipping profile to automatically create a scheduled live stream within the YouTube Studio dashboard. [Learn more](#youtube).</li><li>**Stream Key**: Provide a stream key to authorize our service to publish to a specific YouTube channel.</li></ul>  |
| Custom | Publish to any social media or content distribution platform using the RTMP, RTMPS, HLS, Zixi, SRT, or RIST protocol. <ul><li>**RTMP or RTMPS - Push**: <br />**Stream URL Syntax**: `{Base Stream URL}/{Stream Key}` <br /> The desired social media or content distribution platform determines whether a stream key must be defined within your stream URL. Please refer to their documentation for more information.</li><li>**HLS - Push**: <br />**Stream URL Syntax**: `{Base Stream URL}/`  <br />**Sample stream URLs**: <br /> `rtmp://platform.example.com/live/3u40-9rqs-502b-7zeq/` <br /> `http://platform.example.com/live/` </li><li>**HLS - Pull**: Our service generates a stream URL once you start publishing to this target. You will need to configure the desired platform to pull the stream using this URL.</li><li>**Zixi - Push**: Publish a feed to a Zixi-enabled device or service via the Zixi protocol by identifying the destination server and a stream ID. Optional: Provide a password for password-protected streams.</li><li>**SRT - Push**: <br />**Stream URL Syntax**: `srt://{Host}:{Port}` </li><li>**RIST - Push**: <br />**Stream URL Syntax**: `rist://{Host}:{Port}` <br /> You may only push an audio/video feed to an even port number. RIST reserves odd port numbers (`{Port}+1`) for error correction use.</li></ul>  |

### Create a Publishing Target  {/*create-a-publishing-target*/}

<Info>Contact your account manager to activate Syndication Publishing.</Info>

Setting up a publishing target varies by social media or content distribution platform. Expand the section for the platform to which your content will be published.

#### YouTube  {/*youtube*/}

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

#### Facebook  {/*facebook*/}

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

#### Twitch or TikTok  {/*twitch-or-tiktok*/}

Perform the following steps to create a publishing target for Twitch or TikTok:

1. Load the [Publishing page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

2. Click **+ New Target** to load the Add Publishing Target dialog box.

3. From the **Target Name** option, assign a unique name to the new publishing target. The sole purpose of this name is to help you identify this target when publishing content.

4. From the **Platform** option, select **Twitch** or **TikTok**.

5. In the **Stream Key** option, paste your stream key.  Please refer to Twitch or TikTok's documentation to find out where your stream key can be found.

6. Click **Save**.

<Info>Our service will validate your stream key and attempt to connect to Twitch or TikTok. If it is unable to connect, you should verify the stream key defined in the **Stream Key** option.</Info>

#### AWS Elemental MediaConnect or Pluto TV  {/*aws*/}

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

#### Custom (RTMP, RTMPS, HLS, Zixi, SRT, or RIST)  {/*custom*/}

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

#### Modify a Publishing Target  {/*modify-a-publishing-target*/}

1. Load the [Publishing Page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing) by navigating to **Settings > Publishing**.

2. Select the Publishing Target: Click on the desired publishing target.

3. Modify the Settings: Adjust the desired settings as needed.

4. Click **Save**.

## Delete a Publishing Target  {/*delete-a-publishing-target*/}

1. Ensure No Active Channels or Events: Make sure that no live channel or live event is publishing to the target(s) you want to delete.

2. Load the [Publishing Page](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing): Navigate to **Settings > Publishing**.

3. Select the Targets to Delete: Mark each publishing target that will be deleted.

4. Delete the Targets: Click **Delete # Target(s)**.

5. Confirm Deletion: When prompted, confirm the deletion by clicking **Yes, Delete**.

## Publish   {/*publish*/}

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

### Publish Content to a Platform  {/*publish-content-to-a-platform*/}

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

### Stop Publishing  {/*stop-publishing*/}

1. **Navigate to the Publish Tab** by clicking the desired live channel or live event and then the **Publish** tab.

2. **Stop Publishing** by clicking the **X** next to the desired publishing target. Repeat this step as needed for other targets.

### Modify Publishing Stream Quality

1. **Navigate to the Publish Tab** for the desired live channel or live event.

2. **Select the Publishing Target**.

3. **Stop Publishing (If Active)**
   - If your content is currently being published to that target, click **Stop Publishing**.
   - Once the target's status indicates that it has been stopped, click on the desired publishing target again.

4. **Adjust Stream Quality** from the **Video Quality** option.

5. **Publish or Save Changes**
   - If you are ready to start publishing, click **Publish**.
   - Otherwise, click **Done** to save your changes.

### Remove a Publishing Target from a Live Channel or Live Event  {/**/}

1. **Navigate to the Publish Tab** by clicking the desired live channel or live event and then the **Publish** tab.

2. **Select Targets to Remove**.

3. **Remove the Targets** by clicking **Delete** (rubbish bin icon).

## Publish Jobs  {/*publish-jobs*/}

Adding a publishing target to a live channel or live event creates a publishing job in the stopped state. This publishing job identities:

- A live channel or live event.
- A publishing target.
- The job's [current status](#publishing).
- The timestamp at which the job was last started and stopped.

**Key information**:

- View all of your publishing jobs from the [Jobs tab](https://cms.uplynk.com/static/cms2/index.html#/settings/publishing/jobs) of the Publishing page. To access, from the main menu, navigate to **Settings**. Click **Publishing** from the side navigation pane. Click the **Jobs** tab.
- Filter your jobs by performing the following steps:

  1. Click the filter funnel icon.
  2. Optional. Click on either **Channel** or **Live Event** to filter for all jobs associated with either a live channel or a live event.
  3. Optional. Mark or clear each status according to whether jobs with that status should be displayed or hidden.
  4. Click **Apply**.
- Use this consolidated view of your publishing jobs to quickly assess the state of syndication publishing across your entire account.

<Tip>For example, use this consolidated view to quickly identify what is currently being published from your account by filtering for publishing jobs in the active state.</Tip>

### Publish Job Event Notifications  {/*publish-job-event-notifications*/}

Publish key publishing job events through the following workflow:

1. Syndication Publishing pushes data to Amazon SNS for any of the following events:

    | Severity | Event |
    |---|---|
    | Info | A user starts a publishing job. |
    | Info | A user stops a publishing job. |
    | Warning | Syndication Publishing restarts a publishing job. This typically occurs when the initial attempt to start a publishing job fails. |
    | Warning | Syndication Publishing was unable to communicate with the social media or content distribution platform. |
    | Critical | Syndication Publishing could not start or restart a publishing job. This event only occurs after multiple attempts to start or restart the publishing job have failed. |
    | Critical | Syndication Publishing was forced to stop the publishing job. |

2. Amazon SNS broadcasts data to one or more destination(s) (e.g., mobile device, web server, or Slack).

<Info>Get started with Amazon SNS for free through its SNS free tier. [Learn more](https://aws.amazon.com/sns/pricing/).</Info>

<Info>Syndication Publishing [formats data using JSON](#key-publishing-job-notification-fields). This data may then be filtered via custom code. This article explains how to strip out additional data generated by Amazon SNS via a custom function in Amazon Lambda.</Info>

### Get Started with Publishing Job Notifications  {/*get-started-with-publishing-job-notifications*/}

Perform the following steps to set up Syndication Publishing notifications:

1. [Set up an Amazon SNS topic](#set-up-an-amazon-sns-topic).
2. [Configure communication](#configure-communication-with-amazon-sms) between Syndication Publishing and Amazon SNS.
3. Configure Amazon SNS to broadcast notifications to the desired destination(s).

    [Learn how to set up Amazon SNS and Lambda to broadcast notifications to a Slack channel](#slack-integration).

#### Set up an Amazon SNS Topic  {/*set-up-an-amazon-sns-topic*/}
Amazon SNS communicates with publishers and subscribers through a "topic." For this purpose of this article, Syndication Publishing will assume the role of a publisher, while a Slack channel will assume the role of the subscriber.

<Info>Amazon SNS may be configured to broadcast data to multiple types of subscribers (e.g., web server, mobile device, email, etc.).</Info>

Perform the following steps to create a topic:

1. Sign in to the Amazon AWS Management console. If you don't have an AWS account, then [sign up for one](http://docs.aws.amazon.com/sns/latest/dg/SNSBeforeYouBegin.html).
2. Open the [Amazon SNS console](https://console.aws.amazon.com/sns/).
3. Click **Get started**.

    <Tip>Amazon SNS may require Amazon SES (i.e., Amazon Simple Email Service). Please sign up for the Amazon SES service if an error message appears within the SNS dashboard.</Tip>

4. From the upper-right hand corner, change your location to ` US West (Oregon) us-west-2`
5. Click **Topics** from the side navigation pane.
6. Click **Create topic**.
7. Click **Standard**.

    <Info>Our service does not support pushing notifications to a First-In-First-Out (FIFO) topic.</Info>

8. In the **Name** option, assign a unique name (e.g., syndication-publishing) to the topic.
9. Optional. If notifications will be sent over SMS notifications, then set the Display name option to the desired name.
10. Expand the Access policy section.
11. From the Define who can publish messages to the topic option, select Only the specified AWS accounts. Set the Only these AWS users option to our AWS account ID: `545191325524`
12. Click **Create topic**.
13. Copy the topic's ARN.

#### Configure Communication with Amazon SNS  {/*configure-communication-with-amazon-sns*/}

Syndication Publishing requires an ARN topic before it will push data to Amazon SNS. Perform the following steps:

1. Navigate to the SNS tab of the Syndication Publishing page. From the main menu, navigate to **Settings**. From the side navigation pane, click **Publishing**. Click on the **SNS** tab.

2. In the **SNS Topic ARN** setting, paste the ARN for the topic created above.
3. Click **Save**.

#### Integrating Slack with Amazon SNS  {/*integrating-slack-with-amazon-sns*/}

<Info>Amazon SNS can broadcast notifications to different subscribers (e.g., mobile devices) using a variety of delivery methods (e.g., HTTP, email, AWS Lambda, etc.).</Info>

The configuration that has been performed up to this point allows the Syndication Publishing to send notifications to Amazon SNS. This section explains how to push those notifications from Amazon SNS to a Slack channel. Integrating Amazon SNS involves the following steps:

1. Set up a Slack webhook.
2. Create an Amazon Lambda function that subscribes to the Amazon SNS topic.

#### Set up a Slack Webhook  {/*set-up-a-slack-webhook*/}

Slack requires that a webhook be created before it will post messages from external sources (e.g., Amazon SNS).

[Learn how to create a Slack webhook](https://api.slack.com/messaging/webhooks#getting_started).

#### Subscribe to a SNS Topic via Amazon Lambda  {/*subscribe-to-a-sns-topic-via-amazon-lamda*/}

Amazon SNS needs to be informed of the above webhook before it can send data to a Slack channel. This task may be performed via Amazon Lambda. Amazon Lambda is a compute service that runs code in response to events (e.g., when data is pushed from a Syndication Publishing to Amazon SNS).

[View Amazon Lambda's documentation](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

This article creates a Lambda function in Python that performs the following tasks:

- Subscribes to a SNS topic.
- Identifies the Slack webhook through which it will post messages to a Slack channel.
- Strips out data added by Amazon SNS.

<Tip>Add custom code to this function to tailor how messages are posted to a Slack channel (e.g., filter notifications by Syndication Publishing).</Tip>

Perform the following steps to create a Lambda function:

1. Open the [Amazon Lambda console](https://console.aws.amazon.com/lambda/).
2. Click **Get Started Now**.
3. Click **Blank Function**.
4. Click the dashed box and then select **SNS** as the trigger for this function.
5. Verify that the SNS topic created earlier in this article is selected in the SNS topic option.
6. Mark the **Enable trigger** option.
7. Click **Next**.
8. Configure the Lambda function as follows:

    - **Name**: Set the **Name** option to the name of the function (e.g., forward_to_slack).
    - **Description**: Set the **Description** option to a brief description for the purpose of the function (e.g., Send Syndication Publishing information to a Slack channel.).
    - **Runtime**: Set the **Runtime** option to "Python 2.7."
    - **Code**: Set the **Lambda function code** option to the following code:

      ```json
      import json
      import urllib2

      def forward_to_slack (event, context):
          # The URL for your Slack Channel's webhook
          url = "https://hooks.slack.com/services/ABCDE1234/FGHIJ5678/KLMNOPQRSTUV901234567890"

          # Format the message
          try:
              # Try to navigate to the Message that was sent via SNS and strip out the
              #  rest of the delivery information
              slack_data = {"text":str(event['Records'][0]['Sns']['Message'])}
          except:
              slack_data = {"text":str(event)}

          # Dump the json to prepare it for sending
          data = json.dumps(slack_data)

          # Create the request
          req = urllib2.Request(url, data)

          # Send request
          urllib2.urlopen(req)
      ```

      Update the webhook URL defined in the code to point to the one copied in the Setting up a Slack Webhook section.

    - **Handler**: Set the **Handler** option to "lambda_function." and then append the name of the function defined in the Name option (e.g., `lambda_function.forward_to_slack`).

    - Role: Set the **Role** option to "Create new role from template(s)."

    - Role name: Set the **Role name** option to the name that will be assigned to the new role (e.g., lambda_basic_execution).

    - Click **Next**.

9. Amazon Lambda will now allow you to review the function that will be created. Verify that the correct SNS topic has been selected and that the Lambda function configuration looks similar to the following illustration:

    ![Amazon Lamda function](/images/uplynk/lamda.png)

10. Click **Create function**.

Amazon Lambda will now automatically post data to a Slack channel as it is provided by Syndication Publishing.

#### Key Publishing Job Notification Fields  {/*key-publishing-job-notification-fields*/}

Syndication Publishing sends information that describes a key publishing job event in JSON format. Key parameters in this notification are described below.

| Field         | Description|
|---------------|------|
| **Subject**   | Provides a simple description of the publishing job event that triggered this notification. <br /> **Syntax:** `Syndication Notification - {Severity} - {Event} - {Timestamp}` <br /> **Example:** `"Syndication Notification - Info - Job started by user - 2021-12-10_21:15:55",` |
| **Message**   | Provides detailed information about the publishing job event. Key parameters are described below.|
| Date_Time | Indicates when the notification was triggered.|
| Severity  | Indicates whether it is an Info, Critical, or Warning notification. |
| Message   | Describes the type of notification.|
| Description | Provides additional event information. For example, this parameter may indicate the reason why a publishing job could not be started.       |
| Schedule_Id | Indicates the publishing job's system-defined ID.|
| Target_Name | Indicates the publishing target's name.     |
| Protocol  | Indicates the publishing target's protocol.   |
| Platform  | Indicates the publishing target's social media or content distribution platform.|
| Content_Name | Indicates the name of the live channel or live event associated with the publishing job.        |
| Content_Id | Indicates the system-defined ID of the live channel or live event associated with the publishing job.         |
| Content_Type | Identifies whether this publishing job is associated with a live channel or live event. Valid values are: <br /> - `c`: Live channel <br /> - `e`: Live event |
| **Example**   | `"{"Service": "syndication", "Sender": "syndication", "Date_Time": "2021-12-10_21:15:55", "Severity": "Info", "Message": "Job started by user", "Description": "", "Schedule_Id": "23f1ed53db5e4538b6a0b31183fad807", "Target_Name": "YouTubePT", "Protocol": "rtmp", "Platform": "YouTube", "Content_Name": "Entertainment", "Content_Id": "c8929b67f1354607877b319edb0c01af", "Content_Type": "c"}"` |

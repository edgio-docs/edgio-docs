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
5. Click **Yes, Delete** to confirm the deletion.

## Cloud Slicer Live Administration  {/**/}

Before creating a CSL slicer, you must first perform the following steps:

1. **Identify the Region** (e.g., Oregon or Ohio) where your CSL slicer will be created.

2. **Identify the Streaming Protocol** through which your feed will be published to a CSL slicer. A CSL slicer supports the following protocols: `RTP | RTMP | SRT | RIST`

<Info>The SRT streaming protocol requires slicer version 22060200 or higher.</Info>

3. **[Create an Ingest Point](#create-an-injest-point)** point within the region identified in step 1.

### Key Information  {/*key-info*/}

- You may assign a custom slicer configuration to your CSL slicer. You can define this custom configuration by:
  - Importing settings from a file
  - Manually adding settings
  - A combination of both

- You may import settings from a file. We support the following formats:
  - **Text File**: Import a file that uses the same format as a Live Slicer configuration file. Specify each [desired setting](configuration-file-settings) on a separate line.
  - **JSON**: Import a file containing [settings](#configuration-settings) defined as key-value pairs using JSON notation.

    [Learn more](#slicer-configuration-file).

- Our service manages certain slicer configuration settings. You should not manually assign these [reserved settings](#reserved-slicer-settings) to your CSL slicer.

### Create a CSL Slicer  {/*create-slicer*/}

1. Navigate to [**Hosted Slicers**](https://cms.uplynk.com/static/cms2/index.html#/slicers/): Go to **Slicers** > **Hosted Slicers** from the left navigation of the main page.
2. Click **+ Create Slicer**.
3. From the **Ingest Point** section, select an ingest point that corresponds to the region where this slicer will be hosted and the streaming protocol for the feed that it will ingest.
   - Click **Select Ingest Point**.
   - Select the ingest point that will be assigned to the CSL slicer.
   - Click **Save**.
    - RTP, SRT, and RIST
        - In the **Source IP Address** option, type the IP address from which your feed will be pushed. Our service will only ingest feeds served from this IP address. Allow your feed to be pushed from any IP address by setting this option to `0.0.0.0`.
        - Regardless of how this setting is configured, the encoder pushing the feed to our service must authenticate to our service by passing the CSL slicer's streaming key. <br />[Learn more](#SRT).

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

### Customize a Slicer     {/*customize-a-slicer*/}

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

You may define slicer configuration settings using the same format as a Live Slicer configuration file. Specify each [desired setting](#confiuration-settings) on a separate line.

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

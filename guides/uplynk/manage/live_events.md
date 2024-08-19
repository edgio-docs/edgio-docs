---
title: Live Events
---

Broadcast an event (e.g., concert, sporting event, lecture, etc.) in near real-time by leveraging a live event.

<Info>If you require a continuous live stream, consider using a live channel instead.</Info>

Our live event service allows you to:

- Test your stream prior to the start of the event.
- Control the audio/video feed source.

    An Operator Controls:

    - When and which Live Slicer will slice content.
    - The timing and duration of ad breaks.
    - When slate should be inserted into the stream.
- Mark key events within your stream.

**Key Information**

- Scheduled live events may be tracked within a calendar.
- A live event must have a starting and ending point.
- A live event's playback URL may be signed to control how and when the live event may be viewed. [Learn more](/uplynk/deliver/playback_urls/#sign-playback-urls-with-a-token).

- The source of a live event may consist of multiple Live Slicers. This setup allows manual failover to a backup Live Slicer when the live feed from the primary Live Slicer is unavailable or suboptimal.

- [Slate](#slate) will be displayed under the following conditions:

    - Prior to the start of the live event.
    - Upon the completion of the live event.
    - During an ad break when ad content is missing.
    - Outside of an ad break when the Live Slicer is not producing content.

    Slate may also be manually inserted into the broadcast.

- A live event may be configured to allow on-demand playback upon its completion. This setup will generate a CMS asset upon the completion of the live event. Although this asset will exclude slate, it will contain ad breaks.


## Quick Start
Set up a live event by performing the following steps:

1. [Configure a Live Slicer for use with live events](#set-up-a-live-slicer).
2. [Set up a live event configuration](#set-up-a-live-event-configuration).
3. [Set up and distribute a media player](#set-up-a-media-player).
4. [Broadcast the live event](#broadcast-a-live-event).
5. Optional. [Provide on-demand access to the completed live event](on-demand-content).

## Set up a Live Slicer

An alternative to the Live Slicer is the [CameraSlicer](#cameraslicer). It provides a simplified streaming solution when the full functionality and flexibility provided by the Live Slicer and the Live Events Dashboard are not needed.

**Prepare the Live Slicer to stream a live event**

1. Verify that the latest version of the Live Slicer (231114.04.01) is installed.<br />[View Live Slicer release notes](https://cms.uplynk.com/static/cms/news.html)

2. Verify that the system time on the computer hosting the Live Slicer is accurate. Use Network Time Protocol (NTP) to sync your Linux server's time with a public time server.

      The Live Events Dashboard uses UTC time to schedule certain commands to the Live Slicer. Therefore, inaccurate system time on the computer hosting the Live Slicer may lead to synchronization issues.

   **Sample synchronization issues**:
   - It could prevent the Live Slicer from ending an event and thereby cause the Live Slicer to perpetually slice content into an orphaned live event.
   - It may prevent on-demand content from being generated for the live event.

3. Define the following settings in the Live Slicer configuration file (`/etc/uplynk.conf`):

   ```ini
   api_port: 127.0.0.1:65009
   preview: on
   livepreview_with_audio: on
   livepreview_max_viewers: 2
   ```
    Additional information for each of the above Live Slicer settings is provided below.

    - **api_port**: Verify that the Live Slicer has been configured to listen for API requests on a specific port.
    - **preview**: Enables the live preview capability within the Live Events Dashboard.
    - **livepreview_with_audio**: Enables audio within the Live Events Dashboard's live preview when using Live Slicer version 22083100 or higher.
    - **livepreview_max_viewers**: Limits the number of simultaneous viewers of a live preview.

        Each instance of a live preview consumes resources on the computer hosting the Live Slicer. This setting is designed to prevent performance issues by capping the number of simultaneous connections.

4. **Recommended**: Secure the communication between the Live Slicer and the Live Events Dashboard through the use of SSL/TLS.

<Warning>If a Live Slicer is not configured to support TLS, then browsers may not properly load the Live Events Dashboard due to the page containing a mixture of HTTP and HTTPS content. Some browsers display a warning icon in the address bar to indicate this issue. An operator may then choose to accept this potential security threat by configuring the browser to allow insecure content.</Warning>

### Set up SSL/TLS

#### Set up Automatically

The Live Slicer may communicate with the Live Events Dashboard over SSL/TLS. The use of TLS secures all transferred data by encrypting it.

**Set up TLS for the Live Slicer**

A TLS certificate may be automatically generated by the CMS, downloaded, and then installed on the computer hosting the Live Slicer by performing the following steps:

1. Verify that the Live Slicer is hosted on a computer with a public IP address.

2. Update the Live Slicer configuration file (`/etc/uplynk.conf`) with the following changes and then save your changes:

   - Set the `ssl_port` setting to the desired port.

     **Example:** `ssl_port: 65010`

   - If present, remove the `ssl_cert` and `manual_ip` settings.

3. Verify that your firewall is configured to allow traffic on the port defined by the `ssl_port` setting.

4. Restart the Live Slicer.

#### Set up TLS Certificate Manually

Configure the Live Slicer to communicate over HTTPS by generating and installing a TLS certificate on the computer hosting it.

1. Register a domain for each desired Live Slicer via a domain registrar (e.g., Dyn, Namecheap, GoDaddy, or Freenom). The recommended setup for multiple Live Slicers is to use subdomains (e.g., `ls1.example.com`, `ls2.example.com`, `ls3.example.com`, etc.). These subdomains may then be secured via a single wildcard SSL certificate.

2. Obtain a TLS certificate:
   - **Order a TLS certificate** from a Certificate Authority (e.g., DigiCert, GoDaddy, or Let's Encrypt).
   - **Generate a self-signed TLS certificate.**
     - **Self-Signed SSL Certificate:** This type of setup requires configuring each browser that connects to the Live Events Dashboard to trust this TLS certificate.

3. Store the TLS certificate on the computer hosting the Live Slicer.

4. Define the following settings in the Live Slicer configuration file: (`/etc/uplynk.conf`):

| Live Slicer Configuration | Description |
|-------------------------------|-----------------|
| `ssl_port: 65010`             | Define the port through which the Live Slicer will send and receive TLS traffic. This sample configuration uses port 65010 for TLS traffic, but it can be configured to any available port. |
| ssl_cert: `/Path/SSLCertificate.pem` | Identify the TLS certificate through which data will be encrypted by replacing the following variables: <ul><li>`Path`: Replace this with the path to the directory where the desired TLS certificate resides.</li><li>`SSLCertificate`: Replace this with the TLS certificate's filename.</li></ul> <br /> -  |
| manual_ip: `DomainName`       | Defines the hostname through which TLS traffic will flow. |

5. **Optional. Self-Signed SSL Certificates Only**: Perform the following steps from each web browser that will load the Live Events Dashboard:

    - Load a Live Slicer's test page.

        **Syntax**: `https://{Live Slicer Hostname}:{SSL Port}/testpage`

        **Sample URL**: `https://ls1.example.com:65010/testpage`

    - Upon receiving a TLS warning, configure the browser to trust the self-signed SSL certificate.
    - Verify that the browser can now connect to the Live Events Dashboard.
    - Repeat this procedure for each desired Live Slicer.

**Dynamic IP Addresses**<br />Typically, the computer hosting the Live Slicer should be assigned a static IP address. However, there are certain conditions (e.g., slicing at a conference behind a firewall) under which the computer hosting the Live Slicer may be assigned a dynamic IP address. A workaround for this type of setup is to use [ngrok](https://ngrok.com/) to expose a local server behind a NAT or firewall to the internet. Ngrok will generate a TLS-enabled URL for that server. After which, modify the `manual_ip` Live Slicer configuration setting to point to this URL.

## Set up a Live Event Configuration

<Info>This section explains how to set up a live event for use with a Live Slicer. Live event setup is slightly different when using the [CameraSlicer](#cameraslicer).</Info>

<Info>A live event may also be created or updated via the [Live Events Integration API.](https://docs.edgecast.com/video/Content/Develop/Live-Events.htm)</Info>

A live event must be scheduled before it can be broadcasted. At its core, setting up a live event consists of:

- Defining when it will start and/or end: Starting with Live Slicer version 21071400, our service uses system time, as determined by Network Time Protocol (NTP), to identify when to perform a scheduled start or stop of your live event.

- Determining whether its playback URL must be signed.

- Determining whether the live event will be made available as on-demand content upon its completion.

- Defining the external ID through which a playback URL may be generated.

- Defaulting appropriate live event configurations (e.g., slate, content expiration, the ability to resume a live event, etc.) from the [Slate](https://cms.uplynk.com/static/cms2/index.html#/settings/slate) and [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) pages located under the Settings tab.

#### Set up a Live Event

1. Navigate to the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page. From the main menu, navigate to **Events** > **Live Events**.

2. Click **+Event**.

3. In the **Event Name** option, assign a unique name to the live event.

4. Click **Create**. Tick the box to edit the event after creation.

5. Optional: Perform the following actions from the Details tab:

   - **Schedule the Live Event:** Assign the desired start and stop date/time through the Scheduled Start Time and Scheduled Stop Time options. Set the **Auto Start/Stop** option to "Yes" to automatically run the live event according to the schedule.
   - **Define an External ID:** Assign a unique ID to the live event through the External ID option. This ID may be used to generate a playback URL.

6. Optional: From the **Config** tab, define live event settings, such as:
   - Assigning an operator.
   - Determining the post-event playback experience for new viewers.
   - Deciding whether a token will be required for playback.
   - Setting up slate.
   - Configuring how long content generated from the live event will be kept.

        **Playback Latency**: Select the level of latency behind live for this event:
        - **Default:** ~60 seconds
        - **Low:** Low 20s, 5+ second buffering, Missing Content Slate (MCS) is possible
        - **Lower:** Upper teens

7. From the Slicers tab, type the name of the desired Live Slicer in the **Slicer ID** option and then click **+ Add**.

    <Info>The specified name must be a case-sensitive match to the value defined in the `slicerID` setting of the Live Slicer configuration file.</Info>

    <Info>For your convenience, suggested Live Slicers will be provided as you type.</Info>

    **Manage this suggestion list**

    <Tip>The easiest way to add a Live Slicer to the suggestion list is to click **Yes** when adding the desired Live Slicer to a live event configuration.</Tip>

    Manage this suggestion list from the **Live Event Slicers** section of the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page. The Account Slicers list displays a list of all Live Slicers that have ever sliced content to your account, while the Live Event Slicers section defines the set of Live Slicers that will be suggested when setting up a live event configuration.

8. Optional. From the **Pod Format** tab, define the ad pods that will be associated with the live event.

    [**Add a Set of Ad Pods by Importing a CSV File**](#add-a-set-of-ad-pods-by-importing-a-csv-file)

    [**Manually Define Ad Pods**](#manually-define-ad-pods)

9. Optional. From the **Metadata** tab, define the metadata that will be associated with the live event.

    [**Add Metadata by Importing a CSV File**](#add-metadata-by-importing-a-csv-file)

    [**Manually Define Metadata**](#manually-define-metadata)

10. The Playback tab contains a playback URL, test Flash/HTML5 players, and HTML embed code. Use this information to test your live event and set up a media player.
11. Click **Save**.

#### Copy a Live Event

1. Select the desired live events from the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/live-events) page.

2. Click **Duplicate \{n\} Events**.

3. If a live event selected in step 1 contains metadata, you will be prompted to review the fields that will be added to the new live event:
   - Exclude metadata from the new live event by clicking the rubbish-bin icon that appears to the right of each desired field.
   - Click **Duplicate** when finished.
   - Clicking **Close** will prevent that live event from being copied.

4. A copy of each live event selected in step 1 will be created. Each new live event will be named `Copy of {Live Event}`.

**What are the differences between a live event and its duplicate?**

Duplicating a live event will not generate an exact copy. Unique or live event-specific settings within the new live event will be cleared or reset to a default value. These settings are listed below.

| Setting | Value |
|---|---|
| Assets | Blank |
| Auto Start/Stop | No |
| External ID | Blank |
| Logs | The following two actions will be logged:<ul><li>Event Created</li><li>Event Copied from `{Live Event ID}`.</li></ul><br /> |
| Playback | The following changes will be applied to playback settings:<ul><li>**URLs**: New playback URLs.</li><li>**Test Players**: Default test player. Custom test players associated with the source live event will not be carried over to the new live event.</li><li>**Embed**: New embed HTML code.</li></ul> |
| Scheduled Start Time | Blank |
| Scheduled Stop Time | Blank |
| Status Information | The following status information will be set:<ul><li>**State**: Pre Event</li><li>**Testing**: Not Started</li><li>**GUID**: New GUID</li><li>**Actual Start Time**: Hasn't Started</li><li>**Actual Stop Time**: Hasn't Ended </li></ul><br /><br /><br /><br />|

#### Add a Set of Ad Pods by Importing a CSV File

1. Verify that your CSV file uses an ad pod-compatible format.
2. From the **Add Pod** pane, click **Browse...**.
3. Navigate to the desired CSV file, select it, and then click **Open**.
4. Click **Import from CSV**.

    The **Pod Format** tab will be populated by the ad pods defined within the selected CSV file. Ad pods will be listed according to the order in which they were defined in the CSV file.

#### Manually Define Ad Pods

1. From the **Add Pod** pane, specify a unique name for the ad pod under the **Name** option.

2. In the **Duration** option, specify the duration of the ad pod. Format: `hh:mm:ss`

3. Click **+ Add**.

4. Optional. Add metadata that will be sent to the third-party ad server when the ad pod is queued up by an operator.

    - Select the newly created ad pod.
    - From the **Add Metadata** pane, specify a unique name in the **Key** option.
    - In the Value option, specify the value for the key being created.
    - Click **+ Add**.
    - Optional. Add an additional key/value pair by repeating the steps above.

5. Repeat steps 1 - 4 as needed.

6. Click **Save**.

[Learn more](#ad-pods).

#### Add Metadata by Importing a CSV File

1. Verify your CSV's format and data.

- **Format**: The format should follow either of the following conventions:

    | Type | Description |
    |---|---|
    | Columns | This format requires all key names to be defined in the first row.<br />Example:<br />`Key1,Key2,Key3`<br />`Value1,Value2,Value3` |
    | Rows | This format requires all key names to be defined in the first column.<br />Example:<br />`Key1,Value1`<br />`Key2,Value2`<br />`Key3,Value3` |

- **Data**: Verify that the CSV's data does not conflict with metadata that has already been associated with the live event.

<Warning>Importing a CSV will overwrite metadata fields when a key with the same name is found.</Warning>

2. From the **Add Metadata** pane, **click Browse...**.
3. Navigate to the desired CSV file, select it, and then click **Open**.
4. Click **Import** from CSV. The **Metadata** tab will be populated by the metadata defined within the selected CSV file. Metadata fields will be listed according to the order in which they were defined in the CSV file.

#### Manually Define Metadata

1. From the **Add Metadata** pane, specify a unique name for the metadata field under the **Key** option.

2. In the **Value** option, specify the value for the key being created.

3. Click `+ Add`.

4. Optional: Add an additional key/value pair by repeating steps 1 - 3.

5. Click **Save**.

### Ad Pods

An ad pod defines an ad break window and associates metadata with it.

**Methods to Take an Ad Break**

- **Live Event Configuration:**
   - An operator may queue up and then take an ad pod that was defined within the live event's **Pod Format** tab prior to the start of the live event.
   - Once the ad pod's duration has elapsed, the live event will automatically switch back to the **Slicer** source.

- **Manually:** An operator may start and end an ad pod during a live event by switching the source between **Slicer** and **Ad Break**.

- **API:** The Live Slicer API contains several endpoints (i.e., [`pod_start`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#podstart), [`pod_end`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#podend), and [`replace_pod`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#replacepod)) through which ad pods may be triggered.

**Ad State Alerts**

You may configure the Live Events Dashboard to alert the operator when a live event is in an ad state for a specified number of minutes. Once enabled, a warning will be displayed 15 seconds prior to the specified number of minutes. After the specified time limit has elapsed, a critical alert will replace the warning.

- **Set up a default alert configuration** through the **Default Ad Break Warning (min)** option from the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page.
- **Override this default setting on a per live event basis** by opening the desired live event, clicking the **Config** tab, and then setting the **Ad Break Warning (mins)** option to the desired number of minutes.

#### Ad Pod CSV Setup

Quickly add multiple ad pods to a live event configuration by importing a CSV file. Define the following fields within that CSV file:

# Ad Pod Fields

| Field | Description |
|---|---|
| Name<br />**Required** | Assigns a unique name to an ad pod. |
| Duration<br />**Required** | Assigns a duration to the ad pod.<br />Specify duration in seconds or the time formats defined below.<ul><li>`Seconds`</li><li>`hh:mm:ss`</li><li>`mm:ss`</li></ul> |
| KeyName | Assigns a key/value pair to the ad pod.<br />Key information:<ul><li>Add a field for each desired key.</li><li>Set the name of each field to the desired key name.</li><li>A key/value pair will only be associated with an ad pod when a value for that key has been defined.</li></ul>|

<Tip>Use a spreadsheet application (e.g., Excel or Google Sheets) to quickly create CSV files. Make sure that the first row in the spreadsheet contains the above fields.</Tip>

**Sample CSV File**

The following sample CSV file contains two required fields (i.e., Name and Duration) and two fields that define key/value pairs (i.e., Type and Region):

```
Name,Duration,Type,Region
Widgets,30,Informational,
Conference,45,Conference,US
Event 1,90,Event,
Event 2,120,Event,
Event 3,150,Event,
```

Importing this sample CSV file will add the following ad pods to the live event configuration:

![Ad Pods Example](/images/uplynk/ad-pods-example.png)

Notice that only the Conference ad pod contains two key/value pairs. The other ad pods were only assigned a single key/value pair, since the second key/value field (i.e., Region) was not assigned a value for those ad pods.

### Live Event Authorization

A live event may be created, viewed, and operated by either the owner of the account or any authorized user. Authorization may be granted to other users via the following permissions:

| Permission | Description |
|---|---|
| Read | Allows a user to view detailed information for each live event associated with your account.<br />Either the **Write** or the **Assigned** permission is required to operate a live event. |
| Write | Allows a user to modify and operate any live event associated with your account. |
| Assigned | Identifies a user as a potential operator for the live events associated with your account. In addition to this permission, authorization must be granted to this user on a per live event basis. After which, the user will be allowed to operate authorized live events via the Live Events Dashboard. |

Permissions may be defined on a per user basis from the [Account Access](https://cms.uplynk.com/static/cms2/index.html#/settings/account-access) page. Navigate to this page by clicking the **Settings** tab and then clicking **Account Access Settings** from the side navigation tab.

## Tutorial  {/*tutorial*/}

## CameraSlicer  {/*cameraslicer*/}

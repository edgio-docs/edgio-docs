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

- [Slate](#set-up-slate) will be displayed under the following conditions:

    - Prior to the start of the live event.
    - Upon the completion of the live event.
    - During an ad break when ad content is missing.
    - Outside of an ad break when the Live Slicer is not producing content.

    Slate may also be manually inserted into the broadcast.

- A live event may be configured to allow on-demand playback upon its completion. This setup will generate a CMS asset upon the completion of the live event. Although this asset will exclude slate, it will contain ad breaks.


## Quick Start  {/*quick-start*/}

Set up a live event by performing the following steps:

1. [Configure a Live Slicer for use with live events](#set-up-a-live-slicer).
2. [Set up a live event configuration](#set-up-a-live-event-configuration).
3. [Set up and distribute a media player](#set-up-a-media-player).
4. [Broadcast the live event](#broadcast-a-live-event).
5. Optional. [Provide on-demand access to the completed live event](#on-demand-content).

## Set up a Live Slicer  {/*set-up-a-live-slicer*/}

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

### Set up SSL/TLS  {/*set-up-ssl-tls*/}

#### Set up Automatically  {/*set-up-automatically*/}

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

#### Set up TLS Certificate Manually  {/*set-up-tls-certificate-manually*/}

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
| `ssl_port: 65010`  | Define the port through which the Live Slicer will send and receive TLS traffic. This sample configuration uses port 65010 for TLS traffic, but it can be configured to any available port. |
| ssl_cert: `/Path/SSLCertificate.pem` | Identify the TLS certificate through which data will be encrypted by replacing the following variables: <ul><li>`Path`: Replace this with the path to the directory where the desired TLS certificate resides.</li><li>`SSLCertificate`: Replace this with the TLS certificate's filename.</li></ul> |
| manual_ip: `DomainName`       | Defines the hostname through which TLS traffic will flow. |

5. **Optional. Self-Signed SSL Certificates Only**: Perform the following steps from each web browser that will load the Live Events Dashboard:

    - Load a Live Slicer's test page.

        **Syntax**: `https://{Live Slicer Hostname}:{SSL Port}/testpage`

        **Sample URL**: `https://ls1.example.com:65010/testpage`

    - Upon receiving a TLS warning, configure the browser to trust the self-signed SSL certificate.
    - Verify that the browser can now connect to the Live Events Dashboard.
    - Repeat this procedure for each desired Live Slicer.

**Dynamic IP Addresses**<br />Typically, the computer hosting the Live Slicer should be assigned a static IP address. However, there are certain conditions (e.g., slicing at a conference behind a firewall) under which the computer hosting the Live Slicer may be assigned a dynamic IP address. A workaround for this type of setup is to use [ngrok](https://ngrok.com/) to expose a local server behind a NAT or firewall to the internet. Ngrok will generate a TLS-enabled URL for that server. After which, modify the `manual_ip` Live Slicer configuration setting to point to this URL.

## Set up a Live Event Configuration  {/*set-up-a-live-event-configuration*/}

<Info>This section explains how to set up a live event for use with a Live Slicer. Live event setup is slightly different when using the [CameraSlicer](#cameraslicer).</Info>

<Info>A live event may also be created or updated via the [Live Events Integration API.](https://docs.edgecast.com/video/Content/Develop/Live-Events.htm)</Info>

A live event must be scheduled before it can be broadcasted. At its core, setting up a live event consists of:

- Defining when it will start and/or end: Starting with Live Slicer version 21071400, our service uses system time, as determined by Network Time Protocol (NTP), to identify when to perform a scheduled start or stop of your live event.

- Determining whether its playback URL must be signed.

- Determining whether the live event will be made available as on-demand content upon its completion.

- Defining the external ID through which a playback URL may be generated.

- Defaulting appropriate live event configurations (e.g., slate, content expiration, the ability to resume a live event, etc.) from the [Slate](https://cms.uplynk.com/static/cms2/index.html#/settings/slate) and [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) pages located under the Settings tab.

#### Set up a Live Event  {/*set-up-a-live-event*/}

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
        - **Default:** 60 seconds
        - **Low:** Low 20s, 5+ second buffering, Missing Content Slate (MCS) is possible
        - **Lower:** Upper teens

7. From the Slicers tab, type the name of the desired Live Slicer in the **Slicer ID** option and then click **+ Add**.

    <Info>The specified name must be a case-sensitive match to the value defined in the `slicerID` setting of the Live Slicer configuration file.</Info>

    <Info>For your convenience, suggested Live Slicers will be provided as you type.</Info>

    **Manage this suggestion list**

    <Tip>The easiest way to add a Live Slicer to the suggestion list is to click **Yes** when adding the desired Live Slicer to a live event configuration.</Tip>

    Manage this suggestion list from the **Live Event Slicers** section of the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page. The Account Slicers list displays a list of all Live Slicers that have ever sliced content to your account, while the Live Event Slicers section defines the set of Live Slicers that will be suggested when setting up a live event configuration.

8. Optional. From the **Pod Format** tab, define the ad pods that will be associated with the live event.

    [**Add a Set of Ad Pods by Importing a CSV File**](#add-a-set-of-ad-pods-csv)

    [**Manually Define Ad Pods**](#manually-define-ad-pods)

9. Optional. From the **Metadata** tab, define the metadata that will be associated with the live event.

    [**Add Metadata by Importing a CSV File**](#add-metadata-by-importing-a-csv-file)

    [**Manually Define Metadata**](#manually-define-metadata)

10. The Playback tab contains a playback URL, test Flash/HTML5 players, and HTML embed code. Use this information to test your live event and set up a media player.
11. Click **Save**.

#### Copy a Live Event  {/*copy-a-live-event*/}

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
| Logs | The following two actions will be logged:<ul><li>Event Created</li><li>Event Copied from `{Live Event ID}`.</li></ul>|
| Playback | The following changes will be applied to playback settings:<ul><li>**URLs**: New playback URLs.</li><li>**Test Players**: Default test player. Custom test players associated with the source live event will not be carried over to the new live event.</li><li>**Embed**: New embed HTML code.</li></ul> |
| Scheduled Start Time | Blank |
| Scheduled Stop Time | Blank |
| Status Information | The following status information will be set:<ul><li>**State**: Pre Event</li><li>**Testing**: Not Started</li><li>**GUID**: New GUID</li><li>**Actual Start Time**: Hasn't Started</li><li>**Actual Stop Time**: Hasn't Ended </li></ul>|

#### Add a Set of Ad Pods by Importing a CSV File  {/*add-a-set-of-ad-pods-csv*/}

1. Verify that your CSV file uses an ad pod-compatible format.
2. From the **Add Pod** pane, click **Browse...**.
3. Navigate to the desired CSV file, select it, and then click **Open**.
4. Click **Import from CSV**.

    The **Pod Format** tab will be populated by the ad pods defined within the selected CSV file. Ad pods will be listed according to the order in which they were defined in the CSV file.

#### Manually Define Ad Pods  {/*manually-define-ad-pods*/}

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

#### Add Metadata by Importing a CSV File  {/*add-metadata-by-importing-a-csv-file*/}

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

#### Manually Define Metadata  {/*manually-define-metadata*/}

1. From the **Add Metadata** pane, specify a unique name for the metadata field under the **Key** option.

2. In the **Value** option, specify the value for the key being created.

3. Click `+ Add`.

4. Optional: Add an additional key/value pair by repeating steps 1 - 3.

5. Click **Save**.

### Ad Pods  {/*ad-pods*/}

An ad pod defines an ad break window and associates metadata with it.

**Methods to Take an Ad Break**

- **Live Event Configuration:**
   - An operator may queue up and then take an ad pod that was defined within the live event's **Pod Format** tab prior to the start of the live event.
   - Once the ad pod's duration has elapsed, the live event will automatically switch back to the **Slicer** source.

- **Manually:** An operator may start and end an ad pod during a live event by switching the source between **Slicer** and **Ad Break**.

- **API:** The Live Slicer API contains several endpoints (i.e., [`pod_start`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#podstart), [`pod_end`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#podend), and [`replace_pod`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#replacepod)) through which ad pods may be triggered.

**Ad State Alerts**

You may configure the Live Events Dashboard to alert the operator when a live event is in an ad state for a specified number of minutes. Once enabled, a warning will be displayed 15 seconds prior to the specified number of minutes. After the specified time limit has elapsed, a critical alert will replace the warning.

- **Set up a default alert configuration** through the **Default Ad Break Warning (min)** option from the [Live Events](https://cms.uplynk.com/static/cms2/index.html/#settings/live-events) page.
- **Override this default setting on a per live event basis** by opening the desired live event, clicking the **Config** tab, and then setting the **Ad Break Warning (mins)** option to the desired number of minutes.

#### Ad Pod CSV Setup  {/*ad-pod-scv-setup*/}

Quickly add multiple ad pods to a live event configuration by importing a CSV file. Define the following fields within that CSV file:

#### Ad Pod Fields  {/*ad-pod-fields*/}

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

### Live Event Authorization  {/*live-event-authorization*/}

A live event may be created, viewed, and operated by either the owner of the account or any authorized user. Authorization may be granted to other users via the following permissions:

| Permission | Description |
|---|---|
| Read | Allows a user to view detailed information for each live event associated with your account.<br />Either the **Write** or the **Assigned** permission is required to operate a live event. |
| Write | Allows a user to modify and operate any live event associated with your account. |
| Assigned | Identifies a user as a potential operator for the live events associated with your account. In addition to this permission, authorization must be granted to this user on a per live event basis. After which, the user will be allowed to operate authorized live events via the Live Events Dashboard. |

Permissions may be defined on a per user basis from the [Account Access](https://cms.uplynk.com/static/cms2/index.html#/settings/account-access) page. Navigate to this page by clicking the **Settings** tab and then clicking **Account Access Settings** from the side navigation tab.

#### Authorize a User as an Operator  {/*authorize-a-user-as-an-operator*/}

1. Grant the **Assigned** permission to the desired user from the **Account Access Settings** page. If the operator requires the capability to view or make changes to a live event prior to its start, then grant the **Read** and **Write** permissions as well.

   <Info>Users who have been granted the **Write** permission may operate any live event and therefore do not require authorization on a per live event basis. Skip the following two steps for this type of user.</Info>

2. Navigate to the [**Live Events**](https://cms.uplynk.com/static/cms2/index.html#/live-events/events) page. From the main menu, navigate to **Events** > **Live Events**.
3. Select the desired live event to open it.
4. Click the **Config** tab.
5. From the **Event Operator** option, select the user identified in step 1.
6. Click **Save**.

### Content Expiration  {/*content-expiration*/}

A live event may generate the following types of content:

- **Temporary Live Event Assets**: The primary and each backup Live Slicer will generate temporary audio/video assets. These assets are stitched together to form the live stream and on-demand content.
- **CMS Asset**: An asset that replicates the viewing experience of the live event will be added to the CMS library upon its completion. Live events with a duration longer than 8 hours will be split into multiple assets.

    [Learn more](#on-demand-content).

**Account-Level Settings:**

- A default content expiration policy may be defined from the [**Live Events**](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page. Define the desired content expiration policy through the settings in the **Content Expiration** section. These settings determine whether the CMS asset and the temporary assets generated from the live event will be automatically deleted once the specified number of hours have elapsed from the completion of the live event.
    <Info>A minimum content expiration policy of 150% of the duration of the live event is automatically applied to the temporary assets generated for all live events.</Info>

**Live Event Configuration:**
- Override the default expiration policy for the CMS asset generated for a live event through the **VOD Auto Expire Hours** option.

Valid values are:

- `<Blank Value>`: The default expiration policy will be honored.
- `0`: The asset generated from the live event will be immediately deleted from the CMS library.
- `<Hours>`: The asset generated from the live event will be deleted from the CMS library after the specified number of hours have elapsed.

### Markers

Mark key events within your live event via markers. A marker is a custom tag that can be applied to a specific moment within your live event. Marking an event adds it to:

- **Live Events**: Adds a log entry. View your live event's log data via the **EVENT DETAILS** tab of the **Live Events** Dashboard and the Logs tab of your live event configuration.

    **Log event syntax**: `Event Marker Set: {Marker Type}:{Marker Name}`

- [**Live Event Status Reporting**](#live-event-status-reporting): Triggers an `event` whose event property uses the following syntax:

    `"event": "Event Marker Set: {Marker Type}:{Marker Name}",`

- **Live Stream**: Adds an ID3 tag, which is a text information frame (TXXX frame), to the live stream.
- [**Get Live Events API**](https://docs.edgecast.com/video/Content/Develop/Live-Events.htm#GetLiveEvents): Returns marker log data within the `markers` list.

<Info>Each marked event logs the type of marker, the name of the marker, and the specific moment at which the live event was marked.</Info>

#### Marker Setup  {/*marker-setup*/}

Setting up markers requires:

1. Creating a marker template that contains the set of markers that may be applied to your live event.
2. Assigning the desired marker template to your live event.

<Info>Assign a template by loading the desired live event configuration, verifying that the Details tab is active, and then selecting the desired template from the Marker Template option.</Info>

Once you have performed both of the above steps, your live event operator can mark key events using the set of markers corresponding to the marker template assigned to the live event.

**Create a Marker Template**

1. Navigate to the [Marker Templates](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events/marker-templates) tab: Go to the **Live Events** page and click on the **Marker Templates** tab.

2. Click **+ Marker Template**.
3. From the **Marker Template Name** option, type the name that will be assigned to the new template and then click **Add**.
4. Select the new template from the list.

5. Add a Marker Category:
   - Click **+ Type**.
   - From the **Type Name** option, type the name of the marker category.
   - Click **Add**.
   - Repeat the previous step as needed to add more categories.

6. Add a Marker to the Template:
   - Select the desired marker type to expand it.
   - From the **Marker Name** option, type the name that will be assigned to the marker.
   - Click **Add**.
   - Repeat the previous step as needed to add more markers.

7. Click **Save**.

#### Mark Key Events Within a Live Event  {/*mark-key-events-within-a-live-event*/}

1. Verify that the desired marker template has been assigned to your live event configuration.

2. Start Live Event: Open the Live Event Dashboard and [start your live event](#broadcast-a-live-event).

3. Select Marker<br />In the **Markers** section, select the desired marker by performing the following steps:
     - From the **Type** option, select the desired type of marker.
     - From the **Tag** option, select the desired marker.
     - If the desired marker is not listed, type the name of the desired marker and press **ENTER**. It will then be added to the list of available markers for the duration of your Live Event Dashboard session. To permanently add this marker for future live events, follow the instructions in the **Create a marker template** procedure.

4. Wait until the desired moment in the live event, then click **Mark** to use the selected marker to add a marked event to your log data, live stream, and Live Event Status Reporting.

5. Repeat steps 3 and 4 as needed.

## Set up Slate  {/*set-up-slate*/}

Slate may either be:

- **Automatically Inserted**: Slate will be automatically triggered under the following conditions:

    - **Pre-Event Slate**: Prior to the start of a live event.
    - **Post-Event Slate**: Directly after the completion of a live event.
    - **Ad Slate**: During an ad break when ad content is not being received.
    - **Missing Content Slate**: During a live event when both of the following conditions are true:
        - The Live Slicer is not producing content.
        - The live event is not in an ad break.

    Define default pre-event, post-event, ad, and missing content slate from the [Slate page](https://cms.uplynk.com/static/cms2/index.html#/settings/slate). You may [override this default configuration](#configure-live-event-slate) when setting up your live event. Additionally, a live event's pre-event slate may also be manually set from the **Live Events** Dashboard prior to the start of the live event.

- **Manually Inserted**: The Live Events Dashboard allows slate content to be manually inserted during a live event by selecting the desired asset from within the Live Events Dashboard's Switcher pane.

    **Key Information:**

    - Slate that is manually inserted into a live event is known as mid-event slate.
    - Prior to the start of your live event, you may select a CMS library for mid-event slate through the **Mid Slate Library** option from your live event's **Config** tab. The assets associated with that library will be available for selection when inserting mid-event slate during a live event.
    - If you enable the **VOD Replayable** option on your live event, our service will generate an asset through which your live event can be replayed as on-demand content. Each time you insert slate into your live event, you must choose whether that asset will contain the slate content being inserted.

        - **Include** slate within the VOD asset generated by your live event:

            1. Open the configuration for the desired live event and set the **Enable Slate in VOD Replay** option to **Yes**. You cannot set the **Enable Slate in VOD Replay** option to Yes if a live event has been configured to use slate from a CMS library shared with your account.

            2. From the Live Events Dashboard, find the desired asset under the **Mid Event Slate** section and click on **Save to Replay**. Use the **Save to Replay** option to include the entire mid-slate asset within the asset generated for VOD replay of your live event. This occurs regardless of whether the live event operator chooses to add only a portion of that mid-event slate asset or loops it multiple times. If the live event operator loops a mid-event slate asset multiple times, it will be included only once for that instance of slate.

        - **Exclude** slate from the VOD asset: From the Live Events Dashboard, find the desired asset under the **Mid Event Slate** section and click to the left of the **Save to Replay** cell. If the **Save to Replay** cell is not present, you may click anywhere on the desired asset.

#### Configure a Live Event's Slate   {/*configure-live-event-slate*/}

1. Navigate to the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/live-events/events) page. From the main menu, navigate to **Events** > **Live Events**.

2. Select a Live Event that has not yet started.

3. Click the **Config** tab.

4. At the bottom of the page, view the default pre-event, post-event, ad, or missing content slate.

5. Change the default pre-event, post-event, ad, or missing content slate:
     - Click **Change** that appears directly below the desired slate.
     - Select the desired asset.

    <Info>You may only choose an asset from the [default CMS library](#define-a-default-slate-configuration) for the type of slate being configured.</Info>

6. Optional: If you want to include mid-event slate within the VOD replay asset of your live event, enable the **Enable Slate in VOD Replay** option.

    <Info>If you enable this option, also select a CMS library that you own in the next step. If you select a shared CMS library, the live event operator will be unable to include mid-event slate within the VOD replay asset, regardless of this option's status.</Info>

7. From the **Mid Slate Library** option, select the desired CMS library.
     <Info>All assets within the selected library will be available for selection as source content from the **Switcher** pane of the Live Events Dashboard.</Info>

8. Click **Save**.

#### Define a Default Slate Configuration  {/*define-a-default-slate-configuration*/}

1. From the [Content tab](https://cms.uplynk.com/static/cms2/index.html#/content), organize assets that will serve as slate content into one or more CMS libraries.

    <Info>You may assign different libraries for each type of slate.</Info>

2. Navigate to the [Slate](https://cms.uplynk.com/static/cms2/index.html#/settings/slate) page. From the main menu, navigate to **Settings** > **Slate**.

3. Click on the **Slate Types** tab.

4. **Ad Slate**: Perform the following steps to set the default asset that will be broadcast as slate during an ad break when ad content is not being received:

    - Set the **Ad Slate Library** option to the CMS library that contains assets that may be used as ad slate.
    - Set the **Ad Slate** option to the desired asset.

5. **Missing Content Slate**: Perform the following steps to set the default asset that will be broadcast as slate when content is not being received and the live event is not in an ad break:

    - Set the **Missing Content Slate Library** option to the CMS library that contains assets that may be used as missing content slate.
    - Set the **Missing Content Slate** option to the desired asset.

6. Click on the **Live Event Slates** tab.

7. **Pre-Event Slate**: Perform the following steps to set the default asset that will be broadcast as slate prior to the start of a live event:

    - Set the **Pre Event Slate** Library option to the CMS library that contains assets that may be used as pre-event slate.
    - Set the **Pre Event Slate** option to the desired asset.

    <Tip>The asset that will serve as pre-event slate may be changed prior to the start of the live event from within the **Live Events** Dashboard.</Tip>

8. **Mid-Event Slate**: Set the **Mid Event Slate Library** option to the CMS library that contains assets that may be used as mid-event slate.

    <Info>All assets within the selected library will be available for selection as source content from within the Switcher pane of the Live Events Dashboard.</Info>

    <Tip>An asset for your live event may be generated upon its completion. The option to include mid-event slate within that asset is only available when inserting slate using an asset that you own.</Tip>

9. **Post-Event Slate**: Perform the following steps to set the default asset that will be broadcast as slate after the live event has completed:

    - Set the **Post Event Slate Library** option to the CMS library that contains assets that may be used as post-event slate.
    - Set the **Post Event Slate** option to the desired asset.

10. Click **Save**.

### Post-Event Slate Duration  {/*pose-event-slate-duration*/}

After the end of a live event, post-event slate will automatically play in one of the following modes:

- **Loop Indefinitely**: The post-event slate will play continuously on loop.
- **Play Through One Time**: The post-event slate asset will be played only once.
- **Set Time Duration in Minutes**: The post-event slate will play for the specified number of minutes.

<Info>The `EXT-X-END` tag will be included in the HLS manifest file to indicate the end of post-event slate. It is up to a media player to interpret this tag. [Learn more](https://developer.apple.com/library/content/technotes/tn2288/_index.html#//apple_ref/doc/uid/DTS40012238-CH1-EVENT_PLAYLIST).</Info>

To set one of the above modes, navigate to the **Post Event Slate Duration** section of the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page.

## Set up a Media Player  {/*set-up-a-media-player*/}

<Info>A single playback URL allows the playback of the live event as a live stream and on-demand content.</Info>

**To set up a media player for use with a live event**

1. Generate a playback URL using either the live event's ID (i.e., GUID) or external ID.

    - **Event ID**: An event ID is automatically generated upon creating a live event.

    <Info>Copy a playback URL by navigating to the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/live-events/events) page, viewing the desired live event, clicking the Playback tab, and then clicking copy from under the **HLS URL** option.</Info>

    **Syntax**: `https://content.uplynk.com/event/LiveEventID.m3u8`


    - **External ID**: An external ID may be assigned to a live event upon its creation or modification.

    **Syntax**:<br />`https://content.uplynk.com/event/ext/<OwnerID>/LiveEventExternalID.m3u8`

2. If the live event configuration requires a token for playback, then create a script that [signs the playback URL](/uplynk/deliver/playback_urls/#signing_playback_urls_with_token).
3. Point the media player to the live event using the above playback URL.
4. Distribute the media player to the desired viewers.

<Tip>If you are setting up a HLS player, you may add support for fast forwarding, rewinding, or pausing and resuming through the Live Timeshifting capability.</Tip>

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
| Encoding Profile| **Two Second Media Segments**<ul><li>Reduce media segment duration to two seconds for more responsive manifest files and faster playback initiation. This allows the generation of a manifest file that is more responsive to changing conditions (e.g., ad break duration variability). Additionally, it reduces the amount of time that the player must wait before initiating playback. However, it may increase rebuffering for some players.</li><li>Update slate to match segment duration of main content. Using slate that has been encoded as four second media segments when your main content's media segment size is two seconds will cause playback issues. [Learn more about slate](#set-up-slate).</li><li>Contact customer support to update encoding profile.</li></ul> **B-frames and DRM**<ul><li>Reduce latency by only activating necessary features.</li><li>Use recommended low latency encoding profiles.</li><li>B-frames cause latency if enabled on every ray.</li></ul>         |
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

## Broadcast a Live Event  {/*broadcast-a-live-event*/}

<Info>You should only allow a single operator to manage a live event. Using multiple operators on a single live event may lead to unexpected behavior.</Info>

If the live event has been [scheduled and configured to automatically start/stop](#set-up-a-live-event), then no additional actions need to be taken.

<Info>Override auto start/stop by turning it off from the live event and then saving your changes. Alternatively, an operator may override auto start/stop by opening the live event in the Live Events Dashboard and then clicking **Cancel** from the upper-right hand window. After which, the operator should start the following procedure from step 3.</Info>

**Broadcast a Live Event**

1. Navigate to the [Live Events page](https://cms.uplynk.com/static/cms2/index.html#/live-events/events).  From the main menu, navigate to **Events > Live Events**.

2. Select the desired live event to open it.

3. Click **Open Dashboard**.

4. **Verify Connection:**
   [Ensure a connection was established to the Live Slicer(s)](#verify-live-slicer-connectivity) associated with the live event configuration. A live event may be managed over the internet provided that a firewall does not prevent communication between the Live Events Dashboard and the Live Slicer. Otherwise, an operator should load the Live Events Dashboard from within the same network as the Live Slicer.

   **Troubleshooting:**
   If a connection to the Live Slicer cannot be established, verify that SSL support has been added to the Live Slicer. Alternatively, look for a warning icon in the browser's address bar. Click on that icon to accept the potential security risk of loading content via HTTP alongside HTTPS traffic. Eliminate this security risk by adding SSL support to the Live Slicer.

5. [Test the live event](#test-a-live-event) via the Live Events Dashboard. This step may be skipped by removing the live event testing requirement from the Live Events page.

6. **[Start the Live Event](#start-stop-live-event):**  Monitor the live stream to identify the starting point of the live event and then start the live event from the Live Events Dashboard.

   **Best Practices:**
   - If you are monitoring multiple live events, consider performing the following steps to reduce CPU usage:
     - Launch the player in a separate window by clicking **View in New Window**.
     - Close the source and audience view by clearing the **Slicer Live Preview** and **Audience View** options from the View menu.
   - Optional: Publish your live event to one or more social media platforms.

7. Optional. [Publish your live event](#syndication-publishing) to one or more social media platforms.

8. **Manage Ad Breaks and Slate Content:**

   **Insert an Ad Break:**

   - **Ad Pods:**
     Select the desired [ad pod](#ad-pods) to queue it up. Select the same ad pod to start the break. The ad break's current duration will be indicated next to the ad pod. The ad pod will automatically end upon reaching the ad pod's duration.  <Info>This method is only supported for ad pods defined within the Pod Format tab of the live event configuration.</Info>


   - **Manually:**
     Click **Ad Break**. The **Switcher** pane will indicate the total duration of the ad break. End the ad break by clicking the Slicer tile. The feed will switch over to the content generated by the Live Slicer selected under the Slicers pane.

   **Insert Slate:**

   - Start inserting slate by finding the desired asset from within the **Mid Event Slate** section and then either clicking on it or the **Save to Replay** option.

   <Info>The **Save to Replay** option includes slate when viewers watch your live event as on-demand content. If the Save to Replay option is not displayed, then slate will be excluded during VOD replay.</Info>


   - Upon selecting the desired slate content, the **Switcher** pane will indicate the total duration of slate content. Click the **Slicer** tile to switch back to the content generated by the Live Slicer selected under the **Slicers** pane.

9. Monitor the live stream to identify the ending point of the live event and then [stop the live event](#start-stop-live-event) from the Live Events Dashboard. It is possible to resume a live event after it has been stopped.

### Verify Live Slicer Connectivity  {/*verify-live-slicer-connectivity*/}

The **Live Events** Dashboard indicates a Live Slicer's status using the following indicators:

- **Connected (Green)**: Indicates that the Live Events Dashboard can communicate with the Live Slicer.
- **Slow Connection (Yellow)**: Indicates that the **Live Events** Dashboard is experiencing latency when communicating with the Live Slicer. If multiple Live Slicers have been associated with the live event configuration, consider switching to a "Connected" Live Slicer.
- **Disconnected (Red)**: Indicates that the **Live Events** Dashboard cannot communicate with the Live Slicer. If multiple Live Slicers have been associated with the live event configuration, it is strongly recommended to switch to a different one.

<Info>This status information is only designed to measure the connectivity between the Live Slicer and the **Live Events** Dashboard. Monitor Live Slicer health through the Live Slicer Health dashboard. Learn more.</Info>

#### Test a Live Event  {/*test-a-live-event*/}

The **Live Events** Dashboard contains a test mode that allows an operator to validate source content and replicate the viewing experience prior to the start of the live event.

<Info>Testing mode is designed to replicate the experience that a viewer will have when streaming a live event. However, viewers attempting playback prior to the start of the live event will only see pre-event slate.</Info>

<Info>Determine whether live event testing is mandatory through the **Require testing before a live event** can be started option which can be found under the **Additional Configuration Settings** section of the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events) page.</Info>


**Test a Live Event**

1. Load the Live Event in the Live Events Dashboard.

2. Click **Enter Event**.

3. Click **Start Test**.

4. When prompted to confirm this action, click **Start Testing**.

5. Optional. Once testing is complete, click **Complete Test** twice to exit this mode and prepare for the start of the live event.

In this mode, you can perform the following tests:

1. **Verify Audio/Video Sources:**
   - **Slicer:**
     Click on the thumbnail under the Switcher pane to view the content being ingested by the Live Slicer selected under the Slicers pane. Selecting a different Live Slicer will automatically update this thumbnail to show the feed from the newly selected Live Slicer. This feature allows for quick failover to a different Live Slicer if the current one experiences issues. It is strongly recommended to fail over only to a backup Live Slicer ingesting an identical audio/video feed, not for switching between alternate feeds.

   - **Ad Break:**
     This thumbnail displays the content being ingested from a third-party ad server.

   - **Slate:**
     The remaining thumbnails list the assets available for mid-event [slate](#set-up-slate).


2. **Replicate Viewer Experience:**
   - Play back the stream via the sample media player provided in the Audience View pane. This player streams the source defined in the Switcher pane using a playback URL with the same query string parameters used by custom media players during the live event.

   - [Customize the playback URL](/uplynk/deliver/playback_urls/customize_playback_via_parameters) by defining parameters in the URL Params setting. Click **Update** to apply the new playback URL to the Audience View preview.

##### Slicer Live Preview & Audience View  {/*slicer-live-preview*/}

The **Slicer Live Preview** pane provides a real-time preview of the source selected in the **Switcher** pane, while the Audience View pane provides an approximation of a viewer's experience.

**Key information**

- The **Audience View** preview lags behind the live audio/video feed. This delay replicates the viewing experience.
- The real-time preview provided by the **Slicer Live Preview** pane requires:

    - Live Slicer version 16062200
    - Live Slicer configuration settings: Update the Live Slicer configuration file (`/etc/uplynk.conf`) to include the following settings:

        | Setting | Description |
        |---|---|
        | preview: on | Enables the Slicer Live Preview.<br />If the `livepreview_with_audio` setting is not enabled, then this preview will only consist of video. |
        | livepreview_with_audio: on | Requires Slicer version 22083100 or higher<br />Enables audio for the Slicer Live Preview.<br />The Slicer Live Preview pane displays audio levels regardless of whether this setting is enabled. |
        | livepreview_max_viewers: # | Determines the maximum number of simultaneous viewers of a live preview.<br />Each instance of a live preview consumes resources on the computer hosting the Live Slicer. This setting is designed to prevent performance issues by capping the number of simultaneous connections. |

### Start or Stop a Live Event  {/*start-stop-live-event*/}

Broadcast a live event to viewers by starting it. This will cause the following actions to take place:

- The live stream will switch from pre-event slate to the source that is currently selected in the **Switcher** pane.
- The Live Slicer will start slicing to an asset in the CMS library.

Once the live event is over, it will need to be stopped. This will cause the following actions to take place:

- The live stream will switch from the currently selected source to post-event slate.
- An on-demand version of the asset will be added to the CMS library. The live event's configuration determines whether this asset will be available for immediate playback. [Learn more about on-demand content](#on-demand-content).

**Start and Stop a Live Event**

1. **[Test the Live Event](#test-a-live-event)**: Once testing has been completed, click **Complete Test** twice to exit testing mode and prepare for the live event.

2. **Start the Live Event:** When ready to start the live event, click **Start Event**. Confirm the action when prompted by clicking **Start Event** again.

3. **Stop the Live Event:** Once the live event is complete, click **End Event** twice to switch the stream over to post-event slate content.

4. **Failover to a Different Live Slicer:** If multiple Live Slicers are associated with the live event configuration, you can quickly fail over the stream by selecting the feed from a different Live Slicer in the Slicers pane.

### View Live Event Details  {/*view-event-details*/}

The following live event information may be viewed at any time after entering the event by clicking the **Event Details** tab:

- Pre-event slate: A live event's pre-event slate may be changed from this tab prior to the start of the live event.

- Metadata associated with the live event configuration
- Audit log data that tracks major events (e.g., event creation, source switching, event started/ended, etc.). Audited events may be posted to your web server. [Learn more](#live-event-status-reporting).

### Resume a Live Event  {/*resume-a-live-event*/}

A live event may be resumed for a short window (i.e., 1 to 5 minutes) after it has been stopped. This capability allows an operator to undo a premature stop event action.

**Key Information**

- The length of this window is determined by the **Minutes** option defined under the **Resume Event Buffer** section. You can find this option by navigating to the **Buffers** tab of the [Live Events page](https://cms.uplynk.com/static/cms2/index.html#/settings/live-events).
- Ensure that the **After Event Buffer** option defined under the **System Conflict Buffers** section meets or exceeds the length of time defined in the **Minutes** option.
- If a resume event buffer has been defined, the Live Events Dashboard will count down the remaining time an operator has to resume the event upon stopping it.
- The maximum value for the **Minutes** option is 5 minutes.
- Post-processing (e.g., creating on-demand content from a live event) will not start until after this window expires.
- Additional content sliced after resuming a live event will be included in the CMS asset generated from the live event.

## Syndication Publishing  {/*syndication-publishing*/}

<Info>Contact your account manager to activate Syndication Publishing.</Info>

In addition to streaming content directly to your consumers, you may also simultaneously distribute it to multiple social media and content distribution platforms with minimal effort.

**Set up Syndication Publishing**:

1. Create a [publishing target](/uplynk/monetize/syndication/#publish-a-target) for each desired social media or content distribution platform.
2. [Publish to the desired platform(s)](uplynk/monetize/syndication/#publishing) by associating the desired publishing target(s) with your live event.

## On-Demand Content  {/*on-demand-content*/}

Upon the completion of a live event, an asset will be automatically added to the CMS library. This asset is described below.

- **Contents**: This asset contains the entire live event feed including markers for ad breaks. However, it will not contain slate inserted into the live event feed.
- **Naming Convention**: This asset will be named after the live event's description. If the live event has not been assigned a description, then it will be named after the first Live Slicer associated with the live event (e.g., MySlicer).

### Change a Live Event's Asset  {/*change-a-live-event-asset*/}

A live event may be assigned a different CMS asset. A common use case for this capability is to create a clip from a live event and then set it as the on-demand version of the live event.

Reassigning the asset associated with a live event will trigger the following actions:

- The original asset will be removed from the CMS library. However, it will still be available from the live event's **Assets** tab.
- The original asset will be assigned the expiration policy defined by the live event's **Auto Expire Hours** option. View this setting from the live event's **Config** tab.
- The CMS asset newly assigned to the live event will be assigned the expiration policy defined by the live event's **VOD Auto Expire Hours** option. View this setting from the live event's **Config** tab.

### Change the Asset Associated with a Live Event  {/*change-asset*/}

1. Load the configuration associated with the desired live event.
2. Click **Change VOD Asset** from the notification bar.
3. Set the **Asset GUID** option to the asset ID for the desired asset.
4. Click **Save**.
5. Verify that the **VOD label** has been applied to the asset that best represents the on-demand version of the live event.

### Playback On-Demand Content  {/*playback-on-demand-content*/}

The playback URL associated with a live event may be used to stream it while the live event is in the **Live (On Air)** state. Once the live event is completed, the live event's **VOD Replayable** option determines whether that same URL may be leveraged to stream it as on-demand content.

**Effects on User Experience**

**Enabled:** Post-event slate will be streamed after the live event is over.

- If a specific duration has been defined for post-event slate, it is mandatory for new and existing viewers.
- **Existing viewers** may refresh the page to view the on-demand version of the live event.
- **New playback requests** for the live event will stream it as on-demand content.

**Disabled:** Post-event slate will be streamed after the live event is over.

- An alternative method to stream the live event as on-demand content is to play back the CMS library asset that was automatically generated from the live event. This may be performed through the asset's playback URL.

### Long Live Events  {/*long-live-events*/}

The behavior for a live event whose duration is 8 hours or longer will vary as described below.

**Asset Naming Convention**

- Multiple assets will be added to your CMS library for long live events. These assets will be named according to the following convention: `Live Event Name_Sequential Number`

    For example, if three assets were generated for a live event called "Marketing Conference," they would be named:
    - `Marketing Conference_1`
    - `Marketing Conference_2`
    - `Marketing Conference_3`

- On-demand playback of the live event will be through a multi-beam playlist. This playlist references the live event's temporary audio/video assets.

<Info>A media player may not support the playback of content that lasts over 8 hours. Please verify playback for each of your media players.</Info>

### Manually Generate On-Demand Content  {/*manually-generate-on-demand-content*/}

Although on-demand content is automatically generated once a live event is completed, there are certain circumstances under which you may wish to manually generate it. For example, you may wish to address a quality issue that was noticed during the live event. If one or more backup Live Slicers were associated with the live event, you could generate alternate on-demand content by using any combination of content generated from the Live Slicers associated with the live event.

A temporary asset is generated by each Live Slicer associated with a live event whenever any of the following actions take place:
- Upon testing a live event.
- Upon starting a live event.
- Upon switching to a different Live Slicer.
- Upon switching back to the Live Slicer from slate.

<Info>Switching between the Live Slicer and ad breaks will not interrupt a temporary asset. Although the content of the ad break will be excluded from the temporary asset, markers will track each ad break. Leverage these ad break markers and the Preplay API to insert ads during on-demand playback.</Info>

The naming convention for temporary assets will be set to either of the following values:

| Name | Description |
|---|---|
| Test Primary<br />Test Backup<br />Primary<br />Backup | Each temporary asset generated from a live event will be assigned one of these names. The label(s) associated with each temporary asset describe it.<br />Each label is described below:<ul><li>**Test**: Identifies temporary assets that were generated during the testing phase of the live event. If this label is missing, then the temporary asset was generated during the live event.</li><li>**Primary**: Identifies temporary assets that reflect the live event's viewing experience.</li><li>**Backup**: Identifies temporary assets that were generated from the content provided by backup Live Slicers. A backup Live Slicer identifies any Live Slicer associated with a live event that did not provide the content that was streamed to live viewers.</li></ul> |
| \<Live Event Name\> | Identifies the temporary asset that replicates the live viewing experience. A copy of this asset was imported into the CMS library. |

**Manually Generate On-Demand Content**

1. Navigate to the Live Events page. From the main menu, navigate to **Events** > **Live Events**.

2. Select the desired live event to open it.

3. Click the **Assets** tab.

4. Play back each desired temporary asset by clicking the icon under the **Actions** column and then selecting **Launch Test Player**.

5. Perform one of the following tasks:
   - **Generate alternate on-demand content** by importing each desired temporary asset into the CMS library. This can be accomplished by clicking the icon under the **Actions** column and then selecting **Save as Asset**. Once all of the desired temporary assets have been imported into the CMS library, [generate a playback URL that combines all of the imported assets](/uplynk/deliver/playback_urls/#play-multiple-videos).
   -[ **Create a highlight clip**](/uplynk/manage/clipping). Launch the Clipping Tool by clicking the icon under the **Actions** column and then selecting **Clip Asset**.

<Info>Please wait 150% of the live event's duration before attempting to delete temporary assets.</Info>

## Live Event Status Reporting  {/*live-event-status-reporting*/}

Major events (e.g., creating, starting, and stopping a live event) are tracked for each live event. Our service can report these events as JSON data to a web server through HTTP POST requests. Your web server may then log this data and perform custom actions in response to specific types of events.

**Post a Live Event's Status Information to Your Web Server

1. Navigate to the Live Events page.
   - From the main menu, navigate to **Settings** > **Live Events**.

2. Under the Event Callback URL section, type the URL to which HTTP POST requests will be submitted.

3. Optional: Choose how you will [authenticate requests](#authentication) posted to your web server under the **Webhook Secret Token** section.
   - **No Authentication:** Verify that **None** is selected.
   - **Token or Signature Authentication:** Perform the following steps:
     - **Token Authentication:**
       - Select **X-Edg-Auth-Token**.
       - This mode ensures that each live event status request sent from our service to your web server includes an `X-Edg-Auth-Token` header set to your secret key.
     - **Signature Authentication:**
       - Select **X-Edg-Signature-256**.
       - This mode ensures that each live event status request sent from our service to your web server includes an `X-Edg-Signature-256` header set to an encrypted value that represents the request's payload.

    - Click **Generate Secret**.

    - Click **Copy**.
    - Store your secret key in a secure location.
    - Access to a secret key is limited to when it is generated. If you lose your secret key, then you will need to generate a new secret key and update your server-side authentication script to reference it.

    - Click **Ok**.

4. Click **Test** to submit a test request to your web server. Verify that your web server received the request.

5. Click **Save**.

### Authentication  {/*authentication*/}

Verify that a request came from our service through either of the following authentication methods:

- **Token**: This mode requires our service to include the` X-Edg-Auth-Token` header with each request it sends to your web server. This header is set to your secret key. You will need to implement a server-side script that compares your secret key to the `X-Edg-Auth-Token` header.

    **Sample validation function**

    ```
    SECRET = '1234567890abcdefghijklmnop' # Replace with your secret key.
    ...

        def validate_authentication_token(self, content, callback):
            header_sig = self.headers.get(TOKEN_TYPE_AUTH_TOKEN)
            if SECRET == header_sig:
                callback(content, TOKEN_TYPE_AUTH_TOKEN)
    ```

- **Signature**: Recommended. This mode requires our service to include the `X-Edg-Signature-256` header with each request it sends to your web server. This header is set to a signature that is calculated by encrypting the request's payload using a hash-based message authentication code (HMAC-SHA256) and your secret key. You will need to implement a server-side script that calculates this signature and compares it to the `X-Edg-Signature-256` header.

    **Sample validation function**

    ```
    SECRET = '1234567890abcdefghijklmnop' # Replace with your secret key.
    ...
        def validate_signature_256(self, content, callback):
            msg = b64encode(zlib.compress(content.encode('utf8'), 9)).strip()
            sig = hmac.new(SECRET.encode('utf-8'), msg, hashlib.sha256).hexdigest()
            header_sig = self.headers.get(TOKEN_TYPE_SIGNATURE_256)
            if sig == header_sig:
                callback(content, TOKEN_TYPE_SIGNATURE_256)
    ```

<Tip>[View a sample Python 3 script](https://docs.edgecast.com/video/Content/Resources/Scripts/webserver.py) that instantiates a sample web server and contains functions through which you authenticate a token or a signature.</Tip>

### Request Body  {/*request-body*/}

The HTTP POST request body will contain the following properties:

| Property | Type | Description |
|---|---|---|
| event | String | Describes the event that took place.<Info>An HTTP POST request will be submitted to your web server for each event.</Info>[Learn more](#events). |
| event_desc | String | Identifies a live event by its description. |
| event_id | String | Indicates the system-defined ID for the event that took place. |
| external_id | String | Identifies the asset associated with this event by its external ID. |
| metatdata | Object | Contains a key-value pair for each metadata field associated with the event. |
| state | String | Indicates the state of the live event at the point in time at which the event took place.<br />Valid values are:<br />`pre \| live \| resume \| post \| complete`<br />[Learn more](#slate). |
| testing_complete | Integer | Indicates the date and time at which live event testing was completed. A null value is reported when live event testing had not been completed at the point in time at which the event took place. |
| testing_start | Integer | Indicates the date and time at which live event testing was started. A null value is reported when live event testing had not been started at the point in time at which the event took place. |
| timestamp | Integer | Indicates the date and time, in Unix time (milliseconds), at which the event took place. |
| user_id | String | Indicates the system-defined ID associated with the user account that triggered the event.<br />**Find user ID**:<ol><li>Load the [User Settings page](https://cms.uplynk.com/static/cms2/index.html#/settings/).</li><li>Your user ID is listed under the User ID label.</li></ol>  |
| username | String | Indicates the e-mail address associated with the user account that triggered the event. |

### State  {/*state*/}

Live event states are defined below.

| Value | Description |
|---|---|
| pre | Indicates that the live event had not started. |
| live | Indicates that the live event was in progress. |
| resume | Indicates that the both of the following conditions were true:<ul><li>The live event had completed.</li><li>The capability to resume a live event via the Live Events Dashboard was available. This capability is controlled by whether a [resume event buffer](#resume-a-live-event) has been defined.</li></ul> |
| post | Indicates that the live event had completed and post-processing (e.g., creating on-demand content from a live event) was initiated. |
| complete | Indicates that the live event had completed and all post-processing tasks were completed. |

### Events  {/*events*/}

Events are defined below.

| Value | Description |
|---|---|
| Added Metadata | Indicates that metadata was added to a live event. |
| Added Slicer | Indicates that a Live Slicer was added to a live event. |
| Added Test Player | Indicates that a test player was added to a live event. |
| Auto Event Mode Cancelled | Indicates that a live event's auto start/stop mode was turned off. |
| Auto Event Schedule Cleared | Indicates that a live event's scheduled start/stop time was cleared. |
| Auto Event Slicer Scheduling Error | Indicates that there was an issue scheduling a Live Slicer for a live event that was configured to automatically start. |
| Completed Test | Indicates that an operator completed testing a live event. |
| Error Scheduling Slicers For Auto Stop | Indicates that there was an issue scheduling one or more Live Slicer(s) for a live event that was configured to automatically stop. |
| Event Copied from \{Event ID\} | Indicates that a live event was duplicated from an existing live event. The term \{Event ID\} identifies the ID of the live event that was copied. |
| Event Created | Indicates that a live event was created. |
| Event Deleted | Indicates that a live event was deleted. This deletion may have been performed manually or automatically upon its expiration. |
| Event Ended | Indicates that an operator ended a live event. |
| Event Ended: Resume Available | Indicates that an operator ended a live event that could have been resumed. |
| Event Marker Set: \{Marker Type\}:\{Marker Name\} | Identifies the [marker](#markers) that was applied to the live event. |
| Event Resumed | Indicates that an operator resumed a live event. |
| Event Started | Indicates that an operator started a live event. |
| Event Updated | Indicates that a live event was updated. |
| Event VOD over max duration (8 hours) | Indicates that a live event's duration exceeded 8 hours and therefore resulted in the creation of multiple CMS assets.<Info>On-demand playback of a long live event requires that your media player(s) support multi-beam playback.</Info> |
| Started Test | Indicates that an operator started testing a live event. |
| Switched to Source | Indicates that the audio/video feed was switched over to different source content via the **Switcher** pane. The term Source identifies the live event's new source (i.e., Live Slicer, ad, and slate).<br />**Non-Slate Syntax**: `Switched to {Source}`<br />**Slate Syntax**:<br />`Switched to slate [in VOD] {Mid-Event Slate Asset}`<Info>The in VOD phrase indicates that slate was inserted using the **Save to Replay** option.</Info> [Learn more](#set-up-slate). |
| VOD Asset Auto-Expired | Indicates that an expired CMS asset was deleted. |
| VOD Asset Deleted | Indicates that a CMS asset was manually deleted. |
| VOD Available | Indicates that a CMS asset containing the audio/video feed for a completed live event was created. |

### Sample Request Body  {/*sample-request-body*/}

Updating a live event configuration will trigger Live Event Status Reporting. A sample request body for this type of event is provided below.

```
{
    "username": "joe.smith@example.com",
    "user_id": "abcdefghijklmnopqrstuvwxyz123456",
    "external_id": "",
    "event_id": "1d6f7eb5fe474312947e73ccc1c57e32",
    "timestamp": 1572293065429,
    "event_desc": "My Live Event",
    "state": "pre",
    "testing_complete": null,
    "testing_start": null,
    "event": "Event Updated",
    "metadata": {
        "key2": "value2",
        "key1": "value1"
    }
}
```

## Conflicting Scheduled Events  {/*conflicting-scheduled-events*/}

The following warning indicators will be triggered when overlapping events on the same Live Slicer are detected:

- **Yellow Highlighting:** The Live Events page will apply yellow highlighting to each live event that has a scheduling conflict.
- **Warning Icon:** When viewing a live event configuration that has a scheduling conflict, the Slicers tab will display a warning icon and list all of the live events that conflict with it under the **Conflicted Events** column. Click on a live event to view and update its schedule.

**Default Detection:** By default, overlapping events are detected via a live event's expected start/stop time. However, a live event may potentially start early or extend beyond the scheduled stop time. Account for these factors by setting before and/or after event buffers to pad live events. Before and after event buffers are applied to all live events.

**Manual Checks:** The Live Events Dashboard will only check whether a scheduling conflict will occur for scheduled live events. Before manually starting a live event, verify that it doesn't conflict with scheduled live events. Additionally, verify that the Live Slicer has not been associated with a live channel.

**Example Scenario**

Assume the following conditions:

- A live event has the following schedule:
  - **Expected Start Time:** 11/11/2016 at 06:00 PM
  - **Expected Stop Time:** 11/11/2016 at 08:00 PM
- The before event buffer has been set to 15 minutes.
- The after event buffer has been set to 45 minutes.

In this scenario, a warning will be generated if another live event is scheduled on the same Live Slicer that meets either of the following conditions:

- **Expected Start Time:** 11/11/2016 before 09:00 PM
- **Expected Stop Time:** 11/11/2016 after 05:00 PM

## Stream a Live Event Tutorial  {/*stream-a-live-event-tutorial*/}

Learn how to stream a live event.

Live events are perfect for concerts, lectures, sporting events, or any other live content that will be broadcast for a finite amount of time.

**Live Event Capabilities**

- Effortlessly scale to massive audiences.
- Start the event at any time and present your users with looped video until the event begins.
- Immediately replay the event on-demand upon completion.
- Insert ad breaks, integrate with a third-party ad server, and deliver unique ads to each of your viewers.

**Tutorial Overview**

This tutorial sets up a basic live event. Unlock the true power of live events by taking advantage of features such as:
- Live event scheduling
- UDP streaming
- Mac support
- API-driven workflows

<Info>Alternatively, you can stream a single live linear event by taking advantage of our live linear streaming capabilities.</Info>

**Software/Hardware Prerequisites**

- Linux OS
- Blackmagic DeckLink SDI card

**Audio/Video Feed Prerequisites**

- Audio source
- Video source

**Key Steps**

1. Set up a Live Slicer.
2. Create and configure a live event.
3. Set up a media player.
4. Broadcast the live event.

**Best Practice**

Prior to your live event, it is strongly recommended to verify that the host computer can maintain upload bandwidth at the desired streaming quality.

To this end, it is recommended to:

1. Create a live event configuration for testing purposes. Determine the optimal streaming quality for the host computer by streaming for a short time period (e.g., 5 minutes).
2. Create another live event configuration for the actual live event. Make sure to set the streaming quality to an optimal value.

### Step 1 - Set Up a Live Slicer  {/*step-1*/}

A Live Slicer is required to prepare an audio/video feed into a live stream that will be broadcast to all of your viewers. Set up the latest version of the Live Slicer on a Linux computer.

<Tip>If you plan on using a Blackmagic DeckLink SDI capture card, then the Live Slicer must be installed on the computer where that card is housed.</Tip>

1. Live Slicer version 21092100 or higher: Install the libnl-3.200 library.

    `sudo apt install libnl-3-200`

2. Python and bzip2: Install the python bzip2 applications.

    `sudo apt install python bzip2`

3. Download the Live Slicer by clicking **Downloads** from the bottom right-hand corner of the CMS and then clicking on the desired OS.

4. Extract the zip file to the desired directory.

    `$ tar -xvf uplynk_slicer_linux_64-231114.04.01.tbz2`

5. Navigate to the newly created directory.

    `$ cd uplynk_slicer_linux_64-231114.04.01-master/`

6. Run `install_live`.

    `$ sudo ./install_live`

7. Open the Live Slicer configuration file (`/etc/uplynk.conf`) in a text editor. [View a sample configuration file](https://docs.edgecast.com/video/Content/Resources/Supplemental/LiveSlicerConf).

8. Set the username setting to the email address associated with your account.

    `username: joe@example.com`

9. If present, delete the `password` line.

    `password: samplepassword`

10. If missing, add a line for the `apikey` setting. Set it to your secret API key.

    `apikey: abcDEFghiJKLmnoPQRtuvWXYz123ABCdefGHIJKL`

11. Set the `slicerID` setting to "marketingslicer."

    `slicerID: marketingslicer`

12. Set the `slicerID` setting to "marketingslicer."

    `slicerID: marketingslicer`

13. Set the `card` setting to the number assigned to the Blackmagic capture card that will generate the source feed.

    `card: 1`

14. Set the port on which the Live Slicer will listen for API requests.

    `api_port: 65009`

15. Enable the Live Events Dashboard's live preview capability.

    `preview: on`

16. Enable audio for the Live Events Dashboard's live preview when using Live Slicer version 22083100 or higher.

    `livepreview_with_audio: on`

17. Set a limit to the number simultaneous viewers of a live preview.

    `livepreview_max_viewers: 2`

18. Configure the Live Slicer to generate and install a SSL certificate.

    <Info>Alternatively, manually generate a SSL certificate and then configure the Live Slicer to use it. [Learn more](#set-up-ssl-tls).</Info>


    - Set the ssl_port setting to the desired port. `ssl_port: 65010`
    - If present, remove the `ssl_cert` and the `manual_ip` settings.

19. Start the Live Slicer through the following command:

    - **upstart**: `sudo start uplynk_liveslicer`
    - **systemd**: `sudo systemctl start uplynk_liveslicer.service`

20. Set up the Blackmagic capture card to capture the audio/video feed.

    - Connect the audio and video source to the Blackmagic capture card.
    - Open Blackmagic system preferences and then configure the above connections as input sources.
    - Open **Preferences** (**Edit** > **Preferences**) and then set a project format, capture file format, and storage location.
    - Close **Preferences** and then click on the **Log and Capture** tab.
    - Click **Capture**. The Live Slicer will automatically pick up the feed.

### Step 2 - Create a Live Event in the CMS  {/*step-2*/}

Create a basic live event configuration that will stream the audio/video feed generated by the above Live Slicer.

1. Sign in to the [CMS](https://cms.uplynk.com/).

2. Navigate to the [Live Events page](https://cms.uplynk.com/static/cms2/index.html#/live-events/events). From the main menu, navigate to **Events** > **Live Events**.

3. Click **+ Create Event**.

4. In the **Event Name** option, type "My Live Event."

5. Click **Create & Edit**.

6. From the **Config** tab, set the **Require a token for playback option** to "No."

7. From the **Slicers** tab, find the **Slicer ID** option and then type the value assigned to the `slicerID` setting (i.e., marketingslicer) in the Live Slicer configuration file. Click **+ Add**.

8. Click **Save**.

### Step 3 - Set up a Media Player  {/*step-3*/}

A media player that points to the live event must be distributed to your viewers.

1. From within the desired text editor, insert the following HTML code:

    ```html
    <!DOCTYPE html>
    <html>
        <body>

        </body>
    </html>
    ```

2. From within the CMS, open the live event created above.

3. Navigate to the **Playback** tab.

4. Click **copy** which appears next to the **Embed HTML** option.

5. From the text editor, paste the copied text within the body tags. The resulting HTML code should look similar to the code provided below.

    ```html
    <!DOCTYPE html>
    <html>
        <body>
            <iframe style="border:none" width="640" height="480" src="https://content.uplynk.com/player5/1SodqitBFcSwHXKzdVT4Leef.html"></iframe>
        </body>
    </html>
    ```

6. Save the above code as a HTML page (e.g., myliveevent.html).

7. Load the above web page and verify that it loads pre-event slate.

## Step 4 - Broadcast a Live Event  {/*step-4*/}

Broadcast a live event through the Live Events Dashboard.

1. Navigate to the [Live Events page](https://cms.uplynk.com/static/cms2/index.html#/live-events/events). From the main menu, navigate to **Events** > **Live Events**.

2. Select the live event created above.

3. Click **Open Dashboard**.

4. Verify that a connection was established to the Live Slicer. The Live Slicer should be highlighted in green.

5. Test the live event.

    - Click **Enter Event**.
    - Click **Start Test**.

6. Monitor the live event to identify its starting point and then start it by clicking **Start Event** twice.

7. Monitor the live stream to identify the ending point of the live event and then stop it by clicking **Stop Event** twice.

## Step 5 (Optional) - Stream the Live Event as On-Demand Content  {/*Step-5*/}

Upon completing your live event, it will be added to the CMS library. This allows the live event to be played back as on-demand content using the playback URL, test players, or HTML embed code associated with the live event or the VOD asset generated from it.

## CameraSlicer  {/*cameraslicer*/}

The CameraSlicer (Mac Only) application allows live event streaming by capturing content from local hardware and sending it to the cloud for encoding.

### Minimum System Requirements  {/*minimum-system-requirements*/}

The minimum system requirements for the computer hosting the CameraSlicer are provided below.

| Component | Description |
|---|---|
| CPU | Quad-core x86-64 (2GHz) |
| Memory | 6 GB |
| Storage | 80 GB |
| Upload Bandwidth | Varies according to the defined [streaming quality](#setup).<br />It is recommended to test out streaming at the desired quality level prior to your live event. |
| OS | macOS |
| Audio/Video Source | Audio/video hardware must be installed on the computer hosting the CameraSlicer.<br />The CameraSlicer may also recognize audio/video hardware-emulators (e.g., ManyCam). |
| Ports | Outbound connections on 80 and 443 |

### Set up Firewall  {/*set-up-firewall*/}

The CameraSlicer relies on ports 80 and 443 to communicate with our services and to upload encrypted slices for encoding. Please make sure to configure the firewall shielding the computer hosting the CameraSlicer to allow outbound connections on these ports.

### Install CameraSlicer  {/*install-cameraslicer*/}

Installation instructions for the CameraSlicer are provided below.

1. Download the CameraSlicer by clicking **Downloads** from the bottom right-hand corner of the CMS and then clicking **Mac Slicer**.

2. Unzip the archive and move the CameraSlicer application to the Applications folder.

### Open the CameraSlicer Application  {/*open-cameraslicer*/}

Open the CameraSlicer application by double-clicking it from the Applications folder.

<Tip>If the CameraSlicer application cannot be opened as a result of a security configuration, try opening it while holding down the Control key.</Tip>

### Use the CameraSlicer to Stream a Live Event  {/*use-cameraslicer-to-stream*/}

The CameraSlicer (Mac only) provides a simplified alternative to the Live Slicer for live event streaming. However, it does not support the following features:

- The live event must be managed through the CameraSlicer. A live event generated by the CameraSlicer cannot be managed via the Live Events Dashboard.
- A live event operator should not be defined in the live event configuration. The operator for the live event is determined according to the user account used to log in to the CameraSlicer.
- Live events cannot be scheduled to automatically run when using the CameraSlicer. The Auto Start/Stop option should be set to "No."
- Only a single slicer ID should be associated with the live event. This ID must be specified when starting up the CameraSlicer.
- The CameraSlicer does not allow mid-slate to be added to a live event.
- Most actions that describe the live event, with the exception of "Event Started" and "Event Ended," will not be logged.
- The CameraSlicer does not support the capability to resume a live event after it has been stopped.
- Only a single temporary asset will be created for the live event. This temporary asset replicates the live viewing experience. Although the ad break content served during the live event will be excluded from it, it will contain ad break markers.

**Stream a Live Event Using the CameraSlicer**

**A. Create a Live Event**

1. Navigate to the Live Events page.
   *How?*

2. Click **+ Create Event**.

3. In the **Event Name** option, assign a unique name to the live event.

4. Click **Create & Edit**.

5. From the **Slicers** tab, type a value to identify the CameraSlicer session. Click **+ Add**.

6. The **Playback** tab contains the playback URL to which you should point your media player.

7. Click **Save**.

**B. Configure the CameraSlicer**

1. Navigate to the directory where the CameraSlicer was installed and open the CameraSlicer application.

2. From the **Username/email** option, type the user name or email address associated with the user account for the live event.

3. From the **Password** option, type the password that corresponds to the specified user account.

4. From the **Slicer ID** option, assign an ID for this CameraSlicer session. This ID should match the slicer ID assigned to the live event created in step 1.

5. Click **Sign In**.

6. From the **1 Select Event** step, select the live event created in step 1.

7. Click **Next**.

8. Select the desired video and audio sources using the **Video Source** and **Audio Source** options, respectively.
   If valid inputs have been selected, a video preview and audio levels will be shown.

9. Move the slider bar to adjust the streaming quality to the desired bit rate. Ensure that the specified value does not exceed the expected upload bandwidth.
   *The specified streaming quality may not be changed during the live event.*

10. Identify the starting point for the live event through the live preview and then click **Begin Event**.
    If prompted, allow the CameraSlicer application to accept incoming network connections.

**C. Insert an Ad Break**

1. Under the **Ad Break** section, assign an estimated ad break duration in minutes and seconds.

2. Click **Begin** to start the ad break.

3. Click **End** to stop the ad break.

4. Click **Finish Event** to end the live event.

### Wizard Steps  {/*wizard-steps*/}

The CameraSlicer provides a wizard that steps you through its configuration. This wizard consists of the following steps:

1. [Authentication](#authentication): Define the user credentials through which the CameraSlicer will authenticate to our services.
2. [Select event](#select-event): Select the live event configuration to which content will be published.
3. [Setup](#setup): Define the audio/video source and the quality of the stream to be generated.
4. [Broadcast](#broadcast): Define ad breaks and mark the end of the live event.

#### Authentication  {/*authentication*/}

Upon loading the CameraSlicer app, it will prompt for CMS credentials. It will use these credentials to communicate with our services and to upload content.

#### Select Event Step

Once valid credentials have been provided, the CameraSlicer will display a list of the live events to which it can publish content. Select the desired live event and then click Next.

<Info>The CameraSlicer will only list live events whose status is set to "Pre-Event."</Info>

#### Setup  {/*setup*/}

Define the following settings through this step:

| Setting | Description |
|---|---|
| Video source | Contains a list of the available video sources.<br />If the desired video source is not listed, please verify that the desired hardware has been properly installed on the computer hosting the CameraSlicer application. |
| Video input settings | SDI (Blackmagic) Only<br />Adjust the video input settings to match your signal. |
| Audio source | Contains a list of the available audio sources.<br />If the desired audio source is not listed, please verify that the desired hardware has been properly installed on the computer hosting the CameraSlicer application. |
| Streaming quality | Determines the bit rate of the stream published by the CameraSlicer.<br />It is recommended to create a test live event to assess the highest quality bit rate that your upload bandwidth can support. |

Once the above settings have been defined, the CameraSlicer application is ready to start capturing audio/video and converting it into a live stream. Start the live event by clicking **Begin Event**.

**Considerations**

- If prompted, please allow the CameraSlicer application to accept incoming network connections.

- Upon clicking Begin Event, the live event's status will switch from "Pre-Event" to "Live (Slicing)."
Learn more.

- Viewers may request a live event before the CameraSlicer starts capturing and slicing audio/video. Pre-event content will be streamed to those viewers.

#### Broadcast  {/*broadcast*/}

This step:

- Provides a preview of the audio/video captured by the CameraSlicer.
- Allows ad breaks to be added to the live event.
- Allows the live event to be completed.

##### Ad Breaks  {/*ad-breaks*/}

Ad breaks may be manually inserted into a live event through the following actions:

- **Begin**: Starts the ad break.
- **End**: Ends the ad break.

**Key information**

- Set up ad integration prior to adding ad breaks. [Learn more](/uplynk/monetize/ads).

- Ad slate will be displayed whenever there is an insufficient ad coverage for an ad break. This occurs when:

    - An ad has not been defined for the ad break in question.
    - The duration of the live event's ad break exceeds that of the scheduled ads.

- Define the asset that will be streamed on a loop for ad slate through the Ad Slate option. View this option by clicking the tab with the gears icon and then clicking **Live** from the **Advanced** pane on the left-hand side of the window.

#### Finish Event  {/*finish-event*/}

Upon reaching the end of the live event, click **Finish Event** to toggle the status of the live event to "Complete." This action completes the live event and prepares it for on-demand viewing.

## More Information  {/*more-information*/}

[Media Player Setup](/uplynk/deliver/media_player)

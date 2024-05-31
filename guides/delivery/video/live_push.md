---
title: Live Push User Guide
---
This guide is intended for Edgio Networks Video Delivery customers who want to stream live media to desktop, mobile, and set-top boxes simultaneously using Video Delivery Live Push. Video Delivery’s multi-device support enables you to input a live stream, configure your video slots using the Control portal, and receive a URL or video player for delivery worldwide to desktop and mobile devices.

## Introduction  {/*introduction*/}
### Deliver Live Push  {/*deliver-live-push*/}
Live Push is a live streaming product that utilizes the Edgio Live provisioning backend with a new ingest server. Live Push delivers an ingested stream via a playback URL.

### Live Push Outputs  {/*live-push-outputs*/}
- HLS
- MPEG-DASH

### Slot Configuration  {/*slot-configuration*/}
Live Push is allocated by “slot.” A slot is a reserved capacity into which you ingest your live stream.

The Live Streaming section of Control (referred to as the "Configuration UI" in this document) allows you to configure slots for Live Push. The available customer configurable items are:

- Ingest region
- Primary and Backup PoPs
- Ingest bitrate
- Chunk duration
- File expiry time
- Publish IP access
- Viewer IP access
- Encoder username
- Ingest URLs
- Playback URLs
- MediaVault

Configuration details are covered in Configuration UI.

### Live Stream Encoders  {/*live-stream-encoders*/}
A client-based live stream encoder must capture live footage and stream it to the ingest servers of Live Push.

## Basic Steps  {/*basic-steps*/}
### Overview  {/*overview*/}
Use this section to help plan your implementation of Live Push. These steps give you an overview of the detailed procedures provided in the following sections.

### Implementation  {/*implementation*/}
To implement Live Push:

1. Determine your live video needs: broadcast time, regions, playback devices, and so on.
2. Contact your Edgio representative to order slots and receive your login credentials.
3. Log into the Edgio Control portal. Choose **Configure** on the left navigation bar. From that expansion, choose **Live Streaming**.
4. Follow the instructions in the [Configuration UI](#configuration-ui) section to configure your Live Push slots. You can only configure the number and type of slots you have already purchased.
5. Once configured, you’ll receive your primary ingest URL, your playback URL, and other information, and, if *Use Backup Ingest* is selected, your backup ingest URL.
6. Set up your live stream Live Push encoder. See [Encoder Requirements](#encoder-requirements) for the encoder requirements and recommended settings for Live Push.
7. View your live stream on the playback URL.

## Configuration UI  {/*configuration-ui*/}
You can access the Control portal to view and configure the slots you have purchased. You can view, create, copy, and more.

### Main Configuration Page  {/*main-configuration-page*/}
After logging into the Control portal, click the *Configure* menu on the left navigation; then click **Live Streaming**.

The live slots configured for your specific shortname are listed. You can view summary information for the type of slots you have purchased at the top of this page. For the transcode and transmux slots, the display shows how many you have configured (used) and how many of each type you still have left to configure (available). If 0 slots are available, you cannot create any more of that specific slot type.

The display Live Push shows the total of all ingest bitrates provisioned, the total ingest bitrates available across all Live Push slots.

![Live Push Slots](/images/delivery/video/live_push_slots.png)

#### Buttons and Icons  {/*buttons-and-icons*/}
The *+ new* button at the top of the screen allows you to configure one of your purchased live slots.

Icons are at the right side of each slot row:

![Live Push Slots](/images/delivery/video/live_push_buttons.png)

- **Details**: View a specific live slot in detail. See [View Slot Details](#view-slot-details). (You can also view slot details by clicking in the slot's row.)
Clone: Make a copy of an existing live slot configuration. See [Clone a Slot](#clone-a-slot).
- **Edit**: Edit the Live Push configuration. See [Edit a Slot](#edit-a-slot).
- **Player**: View the live stream. The embedded player is disabled for the Live Push feature.
- **Delete**: Delete a live slot configuration. See [Delete a Slot](#delete-a-slot).

#### List Information  {/*list-information*/}
Each entry in the list has the following information:

- **name**: The name given to the slot when it was created.
- **date created**: The date the slot was created.
- **type**: The type of slot it is.
- **region**: The geographic region into which the slot ingests.
- **ID**: The specific ID number given to your slot for tracking and routing purposes.

The status of the slot is shown to the left of the *Details* icon. Possible statuses are:

- "Published" means your slot has been properly configured and is ready to use.
- "LiveEventProvisioning" means the slot configuration is in the process of being set up. It can take several minutes for all the configurations to be enabled.
- "Not_Provisioned" or "Error" means the configuration has not been set up on the ingest. Please contact Customer Support.

Click on a specific slot (or click the *Details* icon) to view slot details.

#### Filter and Sort the List of Slots  {/*filter-and-sort-the-list-of-slots*/}
Filtering and sorting controls appear above the list of slots.

The *Show only* drop-down menu is disabled by default.

##### Filter  {/*filter*/}
To filter the list, click the *Filter by* drop-down menu and select a value to filter by:

- Region
- Type

When you select a value, the *Show only* drop-down menu becomes enabled and contains a list of options relevant to the value in the *Filter by* drop-down menu.

| 'Filter by' Value | Options in 'Show only' |
|---|---|
| Region (the region the slot ingests into) | **All**: show all regions; default value.<br />**North-America**: show North American regions only.<br />**Asia-Pacific**: show Asia Pacific regions only.<br />**Europe**: show European regions only.The regions shown in the drop-down menu are limited to those regions where slots are set up. |
| Type (the type of slot) | All: show all slot types, default.<br />Other options (click to limit the list to that type):<br />- Transcode 720p<br />- Transcode 576p<br />- Transcode 1080p<br />- Transmux<br />- Live Push<br /><br />Note: The entries shown in the drop-down menu are those types with slots that are set up. |

##### Sort  {/*sort*/}
Select a value in the Sort by drop-down menu:

- Date created
- Name
- Region
- Type


### Configure a Slot  {/*configure-a-slot*/}
1. Click the + new button at the top of the page and select a slot type:

    ![New Slot](/images/delivery/video/new_slot.png)

<Callout type="info">According to your account, the number in parentheses beside the transcode and transmux slots indicates the number of remaining slots you can create of each type.</Callout>

2. Fill out fields in the following sections on the page that appears:

    [Live Push details](#live-push-details)

    [Ingest details](#ingest-details)

    [Configuration details](#configuration-details)

    [Security details](#security-details)

3. Review your configuration, making any corrections.
4. When finished, click the **Submit** button.

#### Live Push details  {/*live-push-details*/}
![Live Push Details](/images/delivery/video/live_push_details.png)

| Field Name | Description | Notes |
|---|---|---|
| Name | Identifies your slot. | A unique slot name is required; no two slots may have the same name.<br />A slot name can have a maximum of 63 characters.<br />A name can only contain letters, numbers, and a hyphen \(-\). It cannot start or end with a hyphen.<br />Spaces are not allowed. |
| Description | Additional descriptive text. | Can be any text up to 255 characters long. |

#### Ingest details  {/*ingest-details*/}
![Ingest Details](/images/delivery/video/ingest_details2.png)

| Field Name | Description | Notes |
|---|---|---|
| Choose ingest region | The region in which you want to ingest your stream into your slot. | Select a region where your encoder is located or the region closest to the physical location of your encoder. |
| Use Backup Ingest | Stream to the backup ingest server as well as the primary. | Creating a backup allows you to stream to two distinctive ingest locations. When streaming to both primary and backup, you have redundancy that helps protect from regional outages and certain maintenance events. |

#### Configuration details  {/*configuration-details*/}
![Configuration Details](/images/delivery/video/conf_details.png)

| Field Name | Description/Instructions | Notes |
|---|---|---|
| Total Ingest Bitrate | The desired bitrate for the slot. | The total ingest bitrate in kilobits per second. |
| Segment Duration | The desired durations for HLS and DASH formats. | Larger values result in your player making fewer requests. Lower values result in lower latency, but the number of segment requests increases and may result in higher traffic costs and potential playback issues. |
| File Expiry Time | Duration (in seconds) to keep the content on the Live Push Ingest server. | Larger values result in files being available longer but also use more storage space. |
| Username | Username for Live Push slot access. | Each Live Push slot requires at least one set of authentication credentials. Multiple sets of credentials can be configured by clicking + add after entering each set of credentials. |
| Password | Password for Live Push slot user access. Click Show to display the password. | Passwords should be strong. |
| Confirm Password | Confirmation of the password. | Must match the password. |
| Publish Credentials | A list of the credentials to publish to enable access to the Live Push slot for listed users. Click - clear all to clear the list. | The listed users will have access to the Live Push slot. |

#### Security details  {/*security-details*/}
This section allows you to configure publish viewer access lists.

Here is a sample configuration:

![Security Details](/images/delivery/video/security_details.png)

| Field Name | Description | Notes |
|---|---|---|
| Publish IP Access | A list of IP addresses allowed to access the Live Push stream. | You can enter a single IP address or a range.<br />Ranges must be input in CIDR format; for example, for a range of `10.10.10.0` - `10.10.10.255`, the input value should be `10.10.10.0/24`. |

For Live Push slots:

- The DRM protection option is not available.
- The ability to configure *Allow* and *Deny* lists to control viewer access is also available.

### Clone, Delete, Edit. and View Slots  {/*clone-delete-edit-view-slots*/}
#### Clone a Slot  {/*clone-a-slot*/}
These sections explain how you can manage your slots.

1. Locate the slot you want to clone and click the Clone icon.
    ![Clone Icon](/images/delivery/video/clone_icon.png)
2. Follow the same steps used when configuring a slot. The values are pre-populated with the same information as the original slot except for the slot name. Since the name must be unique, you must enter a new name.
3. Click the **Submit** button, and the new slot is created.

    <Callout type="info">If you do not change the name or enter the name of an existing slot, a warning appears in the right part of the window.</Callout>

#### Delete a Slot  {/*delete-a-slot*/}
<Callout type="info">You cannot undo or recover a deleted slot.</Callout>

1. Locate the slot you wish to delete and click the **Delete** (rubbish bin) icon.

2. A dialog appears.


3. Click the **Delete** button.

    The slot is removed from the list.

#### Edit a Slot  {/*edit-a-slot*/}
1. Locate the slot and click the **Edit** icon.
     ![Edit Icon](/images/delivery/video/edit.png)

    The *Edit* page opens.
    ![Edit Live Push](/images/delivery/video/edit_live_push.png)


2. If required, add a user by entering a *Username* and *Password* pair and clicking the **+ add** button. Additional users can be added by repeating this step.
3. To clear the *Published Credentials* list, click the **- clear all** button.
4. Click **Submit** to submit your edits.

#### View Slot Details  {/*view-slot-details*/}
1. Locate the slot and click the Details icon (or click the slot's row).
    ![Details Icon](/images/delivery/video/details_icon.png)

    You will see the Ingest, Configuration, and Encoder details. You will also see the Live Push Ingest URLs.

    ![Slot Details](/images/delivery/video/slot_details.png)

    You can also view the slot's Playback URLs and Content security. Click the *Configure Validation* button to be taken to the Chunked Streaming  page for the slot, where you can configure options such as MediaVault and IP Access Control. See the [Content Security](/delivery/control/configure/caching_and_delivery/#content-security) section of the [Caching and Delivery](/delivery/control/configure/caching_and_delivery) documentation for more information.

    ![Playback Details](/images/delivery/video/playback_details.png)

2. The *Copy* (double-window) icon next to a field allows you to copy the field to the clipboard easily:

    When you click the icon, the browser displays a confirmation that the data has been copied.

### Use Your Slot  {/*use-your-slot*/}
Once your slot is configured, you can begin streaming to it right away. The slot is available to you whenever you want to use it.

Start by setting up your encoder with the information provided in the *Slot Details* screen. See [Encoder Requirements](#encoder-requirements) for the encoder requirements and recommended settings for Live Push.

Be sure to use the specifications of your slot type when setting up your encoder. It's also important to publish to both primary and backup URLs if *Use Backup Ingest* is configured.

Once you are streaming, use the Live Push playback URL shown in the *Slot Details* screen in your video player or app. The Live Push playback URL is a base URL, and the actual manifest file path or paths uploaded by the encoder should be appended. You can also use the Edgio SmartEmbed on your website or blog, which loads a player that automatically contains your playback URL.

### Use Secure Playback URLs  {/*use-secure-playback-urls*/}
Live Push supports the delivery of live streams over secure URLs. Simply change your playback protocol from `http://` to `https://` to take advantage of secure delivery.

## Live Push Encoder/Publisher Requirements  {/*encoder-requirements*/}

While MMD Live transmux and transcode streaming have a well-documented set of encoders and their parameters, Live Push requires a step for which many available video production suites do not have an option: HTTP/PUT. Because of this, rather than recommending any specific encoders or settings, here are the ingest requirements and limitations of the Live Push product.

- The *Ingest URL* (as seen on the *Slot View* page) is the base directory for your slot. You may create subdirectories (such as one for each rendition) using WebDAV:MKCOL.
- Segments and manifests should be sent to the ingest location using HTTP 1.1 PUT.
- Segments will be removed from the ingest location after a configured amount of time (See [Configuration UI](#configuration-ui)).
- Manifest files will never be removed but can be overwritten with new information by PUTing a new version file in the same location as the previous version.
- Exempted file patterns will be removed, but only when they are the only files left for a slot and if they have exceeded the file expiry time.
- In addition to manifests and exempted file patterns, several file names and patterns are exceptions to the file expiry time window:
    - `*.m3u8`
    - `*.mpd`
    - `*.init`
    - `init*`

### Domain Name Service  {/*domain-name-service*/}
The ingest URL that is provided after slot creation is resolved by Edgio’s Domain Name Service (DNS). Suppose your encoder/publisher or Operating System (OS) is configured to cache DNS entries. In that case, there may be some delay in resolving a new ingest in the case of a host failover or slot migration. While there may be some slight network performance improvement from caching DNS entries, Edgio recommends against storing DNS cache entries in the publisher for high-profile events.

## Secure Communications  {/*secure-communications*/}
Live Push provides a variety of methods to secure the publication of your live streams.

### Publish to Live Push  {/*publish-to-live-push*/}
Live Push only accepts pre-chunked video inputs (for example, HLS or MPEG-DASH) directly from your encoders. All encoders must authenticate using your Live Push publication credentials given to you on account creation. Edgio works with encoder companies to implement Edgio’s authentication directly into the encoder software.

<Callout type="info">HTTPS must be used to publish to Live Push. Connections attempting to use HTTP to publish to Live Push are rejected.</Callout>

### Authenticate Username:Passwords  {/*authenticate-username-passwords*/}
Live Push uses Basic Auth as defined in [RFC 7617](https://tools.ietf.org/html/rfc7617). Publishers must use HTTPS to send data to Live Push Ingest, ensuring authentication details are transmitted confidentially.

### Secure Playback of Live Streams  {/*secure-playback-of-live-streams*/}
Live Push provides several ways to secure live stream playback.

#### HTTPS  {/*https*/}
Live Push supports live stream playback through SSL. Simply change your playback URL from `http://` to `https://` to take advantage of secure delivery.

If you would like to use your SSL certificate for secure delivery, please contact your Edgio representative for more information.

#### MediaVault For Chunked Streaming  {/*mediavault-for-chunked-streaming*/}
The MediaVault service option allows you to secure the playback of your live streams using tokenization.

MediaVault for HTTP chunked streaming may be implemented using either URL- or cookie-based tokenization. You can set a hash secret for each slot. For more information about MediaVault, see the [MediaVault User Guide](/delivery/delivery/mediavault).

For additional information about securing live streams, see the MediaVault Selection in the [Configuration UI](#configuration-ui) section or contact your Edgio representative.

#### MediaVault for Live Push  {/*mediavault-for-live-push*/}
The MediaVault service option is also available for Live Push outputs.

---
title: Live Streaming
---
You can access the Control portal to view and configure the slots you have purchased. You can view, create, copy, and more.

## Main Configuration Page   {/*main-configuration*/}

Navigate to Configure > Live Streaming in the navigation pane.

The live slots configured for your specific shortname are listed. At the top of the page is summary information for the type of slots you have purchased. For the transcode and transmux slots, the display shows how many you have configured (used) and how many of each type you still have left to configure (available). All slot types are displayed regardless of whether you have purchased a particular slot type.

- If 0 slots are available, you cannot create any more of that specific slot type.

- If 0 slots are available and 0 are used, you have not purchased that type of slot.

The display for Live Push shows the total of all ingest bitrates provisioned, the total ingest bitrates available across all Live Push slots.

### Buttons and Icons   {/*buttons-and-icons*/}

**+ new** button: At the top right of the screen, allows you to configure one of your purchased live slots.

Icons at the right side of each slot row allow you to take actions on the slot.

<Callout type="info">Icons available depend on the slot type.</Callout>

| Icon | Description |
| --- | --- |
| Edit | Lets you modify the configuration. See [Edit a Slot](#edit-a-slot). |
| Details | Lets you view a specific live slot in detail. See [View Slot Details](#view-slot-details). (You can also view slot details by clicking in the slot's row.) |
| Clone | Makes a copy of an existing live slot configuration. See [Clone a Slot](#clone-a-slot). |
| Record and Schedule | Specific to functionality. |
| Player | Allows you to view the live stream. See [View a Slot's Live Stream](#view-a-slots-live-stream). |
| Delete | Allows you to delete a live slot configuration. See [Delete a Slot](#delete-a-slot). |

### List Information   {/*list-information*/}

Each entry in the list has information in the following table:

| Item	|Description|
|---|---|
|name	|The name given to the slot when you created it.|
|date created	|The date the slot was created.|
|type	|The type of slot.|
|ID	|The specific ID number given to your slot for tracking and routing purposes.|
|region	|The geographic region into which the slot ingests.|
|status	| - LiveEventProvisioning: The slot configuration is in the process of being set up. It can take several minutes for all the configurations to be enabled. <br /> - Not_Provisioned, Error:	The configuration has not been set up on the ingest. Please contact Customer Support.  <br /> - Published, Ready:	The slot has been properly configured and is ready to use. |

The slot state. Possible values are in the following table:

| Status | Description |
| --- | --- |
| LiveEventProvisioning | The slot configuration is in the process of being set up. It can take several minutes for all the configurations to be enabled. |
| Not_Provisioned,<br /><br />Error | The configuration has not been set up on the ingest. Please contact Customer Support. |
| Published,<br /><br />Ready | The slot has been properly configured and is ready to use. |
| Deleting | The slot is in the process of being removed. |

Click on a specific slot (or click the **Details** icon) to view slot details.

### Filtering and Sorting the List of Slots   {/*filtering-and-sorting-the-list-of-slots*/}

Filtering, sorting, and sort direction controls appear above the list of slots:

![Filter Slot](/images/delivery/control/filter-slots.png)

A - Filter by slot type

B - Filter by region

C - Sort by various fields

D - Sort direction

#### Filtering   {/*filtering*/}

Make selections in the Filter by slot type and Filter by region filters.

<Callout type="info">A region is the geographic area into which the slot ingests.</Callout>

#### Sorting   {/*sorting*/}

By default, the list is sorted by date created. The arrow in the sort direction field points up, indicating the list is sorted in descending order.

Choose a field to sort by and a sort direction.

## Configuring a Slot   {/*configuring-a-slot*/}

Configuring a slot is a simple process.

1.  Begin by clicking the **new** button at the top of the page and selecting a slot type.

<Callout type="info">According to your account, the number in parentheses beside the transcode and transmux slots indicates the number of remaining slots you can create of each type.</Callout>

2.  Then, fill out fields on the following sections in the page that appears:
- [Identifying Information](#identifying-information)
- [Ingest Details](#ingest-details)
- [Configuration Details](#configuration-details)
- [Encoding Details](#encoding-details)
- [Content Security](#content-security)

3.  Review your configuration, making any corrections.
4.  When finished, click the **Submit** button.

### Identifying information   {/*identifying-information*/}

<Callout type="info">For information about fields specific to Live Push slots, please see the [Video Live Push Guide](/delivery/video/live_push). <br /><br />The fields available for configuration depend on the slot type. The following table describes fields for all slot types.</Callout>

| Field Name | Description | Notes / Instructions |
| --- | --- | --- |
| Name | Identifies your slot. | A unique slot name is required; no two slots may have the same name.<br /><br />A name can only contain letters, numbers, and hyphens (-). It cannot start or end with a hyphen.<br /><br />Spaces are not allowed. |
| Keywords, comma-separated | Optional keywords to tag your slot. | To enter a tag, type the value then press the Enter key. The following characters are not allowed:<br /> -   period (`.`)<br />    -   apostrophe (`'`)<br />    -   slash (`/`)<br />    -   backward slash (`\`)<br />    -   left bracket (`[`)<br />    -   right bracket (`]`) |
| Description | An optional free-form field to describe your slot. |  |
| Callback URL | The URL to which you want to publish events. See the [Event Callback API Developers Reference](/delivery/video/limelight_video_platform/content_api_developers_reference) for more details. |  |

### Ingest details   {/*ingest-details*/}

<Callout type="info">The fields available for configuration depend on the slot type. The following table describes fields for all slot types.</Callout>

| Field Name | Description | Notes / Instructions |
| --- | --- | --- |
| Choose ingest region | Region in which you want to ingest into your slot. | Select a region where your encoder is located or the region closest to your encoder's physical location. |
| Estimated Concurrent Viewers | Estimated concurrent viewers of the slot per region. Helps the CDN optimize output from your slot. | Select one or more regions. Each region you select causes a new field to appear in which you can enter the estimated number of viewers for the region. |
| Primary POP, Backup POP | Once you select a region, the available s are listed in these drop-downs. | Select the primary that is closest to the physical location of your encoder to minimize data transmission time. Your backup selection must be different from your primary to provide redundancy for your live stream if there is a problem streaming to the primary.<br /> <br /> <Callout type="info">The Backup POP field is only displayed if you check the 'Use Backup Ingest' checkbox.</Callout> |
| Encoder password | Password that you configured for your stream while encoding it. | Enter and confirm the encoder password. Toggle password visibility with the **show/hide** button. Clear fields using the **clear all** button. |
| Use Backup Ingest | Stream to the backup ingest server as well as the primary. | Creating a backup allows you to stream to two distinctive ingest locations. When streaming to both primary and backup, you have redundancy that helps protect from regional outages and certain maintenance events.<br /> <br /> <Callout type="info">When you select this option, the 'Backup POP' field is displayed.</Callout> |
| Override Authentication Credentials | You can override the global password on a per-slot basis if desired. Configure your user and password by selecting this option. | Each slot uses the global user and password configured at the time your account was set up. See your Account Activation email for details. |

### Configuration Details   {/*configuration-details*/}

The Configuration Details section is visible only for Live Push slots.

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Total Ingest Bitrate | The desired bitrate for the slot. | The total ingest bitrate in kilobits per second. |
| Chunk Duration | The desired durations for HLS and DASH formats. | Larger values result in your player making fewer requests. Lower values result in lower latency, but the number of chunk requests increases and may result in higher traffic costs and potential playback issues. |
| File Expiry Time | Duration (in seconds) to keep the content on the Live Push Ingest server. | Larger values result in files being available longer but also use more storage space. |
| Publish IP Access | A list of IP addresses allowed to access the Live Push stream. | You can enter a single IP address or a range.<br /><br />Ranges must be input in CIDR format; for example, for a range of `10.10.10.0` - `10.10.10`.255, the input value should be `10.10.10.0/24`. |
| Username | Username for slot access. | Each slot requires at least one set of authentication credentials. Multiple sets of credentials can be configured by clicking **+ add** after entering each set of credentials. |
| Password | Password for slot user access. Click **Show** to display the password. | Passwords should be strong. |
| Confirm Password | Confirmation of the password. | Must match the password. |
| Publish Credentials | A list of the credentials to publish to enable access to the slot for listed users.<br /><br />To add a credential set:<br /><br />1.  Click the **add** button.<br />    <br />    The *ADD PUBLISH CREDENTIALS* dialog is displayed.<br />    <br />2.  Enter a user name and a password, then confirm the password by entering it in the **Repeat Password** field.<br />    <br />3.  Click the **Add** button.<br />    <br />    The credentials are added beneath the **add** and **clear all** buttons.<br /><br />To clear a single credential set, hover the mouse pointer over the row and click **remove**.<br /><br />To clear all credential sets, click the **clear all** button. | The listed users will have access to the slot. |

### Encoding Details   {/*encoding-details*/}

<Callout type="info">Encoding detail options are largely similar for all slot types with a few differences.</Callout>

#### Transcode Slots   {/*transcode-slots*/}

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Transcode bitrates | The bitrates you want to output from the slot.<br /><br />Choose one or more bitrates from the , then click the **add** button to add the bitrates to the 'Bitrates for this slot' field. | Each selection is an encoding profile<br /><br />All configured bitrates must be published by your encoder to for the slot to function correctly. |
| Bitrates for this slot | Displays all selected bitrates.<br /><br />If you have 'Bitrate Order' enabled for your account, a drag handle displays when you hover your mouse to the left the slot's order number.<br /><br />Use the drag handle to drag and drop bitrates to reorder them. The order number determines the order in which the bitrate URL appears in the output manifest file. | MSS output will not support a custom order in which the audio-only bitrate is placed first.<br /><br />To remove a bitrate, hover over its row and click the **remove** button. |
| -   Enable subtitles<br /><br />-   Allow to manage timecodes<br /><br />-   Output Formats | See [Subtitles and Timecodes](#subtitles-and-timecodes). |     |

#### Transmux Slots   {/*transmux-slots*/}

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Transmux bitrates | The bitrates you want to output from the slot.<br /><br />Choose one or more bitrates from the , then click the **add** button to add the bitrates to the 'Bitrates for this slot' field. | Each selection is an encoding profile<br /><br />Your encoder must publish all configured bitrates. |
| Bitrates for this slot | A suggested set of video and audio bitrates is available in the drop-down boxes, but you may also enter your custom bitrates in those boxes.<br /><br />If you have 'Bitrate Order' enabled for your account, each bitrate has a drag handle to its left.<br /><br />Drag and drop bitrates to reorder them. The order number determines the order in which the bitrate URL appears in the output manifest file. | You must select at least one bitrate.<br /><br />All configured bitrates must be published by your encoder to for the slot to function correctly.<br /><br />Total bitrate (video + audio) is automatically calculated and displayed in the row for each bitrate.<br /><br />The summation of all totals is displayed at the top of the bitrate list.<br /><br />To remove a bitrate, hover over its row and click the **remove** button. |
| -   Enable subtitles<br /><br />-   Allow to manage timecodes<br /><br />-   Output Formats | See [Subtitles and Timecodes](#subtitles-and-timecodes). |     |

#### Subtitles and Timecodes   {/*subtitles-and-timecodes*/}

Beneath the bitrates list for some slots are checkboxes for managing subtitles and timecodes and a for selecting the output format.

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Enable subtitles | Whether to enable subtitles in iOS players.<br /><br />Select this option to accurately inform iOS players that subtitles are present in HLS output from . | If you don't select the option and the `#EXT-X-MEDIA:TYPE=SUBTITLES` tag is present, but subtitles are not, the iOS player will display a CC menu option to display subtitles even though subtitles are not present. |
| Allow to manage timecodes | Whether to allow to manage time codes or let your encoder manage them.<br /><br />If your encoder does not allow you to enable absolute timecodes in chunks or if you want to manage timecodes, check this checkbox.<br /><br />If you are recording to VoD, this checkbox must be checked. | Absolute timecodes in chunks are necessary to enable a seamless transition from primary to backup ingest in case a primary ingest fails.<br /><br />Timecodes allow the failover mechanism to seamlessly switch to the backup stream at the correct time, resulting in little or no interruption to a viewer's experience when watching the live stream.<br /><br />By default, the checkbox is checked for transmux and transcode slots. |
| Output Formats | Desired video output standard.<br /><br />Select one or more output formats; then click the 'Apply' entry at the bottom of the . | The slot will produce output in the formats that you selected. |

### Content Security   {/*content-security*/}

For Live Push slots:

-   The Enable DRM option is not available.
-   The ability to configure Allow and Deny lists to control viewer access is also available:

The Enable Subscribe Validation option is available for slots.

After the slot is created, the Slot Details section provides a link to the location of the related delivery service instance so you can update the service instance and apply access control options. See [View Slot Details](#view-slot-details) for additional information.

#### MediaVault   {/*mediavault*/}

If you have the service option, this section is activated.

Check the **Enable MediaVault content protection** checkbox, then choose the type of you would like to implement on this slot:

-   URL-based. For URL-based , you may choose to protect just the main manifest of outputs or both the main manifest and all sub-manifests.

-   Cookie-based

You can set your hash secret per slot. You can find more information in the [MediaVault User Guide](/delivery/delivery/mediavault) or by talking to your Representative.

<Callout type="info">Enabling causes the Integrated Player Embed Code not to function.</Callout>

#### DRM Configuration   {/*drm-configuration*/}

If you have the DRM service option, this section is activated.

Check **Enable DRM**, then choose the desired option:

-   BUYDRM: Enables DRM on MPEG-DASH output; disables all other outputs.

-   BUYDRM_WITH_RTMP: Enables DRM on RTMP and MPEG-DASH output; disables all other outputs.

##### Viewer Access Configuration   {/*viewer-access-configuration*/}

You can configure **Allow** and **Deny** lists by IP address or geolocation that restrict viewer access to Live Push streams. You can:

-   Add existing lists
-   Create lists either manually or by uploading a CSV file
-   Edit and delete lists

You can also set the action (**Allow** or **Deny**) for any IP address or locations not in the lists that you configured to the stream.

All lists configured for the slot are shown in the **Access control list for this configuration** section at the bottom of the screen.

#### Restricting Access Using Existing Lists   {/*restricting-access-using-existing-lists*/}

1.  Select one or more entries in the **Choose existing list** or **Select continent or countrys** dropdown menus.
2.  Select **Allow** or **Deny** from the dropdown, depending on whether you want to allow or deny access to the list.
3.  Click the **Add** button to add the Access control list for the slot.

#### Creating or Cloning an Access List   {/**/}

Click the **manage IP lists** button above the list at the bottom of the page. A dialog with all currently existing lists displays.

1.  Choose an action:
    -   Create a new list: click the **+ new list** button at the top of the dialog.
    -   Clone an existing list: click the clone icon on the right side of the list's row.

    The NEW IP ADDRESS LIST dialog is displayed.

3.  Name the list; then configure IP addresses:
    -   Type a new address and press **Enter** to add an address.
    -   Click the x on an existing address to remove an address.
    -   Add to the list by uploading a file of IP addresses. Download the CSV example to get started.
4.  Restrict the list to specific accounts by selecting one or more accounts in the dropdown.
5.  Click the **Save** button.

The new list is now available for you to add, as described in [Restricting Access Using Existing Lists](#restricting-access-using-existing-lists).

#### Viewing Access List Details   {/*viewing-access-list-details*/}

Click the **+** icon on the left side of the list's name in the dialog.

The entry expands to show read-only details.

#### Editing an Access List   {/*editing-an-access-list*/}

Begin by clicking the **manage IP lists** button above the list at the bottom of the page. A dialog with all currently existing lists displays.

1.  Click the pencil icon on the right side of the list's row in the dialog.
2.  Modify any of these fields:
    -   Name
    -   IP addresses
        -   Type a new address or click the x on an existing address to remove it.
        -   Add to the list by uploading a file of IP addresses. Download the CSV example to get started.
3.  Restrict the list to specific accounts by selecting one or more accounts in the dropdown.
4.  Click the **Save** button.

#### Deleting an Access List   {/*deleting-an-access-list*/}

1. Click the rubbish-bin icon on the right side of the list's row in the dialog.
2. Click **Delete** in the confirmation dialog.
3. Control removes the list from the slot's Access control list if it was in the Access control list.

#### Setting the Stream's Default Access   {/*setting-the-streams-default-access*/}

If, during playback, an IP address or Geolocation that are not in the Access control list try to access the stream, you can set the default access rule (allow or deny access) using the drop-down menu above the slot's Access control list:

**Default Allow** - automatically allow access from all unknown IP addresses or Geolocations.

**Default Deny** - automatically block access from all unknown IP addresses or Geolocations.

#### Removing Selections from the Slot's Access Control List   {/*removing-selections-from-the-slots-access-control-list*/}

-   Click the **clear all** button at the top right of the list to remove all entries.
-   Hover the mouse over an entry and click the **remove** button to delete just that entry.

## Clone, Delete, Edit, and View Slots   {/*clone-delete-edit-and-view-slots*/}

### Clone a Slot   {/*clone-a-slot*/}
1.  Locate the slot you want to clone and click the **Clone** icon (square on square).

2.  Follow the same steps used when configuring a slot. The values are pre-populated with the same information as the original slot except for the slot name. Since the name has to be unique, you must enter a new name.

3.  Click the **Submit** button, and the new slot is created.

<Callout type="info">If you do not change the name or if you enter the name of an existing slot, a warning appears in the right part of the window.</Callout>

### Delete a Slot   {/*delete-a-slot*/}

<Callout type="info">You cannot undo or recover a deleted slot. You cannot delete a slot that is in "Pending" state.</Callout>

1.  Locate the slot you wish to delete and click the **Delete** icon (rubbish bin).

2.  A confirmation dialog is displayed.

3.  Click the **Delete** button.

    The dialog is dismissed and a spinning circle icon is displayed. Upon deletion, the slot is removed from the list.

### Edit a Slot   {/*edit-a-slot*/}

<Callout type="info">You can edit Live Push slots only.</Callout>

1.  Click the pencil icon on the right side of the list's row in the dialog.
2.  Modify any of these fields:
    -   Name
    -   IP addresses
        -   Type a new address or click the **x** on an existing address to remove it.
        -   Add to the list by uploading a file of IP addresses. Download the CSV example to get started.
3.  Restrict the list to specific accounts by selecting one or more accounts in the dropdown.
4.  Click the **Save** button.

### View Slot Details   {/*view-slot-details*/}

<Callout type="info">For information about viewing slots details, please see the Video Guide.</Callout>

1.  Locate the slot and click the **Details** (eye) icon (or click the slot's row).
    -   You will see the Ingest URLs and Stream Name to enter into your encoder, and you will see the Playback URLs to use in your player.
    -   You can also view the slot's playback URLs.

2.  If you chose the **Enable Subscribe Validation** option while configuring [Content Security](#content-security) for a slot, a Delivery service instance was created in which you can configure access control options. To do so, click the **Configure Validation** button in the Content Security section.

    The service instance opens in Caching & Delivery. See 'Content Security' in [Configuring Content Delivery](/delivery/control/configure/caching_and_delivery) for further instructions.

3.  If you choose to, you may use the SmartEmbed Player found in the section labeled “EMBED CODE.” Choose an embed code option and player type, then copy the embed code and place it on your website. The embed code will play your live stream. For more information about SmartEmbed, see the Player Embedding Guide.

    <Callout type="info">If you enable , the EMBED CODE section is not displayed because and embed code are not compatible</Callout>

4.  The **Copy** icon next to a field allows you to copy the field to the clipboard easily:

    When you click the icon, the browser displays a confirmation that the data has been copied.

5.  You can quickly determine if you are streaming to ingest servers by looking at the URL status indicator to the right of the Primary and Backup **Ingest URLs**:
    -   "Active" means the encoder is currently publishing to that ingest.
    -   "Inactive" means the encoder is not currently publishing to that ingest.
    -   "Error" or "Not Provisioned" means there was an error when querying the ingest for status. Please contact Customer Support.


### View a Slot's Live Stream   {/*view-a-slots-live-stream*/}

<Callout type="info">You cannot view a Live Push slot's stream.</Callout>

To view a slot's live stream:

1.  Locate the desired slot and click the **Player** (play) icon.

2.  A new tab opens in your browser with the HTML player embedded in it. The player plays the live stream.

<Callout type="info">The Player icon is only enabled if is not enabled for the slot. See [MediaVault](#mediavault) for additional information. <br /><br /> The embedded player look and feel is defined by the options configured for the player in the EMBED CODE section of the slot details screen. See [View Slot Details](#view-slot-details) for additional information.</Callout>

## Using Your Slot   {/*using-your-slot*/}

<Callout type="info">For instructions about using Live Push slots, see 'Use Your Slot' in the Video Guide.</Callout>

Once your slot is configured, you can begin streaming to it right away. The slot is available to you whenever you want to use it.

Start by setting up your encoder with the information provided in the “Slot Details” screen. See 'Setting Up Your Encoder' in the [MMD Live Streaming Guide](/delivery/video/mmd_live) for encoder requirements and recommended settings.

Be sure to use the specifications of your slot type when setting up your encoder. It's also important to publish to both primary and backup publishing URLs and use an absolute Timecode in your encoder to provide maximum failover protection for your live stream.

Once you are streaming, use one of the playback URLs shown in the “Slot Details” screen in your video player or app. Or you can use the Edgio SmartEmbed on your website or blog, which loads a player that automatically contains your playback URL.

## Using Secure Playback URLs   {/*using-secure-playback-urls*/}

MMD Live and Live Push support the delivery of live streams over secure URLs. Simply change your playback protocol from `http://` to `https://` to take advantage of secure delivery.

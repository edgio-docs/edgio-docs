---
title: Configuration UI
---
You can access the Control portal to view and configure the slots you have purchased. You can view, create, copy, and more.

## Main Configuration Page  {/*main-config-page*/}

After logging into the Control portal, click the "Configure" menu on the left navigation, then click "Live Streaming."

The live slots configured for your specific shortname are listed. You can view summary information for the type of slots you have purchased at the top of this page. For the transcode and transmux slots, the display shows how many you have configured (used) and how many of each type you still have left to configure (available). If 0 slots are available, you cannot create any more of that specific slot type.

### Buttons and Icons  {/*buttons-and-icons*/}

**\+ new** button: At the top right of the screen, allows you to configure one of your purchased live slots.

Icons are on the right side of each slot row. Icons for non-Live Push slots and Live Push slots are different.

**Non-Live Push Slot**

![Non-Live Push Slots](/images/delivery/video/non_lp_slots.png)

- **Details**: This lets you view a specific live slot in detail. See [View Slot Details](#view-details). (You can also view slot details by clicking in the slot's row.)
- **Clone**: Makes a copy of an existing live slot configuration. See [Clone a Slot](#clone).
- **Record and Schedule**: Specific to functionality.
- **Player**: This allows you to view the live stream. See [Viewing a Slot's Live Stream](#view-live-stream).
- **Delete**: This allows you to delete a live slot configuration. See [Delete a Slot](#delete).

**Live Push Slots**

Live Push slots do not allow recording and scheduling. They also allow users to edit a slot.

![Live Push Slots](/images/delivery/video/lp_slots.png)

- Edit: Edit the configuration. See [Edit a Slot](#edit).
- Player: View the live stream. The embedded player is disabled for the feature.
- Details, Clone, Delete: See descriptions in Non-Live Push Slot information in the previous section.

### List Information  {/*list-information*/}

Each entry in the list has the following information:

- **name**: The name given to the slot when creating it.
- **date created**: The date the slot was created.
- **type**: The type of slot.
- **region**: The geographic region into which the slot ingests.
- **ID**: The specific ID number given to your slot for tracking and routing purposes.

The status of the slot is shown to the left of the icons. Possible statuses are:

- "Published" means your slot has been properly configured and is ready to use.
- "LiveEventProvisioning" means the slot configuration is in the process of being set up. It can take several minutes for all the configurations to be enabled.
- "Not\_Provisioned" or "Error" means the configuration has not been set up on the ingest. Please contact Customer Support.

Click on a specific slot (or click the *Details* icon) to view slot details.

### Filtering and Sorting the List of Slots  {/*filtering-and-sorting*/}

Filtering and sorting controls appear above the list of slots:

![Filter and Sort](/images/delivery/video/filter_sort.png)

The *Show only* drop-down menu is disabled by default.

### Filtering  {/*filtering*/}

To filter the list, click the Filter by  and select a value to filter by:

- Region
- Type

When you select a value, the Show only  becomes enabled and contains a list of options relevant to the value in the Filter by .

| 'Filter by' Value | Options in 'Show only' |
| --- | --- |
| Region (the region the slot ingests into) | -   **All**: show all regions; the default value<br />-   **North-America**: show North America regions only.<br />-   **Asia-Pacific**: show Asia Pacific regions only.<br />-   **Europe**: show European regions only.<br /><br />The regions shown in the are limited to those regions where slots are set up. |
| Type (the type of slot) | -   **All**: show all slot types, default<br />-    Other options (click to limit the list to that type):<br />    --   Transcode 720p<br />    --   Transcode 576p<br />    --   Transcode 1080p<br />    --   Transmux<br /><br />The entries shown in the will be those types with slots that are set up. |

### Sorting  {/*sorting*/}

Select a value in the *Sort by* drop-down menu:

- Date created
- Name
- Region
- Type

## Configuring a Slot  {/*configuring-slot*/}

Configuring a slot is a simple process.

1. Begin by clicking the *new* button at the top of the page and selecting a slot type:

    <Callout type="info">According to your account, the number in parentheses beside the transcode and transmux slots indicates the number of remaining slots you can create of each type.</Callout>

2. Then, fill out fields in the following sections on the page that appears:

    [Identifying information](#id-info)

    [Ingest details](#ingest)

    [Configuration Details](#config-details)

    [Encoding details](#encoding)

    [Content Security](#content-security)

3. Review your configuration, making any corrections.
4. When finished, click the *Submit* button.

### Identifying Information  {/*id-info*/}

![Identifying Information](/images/delivery/video/identifying_info.png)

| Field Name | Description | Notes |
| --- | --- | --- |
| Name | Identifies your slot. | A unique slot name is required; no two slots may have the same name.<br /><br />The slot name can have a maximum of 63 characters.<br /><br />A name can only contain letters, numbers, and hyphens (-). It cannot start or end with a hyphen.<br /><br />Spaces are not allowed. |
| Keywords, comma-separated | Optional keywords to tag your slot. (A search feature may be added in the future.) | -   Maximum of 128 characters each. To enter a tag, type the value, then press the Enter key. The following characters are not allowed:<br />    -   period ('.')<br />    -   apostrophe (''')<br />    -   slash ( '/')<br />    -   backward slash (`\`)<br />    -   left bracket (`[`)<br />    -   right bracket (`]`)<br /><br />This field is not visible for Live Push Slots. |
| Description | An optional free-form field to describe your slot. | Maximum of 1024 characters.<br /><br />This field is not visible for Live Push Slots. |
| Callback URL | The URL to which you want to publish events. See the '[Event Callback API Developers Reference](../../../../../Video/Video - Platform/Guide/callback_api.htm)' for more details. | This field is not visible for Live Push Slots. |
| --- | --- |
| Region (the region the slot ingests into) | -   All: show all regions; the default value<br />-   North-America: show North America regions only.<br />-   Asia-Pacific: show Asia Pacific regions only.<br />-   Europe: show European regions only.<br /><br />The regions shown in the are limited to those regions where slots are set up. |
| Type (the type of slot) | -   All: show all slot types, default<br /><br />-   Other options (click to limit the list to that type):<br />    -   Transcode 720p<br />    -   Transcode 576p<br />    -   Transcode 1080p<br />    -   Transmux<br /><br />-   Live Push<br /><br />The entries shown in the will be those types with slots that are set up. |

### Ingest Details  {/*ingest*/}

![Ingest Details](/images/delivery/video/ingest_details.png)

| Field Name | Description | Notes |
| --- | --- | --- |
| Choose ingest region | The region in which you want to ingest into your slot. | Select a region where your encoder is located or the region closest to the physical location of your encoder. |
| Primary POP, Backup POP | Once you select a region, the available s are listed in these drop-downs. | Select the primary that is closest to the physical location of your encoder to minimize data transmission time. Your backup selection must be different from your primary to provide redundancy for your live stream if there is a problem streaming to the primary.<br /><br />The Backup POP field is only displayed if you check the 'Use Backup Ingest' checkbox. |

### Encoding Details  {/*encoding*/}

<Callout type="info">The *Encoding Details* section is not available for Live Push streams.</Callout>

#### Transcode Slots

![Encoding Details](/images/delivery/video/encoding_details.png)

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Transcode bitrates | The bitrates you want to output from this slot. By default, none are selected, but you must choose at least one to proceed.<br /><br />1.  Select individual bitrates or choose 'Select all'.<br />2.  Click the *add* button. | Each selection is an encoding profile<br /><br />All configured bitrates must be published by your encoder to MMD Live for the slot to function correctly. |
| Bitrates for this slot | Displays all selected bitrates.<br /><br />If you have 'Bitrate Order' enabled for your account, a drag handle displays when you hover your mouse to the left a slot's order number.<br /><br />Use the drag handle to drag and drop bitrates to reorder them. The order number determines the order in which the bitrate URL appears in the output manifest file. | MSS output will not support a custom order in which the audio-only bitrate is placed first.<br /><br />To remove a bitrate, hover over its row and click the *remove* button. |
| -   Enable subtitles<br /><br />-   Allow to manage timecodes<br /><br />-   Output Formats | See [Subtitles and Timecodes](#subtitles-and-timecodes). |     |

#### Transmux Slots

![Transmux Slots](/images/delivery/video/transmux_slots.png)

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Transmux bitrates | Bitrate configuration for transmux slots is highly customizable.<br /><br />1.  Select up to eight bitrates from the .<br />2.  Click the add button | Each selection is an encoding profile<br /><br />Your encoder must publish all configured bitrates. |
| Bitrates for this slot | A suggested set of video and audio bitrates is available in the drop-down boxes, but you may also enter your custom bitrates in those boxes.<br /><br />If you have 'Bitrate Order' enabled for your account, each bitrate has a drag handle to its left.<br /><br />Drag and drop bitrates to reorder them. The order number determines the order in which the bitrate URL appears in the output manifest file. | You must select at least one bitrate.<br /><br />All configured bitrates must be published by your encoder to MMD Live for the slot to function correctly.<br /><br />The total bitrate (video + audio) is automatically calculated and displayed in the row for each bitrate.<br /><br />The summation of all totals is displayed at the top of the bitrate list.<br /><br />To remove a bitrate, hover over its row and click the *remove* button. |
| -   Enable subtitles<br /><br />-   Allow to manage timecodes<br /><br />-   Output Formats | See [Subtitles and Timecodes](#subtitles-and-timecodes). |     |

#### Subtitles and Timecodes  {/*subtitles-and-timecodes*/}

Beneath the slot's list of bitrates are checkboxes for managing subtitles and timecodes and a drop-down menu for selecting the output format.

![Enable Subtitles](/images/delivery/video/enable_subtitles.png)

| Field Name | Description/Instructions | Notes |
| --- | --- | --- |
| Enable subtitles | Select this option to accurately inform iOS players that subtitles are present in HLS output from MMD Live. | If you don't select the option and the `#EXT-X-MEDIA:TYPE=SUBTITLES` tag is present, but subtitles are not, the iOS player will display a CC menu option to display subtitles even though subtitles are not present. |
| Allow to manage timecodes | If your encoder does not allow you to enable absolute timecodes in chunks or if you want Edgio to manage timecodes, check this checkbox. | Absolute timecodes in chunks are necessary to enable the seamless transition from primary to backup to ingest in a primary ingest failure.<br /><br />Timecodes allow the failover mechanism to seamlessly switch to the backup stream at the correct time, resulting in little or no interruption to a viewer's experience when watching the live stream. |
| Output Formats | Select one or more output formats; then click the 'Apply' entry at the bottom of the . | The slot will produce output in the formats that you selected. |

### Content Security  {/*content-security*/}

This section allows you to configure MediaVault and DRM content protection.

Here is a sample configuration for non-Live Push slots:

![Content Security](/images/delivery/video/content_security.png)

<Callout type="info">For Live Push slots: <br />- The Enable DRM option is not available.<br />- The ability to configure Allow and Deny lists to control viewer access is also available.</Callout>

#### MediaVault  {/*mediavault*/}

If you have the MediaVault service option, this section is activated.

Check the *Enable MediaVault content protection* checkbox, then choose the type of MediaVault you would like to implement in this slot:

- URL-based. For URL-based MediaVault, you may choose to MediaVault protect just the main manifest of HLS outputs or both the main manifest and all sub-manifests.
- Cookie-based

You can set your hash secret per slot. You can find more information in the [MediaVault User Guide](/delivery/delivery/mediavault) or by talking to your Edgio Representative.

<Callout type="info">Enabling MediaVault causes the Integrated Player Embed Code not to function.</Callout>

#### DRM Configuration  {/*drm*/}

If you have the DRM service option, this section is activated.

Check **Enable DRM**, then choose **BUYDRM** to enable DRM on MPEG-DASH output; disables all other outputs.

## Slots - Clone, Delete, and View  {/*slots*/}

### Clone a Slot  {/*clone*/}

1. Locate the slot you want to clone and click the **Clone** icon.

    ![Clone Icon](/images/delivery/video/clone_icon.png)

2. Follow the same steps used when configuring a slot. The values are pre-populated with the same information as the original slot except for the slot name. Since the name has to be unique, you must enter a new name.
3. Click the **Submit** button, and the new slot is created.

<Callout type="info">If you do not change the name or enter the name of an existing slot, a warning appears in the right part of the window.</Callout>

### Delete a Slot  {/*delete*/}

1. Locate the slot you wish to delete and click the **Delete** (rubbish bin) icon.

    <Callout type="info">You cannot undo or recover a deleted slot.
</Callout>

2. A confirmation dialog is displayed.

3. Click the **Delete** button.

    The slot is removed from the list.

### Edit a Slot  {/*edit*/}

MMD Live currently does not support the editing of slots. Currently, you must create a new slot and then delete the old or incorrect slot.

### View Slot Details  {/*view-details*/}

1. Locate the slot and click the **Details** icon (or click the slot's row)

    ![Details Icon](/images/delivery/video/details_icon.png)

    You will see the Ingest URLs and Stream Name to enter into your encoder, and you will see the Playback URLs to use in your player:

    ![Details Screen](/images/delivery/video/details_screen.png)

    You can also view the slot's playback URLs.

2. If you choose to, you may use the Edgio SmartEmbed Player found in the section labeled “EMBED CODE.” Choose an embed code option and player type, then copy the embed code and place it on your website. The embed code will play your live stream. For more information about SmartEmbed, see the Player Embedding Guide.

    <Callout type="info">If you enable MediaVault, the EMBED CODE section is not displayed because MediaVault and embed code are not compatible</Callout>

3. The Copy (double-window) icon next to a field allows you to copy the field to the clipboard easily:

    ![Copy](/images/delivery/video/copy.png)

    When you click the icon, the browser displays a confirmation that the data has been copied.

4. You can quickly determine if you are streaming to MMD Live ingest servers by looking at the URL status indicator to the right of the Primary and Backup Ingest URLs:

- "Active" means the encoder is currently publishing to that ingest.
- "Inactive" means the encoder is not currently publishing to that ingest.
- "Error" or "Not Provisioned" means there was an error when querying the ingest for status. Please contact Customer Support.

### View a Slot's Live Stream  {/*view-live-stream*/}

<Callout type="info">You cannot view a Live Push slot's stream.
</Callout>

To view a slot's live stream:

1. Locate the desired slot and click the Player icon.

    ![Player Icon](/images/delivery/video/player_icon.png)

2. A new tab opens in your browser with the HTML player embedded in it. The player plays the live stream.
The Player icon is only enabled if [MediaVault](#mediavault) is not enabled for the slot. See MediaVault for additional information.

<Callout type="info">The player's options in the *EMBED CODE* section of the slot details screen define the embedded player's look and feel. See [View Slot Details](#view-details) for additional information.</Callout>

## Using Your Slot  {/*using-your-slot*/}

<Callout type="info">For instructions about using Live Push slots, see 'Use Your Slot' in the Video [Live Push Guide](/delivery/video/live_push).</Callout>

Once your slot is configured, you can begin streaming to it right away. The slot is available to you whenever you want to use it.

Start by setting up your encoder with the information provided in the “Slot Details” screen. See '[Setting Up Your Encoder](/delivery/video/mmd_live/encoder_settings)' in the [MMD Live Streaming Guide](/delivery/video/mmd_live) for encoder requirements and recommended settings.

Be sure to use the specifications of your slot type when setting up your encoder. It's also important to publish to both primary and backup publishing URLs and use an absolute Timecode in your encoder to provide maximum failover protection for your live stream.

Once you are streaming, use one of the playback URLs shown in the “Slot Details” screen in your video player or app. Or you can use the Edgio SmartEmbed on your website or blog, which loads a player that automatically contains your playback URL.

## Using Secure Playback URLs  {/*secure-playback-urls*/}

MMD Live and Live Push support the delivery of live streams over secure URLs. Simply change your playback protocol from `http://` to `https://` to take advantage of secure delivery.

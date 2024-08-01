---
title: Virtual Linear Playlists and Smartstart
---

Use a virtual linear playlist to simulate a linear stream experience that allows viewers to stream one or more asset(s) in sequence.

**Which solution should I use to stream VOD assets?**

Use one of the following solutions to allow your viewers to stream VOD assets:

- **Smartstart**: Use Smartstart to generate a virtual linear experience for a single asset.

- **Virtual Linear Playlist**: Use a standard virtual linear playlist to generate a virtual linear experience for multiple assets.

  <Info>You may create a virtual linear playlist for a single asset. However, the recommended method is to enable Smartstart on your assets in bulk.</Info>

- **Comma-Delimited VOD Playback URL**: List all of the desired assets within a playback URL.

  <Tip>Use a virtual linear playlist for better performance.</Tip>

- **Live Channel**: Schedule VOD assets within a live channel.

  <Info>A live channel's feed determines what viewers will stream at any given time. This allows the live channel's viewers to stream the same content at the same time. Playback for a virtual linear playlist, on the other hand, always starts with the playlist's first asset.</Info>

## Advantages  {/*advantages*/}

A virtual linear playlist provides the following advantages over a comma-delimited VOD playback URL:

- Faster player load times
- Higher monetization

**How does a virtual linear playlist provide better performance?**

- **Comma-Delimited VOD Playback URL**: A standard VOD playback session requests ads and inserts them into the manifest upon initiating playback. Playback will not start until the manifest is finalized. The amount of latency that this causes varies according to the number of assets in the comma-delimited VOD playback URL and their duration.

- **Virtual Linear Playlist**: A virtual linear playlist requests ads and inserts them into the manifest when a playback session approaches an ad break. This eliminates or reduces ad request timeouts, stale ads, and the unnecessary depletion of ad inventory.

## Smartstart  {/*smartstart*/}

Smartstart provides a virtual linear experience for a single asset through the use of a virtual linear playlist that only contains that asset.

<Tip>Enable Smartstart on one or more asset(s) through the Bulk Smartstart endpoint. This endpoint creates a virtual linear playlist that is assigned the same system-defined ID as its asset.</Tip>

**What are the differences between Smartstart and a standard virtual linear playlist?**

Smartstart, which is a specialized version of a virtual linear playlist, provides an efficient method for creating a virtual linear experience for a single asset. Additionally, it creates a virtual linear playlist whose ID matches the asset it contains. This simplifies playback setup by allowing you to leverage asset IDs when generating playback URLs for Smartstart-enabled assets.

<Info>You may create a virtual linear playlist for a single asset. However, the virtual linear playlist will be assigned a random ID.</Info>

## Virtual Linear Playlist Management  {/*virtual-linear-playlist-management*/}

Use virtual linear playlists to provide a [virtual linear experience](#virtual-linear-experience) for one or more asset(s). View and manage your virtual linear playlists from the [Playlists](https://cms.uplynk.com/static/cms2/index.html#/content/playlists) page.

<Tip>You may also create, update, and retrieve playlists through the [Virtual Linear Playlist API](https://docs.edgecast.com/video/Content/Develop/VLP-API.htm).</Tip>

<Info>Create a virtual linear playlist for Smartstart through the [Bulk Smartstart endpoint](https://docs.edgecast.com/video/Content/Develop/VLP-API.htm#BulkSmartstart). This type of virtual linear playlist is assigned the same system-defined ID as its asset.</Info>

**Key Information**

- A virtual linear playlist's **Require a token for playback** option determines whether playback requires a [digital signature](/uplynk/deliver/playback_urls/#signing-playback-urls-with-token).

- The enforcement of Studio DRM is determined by the manner in which the **Require studio approved DRM for playback** option is configured on:
  - The virtual linear playlist
  - Each asset associated with the desired virtual linear playlist

    <Info>Disabling the Studio DRM requirement on a virtual linear playlist does not affect whether an individual asset requires Studio DRM.</Info>

    Disable Studio DRM protection for the entire virtual linear playlist viewing experience through the following steps:
    1. Disable the desired virtual linear playlist's **Require studio approved DRM for playback** option.
    2. Add the following query string parameter to the playback URL: `drm_optional=1'

- Restrict a virtual linear playlist to assets that have been encoded with the same codec (i.e., AVC or HEVC).

- A virtual linear playlist supports the following types of ads:

  - **Pre-roll ads**: Add the following query string parameter to the playback URL: `ad.preroll=1`
  - **Post-roll ads**: Add the following query string parameter to the playback URL: `ad.postroll=1`
  - **Ads between assets**: You may insert ad placeholders within your virtual linear playlist by adding ad breaks.

        <Info>Adding an ad break will automatically append it to your virtual linear playlist. Drag the ad break's icon <Image inline src="/images/uplynk/drag-icon.png" alt="Revert" /> to the desired position.</Info>

        <Info>Alternatively, you add ad breaks through the [Virtual Linear Playlist API](https://docs.edgecast.com/video/Content/Develop/VLP-API.htm) by defining the ad dictionary between the desired assets.</Info>

  - **Embedded ads**: Determine whether an asset's ad breaks will be honored and their duration through the **Embedded Ad Break Duration** option.

- Playback URLs are provided on the desired playlist's **Playback** tab.

    <Info>Alternatively, you can [construct a playback URL](/uplynk/deliver/playback_urls/#virtual-linear-playlists) by using the desired playlist's ID. Each playlist is assigned a 32-character hexadecimal unique identifier upon its creation.</Info>

- Preview playback by clicking the preview player that appears on the right-hand side of the window. By default, this preview player displays the playlist's poster image.

### Create a Virtual Linear Playlist  {/*create-a-virtual-linear-playlist*/}

1. Navigate to the [Playlists page](https://cms.uplynk.com/static/cms2/index.html#/content/playlists): From the main menu, navigate to **Content** > **Playlists**.

2. Click **+ Create Playlist**.

3. In the **Playlist Name** option, assign a name to the new playlist.

4. Click **Create & Edit.**

5. Perform the following steps to determine how ads embedded within assets will behave:

   - **Enable:** Set the **Embedded Ad Break Duration** option to the durations, in seconds, for each ad break within an asset.

     <Info>Use the **Embedded Ad Break Slate Fill** option to determine whether an ad slate will play when there is insufficient ad content for an ad break. Setting this option to **No** will return the viewer back to content when there is insufficient ad content for an ad break.</Info>

   - **Disable:** Set the **Embedded Ad Break Duration** option to `0`.

6. Verify that the **Active** option is set to **Yes**.

7. Use the **Repeat** option to determine whether the playlist will repeat when a viewer reaches the end of the playlist. Enabling this option will cause it to repeat indefinitely.

8. Click **Save Playlist**.

9. Click the **Entries** tab.

10. Add assets to the playlist by performing these steps:

- Click **+ Assets**.
- Find the desired asset and then mark the checkbox that appears directly to the left of it.

     <Info>Assets are added to your playlist in the order in which they are marked. However, they can be reordered after they have been added to your playlist. Reduce this cleanup effort by selecting assets according to the order in which they should appear in your playlist.</Info>

- Repeat the previous step as needed.
- Click **Add to Playlist**.

    <Tip>Reposition an asset by dragging the move icon <Image inline src="/images/uplynk/drag-icon.png" alt="Revert" /> to the desired position in the playlist.</Tip>

11. **Add ad breaks to the playlist** by performing the following steps:

    - Click **+ Ad Break**.
    - From the **Duration (seconds)** option, indicate the duration, in seconds, of the ad break.
    - Click **Add**. The ad break will be appended to your playlist.
    - Reposition the ad break by dragging the move icon <Image inline src="/images/uplynk/drag-icon.png" alt="Revert" /> to the desired position in the playlist.
    - Repeat Step 12 as needed.

12. Click **Save Playlist.**

### Duplicate a Virtual Linear Playlist  {/*duplicate-playlist*/}

This feature allows you to copy an existing playlist's entries and settings while leaving the original playlist unchanged.

1. Navigate to the [Playlists page](https://cms.uplynk.com/static/cms2/index.html#/content/playlists): From the main menu, navigate to **Content** > **Playlists**.
2. Click the row of the playlist.
3. Select **Duplicate** from the top right corner.
4. Enter a name for the new playlist.

    <Info>By initial default the Edit after duplicate option is selected and will open the new playlist after saving. Uncheck to return to the original playlist. Your selection is saved as the default for subsequent playlist duplications.</Info>

5. Click **Duplicate**.
6. Optional. If you selected the **Edit after duplicate** option, make your changes to the playlist.
7. Click **Save**.

### Modify a Virtual Linear Playlist  {/*modify-a-playlist*/}

1. Navigate to the [Playlists page](https://cms.uplynk.com/static/cms2/index.html#/content/playlists): From the main menu, navigate to **Content** > **Playlists**.

2. Click on the desired playlist.

3. Perform one of the following actions:

   - Add one or more asset(s) to the playlist.
   - Remove one or more asset(s) or ad break(s) from the playlist.
   - Update an ad break's duration.
   - Modify how ads embedded within assets will behave.

4. Enable or disable a playlist through the **Active** option, which can be found on the **Details** tab.

5. Determine whether the playlist will repeat when a viewer reaches the end of the playlist through the **Repeat** option.

#### Add Assets to Playlist  {/*add-assets-to-playlist*/}

1. Click the **Entries** tab.
2. Click **+ Assets**.
3. Find the desired asset and then mark the checkbox that appears directly to the left of it.

    <Tip>Assets are added to your playlist in the order in which they are marked. However, they can be reordered after they have been added to your playlist. Reduce this cleanup effort by selecting assets according to the order in which they should appear in your playlist.</Tip>

4. Repeat the previous step as needed.
5. Click **Add to Playlist**.
6. Click **Save Playlist**.

    <Tip>Reposition an asset by dragging the  icon to the desired position in the playlist.</Tip>

#### Remove Assets from Playlist  {/*remove-assets-from-playlist*/}

1. Click the **Entries** tab.
2. Mark the checkbox next to each desired asset or ad break.
3. Click **Remove**.
4. Click **Save Playlist**.

#### Update an Ad Break's Duration  {/*update-ad-break-duration*/}

1. Click the **Entries** tab.
2. Mark the checkbox next to the desired ad break.
3. Click **Remove**.
4. Click **+ Ad Break**.
5. From the Duration (seconds) option, indicate the duration, in seconds, of the ad break.
6. Click **Add**. The ad break will be appended to your playlist.
7. Reposition the ad break by dragging the <Image inline src="/images/uplynk/drag-icon.png" alt="Revert" /> icon to the desired position in the playlist.
8. Click **Save Playlist**.

#### Modify Behavior of Ads Embedded in Assets  {/*modify-behavior-of-ads-embedded-in-assets*/}

- **Enable**: From the **Details** tab, set the **Embedded Ad Break Duration** option to the durations, in seconds, for each ad break within an asset.

    <Tip>Use the Embedded Ad Break Slate Fill option to determine whether ad slate will play when there is insufficient ad content for an ad break. Setting this option to No will return the viewer back to content when there is insufficient ad content for an ad break.</Tip>

- **Disable**: From the **Details** tab, set the **Embedded Ad Break Duration** option to `0`.

### Delete a Virtual Linear Playlist  {/*delete-virtual-linear-playlist*/}

1. Navigate to the [Playlists page](https://cms.uplynk.com/static/cms2/index.html#/content/playlists): From the main menu, navigate to **Content** > **Playlists**.
2. Click on the desired playlist.
3. Click **Delete Playlist** from the bottom right corner.
4. When prompted, confirm deletion by clicking **Delete**.

## Virtual Linear Experience  {/*virtual-linear-experience*/}

Simulate a more authentic virtual linear experience by implementing the following components:

- [Timeline](#timeline) - Set up a timeline by including timeline metadata through the `dmm.schemas.top` query string parameter and then using this metadata to construct the timeline within your player.
- [Seeking](#seeking) - Use the `plts` (i.e., playlist timestamp) query string parameter within the playback URL to seek to a specified position in the playlist.

## Timeline  {/*timeline*/}

Implement a timeline within your player by leveraging content duration and ad break location information provided within a timeline Dynamic Manifest Marker. A Dynamic Manifest Marker dynamically provides different types of metadata (e.g., timeline and ad break information) within the manifest file.

<Warning>A timeline Dynamic Manifest Marker does not provide information about ad duration. Additionally, ad break duration is unknown at the start of the playback of a virtual linear playlist. Therefore, we recommend that ad breaks be represented within the timeline as events (e.g., a mark within the timeline).</Warning>

<Warning>Include information about requested ads by adding ad break Dynamic Manifest Markers.</Warning>

[Learn more.](#)

### Add a Timeline Dynamic Manifest Marker  {/*add-a-timeline-dynamic-manifest-marker*/}

To add a timeline Dynamic Manifest Marker to the top of a manifest file, include the following query string parameters in the playback URL:

`&dmm.schemas.top=timeline&pltl=1`

<Info>The `pltl` (i.e., playlist timeline) query string parameter adds timeline metadata for all of the assets defined within your virtual linear playlist. This could lead to a large timeline when your playlist contains multiple assets or when there are many ad breaks between assets.</Info>

<Info>The `pltl` query string parameter is optional for Smartstart-enabled assets.</Info>

**Sample playback request**: <br />
`https://content.uplynk.com/playlist/10c5467d77c54dc4b739db2cd832143a.mpd?dmm.schemas.top=timeline&pltl=1`

**Sample playback request (Smartstart)**:<br />`https://content.uplynk.com/playlist/12d5e67d77c54dc4b739fb2cd835944c.mpd?dmm.schemas.top=timeline`

Sample representations of timeline metadata for HLS and DASH are provided below.

- **HLS version 7 and up** - A timeline Dynamic Manifest Marker is added as an #EXT-X-DATERANGE tag at the top of a ray manifest file. The X-DATA attribute contains Base64-encoded timeline metadata.

  **Example**:

  ```
  #EXT-X-DATERANGE:ID="2e64fcbc2c5d4eecbf5fc6bb4c8b2d60:2020-12-18 02:09:28.957000+00:00:playlist",

  START-DATE="1970-01-01T00:00:00+00:00",

  DURATION=60.3093,

  CLASS="urn:uplynk:top-data:playlist:v1",

  X-DATA="eyJicmVha3...VwZWF0IjotMX0="
  ```

- **DASH** - A timeline Dynamic Manifest Marker is added as an EventStream tag at the top of a manifest file.

  **Example**:

    ```
    <EventStream schemeIdUri="urn:uplynk:top-data:timeline" timescale="90000" value="top-data">

    <Event duration="5877840" id="5877840" presentationTime="0">{"repeat": -1, "content_duration": 60.3093, "breaks_count": 4, "session_id": "d9cab2afee494db7a0a5b877727ef387", "breaks": [{"id": 1, "offset": 11.0080}, {"id": 2, "offset": 26.0000}, {"id": 3, "offset": 33.0026}, {"id": 4, "offset": 52.0053}]}</Event>

    </EventStream>
    ```

**Sample timeline metadata**:

```
{
	'repeat': -1,
	'content_duration': 60.3093,
	'breaks_count': 4,
	'session_id': 'd9cab2afee494db7a0a5b877727ef387',
	'breaks': [{
			'id': 1,
			'offset': 11.0080
		}, {
			'id': 2,
			'offset': 26.0000
		}, {
			'id': 3,
			'offset': 33.0026
		}, {
			'id': 4,
			'offset': 52.0053
		}
	]
}
```

## Ad Break Dynamic Manifest Markers  {/*ad-break-dynamic-manifest-markers*/}

A virtual linear playlist allows the player to fetch ads as playback approaches an ad break. Leverage ad break Dynamic Manifest Markers to provide metadata about requested ads.

Add ad break Dynamic Manifest Markers to the manifest file by including the following query string parameter in the playback URL: <br />`&dmm.schemas.breaks=break_info`

**Sample playback request**: <br />`https://content.uplynk.com/playlist/10c5467d77c54dc4b739db2cd832143a.mpd?dmm.schema.breaks=break_info`

An ad break Dynamic Manifest Marker may include the following information:

- Requested ad break duration
- Actual ad break duration
- Total duration for all ads
- Number of ads in the ad break
- Actual ad break duration status
- Duration of the current ad
- Position of the current ad within the ad break
- Offset, in seconds, of the current ad within the ad break
- Ad slate
- Whether ad break information has been received from the ad server and processed

Sample representations of this metadata for HLS and DASH are provided below.

- **HLS Version 7 and Up** - An ad break Dynamic Manifest Marker is added as an `#EXT-X-DATERANGE` tag within a manifest file. The `X-DATA` attribute contains Base64-encoded ad break metadata. The `daterange` class for this data is: `urn:uplynk:ad-data:break_info`

- **DASH** - An ad break Dynamic Manifest Marker is reported within an event stream with the following `schemeIdUri`:<br />`urn:uplynk:break_info:ad-data`

Check the `dmm_data_not_ready` property to find out whether actual ad break duration is known.

**Example (unknown actual ad break duration)**:<br />
The following sample data indicates that actual ad break duration has not yet been determined:

```
{
	'break_dur_req': 180.00,
	'break_dur_act': -1,
	'ad_dur': 10010.02,
	'num_ads': 3,
	'ad_slate': 0,
	'dmm_data_not_ready': 1
}
```

**Example (known actual ad break duration)**:<br />The following sample data indicates that actual ad break duration exceeded the requested ad break duration by 5.68 seconds:

```
{
	'break_dur_req': 180.00,
	'break_dur_act': 185.68,
	'ad_dur': 10010.02,
	'num_ads': 3,
	'ad_slate': 0,
	'dmm_data_not_ready': 0
}
```

## Seeking  {/*seeking*/}

Define the `plts` query string parameter within the playback URL to seek to a specific position within the playlist. This seek position is measured from the start of the playlist in seconds.

**Sample playback URL**:<br />The following sample playback URL seeks 2 minutes from the start of the playlist:

`https://content.uplynk.com/playlist/2e64fcbc2c5d4eecbf5fc6bb4c8b2d60.m3u8?plts=120`

**Key information**:

- Only content counts towards seek times. Specifically, ad breaks are excluded from this calculation.
- The `plts` query string parameter is exempt from digital signatures.

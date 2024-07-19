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

    <Tip>Reposition an asset by dragging the drag icon <Image inline src="/images/uplynk/drag-icon.png" alt="Revert" /> to the desired position in the playlist.</Tip>

11. **Add ad breaks to the playlist** by performing the following steps:

    - Click **+ Ad Break**.
    - From the **Duration (seconds)** option, indicate the duration, in seconds, of the ad break.
    - Click **Add**. The ad break will be appended to your playlist.
    - Reposition the ad break by dragging the <Image inline src="/images/uplynk/drag-icon.png" alt="Revert" /> to the desired position in the playlist.
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
3. Click **Delete Playlist**.
4. When prompted, confirm deletion by typing DELETE and then clicking **Delete Playlist**.

---
title: Playback URLs
---

Learn How To:

- **Generate playback URLs for:**
  - Assets
  - Virtual linear playlists
  - Live channels
  - Live events

- **Sign playback URLs with a token**

    - Basic Setup

        - Core identification parameters
        - Signature parameter
    - Encrypting query strings
- **Validate playback URLs using application keys**

## Assets

Use either of the following types of playback URLs to stream an asset:

- **Asset ID (GUID)**: Identifies an asset for playback by its system-defined ID.
- **External ID (Asset)**: Identifies an asset for playback by its external ID.

**Key Information**

- By default, the above playback URLs play an entire asset from start to finish. Alternatively, [playback may be restricted to a portion of an asset](#start-stop).
- A media player may [play multiple assets](#play-multiple-videos) within a single viewing experience by identifying each desired asset within the playback URL.

### Asset ID

Upon the creation of an asset, it is assigned a 32-character hexadecimal unique identifier, known as an asset ID. This ID can be viewed via the CMS, a slicer's output, logs, the [Preplay API](https://docs.edgecast.com/video/Content/Develop/Preplayv2.htm), or the SegmentMap interface. Construct a playback URL by including this asset ID.

**HLS Syntax**: `https://content.uplynk.com/{Asset ID}.m3u8`

**DASH Syntax**: `https://content.uplynk.com/{Asset ID}.mpd`

**Sample playback URL (HLS)**:

Use the following playback URL to stream an asset with an ID of `7771125f336c4e229c20f7307f8c3122` via HLS.

`https://content.uplynk.com/7771125f336c4e229c20f7307f8c3122.m3u8`

#### Find Asset ID

1. Navigate to the CMS library by clicking the **Content** tab.
2. Select the desired asset.
3. The asset ID corresponding to the selected asset is listed under the **GUID** label.

### External ID (Asset)

A playback URL may be constructed by including both of the following values:

- **User ID:** Specify the user ID that corresponds to the owner of the content.
  - **Your CMS Libraries:** Specify your user ID.
  - **Shared CMS Libraries:** Specify the user ID corresponding to the user that shared the library.
- **External ID (Asset)**: A custom ID, known as an external ID, may be assigned to an asset. Typically, this ID reflects a unique value defined in an external database.
    - An external ID may only consist of alphanumeric characters, dashes, and underscores. All other characters, including spaces, are disallowed.
    - External IDs are not tested for validity or uniqueness. An arbitrary matching asset will be played back when multiple assets within a single CMS account have been assigned the same external ID.
    - Use the `_replace:` prefix while slicing to reuse an external ID when re-encoding a new version of an existing asset.
- **HLS Syntax**: `https://content.uplynk.com/ext/{User ID}/{External ID}.m3u8`
- DASH Syntax: `https://content.uplynk.com/ext/{User ID}/{External ID}.mpd`
- Sample Playback URL (HLS): Use the following playback URL to stream an asset with an external ID of `promo_video_12` that is owned by a user whose ID is `f8c29a5f6c4e229c20f7307f8c3122ab`.

    `https://content.uplynk.com/ext/f8c29a5f6c4e229c20f7307f8c3122ab/promo_video_12.m3u8`

#### Find an Asset's External ID

1. Navigate to the CMS library by clicking the **Content** tab.
2. Select the desired asset.
3. The external ID corresponding to the asset selected in the previous step is listed under the **External ID** option.

### Segment (Ad Breaks)

Use this type of playback URL to stream a segment of an asset that contains ad breaks.

- Server-side ad insertion ensures seamless ad integration. As a result, this type of playback URL is typically reserved for legacy client-side ad integrations or non-video ad integrations in which video playback is temporarily suspended.

- Typically, the use of this type of playback URL for assets undergoing slicing or encoding is strongly discouraged.

- Playback by segment is only supported for assets that contain ad breaks.

- This type of playback URL is only supported for HLS playback.

- An asset that contains one or more [ad breaks](/uplynk/acquire/vod/automation_via_slicebot/#configuration-settings) will be split into segments.

    ![Asset with Ad Breaks](/images/uplynk/segments-ad-break.png)

- Segments are identified by a 0-based sequential number. This means that the index number for the first segment will be 0, the second segment will have a value of 1, the third segment will have a value of 2, etc.

**Segment playback URL (Asset ID) syntax**:<br />
`https://content.uplynk.com/segment/{Segment Number}/{Asset ID}.m3u8`

**Segment playback URL (External ID) syntax**:<br />
`https://content.uplynk.com/segment/{Segment Number}/ext/{User ID}/{External ID}.m3u8`

#### Sample Playback URLs

An asset with a single ad break will be split into two segments. Sample playback URLs for each segment are listed below.

**Sample asset ID-based playback URL (first segment)**:<br />`https://content.uplynk.com/segment/0/7731125f336c4e229c20f7307f8c3122.m3u8`

**Sample asset ID-based playback URL (second segment)**:<br />`https://content.uplynk.com/segment/1/7731125f336c4e229c20f7307f8c3122.m3u8`

### Start/Stop Playback by Time or Slice {/*start-stop*/}

Restrict playback by specifying a starting or stopping point via the following customization parameters:

- **Starting Point**: Specify a starting time for playback in seconds (`start`) or slice numbers (`sstart`).
- **Stopping Point**: Specify a stopping time for playback in seconds (`stop`) or slice numbers (`sstop`).

See [General Parameter descriptions](/uplynk/delivery/playback_urls/general_parameters) for more information.

### Play Multiple Videos {/*play-multiple-videos*/}

Multiple videos may be defined within a playback URL. This combines multiple videos into a single playlist (i.e., `m3u8`) which allows a media player to play them back as if they were a single asset.

<Tip>An alternative method of playing multiple videos is to create a virtual linear playlist. The benefits of using a virtual linear playlist instead of manually defining multiple assets within a playback URL are faster player load times and higher monetization by eliminating or reducing ad request timeouts, stale ads, and the unnecessary depletion of ad inventory.</Tip>

**Key Information**

- Both asset ID and external ID playback URLs may point to multiple assets by adding a comma-delimited list of each desired asset and then setting the file name to `/multiple.m3u8` (HLS) or `/multiple.mpd` (DASH).

    - **Asset ID-based playback URL syntax**:

        `https://content.uplynk.com/Asset ID 1,Asset ID 2,Asset ID n/multiple.Extension`<br />(e.g., https://content.uplynk.com/7731125f336c4e229c20f7307f8c3122,6eb8d50020884a1c8bd4c11a38406f14/multiple.m3u8)

    - **External ID-based playback URL syntax**:

        `https://content.uplynk.com/ext/User ID/External ID 1,External ID 2,External ID n/multiple.Extension` <br />(e.g., https://content.uplynk.com/ext/357c9b19d40447989389e6a20f19d55e/pre-show,show,post-show/multiple.m3u8)

    - **Sample asset ID-based playback URL**: The following sample playback URL demonstrates the proper syntax for the playback of two assets whose IDs are `7731125f336c4e229c20f7307f8c3122` and `6eb8d50020884a1c8bd4c11a38406f14`.

        `https://content.uplynk.com/7731125f336c4e229c20f7307f8c3122,6eb8d50020884a1c8bd4c11a38406f14/multiple.m3u8`

    - **Sample external ID-based playback URL**: The following sample playback URL demonstrates the proper syntax for the playback of three assets whose external IDs are `pre-show`, `show`, and `post-show`. This example assumes that these assets belong to a user whose user ID is `357c9b19d40447989389e6a20f19d55e`.

        `https://content.uplynk.com/ext/357c9b19d40447989389e6a20f19d55e/pre-show,show,post-show/multiple.m3u8`


- The specified assets will be played back-to-back in the listed order.
Ad breaks associated with each asset will behave as expected.
- The total duration of the assets requested using a single playback URL must be less than 16 hours.
- All assets defined within a single playback URL must be owned by the same account.
- Do not specify an asset more than once per playback URL.
- Assets that are in the process of being sliced or encoded cannot be combined and therefore should not be included in a playback URL that points to multiple assets.
- Use the `ad.caid` query string parameter to define the asset ID that will be sent to an ad server.

## Virtual Linear Playlists  {/*virtual-linear-playlists*/}

Manage virtual linear playlists through the [Virtual Linear Playlist API](https://docs.edgecast.com/video/Content/Develop/VLP-API.htm). Upon creating a virtual linear playlist, it is assigned a 32-character hexadecimal unique identifier. Use this ID, which is known as a playlist ID, when constructing a playback URL.

<Info>Smartstart provides a virtual linear experience for a single asset. Use the [Bulk Smartstart endpoint](https://docs.edgecast.com/video/Content/Develop/VLP-API.htm#BulkSmartstart) to enable Smartstart on one or more asset(s) by creating a virtual linear playlist for each asset. This type of virtual linear playlist is assigned the same system-defined ID as its asset. This facilitates playback implementation, since it allows you to use this shared ID when constructing a playback URL.</Info>

**HLS Syntax**:

`https://content.uplynk.com/playlist/{Playlist ID}.m3u8`

**DASH Syntax**:

https://content.uplynk.com/playlist/{Playlist ID}.mpd

**Sample playback URL (HLS)**:<br />Use the following playback URL to stream a playlist with an ID of 7771125f336c4e229c20f7307f8c3122 via HLS.

`https://content.uplynk.com/playlist/7771125f336c4e229c20f7307f8c3122.m3u8`

**Key information**:

- Use the virtual linear playlist's `skip_drm` property to determine whether a [digital signature](#signing-playback-urls-with-token) is required. This property overrides an asset's Require a token for playback setting.
- Use the virtual linear playlist's `studio_drm_required` property to determine whether it will be protected by [Studio DRM](/uplynk/manage/content_protection/studio_drm). This property overrides an asset's Require studio approved DRM for playback setting.
- If you plan on implementing a timeline within your player, use the dmm.schemas.top and pltl query string parameters to include timeline data within the manifest. [Learn more](/uplynk/deliver/playback_urls/general_parameters).

    <Info>The `pltl` query string parameter is optional for Smartstart-enabled assets.</Info>
- [Learn more about virtual linear playlists and Smartstart](/uplynk/manage/assets/virtual_linear_playlist_and_smartstart).

## Live Channels

https://docs.edgecast.com/video/index.html#Setup/Playback-URLs.htm%3FTocPath%3DBasic%2520Setup%7CPlayback%2520URLs%7C_____0





### Asset ID-Based Playback URL Syntax



## General Parameters  {/*general-parameters*/}

## Sign Playback URLs with a Token {/*signing-playback-urls-with-token*/}

### Exceptions {/*exceptions*/}



## Core Identification Parameters {/*core-identification-parameters*/}





add links

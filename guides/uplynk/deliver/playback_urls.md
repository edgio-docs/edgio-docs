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

### Asset ID  {/*asset-id*/}

Upon the creation of an asset, it is assigned a 32-character hexadecimal unique identifier, known as an asset ID. This ID can be viewed via the CMS, a slicer's output, logs, the [Preplay API](https://docs.edgecast.com/video/Content/Develop/Preplayv2.htm), or the SegmentMap interface. Construct a playback URL by including this asset ID.

**HLS Syntax**: `https://content.uplynk.com/{Asset ID}.m3u8`

**DASH Syntax**: `https://content.uplynk.com/{Asset ID}.mpd`

**Sample playback URL (HLS)**:

Use the following playback URL to stream an asset with an ID of `7771125f336c4e229c20f7307f8c3122` via HLS.

`https://content.uplynk.com/7771125f336c4e229c20f7307f8c3122.m3u8`

#### Find Asset ID  {/*find-asset-id*/}

1. Navigate to the CMS library by clicking the **Content** tab.
2. Select the desired asset.
3. The asset ID corresponding to the selected asset is listed under the **GUID** label.

### External ID (Asset)  {/*external-id*/}

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

#### Find an Asset's External ID  {/*find-an-asset-external-id*/}

1. Navigate to the CMS library by clicking the **Content** tab.
2. Select the desired asset.
3. The external ID corresponding to the asset selected in the previous step is listed under the **External ID** option.

### Segment (Ad Breaks)  {/*segment-ad-breaks*/}

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

#### Sample Playback URLs  {/*sample-playback-urls*/}

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

        `https://content.uplynk.com/{Asset ID 1},{Asset ID 2},{Asset ID n}/multiple.{Extension}`<br />(e.g., https://content.uplynk.com/7731125f336c4e229c20f7307f8c3122,6eb8d50020884a1c8bd4c11a38406f14/multiple.m3u8)

    - **External ID-based playback URL syntax**:

        `https://content.uplynk.com/ext/{User ID}/{External ID 1},{External ID 2},{External ID n}/multiple.{Extension}` <br />(e.g., https://content.uplynk.com/ext/357c9b19d40447989389e6a20f19d55e/pre-show,show,post-show/multiple.m3u8)

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

**HLS Syntax**:<br /> `https://content.uplynk.com/playlist/{Playlist ID}.m3u8`

**DASH Syntax**:<br /> `https://content.uplynk.com/playlist/{Playlist ID}.mpd`

**Sample playback URL (HLS)**:<br />Use the following playback URL to stream a playlist with an ID of 7771125f336c4e229c20f7307f8c3122 via HLS.

`https://content.uplynk.com/playlist/7771125f336c4e229c20f7307f8c3122.m3u8`

**Key information**:

- Use the virtual linear playlist's `skip_drm` property to determine whether a [digital signature](#signing-playback-urls-with-token) is required. This property overrides an asset's Require a token for playback setting.
- Use the virtual linear playlist's `studio_drm_required` property to determine whether it will be protected by [Studio DRM](/uplynk/manage/content_protection/studio_drm). This property overrides an asset's Require studio approved DRM for playback setting.
- If you plan on implementing a timeline within your player, use the dmm.schemas.top and pltl query string parameters to include timeline data within the manifest. [Learn more](/uplynk/deliver/playback_urls/general_parameters).

    <Info>The `pltl` query string parameter is optional for Smartstart-enabled assets.</Info>
- [Learn more about virtual linear playlists and Smartstart](/uplynk/manage/assets/virtual_linear_playlist_and_smartstart).

## Live Channels  {/*;ive-channels*/}

The two types of playback URLs for a live channel are:

- **Channel ID (GUID)**: Identifies a live channel for playback by its system-defined ID.
- **External ID (Channel)**: Identifies a live channel for playback by its external ID.

### Channel ID (GUID)  {/*channel-id*/}

Upon the creation of a live channel, it is assigned a 32-character hexadecimal unique identifier. View this ID, known as a channel ID, from within the CMS.

**Find a Live Channel ID**

1. From the CMS, click the **Live Channels** tab.
2. Select the desired live channel. Basic options and live channel information will be displayed on the **Details** tab.
3. Find the live channel's system-defined ID under the **GUID** label.

Generate a playback URL for a live channel by including its channel ID.

**HLS Syntax**:<br />`https://content.uplynk.com/channel/{Channel ID}.m3u8`

**DASH Syntax**:<br /> `https://content.uplynk.com/channel/{Channel ID}.mpd`

**Sample playback URL**: <br />The following sample playback URL plays a live channel with an ID of `cd772adbd60a4e898d1c3b1f46c58cea`.

`https://content.uplynk.com/channel/cd772adbd60a4e898d1c3b1f46c58cea.m3u8`

### External ID (Channel)  {/*external-id*/}

A playback URL may be constructed by including both of the following values:

- **User ID**: Specify your user ID.

    **Find my user ID**:
    1. Load the [User Settings page](https://cms.uplynk.com/static/cms2/index.html#/settings/) via **Settings** > **User Settings**.
    2. Your user ID is listed under the **User ID** label.


- **External ID (Channel)**: This external ID is a custom ID that may be assigned to a live channel. Typically, this ID reflects a unique value defined in an external database.

    **Key information**:

    - An external ID may only consist of alphanumeric characters, dashes, and underscores. All other characters, including spaces, are disallowed.
    - External IDs are not tested for validity or uniqueness. An arbitrary matching live channel will be played back when multiple live channels within the same account have been assigned the same external ID.

**Find a live channel's external ID**:
1. From the CMS, click the **Live Channels** tab.
2. Select the desired live channel. Basic options and live channel information will be displayed on the **Details** tab.
3. The live channel's external ID is listed under the **External ID** option.

**HLS Syntax**:<br />`https://content.uplynk.com/channel/ext/{User ID}/{External ID}.m3u8`

**DASH Syntax**:<br /> `https://content.uplynk.com/channel/ext/{User ID}/{External ID}.mpd`

**Sample playback URL**:<br />The following sample playback URL plays a live channel with an ID of `live_feed_east` provided that it belongs to a user whose user ID is `f8c29a5f6c4e229c20f7307f8c3122ab`.

`https://content.uplynk.com/ext/f8c29a5f6c4e229c20f7307f8c3122ab/live_feed_east.m3u8`

## Live Events  {/*live-events*/}

The two types of playback URLs for a live event are:

- **Event ID (GUID)**: Identifies a live event for playback by its system-defined ID.
- **External ID (Event)**: Identifies a live event for playback by its external ID.

### Event ID (GUID)  {/*event-id*/}

An event ID is automatically generated upon creating a live event.

<Info>An alternative method for scheduling a live event is via the Live Events Integration API. An event ID is reported by the id response parameter when creating, updating, or retrieving a live event.</Info>

**Find a live event ID**

1. Navigate to the Live Events page via **Events** > **Live Events**.
2. Select the desired live event.
3. Verify that the **Details** tab is selected.
4. Find the live event's system-defined ID under the **GUID** label.

Generate a playback URL for a live event by including its event ID.

**HLS Syntax**: `https://content.uplynk.com/event/{Event ID}.m3u8`

**DASH Syntax**: `https://content.uplynk.com/event/{Event ID}.mpd`

**Sample playback URL**: The following sample playback URL plays a live event with an ID of `f21c3336c35f47baa59345e2879b6edb`.

`https://content.uplynk.com/event/f21c3336c35f47baa59345e2879b6edb.m3u8`

### External ID (Event)  {/*external-id*/}

A playback URL may be constructed by including both of the following values:

- **User ID**: Specify your user ID.

    **Find my user ID**:
    1. Load the [User Settings page](https://cms.uplynk.com/static/cms2/index.html#/settings/) via **Settings** > **User Settings**.
    2. Your user ID is listed under the **User ID** label.

- **External ID (Event)**: This external ID is a custom ID that may be assigned to a live event. Typically, this ID reflects a unique value defined in an external database.

    **Key information**:

    - An external ID may only consist of alphanumeric characters, dashes, and underscores. All other characters, including spaces, are disallowed.
    - External IDs are not tested for validity or uniqueness. An arbitrary matching live event will be played back when multiple live events within the same account have been assigned the same external ID.

**Find a live event's external ID**

1. Navigate to the Live Events page via **Events** > **Live Events**.
2. Select the desired live event.
3. Verify that the **Details** tab is selected.
4. Find the live event's system-defined ID under the **External ID** label.

**HLS Syntax**:<br /> `https://content.uplynk.com/event/ext/{User ID}/{External ID}.m3u8`

**DASH Syntax**:<br /> `https://content.uplynk.com/event/ext/{User ID}/{External ID}.mpd`

**Sample playback URL**: The following sample HLS playback URL plays a live event with an ID of live_feed_east provided that it belongs to a user whose user ID is `1855369d5db040539700c6cb724d1f16`.

`https://content.uplynk.com/event/ext/1855369d5db040539700c6cb724d1f16/live_feed_east.m3u8`

## Sign Playback URLs with a Token {/*signing-playback-urls-with-token*/}

Control how and when content is consumed by informing our system when playback should be allowed by including an HMAC token that signs your playback URL. By default, an asset, live channel, or live event is configured to require a digital signature prior to playback. This digital signature must be appended to the playback URL's query string. Upon requesting playback, our system will use the digital signature to validate that the playback window has not expired and the integrity of the playback URL and query string. Playback will only be allowed once the digital signature has been validated.

**Determine whether playback URLs must be signed**

1. From the CMS, perform one of the following:

    - **Asset**: Select the desired asset from the [Content tab](https://cms.uplynk.com/static/cms2/index.html#/content) and then click the **Playback** tab.
    - **Live Channel**: Select the desired live channel from the **Live Channels** tab and then click the **Playback** tab.
    - **Live Event**: Open the desired live event from the [**Live Events** page](https://cms.uplynk.com/static/cms2/index.html#/live-events/events) and then click the Config tab.
2. Toggle the state of the **Require a token for playback** option to determine whether the playback URL must be signed.
3. Click **Save**.

### Exceptions {/*exceptions*/}

Our system automatically hosts a playback page and signs playback URLs under the following circumstances:

- Test players
- HTML embed code

**Key information**:

- Please take care when distributing or sharing test players or HTML embed code. Either one may be used to play your content without restrictions.

    <Tip>Playback via HTML embed code may be restricted to specific domains via the Allowed Domains option.</Tip>

    <Info>Test players are designed to facilitate testing and demos.</Info>

- A test player may be invalidated by clicking the icon that appears next to it, while HTML embed code may be expired by clicking **Expire**. Upon saving your changes, a new test player or HTML embed code may be automatically generated.

    <Tip>Prevent test players from being automatically generated by marking the Enable option under the **Prevent Auto Creating Test Players** section of the [Test Player Restrictions page](https://cms.uplynk.com/static/cms2/index.html#/settings/test-players).</Tip>

### Basic Setup  {/*basic-setup*/}

<Tip>Most programming languages only require a few lines of code to sign a playback URL.</Tip>

Define what will be signed and the digital signature through the following query string parameters:

- [Core identification parameters](#core-identification-parameters): Include these required parameters in order to identify playback content, its owner, and the playback window.

- [Customization parameters](#customization-parameters): Include these optional parameters to customize how content playback is handled.
- [Signature parameter](signature-parameter): Append the `sig` parameter to the end of the query string to digitally sign the playback URL based off of the specified core identification and customization parameters.

**Syntax**:<br />`{Playback URL}?{Core Identification Parameters}&{Optional Customization Parameters}&sig={Signature}`

**Example**:<br />`https://content.uplynk.com/ext/aaaaaaa/my_asset.m3u8?tc=1&exp=1530561660&rn=411...48&ct=a&cid=ea10...c38&sig=37e...cbf`

#### Core Identification Parameters {/*core-identification-parameters*/}

The following core identification parameters must be specified:

| Parameter | Description | Example        |
|--------|----|---|
| tc      | Identifies the token check algorithm version. Set this parameter to `1`.| `tc=1`|
| exp     | Determines when, in Unix time, this signed playback URL expires. Digital signatures should have a short lifespan. However, they should not expire less than 10 seconds after being issued. | `exp=1530316768`|
| rn      | Defines a random number that increases the uniqueness of the signature.| `rn=4114845747`|
| ct      | Identifies the type of content that will be played back. Valid values are: `a` for Asset, `c` for Live channel, `e` for Live event, `p` for Virtual linear playlist (including Smartstart-enabled assets). | `ct=a`|
| cid     | Identifies an asset, channel, live event, or virtual linear playlist via one of the following methods: <br /> - **System-defined ID (GUID):** Set the `cid` parameter to an [asset ID](#asset-id), [channel ID](#channel-id), [event ID](#event-id), or [playlist ID](#virtual-linear-playlists). <br /> - **External ID:** Set both `eid` and `oid` parameters. | `cid=ea10fa402fec4bbe996019a0827e6c37` |
| eid & oid | **External ID:** <br /> - `eid`: Set this parameter to the external ID for the desired [asset](#external-id-asset), [live channel](#external-id-channel), or [live event](#external-id-event). <br /> - `oid`: Set this parameter to your user ID. Specify your own user ID regardless of whether the content resides in your CMS library or one shared with you. [User IDs defined within the actual playback URL](#external-id-asset) for content in a shared library should still identify the user that shared the content with you. Find your user ID via [User Settings](https://cms.uplynk.com/static/cms2/index.html#/settings/) > **Settings** > **User Settings**.| `...&eid=puppycampaign1234&oid=`<br />`ab233951a92b88a1a123cdd49b0a9be5` |

##### Core Identification Parameter Examples  {/*core-id-parameters*/}

**Asset ID Example**:

This example defines core identification parameters using an asset ID:

| Condition        | Details |Value|
|------------------|------------------------------------------|---|
| Current Time |A signed playback URL should expire relatively quickly. Therefore, it is important to know the time, in UTC, at which it will be issued. |     |
| Local time       | |July 02, 2018 01:00:00 p.m. PST          |
| Coordinated Universal Time || July 02, 2018 20:00:00 UTC         |
| Unix time (UTC)  | |1530561600             |
| Desired Lifespan |Add the desired lifespan to the current Unix time. Adding 60 seconds to 1530561600 results in the following value: 30561660 |60 seconds|
| Random Number | A random number ensures the uniqueness of the digital signature that is generated.|            4114845747         |
| CMS Asset     |This example authorizes the playback of a CMS asset. Identify this asset by its asset ID.|    ea10fa402fec4bbe996019a0827e6c38              |

Using the above values we will construct the core identification portion of the query string:

`tc=1&exp=1530561660&rn=4114845747&ct=a&cid=ea10fa402fec4bbe996019a0827e6c38`

**External ID Example**:

An alternative method for identifying playback content is via its external ID. This requires omitting the cid parameter and defining both the eid (external ID) and oid (user ID) parameters. This example builds off the previous example, but will use the following information instead of the asset ID:

| Condition | Value |
|---|---|
| CMS Asset<br />This example authorizes the playback of a CMS asset. Identify this asset by its external ID.<br />External IDs must be unique within your account.<br />Your CMS asset may be assigned an external ID that is a duplicate to one associated with another customer. For this reason, you must also specify your user ID when identifying an asset by its external ID. | External ID:<br />widgets-sales-conference-01 |
| User ID<br />Specify your user ID to uniquely identify your asset. | User ID:<br />ab233951a92b88a1a123cdd49b0a9be5 |

Using the above values we will construct the core identification portion of the query string:

`tc=1&exp=1530561660&rn=4114845747&ct=a&eid=widgets-sales-conference-01&oid=ab233951a92b88a1a123cdd49b0a9be5`

#### Digital Signature  {/*digital-signature*/}

A digital signature protects the playback URL against tampering by allowing our system to validate the playback URL's query string against a hashed version of it.

**Key Information**:

- Generate a hash-based message authentication code (HMAC) under the following conditions:
  - **Algorithm:** SHA-256
  - **Secret Cryptographic Key:** Your API key ([Integration Keys page](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys) > **Settings** > **Integration Keys** > **API Keys**)
- **Data:** All core identification and customization query string parameters defined in the playback URL. Do not include the question mark that delimits the base URL from the query string.

    <Info>Use a server-side script to generate an HMAC. Otherwise, your API key will be exposed and potentially allow your content to be played back without restrictions.</Info>

- Set the `sig` parameter to the hashed message generated for the current playback URL and then append it to the query string. The `sig` query string parameter must be the final parameter in the playback URL's query string.

**View a sample digital signature**
This example signs a playback URL under the following conditions:

- **Core identification parameters**:<br />`tc=1&exp=1358341863&rn=4114845747&ct=a&cid=ea10fa402fec4bbe996019a0827e6c38`

- **Customization parameter**: `ray=abc`

    <Info>This parameter restricts playback to rays A, B, and C.</Info>

- **API key**: `WxQpQhHFmE4hTWA4TGLu6rYeNuKgYrWwlCLmSKRb`

The following HMAC will be computed from the above query string using the SHA-256 algorithm and the above API key as the secret cryptographic key:

`37ecd4cbcad4bc156daac10a2bf9ccf38fb7a8d83fa25f257a62474a86b82cbf`

After which, set the sig parameter to the above value and append it to the query string as shown below.

`tc=1&exp=1358341863&rn=4114845747&ct=a&cid=ea1...c38&ray=abc&sig=37e...cbf`

Finally, set the above value as the query string for the playback URL.

**Sample playback URL**:

`https://content.uplynk.com/ea10fa402fec4bbe996019a0827e6c38.m3u8?tc=1&exp=1358341863&rn=4114845747&ct=a&cid=ea10fa402fec4bbe996019a0827e6c38&ray=abc&sig=37ecd4cbcad4bc156daac10a2bf9ccf38fb7a8d83fa25f257a62474a86b82cbf`

#### Sample Code  {/*sample-code*/}

Sample code that signs a playback URL is provided below.

```python
import hashlib, time, hmac, urllib.parse, random

# Update to your API key.
apiKey = 'WxQpQhHFmE4hTWA4TGLu6rYeNuKgYrWwlCLmSKRb'

# Set to all of the playback URL's query string parameters except the signature.
queryStr = urllib.parse.urlencode({
    'tc': '1', # token check algorithm version
    'exp': int(time.time()) + 60, # expire 60 seconds from now
    'rn': str(random.randint(0, 2**32)), # random number
    'ct': 'a', # an asset
    'cid': 'ea10fa402fec4bbe996019a0827e6c38', # the asset's ID
    'rays': 'dcba', # customization parameter
})

# Compute the signature and add it to the *end*
sig = hmac.new(apiKey.encode('utf-8'), queryStr.encode('utf-8'), hashlib.sha256).hexdigest()

queryStr = queryStr + '&sig=' + sig

# Add the query string to the playback URL.
url = 'https://content.uplynk.com/ea10fa402fec4bbe996019a0827e6c38.m3u8'
url = url + '?' + queryStr
```

```php
<?php
// inputs
$apiKey = "WxQpQhHFmE4hTWA4TGLu6rYeNuKgYrWwlCLmSKRb" // from the CMS UI

// combine all of the parameters
$msg = array();
$msg["tc"] = "1"; // token check algorithm version
$msg["exp"] = time() + 60; // expire 60 seconds from now
$msg["rn"] = rand(); // random number
$msg["ct"] = "a"; // an asset
$msg["cid"] = "ea10fa402fec4bbe996019a0827e6c38"; // asset ID
$msg["rays"] = "dcba"; //customization parameter

// Calculate signature
$msg["sig"] = hash_hmac("sha256", http_build_query($msg), $apiKey);

// Add the query string the playback URL.
$url = 'https://content.uplynk.com/ea10fa402fec4bbe996019a0827e6c38.m3u8'
return $url . '?' . http_build_query($msg);
```

### Encrypt Query Strings  {/*encrypt-query-strings*/}

A playback URL may either be passed as cleartext or encrypted text. Encrypting query strings is useful for masking keywords (e.g., ad) that may trigger an ad blocker.


1. **Generate a Query String Value** that signs your playback URL.

2. **Copy an API Key.** Find your API key via [Integration Keys page](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys) > **Settings** > **Integration Keys** > **API Keys**.

3. **Generate an MD5 Hash** of your chosen API key. This hash should be exactly 16 bytes (128 bits) long.

4. **Encrypt the Query String:**
   - Use AES-128 in CBC mode for encryption.
   - Use the MD5 hash as the key for this operation.
   - Use 16 null bytes as the initialization vector.

5. **Base64 Encode the Encrypted Result:**
   - Perform URL-safe Base64-encoding on the encrypted result.
   - This typically involves replacing all `+` characters with `-` and all `/` characters with `_`. Some languages and libraries have URL-safe-specific functions for this purpose.

6. **Set the Playback URL's Query String:**
   - Syntax:
     ```
     ?cqs=Base64EncodedQueryString&kid=APIKeyID
     ```

   - API keys and their IDs are listed next to each other within the CMS.

   - If a playback URL contains both `cqs` and `kid` parameters, our system will:
     - Decrypt the value assigned to `cqs` using the API key identified by the `kid` parameter.
     - Establish a normal playback session using the information from the decrypted string.

#### Sample Code  {/*sample-code-2*/}

Sample code that encrypts query strings is provided below.

```python
import base64
import hashlib

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.padding import PKCS7
from cryptography.hazmat.backends import default_backend

API_KEY = b'cL8Z0+DHCJZqpsN6/tlB01oyxFfeElj3t7PnwWRI'
KEY_ID = 'ad5ba943177f4a1587795a9ee8d47293'

MD5_KEY = hashlib.md5(API_KEY).digest()

# This query string is signed for an asset with an asset ID of 340ca73eb07c4f4ca08b804c47a91f1b,
# owned by a user with a user ID of ba8cb548202840d48d1255885d7bb2f3
SIGNED_QUERY_STRING = b'ad=fwvod&cid=340ca73eb07c4f4ca08b804c47a91f1b&oid=ba8cb548202840d48d1255885d7bb2f3&exp=1492596978713&test=1&rn=310292100&tc=1&ct=a&sig=2ff94739b021912712adafeccd6fa291f11eef0648c3b18b30224b84e0590b4f'

def encrypt_aes_128_cbc(key, data):
    backend = default_backend()
    aes = algorithms.AES(key)
    iv = b'\x00' * 16  # Initialization vector of 16 null bytes
    cbc = modes.CBC(iv)
    padder = PKCS7(aes.block_size).padder()
    padded_data = padder.update(data) + padder.finalize()

    encryptor = Cipher(aes, cbc, backend).encryptor()
    result = encryptor.update(padded_data) + encryptor.finalize()
    return result

# Encrypt the query string using the MD5 hash of the selected API key
crypted_qs = encrypt_aes_128_cbc(MD5_KEY, SIGNED_QUERY_STRING)

# Encode the encryption result as URL-safe base64
encoded_qs = base64.urlsafe_b64encode(crypted_qs).decode("utf-8")

new_params = {'cqs': encoded_qs, 'kid': KEY_ID}

# This will be the new playback URL to request from our system.
url_with_crypted_qs = 'https://content.uplynk.com/340ca73eb07c4f4ca08b804c47a91f1b.m3u8?cqs={cqs}&kid={kid}'.format(**new_params)

print(url_with_crypted_qs)

### Value of `url_with_crypted_qs` is:
### https://content.uplynk.com/340ca73eb07c4f4ca08b804c47a91f1b.m3u8?cqs=gYXTAVtWRvk0qCs8pM9CmgprLvyQt9jNDETBL4ApLCqf2iFh-c9tXSk2Q_EbAAFc4q19KTikvqx8-StlruVaLafXU2NciESn-ZNPa-thp8UXSWwKszIp8oBjx8SJr9fcwUmu9El-w2q9lQ61nu1pk1JxomEraZAtfie9k8f5vAklpyYg5Ejd6i7iokxFO1XflOJFkhnDHp1ozCXVgh-rYKuCbbOEUwAaGYgd4zjn88GBgO1ZY8Jn3OFyGssvOydsPAnRjQmPsfFE24wYsp1Mlg==&kid=ad5ba943177f4a1587795a9ee8d47293
```

## Scheme (HTTP vs HTTPS)  {/*scheme*/}

The playback URL's scheme determines the scheme used for the ray and slice responses.

| Playback URL | Ray and Slice Response |
|---|---|
| HTTP | HTTP |
| HTTPS | HTTPS |

## Application Keys  {/*application-keys*/}

An application key provides an additional layer of security when transferring content keys to an application (e.g., media player).

**To Set Up Application Key Support**

1. **Add an Application Key:**
    - Navigate to the [Integration Keys page](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys).
    - Go to the **Application Keys** section.
    - In the **Key Name** option, assign a name to the application key.
    - Click `+ Add` to generate a value for the application key.

2. **Update Your Application:**
   - Pass the application key to our client SDK.
   - Although application keys are displayed in the CMS as a string value, they should be treated as binary data. For example, if the CMS shows an application key of `"88051e9b"`, the actual value is the following sequence of bytes: `0x88 0x05 0x1E 0x9B`. Take steps to protect your application against reverse engineering.

3. **Enable Application Keys:**
   - Include the `ak` configuration parameter in the playback URL's query string.
   - Upon including this parameter, the signed playback URL will only work with an application key.

4. **Modify the Playback URL:** Change the file extension defined in the playback URL from `"m3u8"` to `"json"`.

   **Sample Playback URL:** `https://content.uplynk.com/channel/ext/8bb3fcf33d134160848b3051fa15ea21/live_feed_east.json?tok=...`

### How It Works  {/*how-it-works*/}

Upon receiving a playback request, our system transfers a content key to the media player over a secure HTTPS connection. Take advantage of an application key, which is a secret key embedded in a device or application, to apply an additional layer of encryption when transferring a content key.

<Info>Application keys require an application that leverages our client SDK.</Info>

<Info>Application keys require client-side functionality and therefore cannot be used for web-based playback.</Info>

### More Information  {/*more-info*/}

[Customizing Playback (Playback Customization Parameters)](/uplynk/deliver/playback_urls/customize_playback_via_parameters)

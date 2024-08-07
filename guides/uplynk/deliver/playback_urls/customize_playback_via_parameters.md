---
title: Customize Playback via Parameters
---

Customize playback by adding the desired customization parameters directly after core identification parameters in the playback URL's query string.

## Key Information  {/*key-information*/}

- Test your customizations by setting a test player URL's query string to the desired customization parameters.
- Please verify that all query string parameters are set to URL-safe values.
- Customization parameters are shown in blue font in the following sample query string:

    ```
    ?tc=1&exp=1358341863&rn=4114845747&ct=a&cid=ea...&rays=dcba&pk=myapp&...&sig=dm13...
    ```
- It is strongly recommended to sign your playback URL to ensure its integrity. Please include customization parameters when signing your playback URL.

## General Parameters  {/*general-parameters*/}

This section describes all customization parameters that are not specific to ad decision servers or Studio DRM.

| Parameter| Description|
|----|-------|
| **ak**   | Identifies the name of the application key used to decrypt the digital signature. Upon including this parameter, the signed playback URL will only work with an application key.<br /> Use the syntax `1.ApplicationKeyName` (e.g., `ak=1.mykey`) or `mykey` (legacy).|
| **allowts**    | **Live Streaming Only** <br /> Allows a `ts` parameter to be appended to a signed playback URL for video scrubbing. <br />**Example**: `allowts=1`       |
| **dash_subtitles_merge** | Set to `0` to display only the language tracks embedded within the asset. <br />**Example**: If an asset contains English and an ad contains Spanish, the viewer may only select English for the main content and Spanish for the ad.  |
| **ddp**  | Set to `1` to include Dolby Digital Plus (DD+) tracks in the manifest file. If missing, only AAC tracks will be served. <br />**Example**: `ddp=1`      |
| **delay**| Determines artificial latency in seconds. Adjust for time zones or reduce latency. Default value: `-1`. <br />**Example**: `delay=7200` for a two-hour shift.      |
| **dmm.schemas.break**  | Set to `break_info` to add ad break information Dynamic Manifest Markers to a virtual linear playlist. <br />**Example**: `dmm.schemas.break=break_info`  |
| **dmm.schemas.top**    | Adds a Dynamic Manifest Marker (DMM) to the top of a manifest file. <br />**Example**: `dmm.schemas.top=first_segment_url`    |
| **timeline**   | Set to `timeline` to add a timeline DMM to the top of a manifest file for Smartstart-enabled assets. <br />**Example**: `dmm.schemas.top=timeline`    |
| **euid** | Identifies the current user with a custom ID. Should be 100 characters or less, using alphanumeric characters, underscores, or dashes. <br />**Example**: `euid=145XnM_0bHt2hZIGw8twtl3ccpjVF5rRVj6VJ_ZgqvtY2KmH` |
| **expand**     | Identifies a comma-separated list of expansion parameters to shorten the playback URL and facilitate parameter adjustments. <br /> **Note**: Does not support parameters like `linearv`, `jsonp`, `pbs`, etc.   |
| **forcecic**   | **DASH Live Streams Only** <br /> Set to `1` to always prepend a codec initialization clip to the manifest file. <br />**Example**: `forcecic=1`       |
| **fpuseki**    | **Apple FairPlay Streaming Only** <br /> Set to `1` to minimize content key requests. Requires encoding profile changes and player update. <br />**Example**: `fpuseki=1`     |
| **geo.country.allow**  | **Requires Geoblocking** <br /> Restricts access to requests from specified countries. <br /> **Syntax:** `?geo.country.allow=Country Code[,Country Code 2,Country Code n]`    |
| **geo.country.deny**   | **Requires Geoblocking** <br /> Denies access to requests from specified countries. <br /> **Syntax:** `?geo.country.deny=Country Code[,Country Code 2,Country Code n]`    |
| **hlsver**     | Determines the minimum HLS version required by the player. Maximum value is 7. <br />**Example**: Set to `7` for latest feature support. |
| **ifo**  | Set to `1` to include a playlist containing only I-frames, useful for trick mode. <br /> HLS: Automatically included in protocol version 4 or higher. <br /> DASH: Required for I-frame playlist generation. <br />**Example**: `ifo=1`     |
| **maxfps**     | Limits the maximum frames per second (FPS) in the manifest. <br />**Example**: `maxfps=59` to exclude rays with 60 FPS or higher.      |
| **needscors**  | Determines CORS support for the manifest response. <br /> `0` allows requests from any site. `1` leverages CORS with specific headers. <br /> Default values: HLS `0`, DASH `1`. |
| **opaqueid**   | Uniquely identifies a viewer. Used to limit concurrent sessions. <br />**Example**: `opaqueid=joe-smith-001`      |
| **pltl** | Set the Playlist Timeline parameter to `1` to add a timeline DMM for assets in a virtual linear playlist. <br />**Example**: `dmm.schemas.top=timeline&pltl=1`    |
| **plts** | Set the Playlist Timestamp parameter to specify a seek position in seconds from the start of the playlist. <br />**Example**: `plts=300` to seek 5 minutes into the playlist.  |
| **ptid** | Tags playback with an organizational group or category. <br />**Example**: `ptid=MyChannel`    |
| **rates**| Restricts playback to rays within a specified range of bitrates. <br /> **Syntax:** `rates=Low-High` <br />**Example**: `rates=600-` to restrict to rays 600 Kbps or higher. |
| **rays** | Restricts playback to specified rays. <br />**Example**: `rays=dcba` to prevent access to rays higher than `d`.     |
| **repl** | Identifies the replacement plugin to be loaded. |
| **resolutions**| Restricts playback to rays within a specified range of resolutions. <br /> **Syntax:** `resolutions=Low-High` <br />**Example**: `resolutions=720-` to restrict to rays 720p or higher.    |
| **show_dash_subtitles**| **DASH Only** <br /> Set to `imsc` to enable fragmented TTML (IMSC1) for DASH streams. <br />**Example**: `show_dash_subtitles=imsc`     |
| **show_vtt**   | **HLS Live Streams Only** <br /> Set to `1` to enable WebVTT for HLS live streams. <br />**Example**: `show_vtt=1`       |
| **smartcic**   | **DASH Live Streams Only** <br /> Set to `1` to prepend a codec initialization clip only when the main content contains WebVTT subtitles. <br />**Example**: `smartcic=1`     |
| **srs**  | **DASH Only** <br /> Determines how media segment start times and duration are represented in a DASH manifest. Valid values: `template`, `templatetimeline`, `tizentemplate`, `list`. <br /> Default value (DASH Live Streams): `templatetimeline`, Default (DASH VOD Streams): `template` |
| **sstart**     | Sets the starting point for playback in slice numbers (0-based). <br />**Example**: `sstart=15` to start playback at the 16th slice.      |
| **sstop**| Sets the stopping point for playback in slice numbers (0-based). <br />**Example**: `sstop=20` to stop playback after the 21st slice.       |
| **start**| Sets the playback start offset in seconds, rounded down to the nearest slice boundary. <br />**Example**: `start=95.3` to start at the slice containing the 95.3 second.   |
| **staticomsdk**| Set to `1` to insert a static JSON payload into the manifest for ad verification workflow testing. <br />**Example**: `staticomsdk=1`       |
| **stop** | Sets the playback stop time in seconds, rounded up to the nearest slice boundary. <br />**Example**: `stop=110.9` to stop playback after the slice containing the 110.9 second. |
| **subtitle_placeholders_off** | Set to `1` to display only available language tracks, overriding the `dash_subtitles_merge` parameter. <br />**Example**: `subtitle_placeholders_off=1`      |
| **thumbsray**  | Set to `1` to include trick play thumbnails in the manifest file. <br />**Example**: `thumbsray=1`   |
| **timedmeta.events.ads** | Inserts tracking events from the ad response into the manifest file. Use a comma to delimit each event. <br />**Example**: `timedmeta.events=complete,midpoint`  |
| **timedmeta.extensions.ads** | Inserts custom VAST extensions from the ad response into the manifest file. Use a comma to delimit each extension. <br />**Example**: `timedmeta.extensions=waterfall,geo`      |
| **timedmeta.schemas.ads** | Set to `omsdk` to insert ad viewability data into the manifest file. <br />**Example**: `timedmeta.schemas.ads=omsdk`    |
| **ts**   | Sets the start time for playback in Unix time. This feature cannot be used any farther back in time than the schedule and assets for the linear stream exist.<br />**Example**: `ts=1368529129` for playback starting at 2013-05-14 10:58:49 UTC|
| **up.max_concurrent_sessions** | Limits the number of concurrent sessions to the specified value. Specify the `opaqueid` parameter to limit the number of concurrent sessions by viewer. | Limit the number of concurrent sessions for the viewer identified by the `opaqueid` parameter to 2: `up.max_concurrent_sessions=2` |


## Ad Parameters  {/*ad-parameters*/}

See [Ad Parameters](/uplynk/monetize/ads/ad_parameters)

## Studio DRM Parameters  {/*studio-drm*/}

Apply a Studio DRM policy to a playback session by including one or more of the following customization parameters in the playback URL:

- **DRM Policy Configuration**<br />Apply a set of predefined policies to a playback session by setting the `drm_policy_name` parameter to the name of the desired Studio DRM policy configuration.

    <Info>Specifying a Studio DRM policy configuration that does not exist will prevent playback.</Info>

    **Example:** `...&drm_policy_name=widevine1`

- **Individual Policy Settings**<br />Apply individual policy settings to a playback session by specifying each desired [FPS](#fps) or [DASH](#dash) ([Widevine](#widevine) and [PlayReady](#playready)) policy setting.

    <Info>All specified Studio DRM policies will be applied to the playback session. However, explicitly defined policy settings (e.g., &ck=1) take precedence over a Studio DRM policy configuration (drm_policy_name).</Info>

    **Example**: `...&ck=1&drm_optional=1`

    <Tip>Apply a general Studio DRM policy via the drm_policy_name parameter and then define more granular policies for specific scenarios (e.g., allow a device that doesn't support DRM to play low resolution streams).</Tip>

### Apply DRM Policy to Playback Session

Apply a DRM policy using one of the following methods (ordered from most to least amount of precedence):

1. **Explicit Policy Settings**
   - Specify individual policy settings to tailor a playback session to meet a specific need.
   - Explicitly defined settings take precedence over a Studio DRM policy configuration and the default DRM policy.

2. **Studio DRM Policy Configuration**
   - Take advantage of a Studio DRM policy configuration to quickly apply a predefined set of DRM policies to a playback session.
   - A Studio DRM policy configuration takes precedence over the default DRM policy.

3. **Default Policy Settings**
   - All DRM policy settings have a default value.
   - This default DRM policy is only applicable when a Studio DRM policy configuration or a conflicting policy setting has not been defined.

### Disable Studio DRM

Use the following parameters to disable Studio DRM.

| Query String Parameter | Name | Description|
|---|----|------|
| drm_optional           | Disable Studio DRM    | Disables Studio DRM protection. <br /><br />**Key information:** <ul><li>**DASH Streaming Only**</li><li>If you are streaming content via DASH, then you must also pass the [`ck` parameter](#all-dash-drm-solutions): `&ck=1`</li><li>A player should request a cleartext key from the following URL when playing content that is not protected by Studio DRM: `https://content.uplynk.com/ck`</li><li>This parameter is the equivalent of clearing the "Require studio approved DRM for playback" option for this playback session.</li><li>This parameter is typically used to allow playback of specific rays or configurations of protected content without requiring DRM.</li></ul><br />**Syntax:** `&ck=1&drm_optional=1`<br /><br />**Sample Usage:**<br />Include the following query string parameters to restrict playback on a device that doesn't support DRM to the two lowest quality rays:<br />`...&ck=1&drm_optional=1&rays=ba`<br /><br />All playback URLs for Studio DRM-protected content should require a [digital signature](/uplynk/deliver/playback_urls/playback_urls/#signing-playback-urls-with-token) to prevent URL tampering. |

### Apple FairPlay Streaming (FPS)

In addition to FPS policy settings, you may also reuse content keys via the [fpuseki parameter](#general-parameters).

Define one of the following scopes when specifying FPS policy settings:

- **All Tracks**: Apply a policy setting to all tracks by excluding the track type from the query string parameter. <br /> **Example**: `...&fp.hdcp=0`

- **Track-Specific**: Apply a policy setting to a specific tracks by indicating the track type within the query string parameter.<br />**Syntax**: `fp.{TrackType}.{Policy}`<br />Valid values for `{TrackType}` are:

    - **sd**: Applies the policy setting to standard definition (576p or less) tracks.
    - **hd**: Applies the policy setting to high-definition (720p and 1080p) tracks.
    - **uhd1**: Applies the policy setting to 4K ultra-high-definition video tracks.
    - **uhd2**: Applies the policy setting to 8K ultra-high-definition video tracks.

**Example**: `...&fp.hd.hdcp=0`

<Info>Track-specific policy settings take precedence over policy settings that apply to all tracks.</Info>

Use the following query string parameters to define a FPS policy.

| Query String Parameter         | Description |
|-----------|------|
| `fp.airplay`<br />`fp.TrackType.airplay` | Determines whether playback will be allowed over AirPlay.<br /><br />**Valid values are**:<br /><ul><li>1: Allow AirPlay.</li><li>0: Disallow AirPlay.</li></ul>**Default value**: 1 |
| `fp.avadapter`<br />`fp.TrackType.avadapter` | Determines whether playback may be mirrored via an Apple Lightning AV Adapter.<br /><br />**Valid values are**:<br /><ul><li>1: Allow mirroring.</li><li>0: Disallow mirroring.</li></ul>**Default value**: 1|
| `fp.hdcp`<br />`fp.TrackType.hdcp` | Determines whether High-bandwidth Digital Content Protection (HDCP) enforcement is required.<br /><br />**Valid values are**:<br /><ul><li>-1: HDCP is not enforced.</li><li>0: HDCP type 0 content streams is enforced. This allows the stream to be transmitted by the HDCP repeater to all HDCP devices.</li><li>1: HDCP content type 1 (HDCP version 2.2 or later) is enforced. Streams may not be transmitted by the HDCP repeater to HDCP 1.x-compliant devices or HDCP2.0-compliant repeaters.</li></ul>**Default value**: -1 |
| `fp.lease_duration`<br />`fp.TrackType.lease_duration` | Determines the length of time, in seconds, during which playback will be allowed. Playback will stop upon the expiration of the lease.<br /><br />**Key information**:<br /><ul><li>This countdown starts upon the acquisition of the Content Key.</li><li>This parameter requires offline playback. Set `fp.persistence` to 1.<br />`&fp.persistence=1`</li><li>This parameter may be combined with `fp.rental_duration`.</li></ul>**Default value**: 0|
| `fp.persistence`<br />`fp.TrackType.persistence` | Determines whether offline playback is allowed.<br /><br />**Valid values are**:<br /><ul><li>1: Allow offline playback.</li><li>0: Disallow offline playback.</li></ul>**Default value**: 0|
| `fp.playback_duration`<br />`fp.TrackType.playback_duration` | Determines the length of time, in seconds, for which playback will be valid.<br /><br />Key information:<br /><ul><li>This parameter requires:<br />Offline playback. Set `fp.persistence` to 1.<br />`&fp.persistence=1`<br />iOS 11 or later<br />Your application's user agent should identify the OS as iOS 11 or later.</li><li>This countdown starts upon initial playback.</li><li>Use this parameter for offline playback or lease renewals only.</li><li>A license will not expire when this parameter is not specified or if it is set to 0.</li><li>Once playback is successfully initiated, it will be allowed even if playback extends beyond the rental duration.</li></ul>**Default value**: 0|
| `fp.rental_duration`<br />`fp.TrackType.rental_duration` | Determines the length of time, in seconds, during which the Content Key is valid prior to initial playback. Playback may only be initiated with a valid Content Key.<br /><br />Key information:<br /><ul><li>This countdown starts upon the acquisition of the Content Key.</li><li>This parameter may be combined with `fp.lease_duration` and `fp.persistence`.</li><li>A Content Key will not expire if this parameter is not specified.</li><li>Once playback is successfully initiated, it will be allowed even if playback extends beyond the rental duration. However, the client will not be allowed to restart playback with an expired Content Key.</li></ul>**Default value**: 0 |

### DASH

DASH policy settings are organized into the following categories:

- [All DASH DRM Solutions](#all-dash-drm-solutions)
- [Google Widevine](#google-widevine)
- [Microsoft PlayReady](#microsoft-playready)

#### All DASH DRM Solutions

The following query string parameters are applicable to all DASH Studio DRM solutions.

| Query String Parameter | Name| Description|
|------|-----|------|
| ck       | Cleartext Key     | Disables DRM by passing the Content Key in cleartext. Decryption will take place outside of a Content Decryption Module (CDM). **Valid values are**: <br /><br />**1**: All players. Our system will check the User-Agent request header to identify the requesting player and then use this information to determine how the Content Key will be presented to the player. <br /><br />**4**: Exoplayer only. Our system will present the Content Key in a format recognizable by Exoplayer. <br /><br />**Key information**: <br />A prerequisite for this parameter is that Studio DRM must be disabled on the desired content. Please also include the drm_optional parameter in the query string. <br />Request cleartext Content Keys from the following URL: <br />https://content.uplynk.com/ck <br />Once DRM is disabled on a playback session, the player must request a cleartext Content Key instead of a license. This means that you must use the above URL instead of a license acquisition URL. <br /><br />**Syntax**: `&ck=1&drm_optional=1` |
| noadredir| Disable Ad Redirects | **VOD Only** <br /> By default, ads within VOD content will be represented as a list of segments. This allows ad impressions to be injected via redirects on every other segment. Disable this functionality through this parameter. <br /><br />**Key information**: <br />Audio and video slices for VOD ad content are represented within the manifest file through a list of segments (SegmentList). If your player does not support this type of manifest, then you must disable ad redirects. This will generate a manifest file that contains a set of templates (SegmentTemplate) for VOD ad content. <br />Disable ad redirects by performing either one of the following actions: <br />Pass this parameter. <br />Leverage our [Ping](https://docs.edgecast.com/video/Content/Develop/Pingv2.htm) and [Preplay](https://docs.edgecast.com/video/Content/Develop/Preplayv2.htm) APIs to track ad impressions. <br /><br />**Syntax**: `&noadredir=1` |
| nielsen  | Nielsen           | Advertises to the DASH player that the manifest may contain Nielsen data encoded within the emsg box. <br />This parameter is required when the manifest contains Nielsen data. <br />Please also set the [Nielsen parameter within the Live Slicer configuration file](/uplynk/acquire/live/on-prem-slicer/#configuration-file-settings). <br /><br />**Syntax**: `&nielsen=1`  |

### Google Widevine

Define a Widevide DRM policy by including parameters that define:

- [**Content Key Specs**](#content-key-specs): Define what content keys will be returned.
- [**Policy Overrides**](#policy-overrides): Define the conditions under which playback will be allowed.

#### Content Key Specs

Use content key specs to define the set of Content Keys that will be returned to the player.

**Syntax**: `rmp.content_key_specs.{Track Type}.{Restriction}={Value}`

Each of the above variables are described below.

- **Track Type**: Identifies the type of track (i.e., SD, HD, AUDIO, UHD1, UHD2, ALL_VIDEO, and ALL) to which this policy will be applied.<br />Learn more.

    <Info>If you would like to specify all video tracks, please use `ALL_VIDEO` instead of `ALL VIDEO`.</Info>

- **Restriction and Value**: Defines the policy that will be applied to the track identified above.

    <Info>Both the name of the restriction and its value are case-sensitive.</Info>

Each restriction is described below.

| Restriction    | Description |
|------------|-----|
| required_output_protection.cgms_flags| Determines whether Copy Generation Management System (CGMS) is required. <br /> Do not specify this parameter for desktop browser platforms. <br /> Valid values for cgms_flags are: <br /> **CGMS_NONE**: A single generation of copies has been made, but no additional copying is allowed. <br /> **COPY_FREE**: Allows unlimited copies. <br /> **COPY_ONCE**: Allows a single generation of copies. <br /> **COPY_NEVER**: Disallows copying. <br /> **Default value**: <br /> CGMS_NONE  |
| required_output_protection.disable_analog_output   | Determines whether analog output is allowed. <br /> **Valid values are**: <br /> **True**: Disallows analog output. <br /> **False**: Allows analog output. <br /> **Default value**: <br /> False|
| required_output_protection.hdcp | Determines whether HDCP is required. <br /> Valid values for hdcp are: <br /> **HDCP_NONE**: HDCP is not enforced. <br /> **HDCP_V1**: Playback requires a client that supports HDCP 1.x or higher. <br /> **HDCP_V2**: Playback requires a client that supports HDCP 2.0 or higher. <br /> **HDCP_V2_1**: Playback requires a client that supports HDCP 2.1 or higher. <br /> **HDCP_V2_2**: Playback requires a client that supports HDCP 2.2 or higher. <br /> **HDCP_NO_DIGITAL_OUTPUT**: Playback is only allowed on an internal display. Playback over HDCP is disallowed. <br /> **Default value**: <br /> HDCP_NONE     |
| required_output_protection.hdcp_srm_rule           | Determines whether the device will be required to support a specific version of a System Renewability Message (SRM). <br /> **Valid values are**: <br /> **HDCP_SRM_RULE_NONE**: The device is not required to have a specific version of the SRM. <br /> **CURRENT_SRM**: Disallow the Content Key if the device has an older SRM and cannot support SRM updates. <br /> **Default value**: <br /> HDCP_SRM_RULE_NONE             |
| security_level| Determines the minimum security requirements for performing cryptography, content decoding, and media operations. <br /> **Valid values are**: <br /> **1**: Requires software-based white-box cryptography. <br /> **2**: Requires software-based white-box cryptography and an obfuscated decoder. <br /> **3**: Requires a hardware-backed Trusted Execution Environment (TEE) for key material and cryptography. <br /> **4**: Requires a hardware-backed TEE for cryptography and content decoding. <br /> **5**: Requires a hardware-backed TEE for cryptography, content decoding, and all compressed and uncompressed media operations. <br /> Security levels 3, 4, and 5 require HDCP to be set via required_output_protection.hdcp. <br /> **Default value**: <br /> 1  |

#### Policy Overrides

Use the following parameters to determine the conditions under which playback will be allowed.

**Syntax**: `rmp.policy_overrides.{Override}={Value}`

Each policy override is described below.

| Override  | Description  |
|-------|----|
| can_persist| Determines whether offline playback is allowed. <br /> ****Valid values are**:** <br /> **True**: Offline playback is allowed. <br /> **False**: Offline playback is disallowed. <br /> **Default value**: <br /> True |
| can_play| Determines whether playback is allowed. <br /> This parameter is required when defining policy overrides. <br /> **Default value**: <br /> True |
| license_duration_seconds    | Determines the length of time, in seconds, during which content playback is allowed. <br /> **Key information:** <br /> This window starts from the time at which the license was issued. <br /> This parameter must be specified in order to limit playback by license. <br /> No further decryption is allowed upon license expiration. <br /> **Default value**: <br /> 86400      |
| playback_duration_seconds   | Determines the length of time, in seconds, for which a license will be valid after its initial use. <br /> This parameter should only be specified for offline or license renewal scenarios. <br /> **Default value**: <br /> 0 |
| rental_duration_seconds     | Determines the length of the window, in seconds, during which a license will be valid prior to its initial use. <br /> **Key information:** <br /> This window starts from the time at which the license was issued. <br /> Once a license is used, rental duration is not used or enforced. <br /> Please use either playback or license duration to further limit playback. <br /> This parameter should only be specified for offline scenarios. <br /> **Default value**: <br /> 0 |

### Microsoft PlayReady

Define one of the following scopes when specifying PlayReady policy settings:

- **All Tracks**: Apply a policy setting to all tracks by excluding the track type from the query string parameter.

    **Example**: `...&pr.can_persist=true`

- **Track-Specific**: Apply a policy setting to a specific tracks by indicating the track type within the query string parameter.

    **Syntax**: `pr.{TrackType}.{Policy}`

    **Valid values for TrackType are**:
    - **audio**: Applies the policy to audio tracks.
    - **sd**: Applies the policy setting to standard definition (576p or less) tracks.
    - **hd**: Applies the policy setting to high-definition (720p and 1080p) tracks.
    - **uhd1**: Applies the policy setting to 4K ultra-high-definition video tracks.
    - **uhd2**: Applies the policy setting to 8K ultra-high-definition video tracks.

    **Example**: `...&pr.hd.can_persist=true`

<Info>Track-specific policy settings take precedence over policy settings that apply to all tracks.</Info>

Use the following query string parameters to define a PlayReady policy.

| Query String Parameter | Description |
|---|---|
| pr.analog_video_protection_level | Determines the minimum security requirements for the client's analog video outputs.<br />**Valid values are**:<ul><li>**100**: No security. This level allows the client to pass content to analog video outputs without restrictions.<br />This security level is solely provided for testing purposes.</li><li>**150**: A client must attempt to engage Copy Generation Management System - Analog (CGMS-A) CopyNever for analog video outputs. Regardless of CGMS-A, the client may pass content to analog video outputs.</li><li>**200**: CGMS-A is required when a client passes content to analog video outputs.</li><li>201: Prevents a client from passing content to analog video outputs.</li></ul>**Default value**: 100 |
| pr.can_persist<br />pr.TrackType.can_persist | Determines whether offline playback is allowed.<br />**Valid values are**: True \| False<br />**Default value**: False |
| pr.compressed_digital_audio_protection_level | Determines the minimum security requirements for passing compressed digital audio to the client's digital audio outputs.<br />**Valid values are**:<ul><li>**100**: No security. This level allows the client to pass compressed digital audio to digital audio outputs without restrictions.</li><li>**301**: Prevents a client from passing compressed digital audio to digital audio outputs.</li></ul><br />This security level is solely provided for testing purposes.<br /><br />**Default value**: 100 |
| pr.digital_video_protection_level<br />pr.TrackType.digital_video_protection_level | Determines the level of digital video protection that will be required.<br />**Valid values are**:<ul><li>**100**: Allows the client to pass content to digital video outputs.</li><li>**250**: A client must attempt to engage HDCP for digital video outputs. Regardless of HDCP, the client may pass content to digital video outputs.</li><li>**270**: A client must attempt to engage HDCP for digital video outputs. If HDCP cannot be engaged, the client may pass content to digital video outputs when the effective resolution is less than or equal to 520,000 pixels per frame.</li><li>**300**: HDCP is required when a client passes content to digital video outputs.</li><li>**301**: Prevents a client from passing content to digital video outputs.</li></ul>`The pr.require_hdcp_type_1` parameter determines which version of HDCP will be enforced.<br />**Default value**: 100 |
| pr.license_begin_seconds | Determines the number of seconds prior to the current playback request for which the license will be valid. A license cannot be used prior to the specified time.<br />Set this parameter to 0 to make the license valid any time prior to the playback request.<br />The purpose of this parameter is to account for time differences between our servers and the client. For example, a playback request will be denied if this parameter is set to 60 seconds and the client's time is 4 minutes behind our server's time.<br />**Default value**: 3600<br />By default, playback will be allowed when a client's time is up to an hour behind our server's time. |
| pr.license_duration_seconds<br />pr.TrackType.license_duration_seconds | Determines the length of time, in seconds, during which content playback is allowed.<br />This countdown starts upon license creation.<br />No further decryption is allowed upon license expiration.<br />**Default value**: 86400 |
| pr.playback_duration_seconds<br />pr.TrackType.playback_duration_seconds | Determines the length of time, in seconds, for which playback will be valid. This countdown starts after initial playback.<br />Use this parameter when setting up a policy for offline playback or license renewal.<br />Playback is unlimited when playback duration has not been specified.<br />**Default value**: 0 |
| pr.playenabler<br />pr.TrackType.playenabler | Allows license delivery where it would normally be disallowed. Set this parameter to the Play Enabler GUID that defines the additional condition under which license delivery will be allowed.<br />The purpose of this parameter is to facilitate testing. For example, by default, playback on a virtual machine is restricted. Pass `B621D91F-EDCC-4035-8D4B-DC71760D43E9` to allow playback of constrained resolution on an unknown output (e.g., VM).<br />Syntax:<br />`pr.playenabler={Play Enabler GUID}`<br />View Microsoft's Compliance Rules to learn more about Play Enablers. |
| pr.realtime_expiration | Determines whether the current playback session will be stopped upon license expiration.<br />**Valid values are**:<br />True: Upon license expiration, the current playback session will be stopped.<br />False: The current playback session will continue if it was started prior to license expiration.<br />**Default value**: True |
| pr.require_hdcp_type_1<br />pr.TrackType.require_hdcp_type_1 | Determines the version of HDCP that will be enforced on digital video outputs when pr.digital_video_protection_level is set to 250 or higher.<br />**Valid values are**:<br />True: HDCP content type 1 (HDCP version 2.2 or later) is enforced. Streams may not be transmitted by the HDCP repeater to HDCP 1.x-compliant devices or HDCP2.0-compliant repeaters.<br />False: Allows any version of HDCP.<br />**Default value**: False |
| pr.securitylevel<br />pr.TrackType.securitylevel | Determines the minimum security requirements for the client device.<br />**Valid values are**:<br />150: No security.<br />This security level is solely provided for testing purposes.<br />2000: Use this security level for hardened devices and applications consuming commercial content. Requires the protection of Assets, Client Secrets, or Content Secrets via software or hardware.<br />3000: Use this security level for hardened devices with the highest security consuming the highest quality of commercial content.<br />Devices Only: <br />Requires the protection of Assets, Client Secrets, and Content Secrets via hardware using a Trusted Execution Environment (TEE) for the processor.<br />**Default value**: 150 |
| pr.uncompressed_digital_audio_protection_level | Determines the minimum security requirements for passing uncompressed digital audio to the client's digital audio outputs.<br />**Valid values are**:<br />100: No security. This level allows the client to pass uncompressed digital audio to digital audio outputs without restrictions.<br />This security level is solely provided for testing purposes.<br />250: A client may pass uncompressed digital audio to digital audio outputs when either of the following conditions are true:<br />HDCP is engaged on HDMI, DisplayPort, or MHL.<br />SCMS is engaged and set to CopyNever.<br />300: A client may only pass uncompressed digital audio to digital audio outputs when HDCP is engaged on HDMI, DisplayPort, or MHL.<br />301: Prevents a client from passing uncompressed digital audio to digital audio outputs.<br />**Default value**: 100 |
| pr.version | Determines the version of the PlayReady license that will be requested.<br />**Valid values are**:<br />2: Generates a manifest file that contains an Adaption Set for each requested key.<br />3: Supports grouping requests for multiple keys into a single license request. Generates a manifest file where all Representations reside within a single Adaption Set.<br />**Default value**: 3 |

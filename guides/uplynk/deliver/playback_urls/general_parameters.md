---
title: General Parameters for Playback URLs
---

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

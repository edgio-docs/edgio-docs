---
title: Customize Playback via Parameters
---

Customize playback by adding the desired customization parameters directly after core identification parameters in the playback URL's query string.

## Key Information  {/*key-information*/}

- Test your customizations by setting a test player URL's query string to the desired customization parameters.
- Please verify that all query string parameters are set to URL-safe values.
- Customization parameters are shown in blue font in the following sample query string:

    `?tc=1&exp=1358341863&rn=4114845747&ct=a&cid=ea...&rays=dcba&pk=myapp&...&sig=dm13...`

- It is strongly recommended to [sign your playback URL](/uplynk/deliver/playback_urls/#signing-playback-urls-with-token) to ensure its integrity. Please include customization parameters when signing your playback URL.

## General Parameters  {/*general-parameters*/}

This section describes all customization parameters that are not specific to ad decision servers or Studio DRM.

| Parameter| Description|
|----|-------|
| ak   | Identifies the name of the application key used to decrypt the digital signature. Upon including this parameter, the signed playback URL will only work with an application key.<br /> Use the syntax `1.ApplicationKeyName` (e.g., `ak=1.mykey`) or `mykey` (legacy).|
| allowts    | **Live Streaming Only** <br /> Allows a `ts` parameter to be appended to a signed playback URL for video scrubbing through a video. <br />**Key information**: Appending a ts parameter to a signed playback URL has the following effect:<ul><li>**HLS**: If a playback session is passed in the playback URL via the pbs parameter, then the existing playback session will be reset.</li><li>**DASH**: If a playback session is passed in the playback URL via the pbs parameter, then the player will be unable to playback the video. Therefore, it is important to remove the pbs parameter when scrubbing through video.</li></ul>**Example**: `allowts=1`       |
| dash_subtitles_merge | Set to `0` to display only the language tracks embedded within the asset. [Learn more](/uplynk/acquire/captions_and_subtitles#subtitle-language-tracks).<br />**Example**: If an asset contains English and an ad contains Spanish, the viewer may only select English for the main content and Spanish for the ad.  |
| ddp  | Set to `1` to include Dolby Digital Plus (DD+) tracks in the manifest file. If missing, only AAC tracks will be served. DD+ setup also requires encoding audio as DD+ via the [audio_dolby_\# parameter (Live Slicer)](/uplynk/acquire/live/on_prem_slicer/#audio-codec) or the [dolby switch (Slicer)](/uplynk/acquire/on_prem_slicer/#audio-codec).<br />**Example**: `ddp=1`      |

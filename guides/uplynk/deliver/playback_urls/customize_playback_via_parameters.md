---
title: Customize Playback via Parameters
---

Customize playback by adding the desired customization parameters directly after core identification parameters in the playback URL's query string.

## Key Information

- Test your customizations by setting a test player URL's query string to the desired customization parameters.
- Please verify that all query string parameters are set to URL-safe values.
- Customization parameters are shown in blue font in the following sample query string:

    ```
    ?tc=1&exp=1358341863&rn=4114845747&ct=a&cid=ea...&rays=dcba&pk=myapp&...&sig=dm13...
    ```
- It is strongly recommended to sign your playback URL to ensure its integrity. Please include customization parameters when signing your playback URL.

## Customization Parameters

- [General](/uplynk/deliver/playback_urls/general_parameters)
- [Ads](/uplynk/deliver/playback_urls/ad_parameters)
- [Studio DRM](/uplynk/deliver/playback_urls/studio_drm)
    - [Apple FairPlay Streaming](/uplynk/deliver/playback_urls/apple_fairplay_streaming_drm)
    - [DASH (Google Widevine and Microsoft PlayReady)](/uplynk/deliver/playback_urls/dash)

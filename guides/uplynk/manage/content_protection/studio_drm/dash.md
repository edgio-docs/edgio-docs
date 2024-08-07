---
title: DASH (Google Widevine DRM and Microsoft PlayReady) DRM
---

Use one of the following DRM solutions to secure your premium content when leveraging DASH to stream media:

- **Google Widevine**: Use this DRM solution primarily for Android, Chrome browsers, and Chromecast devices.

- **Microsoft PlayReady**: Use this DRM solution primarily for Roku, Xbox, and the Microsoft Edge browser.

## Quick Start

Follow these steps to get started with Studio DRM:

1. **Contact your account manager** to enable Studio DRM.
2. **Verify** that the "Require studio approved DRM for playback" and "Require a token for playback" options have been enabled on the desired live event, live channel, or CMS asset.
3. **Re-ingest** the slate that was encoded prior to Studio DRM activation. Use the `cleardash` parameter and turn off digital signatures to ensure optimal playback performance. [Learn more](#).
4. **Re-encode existing CMS assets** that were encoded before Studio DRM activation. Only assets encoded after Studio DRM activation can be secured via Studio DRM. Use the Slicer, Slicebot, or the Cloud Slicer for re-encoding.
5. **Construct the playback URL** for the desired live event, live channel, or CMS asset.
   - Find the DASH version of the playback URL corresponding to the desired live event, live channel, or CMS asset.
    - Define the desired set of Studio DRM policies by adding either a Studio DRM policy configuration or the desired individual policies to the playback URL's query string:

        ```plaintext
        https://content.uplynk.com/ea10fa402fec4bbe996019a0827e6c37.mpd?&drm_policy_name=wvpolicy1
        ```

        <Tip>Use a [Studio DRM policy configuration](/uplynk/manage/content_protection/policy_configuration) and/or the parameter expansion capability to obfuscate your Studio DRM policies.</Tip>

https://docs.edgecast.com/video/Content/Security/DASH.htm

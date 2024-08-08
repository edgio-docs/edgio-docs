---
title: Studio DRM Policy Configuration
---

Studio DRM policies determine how security restrictions (e.g., copying or viewing content) are enforced when using our service. A Studio DRM policy configuration may be defined from within the [DRM Policy Config page](https://cms.uplynk.com/static/cms2/index.html#/settings/drm-policy-config) or via the [Studio DRM API](https://docs.edgecast.com/video/Content/Develop/Studio-DRM-API.htm).

<Info>Studio DRM policy configurations are specific to each CMS user.</Info>

## Set Up a Studio DRM Policy Configuration

1. Navigate to the [**DRM Policy Config** page]([DRM Policy Config page](https://cms.uplynk.com/static/cms2/index.html#/settings/drm-policy-config)).
2. Click **+ DRM Configuration**.
3. In the **DRM Configuration** option, type a name through which this policy will be identified. Click **Add**.
4. Define a policy for each DRM solution that you plan on using:
   - [Apple FairPlay Streaming](#apple-fairplay-streaming)
   - [Microsoft PlayReady](#microsoft-playready)
   - [Google Widevine](google-widevine)
5. Click **Save**.

## Apply a Studio DRM Policy

1. Add [core identification parameters](/uplynk/deliver/playback_urls/#core-identification-parameters) to the playback URL.
2. Define the desired Studio DRM policy by adding one or more of the following customization parameters to the playback URL:
   - **drm_policy_name**: Applies a Studio DRM policy configuration to the playback session.
   - ***\{Policy Setting\}***: Applies a specific policy to the playback session.

   [Learn more](/uplynk/deliver/playback_urls/).

3. Leverage an [expansion parameter](/uplynk/deliver/playback_urls/general-parameters) to shorten the query string and to obfuscate the Studio DRM policy being applied.
4. Sign the playback URL.
5. (Optional) Encrypt the playback URL's query string for an added level of security.

## Apple FairPlay Streaming (FPS)

Use the following settings to define an Apple FairPlay Streaming DRM policy:

---
title: Secure Communication
---
MMD Live provides a variety of methods to secure the publication of your live streams.

## Publishing to MMD Live  {/*publishing*/}
MMD Live accepts RTMP inputs directly from your encoders. All encoders must authenticate using your MMD Live publication credentials given to you on account creation. Edgio works with encoder companies to implement Edgio’s authentication directly into the encoder software.

## Secure Playback of Live Streams  {/*playback*/}
MMD Live provides several ways to secure live stream playback.

### HTTPS  {/*https*/}
MMD Live supports live stream playback through SSL. Simply change your playback URL from `http://` to `https://` to take advantage of secure delivery.

If you would like to use your SSL certificate for secure delivery, please contact your Edgio Customer Representative for more information.

### MediaVault For Chunked Streaming  {/*mediavault*/}
The MediaVault service option allows you to secure the playback of your live streams using tokenization.

MediaVault for HTTP chunked streaming may be implemented using either URL- or Cookie-based tokenization. You are allowed to set your hash secret for each slot. For more information about MediaVault, see the [MediaVault User Guide](/delivery/delivery/mediavault).

Enabling MediaVault causes the Integrated Player Embed Code to not function.

For additional information about securing live streams, see the [MediaVault Section](/delivery/video/mmd_live/configuration_ui/#mediavault) in the [Configuration UI](/delivery/video/mmd_live/configuration_ui) chapter or contact your Edgio Customer Representative.

### DRM Protection  {/*drm*/}
On a per-slot basis, you can protect your live streams using state-of-the-art Digital Rights Management (DRM) protection. See DRM Protection for more detail.

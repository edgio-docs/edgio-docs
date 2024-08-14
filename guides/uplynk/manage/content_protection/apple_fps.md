---
title: Apple FairPlay Streaming (FPS) Digital Rights Management (DRM
---

FairPlay Streaming (FPS) supports:

- HTTP Live Streaming (HLS) playback of encrypted video content.
- iOS, Apple TV, and Safari on macOS 10.10.3 or later.

    <Info>Playback on Safari requires Encrypted Media Extensions (EME). Playback on Safari on a mobile device also requires iOS 11.2 or later.</Info>

- Stopping playback on mobile devices and Apple TV when an expired Content Key (CK) is detected.
- Identifying individual devices without compromising anonymity via a device identifier within the Server Playback Context (SPC) message.

## Quick Start

Set up playback via Apple FairPlay Streaming (FPS) by performing the following steps:

1. Register as a licensed content owner with Apple and request a deployment package. [Request FPS deployment package from Apple](https://developer.apple.com/contact/fps/).

2. Request Studio DRM activation by submitting the following information via the [Apple FairPlay Streaming page](https://cms.uplynk.com/static/cms2/index.html#/settings/apple-fairplay-streaming):

   - Your application public key certificate.
   - Your RSA private key passphrase.
   - Your application secret key.
   - Your RSA private key in PEM format.

3. Verify that both the **Require a token for playback** and the **Require a studio approved DRM for playback** options have been enabled on the desired CMS asset, live channel, or live event.

4. Make your application compatible with our service by performing the following steps:

   - Point your player to a HLS version of the playback URL that corresponds to the content identified in the previous step.
   - Construct and digitally sign this playback URL.

     **Query String**

     Append the following value to the end of the playback URL:
     ```plaintext
     ?rmt=fps
     ```

     **Studio DRM Policies**

        Define the desired set of Studio DRM policies by adding either a Studio DRM policy configuration or the desired individual policies to the playback URL's query string.

        ```plaintext
        ?rmt=fps&drm_policy_name=wvpolicy1
        ```

        <Info>Use a [Studio DRM policy configuration](/uplynk/manage/content_protection/policy_configuration) and/or the [expansion parameter](/uplynk/deliver/playback_urls/#general-parameters) capability to obfuscate your Studio DRM policies.</Info>

5. **Define the desired set of Studio DRM policies** by adding either a Studio DRM policy configuration or the desired individual policies to the playback URL's query string.

   Example:
   ```plaintext
   ?rmt=fps&drm_policy_name=wvpolicy1

   https://docs.edgecast.com/video/Content/Security/Apple-FairPlay-DRM.htm

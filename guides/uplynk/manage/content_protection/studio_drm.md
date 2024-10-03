---
title: Studio Digital Rights Management
---

Studio DRM allows you to control how and when customers may consume content with minimal changes to your existing workflow. Studio DRM provides the capability to:

- Comply with copyright licensing by restricting the playback of your digital media.
- Prevent the unauthorized distribution of your digital media.

## DRM Solutions  {/*drm-solutions*/}

Protect your digital media using one or more of the following DRM solutions:

- **Apple FairPlay Streaming (FPS)**: Use this DRM solution primarily for Apple devices.

- **Google Widevine**: Use this DRM solution primarily for Android, Chrome browsers, and Chromecast devices.

- **Microsoft PlayReady**: Use this DRM solution primarily for Roku, Xbox, and the Microsoft Edge browser.

## Basic Setup  {/*basic-setup*/}

Setting up Studio DRM consists of the following steps:

1. **Studio DRM Activation**: Contact your account manager to activate Studio DRM on your account.

2. **Apple FairPlay Streaming (FPS) Only**
   - [Register as a licensed content owner with Apple](https://developer.apple.com/contact/fps/).
   - [Submit your FPS deployment package information via the CMS](/uplynk/manage/content_protection/apple_fps).

3. **Studio DRM**

    | Type | DRM | Token |
    |---|:---:|:---:|
    | Live Event | # | # |
    | Live Channels | # | # |
    | CMS Assets (Non-slate) | # | # |
    | CMS Assets (Slate for Live Event or Live Channels)<br />Learn more. |   |   |

4. **Studio DRM Policy**: Define a Studio DRM policy, which determines the conditions under which content may be played, via the playback URL's query string.

    <Tip>Use a Studio DRM policy configuration and/or the parameter expansion capability to obfuscate your Studio DRM policy.</Tip>

5. **Media Player Setup**

    Configure your media player to:<br />
    - Point to a signed playback URL for the desired live event, live channel, or CMS asset. This playback URL should include a query string that defines a Studio DRM policy.
    - Acquire a license from our license servers.

## Requirements  {/*requirements*/}

Basic requirements are listed below.

| Requirements | Description |
|---|---|
| Studio DRM | Please contact your account manager if Studio DRM has not been activated on your account. |
| Live Slicer | Version 18052400 or higher |
| Live Events<br />Live Channels<br />CMS Assets | <ul><li>Require Studio DRM and signed playback URLs.</li><li>Disable Studio DRM and signed playback URLs on slate.</li><li>Only CMS assets that were encoded after Studio DRM activation may be secured via Studio DRM.</li></ul>|

Please use one of the following DRM platforms / clients:

| DRM Platform | ABS | Encryption Method | Recommended Clients |
|---|---|---|---|
| Apple FairPlay Streaming | HLS | AES-128 CBCS | iOS<br />Apple TV<br />Safari on macOS |
| Google Widevine DRM | MPEG-DASH | AES-128 CENC | Android<br />Chrome<br />Chromecast<br />Firefox<br />Shaka Player<br />Exoplayer for Android<br />Bitmovin 8.0.1<br />[View a complete listing](https://storage.googleapis.com/wvdocs/Widevine_DRM_Getting_Started.pdf). |
| Microsoft PlayReady | MPEG-DASH | AES-128 CENC | Windows<br />Roku<br />Xbox One<br />[View a complete listing](https://docs.microsoft.com/en-us/playready/overview/developing-applications). |

## How Does It Work?  {/*how-does-it-work*/}

By default, encryption is applied to all video content regardless of whether Studio DRM will be enforced. Playback of encrypted HLS/DASH content requires decryption using the Content Key through which it was encrypted. Typically, this key is securely communicated to the media player by signing the playback URL. However, this key is handled in cleartext by both the viewer's platform and player/client. As a result, it is vulnerable to compromise.

Studio DRM applies an additional level of protection by requiring a player to request a license. A license contains an encrypted Content Key and it allows the publisher to apply security policies that determine the conditions under which the content may be played. By preventing a player from directly requesting a Content Key, it allows the key exchange to typically take place in a Trusted Execution Environment (TEE). This makes it more difficult for an attacker to gain access to keys.

### Ingest  {/*ingest*/}

Studio DRM does not introduce changes into the workflow for ingesting live or on-demand content.

### Playback  {/*playback*/}

Playback of Studio DRM-protected content requires the viewer's player/client to request a license from our license servers. The workflow for HLS and DASH are described below.

**Basic HLS Workflow (Apple FairPlay Streaming)**

![HLS Workflow](/images/uplynk/hls-fps.png)

1. Player requests SPC message from our license server.
- The player requests a manifest file in response to a request to play encrypted HLS content.
    - Our system responds with the requested manifest file.
    - The player requests a key from the operating system.
    - The operating system returns an encrypted SPC message to the player.
    - The player then submits this SPC message to our license server.
2. Our license server identifies the Studio DRM policy for the requested content and then forwards the request, including the Studio DRM policy, to an FPS key server.
3. If the client satisfies this policy, then the FPS key server will send an encrypted CKC message that contains the key to the player via our license server.
4. The player then passes this CKC message to the OS to initiate playback.

**Basic DASH Workflow (Google Widevine and Microsoft PlayReady)**

![HLS Workflow](/images/uplynk/dash-wv.png)

1. In response to a request to stream Studio DRM-protected content, the player submits a license request to our license server.
    - The player requests a manifest file in response to a request to play Studio DRM-protected content.
    - Our system responds with the requested manifest file.
    - In response to the manifest file, the player generates a license request and submits it to the platform security layer (e.g., MediaDRM or Encrypted Media Extensions).
    - The platform security layer returns license request data to the player. The player will leverage this data to submit a license request to our license servers.
2. Our license server identifies the Studio DRM policy for the requested content. If the player satisfies this policy, then a Widevine/PlayReady license will be generated and then forwarded to a Widevine or a PlayReady license server.
3. The Widevine or PlayReady license server will then encrypt the license and then deliver it to the player via our license server.
4. The player may then leverage this license to initiate playback.

## More Information  {/*more-information*/}

- [Apple FairPlay Streaming (FPS) DRM](/uplynk/manage/content_protection/apple_fps)
- [DASH (Google Widevine DRM and Microsoft PlayReady)](/uplynk/manage/content_protection/studio_drm/dash)
- [Studio DRM Policy Configuration](/uplynk/manage/content_protection/policy_configuration)
- [Studio DRM API](https://docs.edgecast.com/video/Content/Develop/Studio-DRM-API.htm)

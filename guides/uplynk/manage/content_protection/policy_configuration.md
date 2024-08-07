---
title: Policy Configuration
---

Studio DRM policies determine how security restrictions (e.g., copying or viewing content) are enforced when using our service. A Studio DRM policy configuration may be defined from within the [DRM Policy Config page](https://cms.uplynk.com/static/cms2/index.html#/settings/drm-policy-config) or via the [Studio DRM API](https://docs.edgecast.com/video/Content/Develop/Studio-DRM-API.htm).

<Info>Studio DRM policy configurations are specific to each CMS user.</Info>

## Set Up a Studio DRM Policy Configuration  {/*set-up-a-studio-drm-policy-configuration*/}

1. Navigate to the [**DRM Policy Config** page]([DRM Policy Config page](https://cms.uplynk.com/static/cms2/index.html#/settings/drm-policy-config)).
2. Click **+ DRM Configuration**.
3. In the **DRM Configuration** option, type a name through which this policy will be identified. Click **Add**.
4. Define a policy for each DRM solution that you plan on using:
   - [Apple FairPlay Streaming](#apple-fairplay-streaming)
   - [Microsoft PlayReady](#microsoft-playready)
   - [Google Widevine](#google-widevine)
5. Click **Save**.

## Apply a Studio DRM Policy  {/*apply-a-studio-drm-policy*/}

1. Add [core identification parameters](/uplynk/deliver/playback_urls/#core-identification-parameters) to the playback URL.
2. Define the desired Studio DRM policy by adding one or more of the following customization parameters to the playback URL:
   - **drm_policy_name**: Applies a Studio DRM policy configuration to the playback session.
   - ***\{Policy Setting\}***: Applies a specific policy to the playback session.

   [Learn more](/uplynk/deliver/playback_urls/).

3. Leverage an [expansion parameter](/uplynk/deliver/playback_urls/general-parameters) to shorten the query string and to obfuscate the Studio DRM policy being applied.
4. Sign the playback URL.
5. (Optional) Encrypt the playback URL's query string for an added level of security.

## Apple FairPlay Streaming  {/*apple-fairplay-streaming*/}

Use the following settings to define an Apple FairPlay Streaming DRM policy:

| Name| Description |
|-----------|------|
| Allow Airplay         | Determines whether playback will be allowed over AirPlay for SD, HD, UHD1, or UHD2 tracks.      |
| Allow AV Adapter      | Determines whether playback may be mirrored via an Apple Lightning AV Adapter for SD, HD, UHD1, or UHD2|
| HDCP Enforcement      | Determines whether High-bandwidth Digital Content Protection (HDCP) enforcement is required for SD, HD, UHD1, or UHD2 tracks. <br /><br /> **Valid values are:** <ul><li>**Not required**: HDCP is not enforced.</li><li>**Type 0 required**: HDCP type 0 content streams is enforced. This allows the stream to be transmitted by the HDCP repeater to all HDCP devices.</li><li>**Type 1 required**: HDCP content type 1 (HDCP version 2.2 or later) is enforced. Streams may not be transmitted by the HDCP repeater to HDCP 1.x-compliant devices or HDCP2.0-compliant repeaters.</li></ul>|
| Key Duration          | Determines the length of time, in seconds, for which the Content Key will be valid. |
| Lease   | Determines whether a client may renew a lease. Playback is only allowed while the lease is valid.|
| Lease Duration        | Determines the length of time, in seconds, during which playback will be allowed. Playback will stop upon the expiration of the lease. <br /><br /> **Key information:** <ul><li>This countdown starts upon the acquisition of the Content Key. </li><li>This parameter requires the lease capability and offline playback. Set the Lease and Persistence options to "Yes."</li></ul> |
| Persistence           | Determines whether offline playback is allowed.|
| Persistence Duration  | Determines the length of time, in seconds, during which offline playback is allowed.|
| Playback Duration     | Determines the length of time, in seconds, for which playback will be valid. <br /><br /> **Key information:** <ul><li>This parameter requires: <br /> - Offline playback. Set the Persistence option to "Yes." <br /> - iOS 11 or later <br /> Note: Your application's user agent should identify the OS as iOS 11 or later.</li><li>This countdown starts upon initial playback.</li><li>Use this setting for offline playback or lease renewals only.</li><li>A license will not expire when this parameter is not specified or if it is set to "0."</li><li>Once playback is successfully initiated, it will be allowed even if playback extends beyond the rental duration.</li></ul>  |
| Rental | Determines whether offline rental is allowed.|
| Rental Duration       | Determines the length of time, in seconds, during which the Content Key is valid prior to initial playback. Playback may only be initiated with a valid Content Key. <br /><br /> **Key information:** <ul><li>This countdown starts upon the acquisition of the Content Key.</li><li>A Content Key will not expire if this parameter is not specified.</li><li>Once playback is successfully initiated, it will be allowed even if playback extends beyond the rental duration. However, the client will not be allowed to restart playback with an expired Content Key.</li></ul>   |

## Google Widevine DRM  {/*google-widevine-drm*/}

Define a Google Widevine DRM policy via:

- [**Content Key Specs:**](#content-key-specs) Use these settings to define track-specific policies.
- [**Policy Overrides:**](#policy-overrides) Use these settings to override asset-specific policies.

### Content Key Specs  {/*content-key-specs*/}

Define Studio DRM policy on a per track basis via Content Key specs.

**Key information:**

- The following default policy will be applied when a Content Key spec has not been defined for a track:
   - Security Level: 1
   - HDCP: HDCP_NONE
- If a policy has not been directly applied to an asset, then a track-specific policy should be defined.

| Name<br />| Description |
|------|--------|
| DRM Track Type    | Determines the scope of the policy by track type. <ul><li>**ALL**: Applies the policy to all tracks.</li><li>**ALL VIDEO**: Applies the policy to all tracks with the exception of the audio track.</li><li>**AUDIO**: Applies the policy to audio tracks.</li><li>**HD**: Applies the policy to high-definition (720p and 1080p) tracks.</li><li>**SD**: Applies the policy to standard definition (576p or less) tracks.</li><li>**UHD1**: Applies the policy to 4K ultra-high-definition video tracks.</li><li>**UHD2**: Applies the policy to 8K ultra-high-definition video tracks.</li></ul>|
| HDCP<br />| Determines whether HDCP is required. <ul><li>**HDCP_NONE**: HDCP is not enforced.</li><li>**HDCP_V1**: Playback requires a client that supports HDCP 1.x or higher.</li><li>**HDCP_V2**: Playback requires a client that supports HDCP 2.0 or higher.</li><li>**HDCP_V2_1**: Playback requires a client that supports HDCP 2.1 or higher.</li><li>**HDCP_V2_2**: Playback requires a client that supports HDCP 2.2 or higher.</li><li>**HDCP_NO_DIGITAL_OUTPUT**: Playback is only allowed on an internal display. Playback over HDCP is disallowed.</li></ul>          |
| Security Level    | Determines the minimum security requirements for performing cryptography, content decoding, and media operations. <ol><li>Requires software-based white-box cryptography.</li><li>Requires software-based white-box cryptography and an obfuscated decoder.</li><li>Requires a hardware-backed Trusted Execution Environment (TEE) for key material and cryptography.</li><li>Requires a hardware-backed TEE for cryptography and content decoding.</li><li>Requires a hardware-backed TEE for cryptography, content decoding, and all compressed and uncompressed media operations.</li></ol><Info>Security levels 3, 4, and 5 require HDCP to be set via the HDCP</Info> |

### Policy Overrides  {/*policy-overrides*/}

Defines the Studio DRM policy for the current license that will be used instead of policies assigned directly to an asset.

| Name          | Description |
|----------|----|
| Allow Persist | Determines whether offline playback is allowed. <ul><li>**True**: Offline playback is allowed.</li><li>**False**: Offline playback is disallowed.</li></ul>  |
| Allow Playback| Determines whether playback is allowed. This setting must be specified when defining policy overrides. |
| Allow Renew   | Determines whether the renewal of this license is allowed.   |
| Always include Client ID    | Indicates to the client application that license renewal and release requests must include client identification (client_id).|
| License Duration| Determines the length of time, in seconds, during which content playback is allowed. <ul><li>This window starts from the time at which the license was issued.</li><li>This parameter must be specified in order to limit playback by license.</li><li>No further decryption is allowed upon license expiration.</li></ul>|
| Playback Duration           | Determines the length of time, in seconds, for which a license will be valid after its initial use. This parameter should only be specified for offline or license renewal scenarios.  |
| Renew with usage| Determines whether the license will be sent for renewal when usage is started. This setting requires configuring the Allow Renew option to "Yes."    |
| Renewal Delay | Determines the length of time, in seconds, after the license is requested before renewal is attempted. This setting requires configuring the Allow Renew option to "Yes."   |
| Renewal Recovery Duration   | Determines the length of the window, in seconds, during which playback is allowed after license server issues prevent renewal. A value of "0" indicates that playback is not restricted. This setting requires configuring the Allow Renew option to "Yes."|
| Renewal Retry Interval      | Determines the length of the delay, in seconds, between subsequent license renewal requests due to license renewal failure. This setting requires configuring the Allow Renew option to "Yes." |
| Renewal Server URL          | Defines the URL to which heartbeat (license renewal) requests for the current license will be directed.    |
| Rental Duration | Determines the length of the window, in seconds, during which a license will be valid prior to its initial use. <ul><li>This window starts from the time at which the license was issued.</li><li>Once a license is used, rental duration is not used or enforced.</li><li>Please use either playback or license duration to further limit playback.</li><li>This parameter should only be specified for offline scenarios.</li></ul>   |

## Microsoft PlayReady  {/*microsoft-playready*/}

Use the following settings to define a Microsoft PlayReady DRM policy:

| Name| Description|
|-------|-----|
| Allow Playback| Determines whether playback is allowed.   |
| Allow VM Playback                  | Determines whether playback will be allowed on a VM for SD, HD, UHD1, or UHD2 tracks. <br />Use this parameter for testing purposes only. This setting determines whether a play enabler GUID will be passed to the PlayReady license server.|
| Analog Video Protection Level      | Determines the minimum security requirements for the client's analog video outputs. <ul><li>100: No security. This level allows the client to pass content to analog video outputs without restrictions.</li><li>150: A client must attempt to engage Copy Generation Management System - Analog (CGMS-A) CopyNever for analog video outputs. Regardless of CGMS-A, the client may pass content to analog video outputs.</li><li>200: CGMS-A is required when a client passes content to analog video outputs.</li><li>201: Prevents a client from passing content to analog video outputs.</li></ul>        |
| Can Persist| Determines whether offline playback is allowed.                  |
| Compressed Audio Protection Level  | Determines the minimum security requirements for passing compressed digital audio to the client's digital audio outputs. <ul><li>**100**: No security. This level allows the client to pass compressed digital audio to digital audio outputs without restrictions.</li><li>**301**: Prevents a client from passing compressed digital audio to digital audio outputs.</li></ul>           |
| Digital Video Protection Level     | Determines the level of digital video protection that will be required. <ul><li>**100**: Allows the client to pass content to digital video outputs.</li><li>**250**: A client must attempt to engage HDCP for digital video outputs. Regardless of HDCP, the client may pass content to digital video outputs.</li><li>**270**: A client must attempt to engage HDCP for digital video outputs. If HDCP cannot be engaged, the client may pass content to digital video outputs when the effective resolution is less than or equal to 520,000 pixels per frame.</li><li>**300**: HDCP is required when a client passes content to digital video outputs.</li><li>**301**: Prevents a client from passing content to digital video outputs.</li></ul>The Require HDCP Type 1 option determines which version of HDCP will be enforced.<br />A different digital video protection level may be applied to SD, HD, UHD1, or UHD2 tracks.  |
| License Begin | Determines the number of seconds prior to the current playback request for which the license will be valid. A license cannot be used prior to the specified time. <ul><li>Set this parameter to 0 to make the license valid any time prior to the playback request.</li><li>The purpose of this parameter is to account for time differences between our servers and the client. For example, a playback request will be denied if this parameter is set to 60 seconds and the client's time is 4 minutes behind our server's time.</li></ul>           |
| License Duration                   | Determines the length of time, in seconds, during which content playback is allowed. <ul><li>This countdown starts upon license creation.</li><li>No further decryption is allowed upon license expiration.</li></ul>      |
| Playback Duration                  | Determines the length of time, in seconds, for which playback will be valid. This countdown starts after initial playback. <br />Use this parameter when setting up a policy for offline playback or license renewal. <br />Playback is unlimited when playback duration has not been specified.     |
| Realtime Expiration                | Determines whether the current playback session will be stopped upon license expiration. <ul><li>**Yes**: Upon license expiration, the current playback session will be stopped.</li><li>**No**: The current playback session will continue if it was started prior to license expiration.</li></ul>      |
| Require HDCP Type 1                | Determines the version of HDCP that will be enforced on digital video outputs when the Video Protection Level option is set to "250" or higher. Apply this requirement for each desired track type (i.e., SD, HD, UHD1, or UHD2). <ul><li>**Yes**: HDCP content type 1 (HDCP version 2.2 or later) is enforced. Streams may not be transmitted by the HDCP repeater to HDCP 1.x-compliant devices or HDCP2.0-compliant repeaters.</li><li>**No**: Allows any version of HDCP.</li></ul>         |
| Security Level| Determines the minimum security requirements for the client device. <ul><li>**150**: No security. This security level is solely provided for testing purposes.</li><li>**2000**: Use this security level for hardened devices and applications consuming commercial content. Requires the protection of Assets, Client Secrets, or Content Secrets via software or hardware.</li><li>**3000**: Use this security level for hardened devices with the highest security consuming the highest quality of commercial content. Devices Only: Requires the protection of Assets, Client Secrets, and Content Secrets via hardware using a Trusted Execution Environment (TEE) for the processor.</li></ul>A different security level may be applied to SD, HD, UHD1, or UHD2 tracks.                  |
| Uncompressed Audio Protection Level | Determines the minimum security requirements for passing uncompressed digital audio to the client's digital audio outputs. <ul><li>**100**: No security. This level allows the client to pass uncompressed digital audio to digital audio outputs without restrictions.</li><li>**250**: A client may pass uncompressed digital audio to digital audio outputs when either of the following conditions are true: <ul><li>HDCP is engaged on HDMI, DisplayPort, or MHL.</li><li>SCMS is engaged and set to CopyNever.</li></ul></li><li>**300**: A client may only pass uncompressed digital audio to digital audio outputs when HDCP is engaged on HDMI, DisplayPort, or MHL.</li><li>**301**: Prevents a client from passing uncompressed digital audio to digital audio outputs.</li></ul> |

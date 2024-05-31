---
title: Digital Rights Management (DRM)
---
This guide is intended for customers who want to implement Digital Rights Management (DRM) on-demand ("on the fly") for their video content. The document first explains Multi-DRM On the Fly (Multi-DRM OTF) concepts and benefits. The document then explains how to implement Multi-DRM OTF.

## Introduction to DRM  {/*intro*/}
Digital Rights Management (DRM) is a technology that allows you to set a license policy for the use of video content, then enforce that policy by encrypting the content to prevent unauthorized play. Typical DRM implementations are costly and time-consuming, requiring the pre-encryption and storage of content in various formats and integrating third-party license server providers.

MMD OD Multi-DRM On the Fly (Multi-DRM OTF) is designed for customers who want to dynamically set license policies and apply encryption to their content for maximum flexibility and cost savings. For example, an OTT provider with a large library of premium content requires DRM on every full-length movie for delivery to all devices used by their subscribers. Still, they also need to deliver the first 30 seconds of each movie to the public for marketing purposes. Instead of creating separate video assets for the clip and the full-length video, Multi-DRM OTF allows a single set of source files to display the clip for any end-user. It may also be used to require subscriber authentication for the full-length video playback.

Adopting Multi-DRM OTF is straightforward: existing MMD OD customers can adopt the feature without modifying their existing content. New customers do not have to pre-encrypt their content before using Multi-DRM OTF.

### DRM License Policy {/*license-policy*/}
License policies are driven by how you want to manage access to your content; Edgio provides flexibility in generating these licenses to fit your business needs. Multi-DRM OTF allows you to set the license policy for a particular user play as you need it. Different DRMs have different types of policies, but the essential three parameters of a license policy are:

- The type of DRM. MMD OD offers Google Widevine, Microsoft PlayReady, and Apple FairPlay.
- The amount of time a license is valid. Widevine lets you set an amount of time in seconds. PlayReady and FairPlay require that you set an expiration date in epoch time.
- The amount of time after playback starts that the license is valid. All three DRM types let you set the duration in seconds.
Details on how to set license policies and additional parameters are outlined later in this document.

### Multi-DRM Support {/*multi-drm-support*/}
DRM does not have a universal standard that can be applied everywhere. To ensure the maximum device and browser coverage for protecting your video streaming, Edgio offers all three of the most widely used DRM types: Google Widevine, Microsoft PlayReady, and Apple FairPlay. Each of these types is supported by selected devices, operating systems, and browsers. MMD OD can output both HLS and MPEG-DASH from your source files combined with these three DRMs, so you have the broadest possible coverage for your end-users.

As you implement Multi-DRM OTF into your workflow, you should consider the combinations of DRM type, video format, device, operating system, and browser you want to support. Each of the common browsers has native support built-in for specific DRMs. However, you can use various commercial or open-source video players to go beyond native support.

<Callout type="info">Beginning with Chrome v58, you must serve your content to the Chrome browser over SSL.</Callout>

DRM Scheme Selection
Multi-DRM OTF gives you the flexibility to use any of the DRM types available, so you have many options.

Start by looking at your business. First, ask which devices your end users use to view your content and what combination of browser-based HTML players and device-based apps you want to support.

Also, consider the video player you plan to use. Many browsers support DRM natively, but you may want the additional functionality found in commercial video players and SDKs.

For reference, here are the video streaming formats and DRMs currently supported on native browsers on various OSs.

| Browser/Mobile OS | Natively Supported DRM |
|---|---|
| Chrome (50+ Windows/Mac/Android) | Widevine |
| Firefox (47+ Windows/Mac) | Widevine |
| IE 11+ on Windows 8.1+ | PlayReady |
| Microsoft Edge (Windows 10+) | PlayReady |
| Safari (8+ on OS X+, iOS 9+) | FairPlay |

<Callout type="info">Browser-based playback enables one DRM per platform, while a mobile app usually lets you select from multiple DRMs.</Callout>

Edgio can assist you in finding the right DRM and streaming format for your needs. After considering your business needs, follow these steps to determine which DRM to use:

1. Determine the devices you want to support: PC, Mac, Android, iOS, Roku, SmartTV, Other
2. Determine which desktop browsers or apps you want to support: IE, Edge, Chrome, Safari, Android App, iOS App, Roku App, Other
3. Determine which combination of DRM and video format your player will support: HLS with Fairplay, DASH with PlayReady, DASH with Widevine

Edgio recommends using these combinations of DRM and video format for the listed devices and applications. Use this chart as a guide as you build your compatibility strategy.

| Devices | Application | Recommended DRM | Recommended Format |
|---|---|---|---|
| Windows PC | IE | PlayReady | DASH |
|   | Edge | PlayReady | DASH |
|   | Chrome | Widevine | DASH |
|   | Firefox | Widevine | DASH |
| Mac | Safari | FairPlay | HLS |
|   | Chrome | Widevine | DASH |
|   | Firefox | Widevine | DASH |
| Android | Apps | Widevine | DASH |
|   | Chrome | Widevine | DASH |
|   | Firefox | Widevine | DASH |
| iOS | Apps | FairPlay | HLS |
|   | Safari | FairPlay | HLS |
|   | Chrome | Widevine | DASH |
|   | Firefox | Widevine | DASH |
| STB and Casts | Chromecast | PlayReady | DASH |
|   | Roku | PlayReady | DASH |
|   | FireTV | PlayReady | DASH |
|   | Apple TV | FairPlay | HLS |
| SmartTV |   | PlayReady | DASH |
| Game Console | XBOX One/360 | PlayReady | DASH |
|   | Playstation 3/4 | PlayReady | DASH |

<Callout type="info">MMD OD Multi-DRM OTF does not support Amazon Fire TV products that are generation 2 or earlier.</Callout>

### Reporting Capabilities {/*reporting-capabilities*/}
Your monthly invoice from Edgio includes reports on the number of license key accesses that the video player makes. A license key access happens each time a player is provided the key to decrypt your content after granted authorization. "License key access" is explained in more depth later in the document.

Additional troubleshooting data is available to Edgio Operations and Support personnel to aid in resolving any issues that may arise. Contact Edgio Customer Support with specifics of any issues found for troubleshooting assistance.

## Multi-DRM OTF with MMD OD  {/*multi-drm*/}
Implementation of Multi-DRM OTF requires interaction among your Content Management System (CMS), MMD OD, and your video players. This interaction is only between your systems and Edgio; no third-party integration is required.

### How Multi-DRM OTF Works  {/*how-works*/}
The interaction begins when your CMS determines the license policy to use based on your business rules, the end user's device, the streaming format you want to deliver, and the DRM type compatible with these choices. Your CMS uses the Edgio Authentication Token Provider (ATP) API to ask for an authentication token. Your CMS then provides the token plus a playback URL to your video player within your website or app.

Your video player then uses the playback URL to request playback of a media from MMD OD and must include the authentication token in the request. MMD OD responds with an encrypted stream that includes a link for the video player to request a license key. The player and device system use the link to request the license key needed to decrypt the content for playback.

Much of the secure activity in this flow is accomplished by the browser or operating system. Modern video players interact with this underlying layer via a technology called Encrypted Media Extensions (EME). Implementing Multi-DRM OTF only requires working the video players that have encapsulated these interactions for you, but if you want to know more about EME, you can start here: [Encrypted Media Extensions](https://w3c.github.io/encrypted-media/).

### System Interaction  {/*system-interaction*/}
This section is a detailed description of the components involved in Multi-DRM OTF and explains how the components interact to make DRM possible.

### System Components  {/*components*/}
Following are the primary components of the Multi-DRM OTF interactions:

- **Public Client (Player)**: The device that plays back a requested video. The public client is how a subscriber or purchaser of content acquires a unique license and plays back the media.
- **Content Management System (CMS)**: The system (or systems) you use to manage your end users’ access permissions and create playback URLs for the video players within your websites or apps. Your CMS uses Edgio's Authentication API to generate individual licenses for subscribers.
- **Content Delivery Service (CDS)**: The Edgio CDN edge servers that:
    - Cache encrypted content on the edge to be reused by multiple public clients.
    - Use MediaVault to protect access to the Authentication Token Provider (ATP) server.
    - Manage DRM license requests from video players.
    - Provide logging services:
        - Interactions with the ATP.
        - License requests.
        - Video playback.
- **Authentication Token Provider (ATP)**: The ATP is a Edgio-developed service that creates the authentication token used by the public client to retrieve a playback license. Your CMS calls the ATP API to request authentication tokens, which the CMS then provides to your public clients. The ATP adds a key ID into the authentication token based on the playback target URL so that the token can only be used for specific content. For extra security, your CMS must call the ATP API using Edgio’s MediaVault protection service. For additional ATP information, refer to Authentication Token Provider.
- **Content Origin**: The location of your video content. MMD OD uses the content origin to retrieve the video content needed to generate HLS and MPEG-DASH formatted streams on the fly. With DRM, MMD OD transmuxes to HLS DASH and then encrypts the content when requested.
- **MMD OD**: Edgio's system that coordinates the calls for DRM content from public clients. This coordination includes interaction with the license server to generated content keys and reading public client requests with authentication tokens for content to be encrypted before delivery.
- **DRM License Server**: The server used for key generation and PlayReady, Widevine, and FairPlay playback licenses.

### DRM Interaction Diagram  {/*drm-diagram*/}
The following diagram illustrates the flow of interaction across the various systems. A high-level list of steps follows the diagram.

The interaction begins when a user clicks a movie title on your website. Then, the public client makes a media request, and the flow continues, as shown in the diagram.

![DRM Diagarm](/images/delivery/video/drm_diagram.png)

1. Your public client starts the interaction by requesting a specific media to play. For example, an end-user clicks on a movie title on your website’s menu of titles, and the public client requests your CMS to navigate to that title’s play page.
2. Your CMS then calls the Edgio ATP (through the Edgio CDS) for an authentication token based on the desired license policy and the public client’s device, OS, or browser. The CMS also generates a playback URL using the standard MMD OD URL generation specifications. The CMS responds to the public client with a play page that contains the MMD OD playback URL, a link to the license server, and the authentication token. If you are using FairPlay, your FairPlay public certificate must be provided to the player as well. For added security, the API call made by your CMS must contain a MediaVault hash.
3. When the public client starts playback, either because the end-user clicks the play button or the video begins to auto-play, the public client uses the playback URL and authentication token to request an HLS or DASH client manifest from MMD OD.
4. MMD OD retrieves the source files from the content origin and retrieves a content key ID for the content from the license server. The content key ID is an encryption key unique to each media so that the CDS can cache encrypted segments.
5. MMD OD sends the HLS or DASH client manifest to your public client. The public client begins playback and finds the content is encrypted.
6. The public client and the DRM support found on the client device request a license by sending the authentication token in a request to the license server. Upon verifying the authentication token, the license server sends back the license that allows the client to decrypt and playback the content per the license policy.

## Implementing Multi-DRM On the Fly  {/*implementing-multi-drm-otf*/}
<Callout type="info">This section builds on the [MMD On-Demand Streaming Guide](/delivery/video/mmd_od) information, which you should read and understand before proceeding. Specifically, be sure you understand the information covered in the [Multi-Bitrate Output without Input Manifest](/delivery/video/mmd_on_demand/multi_bitrate_output_without_input_manifest) section because Multi-DRM OTF extends the capabilities described therein.</Callout>

### Configuring Your MMD OD Account  {/*configuring*/}
You will be provided an MMD OD account configured by Edgio before implementing Multi-DRM OTF. The configuration follows standard MMD OD configuration, with additional configurations for DRM. If you already have an MMD OD account, you can readily add Multi-DRM OTF to that existing account. The configuration of your account will include MediaVault to use for calls to the ATP.

Multi-DRM On the Fly is configured on an account basis. You may have accounts that do not have DRM and some that do under your Edgio account. To configure an account for DRM, contact your Edgio account representative.

#### Transitioning From In-The-Clear to DRM  {/*transitioning*/}
In general, you should not attempt to deliver both in-the-clear (non-encrypted) content and DRM content on the same account. However, if you need time to transition your systems, you can use a configuration that allows both types of content requests on a single account. Contact your Edgio account representative to help with creating a transition plan.

#### Using Apple FairPlay  {/*apple*/}
If you plan to deliver HLS on iOS, tvOS, and Safari on macOS, you must apply directly to Apple for permission to use FairPlay DRM. Once you are approved, you must register your FairPlay information with Edgio’s DRM service. Then you can use your FairPlay license with Multi-DRM OTF.

Edgio will assist you in this process, which consists of the following steps:

1. Apply to Apple for permission to use FairPlay.
    Begin by applying to Apple to obtain a FairPlay Streaming (Public) Certificate, the FairPlay Streaming Certificate's Private key, and the Application Secret key (ASk). The application form is on Apple’s FairPlay Streaming page: https://developer.apple.com/streaming/fps/.

2. Generate your keys.
    Apple will ask you to generate a pair of public and private keys, and to send the public key to Apple. Apple will then send the FairPlay Streaming Certificate and Application Secret key (ASk) back to you.

3. Register your Apple FairPlay keys with Edgio’s DRM service.
    Your FairPlay Streaming Certificate, the FairPlay Streaming Certificate's Private key, and the Application Secret key (ASk) must be kept secure. Follow these instructions exactly to comply with Edgio’s security provision on your MMD DRM order form.

    <Callout type="info">DO NOT SEND YOUR FAIRPLAY INFORMATION DIRECTLY TO Edgio OR AN Edgio REPRESENTATIVE.</Callout>
    - Create a PGP encrypted archive of your FairPlay information.
    - You will need to combine the FairPlay Streaming Certificate, the FairPlay Streaming Certificate's Private key, and the Application Secret key (ASk) into a single archive file. Then PGP encrypts the archive and emails the archive to the MMD DRM license server vendor's email address.

The archive file must be protected with PGP encryption using the public key below:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2
mQENBFggr1IBCADMHdAixprMj++f8c81aIvO3eOVCnIpufGgl9KWb7wNgoycAStg
VhfJ1uTbNSRP6+B2ux0RmePOX9BZO2eIz+DPEX0qJ3l9zBiU/rjIj61I+CvmUsGT
H94DR2rAh+jSUbWQ2eJuJkd3tSO9Re+Wg6FNBwqR05nX/pD1O4/VWNrRrXNSeyou
Zewx4Uvn/YqPQTP9tzQO6Ux7gi/Xc5cCTOwvKr7vJdtYI02wrDY0fYBZXTlCNS9u
nR4VnIuALV67W/+L99Wcn+b67i07QLBqaw0uC/7niZzWoHUmnQ+yLBpeeEo46SGY
XDWoNfUsz3zpI8F5I/cEynfuEB3+qYlF80UBABEBAAG0WkJ1eURSTSAoQ2VydGlm
aWNhdGUgZm9yIHNlY3VyZWx5IHN1Ym1pdHRpbmcgc2Vuc2l0aXZlIGRhdGEgdG8g
QnV5RFJNKSA8c3VwcG9ydEBidXlkcm0uY29tPokBOQQTAQgAIwUCWCCvUgIbAwcL
CQgHAwIBBhUIAgkKCwQWAgMBAh4BAheAAAoJEC682gtiMKxa0P4H/05e9linfjch
k5IS5kl0ZB4PsWYrEAGjkpxO08wkqqagPxXO97QPuyOAYE2u0st53AP9Bzacviiw
FFyO10E/BpWH+l1keSfaI0d1DH59n2pythejAF5I9imwDu3WqiwjRwSGYl2AYj1y
CWsyUWojL5CgyZc//Jpf+eq/ngvS8Kd2kS6vabEuEq60gC6Os9isRDg2Jefa3CBr
Q5tvOK052d6Rx8eWWS5dlrUnVXgAZ29QA6KNATrOJRmFxCSFHFo3JsANspsctDub
H481BA241Wb4IVD8AWuay1EcpZyhFhZy9SWJ2mvCZB4vAgXu8KBLYsDZpjP6sbkM
D+S1oW9OhTW5AQ0EWCCvUgEIAJ0o6eG16WnRgvyTVRT53Uf7MXeaWjkzUbEmKqPq
AA9wQAVFnfKr3J0u4OvMDsiN+aFwOs/opkIhvuM/5VBF7HLqUqL6uRx6Vb2ia2ds
k1GbHCG4RV6X+B0gbbKpByYCg/jefYhJsOS3Vw8nu7EofqRTr6/0NWa1ddCxJ+vD
sC+fH11Br3JM3ngip64jCQUsRH/TqYlGQ7Ere3to9DElSlFBqNeyjKFbuvyAuELh
8MEH7GvaS004hPqtAXH0yyTk4HIMTtUAQSpkv5SwuFVJVD4BHkXxgNJ53ri1a+nz
Xz+4gk3yvD/zxNyv7HUZE9zM/li2CfkJUqOTOYdiyGU22okAEQEAAYkBHwQYAQgA
CQUCWCCvUgIbDAAKCRAuvNoLYjCsWt6+CACh412gRYjpt8yI0DpVC5bdmrLcCiCn
CybT/XRkgzg/OS8Hr3MXKVGzeIQCwwQCCQuMnOA7Q9pWndFJtgaD9aSwp/0NQw+K
rBGZhSaG5+aXauUGnGVE1LZ3B7zboo1/iyFRNm99/5cHzZaI4O+++Pb3v7/JSyTj
M+7x+kwU1XyWX51vJxhic1DNZ/W4S/hk4wxWE/lS+YqhT6mn0A1aDX89PQpg6ATR
BjWHWn6OY1RaxqSzgd2QJ1pBMTY6Fj5WX7JPEuDRAOKGcAaq7/f6HYNm3273zwa7
4tt6XuRER1XrK257WR4luVqdqMv2SkB71WklehBsnQw3mqMxdOu/aDz+=qD5J
-----END PGP PUBLIC KEY BLOCK-----
```

    - Send the PGP protected archive to `fps.certificates@keyos.com` with the following email subject line: `"LL-<your_MMD_OD_DRM_account_name> FairPlay Certificates"`

At this point, you've completed the Apple FairPlay registration process.

### CMS Integration  {/*cms-integration*/}
Your CMS must present video players to end-users with an MMD OD playback URL DRM license URL and an authentication token.

Though not required, Edgio highly recommends that you gather statistics on the activity that your CMS engages in to deliver DRM content in your implementation. This logging can be very useful when reviewing usage data and troubleshooting issues that may arise. Specifically, it’s recommended you capture at least:

- The number and type of calls your CMS makes to the Edgio ATP API, including logging errors for troubleshooting.
- The number of video plays executed by your video players to be used to reconcile with Edgio’s usage calculation.

#### Generating Playback URLs  {/*generating-playback-urls*/}
Playback URLs are given to video players to request the media from MMD OD. Generating playback URLs using the dynamic manifest generation method of URL construction is well documented in the [Multi-Bitrate Output without Input Manifest](/delivery/video/mmd_on_demand/multi-bitrate-without-input-manifest) section of the [MMD On-Demand Streaming Guide](/delivery/video/mmd_od). You can use all the features mentioned in that guide in addition to DRM.

For illustration purposes, suppose your media source files are stored on your content origin in this folder structure:

![Test Manifest](/images/delivery/video/test_manifest.png)

The MMD OD playback URL would look like this:

```
http://<your_MMDOD_account_hostname>/mycontent/test.dynamic.manifest/
h264/stream.ismd/manifest.mpd?stream=movie_305;movie_534;movie_1241
```

##### Alternate Usage: Individual Requests and Encryption Keys  {/*alternate-usage*/}
You can create separate requests for each video rendition or mix and match. Each request has its token, encryption key, and unique content key IDs. Each token is generated with the matching target URL described in [Generating Authentication Tokens](#generating-authorization-tokens). Note that this method uses more license access keys, which will increase your cost of using the service.

For example, using the renditions in [Generating Playback URLs](#generating-playback-urls), you could create the following separate requests:

#### Generating Authentication Tokens  {/*generating-authorization-tokens*/}
An authentication token is a security token that needs to be sent by your player to the DRM license server to get a license. The DRM license server uses the authentication token to authenticate (or reject) the client request. Depending on the values specified in the token XML, the DRM license server also generates a time-based license that is valid for a given set of media. The device DRM support layer uses the license to implement the license policy.

The ATP server receives requests for authentication tokens from your CMS using the ATP API. Separate ATP endpoints can generate tokens for Microsoft PlayReady, Google Widevine, and Apple FairPlay DRM types. Each endpoint returns a base64-encoded token on success or an HTTP error code on failure.

The API request must be formatted using Edgio’s MediaVault URL protection method. Edgio MediaVault is a high-performance URL access protection service that provides an extra layer of security for the interaction of your CMS with the ATP. Using MediaVault is only required when using the ATP API and is not used as part of the DRM system.

A successful response from the ATP server is a base64-encoded signed authentication XML. The authentication XML looks similar to this sample for Widevine playback before it is encoded to base64:

```
<?xml version="1.0" encoding="UTF-8"?>
<LLDRMAuthenticationXML>
    <Data>
        <GenerationTime>2017-04-13 15:27:39.521</GenerationTime>
        <ExpirationTime>2017-04-13 17:27:39.568</ExpirationTime>
        <UniqueId>97805e8e-5cf4-4e75-8a4f-9999dcf4b4ea</UniqueId>
        <RSAPubKeyId>70063bff44bf395262bdddd38340100f</RSAPubKeyId>
        <KeyIDList>
            <KeyID>a0c70e58-52d9-6a44-69d6-1d6ed5538ba0</KeyID>
        </KeyIDList>
        <WidevinePolicy fl_CanPlay="true" fl_CanPersist="true">
            <PlaybackDuration>600</PlaybackDuration>
            <LicenseDuration>600</LicenseDuration>
        </WidevinePolicy>
        <WidevineContentKeySpec TrackType="HD">
            <SecurityLevel>1</SecurityLevel>
        </WidevineContentKeySpec>
    </Data>
    <Signature>
    mqSKavGhrw7fu63UUUL7Z6WUu/gV+RdGPvcRLt99Dx4YlW46jGzpvKtz25qXMUJQr
    dWDlockQJo1DUVoEL0Llp8m/hedYaUGYF5DyV4lLnKOSateTv839w9PpPOadEMSFc
    fzOSKb5uDyksolEbCkzAR11EP0guGdx9q3zaE4Z04klChai42T9+qu+I6/YkgsXvL
    TdAzh0ksc4r1K/ehi3IKNxFIocM+M84jsXR4J1uocj+yerIOeKbaWNoSETOlpH5AP
    vTUwBNLQGhS1d9iLrhDnYzSkgJSzqRPhmGx4mhyerjoIRzZccMajCQC3OxioV9VZr
    ATcnbu21/Yg5S+UFg==
    </Signature>
</LLDRMAuthenticationXML>
```

In the preceding example, the signature is broken over multiple lines for readability.

##### Using MediaVault  {/*using-mediavault*/}
Your CMS will use a script or service that processes ATP API URLs so that a MediaVault hash (cryptographic string) may be added to the end of the URL as a query parameter. This hash is generated using an MD5 hash generator operating on the API URL plus a shared secret. The shared secret is an 8-12 character secret known only to yourself and Edgio, which will be configured for your account during your Multi-DRM OTF service turn up. When your CMS requests an authentication token with an API URL containing the MediaVault hash, the CDS Edge will use the shared secret to verify the URL and hash have not be tampered with.

Edgio recommends that MediaVault hashes be generated using MediaVault start-time and end-time values. The time values will ensure the ATP API request will only be valid between these times. Any attempt to use the hashed ATP API URL outside of the start and end times used in the hash or alter any characters in the URL will cause the CDS Edge not to validate the URL and prevent the request from successfully executing.

Use the following steps to create the ATP API request using MediaVault:

1. Generate an ATP API request as described in [ATP Endpoints](#atp-endpoints).
2. Add the start and end time MediaVault timing parameters to the end of the URL: `&s=<start-time>&e=<end-time>` where `<start-time>` and `<end-time>` are the number of seconds since the Unix epoch.
3. Prepend your hash secret to the URL.
4. Create a hash value based on the MD5 of the combined hash secret + modified playback URL string.
5. Remove the hash secret that was prepended to the URL.
6. Append the `&h=<hash value>` parameter to the modified playback URL.

Following these steps, your ATP API request URL will look something like this:

#### ATP Endpoints   {/*atp-endpoints*/}

```
https://<your_MMDOD_account>-token.lldns.net/token/vod/widevine?
    licenseDuration=100&playbackDuration=600&
    targetUrl=https://<your_MMDOD_account_hostname>/stream.ismd/
    manifest.mpd?stream=movie_305;movie_534;movie_1241&s=
    <start-time>&e=<end-time>&h=<hash value>
```

##### ATP Endpoint for Google Widevine DRM  {/*atp-google*/}
||Details|
|---|---|
| Version | 1.0.0 |
| HTTP Method | GET |
| Response | 200 OK: Returns a base64-encoded Signed Authentication XML.<br />500 Internal server error. |
| Request | Sample |

**Query Parameters**
| Name | Type | Description | Default |
|---|---|---|---|
| licenseDuration | Integer | Persistent policy that defines how long (in seconds) license is valid after it is acquired.<br />Minimum: 0<br />Maximum: 31557600 (one year) | No default |
| playbackDuration | Integer | Amount of time (in seconds) after playback starts that the license is valid.<br />Minimum: 0<br />Maximum: 31557600 (one year) | 0 (zero): unlimited duration |
| targetUrl | String | String representation of the target media.<br />See below for an example. | No default; required parameter |
| securityLevel | Integer | Specifies the security level for Widevine DRM tokens used by Edgio's Authentication Token Provider (ATP). Each value dictates the cryptographic requirements of the playback device and defines a correspondence to a Widevine Device Security Level. A higher security level indicates lower cryptographic requirements. HD video content playback requires a Widevine Device Security Level of 1.<br /><br />`1`: Default. Software-based white-box cryptography is required.<br />Corresponds to Widevine Device Security Level: 3<br />`2`: Software cryptography and an obfuscated decoder are required.<br />Corresponds to Widevine Device Security Level: 3<br />`3`: Key material and cryptography operations must be performed within a hardware-backed trusted execution environment.<br />Corresponds to Widevine Device Security Level: 2<br />`4`: Cryptography and decoding of content must be performed within a hardware-backed trusted execution environment.<br />Corresponds to Widevine Device Security Level: 1<br />5: Cryptography, decoding, and all media handling (compressed and uncompressed) must be done within a hardware-backed trusted execution environment. Corresponds to Widevine Device Security Level: 1<br />Minimum: 1<br />Maximum: 5 | 1: Software-based white-box cryptography is required. |

**Target URL Sample**
```
https://<your_MMDOD_account_hostname>/d1/stream.ismd/manifest.mpd?
stream=movie_305;movie_534;movie_1241
```

**Sample Request**
```
/token/vod/widevine?licenseDuration=100&playbackDuration=600&
targetUrl=https://<your_MMDOD_account_hostname>/stream.ismd/
manifest.mpd?stream=movie_305;movie_534;movie_1241
```

##### ATP Endpoint for Microsoft PlayReady DRM  {/*atp-ms*/}

|| Details|
|---|---|
| Version | 1.0.0 |
| HTTP Method | GET |
| Response | 200 OK: Returns a base64-encoded Signed Authentication XML.<br />500 Internal server error. |
| Request | Sample |

**Query Parameters**
| Name | Type | Description | Default |
|---|---|---|---|
| BeginDate | Long (UNIX epoch time) | Date and time in UTC when the license starts to be valid. Useful when pre-delivering licenses for future events. | No default |
| ExpirationDate | Long (UNIX epoch time) | Date and time in UTC when the license becomes expired. | No default |
| ExpirationAfterFirstPlay | Integer | The number of seconds after the license was first used to unlock the content before the license expires.<br />Minimum: 0<br />Maximum: 31557600 (one year) | No default |
| MinimumSecurityLevel | Integer (specific values) | `150`: for devices with test level certificates<br />`2000`: default security level that the KeyOS PlayReady License service sets in the license if authentication XML does not contain the `MinimumSecurityLevel` parameter.<br />`3000`: similar to `2000` but also requires that players and devices have a PlayReady Trusted Execution Environment (available since PlayReady 3.0).<br />`2000` and `3000` are for production. | 2000 |
| targetUrl | String | String representation of the target media.<br />See below for an example. | No default; required parameter |

**Target URL Example**
```
https://<your_MMDOD_account_hostname>/d1/stream.ismd/manifest.mpd?
stream=movie_305;movie_534;movie_12411
```

**Sample Request**
```
/token/vod/playready?ExpirationAfterFirstPlay=1000& targetUrl=
https://<your_MMDOD_account_hostname>/stream.ismd/manifest.mpd?
stream=movie_305;movie_534;movie_1241
```

##### ATP Endpoint for Apple FairPlay DRM  {/*atp-apple*/}
||Details|
|---|---|
| Version | 1.0.0 |
| HTTP Method | GET |
| Response | 200 OK: Returns a base64-encoded Signed Authentication XML.<br />500 Internal server error. |
| Request | Sample |

**Query Parameters**

<Callout type="info">If you include both `ExpirationDate` and `ExpirationSeconds`, `ExpirationDate` is used.</Callout>

| Name | Type | Description | Default |
|---|---|---|---|
| rentalExpirationDate | Long (UNIX epoch time) | Date/time in UTC until which the rental period is valid. | No default |
| rentalExpirationSeconds | Integer | Time in seconds for which the rental period is valid.<br />Minimum: 0<br />Maximum: 31557600 (one year) | No default |
| leaseExpirationDate | Long (UNIX epoch time) | Date/time in UTC until which lease should be valid. | No default |
| leaseExpirationSeconds | Integer | Time in seconds for which the lease period is valid.<br />Minimum: 0<br />Maximum: 31557600 (one year) | No default |
| persistenceDate | Long (UNIX epoch time) | Date/time in UTC until which the license will persist. | No default |
| persistenceSeconds | Integer | Time in seconds for which the license will persist.<br />Minimum: 0<br />Maximum: 31557600 (one year) | No default |
| hdcpEnforcement | String | - `none`: non-HDCP playback is allowed.<br />- `type0`: enforces HDCP type 0. The HDCP Repeater may transmit type 0 Content Streams to all HDCP Devices.<br />- `type1`: enforces HDCP type 1. The HDCP Repeater may not transmit type 1 Content Streams to HDCP 1.x-compliant Devices, HDCP 2.0- compliant Devices, and HDCP 2.1- compliant Devices. | No default |
| targetUrl | String | String representation of the target media.<br />See below for an example. | No default; required parameter |

**Target URL Example**

```
https://<your_MMDOD_account_hostname>/stream.ismd/manifest.m3u8?
stream=movie_305;movie_534;movie_1241
```

**Sample Request**

```
https://<your_mmdod_account_hostname>/token/vod/fairplay?
rentalExpirationSeconds=500&leaseExpirationSeconds=500&
persistenceSeconds=500&
targetUrl=https://<your_mmdod_account_hostname>/stream.ismd/
manifest.m3u8?stream=movie_305;movie_534;movie_1241
```

#### Generating the Play Page  {/*generating*/}
Once your CMS has generated the MMD OD playback URL and the authentication token, it needs to create a page that includes these elements along with your player. Each playback implementation is unique to your website or apps in design and layout, but you need to include these common elements.

<Callout type="info">Chrome v58 and higher requires that your content be served over SSL. Without SSL, playback does not start, even if the license was acquired successfully by the player. If your Widevine- protected content does not play in Chrome, try loading it over SSL.</Callout>

<Callout type="info">Every video player, commercial and open-source, has its unique method to add DRM to playback. While each must include the common elements below, they are implemented according to each unique player method. For instance, the Dash.js example below is unique to the Dash.js video player.</Callout>

##### License Server URL  {/*license-server*/}
The license server URL is the URI passed down to the Encrypted Media Extensions (EME ) layer of devices so a license can be retrieved from Edgio and decrypt the content. License server URLs are DRM-specific. Edgio’s URLs are as follows:

| DRM Type | License Server URL |
|---|---|
| Widevine | `https://&lt;account name&gt;-mmd-cust-wv-license.lldns.net/` |
| PlayReady | `https://&lt;account name&gt;-mmd-cust-pr-license.lldns.net/` |
| FairPlay | `https://&lt;account name&gt;-mmd-cust-fp-license.lldns.net/getkey/` |

**Apple FairPlay DRM Certificate URL**
In addition to the license server URL, Apple FairPlay also requires that the URL to a public certificate be provided in the player code. The link must have this structure for Edgio to process the certificate request correctly:

```
https://<account name>-mmd-cust-fp-license.lldns.net/cert/
```

**Dash.js Example**
This example, split into two parts, uses the Dash.js player to illustrate how to use a DASH playback URL with a Google Widevine DRM authentication token. The MMD OD playback URL, the Widevine license server URL, and the Edgio DRM authentication token are called out in comments.

*Part 1*
This part shows the MMD OD playback URL.

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title>Test Player</title>

    <!-- NOTE: Please use your domain to host the player, instead of
    using demo domain as shown here. -->
    <script src="https://demo.com/html5/dash.all.latest.js"></script>
</head>
<body>
    <video id="videoPlayer" controls="true" style="width: 800px;
    height: 500px;" type="video/mp4"></video>
    <script>
        (function() {
            var viewElement = document.querySelector("#videoPlayer");

            //////////////////////
            // MMD OD Playback URL
            //////////////////////
            var streamUrl = "https://<your_MMDOD_account_hostname>/
                d1/stream.ismd/manifest.mpd?stream=movie_305;
                movie_534;movie_1241";

            var player = dashjs.MediaPlayer().create();
            ```

*Part 2*
Here the authentication token has been shortened for readability.
```
            // Create and set ProtectionData using CustomData
                (base64-encoded authentication XML).

                player.setProtectionData({
                "com.widevine.alpha": {

                    ///////////////////////////////
                    // Widevine License Server URL
                    ///////////////////////////////
                    serverURL: "https://<account name>-mmd-cust-wv-
                    license.lldns.net/",

                    ///////////////////////////////////////////////
                    // The authentication token is in the
                    // 'customdata' element
                    ///////////////////////////////////////////////
                    httpRequestHeaders: {customdata:
                        "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZD4="},
                        clearkeys: ""
                    }
                });

                /* Initialize player by passing three arguments:
                 * - View - Player's HTML Element
                 * - URL - Stream URL
                 * - AutoPlay - True or False
                 */
            player.initialize(viewElement, streamUrl, true);
        })();
    </script>
</body>
</html>
```

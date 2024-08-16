---
title: DASH (Google Widevine DRM and Microsoft PlayReady) DRM
---

Use one of the following DRM solutions to secure your premium content when leveraging DASH to stream media:

- **Google Widevine**: Use this DRM solution primarily for Android, Chrome browsers, and Chromecast devices.

- **Microsoft PlayReady**: Use this DRM solution primarily for Roku, Xbox, and the Microsoft Edge browser.

## Quick Start  {/*quick-start*/}

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

        <Tip>Use a [Studio DRM policy configuration](/uplynk/manage/content_protection/policy_configuration) and/or the [parameter expansion](https://docs.edgecast.com/video/Content/Security/Apple-FairPlay-DRM.htm) capability to obfuscate your Studio DRM policies.</Tip>

    - [Sign the playback URL](/uplynk/deliver/playback_urls/#basic_setup).

6. **Update your player/client** to submit a license request to our license server via one of the following license acquisition URLs:

    **License acquisition URL for Google Widevine**: `https://content.uplynk.com/wv`

    **License acquisition URL for Microsoft PlayReady**: `https://content.uplynk.com/pr`

    <Tip>Request a license from the region where the manifest file was generated to avoid being redirected. (#license-acquisition).</Tip>

7. **Point your player** to the signed playback URL generated in step 5.

8. Optional. **Configure Exoplayer** to support key rotation. Exoplayer Only (Widevine)

	`"drm_multi_session": true`

**More Information**:

- [Learn more about ExoPlayer (Widevine)](#exoplayer).
- [Learn how to set up Google Shaka player for use with Widevine](#google-shaka-player).

## License Acquisition  {/*license-acquisition*/}

The player must request a license before it will be allowed to play Studio DRM-protected content.

<Info>Protection Scheme Specific Header (PSSH) data, which is used to generate a license request, is only provided as segments within the manifest file.</Info>

<Info>If you have disabled Studio DRM, then you must request a cleartext key instead of a license. [Learn more](/uplynk/deliver/playback_urls/#disable-studio-drm).</Info>


**License acquisition URL for Google Widevine**: `https://content.uplynk.com/wv`

**License acquisition URL for Microsoft PlayReady**: `https://content.uplynk.com/pr`

License requests submitted to content.upynk.com will be redirected to the region where the manifest file was generated. For example, if the manifest file was generated from content-ause2.uplynk.com, then license requests submitted to the Widevine license acquisition URL will be redirected to: `https://content-ause2.uplynk.com/wv`.

Avoid this redirect by requesting the license from the appropriate region. Use our [Preplay API](https://docs.edgecast.com/video/Content/Develop/Preplayv2.htm) to find out the correct zone prefix (e.g., content-ause2.uplynk.com) and then request a license from that region (e.g., https://content-ause2.uplynk.com/wv).

## Unencrypted DASH Content  {/*unencrypted-dash-content*/}

Edgecast-branded slate is shown when a live channel or live event encounters slate that was encoded prior to Studio DRM activation. Please re-ingest existing slate via the Slicer or Slicebot. Ensure optimal performance for slate by using the cleardash parameter when ingesting it. This parameter will store an unencrypted version of that slate in the CMS library. This allows the player to bypass Studio DRM licensing when looping through slate and thus avoids the need to frequently request a new license at regular intervals (e.g., 4 seconds).

<Warning>Unencrypted assets may be downloaded or played without restriction. Encryption and Studio DRM cannot be applied to assets that were sliced with the cleardash parameter.</Warning>

<Tip>Slate and ads should not require a digital signature.</Tip>

## Google Shaka Player (Widevine)  {/*google-shaka-player*/}

Set up a basic Google Shaka player to stream protected content through the following steps:

1. Follow the instructions provided within the [Shaka Player tutorial](https://shaka-player-demo.appspot.com/docs/api/tutorial-basic-usage.html) to perform the following actions:
    - Get the source by cloning the following Git repository:

      ```
      https://github.com/google/shaka-player
      ```

    - Compile the Google Shaka player library.
    - [Create an HTML page](https://shaka-player-demo.appspot.com/docs/api/tutorial-basic-usage.html) with a video element.
    - [Create a JavaScript file](https://shaka-player-demo.appspot.com/docs/api/tutorial-basic-usage.html) (e.g., `myapp.js`).
    - Update the JavaScript file created in the previous step to:
        - Reference a signed playback URL that points to the desired content:

          ```javascript
          var manifestUri =
              'https://content.uplynk.com/ea1...c38.mpd?tc=1&exp=1553273704&rn=1234&ct=a&cid=ea1...c38&drm_policy_name=wvpolicy1&sig=ecd...cbf';
          ```

        - Reference our license server:

          ```javascript
          var licenseServer =
              'https://content.uplynk.com/wv';
          ```

        - Configure the player to use our license server before it loads the manifest. [Learn more](https://shaka-player-demo.appspot.com/docs/api/tutorial-license-server-auth.html).

2. Host the following assets on your web server:
    - Compiled Google Shaka player library (e.g., `dist/shaka-player.compiled.js`)
    - HTML page created earlier.
    - JavaScript file created earlier.

## ExoPlayer (Widevine)  {/*exoplayer*/}

Setting up ExoPlayer to playback Studio DRM-protected content involves the following steps:

1. Reference a signed playback URL that points to the desired content.

    Sample configuration (`media.exolist.json`):

    ```json
    {
        "uri": "https://content.uplynk.com/ea1...c38.mpd?tc=1&exp=1553273704&rn=1234&ct=a&cid=ea1...c38&drm_policy_name=wvpolicy1&sig=ecd...cbf"
    }
    ```

2. Set the DRM scheme to "widevine."

    Sample configuration (`media.exolist.json`):

    ```json
    {
        "drm_scheme": "widevine"
    }
    ```

3. Set the DRM license URL to:

    Sample configuration (`media.exolist.json`):

    ```json
    {
        "drm_license_url": "https://content.uplynk.com/wv"
    }
    ```

4. Enable multi-session DRM to support key rotation.

    Sample configuration (`media.exolist.json`):

    ```json
    {
        "drm_multi_session": true
    }
    ```

    <Info>Initial playback will work regardless of this setting. However, if this setting is not defined, playback will fail upon key rotation. This setting is especially important for streaming live content, since all keys will not be available when the license is generated.</Info>

5. Optional. Offline Playback (Rental) Only

    If VOD content will be played offline, request all keys up front by including the following setting:

    Sample configuration (`media.exolist.json`):

    ```json
    {
        "drm_key_request_properties": {"X-DASH-SEND-ALL-KEYS":"1"}
    }
    ```

### Sample Configurations  {/*sample-configurations*/}

Sample configurations that leverage the main ExoPlayer demo player are provided below.

**Sample `media.exolist.json`**:

```json
[{
    "name": "Widevine DASH",
    "uri": "https://content.uplynk.com/ea1...c38.mpd?tc=1&exp=1553273704&rn=1234&ct=a&cid=ea1...c38&drm_policy_name=wvpolicy1&sig=ecd...cbf",
    "drm_scheme": "widevine",
    "drm_license_url": "https://content.uplynk.com/wv",
    "drm_multi_session": true
}, {
    // additional configuration objects
}]
```

**Sample `media.exolist.json` for Offline Playback**:

```json

[{
    "name": "Widevine DASH",
    "uri": "https://content.uplynk.com/ea1...c38.mpd?tc=1&exp=1553273704&rn=1234&ct=a&cid=ea1...c38&drm_policy_name=wvpolicy1&sig=ecd...cbf",
    "drm_scheme": "widevine",
    "drm_license_url": "https://content.uplynk.com/wv",
    "drm_multi_session": true,
    "drm_key_request_properties": {"X-DASH-SEND-ALL-KEYS":"1"}
}, {
    // additional configuration objects
}]
```

## Playback without Studio DRM Protection  {/*playback-without-studio-drm-protection*/}

The following information is only applicable once Studio DRM has been activated on your account.

Certain types of content (e.g., slate) should not be protected by Studio DRM.

**Play Content Without Studio DRM Protection**

1. Disable Studio DRM by performing either of the following:

    - Clear the **Require studio approved DRM for playback** option on the desired CMS asset.
    - Pass the `drm_optional` parameter in the playback URL. Learn more.

2. Pass the `ck` parameter in the playback URL:

- For all players: `&ck=1`

- Exoplayer only: `&ck=4`

3. Update your player to request a cleartext key via the following URL: https://content.uplynk.com/ck

## Microsoft Playready  {/*microsoft-playready*/}

Content owners use Microsoft PlayReady™ content access technology to protect their intellectual property, including copyrighted content. This service uses PlayReady technology to protect certain content. If the PlayReady technology fails to protect the content, content owners may require the service to restrict or prevent the delivery of protected content to specified devices or PC software applications. In certain cases, you may be required to upgrade the PlayReady technology to continue to access the service’s content. If you decline such an upgrade, you will not be able to access content that requires the upgrade.


## More Information  {/*more-information*/}

- [Studio DRM Policy Configuration](/uplynk/manage/content_protection/policy_configuration)
- [Studio DRM API](https://docs.edgecast.com/video/Content/Develop/Studio-DRM-API.htm)

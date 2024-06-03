---
title: Content Protection
---
Protecting content from unauthorized use is a critical need for content distributors.

Edgio provides multiple ways to secure your content when you deliver through MMD OD.

## Multi-DRM On the Fly  {/*multi-drm*/}
Edgio offers customers the ability to protect their playback URLs using Digital Rights Media (DRM) On the Fly, a capability referred to as Multi-DRM OTF.

You can use the Multi-DRM OTF service to set license policy usage for end-users and encrypt your content with Microsoft PlayReady, Google Widevine, or Apple FairPlay DRM. MMD OD will allow you to determine the license policy and select which DRM to use for each use of your content. No pre-encrypting and storage of multiple versions of your content are needed; MMD OD will perform the DRM encryption as the content is transmuxed.

Existing customers can adopt the feature without modifying the content, and new customers do not need prior DRM licensing or capabilities before adopting Multi-DRM OTF.

<Callout type="info">MMD OD has limited support for delivering chunked output from content that has already been encrypted with DRM. Please contact your Account Manager for details.</Callout>

## Secure Communications  {/*secure-communications*/}
### Edgio Certificate
Secure communication using the Edgio SSL certificate is available by simply using HTTPS to access your URLs.

### Custom Certificate  {/*custom-certificate*/}
If you wish to use your domain and SSL certificate, please contact your Edgio Customer Representative for more information.

## Purging Capabilities  {/*purging-capabilities*/}
Protecting content sometimes means removing it from public access. MMD OD is integrated with SmartPurge, Edgio's innovative system for removing content from the CDN Cache.

MMD OD customers who need to purge their transmuxed content from MMD OD will be able to purge all files associated with the published URL(s) for the streams using the Control Portal SmartPurge interface. Purging of content delivered with a manifest and without a manifest are both supported.

### Purge Target URL  {/*purge-url*/}
At this time, the purging of MMD OD content is only by the target URL. Use the *SmartPurge* link under the *Manage* menu in the Control Portal to enter the SmartPurge interface. Click the **Enter URLs** tab and enter the publish URL(s) you use to deliver MMD OD content. A purge request will result in the origin files, client manifest, and each rendition being removed from the cache.

### Query Parameters  {/*query-parameters*/}
If your published URLs use query parameters, leave those off of the purge request URLs. They are not needed for the purge operation to be successful. Leaving them on the URL to purge will also be successful, but they are not necessary for SmartPurge to work correctly.

For more information, see [Purging Content with SmartPurge](/delivery/control/manage/content_with_smartpurge) in the Edgio [Control User Guide](/delivery/control).

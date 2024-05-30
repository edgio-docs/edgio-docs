---
title: MMD OD Overview
---
Edgio’s Multi-device Media Delivery (MMD) On Demand (MMD OD) is a powerful cloud-based set of video delivery services for automatically converting video content into different streaming video formats. MMD OD transmuxes content as requested, reducing workflow complexity and storage costs while meeting the demands of device diversity. MMD OD is integrated with Limelight’s global Orchestrate Platform to deliver broadcast-quality video to all connected devices over a massive global private infrastructure with advanced content delivery capabilities.

The variety of devices—smartphones, tablets, laptops, set-top boxes (STBs), smart TVs—used by viewers today have specific format requirements, which can mean potentially pre-transcoding or transmuxing and storing dozens of extra copies of each video to ensure that the right format is delivered. MMD OD tackles this challenge of delivering on-demand video to audiences by automatically transmuxing a single set of source files in the cloud into multiple video formats at the time of the request.

<Callout type="info">- This service is available for specific configurations of either Video Delivery or Content Delivery.<br />- For more information, please contact your Account Manager or Solutions Engineer.</Callout>

## MMD OD Delivery Process  {/*process*/}
This diagram gives an overview of the process of delivering on-demand multi-device media.

![MMD OD Process](/images/delivery/video/mmdod.png)

With Video Delivery’s multi-device support, you upload a Multi-Bitrate set of media files, and Edgio streaming servers deliver HDS, HLS, MPEG-DASH, or MSS playback in all your target regions to support desktop and mobile devices across a range of connection speeds. Video players that support Adaptive Bitrate streaming automatically select the best bitrate for the device.

## MMD OD Feature Highlights  {/*highlights*/}
MMD OD offers a wide array of features and options to allow you to customize the on-demand delivery experience you provide to your end-users.

### Origin Selection  {/*origin-selection*/}
MMD OD is flexible in where you host your source files. MMD OD can perform its on-demand transmuxing from Edgio’s Origin Storage, or it can be configured to pull content from your storage origin.

#### Edgio Origin and Intelligent Ingest  {/*origin-intelligent-ingest*/}
Edgio Origin Storage is an efficient and cost-effective way to host the source files that MMD OD uses to deliver video streaming formats. By uploading your source files to Origin Storage, you benefit from the proximity of your content to the MMD OD service, reducing latency and interruptions in service. Using Origin Storage will also reduce your bandwidth costs of moving source files to MMD OD when they are requested.

Edgio staff will help you move your source files to Origin Storage and configure MMD OD to read from your Origin Storage account. Alternatively, you can use Edgio’s Intelligent Ingest feature of Origin Storage only to move source files when requested.

**Edgio’s Intelligent Ingest**
Intelligent Ingest is a Edgio Origin Storage feature that allows you to migrate source files only as they are requested. With the Intelligent Ingest feature enabled, MMD OD will request source files from Origin Storage first, and if they are not found, you will then request them from your storage origin. The request will then trigger an asynchronous process whereby Origin Storage will retrieve the source files from your storage origin and place them into your Edgio Origin Storage account. The next time MMD OD requests those files, it will find them in your Origin Storage account.

Contact your Edgio representative to find out how you can use Edgio’s Intelligent Ingest to make the migration of your video source files easy and painless.

#### Customer Origin  {/*customer-origin*/}
If you choose to use your storage location to host the source files, MMD OD can be configured to call back to your origin. When a request for a video comes to the Edgio edge, MMD OD will retrieve the source files from your origin, transmux them into the requested format and deliver the video stream to the player.

### Static or Dynamic Manifest  {/*manifest*/}
MMD OD will transmux a set of source files into a video streaming format such as HLS, MPEG-DASH, HDS, and MSS upon request. The set of source files for a video will be different renditions (encodings of the same video content but with different bitrates and resolutions) that MMD OD will transmux into a stream that allows for Adaptive Bitrate (ABR) playback.

You have the option of providing Edgio with a Static Input Manifest file that contains information about the renditions for each video. MMD OD uses the information in the Static Input Manifest to build the contents of the playback URLs provided back to the requesting player. Static Input Manifests must be available in the same storage origin as the renditions. The renditions and Manifest file must also adhere to the specifications found in [Multi-Bitrate Output with Input Manifest](/delivery/video/mmd_on_demand/multi_bitrate_output_with_input_manifest).

A simpler and more cost-effective way to use MMD OD to let the service create the Input Manifest file for you. Dynamic Manifest generation eliminates the need to create a Static Input Manifest file and store it. Instead, MMD OD will create a temporary Input Manifest used to create the requested playback URLs. You can read more about Dynamic Manifest generation in [Multi-Bitrate Output without Input Manifest](/delivery/video/mmd_on_demand/multi_bitrate_output_without_input_manifest).

### Query Parameters  {/*query-parameters*/}
Additional playback control and end-user experiences can be dynamically added to your video files using the MMD OD query parameters. These parameters may be added to the end of the playback URL given to your video player to customize a particular end-user experience. For example, parameters allow you to:

Play just a short segment of a video as a preview instead of creating and managing a separate clip or preview asset
Dynamically set the rendition ordering and segment size of the transmuxed video if you need to adjust because of an end user’s connection speed
You can find the full list of Query Parameters in [Query Parameters](/delivery/video/mmd_on_demand/query_parameters).

### Secure Communications  {/*secure-communications*/}
Enhancing the security of your streaming content is a key priority of MMD OD.

Delivery of playback URLs can be over SSL, using Edgio’s certificate or your own.

#### Multi-DRM On the Fly  {/*drm-on-the-fly*/}
Edgio offers customers the ability to protect their playback URLs using Digital Rights Media (DRM) On the Fly, a capability referred to as Multi-DRM OTF.

You can use the Multi-DRM OTF service to set license policy usage for end-users and encrypt your content with Microsoft PlayReady, Google Widevine, or Apple FairPlay DRM. MMD OD will allow you to determine the license policy and select which DRM to use for each use of your content. No pre-encrypting and storage of multiple versions of your content are needed; MMD OD will perform the DRM encryption as the content is transmuxed.

Existing customers can adopt the feature without modifying the content, and new customers do not need prior DRM licensing or capabilities before adopting Multi-DRM OTF.

### HLS TrickPlay Support  {/*trickplay*/}
Apple Trick Play allows HLS streams to be played in fast forward and rapid reverse, imitating the capabilities available in systems such as VCRs. Trick Play must be incorporated in the HLS manifest, and MMD OD offers support for Trick Play with both Static Input Manifests and Dynamic Input Manifests. Learn more about how MMD OD supports Trick Play in [Enabling Trick Play in HLS](/delivery/video/mmd_on_demand/enabling_trick_play_in_hls).

### Edgio SmartPurge  {/*smartpurge*/}
MMD OD is integrated with SmartPurge, Edgio's innovative system for removing content from the CDN Cache. You can purge MMD OD content based on any published URL using the SmartPurge interface within Control. For details, see "Purging Content with SmartPurge" in the Control User Guide.

### Alternate Audio Tracks  {/*alternate*/}
Alternate audio tracks are often used within a video to allow end-users to select a different language or add Director's Commentary to a video.

The metadata information stored in the audio and video files about the audio tracks must be accurate; for example, for audio tracks, the 'language' must be correctly signaled.

<Callout type="info">Suppose you are using an input manifest, and there are multiple video tracks contained within a video source file. In that case, the HLS output will contain all combinations of video and audio tracks in the source file. For other formats, only the highest bitrate video track will be used.</Callout>

#### Encoding Guidelines  {/*encoding-guidelines*/}
All audio tracks must be encoded with AAC.

Alternate audio for HLS requires at least version 4 of the HLS protocol. MMD OD defaults to a version higher than 4, so if you use the `hls_client_manifest_version` option and want multiple audio tracks, be sure to use version 4 or higher.

For HLS, the language tracks must be at the same bitrate. The matching bitrate is required in HLS v4 to create correct groups of audio tracks, which will allow the player to present the language selections in the UI. If you have more 'tracks', say two audio bitrates in two languages, you will need four audio tracks. The manifest will provide the two groups, and the player will select the better quality while maintaining the language selection option in the UI.

Alternate audio for MPEG-DASH Representations is arranged into Adaptation Sets. To allow for seamless switching between the Representations in an Adaptation Set, the Representations are grouped in the same Adaptation Set, if, and only if, they have identical values for the following properties:

- the language as described by the @lang attribute.
- the Role element.
- the @codecs attribute.
- the @audioSamplingRate attribute.

<Callout type="info">MSS and HDS do not support identical audio tracks in different bitrates.</Callout>

It is not possible to mix mono and stereo audio with HTTP Smooth Streaming. Audio tracks should either be all mono or all stereo.

### Edgio Control  {/*control*/}
MMD OD comes with access to Edgio’s Control portal. With Control, you will retrieve report data on the traffic delivered with the MMD OD service.

For more information about Edgio Control, see the [Control User Guide](/delivery/control).

### Subtitle Support  {/*subtitles*/}
MMD OD supports WebVTT subtitle output for HLS and MPEG-DASH formats. WebVTT subtitles are configured dynamically via query parameters or custom HTTP headers.

For details, please see [Subtitles](/delivery/video/mmd_on_demand/multi_bitrate_without_input_manifest/#subtitles).

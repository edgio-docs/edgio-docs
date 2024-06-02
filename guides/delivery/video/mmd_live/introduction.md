---
title: MMD Live Introduction
---

## Delivering MMD Live  {/*delivering_mmd_live*/}
Edgio delivers MMD Live with transcoding and transmuxing.

- Transcoding converts a single input stream into multiple bitrates and formats.
- Transmuxing converts a stream into different formats only.

### Transcode  {/*transcode*/}
The following diagram gives an overview of the process of delivering multi-device media via transcode slots. Transcode slots allow you to send MMD Live a single high bitrate RTMP input, which will be transcoded to multiple bitrates and then transmuxed to the output formats.

![Transcode](/images/delivery/video/transcode.jpg)

You send a single bitrate RTMP stream to the Edgio ingest server. Edgio streaming servers located in all of your target regions deliver live playback to support desktop, set-top, and mobile devices across a range of connection speeds. The Limelight Video Player automatically selects the best bitrate for the device. If you use your video player, the playback URLs provided to you also allow you to access multiple bitrates.

### Transmux  {/*tranxmux*/}
The following diagram gives an overview of the process of delivering multi-device media via transmux.

![Transmux](/images/delivery/video/transmux.jpg)

You can input up to eight bitrates per live stream. Your encoder sends these bitrates into the Edgio ingest server, and MMD Live transmuxes the bitrates into multiple playback formats.


## MMD Outputs  {/*mmd_outputs*/}
- HLS
- HDS
- MPEG-DASH
- MSS

## Customizable Latency  {/*customizable_latency*/}

Your video latency from ingest to the edge is customizable. The allowable configuration range is from three to 60 seconds, with a default of 30 seconds. If you want to customize your latency, please contact your Account Manager.



## Slot Configuration  {/*slot-config*/}
MMD Live is allocated by “slot.” A slot is a reserved capacity for you to ingest your live stream into. Slots are of type SD, HD, FHD, or transmux. See [Inputs and Outputs](/delivery/video/mmd_live/inputs_outputs) for more detail.

The MMD Live section of Control (referred to as the "Configuration UI" in this document) allows you to configure slots for transcoding and transmuxing. Available customer configurations include:

- bitrates
- bitrate ordering (if that option is available)
- frame size/resolution (transcode only)
- slot names and descriptions to help define metadata
- MediaVault and DRM protection

Configuration details are covered in [Configuration UI](/delivery/video/mmd_live/configuration_ui).

## DRM Protection  {/*drm-protection*/}
Edgio's DRM capabilities use a sophisticated system of IDs and keys to provide Digital Rights Management (DRM) protection to live streams. DRM is configured on a per-slot basis.

For configuration instructions, see [Configuration UI](/delivery/video/mmd_live/configuration_ui).

For more information about DRM, contact your Edgio Customer Representative.

## Live Stream Encoders  {/*encoders*/}
A client-based live stream encoder must capture live footage and stream to the ingest servers of MMD Live. All encoders must be able to support H.264 CODEC and AAC Audio CODEC.

## Live to VoD  {/*live_to_vod*/}
Edgio MMD Live includes a capability that allows an event that is being streamed live to be automatically recorded to Edgio Origin Storage for later playback as a Video on Demand (VoD) asset. Customers can configure the recording of single live events, recurring live events, or continuous streaming for later VoD playback.

Details about the service and its configuration are in [Live to VOD](/delivery/video/mmd_live/live_to_vod).

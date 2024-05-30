---
title: MMD Live
---

|Topic|Description|
|---|---|
| [Introduction](/delivery/video/mmd_live/introduction) | Overview of the MMD Live product, including a high-level description of delivery, outputs, customizable latency, slot configuration, DRM, encoders, and Live to VoD  |
| [Inputs and Outputs](/delivery/video/mmd_live/inputs_outputs) | MMD Live receives incoming live streams from your encoder and either transcodes or transmuxes them into up to five video formats and one audio-only stream. (Please note that audio-only is produced exclusively for HLS). Once you complete your slot setup, you receive playback URLs for different formats. MMD Live supports HTTP, HLS, HDS, MSS, and MPEG-DASH. You can place these playback URLs in your endpoints, and MMD Live live streams and provides Adaptive Bitrate Streaming (ABS) with the following resolutions and bitrates, depending on the output format and whether your slot is a transcode or a transmux slot. |
| [Closed Captions](/delivery/video/mmd_live/closed_captions) | MMD Live supports closed captions on some streamed outputs. If you embed closed captions in your stream, viewers can see these captions in HLS and HDS outputs. Closed caption support is not available in MPEG-DASH or MSS. If desired, you can enable or disable subtitles for HLS output on a per-slot basis.  |
| [Configuration UI](/delivery/video/mmd_live/configuration_ui) |You can access the Control portal to view and configure the slots you have purchased. You can view, create, copy, and more.  |
| [Live to VoD](/delivery/video/mmd_live/live_to_vod) | Edgio MMD Live includes a capability that allows an event that is being streamed live to be automatically recorded to Edgio Origin Storage for later playback as a Video on Demand (VoD) asset. Customers can configure the recording of single live events, recurring live events, or continuous streaming for later VoD playback. |
| [Encoder Settings](/delivery/video/mmd_live/encoder_settings) | A client-based live stream encoder must capture live footage and stream it to the ingest servers of MMD Live. All encoders must support H.264 CODEC and AAC Audio CODEC. |
| [Secure Communications](/delivery/video/mmd_live/secure_communications) | MMD Live provides a variety of methods to secure the publication of your live streams. |
|[MMD Live API Developers Reference](/delivery/video/apis/mmd)|This documentation is intended for programmers who are writing client or server applications that interact with MMD Live Recording Schedules and Slots.|

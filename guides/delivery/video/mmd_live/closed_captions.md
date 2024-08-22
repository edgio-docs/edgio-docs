---
title: Closed Captions
---
MMD Live supports closed captions on some streamed outputs. If you embed closed captions in your stream, viewers can see these captions in HLS and HDS outputs. Closed caption support is not available in MPEG-DASH or MSS.

If desired, you can enable or disable subtitles for HLS output on a per-slot basis. Please see Configuration UI for more information.

Closed Captions Formats
The input is required to be in CEA 608 format, and the outputs are:

|Output|Closed Caption Format|
|---|---|
|HDS|OnTextData|
|HLS|WebVTT|

For instructions on using captions, see the [Closed Captioning Guide](/delivery/video/limelight_video_platform/closed_captioning).

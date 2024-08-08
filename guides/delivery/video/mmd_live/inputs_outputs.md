---
title: Inputs and Outputs
---
MMD Live receives incoming live streams from your encoder and either transcodes or transmuxes them into up to five video formats and one audio-only stream. (Please note that audio-only is produced exclusively for HLS). Once you complete your slot setup, you receive playback URLs for different formats. MMD Live supports HTTP, HLS, HDS, MSS, and MPEG-DASH. You can place these playback URLs in your endpoints, and MMD Live live streams and provides Adaptive Bitrate Streaming (ABS) with the following resolutions and bitrates, depending on the output format and whether your slot is a transcode or a transmux slot.

<Callout type="info">MPEG-DASH playback on the DASH.js player is not supported.</Callout>

## Transmux Slots  {/*transmux-slots*/}
A transmux slot allows you to input up to 8 bitrates per live stream and receive five formats out at those same bitrates. The maximum throughput of all 8 bitrates combined must not exceed 16 Mbps. Your encoder sends these bitrates into your slot, and MMD Live transmuxes them into multiple playback formats. The output bitrates are the same as your input bitrates for each playback format. Your endpoints can use the ABS feature of MMD Live to switch among the bitrates to optimize the user experience for HLS, HDS, MPEG-DASH, and MSS. You can set up your bitrates through the Control portal.

MPEG-DASH outputs will include configured bitrates in the master manifest only if they are available from the encoder. If the encoder is not publishing a particular bitrate, that bitrate will not appear in the MPEG-DASH manifest.

### Flexible Aspect Ratio  {/*flexible-aspect-ratio*/}
MMD Live Transmux slots can take whatever aspect ratio you provide as input and produce as output HLS, DASH (and other formats) with that same aspect ratio.

For example, if you want to have a 4:3 ratio video like 320x180 (landscape) with a 268 Kbps video bitrate video along with a 64 Kbps audio bitrate, just set up a Transmux slot with those video and audio bitrates. Send the signal in the 320x180 resolution from your encoder to the MMD Live Transmux slot.

MMD Live Transmux slots also support vertically oriented aspect ratio video in addition to landscape or letterbox.Using the same video and audio bitrates example, if you encode your video to 180x320, then the MMD Live Transmux slots will produce the same resolution aspect ratio and bitrates in HLS DASH and other formats. The 180x320 resolution is just an example; any aspect ratio you input into a Transmux slot will be output in HLS, DASH (and other formats).

<Callout type="info">Transcode slots are fixed in aspect ratio to 16:9. If you feed in a 4:3 signal or any other aspect ratio than 16:9 into a Transcode slot, the output will appear with a black filling where the input image ends.</Callout>

### Transcode Slots  {/*transcode-slots*/}
A transcode slot allows you to input a single RTMP stream and receive five formats at multiple bitrates out. MMD Live accepts 576p (SD), 720p (HD), and 1080p (FHD) input streams and transcodes them into the output streams listed below.

<Callout type="info">For Transcode slots, the audio-only stream is exclusively available for HLS output.</Callout>

You can set up your slots through the Control portal.

### SD Slots  {/*sd-slots*/}
**576p (SD) Slot Input Requirements**: 1024x576_1800 kbps video, 128 kbps audio, 30 fps

Outputs:

| Video Stream | Audio Stream | Stream Name |
| --- | --- | --- |
| 1024x576\_1800 kbps | LLNW 1 AAC-LC 128 kbps | $sourceStreamName\_1800 |
| 848x480\_1000 kbps | LLNW 1 AAC-LC 128 kbps | $sourceStreamName\_1000 |
| 640x360\_668 kbps | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_668 |
| 320x180\_268 kbps | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_268 |
| 320x180\_110 kbps | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_110 |
| None (audio only) | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_a |

### HD Slots  {/*hd-slots*/}
**720p (HD) Slot Input Requirements**: 1280x720_2400 kbps video, 192 kbps audio, 30 fps

Outputs:

| Video Stream | Audio Stream | Stream Name |
| --- | --- | --- |
| 1280x720\_2400 kbps | LLNW 1 AAC-LC 192 kbps | $sourceStreamName\_2400 |
| 1024x576\_1800 kbps | LLNW 1 AAC-LC 128 kbps | $sourceStreamName\_1800 |
| 848x480\_1000 kbps | LLNW 1 AAC-LC 128 kbps | $sourceStreamName\_1000 |
| 640x360\_668 kbps | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_668 |
| 320x180\_268 kbps | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_268 |
| None (audio only) | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_a |

### FHD Slots  {/*fhd-slots*/}
**1080p (FHD) Slot Input Requirements**: 1920x1080_4000 kbps video, 192 kbps audio, 30 fps

Outputs:

| Video Stream | Audio Stream | Stream Name |
| --- | --- | --- |
| 1920x1080\_4000 kbps | LLNW 1 AAC-LC 192 kbps | $sourceStreamName\_4000 |
| 1280x720\_2400 kbps | LLNW 1 AAC-LC 192 kbps | $sourceStreamName\_2400 |
| 1024x576\_1800 kbps | LLNW 1 AAC-LC 128 kbps | $sourceStreamName\_1800 |
| 848x480\_1000 kbps | LLNW 1 AAC-LC 128 kbps | $sourceStreamName\_1000 |
| 640x360\_668 kbps | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_668 |
| None (audio only) | LLNW 1 AAC-LC 64 kbps | $sourceStreamName\_a |

## CORS Support  {/*cors-support*/}
CORS (Cross-Origin Resource Sharing) is default enabled for all MMD Live output URLs.

The header `Access-Control-Allow-Origin`: \* is included in playback response headers.

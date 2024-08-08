---
title: Video Source File Specifications
---
Edgio recommends the following specifications for all video source files. Adherence to these specifications will result in optimal playback quality and efficient uploading to your account. See below for details.

## Ideal Source File  {/*ideal-source-file*/}

In general, a source file that represents the following will produce the best results:

**MP4 file (H.264/ACC-LC)**
-   Fast Start ( at the front of file)
-   Progressive scan (no interlacing)
-   Constant frame rate of 24 (23.98), 25, or 30 (29.97) fps
-   A between 5,000 - 8,000 Kbps
-   720p resolution

## Detailed Recommendations  {/*recommendations*/}
The table below provides detailed recommendations ( CODECs, containers, Bitrates, resolutions, and so forth) for all video source material uploaded to an Edgio Account.

ult (click "Generate" to refresh) Copy to clipboard  Preview
| Source File Element | Recommendations   |
|---|---|
| Video CODEC | Recommended CODEC: H.264 Accepted but not Recommended: MPEG-1, MPEG-2, MPEG-4, VP6, VP5, H.263, Windows Media Video 7 (WMV1), Windows Media Video 8 (WMV2), Windows Media Video 9 (WMV3)   |
| Audio CODEC | Recommended CODEC: AAC-LC Accepted but not Recommended: MP3, MP2, WMA, WMA Pro, PCM, WAV   |
| Container | MP4, MP3, MOV, FLV, AVI, ASF, WMV, MPG, MXF, WAV   |
| Fast-Start | Ensure your source file is created with the 'MOOV atom' at the front of the file. The MOOV atom, also known as 'movie atom' or 'QT Fast Start', contains information about the video file. The MOOV atom needs to be at the beginning of the file to ensure fast transcoding. Unless otherwise specified, most encoding software will put the MOOV atom at the end of the file. Look for one of these settings in your encoding software to override the default and place the atom at the beginning: "progressive download," "fast start," "use streaming mode," or similar options.   |
| Interlacing | All media should be de-interlaced before uploading. In other words, use the 'Progressive' scan. Interlaced video is primarily used for television and does not display well on computer screens, producing jagged lines during playback.   |
| Frame Rate | The frame rate of the source file should reflect the same rate at which the material was filmed. For example, content shot in 24 frames per second (fps) should be encoded and uploaded at 24 fps. Recommended frame rates are 24 (23.98), 25, or 30 (29.97) fps. Settings larger than these recommendations may result in poor user viewing experiences due to high CPU usage. Avoid frame rates that are below one (1), as this will result in excessive buffering.   |
| Bitrate | An ideal source bitrate is around 5,000 - 8,000 Kbps. However, you may want to upload a slightly higher or slightly lower Bitrate depending on the resolution you wish to target. Here is the Target Delivery Resolution: Recommended Minimum Source Bit Rate:<br />1080p: 8000 Kbps<br /> 720p: 5000 Kbps <br />480p:2500 Kbps <br />360p:1200 Kbps |
| Aspect Ratio | Any aspect ratio (including 16:9 widescreen and 4:3 standard) is supported. However, Edgio will maintain the original file's aspect ratio for all encodings and therefore recommends that the desired display ratio be used for the source file.   |
| Resolution | Upload a 1080p source if you intend to deliver to large screens (for example, TV). In general, a 720p source is acceptable to provide a great experience on most devices.   |
| Pixels | Original media files should be encoded using isomorphic (square) pixels only. Media that is encoded using anamorphic (rectangular) pixels will display distorted.   |
| Keyframes | Edgio recommends that keyframes be set at least every six seconds. However, in most cases, you can set this to ‘Automatic’ in your encoding software.   |
| Chapters | Chapters are not supported in source media.   |

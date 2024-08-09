---
title: Encoder Settings
---
A client-based live stream encoder must capture live footage and stream it to the ingest servers of MMD Live. All encoders must support H.264 CODEC and AAC Audio CODEC.

There is a large variety of encoders, software, and hardware available for use with your workflow. Edgio cannot test every encoder model and encoder version available in the market. However, here is a list of encoders to help you get started:

-   Elemental Live ([Website](https://aws.amazon.com/elemental-live/))
-   ffmpeg (For advanced or custom applications) ([Website](https://www.ffmpeg.org/))
-   Haivision ([Website](https://www.haivision.com/products/video-encoder-solutions/))
-   Larix Broadcaster iOS, Android, and Windows Phone Apps ([Website](https://wmspanel.com/larix_broadcaster))
-   Nimble Streamer ([Website](https://blog.wmspanel.com/2016/07/publishing-rtmp-limelight-cdn.html))
-   Osprey ([Website](https://www.ospreyvideo.com/talon))
-   OBS ([Website](https://obsproject.com/))
-   Telestream Wirecast ([Website](https://www.telestream.net/wire-cast/overview.htm))

## Encoder Settings Requirements  {/*requirements*/}
Setting up your encoder is the most crucial step to stream successfully to MMD Live. It’s essential to have all your encoder settings correct to avoid delays and errors in making your streams available to end-users.

Use this checklist when configuring your encoder:

- **Primary and Backup**: MMD Live provides redundant ingest points for your live stream, providing robust failover capability during maintenance periods and outages. However, this requires your encoder to publish to both primary and backup ingests with timecode synchronization to best take advantage of this feature. Retrieve the primary and backup publish URLs from the slot configuration within the Control portal; you can return to Control and view the URLs at any time.
- **Timecode**: Many encoders have a timecode setting that synchronizes the primary and backup publish streams. Timecode synchronization is critical to allowing MMD Live to properly failover from the primary to the backup ingest during outages so your client endpoints can experience minimum disruption.
- **Encoder Output Resolution**: Be sure the resolution you set matches the resolution of the slot to which you are publishing. If an HD slot receives an encoder stream that has an FHD resolution, that slot rejects the connection.
- **Transcode or Transmux?** A transcode slot expects just one input sent to each of the primary and backup ingests. But a transmux slot allows you to set up multiple bitrates, and both primary and backup ingests expect to see your encoder publish each of these bitrates into the ingest. For example, if you set up your transmux slot to have four bitrates, your encoder should send these four bitrates to both the primary and the backup ingests.
- **Video Bitrate**: Be sure your video bitrate matches the expected bitrate of the slot to which you are publishing. Too high a bitrate may result in your connection being rejected. You can find the correct bitrates for your slot on the Inputs and Outputs section of this guide.
- **Audio Bitrate**: Matching the audio bitrate setting to our [specifications](/delivery/video/mmd_live/inputs_outputs) ensures a proper sounding output at your client endpoints.
- **Frame Rate**: Matching the frame rate setting to our [specifications](/delivery/video/mmd_live/inputs_outputs) ensures a smooth video experience at your client endpoints.
- **Keyframe Interval**: Set your keyframe interval based on the output chunk size setting of your MMD Live account. The keyframe interval setting inside the encoder MUST be a factor of the chunk size. That is, the division of chunk size/keyframe interval MUST result in an integer. For example, if your stream’s chunk size is set to 10 seconds, your keyframe interval should be either 10, 5, 2, or 1 second. For 10 second chunks, a keyframe Interval of 5 seconds is recommended.

Keep in mind the following rules when declaring streams:

- To ensure quality, declare settings that meet the input specification for the type of slot you publish. NOTE: Your input stream bitrate and resolution must match your slot configuration setup within the Control portal for your service to work correctly. MMD Live monitors your input stream to ensure it matches your slot configuration settings. If your input stream has a higher resolution than your slot configuration, or if your bitrate exceeds two times your configured setting for over 10 seconds, your input stream may be temporarily disconnected for up to ten seconds. The temporary disconnect is to provide time for your encoder settings to return to your configured values. When your input stream returns to your slot configuration settings, the stream is allowed to reconnect.
- Make sure you have enough upload bandwidth at your encoder to support your bitrate. Bitrates that are too high may cause buffering. To figure out how much upload bandwidth you need, add your video bitrate and audio bitrate and multiply by two for primary and backup.
- Enabling 'Timecode' on your encoder sets an absolute time code on the streams you send to MMD Live. The timcode keeps your primary and backup streams in synch so that if publishing to the primary ingest server fails, the backup stream can keep your live stream available to users.
- Ensure your keyframe Interval is set correctly within your encoder. The keyframe interval must be based on the output chunk size setting for your MMD Live account. Mismatched chunk size and keyframe interval combination may cause your live stream not to function correctly.

## Sample Set-Up Using Larix Broadcaster Mobile Encoder App  {/*sample*/}
[Larix Broadcaster](https://wmspanel.com/larix_broadcaster) is a mobile application for Android, iOS, and Windows Phone, allowing live streaming from your device to any destination that supports RTMP or RTSP protocols.

Larix Broadcaster allows you to encode and broadcast both video and audio to your mobile device in real-time over WiFi, EDGE, 3G, or LTE.

- Live H.264/AAC encoding.
- Front and back cameras are supported with a hot switch.
- Landscape and portrait mode, with "always horizontal" or “always vertical” support.
- Selfie stick support
- Custom white balance, exposure value, and anti-flicker.
- Long press the preview to focus lens to infinity, double-tap for continuous autofocus.
- Saving to MP4, making screenshots.
- Multiple simultaneous connections - you can add several destinations profiles and choose up to three connections for simultaneous streaming.

Edgio CDN authentication is supported - you can publish your streams directly into Edgio for further delivery.

### Install Larix Broadcaster  {/*Install*/}
You can install both the Android version and the iOS version. These instructions demonstrate that the Android setup and the iOS setup are similar.

1. Look for the name in the Google Play Store, select *Larix Broadcaster*, and click the **Install** button.


2. You are prompted for several permissions that are required to perform the capturing and streaming.


3. The preview screen displays with all control buttons.


4. Click the gear icon to open the settings dialog.

### Define Edgio Connection  {/*define*/}
The main menu displays.



1. Click **Connections**. An empty list of connections displays.
2. Click **New connection**.


3. Enter the desired name and insert the URL of your ingest point that Edgio provided. Then click Edgio, enter your user login and password available for your ingest point, and then click the **SAVE** button.



Now you can select your destinations for other streaming. If you defined several destinations, you could select up to three of them simultaneously.

#### Start Streaming  {/*start-streaming*/}
Go back to the preview screen and click the red button to start the transmission. A status bar is visible at the bottom for each connection. Once it starts, you can open the URL which you obtained from Edgio to watch the stream.

#### SDK  {/*sdk*/}
Larix Broadcaster is based on a mobile library and is part of the Larix Mobile Broadcasting SDK, a separate commercial product provided by Softvelum LLC for mobile application developers. Suppose you need to embed streaming functionality into your application or create something similar to what you just saw. In that case, the SDK contains the library and the source code of Larix Broadcaster, which allows creating your app in a few steps. You can also subscribe for a license.

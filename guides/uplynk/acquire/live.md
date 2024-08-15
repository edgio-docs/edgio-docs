---
title: Live
---

Our live event service allows you to:

- Test your stream prior to the start of the event.
- Control the audio/video feed source.

    An operator controls:

    - When and which Live Slicer will slice content.
    - The timing and duration of ad breaks.
    - When slate should be inserted into the stream.
- Mark key events within your stream.

**Key Information**

- Scheduled live events may be tracked within a calendar.
- A live event must have a starting and ending point.
- A live event's playback URL may be signed to control how and when the live event may be viewed. [Learn more.](/uplynk/deliver/playback_urls)
- The source of a live event may consist of multiple Live Slicers. This type of setup allows manual failover to a backup Live Slicer when the live feed from the primary Live Slicer is unavailable or suboptimal.
- [Slate](#set-up-slate) will be displayed under the following conditions:

    - Prior to the start of the live event.
    - Upon the completion of the live event.
    - During an ad break when ad content is missing.
    - Outside of an ad break when the Live Slicer is not producing content.

    <Info>Slate may also be manually inserted into the broadcast.</Info>

- A live event may be configured to allow on-demand playback upon its completion. This type of setup will generate a CMS asset upon the completion of the live event. Although this asset will exclude slate, it will contain ad breaks.

## Quick Start  {/*quick-start*/}

Set up a live event by performing the following steps:

1. [Configure a Live Slicer for use with live events](#set-up-a-live-slicer).
2. [Set up a live event configuration](#set-up-a-live-event-configuration).
3. [Set up and distribute a media player](#set-up-a-media-player).
4. [Broadcast the live event](#broadcast-a-live-event).
5. Optional. [Provide on-demand access to the completed live event](#on-demand-content).

## Set up a Live Slicer  {/*set-up-a-live-slicer*/}

<Info>An alternative to the Live Slicer is the [CameraSlicer](/uplynk/manage/live_events/#cameraslicer). It provides a simplified streaming solution when the full functionality and flexibility provided by the Live Slicer and the Live Events Dashboard are not needed.</Info>

### Prepare the Live Slicer to Stream a Live Event  {/*prepare-the-live-slicer-to-stream-a-live-event*/}

1. Verify that the latest version of the Live Slicer (231114.04.01) is installed. <br />[View Live Slicer release notes](https://cms.uplynk.com/static/cms/news.html).

2. Verify that the system time on the computer hosting the Live Slicer is accurate.

    <Tip>Use Network Time Protocol (NTP) to sync your Linux server's time with a public time server.</Tip>

    The Live Events Dashboard uses UTC time to schedule certain commands to the Live Slicer. Therefore, inaccurate system time on the computer hosting the Live Slicer may lead to synchronization issues.

    **Sample synchronization issues**: <ul><li>It could prevent the Live Slicer from ending an event and thereby cause the Live Slicer to perpetually slice content into an orphaned live event.</li><li>It may prevent on-demand content from being generated for the live event.</li></ul>

3. Define the following settings in the Live Slicer configuration file (`/etc/uplynk.conf`):

    ```
    api_port: 127.0.0.1:65009
    preview: on
    livepreview_with_audio: on
    livepreview_max_viewers: 2
    ```


    Additional information for each of the above Live Slicer settings is provided below.

    - **api_port**: Verify that the Live Slicer has been configured to listen for API requests on a specific port.
    - **preview**: Enables the live preview capability within the Live Events Dashboard.
    - **livepreview_with_audio**: Enables audio within the Live Events Dashboard's live preview when using Live Slicer version 22083100 or higher.
    - **livepreview_max_viewers**: Limits the number of simultaneous viewers of a live preview.

        <Info></Info>Each instance of a live preview consumes resources on the computer hosting the Live Slicer. This setting is designed to prevent performance issues by capping the number of simultaneous connections.

4. Recommended: Secure the communication between the Live Slicer and the Live Events Dashboard through the use of SSL/TLS.

    <Warning>If a Live Slicer is not configured to support TLS, then browsers may not properly load the Live Events Dashboard due to the page containing a mixture of HTTP and HTTPS content. Some browsers display a warning icon in the address bar to indicate this issue. An operator may then choose to accept this potential security threat by configuring the browser to allow insecure content.</Warning>

### Set up SSL/TLS  {/*set-up-ssl-tls*/}

The Live Slicer may communicate with the Live Events Dashboard over SSL/TLS. The use of TLS secures all transferred data by encrypting it.

#### Set up TLS Certificate Automatically  {/*set-up-tls-certificate-automatically*/}

A TLS certificate may be automatically generated by the CMS, downloaded, and then installed on the computer hosting the Live Slicer by performing the following steps:

1. Verify that the Live Slicer is hosted on a computer with a public IP address.

2. Perform the following updates within the Live Slicer configuration file (`/etc/uplynk.conf`) and then save your changes:

   - Set the `ssl_port` setting to the desired port.

     **Example**: `ssl_port: 65010`


   - If present, remove the `ssl_cert` and `manual_ip` settings.

3. Verify that your firewall is configured to allow traffic on the port defined by the `ssl_port` setting.

4. Restart the Live Slicer.


#### Set up TLS Certificate Manually {/*set-up-tls-certificate-manually*/}

---
title: Live Events
---

Broadcast an event (e.g., concert, sporting event, lecture, etc.) in near real-time by leveraging a live event.

<Info>If you require a continuous live stream, consider using a live channel instead.</Info>

Our live event service allows you to:

- Test your stream prior to the start of the event.
- Control the audio/video feed source.

    An Operator Controls:

    - When and which Live Slicer will slice content.
    - The timing and duration of ad breaks.
    - When slate should be inserted into the stream.
- Mark key events within your stream.

**Key Information**

- Scheduled live events may be tracked within a calendar.
- A live event must have a starting and ending point.
- A live event's playback URL may be signed to control how and when the live event may be viewed. [Learn more](/uplynk/deliver/playback_urls/#sign-playback-urls-with-a-token).

- The source of a live event may consist of multiple Live Slicers. This setup allows manual failover to a backup Live Slicer when the live feed from the primary Live Slicer is unavailable or suboptimal.

- [Slate](#slate) will be displayed under the following conditions:

    - Prior to the start of the live event.
    - Upon the completion of the live event.
    - During an ad break when ad content is missing.
    - Outside of an ad break when the Live Slicer is not producing content.

    Slate may also be manually inserted into the broadcast.

- A live event may be configured to allow on-demand playback upon its completion. This setup will generate a CMS asset upon the completion of the live event. Although this asset will exclude slate, it will contain ad breaks.


## Quick Start
Set up a live event by performing the following steps:

1. [Configure a Live Slicer for use with live events](#set-up-a-live-slicer).
2. [Set up a live event configuration](#set-up-a-live-event-configuration).
3. [Set up and distribute a media player](#set-up-a-media-player).
4. [Broadcast the live event](#broadcast-a-live-event).
5. Optional. [Provide on-demand access to the completed live event](on-demand-content).


## Tutorial  {/*tutorial*/}

## CameraSlicer  {/*cameraslicer*/}

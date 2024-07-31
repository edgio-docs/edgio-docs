---
title: Boundaries
---

**Requires Live Slicer version 16031400 or higher**

Learn how to:

- Set up boundaries
- Handle boundaries during playback

## Set Up Boundaries

Adhere to these rules when setting up a boundary:

- The start and end of a boundary must be defined via the [boundary method](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#boundary) in the Live Slicer API.
- Any type of boundary (e.g., c3, c7, or halftime) may be defined when creating a boundary.
- Boundaries cannot overlap.
  - Make sure to mark the end of the previous boundary before starting a new one.
- A boundary cannot overlap with a pod break.
  - Make sure to mark the end of a pod before starting a boundary.
  - Make sure to mark the end of a boundary before starting a pod.
- A boundary cannot span multiple assets.
  - Make sure to mark the end of a boundary before the end of an asset.

## Playback

The boundary type dynamically defines a segment within a live stream into which ads or slate may be inserted. The manner in which this segment is handled by a media player varies according to whether the viewer is playing back a live stream or on-demand content.

For example, a c3 boundary may be used to identify an ad break within a live stream. Live stream playback and the asset created from this live event will include the commercials in that ad break. However, on-demand playback may either include the ads from the original airing, replace them with new ads, or skip them.

### Live Streaming

The manner in which a boundary is handled when viewing a live stream is determined through the `boundary.<boundary_name>` parameter (e.g., `boundary.c3`). Valid values for this parameter are described below.

### Boundary Modes

| Value    | Description|
|-------|----|
| ignore_as_content| Default. This mode plays the content within the boundary and treats it as standard content.|
| ignore_as_ad     | This mode plays the content within the boundary and treats it as an ad.|
| replace_as_ad    | If the ad parameter (e.g., `&ad=myadcampaign`) is present in the playback request, then this mode replaces the content within the boundary with dynamic ad(s). If there is insufficient ad content, then the stream will play ad slate until the end of the boundary. |
| replace_as_ad_return_early | If the ad parameter (e.g., `&ad=myadcampaign`) is present in the playback request, then this mode replaces the content within the boundary with dynamic advertisement(s). If there is insufficient ad content, then the stream will switch back to content once all ads have been streamed. |
| skip   | This mode replaces the content within the boundary with slate.|

**Sample URL:**

`https://content.uplynk.com/<asset_id>.m3u8?ad=<ad_config>&boundary.c3=replace_as_ad`

### On-Demand Streaming

All boundaries defined within a live stream will be retained by the asset created from the live stream. The manner in which a boundary is handled when viewing on-demand content containing boundaries is determined through the `boundary.<boundary_name>` parameter (e.g., boundary.c3). Valid values for this parameter are described below.

| Value | Description |
|---|---|
| ignore_as_content | Default. The content within the boundary will be played normally and treated as standard content. |
| ignore_as_ad | The content within the boundary will be played normally and treated as an advertisement. |
| replace_as_ad | The content within the boundary will be replaced by dynamic advertisement(s) provided that the playback request includes the ad parameter (e.g., &ad=myadcampaign). |
| skip | The segment defined by the boundary will be omitted. In other words, the viewing experience will be seamless between the slices that occur right before and after the boundary. |
| skip | This mode replaces the content within the boundary with slate. |

**Sample URL:**

`https://content.uplynk.com/<asset_id>.m3u8?ad=<ad_config>&boundary.c3=skip`

### Use Cases

The use cases described in this section assume:

- A sporting event was streamed as a live event.
- Several boundaries of varying types were added as the live stream was sliced. These boundaries are defined below.

| Start Time - End Time | Boundary Type<br />(Live Slicer API) | Type of Content |
|---|---|---|
| 0:00 - 12:00 | No Boundary | Live sporting event |
| 12:00 - 13:00 | c3 | An ad that is relevant for up to 3 days after the original airing. |
| 13:00 - 25:00 | No Boundary | Live sporting event |
| 25:00 - 27:30 | c7 | An ad that is relevant for up to 7 days after the original airing. |
| 27:30 - 35:00 | No Boundary | Live sporting event |
| 35:00 - 45:00 | halftime | Identifies special content. |
| 45:00 - 52:00 | No Boundary | Live sporting event |
| 52:00 - 53:30 | c7 | An ad that is relevant for up to 7 days after the original airing. |
| 53:30 - 60:00 | No Boundary | Live sporting event |
| 60:00 - 62:00 | c3 | An ad that is relevant for up to 3 days after the original airing. |
| 62:00 - 75:00 | No Boundary | Live sporting event |

### On-Demand Streaming - Ad Replacement (c3)

In this scenario, on-demand playback takes place 5 days after the live stream. The following playback URL will:

- Replace all of the c3 boundaries with dynamic advertisements.
- Allow the playback of the original c7 boundaries as advertisements.
- Skip the halftime boundary.

**Sample URL:**

`https://content.uplynk.com/<asset_id>.m3u8?boundary.c3=replace_as_ad&boundary.c7=ignore_as_ad&boundary.halftime=skip`

| Start Time - End Time | Boundary Type<br />(Live Slicer API) | Playback |
|---|---|---|
| 0:00 - 12:00 | No Boundary | Original sporting event |
| 12:00 - 13:00 | c3 | Dynamic advertisement (length may vary) |
| 13:00 - 25:00 | No Boundary | Original sporting event |
| 25:00 - 27:30 | c7 | Original advertisement |
| 27:30 - 42:00 | No Boundary | Original sporting event;<br />The content defined by the halftime boundary was skipped. |
| 42:00 - 43:30 | c7 | Original advertisement |
| 43:30 - 50:00 | No Boundary | Original sporting event |
| 50:00 - 52:00 | c3 | Dynamic advertisement (length may vary) |
| 52:00 - 65:00 | No Boundary | Original sporting event |

### On-Demand Streaming - Ad Replacement (c7)

In this scenario, on-demand playback takes place 8 days after the live stream. The following playback URLs will:

- Skip all of the c3 boundaries.
- Replace the c7 boundaries with dynamic ads.
- Include the content defined in the halftime boundary and treat it as standard content.

**Sample URL:**

`https://content.uplynk.com/<asset_id>.m3u8?boundary.c3=skip&boundary.c7=replace_as_ad&boundary.halftime=ignore_as_content`

The following playback URL is also valid since ignore_as_content is set by default.

**Sample URL:**

`https://content.uplynk.com/<asset_id>.m3u8?boundary.c3=skip&boundary.c7=replace_as_ad`

| Start Time - End Time | Boundary Name<br />(Given to the slice API) | Playback During On-Demand Streaming |
|---|---|---|
| 0:00 - 24:00 | No Boundary | Original sporting event;<br />The content defined by the c3 boundary was skipped. |
| 24:00 - 26:30 | c7 | Dynamic advertisement (length may vary) |
| 26:30 - 34:00 | No Boundary | Original sporting event |
| 34:00 - 44:00 | halftime | Original special content |
| 44:00 - 51:00 | No Boundary | Original sporting event |
| 51:00 - 52:30 | c7 | Dynamic advertisement (length may vary) |
| 52:30 - 72:00 | No Boundary | Original sporting event;<br />The content defined by the c3 boundary was skipped. |

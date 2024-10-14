---
title: Clipping
---

The Clipping tool creates an excerpt from a live channel or Video on Demand (VOD) content. The asset created from this clipping process is known as a clip. A clip may be played back as VOD content.

## Quick Start  {/*quick-start*/}

Create a clip by performing the following steps:

1. From the CMS, select the desired live channel or VOD content.
2. Click **Create Clip**.
3. From the **Title** option, define the clip's title.
4. Define the video segment that will be clipped by setting [start and stop markers](#start-stop-markers).
5. (Optional) Preview the video clip by clicking **Preview**.
6. Click **Create clip**.

<Tip>Optimize clip creation performance by turning off all effects on the **Effects** tab. If the source asset is Studio DRM-protected, you must also disable the Studio DRM option from the **Details** tab.</Tip>

## Profiles  {/*profiles*/}

Profiles allow you to define a default configuration for each type of clip. Apply this default configuration to a clip by selecting the desired profile from the Clipping tool.

The settings that may be defined through profiles are listed below:

- **Metadata:** Define a default set of [metadata keys](#metadata). Additionally, determine whether an external ID may be assigned to new clips through the **Show External ID** option in the Clipping Tool.
- **Third-Party Integrations:** Automatically [publish new clips to a third-party platform](#third-party-platform-integration).
- **Overlays:** Define the set of [image overlays](#image-overlays) that will be available for selection and apply a default one to new clips.
- **Default Intro/Outro Bumpers:** Define a default [intro and/or outro bumper](#intro-outro-bumpers).
- **Signed Playback URLs:** Determine whether a token will be required by default for new clips through the **Require a token for playback on all new clips** option.

### Set Up a Profile  {/*set-up-a-profile*/}

1. Navigate to the [Clipping page](https://cms.uplynk.com/static/cms2/index.html#/settings/clipping). From the main menu, navigate to **Settings** > **Clipping**.
2. Click **+ Profile**.
3. (Optional) If a profile has been previously created, you may copy it by:
   - Clicking the **Duplicate** tab.
   - Selecting the desired profile from the **Clipping Profile to duplicate** option.
4. In the **Clipping Profile Name** option, assign a name to the clipping profile that will be created.
5. Click **Create**.
6. Define the desired default settings.
7. Click **Save**.

## Start/Stop Markers  {/*start-stop-markers*/}

You can define the exact segment of the live channel or VOD content that will be clipped through start and stop markers. Start and stop markers may be defined by selecting a playhead, frame, or an exact time.

### Playhead  {/*playhead*/}

<Info>A playhead's position is defined by time and it is indicated between the video preview and the timeline.</Info>

A playhead is a vertical line on the timeline that identifies a specific position in the video. A playhead may be used to define a clip's start/stop position. If the live channel or on-demand content is currently being played back from within the Clipping tool, then the playhead is constantly being updated to reflect the current position in the video being played back.

Set a clip's start/stop position by playhead by clicking **Set Start** or **Set Stop**. The start or stop marker will then be set to the time associated with the playhead at that moment in time.

### Frame  {/*frame*/}

Live channel or VOD content consists of a set of sequential video frames. The number of video frames within a specific second is known as the frame rate (frames per second). A clip's start/stop position may be set to a specific frame.

Select a frame by setting the By Time option to the exact second where the frame may be found, clicking **Select Frame**, and then selecting the desired frame from the available set of frames for the given time.

### Exact Time  {/*exact-time*/}

The valid range for video frames will vary according to the source video's frame rate (frames per second). Standard frame rates are 24, 30, and 60 fps. The valid range for these frame rates is 0-23, 0-29, and 0-59, respectively.

A clip's start/stop position may be defined or fine-tuned by setting the By Time option to the exact desired time/frame.

**Syntax**: `hh:mm:ss;vf`

**Example**: This value represents the second frame at the thirty minute and 20 second mark: `00:30:20;01`

## Poster Image  {/*poster-image*/}

A poster image is the image that is displayed by the media player until the video is started. By default, a clip's poster image is set to a frame at its halfway point.

A clip's poster image may be set through the **Set Poster Image** option. Set it to an image within the clip by selecting a playhead, frame, or an exact time. Alternatively, upload a custom image by clicking **Upload Image** from the **Set Poster Image** option. Finally, you may revert back to the default poster image by selecting "Use Default."

Once a poster image has been defined, a thumbnail preview will be displayed directly above the **Set Poster Image** option. Enlarge this preview by clicking on it. Alternatively, download it by clicking the download icon that appears directly to the right of the **Set Poster Image** option.

## Effects  {/*effects*/}

Various optional effects may be applied to a clipped video segment. The order in which these effects may be applied is outlined below.

| Event | Applicable Effect(s) |
|---|---|
| Start of Playback | Intro Bumper |
| Start of Clipped Video | 1. Image Overlay<br />2. Fade In |
| Near the End of Clipped Video | Fade Out |
| End of Clipped Video | Outro Bumper |

### Intro/Outro Bumpers  {/*intro-outro-bumpers*/}

<Info>The length of a video bumper is restricted to 59 seconds or less. Longer VOD content will be unavailable for selection.</Info>

A video bumper typically consists of a brief announcement, logo, or a branded message that may be inserted before and/or after a clip. Bumpers inserted before a clip are known as intro bumpers, while those appended to a clip are known as outro bumpers.

Define a clip's intro/outro bumper by navigating to the **Effects** tab, marking either the **Intro bumper** or the **Outro bumper** option, and then selecting the desired clip.

### Image Overlays  {/*image-overlays*/}

An overlay allows the display of a static image on top of a clip. The most common usage for an image overlay is to brand a video by displaying a logo.

An image must be uploaded as an overlay before it can be applied to a clip. Please note the following items before uploading an overlay:

- An image overlay must use the PNG file format.
- It is strongly recommended to use a transparent background.
- It is strongly recommended to use an image whose resolution (e.g., 1920x1080) matches the clip's resolution. This best practice avoids the distortion or degradation of an image overlay when it is applied to a clip. It also makes it easier to position the relevant portion of the image overlay.
- If the image's resolution matches the target clip's resolution, then positioning the relevant portion of the image overlay (e.g., logo) is easy. Simply place the relevant portion of the image (e.g., logo) in the desired relative position (e.g., lower right-hand corner). The system will proportionally scale the image to match the video's resolution when the image overlay is applied to it. This allows the desired content to maintain the same relative position when it is applied to the video clip.
- Multiple image overlays may be uploaded. Support for multiple image overlays allows them to be tailored to meet varying resolution or branding requirements.

#### Upload an Image from the CMS  {/*upload-an-image-from-the-cms*/}

1. Navigate to the [Clipping page](https://cms.uplynk.com/static/cms2/index.html#/settings/clipping). From the main menu, navigate to **Settings** > **Clipping**.
2. Select the desired profile or create a new one.
3. Click the **Overlays** tab.
4. Click **+ Overlay**.
5. From the **Overlay name** option, assign a descriptive name to the image overlay.
6. Click **Browse...** to locate and select the desired image (PNG).
7. Click **Upload**.
8. Click **Save**. The newly uploaded image will now be available for selection during clip creation.

#### Apply an Image Overlay to a Clip  {/*apply-an-image-overlay-to-a-clip*/}

1. From the **Profile** option, select a profile that contains the desired image overlay.
2. Click the **Effects** tab.
3. From the **Overlay** option, select the desired image overlay.
4. Check how the image overlay will be positioned on the clip by clicking on the thumbnail preview displayed directly below the **Overlay** option.

### Fade In/Out

A fade in/out effect may be applied to a clip. This effect gradually transitions from a black background to the clip or vice-versa. Define the duration, in seconds, of the fade effect from the **Fade In** or the **Fade Out** options on the **Effects** tab.

## Metadata  {/*metadata*/}

Metadata allows supplemental data to be associated with a clip. This metadata may then be forwarded to your web site or custom player via the [AssetInfo API](https://docs.edgecast.com/video/Content/Develop/AssetInfo.htm).

<Info>The External ID metadata key cannot be hidden when a third-party platform integration configuration maps to it.</Info>

By default, a new clip may be assigned an external ID through the External ID metadata key. This external ID may be leveraged when [generating a friendly playback URL](/uplynk/deliver/playback_urls/#assets) for the clip in question. Hide this external ID metadata key by clearing the **Show External ID option in the Clipping Tool** option from the desired profile.

Additional metadata may be associated with a clip by defining custom keys. A custom metadata key may be one of the following types:

- **Text Field:** By default, all metadata keys are text fields. This type of field allows metadata to be stored as a single line of text. Additionally, a default value for this metadata key may be applied to all new clips through the **Default Key Value** option.

- **Dropdown:** A predefined list of values may be associated with a metadata key. This is known as a dropdown field.

    - Add values to a dropdown field:
        1. Click **+ Key Value**.
        2. Set the **Key Value** option to the value that may be passed via the [AssetInfo API](https://docs.edgecast.com/video/Content/Develop/AssetInfo.htm).
        3. Set the **Display Name (optional)** option to a user-friendly name.
        4. Click **Add**.

    - Reorder the values associated with a dropdown field by dragging and dropping a value to the desired position.

    - A dropdown field's default value varies according to whether the **Include a 'No Value'** option is marked:

        - **Marked:** By default, a value for this metadata key will not be assigned to this field. This means that a new clip will display "----No Value----" for this key.

        - **Cleared:** By default, all new clips will be assigned the first value listed under the **Key Values & Order** section for this key.

- Allow users to set this key to a custom value by marking the **Include a free form option**. This option will add the "(Other)" value to the dropdown field. Upon selecting this value, a text field will appear directly below the dropdown field. A user may then type the desired custom value in this text field.

- A value cannot be directly modified. However, it can be deleted and a new one may be added in its place. Delete a value by clicking the corresponding **Delete** label.

### Add a Custom Metadata Key to a Profile  {/*add-a-custom-metadata-key-to-a-profile*/}

1. Navigate to the [Clipping page](https://cms.uplynk.com/static/cms2/index.html#/settings/clipping). From the main menu, navigate to **Settings > Clipping**.
2. Select the desired profile or create a new one.
3. Click **+ Metadata key**.
4. From the **Key name** option, define the name by which this metadata key will be identified.
5. Click **Add**. The new key will appear in the **Metadata** section.
6. (Optional) Customize the metadata key by clicking on it and then applying the desired changes. For example, set a default value or define a set of values that may be assigned to this key.
7. Click **Save** to save your changes.

Metadata key values may be defined during the clip creation process from the **Details** tab within the Clipping tool.

## Clip Live Channels or In-Progress Assets  {/*clip-live-channels-or-in-progress-assets*/}

You may use the Clipping tool to clip from a live channel or from an asset that is still being sliced. However, the Clipping tool will only contain the video that was already sliced at the time that the tool was launched. Update the Clipping tool to contain the video that has been sliced since it was opened by clicking **Refresh Video**. This action refreshes the video from within the Clipping tool without losing marker data, metadata, effects, etc.

## Drafts  {/*drafts*/}

Drafts allow you to automate the identification of video segments that should be converted to video clips. After which, use the Clipping tool to adjust the start/stop markers, apply the desired settings and/or effects, and then generate the video clip.

**Sample Scenario**

You have a recurring news show that contains a 3 minute weather segment that starts approximately 42 minutes into the show. The weather segment's consistent schedule and duration allows us to leverage our API to automatically generate a video clip draft for the weather segment from each news show. Automatically marking start and stop times reduces the time and effort required to generate a video clip by making it easier to identify where a video clip should start and stop.

**Key information**:

Use the [Clip Draft API](https://docs.edgecast.com/video/Content/Develop/Clip-Draft-v4.htm) to generate a draft of a video clip from an asset in your library. A draft may define a title and the clip's start/stop time.
View an asset's video clip draft(s) from the **Drafts** tab of the Clipping tool.

<Info>The **Drafts** tab is only present when the current asset contains one or more draft(s).</Info>

Use the Clipping tool to generate a video clip from a draft.

<Info>Upon creating a video clip from a draft, the draft will be removed from the **Drafts** tab. If no drafts remain, then the **Drafts** tab will be hidden.</Info>

### Generate a Video Clip from a Draft  {/*generate-a-video-clip-from-a-draft*/}

1. Navigate to the [Clipping page](https://cms.uplynk.com/static/cms2/index.html#/settings/clipping). From the main menu, navigate to **Settings > Clipping**.
2. Find and select an asset for which one or more drafts have been generated via the Clip Draft API.
3. Click **Create Clip**.
4. Click the **Drafts** tab.
5. Click the desired video clip draft. The Clipping tool will be updated with the draft's start/stop marker and title.
6. Make the desired updates (e.g., fine-tune the start/stop markers).
7. Click **Create clip** to generate a video clip.

<Tip>The draft selected in step 5 will be removed from the **Drafts** tab.</Tip>

## Keyboard Shortcuts  {/*keyboard-shortcuts*/}

Keyboard shortcuts are provided to facilitate setting start and stop markers. These shortcuts keys, which are listed below, are only available when the timeline has the focus.

| Action                     | Key          | More Information|
|---|:---:|---|
| **Play/Pause**             | SPACE        ||
| **Pause**                  | k            ||
| **Jump Back**              | j            | Jumps back up to 8 seconds to the start of a previous slice.|
| **Jump Forward**           | l            | Jumps forward 4 seconds.              |
| **Jump to Start Marker**   | UP ARROW     | Jumps to 3 seconds prior to the time defined in the start marker.|
| **Jump to Stop Marker**    | DOWN ARROW   | Jumps to 3 seconds prior to the time defined in the stop marker. |
| **Set Start Marker**       | i            | Sets the start marker to the time associated with the playhead at that moment in time.|
| **Set Stop Marker**        | o            | Sets the stop marker to the time associated with the playhead at that moment in time. |
| **Refine Start Time Marker** | LEFT ARROW  | Allows the clip's start position to be set to a specific video frame. This shortcut is the equivalent of clicking the start marker's Select Frame. <br /> <br /> The following keyboard shortcuts are available when selecting a frame:<ul><li>**LEFT ARROW**: Navigates to the previous video frame. </li><li>**RIGHT ARROW**: Navigates to the next video frame.</li><li>**ENTER**: Sets the current video frame as the clip's stop position.</li><li>**ESC**: Closes the Refine Stop Time dialog box without making any changes. </li></ul> |
| **Refine Stop Time Marker** | RIGHT ARROW | Allows the clip's stop position to be set to a specific video frame. This shortcut is the equivalent of clicking the stop marker's Select Frame. <br /> <br /> The following keyboard shortcuts are available when selecting a frame:<ul><li>**LEFT ARROW**: Navigates to the previous video frame. </li><li>**RIGHT ARROW**: Navigates to the next video frame.</li><li>**ENTER**: Sets the current video frame as the clip's stop position.</li><li>**ESC**: Closes the Refine Stop Time dialog box without making any changes. </li></ul>|
| **Zoom In (Timeline)**     | + or =       | Zooms in to the timeline in 10% increments. This will cause the visible area of the timeline to display a shorter time range. <br /> Use the scroll bar directly below the timeline to scroll to the beginning or the end of the video.                      |
| **Zoom Out (Timeline)**    | -            | Zooms out of the timeline in 10% increments. This will cause the visible area of the timeline to display a longer time range.           |

## Clip Playback  {/*clip-playback*/}

By default, creating a clip will add it to the library as VOD content. Similar to all other VOD content, this new VOD asset may be:

- Played back using a [custom player](/uplynk/deliver/media_player).
- Leveraged as [replacement content](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#replacecontent).
- Scheduled in a linear channel.
- Prepended/appended to another video clip as an intro/outro bumper.

**Key Information**

- **Full resolution Mp4 option:** Found on the **Export** tab, this option controls whether a clipped video will be added as an MP4 file in the library.
- **Token option:** Found on the **Details** tab, this option determines whether playback will require a signed playback URL.
- **Studio DRM option:** Found on the **Details** tab, this option determines whether a clip created from a Studio DRM-protected asset will require a Studio DRM license or cleartext key.
- **Ad Breaks option:** Found on the **Details** tab, this option determines whether ad breaks that were inserted into the source asset during the time period identified by the clip's start and stop markers will be included in the clip.

## Third-Party Platform Integration  {/*third-party-platform-integration*/}

<Info>Publishing to a third-party platform requires that integration settings be defined prior to clip creation.</Info>

The Clipping tool supports the capability to automatically publish a clip to a third-party platform (e.g., Kaltura or Lakana). Upon creating a clip, it will be pushed to the third-party portal. This capability allows fast and easy integration with a custom video player.

<Info>Studio DRM protection may be applied when creating a clip from a Studio DRM-protected asset. Publishing to a third-party platform is disabled when Studio DRM protection is enabled. Disable the **Studio DRM** option from the **Details** tab before attempting to publish to a third-party platform.</Info>

### Setup  {/*setup*/}

Integration with a third-party platform consists of defining authentication information and then mapping key data to third-party platform fields. Once integration settings have been defined, new clips will automatically be published to the third-party platform.

1. Navigate to the [Clipping page](https://cms.uplynk.com/static/cms2/index.html#/settings/clipping). From the main menu, navigate to **Settings > Clipping**.
2. Select the desired profile or [create a new one](#set-up-a-profile).
3. Click the **Integrations** tab.
4. Click **+ Integration**.
5. From the **Integrations** section, mark the desired third-party platform and then click **Add**.
6. Under **Integrations**, click on the desired third-party platform to expand that section.
7. Under the **Credentials** section, provide the credentials required to authenticate to the third-party platform.
8. From the **Metadata Mapping** section, map third-party platform fields to metadata keys.
9. Click **Save** to save your changes.

#### Authentication  {/*authentication*/}

The capability to upload content to a third-party platform requires authorization. Typically, this involves defining a user name, password, and a key through which content will be uploaded to the third-party platform.

#### Metadata Mapping  {/*metadata-mapping*/}

Clip-specific information may be leveraged when publishing content to a third-party platform. This capability facilitates content management and automated workflow by leveraging relevant information when defining critical properties for newly published content.

A prerequisite for metadata mapping is the [creation of custom metadata keys](#metadata). After which, metadata keys should be assigned to third-party platform fields from within your third-party platform integration configuration.

#### Export Restrictions  {/*export-restrictions*/}

Each platform enforces minimum requirements on the videos that may be uploaded to their service. Our service adheres to these platform-specific requirements and enforces the applicable ones when exporting clips to a platform. Please ensure that the requirements listed below are satisfied before exporting a video clip to the platform in question.

| Platform   | Restriction|
|------------|----|
| Twitter | <ul><li><strong>File Size:</strong> A clip's file size cannot exceed 15 MB.</li> <li>The following factors affect a clip's file size:</li> <ul><li>Source video's resolution</li><li>Source video's dimensions</li><li>Clip's duration</li></ul> <li><strong>Duration:</strong> A clip's duration must fall between 0.5 and 30 seconds.</li> <li><strong>Dimensions:</strong> A clip's dimensions, as determined by the source video, must fall within the following range: 32 x 32 and 1280 x 1024.</li> <li><strong>Aspect Ratio:</strong> A clip's aspect ratio, as determined by the source video, must fall within the following range: 1:3 and 3:1.</li> <li><strong>Frame Rate:</strong> A clip's frame rate, as determined by the source video, should be 40 FPS or less.</li> <li><strong>Audio:</strong> A clip's audio, as determined by the source video, should either be mono or stereo.</li></ul> |
| Facebook | <ul><li>The maximum transfer rate at which clips are uploaded is 1 GB per 20 minutes.</li></ul>|

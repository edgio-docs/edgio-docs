---
title: Captions and Subtitles
---

Implement captions and subtitles by including:

- [**CEA-608/708**](#embedded-608)
  - By default, CEA-608 data is preserved. Additionally, you may choose to convert it to WebVTT.
  - A CEA-708 channel includes CEA-608 captions for the purpose of backwards-compatibility.

- [**Embedded Plain Text Captions/Subtitles**](#embedded-plain-text)
  - **VOD Only**
  - Embedded plain text captions or subtitles (e.g., SRT subtitles) will be converted to WebVTT.

- [**Timed Text Markup Language (TTML)**](#ttml)
  - **VOD Only**
  - A sidecar TTML file will be converted to both CEA-608 and WebVTT.
  - Fragmented TTML is supported for DASH VOD.

- [**Scenarist Closed Captions (SCC)**](#scc)
  - **VOD Only**
  - A sidecar SCC file will be converted to CEA-608.

<Tip>CEA-608 only supports a limited number of tracks and has limited support for non-Latin characters, while WebVTT supports additional subtitle/caption tracks and provides full Unicode character support.</Tip>

## Device Support  {/*device-support*/}

Device support for CEA-608 and WebVTT is indicated below.

| OS | CEA-608 | WebVTT |
|---|:---:|:---:|
| iOS version 6 or higher | #* | # |
| Android - our player library | # | # |
| Windows 8 RT - our player library | # |   |
| Our Flash Player<br />Deprecated | # | # |
| Roku |   |   |
| BB10 |   |   |

## Embedded CEA-608/708 Data  {/*embedded-608*/}

CEA-608 data is preserved when embedded within a container format.

**Key Information:**

- CEA-608 tracks may be defined via up to 4 channels (i.e., cc1, cc2, cc3, and cc4). Each channel should be marked as either data or subtitles.
- Automatically convert CEA-608/708 channel to WebVTT via the `render_608` and `render_608_buffer` parameters.

    [Learn more (Live Streaming) configuration](/uplynk/acquire/live/live_slicer_configuration_file_settings).

    [Learn more (VOD) options](/uplynk/acquire/vod/options).

- SDI only: Configure the Live Slicer to look for CEA-608 data in the horizontal ancillary data of an SDI signal via either the `ancillary_lines` or the `ancillary_scan` parameter.

    [Learn more](/uplynk/acquire/live/live/slicer/configuration_file_settings).

- CEA-608 data will be embedded within a H.264/H.265 stream as Supplemental Enhancement Information (SEI) messages within a Network Abstraction Layer (NAL).

## Embedded Plain Text Captions/Subtitles  {/*embedded-plain-text*/}

**VOD Only**

Embedded plain text captions and subtitles (e.g., SRT subtitles) will be converted to WebVTT when a file contains a track marked as subtitle data.

**Key information:**

- Subtitle data may contain unicode characters in UTF-8 format.
- Multiple subtitle tracks may be converted to WebVTT.
- Subtitle data will not be converted to CEA-608.

### Subtitle Language Tracks (DASH VOD)  {/*subtitle-language-tracks*/}

By default, a viewer may select from any of the subtitle language tracks associated with your VOD content. Your asset's language tracks are available even when viewing ad breaks that do not contain those language tracks. This allows the viewer to select a subtitle language track associated with the requested content at any time during the playback session. For example, this behavior allows a viewer to immediately select the desired subtitle language track upon requesting your content, regardless of whether they are viewing a pre-roll ad.

#### Sample Scenarios  {/*sample-scenarios*/}

If the viewer is currently watching your main content, then they will only be able to select from the subtitle language track(s) that have been incorporated into that asset. However, if a viewer is currently watching an ad, then the set of subtitle language tracks that will be available for selection varies according to those present in the asset and the ad that is currently being played back.

The following table shows how the set of language tracks present within an asset and the currently playing ad affects the set of subtitle language tracks that are available for selection.

| Asset's Language Track(s) | Ad's Language Track(s) |   | Available Language Track(s) |
|---|---|---|---|
| English | None | = | English |
| English and Spanish | English | = | English and Spanish |
| English and Spanish | French | = | English, Spanish, and French |
| None | English | = | English |
| None | None | = | None |

Override this behavior by setting one of the following query string parameters within the playback URL:

| Query String Parameters | Description |
|---|---|
| subtitle_placeholders_off | Set this parameter to 1 to only display the available language tracks.<br /><Tip>This parameter overrides the `dash_subtitles_merge` parameter.</Tip> |
| dash_subtitles_merge | Set this parameter to 0 to only display the language tracks that have been embedded within the asset. |

## Enable WebVTT for HLS Live Streams  {/*enable-webvtt*/}

Leverage WebVTT tracks when streaming a live event or live channel via HLS by adding the following query string parameter to the playback URL:

`show_vtt=1`

**Key information:**

- This parameter is only required when streaming a live event or live channel via HLS. Streaming VOD via HLS will display subtitles regardless of whether this parameter is present.
- Playback may falter, halt, or display unexpected results when playback uses a different subtitle track. This may occur when subtitle track order is switched or when content does not have subtitles.
- Ads and system slate do not have subtitle tracks. Therefore, WebVTT should not be enabled if your HLS live stream contains ads or system slate. You should only enable WebVTT when your HLS live stream does not have ads and all slate has been sliced with subtitle tracks.
- Subtitles will not be displayed if a viewer starts playback with content that does not have subtitle tracks and then switches to content that does have subtitle tracks within the same playback session.

## Digital Video Broadcasting (DVB) Teletext for Live Streams  {/*dvb*/}

Add closed captions from one or more DVB teletext pages by converting it to WebVTT. Convert DVB teletext to WebVTT by defining the [`render_teletext` parameter](/uplynk/acquire/live/on_prem_slicer_metrics) in your Live Slicer configuration file.

**Key information:**

- The system will only process the first DVB teletext stream that it encounters.
- Please ensure that your DVB teletext stream assigns a unique name to each language.
- If the teletext stream contains multiple language tracks, use a comma to delimit each desired combination of page number and language.

## Timed Text Markup Language (TTML)  {/*ttml*/}

**VOD Only**

Captions and subtitles within a sidecar TTML file will be converted to both CEA-608 and WebVTT whenever possible.

**Key information:**

- Multiple TTML files can be provided for multiple subtitle tracks. Alternatively, a TTML file may contain a div tag for each desired subtitle track.
- Use the [`ttml` option](/uplynk/acquire/vod/options) to define the location of one or more language-specific sidecar TTML file(s). The Slicer will replace embedded captions or subtitles with the data defined within the TTML file(s).
- TTML files consumed by the Slicer must be in UTF-8 format.
- The Slicer supports a subset of the TTML standard as indicated below.

### TTML Layout and Formatting  {/*ttml-layout-formatting*/}

Please make sure that your TTML files conform to the following layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<tt xml:lang="en" xmlns="http://www.w3.org/2006/04/ttaf1" xmlns:tts="http://www.w3.org/2006/04/ttaf1#styling">
<head>
	<styling>
		<style id="defaultCaption" tts:fontStyle="normal" tts:textAlign="center" />
			...
	</styling>
</head>
<body style="defaultCaption" id="thebody">
	<div xml:lang="en">
		<p begin="00:00:01.420" end="00:00:02.620"><metadata ccrow="14" cccol="3" /><span tts:fontStyle="italic">THIS IS SOME TEXT...</span></p>
		...
	</div>
	...
</body>
</tt>
```


- **Style Attributes**

    The following attributes may be applied to `style` and `p` tags:

    | Attribute | Supported Values |
    |---|---|
    | tts:fontStyle | "normal" and "italic" |
    | tts:textAlign | "left", "right" and "center" |

- **Default Style Attributes**

    The following attribute may be applied to `body`, `div`, and `p` tags:

    | Attribute | Supported Values |
    |---|---|
    | style | ID of a style to use as the default style |
    | tts:textAlign | "left", "right" and "center" |

- **Language Code**

    The following attribute may be applied to `div` tags:

    | Attribute | Supported Values |
    |---|---|
    | xml:lang | The RFC 5646 language code for the track |


- **Timing**

    `p` tags must contain `begin` and `end` attributes to indicate when captions/subtitles should be shown.

    | Attribute | Supported Values |
    |---|---|
    | begin | hh:mm:ss.sss formatted timestamp |
    | end | hh:mm:ss.sss formatted timestamp |

- **Spans**

    `span` tags may be used to set the `tts:fontStyle` attribute for a portion of text within a `p` element.

    **Example:**

    ```xml
    <span tts:fontStyle="italic">THIS IS SOME TEXT...</span>
    ```

- **Positioning**

    `p` tags may contain a metadata child tag to indicate the CEA-608 column and row position.

    | Attribute | Supported Values |
    |---|---|
    | ccrow | 0-based row number. Must be 0-3 or 11-14 |
    | cccol | 0-based column number. Must be 0-31 |

### CEA-608 Conversion  {/*cea-608-conversion*/}

All TTML tracks will be converted WebVTT format, but only one track will be converted to CEA-608. The Slicer will choose the track with the fewest characters that cannot be converted to the CEA-608 default character set.

**Key information:**

- CEA-608 captions are restricted to 32 columns. Any captions that extend past column 31 will not render correctly. The Slicer does not auto-wrap when converting to CEA-608.
- CEA-608 captions are restricted to 15 rows. Any captions that extend past row 15 will not render correctly.
- CEA-608 line numbers are 1-based, while TTML row numbers are 0-based.

    **Example**: TTML row 14 refers to CEA-608 line 15.

### Fragmented TTML for DASH VOD  {/*fragmented-ttml*/}

The Slicer will output a fragmented TTML for DASH VOD for a TTML document or a DVB-TTML stream when the following conditions are met:

- Pass one of the following set of options to the Slicer:

    - **TTML Document:**

        `-ttml {Path} -output_ttml`

    - **DVB-TTML Stream:**

        `render_dvb_ttml {PID 1}:{Language 1},{PID 2}:{Language 2},{PID n}:{Language n}`

- Set `show_dash_subtitles=imsc` within the playback URL's query string.

Sample manifest request:

`https://content.uplynk.com/1234567890abcdefghijklmnopqrstuv.mpd?show_dash_subtitles=imsc`

## Scenarist Closed Captions (SCC)  {/*scc*/}

**VOD Only**

Captions and subtitles within a sidecar SCC file will be converted to CEA-608. It will also be converted to WebVTT when the [`render_608` parameter](/uplynk/acquire/vod/options) is passed. Use the [`scc` parameter](/uplynk/acquire/vod/options) to define the location of a sidecar SCC file. The Slicer will replace embedded captions or subtitles with the data defined within the SCC file.

## WebVTT Codec Initialization for DASH Live Streaming  {/*webvtt*/}

<Tip>The WebVTT codec is automatically initialized for VOD playback of an asset that leverages that codec. This occurs regardless of whether a pre-roll ad contains that codec.</Tip>

The WebVTT codec may not be initialized when the initial request is for a pre-roll ad that does not contain the WebVTT codec. This will prevent the codec from working within that playback session.

Most DASH players initialize the WebVTT codec at the start of playback. This poses a challenge when the initial request is for a pre-roll ad that does not contain the WebVTT codec. If the player does not detect the WebVTT codec at the start of playback, then it may not initialize it regardless of whether the main content uses it.

Ensure that the WebVTT codec is always initialized by playing a short clip that contains it at the start of playback. This clip, which is known as a codec initialization clip, should be nearly undetectable during playback. Add this clip by including one of the following parameters within the playback URL:

| Parameter | Description |
|-----------|-------------|
| `smartcic` | Set this parameter to `1` to only prepend a codec initialization clip to the manifest file when the main content contains WebVTT subtitles. |
| `forcecic` | Set this parameter to `1` to always prepend a codec initialization clip to the manifest file. |

## Tutorial  {/*tutorial*/}

**Goal:** Learn how to add closed captioning support to on-demand content.

**Key Steps:**

1. Create a TTML file.
2. Add style information.
3. Slice the file.

### Step 1 - Create a TTML File  {/*step-1*/}

There are many methods for creating a TTML file. In this example, we'll use an online tool from Microsoft called [HTML5 Video Caption Maker (VCM)](https://testdrive-archive.azurewebsites.net/Graphics/CaptionMaker/Default.html).

Because it is an online tool, VCM has the limitation that your content must be hosted via a web server. VCM prompts you for the URL of your content.

1. Copy and paste the following URL into the text field labeled **"Enter URL of video file:"**:

   `http://ftp.nluug.nl/ftp/graphics/blender/apricot/trailer/sintel_trailer-480p.mp4`

2. Click the **Load** button.

   The trailer is short and only has a few lines of dialog.

3. Begin by clicking **Play**.

4. Once you've heard a line of dialog, press **Pause**.

5. Type the dialog in the textarea below the video (yellow highlight added for emphasis).

6. Click **Save & Continue**. The video will continue playing.

7. Wait for a line of dialog, and again click **Pause**.

8. Type the dialog in the text area below the video.

9. Repeat these steps until you are satisfied with the captions.

10. Next, find the **TTML** radio button and click it. This will display the markup for your TTML file.

11. Copy this text and save it as a local text file on your computer.

   The same TTML used in the example can also be copied below:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <tt xmlns="http://www.w3.org/ns/ttml" xml:lang="en" >
   <body>
       <div>
           <p begin="0.000s" end="14.780s">What brings you to the land of the gatekeepers?</p>
           <p begin="14.780s" end="20.193s">I'm searching for someone.</p>
           <p begin="20.193s" end="39.444s">A dangerous quest for a lone hunter.</p>
           <p begin="39.444s" end="44.371s">I've been alone for as long as I can remember.</p>
       </div>
   </body>
   </tt>
   ```

### Step 2 - Add Style Information  {/*step-2*/}

The default caption styling varies widely by platform. To give your captions uniformity, we will add minimal style information to our TTML document. The document below includes our style additions.

### Step 3 - Slice File with TTML  {/*step-3*/}

We create the VOD asset using the command line slicer. We'll employ the -ttml option to tell the slicer where to locate our TTML caption file. The following is an example slicer command with the option:

```
/path/to/slicer /path/to/video/sintel_trailer-480p.mp4 -u username -apikey APIKey -ttml /path/to/ttml/sintel_trailer-480p.mp4.ttml
```

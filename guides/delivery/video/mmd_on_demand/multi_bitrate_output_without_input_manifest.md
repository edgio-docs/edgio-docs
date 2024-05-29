---
title: Multi-Bitrate without Input Manifest
---
## Required Manifest {/*required-manifest*/}
MMD OD can dynamically generate the manifest required for Multi-Bitrate output so you can save time and effort. Dynamic manifest generation is available for the following input formats:

| Input Type | Output |
| --- | --- |
| MP4, M4A | HDS, HLS, MPEG-DASH, MSS |

## Required Inputs {/*required-inputs*/}
To use this functionality, you must provide a Multi-Bitrate set of media files (one file for each of the desired output bitrates) that meet these encoding requirements:

- Encoded with H.264 video and AAC audio, or encoded with H.265 when delivered via MPEG-DASH.
- Identical frame rates across all bitrates
- Identical keyframe intervals



<Callout type="info">- Input media containing chapter markers or the CHAP atom are not compatible with MMD OD and will cause undesired behavior in output manifests. You will either need to re-encode the source media to exclude chapter markers or manually exclude them from your media prior to processing via MMD OD.<br />- Edgio's H.265 supports avc1, hvc1, and dvh1<br />- MMD OD defines a fragment duration and scale, which allow multiple frame rates for content in a manifest as long as all keyframe intervals are multipliers of the fragment duration.</Callout>

## Playback URL Format {/*playback-url-format*/}
To construct a playback URL for media uploaded without a manifest, take the URL provided in your activation (welcome) letter and append a string with media filenames.

Using the appropriate manifest filename for the desired output format and substituting the filenames of your input media for `<media_filename_#>`, the string takes this form:

`/stream.ismd/<manifest_filename>?stream=<media_filename_1>;<media_filename_2>;<media_filename_3>`

Dynamically generated URLs can be any length, so there is no restriction on the number of files you append together.

<Callout type="info">Although there is no restriction on the number of files, playback URL paths can contain a maximum of 2048 characters.</Callout>

For example, given the following set of input files:

- `Movie_high.mp4`
- `Movie_medium.mp4`
- `Movie_low.mp4`

The following request URLs will generate Multi-Bitrate output with `Movie_medium.mp4` as the initial quality on playback:

| Output Format | Append to Provided URL |
| --- | --- |
|   HDS  | /stream.ismd/manifest.f4m?stream=Movie\_medium;Movie\_high;Movie\_low |
|  HLS   | /stream.ismd/manifest.m3u8?stream=Movie\_medium;Movie\_high;Movie\_low |
| DASH | /stream.ismd/manifest.mpd?stream=Movie\_medium;Movie\_high;Movie\_low |
|  MSS  | /stream.ismd/manifest?stream=Movie\_medium;Movie\_high;Movie\_low |

## Single-Bitrate Output  {/*single-bitrate-output*/}
MMD OD can dynamically generate a single-bitrate output using a single-bitrate mp4 file.

The following request URLs will generate single-bitrate output with Movie.mp4 as the source file:

| Output Format | Append to Provided URL |
| --- | --- |
| HDS | /stream.ismd/manifest.f4m?stream=Movie |
| HLS | /stream.ismd/manifest.m3u8?stream=Movie |
| DASH | /stream.ismd/manifest.mpd?stream=Movie |
| MSS | /stream.ismd/manifest?stream=Movie |

<Callout type="info">The following legacy URL structure is now deprecated. Functionality for this URL structure is not guaranteed and may be eliminated in the future without notice: <br /> `http://icsserver.net/path/to/video.mp4/manifest.m3u8`</Callout>

## Subtitles   {/*subtitles*/}
MMD OD supports WebVTT subtitle output for HLS and MPEG-DASH formats. WebVTT subtitles are configured dynamically via query parameters or custom HTTP headers.

**X-LLNW-Dynamic-VTT Header**

When MMD OD detects this header on request, it will attempt to retrieve the VTT from the specified location and add the relevant information to the client manifest it is generating. It is only necessary to include the header on the request for client manifests, but it will not cause any impact if it is present on chunked content requests.

The header values are comma-delimited, with each value being made up of multiple key/value pairs - separated by a semicolon (;). For example:
```
X-LLNW-Dynamic-VTT: name=English;lang=en;uri=subtitles/eng.vtt,
name=French;lang=fr;uri=subtitiles/fra.vtt,
name=French (Parisian);lang=fra;uri=subtitles/par.vtt
```

**Full Key List**
| Key | Description |
|---|---|
| name | A human-readable name for the subtitle track. |
| lang | Shorthand language code as defined by [RFC 5646](https://tools.ietf.org/html/rfc5646). Typically 2-3 characters. |
| uri | Location of the subtitle file, including extension (typically `.vtt` or `.webvtt`). Location is relative to the manifest. |

All keys are required.

### Query Parameter Options

**Definition**

For customers who cannot work with the HTTP Header method, MMD OD provides the option to set `dynamic vtt` via query parameters. The `dynamic_vtt` query parameter is a comma-delimited tuple, strictly ordered: name,lang,uri. Multiple tuple sets are delimited by a semicolon (;).

**Example**

The previous example for the main HTTP Header method is represented in query parameter methodology as such:

`?dynamic_vtt=english,en,subtitles/eng.vtt;french,fra,subtitles/fra.vtt`

### Directory Structure

The subtitle directory structure has these requirements and limitations:

- The subtitle file may be located in the same folder structure as the media file for which the subtitles are added.
- The subtitle file may be nested in any number of folders reachable from the folder where the media file is being located.
- Directory names may not contain a period or decimal character.

**Subtitle Order in Header or Query Parameter**

The order of the subtitles in the HTTP Header or query parameter must match the order of the subtitles in the client manifest.

### HLS Output

`Main Manifest`

For each subtitle file specified in the input, MMD OD adds an entry in the manifest parallel to this example:

```
# variants
#EXT-X-STREAM-INF:BANDWIDTH=1090000,CODECS="mp4a.40.2,avc1.64001F",
  RESOLUTION=1280x720,AUDIO="audio-128",SUBTITLES="subs"
stream-audio=128014-video=900000.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2256000,CODECS="mp4a.40.2,avc1.640028",
  RESOLUTION=1920x1080,AUDIO="audio-128",SUBTITLES="subs"
stream-audio=128014-video=2000000.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=666000,CODECS="mp4a.40.2,avc1.64001E",
  RESOLUTION=853x480,AUDIO="audio-128",SUBTITLES="subs"
stream-audio=128014-video=500000.m3u8
```
For requests using the query parameter functionality, the query parameters will be appended on each rendition. These query parameters must be included on all requests for client manifests or VTT content:



```
# variants
#EXT-X-STREAM-INF:BANDWIDTH=1090000,CODECS="mp4a.40.2,avc1.64001F",
  RESOLUTION=1280x720,AUDIO="audio-128",SUBTITLES="subs"
stream-audio=128014-video=900000.m3u8?dynamic_vtt=english,en,subtitles/eng.vtt;
  french,fra,subtitles/fra.vtt
#EXT-X-STREAM-INF:BANDWIDTH=2256000,CODECS="mp4a.40.2,avc1.640028",
  RESOLUTION=1920x1080,AUDIO="audio-128",SUBTITLES="subs"
stream-audio=128014-video=2000000.m3u8?dynamic_vtt=english,en,subtitles/eng.vtt;
  french,fra,subtitles/fra.vtt
#EXT-X-STREAM-INF:BANDWIDTH=666000,CODECS="mp4a.40.2,avc1.64001E",
  RESOLUTION=853x480,AUDIO="audio-128",SUBTITLES="subs"
stream-audio=128014-video=500000.m3u8?dynamic_vtt=english,en,subtitles/eng.vtt;
  french,fra,subtitles/fra.vtt
```

**Subtitle Manifest**

The subtitle manifest specifies a single VTT output file:
```
#EXTM3U
#EXT-X-TARGETDURATION:600
#EXT-X-VERSION:7
#EXTINF:600, no desc
eng.vtt
#EXT-X-ENDLIST
```

### MPD Output

**Subtitle Manifest**

For each subtitle file specified in the input, MMD OD adds an AdaptationSet:

```
<AdaptationSet group="3" mimeType="text/vtt" lang="en">
  <Representation id="English">
    <BaseURL>subtitles/eng.vtt</BaseURL>
  </Representation>
</AdaptationSet>
<AdaptationSet group="4" mimeType="text/vtt" lang="fr">
  <Representation id="French">
    <BaseURL>subtitles/fra.vtt</BaseURL>
  </Representation>
</AdaptationSet>
```

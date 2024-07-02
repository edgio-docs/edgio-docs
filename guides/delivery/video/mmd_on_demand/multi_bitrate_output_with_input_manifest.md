---
title: Multi-Bitrate Output with Input Manifest

---
## Multi-Bitrate Outputs  {/*multi-outputs*/}
When you upload media files with a corresponding manifest, MMD OD can generate Multi-Bitrate output, as shown below:

| Input Type | Manifest | Output |
| --- | --- | --- |
| ISMV | ISM | 	HDS, HLS, MPEG-DASH, MSS |
| TS  | M3U8 |  HLS   |
| MP4, M4A | SMIL | 	HDS, HLS, MPEG-DASH, MSS |

<Callout type="info">The use case of a server manifest with no audio rendition does not work with MSS or MPEG-DASH output.</Callout>

## Required Inputs {/*required-inputs*/}
To use this functionality, you must provide a Multi-Bitrate set of media files (one file for each of the desired output bitrates) that meet these encoding requirements:

- Encoded with H.264 video and AAC audio, or encoded with H.265 when delivered via MPEG-DASH.
    <Callout type="info">Edgio's H.265 supports avc1, hvc1, and dvh1</Callout>
- Identical frame rates across all bitrates
- Identical keyframe intervals

<Callout type="info">MMD OD defines a fragment duration and scale, which allow multiple frame rates for content in a manifest as long as all keyframe intervals are multipliers of the fragment duration.</Callout>

Also, you must provide a corresponding manifest file of the appropriate format. For more information about the SMIL manifest format, see [Synchronized Multimedia Integration Language Server Manifest Format](#synchronized).

## Single Bitrate Output  {/*single-bitrate-output*/}
MMD OD can generate single Bitrate output for the following input formats:

| Input Type | Manifest | Single Output |
| --- | --- | --- |
| ISMV | ISM | HDS, HLS, MPEG-DASH, MSS|
| MP4, M4A | SMIL | HDS, HLS, MPEG-DASH, MSS |

## Playback URL Format {/*playback-url-format*/}
To construct a playback URL for media uploaded with a manifest, append the appropriate manifest filename (corresponding to the desired output format) to the URL provided in your activation (welcome) letter:

| Output Format | Manifest Filename: Append to the provided URL |
| --- | --- |
|  HDS   | /manifest.f4m |
|  HLS   | /manifest.m3u8 |
| MPEG-DASH	    | /manifest.mpd |
|   MSS  | /Manifest or /manifest |

<Callout type="info">Playback URL paths can contain a maximum of 2048 characters.</Callout>

## Synchronized Multimedia Integration Language Server Manifest Format  {/*synchronized*/}
Support for Synchronized Multimedia Integration Language (SMIL) as a server manifest format for MMD OD is available. While SMIL manifests can vary widely in complexity, MMD OD only cares about a small subsection of the possible SMIL XML structure. At a minimum, the SMIL manifest will have:

| XML | Description |
| --- | --- |
| \<smil> | The main SMIL element, everything is contained within. No attributes are required for the SMIL element. |
| \<body> | A single body element that will hold the switch element. No attributes are required. |
| \<switch> | The switch element will contain one or more BasicMedia children. |

### Media Types and Attributes In SMIL Manifests {/*media-types*/}
Media Types and Attributes In SMIL Manifests
There are two media types supported by MMD OD: video and audio. These types can be combined in SMIL server manifests in three ways:

| Media Type | Description |
| --- | --- |
| video and audio | A complete configuration of the SMIL server manifest must have at least one video rendition and at least one audio rendition. With this configuration, MMD OD generates client manifests with all video renditions and an audio-only rendition.|
| video | If the SMIL server manifest does not contain an audio-only rendition, MMD OD uses one of the listed video renditions as the audio source. Because of this, all video renditions must have the same audio content format (bitrate, sample rate, and so on). Multi-Bitrate audio is not supported in this configuration.|
| audio | When the SMIL server manifest contains only audio renditions, MMD OD generates client manifests with Multi-Bitrate audio-only renditions. Included is the m4a format.|
| **Media Attribute** |     |
| src | The value of the src attribute is the Internationalized Resource Identifier (IRI) of the media element, used for locating and fetching the associated media. |
| system-bitrate or systemBitrate | The average bitrate of the media content in bits per second. The attribute can be named either "system-bitrate" or "systemBitrate" since both are treated in the same way. |

### Referencing Content from within a SMIL Manifest {/*referencing*/}
A SMIL manifest file that contains references to content must reference the content using standard UNIX path notation if the content is not in the same directory as the SMIL manifest file.

If the content is in the same directory as the SMIL manifest file, simply use the content name without UNIX path notation.

**Example 1: Content in Same Directory As Manifest**
*Path Example*

```
/path/to/content/server_mani.smil
/path/to/content/sd.mp4
/path/to/content/hd.mp4
```

*SMIL Example*
The server_mani.smil file references the MP4 files like this:
```
<smil>
  <head></head>
  <body>
    <switch>
      <video src='sd.mp4'/>
      <video src='hd.mp4'/>
    </switch>
  </body>
</smil>
```

**Example 2: Content in Sub Directory of Manifest**
*Path Example*

```
/path/to/content/server_mani.smil
/path/to/content/video/sd.mp4
/path/to/content/video/hd.mp4
```

*SMIL Example*
The server_mani.smil file references the MP4 files like this:

```
<smil>
  <head></head>
  <body>
    <switch>
      <video src='./video/sd.mp4' />
      <video src='./video/hd.mp4'/>
    </switch>
  </body>
</smil>
```
**Example 3: Content outside the Manifest Directory**
*Path Example*

```
/path/to/content/data/manifest/server_mani.smil
/path/to/content/video/sd.mp4
/path/to/content/video/hd.mp4
```

*SMIL Example*
The server_mani.smil file references the MP4 files like this:

```
<smil>
  <head></head>
  <body>
    <switch>
      <video src='../../video/sd.mp4' />
      <video src='../../video/hd.mp4'/>
    </switch>
  </body>
</smil>
```


## Client Manifest Rendition Ordering  {/**/}
In MMD OD v3.6, the new default HLS client manifest is set to Version 7. Version 7 of HLS is incompatible with MMD OD’s standard of maintaining the input server manifest’s rendition ordering. If you wish to maintain your input server manifest rendition ordering, you must use the query parameter: `hls_client_manifest_version=1`.

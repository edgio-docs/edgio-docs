---
title: MMD OD Query Parameters
---
MMD OD includes URL query parameters that you can use to control various aspects of playback, such as playback format. Query parameters must be placed at the end of the URL, such as after the list of input files for a dynamic manifest URL.

<Callout type="info">You can use up to 2048 characters for query parameters.</Callout>

## Server and Client Manifests  {/*server-and-client-manifests*/}

The server manifest, which the MMD OD web server module uses, holds information about the available streams, options, and so forth. The webserver module uses the information in the server manifest file to (1) create the various client manifests and playlists and (2) apply any selected options. The webserver module gives the client manifest to the player for playback.

<Callout type="info">Throughout the remainder of this chapter, the MMD OD web server module will be referred to simply as “the webserver module.”</Callout>

## Timing Parameters  {/*timing-parameters*/}
| Name | Type / Format | Description / Example |
| --- | --- | --- |
| start | Positive integer | Causes the webserver module to begin the client manifests at the given number of seconds from the start of the media. The webserver module will look for the closest segment boundary, so sometimes, the player may start just before the requested time. For a more precise start time, use `fragment_duration` in conjunction with start.<br /><br />Example:<br />`http://mmd-od-server.com/path/to/content/manifest.mpd?start=150`<br /><br />Be sure not to pass a start value that is greater than the actual video duration time. |
| end | Positive integer | Causes the webserver module to end client manifests at the given number of seconds from the start of the media. The webserver module will look for the closest segment boundary, so sometimes, the player may end just after the requested time. For a more precise end time, use `fragment_duration` in conjunction with end.<br /><br />Example:<br />`http://mmd-od-server.com/path/to/content/manifest.mpd?end=450` |
| t   | Delimited list of positive integers | Causes the webserver module to start, and end-client manifests at the given number of seconds from the start of the media. The webserver module will look for the closest segment boundary, so sometimes, the player may start just before or end just after the requested time. For more precise start and end times, use `fragment_duration` in conjunction with t.<br /><br />Example:<br />`http://mmd-od-server.com/path/to/content/manifest.mpd?t=100;450`<br /><br />You can use any non-numeric character for a delimiter, such as a comma or a semicolon. |
| fragment\_duration | Positive integer | When fragment\_duration is provided, it causes the target duration of the generated segments to be as close to the specified `fragment_duration` as possible, depending on the source media's keyframe frequency. Duration is designated in milliseconds and has the minimum and maximum values of:<br /><br />minimum - 2000<br /><br />maximum - 10000<br /><br />Example:<br />`http://mmd-od-server.com/path/to/content/manifest.mpd?fragment_duration=6000` |

### Supported and Unsupported Input Formats for Timing Parameters {/*supported-unsupported-parameters*/}

| Parameters | Supported Input Formats | Unsupported Input Formats |
| --- | --- | --- |
| start, end, t | ism, smil, mp4, ismv | ismd, csmil, ismc, ts<br /><br />Note also that the end parameter is not supported for ism + HDS (Adobe HTTP Dynamic Streaming) |
| fragment\_duration | ismd, csmil | ism, ismc, smil, ts, mp4, ismv |


## Ordering Parameters  {/*ordering-parameters*/}
| Name | Type / Format | Description / Example |
| --- | --- | --- |
| sort\_tracks | String | Causes the order of the renditions in the client manifest to be determined by the value of the query parameter. If you don't provide `sort_tracks` or if the value is invalid, the order of the renditions in the client manifest will be determined by the ordering of the server manifest.<br /><br />`sort_tracks=inc` - Renditions will be ordered from lowest bitrate to highest bitrate<br /><br />`sort_tracks=dec` - Renditions will be ordered from highest bitrate to lowest bitrate<br /><br />Example:<br /><br />`http://mmd-od-server.com/path/to/content/manifest.mpd?`<br />`sort_tracks=inc`  |
| start\_index | Positive integer, zero-based | Causes the rendition at the specified index to be moved to the top of the rendition list. The remaining renditions will be unaffected. If you provide `sort_tracks` in conjunction with `start_index`, the `start_index` priority will be applied after the renditions are ordered. The index is zero-based.<br /><br />Example:<br /><br />`http://mmd-od-server.com/path/to/content/manifest.mpd?`<br />`start_index=3` |

## Filter Parameters  {/*filtering-parameters*/}
| Name | Type / Format | Description / Example |
| --- | --- | --- |
| hls\_no\_audio\_only | boolean | Causes the webserver module to exclude audio-only renditions from an HLS client manifest (m3u8).<br /><br />Example:<br /><br />`http://ics-server.com/path/to/content/manifest.m3u8?`  <br />`hls_no_audio_only=true` |
| max\_bitrate | integer | Causes the webserver module to exclude from the client manifest any rendition with a system bitrate greater than the specified value.<br /><br />Example:<br />`http://ics-server.com/path/to/content/manifest.mpd?`  <br />`max_bitrate=2000000` |
| min\_bitrate | integer | Causes the webserver module to exclude from the client manifest any rendition with a system bitrate less than the specified value.<br /><br />Example:<br /><br />`http://ics-server.com/path/to/content/manifest.mpd?`  <br />`min_bitrate=96000` |
| tracks | comma-delimited strings | Allows the caller to filter the renditions in the client manifest by track name.<br /><br />Causes the webserver module to exclude from the client manifest any track name in the server manifest that does not match one of the supplied values.<br /><br />Example:<br />`http://ics-server.com/path/to/content/manifest.mpd?`  <br />`tracks=video,audio` |
| filter | regular expression (regex) | Determines which tracks in the server manifest file will be added to the client manifest file. When the regex evaluates to true, the track is added to the client manifest file. The appropriate tags must be present in the manifest to filter against a field.<br /><br />**Usage**<br />The filter expression is passed as a query parameter (`?filter=`) and must be properly escaped (preferably using a standard function from your favorite framework).<br /><Callout type="info">When testing the URL with a command-line tool like cURL, you must consider the escaping rules for your command-line.<br /><br />For example, for cURL, the '&' needs to be escaped in the bash shell:<br /><br />`cURL -v 'http://ics-server/a319/test/usp/smil/`  <br />`multi_b.smil/manifest.m3u8?filter=(systemBitrate<1024000%26%26type=="video")'`</Callout><br /><Callout type="info">Simply examining the client manifest file can be misleading; the expression filtered for may be present but absent in the server manifest. For example, this sample adds the `MaxWidth` parameter to a video track in the server manifest:<br /><br />`<video src='mp4:clock-low.mp4'` <br />`systemBitrate='400000'` <br />  `title='360p' width='480' height='360'`><br />  `<param name="MaxWidth" value="480"` <br />`valueType="data" />`<br />`</video>`</Callout><br /><br />See also:<br /><br />[Track Variable Names for the filter Parameter](#track-variables-filter-parameters)<br /><br />[Filter Parameter Samples](#filter-parameter-samples) |

### Track Variable Names for the `filter` Parameter {/*track-variables-filter-parameters*/}
The following variables may be used in the `filter` parameter.

| Variable Name | Type/Description | Example |
| --- | --- | --- |
| AudioTag | number<br /><br />The format tag of the audio | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest?filter=(type==%22audio%22%26%26AudioTag==255)'` |
| avc\_level | number<br /><br />The AVC level | curl `'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?filter=(type=="video"%26%26avc_level>=30)'` |
| avc\_profile | constant<br /><br />The AVC profile: AVC\_PROFILE\_BASELINE,  <br />AVC\_PROFILE\_MAIN,  <br />AVC\_PROFILE\_HIGH | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest?filter=(type==%22video%22%26%26avc_`  <br />`profile==AVC\_PROFILE\_MAIN)'` |
| BitsPerSample | number<br /><br />The resolution of the audio samples | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/ ` <br />`manifest?filter=(type==%22audio%22%26%26BitsPerSample==16)'` |
| channels | number<br /><br />The number of audio channels | `curl 'http://mymmdod.llnds.net/component/ism/`  <br />`m2.ism/manifest.m3u8?filter=`  <br />`(type=="audio"%26%26channels==2)%7C%7C(type=="video")'` |
| DisplayHeight | number<br /><br />The display height (in pixels) | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest?filter=(type==%22video%22%26%26DisplayHeight==360)'` |
| DisplayWidth | number<br /><br />The display width (in pixels) | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?filter=(type=="audio"%7C%7CDisplayWidth>500)'` |
| FourCC | string<br /><br />The FourCC code of the track: AVC1, AACL,  <br />TTML, JPEG, dtse, ac-3, hvc1 | curl `http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />manifest.m3u8?filter=(FourCC=="AVC1")'<br /><br />`curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?filter=(FourCC=="AACL")'` |
| Maxheight | number<br /><br />The coded height (in pixels) | `curl'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?  <br />filter=(type=="video"%26%26Maxheight==480)'` |
| MaxWidth | number<br /><br />The coded width (in pixels) | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?filter=(type=="video"%26%26MaxWidth==480)'` |
| SamplingRate | number<br /><br />Audio sampling rate (in Hz) | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?`  <br />`filter=(type=="audio"%26%26SamplingRate==44100)'` |
| systemBitrate | number<br /><br />System bitrate in Kbps | `curl 'http://mymmdod.llnds.net/usp/smil/multi_b.smil/manifest.m3u8?filter=(systemBitrate<1024000%26%26type=="video")' `|
| systemLanguage | string<br /><br />3-character language code | curl `http://mymmdod.llnds.net/usp/smil/`  <br />`multi_b.smil/manifest.m3u8?filter=(systemBitrate<1024000%26%26systemLanguge=="eng")` |
| TimeScale | number<br /><br />The timescale | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?`  <br />`filter=(TimeScale!=1000)'` |
| trackID | number<br /><br />Track ID | `curl "http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?filter=(trackID==2)"` |
| trackname | string<br /><br />Track name | `curl 'http://mymmdod.llnds.net/component/ism/m2.ism/`  <br />`manifest.m3u8?filter=(trackname=="audio")'` |
| type | string<br /><br />The type of the track:<br /><br />audio, video, textstream, data | `curl 'http://mymmdod.llnds.net/usp/smil/`  <br />`1video_2audio.smil/manifest.m3u8?filter=(type=="video")'`<br /><br />`curl 'http://mymmdod.llnds.net/usp/smil/`  <br />`1video_2audio.smil/`  <br />  |

### `filter` Parameter Samples {/*filter-parameter-samples*/}
The following examples explain which tracks from the server manifest file will be added to the client manifest file.

| Filter Expression | Description |
| --- | --- |
| true | Adds all tracks. |
| type != "video" \| systemBitrate < 400000 | Adds all tracks where the video tracks must be at least 400 Kbps. |
| systemLanguage == "eng" | Adds only audio/video/text tracks with the English language. |
| FourCC != "AVC1" \|  <br />AVC\_PROFILE == AVC\_PROFILE\_BASELINE | Adds all tracks where the video tracks must use the `BASELINE` profile. |
| (FourCC == "AACL" && SamplingRate == 48000) \|  <br />(FourCC == "AVC1" && AVC\_LEVEL >= 31) | Adds all AAC audio tracks with a `SamplingRate` of 48KHz and all AVC video tracks with a minimum of 3.1. |



## Other Parameters  {/*other-parameters*/}

| Name | Type / Format | Description / Example |
| --- | --- | --- |
| base\_path | String | Absolute path (and protocol) to the HLS content on the customer origin.<br /><br />Causes the HLS client manifest to use the base\_path parameter value as the absolute path to the HLS content on the customer origin. The protocol used for the initial request must match the protocol provided in the base\_path value. For example, when base\_path is provided, and HTTPS is the protocol used to access the client manifest, “HTTPS” should be the base\_path protocol.<br /><br />Example:<br />`http://mmd-od-server.com/path/to/content/manifest.mpd?base_path=HTTP` |
| hls_client_manifest_version | Integer in the range 1 through 7 | The optional output protocol version of the HLS client manifest (.m3u8) file.<br /><br />Defaults to 1, which specifies protocol version 1.<br /><br />Example:<br />`http://mmd-od-server.com/path/to/content/manifest.mpd?hls_client_manifest=1`<br /><br />Two values to note are:<br />`1`: Causes the client manifest rendition order to mirror the order in the server manifest.<br /><br />`7`: (default value): causes audio tracks always to be placed in the middle of the client manifest.<br /><br />For additional information, see this [Apple Technical Q&A Website](https://developer.apple.com/library/content/qa/qa1752/_index.html) that explains the `EXT-X-VERSION` tag. |

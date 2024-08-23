---
title: Trick Play in HLS
---
Trick Play allows HLS streams to be played in fast forward and rapid reverse, imitating the capabilities available in systems such as VCRs. Trick Play also allows scrubbing (moving the seek handle back and forth) to be enabled on playback. Trick Play is enabled by creating "Intra-coded picture Frame" (I-frame) playlists, which specify the locations (byte-ranges) of I-frames. Client devices must have iOS 12x or later.

Enabling Trick Play mode in MMD OD produces `EXT-X-I-FRAME-STREAM-INF` tags within the HLS Master Playlist, which provide I-Frames Media Playlist URI's. See the [IETF's Pantos HLS Specification](https://tools.ietf.org/html/draft-pantos-http-live-streaming-17#page-25) for additional information.

In HTTP Live Streaming (HLS)-based platforms such as AppleTV, this feature is defined in [Technical Note TN2288](https://developer.apple.com/library/content/technotes/tn2288/_index.html).

The `EXT-X-I-FRAMES-ONLY` tag was introduced in HLS v4.

## Enabling Trick Play with Input Manifest
To enable support for HLS I-Frames streaming trick play for the input manifest, you must set the `hls_client_manifest_version` parameter to a value >= 4. You can do this in an ISM file or via a query parameter in the playback URL.

## Setting hls_client_manifest_version in an ISM File
Set the `hls_client_manifest_version` parameter as in this example:

```
<head>
  ...
  }}{{    <meta name="hls_client_manifest_version" content="4" />
  ...
</head>
```

## Setting hls_client_manifest_version via Query Parameter
Add the `hls_client_manifest_version` query parameter to the query string, with a value >= "4."

When you use a query parameter, the Master Playlist is generated, containing a list of variant media playlists' URLs, including an I-frame stream `#EXT-X-I-FRAME-STREAM-INF`. The `EXT-X-I-FRAME-STREAM-INF` tag includes the URI attribute, which identifies the I-frames Media Playlist. To retrieve the I-Frames Media Playlist, use the following URI:

`http://.../keyframes/mbr-video=1631000.m3u8?hls_client_manifest_version=4`

See also [Multi-Bitrate Output with Input Manifest](/delivery/video/mmd_on_demand/multi_bitrate_output_with_input_manifest) and [Query Parameters](/delivery/video/mmd_on_demand/query_parameters).

## Enabling Trick Play without Input Manifest

To enable HLS I-frames streaming without an input manifest, add the `hls_client_manifest_version` query parameter to the query string, with a value >= "4."

The result is identical to using a query parameter; the Master Playlist is generated, containing a list of the URLs of variant media playlists, including an I-frame stream #EXT-X-I-FRAME-STREAM-INF tag. The EXT-X-I-FRAME-STREAM-INF tag includes the URI attribute, which identifies the I-Frames Media Playlist. To retrieve the I-frames Media Playlist, use the following URI:

`http://..../keyframes/stream-video=1230000.m3u8?stream=movie_305;movie_534;movie_1241&hls_client_manifest_version=4`

See also [Multi-Bitrate Output without Input Manifest](/delivery/video/mmd_on_demand/multi_bitrate_output_without_input_manifest).

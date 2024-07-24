---
title: Conditional and Reverse Blackout
---

Programming may be restricted from some viewers. These viewers will stream alternate content instead of the regularly scheduled program. This capability is known as blackout. Blackout may be implemented using one of the following options: [conditional blackout](#conditional-blackout), [reverse blackout](#reverse-blackout), [blackout](/uplynk/manage/content_protection/blackout).

## Quick Start  {/*quick-start*/}

Leverage blackout by performing the following steps:

Identify the programming that should be restricted from specific viewers.
Include the repl parameter within the playback URL and set it to the desired flavor of blackout (i.e., `blackout`, `rbo`, or `aboi`).

<Info>Blacked out viewers will view alternate content instead of the regularly scheduled program.</Info>

## Conditional Blackout  {/*conditional-blackout*/}

**Load Parameter:** `repl=blackout`

The blackout plugin enables content providers to blackout certain assets from their channel's timeline. In order for an asset to be blacked out, it must contain custom metadata `blackout_id` that matches the value associated with the playback replacement parameter `boid`. If they match, the channel's blackout slate (or, if not defined, the owner's blackout slate) will be played. If they don't match, the asset will play.

### Parameters  {/*conditional-parameters*/}

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `boid` | string | No | The blackout ID used to determine whether an asset in a timeline should be blacked out. If the value provided with this parameter matches the `blackout_id` custom metadata on the asset, the channel or owner blackout slate will play. If there is no match, the asset will play.  |

<Info>This plugin does not currently support specifying the `boid` in channel metadata.</Info>

### Example  {/*parameters-example*/}

Using the `meta` parameter on the slicer's `content_start` method to set the asset's custom metadata, you now have an asset that contains `meta.blackout_id=blackout_01`. If you then play a channel that contains this asset with the following URL parameters: `http://…?repl=blackout&repl.boid=blackout_01`

Because the `repl.boid` value and the `meta.blackout_id` match, when the timeline reaches this asset, the viewer will see the blackout slate instead of the asset.

## Reverse Blackout  {/*reverse-blackout*/}

**Load Parameter:** `repl=rbo`

The `rbo`, or “reverse blackout”, plugin operates in reverse of the blackout plugin described above. While the blackout plugin defaults to letting all content through and filters those that match the rules, the `rbo` plugin defaults to letting no content through and allows only those that match the given parameters.

### Parameters  {/*reverse-parameters*/}

| Name           | Type   | Required | Description |
|----------------|--------|----------|-------------|
| `prop,val.<id>` | string | No       | The `prop,val.<id>` parameters specify what asset property to use for filtering. `<id>` must be replaced by a unique identifier for each property/value pair. A meaningful string identifier is acceptable, or an incrementing integer value would work as well. Filename-type wildcards can also be used in the value, where `*` matches multiple characters, and `?` matches one character. Note that the match is case-insensitive. |

### Example  {/*reverse-example*/}

Let's say you have multiple assets in a timeline and wish to black out all content except those with a `desc` property of either “Nightly News” or "Good Morning, USA". Assume that the assets with a description of "Good Morning, USA" are always that exact string. Further, for "Nightly News", the description might include a suffix such as "Nightly News - 01", meaning you want to match any descriptions that start with "Nightly News". Use the following playback URL parameters to achieve this:

```http://...?repl=rbo&repl.prop,val.nightlynews=desc,Nightly%20News%2A&repl.prop,val.gmusa=desc,Good%20Morning,%20USA```

Note that spaces and the `*` are URL-encoded (`%20` and `%2A`, respectively), but unencoded characters can also be passed as long as the client sends them properly.

Alternatively, you could specify the `repl-prop,val-<id>` parameters (note `.` has been replaced with `-` in the key name) in channel custom metadata by specifying the following custom metadata on the channel:

| Key                      | Value                    |
|--------------------------|--------------------------|
| repl-prop,val-nightlynews | desc,Nightly News*    |
| repl-prop,val-gmusa     | desc,Good Morning, USA |

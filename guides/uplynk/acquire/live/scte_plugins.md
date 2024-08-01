---
title: SCTE Plugins
---
Use these plugins to handle SCTE (Society of Cable Telecommunications Engineers) standards. These standards are crucial for managing various aspects of digital video streams, including ad insertion, content protection, and more.

## Baseline SCTE Plugin  {/*baseline-scte-plugin*/}

The Baseline SCTE plugin provides SCTE signal processing functionality to the Live Slicer. To leverage this functionality, it must be enabled within your Live Slicer configuration file by adding the following lines:

```yaml
scte_type: python
scte_module: scte_baseline
```

### Blackout  {/*blackout*/}

The Baseline SCTE plugin triggers blackout based on the `splice_insert`'s `out_of_network_indicator` field.

To achieve the desired blackout effect, set the `out_of_network_indicator` field to:
1. `1`: Enter blackout.
2. `2`: Leave blackout.

### Content Start  {/*content-start*/}

In addition to a `splice_insert` with `out_of_network_indicator` set to `0`, you can also start a new program by sending a `time_signal` with a segmentation descriptor where `segmentation_type_id` is set to `0x10` (PROGRAM_START).

### Ad Insertion  {/*ad-insertion*/}

Ad insertion is managed by `time_signals` with a segmentation descriptor having a `segmentation_type_id` of `0x34` (PLACEMENT_OPPORTUNITY_START). You can end an ad explicitly by sending a `time_signal` with a segmentation descriptor having a `segmentation_type_id` of `0x35` (PLACEMENT_OPPORTUNITY_END).

- If `segmentation_duration` is `0` when starting an ad, the ad break will last until the next `content_start`, `blackout`, or explicit `PLACEMENT_OPPORTUNITY_END` is sent.
- If `segmentation_duration` is set, the ad will last for the specified duration and then return automatically.
- You can always end an ad preemptively by explicitly sending a `PLACEMENT_OPPORTUNITY_END`.

## Python SCTE Plugin  {/*python-scte-plugin*/}

Use the Python SCTE plugin to process your SCTE 35/104 signal with a custom Python file. Your code should contain specific functions that hook into SCTE processing and control the state of the Live Slicer.

### Python  {/*python*/}

Python and its libraries must be installed in your system's shared library path. By default, the Live Slicer uses Python 2.7, which is included with Mac OS X and Ubuntu versions 14.04 LTS or lower. However, you may configure the Live Slicer (version 20031300 or higher) to use Python 3.6 by including the following configuration in your Live Slicer configuration file:

- **Syntax (Python 3.6):**
  ```plaintext
  scte_python_version: 3.6
  ```

- **Syntax (Python 3.6 installed with pymalloc support):**

    ```plaintext
    scte_python_version: 3.6m
    ```

### Set up a Live Slicer  {/*set-up-a-live-slicer*/}

Set up a Live Slicer to use your Python SCTE plugin by adding the following settings to your Live Slicer configuration file:

```
scte_type: python
scte_module: my_scte_plugin
scte_python_version: 3.6m
```

<Info>If you have not installed Python 3.6 with pymalloc support, then you should update the `scte_python_version` setting with the correct version.</Info>

Copy your Python plugin to the `plugins` subfolder of your Live Slicer's installation directory and then replace `my_scte_plugin` with your Python plugin's file name.

See information on the SCTE parameters in [Live Slicer Configuratin File Settings](/uplynk/acquire/live/live_slicer_configuration_file_settings).

### Encrypted Plugins  {/*encrypted-plugins*/}

Plugins may be either plaintext or encrypted. The configuration for both plaintext and encrypted plugins is the same with the exception of the file name. The file name for an encrypted plugin is the SHA-1 hash of the plaintext plugin's file name. Although the file name will be encrypted, the `scte_module` parameter should still be set to the plaintext file name.

<Info>If both an encrypted and plaintext version of your plugin are found, then the plaintext version will take precedence.</Info>

### Sample Scenario  {/*sample-scenario*/}

In this sample scenario:

- You have created a plaintext plugin called `scte_example.py` and stored it in the `plugins` subfolder of your Live Slicer's installation directory.
- You have encrypted the above plugin. The encrypted file name is:

  ```plaintext
  B1487EF85E26CA04BF0350D46B2E4509EB93A298.py
  ```

Set the `scte_module` parameter to the following value:

```
scte_module: scte_example
```

If you would like to use the encrypted version of this plugin, please verify that the plaintext version of the plugin is not present in the Live Slicer's `plugins` folder.

### Plugin Functions  {/*plugin-functions*/}

The most basic plugin, which does nothing, must appear as:

```
import slicer
def Initialize():
    return slicer.Initialize()
```

This function is necessary to establish proper communication between the plugin and the slicer. The second, optional, function is where you perform SCTE logic:

```
def Process35(slice_info):
    slicer.Blackout(long(0))
    return long(0)
```
This function receives the SCTE35 packets and inside you may inspect the slice_info object containing the SCTE packet or call slicer module functions to control the slicer. SCTE104 packets are converted to SCTE35 and passed to this function for unified handling of SCTE.

### Slicer Module  {/*slicer-module*/}

The slicer module provides a way for your plugin to call functions and manipulate slicer state.

The available functions are:

| Function | Description |
|---|---|
| [AdEnd](#adend) | Explicitly ends an ad break. |
| [AdMeta](#admeta) | Adds metadata to an ad break. |
| [AdStart](#adstart) | Starts an ad break. |
| [Blackout](#blackout) | Initiates blackout mode. |
| [ContentStart](#contentstart) | Starts a new asset. |
| [EndBoundary](#endboundary) | Ends an ad boundary. |
| [FlushBreakMeta](#flushbreakmeta) | Defines the presentation timestamp (PTS) at which the metadata defined via the MetaMetadata function will be applied. |
| [GetState](#getstate) | Indicates the current Live Slicer state. |
| [GetStatus](#getstatus) | Returns Live Slicer status and configuration information. |
| [Initialize](#initialize) | Initializes the slicer module. |
| [Metadata](#metadata) | Adds metadata to the asset currently being sliced. |
| [MetaMetadata](#metametadata) | Adds metadata to the asset associated with the next segment. |
| [SlicerLogger](#slicerlogger) | Logs error conditions, informational messages, and debug messages. |
| [StartBoundary](#startboundary) | Starts an ad boundary. |
| [TimedMeta](#timedmeta) | Adds metadata as an ID3 tag at the presentation timestamp (PTS). |

#### Initialize  {/*initialize*/}

Initializes the slicer module. Call this function via the `Initialize()` function as shown above.

#### GetState  {/*getstate*/}

Returns a string that indicates the current Live Slicer state.

### Valid values are:

- **start_blackout**: Indicates that the Live Slicer started up and remains in blackout mode.
- **slicing**: Indicates that the Live Slicer is currently slicing.
- **adbreak**: Indicates that the Live Slicer is in an ad break.
- **replace**: Indicates that the Live Slicer is in replace content mode.
- **blackout**: Indicates that the Live Slicer is in blackout mode.

**Sample request**: `print slicer.GetState()`

#### GetStatus  {/*getstatus*/}

Returns Live Slicer status and configuration information. The response for this function may contain the following parameters:

| Parameter | Type | Description |
|---|---|---|
| status | Object | Contains Live Slicer status information. This object is similar to the `status` object returned by the [status endpoint from the Live Slicer API](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#status). |
| config | Object | Contains Live Slicer configuration file settings. |
| slicerID | String | Identifies the Live Slicer's ID as defined in the Live Slicer configuration file. |
| externalID | String | Indicates the external ID that will be assigned to the CMS asset created from the live stream. |

**Sample request**: `print slicer.GetStatus()`

#### Blackout  {/*blackout*/}

Initiates blackout mode.

**Sample request**: `print slicer.Blackout(long(pts))`

#### ContentStart  {/*contentstart*/}

Starts a new asset. `Description` and `External ID` are optional.

**Sample request**: `print slicer.ContentStart(long(pts), "Description", "External ID")`

#### AdStart  {/*adstart*/}

Starts an ad break. `Duration` is optional. If omitted, you must call `AdEnd()` to end the ad break.

**Sample request**: `print slicer.AdStart(long(pts), long(duration))`

#### AdEnd  {/*adend*/}

Explicitly ends an ad break.

**Sample request**: `print slicer.AdEnd(long(pts))`

#### AdMeta  {/*admeta*/}

Adds metadata to a specific ad break. Call `AdMeta` before starting an ad break.

<Info>This function only adds metadata to a specific ad break. It is not applied globally across all ad breaks.</Info>

**Sample request**: `print slicer.AdMeta("key", "value")`

#### FlushBreakMeta  {/*flushbreakmeta*/}

Defines the presentation timestamp (PTS) at which the metadata defined via the `MetaMetadata` function will be applied.

**Sample request**: `print slicer.FlushBreakMeta(long(pts))`

#### Metadata  {/*metadata*/}

Adds metadata to the asset currently being sliced as determined by the next video frame.

<Warning>Metadata may be incorrectly applied to an asset under certain conditions. For example, metatadata may be applied to the previous asset when this function is called directly after a content_start. The recommended method for setting metadata is via the `MetaMetadata` and `FlushBreakMeta` functions.</Warning>

<Tip>View the metadata associated with an asset from within the CMS.</Tip>

**Sample request**: `print slicer.Metadata("key", "value")`

#### MetaMetadata  {/*metametadata*/}

Adds metadata to the asset associated with the next segment as determined by content start, ad start, etc.

<Tip>The recommended method for associating metadata with an asset is to set it via the `MetaMetadata` function and then setting the presentation timestamp (PTS) at which it will be applied to an asset via the `FlushBreakMeta` function.</Tip>

<Tip>View the metadata associated with an asset from within the CMS.</Tip>

**Sample request**: `print slicer.MetaMetadata("key", "value")`

#### SlicerLogger  {/*slicerlogger*/}

Logs error conditions, informational messages, and debug messages to the terminal and syslog.

[Learn more about logging.](/uplynk/acquire/live/on_prem_slicer/#log-data)

**Valid log levels are**:

- **error**: Logs error conditions.
- **info**: Logs informational messages.
- **debug**: Logs debug-level messages that may be used to troubleshoot an issue.

**Syntax**: `print slicer.SlicerLogger("{Log Level}", "{Log Message}")`

**Sample request**: <br />`print slicer.SlicerLogger("info", "Started an asset boundary.")`

#### StartBoundary  {/*startboundary*/}

Starts an asset boundary. If a boundary is already active, this is ignored. `Duration` is optional. If omitted, call `EndBoundary()` to explicitly end an asset boundary.

**Sample request**: <br />`print slicer.StartBoundary(long(pts), name, long(duration))`

#### EndBoundary  {/*endboundary*/}

Ends an asset boundary. This function is ignored when there isn't an active boundary.

**Sample request**: `print slicer.EndBoundary(long(pts))`

#### TimedMeta  {/*timedmeta*/}

Adds metadata as an ID3 tag at the presentation timestamp (PTS).

**Syntax**: `print slicer.TimedMeta({Presentation Timestamp}, {Metadata Key}, {Metadata Value})`

**Sample request**: <br />`print slicer.TimedMeta(long(pts), "key", "value")`

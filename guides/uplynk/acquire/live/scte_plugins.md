---
title: SCTE Plugins
---
Use these plugins to handle SCTE (Society of Cable Telecommunications Engineers) standards. These standards are crucial for managing various aspects of digital video streams, including ad insertion, content protection, and more.

## Baseline SCTE Plugin

The Baseline SCTE plugin provides SCTE signal processing functionality to the Live Slicer. To leverage this functionality, it must be enabled within your Live Slicer configuration file by adding the following lines:

```yaml
scte_type: python
scte_module: scte_baseline
```

### Blackout

The Baseline SCTE plugin triggers blackout based on the `splice_insert`'s `out_of_network_indicator` field.

To achieve the desired blackout effect, set the `out_of_network_indicator` field to:
1. `1`: Enter blackout.
2. `2`: Leave blackout.

### Content Start

In addition to a `splice_insert` with `out_of_network_indicator` set to `0`, you can also start a new program by sending a `time_signal` with a segmentation descriptor where `segmentation_type_id` is set to `0x10` (PROGRAM_START).

### Ad Insertion

Ad insertion is managed by `time_signals` with a segmentation descriptor having a `segmentation_type_id` of `0x34` (PLACEMENT_OPPORTUNITY_START). You can end an ad explicitly by sending a `time_signal` with a segmentation descriptor having a `segmentation_type_id` of `0x35` (PLACEMENT_OPPORTUNITY_END).

- If `segmentation_duration` is `0` when starting an ad, the ad break will last until the next `content_start`, `blackout`, or explicit `PLACEMENT_OPPORTUNITY_END` is sent.
- If `segmentation_duration` is set, the ad will last for the specified duration and then return automatically.
- You can always end an ad preemptively by explicitly sending a `PLACEMENT_OPPORTUNITY_END`.

## Python SCTE Plugin

Use the Python SCTE plugin to process your SCTE 35/104 signal with a custom Python file. Your code should contain specific functions that hook into SCTE processing and control the state of the Live Slicer.

### Python

Python and its libraries must be installed in your system's shared library path. By default, the Live Slicer uses Python 2.7, which is included with Mac OS X and Ubuntu versions 14.04 LTS or lower. However, you may configure the Live Slicer (version 20031300 or higher) to use Python 3.6 by including the following configuration in your Live Slicer configuration file:

- **Syntax (Python 3.6):**
  ```plaintext
  scte_python_version: 3.6
  ```

- **Syntax (Python 3.6 installed with pymalloc support):**

    ```plaintext
    scte_python_version: 3.6m
    ```
### Set up a Live Slicer

Set up a Live Slicer to use your Python SCTE plugin by adding the following settings to your Live Slicer configuration file:

```
scte_type: python
scte_module: my_scte_plugin
scte_python_version: 3.6m
```

<Info>If you have not installed Python 3.6 with pymalloc support, then you should update the `scte_python_version` setting with the correct version.</Info>

Copy your Python plugin to the `plugins` subfolder of your Live Slicer's installation directory and then replace `my_scte_plugin` with your Python plugin's file name.

See information on the SCTE parameters in [Live Slicer Configuratin File Settings](/uplynk/acquire/live/live_slicer_configuration_file_settings).

### Encrypted Plugins

Plugins may be either plaintext or encrypted. The configuration for both plaintext and encrypted plugins is the same with the exception of the file name. The file name for an encrypted plugin is the SHA-1 hash of the plaintext plugin's file name. Although the file name will be encrypted, the `scte_module` parameter should still be set to the plaintext file name.

<Info>If both an encrypted and plaintext version of your plugin are found, then the plaintext version will take precedence.</Info>

### Sample Scenario

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

### Plugin Functions

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

### Slicer Module

The slicer module provides a way for your plugin to call functions and manipulate slicer state.

The available functions are:

| Function | Description |
|---|---|
| AdEnd | Explicitly ends an ad break. |
| AdMeta | Adds metadata to an ad break. |
| AdStart | Starts an ad break. |
| Blackout | Initiates blackout mode. |
| ContentStart | Starts a new asset. |
| EndBoundary | Ends an ad boundary. |
| FlushBreakMeta | Defines the presentation timestamp (PTS) at which the metadata defined via the MetaMetadata function will be applied. |
| GetState | Indicates the current Live Slicer state. |
| GetStatus | Returns Live Slicer status and configuration information. |
| Initialize | Initializes the slicer module. |
| Metadata | Adds metadata to the asset currently being sliced. |
| MetaMetadata | Adds metadata to the asset associated with the next segment. |
| SlicerLogger | Logs error conditions, informational messages, and debug messages. |
| StartBoundary | Starts an ad boundary. |
| TimedMeta | Adds metadata as an ID3 tag at the presentation timestamp (PTS). |

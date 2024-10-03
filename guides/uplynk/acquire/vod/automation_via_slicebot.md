---
title: Automate via Slicebot
---

Use Slicebot to monitor one or more directories for new files. Once a file is detected, it is automatically sliced and uploaded to the cloud.

<Info>Slicebot is included with the Slicer installation.</Info>

<Info>Slicebot is not officially supported on Windows.</Info>

## Quick Start  {/*quick-start*/}

Setting up Slicebot consists of the following steps:

1. Create a configuration file that defines the directories to be monitored and how content will be processed.
2. Start Slicebot by running the following command: `./slicebot /ConfigurationFilePath`

## Basic Information  {/*basic-information*/}

This section explains:

- The available [configuration](#configuration) methods.
- How to set up the [main Slicebot configuration file](#main-configuration).
- How to set up a [file-specific configuration file](#file-specific-configuration-file).
- How to define configuration settings within a [file name](#file-name-configuration).
- How to [test](#testing) out a configuration.
- How to [end a Slicebot session](#end-a-slicebot-session).

## Configuration  {/*configuration*/}

Configuration settings may be defined through the following mechanisms:

- [**Main Configuration File**](#main-configuration)

    - Defines a default configuration.
    - Identifies the set of directories to be monitored.
    - Defines directory-specific configurations.

- [**File-specific Configuration File**](#file-specific-configuration-file): Defines how a specific file will be processed.

- [**File Name**](#file-name-configuration): Defines how a specific file will be processed.

**Settings will be applied in the following order:**

1. \[Global\] section of the main configuration file.
2. Directory-specific sections in the main configuration file.
3. File-specific configuration file.
4. File name.

As a result, settings defined within a file name will take precedence over any conflicting settings defined elsewhere.

### Main Configuration File  {/*main-configuration*/}

Slicebot requires a configuration file that contains settings defining:

- How and when source media will be processed.
- The directories that will be monitored for source media.

[View configuration settings](#configuration-settings).

**Key Information:**

- Upon starting Slicebot, it must be [informed where this configuration file is located](#quick-start).
- Create this configuration file using a text editor.
    - The file extension for this file should be "cfg" in lower-case (e.g., `slicebot.cfg`).
    - This configuration file may be saved in any directory that is accessible by Slicebot.

**Categorize settings into the following sections:**

- **Global**: Defines a default configuration for all monitored directories.
- **Directory-specific Settings**: A section must be created for each desired monitored directory.

  - The header for this type of section should be set to the full path to the desired directory.

    **Example:**

    ```ini
    [~/sales/videos/2016/]
    ```

- The settings defined in this type of section:
    - Only apply to that directory.
    - Override any conflicting settings defined in the Global section.
- A section may be left blank. A blank section indicates that the specified directory should be monitored and processed according to the configuration defined in:
    - The `Global` section of the main configuration file.
    - A file-specific configuration file.
    - A file-name.

**Define settings** using the following format: `Name = Value`

**Sample Configuration**

```
[global]
enc_wait = 1
mail_host = smtp.gmail.com:587
done_emails = sys@mycompany.com, me@mycompany.com
fail_emails = me@mycompany.com
[~/t/slice/a/]
[~/t/slice/b/]
enc_wait = 0
username = me@email.com
apikey = abcDEFghiJKLmnoPQRtuvWXYz123ABCdefGHIJKL
```

### File-Specific Configuration File  {/*file-specific-configuration-file*/}

Instructions on when and how a specific file is processed may be defined by creating a configuration file that contains the desired configuration settings.

<Info>Although most [configuration settings](#configuration-settings) may be defined within a file-specific configuration, there are exceptions (e.g., halt_on_error and ignore). The description associated with each setting indicates any limitations on where it may be implemented.</Info>

**Key information**

- File-specific settings may be defined in a text file that meets the following conditions:

    - It must be stored in the same directory as the desired source media.
    - It must be named after the desired source media file.
    - The file extension for this file should be "cfg" in lower-case (e.g., myvideo.mp4.cfg).

    <Info>Use the [`helper_noext`](#configuration-settings) setting to exclude the source media's file extension (e.g., mp4).</Info>

- This type of configuration file should not contain section headers (e.g., \[global\] or \[~/folder/\]).
- File-specific settings override conflicting settings defined in the [main configuration file](#main-configuration).
- The recommended best practice is to ensure that a file-specific configuration file is present in a monitored directory before the corresponding media file is copied into it. This ensures that the media file will be processed according to the configuration defined in the file-specific configuration file.
- Define the [require_config](#configuration-settings) setting within the main configuration file to require a file-specific configuration before processing a file.

A sample configuration file is provided below.

```
enc_wait = 0
done_emails = marketing@mycompany.com, joe@mycompany.com
fail_emails = jane@mycompany.com
```

### File Name Configuration  {/*file-name-configuration*/}

Instructions on when and how a specific file is processed may be defined by including the desired settings within the source media's file name.

<Info>Slicebot will only honor settings defined within a file name when the [`allow_inline` setting](#configuration-settings) has been enabled via either the [main](#main-configuration) or a [file-specific configuration file](#file-specific-configuration-file).</Info>

<Info>Although most configuration settings may be defined within a file name, there are exceptions (e.g., halt_on_error and ignore). The description associated with each setting indicates any limitations on where it may be implemented.</Info>

****Syntax****: `FileName^Setting1=Value1^Setting2=Value2^SettingN=ValueN.ext`

**Example**

Original file name: `marketing.mp4`

New file name: `marketing^max_slices=3^external_id=1FA1272b.mp4`

Follow these guidelines when defining a setting within a file name:

- Each setting should be appended to the file name.
- Each setting should be prepended with a caret (^) symbol.
- A file name should never contain spaces.
    - Convert space characters within a setting's value to the plus (+) symbol.

        **Example**: `my_movie^description=Standard+Trailer.mp4`

        In the above example, the asset's name will be set "Standard Trailer."

- A matching file name must still be assigned to any supporting files (e.g., closed captioning or file-specific configuration file).

    **Closed Captioning Example**: `my_movie^max_slices=3^external_id=1FA1272b.mp4.ttml`

    <Info></Info>The [`helper_noext`](#configuration-settings) setting determines whether source media's file extension (e.g., mp4) needs to be included when naming supporting files.

- Settings defined within a file name override conflicting settings defined in the Slicebot or a file-specific configuration file.
- Avoid creating file names longer than those supported by the OS.

<Tip>Use [file-specific configuration files](#file-specific-configuration-file) to avoid OS limitations.</Tip>

### Testing  {/*testing*/}

Use `--dry-run` option to test your configuration without processing files.

`./slicebot --dry-run slicebot.cfg`

### End a Slicebot Session  {/*end-a-slicebot-session*/}

Slicebot runs indefinitely until one of the following conditions is true:

- It is manually interrupted. The recommended method of interrupting Slicebot is through the SIGINT signal. This signal allows Slicebot to finish the current slicing job before shutting down. Pass this signal to Slicebot by running the following command: `kill -SIGINT SlicebotPID`
- Slicebot encounters a fatal error causing it to exit with a non-zero code. This may occur when there is an issue with the configuration file.

## Configuration Settings  {/*configuration-settings*/}

This section describes the supported configuration settings that can be used to control how slicebot processes files.

**Key information**

- The config file format considers lines starting with # to be comments, so they are ignored.
- Although most settings can be used anywhere (global section, directory sections, or per-file configs), you will find that some settings are more naturally used in some places more than others. For example, the global section will typically hold things like username, API key, and email settings, although they are legal in other places as well.
- Setting values support basic value substitution:

    [FILENAME] - replaced with the current source filename, minus the path. Example, with a source file of /mnt/files/ad.mp4:<br />
    external_id=foo[FILENAME]bar<br />would become<br />external_id=fooad.mp4bar

    [FILENAME_SHORT] - replaced with the current source filename, minus the path and file extension. Example, with a source file of /mnt/files/ad.mp4:<br />external_id=foo[FILENAME_SHORT]bar<br />would become<br />external_id=fooadbar

The following configuration settings may be leveraged when defining:

- [The main configuration file](#main-configuration).
- [A file-specific configuration file](#file-specific-configuration-file).
- [Configuration settings by file name](#file-name-configuration).


| Setting | Description | Example |
|---|---|---|
| allow_inline | **Directory Monitoring**<br />Determines whether the source media's file name may contain configuration settings.<br />[Learn more](#file-name-configuration).<br />**Valid values are**:<ul><li>**1\|true**: Indicates that the file name may contain configuration settings.</li><li>**0\|false**: Indicates that settings defined within the file name will be ignored.</li></ul>**Default Value**: 1 | allow_inline = 0 |
| apikey<br />Required | Requires Slicer version 17111500 or higher<br />**Authorization**<br />Sets the secret API key through which Slicebot authenticates to the CMS.<Info>Bypass this requirement by setting the `SLICER_USER` and the `SLICER_APIKEY` environment variables.</Info>This API key should correspond to the user defined by the `username` setting.<br />Find API keys by navigating to **Settings** > **Integration Keys**  > **API Keys** from the [Integration Keys](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys) page<br />**Syntax**: `apikey = APIKey \| apikey = abc...` |
| auto_replace | **Asset Replacement (Library)**<br />Determines whether asset(s) with the same external ID will be automatically replaced.<br />**Valid values are**:<ul><li>**1\|true**: Ensures that the external ID assigned to an asset starts with `_replace`. This will cause it to replace existing assets with the same external ID.</li><li>**0\|false**: Indicates that the external ID assigned to an asset will not be modified.</li></ul> | auto_replace = 1 |
| autoexpire | **Asset Retention (Library)**<br />Marks an asset for deletion once the specified number of hours have elapsed.<br />The sample configuration, shown to the right, will delete assets 48 hours after they have been encoded. | autoexpire = 48 |
| breaks | **Ad Breaks (Asset)**<br />Inserts an ad break for each specified time range.<br />**Key information**:<ul><li>Start and stop times are specified in seconds.</li><li>Specify multiple ad breaks by using a comma to delimit time ranges.</li><li>The original content corresponding to each ad break will be removed.</li><li>Ad breaks may be used to insert ads during live or on-demand playback.</li></ul>**Single Ad Break Syntax**:<br />`breaks = StartTime-StopTime`<br />**Multiple Ad Breaks Syntax**:<br />`breaks = StartTime1-StopTime1,`<br />`StartTime2-StopTime2,`<br />`StartTimeN-StopTimeN` <br />`\| breaks = 10.1-30.58,105-151.332` |
| bug | **Asset**<br />Overlays an image on the video at the specified start time for the given duration.<br />**Key information**:<ul><li>Only RGBA PNG images may be overlaid on to video.</li><li>The image overlay effect respects the transparency defined in the PNG image.</li><li>It is important that the specified PNG image match the resolution of the source video.</li><li>The start time and the duration of the image overlay effect is specified in milliseconds.</li><li>Use a negative number to specify start time from the end of the asset.<br />For example, a start time of -5000 will start the image overlay effect 5 seconds prior to the end of the asset.</li><li>Specify multiple image overlays by using 3 commas as a delimiter.</li><li>If multiple images overlap, then Z-order is determined by the order in which they are listed.</li></ul>**Syntax**:<br />`bug = PNGFile,StartTime,Duration`<br />The sample configuration, shown to the right, will add overlay1.png at the start of the asset for 5 seconds and overlay2.png five seconds before the end of the asset. If these two overlay effects overlap, then overlay2.png would appear on top of overlay1.png. | bug = overlay1.png,0,5000,,,<br />overlay2.png,-5000,5000 |
| description | **Asset (Library)**<br />Assigns a name to the asset generated from the source media.<br />This setting is typically used when defining file-specific configurations.<br />By default, assets are named after the source media's file name. | description = Marketing Event 2016 |
| done_directory | **Post-Processing**<br />Defines the directory to which the source media will be moved after it has been successfully processed.<br />**Key information**:<ul><li>If the specified directory does not exist, then it will be created.</li><li>After the source media has been successfully processed, it will be deleted if one of the following conditions are true:<br />- This setting has not been defined.<br />- This setting is set to none.<br />**Syntax**:<br />done_directory = none</li></ul> | done_directory = ~/media/success |
| done_emails | **Notifications**<br />Defines a comma-separated list of email addresses to which an email notification will be sent when a file is successfully processed.<br />This setting requires the mail_host setting. | done_emails = fred@gmail.com, george@example.com |
| done_url | **Notifications**<br />Defines the URL to which a HTTP `POST` request will be submitted when a file is successfully processed.<br />[Learn more](#http-notifications). | done_url = <br />http://myserver.net/myservice |
| enc_wait | **Slicebot**<br />Determines whether Slicebot will wait until after the cloud finishes encoding an asset before it starts processing the next source media file.<br />**Valid values are**:<ul><li>**1**: Indicates that Slicebot must wait until after encoding is completed.</li><li>**0**: Indicates that Slicebot may move on to the next source media file as soon as slicing is completed.</li></ul>**Default Value**: 0 | enc_wait = 1 |
| external_id | **Asset (Library)**<br />Assigns an external ID to the asset generated from the source media.<br />By default, the same external ID may be assigned to multiple assets. Override this behavior by adding the "_replace:" prefix to the desired external ID. This will cause the new asset to replace existing assets with the same external ID. | external_id = ep20115e_12<br />external_id = _replace:ep20115e_12 |
| fade | Asset<br />Fades audio and/or video in/out from the specified start time.<br />**Key information**:<ul><li>Determine whether this setting will fade in or out by setting the Method parameter to either of the following values:<br />- **in**: Fade in<br />- **out**: Fade out</li><li>This fade effect may be applied to audio and/or video. Valid values for the `MediaType` parameter are:<br />- **audio**: Fades audio in from silence.<br />- **video**: Fades video in from black.<br />- **both**: Fades in both audio and video.</li><li>The start time and the duration of the fade effect is specified in milliseconds.</li><li>Use a negative number to specify start time from the end of the asset.<br />For example, a start time of -5000 will start the fade effect 5 seconds prior to the end of the asset.</li><li>Specify multiple fade effects by using 3 commas as a delimiter.</li></ul>**Syntax**:<br />`fade = Method,MediaType,StartTime,Duration`<br />The sample configuration, shown to the right, will fade in audio/video at the start of the asset for 5 seconds and then fade out 5 seconds before the end of the asset. | fade = in,both,0,5000,,,<br />out,both,-5000,5000 |
| fail_directory | **Post-Processing**<br />Defines the directory to which the source media will be moved when it is not successfully processed.<br />**Key information**:<ul><li>If the specified directory does not exist, then it will be created.</li><li>After all attempts to process the source media have failed, it will be deleted if one of the following conditions are true:<br />- This setting has not been defined.<br />- This setting is set to none.<br />**Syntax**:<br />`fail_directory = none`</li></ul> | fail_directory = ~/media/failure |
| fail_emails | **Notifications**<br />Defines a comma-separated list of email addresses to which an email notification will be sent when a file is unsuccessfully processed.<br />This setting requires the mail_host setting. | fail_emails = ops@company.org |
| fail_url | **Notifications**<br />Defines a URL to which a HTTP `POST` request will be submitted when a file is unsuccessfully processed.<br />[Learn more](#http-notifications). | `fail_url = `<br />`http://myserver.net/`<br />`myservice2?status=fail` |
| force_aspect_ratio | **Asset**<br />Forces the video to the specified aspect ratio.<br />**Syntax**:<br />`force_aspect_ratio = WidthRatio:HeightRatio` | force_aspect_ratio = 16:9 |
| halt_on_error | **Source Media Processing**<br />Determines whether processing will stop when an issue occurs.<br />This setting may only be defined within the main configuration file.<br />**Valid values are**:<ul><li>**1\|true**: Indicates that Slicebot will stop processing when either of the following occurs:<br />- A job fails due to an issue with the source media.<br />- A job fails due to a configuration issue.</li><li>**0\|false**: Indicates that Slicebot will always continue to the next job.</li></ul>**Default Value**: 0 | halt_on_error = 1 |
| helper_noext | **Directory Monitoring**<br />Determines whether supporting files must include the source media's file extension.<br />**Valid values are**:<ul><li>**1\|true**: Indicates that the supporting file's file name should exclude the source media's file extension.<br />**Example**:<br />**Source media's file name**:<br />marketing.mp4<br />**File-specific configuration file name**:<br />marketing.cfg</li><li>**0\|false**: Indicates that the supporting file's file name should include the source media's file extension.</li></ul>**Example**:<br />**Source media's file name**:<br />marketing.mp4<br />**File-specific configuration file name**:<br />marketing.mp4.cfg | helper_noext = 1 |
| ignore | **Configuration File**<br />Determines whether a directory will be monitored for new files.<br />This setting should only be defined under a directory-specific section within the main configuration file.<br />**Valid values are**:<ul><li>**1\|true**: Indicates that the directory corresponding to the current section will not be monitored.</li><li>**0\|false**: Indicates that directory corresponding to the current section will be monitored. </li></ul>| ignore = 1 |
| ignoreName | **Directory Monitoring**<br />Ignores files in a monitored directory with the specified file name.<br />**Key information**:<br />File names are case-insensitive.<br />Specify multiple files by using a comma to delimit each one. | ignoreName = thumbs.db,.DS_Store |
| ignoreSuffix | **Directory Monitoring**<br />Ignores files in a monitored directory with the specified file extension(s).<br />**Key information**:<br />File extensions are case-insensitive.<br />Specify multiple file extensions by using a comma to delimit each one. | ignoreSuffix = db,txt,jpg |
| libraries | **Asset (Library)**<br />Adds an asset to one or more shared libraries.<br />**Key information**:<br />A library may be specified either by name or GUID.<br />Library names must be an exact match and are case-sensitive.<br />Add an asset to multiple libraries by using a comma to delimit each one.<br />**Add to Library by Name Syntax**:<br />libraries = LibraryName<br />**Add to Library by GUID Syntax**:<br />libraries = LibraryGUID<br />**Add to Multiple Libraries Syntax**:<br />libraries = Library1,Library2,LibraryN | libraries = 357...,8b0... |
| mail_from | **Notifications**<br />Determines the sender email address (i.e., from) for email notifications. | mail_from = <br />automation@company.org |
| mail_host | **Notifications**<br />Defines the hostname for the mail server through which email notifications will be sent.<br />A port number may be appended to the specified host. Mail servers typically use the following ports:<ul><li>**25**: Standard emails</li><li>**587**: Secure emails</li></ul>If a mail server requires authorization before sending out emails, then the mail_password and mail_username settings must also be defined.<br />**Syntax**:<br />`mail_host = Hostname:Port` | mail_host = smtp.company.com:587 |
| mail_password | **Notifications**<br />Defines the password for the user defined by the mail_username setting.<br />This setting is only required when a mail server requires authorization before sending emails. | mail_password = G183hIU39331f |
| mail_username | **Notifications**<br />Defines the name of the user account on the mail server through which email notifications will be sent.<br />This setting is only required when a mail server requires authorization before sending emails. | mail_username = <br />robo-emails@example.com |
| max_slices | **Slicing**<br />Limits the number of temporal slices to generate from the source media.<br />**Key information**:<ul><li>By default, there is no limit on the number of slices that will be generated from the source media. Rather, the entire file is sliced.</li><li>This setting is useful when either troubleshooting or when slicing short segments of media.</li><li>This setting defines an approximate limit. The Slicer may generate a few additional slices.</li></ul> | max_slices = 20 |
| meta | **Asset (Library)**<br />Adds metadata to the asset.<br />**Key information**:<ul><li>Field names must meet the following requirements:<br />Unique values.<br />- Alphanumeric characters and underscores are allowed.<br />- Letters must be specified in lower-case.</li><li>Enclose values containing spaces with quotes.</li><li>Assign multiple metadata fields to an asset by using three commas to delimit each field/value pair.</li></ul>**Syntax**:<br />`meta = Field=Value`<br />An alternative method for assigning metadata is through a JSON file.<br />[Learn more](#metadata-files). | meta = rating=TV-13<br />meta = rating=TV-13,,,<br />air_date=20160105 |
| meta_int | **Asset (Library)**<br />Adds metadata containing an integer value to the asset.<br />**Key information**:<ul><li>Field names must be unique and are case-insensitive.</li><li>Non-integer values will be set to 0.</li><li>Assign multiple metadata fields to an asset by using three commas to delimit each field/value pair.</li></ul>**Syntax**:<br />`meta.int = Field=Integer` | meta_int = is_ad=1<br />meta_int = is_ad=1,,,year=2013 |
| mix_atracks | **Asset**<br />Mixes multiple audio tracks together into a single track.<br />A sample use case is when the source audio has separate left and right audio tracks instead of a single stereo audio track.<br />**Key information**:<ul><li>An audio track is a zero-based number where 0 represents the first audio track in the source file.</li><li>Specify the desired channel using one of the following values:<br />- L<br />- R<br />- C<br />- RL<br />- RR<br />- SL<br />- SR<br />- LFE</li><li>Use a comma to delimit each specified audio track.</li></ul>**Syntax**:<br />mixatracks = <br />Track1=Channel1,Track2=Channel2=,TrackN=ChannelN | mix_atracks = 0=L,1=R,2=C,<br />3=RL,4=RR,5=LFE |
| multibot | Directory Monitoring<br />Indicates whether multiple instances of Slicebot are monitoring the same directory.<br />**Valid values are**:<ul><li>**0**: Indicates that only a single instance of Slicebot is monitoring any given directory.</li><li>**1**: Indicates that more than one instance of Slicebot is monitoring a directory.</li></ul>All instances of Slicebot consuming source media from the same folder must be configured to enable multibot mode.<br />Each instance of Slicebot should run on a separate computer.<br />**Default Value**: 1 | multibot = 1 |
| notify_retries | **Notifications**<br />Determines the maximum number of attempts to send out a HTTP notification before proceeding to the next file. Notifications are defined through the following settings:<ul><li>start_url</li><li>done_url</li><li>fail_url</li></ul>**Default Value**: 3 | notify_retries = 10 |
| notify_retry_wait | **Notifications**<br />Determines the number of seconds that must pass after a failed notification before reattempting to send out a notification.<br />**Default Value**: 10 | notify_retry_wait = 30 |
| password<br />Deprecated | This setting and the `SLICER_PASS` environment variable have been deprecated and should not be used. Please use the apikey setting or the `SLICER_APIKEY` environment variable instead.<br />Learn more.<br />Defines the password that corresponds to the user defined by the username setting. | password = 1@D208PneG63f |
| poster | **Asset**<br />Generates a poster image from the video frame corresponding to the specified time.<br />This parameter is ignored when poster_file has been defined.<br />**Syntax**:<br />`poster = Time` | poster = 5000 |
| poster_file | **Asset**<br />Sets the asset's poster image to the specified file.<br />**Syntax**:<br />`poster_file = FullPath` | poster_file = /images/poster.png |
| poster_size | **Asset**<br />Sets the size of the poster image.<br />**Key information**:<ul><li>This parameter is ignored when `poster_file` has been defined.</li><li>If both the poster and `poster_file` parameters have not been defined, then the poster image will be a thumbnail of your on-demand content.</li><li>Specifying a resolution higher than the source image will not result in upscaling. The poster image will remain the same resolution as the source image.</li><li>Poster images are scaled down to preserve aspect ratio.</li></ul>**Sample scenarios**:<br />The following sample scenarios assume that the poster image is being generated from a 1280x720 video: poster_size: 1000x500, actual poster image size: 888x500; poster_size: 1500x1500, actual poster size: 1280x720<br />**Syntax**:<br />`poster_size = WidthxHeight` | poster_size = 512x512 |
| require_captions | Processing Prerequisite<br />Determines whether a closed captioning file is required.<br />[Learn more](#closed-captions).<br />**Valid values are**:<ul><li>**1\|true**: The source media will not be processed unless a corresponding closed captioning file is found.</li><li>**0\|false**: Source media will be processed regardless of whether a corresponding closed captioning file is found.</li></ul> | require_captions = 1 |
| require_config | **Processing Prerequisite**<br />Determines whether a file-specific configuration file is required.<br />Learn more.<br />**Valid values are**:<ul><li>**1\|true**: The source media will not be processed unless a corresponding file-specific configuration file is found.</li><li>**0\|false**: Source media will be processed regardless of whether a corresponding file-specific configuration file is found.</li></ul>This is an invalid setting for file-specific configuration files. | require_config = 1 |
| skip_drm | **Asset**<br />Determines whether the asset's playback URLs must be signed.<br />**Valid values are**:<ul><li>**1**: Encrypts the asset, but playback does not require a signed playback URL.<br />This configuration is useful for ads that require playback independent from a playback session.</li><li>**0**: Playback for that asset requires a signed playback URL.</li></ul> | skip_drm = 1 |
| start_url | Defines the URL to which a HTTP `POST` request will be submitted whenever slicing is initiated on a file. [Learn more](#http-notifications). | start_url = <br />http://myserver.net/myservice |
| thumbnails | **Asset**<br />Adds one or more thumbnails.<br />**Key information**:<ul><li>A default thumbnail will be created regardless of whether this setting is defined.</li><li>The file name for this thumbnail will be assigned the specified prefix.</li><li>This thumbnail will be bounded by the specified width and height. The thumbnail will fit within the specified dimensions, while maintaining the source video's aspect ratio.</li><li>Generating additional thumbnails may incur additional encoding and storage costs. Additionally, it may impact processing speed.</li><li>Add multiple thumbnails by delimiting each one with a comma.</li></ul>**Syntax**:<br />`thumbnails = Prefix:WidthxHeight,`<br />`Prefix2:Width2xHeight2,PrefixN:WidthNxHeightN` | thumbnails = <br />tiny:50x50,med:400x400 |
| timedmeta | **Asset**<br />Adds timed metadata at the specified time.<br />**Single Field Syntax**:<br />`timedmeta = Time:Field=Value`<br />**Multiple Fields Syntax**:<br />`timedmeta = Time1:Field1=`<br />`Value1,Time2:Field2=Value2,TimeN:FieldN=ValueN` | timedmeta = 0:TIT2=MyTitle, 2000:TCOM=Myself |
| trim | **Asset**<br />Trims the content from the source media that occurs prior to the specified start time. Optionally, duration may be specified to trim content that exceeds the specified time period.<br />Specify StartTime and Duration in milliseconds.<br />The source media's file type may affect video frame accuracy by a few milliseconds.<br />**Trim Content Prior to Start Time Syntax**:<br />`trim = StartTime`<br />**Trim Content by Start Time and Duration Syntax**:<br />`trim = StartTime,Duration`<br />The sample configuration, shown to the right, will exclude the first 3 seconds of the source media and truncate it so that the asset's total duration is 52.5 seconds. | trim = 3000,52500 |
| username<br />**Required** | **Authorization**<br />Defines the user name corresponding to the account to which the asset will be uploaded.<br />Bypass this requirement by setting the `SLICER_USER` and `SLICER_APIKEY` environment variables. | username = joe@example. |

### Closed Captions  {/*closed-captions*/}

You can provide slicebot with closed caption information by placing closed caption data in a TTML file in the same directory as the media file. TTML files are simple text files that can be created with third party tools or with any text editor:

```xml
<?xml version="1.0" encoding="utf-8"?>
<tt xml:lang="en" xmlns="http://www.w3.org/2006/04/ttaf1" xmlns:tts="http://www.w3.org/2006/04/ttaf1#styling">
  <head>
    <styling>
      <style id="defaultSpeaker" tts:fontSize="24" tts:fontFamily="Arial" tts:fontWeight="normal" tts:fontStyle="normal" tts:textDecoration="none" tts:color="white" tts:backgroundColor="black" tts:textAlign="center" />
      <style id="defaultCaption" tts:fontSize="24" tts:fontFamily="Arial" tts:fontWeight="normal" tts:fontStyle="normal" tts:textDecoration="none" tts:color="white" tts:backgroundColor="black" tts:textAlign="center" />
    </styling>
  </head>
  <body style="defaultCaption" id="thebody">
    <div xml:lang="en">
      <p begin="00:00:01.420" end="00:00:02.620"><metadata ccrow="14" cccol="3" /><span tts:fontStyle="italic">THIS IS SOME TEXT...</span></p>
      <p begin="00:00:06.620" end="00:00:09.790"><metadata ccrow="13" cccol="1" />(Doorbell rings)</p>
      <p begin="00:00:11.100" end="00:00:13.000"><metadata ccrow="14" cccol="8" />♪ LA LA LA SINGING ♪</p>
      <p begin="00:00:20.460" end="00:00:22.170"><metadata ccrow="14" cccol="0" />THIS IS MORE TEXT</p>
    </div>
  </body>
</tt>
```

<Info>The `require_captions` config setting can be used to ensure that slicebot will skip a file if it does not have a corresponding TTML file. As with other settings, it can be used in the global, directory, or per-file context.</Info>

The TTML files use a naming convention similar to config files: take the name of the associated media file and add a ".ttml" extension to the filename. For example, if slicebot is processing a file named /tmp/foo/film.mp4, it will look to see if there is a file named /tmp/foo/film.mp4.ttml and, if so, use it for the source of closed caption data. If no corresponding TTML file exists, the video will not have any closed caption data. Note that the helper_noext setting can alter the naming convention for TTML files.

<Info>Only hh:mm:ss.sss time formats are currently supported in the TTML file.</Info>

### Metadata Files  {/*metadata-files*/}

You can assign metadata key-value pairs to an asset using individual settings; for larger amounts of metadata, however, this can be cumbersome, so it may be more convenient to make use of a metadata file. This file is a JSON text file that has the metadata you want associated with the media file. As with caption and config files, the name of the metadata file is the media filename with an additional extension: .meta.json. For example, if a media file is named video123.mp4, then an associated metadata file for it would be named video123.mp4.meta.json.

The contents of the metadata file must be a valid JSON object, or processing the file will produce an error. Structured metadata is supported, although presently it is not fully displayed or editable in the CMS UI.

```
{
    "genre" : "comedy",
    "network" : "ZNN",
    "season" : 1,
    "episode" : 13
}
```

In general, a given media file will use individual metadata settings or a metadata file, but not both. However, in the event that both are specified for a particular file, metadata from a file is applied first, followed by any metadata settings.

## HTTP Notifications  {/*http-notifications*/}

HTTP notifications provide an additional way to integrate a system with your content production workflow. This type of notification allows Slicebot to submit a HTTP POST request whenever one of the following events takes place:

- Slicing Starts (start_url)
- Slicing Completes (done_url)
- Slicing Error (fail_url)

<Tip>Enable HTTP notifications by setting one or more of the above settings to the URL that will be requested.</Tip>

Email notifications may also be sent whenever slicing completes (done_emails) or when an error occurs (fail_emails).

### HTTP POST Request  {/*http-post-request*/}

Slicebot will submit a HTTP POST request using the default Internet media type (i.e., [application/x-www-form-urlencoded](http://www.w3.org/TR/html4/interact/forms.html#h-17.13.4.1)). The body of this request will consist of a single line with the following parameters:

| Parameter | Description |
|---|---|
| filename | Indicates the full path and the filename of the file. |
| asset_id | Indicates the system-generated unique ID of the new asset. |
| external_id | Indicates the external ID defined in the configuration. If one has not been defined, then it will be set to an empty string. |
| description | Indicates the file's description defined in the configuration. If one has not been defined, then it will be set to an empty string. |
| status | Indicates the result of the slicing operation. Valid values are either "ok" or "error." |

In addition to the above parameters, any custom query string parameters defined in the configuration setting (i.e., start_url, done_url, and fail_url) will be automatically stripped from the request and inserted into the request body. This allows custom parameters to be passed to the remote server as needed.

[View a sample scenario](#sample-http-notification-scenario).

<Info>Custom query string parameters whose names match one of the above system-defined parameters (e.g., filename or description) will be ignored.</Info>

<Info>To allow for future expansion, the server process that receives the HTTP POST should silently ignore unrecognized parameters.</Info>

#### Notification Issues  {/*notification-issues*/}

Slicebot will log an error under the following conditions:

- It has been configured to request an invalid URL.
- A valid URL has been provided, but the server is unreachable.
- A valid URL has been provided, but it generates a non-200 response.

After which, it will reattempt the HTTP notification several times as determined by the notify_retries setting. After each attempt, it will pause for a few seconds as determined by the notify_retry_wait setting. If it is unable to successfully submit the HTTP POST request, then it will move on to the next file.

#### Sample HTTP Notification Scenario  {/*sample-http-notification-scenario*/}

This sample HTTP notification scenario assumes that the done_url setting is configured to:

`http://www.example.com/slicing/handler?custom=1234&other=5678`

The following sample HTTP POST request will be submitted once a file called "video.m4v" has been successfully sliced.

```
POST /slicing/handler HTTP/1.1
Host: www.example.com
Accept-Encoding: identity
Content-Length: 161
Content-Type: application/x-www-form-urlencoded
Connection: close
User-Agent: upLynk-slicebot/1.0
status=ok&other=5678&description=The%20file&filename=%2Fopt%2Ft%2Fmyvideos%2Fvideo.m4v&external_id=dummy_id&custom=1234&asset_id=a9119d7afc5242319d028794ae283ea7
```

Notice that the custom query string parameters (i.e., custom and other) defined in the done_url setting were automatically stripped from the request and inserted into the request body.

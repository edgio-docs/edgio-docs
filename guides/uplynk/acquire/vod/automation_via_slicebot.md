---
title: Automation via Slicebot
---

Use Slicebot to monitor one or more directories for new files. Once a file is detected, it is automatically sliced and uploaded to the cloud.

<Info>Slicebot is included with the Slicer installation.</Info>

<Info>Slicebot is not officially supported on Windows.</Info>

## Quick Start

Setting up Slicebot consists of the following steps:

1. Create a configuration file that defines the directories to be monitored and how content will be processed.
2. Start Slicebot by running the following command: `./slicebot /ConfigurationFilePath`

## Basic Information

This section explains:

- The available [configuration](#configuration) methods.
- How to set up the [main Slicebot configuration file](#main-configuration-file).
- How to set up a [file-specific configuration file](#file-specific-configuration-file).
- How to define configuration settings within a [file name](#file-name-configuration).
- How to [test](#testing) out a configuration.
- How to [end a Slicebot session](#end-a-slicebot-session).

## Configuration

Configuration settings may be defined through the following mechanisms:

- [**Main Configuration File**](#main-configuration-file)

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

### Main Configuration File

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

### File-Specific Configuration File

Instructions on when and how a specific file is processed may be defined by creating a configuration file that contains the desired configuration settings.

<Info>Although most [configuration settings](#configuration-settings) may be defined within a file-specific configuration, there are exceptions (e.g., halt_on_error and ignore). The description associated with each setting indicates any limitations on where it may be implemented.</Info>

**Key information**

- File-specific settings may be defined in a text file that meets the following conditions:

    - It must be stored in the same directory as the desired source media.
    - It must be named after the desired source media file.
    - The file extension for this file should be "cfg" in lower-case (e.g., myvideo.mp4.cfg).

    <Info>Use the [`helper_noext`](#configuration-settings) setting to exclude the source media's file extension (e.g., mp4).</Info>

- This type of configuration file should not contain section headers (e.g., \[global\] or \[~/folder/\]).
- File-specific settings override conflicting settings defined in the [main configuration file](#main-configuration-file).
- The recommended best practice is to ensure that a file-specific configuration file is present in a monitored directory before the corresponding media file is copied into it. This ensures that the media file will be processed according to the configuration defined in the file-specific configuration file.
- Define the [require_config](#configuration-settings) setting within the main configuration file to require a file-specific configuration before processing a file.

A sample configuration file is provided below.

```
enc_wait = 0
done_emails = marketing@mycompany.com, joe@mycompany.com
fail_emails = jane@mycompany.com
```

### File Name Configuration

Instructions on when and how a specific file is processed may be defined by including the desired settings within the source media's file name.

<Info>Slicebot will only honor settings defined within a file name when the [`allow_inline` setting](#configuration-settings) has been enabled via either the [main](#main-configuration-file) or a [file-specific configuration file](#file-specific-configuration-file).</Info>

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

### Testing

Use `--dry-run` option to test your configuration without processing files.

`./slicebot --dry-run slicebot.cfg`

### End a Slicebot Session

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

- [The main configuration file](#main-configuration-file).
- [A file-specific configuration file](#file-specific-configuration-file).
- [Configuration settings by file name](#file-name-configuration).


| Setting | Description | Example |
|---|---|---|
| allow_inline | Directory Monitoring<br />Determines whether the source media's file name may contain configuration settings.<br />[Learn more](#file-name-configuration).<br />**Valid values are**:<ul><li>1\|true: Indicates that the file name may contain configuration settings.</li><li>0\|false: Indicates that settings defined within the file name will be ignored.</li></ul>**Default Value**: 1 | allow_inline = 0 |
| apikey<br />Required | Requires Slicer version 17111500 or higher<br />**Authorization**<br />Sets the secret API key through which Slicebot authenticates to the CMS.<Info>Bypass this requirement by setting the `SLICER_USER` and the `SLICER_APIKEY` environment variables.</Info>This API key should correspond to the user defined by the `username` setting.<Info></Info><br />Find API keys by navigating to **Settings** > **Integration Keys**  > **API Keys** from the [Integration Keys](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys) page<br />**Syntax**: `apikey = APIKey \| apikey = abc...` |
| auto_replace | Asset Replacement (Library)<br />Determines whether asset(s) with the same external ID will be automatically replaced.<br />**Valid values are**:<br />1\|true: Ensures that the external ID assigned to an asset starts with _replace. This will cause it to replace existing assets with the same external ID.<br />0\|false: Indicates that the external ID assigned to an asset will not be modified. | auto_replace = 1 |
| autoexpire | Asset Retention (Library)<br />Marks an asset for deletion once the specified number of hours have elapsed.<br />The sample configuration, shown to the right, will delete assets 48 hours after they have been encoded. | autoexpire = 48 |
| breaks | Ad Breaks (Asset)<br />Inserts an ad break for each specified time range.<br />Key information:<br />Start and stop times are specified in seconds.<br />Specify multiple ad breaks by using a comma to delimit time ranges.<br />The original content corresponding to each ad break will be removed.<br />Ad breaks may be used to insert ads during live or on-demand playback.<br />Single Ad Break **Syntax**:<br />`breaks = StartTime-StopTime`<br />Multiple Ad Breaks **Syntax**:<br />`breaks = StartTime1-StopTime1,`<br />`StartTime2-StopTime2,`<br />`StartTimeN-StopTimeN` <br />`\| breaks = 10.1-30.58,105-151.332` |
| bug | Asset<br />Overlays an image on the video at the specified start time for the given duration.<br />Key information:<br />Only RGBA PNG images may be overlaid on to video.<br />The image overlay effect respects the transparency defined in the PNG image.<br />It is important that the specified PNG image match the resolution of the source video.<br />The start time and the duration of the image overlay effect is specified in milliseconds.<br />Use a negative number to specify start time from the end of the asset.<br />For example, a start time of -5000 will start the image overlay effect 5 seconds prior to the end of the asset.<br />Specify multiple image overlays by using 3 commas as a delimiter.<br />If multiple images overlap, then Z-order is determined by the order in which they are listed.<br />**Syntax**:<br />bug = PNGFile,StartTime,Duration<br />The sample configuration, shown to the right, will add overlay1.png at the start of the asset for 5 seconds and overlay2.png five seconds before the end of the asset. If these two overlay effects overlap, then overlay2.png would appear on top of overlay1.png. | bug = overlay1.png,0,5000,,,overlay2.png,-5000,5000 |
| description | Asset (Library)<br />Assigns a name to the asset generated from the source media.<br />This setting is typically used when defining file-specific configurations.<br />By default, assets are named after the source media's file name. | description = Marketing Event 2016 |
| done_directory | Post-Processing<br />Defines the directory to which the source media will be moved after it has been successfully processed.<br />Key information:<br />If the specified directory does not exist, then it will be created.<br />After the source media has been successfully processed, it will be deleted if one of the following conditions are true:<br />This setting has not been defined.<br />This setting is set to none.<br />**Syntax**:<br />done_directory = none | done_directory = ~/media/success |
| done_emails | Notifications<br />Defines a comma-separated list of email addresses to which an email notification will be sent when a file is successfully processed.<br />This setting requires the mail_host setting. | done_emails = fred@gmail.com, george@example.com |
| done_url | Notifications<br />Defines the URL to which a HTTP POST request will be submitted when a file is successfully processed.<br />Learn more. | done_url = http://myserver.net/myservice |
| enc_wait | Slicebot<br />Determines whether Slicebot will wait until after the cloud finishes encoding an asset before it starts processing the next source media file.<br />**Valid values are**:<br />1: Indicates that Slicebot must wait until after encoding is completed.<br />0: Indicates that Slicebot may move on to the next source media file as soon as slicing is completed.<br />**Default Value**: 0 | enc_wait = 1 |
| external_id | Asset (Library)<br />Assigns an external ID to the asset generated from the source media.<br />By default, the same external ID may be assigned to multiple assets. Override this behavior by adding the "_replace:" prefix to the desired external ID. This will cause the new asset to replace existing assets with the same external ID. | external_id = ep20115e_12<br />external_id = _replace:ep20115e_12 |
| fade | Asset<br />Fades audio and/or video in/out from the specified start time.<br />Key information:<br />Determine whether this setting will fade in or out by setting the Method parameter to either of the following values:<br />in: Fade in<br />out: Fade out<br />This fade effect may be applied to audio and/or video. Valid values for the MediaType parameter are:<br />audio: Fades audio in from silence.<br />video: Fades video in from black.<br />both: Fades in both audio and video.<br />The start time and the duration of the fade effect is specified in milliseconds.<br />Use a negative number to specify start time from the end of the asset.<br />For example, a start time of -5000 will start the fade effect 5 seconds prior to the end of the asset.<br />Specify multiple fade effects by using 3 commas as a delimiter.<br />**Syntax**:<br />fade = Method,MediaType,StartTime,Duration<br />The sample configuration, shown to the right, will fade in audio/video at the start of the asset for 5 seconds and then fade out 5 seconds before the end of the asset. | fade = in,both,0,5000,,,out,both,-5000,5000 |
| fail_directory | Post-Processing<br />Defines the directory to which the source media will be moved when it is not successfully processed.<br />Key information:<br />If the specified directory does not exist, then it will be created.<br />After all attempts to process the source media have failed, it will be deleted if one of the following conditions are true:<br />This setting has not been defined.<br />This setting is set to none.<br />**Syntax**:<br />fail_directory = none | fail_directory = ~/media/failure |
| fail_emails | Notifications<br />Defines a comma-separated list of email addresses to which an email notification will be sent when a file is unsuccessfully processed.<br />This setting requires the mail_host setting. | fail_emails = ops@company.org |
| fail_url | Notifications<br />Defines a URL to which a HTTP POST request will be submitted when a file is unsuccessfully processed.<br />Learn more. | fail_url = http://myserver.net/myservice2?status=fail |
| force_aspect_ratio | Asset<br />Forces the video to the specified aspect ratio.<br />**Syntax**:<br />force_aspect_ratio = WidthRatio:HeightRatio | force_aspect_ratio = 16:9 |
| halt_on_error | Source Media Processing<br />Determines whether processing will stop when an issue occurs.<br />This setting may only be defined within the main configuration file.<br />**Valid values are**:<br />1\|true: Indicates that Slicebot will stop processing when either of the following occurs:<br />A job fails due to an issue with the source media.<br />A job fails due to a configuration issue.<br />0\|false: Indicates that Slicebot will always continue to the next job.<br />**Default Value**: 0 | halt_on_error = 1 |
| helper_noext | Directory Monitoring<br />Determines whether supporting files must include the source media's file extension.<br />**Valid values are**:<br />1\|true: Indicates that the supporting file's file name should exclude the source media's file extension.<br />Example:<br />Source media's file name:<br />marketing.mp4<br />File-specific configuration file name:<br />marketing.cfg<br />0\|false: Indicates that the supporting file's file name should include the source media's file extension.<br />Example:<br />Source media's file name:<br />marketing.mp4<br />File-specific configuration file name:<br />marketing.mp4.cfg | helper_noext = 1 |
| ignore | Configuration File<br />Determines whether a directory will be monitored for new files.<br />This setting should only be defined under a directory-specific section within the main configuration file.<br />**Valid values are**:<br />1\|true: Indicates that the directory corresponding to the current section will not be monitored.<br />0\|false: Indicates that directory corresponding to the current section will be monitored. | ignore = 1 |
| ignoreName | Directory Monitoring<br />Ignores files in a monitored directory with the specified file name.<br />Key information:<br />File names are case-insensitive.<br />Specify multiple files by using a comma to delimit each one. | ignoreName = thumbs.db,.DS_Store |
| ignoreSuffix | Directory Monitoring<br />Ignores files in a monitored directory with the specified file extension(s).<br />Key information:<br />File extensions are case-insensitive.<br />Specify multiple file extensions by using a comma to delimit each one. | ignoreSuffix = db,txt,jpg |
| libraries | Asset (Library)<br />Adds an asset to one or more shared libraries.<br />Key information:<br />A library may be specified either by name or GUID.<br />Library names must be an exact match and are case-sensitive.<br />Add an asset to multiple libraries by using a comma to delimit each one.<br />Add to Library by Name **Syntax**:<br />libraries = LibraryName<br />Add to Library by GUID **Syntax**:<br />libraries = LibraryGUID<br />Add to Multiple Libraries **Syntax**:<br />libraries = Library1,Library2,LibraryN | libraries = 357...,8b0... |
| mail_from | Notifications<br />Determines the sender email address (i.e., from) for email notifications. | mail_from = automation@company.org |
| mail_host | Notifications<br />Defines the hostname for the mail server through which email notifications will be sent.<br />A port number may be appended to the specified host. Mail servers typically use the following ports:<br />25: Standard emails<br />587: Secure emails<br />If a mail server requires authorization before sending out emails, then the mail_password and mail_username settings must also be defined.<br />**Syntax**:<br />mail_host = Hostname:Port | mail_host = smtp.company.com:587 |
| mail_password | Notifications<br />Defines the password for the user defined by the mail_username setting.<br />This setting is only required when a mail server requires authorization before sending emails. | mail_password = G183hIU39331f |
| mail_username | Notifications<br />Defines the name of the user account on the mail server through which email notifications will be sent.<br />This setting is only required when a mail server requires authorization before sending emails. | mail_username = robo-emails@example.com |
| max_slices | Slicing<br />Limits the number of temporal slices to generate from the source media.<br />Key information:<br />By default, there is no limit on the number of slices that will be generated from the source media. Rather, the entire file is sliced.<br />This setting is useful when either troubleshooting or when slicing short segments of media.<br />This setting defines an approximate limit. The Slicer may generate a few additional slices. | max_slices = 20 |
| meta | Asset (Library)<br />Adds metadata to the asset.<br />Key information:<br />Field names must meet the following requirements:<br />Unique values.<br />Alphanumeric characters and underscores are allowed.<br />Letters must be specified in lower-case.<br />Enclose values containing spaces with quotes.<br />Assign multiple metadata fields to an asset by using three commas to delimit each field/value pair.<br />**Syntax**:<br />meta = Field=Value<br />An alternative method for assigning metadata is through a JSON file.<br />Learn more. | meta = rating=TV-13<br />meta = rating=TV-13,,,air_date=20160105 |
| meta_int | Asset (Library)<br />Adds metadata containing an integer value to the asset.<br />Key information:<br />Field names must be unique and are case-insensitive.<br />Non-integer values will be set to 0.<br />Assign multiple metadata fields to an asset by using three commas to delimit each field/value pair.<br />**Syntax**:<br />meta.int = Field=Integer | meta_int = is_ad=1<br />meta_int = is_ad=1,,,year=2013 |
| mix_atracks | Asset<br />Mixes multiple audio tracks together into a single track.<br />A sample use case is when the source audio has separate left and right audio tracks instead of a single stereo audio track.<br />Key information:<br />An audio track is a zero-based number where 0 represents the first audio track in the source file.<br />Specify the desired channel using one of the following values:<br />L<br />R<br />C<br />RL<br />RR<br />SL<br />SR<br />LFE<br />Use a comma to delimit each specified audio track.<br />**Syntax**:<br />mixatracks = Track1=Channel1,Track2=Channel2=,TrackN=ChannelN | mix_atracks = 0=L,1=R,2=C,3=RL,4=RR,5=LFE |
| multibot | Directory Monitoring<br />Indicates whether multiple instances of Slicebot are monitoring the same directory.<br />**Valid values are**:<br />0: Indicates that only a single instance of Slicebot is monitoring any given directory.<br />1: Indicates that more than one instance of Slicebot is monitoring a directory.<br />All instances of Slicebot consuming source media from the same folder must be configured to enable multibot mode.<br />Each instance of Slicebot should run on a separate computer.<br />**Default Value**: 1 | multibot = 1 |
| notify_retries | Notifications<br />Determines the maximum number of attempts to send out a HTTP notification before proceeding to the next file. Notifications are defined through the following settings:<br />start_url<br />done_url<br />fail_url<br />**Default Value**: 3 | notify_retries = 10 |
| notify_retry_wait | Notifications<br />Determines the number of seconds that must pass after a failed notification before reattempting to send out a notification.<br />**Default Value**: 10 | notify_retry_wait = 30 |
| password<br />Deprecated | This setting and the SLICER_PASS environment variable have been deprecated and should not be used. Please use the apikey setting or the SLICER_APIKEY environment variable instead.<br />Learn more.<br />Defines the password that corresponds to the user defined by the username setting. | password = 1@D208PneG63f |
| poster | Asset<br />Generates a poster image from the video frame corresponding to the specified time.<br />This parameter is ignored when poster_file has been defined.<br />**Syntax**:<br />poster = Time | poster = 5000 |
| poster_file | Asset<br />Sets the asset's poster image to the specified file.<br />**Syntax**:<br />poster_file = FullPath | poster_file = /images/poster.png |
| poster_size | Asset<br />Sets the size of the poster image.<br />Key information:<br />This parameter is ignored when poster_file has been defined.<br />If both the poster and poster_file parameters have not been defined, then the poster image will be a thumbnail of your on-demand content.<br />Specifying a resolution higher than the source image will not result in upscaling. The poster image will remain the same resolution as the source image.<br />Poster images are scaled down to preserve aspect ratio.<br />#View sample scenarios.<br />**Syntax**:<br />poster_size = WidthxHeight | poster_size = 512x512 |
| require_captions | Processing Prerequisite<br />Determines whether a closed captioning file is required.<br />Learn more.<br />**Valid values are**:<br />1\|true: The source media will not be processed unless a corresponding closed captioning file is found.<br />0\|false: Source media will be processed regardless of whether a corresponding closed captioning file is found. | require_captions = 1 |
| require_config | Processing Prerequisite<br />Determines whether a file-specific configuration file is required.<br />Learn more.<br />**Valid values are**:<br />1\|true: The source media will not be processed unless a corresponding file-specific configuration file is found.<br />0\|false: Source media will be processed regardless of whether a corresponding file-specific configuration file is found.<br />This is an invalid setting for file-specific configuration files. | require_config = 1 |
| skip_drm | Asset<br />Determines whether the asset's playback URLs must be signed.<br />**Valid values are**:<br />1: Encrypts the asset, but playback does not require a signed playback URL.<br />This configuration is useful for ads that require playback independent from a playback session.<br />0: Playback for that asset requires a signed playback URL. | skip_drm = 1 |
| start_url | Defines the URL to which a HTTP POST request will be submitted whenever slicing is initiated on a file.<br />Learn more. | start_url = http://myserver.net/myservice |
| thumbnails | Asset<br />Adds one or more thumbnails.<br />Key information:<br />A default thumbnail will be created regardless of whether this setting is defined.<br />The file name for this thumbnail will be assigned the specified prefix.<br />This thumbnail will be bounded by the specified width and height. The thumbnail will fit within the specified dimensions, while maintaining the source video's aspect ratio.<br />Add multiple thumbnails by delimiting each one with a comma.<br />Generating additional thumbnails may incur additional encoding and storage costs. Additionally, it may impact processing speed.<br />**Syntax**:<br />thumbnails = Prefix:WidthxHeight,Prefix2:Width2xHeight2,PrefixN:WidthNxHeightN | thumbnails = tiny:50x50,med:400x400 |
| timedmeta | Asset<br />Adds timed metadata at the specified time.<br />Single Field **Syntax**:<br />timedmeta = Time:Field=Value<br />Multiple Fields **Syntax**:<br />timedmeta = Time1:Field1=Value1,Time2:Field2=Value2,TimeN:FieldN=ValueN | timedmeta = 0:TIT2=MyTitle, 2000:TCOM=Myself |
| trim | Asset<br />Trims the content from the source media that occurs prior to the specified start time. Optionally, duration may be specified to trim content that exceeds the specified time period.<br />Specify StartTime and Duration in milliseconds.<br />The source media's file type may affect video frame accuracy by a few milliseconds.<br />Trim Content Prior to Start Time **Syntax**:<br />trim = StartTime<br />Trim Content by Start Time and Duration **Syntax**:<br />trim = StartTime,Duration<br />The sample configuration, shown to the right, will exclude the first 3 seconds of the source media and truncate it so that the asset's total duration is 52.5 seconds. | trim = 3000,52500 |
| username<br />Required | Authorization<br />Defines the user name corresponding to the account to which the asset will be uploaded.<br />Bypass this requirement by setting the SLICER_USER and SLICER_APIKEY environment variables. | username = joe@example. |

| Setting  | Description| Example  |
|-------|-----|------|
| **allow_inline**   | Directory Monitoring: Determines whether the source media's file name may contain configuration settings.       | `allow_inline = 0`|
| **apikey**   <br />**Required**       | Authorization: Sets the secret API key for Slicebot to authenticate to the CMS. Requires Slicer version 17111500 or higher. | `apikey = abc...` |
| **auto_replace**   | Asset Replacement (Library): Determines whether assets with the same external ID will be automatically replaced.  | `auto_replace = 1`     |
| **autoexpire**     | Asset Retention (Library): Marks an asset for deletion after a specified number of hours.   | `autoexpire = 48`|
| **breaks**         | Ad Breaks (Asset): Inserts an ad break for each specified time range. | `breaks = 10.1-30.58,105-151.332` |
| **bug**  | Asset: Overlays an image on the video at the specified start time and duration.| `bug = overlay1.png,0,5000,,,overlay2.png,-5000,5000`       |
| **description**    | Asset (Library): Assigns a name to the asset generated from the source media.| `description = Marketing Event 2016`    |
| **done_directory** | Post-Processing: Defines the directory to which the source media will be moved after successful processing.      | `done_directory = ~/media/success`|
| **done_emails**    | Notifications: Defines email addresses to receive notifications when a file is successfully processed.| `done_emails = fred@gmail.com, george@example.com`|
| **done_url**       | Notifications: Defines the URL for HTTP POST requests when a file is successfully processed.| `done_url = http://myserver.net/myservice`        |
| **enc_wait**       | Slicebot: Determines whether Slicebot waits until after cloud encoding finishes before processing the next file. | `enc_wait = 1`    |
| **external_id**    | Asset (Library): Assigns an external ID to the asset, with an option to replace existing assets.       | `external_id = _replace:ep20115e_12`    |
| **fade** | Asset: Fades audio and/or video in/out from the specified start time. | `fade = in,both,0,5000,,,out,both,-5000,5000`    |
| **fail_directory** | Post-Processing: Defines the directory to which the source media will be moved if not successfully processed.   | `fail_directory = ~/media/failure` |
| **fail_emails**    | Notifications: Defines email addresses to receive notifications when a file is unsuccessfully processed.         | `fail_emails = ops@company.org`   |
| **fail_url**       | Notifications: Defines the URL for HTTP POST requests when a file is unsuccessfully processed.        | `fail_url = http://myserver.net/myservice2?status=fail`     |
| **force_aspect_ratio** | Asset: Forces the video to the specified aspect ratio.        | `force_aspect_ratio = 16:9`|
| **halt_on_error**  | Source Media Processing: Determines whether processing stops when an issue occurs.    | `halt_on_error = 1`     |
| **helper_noext**   | Directory Monitoring: Determines whether supporting files must include the source media's file extension.       | `helper_noext = 1`|
| **ignore**         | Configuration File: Determines whether a directory will be monitored for new files.   | `ignore = 1`      |
| **ignoreName**     | Directory Monitoring: Ignores files in a monitored directory with the specified file name.  | `ignoreName = thumbs.db,.DS_Store`|
| **ignoreSuffix**   | Directory Monitoring: Ignores files in a monitored directory with the specified file extension(s).    | `ignoreSuffix = db,txt,jpg`|
| **libraries**      | Asset (Library): Adds an asset to one or more shared libraries.       | `libraries = 357...,8b0...`|
| **mail_from**      | Notifications: Determines the sender email address for email notifications.| `mail_from = automation@company.org`    |
| **mail_host**      | Notifications: Defines the hostname for the mail server for email notifications. | `mail_host = smtp.company.com:587`|
| **mail_password**  | Notifications: Defines the password for the user account on the mail server.| `mail_password = G183hIU39331f`   |
| **mail_username**  | Notifications: Defines the user account name on the mail server for sending notifications.  | `mail_username = robo-emails@example.com`         |
| **max_slices**     | Slicing: Limits the number of temporal slices to generate from the source media. | `max_slices = 20` |
| **meta** | Asset (Library): Adds metadata to the asset.| `meta = rating=TV-13`   |
| **meta_int**       | Asset (Library): Adds metadata containing an integer value to the asset.    | `meta_int = is_ad=1`    |
| **mix_atracks**    | Asset: Mixes multiple audio tracks together into a single track.      | `mix_atracks = 0=L,1=R,2=C,3=RL,4=RR,5=LFE`      |
| **multibot**       | Directory Monitoring: Indicates whether multiple instances of Slicebot are monitoring the same directory.       | `multibot = 1`    |
| **notify_retries** | Notifications: Determines the maximum number of attempts to send out a HTTP notification before moving to the next file. | `notify_retries = 10`   |
| **notify_retry_wait** | Notifications: Determines the number of seconds to wait after a failed notification before retrying.  | `notify_retry_wait = 30`|
| **password**   <br />Deprecated    | Deprecated: Defines the password corresponding to the user.  | `password = 1@D208PneG63f` |
| **poster**         | Asset: Generates a poster image from the video frame at the specified time.  | `poster = 5000`   |
| **poster_file**    | Asset: Sets the asset's poster image to the specified file. | `poster_file = /images/poster.png`|
| **poster_size**    | Asset: Sets the size of the poster image.    | `poster_size = 512x512`|
| **require_captions** | Processing Prerequisite: Determines whether a closed captioning file is required.| `require_captions = 1` |
| **require_config** | Processing Prerequisite: Determines whether a file-specific configuration file is required.  | `require_config = 1`   |
| **skip_drm**       | Asset: Determines whether the asset's playback URLs must be signed.   | `skip_drm = 1`    |
| **start_url**      | Defines the URL for HTTP POST requests when slicing is initiated on a file. | `start_url = http://myserver.net/myservice`       |
| **thumbnails**     | Asset: Adds one or more thumbnails.  | `thumbnails = tiny:50x50,med:400x400`   |
| **timedmeta**      | Asset: Adds timed metadata at the specified time.  | `timedmeta = 0:TIT2=MyTitle, 2000:TCOM=Myself`   |
| **trim** | Asset: Trims the content from the source media that occurs prior to the specified start time.| `trim = 3000,52500`    |
| **username**   <br />**Required**    | Authorization: Defines the user name for the account to which the asset will be uploaded.   | `username = joe@example.com`|

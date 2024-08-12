---
title: VOD
---

On-demand content may be added through one of the following methods:

- [Manually through the **VOD Uploader**](/uplynk/acquire/vod/add_content/#add-content-through-vod-uploader)
- [Manually through the **Slicer**](/uplynk/acquire/vod/add_content/#add-content-through-command-line)
- [Automatically through **Slicebot**](/uplynk/acquire/vod/automation_via_slicebot)

The Slicer processes on-demand content and sends it to the cloud for encoding, while Slicebot automates this process by monitoring a directory for new files.

<Info>The Slicer installation includes Slicebot.</Info>

## Perform Pre-Installation Tasks  {/*perform-pre-installation-tasks*/}

Perform the following steps before installing the Slicer/Slicebot:

1. Verify that the desired computer meets or exceeds the minimum system requirements.
2. View minimum and certified hardware/software specifications.

### Minimum System Requirements  {/*minimum-system-requirements*/}

The minimum system requirements for the computer hosting the Slicer are provided below.

|**Requirement** | **Description**|
|--- | ---|
|OS | Windows or macOS|
|Ports | Outbound connections on 80 and 443|
|Format | The Slicer is compatible with standard audio/video file formats (e.g., mov, |mpeg/mpg, avi, m4v, and mkv). [Learn more](#add-content).|
|Upload Bandwidth | Your upload bandwidth should exceed the bandwidth generated for the top ray by 25%. Your top ray's resolution and frames per second (FPS) varies by encoding profile. For example, the default [encoding profile](/uplynk/acquire/encoding_profiles) (i.e., HD 720p25/30) requires 5 Megabits per second (Mbps). <Warning>Insufficient bandwidth may prevent your on-demand content from being uploaded.</Warning>|

### Certified Hardware/ Software Specification  {/*certified-hardware-software-specification*/}

The Slicer has been certified for use with the following specification:

|**Type** | **Requirement**|
|--- | ---|
|Server | Dell R740 or Dell R640|
|CPU | Intel 4110|
|RAM | 96 GB or more|
|Storage | 2x Micron 5100 960GB SSD|
|NIC | Intel Ethernet Converged Network Adapter X520 - Dual-Port 10 Gigabit|
|Maximum Concurrent Sessions | 10|
|OS | Ubuntu 16.04 LTS|
|Kernel | 4.15|
|Bios | 1.6.11|
|GPU | Nvidia T4 (Driver Version: 384.130)|

### Configure Firewall and Confirm System Time  {/*configure-firewall-and-confirm-system-time*/}

- Your firewall must allow outbound connections on ports 80 and 443.

    <Info>The Slicer relies on ports 80 and 443 to communicate with our services and to upload encrypted slices for encoding.</Info>

- Verify that the system time on the computer hosting the Slicer is accurate.

## Install or Upgrade a Slicer / Slicebot  {/*install-or-upgrade*/}

1. Download the Slicer by clicking **Downloads** from the bottom right-hand corner of the CMS and then clicking either **Mac Slicer** or **Windows Slicer**.

2. Perform one of the following steps:

   - **Windows**:
     1. Extract the zip file to the desired directory.
     2. Add a shortcut to the task bar or the Start menu by right-clicking on `SlicerWPF.exe` and then selecting either **Pin to Taskbar** or **Pin to Start Menu**.

   - **macOS**:
     1. Unzip the archive to the desired folder and then move the Slicer application to the **Applications** folder.
     2. Unzip the Slicer package by either double-clicking it or running `unzip` from the command line.

## Load the Slicer  {/*load-the-slicer*/}

Load the Slicer by performing one of the following:

- **Windows**:
  - If it was pinned to either the taskbar or the Start menu, simply click on the Slicer icon.
  - Otherwise, double-click the executable from the location to which it was extracted.

- **macOS**:
  - Double-click it from the **Applications** folder.

  <Tip>If the Slicer application cannot be opened due to a security configuration, try opening it while holding down the **Control** key.</Tip>

## Authenticate  {/*authenticate*/}

Upon loading the Slicer, it will prompt for CMS credentials. It will use these credentials to communicate with our services and to upload content.

## Stream On-Demand Content  {/*stream-on-demand-content*/}

Learn how to make content stored in the library available on-demand to your viewers.

This tutorial provides step-by-step instructions on how to test on-demand streaming without security. Once you have mastered this technique, refer to our media player tutorials to learn how to [add a media player to a web page](/uplynk/deliver/media_player/add_media_player_to_web_page).

**Software Prerequisites**

- **Windows**
  Or
- **macOS**

((Knowledge Prerequisites))

- Basic understanding of **Windows**
  Or
- Basic understanding of **macOS**

**Key Steps**

1. Install the Slicer on a computer running Windows or macOS.
2. Use the Slicer to add on-demand content to the library.
3. Test the playback of the uploaded content.

### Step 1 - Set Up an Account and Sign in  {/*step-1*/}

An account is required to stream content via our service. [Learn more](/uplynk/overview/portal).

Sign in to the [CMS](https://cms.uplynk.com/).

### Step 2 - Install the Slicer  {/*step-2*/}

The Slicer is a Windows/macOS application that slices, encodes, and uploads media to the cloud.

1. Download the Slicer by clicking **Downloads** from the bottom right-hand corner of the CMS and then clicking either **Mac Slicer** or **Windows Slicer**.

2. Perform one of the following steps:

   - **Windows**:
     1. Extract the zip file to the desired directory.
     2. Optional. Add a shortcut to the task bar or the Start menu by right-clicking on `SlicerWPF.exe` and then selecting either **Pin to Taskbar** or **Pin to Start Menu**.

   - **macOS**: Unzip the archive to the desired folder and then move the Slicer application to the **Applications** folder.
     <Tip>Unzip the Slicer package by either double-clicking it or running `unzip` from the command line.</Tip>

### Step 3 - Add Content to the Library  {/*step-3*/}

Before on-demand content may be streamed to your viewers, it must first be added to the library via the Slicer.

<Info>Content added to the library is known as an asset.</Info>

1. Load the Slicer.

   - **Windows**: Load the Slicer by double-clicking `SlicerWPF.exe`.<br /><Tip>If a task bar or Start menu shortcut was created, then launch it using that shortcut instead.</Tip>

   - **macOS**: If the Slicer application cannot be opened due to a security configuration, try opening it while holding down the **Control** key.

2. Drag and drop the desired media file onto the Slicer.

   <Info>The Slicer accepts most common video formats (e.g., mp4, mpg, avi, mkv, mov, etc.).</Info>

3. A progress bar will track as the Slicer slices, encodes, and then uploads media to the cloud. The Slicer will indicate when the entire asset has been uploaded to the library.

### Step 4 - Test Playback  {/*step-4*/}

The CMS provides a media player through which playback may be tested.

<Tip>A link to an unprotected media player that has been exposed to unauthorized individuals may be [invalidated at any time](/uplynk/deliver/playback_urls/#exceptions).</Tip>

1. From the Slicer, follow the **View in CMS** link that appears after the asset has been uploaded.

   - The CMS will be loaded in the default browser. If prompted, sign in to the CMS.
   - The library will be filtered to only display the asset that was just uploaded to it. Select that asset.

2. Click the **Playback** tab.

3. From the **Test Players** section, follow the **View** link corresponding to the desired test player.

   - The test player will stream the selected on-demand content in a new browser window or tab.

Please refer to our media player tutorials to learn how to [add a media player to a web page](/uplynk/deliver/media_player/add_media_player_to_web_page) and our security tutorials to learn how security may be integrated with content playback.

## More Information  {/*more-information*/}

- [Adding On-Demand Content](/uplynk/acquire/vod/add_content)
- [Media Player Setup](/uplynk/deliver/media_player)

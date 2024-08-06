---
title: Ad Parameters for Playback URLs
---

Ad-specific customization parameters are organized according to the following categories:

- [General Ad Parameters](#general-ad-parameters)
- [Verizon Media Ad Platform Video SSP](/uplynk/monetize/ads/verizon_media_ad_platform)
- [Google Ad Manager](/uplynk/monetize/ads/google_ad_manager)
- [FreeWheel](/uplynk/monetize/ads/freewheel)

## General Ad Parameters  {/*general-ad-parameters*/}

Ad parameters that apply to all ad decision servers are described below.

| Parameter | Description |
|---|---|
| ad | Identifies the [ad configuration](/uplynk/monetize/ads) that determines the ad decision server from which ads will be obtained during playback.<ul><li>Specifying an ad configuration that does not exist will prevent playback.</li><li>Omitting this parameter allows playback without ads.</li></ul><br /><br />**Example:**<br />`ad=fw2` |
| ad._debug | Tags a playback session for the purpose of tracking [ad insertion data](/uplynk/monetize/ads/ad_insertion_data). Set this parameter to the desired tag.<br /><br />**Example:**<br />`ad._debug=campaign2` |
| ad.breakend | Prevents ads from exceeding an ad break's duration. Valid values are:<br />`chop, drop`<br /><br />Passing this parameter also affects how ad break duration is calculated. Specifically, it reduces the duration of the ad break by the number of seconds that the current playback session is behind [playback delay](/uplynk/delivery/playback_urls/general_parameters).<br /><br />[Learn more about ad break duration adjustments](/uplink/monetize/ads/#ad-break-duration-calculation).<br /><br />**chop**<br />Switches over to content upon reaching an ad break's adjusted duration.<ul><li>Once the ad break's adjusted duration is reached, the stream will cut back over to content regardless of whether that causes the ad to only be partially played.</li><li>An ad may extend slightly beyond an ad break.</li></ul>[Learn more](/uplynk/monetize/ads/#ad-chopping-example).<br />**Syntax**: `ad.breakend=chop`<br /><br />**drop**<br />Drops ads that exceed the adjusted ad break duration. If the ad break's requested duration has been exceeded, then the stream will cut back over to content. Otherwise, slate will be played until the end of the ad break.<br />Slate may extend slightly beyond an ad break. [Learn more](/uplynk/monetize/ads/#ad-chopping-example).<br />**Syntax**: `ad.breakend=drop` |
| ad.caid | **Multiple asset playback URLs only**<br />Defines the asset ID that will be sent to an ad decision server.<br />**Default behavior**: Our system sends the ID of the first asset listed in the playback URL to the ad decision server. Use this parameter to send a different asset ID to the ad decision server. |
| ad.cping | Set this parameter to 1 to enable the [Ping API](https://docs.edgecast.com/video/Content/Develop/Pingv2.htm).<br />**Example:** `ad.cping=1` |
| ad.flex | Set this parameter to the number of seconds that an ad break may extend beyond an ad break's duration.<br />Use this parameter to introduce flexibility for the enforcement of ad.breakend's chop and drop modes.<br />**Syntax**: `ad.flex=Seconds`<br />**Default value**: 4 seconds<br />[Learn more](/uplynk/monetize/ads/#chopping-and-dropping-ads). |
| ad.kv | Defines the key-value pairs that will be sent to the ad decision server. Use commas to separate keys and values.<br />**Example:**<br />`ad.kv=key1,value1,key2,value2` |
| ad.Parameter | Pass ad decision server-specific parameters to the ad decision server.<br />This parameter requires the ad parameter.<br />The ad. prefix is removed from the name that is passed to the ad decision server when acquiring ads for playback. In the following example, our system will pass the account and ctxid parameters to the ad decision server.<br />**Example:**<br />`ad.account=vz1234&ad.ctxid=MA_99_174` |
| ad.prbd | Set this parameter to the name of the Prebid configuration that identifies your Prebid server and provides bidding instructions.<br />[Learn more](/uplynk/monetize/ads/#prebids).<br />**Syntax**: `ad.prbd=Prebid Config Name`<br />**Example:** `ad.prbd=myPrebidServer` |
| is_ad | Manually forces an asset to be reported as an ad in the [asset_play_started event (push logs)](/uplynk/analyze/log_file_delivery/#asset-play-started).<br />This parameter is unnecessary when the system automatically inserts ads.<br />This parameter is useful when ads are managed and inserted by an external system, since it allows our push logs to reflect that the asset was played back as an ad.<br />**Example:** Report playback as an ad in the push logs: `is_ad=1` |

## Verizon Media Ad Platform Video SSP  {/*verizon-media-ad-platform*/}

[View Verizon Media Ad Platform Video SSP-specific parameters](/uplynk/monetize/ads/verizon_media_ad_platform).

## Google Ad Manager  {/*google-ad-manager*/}

[View Google Ad Manager-specific parameters](/uplynk/monetize/ads/google_ad_manager).

## FreeWheel  {/*freewheel*/}

[View FreeWheel-specific parameters](/uplynk/monetize/ads/freewheel).

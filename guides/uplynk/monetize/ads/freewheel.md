---
title: Freewheel
---

Learn how to define the following FreeWheel ad configurations:

1. Set a FreeWheel `GET` ad request URL.
2. Define where ads may be placed within your content.
3. Pass the desired key/value pairs to FreeWheel. These key/value pairs allow you to send or receive information from FreeWheel that describes the content currently being streamed.
4. Pass additional parameters through which you may customize the data provided to FreeWheel and the ads it provides.

## FreeWheel Ad Requests  {/*freewheel-ad-requests*/}

Upon setting the Server URL parameter, our service constructs the following GET request in order to request ads for your content:

`http://[customerId].v.fwmrm.net/ad/g/1?[globalParams];[keyValues];[ParamsForSlot1];[ParamsForSlot2];...;[ParamsForSlotN];`

The query string for the above request is constructed according to the parameters passed to our service as described below.

- **[globalParams]**: Most of the parameters described in the FreeWheel Ad Parameters section will be applied globally to all ad units.
- **[keyValues]**: The Key-Value Pairs parameter (`ad.kv`) defines key-value pairs that may either be passed or retrieved from FreeWheel.
- **[ParamsForSlotN]**: The Ad Units parameter (`ad.slau`) determines whether we add slot-specific parameters (i.e., `[ParamsForSlot1];[ParamsForSlot2];...;[ParamsForSlotN];`) to the above query string.

### Toggle Ad Units  {/*toggle-ad-units*/}

Ad placement is handled slightly differently between live and on-demand streaming.

#### Live Streaming  {/*live-streaming*/}

Toggle ad units by setting the Ad Units parameter (`ad.slau`) to a comma-separated list of ad unit types. Only ad unit types that are defined within this parameter will be requested.

**Example:**

The following value will only request mid-roll ads during this playback session of the live stream.

`ad.slau=,midroll`

#### On-Demand Content  {/*on-demand-content*/}

By default, ads will be requested for pre-roll, mid-roll, and post-roll ad units.

## FreeWheel Ad Parameters  {/*freewheel-ad-parameters*/}

This section describes parameters that our service will insert into the GET request sent to the FreeWheel ad server.

| Name| Parameter | Description|
|----------|-----------|------|
| Server URL| ad.serverurl       | **Required**<br /> Defines the base URL to the desired FreeWheel ad decision server. <br />**Example**: `ad.serverurl=http://g1.v.fwmrm.net/ad/p/1?` A default value for this parameter may be defined from within the CMS. This parameter takes precedence over the Customer ID parameter (ad.customer_id). Learn how to set a default value for this parameter.|
| Location Description (Custom Site Section ID) | ad.locationDesc  | **Required**<br /> Defines a description for the playback location. <br />**Example**: `ad.locationDesc=web` Learn how to set a default value for this parameter. This parameter takes precedence over the Custom Site Section ID parameter (`ad.csid`). |
| Network ID| ad.nw   | **Required**<br /> Sets the distributor’s FreeWheel network ID (`adRequest@networkId`). <br />**Example**: `ad.nw=14611` Learn how to set a default value for this parameter.|
| Player Profile     | ad.prof | **Required**<br /> Sets the player's profile (`adRequest@profile`). <br />**Example**: `ad.prof=14611:Vod` Learn how to set a default value for this parameter.|
| Maximum Pre-Roll Ads | ad.pre_maxads      | Sets the maximum number of pre-roll ad units that may be returned by the ad server.      |
| Minimum Pre-Roll Duration     | ad.pre_mind| Sets the minimum duration, in seconds, for pre-roll ad units within a live stream. This duration is only used when the duration of the ad unit is unknown. This parameter only supports integers. <br />**Example**: `ad.pre_mind=15` |
| Maximum Pre-Roll Duration     | ad.pre_maxd| Sets the maximum duration, in seconds, for pre-roll ad units within a live stream. This parameter only supports integers. <br />**Example**: `ad.pre_maxd=50`     |
| Pre-Roll Duration  | ad.predur | **Required for Live Streaming Only** Sets the duration, in seconds, of a live stream's pre-roll ad unit. <br />**Example**: `ad.predur=45` |
| Duration| ad.rdur | Defines a default duration. This duration is only applicable for ad breaks without an explicitly defined duration. <br />**Default Value**: 240 <br />**Example**: `ad.rdur=120`|
| Minimum Mid-Roll Duration     | ad.mind | Sets the minimum duration, in seconds, for mid-roll ad units within a live stream. This duration is only used when the duration of the ad unit is unknown. This parameter only supports integers. <br />**Example**: `ad.mind=15` <br />**Default Value**: The default minimum duration is set by the Duration parameter (ad.rdur). If it is not set, then the default duration is determined by the duration passed to the Live Slicer.  |
| Maximum Mid-Roll Duration     | ad.maxd | Sets the maximum duration, in seconds, for mid-roll ad units within a live stream. This parameter only supports integers. <br />**Example**: `ad.maxd=50` <br />**Default Value**: By default, the maximum duration is the duration passed to the Live Slicer. |
| Use Live Break Duration       | ad.ulbd | Sets ad unit duration for on-demand content to the duration defined when the source live stream was sliced. Set this parameter to 1. <br />**Example**: `ad.ulbd=1`|
| Mode| ad.mode | Overrides the default request mode (`adRequest@mode`) for ad units. Valid values are: `live | ondemand` Learn how to set a default value for this parameter.  |
| Flags | ad.flags| Enables one or more flag(s) that define the player's capabilities. This value should be URL encoded. <br />**Example**: `ad.flags=+play+sync` Specified Flags Only: Only enable specific flags by setting this parameter to a colon followed by the desired set of flags. <br />**Example**: `ad.flags=:+amcb`|
| Suppress supportsSlotTemplate | ad.suppress_pre_sltp | Removes supportsSlotTemplate from the pre-roll ad request.      |
| Advanced Callbacks | ad.ametr| Allows FreeWheel to use impressions with advanced callbacks. Set this flag to 1. <br />**Example**: `ad.ametr=1`|
| HyLDA | ad.hylda| Activates FreeWheel’s HyLDA feature. Set this flag to 1. <br />**Example**: `ad.hylda=1`|
| Acid| ad.acid | Adds Acid as a value in the HyLDA keyword. This parameter is only applicable when the HyLDA flag has been enabled. <br />**Example**: `ad.acid=Acid`   |
| Default Ad Capabilities       | ad.metr | Defines the default capabilities for all ads. Set this parameter to an integer that maps bits to capabilities. <br />**Example**: `ad.metr=8` <br />**Default Value**: 7    |
| Asset Network ID   | ad.asnw | Adds a video asset network ID (`videoAsset@videoAssetNetworkId`) to the FreeWheel GET ad request. <br />**Example**: `ad.asnw=14611k`   |
| Custom Asset ID    | ad.caid | Sets the custom asset ID (`videoAsset@customId`) that will be included with the FreeWheel GET ad request. Syntax: `@[Key-Value-Name]` Sends the value assigned to an asset's key-value pair to FreeWheel. <br />**Example**: `ad.caid=@custom_id` |
| Key-Value Pairs    | ad.kv   | Passes or retrieves key-value pair(s) using the FreeWheel GET ad request. <br />**Example**: `ad.kv=key_1,value_1,key_2,value_2`       |
| Key-Value Separator| ad.kvsep| Determines the delimiter that must be used when defining key-value pairs through the Key-Value Pairs parameter. <br />**Example**: `ad.kvsep=/` <br />**Default Value**: ,  |
| Site Section Network ID       | ad.ssnw | Sets the site section network ID (`siteSection@siteSectionNetworkId`) included with the FreeWheel GET ad request. <br />**Example**: `ad.ssnw=112233` |
| Video Asset Fallback ID       | ad.afid | Sets the video asset fallback ID (`videoAsset@fallbackId`) included with the FreeWheel GET ad request. This ID is used when an ad request's video asset ID is not recognized. <br />**Example**: `ad.afid=AssetFallBackId`|
| Visitor Custom ID  | ad.vcid | Sets the visitor's custom ID included with the FreeWheel GET ad request. This ID is the equivalent to the visitor/@customId attribute in the XML request. <br />**Example**: `ad.vcid=CustomVisitorID`      |
| Site Section Fallback ID      | ad.sfid | Sets the site section fallback ID included with the FreeWheel GET ad request. This ID is used when an ad request's site section ID is not recognized. <br />**Example**: `ad.sfid=global`   |
| Pre-Roll Ad Unit   | ad.preroll| Requests a pre-roll ad unit. Set this parameter to 1. <br />**Example**: `ad.preroll=1` <br />**Default Value**: 0     |
| Ad Units| ad.slau | Determines whether pre-roll, mid-roll, and post-roll ad units will be requested from FreeWheel. Valid values are: `preroll, midroll, postroll`|
| Asset Duration     | ad.vdur | Overrides an asset's duration (`videoAsset@duration`). <br />**Example**: `ad.vdur=3600` |
| Tag (FreeWheel Ad Request)    | ad.tag  | Sets a FreeWheel GET ad request URL that will be used instead of a POST Smart XML request. <br />**Example**: `ad.tag=http://demo.v.fwmrm.net/ad/g/1?...`|
| Primary Content Type | ad.prct | Defines a global primary content type for all non-temporal, user-generated ad units. <br />**Example**: `ad.prct=text/html_lit_js_wc_nw` <br />**Default Value**: `text/html_lit_js_wc_nw`  |
| Client IP Address  | ad.vip  | Overrides the client's IP address that will be included with the FreeWheel GET ad request. <br />**Example**: `ad.vip=192.168.1.1` <br />**Default Value**: The IP address of the device that requested the playback of your content. |
| Client Referrer    | ad._fw_h_referer   | Overrides the Referer header value that will be included with the FreeWheel GET ad request. <br />**Example**: `ad._fw_h_referer=http://www.sampledomain.com` <br />**Default Value**: By default, the value of the Referer header included with the playback request will be included with the FreeWheel GET ad request.|
| Client User Agent  | ad._fw_h_user_agent | Overrides the value of the User-Agent header that will be included with the FreeWheel GET ad request. <br />**Example**: `ad._fw_h_user_agent=user-agent%3A%20Mozilla%2F5.0%20...` <br />**Default Value**: By default, the playback request's User-Agent header value will be included with the FreeWheel GET ad request.       |
| Customer ID| ad.customer_id     | **Required when Server URL is undefined.** The Server URL parameter (`ad.serverurl`) takes precedence over this parameter. This parameter should not be specified if you plan on passing the Server URL parameter. <br />**Example**: `ad.customer_id=demo`   |
| Custom Site Section ID| ad.csid | **Required when Location Description is undefined.** The Location Description parameter (`ad.locationDesc`) takes precedence over this parameter. This parameter should not be specified if you plan on passing the Location Description parameter. <br />**Example**: `ad.csid=web`    |
| End-User ID| ad.euid | The Visitor Custom ID parameter (`ad.vcid`) takes precedence over this parameter. This parameter should not be specified if you plan on passing the Visitor Custom ID parameter. <br />**Example**: `ad.euid=CustomVisitorID`       |
| Skip Preroll       | skippreroll| If the `ad.preroll=1` URL parameter is specified in the Uplynk playback URL, the URL parameter `skippreroll=1` forces Uplynk to look ahead in the stream and skip the pre-roll ad if the mid-roll is within 60 seconds of the stream start. Example: `skippreroll=1`|

## Enable FreeWheel Video View Feature  {/*enable-freewheel-video-view-feature*/}

The parameter to enable FreeWheel's Video View by Callback feature varies depending on the version of the ping API being used. This feature requires the use of both the Preplay and Ping APIs.

- **Version 3**: If you are using version 3 of the ping API (the current version), add `2` to the value of the `ad.pingf` parameter in your preplay request. (See the "Calculating the pingf Parameter" section of the Features portion of the ping API v3 documentation.)
- **Version 2**: If you are using version 2 of the ping API (a past version), include the `ad.svv=1` parameter in your preplay request.

This feature also requires using the Smart XML response type, as Video Views are not supported by VAST.

## FreeWheel Creative Parameters  {/*freewheel-creative-parameters*/}

An ad response sent by FreeWheel may include creative parameters such as:

- _fw_ad_position_in_pod
- _fw_ad_title
- _fw_ad_unit_name
- _fw_advertiser_name
- _fw_asset_thumbnail_url
- _fw_campaign_name
- _fw_creative_name
- hulu_industry
- moat

These creative parameters are automatically included in preplay and ping responses to the client. The client may then leverage these parameters for use with a custom integration (e.g., integration of FreeWheel with Moat Analytics).

## Ad Configuration  {/*ad-configuration*/}

An ad configuration allows you to define default values for use with third-party ad servers (e.g., FreeWheel).

Define an ad configuration by performing the following steps:

1. Navigate to the [**Ad Server**](https://cms.uplynk.com/static/cms2/index.html#/settings/ad-server) page via **Settings** > **Ad Server**.
2. Click **+ Ad Config**.
3. In the **Ad config name** option, type the name that will be assigned to your ad configuration.
4. From the **Select ad server** option, select "FreeWheel."
5. Click **Create**.
6. In the **serverURL** option, type your FreeWheel `GET` ad request URL.
7. In the **networkID** option, type the distributor’s FreeWheel network ID (`adRequest@networkId`).
8. Define default values for any other desired FreeWheel parameters.
9. Click **Save**.

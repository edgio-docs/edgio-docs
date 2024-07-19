---
title: Google Ad Manager
---

Use Google Ad Manager (formerly known as DoubleClick for Publishers) to integrate ads into your content.

[Learn how to get started](/uplynk/monetize/ads).

### Ad Requests

Google Ad Manager has specific URL requirements for ad requests that meet the following criteria:

- Initial and wrapper requests that start with the following base URL:
  `http://pubads.g.doubleclick.net/gampad/live/ads`
  `http://pubads.g.doubleclick.net/gampad/ads`

- Wrapper requests that start with the following base URL:

    `http://ad.doubleclick.net/`

Our service performs the following modifications to ad requests that meet the above requirements:

- **Scheme Substitution:** Our service substitutes `http://` with `https://`.
- **Domain Substitution:** Our service substitutes the domain with `serverside.doubleclick.net`.
- **Query String Parameter:** Our service adds the impression pinging entity query string parameter (`ipe=ssb`) when the `sssb=1` query string parameter is missing from the initial ad request.

#### Initial Ad Request Examples

| Request URL (Initial) | Replacement URL (Initial) |
|---|---|
| http://ad.doubleclick.net?parameter1=value1 | http://ad.doubleclick.net?parameter1=value1 |
| http://pubads.g.doubleclick.net/gampad/ads?parameter1=value1 | https://serverside.doubleclick.net/gampad/ads?parameter1=value1&ipe=ssb |
| http://pubads.g.doubleclick.net/gampad/ads?parameter1=value1&sssb=1 | https://serverside.doubleclick.net/gampad/ads?parameter1=value1 |
| http://pubads.g.doubleclick.net/gampad/live/ads?parameter1=value1 | https://serverside.doubleclick.net/gampad/live/ads?parameter1=value1&ipe=ssb |

#### Wrapper Request Examples

| Initial Request (sssb=1) | Request URL (Wrapper) | Replacement URL (Wrapper) |
|---|---|---|
| Present | http://ad.doubleclick.net?parameter1=value1 | https://serverside.doubleclick.net?parameter1=value1 |
| Missing | http://ad.doubleclick.net?parameter1=value1 | https://serverside.doubleclick.net?parameter1=value1&ipe=ssb |
| Present | http://pubads.g.doubleclick.net/gampad/ads?parameter1=value1 | https://serverside.doubleclick.net?parameter1=value1 |
| Missing | http://pubads.g.doubleclick.net/gampad/ads?parameter1=value1 | https://serverside.doubleclick.net?parameter1=value1&ipe=ssb |

## Ad Parameters

Google Ad Manager parameters are described here.

| Parameter | Description | Behavior |
|---|---|---|
| ad.adUnit<br /><span style="color:red">Required</span> | Identifies the directory path to an ad unit.<br />Example:<br />`ad.adUnit=/dfp_ads` |   |
| ad.networkID<br /><span style="color:red">Required</span> | Identifies the network ID for the Google account.<br />Example:<br />`ad.networkID=12345` |   |
| ad.output<br /><span style="color:red"><span style="color:red">Required</span></span> | Indicates the response format. Valid values are:<br />`xml_vast3 \| xml_vast2 \| xml_vmap1`<br /><Info>VOD Only<br />Selecting a VAST format (i.e., `xml__vast3` or `xml_vast2`) for a VOD playback session causes our service to create a VMAP template. This allows our service to manage all of the ad requests within that VOD asset across all ad breaks.</Info><br />Example:<br />`ad.output=xml_vmap1` | Passes unaltered to the ad server. |
| ad.serverUrl<br /><span style="color:red">Required</span> | Identifies the URL to the Google ad decision server.<br />Example:<br />`ad.serverUrl=http://pubads.g.doubleclick.net/gampad/ads?` |   |
| ad.sz<br /><span style="color:red">Required</span> | Indicates the size of the master video ad slot.<br />Example:<br />`ad.sz=640x480` | Passes unaltered to the ad server. |
| ad.ad_rule | Determines whether video ad requests will be an ad rule request.<br />Valid values are:<br />**0**: VAST Template<br />**1**: Ad rules playlist<br />Example:<br />`ad.ad_rule=0` | Passes unaltered to the ad server. |
| ad.addtl_consent | Global Data Privacy Parameter. A string that contains a list of consented and/or disclosed Google ad technology providers (ATPs) that are not registered with IAB.<br />Example:<br />`2~1.35.41.101~dv.9.21.81 means that the user has consented to ATPs with IDs 1, 35, 41 and 101, ATPs with IDs 9, 21, and 81 have been disclosed to the user and the string is created using the format defined in the v2 specification.` | Passes unaltered to the ad server. |
| ad.an |   | Passes unaltered to the ad server. |
| ad.attmas |   | Passes unaltered to the ad server. |
| ad.ciu_szs | Identifies one or more companion sizes as a comma-separated list.<br />Example:<br />`ad.ciu_szs=728x90,300x250` | Passes unaltered to the ad server. |
| ad.cmsid | Identifies the CMS source ID for the system hosting video content for your network. Google automatically assigns one ID per content source. | Passes through a 'cmsid' parameter value. If the 'cmsid' value starts with '$' then we will look for a key in the asset's meta data and pull in its value. If the 'cmsid' value starts with '@' then we will look for a key in the asset itself and pull its value. Otherwise use the external_id on the asset if it exists, or the beam id. |
| ad.correlator |   | Passes through as 'same_scor', default to timestamp. |
| ad.cust_params | Defines custom targeting parameters.<br />Example:<br />`ad.cust_params=adrule=premidoptimizedpod` | Passes unaltered to the ad server. |
| ad.dc_lat |   | Passes unaltered to the ad server. |
| add.dc_rdid |   | Passes unaltered to the ad server. |
| ad.description_url | Identifies the URL of the page that contains the player that submitted the request. This URL should be specific to the video as opposed to the domain for all ad requests. |   |
| ad.env |   | Forced to vp. This is a static parameter that cannot be overwritten. |
| ad.excl_cat | Ad exclusion category. Blocks any line items containing the exclusion label from being eligible for a given ad request. Use this parameter in conjunction with the scp and `cust_params` parameters.<br />Example:<br />`&ad.scp=excl_cat%3Dairline_exclusion_label%7C` |   |
| ad.extcalls | Set it to liveconnect to Instruct Google Ad Manager to enable integration with LiveConnect.<br />Example:<br />`ad.extcalls=liveconnect` | Passes unaltered to the ad server. |
| ad.gdfp_req |   | Forced to 1. This is a static parameter that cannot be overwritten. |
| ad.gdpr | Global Data Privacy Parameter. Possible values: 0 / 1<br />0=GDPR does not apply.<br />1=GDPR applies.<br />Example:<br />`ad.gdpr=1` | Passes unaltered to the ad server. |
| ad.gdpr_consent | Global Data Privacy Parameter. URL-safe, base 64-encoded Transparency & Consent string. Only meaningful if gdpr=1.<br />Example:<br />`ad.gdpr_consent=1` | Passes unaltered to the ad server. |
| ad.gpp | Global Privacy Platform Parameter. This specifics the US-National Consent String and its value.<br />Example:<br />&ad.gpp=<GPP_Consent_String_Value>&ad.gpp_sid=<String_Type> | Passes unaltered to the ad server. |
| ad.gpp_sid | Global Privacy Platform Parameter. This specifies the GPP consent string type.<br />Example:<br />`&ad.gpp=<GPP_Consent_String_Value>&ad.gpp_sid=<String_Type>` | Passes unaltered to the ad server. |
| ad.hl | Identifies the language code used to request the ads.<br />Example:<br />`ad.hl=it`<br />Default value:<br />`en` | Passes unaltered to the ad server. |
| ad.idtype | Identifies the type of device.<br />Key information:<br />This parameter is required for frequency capping.<br />This parameter requires the ad.is_lat and ad.rdid parameters.<br />Valid case-sensitive values are:<br />idfa: Apple phones (iOS)<br />tvOS: AppleTV (tvOS)<br />adid: Android and Chromecast<br />rida: Roku<br />msai: Xbox<br />Example:<br />`ad.idtype=adid` | Passes unaltered to the ad server. |
| ad.impl |   | Forced s. This is a static parameter that cannot be overwritten. |
| ad.is_lat | Determines whether the Limit Ad Tracking (LAT) will be enabled. LAT allows users to opt-out from user behavior-based ad targeting.<br />**Key information:**<br />This parameter is required for frequency capping.<br />This parameter requires the `ad.rdid` and `ad.idtype` parameters.<br />Valid values are:<br />0: Disables LAT.<br />1: Enables LAT.<br />Example:<br />`ad.is_lat=1` | Passes unaltered to the ad server. |
| ad.ipe |   | Forced to ssb when using a cert. |
| ad.iu |   | Combines two other passed in parameters, networkid and adunit. "/networkidadunit". |
| ad.lip | Required for a request from the last position in a standardized ad pod.<br />Example:<br />ad.lip=true | Passes unaltered to the ad server. |
| ad.ltd | The limited ads parameter accepts a constant value that indicates whether to serve ads in a limited way in the absence of consent for the use of cookies or other local identifiers. Unlike other URL parameters, setting ltd=1 changes the behavior of the IMA SDK to treat the request as ID-less and to disallow storage.<br />Example:<br />ltd=1 | Passes unaltered to the ad server. |
| ad.max_ad_duration | Required for min_ad_duration.<br />Determines the ad's maximum duration in milliseconds. Use this parameter when requesting a single ad.<br />Example:<br />ad.max_ad_duration=60000 | Passes unaltered to the ad server. |
| ad.min_ad_duration | Required for max_ad_duration.<br />Determines the ad's minimum duration in milliseconds. Use this parameter when requesting a single ad.<br />Example:<br />ad.min_ad_duration=15000 | Passes unaltered to the ad server. |
| ad.mridx | Determines whether the request to the ad server will identify the current mid-roll ad break by its position within the current playback session. Include this information by setting this parameter to:<br />enabled<br />Example:<br />ad.mridx=enabled<br />#View deprecated behavior.<br />You may also pass the current mid-roll ad break's position within the current program by enabling the ad.pod parameter. | Gets the midroll ad break number for this session. |
| ad.msid |   | Passes unaltered to the ad server. |
| ad.nofb |   | Passes unaltered to the ad server. |
| ad.npa | Determines whether non-personalized ads will be requested. This parameter is required for compliance with the EU General Data Protection Regulation (GDPR).<br />Valid values are:<br />0: Indicates that the ad request is eligible for personalized ads.<br />1: Indicates that the ad request should only serve non-personalized ads.<br />Example:<br />ad.npa=1 | Passes unaltered to the ad server. |
| ad.omid_p |   | Passes unaltered to the ad server. |
| ad.paln | Pass client data to Google Ad Manager. | Passes unaltered to the ad server. |
| ad.pmad | Determines the maximum number of ads in a pod.<br />Example:<br />ad.pmad=4 | Passes unaltered to the ad server. |
| ad.pmnd |   | Passes unaltered to the ad server. |
| ad.pmxd |   | If live, this value will be the ad break duration sent to the slicer, or will default to 4 minutes. For vod, this passes unaltered to the ad server.. |
| ad.pod | Determines whether the request to the ad server will identify the current mid-roll ad break by its position within the current program. Use this parameter for competitive exclusions, frequency capping, and related features. Include this information by setting this parameter to:<br />enabled<br />By default, the position of the current mid-roll ad break is calculated based off of the ad breaks detected within the asset corresponding to the current program. However, you may manually indicate this information within a live event by setting the breakSeq metadata field to a 1-based index value that identifies the current mid-roll ad break's position within the current program (e.g., 1 = first pod, 2 = second pod, and 3 = third pod).<br />Use the breakSeq metadata field to ensure data consistency when restarting or switching between Live Slicers.<br />Pass metadata (e.g., breakSeq) via the add_meta endpoint in the Live Slicer API.<br />Example:<br />ad.pod=enabled<br />#View deprecated behavior.<br />You may also pass the current mid-roll ad break's position within the current playback session by enabling the ad.mridx parameter. | Set by Uplynk system based on the slicer's count of the ad breaks. |
| ad.postroll | Determines whether playback will include a post-roll.<br />Valid values are:<br />1: True<br />0: False<br />Example:<br />ad.postroll=1 |   |
| ad.pp | Identifies a video creative profile that determines which creatives are eligible to be served.<br />Example:<br />ad.pp=video_creative_profile | Passes unaltered to the ad server. |
| ad.ppid | Indicates a Publisher Provided Identifier (PPID). Google Ad Manager uses this ID for frequency capping, audience segmentation and targeting, sequential ad rotation, and other audience-based ad delivery controls across devices. | Passes unaltered to the ad server. |
| ad.ppos | Represents the position within a pod. This value is a 1-based index (e.g., 1 = first position, 2 = second position, and 3 = third position). This parameter is required for companion autofill. Use this parameter for competitive exclusions, frequency capping, and related features.<br />Example:<br />ad.ppos=2 | Passes unaltered to the ad server. |
| ad.preroll | Determines whether playback will include a pre-roll.<br />Valid values are:<br />1: True<br />0: False<br />Example:<br />ad.preroll=1 |   |
| ad.rdid | Identifies a device by its identifier (e.g., Google AdID, Apple IDFA, Roku RIDA, or Xbox MSAI).<br />Key information:<br />This parameter is required for frequency capping.<br />This parameter requires the ad.is_lat and ad.idtype parameters.<br />This ID may be updated by the user at any time.<br />Example:<br />ad.rdid=123e4567-e89b-12d3-a456-426%20655440000 | Passes unaltered to the ad server. |
| ad.scor | An integer generated for each video stream; the number needs to be the same within a stream and unique within a pageview. Use this parameter for competitive exclusions, frequency capping, and related features when a user is watching multiple videos on the same page.<br />Example:<br />&scor=17 | Passes through as 'same_scor', default to timestamp. |
| ad.scp | Identifies slot-specific custom parameters.<br />Example:<br />ad.scp=excl_cat%3Dairline_exclusion_label%7C | Passes unaltered to the ad server. |
| ad.sdk_apis |   | Passes unaltered to the ad server. |
| ad.sdkv |   | Passes unaltered to the ad server. |
| ad.session_id | Identifies the playback session using a universally unique identifier (UUID). You may use this parameter to preserve the viewer's privacy when setting frequency caps for ad creatives.<br />Example:<br />ad.session_id=123e4567-e89b-12d3-a456-426614174000 |   |
| ad.sid |   | Passes unaltered to the ad server. |
| ad.ss_req |   | Passes through as 'same_scor', default to timestamp; defaults to 1; excluded on SSL Cert requests to GAM. |
| ad.ssss | Indicates the stitching partner.<br />Example:<br />ad.ssss=vdms | Forced to vdms. |
| ad.tag_for_child_directed_treatment tfcd |   | Passes unaltered to the ad server. |
| ad.tfcd | Determines whether an ad request requires child-directed treatment. This parameter is required for compliance with the Children's Online Privacy Protection Act (COPPA).<br />Valid values are:<br />0: Disables child-directed treatment.<br />1: Enables child-directed treatment.<br />Example:<br />ad.tfcd=1 |   |
| ad.unviewed_position_start |   |   |
| ad.u_paln |   | Passes unaltered to the ad server. |
| ad.url |   | Passes through as 'same_scor', default to timestamp; defaults to request referer. |
| ad.us_privacy | Identifies the viewer's privacy preference. This parameter is required for compliance with the California Consumer Privacy Act (CCPA).<br />Syntax:<br />ad.us_privacy=Privacy Preference<br />Example:<br />ad.us_privacy=1YNN | Passes unaltered to the ad server. |
| ad.vad_type | Determines whether a linear or non-linear ad should be returned for the request. Valid values are:<br />linear \| nonlinear<br />Example:<br />ad.vad_type=linear | Passes unaltered to the ad server. |
| ad.vid | Identifies the video content ID for the content currently being shown to the user. This ID is assigned by the CMS that hosts your content. In most cases, the video player will add this value to the ad tag dynamically, based on the editorial content. | Passes through a 'vid' parameter value. If the 'vid' value starts with '$' then we will look for a key in the asset's meta data and pull in its value. If the 'vid' value starts with '@' then we will look for a key in the asset itself and pull its value. Otherwise use the external_id on the asset if it exists, or the beam id. |
| ad.video_duration | Indicates the duration of the content in seconds.<br />Example:<br />ad.video_duration=9000 |   |
| ad.vid_d |   | Passes unaltered to the ad server. |
| ad.vip | Sets the viewer's IP address (IPv4) in the ad request.<br />Example:<br />ad.vip=101.55.55.22<br />Default value:<br />The request's remote IP address. | Passes through as 'same_scor', default to timestamp; defaults to request remoteIP. |
| ad.vpi | Converts an ad rule request into an inline VMAP request.<br />Example:<br />ad.vpi=1 | Passes unaltered to the ad server. |
| ad.vpos | Indicates whether the ad request is being sent from pre-roll,mid-roll or post-roll.<br />Default value:<br />By default, this parameter is set to the asset's external ID. If an external ID has not been defined, then it is set to the asset ID.<br />Example:<br />ad.vpos=preroll, midroll, postroll | Passes through as 'same_scor', default to timestamp; defaults to whether Uplynk is triggering it as a preroll or midroll. |
| skippreroll | If the ad.preroll=1 URL parameter is specified in the Uplynk playback URL, the URL parameter skippreroll=1 forces Uplynk to look ahead in the stream and skip the pre-roll ad if the mid-roll is within 60 seconds of the stream start.<br />skippreroll=1 | This URL parameter skips the pre-roll if the mid-roll ad is within 60 seconds of the stream start. |

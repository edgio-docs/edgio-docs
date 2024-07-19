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
| ad.output<br /><span style="color:red">Required</span> | Indicates the response format. Valid values are:<br />`xml_vast3 \| xml_vast2 \| xml_vmap1`<br /><Info>VOD Only<br />Selecting a VAST format (i.e., `xml__vast3` or `xml_vast2`) for a VOD playback session causes our service to create a VMAP template. This allows our service to manage all of the ad requests within that VOD asset across all ad breaks.</Info><br />Example:<br />`ad.output=xml_vmap1` | Passes unaltered to the ad server. |
| ad.serverUrl<br /><span style="color:red">Required</span> | Identifies the URL to the Google ad decision server.<br />Example:<br />`ad.serverUrl=http://pubads.g.doubleclick.net/gampad/ads?` |   |
| ad.sz<br /><span style="color:red">Required</span> | Indicates the size of the master video ad slot.<br />Example:<br />`ad.sz=640x480` | Passes unaltered to the ad server. |
| ad.ad_rule | Determines whether video ad requests will be an ad rule request.<br />Valid values are:<br />**0**: VAST Template<br />**1**: Ad rules playlist<br />Example:<br />`ad.ad_rule=0` | Passes unaltered to the ad server. |
| ad.addtl_consent | Global Data Privacy Parameter. A string that contains a list of consented and/or disclosed Google ad technology providers (ATPs) that are not registered with IAB.<br />Example:<br />`2~1.35.41.101~dv.9.21.81 means that the user has consented to ATPs with IDs 1, 35, 41 and 101, ATPs with IDs 9, 21, and 81 have been disclosed to the user and the string is created using the format defined in the v2 specification.` | Passes unaltered to the ad server. |
| ad.an |   | Passes unaltered to the ad server. |
| ad.attmas |   | Passes unaltered to the ad server. |
| ad.ciu_szs | Identifies one or more companion sizes as a comma-separated list.<br />Example:<br />`ad.ciu_szs=728x90,300x250` | Passes unaltered to the ad server. |
| ad.cmsid | Identifies the CMS source ID for the system hosting video content for your network. Google automatically assigns one ID per content source. | Passes through a `cmsid` parameter value. If the `cmsid` value starts with `$` then we will look for a key in the asset's meta data and pull in its value. If the `cmsid` value starts with `@` then we will look for a key in the asset itself and pull its value. Otherwise use the `external_id` on the asset if it exists, or the beam id. |
| ad.correlator |   | Passes through as `same_scor`, default to timestamp. |
| ad.cust_params | Defines custom targeting parameters.<br />Example:<br />`ad.cust_params=adrule=premidoptimizedpod` | Passes unaltered to the ad server. |

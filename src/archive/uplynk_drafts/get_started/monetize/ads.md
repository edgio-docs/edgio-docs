---
title: Ads
---

Monetize your content by inserting ads seamlessly into your live streams and video-on-demand (VOD) content. Our ad insertion service ensures a smooth transition between your content and advertisements, enhancing the viewing experience while maximizing your revenue potential.

## Live Streams  {/*live-streams*/}

- **Pre-roll Ads:** Play ads before the viewer joins the live stream.
- **Mid-roll Ads:** Play ads during the live stream at scheduled breaks. The player requests ads when an upcoming ad break is detected, and our service stitches them into the live stream.
- **Post-roll Ads:** Play ads after a live event.
- **Ad Retrieval:** Our service requests ads whenever it detects an upcoming ad break, ensuring timely and seamless ad insertion.

## Video On-Demand (VOD)  {/*vod*/}

- **Ad Configuration:** Upon initiating playback, our service determines the set of pre-roll, mid-roll, and post-roll ads to be stitched into your on-demand content.
- **Seamless Integration:** Ads are stitched into your content to provide a seamless transition, preventing ad blockers from blocking your ads.
- **Quality Upscaling:** Ads are automatically upscaled to the highest quality in your encoding profile without altering their frame rate.
- **Ad Retrieval:** Our service requests ads for all ad breaks upon initiating playback, ensuring a smooth and uninterrupted viewing experience.

## Use Cases  {/*ads-use-cases*/}

- **Pre-roll Ads for Live Streams:** Monetize your live content by playing ads before the viewer joins the stream. This is ideal for ensuring that every viewer sees an advertisement, maximizing ad impressions.
- **Mid-roll Ads for Live Events:** Enhance your revenue by incorporating mid-roll ads during live events. The player detects upcoming ad breaks and seamlessly inserts ads, keeping viewers engaged while generating ad revenue.
- **Ad Integration for VOD Content:** Utilize pre-roll, mid-roll, and post-roll ads for your VOD content. Our service determines the optimal ad configuration upon playback initiation, ensuring a smooth viewing experience and effective ad delivery.


## Universal Ad Configuration  {/*universal-ad-configuration*/}


Use the Universal Ad Config to integrate ads from your own third-party ad provider into your content. <br /> [Learn how to get started](/uplynk/monetize/ads/#setup-overview).

### Requirements  {/*requirements*/}

Universal Ad Config requires a third-party ad provider that supports:

- `GET` ad requests
- Passing ad parameters through query string parameters
- One of the following ad response types:
  - VMAP 1.*
  - VAST 1.* , 2.* , 3.* , 4.*
  - VOD

    Pass the following query string parameter when an ad server returns VAST responses for ad requests in a VOD stream:

    `ad.vast_vod=1`

    Enabling the `vast_vod` parameter on a VOD playback session allows our service to create a VMAP template and manage all of the ad requests within that VOD asset across all ad breaks.

### Passthrough Parameters  {/*passthrough-parameters*/}

Use this prefix to pass known ad parameters to the ad server: `ad.pt.<PARAMETER>=<VALUE>`

**Examples**

If an ad server expects a campaign ID (e.g., 1234) to be passed through the `c_id` ad parameter, then you should add the following query string parameter to the playback URL: `ad.pt.c_id=1234`

Uplynk will then pass the following query string parameter in the ad request: `c_id=1234`

### Macros  {/*macros*/}

Use macros when the value of an ad parameter is unknown during ad configuration setup or playback. Uplynk will replace the following macros with data that is specific to the current playback session:

| Macro | Playback Type | Replacement Value |
|---|---|---|
| [U_ASSET_DESC] | Live or VOD | Indicates the description of the asset being played. |
| [U_ASSET_EXTERNAL_ID] | Live or VOD | Indicates the external ID of the asset being streamed. |
| [U_ASSET_ID] | Live or VOD | Indicates the system-defined ID of the asset being played. |
| [U_ASSET_OWNER_ID] | Live or VOD | Indicates the system-defined ID for the user that owns the asset being streamed. |
| [U_BREAK_DUR_MS] | Live | Indicates the duration of the ad break, in milliseconds, as requested by the Live Slicer.<br />Example: `60000.0` |
| [U_BREAK_DUR_S] | Live | Indicates the duration of the ad break, in seconds, as requested by the Live Slicer.<br />Example: `60.0` |
| [U_BREAK_DUR_S_INT] | Live | Indicates the duration of the ad break, in seconds, as requested by the Live Slicer. This metric reports whole integers by dropping the decimal.<br />Example: `60` |
| [U_BREAK_NUM] | Live | Indicates the number for the current ad break. |
| [U_BREAK_TYPE] | Live | Indicates the type of ad break being requested.<br />Example: `preroll \| midroll \| postroll` |
| [U_DEVICE_IP] | Live or VOD | Indicates the IP address associated with the current playback session. This IP address is derived from the X-Device-IP header. If that header is missing, then it will be derived from the X-Forwarded-For header. |
| [U_RANDOM_INT] | Live or VOD | Indicates a random 8 digit number.<br />Example:<br />43578233 |
| [U_SESSION_ID] | Live or VOD | Indicates the playback session ID. |
| [U_STREAM_TYPE] | Live or VOD | Indicates whether it is a live or VOD stream. |
| [U_TIMESTAMP] | Live or VOD | Indicates the current timestamp in Unix time (seconds).<br />Example: `1681863595` |
| [U_USER_AGENT] | Live or VOD | Indicates the user agent associated with the current playback session. This user agent is derived from the `X-Device-User-Agent` header. If that header is missing, then it will be derived from the `User-Agent` header. |

**Example**

Add the following query string parameter to the playback URL to pass the ad break duration through the `break_dur` parameter: `ad.pt.break_dur=[U_BREAK_DUR_S]`

If the Live Slicer requests a 90-second ad break, Uplynk will pass the following query string parameter in the ad request: `break_dur=90.0`

#### Pass First Valid  {/*pass-first-valid*/}

Use the **Pass First Valid** prefix to define a default value that will be passed when a macro does not resolve to a value. This prefix instructs Uplynk to pass the first valid value from a comma-delimited list.

**Syntax**: `ad.pfv.<PARAMETER>=<VALUE 1>[,<VALUE 2>,<VALUE N>]`

**Key Information**

- You may set a parameter to any combination of macro(s) and a static value.
- If a macro resolves to a value, then Uplynk will pass that value to the ad server.
- If you include a static value, it should be defined in the last position. Uplynk will try to resolve the macros that are listed prior to a static value. If those do not resolve, it will send the static value. It will not attempt to resolve macros defined after the static value.

**Example:**

Add the following query string parameter to the playback URL to pass an ad break duration for an ad configuration that will be used for both live and VOD streams: `ad.pfv.break_dur=[U_BREAK_DUR_S],90.0`

If the Live Slicer requests a 60-second ad break, then Uplynk will pass the following query string parameter in the ad request: `break_dur=60.0`

If this ad configuration is used for a VOD stream, then Uplynk will pass the following query string parameter in the ad request: `break_dur=90.0`

## More Information  {/*more-information*/}

View detailed [instructions on inserting ads into live streams and VOD](/uplynk/monetize/ads).

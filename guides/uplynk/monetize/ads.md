---
title: Ads
---

Monetize your content by inserting ads into:

**Live Streams**

Ad insertions may take place:
- **Prior to Initial Playback**: Use pre-roll ads to play ads before the viewer joins the live stream.
- **During Playback**: Use mid-roll ads to play ads within a live stream. A player requests ads whenever an upcoming ad break is detected, and our service stitches them into the live stream.
- **After Playback**: Use post-roll ads to play ads after a live event.

**Video On-Demand (VOD)**

Upon initiating playback, our service determines the set of pre-roll, mid-roll, and post-roll ads that will be stitched into your on-demand content based on your ad configuration.

<Tip>Ads are stitched into your content to provide a seamless transition between your content and ads. Additionally, this prevents ad blockers from blocking your ads.</Tip>

<Tip>Ads are automatically upscaled to the highest quality rate in your encoding profile. Our service upscales your ads without altering their frame rate.</Tip>

## How Does It Work?  {/*how-does-it-work*/}

The ad insertion workflow for live streams and VOD is similar. The only difference between them is the timing for ad retrieval.

- **Live Streams**: Our service requests ads whenever it detects an upcoming ad break.
- **VOD**: Our service requests ads for all ad breaks upon initiating playback.

**Workflows**

![Basic Ad Insertion Workflow](/images/uplynk/live-stream-ad.png)

![Basic Ad Insertion Workflow](/images/uplynk/vod-ad.png)

## Third-Party Ad Servers  {/*third-party-ad-servers*/}

Request ads from one or more of the following third-party ad servers:

- [Google Ad Manager](/uplynk/monetize/ads/google_ad_manager)
- [Freewheel](/uplynk/monetize/ads/freewheel)

## Setup Overview  {/*setup-overview*/}

Perform the following steps to integrate a third-party ad server with live content, VOD, or both:

1. **Create an ad configuration for the desired third-party ad server**.
   - **How?**
     - Navigate to the [**Ad Server** page](https://cms.uplynk.com/static/cms2/index.html#/settings/ad-server/).
     - Click **+ Ad Config**.
     - In the **Ad Config Name** option, type the desired name for the ad configuration.
     - From the **Select Ad Server** option, select the desired third-party ad server.
     - Click **Add**.
     - Fill out all required parameters (e.g., `serverURL`).
     - Click **Save**.

2. **Set up a slicer** to add the desired ad breaks to your live content, VOD, or both.

3. **Set up a third-party ad server** to include ad-specific metadata as [query string parameters](#ad-specific-metadata) of the playback URL.

4. **Set up your media player** to add pre-roll, mid-roll, and/or post-roll ads to your media via query string parameters in the playback URL.

5. **Optional**: Set up your media player to define how [ad breaks](#ad-breaks) will be handled via query string parameters in the playback URL.

6. **Optional**: Set up your media player to send verification data to an [ad verification](#ad-verification) system via Open Measurement Interface Definition (OMID).

7. **Apply a digital signature** after the third-party ad server has added the desired query string parameters to the playback URL.

<Tip>Ad break duration may be specified for an asset that is played back within a live stream. However, the length of an ad break for an asset that is played back as on-demand content is determined by the response from the ad decision server. As a result, you may not specify ad break duration for VOD and ad slate will not be inserted during playout. For example, if the ad decision server returns a 45.35 second ad response, then the duration of the ad break will be 45.35 seconds.</Tip>

## Ad-Specific Metadata  {/*ad-specific-metadata*/}

Query string parameter names vary by third-party ad server.

Metadata describing each ad should be included as query string parameters in the playback URL provided by the third-party ad server.

**Example**:

The following sample playback URL identifies an ad server configuration (i.e., VideoSSP) and a keyword (i.e., marketing).

`https://content.uplynk.com/ext/1/myasset.m3u8?tc=1&exp=1358341863&rn=4114845747&ct=a&eid=mtg_003&oid=a735c65ea4041685bc74c0a375326cc5&ad=VideoSSP&keywords=marketing&sig=37e...cbf`

## Ad Breaks  {/*ad-breaks*/}

A set of ads are requested prior to the start of an ad break. However, the total duration for those ads will rarely be an exact match to the ad break's duration. Ads that extend beyond the ad break's duration cause the viewer to fall further behind the live stream (i.e., latency). For this reason, we provide the capability to determine how ad spots are handled when they exceed an ad break's duration.

<Tip>Define the duration of an ad break when creating an ad pod or boundary.</Tip>

The advantages and disadvantages for each method of handling ad breaks are shown below.

| Method | Latency | Ad Fill | Ad Slate | Playback Drift | Flexible? |
|---|:---:|:---:|:---:|:---:|:---:|
| [Default Behavior](#default-behavior) | More | More | Less | More | No |
| [Ad Chopping](#chopping-and-dropping-ads) | Less | Less | Less | Less | Yes |
| [Ad Dropping](#chopping-and-dropping-ads) | Less | Less | More | Less | Yes |

### Default Behavior  {/*default-behavior*/}

By default, ads from the ad pool will be inserted into the ad break as long as the amount of time left in the ad break is greater than playback drift. If playback drift exceeds the amount of time left in the ad break, all remaining ads will be dropped and the stream will cut back over to content.

<Info>Playback drift measures the amount of time that playback has fallen behind the targeted latency. Configure artificial latency for each playback session via the delay parameter.</Info>

Your `ad.flex` configuration increases the ad insertion window using the following formula:

`{Adjusted Ad Break Duration} = {Requested Ad Break Duration} + {ad.flex}`

<Info>If [ad.flex](/uplynk/deliver/playback_urls/customize_playback_via_parameters/#general-parameters) has not been defined in your playback URL, then ads may be inserted for an additional 4 seconds beyond the requested ad break duration.</Info>

The timing for switching the stream back to content varies according to the quantity of ads served by the ad decision server:

- **Ad Overfill**: If the ad decision server returns too many ads, ads will be inserted until the end of the adjusted ad break duration. This may introduce significant playback drift.

- **Ad Fill**: If the ad decision server returns an appropriate number of ads for the requested ad break duration and the last ad extends beyond the requested ad break duration, the stream will switch over to content after the last ad.

- **Ad Underfill**: If the last ad ends before the end of the requested ad break duration, a slate will be played until the end of the requested ad break duration.

<Info>Slate may extend beyond an ad break by a few seconds.</Info>

**Default Ad Break Duration Example**

This example demonstrates how:

- Ad break overages contribute to playback drift.
- Playback drift affects ad insertion.

Calculate ad break overages via the following formula:

`{Ad Break Overage} = {Actual Ad Break Duration} - {Requested Ad Break Duration}`

This example makes the following assumptions:

- The `ad.flex` parameter has not been defined and therefore it will be set to a default value of 4 seconds. This default configuration allows ads to be inserted up to 4 seconds after the end of the requested ad break duration.
- There are many factors (e.g., encoding, delivery, playback, etc.) that contribute to latency and playback drift. For the sake of simplicity, this scenario only takes into account ad break overages when calculating playback drift.
- The ad decision server responds with an appropriate number of ads for each ad break and therefore is not overfilling or underfilling ad breaks.

The first ad break in this sample scenario is for a 60 second ad spot. An ad server returns 3 ads with a total duration of 61.62 seconds. This will cause the viewer to experience 1.62 seconds of additional latency. A breakdown of each ad break is provided below.

| Ad Break    | Requested / Adjusted Ad Duration | Actual Duration | Ads (Seconds)                        | Total Playback Drift |
|-------------|-------------------------------|-----------------|--------------------------------------|-----------------------|
| Ad Break #1 | 60 / 64 seconds               | 61.62 seconds   | 30.18 + 15.20 + 16.24 = 61.62       | 1.62 seconds          |
| Ad Break #2 | 90 / 94 seconds               | 92.15 seconds   | 30.52 + 30.82 + 30.81 = 92.15       | 3.77 seconds          |
| Ad Break #3 | 120 / 124 seconds             | 124.47 seconds  | 31.34 + 31.84 + 30.71 + 30.58 = 124.47 | 8.24 seconds       |
| Ad Break #4 | 90 / 94 seconds               | 94.57 seconds   | 30.94 + 31.87 + 31.76 = 94.57       | 12.81 seconds         |
| Ad Break #5 | 120 / 124 seconds             | 123.03 seconds  | 30.75 + 31.02 + 30.49 + 30.77 = 123.03 | 15.9 seconds       |
| Ad Break #6 | 90 / 94 seconds               | 93.52 seconds   | 31.29 + 30.87 + 31.36 = 93.52       | 19.42 seconds         |
| Ad Break #7 | 60 / 64 seconds               | 47.33 seconds   | 30.45 + 16.88 + 16.96 = 64.29       | 6.75 seconds          |

Each subsequent ad break causes the viewer to fall further behind as indicated in the **Playback Drift** column. After the sixth ad break, playback drift is at 19.42 seconds. After the second ad in the seventh ad break, there will only be 16.67 seconds left in the ad break. Playback drift now exceeds the amount of time left in the ad break (i.e., 19.42 seconds > 16.67 seconds). As a result, this triggers the end of the ad break, all remaining ads will be dropped, and the stream will cut back over to content. Ending the ad break early allows the player to recover 12.67 seconds and thus reduces playback drift to 6.75 seconds.

### Chopping and Dropping Ads {/*chopping-and-dropping-ads*/}

By default, an entire ad is played regardless of whether it exceeds an ad break's duration. Use the following query string parameters to override this behavior:

- **ad.breakend**: Use this parameter to prevent ads from exceeding an ad break's duration by either:
  - **Chopping Ads**: Upon reaching the end of the ad break, the current ad will be chopped, all remaining ads will be dropped, and the stream will switch over to content at the end of an ad break.
    - An ad may extend slightly beyond an ad break.
    - [Learn more.](/uplynk/deliver/playback_urls/customize_playback_via_parameters/#general-parameters)
  - **Dropping Ads**: Ads that do not fit within an ad break will not be played and ad slate will be played until the end of the ad break.
    - Slate may extend slightly beyond an ad break.
    - [Learn more.](/uplynk/deliver/playback_urls/customize_playback_via_parameters/#general-parameters)

- **ad.flex**: Use this parameter to define the number of seconds that an ad can extend beyond an ad break before being chopped or dropped.

**Sample URL**

```plaintext
https://content.uplynk.com/ext/1/myasset.m3u8?tc=1&exp=1358341863&rn=4114845747&ct=a&eid=mtg_003&oid=a735c65ea4041685bc74c0a375326cc5&ad=VideoSSP&keywords=marketing&ad.breakend=drop&ad.flex=5
```

<Tip>A digital signature should be applied to the above URL.</Tip>

### Ad Break Duration Calculation  {/*ad-break-duration-calculation*/}

As mentioned above, you may define the duration of each ad break via ad pods and boundaries. However, if you enable either the chopping or dropping of ads, then ad break duration will be automatically adjusted to account for playback drift using the following formula:

`{Adjusted Ad Break Duration} = {Requested Ad Break Duration} - {Playback Drift} + {ad.flex}`

#### Dropping Example {/*ad-dropping-example*/}

This example demonstrates:

- How ad break duration is adjusted upon enabling ad dropping.
- The conditions under which ads are dropped.

This example makes the following assumptions:

- The `ad.flex` parameter has been set to 5 seconds. This configuration allows an ad break to be extended by 5 seconds.
- There are many factors (e.g., encoding, delivery, playback, etc.) that contribute to latency and playback drift. For the sake of simplicity, this scenario only takes into account ad break overages when calculating playback drift.
- Ad slate is a 5-second asset. Slate is sliced into 4-second segments. This means that it consists of the following segments:
  - One 4-second segment
  - One 1-second segment

    <Info>A stream may only consist of whole segments. In the case of the above ad slate, the stream cannot cut over to content 6 seconds into ad slate. Rather, the stream will cut over after 9 seconds of ad slate. Alternatively, if ad slate is a 3-second asset, then the stream can cut over to content after 6 seconds of ad slate.</Info>

The first ad break in this sample scenario is for a 60 second ad spot. Using the [above formula](#ad-break-duration-calculation) and assuming that only ad break overages cause playback drift, we end up with an ad break duration of 65 seconds.

`Adjusted ad break duration = 60 - 0 + 5 = 65`

An ad server returns 3 ads with a total duration of 61.62 seconds. These ads will be served since they fit within the ad break. This will cause the viewer to experience 1.62 seconds of additional latency. A breakdown of each ad break is provided below.

| Ad Break    | Requested / Adjusted Duration | Actual Duration | Ads (Duration)                 | Total Playback Drift       |
|-------------|-------------------------------|-----------------|--------------------------------|-----------------------------|
| Ad Break #1 | 60 / 65 seconds               | 65 seconds       | 30.18 + 15.20 + 16.24 = 61.62 | 61.62 - 60 = 1.62          |
| Ad Break #2 | 90 / 93.38 seconds            | 93.38 seconds    | 30.52 + 30.82 + 30.81 = 92.15 | 1.62 + (92.15 - 90) = 3.77 |
| Ad Break #3 | 120 / 121.23 seconds          | 121.23 seconds   | 31.34 + 31.84 + 30.75 + 30.58 = 93.93 | 3.77 + (93.93 - 120) = -22.30 + 29 = 6.70 |

Each subsequent ad break causes the viewer to fall further behind as indicated in the **Playback Drift** column. After the third ad in the third ad break, there will only be 27.30 seconds left in the ad break. The duration of the next ad in the ad break (i.e., 30.58 seconds) exceeds the remaining time in the ad break (i.e., 27.30) and therefore all remaining ads will be dropped. Additionally, slate will be played until the end of the ad break. Due to the slate's segment size, slate will actually be played for 29 seconds (as calculated below) resulting in 6.70 seconds of playback drift. After which, the stream will cut back over to content.

**Ad slate segments**

`4 + 1 + 4 + 1 + 4 + 1 + 4 + 1 + 4 + 1 + 4 = 29`

<Info>A stream may only consist of whole segments and therefore the stream may only switch over to content at the time intervals identified above. This means that the stream cannot switch over to content at exactly 27.30 seconds. Rather, it must wait until the end of that segment which occurs at the 29 second mark.</Info>

#### Chopping Example {/*ad-chopping-example*/}

This example demonstrates:

- How ad break duration is adjusted upon enabling ad chopping.
- The conditions under which ads are chopped.

**Assumptions**

- The `ad.flex` parameter has been set to 5 seconds, allowing an ad break to be extended by 5 seconds.
- Many factors (e.g., encoding, delivery, playback, etc.) contribute to latency and playback drift. This scenario only accounts for ad break overages when calculating playback drift.

<Info>Ads are sliced in 4-second segments.</Info>

<Info>A stream may only consist of whole segments and therefore can only switch over to content at 4-second intervals or at the end of the ad. This means that the stream cannot cut over to content 6 seconds into a chopped ad. Instead, the stream will cut over after eight seconds or the end of the ad, whichever occurs first.</Info>

The first ad break is for a 60-second ad spot. Using the [above formula](#ad-break-duration-calculation) and assuming that only ad break overages cause playback drift, the ad break duration ends up being 65 seconds.

`Adjusted ad break duration = 60 - 0 + 5 = 65`

An ad server returns 3 ads with a total duration of 61.62 seconds. These ads will be served since they fit within the ad break. This will cause the viewer to experience 1.62 seconds of additional latency. A breakdown of each ad break is provided below.

| Ad Break   | Requested / Adjusted Duration | Actual Duration | Playback Drift                                |
|------------|-------------------------------|------------------|-----------------------------------------------|
| **Ad Break #1** | 60 / 65 seconds               | 65 seconds       | 60 - 0 + 5 = 65 <br /> Ads: 30.18 + 15.20 + 16.24 = 61.62 <br /> Total playback drift: 61.62 - 60 = 1.62 |
| **Ad Break #2** | 90 / 93.38 seconds            | 93.38 seconds    | 90 - 1.62 + 5 = 93.38 <br /> Ads: 30.52 + 30.82 + 30.81 = 92.15 <br /> Total playback drift: 1.62 + (92.15 - 90) = 3.77 |
| **Ad Break #3** | 120 / 121.23 seconds          | 121.23 seconds   | 120 - 3.77 + 5 = 121.23 <br /> Ads: 31.34 + 31.84 + 30.75 + 28 (30.58) = 121.93 <br /> Total playback drift: 3.77 + (121.93 - 120) = 5.70 |

Each subsequent ad break causes the viewer to fall further behind as indicated in the **Playback Drift** column. After the third ad in the third ad break, there will only be 27.30 seconds left in the ad break. The duration of the next ad in the ad break (i.e., 30.58 seconds) exceeds the remaining time in the ad break (i.e., 27.30) and therefore that ad will be chopped after 28 seconds (as calculated below) resulting in 5.70 seconds of playback drift. After which, the stream will cut back over to content.

Ad segments:

`4 + 4 + 4 + 4 + 4 + 4 + 4 = 28`

A stream may only consist of whole segments and therefore the stream may only switch over to content at 4 second intervals or at the end of the ad. This means that the stream cannot switch over to content at exactly 27.30 seconds. Rather, it must wait until the end of that segment which occurs at the 28 second mark.

## Prebid {/*prebid*/}

Maximize content monetization by leveraging our Prebid service to ensure that ads corresponding to the highest value bids are served to your viewers. Prebid seamlessly inserts an additional step at the start of your ad workflow to ensure real-time bidding (RTB) for your ad supply. Your request for ads, along with these bids, are then submitted to the ad decision server. This allows an ad decision server to choose from:

- **Direct ads**: Identifies ads purchased in bulk through a prenegotiated deal. An ad decision server typically prioritizes direct ads over third-party ads (standard).

- **Third-party ads (standard)**: Identifies ads generated by demand partners through real-time bidding (RTB) requested by an ad decision server. If an ad decision server prioritizes direct ads, it will not initiate RTB, preventing bids from advertisers without direct buys from being considered.

- **Third-party ads (Prebid)**: Identifies ads generated by demand partners through real-time bidding (RTB) requested by our Prebid service. These bids are always submitted to the ad decision server.

**Prebid Workflow for Live Streams**

![Prebid Workflow for Live Streams](/images/uplynk/prebid-ls.png)

**Prebid Workflow for VOD**

![Prebid Workflow for VOD](/images/uplynk/prebid-vod.png)

Prebid grants more flexibility to your ad decision server by allowing it to choose from a wider variety of bids to determine the optimal set of creatives to fill your ad breaks. The benefits of using Prebid are:

It maximizes content monetization by allowing bids from your demand partners to always be evaluated alongside direct ads.
It increases viewer engagement and reduces ad fatigue by diversifying the set of ads served to your viewers.

### Setup   {/*setup-prebid*/}

1. Contact your account manager to activate the Prebid feature.
2. Set up a Prebid server. <br />[View Prebid documentation on how to set up a Prebid server.](https://docs.prebid.org/prebid-server/overview/prebid-server-overview.html)
3. Set up an adapter within your Prebid server for each desired demand partner.<br />[View Prebid documentation on how to set up an adapter.](https://docs.prebid.org/dev-docs/bidder-adaptor.html#how-to-add-a-new-prebidjs-bidder-adapter)
4. Define a Prebid configuration for your Prebid server.
   - Navigate to the [Prebid Server page](https://cms.uplynk.com/static/cms2/index.html#/settings/prebid-server) via **Settings** > **Prebid Server**.
   - Click **+ Prebid Config**.
   - From the **Prebid Config Name** option, assign a name to this configuration.
   - Click **Create**.
   - Optional: From the **podconfig.configid** option, indicate the ID for the desired custom Prebid configuration.
      - Contact your account manager if you would like to set up a custom Prebid configuration. Once configured, your account manager will provide its ID.
   - From the URL option, type a URL that points to your Prebid server.
   - Optional: Restrict bidding to ads that satisfy predefined criteria.
      - From the pricegranularity.range.max option, define the maximum price for a bid in cents.
      - From the pricegranularity.range.increment option, define how similarly priced bids will be grouped. Define the maximum number of cents by which bids in the same group may differ.
         - Use a larger value to reduce the number of line items that you will need to define within your ad decision server to target bids.
      - From the includebrandcategory.publisher option, indicate the ID assigned to your organization by Google Ad Manager.
         - This option is required when using Google Ad Manager as your ad decision server.
   - Click **Save**.
5. Add an `ad.prbd` query string parameter to the playback URL and set it to the name of the Prebid configuration, as defined in step 6.iii, that identifies your Prebid server and provides bidding instructions.

`ad.prbd={Prebid Config Name}`

**Example**:

`ad.prbd=myPrebidServer`

6. Create line items that target bids within your ad decision server.

## Ad Verification  {/*ad-verification*/}

Ad verification is only supported when using VAST 3.x or 4.0.

Measure ad viewability by customizing your player to extract verification data from the manifest file and send it to an ad verification system via the Open Measurement Interface Definition ([OMID](https://iabtechlab.com/standards/open-measurement-sdk/)).

**Ad Verification Workflow for Live Streams**

![Ad Verification Workflow for Live Streams](/images/uplynk/verification-ls.png)

<Info>Ad verification works with our Prebid feature. However, it has been omitted from this workflow for the sake of simplicity.</Info>

**Ad Verification Workflow for VOD**

![Ad Verification Workflow for VOD](/images/uplynk/verification-vod.png)

<Info>Ad verification works with our Prebid feature. However, it has been omitted from this workflow for the sake of simplicity.</Info>

### Setup  {/*setup-ad-verification*/}

<Info>Ad verification requires an [Interactive Advertising Bureau (IAB) account](https://www.iab.com/). If you do not currently have an account, please create one.</Info>

Setting up ad verification requires updating your player to:

1. Identify the type of ad verification data that will be inserted into the manifest file.
2. Extract ad verification data from the manifest file.
3. Send verification data to the ad verification system via OMID.

<Info>Steps 2 and 3 are outside the scope of this document. Please refer to the documentation provided by your ad verification system to learn how to provide ad verification data via OMID.</Info>

#### Ad Verification Data  {/*ad-verification-data*/}

Add ad verification data to the manifest by including one or more of the following query string parameter(s) in the playback URL:

| Query String Parameter    | Description|
|---------------------------|-----------|
| timedmeta.events.ads    | Inserts tracking event data from the VAST response. This data is reported within an `EXT-X-DATERANGE` ad marker tag whose class/scheme identifier is `urn:uplynk:ad-data:events`. <br /> **Example**: `timedmeta.events=complete,midpoint` |
| timedmeta.extensions.ads | Inserts custom VAST extensions data. This data is reported within an `EXT-X-DATERANGE` ad marker tag whose class/scheme identifier is `urn:uplynk:ad-data:data:extensions`. <br /> **Example**: `timedmeta.extensions=waterfall,geo` |
| timedmeta.schemas.ads   | Inserts ad viewability data. This data is reported within an `EXT-X-DATERANGE` ad marker tag whose class/scheme identifier is `urn:uplynk:ad-data:omsdk`. <br /> **Example**: `timedmeta.schemas.ads=omsdk` |

Initiating a playback session with one of the above query string parameters will include the requested data from the ad node returned by the [Preplay API](https://docs.edgecast.com/video/Content/Develop/Preplayv2.htm) within the manifest file. Information on how this data is inserted into the manifest file for HLS and DASH is provided below.

<Tip>Test your ad verification workflow by passing `staticomsdk=1` as a query string parameter in the playback URL for the desired live event or live channel. This parameter, which inserts a static JSON payload into the manifest, cannot be used to test the ad verification workflow for VOD content.</Tip>

<Info>An ad marker tag (i.e., `EXT-X-DATERANGE`) will be inserted for each parameter defined in the playback URL. For example, if you specify both timedmeta.events.ads and timedmeta.extensions.ads, then two ad marker tags will be added to the manifest file.</Info>

<Info>Timed metadata does not currently return data that allows a player to signal their position in a stream. This means that players must still use data from the [Ping API](https://docs.edgecast.com/video/Content/Develop/Pingv2.htm) to signal their position in a stream.</Info>

### HLS  {/*hls*/}

Inserts a Base64-encoded JSON payload into the `X-DATA` attribute of the `EXT-X-DATERANGE` tag of an HLS manifest.

![HLS](/images/uplynk/hls-ads.png)

For each ad, the `START-DATE` attribute of the `EXT-X-DATERANG`E tag will have the same value as the corresponding `EXT-X-PROGRAM-DATE-TIME` tag. The specified timestamp doesn't reflect playback time. Instead, the first ad in a stream will be assigned a timestamp of `1970-01-01T00:00:00+00:00`. Each subsequent ad will be assigned a value that takes place after the previous ad.

### DASH {/*dash*/}

For each ad, an `<Event>` node will be inserted within an `<EventStream>` node in that ad's period within the DASH manifest. This Event node will contain the JSON payload as shown below.

![DASH](/images/uplynk/dash-ad.png)

In order to improve readability, a formatted version of the above sample JSON payload is provided below.

```json
{
	"AdVerifications": [{
			"vendor": "iabtechlab.com-omid",
			"Verification": [{
					"browserOptional": "true",
					"apiFramework": "omid",
					"JavaScriptResource": "<![CDATA[https://s3-us-west-2.amazonaws.com/omsdk...]]>"
				}, {
					"VerificationParameters": "<![CDATA[iabtechlab]]>"
				}
			]
		}
	],
	"adID": "90000035",
	"creative": "ed85dfa6e5b74442a2df7d8bfe15bed5",
	"creativeID": null
}
```

---
title: Ad Debug
---

We provide near real-time data on the ads requested for your content. Analyze this information to gain insights into ad insertions, such as:

- [Verifying ad requests and responses](#basic-usage).
- [Checking for errors](#troubleshooting-ad-jobs) and discovering their root cause.
- Performing end-to-end [auditing](#audit-a-playback-session) of a single playback session.

## Ad Jobs  {/*ad-jobs*/}

Ad insertion data is collated and presented as an ad job. The scope of an ad job varies according to whether it belongs to a live stream or VOD content.

- **Live Stream:** The system generates an ad job whenever playback encounters an upcoming ad break.
- **VOD:** The system generates a single ad job upon initiating playback. This ad job contains data for all of the asset's ad breaks.

![Ad Job Workflow](/images/uplynk/ad-job.png)

An ad job describes:

- The set of ads that were requested.
- The ad decision server's response for each of those ads.
- The tracking data that we provided to the ad decision server.

As illustrated above, each ad job consists of the following components:

- **Ads:** Each ad listed under the job corresponds to a single ad during an ad break. Data shows whether the ad was selected for use during the ad break, the position in the ad break the ad was inserted into, and the status of the ad asset.
- **Transactions:** A transaction describes an ad request and the response provided by an ad decision server.
  - **Request:** An ad request is generated for the initial request to the ad decision server and for each wrapper spawned from it. The following information is captured for each ad request: raw URL, macros, HTTP headers, and processing information.
  - **Response:** For each ad request, we provide the raw XML provided by the ad decision server and a summary of the response, including errors. If the ad request resulted in VMAP and VAST wrappers and a creative, then that information will also be included in the raw XML response. <Info>An error during an ad request may prevent an ad response from being provided.</Info>

- **Beacons:** A beacon consists of the tracking data reported by our system to the ad decision server.

## Data Retention  {/*data-retention*/}

The retention policy for ad insertion data is 7 days.

## Basic Usage  {/*basic-usage*/}

Find and review ad jobs through the [Ad Server Debug](https://cms.uplynk.com/static/cms2/index.html#/ad-server-debug) page.

### Locate Live Channel ID  {/*locate-live-channel-id*/}

1. From the CMS, click the **Live Channels** tab.
2. Select the desired live channel. Basic options and live channel information will be displayed on the **Details** tab.
3. Find the live channel's system-defined ID under the **GUID** label.

### Find a Live Event ID  {/*find-a-live-event-id*/}

1. Navigate to the [Live Events](https://cms.uplynk.com/static/cms2/index.html#/live-events/events) page (**Events** > **Live Events**).
2. Select the desired live event.
3. Verify that the **Details** tab is selected.
4. Find the live event's system-defined ID under the **GUID** label.

### Locate an Asset ID  {/*locate-an-asset-id*/}

1. Navigate to the CMS library by clicking the **Content** tab.
2. Select the desired asset.
3. The asset ID corresponding to the asset selected in the previous step is listed under the **GUID** label.

### Find Playback Session ID  {/*find-playback-session-id*/}

Implement the [Preplay API](https://docs.edgecast.com/video/Content/Develop/Preplayv2.htm) within your custom player to retrieve the playback session ID.

<Info>Alternatively, inspect your playback URL to find out your own playback session.<br />[Learn more](#audit-a-playback-session).</Info>



### Search Settings  {/*search-settings*/}

Use the following settings to search for the desired ad job data:

| Setting | Description |
|---|---|
| Ad server query params | For certain ad providers, such as GAM and Invidi, you can filter for specific ad server query parameters. For example, for GAM requests, you can query for ad jobs with `ppid=123` in the primary ad server request. |
| Ad Playback Type | Filters ad job data by whether the ad was requested as a part of a live stream or VOD. |
| From<br />To | Filters ad job data by the time period during which the ad was requested. |
| Channel/Live Event ID | Filters ad job data by the live channel or live event during which it was requested. Identify a live channel or live event by its system-defined ID.<br />Find a [live channel ID](#locate-live-channel-id) or a [live event ID](#find-a-live-event-id). |
| Asset ID | Filters ad job data by the VOD asset during which it was requested. Identify an asset by its system-defined ID.<br />[Find an asset ID](#locate-an-asset-id). |
| Session ID | Filters ad job data by the playback session for which it was requested. Identify your playback session by its system-defined ID.<br />[Find a playback session ID](#find-playback-session-id). |
| Status | Filters ad job data by status.<br />[Learn more](#ad-job-data). |
| Debug Name | Filters ad job data by tagged playback session(s).<br />Tag a playback session by passing the [`ad._debug` parameter](/uplynk/deliver/playback_urls/#general_parameters) in the playback URL. |
| Transactions | Determines whether transactions will be included in the search results. |
| Beacons | Determines whether beacons will be included in the search results. |

### Search for Ad Job Data  {/*search-for-job-ad-data*/}

1. Navigate to the [Ad Server Debug](https://cms.uplynk.com/static/cms2/index.html#/ad-server-debug) page (**Services** > **Ad Server Debug**).
2. From the **Ad Playback Type** option, determine whether ad job data for a live stream or VOD content will be returned.
3. Define the time period for which ad job data will be returned.
   - Click within the **From** option and then select a start date and time.
   - Click within the **To** option and then select an end date and time.<Info>Ad job data is available a few minutes after the ad request is sent to the ad decision server.</Info><Info>For your convenience, date and time are displayed using your local time zone. However, this is not an indicator of the time zone corresponding to the playback session for which ad insertion data is being reported.</Info>
4. Optional: Define other ad job filters.
5. Click **Fetch Ad Data**.

### Refine Search Results  {/*refine-search-results*/}

Refine your results by modifying the desired ad job search option(s) from the Query pane and then clicking **Update Query**.

<Info>If you would rather perform a new search, then you should click **New Ad Query**.</Info>

### Filter Search Results by Ad Job Status  {/*filter-search-results-by-ad-job-status*/}

Filter your results by [status](#ad-job-data) by clicking the filter icon and then clearing the statuses that should be excluded from the search results.

## Ad Job Data  {/*ad-job-data*/}

Search results consist of a list of ad jobs that meet the specified search criteria. The following information is reported for each ad job:

| **Name**        | **Description**         |
|------|-----|
| Status      | Indicates the ad job's status. The available statuses are described below. <ul><li>**Completed**: Indicates that an ad job's initial transactions with the ad decision server were completed in a timely manner. This state may include ad jobs with a failed wrapper transaction.</li><li>**Failed**: Indicates that an ad job's initial transactions either did not complete on time or resulted in empty or malformed responses. View the failure reason by hovering over this label. [Learn more](#troubleshooting-ad-jobs).</li><li>**Pending**: Indicates that work on an ad job has not been started. Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</li><li>**Processing**: Indicates that an ad job contains at least one transaction that is still being processed. For example, this state may indicate that the system is still fetching ads from the ad decision server and creating the ad payload. Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</li></ul> |
| Date Created | Indicates the date and time at which the ad job was initiated. For your convenience, date and time are displayed using your local time zone. However, this is not an indicator of the time zone corresponding to the playback session for which ad insertion data is being reported.|
| Channel/Event | Identifies a live channel or a live event by its name.   |
| Session ID   | Identifies a playback session by its system-defined ID.   |
| T# | Indicates the number of transactions associated with the ad job.    |
| B# | Indicates the number of beacons associated with the ad job.|
| F# | Indicates the number of failed transactions that occurred within an ad job. A transaction is considered a failure when it either does not complete on time or it resulted in an empty or malformed response.    |

<Tip>Click on an ad job to view its transactions and beacons.</Tip>

### Transactions  {/*transactions*/}

View an ad job's transactions by clicking on an ad job from the **Ad Server Debug Query Results** page. The following information is reported for each transaction:


| Name | Description |
|---|---|
| Status      | Indicates the ad job's status. The available statuses are described below. <ul><li>**Completed**: Indicates that an ad job's initial transactions with the ad decision server were completed in a timely manner. This state may include ad jobs with a failed wrapper transaction.</li><li>**Failed**: Indicates that an ad job's initial transactions either did not complete on time or resulted in empty or malformed responses. View the failure reason by hovering over this label. [Learn more](#troubleshooting-ad-jobs).</li><li>**Pending**: Indicates that work on an ad job has not been started. Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</li><li>**Processing**: Indicates that an ad job contains at least one transaction that is still being processed. For example, this state may indicate that the system is still fetching ads from the ad decision server and creating the ad payload. Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</li></ul> |
| Date Created | Indicates the date and time at which the ad job was initiated. For your convenience, date and time are displayed using your local time zone. However, this is not an indicator of the time zone corresponding to the playback session for which ad insertion data is being reported.|
| Type | Indicates the transaction type: is the primary ad request (labeled “Primary” in purple), a wrapper spawned from the primary transaction (labeled “Primary Wrapper”), or a wrapper spawned from another wrapper transaction (labeled “Wrapper”).<ul><li>**Primary**: The primary ad request.</li><li>**Primary Wrapper**: A wrapper spawned from the primary transaction.</li><li>**Wrapper**: A wrapper spawned from another wrapper transaction.</li></ul> |
| Total Elapsed Time | Indicates the total amount of time it took to complete the transaction. |
| Transaction ID | Identifies the transaction by its system-defined ID. |
| Initial Ad ID | Displays the ad ID found in the initial/ primary response. |
| Wrapper Chains | Indicates the number and status of wrapper chains spawned from this transaction.<br /><br />Each wrapper chain starts with a primary transaction followed by one or more wrapper transactions.<br /><br />Green indicates all wrapper chains ended with a successful response containing ads. Yellow indicates a mix of successes and failures.<br />Red indicates all wrapper chains ended with a failed response.<br /><br />Wrapper chains can be collapsed or expanded with the carrot buttons on the left, or with the Expand All / Collapse All buttons. |
| Wrapper Depth | Indicates the position of this wrapper in the chain with the number of parent transactions of this request. 0 is the primary ad request, 1 is for Primary Wrappers, 2 would be the 3rd transaction in the wrapper chain, and so on. |

<Tip>Click on a transaction to view the ad request and the raw XML response from the ad decision server.</Tip>

<Tip>Sort the table to quickly find transactions with similar attributes (e.g., status, wrappers, and creatives).</Tip>

### Transaction Details  {/*transaction-details*/}

View a transaction's request and response by clicking on it from the Transactions tab of the Job Details page.

- The **Request** tab describes either the initial request to an ad decision server or a wrapper.
- The **Response** tab provides the raw XML response provided by an ad decision server and summary information.

**Request**

The **Request** tab describes either the initial request to an ad decision server or a wrapper. This tab reports the following information:

| **Name**  | **Description** |
|----------|----------|
| Request URL     | Typically indicates the request URL. The request URL's query string parameters are reported directly below this URL.<br /><br />**Google Ad Manager and VOD Playback:** If the [ad.output parameter](/uplynk/monetize/ads/google_ad_manager/#ad-parameters) was set to a VAST format (i.e., `xml__vast3` or `xml_vast2`) for a VOD playback session, then this field returns a VMAP template instead of a URL for the initial ad request. However, our service populates this field with a request URL for subsequent wrapper requests. |
| Request Headers | Contains a list of request headers and their values.<br /><br />**Google Ad Manager and VOD Playback:** If the [ad.output parameter](/uplynk/monetize/ads/google_ad_manager/#ad-parameters) was set to a VAST format (i.e., `xml__vast3` or `xml_vast2`) for a VOD playback session, then this section will not be populated for the initial ad request. However, our service populates this section for subsequent wrapper requests. |
| Date Created    | Identifies the date and time at which the ad request was submitted.       |
| Date Updated    | Deprecated.    |
| Total Time      | Identifies the total amount of time, in seconds, it took to submit the ad request and receive a response from the ad decision server.  |
| Connection Time | Identifies the amount of time, in seconds, it took to establish a connection to the ad decision server.  |
| Header Request Time | Identifies the amount of time, in seconds, it took after establishing a connection to send the ad request and to download response headers.     |
| Body Download Time | Identifies the amount of time, in seconds, it took to download the response body. |
| Failure Reason  | Identifies the reason for which the transaction failed. This field reports None for pending or successful ad requests.         |
| Pod Location    | Reserved for future use.  |
| Redirects       | Identifies the number of HTTP redirects (e.g., 302 Found) that were generated as a result of this ad request.<br /><br />**Example:** A request for `http://example.com` may redirect to `https://www.example.com`.


**Response**

The Response tab describes the response from an ad decision server. This tab reports the following information:      |

| Name | Description |
|---|---|
| Raw Response | Contains the raw response provided by the ad decision server. |
| Date Created | Identifies the date and time at which the ad request was submitted. |
| Date Updated | Reserved for future use. |
| Ads | Identifies the number of ad creatives that were provided by the ad decision server as a result of this transaction. |
| Beacons | Identifies the number of beacons that were sent to the ad decision server. |
| In Wrapper | Indicates whether this response is due to a wrapper. |
| Depth | Identifies the number of times that an ad decision server forwarded this ad request to another server. |
| ID | Indicates the system-defined ID assigned to the response. |
| Failure Reason | Identifies the reason for which the transaction failed. This field reports None for pending or successful ad requests. |
| Errors | Indicates any errors that occurred when processing the response. |
| Warnings | Indicates any warnings that occurred. |

### Ads  {/*ads*/}

View the list of ads returned by this ad job here. The following information is reported for each ad:

| Name | Description |
|---|---|
| Selected? | True/ False indicating whether this ad was selected for insertion into the ad break. |
| Break # | Which ad break the ad belong to, 0-indexed. |
| Ad # | Position of the ad within the ad break, 0-index. For example, a break # of 0 and an Ad # of 2 indicates the ad was the third ad inserted into the first ad break. |
| Initial Ad ID | ID of this ad as found in the initial/primary ad response (the top-level parent in the case of wrappers). Otherwise, this will often be the same as the Ad ID. |
| Ad ID | ID of this ad as found in the ad response. |
| Creative ID | ID of the ad asset / creative, as found in the ad response. |
| Duration | Duration of the ad asset, in seconds. |
| Fallback? | True/ False indicating whether this ad was a fallback ad. Fallback ads are used as backup ads in the case other ads are unusable. |
| Asset Status | Displays the status of the ad asset in the Uplynk system. Clicking the button will play the ad if its status is ‘OK’. |

### Beacons {/*beacons*/}

View an ad job's beacons by clicking on an ad job from the Ad Server Debug Query Results page and then clicking on the Beacons tab. The following information is reported for each beacon:

| **Name**| **Description**|
|------|----|
| **Delivered**     | Indicates whether the current beacon was successfully delivered to an ad decision server. Valid values are:<br />- **success:** The ad decision server received the beacon.<br />- **pending:** Our system has not yet sent the beacon to the ad decision server.<br />- **error:** Our system experienced a communication error upon sending the beacon to the ad decision server. For example, an error occurs when the ad decision server does not return a `2xx` response or it takes too long to respond. |
| **Date Created**  | Indicates the date and time at which the beacon was sent to the ad decision server.<Info>For your convenience, date and time are displayed using your local time zone. However, this is not an indicator of the time zone corresponding to the playback session for which ad insertion data is being reported.</Info> |
| **Name**| Indicates the name assigned to the beacon.    |
| **Beacon URL**    | Indicates the URL to which beacon data was sent.       |
| **Type**| Indicates the type of ad event that triggered the beacon. Valid values are:<br />- **IMPRESSION:** Indicates that a creative was rendered.<br />- **ERROR:** Indicates that an error occurred.<br />- **CLICK:** Indicates that the viewer clicked on a creative. |
| **Code**| Indicates the beacon's HTTP status code (e.g., 200).    |
| **Browser**       | Indicates the client's behavior when a viewer clicks on an ad. Valid values are:<br />- **Hide:** Indicates that the ad will continue to play.<br />- **Replace:** Indicates that the client should open the link associated with the ad and switch focus to that content.<Info>This field is only relevant for client-side beacons.</Info> |

<Tip>Sort the table to quickly find beacons with similar attributes (e.g., delivery status or HTTP status code).</Tip>

## Troubleshoot Ad Jobs  {/*troubleshooting-ad-jobs*/}

Troubleshoot ad jobs that contain completed transactions with warnings, failed transactions, or both.

<Tip>Audit your own playback session to correlate the playback experience to ad insertion data.</Tip>

<Info>An ad job is considered to be successfully completed when the initial transactions to the ad decision server are completed in a timely manner. However, a successful ad job may contain transaction(s) with warnings or failures.</Info>

**Troubleshoot an Ad Job**

1. Click on the desired ad job.
2. Click on the desired transaction.
3. From the **Request** tab, review the URL, query string parameters, and headers for the request submitted to the ad decision server.
4. From the right-hand pane, review the **Failure Reason** field.
5. Click the **Response** tab.
6. From the right-hand pane, review the following fields:
   - **Failure Reason:** Indicates the reason that a transaction failed.
   - **Errors:** Indicates any errors that occurred when processing the response.
   - **Warnings:** Indicates any warnings that occurred.
7. Use the information uncovered in the previous step to perform additional investigation into the failure, error, or warning.

<Info>View the transaction in JSON format by clicking **Export Transaction JSON**. The `raw_response` JSON field contains the raw data for the response in XML format.</Info>

### Warnings  {/*warnings*/}

A warning indicates that the request to the ad decision server was incomplete or improperly formed. For example, a warning is generated when the request contains missing parameters or values.

A warning triangle icon appears next to both of the following:

- Ad jobs that contain at least one transaction with a warning.
- The transaction to which the warning applies.

View the warning by hovering over it as illustrated below.

![Ad Server Debug Warning](/images/uplynk/ad-server-warning.png)

In the above illustration, the ad job contains a warning that indicates that a transaction contains 4 empty impressions. Inspecting the transaction's raw response reveals that it does contain 4 empty impressions. Reviewing the `<Error>` tag indicates that an error also occurred. Although the ad decision server returned 4 empty impressions and an error, an ad was still served to the viewer.

```
			<Impression id=\"3rdparty\"/>
			<Impression id=\"3rdparty\"/>
			<Impression id=\"3rdparty\"/>
		<Impression id=\"3rdparty\"/>
```

### Failure  {/*failure*/}

A failed transaction indicates that an ad impression was not delivered either because the transaction did not complete on time or it resulted in an empty or malformed response. View the failure reason by hovering over the transaction's status.

#### Ad Request Failure Reasons  {/*ad-request-failure-reasons*/}

Failures can occur at various stages of processing an ad request. Edgio categorizes the failure reasons into failure types based on these stages.

The failure types are:

- [**Request**](#failure-reasons-request)
- [**Response**](#failure-reasons-response)
- [**Parsing**](#parsing)
- [**Processing**](#processing)

In certain cases, the "Error" section of the job or transaction details includes additional information about an ad failure that can be sent to Edgio Support to help troubleshoot an inquiry about a failed job or transaction.

### Request  {/*failure-reasons-request*/}

An error occurred while establishing an HTTP connection to the ad server and downloading the ad response. To troubleshoot request failures, contact the ad server. The ad server may have some data, or it may not have any data. The Ad Analytics reports can be used to gather data on how frequent these errors occur.

##### Request Errors  {/*failure-reasons-request-errors*/}

| Failure | Description |
|---|---|
| connection error | An error occurred establishing the connection with the ad server. This typically means the ad server was unreachable. |
| connection timeout | The ad server did not respond quickly enough to the connection attempt. Standard timeout is limited to 1 second. |
| download error | There was an error attempting to download the prepared ad response from the ad server. |
| download timeout | The ad server took too long to send the next packet while downloading the ad response. Standard timeout is limited to 1 second. |
| invalid URL | The URL used to make the request was not valid. This typically happens because a wrapper URL contains a bad URL. |
| non 200 | The ad server responded with an error code. Usually either a 4xx or 5xx HTTP status code. |
| read timeout | The ad server took too long to respond back while preparing the ad response. Standard timeout is limited to 1 second. |
| SSL error | There was a problem with the ad server’s security certificate. |


### Response   {/*failure-reasons-response*/}
A high-level check of the response contents ensuring they are in a valid format. For these failures, the ad server should be notified.

#### Response Errors {/*failure-reasons-response-errors*/}

| Failure | Description |
|---|---|
| empty response | The ad response is an empty string with no content. |
| invalid XML | The XML of the ad response was malformed. |
| response too big | The ad response was too big. Ad responses are limited to 1 MB to ensure processing ad jobs aren’t blocked by an enormous ad response. |

### Parsing {/*parsing*/}
Reading and parsing the response to extract the ad information.

For the no ad break, no ads returned and no media file errors, the ad server did not provide the needed information and should be contacted to see why the responses did not include that data. Parse errors can occur for a variety of reasons. Contact support with any questions and be sure to include any additional information provided in the “Errors” section.

#### Parsing Errors {/*parsing-errors*/}

| Failure | Description |
|---|---|
| no ad break | The VMAP ad response did not contain any ad breaks. |
| no ads returned | The ad response did not contain any ads. |
| no media file | The ad response contained ads, but none of the ads contained media files. |
| parse error | Something in the ad response caused parsing to fail. |

### Processing {/*processing*/}
After parsing there are some additional actions taken to ensure the ads are prepared for stitching. Also covers any issues before or between the other stages.

#### Processing Errors {/*processing-errors*/}

| Failure | Description |
|---|---|
| process timeout | The allotted time for completing the ad job expired before being able to finish processing the ad request |

### Audit a Playback Session {/*audit-a-playback-session*/}

Verify that ads are being served properly or troubleshoot ad delivery by auditing a playback session. If you audit your own playback session, you can view the ads that were served and then review the corresponding ad jobs that were triggered by those ads.

#### Audit Your Own Playback Session {/*audit-your-own-playback-session*/}

1. From within your web browser, open developer tools (e.g., Chrome offers DevTools).
2. View your own network traffic by clicking on the **Network** tab.
3. Start video playback of the desired live stream or VOD.
4. From within the **Network** tab of your web browser's developer tools, select a playback request.
5. Copy your playback session ID from the `pbs` query string parameter.
6. Navigate to the [Ad Server Debug page](https://cms.uplynk.com/static/cms2/index.html#/ad-server-debug) via **Services** > **Ad Server Debug**.
7. Paste your playback session ID within the **Session ID** option.
8. Click **Fetch Ad Data**.

   <Tip>Ad job data is provided in near real-time. If the desired results are not returned, try again after a minute or two.</Tip>

9. Review ad job data.

   Retrieve the latest ad job data by performing the following steps:
   - Update the **To** option to the current time.
   - Click **Update Query**.

---
title: Management
---



### Following Operational Best Practices  {/*following-operational-best-practices*/}
### Purging Cached Content  {/*purging-cached-content*/}

Objects are normally updated in or removed from cache during “freshness checks” with your origin. For a given object, a freshness check is initiated when a request has been made for the object, and the object’s TTL (Time To Live) has expired.

In general, setting object TTL is the best and most efficient way to manage cached content. For example, a news site may need to provide rapid updates to a breaking video story. The video can be updated in cache as quickly as desired by assigning it a low TTL value using an HTTP response header. In most cases, there is no need to remove the video from cache directly.

However, there are special cases where content needs to updated on the next user request or even proactively removed from cache as soon as possible. This is known as "purging the cache" or just "purging". Examples of when purging might be necessary include:

- Text is misspelled in the caption of a newly-uploaded video, and you need to update the video in cache as quickly as possible.
- You discover that some of your cached content is infringing a copyright and need to delete the content from cache as soon as possible.
- You lose a contract with a content provider and are obligated to delete the provider’s content from your cache as soon as possible.
- During a full website update, when you need to quickly update many related website objects (images, text, video, etc.) at the same time.

Edgio's SmartPurge executes purge operations more quickly and reliably than older technologies and includes higher purge queue priority and additional API features such as unlimited callbacks.

## Tracking Content Delivery Usage  {/*tracking-content-delivery-usage*/}
Content Delivery provides many different ways to access and view your data. The major types and sources of data are covered in detail in in [Analytics & Reporting](/delivery/delivery/guide/features/#analytics-and-reporting):

- Browser Access: See [Viewing Reports in Control](#viewing-reports)
- Realtime Reporting API Access: See Accessing Report Data via the Reporting API
- File Retrieval
    - Server Logs - See [Retrieving Content Delivery Logs](#retrieving-logs)
    - Download Completion Reports - see [Retrieving Download Completion Reports](#retrieving-download-completion-reports)
- Notifications: See [Receiving Real-Time Download Completion Receipts](#receiving-realtime-download-completion-receipts)

## Monitoring the User Experience  {/*monitoring-the-user-experience*/}
### Using Measurement Services  {/*using-measurement-services*/}
In addition to tracking content usage, you may want to subscribe to a service specifically designed to monitor and report on the end-user experience. It’s not necessary to configure Content Delivery to use these services - simply provide the Published URLs for objects you want to track.

Popular monitoring services include those from Catchpoint, Cedexis, Soasta, Dynatrace (Gomez) and Keynote.

### Capturing User IP & Geo Information  {/*capturing-user-ip-and-geo-info*/}
If you want to capture and analyze user IP address and geographic location yourself, Content Delivery can include this information in special request headers when making requests to your origin. For more information on these custom headers, please see [Geo IP Info in Headers](/delivery/delivery/guide/features/#geo-ip-info-to-origin) to Origin and [True-Client-IP in Headers to Origin](/delivery/delivery/guide/features/#true-client-ip-origin).

## Changing Content Delivery Configuration  {/*changing-content-delivery-config*/}
See [Configuring Content Delivery](/delivery/delivery/guide/implementation) for details.

## Accessing Content Delivery APIs  {/*accessing-content-delivery-apis*/}
The Content Delivery service includes APIs that give you programmatic access to the following features:

- [Realtime Reporting](https://support.limelight.com/public/openapi/realtimereporting/index.html) gives you access to any realtime data available in reports in the Control
- [SmartPurge](/delivery/delivery/smartpurge/smartpurge_rest_api) lets you submit purge requests and check their status
Please note that the credentials you need to access an API are unlikely to be the same as your Control credentials. To request credentials for a specific API, please contact Edgio Support.

## Viewing IP Allow Lists  {/*viewing-ip-allow-list*/}
You can now view the current IP addresses of Edgio Edge Servers to update your firewall, without logging into the Control. The IP allow list returned from the API call is versioned, so you can compare the current version with the prior version to see how the list has changed.

You can use either the REST API or the [RSS feed](https://control.llnw.com/aportal/support/documentation/iprssfeed/v2) to view the IP allow list.

### API Specification {/*api-specification*/}
The endpoint returns a versioned list of allowed IP addresses, expressed in JSON.
- HTTP Method: `GET`
- URL: `https://control.llnw.com/aportal/api/ipam/getIpAllowList.do`

**Required Request Headers**
|Header|Description|
|---|---|
|`X-LLNW-Security-Principal`	|Caller’s user name|
|`X-LLNW-Security-Timestamp`	|Current system UTC time in milliseconds
|`X-LLNW-Security-Token`	|HMAC-256 digest calculated using the caller’s API shared key on HTTP Method + URL + timestamp|

**Sample Request**
`https://control.llnw.com/aportal/api/ipam/getIpAllowList.do`

**Sample Request Headers**
`X-LLNW-Security-Principal: sample_user`

`X-LLNW-Security-Timestamp: 1465226821474`

`X-LLNW-Security-Token:b62f93cdde95e94b814ba824430a25cfd31fc13f485f201f6878754caf6f0493`

**Sample JSON Response**
```json
{
    "ipAllowList":["1.9.58.160/27",
    "37.238.255.224/27",
    "41.63.64.0/18"],
    "version":1
}
```
### RSS Feed  {/*rss-feed*/}
Subscribe to https://control.llnw.com/aportal/support/documentation/iprssfeed/v2.

Each IP address is in a content:encoded element within a parent item element. Example:

```
<item>
    <content:encoded>69.28.128.0/18</content:encoded>
</item>
```

## Receiving Real-Time Download Completion Receipts  {/*receiving-realtime-download-completion-receipts*/}
*Download Completion Receipts* are real time notifications of specific download events, and are sent in the form of HTTP GET requests to an IP address or URL you specify during setup.

Receipts are triggered by specific stages in the HTTP download process, and each receipt contains detailed information such as the URL of the requested object, the current download status, the IP address of the requesting client, and so on. The information is provided in predefined query terms appended to the GET request.

If you are delivering a high volume of HTTP downloads, or expect significant download peaks, the receiving web server(s) should be able to handle the anticipated request load.

<Callout type="info">*Download Completion Receipts* are not included in the Content Delivery service, and must be ordered separately.</Callout>

## Retrieving Download Completion Reports  {/*retrieving-download-completion-reports*/}
*Download Completion Reports* and *Download Completion Geo Reports* record the aggregate daily status of HTTP downloads.

For each URL, completion reports include the number of download requests initiated, the number and percentage of downloads completed, and may include optional geographic information. Both reports are available as .csv files through your FTP Account.

<Callout type="info">These reports are not included in the Content Delivery service and must be ordered separately.</Callout>

## Retrieving Logs  {/*retrieving-logs*/}
Edgio provides log data generated by worldwide Content Delivery servers via the Live Logs service. Live Logs are updated throughout the day as individual server log data is received and processed.

## Viewing Reports in Control  {/*viewing-reports*/}
The reports provided by Control let you track overall traffic and detailed content usage for the Content Delivery service.

Reports are grouped by the major types of data they present. Available report titles include:

- [Billing](/delivery/control/reports/traffic/billing)
- [LivePush Streaming](/delivery/control/reports/traffic/live_push)
- [Live Stats](/delivery/control/reports/traffic/live_stats)
- [Traffic](/delivery/control/reports/traffic/traffic)

### Content
[Origin Storage](/delivery/control/reports/content/origin_storage)

### Storage
[Status Codes](/delivery/control/reports/content/status_codes)

You can use Content Delivery report data for a variety of purposes, including budget planning, marketing analytics and performance analysis and troubleshooting.

Report data can be displayed in hourly, daily, weekly, or monthly increments for both predefined and custom date ranges. All report charts are interactive and let you drag to zoom in on interesting data.

You can also set up any report to be emailed to you automatically at your preferred interval.

For more information, see the [Reports](/delivery/control/reports) section of the [Control Portal User Guide](/delivery/control).

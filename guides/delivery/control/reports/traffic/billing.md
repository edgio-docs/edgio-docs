---
title: Billing
---

The Billing Report shows monthly traffic for your active products and services and your Edgio accounts. You can use data in the report for various reasons such as cost estimates for future Edgio invoices.

<Callout type="info">Due to data filtering and proration, data in the Billing report may not align with data in other individual reports. For more information, see [Filtering of Late-Arriving DataDashboard](/delivery/reports/general_information#filtering-of-late-arriving-data).</Callout>

## Billing Types  {/*billing-types*/}
The data in the report depends on the selected billing type.

|Billing Type| Metrics | Dimension|
|---|---|---|
| Content Delivery	| 95th Percentile of Inbound (Mbps), 95th Percentile Of Outbound (Mbps), 95th percentile of the total (Mbps) <br /> Data Transfer in (GB), Data Transfer out (GB), Data Transfer Total (GB) <br /> Requests (10Ks)| Service or account, depending on the selection in the drop-down menu above the table on the right.|
|DNS	| Number of Outbound Requests |	Account |
|DRM	|Number of Outbound Requests	|Account|
|EdgeFunctions	|Count of Invocations, Compute Usage (allocated memory x function execution time)|Account|
|Intelligent Ingest	|Total GB Transferred, Number of Sessions (Requests)|	Account|
|Origin Storage	|Count of Unique Objects in, Count of Unique Bytes in Origin Storage (GB), Total Bytes Retrieved from Origin Storage (GB)|Policy or account, depending on the selection in the drop-down menu above the table on the right.|
|Live Push Ingest	|Total Ingest Traffic (GB)|Account|
|MMD Live	|*Data Transfer IN, Transcode bytes TOTAL, Transcode pixels TOTAL	|Account|
|MMD Live to VOD|	Number of Minutes Recorded	|Account|
|SSL SNI Certificate Hosting	|Count of published certificates	|Account|
|Transit	|Data Transfer in (GB), Data Transfer out (GB), Data Transfer Total (GB) <br />95th Percentile of Inbound (Mbps), 95th Percentile of Outbound (Mbps), 95th percentile of the total (Mbps), 95th Percentile High of Inbound and Outbound Mbps|Account|

* Transcode bytes TOTAL is the total number of bytes transcoded. Transcode pixels TOTAL is the total number of pixels transcoded during the process of transcoding an RTMP stream. Transcoding is the process of receiving an RTMP stream with a single bitrate and outputting it to multiple bitrates.

## Understanding The Report  {/*understanding-the-report*/}

## Working with Report Data  {/*working-with-report-data*/}

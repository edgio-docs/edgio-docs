---
title: Ad Log File Delivery
---

Our service may automatically deliver compressed ad log data to an Amazon S3 bucket by submitting HTTPS PUT requests to it. Each request adds an object to the bucket. This object contains a CSV file that uniquely identifies a set of log data and describes one or more log entries. Log fields within a log entry are separated by tabs.

<Callout type="info">Ad log data is typically delivered within 30 minutes.</Callout>

## Set Up Log Delivery  {/*set-up-log-delivery*/}

1. **Create or Identify an Amazon S3 Bucket**
   - Create a new Amazon S3 bucket or identify an existing one where log data will be posted.
   - For instructions on creating a bucket, refer to the [AWS documentation on how to create a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html).

2. **Contact Your Account Manager**
   - Reach out to your account manager to obtain the AWS IAM ARN through which the log data will be delivered.

3. **Authorize the IAM ARN**
   - Authorize the identified IAM ARN to perform the following actions on the Amazon S3 bucket:
     - s3:Put*
     - s3:ListBucket
     - s3:GetBucketLocation
   - For details on setting permissions, see the [AWS documentation on permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).

4. **(Optional) Set Up AWS for Log Data Processing**
   - Configure AWS services to process the log data posted to the S3 bucket.
   - **Example:**

     Use [AWS Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html) to load the CSV files from the bucket and run queries on the log data.

### Types of Ad Log Data  {/*types-of-ad-log-data*/}

Ad log data provides the following information:

- **Jobs**: An ad job consists of transactions and beaconing data.

- **Transactions**: A transaction consists of requests for ads and the responses provided by an ad decision server. The response may either be a wrapper or a creative.

- **Beaconing Data**: Beacons consist of the data reported by our system to the ad decision server.

## Job  {/*job*/}

An ad job consists of transactions and beaconing data.

| Field | Description |
|---|---|
| **Channel Description**<br />String | Identifies the job's channel or live event description. |
| **unique_record_id**<br />String | Identifies this log event via a system-defined ID (UUID). |
| **created_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the job was created. |
| logged_timestamp<br />String | Indicates the [timestamp](#timestamp) at which this job was logged. |
| **job_id**<br />Number (Long) | Identifies the ad job via a system-defined ID. |
| **status**<br />String | Indicates whether this job's transactions were completed successfully. Valid values are: `complete \| fail` |
| **ad_request_index**<br />Number (Integer) | Identifies the position of this job's ad break by its index value. |
| **channel_id**<br />String | Identifies the job's live channel by its system-defined ID. |
| **owner_name**<br />String | Identifies the account by name or email address. |
| **asset_type**<br />String | Indicates whether the source video was captured from the Live Slicer or VOD. Valid values are: `live \| vod` |
| **video_id**<br />String | Identifies content by its system-defined ID.<br /><Callout type="info">This field does not identify the ad creative corresponding to this job.</Callout> |
| **viewer_id**<br />String | Identifies the viewer by playback session ID. |

**Sample Log Data**

The following sample log data contains two jobs:

```
c1ec9765-7ec5-495b-b300-62ebd4b68623  2022-06-08T22:24:17.387Z  2022-06-08T22:24:17.544Z  5e8b711a-d5c6-4b2b-9b33-3c6e90a7a7e3  complete  5 1b3cc490c030410eba27ab3668836e9b  joe@example.com live  7214a224cd5f41c2aa294689dbaatest  0f3d844342d148f2a2fb92a06d38e03a
```
```
445168db-0461-46c1-adf8-12f0cc634deb  2022-05-31T01:20:37.979Z  2022-05-31T01:20:39.074Z  f5e5e9e5-a656-4ef5-ab89-24312b1ea3ca  complete  1 ""  joe@example.com  vod 9a497a6ee69test69371499105effbcc  e4818cb063704679b3db0313ca74824a
```

## Request  {/*request*/}

Request log data describes a request for an ad.

| Field | Description |
|---|---|
| **Wrapper Depth**<br />Number | Indicates the wrapper depth of the request transaction. |
| **unique_record_id**<br />String | Identifies this log event via a system-defined ID (UUID). |
| **created_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the request was submitted. |
| **logged_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the request was logged. |
| job_id<br />Number (Long) | Identifies the ad job via a system-defined ID. |
| **status**<br />String | Indicates whether this job's transactions were completed successfully. Valid values are: `complete \| fail` |
| **request_id**<br />String | Identifies the request by its system-defined ID. |
| **total_elapsed_request_time**<br />Number (Double) | Indicates the total amount of time, in seconds, it took to submit a request and receive a response from the ad decision server. |
| **connection_time**<br />Number (Double) | Indicates the amount of time, in seconds, it took to connect to the ad decision server. |
| **header_request_time**<br />Number (Double) | Indicates the amount of time, in seconds, it took between sending request header data and receiving a response from the ad decision server. |
| **body_download_time**<br />Number (Double) | Indicates the amount of time, in seconds, it took to download the request body.<br />Example: `3.85284423828125E-4` |
| **pod_location**<br />String | Identifies the location of the ad relative to the live stream. Valid values are:<br />preroll \| midroll \| postroll |
| **failure_reason**<br />String | Indicates the reason why the job failed. Valid values are: `DB_FAILURE \| DEADLINE_FAILURE \| MISSING_AD_BREAK \| MISSING_MEDIA_FILE \| NO_FAILURE \| PARSER_FAILURE \| PROCESSING_TIMEOUT_FAILURE \| REQUEST_FAILURE \| RESPONSE_FAILURE \| UNKNOWN_FAILURE` |
| **request_succeeded**<br />Boolean | Indicates whether the request was successful. Valid values are: `true \| false`<br /><Callout type="info">A successful request does not indicate that an ad was served to the user. Rather, it indicates that the ad decision server did not return an error. </Callout>|
| **is_wrapper**<br />Boolean | Indicates whether the request is a wrapper or creative. Valid values are: <ul><li>true: Wrapper</li><li>false: Creative</li></ul> |
| **start_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the request to the ad decision server was submitted. |
| **end_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the response from the ad decision server was processed. |
| **parent_request_id**<br />String | Identifies the system-defined ID for the request that is the wrapper for the current request. If the current request does not have a parent, then this field will report None. |

**Sample Log Data**

The following sample log data contains two requests:

```
64d0985c-f603-43a9-8c1e-ff6af8edf9bb  2022-06-08T18:22:07.055Z  2022-06-08T18:22:07.454Z  a66717b9-a860-4d42-b4cb-41b28f52e5b8  complete  cd500e60-85a2-4a83-80c2-f1323d5403f0  0.3908860683441162  0.013627964080810573  0.377111  1.4710426330566406E-4 ""  ""  true  false 2022-06-08T18:22:07.055Z  2022-06-08T18:22:07.447Z  -
```

```
b4df6e49-b99c-487d-9182-dab06d5b1f2b  2022-06-02T18:34:03.676Z  2022-06-02T18:34:03.746Z  d594ee1c-7bb2-44ed-bd36-fdeb9a19cea7  complete  121651e9-ddcc-429f-85b2-06e42f05b5aa  0.05933880805969238 0.0038710416564941424 0.055324  1.437664031982422E-4  ""  ""  true  false 2022-06-02T18:34:03.676Z  2022-06-02T18:34:03.743Z  -
```

## Response  {/*response*/}

Response log data describes the response from an ad decision server.

| Field | Description |
|---|---|
| **unique_record_id**<br />String | Identifies this log event via a system-defined ID (UUID). |
| **created_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the response was submitted. |
| **logged_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which the response was logged. |
| **job_id**<br />Number (Long) | Identifies the ad job via a system-defined ID. |
| **status**<br />String | Indicates whether this job's transactions were completed successfully. Valid values are: `complete \| fail` |
| **request_id**<br />String | Identifies the request by its system-defined ID. |
| **ad_count**<br />Number (Integer) | Indicates the number of ads served by the ad decision server within this response. |
| **wrapper_count**<br />Number (Integer) | Indicates the number of wrappers contained within this response. |
| **impression_count**<br />Number (Integer) | Indicates the number of impressions that were returned in the response. |
| **range_bytes**<br />Number (Integer) | Indicates the size of the response in bytes. |
| **event_error_message**<br />String | Indicates the error messages that occurred when unwrapping the response. Returns a blank value if an error has not occurred. |

**Sample Log Data**

The following sample log data contains two responses:

```
8ca26ff8-c819-4746-b441-eca10eba5d58  2022-06-03T22:57:39.775Z  2022-06-03T22:57:40.068Z  db5526f0-5716-47f1-918b-15dea51a3b9d  complete  f29fa7c9-f5fa-4588-bb38-fa833e9ddbe3  1 0 - 27784 ""
```

```
2e123bec-167d-4fdc-83f5-198f4cfbe0e7  2022-06-03T23:09:14.081Z  2022-06-03T23:09:14.876Z  59d89267-c140-4a2c-b0d5-51d2e2dcdb1e  complete  4a4dd241-6db4-4b34-9b0f-204a36b62048  7 5 - 223831  ""
```

## Beacon  {/*beacon*/}

Beacon data consists of the data exchanged between the ad decision server and our system.

| Field | Description |
|---|---|
| **unique_record_id**<br />String | Identifies this log event via a system-defined ID (UUID). |
| **created_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which beaconing data was submitted. |
| **logged_timestamp**<br />String | Indicates the [timestamp](#timestamp) at which beaconing data was logged. |
| **job_id**<br />Number (Long) | Identifies the ad job via a system-defined ID. |
| **beacon_id**<br />String | Identifies the beacon by its system-defined ID. |
| **event_callback_name**<br />String | Identifies the beacon by the name provided by the ad decision server. |
| **url**<br />String | Indicates the beacon's URL. |

**Sample Log Data**

The following sample log data contains two beacons:

```
b1eaa87c-aad7-460b-a246-7f43dee1d1ac  2022-06-07T17:40:06.332Z  2022-06-07T17:40:06.332Z  e298612f-fa3f-4c46-98b5-7d78a8be4ee4  e298612f-fa3f-4c46-98b5-7d78a8be4ee4-0-1--thirdquartiles-0  thirdquartiles  https://example.com/proxy/tracker/v2?pid=5dee561f0221d82b5b694bad8d6ceed4fe1514fc9f6378988d4725efb2c7598f&tid=e27841dc-208f-4ae2-8626-e9d9cf8e2028&dcid=9d63ca75-70d2-49ca-931e-03a2b4504279&cf=short_form&loc=CMgGECwYTSDvBC2PwgNCNRSuwcI6BmRhbGxhc0IFNzUyNDQ&rnd=%5BCACHEBUSTING%5D&acp.rqt=linear&tz=-04%3A00&rbp=3&aid=7ffed83c-44ad-3ce9-be7c-ce0f63b276da&tt=m&icd_tnr=1&icd_lkpt=2022-06-07T14%3A40%3A31Z&icd_bid=0&icd_bct=1654623510&icd_vm=1&icd_ibid=c907150b-de95-464a-88d8-f1a09fbd40ed&icd_cs=DISCHD_305&icd_ai=YVCX17792FN&icd_nz=305&icd_srid=550&edge_adtype=0&icd_adr=350082&icd_olt=5&ad_dur=30&e=17
```

```
9cb4688f-911e-4df4-99e8-95bccf575fad  2022-06-01T03:03:24.886Z  2022-06-01T03:03:24.886Z  ae816075-9654-4af2-be85-87aad4c94528  ae816075-9654-4af2-be85-87aad4c94528-0-0--impressions-0 impressions https://example.com/live/pcs/view?xai=AKAOjsuwtiF_KOwoxeL6uLmnAqnLePfFV0Eh95Q7PXbvk1hMekiBt6VXJNMiCeiL2ou0gMAo4gXBzY56QdcLYtaoGYlUdioG4dlFx7PyBLx84iT2CY-tEVMLbzvCYXywSnh4ElOSGx5H33lMNLqRg2cOOUGnchOZkGvj_5QQwdikj7kciJ1hrU7reJ0hQo0UKMaRPsVSQwAiQ3BWtmtPuiqMThqLf2nm_voBDKIRVoillY3SppcZDJoj79n7pNxF18sMBFzf5bsZjU4EWbNo2oYabRJTY4sU9d90Ol3K-gofi55vC1YlnJ_ukQXZD9s&sai=AMfl-YTQQnBeH5AC3eyZVGSfYwNXc7Io7mxEjzn_W59ZvrVj&sig=Cg0ArKJSzOt2_tBqik2iEAE&uach_m=[UACH]&adurl=
```

## Timestamps  {/*timestamp*/}

Timestamps are reported using the following syntax:

`YYYY-MM-DDThh:mm:ss.sZ`

The variables used for the date and the date/time formats are described below.

| Variable | Description |
|---|---|
| YYYY | Represents a year in the Gregorian calendar using a four digit number (e.g., 2023). |
| MM | Represents a two digit month between 01 (January) and 12 (December). |
| DD | Represents a two digit day between 01 and 31. |
| T | Indicates a delimiter between date and time. This delimiter is only required if you would like to specify a time. Keep in mind that time must be specified using 24-hour clock notation in UTC/GMT. |
| hh | Represents a two digit hour between 00 (midnight) and 23 (11 p.m.). |
| mm | Represents the number of minutes (i.e., 00 - 59) into the specified hour. |
| ss | Represents the number of seconds (i.e., 00 - 59) into the specified minute. |
| s | Represents the millionths (i.e., 000000 - 999999) into the specified second. |
| Z | Represents UTC time. |

**Example**

`2019-06-29T03:13:07.340889Z`

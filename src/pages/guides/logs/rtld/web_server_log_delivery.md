---
title: Log Delivery Setup
---

PLACEHOLDER

-   Log fields vary by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)


Learn more: [RTLD CDN](Log-Fields.htm) | [RTLD Rate Limiting](Log-Fields-RTLD-Rate-Limiting.htm) | [RTLD WAF](Log-Fields-RTLD-WAF.htm)


## Quick Start

PLACEHOLDER

1.  Prepare your destination for log delivery. 

    -   [AWS S3](#aws-s3-log-delivery)
    -   [Azure Blob Storage](#azure-blob-storage-log-delivery)
    -   [Datadog](#datadog-log-delivery)
    -   [Google Cloud Storage](#google-cloud-storage-log-delivery)
    -   [New Relic](#new-relic-log-delivery)
    -   [Splunk Enterprise](#splunk-enterprise-log-delivery)
    -   [Sumo Logic](#sumo-logic-log-delivery)
    -   [Web Server (HTTP POST)](#web-server-log-delivery)

2.  [Create a log delivery profile](#managing-log-delivery-profiles) for your destination.

## AWS S3 {/*aws-s3-log-delivery*/}

RTLD may automatically deliver compressed log data to an AWS S3 bucket by submitting HTTPS PUT requests to it. Each request adds an object to the bucket. This object contains a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   RTLD applies gzip compression to log data. AWS S3 stores compressed log data as an object with a `gz` file extension.
    
    [Learn more.](#log-file-naming-convention)
    
-   AWS S3 may automatically decompress files downloaded via the S3 Management Console into JSON or CSV files. No additional decompression is required to process this data.
-   RTLD requires a [bucket policy](#bucketpolicy) that authorizes our service to upload content to your bucket.
-   If you have enabled server-side encryption on the desired AWS S3 bucket, then you must also enable default bucket encryption. Otherwise, RTLD will be unable to post log data to that bucket.
    
    RTLD does not include Amazon-specific encryption headers when posting log data to your bucket.
    
    [View AWS documentation on default bucket encryption.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)

    <a id="aws-s3-prefix" />

-   You may define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be pre-pended to the name of each object added to your bucket. Use the following guidelines when setting this prefix:
    
    -   A prefix should not start with a forward slash.
    -   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
    -   A trailing forward slash means that the specified value only defines a virtual directory path within your bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to your destination.
        
    **Sample prefix:** `logs/CDN/siteA_`
        
    The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
    The file name for each log file uploaded to your destination will start with `siteA_`.
        
    **Sample log file name:** `siteA_wpc_0001_123_20220111_50550000F98AB95B_1.json`

**To set up AWS S3 log delivery**

1.  Create or identify an AWS S3 bucket to which log data will be posted.
    
    [View AWS documentation on how to create a bucket.](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)
    
2.  Apply the following bucket policy to the AWS S3 bucket identified in step 1. This bucket policy authorizes our service to upload content to your bucket.
    
    [View AWS documentation on how to add a bucket policy.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html)

    ```AWS-S3-Bucket-Policy
    {
    	"Version": "2012-10-17",
    	"Statement": \[{
    			"Sid": "CDNRealTimeLogDelivery",
    			"Effect": "Allow",
    			"Principal": {
    				"AWS": "arn:aws:iam::638349102478:user/real-time-log-delivery"
    			},
    			"Action": \[
    				"s3:PutObject",
    				"s3:GetBucketLocation",
    				"s3:PutObjectTagging",
    				"s3:PutObjectACL"
    			\],
    			"Resource": \[
    				"arn:aws:s3:::BUCKET-NAME",
    				"arn:aws:s3:::BUCKET-NAME/\*"
    			\]
    		}
    	\]
    }
    ```
    
    Replace the term `BUCKET-NAME` in lines 16 and 17 with the name of the AWS S3 bucket to which this policy is being applied.
    
3.  If you have enabled server-side encryption on the AWS S3 bucket identified in step 1, then you must also enable default bucket encryption.
    
    [View AWS documentation on default bucket encryption.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)
    
4.  Optional. Set up AWS to process the log data that will be posted to it.
    
    Example:
    
    Leverage [AWS Lambda](https://aws.amazon.com/documentation/lambda/) to mine specific data from log entries.
    
5.  [Create a log delivery profile](#managing-log-delivery-profiles) for AWS S3.

## Azure Blob Storage {/*azure-blob-storage-log-delivery*/}

RTLD may automatically deliver compressed log data to an Azure Blob Storage container by submitting HTTPS PUT requests to it. Each request creates a block blob within the container. This block blob contains a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   RTLD applies gzip compression to log data. Azure Blob Storage stores compressed log data as an object with a `gz` file extension.
    
    [Learn more.](#log-file-naming-convention)
    
-   Setting up log delivery to Azure Blob Storage requires:

    -   An existing Azure Blob Storage account.
    
        [Get started.](https://azure.microsoft.com/en-us/services/storage/blobs/)
    
    -   A container to which log data will be uploaded.

        <a id="azure-blob-container-url" />

    -   A base URL that points to your container.
    
        **Blob Container URL:** `https://Storage Account.blob.core.windows.net/<CONTAINER>`
    
        **Sample Blob Container URL:** `https://myaccount.blob.core.windows.net/mycontainer`
    
    -   Either a SAS token or an access key through which our service will authorize requests to upload content to your Azure Blob Storage account.
    
        If you plan on providing a SAS token, make sure that the token has permission to write to the blob/container. Additionally, it should start with sv= and it should not include a ?.
    
        **Sample SAS token:**
    
        `sv=2018-03-28&sr=c&si=myblobReadWritekey1\_123456789012345678&sig=a1bCDefghijklMnOpqrsTuv2wXYzABc3d34efGHIjkL%5M`
    
-   You may define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be pre-pended to the name of each object added to your bucket. Use the following guidelines when setting this prefix:
    
    -   A prefix should not start with a forward slash.
    -   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
    -   A trailing forward slash means that the specified value only defines a virtual directory path within your bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to your destination.
        
    **Sample prefix:** `logs/CDN/siteA_`
        
    The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
    The file name for each log file uploaded to your destination will start with `siteA_`.
        
    **Sample log file name:** `siteA_wpc_0001_123_20220111_50550000F98AB95B_1.json`

**To set up Azure Blob Storage log delivery**

1.  Create or identify an Azure storage account and a container to which log data will be posted.
    
    [View Microsoft Azure documentation on how to create a storage account.](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account)
    
2.  Identify or configure how requests submitted will be submitted by RTLD will be authorized. 

    RTLD supports authorization through a SAS token or an access key.

    <Callout type="info">

      If you plan on providing a SAS token, make sure that the token has permission to write to the blob/container. Additionally, it should start with `sv=` and it should not include a `?`.

    </Callout>

3.  [Create a log delivery profile](#managing-log-delivery-profiles) for Azure Blob Storage.

## Datadog {/*datadog-log-delivery*/}

RTLD may automatically deliver compressed log data to Datadog by submitting HTTPS POST requests to it. Datadog will collect these requests as they are pushed from the CDN. Each request contains a compressed JSON document that describes one or more log entries.

The format for log data delivered to Datadog is JSON Array. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.

**To prepare Datadog for log delivery**

1.  From within the Datadog portal, copy your API key.
2.  Identify the Datadog location to which log data will be delivered.
3.  [Create a log delivery profile](#managing-log-delivery-profiles) for Datadog.

## Google Cloud Storage {/*google-cloud-storage-log-delivery*/}

RTLD may automatically deliver compressed log data to a Google Cloud Storage bucket by submitting HTTPS PUT requests to it. Each request adds an object to a Cloud Storage bucket. This object contains a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   RTLD applies gzip compression to log data. Google Cloud Storage stores compressed log data as an object with a `gz` file extension. [Learn more.](#log-file-naming-convention)
-   Configure your Google Cloud Storage bucket as follows:

    -   The recommended configuration is to set the **Access control** option to `Uniform`.
    -   Set the **Encryption** option to a Google-managed encryption key.
    -   Authorize RTLD to upload content by adding the following user with the **Storage Object Creator** role:

        `vdms-partner-gcs-transfer@maw-partner-gcs.iam.gserviceaccount.com`
    
        [View Google Cloud Storage documentation on how to set up an IAM policy for a bucket.](https://cloud.google.com/storage/docs/access-control/using-iam-permissions)
    
    [View Google Cloud Storage documentation on how to create a bucket.](https://cloud.google.com/storage/docs/creating-buckets)

-   You may define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be pre-pended to the name of each object added to your bucket. Use the following guidelines when setting this prefix:
    
    -   A prefix should not start with a forward slash.
    -   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
    -   A trailing forward slash means that the specified value only defines a virtual directory path within your bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to your destination.
        
    **Sample prefix:** `logs/CDN/siteA_`
        
    The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
    The file name for each log file uploaded to your destination will start with `siteA_`.
        
    **Sample log file name:** `siteA_wpc_0001_123_20220111_50550000F98AB95B_1.json`

**To set up Google Cloud Storage log delivery**

1.  Create or identify a Google Cloud Storage bucket to which log data will be posted.

2.  Add the following user to the bucket and assign it the **Storage Object Creator** role:
    
    `vdms-partner-gcs-transfer@maw-partner-gcs.iam.gserviceaccount.com`
    
3.  Optional. Set up Google Cloud to process the log data that will be posted to it.
    
    **Example:**
    
    Load logs into [BigQuery](https://cloud.google.com/storage/docs/access-logs) and then leverage BigQuery functionality through the [BigQuery Browser Tool](https://cloud.google.com/bigquery/bigquery-browser-tool).

4.  [Create a log delivery profile](#managing-log-delivery-profiles) for Google Cloud Storage.

## New Relic {/*new-relic-log-delivery*/}

RTLD may automatically deliver compressed log data to your New Relic account by submitting HTTPS POST requests to it. Each request represents a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

The format for log data delivered to New Relic is JSON Array. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.

<Callout type="tip">

  You must define an event type when setting up a log delivery profile. Query delivered log data by constructing a NRQL that selects data using this event type label (e.g., `SELECT \* FROM Event Type`).

</Callout>

<!--
RTLD CDN and RTLD Rate Limiting support delivery to the New Relic destination.
-->

**To set up New Relic log delivery**

1.  Optional. Register an Inserts insight API key that is dedicated for RTLD log delivery.
    
    [View New Relic documentation on how to register an Inserts insight API key.](https://docs.newrelic.com/docs/telemetry-data-platform/ingest-manage-data/ingest-apis/introduction-event-api/)
    
2.  [Create a log delivery profile](#managing-log-delivery-profiles) for New Relic.

## Splunk Enterprise {/*splunk-enterprise-log-delivery*/}

RTLD may automatically deliver compressed log data to Splunk Enterprise by submitting HTTPS POST requests to it. The Splunk HTTP Event Collector (HEC) will collect and log each request. Each request contains a compressed JSON document that describes one or more log entries.

The format for log data delivered to Splunk Enterprise is JSON Lines. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.

**Key information:**

-   The prerequisite for log delivery are:
    -   Splunk Enterprise 7.x
    -   Your instance of Splunk Enterprise 7.x must be secured with SSL.
    -   SSL must be enabled on the HTTP Event Collector.
        
    For information on how to set up Splunk Enterprise, please refer to [their documentation](https://docs.splunk.com/Documentation).

**To set up Splunk Enterprise log delivery**

1.  Set up Splunk Enterprise's HTTP Event Collector to accept CDN log data in JSON format.

    1.  From with Splunk Enterprise, click **Settings** and then **Add Data**.

        ![](/images/logs/splunk-1.png?width=500)
        
    3.  Click **Monitor**.
        
        ![](/images/logs/splunk-2.png?width=500)
        
    4.  Click **HTTP Event Collector**.
        
        ![](/images/logs/splunk-3.png?width=500)
        
    5.  In the **Name** option, define a name for the CDN log data that will be collected.
        
        ![](/images/logs/splunk-4.png?width=500)
        
    6.  Click **Next >**.
    7.  Click **Select** to display the **Select Source Type** option. Click that option, type `\_json` to filter source types, and then select it.
        
        ![](/images/logs/splunk-5.png?width=500)
        
    8.  Click **Review**.
    9.  Click **Submit >** to finish setting up the HTTP Event Collector. An HEC token will be generated. Use this token to authorize requests posted to the HEC.

2.  Perform the following steps if you have hosted Splunk Enterprise within your network:
    
    1.  Configure your firewall to allow POST requests from the following IP blocks:
        
    2.  Set up support for the HTTPS protocol.
        
        Log delivery requires a certificate whose trust anchor is a publicly trusted certificate authority (CA). Additionally, the certificate must include a chain of trust for all intermediate certificate(s) and a leaf certificate.

3.  [Create a log delivery profile](#managing-log-delivery-profiles) for Splunk Enterprise.

## Sumo Logic {/*sumo-logic-log-delivery*/}

RTLD may automatically deliver compressed log data to Sumo Logic by submitting HTTPS POST requests to it. Sumo Logic will collect these requests as they are pushed from the CDN. Each request represents a compressed JSON document that describes one or more log entries.

The format for log data delivered to Sumo Logic is JSON Lines. This log format does not provide information that uniquely identifies a set of log data. As a result, there is no way to check for gaps in sequence numbers when attempting to identify missing log data.

**To set up Sumo Logic log delivery**

1.  Set up Sumo Logic to listen for CDN log data in JSON format.
    
    1.  Log in to Sumo Logic.
    2.  Click **Setup Wizard**.
        
        ![](/images/logs/sumo-logic-1.png)
        
    3.  Click **Set Up Streaming Data**.
        
        ![](/images/logs/sumo-logic-2.png?width=500)
        
    4.  Click **Your Custom App**.
        
        ![](/images/logs/sumo-logic-3.png)
        
    5.  Click **HTTP Source**.
        
        ![](/images/logs/sumo-logic-4.png?width=500)
        
    6.  In the **Source Category** option, type the name of the tag that will be applied to CDN log data. This tag may be used to search for CDN log data within Sumo Logic.
        
        ![](/images/logs/sumo-logic-5.png)
        
    7.  Click **Continue**. An HTTP Source for CDN log data will be created.
    8.  Copy the URL associated with this HTTP Source.

2.  [Create a log delivery profile](#managing-log-delivery-profiles) for Sumo Logic.

## Web Server Log Delivery {/*web-server-log-delivery*/}

RTLD may automatically deliver compressed log data to a web server by submitting HTTPS `POST` requests to it. The body for each of these requests will be a JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

<Callout type="info">

  RTLD applies gzip compression to log data. Each HTTPS `POST` request includes a `Content-Encoding` header set to `gzip`.

</Callout>

<a id="prepare-web-servers-for-log-delivery" />

**To prepare your web servers for log delivery**

1.  Configure your web server(s) to:
    
    -   Support the HTTPS protocol.
        
        <Callout type="important">

          Log delivery requires a certificate whose trust anchor is a publicly trusted certificate authority (CA). Additionally, the certificate must include a chain of trust for all intermediate certificate(s) and a leaf certificate.

        </Callout>
        
    -   Allow HTTPS `POST` requests.
    -   Return a 2xx response (e.g., `200 OK`) whenever data is successfully received.

        <Callout type="important">

          If your web server responds with any other status code, then our service will retransmit the same log data at regular intervals. This may result in the delivery of duplicate log data.

        </Callout>
        
2.  Configure your firewall to allow `POST` requests from the following IP blocks:
    
3.  Set up a workflow for handling or processing the log data that will be posted to your web server(s).
    
    **Example:** Create a listener for HTTPS `POST` requests that mines specific data from log entries.

4.  [Create a log delivery profile](#managing-log-delivery-profiles) for HTTP `POST`.

## Managing Log Delivery Profiles {/*managing-log-delivery-profiles*/}


TODO: Info about setting up destination.

**To set up a log delivery profile**

1.  From the **Real-Time Log Delivery CDN** page, click **+ New Log Delivery Profile**.

    1.  Open the desired property.

        1.  Select either your private space or a team space.
        2.  Click on the desired property.

    2.  From the left pane, click on the desired environment.
    3.  From the left pane, click **Realtime Log Delivery**.

2.  From the **Profile Name** option, assign a name to this log delivery profile.
3.  From the **Log Delivery Method** option, select the method that corresponds to the desired type of destination.

    For example, set up this profile to deliver log data to your web server(s) by selecting `HTTP POST`.

4.  Define how RTLD will communicate with your destination.

    -   [AWS S3](#aws-s3-log-delivery)

        1.  Set the **Bucket** option to the name of the AWS S3 bucket to which log data will be posted.

        2.  Optional. Set the **Prefix** option to the desired prefix that defines a virtual log file storage location and/or a prefix that will be added to each object added to your bucket.
    
            [Learn more.](#aws-s3-prefix)

        3.  From the **AWS Region** option, select the region assigned to the AWS S3 bucket.

    -   [Azure Blob Storage](#azure-blob-storage-log-delivery)

        1.  Set the **Blob Container URL** option to a [URL that points to the container](#azure-blob-container-url) to which log data will be posted.
    
        2.  Optional. Set the **Prefix** option to a value that defines a virtual log file storage location and/or a prefix that will be added to each log file added to your container.

            [Learn more.](#log-file-prefix)
    
        3.  From the **Access Type** option, select whether log data uploads will be authorized via a SAS token or an access key and then paste it in the field below it.
    
            If you plan on providing a SAS token, make sure that the token has permission to write to the blob/container. Additionally, it should start with `sv=` and it should not include a `?`.

    -   [Datadog](#datadog-log-delivery)

        1.  From the **Datadog Site** option, select the Datadog location to which log data will be delivered.
        2.  From the **Datadog API Key** option, paste your Datadog API key. This API key authorizes our service to upload log data to Datadog.
        3.  From the **Datadog Service Attribute Value** option, type a value that identifies the data delivered as a result of this profile. Our service sets Datadog's service reserved attribute to this value.

    -   [Google Cloud Storage](#google-cloud-storage-log-delivery)

        1.  Set the **Bucket** option to the name of the Google Cloud Storage bucket to which log data will be posted.
        2.  Optional. Set the **Prefix** option to the desired prefix that defines a virtual log file storage location and/or a prefix that will be added to each object added to your bucket.
    
            [Learn more.](#aws-s3-prefix)

    -   [New Relic](#new-relic-log-delivery)

        1.  Set the **Account ID** option to your New Relic account ID.
        2.  Set the **Event Type** option to a label that identifies log data delivered to New Relic as a result of this profile. Specify a label that solely consists of alphanumeric characters, underscores, and colons.
        3.  Set the **Insert Key** option to an Inserts insight API key.

    -   [Splunk Enteprise](#splunk-enterprise-log-delivery)

        1.  Set the **Splunk URL** option to a URL that points to your Splunk Enterprise's HTTP Event Collector configuration.
    
            **Default URL syntax:** `https://<SPLUNK ENTERPRISE HOSTNAME>:<PORT>/services/collector/raw`
    
             Replace `<SPLUNK ENTERPRISE HOSTNAME>` with the hostname where your instance of Splunk Enterprise is hosted. Replace `<PORT>` with the port number (e.g., `8088`) that the HTTP Event Collector is listening for data. This port number may be configured when defining your HEC's global settings.

        2.  Set the **HEC Token** option to the token generated for your HTTP Event Collector configuration.

    -   [Sumo Logic](#sumo-logic-log-delivery)

        In the **Sumo Logic URL** option, paste the URL associated with your [HTTP Source](#sumo-logic-log-delivery).

    -   [Web Server (HTTP POST):](#web-server-log-delivery)

        1.  Set the **Request URL** option to a URL that may leverage the workflow defined in the [To prepare your web servers for log delivery procedure](#prepare-web-servers-for-log-delivery). This URL must use the HTTPS protocol.

            <Callout type="info">

              Specify a custom port to deliver log data over that port instead of 443.

            </Callout>
    
            **Sample URL:** `https://logs.mydomain.com/cdn/logs.aspx`
    
        2.  From the **Authentication Type** option, select one of the following modes:
    
        -   **Custom Authentication:** Select this mode when your web server(s) expects the `Authorization` request header to be set to a custom token value. Set the **Token** option to a value that will authorize requests to your web server(s).
        
            Log data will be posted to your web server(s) via HTTPS `POST` requests with an `Authorization` request header set to the specified value.
        
            **Authorization header syntax:** `Authorization: <TOKEN>`
        
        -   **HTTP Basic:** Select this mode if your web server(s) allow content to be uploaded via standard HTTP basic authentication. Set the desired credentials via the **Username** and **Password** options.
        
            Base-64 encoding will applied to the specified credentials. After which, the encoded value will be passed via the `Authorization` header.
        
            **Authorization header syntax:** `Authorization: Basic <BASE64-ENCODED CREDENTIALS>`
        
        -   **None:** Select this mode if your web server(s) allow content to be posted without authorization.

5.  From the **Log Format** option, select whether to format log data using our standard JSON format, as a JSON array, as JSON lines, or as a CSV (RTLD CDN only).
    
    Learn more: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

    <a id="downsampling" />

6. From the **Downsample the Logs** option, determine whether to reduce the amount of log data that will be delivered. For example, you may choose to only deliver 1% of your log data.
    
    -   **All Log Data:** Verify that the **Downsample the Logs** option is cleared.
    -   **Downsampled Log Data:** Downsample logs to 0.1%, 1%, 25%, 50%, or 75% of total log data by enabling the **Downsample the Logs** option and then selecting the desired rate from the **Downsampling Rate** option.

        <Callout type="tip">

          Use this capability to reduce the amount of data that needs to be processed or stored within your web server(s).  

        </Callout>

        <Callout type="info">

          **RTLD CDN Only:** Downsampling log data also reduces usage charges for this service.

        </Callout>

7.  Determine whether log data will be filtered.

    -   [RTLD CDN](#filtering-log-data)

8.  By default, all [log fields](/guides/logs/rtld/log_fields_rtld_cdn#logs-array) are enabled on a new log delivery profile. Clear each field for which log data should not be reported. Adjust the set of log fields that will be included within this log delivery profile from within the **Fields** section.

    Log fields are categorized. You may add or remove individual fields by expanding a category and then marking or clearing specific log fields. Alternatively, add or remove all of the log fields associated with a category by marking or clearing the desired category.

    **RTLD CDN Only:** You may also log request headers, response headers, and cookies by adding them through the **Custom Request Headers**, **Custom Response Headers**, and **Custom Cookies** options.
            
    You may either select the name of the desired header or cookie, or type its name and then press `ENTER`. Click on the list to add additional headers or cookies. Remove a header or cookie by clicking on its `x`.
            
    Although other settings take effect quickly, it may take up to 90 minutes before data for custom request/response headers and cookies is logged.

    TODO: Verify

9.  Click **Create Log Delivery Profile**.

## Filtering Log Data {/*filtering-log-data*/}

Filter log data to only include relevant information and to reduce the amount of data being ingested. Filtering options vary by RTLD module.

<Callout type="info">

  An alternative method for reducing the amount of log data sent to your destination is [downsampling](#downsampling). However, downsampling log data is indiscriminate, while filtering allows you to target the set of traffic that is most relevant to your business needs.

</Callout>

### Filtering RTLD CDN Log Data

You may filter by:

-   **Hostname:** Filter log data to only include traffic directed to the desired hostname(s). Set up hostname filtering within the **Filter by Hostname** section.
        
    -   Filter log data by one or more hostname(s) by:
            
        1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Click within the **Hostnames** option and select the desired hostname(s).

        <Callout type="tip">

          Filter the list by typing the entire or partial hostname. For example, typing `co` will filter the list to include all hostnames that contain `co` (e.g., cdn.example.com and corp.example.org).

        </Callout>

    -   Upload all log data regardless of hostname: Verify that a hostname has not been defined within the **Hostnames** option. 

        Remove a hostname by clicking on its `x`.

-   **User Agent:** Filter log data to only include traffic that was requested by a client whose user agent matches a RE2-compatible regular expression pattern. Set up user agent filtering within the **Filter by User Agent** option.
        
    -   Filter log data by user agent: Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
    -   Upload all log data regardless of user agent: Set it to a blank value.

-   **Status Code:** Filter log data to only include traffic for specific status code(s). Set up status code filtering within the **Filter by Status Code** section.

    -   Filter log data by status code: Select each status code class (e.g., `2xx` or `3xx`) for which log data will be delivered. 
            
    -   Upload all log data regardless of status code: Verify that a status code class (e.g., `2xx` and `3xx`) has not been defined within this option. 

        Remove a status code class by clicking on its `x`.

<!--
### Filtering RTLD WAF Log Data

    1.  From the **Filter by Hostname** section, perform one of the following steps:
        
        -   Filter log data by one or more hostname(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more hostnames from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing co will filter the list to include all hostnames that contain co (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of hostname
            
            Verify that a hostname has not been defined within this section.
            
    2.  From the **Filter by Country** section, perform one of the following steps:
        
        -   Filter log data by one or more countries:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more countries from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial country name. For example, typing un will filter the list to include all countries that contain un (e.g., United States and United Kingdom).
                
        -   Upload all log data regardless of country of origin:
            
            Verify that a country has not been defined within this section.
            
    3.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    4.  From the **Filter By Security Application Manager** option, perform one of the following steps:
        
        -   Filter log data by one or more security application manager(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more security application manager(s).
                
        -   Upload all log data regardless of security application manager:
            
            Verify that a security application manager(s) has not been defined within this section.
            
    5.  From the **Filter By Access Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more access rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected access rule(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more access rule(s).
                
        -   Upload all log data regardless of access rule:
            
            Verify that an access rule has not been defined within this section.
            
    6.  From the **Filter By Custom Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more custom rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected custom rule(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more custom rule(s).
                
        -   Upload all log data regardless of custom rule:
            
            Verify that a custom rule has not been defined within this section.
            
    7.  From the **Filter By Managed Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more managed rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected managed rule(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more managed rule(s).
                
        -   Upload all log data regardless of managed rule:
            
            Verify that a managed rule has not been defined within this section.

### Filtering RTLD Rate Limiting Log Data

    1.  From the **Filter by Hostname** section, perform one of the following steps:
        
        -   Filter log data by one or more hostname(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more hostnames from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing co will filter the list to include all hostnames that contain co (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of hostname
            
            Verify that a hostname has not been defined within this section.
            
    2.  From the **Filter by Country** section, perform one of the following steps:
        
        -   Filter log data by one or more countries:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either Matches or Does Not Match, respectively.
            2.  Select one or more countries from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial country name. For example, typing un will filter the list to include all countries that contain un (e.g., United States and United Kingdom).
                
        -   Upload all log data regardless of country of origin:
            
            Verify that a country has not been defined within this section.
            
    3.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    4.  From the **Filter by Client IP** option, perform one of the following steps:
        
        -   Filter log data by one or more IP addresses:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected IP addresses by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Type one or more IP addresses within the option directly to the right of the above option.
        -   Upload all log data regardless of IP address:
            
            Verify that an IP address has not been defined within this section.
            
    5.  From the **Filter By Action Type** option, perform one of the following steps:
        
        -   Filter log data by one or more enforcement action(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected enforcement action(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more enforcement action(s).
                
        -   Upload all log data regardless of enforcement action:
            
            Verify that an enforcement action has not been defined within this section.
            
    6.  From the **Filter By Request Method** option, perform one of the following steps:
        
        -   Filter log data by one or more request method(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected request method(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more request method(s).
        -   Upload all log data regardless of request method:
            
            Verify that a request method has not been defined within this section.
            
    7.  From the **Filter By Scope Name** option, perform one of the following steps:
        
        -   Filter log data by one or more security application manager(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either Matches or Does Not Match, respectively.
            2.  Select or type the name for one or more security application manager(s).
                
        -   Upload all log data regardless of security application manager:
            
            Verify that a security application manager(s) has not been defined within this section.
            
    8.  From the **Filter By Action Limit ID** option, perform one of the following steps:
        
        -   Filter log data by one or more rate rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected rate rules(s) by selecting either Matches or Does Not Match, respectively.
            2.  Type the name for one or more rate rule(s).
                
        -   Upload all log data regardless of rate rule:
            
            Verify that a rate rule has not been defined within this section.
            
    9.  From the **Filter By URL Regex** option, perform one of the following steps:
        
        -   Filter log data by URL
            
            Type a RE2-compatible regular expression pattern that identifies the set of URLs by which log data will be filtered.
            
        -   Upload all log data regardless of URL
            
            Set it to a blank value.
-->

## Log File Naming Convention {/*log-file-naming-convention*/}

Your destination determines whether log data is stored within a database or as an object within cloud storage. Log data is stored as individual objects for the following destinations:
 
-   [AWS S3](#aws-s3-log-delivery)
-   [Azure Blob Storage](#azure-blob-storage-log-delivery)
-   [Google Cloud Storage](#google-cloud-storage-log-delivery)

Log data stored within an object is compressed using gzip. Each object follows this naming convention:

`<PREFIX><LOG TYPE>_<AN>_<PROFILE ID>_<DATE STAMP>_<AGENT ID>_<SEQUENCE NUMBER>.<FILE EXTENSION>.gz`

The JSON document contained within an object follows this naming convention:

`<LOG TYPE>_<AN>_<PROFILE ID>_<DATE STAMP>_<AGENT ID>_<SEQUENCE NUMBER>.<FILE EXTENSION>`

**Sample file name (RTLD CDN - JSON log format):** `wpc_0001_123_20220111_50550000F98AB95B_1.json`

**Sample file name (RTLD Rate Limiting - JSON log format):** `rl_0001_123_20220111_50550000F98AB95B_1.json`

**Sample file name (RTLD WAF - JSON log format):** `waf_0001_123_20220111_50550000F98AB95B_1.json`

Each of the above file naming variables are described below.

<a id="log-file-prefix" />

-   `<PREFIX>`**:** You may define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be added to each object added to your bucket.
    
    -   A prefix should not start with a forward slash.
    -   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
    -   A trailing forward slash means that the specified value only defines a virtual directory path within your bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to your destination.
        
    **Sample prefix:** `logs/CDN/siteA_`
        
    The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
    The file name for each log file uploaded to your destination will start with `siteA_`.
        
    **Sample log file name:** `siteA_wpc_0001_123_20220111_50550000F98AB95B_1.json`

-   `<LOG TYPE>`**:** Represents the type of log data.

    -   **RTLD CDN:** This variable is always set to `wpc`.

<!--
    -   **RTLD Rate Limiting:** This variable is always set to `rl`.
    -   **RTLD WAF:** This variable is always set to `waf`.
-->

-   `<AN>`**:** Represents your CDN account number (e.g., 0001).
-   `<PROFILE ID>`**:** Represents the system-defined ID for your Real-Time Log Delivery configuration.

    <Callout type="info">

      You cannot currently view the system-defined ID assigned to your Real-Time Log Delivery configuration from within the MCC.

    </Callout>

-   `<DATE STAMP>`**:** Represents the date on which the log file was generated.

    **Syntax:** `YYYYMMDD`

    **Example:** `20230110`

-   `<AGENT ID>`**:** Represents a unique ID that identifies the Real-Time Log Delivery software agent that generated the log file.
-   `<SEQUENCE NUMBER>`**:** Represents a sequential number that identifies the order in which the log file was generated by the software agent identified above.

    Each software agent assigns a sequential number to the log files that it generates. A gap between log files generated on the same day by the same software agent indicates missing log data.  

    [Learn more.](LD-Verification.htm)

    **Key information:**

    -   This number starts at 0.
    -   This number resets to 0 at the start of a new day (UTC).

-   `<FILE EXTENSION>`**:** Represents the file extension for the log file. This file extension varies by log format.

    -   **JSON Log Format:** `json`
    -   **JSON Array Log Format:** `json_array`
    -   **JSON Lines Log Format:** `json_lines`
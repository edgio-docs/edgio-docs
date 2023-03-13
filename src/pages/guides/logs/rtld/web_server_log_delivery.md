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

-   RTLD applies gzip compression to log data. AWS S3 stores compressed log data as an object with a gz file extension.
    
    [Learn more.](#NamingConvention)
    
-   AWS S3 may automatically decompress files downloaded via the S3 Management Console into JSON or CSV files. No additional decompression is required to process this data.
-   RTLD requires a [bucket policy](#bucketpolicy) that authorizes our service to upload content to your bucket.
-   If you have enabled server-side encryption on the desired AWS S3 bucket, then you must also enable default bucket encryption. Otherwise, RTLD will be unable to post log data to that bucket.
    
    RTLD does not include Amazon-specific encryption headers when posting log data to your bucket.
    
    [View AWS documentation on default bucket encryption.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)

    <a id="aws-s3-prefix" />

-   You must define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be added to each object added to your bucket.
    
        *   A prefix should not start with a forward slash.
        *   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
        *   A trailing forward slash means that the specified value only defines a virtual directory path within your AWS S3 bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to AWS S3.
        
        **Sample prefix:** `logs/CDN/siteA\_`
        
        The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
        The file name for each log file uploaded to AWS S3 will start with `siteA\_`.
        
        **Sample log file name:** `siteA\_adn\_0001\_123\_20220111\_50550000F98AB95B\_1.json`

**To prepare AWS S3 for log delivery**

1.  Create or identify an AWS S3 bucket to which log data will be posted.
    
    [View AWS documentation on how to create a bucket.](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)
    
2.  Apply the following bucket policy to the AWS S3 bucket identified in step 1. This bucket policy authorizes our service to upload content to your bucket.
    
    [View AWS documentation on how to add a bucket policy.](http://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-bucket-policy.html)
    
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
    				"arn:aws:s3:::Bucket-Name",
    				"arn:aws:s3:::Bucket-Name/\*"
    			\]
    		}
    	\]
    }
    
    Replace the term "_Bucket-Name_" in lines 16 and 17 with the name of the AWS S3 bucket to which this policy is being applied.
    
3.  If you have enabled server-side encryption on the AWS S3 bucket identified in step 1, then you must also enable default bucket encryption.
    
    [View AWS documentation on default bucket encryption.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)
    
4.  Optional. Set up AWS to process the log data that will be posted to it.
    
    Example:
    
    Leverage [AWS Lambda](https://aws.amazon.com/documentation/lambda/) to mine specific data from log entries.
    
5.  [Create a log delivery profile](#managing-log-delivery-profiles) for AWS S3.

## Azure Blob Storage {/*azure-blob-storage-log-delivery*/}

## Datadog {/*datadog-log-delivery*/}

## Google Cloud Storage {/*google-cloud-storage-log-delivery*/}

## New Relic {/*new-relic-log-delivery*/}

## Splunk Enterprise {/*splunk-enterprise-log-delivery*/}

## Sumo Logic {/*sumo-logic-log-delivery*/}

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
    -   [Datadog](#datadog-log-delivery)
    -   [Google Cloud Storage](#google-cloud-storage-log-delivery)
    -   [New Relic](#new-relic-log-delivery)
    -   [Splunk Enteprise](#splunk-enterprise-log-delivery)
    -   [Sumo Logic](#sumo-logic-log-delivery)

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

    -   [:](#)
    -   [:](#)
    -   [:](#)
    -   [:](#)
    -   [:](#)
    -   [:](#)
    -   [:](#)

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

### Log File Naming Convention

Your destination determines whether log data is stored within a database or as an object within cloud storage. Log data is stored as individual objects for the following destinations:
 
-   [AWS S3](#aws-s3-log-delivery)
-   [Azure Blob Storage](#azure-blob-storage-log-delivery)
-   [Google Cloud Storage](#google-cloud-storage-log-delivery)

Log data stored within an object is compressed using gzip. Each object follows this naming convention:

`[&lt;LOG TYPE>](#Type)_[&lt;AN>](#AN)_[&lt;PROFILE ID>](#ProfileID)_[&lt;DATE STAMP>](#DateStamp)_[&lt;AGENT ID>](#AgentID)_[&lt;SEQUENCE NUMBER>](#SequenceNumber).[&lt;FILE EXTENSION>](#FileExtension).gz`

The JSON document contained within an object follows this naming convention:

`[Log Type](#Type)_[AN](#AN)_[Profile ID](#ProfileID)_[Date Stamp](#DateStamp)_[Agent ID](#AgentID)_[Sequence Number](#SequenceNumber).[File Extension](#FileExtension)`

**Sample file name (RTLD CDN - JSON log format):** `wpc_0001_123_20220111_50550000F98AB95B_1.json`

**Sample file name (RTLD Rate Limiting - JSON log format):** `rl_0001_123_20220111_50550000F98AB95B_1.json`

**Sample file name (RTLD WAF - JSON log format):** `waf_0001_123_20220111_50550000F98AB95B_1.json`

Each of the above file naming variables are described below.

-   `<LOG TYPE>`**:** Represents the type of log data.
    -   RTLD Rate Limiting: This variable is always set to rl.
    -   RTLD WAF: This variable is always set to waf.

-   `<AN>`**:** Represents your CDN account number (e.g., 0001). This account number may be viewed from the upper-right hand corner of the MCC.
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

    -   JSON Log Format: json
    -   JSON Array Log Format: json\_array
    -   JSON Lines Log Format: json\_lines
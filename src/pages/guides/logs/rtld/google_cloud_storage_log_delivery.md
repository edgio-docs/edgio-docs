---
title: Google Cloud Storage Log Delivery
---

RTLD may automatically deliver compressed log data to a Google Cloud Storage bucket by submitting HTTPS PUT requests to it. Each request adds an object to a Cloud Storage bucket. This object contains a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   The set of available log fields varies by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)
-   RTLD applies gzip compression to log data. Google Cloud Storage stores compressed log data as an object with a `gz` file extension. 

    [Learn more.](/guides/logs/rtld/log_file_naming_convention)

-   Configure your Google Cloud Storage bucket as follows:

    -   The recommended configuration is to set the **Access control** option to `Uniform`.
    -   Set the **Encryption** option to a Google-managed encryption key.
    -   Authorize RTLD to upload content by adding the following user with the **Storage Object Creator** role:

        `vdms-partner-gcs-transfer@maw-partner-gcs.iam.gserviceaccount.com`
    
        [View Google Cloud Storage documentation on how to set up an IAM policy for a bucket.](https://cloud.google.com/storage/docs/access-control/using-iam-permissions)
    
    [View Google Cloud Storage documentation on how to create a bucket.](https://cloud.google.com/storage/docs/creating-buckets)

    <a id="log-file-prefix" />

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

4.  Upon completing the above steps, you should create a log delivery profile for Google Cloud Storage.

{{ RTLD_PROFILE_SETUP_1 }} Google Cloud Storage.

    1.  Set the **Bucket** option to the name of the Google Cloud Storage bucket to which log data will be posted.
    2.  Optional. Set the **Prefix** option to the desired prefix that defines a virtual log file storage location and/or a prefix that will be added to each object added to your bucket.
    
        [Learn more.](/log-file-prefix)

{{ RTLD_PROFILE_SETUP_2 }}
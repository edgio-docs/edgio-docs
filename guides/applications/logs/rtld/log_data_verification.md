---
title: Log Data Verification
---

Check for missing log data by either:

-   Reviewing recent log performance statistics.
-   Looking for gaps in the sequential number reported by each Real-Time Log Delivery software agent.

<!--

## Log Performance Statistics {/*log-performance-statistics*/}

The Log Performance page provides a summary view and a breakdown of log delivery failures for up to the last 30 days.

Find out which log files are missing by manually checking for gaps in the sequence number reported by each Real-Time Log Delivery software agent.  
[Learn more.](#checking-for-sequence-number-gaps)

Key information:

-   Navigate to the Log Performance page by performing the following steps:
    
    2.  Select the desired profile.
    3.  Click the Analytics tab from the upper-right hand corner of the page.
-   Choose the time period for which log performance statistics will be reported from the upper-right hand corner of the page.
-   Log delivery failures are graphed according to the following categories:
    
     
    
    Category
    
    Description
    
    Bad Certificate
    
    Indicates that the SSL certificate corresponding to the domain where log data is being sent is invalid. Please verify your SSL certificate and then update as needed.
    
    There are online tools (e.g., [SSL Checker](https://www.sslshopper.com/ssl-checker.html)) that analyze your SSL certificate for issues.
    
    Log delivery requires a certificate whose trust anchor is a publicly trusted certificate authority (CA). Additionally, the certificate must include a chain of trust for all intermediate certificate(s) and a leaf certificate.
    
    Connection Time Out
    
    Indicates that the destination server failed to respond in a timely fashion.
    
    Failed Authentication
    
    Indicates that log delivery failed due to an unauthorized request (i.e., 401 Unauthorized or 403 Forbidden).
    
    Failed Connection
    
    Indicates that the destination server was unavailable.
    
    Failed to Deliver
    
    Indicates that log delivery failed for none of the above reasons.
    
-->

## Checking for Sequence Number Gaps {/*checking-for-sequence-number-gaps*/}


Use the following information when assessing whether there is a gap in the sequential number reported by each Real-Time Log Delivery software agent.

-   A software agent's unique ID is reported within the:
    
    -   [Log file name (AgentID)](/applications/logs/rtld/log_file_naming_convention) - AWS S3, Azure Blob Storage, and Google Cloud Storage only
        
    -   [JSON payload (agent-id)](/applications/logs/rtld/log_fields_rtld_cdn#agent-id)

-   A software agent's sequence number is reported within the:
    
    -   [Log file name (SequenceNumber)](/applications/logs/rtld/log_file_naming_convention) - AWS S3, Azure Blob Storage, and Google Cloud Storage only
        
    -   [JSON payload (seq-num)](/applications/logs/rtld/log_fields_rtld_cdn#sequence-number)
-   The sequential number reported for each software agent starts at 0.
-   This sequential number resets to 0 at the start of a new day (UTC). The date on which log data was generated is reported within the:
    
    -   [Log file name (DateStamp)](/applications/logs/rtld/log_file_naming_convention) - AWS S3, Azure Blob Storage, and Google Cloud Storage only
    -   [JSON payload (date-stamp)](/applications/logs/rtld/log_fields_rtld_cdn#datestamp)
-   If a software agent stops running, then it will be assigned a new unique ID.

<Callout type="important">

  If log data uses either the CSV, JSON Array, or JSON Lines log format, then it will not contain information that uniquely identifies a set of log data. If log data using one of these formats is delivered to a destination other than AWS S3, Azure Blob Storage, or Google Cloud Storage, then there is no way to check for gaps in sequence numbers when attempting to [identify missing log data](/applications/logs/rtld/log_data_verification#checking-for-sequence-number-gaps).

</Callout>

### Log File Example {/*log-file-example*/}

Let's assume that your AWS S3 bucket, Azure Blob container, or Google Cloud Storage bucket contains the following log files:

```
wpc_0001_123_0114_0000000000000123_0.json.gz
wpc_0001_123_0114_0000000000000123_1.json.gz
wpc_0001_123_0114_0000000000000123_3.json.gz
```

In this situation, we can tell that there is missing log data. Specifically, the log entries associated with the following log file are missing:

`wpc_0001_123_0114_0000000000000123_2.json.gz`

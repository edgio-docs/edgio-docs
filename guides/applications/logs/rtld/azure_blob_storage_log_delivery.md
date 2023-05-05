---
title: Azure Blob Storage Log Delivery
---

RTLD may automatically deliver compressed log data to an Azure Blob Storage container by submitting HTTPS `PUT` requests to it. Each request creates a block blob within the container. This block blob contains a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   The set of available log fields varies by RTLD module: [RTLD CDN](/applications/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/applications/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/applications/logs/rtld/log_fields_rtld_waf)
-   RTLD applies gzip compression to log data. Azure Blob Storage stores compressed log data as an object with a `gz` file extension.
    
    [Learn more.](/applications/logs/rtld/log_file_naming_convention)
    
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

    <a id="log-file-prefix" />

-   You may define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be pre-pended to the name of each object added to your bucket. Use the following guidelines when setting this prefix:
    
    -   A prefix should not start with a forward slash.
    -   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
    -   A trailing forward slash means that the specified value only defines a virtual directory path within your bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to your destination.
        
    **Sample prefix:** `logs/CDN/siteA_`
        
    The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
    The file name for each log file uploaded to your destination will start with `siteA_`.
        
    **Sample log file name:** `siteA_wpc_0001_123_20220111_50550000F98AB95B_1.json`

**To prepare for log delivery**

1.  Create or identify an Azure storage account and a container to which log data will be posted.
    
    [View Microsoft Azure documentation on how to create a storage account.](https://docs.microsoft.com/en-us/azure/storage/common/storage-quickstart-create-account)
    
2.  Identify or configure how requests submitted will be submitted by RTLD will be authorized. 

    RTLD supports authorization through a SAS token or an access key.

    <Callout type="info">

      If you plan on providing a SAS token, make sure that the token has permission to write to the blob/container. Additionally, it should start with `sv=` and it should not include a `?`.

    </Callout>

3.  Upon completing the above steps, you should create a log delivery profile for Azure Blob Storage.

{{ RTLD_PROFILE_SETUP_1 }} `Azure Blob Storage`.

4.  Define how RTLD will communicate with Azure Blob Storage.

    1.  Set the **Blob Container URL** option to a URL that points to the container to which log data will be posted.
    
    2.  Optional. Set the **Prefix** option to a value that defines a virtual log file storage location and/or a prefix that will be added to each log file added to your container.

        [Learn more.](#log-file-prefix)
    
    3.  From the **Access Type** option, select whether log data uploads will be authorized via a SAS token or an access key and then paste it in the field below it.
    
        If you plan on providing a SAS token, make sure that the token has permission to write to the blob/container. Additionally, it should start with `sv=` and it should not include a `?`.

{{ RTLD_PROFILE_SETUP_2 }}

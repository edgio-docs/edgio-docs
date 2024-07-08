---
title: Log Delivery Service
---

When requests for your content enter the CDN, the requests are logged based on configurations. The Log Delivery Service allows you to configure and manage your log files.

<Callout type="info">Log field names, delimiters, date and time format, file name, and directory structure adhere to W3C/ISO standards.</Callout>

## Log Delivery List Page  {/*log-delivery-list-page*/}

Navigate to *Configure* > *Log Delivery Service* in the navigation pane. The Log Delivery Service page is displayed and initially shows configurations for the Hoccount in the drop-down menu on the right above the list.

Each configuration in the list includes this information:

| Field | Description/Instructions |
| --- | --- |
| Number of configurations and configuration names | Customer-assigned configuration name. |
| SHORTNAME | Currently selected account name. |
| SERVICE TYPE | Delivery service for which logs will be created. (HTTP or MMD Live Ingest). |
| STORAGE TYPE | Log file location:<br /> - Origin Storage: Logs are stored at the root of your space in a directory called '_livelogs'. You are responsible for data maintenance; is not responsible for data removal.<br /><br /> Amazon S3: Amazon's cloud-based object storage.<br /> - Google Cloud Storage: Google's cloud-based object storage.<br /> - Datadog: A third-party storage option with existing account. |
| FILE COMPRESSION | File compression method. Possible values:<br /> - ZSTD<br /> - LZ4<br /> - SNAPPY <br /> - LZF (Edgio's LZ4 implementation uses the LZ4 (Framed) compression algorithm.) <br /> - GZIP |
| STATUS | Configuration status. When you create and save a configuration, it goes through a validation process. Possible status values:<br /> - In Progress<br /> - Pending<br /> - Completed <br /> - Failed <br /> - Deactivated |
| LAST UPDATED | Configuration's creation or last modified date. |

## Choosing an Account  {/*choosing-an-account*/}

Each account has its own set of configurations. You can choose an account to work with from the toggle in the top right corner above the list.

This list is more focused than the company/account at the top of the page and is limited to the accounts that your user can access and accounts that have the product enabled.

## Working with Log Delivery Service Configurations  {/*working-with-log-delivery-service-configurations*/}

### Creating a Log Delivery Configuration  {/*creating-a-log-delivery-configuration*/}

You can create a single configuration for any combination of shortname, storage location, and service type.

1. Click the **+** button at the top of the Log Delivery List Page.

    The *Add Configuration* page is displayed, and you will see a message warning you about extra fees if you choose to store logs in.

2. Fill out the fields at the top of the page, noting that required fields are marked with an asterisk in the user interface. See [Log Delivery Configuration Fields](#log-delivery-service-configuration-fields) for details.
3. Select fields to include in log files. See [Configuring Log Fields](#configuring-log-fields).
4. Save the configuration by clicking the **Save** button.

<Callout type="info">It can take 15 to 40 minutes for a new configuration to take effect.</Callout>

### Editing a Log Delivery Configuration  {/*editing-a-log-delivery-configuration*/}

1. Click the configuration's row on the Log Delivery List page.

    The configuration is displayed in edit mode. If the configuration's storage location is Origin Storage, you will see a message warning you about extra fees if you choose to store logs in.

    <Callout type="info"> - Existing configurations include [Directory Layout and FileName Template Fields](#delivery-option-fields) <br /> - If your user does not have 'Manage' permissions for all fields are disabled and you cannot modify the configuration.</Callout>

2. Modify fields as needed. See [Log Delivery Configuration Fields](#log-delivery-service-configuration-fields) and [Configuring Log Fields](#configuring-log-fields) for details.
3. Save the configuration by clicking the **Save** button.

<Callout type="info"> - It can take 15 to 40 minutes for changes to take effect. <br /> -  Depending on your permissions, you may not be able to edit a configuration.</Callout>

### Configuring Log Fields  {/*configuring-log-fields*/}

You can add, remove, and reorder active log fields. You can also add static fields.

#### Moving Fields between Lists {/*moving-fields-between-lists*/}

- Drag and drop individual fields from one set to another.
- Move all fields using the button beneath the **Selected log fields** set.
- Click **SELECT ALL** to move all fields from the **Available log fields** set to the **Selected log fields** set. The button's text changes to 'DESELECT ALL'.
- Click **DESELECT ALL** to move all fields from the **Selected** set to the **Available** set. The button's text changes to 'SELECT ALL'.

#### Reordering Selected Fields {/*reording-select-fields*/}

Drag and drop individual fields to reorder them.

#### Working with Static Fields

Static fields are user-defined fields with a value that does not change.

- To add a static field:

    1. Click the **ADD STATIC FIELD** button; then enter a field name and value in the subsequent dialog,

    2. Click **ADD ACTIVE FIELD**.

    The field is added to the **Available log fields** set. From there you can move it to the **Selected log fields** set.

- To edit or delete a static field:

    1. Click the field.

    2. In the subsequent dialog enter a new value and click **SAVE**, or click the **DELETE** button.

### Deleting a Log Delivery Configuration  {/*deleting-a-log-delivery-configuration*/}

1. Click the configuration's row in the Log Delivery List page.

    The configuration is displayed.

2. Click the **DELETE** button at the bottom of the page.
3. Agree to the deletion in the subsequent confirmation dialog.

    Control deletes the configuration.

<Callout type="info">It can take 15 to 40 minutes for the deletion to take effect. </Callout>

### Deactivating a Log Delivery Service Configuration  {/*deactivating-a-log-delivery-service-configuration*/}

You can deactivate a configuration for purposes such as forcing the configuration to stop gathering log data.

1. Click the configuration's row in the Log Delivery List page.

    The configuration is displayed.

2. Click the **DEACTIVATE** button at the bottom of the page.

    A confirmation message is displayed at the top right of the page and the button's label changes to ACTIVATE..

    The configuration's status on the Log Delivery List page changes to *Deactivated*.

<Callout type="info">It can take 5 to 10 minutes for a deactivation to take effect. </Callout>

### Activating a Log Delivery Service Configuration  {/*activating-a-log-delivery-service-configuration*/}

You can reactivate a deactivated configuration.

1. Click the configuration's row in the Log Delivery List page.

    The configuration is displayed.

2. Click the **ACTIVATE** button at the bottom of the page.

    A confirmation message is displayed at the top right of the page and the button's label changes to **DEACTIVATE**.

    The configuration's status on the Log Delivery List page changes to the state it was in before it was deactivated.

<Callout type="info">It can take 5 to 10 minutes for an activation to take effect. </Callout>

### Enabling Log Delivery to Amazon S3  {/*enabling-log-delivery-to-amazon-s3*/}

You can store your log files on the Amazon S3 platform. Amazon S3 is a cloud object storage service built to store and retrieve data.

#### Prerequisites  {/*prerequisites*/}

Before configuring Amazon S3 as a storage location, you must do the following:

* Create an S3 Identity and Access Management (IAM) user in Amazon's configuration screens.

* Give the IAM user the following permissions for the bucket where you want to store logs:

    * ListBucket
    * GetObject
    * PutObject

#### Configuration Fields  {/*configuration-fields*/}

These are visible only when you select Amazon S3 as the storage location.

| Field | Description |
| --- | --- |
| REGION | S3 bucket geographic area. |
| BUCKET NAME | S3 bucket title. |
| PATH | Path within bucket where logs are stored. <br /> <Callout type="info"> Do not add a leading slash to the path. If you do, Amazon creates an object URL with a double slash. Example: `>https:://bucket.s3.region.amazonaws.com//cdn\_logs...` </Callout> |
| ACCESS KEY | Bucket access key provided by Amazon. |
| SECRET KEY | Bucket secret key provided by Amazon. <Callout type="info">After you set the secret key and save the configuration, the key is not visible, but you can enter a new key if needed and save the configuration. </Callout>|

### Enabling Log Delivery to Google Cloud Storage  {/*enabling-log-delivery-to-google-cloud-storage*/}

You can store your log files on the Google Cloud Storage platform. Google Cloud Storage is a service for storing and accessing your data on Google Cloud Platform infrastructure.

#### Prerequisites  {/*prerequisites-google-storage*/}

Before configuring Google Cloud Storage as a storage location, you must do the following:

1. Create a Google Cloud Project (GCP) or use an existing project. See Google's [Google Cloud Platform - Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects) guide for instructions.

2. Set up a GCP bucket to store your logs. You can create a new bucket or use an existing one. See Google's [Create Storage Buckets Guide](https://cloud.google.com/storage/docs/creating-buckets) for instructions..

3. Create a Google service account that will use to access your bucket. See Google's [Service accounts](https://cloud.google.com/iam/docs/service-accounts) guide for instructions.

4. Using Google's [IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles), guide, grant the following roles on the bucket:
* Storage Object Creator (`storage.objectCreate`)
* Storage Object Viewer (`storage.objectViewer`)
5. Add the service account as a member of the bucket you created in step 2.

6. Generate JSON access keys for the service account. See Google's [Creating service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) guide for instructions.

#### Configuring a Google Cloud Storage Location  {/*configuring-a-google-cloud-storage-location*/}

1. Select **Google Cloud Storage** in the **STORAGE LOCATION** dropdoown.

2. Configure the fields described in [Configuration Fields](#configuration-fields-cloud-storage).

3. Click **SAVE**.

#### Configuration Fields {/*configuration-fields-cloud-storage*/}

These are visible only when you select Google Cloud Storage as the storage location. Required fields are marked with an asterisk in the Control user interface.

| Field | Description |
| --- | --- |
| CLIENT EMAIL | Value of the `client_email` field in the JSON file associated with the Google service account you created. |
| SECRET KEY | Value of the private_key field in the JSON file associated with the Google service account you created.  <br /> <Callout type="info">After you set the secret key and save the configuration, the key is not visible, but you can enter a new key if needed and save the configuration.</Callout>|
| BUCKET NAME | Title of the Google Cloud Storage bucket you created. |
| PATH | Path within the bucket where logs are stored.<br /> Defaults to an empty value.  <br /> <Callout type="info">Do not add a leading slash to the path. If you do, Google Cloud Storage creates an object URL with a double slash. Example:  `gs://bucket_name//cdn_logs/...` </Callout>|

### Enabling Log Delivery to Origin Storage  {/*enabling-log-delivery-to-origin-storage*/}

You can store your log files on the Origin Storage platform. Origin Storage is a distributed storage service operated by Edgio.

<Callout type="info">Standard fees apply for using Origin Storage.</Callout>

#### Prerequisites  {/*prerequisites-origin-storage*/}

Origin Storage must be enabled for the name selected in the SHORTNAME.

#### Configuring the Location  {/*configuring-the-location-origin-storage*/}

1. Select **Origin Storage** in the **STORAGE LOCATION** drop-down menu.

2. Configure the field described in [Origin Storage Configuration Fields](#origin-storage-configuration-fields).

3. Click **SAVE**.

    If is not enabled for the selected shortname, you will see a message when you attempt to save the configuration. Contact your Account Manager to enable Origin Storage for the shortname.

#### Origin Storage Configuration Fields  {/*origin-storage-configuration-fields*/}

| Field | Description |
| --- | --- |
| STORAGE ACCOUNTS | The Origin Storage account where you want to store logs. By default logs are stored under the same account that owns LDS configuration |

### Enabling Log Delivery to Datadog  {/*enabling-log-delivery-to-datadog*/}

#### Prerequisites  {/*prerequisites-datadog*/}

1. A Datadog account: Use an existing account or create a new one.

2. A Datadog API key: Generate via Datadog. (See Datadog's documentation on [API and Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/).)

#### Configuring the Datadog Location  {/*configuring-the-datadog-location*/}

1. Select **Datadog** in the **STORAGE LOCATION** dropdown menu.

2. Configure the fields as described in **[Configuration Fields](#datadog-configuration-fields)**.

3. Click **SAVE**.


#### Datadog Configuration Fields  {/*datadog-configuration-fields*/}

| Field | Description |
| --- | --- |
| Site | Datadog site region that matches your Datadog environment |
| API Key | API key associated with your Datadog account |
| Service | _(optional)_ The property to be used as the 'service' property of Datadog |
| Tags | _(optional)_ Comma-separated list of tag to send with logs (e.g.cdn:edgio) |

## Working with Personally Identifiable Information  {/*working-with-personally-identifiable-information*/}

Edgio's Log Delivery Service conforms to General Data Protection Regulations (GDPR) requirements.

You can configure logs to include the following fields, which contain Personally Identifiable Information (PII) :

* cs-cookie
* cs-uri
* so-src-uri

### Signing PII Agreements  {/*signing-pii-agreements*/}

Per GDPR, you must explicitly indicate that you understand risks associated with the PII fields.

When you access Log Delivery Service, you will see a message that describes the risks involved.

Click the **Agree** button to indicate you agree.

<Callout type="info"> - If you do not agree to the terms and conditions, you cannot view any configurations. <br /> - Non-Company Admin users can sign agreements only for the company to which they belong. <br /> - Company Admin users can sign agreements for child companies as well.</Callout>

## Field Reference  {/*field-reference*/}

### Log Delivery Service Configuration Fields  {/*log-delivery-service-configuration-fields*/}

<Callout type="info"> Log Delivery Service configuration fields are attributes of a Log Delivery Service configuration and are not to be confused with log fields (see [Log File Fields](#log-file-fields)), which appear in log files.</Callout>

| Field or Section | Description |
| --- | --- |
| CONFIGURATION NAME | Customer-assigned configuration name. |
| SHORTNAME | The shortname to which the configuration applies. |
| SERVICE TYPE | Delivery service for which logs will be produced. (HTTP or MMD\_Live\_Ingest). |
| Delivery Destination | See [Delivery Destination Fields](#delivery-destination-fields). |
| Delivery Options | See [Delivery Options Fields](#delivery-option-fields). |

### Delivery Destination Fields  {/*delivery-destination-fields*/}

| Field or Section | Description |
| --- | --- |
| STORAGE TYPE | Log file location. Possible values:<br /> - Origin Storage: Logs are stored at the root of your space in a directory called '_livelogs'. You are responsible for data maintenance; Edgio is not responsible for data removal.<br /> - Amazon S3: Amazon's Simple Storage Service. When you select this option, additional fields are displayed, which are described in [Log Delivery to Amazon S3](#enabling-log-delivery-to-amazon-s3).<br /> - Google Cloud Storage: Google's cloud-based object storage. See [Google Cloud Platform - Creating and managing projects.](https://cloud.google.com/resource-manager/docs/creating-managing-projects)<br /> <br /> <Callout type="info">If you change the location from Amazon to Origin Storage, you will see a message about applicable fees </Callout> |
| STORAGE ACCOUNT | The Origin Storage account where you want to store logs. By default logs are stored under the same account that owns the Log Delivery Service configuration. |

### Delivery Options Fields  {/*delivery-option-fields*/}

| Field | Description |
| --- | --- |
| DIRECTORY LAYOUT | The DIRECTORY LAYOUT property specifies the folder path within the destination storage where log files will be uploaded. It supports dynamic placeholders that are replaced with relevant information during file upload.<br /> Supported Dynamic Placeholders: <br /> `{service_type}`: Type of service for which logs are collected.<br />`{config_uuid}`: UUID of the LDS configuration.<br />`{yyyy}` , `{MM}`, `{dd}` : Resolves to year, month, and day respectively based on the start of the time period of the log entries covered in the file, all in UTC timezone.<br />`{yyyy_proc}`, `{MM_proc}`, `{dd_proc}`: Resolves to year, month, and day respectively using the timestamp that represents the time when the file was prepared by LDS for delivery, all in UTC timezone.<br />Default Value: `{service_type}/{config_uuid}/{yyyy}/{MM}/{dd}` <br /> <Callout type="info">It is not possible to combine `{yyyy_proc}`, `{MM_proc}`, `{dd_proc}` and `{yyyy}`, `{MM}`, `{dd}` variables in the directory layout. Mixing these variables in the directory structure is invalid. <br /><br /></Callout>|
| FILE NAME TEMPLATE | The FILE NAME TEMPLATE property determines the naming convention for log files uploaded to your destination storage. It supports dynamic placeholders that are resolved during file creation.<br /><br />Supported Dynamic Placeholders:<br />`{shortname}`: The account name for which the log entries have been collected.<br />`{request_end_date_time_from}`: This timestamp represents the start of the time period covered by log entries in the file, formatted as `{year}{month}{day}{hour}{minute}{second}` in UTC timezone.<br />`{request_end_date_time_to}`: This timestamp represents the end of the time period covered by log entries in the file, formatted as `{year}{month}{day}{hour}{minute}{second}` in UTC timezone. <br /><br /> <Callout type="info">The time period covered by log entries in the file is not fixed and may vary based on LDS setup and processing requirements. While currently supporting 10-minute and hourly time periods, LDS may add support for new time periods in the future.</Callout><br />`{process_window_date_time}`: The timestamp when the file was prepared for delivery, formatted as `{year}{month}{day}{hour}{minute}{second}` in UTC timezone.<br />`{split_id}`: ID assigned to the file, used for splitting large log files. When a file needs to be split to avoid exceeding the 1GB size limit, each part is given a unique split_id. The first split file is labeled as 000, and subsequent splits are numbered sequentially (001, 002, and so on). If a file does not require splitting, the split_id remains 000. <br /><br /> <Callout type="info">Log file size is measured before compression, so a log file may be split even though it’s compressed size is smaller than 1GB.</Callout><br />`{format}`: Log file format, which can be either w3c or json_lines.<br />`{compression}`: File compression format.<br />Default Value:<br />`{shortname}_{request_end_date_time_from}-{request_end_date_time_to}.{process_window_date_time}_{split_id}.{format}.{compression}` |
| FILE COMPRESSION | File compression method.<br />encourages you to investigate available compression methods before deciding on a method. |

### Log File Fields  {/*log-file-fields*/}

#### HTTP {/*http*/}

The following fields are available for you to include when you select _HTTP_ as the SERVICE TYPE.

| Field | Details | Sample Data |
| --- | --- | --- |
| c-asn | *(int64)* The autonomous system number calculated based on client IP address. | 22822 |
| c-city | *(string)* The City name derived from the client IP address using the IPGeo DB. | phoenix |
| c-country | *(string)* The Country name derived from the client IP address using the IPGeo DB. | united states |
| c-country-code | *(string)* The two-letter ISO 3166-1 alpha-2 country code derived from client IP address. | UK  |
| c-ip | *(string)* The Client IP Address (end-user). | 66.249.69.88, 2001:0db8:85a3:0000:  <br />0000:8a2e:0370:7334 |
| c-port | *(string)* The client remote port number used for a connection. | 80832 |
| c-state | *(string)* The State name derived from the client IP address using the IPGeo DB. | arizona |
| cs-accept-language | *(string)* The value of the Accept-Language request header. | en-us * de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4 |
| cs-cmcd | *(string)* The CMCD metric sent by a compatible chunk streaming media player as specified by [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf?_ga=2.236313986.263248173.1645608804-1583879160.1645024234) saved in query term URL-encoded format, regardless of methods used to ingest by player. | bl%3D11700%2Cbr%3D1254%2Ccid%3D%22BBBTest <br />  %22%2Cd%3D4000%2Cdl%3D11700%2Cmtp%3D33200 %2Cnor%3D%22bbb_30fps_640x360_1000k_10. <br />m4v%22%2Cot%3Dv%2Crtp%3D2200%2Csf%3Dd%   <br />2Csid%3D%227bf27586-2389-4c78-9c3e-401d7d23e0ef%22%2Cst%3Dv%2Ctb%3D14932 |
| cs-cookie | *(string)* The URL-encoded cookie HTTP request header. GDPR Personally Identifiable information is included. | InfoSG=2080446124.14348.0000 |
| cs-custom-header1 | *(string)* The value of the request header specified in the `log_request_header` rewrite option. You can include the value of up to five custom headers as defined as `log_request_header*` fields in Caching and Delivery. | 989c57423fbb |
| cs-custom-header2 | *(string)* The value of the request header specified in the `log_request_header` rewrite option. You can include the value of up to five custom headers as defined as `log_request_header*` fields in Caching and Delivery. | 989c57423fbb |
| cs-custom-header3 | *(string)* The value of the request header specified in the `log_request_header3` rewrite option. You can include the value of up to five custom headers as defined as `log_request_header*` fields in Caching and Delivery. | 342912cc5c96 |
| cs-custom-header4 | *(string)* The value of the request header specified in the `log_request_header4` rewrite option. You can include the value of up to five custom headers as defined as `log_request_header*` fields in Caching and Delivery. | 11064983-fa8a-4e06-87c5-60124b964b33 |
| cs-custom-header5 | *(string)* The value of the request header specified in the `log_request_header5` rewrite option. You can include the value of up to five custom headers as defined as `log_request_header*` fields in Caching and Delivery. | Fri,%2010%20Oct%202014%2000:51:51%20GMT |
| cs-headers | *(string)* The value of the HTTP request headers specified in the `log_req_header` rewrite option. These headers are logged as key-value pairs in this field.  If multiple headers are specified to be logged, each key-value pair is separated by a comma.   The maximum size of this field is 2048 bytes. If the maximum size is exceeded, `error=toolarge` is logged. | hdr1=val_1,hdr2=val%20_2 |
| cs-http-proto | *(string)* The version of the HTTP protocol sent from the client to the server. | HTTP/1.1, HTTP/2.0 |
| cs-method | *(string)* The HTTP request method (GET, POST, and so on) sent from the client to the server. | GET, POST, HEAD |
| cs-range | *(string)* The value of the Range header sent from the client to the server. URL-encoded. | bytes%20567312626-1030737749/4121700402 |
| cs-referer | *(string)* The value of the Referrer header sent from the client to the server. URL-encoded. | https://support.apple.com/en-us/HT204283 |
| cs-ssl-cipher | *(string)* The version that the client supports, sent from the client to the server. | ECDHE-RSA-AES256-GCM-SHA384 |
| cs-ssl-proto | *(string)* The version that the client supports, sent from the client to the server. | TLSv1.2 |
| cs-uri | *(string)* The URL-encoded published URL that includes query strings. Includes GDPR Personally identifiable information. | http://dtvcdn11.dtvcdn.com/B003109030M3.ats?  <br />cid=003261089464&ct=1588467344 |
| cs-uri-host | *(string)* The domain part of the Published URL. | dtvcdn11.dtvcdn.com |
| cs-uri-noquery | *(string)* The URL-encoded published URL (query part excluded). | http://dtvcdn11.dtvcdn.com/B003109030M3.ats |
| cs-user-agent | *(string)* The value of the User-Agent header in the request from the client to the server. URL-encoded. | DTV_VDM_0.01, appstored/1%20CFNetwork/1107.1%20Darwin/19.0.0 |
| date | *(string)* The request end time (date part) in *yyyy-MM-dd format* (UTC time zone). | 2017-10-01 |
| datetime | *(int64)* The request end time in yyyyMMddHHmmss format (UTC time zone). | 20210324151931 |
| duration | *(int64)* The request duration in milliseconds. | 29298749 |
| o-ip | *(string)* The IP address of the origin server that supplied the first byte of the response. Enable via the `log_origin_ip_address` option. | 69.179.9.82 |
| s-dest-addr | *(string)* The IP address that the end user connects to.  It is most often a virtual IP associated with a request router.  In rare cases, when alternative request routing is configured, this IP address corresponds directly to a caching server. | 69.164.9.82 |
| s-host | *string* The hostname of the server that received the request. | cds103.man.llnw.net |
| s-ip | *string* The IP address of the edge-most server that received the request. | 69.164.9.82 |
| s-pop | *string* The Edgio PoP name of the server that received the request. | eabc |
| s-ttfb | *(int32)* The number of milliseconds between the CDN receiving the end-user request and writing the first byte of the response, as measured on the server. A value of 0 (zero) means the time was less than 1ms. | 56  |
| sc-bytes | *(int64)* The number of response bytes, modified to include the packet and retransmit overhead. | 52431246 |
| sc-content-length | *(int64)* The value of the Content-Length header in the response from the server to the client. | 4881818612 |
| sc-content-type | *(string)* The value of the Content-Type header in the response from the server to the client. | application/octet-stream, video/x-m4v |
| sc-headers | *(string)* The value of HTTP response headers specified in the `log_resp_header` rewrite option.<br /> These headers are logged as key-value pairs in this field. If multiple headers are specified to be logged, each key-value pair is separated by a comma.  <br /> The maximum size of this field is 2048 bytes. If the maximum size is exceeded, `error=toolarge` is logged. | hdr1=val_1,hdr2=val%20_2U |
| sc-request-id | *string* The unique ID that identifies a request (generated by the server and sent to the client in the `X-LLNW-Dbg-Request-Id` response debug header) | 49ae542085bb1d5b0c62a9b30c25cb7d |
| sc-rexb | *(int64)* The number of bytes retransmitted in the response from the server to the client. | application/octet-stream, video/x-m4v |
| sc-rtt | *(int64)* The client socket smoothed round-trip time in microseconds. | 11812 |
| sc-rttv | *(int64)* The client socket smoothed round-trip time variance in microseconds. | 250000 |
| sc-status | *(string)* The HTTP status code in the response from the server to the client. <br /> In addition to standard Content Delivery status codes, the sc-status field may contain non-standard status codes: <br /> - 000 - A Edgio-specific status code returned when the origin sends no response, so there is no status code to log (for example when the client disconnects before the origin delivers the response). <br /> - 600 - A Edgio-specific status code indicating the origin returned a non-HTTP-compliant response so a status code could not be obtained. <br /> For a list of standard status codes, see [Response Codes](/delivery/delivery/guide/key_concepts/#response-codes) in the Content Delivery User Guide.| 200, 206, 400 |
| so-src-uri-noquery | *(string)* The URL-encoded source/ origin URL that the published URL has been mapped to (query part excluded). | http://cmdist.dtvce.com/content/B003109030M3.ats |
| so-src-uri | *(string)* The URL-encoded source/ origin URL that the published URL has been mapped to. | http://cmdist.dtvce.com/content/B003109030M3.  <br />ats?cid=003261089464&ct=1588467344 |
| time | *string* The request end time (time part) in *HH:mm:ss.SSS* format (UTC time zone). |     |
| x-firstnode-cached | *(int32)* Integer value indicating whether a cache hit occurred on the server that received the request Possible values: <br />0 - a cache miss occurred <br />1 - a cache hit occurred<br />Customers can use the field to calculate cache efficiency in terms of requests. <br />This field reflects a hit or miss on only the first cache node involved. It does not reflect cache hits and misses for the entire CDN. | 0   |
| x-log-key-value | *(string)* The string representation of the key value pairs configured via the `log_keyval` rewrite option, the Arc Light `llnw.log_keyval() builtin`, and the log_keyval_header global option. This column is limited to 1024 bytes. <br />configures the EdgePrism key-value pairs on behalf of customers. Please contact your Accouont Manager if you are interested in this feature. | dscp=34,partner=eg,proto=ssl,arclight=arc2,policyid=724 |

##### MMD Live Ingest {/*mmd-live-ingest*/}

The following fields are available for you to include when you select *MMD_LIVE_INGEST* as the SERVICE TYPE.

| Field | Details |
| --- | --- |
| audio-bytes | *(int64)* The number of ingested audio bytes. |
| egress-bytes | *(int64)* The number of total possible egress bytes for all output formats. Calculation: (audio_bytes + video_bytes) * num_formats |
| end-time-ms | *(int64)* The request end time (in milliseconds). |
| frames | *(int32)* The number of transcoded frames. |
| ingest-bytes | *(int64)* The number of ingested bytes. If is_transcode == 0 then total_bytes else 0. |
| is-transcode | *(int32)* Indicates whether or not the stream is transcoded (1 - transcoding, 0 - transmuxing). |
| num-output-formats | *(int32)* The number of output formats configured for the stream. |
| slot-name | *(string)* The base name of the stream. |
| slot-profile | *(string)* The name of the stream profile. |
| start-time-ms | *(int64)* The request start time (in milliseconds). |
| total-bytes | *(int64)* The total number of ingested bytes. |
| transcode-bytes | *(int64)* The number of transcoded bytes. If is_transcode == 1 then video_bytes + audio_bytes else 0. |
| transcode-pixels | *(int64)*The number of transcoded pixels. If is_transcode == 1 then video_width * video_height * frames else 0. |

## Retrieving Log Files from Origin Storage  {/*retrieving-log-files-from-origin-storage*/}

You can retrieve your files from Edgio Origin Storage using Origin Storage API calls in conjunction with an HTTP GET request or via the Origin Storage Management Console.

### Download Using the API  {/*download-using-the-api*/}

All methods in this section are in the Origin Storage JSON-RPC API interface. We presented essential information; for detailed information about each method, see the [Origin Storage API Reference Guide](/delivery/storage/apis).

This section describes the methods you need to download files.

Use the `login` method available in the Origin Storage JSON-RPC interface. The token string that allows you to make authenticated calls in the JSON-RPC interface. There are several methods of logging in, but we will use the simplest.

#### login Signature {/*login-signature*/}

`login( username, password, detail)`

#### Parameters {/*parameters*/}

`username`: Your API user name.

`password`: Your API user name.

`detail`: A boolean indicating whether you want simple data or more extensive data returned.

**List Log Files**
To list log files, call the `listFile` method available in the Origin Storage JSON-RPC interface.

#### listFile Signature  {/*listfile-signature*/}

`listFile( token, dir, pageSize, cookie, stat)`

#### Parameters  {/*parameters*/}

`token`: The token returned from the `login` call.

`dir`: A string representing the directory for which you want a list of files.

`pageSize`: A number indicating the number of results (files) to return.

`cookie`: A number used for making multiple `listFile` calls for paginated results.

`stat`: A boolean whether to include file details.

**Obtain a Protected Download URL**
To eliminate security risks, you can obtain a time-based URL to download your log files. This is the `mediaVaultUrl` method available in the Origin Storage JSON-RPC interface.

First, use the `mediaVaultUrl` method to obtain a secure download URL, and then use an HTTP GET request to download.

#### mediaVaultUrl Signature {/*mediavaulturl-signature*/}

`mediaVaultUrl(token, path, expiry)`

#### Parameters {/*parameters*/}

`token`: The token returned from the login call.

`path`: File to generate MediaVault URL.

`expiry`: Download URL expiry for an object in seconds.

The method returns this object:

```python
{
  "code": 0,
  "download_url": "http://cs-download.limelight.com/<path to file>",
  "message": "success",
  "preview_url": "http://cs-download.limelight.com/<path to file>",  
}
```
<Callout type="info">Do not attempt to directly download content from Origin Storage using FTP, SFTP, FTPS, SCP, or rsync because doing so can negatively impact other system processes. To download content, use an HTTP GET request.</Callout>

#### API End-to-End Example

For simplicity, we've omitted error checking. The code sample uses Python.

```python
import jsonrpclib
import requests

url = 'http://{Account name}.upload.llnw.net/jsonrpc'
api = jsonrpclib.Server( url )
res = api.login(yourUser, yourPassword, True)
token = res[0]

'''
User-defined variables
'''
storage_log_dir = '/{account name}/_livelogs/'
pageSize = 10000  # page size for listing log files
files_to_download = []  # log files to download
media_vault_expiry = 60  # expiry time for mediaVaultUrl request
mv_errors = {-1: "Internal error", -2: "Path exists and is a directory", -8: "Invalid path",
            -34: "Invalid expiry", -60: "Service is disabled or unavailable", -10001: "Invalid token"}
'''
Function to examine files returned from calls to listFile
Based on a condition that you determine, you write file names to a list
of files that will later be downloaded.
This simple example looks for file names that contain the number 2.
'''
def parse_list(file_list):
    for (log_file) in file_list:
    name = log_file['name']
    if name.find('2') > -1:
        files_to_download.append(name)
        print(log_file['name'])

'''
List Log files. This is a simplistic approach for demonstration purposes.
Customers might want to try a multi-threaded approach because the number of files can be quite large
'''
results = api.listFile(token, storage_log_dir, pageSize, 0, True)
file_list = results['list']
if len(file_list) > 0:
    parse_list(file_list)
    cookie = results['cookie']
    while cookie > 0:
        results = api.listFile(token, storage_log_dir, pageSize, cookie, True)
        file_list = results['list']
        parse_list(file_list)
        cookie = results['cookie']

'''
Download file. This is a simplistic approach for demonstration purposes.
Customers might want to try a multi-threaded approach for a large number of files to download.
'''
for file_name in files_to_download:
    log_path = storage_log_dir + '/' + file_name
    mvu = api.mediaVaultUrl(token, log_path, media_vault_expiry)
    if mvu['code'] != 0:
        print("Error attempting to call 'mediaVaultUrl.\nCode: " + str(mvu['code']) + ": " + mv_errors[mvu['code']])
        mv_download_url = mvu['download_url']
        # Use the requests library to make the download
        response = requests.get(mv_download_url)
        # Upon non-success write a line to your errors file
        if response.status_code != 200:
            print("Unable to download " + file_name + ". Status code: " + response.status_code)
```
### Download from Storage  {/*download-using-the-storage-management-console*/}

#### Download Manually
You can download a log file using the Origin Storage Management Console.

Begin by logging into the Edgio Control Portal, then follow these steps:

1. Select "Manage", followed by "Origin Storage Console."
2. Navigate to the folder that contains the file you want to download.
3. Click the download icon. Your browser downloads the file.

#### Download via Python

This Python script deletes the file once it is downloaded. It also deletes the directory if it becomes empty. Use the parameter max_files to download multiple files if you don't want the limit set to 0.

```Python
#!/usr/bin/env python
import logging, sys, csv, itertools
from multiprocessing import Pool
import requests
import time
import json
import threading

'''
Author: spandey
Unofficial Sample. Provided AS IS. WITHOUT ANY WARRANTY OR CONDITIONS.
Uses Python 3
'''
LOG_FILENAME = 'LDSDownloadSession.log'
FileList = 'DLFiles.log'
logging.basicConfig(filename = LOG_FILENAME, level = logging.DEBUG, format='%(asctime)s %(levelname)s-%(filename)s:%(message)s')
logger = logging.getLogger(__name__)

class StatError(RuntimeError):
        def __init__(self, arg):
                self.args = arg

class ListPathError(RuntimeError):
        def __init__(self, arg):
                self.args = arg

jsonRPC_Endpoint=''
token=''
cookie = ''
numFiles = 0

numDirs = 0
totalBytes = 0
oldFileList = []
theFileList = []
dirList = []
threads = []
#max files to download per session set to 0 for unlimited download
max_files = 5
'''
User-defined variables
'''
storage_log_dir = '/_livelogs/http/<change with the base path>'
pageSize = 10000  # page size for listing log files
files_to_download = []  # log files to download
media_vault_expiry = 60  # expiry time for mediaVaultUrl request
mv_errors = {-1: "Internal error", -2: "Path exists and is a directory", -8: "Invalid path",
            -34: "Invalid expiry", -60: "Service is disabled or unavailable", -10001: "Invalid token"}
'''
Function to examine files returned from calls to listFile
Based on a condition that you determine, you write file names to a list
of files that will later be downloaded.
This simple example looks for file names that contain the number 2.
need to add {"method":"deleteFile","id":39,"jsonrpc":"2.0","params":{"token":"a4660cbde39c4dceb2cf796d494db3da","path":"/lll/1.mp4"}}
'''

def parse_list(file_list):
    for log_file in file_list:
        name = log_file['name']
    if name.find('2') > -1:
        files_to_download.append(name)
        print(log_file['name'])

def getFileListing(token, _dirname_, res):
    numDirs = len(res['dirs'])
    numFiles =  len(res['files'])
    _directories_ = res['dirs']
    print ("Total directory count: " + str(numDirs))
    print ("Total file count: " + str(numFiles))
    #Delete the dir in case is empty and is not the base path
    if numDirs == 0 and numFiles == 0 and _dirname_.count('/') > 3:
        delp = '{"method":"deleteDir","id":1,"jsonrpc":"2.0","params":{"token":"'+ token +'","path":"'+ _dirname_ +'"}}'
        print("\nDeleting : "+ delp)
        delpRes = requests.post(jsonRPC_Endpoint, data=delp)
        delpRes = json.loads(delpRes.text)
        delpCode = delpRes['result']
        #print("\n\n-------------- Code: " + str(delpCode) )
        if delpCode != 0:
            print("Error attempting to call del url.\nCode: " + str(delpCode))

    for _dir_ in _directories_:
        #print ("Scanning Directory: " + _dir_['name'] + " for dirs")
        dirName = _dirname_ + '/' + _dir_['name']
        listPath(token, dirName)
    # Listing Files
    file_listing = res['files']
    conteggio = 0
    for file in file_listing:
        '''
        Download file. This is a single-threaded approach for simple use & demonstration purposes.
        Customers might want to try a multi-threaded approach for a large number of files to download.
        '''
        conteggio += 1
        log_path = _dirname_+ '/' + file['name']
        #print("\nstarting download of: "+ log_path)
        mvu = '{"method": "mediaVaultUrl", "id": 1, "params": {"token":"'+ token +'", "path": "'+ log_path +'", "expiry": '+str(media_vault_expiry)+'}, "jsonrpc": "2.0"}'
        mvuRes = requests.post(jsonRPC_Endpoint, data=mvu)
        mvuRes = json.loads(mvuRes.text)
        #print("==== Printing mediaVaultUrl response  ====\n")
        #print(mvuRes)
        code = mvuRes['result']['code']
        if code !=0:
            print("Error attempting to call 'mediaVaultUrl.\nCode: " + str(code) + ": " + mv_errors[code])
        else:
            mv_download_url = mvuRes['result']['download_url']
            # grab the name of the file to write from mv url
            lds_file_name = mv_download_url.rsplit("/",1)[1].split("?")[0]
            print(mv_download_url, '\nFilename:'+lds_file_name)
            with open(lds_file_name, "wb") as f:
                # Use the requests library to make the download
                response = requests.get(mv_download_url, stream=True)
                # check & show download progress
                total_length = response.headers.get('content-length')
                if total_length is None: # no content length header
                    print("no content-length header found")
                    f.write(response.content)
                else:
                    dl = 0
                    total_length = int(total_length)
                    for data in response.iter_content(chunk_size=4096):
                        dl += len(data)
                        f.write(data)
                        done = int(50 * dl / total_length)
                        sys.stdout.write("\r[%s%s]" % ('|' * done, ' ' * (50-done)) )
                        sys.stdout.flush()
                    #Delete the file just downloaded
                    delu = '{"method":"deleteFile","id":1,"jsonrpc":"2.0","params":{"token":"'+ token +'","path":"'+ log_path +'"}}'
                    print("\nDeleting : "+ delu)
                    deluRes = requests.post(jsonRPC_Endpoint, data=delu)
                    deluRes = json.loads(deluRes.text)
                    #delcode = deluRes['result']['code']
                    #print("\n\n-------------- Code: " + str(delcode) + ": " + mv_errors[delcode])
                    #if delcode !=0:
                    #    print("Error attempting to call del url.\nCode: " + str(delcode) + ": " + mv_errors[delcode])
                # Upon non-success write a line to your errors file
                if response.status_code != 200:
                    print("Unable to download " + file['name'] + ". Status code: " + response.status_code)
        if conteggio == max_files:
            break    # break here

# def writeToFile(filename, data):
#       with open(filename, 'w') as f:
#               i = 0
#               for i in range(len(data)):
#                       print(data[i]+'\n', end="", file=f)

def listPath(token, _dirname_):
        '''
    Listing path recursively
    '''
        try:
                # Scan through parent directory for the files and sub-dirs
                listpathdata='{"method": "listPath","id": 1,"params": {"token": "'+token+'","path": "'+_dirname_+'","pageSize": '+str(pageSize)+',"cookie": "'+cookie+'","stat": true},"jsonrpc": "2.0"}'
                # print('===List Path Data - Parent==\n', listpathdata)
                res = requests.post(jsonRPC_Endpoint, data=listpathdata)
                res = json.loads(res.text)
                print ('======Listing Path for: '+_dirname_)
                code = res['result']['code']

                if code !=0:
                        msg = 'Error issuing listPath command on directory: ' + _dirname_
                        msg += '\n Return code: ' + str( code )
                        msg += '\n See API documentation for details.'
                        logger.error('ListPathError' + msg)
                        raise ListPathError( msg )

                theFileList = getFileListing(token,_dirname_,res['result'])

        except ListPathError as e:
                print (''.join( e.args ))

        except StatError as e:
                print (''.join( e.args ))

def main(host, username, password):
    global jsonRPC_Endpoint
    jsonRPC_Endpoint = host
    try:
        # Obtain token
        loginData='{"method": "login","id": 0,"params": {"username": "'+username+'","password":"'+password+'","detail": true},"jsonrpc": "2.0"}'
        login = requests.post(jsonRPC_Endpoint, data=loginData)
        print (login.reason, login.headers)
        resp = json.loads(login.text)
        token = resp['result'][0]
        print ('=======Token & User======\n',token)
        logger.debug('Logged In. Token Is: '+ token)

        # Persist Token for the session until the logout or the end of time defined by 'expire'
        persistData='{"method": "updateSession","id": 4,"params": {"token": "'+token+'", "expire": 0},"jsonrpc": "2.0"}'
        persist = requests.post(jsonRPC_Endpoint, data=persistData)
        persist = json.loads(persist.text)
        #print('=======Updated Token======\n',persist)
        if persist['result'] == 0:
        #    print('Token Persisted!')
            logger.debug('Token Persisted!. Token Is: '+ token)

        # call listPath method on storage
        listPath(token, storage_log_dir)
    except Exception as e:
        print(''.join( e.args ))
        logger.error('Error Occured While Logging')
    finally:
        #print ('\nLogging out...\n')
        logoutData = '{"method": "logout","id": 1,"params": {"token": "'+token+'"},"jsonrpc": "2.0"}'
        logoutRes = requests.post(jsonRPC_Endpoint, data=logoutData)
        logoutRes = json.loads(logoutRes.text)
        #print ('Logout results: ', logoutRes)
        if logoutRes['result'] == 0:
            logger.debug('Logged Out!')

if __name__ == "__main__":
    main('https://<shortname>-l.upload.llnw.net/jsonrpc2', '<user-vs>',"<password-vs>")
```

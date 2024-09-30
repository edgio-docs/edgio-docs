---
title: Log Delivery Service
---

Log Delivery Service (LDS) collects log data from CDN services and delivers it to your destination. This data can be used for traffic analysis, event monitoring, performance tuning, troubleshooting, and more.
At present, LDS captures logs from the following CDN services:

- **Content Delivery (HTTP)**: Provides detailed insights into the content delivery via the CDN. 
- **MMD Live Ingest (MMD_LIVE_INGEST)**: Captures information about the transcoding of ingested media streams into various bitrates and formats for further playback. 

## LDS Workflow {/*lds-workflow*/} 
![LDS Workflow](/images/delivery/control/lds/lds-workflow.png)
1. You start by setting up your Log Delivery Service (LDS) configuration using either the  LDS UI or LDS API. This configuration determines what logs data is collected, how it is processed, and delivered.
2. LDS picks up configuration and begins processing based on new settings.
3. As users interact with your CDN services, their requests are logged. 
4. LDS collects and processes these logs from the CDN, extracting and organizing the data based on the configuration you set. This step involves parsing the logs and preparing them for delivery.
5. After processing, LDS delivers the logs to the specified destination, which could be cloud storage, a custom HTTP endpoint, or another location of your choice. 
6. Once delivered, the logs are ready for you to analyze. 

## View and Manage LDS Configurations  {/*view-lds-configurations*/} 

The **Log Delivery Service** page under the **Configure** menu displays a list of configurations for the selected account, allowing users to view and manage them. It provides the following details about each configuration:
- **NAME**: The name you provided for the configuration.
- **SHORTNAME**: The account name for which the LDS configuration collects log data.
- **SERVICE TYPE**: CDN service from which the logs are collected by the LDS configuration.
- **DESTINATION**: The target storage system where the LDS configuration sends the collected logs.
- **DATA COMPRESSION**: Indicates the algorithm used to compress log data.
- **STATE**: Shows the current state of the configuration.
  - Active: The configuration is active and processing log data. 
  - Suspended: The configuration is paused and not processing log data.
- **LAST UPDATED**: Shows the date and time when the LDS configuration was last modified. 
- **STATUS**: Includes controls to [activate or deactivate the configuration](#active-deactivate-lds-configurations), as well as to delete it.

## Create an LDS Configuration  {/*create-lds-configuration*/} 
1. Navigate to **Configure > Log Delivery Service** and click the "+" button.
2. Enter a **NAME** for the configuration.
3. Select a **SHORTNAME** that you want the LDS to collect logs for.
4. From the list of available services, select the CDN **SERVICE** from which you want LDS to collect log data. The supported services include:
   - Content Delivery (HTTP)
   - MMD Live Ingest (MMD_LIVE_INGEST)
5. In **Available Log Fields**, select the fields to collect, move them to **Selected Log Fields** by dragging or double-clicking. Arrange the fields in the desired order. For details on the available fields for each service, refer to the following links:
   - [Available Log Fields for Content Delivery](#http-log-fields) 
   - [Available Log Fields for MMD Live Ingest](#mmd-ingest-log-fields)
6. Optionally, can rename selected fields by **assigning aliases**. To do this, click the square brackets  <img src="/images/delivery/control/lds/square-brackets.png" alt="active" style={{ display: 'inline', width: '16px', height: '16px', margin: '0px' }} /> next to the field name, and enter the alias. For details refer to [Field Aliases](#field-aliases).
7. Additionally, you can **add static fields** by clicking the Add Static Field button. This opens a popup where you can enter a field name and a static value. For details refer to [Static Fields](#static-fields).
8. In the **DESTINATION** dropdown, select the storage type where you want the logs to be delivered.
<Callout type="info">  Each account can have only one LDS configuration per destination. For additional configurations to the same destination, please contact your account manager.</Callout>
9. Enter the details for your chosen destination.
   - For Amazon S3 see [Configure logs delivery to Amazon S3](#s3)
   - For Custom HTTPS endpoint see [Configure logs delivery to Custom HTTPS endpoint](#https-endpoint)
   - For Datadog see [Configure logs delivery to Datadog](#data-dog)
   - For Origin Storage see [Configure logs delivery to Edgio Origin Storage](#origin-storage)
   - For Google Cloud Storage see [Configure logs delivery to Google Cloud Storage](#google-cloud-storage)
   - For Hydrolix see [Configure logs delivery to Hydrolix](#hydrolix)
4. In the **Delivery Options** section, customize the log data format and compression, and set file naming and storage paths.
   - Use **DIRECTORY LAYOUT** dropdown to choose the folder path within the destination. Available for file-based destinations (S3, GCP, and Origin Storage). For further details refer to [Changing Log Data Location](#files-naming).
   - The **FILENAME TEMPLATE** dropdown determines the naming convention for log files uploaded to your destination storage. The filename template is fixed and cannot be edited through the UI. Available for file-based destinations (S3, GCP, and Origin Storage). For details refer, see [Changing Log Data Location](#files-naming).
   - In the **DATA FORMAT** dropdown, you can select the format for the uploaded log data. Available formats may vary depending on the selected destination type. See [Log Data Formats](#data-formats).
   - In the **DATA COMPRESSION** dropdown, select the compression format for the log data. The available options may vary based on the selected destination type. Refer to [Log Data Compression](#data-compression) for more information.
11. In the **Data Sampling** section, configure the volume of delivered log data. For more information, see [Data Sampling](#data-sampling).
12. Click **Save** to apply your updates.
<Callout type="info"> It can take 15 to 40 minutes for changes to take effect.</Callout>


## Edit an LDS Configuration  {/*edit-lds-configuration*/} 
1. Go to **Configure > Log Delivery Service** page.
2. Find the configuration you want to edit, and click on it to open the configuration in edit mode.
3. Update the following settings as needed:
   - **Name**: Modify the name of the configuration for easier identification.
   - **Available Log Fields**: Change the fields to be collected by dragging them between the Available and Selected sections, or add static fields using the **Add Static Field** button. Additionally, you can assign aliases to selected fields by clicking the square brackets <img src="/images/delivery/control/lds/square-brackets.png" alt="active" style={{ display: 'inline', width: '16px', height: '16px', margin: '0px' }} /> next to the field name and entering an alias in the input box that appears. For details refer to [Static Fields](#static-fields) and  [Field Aliases](#field-aliases)
   - In the **Delivery Destination** section, modify the destination details for log delivery as necessary.
     - For Amazon S3 see [Configure logs delivery to Amazon S3](#s3)
     - For Custom HTTPS endpoint see [Configure logs delivery to Custom HTTPS endpoint](#https-endpoint)
     - For Datadog see [Configure logs delivery to Datadog](#data-dog)
     - For Origin Storage see [Configure logs delivery to Edgio Origin Storage](#origin-storage)
     - For Google Cloud Storage see [Configure logs delivery to Google Cloud Storage](#google-cloud-storage)
     - For Hydrolix see [Configure logs delivery to Hydrolix](#hydrolix)
4. Under the **Delivery Options** section:
     - Use **DIRECTORY LAYOUT** dropdown to configure the folder structure within the destination for file-based storage (S3, GCP, and Origin Storage). For more information, see [Changing Log Data Location](#log-files-naming-and-location).
     - In the **DATA FORMAT** dropdown choose the format for the log data. The available options may depend on your selected destination. Refer to [Log Data Formats](#data-formats) for more information.
     - In the **DATA COMPRESSION** dropdown select the compression method for the log data. The available choices vary by destination type. See [Log Data Compression](#data-compression) for details.
5. In the **Data Sampling** section, adjust the volume of log data being delivered. For more information, see [Data Sampling](#data-sampling).
4. Click **Save** to apply your updates.

<Callout type="info"> It can take 15 to 40 minutes for changes to take effect.</Callout>

## Activate or Deactivate LDS Configuration {/*active-deactivate-lds-configurations*/} 
You can activate or deactivate a configuration from two locations:
1. **Configuration Grid**: On the **Configure > Log Delivery Service page**, check the Status column:
   - The <img src="/images/delivery/control/lds/active.png" alt="active" style={{ display: 'inline', width: '16px', height: '16px', margin: '1px' }} /> icon means the configuration is active. Clicking it will deactivate the configuration.
   - The <img src="/images/delivery/control/lds/inactive.png" alt="active" style={{ display: 'inline', width: '16px', height: '16px', margin: '1px' }} /> icon means the configuration is inactive. Clicking it will activate the configuration.
2. While **Editing the Configuration**: When editing a configuration, use the button at the bottom to activate or deactivate it.
<Callout type="info"> It may take 5 to 10 minutes for changes to activation status to take effect. </Callout>

## Log Fields {/*log-fields*/} 
When configuring LDS, you must select the log fields to be collected and delivered. Each service provides a different set of log fields.

### Content Delivery Log Fields {/*http-log-fields*/}
<Callout type="info">LDS currently supports only log fields related to egress traffic. Midgress or ingress information is not available at this time.</Callout>

#### Date/Time-Related Metrics {/*date-time-related-metrics*/}

| Field  | Details | Sample Data |
| --- | --- | --- |
| date | *(string)* The request end time (date part) in yyyy-MM-dd format (UTC time zone). | 2017-10-01 |
| datetime | *(string)* The request end time in yyyyMMddHHmmss format (UTC time zone). | 20210324151931 |
| time | *(string)* The request end time (time part) in HH:mm:ss.SSS format (UTC time zone). | 22:27:41.123 |
| timestamp  | *(int64)* The request end time in milliseconds since the epoch | 1727095993023 |
| timestamp-sec  | *(double)* The request end time since the epoch, formatted as `{seconds}.{milliseconds}` | 1727095993.023 |

#### Client-Server Communication Metrics {/*client-server-communication-metrics*/}

| Field | Details | Sample Data |
| --- | --- | --- |
| cs-accept-language | *(string)* The value of the Accept-Language request header. | fr-MH;q=1.0 |
| cs-custom-header1 | *(string)* The value of the request header specified in the log_request_header rewrite option. You can include the value of up to five custom headers as defined as log_request_header* fields in Caching and Delivery. | sample-header-value |
| cs-custom-header2 | *(string)* The value of the request header specified in the log_request_header rewrite option. You can include the value of up to five custom headers as defined as log_request_header* fields in Caching and Delivery. | sample-header-value |
| cs-custom-header3 | *(string)* The value of the request header specified in the log_request_header3 rewrite option. You can include the value of up to five custom headers as defined as log_request_header* fields in Caching and Delivery. | sample-header-value |
| cs-custom-header4 | *(string)* The value of the request header specified in the log_request_header4 rewrite option. You can include the value of up to five custom headers as defined as log_request_header* fields in Caching and Delivery. | sample-header-value |
| cs-custom-header5 | *(string)* The value of the request header specified in the log_request_header5 rewrite option. You can include the value of up to five custom headers as defined as log_request_header* fields in Caching and Delivery. | sample-header-value |
| cs-headers | *(string)* The value of the HTTP request headers specified in the log_req_header rewrite option. These headers are logged as key-value pairs in this field. If multiple headers are specified to be logged, each key-value pair is separated by a comma. The maximum size of this field is 2048 bytes. If the maximum size is exceeded, error=toolarge is logged. | hdr1=val_1,hdr2=val%20_2|
| cs-http-proto | *(string)* The version of the HTTP protocol sent from the client to the server. | HTTP/2.0 |
| cs-method | *(string)* The HTTP request method (GET, POST, and so on) sent from the client to the server | GET |
| cs-range | *(string)* The value of the Range header sent from the client to the server. URL-encoded. | bytes=2015-2642 |
| cs-referer | *(string)* The value of the Referrer header sent from the client to the server. URL-encoded. | https://site.com/page |
| cs-ssl-cipher | *(string)* The version that the client supports, sent from the client to the server. | AES256-SHA |
| cs-ssl-proto | *(string)* The version that the client supports, sent from the client to the server. | TLSv1.2 |
| cs-user-agent | *(string)* The value of the User-Agent header in the request from the client to the server. URL-encoded. | Microsoft%20BITS/7.5%20 |
| duration | *(int32)* The request duration in milliseconds. | 29298749 |
| duration-sec | *(int32)* The request duration formatted as `{seconds}.{milliseconds}`  | 29298.749 |

#### Server-Client Communication-Related Metrics {/*server-client-communication-related-metrics*/}

| Field | Details | Sample Data |
| --- | --- | --- |
| sc-bytes | *(int64)* The number of response bytes, modified to include the packet and retransmit overhead. | 52431246 |
| sc-content-length | *(int64)* The value of the Content-Length header in the response from the server to the client. | 4881818612 |
| sc-content-type | *(string)* The value of the Content-Type header in the response from the server to the client. | application/octetstream, video/x-m4v |
| sc-headers | *(string)* The value of HTTP response headers specified in the `log_resp_header` rewrite option.<br /> These headers are logged as key-value pairs in this field. If multiple headers are specified to be logged, each key-value pair is separated by a comma.  <br /> The maximum size of this field is 2048 bytes. If the maximum size is exceeded, `error=toolarge` is logged. | hdr1=val_1,hdr2=val%20_2U |
| sc-request-id | *(string)* The unique ID that identifies a request (generated by the server and sent to the client in the X-LLNW-Dbg-Request-Id response debug header) | 49ae542085bb 1d5b0c62a9b3 0c25cb7d |
| sc-response-write-time-sec | *(double)* The time taken by the edge server to write the response formatted as `{seconds}.{milliseconds}`  | 0.023 |
| sc-rexb | *(int64)* The number of bytes retransmitted in the response from the server to the client. | 45645 |
| sc-rtt | *(int64)* The client socket smoothed round-trip time in microseconds. | 11812 |
| sc-rttv | *(int64)* The client socket smoothed round-trip time variance in microseconds. | 250000 |
| sc-status | *(string)* The HTTP status code in the response from the server to the client. <br /> In addition to standard Content Delivery status codes, the sc-status field may contain non-standard status codes: <br /> _000_ A Edgio-specific status code returned when the origin sends no response, so there is no status code to log (for example when the client disconnects before the origin delivers the response). <br /> _600_ A Edgio-specific status code indicating the origin returned a non-HTTP-compliant response so a status code could not be obtained. <br /> For a list of standard status codes, see Response Codes in the Content Delivery User Guide | 200, 206, 400 |
| sc-status-code | *(int32)* The HTTP response status code, provided as an integer. | 200 |
| sc-status-msg | *(string)* The response HTTP status message generated by the edge server | OK |

#### Client-Related Metrics {/*client-related-metrics*/}

| Field | Details | Sample Data |
| --- | --- | --- |
| c-as-org | *(string)* The organization associated with the client’s ASN | compaia de circuitos cerrados s.a. |
| c-asn | *(int64)* The autonomous system number calculated based on client IP address. | 22822 |
| c-city | *(string)* The City name derived from the client IP address using the IPGeo DB. | phoenix |
| c-continent-code | *(string)* Two-letter uppercase continent code derived from the client’s IP address | SA |
| c-country | *(string)* The Country name derived from the client IP address using the IPGeo DB. | united states |
| c-country-code | *(string)* The two-letter ISO 3166-1 alpha-2 country code derived from client IP address. | UK |
| c-geo-latitude | *(double)* The approximate latitude associated with the client’s IP address | -26.81 |
| c-geo-longitude | *(double)* The approximate longitude associated with the client’s IP address | -65.22 |
| c-ip | *(string)* The Client IP Address (end-user). | 66.249.69.88, 2001:0db8: 85a3:0000:0000:8a2e:0370: 7334 |
| c-ip-ver | *(string)* The client’s IP version number. Valid values: INET (IPv4), INET6 (IPv6). | INET |
| c-port | *(string)* The client remote port number used for a connection. | 80832 |
| c-state | *(string)* The State name derived from the client IP address using the IPGeo DB. | arizona |


#### Server-Related Metrics {/*server-related-metrics*/}

| Field | Details | Sample Data |
| --- | --- | --- |
| s-cache-code | *(string)* The cache status code for the request, showing how it was processed by the CDN in terms of caching | TCP_HIT |
| s-dest-addr | *(string)* The IP address that the end user connects to. It is most often a virtual IP associated with a request router. In rare cases, when alternative request routing is configured, this IP address corresponds directly to a caching server. | 69.164.9.82 |
| s-host | *(string)* The hostname of the server that received the request. | cds103.man.llnw.net |
| s-ip | *(string)* The IP address of the edge-most server that received the request. | 69.164.9.82 |
| s-pop | *(string)* The Edgio PoP name of the server that received the request. | mia |
| s-port | *(int32)* The port number on the edge server receiving the client request. Valid values: 80, 443 | 443 |
| s-ttfb | *(int32)* The number of milliseconds between the CDN receiving the end-user request and writing the first byte of the response, as measured on the server. A value of 0 (zero) means the time was less than 1ms. | 56 |
| s-ttfb-sec | *(double)* The time between the CDN receiving the request and writing the first byte of the response, formatted as `{seconds}.{milliseconds}` | 0.056 |

#### Server-origin communication related metrics

| Field | Details | Sample Data |
| --- | --- | --- |
| so-src-uri | *(string)* The URL-encoded source/origin URL that the published URL has been mapped to (query part excluded). | http://cmdist.dtvce.com/content/B003109030M3.ats?cid=003261089464&ct=1588467344 |
| so-src-uri-noquery | *(string)* The URL-encoded source/ origin URL that the published URL has been mapped to (query part excluded). | http://cmdist.dtvce.com/content/B003109030M3.ats |
| so-src-uri-path | *(string)* The URL path from the source/origin URL, excluding the query string, starting after the hostname | /geo-health.txt |

#### Origin related metrics

| Field | Details | Sample Data |
| --- | --- | --- |
| o-ip | (string) The IP address of the origin server that supplied the first byte of the response. Enable via the log_origin_ip_address option. | 69.164.9.82 |


#### Application(Edgio) specific metrics

| Field | Details | Sample Data |
| --- | --- | --- |
| x-account | *(string)* The account number is represented as a string | 23 |
| x-first-node-cached | *(int32)* Integer value indicating whether a cache hit occurred on the server that received the request Possible values: <br />0 - a cache miss occurred <br />1 - a cache hit occurred<br />Customers can use the field to calculate cache efficiency in terms of requests. <br />This field reflects a hit or miss on only the first cache node involved. It does not reflect cache hits and misses for the entire CDN. | 0 |
| x-log-key-value | *(string)* The string representation of the key value pairs configured via the `log_keyval` rewrite option, the Arc Light `llnw.log_keyval() builtin`, and the log_keyval_header global option. This column is limited to 1024 bytes. <br />configures the EdgePrism key-value pairs on behalf of customers. Please contact your Accouont Manager if you are interested in this feature. | dscp=34, partner=eg, proto=ssl, arclight=arc2, policyid=724 |


### MMD Live Ingest Log Fields {/*mmd-ingest-log-fields*/}

The following fields are available for you to include when you select *MMD_LIVE_INGEST* as the SERVICE TYPE.

| Field | Details | Sample Data |
| --- | --- |--- |
| audio-bytes | *(int64)* The number of ingested audio bytes. | 15833 |
| egress-bytes | *(int64)* The number of total possible egress bytes for all output formats. | 17307 |
| end-time-ms | *(int64)* The request end time (in milliseconds). | 1726020001361 |
| frames | *(int32)* The number of transcoded frames. | 1 |
| ingest-bytes | *(int64)* The number of ingested bytes. If is-transcode == 0 then total-bytes else 0. | 4605662 |
| is-transcode | *(int32)* Indicates whether or not the stream is transcoded (1 - transcoding, 0 - transmuxing). | 1 |
| num-output-formats | *(int32)* The number of output formats configured for the stream. | 2 | 
| slot-name | *(string)* The base name of the stream. | af993324aa9644789f4b97a9b68622b2 |
| slot-profile | *(string)* The name of the stream profile. | 4000 |
| start-time-ms | *(int64)* The request start time (in milliseconds). | 1726020001361 |
| total-bytes | *(int64)* The total number of ingested bytes. | 245135 |
| transcode-bytes | *(int64)* The number of transcoded bytes.  | 4497211 |
| transcode-pixels | *(int64)*The number of transcoded pixels.  | 69580800 |


### Static Fields  {/*static-log-fields*/}

Static fields allow you to add a constant string value to every log line provided by LDS, which is useful for metadata or fixed identifiers. Static fields can be managed on the `Create/Update LDS Configuration` page.

#### Create Static Field
1. Click **ADD STATIC FIELD** below the **Available Log Fields** section in your configuration.
2. Enter a **field name** (up to 50 characters, starting with a letter, using lowercase Latin letters, digits, `_`, or `-`) and a **value** (up to 1024 characters).
3. After entering the field name and value, click the **ADD STATIC FIELD** button to create the field. The field will then appear in the **Available Log Fields** section.

- Static fields are shared across all LDS configurations for the same account and service type. For example, a static field created in an HTTP service configuration for the `test` account will be available in all other configurations for that service and account.
- You can create up to 10 static fields per account and service type.
- You can add the static field to the **Selected Log Fields** by dragging it or double-clicking it.

#### Edit Static Field
- To change the value of a static field, click on its name in either the **Available Log Fields** or **Selected Log Fields** section. A popup will appear allowing you to modify the field value. The field name is fixed and can only be specified during creation.

#### Delete Static Field
- To delete a static field, first ensure it is removed from the **Selected Log Fields** section, as deletion is not permitted while it is in use in any LDS configuration. Click on the field name in the **Available Log Fields** section. A popup will appear with a **Delete** button for confirmation.

### Field Aliases {/*field-aliases*/}
Field aliases allow you to assign alternative names to log fields. Aliases can be managed on the `Create/Update LDS Configuration` page.
#### Assigning an Alias to Log Field
1. To assign an alias, click the square brackets <img src="/images/delivery/control/lds/square-brackets.png" alt="active" style={{ display: 'inline', width: '16px', height: '16px', margin: '0px' }} /> next to the field name in the **Selected Log Fields** section. An input box will appear where you can enter the alias.
2. Once done, press **Enter** or click outside the box to save. The alias will then display alongside the original log field name.
#### Edit Alias
- Click on the alias, modify the name, and press **Enter** or click outside the input box to save.
#### Delete Alias
- To delete an alias, click the alias, clear the name, and press **Enter** or click outside the input box to save.


## Configure Destinations {/*destinations*/}

LDS supports delivery to the following destinations: Amazon S3, Custom HTTPS endpoint, Datadog, Edgio Origin Storage, Google Cloud Storage, and Hydrolix.

### Delivery to Amazon S3 {/*s3*/}

**Prerequisites**

1. Create an `S3 Identity and Access Management (IAM) user` in Amazon’s configuration screens.
2. Give the `IAM user` the following permissions for the bucket where you want to store logs:
   - `ListBucket`
   - `GetObject`
   - `PutObject`

**Configuration**
1. On the `Create/Update LDS Configuration` page in the **Delivery Destination** section, choose **Amazon S3** from the dropdown.
2. Enter your bucket name in the **BUCKET NAME** field.
3. Select the AWS region where the bucket is located from the **REGION** dropdown.
4. Optionally, specify a path within the bucket for storing files in the **PATH** field.
   <Callout type="info">Do not add a leading slash to the path. If you do, Amazon creates an object URL with a double slash. Example: `https:://bucket.s3.region.amazonaws.com//cdn_logs...` </Callout>
5. In the **ACCESS KEY** field, enter the access key for your Amazon S3 bucket.
6. In the **SECRET KEY** field, enter the secret key for your Amazon S3 bucket.
7. Optionally, in the **Delivery Options** section:
   - Change the **DIRECTORY LAYOUT** to customize how logs are organized within a bucket. For details, refer to [Log Files Naming and Location](#files-naming-and-location).
   - Choose the **DATA COMPRESSION** method for your log files. Supported options include: LZ4 *(default)*, GZIP, LZF, SNAPPY, ZSTD.
   - Select the log **DATA FORMAT:**: [W3C (Tab-Separated)](#w3c)*(default)*, [TSV](#tsv), [JSON Lines](#json-lines), [JSON Array](#json-array), [JSON](#json).
   - If you need fields with `null` values to be included in JSON format files, select the **INCLUDE NULL VALUES IN JSON** option, as they are excluded by default.
8. Optionally, in the **Data Sampling** section, reduce the volume of delivered logs by applying sampling rules. Refer to the [Data Sampling](#data-sampling) for additional details.
9. Click **Save** to validate the connection to the destination and apply your settings.

<Callout type="info">During the validation process, LDS creates a test file in the specified S3 bucket using the provided credentials and settings. The file is named `_edgio_validation/validation_{timestamp}.txt`. The file will only appear if the validation is successful. Since these files are no longer necessary after validation, you can delete them as needed.</Callout>

### Delivery to Custom HTTPS endpoint (Streaming){/*https-endpoint*/}

LDS supports streaming log data to a custom HTTPS endpoint using POST requests. To configure this:

1. On the `LDS Configuration` page, in the **Delivery Destination** section, select **Custom HTTPS Endpoint (Streaming)** from the dropdown.
2. Enter the `HTTPS URL` that accepts `POST` requests in the **URL** field.
3. Optionally, in the **AUTHORIZATION HEADER VALUE** field, provide the value for the Authorization header to be used when sending logs (e.g., `Basic <Base64 encoded username and password>` or `Bearer <Your API key>`).
4. Optionally, use the **CUSTOM HEADER NAME** and **CUSTOM HEADER VALUE** fields to specify additional HTTP headers. You can add multiple headers using the **+**(plus) button or remove them with the **-**(minus) button.  <Callout type="info">Standard headers `Content-Type, Encoding, Authorization, and Host` are not supported.</Callout>
5. Optionally, in the **Delivery Options** section:
   - Choose the log **DATA COMPRESSION** method. Supported options include: ZSTD, GZIP.
   - Select the log **DATA FORMAT:**: [TSV](#tsv), [JSON Lines](#json-lines), [JSON Array](#json-array), [JSON](#json).
   - If you need fields with `null` values to be included in JSON format messages, select the **INCLUDE NULL VALUES IN JSON** option, as they are excluded by default.
   
8. Optionally, in the **Data Sampling** section, reduce the volume of delivered logs by applying sampling rules. Refer to the [Data Sampling](#data-sampling) for additional details.
9. Click **Save** to validate the connection to the destination and apply your settings.

<Callout type="info">During validation, LDS sends a sample POST request to the provided endpoint to verify access. The request body contains sample data formatted according to the selected data format and compressed using the chosen data compression algorithm. A response with any 2xx status code indicates that the validation is successful.</Callout>

### Delivery to Datadog (Streaming){/*data-dog*/}

**Prerequisites**
- **A Datadog account**: Use an existing account or create a new one.
- **A Datadog API key**: Generate via Datadog. (See Datadog’s documentation on API and Application Keys.)

**Configuration**
1. On the `LDS Configuration` screen, in the **Delivery Destination** section, select **Datadog** from the dropdown.
2. Enter the following details:
   - **SITE**: Select the Datadog site region that matches your Datadog environment.
   - **API KEY**: Enter the API key associated with your Datadog account.
   - **SERVICE**: (Optional) Specify the property to be used as the ‘service’ property in Datadog.
   - **TAGS**: (Optional) Provide a comma-separated list of tags to include with the logs (e.g., `cdn:edgio`).
3. Optionally, in the **Data Sampling** section, reduce the volume of delivered logs by applying sampling rules. Refer to the [Data Sampling](#data-sampling) for additional details.
4. Click **Save** to validate the connection to the destination and apply your settings.

### Delivery to Edgio Origin Storage{/*origin-storage*/}
<Callout type="info">Standard fees apply for using Origin Storage.</Callout>
**Prerequisites**
- Ensure Origin Storage is enabled for the account where you want to store logs.

**Configuration**
1. On the `LDS Configuration` screen, in the **Delivery Destination** section, select **Origin Storage** from the dropdown.
2. Optionally, specify the **STORAGE ACCOUNT** if you want to use a different Origin Storage account. By default, logs are stored under the same account that owns the LDS configuration.
  <Callout type="info">Log files are stored in a directory named ‘_livelogs’ at the root of your space. You are responsible for managing and removing data; LDS does not handle data removal.</Callout>
3. Optionally, in the **Delivery Options** section:
   - Change the **DIRECTORY LAYOUT** to customize how logs are organized within a bucket. For details, refer to [Log Files Naming and Location](#files-naming-and-location).
   - Choose the **DATA COMPRESSION** method for your log files. Supported options include: LZ4 *(default)*, GZIP, LZF, SNAPPY, ZSTD.
   - Select the log **DATA FORMAT:**: [W3C (Tab-Separated)](#w3c)*(default)*, [TSV](#tsv), [JSON Lines](#json-lines), [JSON Array](#json-array), [JSON](#json).
   - If you need fields with `null` values to be included in JSON format files, select the **INCLUDE NULL VALUES IN JSON** option, as they are excluded by default.
4. Optionally, in the **Data Sampling** section, reduce the volume of delivered logs by applying sampling rules. Refer to the [Data Sampling](#data-sampling) for additional details.
5. Click **Save** to validate the connection to the destination and apply your settings.

### Delivery to Google Cloud Storage{/*google-cloud-storage*/}

**Prerequisites**
- **Create a Google Cloud Project (GCP)** or use an existing project. See Google’s [Google’s guide for instructions](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
- **Set up a GCP bucket** to store your logs. You can create a new bucket or use an existing one. See Google’s [Create Storage Buckets Guide](https://cloud.google.com/storage/docs/creating-buckets) for instructions.
- **Create a Google service account** that will use to access your bucket. See Google’s [Service accounts guide](https://cloud.google.com/iam/docs/service-accounts) for instructions.
- Using Google’s [IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles), guide, **grant the following roles on the bucket**:
  - Storage Object Creator (`storage.objectCreate`)
  - Storage Object Viewer (`storage.objectViewer`)
- **Add the service account** as a member of the bucket you created in step 2.
- **Generate JSON access keys** for the service account. See Google’s [Creating service account keys guide](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) for instructions.

**Configuration**
1. On the LDS Configuration screen, in the **Delivery Destination** section, select **Google Cloud Storage** from the dropdown.
2. In the **CLIENT EMAIL** field, enter the value of the `client_email` field from the JSON key file associated with your Google service account.
3. In the **SECRET KEY** field, enter the value of the `private_key` field from the JSON key file associated with your Google service account.
   - Note: The secret key is sensitive information. After saving the configuration, the key will not be visible. However, you can enter a new key and save the configuration if needed.
4. In the **BUCKET NAME** field, enter the name of the storage bucket you created in your Google Cloud account.
5. Optionally, specify the **PATH** within the bucket where logs will be stored. By default, logs are stored in the root of the bucket.
6. Optionally, in the **Delivery Options** section:
   - Change the **DIRECTORY LAYOUT** to customize how logs are organized within a bucket. For details, refer to [Log Files Naming and Location](#files-naming-and-location).
   - Choose the **DATA COMPRESSION** method for your log files. Supported options include: LZ4 *(default)*, GZIP, LZF, SNAPPY, ZSTD.
   - Select the log **DATA FORMAT:**: [W3C (Tab-Separated)](#w3c)*(default)*, [TSV](#tsv), [JSON Lines](#json-lines), [JSON Array](#json-array), [JSON](#json).
   - If you need fields with `null` values to be included in JSON format files, select the **INCLUDE NULL VALUES IN JSON** option, as they are excluded by default.
7. Optionally, in the **Data Sampling** section, reduce the volume of delivered logs by applying sampling rules. Refer to the [Data Sampling](#data-sampling) for additional details.
8. Click **Save** to validate the connection to the destination and apply your settings.
<Callout type="info">During the validation process, LDS creates a test file in the specified GCP bucket using the provided credentials and settings. The file is named `_edgio_validation/validation_{timestamp}.txt`. The file will only appear if the validation is successful. Since these files are no longer necessary after validation, you can delete them as needed.</Callout>

### Delivery to Hydrolix (Streaming){/*hydrolix*/}

**Prerequisites**
- Create a [Project/Table](https://docs.hydrolix.io/docs/projects-and-tables)
- Create a [Transform](https://docs.hydrolix.io/docs/transforms-and-write-schema)

**Configuration**
1. On the `LDS Configuration` screen, in the **Delivery Destination** section, select **Hydrolix** from the dropdown.
2. Enter the following details:
   - **STREAMING API HOSTNAME**: Enter the hostname of your Hydrolix Streaming API. This value will be used in the URL `https://<hydrolix-streaming-api-hostname>/ingest/event` for log ingestion.
   - **PROJECT NAME**: Enter the Hydrolix project name to include in the `x-hdx-project` HTTP header.
   - **TABLE NAME**: Enter the Hydrolix table name to include in the `x-hdx-table` HTTP header.
   - **TRANSFORM SCHEMA NAME**: (Optional) Specify the Hydrolix transform schema to include in the `x-hdx-transform` HTTP header.
   - **AUTHORIZATION HEADER VALUE**: (Optional) Enter the authorization header value to use when sending logs (e.g., `Basic <Base64 encoded username and password>` or `Bearer <API key>`).
   - **STREAM TOKEN**: (Optional) Provide a streaming token to include in the `x-hdx-token` HTTP header.
3. Optionally, in the **Data Sampling** section, reduce the volume of delivered logs by applying sampling rules. Refer to the [Data Sampling](#data-sampling) for additional details.
4. Click **Save** to validate the connection to the destination and apply your settings.

<Callout type="info">During validation, LDS sends a sample POST request with a JSON payload and GZIP compression to the provided Hydrolix endpoint to verify access. A response with any 2xx status code indicates that the validation is successful.</Callout>


## Data Formats {/*data-formats*/}
Depending on the destination, LDS can send logs data in one of the following formats: **W3C (tab-separated)**, **TSV**, **JSON Lines**,  **JSON Array** or **JSON**. Below are descriptions and sample log lines for each format to help you understand how your data will appear.

#### W3C (Tab-Separated){/*w3c*/}
Includes a W3C header and uses tabs to separate data fields. `null` values are represented by a hyphen (`-`).

Sample log entries:
```
#Version: 1.0
#Date: 2024-09-06 11:42:07
#Software: Log Delivery Service
#Start-Date: 2024-09-05 01:00:00
#End-Date: 2024-09-05 02:00:00
#Fields: date   time    s-host  c-ip    c-country   c-city  sc-bytes    s-ttfb  duration
2024-09-05  01:10:51.706    cds102.jed.llnw.net 10.252.49.10    -   -   259 0   0
2024-09-05  01:12:18.018    cds102.sabf.llnw.net    185.76.48.149   united kingdom  southampton 455 262 262
```
#### TSV{/*tsv*/}
Log data is tab-separated with a header row for field names. null values are represented by hyphens (-).

Sample log entries:
```
date    time    s-host  c-ip    c-country   c-city  sc-bytes    s-ttfb  duration
2024-09-05  01:10:51.706    cds102.jed.llnw.net 10.252.49.10    -   -   259 0   0
2024-09-05  01:12:18.018    cds102.sabf.llnw.net    185.76.48.149   united kingdom  southampton 455 262 262
```
<Callout type="info">Log files delivered to S3, GCP, and Origin Storage include TSV headers, while messages sent to Custom HTTPS Endpoints do not.</Callout>

#### JSON Lines{/*json-lines*/}
Each log entry is a separate JSON object, with each object represented on a single line.

Sample log entries:
```
{"date":"2024-09-05","time":"01:10:51.706","s-host":"cds102.jed.llnw.net","c-ip":"10.252.49.10","sc-bytes":259,"s-ttfb":0,"duration":0}
{"date":"2024-09-05","time":"01:12:18.018","s-host":"cds102.sabf.llnw.net","c-ip":"185.76.48.149","c-country":"united kingdom","c-city":"southampton","sc-bytes":259,"s-ttfb":0,"duration":0}
```

#### JSON Array{/*json-array*/}
JSON array where each object corresponds to a log entry. 

Sample log entries:`
```
[
  {"date":"2024-09-05","time":"01:10:51.706","s-host":"cds102.jed.llnw.net","c-ip":"10.252.49.10","sc-bytes":259,"s-ttfb":0,"duration":0},
  {"date":"2024-09-05","time":"01:12:18.018","s-host":"cds102.sabf.llnw.net","c-ip":"185.76.48.149","c-country":"united kingdom","c-city":"southampton","sc-bytes":259,"s-ttfb":0,"duration":0}
]
```

#### JSON{/*json*/}
A single JSON document that contains top-level metadata fields along with an array of log entries. Each log entry is represented as an individual object within the logs array.
Top-Level Fields:
- `agent_id`: Always an empty string (""). 
- `seq_num`: Always set to 0. 
- `platform`: Always "delivery". 
- `account_number`: The Edgio account number as a string, identifying the account associated with the logs.
- `datestamp`: Indicates the date when the log data was prepared for delivery in YYYYMMDD format
- `logs`: array contains individual log entries. 


`Sample log ebtries`
```
{
    "agent_id": "",
    "seq_num": 0,
    "platform": "adn",
    "account_number": "0001",
    "datestamp": "20180416",
    "logs": [
          {"date":"2024-09-05","time":"01:10:51.706","s-host":"cds102.jed.llnw.net","c-ip":"10.252.49.10","sc-bytes":259,"s-ttfb":0,"duration":0},
          {"date":"2024-09-05","time":"01:12:18.018","s-host":"cds102.sabf.llnw.net","c-ip":"185.76.48.149","c-country":"united kingdom","c-city":"southampton","sc-bytes":259,"s-ttfb":0,"duration":0}
     ]
}
```
<Callout type="info">When using `JSON, JSON Array, and JSON Lines` formats, fields with `null` values are excluded from log lines by default. To include these fields, enable the **INCLUDE NULL VALUES IN JSON** option in the `Delivery Options` section during LDS configuration.</Callout>

### Configuration:

To configure data format:
1. Go to the Delivery Options section on the `Create/Update LDS Configuration` page. 
2. Select the desired format from the `DATA FORMAT` dropdown.


## Log Files Naming and Location{/*files-naming-and-location*/} 

For file delivery destinations, LDS allows you to manage where logs are placed and how they're named.

### Folder Path{/*files-location*/}

The log file location is determined by the following properties:

- **PATH**: This is an optional static root path within the storage which can be specified in the `Delivery Destination` section on the `Create/Edit LDS configuration page` only when `Amazon S3` or `Google Cloud Storage` is selected.

- **DIRECTORY LAYOUT**: Defines the folder structure within the path. It supports these dynamic placeholders that are replaced with relevant information during file upload:
  - `{service_type}`: Type of service for which logs are collected.
  - `{config_uuid}`: UUID of the LDS configuration.
  - `{yyyy}`, `{MM}`, `{dd}`: Resolves to year, month, and day respectively based on the start of the time period of the log entries covered in the file, all in UTC timezone.
  - `{yyyy_proc}`, `{MM_proc}`, `{dd_proc}`: Resolves to year, month, and day respectively using the timestamp that represents the time when the file was prepared by LDS for delivery, all in UTC timezone.

<Callout type="info">It is not possible to combine `{yyyy_proc}`, `{MM_proc}`, `{dd_proc}` with `{yyyy}`, `{MM}`, `{dd}` in the directory layout. Mixing these variables in the directory structure is invalid.</Callout>

To configure the Directory Layout, go to the `Delivery Options` section on the `Create/Update LDS Configuration` screen and pick one of the following:
- `{service_type}/{config_uuid}/{yyyy_proc}/{MM_proc}/{dd_proc}` (default): Organizes directories by service type, configuration UUID, and the date when the file was processed by LDS.
- `{service_type}/{config_uuid}/{yyyy}/{MM}/{dd}`: Organizes directories by service type, configuration UUID, and the date range of the log entries.
- `No Subdirectories`: Places all log files in the root directory of the storage, without any subdirectory structure. This option is available for Amazon S3 and Google Cloud Storage. 

### Log File Naming{/*files-naming*/}

**FILENAME TEMPLATE**: Determines the naming convention for log files uploaded to your destination storage. The default template is:

`{shortname}{request_end_date_time_from}-{request_end_date_time_to}.{process_window_date_time}{split_id}.{format}.{compression}`

Supported dynamic placeholders:
- `{shortname}`: The account name for which the log entries have been collected.
- `{config_uuid}`: UUID of the LDS configuration.
- `{request_end_date_time_from}`: The start timestamp of the time period covered by log entries in the file, formatted as `{year}{month}{day}{hour}{minute}{second}` in UTC.
- `{request_end_date_time_to}`: The end timestamp of the time period covered by log entries in the file, formatted as `{year}{month}{day}{hour}{minute}{second}` in UTC.
- `{process_window_date_time}`: The timestamp when the file was prepared for delivery, formatted as `{year}{month}{day}{hour}{minute}{second}` in UTC.
- `{split_id}`: ID assigned to the file for splitting large log files. Files are split to avoid exceeding the 1GB size limit. The first split file is labeled 000, with subsequent parts numbered sequentially (001, 002, etc.). If no splitting is needed, the split_id is 000.
- `{format}`: Reflects the selected Data Format. Options include `w3c`, `json_lines`, `json_array`,`json` or `tsv`.
- `{compression}`: File compression format.

<Callout type="info">
- The placeholder `{config_uuid}` must be included in either the directory layout or the filename template. This restriction ensures the uniqueness of the file path, preventing conflicts and overwrites when multiple configurations write data to the same bucket.
- The time period covered by log entries in the file is not fixed and may vary based on LDS setup and processing requirements. Currently, LDS supports 10-minute and hourly time periods, with potential for future support of additional time periods.
- Log file size is measured before compression, so a log file may be split even if its compressed size is smaller than 1GB.
- The filename template is fixed and cannot be edited in the UI. It is displayed in the `Delivery Options` section on the `Create/Update LDS Configuration` page. For adjustments, contact your account manager.
</Callout>

## Data Compression{/*data-compression*/} 

LDS supports the following data compression algorithms to reduce log file sizes:

- **GZIP**
- **LZF**
- **LZ4 (Frame Format)**
- **SNAPPY**
- **ZSTD**

### Configuration:

To configure data format:
1. Go to the Delivery Options section on the `Create/Edit LDS configuration page`. 
2. Select the desired format from the `DATA COMPRESSION` dropdown.

## Data Sampling{/*data-sampling*/} 

The `Data Sampling` feature allows you to control the volume of log data delivered by specifying the percentage of log lines to be included for each status code group (e.g., `1xx`, `2xx`, `3xx`). By default, data sampling is set to 100%, meaning all log data is delivered without any filtering.

To configure data sampling:
1. Go to the `Data Sampling` section on the `Create/Update LDS Configuration` screen.
2. Use the slider to select the percentage of log lines you wish to deliver for each status code group. The valid range for sampling rates is `0` to `100`:
   - `0` means all data is filtered out (no logs are delivered).
   - `100` means no filtering is applied (all logs are delivered).
   - Any value between `0` and `100` represents the percentage of log lines that will be included.

## Personally Identifiable Information {/*working-with-personally-identifiable-information*/} 
Edgio’s Log Delivery Service conforms to General Data Protection Regulations (GDPR) requirements. You can configure logs to include the following fields, which contain Personally Identifiable Information (PII):
- `cs-cookie`
- `cs-uri`
- `so-src-uri`

### Sign PII Agreements{/*signing-pii-agreements*/} 

Per GDPR, you must explicitly indicate that you understand the risks associated with the PII fields. When you access Log Delivery Service, you will see a message that describes the risks involved. Click the `Agree` button to indicate you agree.
- Non-Company Admin users can sign agreements only for the company to which they belong.
- Company Admin users can sign agreements for child companies as well.

## Permissions
To access and control LDS configurations, you need the following permissions:
- `Configure > Log Delivery Service > View`: Allows you to view the list of LDS configurations and their details.
- `Configure > Log Delivery Service > Manage`: Grants you full access to view and manage LDS configurations. This includes the ability to create, edit, activate, deactivate, and delete configurations.

## Downloading LDS Files from Origin Storage {/*download-file-from-origin-storage*/} 

You have two options for downloading LDS files from Origin Storage:

### Origin Storage Management Console {/*download-file-from-origin-storage-ui*/} 

1. Open the `Origin Storage Console` under the `Manage` menu.
2. In the bottom-right corner, select your `Account` and `Username` from the dropdowns.
3. Navigate to the folder containing the file.
4. Click the `Download` icon next to the file, and your browser will download it automatically.

### Downloading Files via Origin Storage API {/*download-file-from-origin-storage-api*/} 
This section outlines the methods you need to download files using the Origin Storage JSON-RPC API. While essential information is provided here, for detailed documentation on each method, refer to the [Origin Storage API Reference Guide](/delivery/storage/apis).

#### Prerequisites:
- **API Username and Password**: You need credentials to authenticate your API requests. You can manage these on the `Manage > Origin Storage Users` page.
  <Callout type="info"> It is not possible to view an existing user's password, but you can set a new one if needed. </Callout>
- **URL to the Storage API**: Your Edgio account name is a part of the JSON-RPC API URL. The API URL follows this format: `http://{Account name}-l.upload.llnw.net/jsonrpc2`
  - Example: `http://supercustomer.upload.llnw.net/jsonrpc2`
  - Your Edgio account name is included in the Welcome letter you received when you purchased Origin Storage. If you have any questions or issues, please contact your Edgio representative.
  - If you are a long-standing customer and the preceding endpoints fail to resolve, use the following endpoints with the suffix `-l` after `{Account name}`:
    - Example: `http://supercustomer-l.upload.llnw.net/jsonrpc2`

#### Step 1: Authenticate using the `login` Method{/*step-1--authenticate*/}
First, you need to get an authentication token by calling the `login` method. This token is required for subsequent calls.
**Method Signature**:
```
login(username, password, detail)
```
Parameters:
- `username`: Origin Storage API username.
- `password`: Origin Storage API password.
- `detail`: (optional) A boolean (true/false) indicating whether to return detailed data or a simpler response. Defaults to False.

#### Step 2: List Log Files using the `listFile` Method{/*step-2--list-log-files*/}
Once authenticated, you can list log files from a specific directory by calling the `listFile` method.
**Method Signature**:
```
listFile( token, dir, pageSize, cookie, stat)
```
Parameters:
- `token`: The authentication token obtained from the login method.
- `dir`: A string representing the directory path from which you want to list files.
- `pageSize`: The number of files to return in each response (useful for limiting the size of results).
- `cookie`: A number used for paginating results across multiple listFile calls.
- `stat`: A boolean (true/false) indicating whether to return detailed file information (such as file size, creation time, etc.).

#### Step 3: Obtain a Protected Download URL {/*step-3--obtain-a-protected-download-url*/}

To securely download log files, you can obtain a time-limited download URL by calling the mediaVaultUrl method from the Origin Storage JSON-RPC interface. This URL ensures that your file downloads are protected with an expiration time.
**Method Signature**:
```
mediaVaultUrl(token, path, expiry)
```
Parameters:
- `token`: The authentication token obtained from the login method.
- `path`: The file path for which you want to generate a secure download URL.
- `expiry`: (optional) The number of seconds for which the download URL should remain valid. Must be in the range 1 to 2147483648. If set to 0 or omitted, it defaults to 3600 seconds (1 hour).

Method Response: The method returns an object containing the following:
- `code`: The return code, where 0 indicates success.
- `download_url`: The URL to download the specified file.
- `message`: A description of the return code.
- `preview_url`: The URL to preview the file, if applicable.

Example of response:
```json
{
  "code": 0,
  "download_url": "http://cs-download.limelight.com/<path to file>",
  "message": "success",
  "preview_url": "http://cs-download.limelight.com/<path to file>", 
}
```

#### Step 4: Download the File {/*step-4--download-the-file*/}
Once you receive the download_url, you can make an HTTP GET request to the URL to download the log file

#### Python Script for Downloading Files from Origin Storage {/*python-script-for-downloading-files-from-origin-storage*/}
<Callout type="info">This script is provided as a sample and does not come with official support. Be sure to test it in a development environment before using it in production.</Callout>
``` python
#!/usr/bin/env python
import logging, sys
from multiprocessing import Pool
import requests
import time
import json
 
# Configuration
API_USERNAME = ''
API_PASSWORD = ''
API_URL = 'http://{Account Name}.upload.llnw.net/jsonrpc2'
STORAGE_LOG_DIR = '/_livelogs/http/'
 
MAX_FILES_TO_DOWNLOAD = 5
DELETE_FILE_AFTER_DOWNLOAD = False
DELETE_EMPTY_DIRECTORY = False
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
'''
User-defined variables
'''
pageSize = 10000  # page size for listing log files
files_to_download = []  # log files to download
media_vault_expiry = 60  # expiry time for mediaVaultUrl request
mv_errors = { -1: "Internal error", -2: "Path exists and is a directory", -8: "Invalid path",
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
    if numDirs == 0 and numFiles == 0 and _dirname_.count('/') > 3 and DELETE_EMPTY_DIRECTORY:
        delp = '{"method":"deleteDir","id":1,"jsonrpc":"2.0","params":{"token":"'+ token +'","path":"'+ _dirname_ +'"}}'
        print("\nDeleting Directory : "+ delp)
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
        log_path = _dirname_ + file['name']
        print("\nDownloading file: "+ log_path)
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
            #print(mv_download_url, '\nFilename:'+lds_file_name)
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
                    if DELETE_FILE_AFTER_DOWNLOAD:
                        #Delete the file just downloaded
                        delu = '{"method":"deleteFile","id":1,"jsonrpc":"2.0","params":{"token":"'+ token +'","path":"'+ log_path +'"}}'
                        print("\nDeleting file: "+ log_path)
                        deluRes = requests.post(jsonRPC_Endpoint, data=delu)
                        deluRes = json.loads(deluRes.text)
                        delcode = deluRes['result']
                        if delcode !=0:
                            print("Error attempting to call del url.\nCode: " + str(delcode) + ": " + mv_errors[delcode])
                # Upon non-success write a line to your errors file
                if response.status_code != 200:
                    print("Unable to download " + file['name'] + ". Status code: " + response.status_code)
        if conteggio == MAX_FILES_TO_DOWNLOAD:
            break    # break here
 
 
 
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
                print ('====== Listing Path: '+_dirname_)
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
        #print (login.reason, login.headers)
        resp = json.loads(login.text)
        token = resp['result'][0]
        print ('====== Successfully Logged In.')
        #print ('Token: '+token)
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
        listPath(token, STORAGE_LOG_DIR)
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
    main(API_URL, API_USERNAME,API_PASSWORD)
```

##### Script Configuration {/*script-configuration*/}

- `API_USERNAME`: Your API username.
- `API_PASSWORD`: Your API password.
- `API_URL`: The URL of your Origin Storage API. 
- `STORAGE_LOG_DIR`: The directory path where the script will look for files to download.
- `MAX_FILES_TO_DOWNLOAD`: Limit the number of files to download. Set to 0 for unlimited downloads.
- `DELETE_FILE_AFTER_DOWNLOAD`: Set to True if you want to delete files after downloading.
- `DELETE_EMPTY_DIRECTORY`: Set to True to delete any empty directories after the files are removed.

##### How to Run the Script {/*how-to-run-the-script*/}

1. Install the necessary dependencies if not already installed: `requests, logging, and multiprocessing`.
```
pip install requests
```
2. Configure the script by setting your `API_USERNAME`, `API_PASSWORD`, `API_URL`, and `STORAGE_LOG_DIR` variables.
3. Adjust other optional settings like `MAX_FILES_TO_DOWNLOAD`, `DELETE_FILE_AFTER_DOWNLOAD`, and `DELETE_EMPTY_DIRECTORY` based on your needs.
4. Run the script:
```
python download_files.py
```
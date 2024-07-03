---
title: Storage Best Practices
---
## Accounts and Users  {/*accounts-and-users*/}
### Accounts  {/*accounts*/}
Within the Origin Storage platform, all aspects of customer accounts (e.g. billing, reporting, and directory configuration) are delineated by account shortnames. Many customer organizations choose to use multiple/different shortnames/accounts for the purposes separating data storage, configuration, reporting, and billing.

### Users  {/*users*/}
Within a shortname/account, customers have the ability to create multiple users. Each user can be either granted access to the account primary/root directory or restricted access to any subdirectory(ies) within the root directory. Users will then have the ability to add sub directories as needed that will inherit the permissions their parent directory. When creating users it is recommend you use meaningful (to your organization) names reflecting the purpose or role of the user account.

## Directories and Files  {/*directories-and-files*/}
### Directory and File Organization  {/*directory-and-file-organization*/}
If possible, content should be organized in a balanced fashion as it relates to files and the directories they reside in. For example, any single directory should have less than 10,000 individual files in it to reduce list times and other lookup operations. A high ratio of directories to files can also make it more difficult to manage your content. For example, a single file located in a directory path that is 10 directories or more deep (i.e. /a/b/c/d/e/f/g/h/i/j/1/2/3/file.jpg). A common practice is to break the file naming convention into 3-5 sections and create a directory hierarchy based on those segments. Example: /abc/def/ghi/123/abcdefghi-123.jpg.

### Deleting and Renaming Files  {/*deleting-and-renaming-files*/}
Although Edgio provides APIs for deleting and renaming a directory, you can do so only if the directory contains no files or sub-directories. This is because the required background processes, such as re-applying policies and pushing maps out to Bricks, could potentially have a significant impact on the Origin Storage platform, causing latency in other operations.

If you are having trouble deleting or managing content with the existing supported management tools or via the API, please contact your account manager who will engage the Edgio Advanced Services team to work with you to achieve the desired results (additional charges may apply).

## Security  {/*security*/}
Taking proper security measures will ensure the integrity and safety of your Origin Storage data.

### Managing Your Accounts  {/*managing-your-accounts*/}
When users and/or applications no longer require access to the Origin Storage account, access for the individual users/applications should be revoked. You can do so by logging into the Control customer portal with the primary account credentials and resetting the password for a given user.

### Securing Your User Credentials  {/*securing-your-user-credentials*/}
Properly securing your user credentials is a basic component of establishing and maintaining security while using the Origin Storage platform. This can be done in a variety of ways, depending on your environment. The simplest approach is to ensure the permissions on configuration files that contain passwords will prevent unwanted access. Where possible, you should use secure protocols (i.e. HTTPS, SSL, SSH, etc.) when accessing the Origin Storage platform and anywhere credentials are required.

### Managing Your API Token  {/*managing-your-api-token*/}
Critical to the security of the Origin Storage API is the API token and the account credentials noted above. Tokens are created when you call the API login function (or the account/login end point in HTTP), which generates an alphanumeric token string that must be used with all subsequent API calls to authenticate your application with the system and permit the requested transaction. The Origin Storage API relies on the presence and validity of these tokens when verifying the authenticity of transaction requests. By default, tokens are automatically removed after a predetermined amount of time, usually an hour. However, the best practice when doing a single transaction or group of transactions is to complete the process by calling the API logout function, which will remove the token and make it no longer valid on subsequent transaction attempts.

To guard against attempts to sniff out your tokens, ideally make your API requests via HTTPS, rather than HTTP.

<Callout type="info">All you need to do to use HTTPS is to make your API call with the https:// protocol, instead of http://. (The "s" stands for "secure," and instructs the application to encrypt the transaction, including your token.)</Callout>

## Migration  {/*migration*/}
When migrating content from other storage platforms or origin servers, please ensure that the HTTP methods in any related applications that you developed to access content are allowed by Origin Storage. An important fact to note is that you must use the GET method to egress content.

See [Allowed HTTP Methods](#allowed-http-methods) for additional information.

## Network  {/*network*/}
### Load Distribution  {/*load-distribution*/}
The Origin Storage platform uses a Global DNS load balancing solution to direct customers to the best performing, and geographically closest ingest location. Edgio Support will provide an ingest or upload name that is pre-configured for your account. This name is configured to dynamically ingest using the best resources available. When writing code to interface with the API or using the POSIX Adapter:

- Use a local or a network-near DNS resolver - Ensure your resolver respects DNS TTLs and shuffles appropriately.
- Do not cache DNS responses in your application for any longer than the DNS TTL.
- Reuse connections to perform multiple operations, preferably performing operations in bulk.
Limit the duration of long-lived connections by parallelizing your workload to leverage the ingest resources we provide.

### Network Performance and Optimization  {/*network-performance*/}
One of the most beneficial things you can do when uploading content is to verify that your operating system supports, and is configured for, window scaling as well as the most optimal congestion control algorithm. All newer operating systems should have window scaling enabled/set by default, but older operating systems such as the following Windows operating systems do not:

- Windows 95
- Windows 98
- Windows 98 Second Edition
- Windows ME
- Windows 2000
- Windows XP

Support for window scaling was added to the following operating systems as follows:

- Linux Kernel: 2.6.8+
- FreeBSD: 4.4+
- Windows: Win2K (Default off)

If you are running one of the Windows operating systems above, a tool to help you setup the optimal configuration is located here: http://www.dslreports.com/faq/578.

All newer versions of Linux and FreeBSD have TCP auto-tuning enabled that will allow the TCP windows to grow to varying size, depending on the amount of memory in your system. These default values are normally set to provide very good throughput, but the values can be adjusted to suite your specific needs. If you have a library of large-sized files (1GB+), we recommend gradually increasing your maximum window size until you are no longer seeing gains in transfer speed. If you are transferring a lot of small files, then the TCP window will not have a chance to scale to its full potential before the transfer is finished. In this case, you should stick with the auto-tuning defaults, or keep the window size smaller to decrease memory usage.

Finally, check your congestion control algorithm. There have been some great additions in recent years that have increased TCP transfer speed significantly. We suggest using Cubic for all FreeBSD 8.2+ and all Linux 2.6.19+ Kernels.

## Ingest and Egress  {/*ingest-and-egress*/}
### Ingest/Upload  {/*ingest-upload*/}
Whenever possible it is recommended that customers use the Origin Storage Application Programming Interface (API) due to its feature-rich ingest workflow and its superior performance.

#### FTP Ingest/Upload  {/*ftp-ingest*/}
In order to maximize efficiency when uploading content via ftp:

- Do not open persistent connections to send files one at a time over random intervals.
- If batches are very large (e.g. hundreds or thousands of files), consider opening multiple ftp connections and breaking up the batches
    - When opening multiple connections, be sure to make a new DNS lookup for each connection.

#### Path and File Name Limitations  {/*limitations*/}
Origin Storage path segment names and file names can contain a maximum of 4096 bytes. The maximum path length (path + file name) is 4096 bytes.

For request headers that support UTF-8 encoding, Unicode characters are encoded using byte sequences of different lengths:

- Basic Latin letters, digits, and punctuation signs use one byte.
- Most European and middle east script letters fit into a 2-byte sequence: extended Latin letters (with tilde, macron, acute, grave and other accents), Cyrillic, Greek, Armenian, Hebrew, Arabic, Syriac, and others.
- Korean, Chinese, and Japanese ideographs use 3-byte or 4-byte sequences.
UTF-8 path segments are URL-encoded ascii representations of the unicode characters.

For example, the Chinese character `今` is three bytes: `\xe4\xbb\x8a`

When URL-encoded , the character is: `%E4%BB%8A` three bytes each for a total of 9 bytes, so this single character would actually take up 9 bytes of the 4096 byte limit. See Byte Calculation for additional details.

**Byte Calculation**

Because UTF-8 is supported, it is wise to first ensure that a path segment or file name does not exceed the limitation before creating.

Using Chinese characters (3 bytes per character) as an example, here is how to determine the number of bytes in a file name in Python:

```Python
>>> # File name with 3 characters before the file extension.
>>> filename = "今日は.txt"
>>> utf8_chars = "今日は"
>>> ascii_chars = ".txt"
>>> ascii_chars
'.txt'
>>> len(utf8_chars)
9
>>> len(ascii_chars)
4
>>> ( len(utf8_chars) * 3 ) + len(ascii_chars)
31
```
#### FTP Client Recommendations  {/*ftp-client-recommendations*/}
When selecting an FTP client, NcFTP is the preferred client and the use of Filezilla is discouraged.

Depending on your usage model and firewall, you may be able to utilize Filezilla but the application has behaviors that cannot be disabled and can cause performance and compatibility issues:

- Duplicate write operations over multiple connections, typically caused by inadvertent workflow in the Filezilla GUI.
- Calling LIST after most operations (upload, rename, delete, etc), which can be problematic with directories containing a large number of files.

#### Handling Ingest Errors  {/*handling-ingest-errors*/}
##### General  {/*general*/}
Failed connection attempts should be handled with an exponential backoff and should subsequently perform a new DNS query against the ingest name on each new connection.

##### API Error Codes  {/*api-error-codes*/}
Any code you write to call the Origin Storage API should be written to expect error codes. All API calls use non-zero error codes and since errors can happen for a variety of reasons, we recommend that you look closely at the error codes along with their reasons, handling them appropriately in your code.

##### POSIX Adapter Error Codes  {/*posix-adapter-error-codes*/}
Similar recommendations apply to using the POSIX layer and legacy ingest protocols (e.g. SFTP, Rsync over SSH, and so on). Clients and code should be written to expect and handle POSIX errors.

#### Observe Upload Limits  {/*observe-upload-limits*/}
In order to provide even access of resources to all customers, we require that you limit your file uploads to 100 requests per second. When this threshold is exceeded, you will receive a 429 (too many requests) error. If you have a large library to upload, contact your Account Manager for special consideration.

### Egress/Download  {/*egress-download*/}
The Origin Storage platform is designed to have its data accessed by means of the hypertext transfer protocol (HTTP).

<Callout type="info">Do not attempt to directly download content from Origin Storage using FTP, SFTP, FTPS, SCP, or rsync because doing so can negatively impact other system processes. To download content, use an HTTP GET request.</Callout>

#### File / Object Availability  {/*file-object-availabiity*/}
By default, the Origin Storage platform does not set any special headers, including cache-control. When cache-control headers are not present we allow the CDN's natural algorithm control to manage content lifetime. If there are special cases where you need an explicit header or TTL for managing content, it must be requested via your account management team.

As the Origin Storage platform is a distributed object storage platform, egress/download is determined by the nearest location to the content from the requesting client's server(s). In cases of exceptionally large files, it can take time to replicate this file to all necessary locations. If a request is being made immediately after the file is uploaded, the file will be immediately available upon the write close but the delivery performance of the requested content will continue to improve as is replicated to all relevant locations designated in the assigned replication policy.

Because of the logical separation between ingest and egress in Origin Storage, it is not recommended that customers perform verification using the ingest protocol (i.e. API or POSIX Adapter).

If you are implementing an automated workflow, Edgio highly recommends simplifying your workflow to limit the number of subsequent operations on the same object (e.g. renames, moves, or deletes).

### Allowed HTTP Methods  {/*allowed-http-methods*/}
Origin Storage supports the following HTTP methods:

- GET
- POST
- HEAD
- OPTIONS

**Downloading Content**
<br />When downloading content from Origin Storage you must use the GET method. See Egress/Download for additional information.

**Uploading Content**
<br />When uploading content via HTTP (available only via the API), you must use the POST method. See the Origin Storage API Guide for additional information.

**Querying Content**
<br />Origin Storage allows you to submit HEAD and OPTIONS requests against content.

### UTF-8 Support  {/*utf8-support*/}
UTF-8 characters in file names are supported in:

- The /multipart/create and /post/raw requests in the Origin Storage API
- Ingest protocols

However, after such objects are uploaded, you cannot later access them using the UTF-8 characters.

Also, cannot you upload such files using the Origin Storage Customer Portal.

**Accessing Files with UTF-8 Characters in File Name**
<br />If you have uploaded a file with UTF-8 characters in the file name and you later try to access the content with an HTTP GET request, you can’t use the UTF-8 characters in your download request. Instead, you need to use URL-encoded characters. For example, assume you uploaded a file called `日本語.txt` In order to download the file, you cannot use the UTF-8 characters and instead you must use `%E6%97%A5%E6%9C%AC%E8%AA%9E%2Etxt`

(Keep this limitation in mind as you upload such files.)

**Origin Storage Customer Portal Restrictions on UTF-8 Characters in File Names**
<br />The Origin Storage Customer Portal does not currently support file names with UTF-8 characters. (Note that Edgio considers this a priority issue and plans to support the capability in future releases.)

For example, if you try to upload a file called “日本語.txt” the Origin Storage Customer Portal displays a message stating that the file name contains characters that are not supported.

Remember to use the Origin Storage API or the standard ingest protocols to upload files with UTF-8 characters in the file name.

### Tracking Your Origin Storage Usage  {/*tracking*/}
The Control customer portal contains an Origin Storage usage report that makes it easy to track your Origin Storage usage. It also includes a billing report that you can use to verify the bill that you receive from Edgio. Data is available in near real-time.

Edgio direct customers can view reports in granularity by day, week, month, and billing period. Historical data is also available.

Resellers, who extend Origin Storage to their customers, can view the same reports to monitor usage and verify bills from Edgio. Reports are available at an aggregate level (across all their customers), as well as at individual customer or account level for their customers if separate account names are used for each of their customers.

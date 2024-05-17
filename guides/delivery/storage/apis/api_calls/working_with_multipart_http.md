---
title: Working with Multipart Uploads in the HTTP Interface
---
The HTTP interface lets you create a multipart upload, add pieces to it, and complete the upload as explained in the following sections:

-   [Begin a Multipart Upload](#begin-multipart-upload)
-   [Create a Multipart Piece](#create-multipart-piece)
-   [Complete a Multipart Upload](#complete-multipart-upload)

For general information about multipart uploads, see [Uploading Files — Multipart](Uploading Files Multipart Container.htm).

As you read information in the following sections, keep in mind the caveats mentioned in [Uploading Files — Non-Multipart](/delivery/storage/apis/api_calls/uploading_files_multipart).


## Begin a Multipart Upload {/*begin-multipart-upload*/}

```
POST to /multipart/create
```

Initiates a multipart upload and returns an upload ID. The ID associates all parts in the upload and must be used each time you create a piece for the upload. You also include the ID in the final request to complete or abort the multipart upload request.

The final destination file will not be created until you have added pieces to, and completed, the upload.

An error will be returned if any parent directories does not exist. To create parent paths, you can use either:

- the makeDir2 API in the JSON RPC interface (see [Create a Directory Recursively](/delivery/storage/apis/api_calls/working_with_directories_json/#leading-paths)) or
- the post/directory API in the HTTP interface (see [Create a Directory](/delivery/storage/apis/api_calls/working_with_directories_http))

### Request Headers  {/*request-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Authorization | str | Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.    |
| X-Agile-Basename | str |  Optional<br /><br />Name of file as it will be stored in Origin Storage, minus the path. Forward slashes / are not allowed.<br /><br />If you don't provide a value for X-Agile-Basename, the API will create a file name in the form of mpart-<UUID4 in hex notation>. Example:<br /> mpart-ddbb5628fdd3433181ba9771f5709190<br /><br />(UUID4 is a random Universally Unique ID.)   |
| X-Agile-Content-Type | str |  Optional<br /><br />Specifies content type of the file to upload.<br /><br />Allows content type to be overridden or detected. If this header is not present or the content type given is invalid, the content type will be derived automatically from the destination file extension. If a suitable MIME type is not detected from the MIME attachment, the MIME type will be used from the file name's extension.<br /><br />Must be a valid Origin Storage MIME type. See [Content Types](/delivery/storage/apis/reference_materials/content_types)   |
| X-Agile-Directory | str | Optional<br /><br />Directory on where the multipart upload is to be created.<br /><br />Defaults to root directory / |
| X-Agile-MTime | str | Optional<br /><br />File last modification time in seconds since epoch.<br /><br />Defaults to zero (current time)    |
| X-Agile-Encoding | str |  Optional<br /><br />The default behavior is to treat paths as US ASCII.<br /><br />If the values for X-Agile-Basename and X-Agile-Directory contain UTF-8 characters, then include this header and set its value to UTF8, which will cause the API to treat values as URI quote paths. Note:<br />- You must quote paths according to URL parameter quoting defined in RFC3986 of the Internet Engineering Task Force.<br />- Characters %20 and + turn into spaces.<br />- Special characters you must handle are: percent sign, dollar sign, ampersand, plus sign, comma, forward slash, colon, semi colon, equal sign, question mark and the @ symbol.<br /><br />See [Using UTF-8 Characters in Request Headers](/delivery/storage/apis/using_utf8).   |

### HTTP Response Codes and Request Status Codes{/*http-codes*/}
On success the call returns an HTTP 200 status code and 0 in the `X-Agile-Status` header.

On error, the HTTP Status Code is an error code, and the error is reflected in the `X-Agile-Status` header.

The following table provides details about response values.

|  HTTP Status Code   | Description | X-Agile-Status Header Values |
| --- | --- | --- |
| 200 | Success | 0   |
| 400 | Bad request; missing or invalid parameters | **\-1**: The multipart upload would have exceeded the maximum number of mulitpart uploads (1,000,000) that have not been completed or aborted.<br /><br />**\-16**: invalid path (path too long). See [Path Segment and File Name Limitations](/delivery/storage/apis/reference_materials/path_segment_and_file_name_limitations).<br /><br />**\-20**: invalid last modified time<br /><br />**\-21**: invalid content type<br /><br />**\-23**: parent path does not exist or is invalid. One or more parent segments in the `X-Agile-Directory` header do not exist.<br /><br />**\-51**: invalid encoding type. See also [Using UTF-8 Characters in Request Headers](/delivery/storage/apis/using_utf8). |
| 401 | Unauthorized; missing X-Agile-Authorization header | \-10001 |
| 403 | Forbidden; access denied or invalid value in the `X-Agile-Authorization` header | \-10001 |
| 500 | Internal server error | \-27 |
| 503 | Service unavailable or temporarily down | \-26 |

### Response Headers {/*response-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Status | int | Contains response codes. (See [HTTP Response Codes and Request Status Codes](#HTTP).) |
| X-Agile-Meta | str | Contains the following fields, which show the content type and mtime of the multipart upload:<br /><br />`content_type=<type> mtime=<time>`<br /><br />The fields echo the values you passed in the `X-Agile-Content-Type` and `X-Agile-MTime` headers. If you did not pass values, then the content\_type field is set to None and mtime is 0.<br /><br />An mtime of 0 means the multipart upload will have an mtime equal to the time when the upload was created. |
| X-Agile-Multipart | str | Multipart identifier to use in future requests.<br /><br />The returned identifier can only be managed by the user who created it. Users cannot share identifiers. |
| X-Agile-Path | str | Absolute destination path where the multipart upload will be created when it is completed. |

### curl Sample Request  {/*curl-request*/}
Create a multipart upload. The final file name will be multipart1.txt in the /multipart directory.

```
curl -v -k \
-H "X-Agile-Authorization: 41dc1633-60ff-4479-9499-f1d30c9df00c"\
-H "X-Agile-Basename: multipart1.txt"\
-H "X-Agile-Directory: /multipart"\
http://{Account name}.upload.llnw.net/multipart/create
```

### Sample Success Response  {/*sample-request-response*/}
```
HTTP/1.1 200 OK
Date: Wed, 22 Jul 2015 16:22:54 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Meta: content_type=None mtime=0
X-Agile-Multipart: 5d50c59de3e645ac8df0f209290c1c29
X-Agile-Path: /{Account name}/multipart/multipart1.txt
Content-Type: text/json;charset=utf-8
```

## Create a Multipart Piece {/*create-multipart-piece*/}
```
POST to /multipart/piece
```

Adds a piece identified by a piece (part) number (X-Agile-Part) to a multipart upload via a raw HTTP POST upload. The POST body should be raw data that will be written to the piece. You can add pieces in any order as long as there are not gaps in piece numbers when you complete the multpart upload. So for example if you add pieces with numbers 1 and 3 but omit piece number 2 and then you attempt to complete the multipart upload, it fails to complete.

There is a limit to the number of pieces you can add, the size of any piece, and the total size of the upload.

### Request Headers  {/*create-request-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Authorization | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| X-Agile-Multipart | str |  Multipart upload identifier from a prior call to createMultipart or /multipart/create. See Begin a Multipart Upload (JSON-RPC) and [Begin a Multipart Upload (JSON-RPC) Upload](#begin-multipart-upload) and [Begin a Multipart Upload (HTTP)](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload), respectively.     |
| X-Agile-Part | str | Number to assign to the piece. Piece numbers must start with 1 and increase by 1 with each piece added. Must be unique. The range of part numbers must be contiguous. Adding a piece with a duplicate part number replaces the existing piece. |

### HTTP Response Codes and Request Status Codes  {/*create-http-codes*/}
On success the call returns an HTTP 200 status code and 0 in the `X-Agile-Status` header.

On error, the HTTP Status Code is an error code, and the error is reflected in the `X-Agile-Status` header.

The following table provides details about response values.

| HTTP Status Code    | Description | X-Agile-Status Values |
| --- | --- | --- |
| 200 | Success | 0   |
| 400 | Bad request; missing or invalid parameters | **\-2**: invalid multipart ID in X-Agile-Multipart<br /><br />**\-3**: invalid piece number in X-Agile-Part<br /><br />**\-6**: invalid checksum<br /><br />**\-7**: invalid URL<br /><br />**\-8**: You attempted to add a piece to a multipart upload that has been completed, deleted, or expired.<br /><br />**\-10**: You attempted to add a piece that would have exceeded the maximum number of pieces (1,000) that can be added to a multipart upload.<br /><br />**\-11**: You attempted to add a piece that is larger than the maximum allowable size (100 GB).<br /><br />**\-17**: multipart upload (or piece) has been aborted. You tried adding a piece to a multipart upload that has been aborted.<br /><br />**\-24**: Multipart upload format is invalid (bad content type)<br /><br />**\-25**: You attempted to add a piece that would have caused the size of the multipart upload to exceed its maximum size (20 TB). |
| 403 | Invalid authentication credentials (invalid token) | **\-10001**: Invalid token |
| 500 | Internal server error | **\-49**: Size of file on does not match the Content-Length header value that your client sent. |
| 503 | Service unavailable | **\-22**: disk full<br /><br />**\-26**: server unavailable |

### Response Headers  {/*create-response-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Status | int | Contains response codes. (See [HTTP Response Codes and Request Status Codes](#create-http-codes).) |
| X-Agile-Checksum | str | Piece’s SHA-256 hexadecimal digest |
| X-Agile-Size | int | Piece's size in byes |

### curl Sample Request  {/*create-curl-sample-request*/}
Submit a file called piece1.txt.

```
curl -v -k \
-H "X-Agile-Authorization: 87970a2e-2141-455f-8381-e240fc581858"\
-H "X-Agile-Multipart: a754afa6123649bf9382ca11289283ba"\
-H "X-Agile-Part: 1"\
--data-binary @/piece1.txt\
http://{Account name}.upload.llnw.net/multipart/piece
```
### Sample Success Response  {/*create-sample-request-response*/}
```
HTTP/1.1 200 OK
Date: Thu, 16 Jul 2015 22:19:28 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Checksum: 6fed09a7dd6283ac8f733c0ecfc5a2dad31e6a01e920ab19cd865558d4a5a
X-Agile-Size: 23
Content-Type: text/json;charset=utf-8
```


## Complete a Multipart Upload  {/*complete-multipart-upload*/}
```
POST to /multipart/complete
```
Completes a multipart upload, concatenating the individual pieces into the final file defined by the X-Agile-Basename request header in the creation step. (See [Begin a Multipart Upload](#begin-a-multipart-upload).). Note that neither the final file or individual pieces are visible as files until you complete the multipart upload. You can, however, get information about a multipart upload and its pieces using the `listMultipart` and `listMultipartPiece` calls. (See [List Your Multipart Uploads](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-multipart) and [List Pieces in a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-pieces) respectively.)

When the file creation is complete, the system sets the parent directory's mtime (last modification time) to the current system time.

You can't complete a multipart upload that has no pieces, you can only abort it (See [Abort a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#abort).) You can't complete a multipart upload that has already been completed or aborted.

### HTTP Response Codes and Request Status Codes  {/*complete-http-codes*/}
On success the call returns an HTTP 200 status code and 0 in the `X-Agile-Status` header.

On error, the HTTP Status Code is an error code, and the error is reflected in the `X-Agile-Status` header.

The following table provides details about response values.

|   HTTP Status Code  | Description | <response code header name> / JSON Object Values |
| --- | --- | --- |
| 200 | Success | 0   |
| 400 | Bad request; missing or invalid parameters | **\-2**: You passed an invalid ID in the `X-Agile-Multipart` header.<br /><br />**\-4**: You attempted to complete a multipart upload that has no pieces.<br /><br />**\-5**: You attempted to complete a multipart upload with missing pieces. (The range of piece numbers in the multipart upload is not contiguous.)<br /><br />**\-8**: You attempted to complete a multipart upload that has already been completed.<br /><br />**\-17**: You attempted to complete a multipart upload that has been aborted. |
| 500 | Internal server error | **\-13**: The lock on the multipart upload expired before the upload could be completed. |
| 503 | Service unavailable | \-**26**: service down or unavailable (try again later). |

### Response Headers  {/*complete-response-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Status | int | Contains response codes. (See [HTTP Response Codes and Request Status Codes](#complete-http-codes).) |
| X-Agile-Parts | str | Total number of pieces completed |
| X-Agile-Multipart | str | Multipart upload ID |

### curl Sample Request  {/*complete-curl-sample-request*/}
Complete a multipart upload.

```
curl -v -k \
-H "X-Agile-Authorization: 668f7342-5553-4b57-9cea-edb0b8589ae"\
-H "X-Agile-Multipart: 8dfe3fdbbef64dfc8f290da4fd8aef00"\
http://{Account name}.upload.llnw.net/multipart/complete
```
### Sample Success Response  {/*complete-sample-request-response*/}
```
HTTP/1.1 200 OK
Date: Tue, 11 Aug 2015 19:23:36 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Parts: 1000
X-Agile-Multipart: 8dfe3fdbbef64dfc8f290da4fd8aef00
Content-Type: text/json;charset=utf-8
```

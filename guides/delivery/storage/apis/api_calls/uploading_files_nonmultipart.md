---
title: Uploading Files — Non-Multipart
---
APIs for non-multipart file uploads are available in the HTTP interface only.

Origin Storage provides two techniques for non-multipart upload. Use the following table to decide which technique is best for you.

| Technique | Description | End Point | Where to Find Information |
| --- | --- | --- | --- |
| Web Browser Upload | Does an HTTP POST upload using multipart form-data. Use this if you want the ability to upload a file from a web page.<br /><br />This technique is relatively slow because the checksum is calculated after the file is at rest. (The API has to open and read the file to calculate the checksum.)<br /><br />A basic working sample page that illustrates the web browser upload capability is available. | /post/file | [Web Browser Upload](#web-browser-upload) |
| File Raw Post | Uploads a file as a stream. The only payload is the file data.<br /><br />Faster than Web Browser Upload because the file's checksum is calculated inline. Also no overhead from form mime encoding . | /post/raw | [File Raw Post](#file-raw-post) |

<Callout type="info">For files larger than 10GB, use the multipart upload functionality. See [Uploading Files — Multipart](/delivery/storage/apis/api_calls/uploading_files_multipart) for information.</Callout>

## Web Browser Upload  {/*web-browser-upload*/}

```
POST to /post/file
```

Does an HTTP POST upload using multipart form-data. Slower than [File Raw Post](#file-raw-post).

When the file creation is complete, the system sets the parent directory's mtime (last modification time) to the current system time.

<Callout type="info">An end-to-end /post/file upload example is available. See [`/post/file` Example](/delivery/storage/apis/reference_materials/file_upload_examples/#post-file).</Callout>

### Request Headers {/*request-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Authorization | str | Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively. As an alternative, you can instead pass the token as a query string on the URL. See [curl Sample Request 2](#curl-request2). |
| X-Agile-Content-Type | str | Optional<br /><br />Lets the API look up or detect content type for the file to upload. If this header is not present or the content type provided in it is invalid, the content type will be derived from the Content-Type field of the MIME-encoded attachment. If a suitable mime type is not detected from the mime attachment, the mime type will be derived from the file name's extension.<br /><br />Must be a valid Origin Storage MIME type (see [Content Types](/delivery/storage/apis/reference_materials/content_types)).See also [Content Type Handling](#content-type-handling). |
| X-Agile-Content-Detect | str | Optional<br /><br />Instructs the API to detect the content type. The API will ignore this header if you use the X-Agile-Content-Type header.<br /><br />Pass one of:<br />- name: lookup MIME type by using the filename, usually the extension<br />- content: lookup MIME type by scanning the contents of the file<br />- auto: first lookup by name, then by content if no name matchesSee also [Content Type Handling](#content-type-handling). |
| X-Agile-Checksum | str |   Optional<br /><br />The hexlified version of the bytes that make up the file's sha256 checksum. Origin Storage will calculate the file's checksum and compare it with the value of `X-Agile-Checksum`. (When a file first arrives at a landing pad, it is placed in a temporary area called a 'scratch space'. It is at this point that the checksum comparison occurs.)<br /><br />If `X-Agile-Checksum` is provided and it matches the calculated checksum, the file will be stored and replicated.<br /><br />If `X-Agile-Checksum` is provided and it does not match the calculated checksum, the file will not be ingested. Instead, error code -26 (invalid checksum) will be returned and the file will be removed from landing pad's scratch space and will not be ingested.  |
| X-Agile-Recursive | str | Optional<br /><br />When uploading a file to the location specified by the directory form field, this header instructs the API to create any leading directories if they do not already exist.<br /><br />If you set the value to `true`, non-existing leading directories will be created.<br /><br />If you omit the `X-Agile-Recursive` header or set it to false, then non-existing leading directories will not be created.<br /><br />If you use both this header and the recursive form field and the two are different, the `X-Agile-Recursive` header will take precedence.<br /><br />Defaults to `false`. |

### Form Fields  {/*form-fields*/}
| Field Name | Type | Description |
| --- | --- | --- |
| uploadFile | str | Path and name of file to upload. See also [About the uploadFile Form Field](#uploadfile). |
| basename | str | Optional<br /><br />Name of file as it will be stored in Origin Storage, minus the path. Forward slashes / are not allowed.<br /><br />See also [How Uploaded File Paths Are Determined](#path-determination) |
| directory | str | Optional<br /><br />Directory in Origin Storage where the file will be stored<br /><br />Defaults to the root directory<br /><br />See also [How Uploaded File Paths Are Determined](#path-determination). |
| recursive | str | Optional<br /><br />When uploading a file to the location specified by the directory form field, this field instructs the API to create any leading directories if they do not already exist.<br /><br />If you set the value to `true`, non-existing leading directories will be created.<br /><br />If you omit the field or set it to `false`, then non-existing leading directories will not be created.<br /><br />If you use both this field and `X-Agile-Recursive` header and the two are different, the `X-Agile-Recursive` header will take precedence.<br /><br />Defaults to `false`. |
| return\_url | str | Optional<br /><br />Provides the ability to set a “custom” url to redirect to. If you include this field you don’t have to include the return\_referer field. |
| return\_referer | int | Optional<br /><br />Provides ability to redirect to the location in the Referer1 header (if it is present). In this case, Origin Storage sends a 302 redirect to the `Referer` header location.<br /><br />If you want to redirect to a custom location, omit the `return_referer` field and include the custom location in the `return_url` field.<br /><br />The Referer header is sent by web browsers automatically and identifies the address of the webpage that linked to the resource being requested. |
| expose\_egress | str | Optional<br /><br />How to expose egress. Valid values:<br /><br />**PARTIAL**: expose egress immediately (partially uploaded content can be served).<br /><br />**COMPLETE**: (default) expose egress when the file completes uploading.<br /><br />**POLICY**: expose when the file is in policy.<br /><br />Defaults to **COMPLETE** |
| mtime | int | Optional<br /><br />File modification time in seconds since epoch.<br /><br />Defaults to 0 — current timestamp. |

### How Uploaded File Paths Are Determined  {/*path-determination*/}
The complete path of the uploaded object will be the `directory field value + / + basename` field value. If the basename value has any forward slashes in it, the last path component will be used and the leading paths will be stripped. For instance, if you pass /test for directory and `/1983/img001.jpg` for basename, the final path will be `/test/img001.jpg` (the 1983 is stripped).

### About the uploadFile Form Field  {/*uploadfile*/}
`uploadFile` is a multipart/form-data encoded payload as in this example:

```
------------------------------44f9af2ecd0c
Content-Disposition: form-data; name="uploadFile"; filename="test.txt"
Content-Type: text/plain

Sample data
------------------------------44f9af2ecd0c--
```

### HTTP Response Codes and Request Status Codes  {/*codes*/}
On success the call returns an HTTP 200 status code, and 0 in the `X-Agile-Status` header.

On error, the HTTP Status Code is an error code, and the error is reflected in the `X-Agile-Status` header. The following table provides details about response values.

|  HTTP Status Code   | Description | Possible X-Agile-Status Values |
| --- | --- | --- |
| 200 | Success | **0**: success |
| 400 | Bad request, missing or invalid parameters | **\-3**: no parent directory. One or more path segments in the directory form field do not exist and you did not provide a value for the recursive form field or the `X-Agile-Recursive` request header.<br /><br />**\-8**: invalid path (path too long) in the directory form field<br /><br />**\-21**: invalid value in the expose\_egress form field<br /><br />**\-23**: empty file<br /><br />**\-24**: missing upload file in HTTP POST (You did not supply a file to upload.)<br /><br />**\-25**: upload not supported; you attempted to upload more than one file.<br /><br />**\-26**: invalid checksum<br /><br />**\-27**: invalid value in the mtime form field<br /><br />**\-33**: invalid value in the X-Content-Type header<br /><br />**\-48**: invalid value in the X-Content-Detect header |
| 401 | unauthorized, missing X-Agile-Authorization header | \-10001: missing X-Agile-Authorization header |
| 403 | Invalid authentication credentials (invalid token) | **\-10001**: Invalid token |
| 500 | Internal server error | **\-5**: Generic error |
| 503 | Service unavailable | **\-22**: disk full |


### Response Headers  {/*response-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Status | int | Contains response codes. (See [HTTP Response Codes and Request Status Codes](#codes).) |
| X-Agile-Path | str | File name and path where the file was uploaded |
| X-Agile-Size | int | Size in bytes of the file that this call uploaded |
| X-Agile-Checksum | str | File’s SHA-256 hexadecimal digest |

### curl Sample Request 1  {/*curl-request1*/}
Upload super test file.txt into the root directory. Also pass a basename.

```
curl -v -k\
-H "X-Agile-Authorization: 4f173c74-c929-4f91-9e0e-645a31343258"\
-F "uploadFile=@/super test file.txt"\
-F "basename=super test file.txt"\
-F "directory=/"\
http://{Account name}.upload.llnw.net/post/file
```

### Sample 1 Success Response  {/*response1*/}
```
HTTP/1.1 200 OK
Date: Fri, 19 Jun 2015 20:45:01 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Checksum: d995a1c6b9ba371c2273f209d6659253bf457b3fa047ce6c959ca99
X-Agile-Size: 10
X-Agile-Path: /{Account Name}/super test file.txt
Content-Type: text/json;charset=utf-8
```

### curl Sample Request 2  {/*curl-request2*/}
Send the token on the url in a query string. Also pass a basename.
```
curl -v -k\
-F "uploadFile=@/super file2.txt"\
-F "basename=super file2.txt"\
-F "directory=/"\
http://{Account name}.upload.llnw.net/post/file?token=4f174-c929-4f91-9e0e-645a31
```

### Sample 2 Success Response  {/*response2*/}
```
HTTP/1.1 200 OK
Date: Wed, 05 Aug 2015 15:43:55 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Checksum: d995a1c6b9ba371c2273f6659253bf457b3fa047ce62dd8274ac959ca99
X-Agile-Size: 10
X-Agile-Path: /{Account name}/super file2.txt
Content-Type: text/json;charset=utf-8
```

## File Raw Post  {/*file-raw-post*/}
```
POST to post/raw

```

Uploads a file as a stream.

Upload speed is faster than [Web Browser Upload](#web-browser-upload).

When the file creation is complete, the system sets the parent directory's mtime (last modification time) to the current system time.

<Callout type="info">An end-to-end /post/raw upload example is available. [See `/post/raw` Example](/delivery/storage/apis/reference_materials/#post-raw).</Callout>

### Request Headers {/*frp-request-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Authorization | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| X-Agile-Basename | str | Optional<br /><br />Name of file as it will be stored in Origin Storage, minus the path. Forward slashes `/` not allowed.<br /><br />If you don't provide a value for `X-Agile-Basename`, the API will create a file name in the form of `post-<UUID4 in hex notation>`. Example:<br />`post-ddbb5628fdd3433181ba9771f5709190`<br /><br />(UUID4 is a random Universally Unique ID.)The file name must not include two consecutive periods. |
| X-Agile-Content-Detect | str | Optional<br /><br />Instructs the API to detect the content type. The API will ignore this header if you use the `X-Agile-Content-Type` header.<br /><br />Pass one of:<br />- name: lookup MIME type by using the filename, usually the extension<br />- content: lookup MIME type by scanning the contents of the file<br />- auto: first lookup by name, then by content if no name matches. <br /><br />See also [Content Type Handling](#content-type-handling). |
| X-Agile-Content-Type | str | Optional<br /><br />Lets the API look up or detect content type for the file to upload. If this header is not present or the content type provided in it is invalid, the content type will be derived from the Content-Type field of the MIME-encoded attachment. If a suitable mime type is not detected from the mime attachment, the mime type will be derived from the file name's extension.<br /><br />Must be a valid Origin Storage MIME type (see Content Types).<br /><br />See also [Content Type Handling](#content-type-handling). |
| X-Agile-Directory | str | Optional<br /><br />Directory in Origin Storage where file will be stored.<br /><br />Defaults to the root directory
The file name must not include two consecutive periods. |
| X-Agile-Encoding | str |  Optional<br /><br />The default behavior is to treat paths as US ASCII.<br /><br />If the values for `X-Agile-Basename` and `X-Agile-Directory` contain UTF-8 characters, then include this header and set its value to UTF8, which will cause the API to treat values as URI quote paths. Note:<br />-You must quote paths according to URL parameter quoting defined in RFC3986 of the Internet Engineering Task Force.<br />-Characters \%20 and \+ turn into spaces.<br />-Special characters you must handle are: percent sign, dollar sign, ampersand, plus sign, comma, forward slash, colon, semi colon, equal sign, question mark and the \@ symbol.<br /><br />See [Using UTF-8 Characters in Request Headers](/delivery/storage/apis/api_calls/using_utf8).   |
| X-Agile-Expose-Egress | str |  Optional<br /><br />When to make the file available for egress. Valid values:<br />-**PARTIAL**: expose egress immediately (partially uploaded content can be served)<br />-**COMPLETE**: (default) expose egress when the file completes uploading<br />-**POLICY**: expose when the file is in policy   |
| X-Agile-MTime | str | Optional<br /><br />File last modification time in seconds since epoch.<br /><br />Defaults to zero (current time)   |
| X-Agile-Recursive | str | Optional.<br /><br />When uploading a file to the location specified by the `X-Agile-Directory` header, this header instructs the API to create any leading paths if they do not already exist.<br /><br />If you set the value to true, non-existing leading paths will be created.<br /><br />If you omit the `X-Agile-Recursive` header or set it to false, then non-existing leading paths will not be created and the call will fail.<br /><br />Other values you can pass that are equivalent to true:<br />-   yes<br />-   1<br /><br />Other values you can pass that are equivalent to false:<br />-   no<br />-   0<br /><br />Defaults to `false`. |
| X-Agile-Checksum | str | Optional<br /><br />The hexlified version of the bytes that make up the file's sha256 checksum. Origin Storage will calculate the file's checksum and compare it with the value of `X-Agile-Checksum`. (When a file first arrives at a landing pad, it is placed in a temporary area called a 'scratch space'. It is at this point that the checksum comparison occurs.)<br /><br />If `X-Agile-Checksum` is provided and it matches the calculated checksum, the file will be stored and replicated.<br /><br />If `X-Agile-Checksum` is provided and it does not match the calculated checksum, the file will not be ingested. Instead, error code -26 (invalid checksum) will be returned and the file will be removed from landing pad's scratch space and will not be ingested.    |

### Request Payload  {/*frp-request-payload*/}
The payload consists of the file to upload. For example you could use the following option with curl:

```
--data-binary @/tmp/example1.jpg
```

### HTTP Response Codes and Request Status Codes {/*frp-http-codes*/}
On success the call returns an HTTP 200 status code and 0 in the X-Agile-Status header.

On error, the HTTP Status Code is an error code, and the error is reflected in the `X-Agile-Status` header.

The following table provides details about response values.

| HTTP Status Codes    | Description | X-Agile-Status Values |
| --- | --- | --- |
| 200 | Success | 0   |
| 400 | Bad request; missing or invalid parameters | \-3: parent directory does not exist. You specified a in X-Agile-Directory with a leading path that does not exist and you did not pass a true value in X-Agile-Recursive.<br /><br />**\-8**: invalid path given (path too long). See [Path Segment and File Name Limitations](/delivery/storage/apis/reference_materials/path_segment_and_file_name_limitations).<br /><br />**\-24**: You failed to specify a file to upload.<br /><br />\-**25**: You attempted to upload multiple files.<br /><br />**\-26**: invalid checksum<br /><br />\-**33**: You included an invalid content type in the X-Agile-Content-Type header.<br /><br />**\-39**: You passed an invalid value in the X-Agile-Recursive directory.<br /><br />**\-51**: invalid encoding (You specified an invalid value for the `X-Agile-Encoding` header.) |
| 401 | Unauthorized, missing `X-Agile-Authorization` header | \-10001: missing `X-Agile-Authorization` header |
| 403 | Invalid authentication credentials (invalid token) | \-10001: invalid token |
| 500 | Internal server error | **\-5**: internal backend service down |
| 503 | Service unavailable | **\-22**: disk full |

### Response Headers {/*frp-response-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Path | str | File name and path where the file was uploaded. The value will be URI-quoted if UTF8 encoding was used in the `X-Agile-Encoding header`. |
| X-Agile-Status | int | Contains response codes. (See [HTTP Response Codes and Request Status Codes](#frp-http-codes).) |
| X-Agile-Size | int |   Size in bytes of the file that was uploaded  |
| X-Agile-Checksum | str |  File’s SHA-256 hexadecimal digest   |

### curl Sample Requests {/*frp-curl*/}
Upload warning.png to the /symbols/warning directory.

```
curl -v -k \
-H "X-Agile-Authorization: a1ac4fca-2fed-44ac-9b20-d26aee578e67"\
--data-binary @/tmp/warning.png\
-H "X-Agile-Basename: warning.png"\
-H "X-Agile-Content-Detect: name"\
-H "X-Agile-Content-Type: image/png"\
-H "X-Agile-Directory: /symbols/warning"\
-H "X-Agile-Expose-Egress: POLICY"\
-H "X-Agile-MTime: 0"\
http://{Account name}.upload.llnw.net/post/raw
```

### Sample Success Response {/*frp-response*/}

```
HTTP/1.1 100 Continue
HTTP/1.1 200 OK
Date: Tue, 23 Jun 2015 20:29:49 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Checksum: da2d48c37dabd94c00bc9dc98aa2ca0255de1a1238e2525ab1d7edce398
X-Agile-Size: 1547
X-Agile-Path: /{Account Name}/symbols/warning/warning.png
Content-Type: text/json;charset=utf-8
```

## Content Type Handling {/*content-type-handling*/}
The file upload APIs (/post/file and /post/raw) determine content type as follows:

- The content type specified by the Content-Type field of the attachment (form-data encoded payload<sup>1</sup>) takes precedence if set.
- The `X-Agile-Content-Type` header takes precedence over `X-Agile-Content-Detect`.
- The application/octet-stream is special content type, and if you provide it in the `X-Agile-Content-Type` header, the API attempts to detect the content type from the file name, usually the extension.
- If you provide both `X-Agile-Content-Type` and `X-Agile-Content-Detect`, then `X-Agile-Content-Type` takes precedence.
- If you provide neither `X-Agile-Content-Type` nor `X-Agile-Content-Detect`, the API defaults the content type to `X-Agile-Content-Detect`: auto.

<sup>1</sup>Here is an example of form-encoded data payload, where the content type is text/plain.

```
------------------------------44f9af2ecd0c
Content-Disposition: form-data; name="uploadFile"; filename="test.txt"
Content-Type: text/plain
Sample data
------------------------------44f9af2ecd0c--
```
**Notes**

Due to legacy reasons it is possible to pass values (name, content, auto) in `X-Agile-Content-Type` that instruct the API to detect the content type, but doing so is not recommended and may result in unpredictable results.

The values have the following meanings:

- name: look up MIME type by using the file name, usually the extension

- content: look up MIME type by scanning the contents of the file

- auto: first look up by name, then by content if no name matches

Although the value auto for the `X-Agile-Content-Type` header is currently accepted, it will be deprecated at some point in the future. We recommend that you change you code to use alternative means of instructing the API to automatically detect the content type.

### X-Content-Type Request Header {/*x-header*/}
In the past it was possible to pass the value auto in the legacy `X-Content-Type` header to instruct the API to automatically detect the content type of the entity-body, but passing auto causes an error. To cause automatic content detection callers can either:

- Omit the `X-Content-Type` header, or
- Pass auto in the `X-Content-Detect` header

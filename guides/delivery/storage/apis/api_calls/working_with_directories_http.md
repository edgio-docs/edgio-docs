---
title: Working with Directories in the HTTP Interface
---

The HTTP interface only allows you to create a directory.

`POST to /post/directory`

Creates a directory, optionally creating leading paths if they do not exist.

If the directory is successfully created, the system sets the parent directory's mtime (last modified time) to the current system time.

<Callout type="info">A directory cannot contain a file and a sub-directory with the same name.</Callout>

## Request Headers  {/*request-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| Content-Length | int | Always set this header to `0`. |
| Content-Type | str | Always set this header to `text/json`. |
| X-Agile-Authorization | str |  Valid token from a call to login (JSON-RPC interface) or `/account/logi`n (HTTP interface).  See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| X-Agile-Recursive | bool | Optional<br /><br />For a directory with multiple path segments, indicates whether to create parent paths if they do not exist.<br /><br />Example: Assume you pass `/a/b/c` for `X-Agile-Directory`, and directories `a`, `b`, and `c` do not exist.<br /><br />-   If you set `X-Agile-Recursive` to true (or default it) then the API will create `a`, `b`, and `c`.<br /><br />-   If you set `X-Agile-Recursive` to false, then `a`, `b`, and `c` will not be created and the call will fail.<br /><br />Valid values to indicate true:<br />-   true<br />-   yes<br />-   1<br /><br />Valid values to indicate false:<br />-   false<br />-   no<br />-   0<br /><br />Defaults to true. |
| X-Agile-Directory | str | Directory to create.<br /><br />You must use the UNIX/Linux path separator /. If you use the Windows path separator \\ it becomes part of the name.<br /><br />See also [Path Segment and File Name Limitations](/delivery/storage/apis/reference_materials/path_segment_and_file_name_limitations). |

## HTTP Response Codes and Request Status Codes  {/*response-codes-request-status-codes*/}

The response body always returns a JSON object with status information. (See [Sample Returned JSON Object](#sample-json)).

On success the call returns an HTTP 200 status code, `0` in the `X-Agile-Status` header, and a success message in the JSON object.

On error, the HTTP Status Code is an error code, and the error is reflected in the `X-Agile-Status` header and the JSON object. The following table provides details about response values.

|   HTTP Status Code  | Description | X-Agile-Status / JSON Object Values |
| --- | --- | --- |
| 200 | Directory created successfully or directory already exists | **0:** success |
| 400 | Bad request | **\-2**: path exists: Parent directory contains a file with the same name as the directory you attempted to create.<br /><br />**\-3**: no parent directory. One or more leading paths in the value you passed to X-Agile-Directory do not exist and you set the X-Agile-Recursive header to false.<br /><br />**\-8**: invalid path given (path too long)<br /><br />**\-39**: invalid X-Agile-Recursive value |
| 401 | Not authorized. You did not include the X-Agile-Authorization header in your request. | **\-10001**: no token |
| 403 | Invalid authentication credentials | **\-10001**: invalid token |
| 500 | Internal server error | **\-5**: service unavailable |

## Response Headers {/*response-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Status | int | Contains response codes. (See [HTTP Response Codes and Request Status Codes](#response-codes-request-status-codes).) |


## Sample Returned JSON Object {/*sample-json*/}

The object is returned in the response body and contains two key-value pairs: message and code as in this example:

```JSON
{"message": "success", "code": 0}
```

## curl Sample Request 1 {/*curl-request1*/}
None of the path segments in `/APAC/a/b` exist. Create them by explicitly setting the `X-Agile-Recursive` header to true:

```
curl -v -k /
-H "Content-Length: 0"/
-H "Content-Type: text/json"/
-H "X-Agile-Authorization: 3b947a4c-1e29-4065kl-ad6b-8a6a024a8u33"/
-H "X-Agile-Recursive: true"/
-H "X-Agile-Directory: /APAC/a/b"/
http://{Account name}.upload.llnw.net/post/directory
```

## Sample Success Response 1 {/*sample-success-response1*/}

```
HTTP/1.1 200 OK
Date: Tue, 09 Jun 2015 14:13:05 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 33
Content-Type: text/json;charset=utf-8
{"message": "success", "code": 0}
```

## curl Sample Request 2 {/*curl-request2*/}

Make sure you don't accidentally create an undesired parent directory. In this example, `/future-releases` does not exist:

```
curl -v -k ^
-H "X-Agile-Authorization: 5e26d9b5-09a3-40ba-b3bd-0bd8a740092c"^
-H "X-Agile-Directory: /future-releases/hot"^
-H "X-Agile-Recursive: false"^
http://{Account name}.upload.llnw.net/post/directory
```

## Sample Success Response 2 {/*sample-success-response2*/}

```
HTTP/1.1 400 parent directory does not exist
Date: Wed, 02 Sep 2015 14:05:05 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: -3
Content-Length: 58
Connection: close
Content-Type: text/json;charset=utf-8
{"message": "parent directory does not exist", "code": -3}
```

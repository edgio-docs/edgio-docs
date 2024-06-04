---
title: Using UTF-8 Characters in Request Headers
---
For certain requests (see Requests that Support UTF-8) you can use UTF-8 character encoding in headers that specify paths and file names. When you use UTF-8 character encoding, you must include the X-Agile-Encoding header in your requests, like so:

```
X-Agile-Encoding: UTF8
```

The header is optional and encoding defaults to US ASCII.

If you supply an invalid encoding, Origin Storage returns a 400 HTTP Status Code with reason -51, invalid coding.

Notes:

- All path name and file name headers also support US ASCII.
- Although the JSON-RPC interface supports UTF-8, the interface uses unicode escaping rather than URL encoding. For example, `файлы` is `\\u0444\\u0430\\u0439\\u043b\\u044b`.

## Requests that Support UTF-8  {/*supported-requests*/}
The following requests support UTF-8 and the X-Agile-Encoding header:
|Request|Headers in the Request that Support UTF-8|
|---|---|
|Create multipart (multipart/create)|`X-Agile-Directory`, `X-Agile-Basename`|
|Post Raw (post/raw)<br /><br />[See File Raw Post](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#file-raw-post).|`X-Agile-Directory`, `X-Agile-Basename` request parameters<br /><br />`X-Agile-Path` response parameter|

Notes:

- Create multipart piece (`multipart/piece`) and complete multipart (`multipart/complete`) do not require UTF-8 encoding because they do not allow the caller to pass file names.
- Origin Storage path segment names and file names have a limit of 255 bytes. Because UTF-8 is supported, be sure to calculate the actual length before passing paths and file names in headers if you are using other than basic Latin letters, digits, and punctuation signs. See [Path Segment and File Name Limitations](/delivery/storage/apis/reference_materials/path_segment_and_file_name_limitations) for additional information.

## Request and Response Example  {/*example*/}
Here is a sample request using UTF-8 encoding:
```
POST /post/raw HTTP/1.1
User-Agent: curl/7.22.0 (x86_64-pc-linux-gnu) libcurl/7.22.0 OpenSSL/1.0.1 zlib/1.2.3.4 libidn/1.23 librtmp/2.3
Host: example.net:8080
Accept: */*
X-Agile-Authorization: d9e89ef8-fe07-4b6a-8cc5-bc03e4d1ce42
X-Agile-Directory: /
X-Agile-Basename: test%20file.txt
X-Agile-Encoding: UTF8
Content-Length: 29
Content-Type: application/x-www-form-urlencoded
[29 bytes of data]
```

Here is a sample response:
```
HTTP/1.1 200 OK
Date: Tue, 03 Feb 2015 22:40:42 GMT
Server: Apache/2.2.22 (Ubuntu)
X-Agile-Status: 0
Content-Length: 0
X-Agile-Checksum: 6908750bc780002d195e362de56a77ad79bbc36091159032763b4387cdb0fca5
X-Agile-Size: 29
X-Agile-Path: /test%20file.txt
Vary: Accept-Encoding
Content-Type: text/xml;charset=utf-8
```

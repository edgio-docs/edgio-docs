---
title: Logging in Using the HTTP Interface
---

```
POST to /account/login
```
Logs into Origin Storage and obtains a token for subsequent calls. Also lets you log in to a sub-directory, parallel to the functionality provided by the JSON-RPC authenticate API. (See [Log in to a Sub-directory](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in-to-subdirectory).)

## Request Headers  {/*request-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Username | str | User name |
| X-Agile-Password | str | User password |
| X-Agile-Subdir | str | Optional<br /><br />Subdirectory into which you want to log in. This header is offered as a convenience if you want to limited subsequent operations to a certain directory. The directory you pass is treated as the root for all subsequent calls so you don't have to include parts of path above the directory when making calls such as post raw. Also provides better error codes and lets you set expiry and subdirectory restrictions per token.<br /><br />Example: Suppose you want to work in the `/EMEA/pictures/ocean` directory, using the post/raw request to upload files. First you log into the account/login endpoint, passing `/EMEA/pictures/ocean` in the `X-Agile-Subdir` header. Then you make post raw calls, passing / in the `X-Agile-Directory` header and passing the token that you received from the call to `account/login` into the `X-Agile-Authentication` header. See [File Raw Post](/delivery/storage/apis/api_calls/uploading_files/#file-raw-post) for details about post/raw. |
| X-Agile-Expiry | str | Optional<br /><br />The value in seconds indicating when the session (token) should expire. After this interval has passed you must re-log in. Use this header when you want to take control of session expiry time.<br /><br />Defaults to 3600 seconds (one hour). |
| X-Agile-Content-Encoding |     | Optional<br /><br />When logging in to a sub-directory (using `X-Agile-Subdir`) that has a name containing , characters, pass the value UTF8 in the X-Agile-Content-Encoding header. When you do so, you will obtain a token that is valid for the sub-directory. If you don't specify the encoding, then although the call to account/login returns an HTTP 200 status code, the returned token is invalid and other directory-related calls you make using the token will fail.<br /><br />Currently, UTF8 is the only valid value to pass in the header. Other values will result in an invalid token. |

## HTTP Response Codes and Request Status Codes  {/*response-request-status-codes*/}
On success the call returns an HTTP 200 status code and 0 in the `X-Agile-Status` header.

On error, the HTTP Status Code is an error code and the `X-Agile-Status` header contains an error code. The following table provides details about response values.

|     | Description | Possible X-Agile-Status Values |
| --- | --- | --- |
| 200 | Login successful | **`0`**: success |
| 400 | Bad request | **`-34`**: invalid expiry time<br /><br />**`-47`**: invalid sub-directory<br /><br />**-`10001`**: invalid user name or password. Or user name or password or both are missing |

## Response Headers  {/*response-headers*/}
| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Status | int | Contains a response code (See [HTTP Response Codes and Request Status Codes](#response-request-status-codes).) |
| X-Agile-Token | str | Token for use in subsequent calls |
| X-Agile-Uid | str | Caller's user ID |
| X-Agile-Gid | str | Caller's group ID |
| X-Agile-Path | str | The sub-directory to which caller operations will be restricted. Includes the caller's namespace. |

## curl Sample Request 1  {/**/}
Log into the EMEA subdirectory and set a timeout value of 10 minutes.

<Callout type="info">Always use https for logging in to prevent sniffer attacks that can detect your credentials and token.</Callout>

```curl
curl -v \
-H "X-Agile-Username: user" \
-H "X-Agile-Password: pswd" \
-H "X-Agile-Subdir: /EMEA" \
-H "X-Agile-Expiry: 600
https://{Account name}.upload.llnw.net/account/login
```
## Sample Success Response 1  {/*sample-success-response1*/}
```curl
HTTP/1.1 200 OK
Date: Thu, 21 May 2015 19:33:00 GMT
Content-Type: text/json;charset=utf-8
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
X-Agile-Uid: 10009
X-Agile-Token: 74337bce-dc21-4268-ad25-432ad6cfafe7
X-Agile-Gid: 10003
X-Agile-Path: /{Account name}/EMEA
```

## Sample curl Request 2 {/*sample-request2*/}
Log into a sub-directory that has UTF-8 characters in its name.

```curl
curl -v -k\
-H "X-Agile-Username: yourUser"\
-H "X-Agile-Password: yourPassword"\
-H "X-Agile-Encoding: UTF8"\
-H "X-Agile-Subdir: тї_私する_d3cb464e1a4311e586b9e0db55d3d7d5"\
http://{Account name}.upload.llnw.net/account/login
```

## Sample curl Response 2 {/*sample-response2*/}
```curl
HTTP/1.1 200 OK
Date: Tue, 22 Sep 2015 15:56:25 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Uid: 12020
X-Agile-Token: 370c9af9-91fb-47eb-bfc0-0e77fc8288dd
X-Agile-Gid: 100
X-Agile-Path: /{Account name}/-é-ù_tºüpüÖpéï_d3cb464e1a4311e586b9e0db55d3d5
```

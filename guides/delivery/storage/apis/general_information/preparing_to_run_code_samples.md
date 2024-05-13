---
title: Preparing to Run Code
---
Origin Storage has two interfaces: JSON-RPC and HTTP. This document presents code samples for both. To get started running code samples, see:

- Code Samples in the HTTP Interface
- Code Samples in the JSON-RPC Interface

<Callout type="info">If you want to copy and paste Python code samples into a Python editor, please copy from the HTML version of this document and not the PDF. If you copy from PDF, indentation will not be preserved.</Callout>

## Code Samples in the HTTP Interface  {/*code-samples-http*/}

All HTTP interface code samples use the curl command line tool and are written for use on Linux/Unix but you can easily adapt them to run on windows. Instructions for using curl are in the following sections:

- [Running curl on Unix/Linux](#curl-windows)
- [Running curl on Windows](#code-samples-json-rpc)

Regardless of the operating system you use, always use the curl -v (verbose) option, which causes curl to output all its actions.

You can download curl from the [curl web site](https://curl.haxx.se/).

### Running curl on Unix/Linux  {/*curl-unix-linux*/}
The HTTP interface code samples use the backslash `\` as the line continuation character to break parts of the command over multiple lines for readability. When using the `\` character, be sure that nothing, not even a space, follows the character.

### Running curl on Windows  {/*curl-windows*/}
If you want to run a curl sample on Windows, you can create a batch file (a file with the .bat extension) and run it by double-clicking it. Windows will open a command prompt when you run the file.

Note the following:
- Use the caret `^` character as the line continuation character when breaking a command over multiple lines. Be sure that nothing, not even a space, follows the caret.
_Insert the pause command as the last command in the batch file to keep the command prompt window open after curl finishes executing so you can see curl output. (Alternatively, you can open a command prompt, then within it navigate to the directory with the batch file and run it by typing the file name and pressing enter. All output will be displayed in the command prompt window.) Note that you don't need the caret ^ character at the end of the line that precedes the pause command.

Here is a sample Windows batch file:
```
curl -v ^
-H "X-Agile-Username: yourUser" ^
-H "X-Agile-Password: yourPassword" ^
https://{Account name}.upload.llnw.net/account/login
pause
```
### Running Your First HTTP Request {/*first-request*/}
Prior to running any code samples in the remainder of this document, you can try logging in using either of the following samples: one for windows and one for Linux/Unix.

<Callout type="info">Always use https for logging in to prevent sniffer attacks that can detect your credentials and token.</Callout>

Windows sample:

```
curl -v ^
-H "X-Agile-Username: yourUser" ^
-H "X-Agile-Password: yourPassword" ^
https://{Account name}.upload.llnw.net/account/login
pause
```

Linux/Unix sample:

```
curl -v \
-H "X-Agile-Username: yourUser" \
-H "X-Agile-Password: yourPassword" \
https://{Account name}.upload.llnw.net/account/login
```
If the call was successful, it outputs information with HTTP Status Code 200 and 0 (zero) in the X-Agile-Status header. Example:

```
HTTP/1.1 200 OK
Date: Wed, 27 May 2015 16:22:46 GMT
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
X-Agile-Status: 0
Content-Length: 0
X-Agile-Uid: 12020
X-Agile-Token: e1339185-3f71-47bc-bb69-ea970515et88
X-Agile-Gid: 100
X-Agile-Path: /{Account name}
Content-Type: text/json;charset=utf-8
```
(If you would like to learn more about account/login, see [Logging in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface).)


## Code Samples in the JSON-RPC Interface  {/*code-samples-json-rpc*/}
JSON-RPC code samples in this document are in Python, but you can use any language with libraries that support JSON-RPC requests.

**Languages other than Python**
Obtain the necessary libraries and make any configurations needed. Then refer to the appropriate sections in this document for specific requests.

**Python**

To use Python, do the following:

1. Refer to instructions in the following sections
    - [Installing the jsonrpclib Library](#install-library)
    - [Configuring the Server and Obtaining a Token](#configure-obtain)
    - Testing Your Setup
2. Make desired calls, referring to the appropriate sections in this document for specific JSON-RPC request. See API Index

### Installing the jsonrpclib Library {/*install-library*/}
To install the library, follow these steps:

1. Open a terminal or command prompt.
2. Issue either of the following commands:
    - `easy_install jsonrpclib`
    - `pip install jsonrpclib`

### Configuring the Server and Obtaining a Token {/*configure-obtain*/}
Prior to making any calls, you must point your installation to the server where your content is hosted and obtain a token. The token is required for all other API calls you make.

The following sample illustrates how to configure the server and obtain a token.

<Callout type="info">Always use https for logging in to prevent sniffer attacks that can detect your credentials and token.</Callout>

```JSON
>>> import jsonrpclib
>>> api = jsonrpclib.Server('https://{Account name}.upload.llnw.net/jsonrpc')
>>> token, user = api.login( 'yourUserId', 'yourPassword' )
>>> print (token)
u'42c4160c-cb49-4352-b07b-348687495972'
```

(If you would like to learn more about the login method and the token, see [Log In](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface).)

Note that the sample above uses the login method to obtain a token, but you can also login using the `authenticate` method (JSON-RPC interface) or the `/account/login` call (HTTP interface). See [Log in to a Sub-directory](delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in-to-subdirectory) and [Logging in Using the HTTP Interface](delivery/storage/apis/api_calls/logging_in_using_http_interface) for additional information.

<Callout type="info">All JSON-RPC code samples in this document use `api` as the server variable and `token` as the token variable.</Callout>

### Testing Your Setup
As a test, submit the noop call: `>>> result = api.noop(token)`

If your output is as follows, you have successfully logged in:

```
>>> print (result)
{u'operation': u'pong', u'code': 0}
```

(If you would like to learn more about the noop call, see [Perform an Authenticated API Verification](/delivery/storage/apis/api_calls/#pass-token).)

## Where to Go from Here
If you successfully submited your first JSON-RPC or HTTP request, you are ready to learn the various Origin Storage APIs! Head over to [API Index](/delivery/storage/apis/general_information/index_of_supported_api_calls) and choose one of the APIs listed therein. Or, if you would like to jump in and run ready-made samples for uploading files, head on over to [File Upload End-to-End Examples](/delivery/storage/apis/reference_materials/file_upload_examples).

---
title: Storage Quick Start Guide
---
This page provides an overview of methods available to upload and share your Origin Storage content.

## Upload Content  {/*upload-content*/}
There are multiple ways to ingest content using Origin Storage. Choose from the options below:

- [Origin Storage APIs](#uploading-using-storage): Use Origin Storage directly from your application.
- [Control Portal](#uploading-using-control): This is the easiest and most expeditious way to get started. If you don’t like using a command line, this is for you.
- [Java FTP and API client] (including Multipart support): See https://github.com/Orchestrate-Cloud-Storage/StorageClient.
- [Rsync over SSH](#uploading-using-rsync). You can use this method directly from the command line.

<Callout type="info">Whenever possible it is recommended that customers use the Origin Storage Application Programming Interface (API) due to its feature-rich ingest workflow and its superior performance.</Callout>

### Uploading Using the Origin Storage API  {/*uploading-using-storage*/}
This section provides an end-to-end example application to jump-start client-side integration with Origin Storage. This section shows how to create a token, upload a file over HTTP, and verify that the file was correctly uploaded.

This [HTTP Example](#http-example) ties information together, providing a complete working sample.

### Step 1: Establish a Token  {/*establish-token*/}
You can use HTTP or JSON-RPC.

#### HTTP Example  {/*http-example*/}
Use the Python requests library.

```HTTP
>>> import requests

>>> auth_headers = { 'X-Agile-Username': 'guest', 'X-Agile-Password': 'password' }

>>> url = 'http://{Account Name}.upload.llnw.net/account/login'

>>> r = requests.post(url, headers=auth_headers, verify=False)

>>> token = r.headers['x-agile-token']

>>> print token

7c164371-d581-4068-8ce1-4d17b6a9d8a3
```

#### JSON-RPC Example  {/*json-example*/}

Use the Python *jsonrpclib* library.

```JSON
>>> import jsonrpclib

>>> api = jsonrpclib.Server('http://{Account Name}.upload.llnw.net/jsonrpc2')

>>> token,uid_gid = api.login('guest', 'password')

>>> print token

f3037573-2a6f-4042-ab8f-82d6823b0480
```

### Step 2: Upload a File Over HTTP  {/*upload-file-http*/}
Always use HTTP for file uploads! This example uses /post/raw submitted with the Python requests library.

```HTTP
>>> import requests

>>> file_to_upload = "test.mp3"

>>> upload_headers = { 'X-Agile-Authorization': token, 'X-Agile-Basename': file_to_upload, 'X-Agile-Directory': '/' }

>>> with open(file_to_upload, 'rb') as filesrc:

 r = requests.post( 'http://{Account Name}.upload.llnw.net/post/raw', data=filesrc, headers=upload_headers)
```

### Step 3: Verify the Upload was Successful  {/*verify_upload*/}
You can use HTTP or JSON-RPC.

#### HTTP Example  {/*http*/}
Look at the headers returned from the request. The /post/raw request returns the upload status in the X-Agile-Status header. A value of 0 means success.

```HTTP
>>> print r.headers

{'x-agile-status': '0', 'content-length': '20', 'access-control-allow-methods': 'OPTIONS',

'content-type': 'text/xml;charset=utf-8', 'content-encoding': 'gzip',

'x-agile-checksum': 'ce2a9d3bdec04c3577164d067e479958b50e246f17aaa098d0fad9f150eb4465',

'vary': 'Accept-Encoding', 'server': 'Apache', 'date': 'Tue, 03 Mar 2015 19:31:18 GMT',

'x-agile-path': '/{Account Name}/test.mp3', 'access-control-allow-origin': '*',

'access-control-allow-headers': 'X-Agile-Authorization, X-Content-Type', 'x-agile-size': '2055946'}
```

Or, you can issue a HEAD request against the object and look at the headers returned and the overall response code (200=OK). Here is an example using the Python requests library:

```HTTP
>>> r = request.head('http://{Account Name}.upload.llnw.net/test.mp3')

>>> print r

<Response [200]>

>>> print r.headers

{‘content-length”, ‘2055946’, ‘x-agile-checksum’: 'ce2a9d3bdec04c3577164d067e479958b50e246f17aaa098d0fad9f150eb4465',

’last-modified’: ‘Thu, 12 Apr 2012 19:31:18 GMT’, ‘connection’: ‘keep-alive’, ‘date’:’Tue, 03 Mar 2015 19:31:18 GMT’,

 ‘accept-ranges’: ‘bytes’, ‘server’:’nginx/1.0.12, ‘content-type’: ‘audio/mpeg’}
```

#### JSON-RPC Example  {/*json*/}
Use the stat function to get information on the uploaded file. The stat function has an optional ‘detail’ parameter. Pass True for extended information, or pass False (or omit) for an abbreviated response. A value of 0 in the returned code field indicate success. Other values indicate failure. You can also look at other fields such as size and compare them to known values.

```JSON
>>> api.stat(token, '/test.mp3')

{u'mtime': 1425411089, u'code': 0, u'type': 2, u'ctime': 1425411089, u'size': 2055946}

>>> api.stat(token, '/test.mp3',True)

{u'mimetype': u'audio/mpeg', u'code': 0, u'uid': 1000009,

u'checksum': u'ce2a9d3bdec04c3577164d067e479958b50e246f17aaa098d0fad9f150eb4465',

u'gid': 1000003, u'mtime': 1425411089, u'size': 2055946, u'type': 2, u'ctime': 1425411089}
```

#### Complete HTTP Example  {/*complete-http-example*/}
This section ties information together, providing a complete Python working sample that you can quickly and easily copy and paste into a Python file.

```Python
import requests

myusername = "guest"

mypassword = "password"

file_to_upload = "test.mp3"


auth_headers = { 'X-Agile-Username': myusername, 'X-Agile-Password': mypassword }

url = 'http://{Account Name}.upload.llnw.net/account/login'

r = requests.post(url, headers=auth_headers, verify=False)

token = r.headers['x-agile-token']


upload_headers = { 'X-Agile-Authorization': token, 'X-Agile-Basename': file_to_upload, 'X-Agile-Directory': '/' }

with open(file_to_upload, 'rb') as filesrc:

	r = requests.post('http://{Account Name}.upload.llnw.net/post/raw', data=filesrc, headers=upload_headers)


print r.headers
```

### Uploading Using the Control Portal  {/*uploading-using-control*/}
You can upload using the drag-and-drop capability in the Control Portal.

#### Step 1: Log Into Control  {/*log-into-control*/}
1. Go to:control.llnw.com.
2. Log in using the credentials and shortname/account information you received in your Edgio Welcome Letter.

#### Step 2: Create Directories  {/*create-directories*/}
If needed, you can create target directories using the Origin Storage API or the Control portal.

**Origin Storage API**

|API|Additional Information in the Origin Storage API Reference Guide|
|---|---|
|makeDir or makeDir2|[Working with Directories in the JSON-RPC Interface](/delivery/storage/apis/api_calls/#working-with-directories-json)|
|/post/directory|[Working with Directories in the HTTP Interface](/delivery/storage/apis/api_calls/#working-with-directories-http) |

**Control Portal**
See [Creating Folders](/delivery/storage/console/#creating-folders) in the [Origin Storage Console User Guide](/delivery/storage/console).


#### Step 3: Upload Content  {/*upload-content*/}
To upload content using the Control Portal, please see [Uploading Files](/delivery/storage/console/#uploading-files) in the Control Portal User Guide.

If you would like to upload content using another method (API, FTP, etc.), see the links to the guides in [Choose an Ingest Method](#upload-content).

### Uploading Using Rsync over SSH  {/*uploading-using-rsync*/}
Rsync is a software application for Unix-like and Windows systems which synchronizes files and directories from one location to another, while minimizing data transfer using delta encoding, when appropriate. An important feature of Rsync not found in most protocols is that mirroring takes place with only one transmission in each direction. Rsync can copy or display directory contents and copy files, optionally using compression and recursion.

- Rsync over SSH is available only with pre-configured Source IP Access Control List (ACL) provisioning
- Rsync over SSH supports both pre-configured SSH authorized keys and basic password authentication
- Rsync options that trigger mkstemp() system calls are not supported
- The file system path accessing Origin Storage via SCP is /content
    -    must be specified as the prefix when using Rsync to ingest files (e.g., `Rsync filename llp:/content/path`)

#### Rsync Options  {/*rsync-options*/}

The following options are known to work. In some cases, the options are ignored because asset ownership and permissions are dictated by the Origin Storage configuration.

<Callout type="info">The `-W`, and `–inplace` options are required.</Callout>

|Usage|Abbreviated Option|Option|Description|
|---|---|---|---|
|required|-W|-whole-file|copy files whole (without Rsync algorithm)|
|required||-inplace|update destination files in-place (see man page)|
|optional|-q|-quiet|suppress non-error messages|
|optional||-no-motd|suppress daemon-mode MOTD (see man page caveat)|
|optional|-r|-recursive|recurse into directories|
|optional|-u|-update|recurse into directories|
|optional|-O|-omit-dir-times|omit directories when preserving times|
|optional|-i|-itemize-changes|output a change-summary for all updates|
|optional|-r|-recursive|recurse into directories|
|optional|-t|-times|preserve times|
|optional|-u|-update|skip files that are newer on the receiver|
|required|-v|-verbose|increase verbosity|
|optional||-size-only|skip files that match in size|
|optional||-progress|show progress during transfer|
|optional||-stats|give some file-transfer stats|
|ignored|-g|-group|preserve group|
|ignored|-o|-owner|preserve owner (super-user only)|
|ignored|-p|-perms|preserve permissions|

#### Upload Example  {/*upload-example*/}
This example shows how to sync files from a local machine to Origin Storage.

**Directory Structure**
Here is a simple directory structure:

![Sample directory structure](/images/delivery/storage/sample.png)

**Rsync Command**

Here is the command to sync the directories using Rsync over SSH:

![Sample directory structure2](/images/delivery/storage/sample2.png)

## Retrieve and Share Your Content  {/*retrieve-and-share*/}
After you upload content, you have several options for retrieving and sharing content:

- Use the Control Portal:
    - To retrieve content, please see [Downloading Files](/delivery/storage/console/#downloading-files) in the in the in the Control Portal User Guide.
    - To share content via email, please see [Getting Direct Links to Files](/delivery/storage/console#getting-direct-links-to-files) in the in the in the Control Portal User Guide.
- To download and share the content via a CDN, consult your CDN provider. Origin Storage can act as origin storage for any CDN. If Edgio Content Delivery is your CDN of choice, please see [Configuring Caching and Delivery](/delivery/control/configure/caching_and_delivery) in the Control Portal User Guide.

<Callout type="info">Do not attempt to directly download content from Origin Storage using FTP, SFTP, FTPS, SCP, or rsync because doing so can negatively impact other system processes. To download content, use an HTTP GET request.</Callout>

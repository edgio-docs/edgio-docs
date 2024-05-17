---
title: Working with Files in the JSON-RPC Interface
---

The Origin Storage  API lets you work with existing files, performing actions such as copying, moving, and listing files. These operations are available in the JSON-RPC interface only. See also [Working With Methods Common to Files and Directories](/delivery/storage/apis/api_calls/working_with_methods).

The Origin Storage API also lets you upload files. See the following for details:

- [Uploading Files — Multipart](/delivery/storage/apis/api_calls/uploading_files_multipart)
- [Uploading Files — Non-Multipart](/delivery/storage/apis/api_calls/uploading_files_nonmultipart)

Note that you can download files from Origin Storage, although this capability is outside of the JSON-RPC and HTTP interfaces.

## Copy a File {/*copy-a-file*/}
Method name: `fetchFileHTTP`

Copies a file from one location to a different location. If desired, you can specify a new name for the destination file. The method works according to the following rules:

- You cannot use wild cards.
- The copy operation is performed asynchronously.

The method asynchronously submits the copy request to a queue where it waits with other requests.

### Copy a File Using Named Parameters {/*using-named-parameters*/}

```JSON
{
  "method": "fetchFileHTTP",
  "id": 4,
  "params": {
    "token": "e1254148-c557-4bdd-99ea-ffe76cd450ad",
    "path": "/TreesOfEurope/DeciduousTrees.txt",
    "uri": "http://{Account name}/
            TreesOfSouthAmerica/DeciduousTrees.txt",
    "flags": 1
  },
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*parameter-descriptions*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.|
|path|str|The destination path and file name|
|uri|str|The URI for the source path and file name. Must use properly URL-encoded values for disallowed characters or an error is returned.<Callout type="info">The root path of your account is `http://{Account name}/`<br /><br />Example:<br />If you have a preview.mp4 file in a previews directory off the root path, you reference the file like this:<br />`http://{Account name}/previews/preview.mp4`</Callout>|
|flags	|int|Optional <br />Additional processing instructions. Valid values:<br />- FF_CREATE_DESTDIR: Automatically create the destination directory if it does not exist<br />- 1: Equivalent to FF_CREATE_DESTDIR|

### Return Codes {/*return-codes*/}
-   **0**: success
-   **\-4**: queue failure
-   **\-13**: invalid flags
-   **\-14**: invalid source uri
-   **\-56**: too busy - concurrency reached (wait and try again)
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `fetchFileHTTP`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*response-data*/}

Returns only the codes discussed in [Return Codes](#return-codes). Does not return any data structures.

### Python Sample Requests {/*python-sample-requests*/}
Using named parameters, copy `example4.jpg` in the root directory and rename the copy to `example3.jpg`:

```Python
>>> api.fetchFileHTTP(token, '/example3.jpg', 'http://{Account name}/example4.jpg', 1)
0
```
## Delete a File   {/*delete-a-file*/}
Method name: `deleteFile`

Deletes a file from the specified location. If the file is successfully deleted, the system sets the parent directory's mtime (last modified time) to the current system time.

### Delete a File Using Named Parameters {/*delete-file-using-named-parameters*/}

```JSON
{
  "method": "deleteFile",
  "id": 5,
  "params": {
    "token": "d6835f68-7bd4-4a29-9c40-54fbaeeb2444",
    "path": "/TreesOfEurope/DeciduousTrees.txt"
  },
  "jsonrpc": "2.0"
}
```

### Deleta a File Using Positional Parameters {/*delete-a-file-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "deleteFile",
  "id": 4,
  "params": [
    "1ee13c07-1f50-4c05-8f89-d5779e17332b",
    "/TreesOfEurope/DeciduousTrees.txt"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to `login` (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| path | str | Path and file name to delete. All attempts to delete multiple files through the use of wildcards fail with a return code of \-1 (file does not exist). |

### Return Codes {/*delete-return-codes*/}

-   **0**: success
-   **\-1**: file does not exist
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `deleteFile`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*delete-response-data*/}
Returns only the codes discussed in [Return Codes](#delete-return-codes). Does not return any data structures.

### Python Sample Requests {/*delete-python-sample-requests*/}
Delete the example1.jpg from the root directory:

```Python
>>> api.deleteFile(token, '/example1.jpg')
0
```

## Move a File

Although the Origin Storage API does not provide a specific method for moving files, you can use the rename method to move a file, specifying a different directory for the `newpath` parameter.

### Python Sample Requests {/*move-python-sample-requests*/}
Move `example.txt` from the `/e` directory to the `/d` directory:

```Python
>>> api.rename(token, '/e/example.txt', '/d/example.txt')
0
```

## List Files  {/*list-file*/}
Method name: `listFile`

Lists files that are direct children of a given path. The method is not recursive and operates only on the given path.

### List Files Using Named Parameters {/*list-using-named-parameters*/}
```JSON
{
  "method": "listFile",
  "id": 1,
  "params": {
    "token": "70f2c2c9-42fc-4021-913a-6487217e19b4",
    "path": "/",
    "pageSize": 1,
    "cookie": 0,
    "stat": true
  },
  "jsonrpc": "2.0"
}
```

### List Files Using Positional Parameters {/*list-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "listFile",
  "id": 0,
  "params": [
    "ad80c27a-f18c-42a2-9197-feea7631ab3b",
    "/",
    1,
    0,
    true
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*list-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| path | str | Directory to list |
| pageSize | int | Optional><br /><br />The number of files to return from a call to the method. Must be less than or equal to 10000.<br /><br />Defaults to 100 |
| cookie | uint64 | Optional<br /><br />On return, indicates whether additional files can be returned with subsequent calls to the function.<br /><br />Omit this argument or pass 0 the first time you call the function. For all subsequent calls, pass the cookie value returned from the prior call.<br /><br />Defaults to 0 |
| stat | bool | Optional<br /><br />Include file details in output.<br /><br />Defaults to `False` |

### Return Codes {/*list-return-codes*/}
-   **0**: success
-   **\-1**: invalid path
-   **\-11**: invalid cookie
-   **\-12**: invalid page size
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `listFile`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*list-response-data*/}
When the stat parameter is set to `False`, the method returns an object with the following data:

-   **code**: (int) return code
-   **cookie**: (uint64) indicates whether additional files can be returned with subsequent calls to the function. Non-zero value: additional files are available. Zero value: no more files are available.
-   **list**: array of file objects. Data for each object is:
    -   **name**: (str) file name
    -   **type**: (int). Always 2 (file)

<Callout type="info">The order in which files are returned is non-deterministic. Results are not sorted.</Callout>

Example:

```JSON
{
  "code": 0,
  "cookie": 2,
  "list": [
    {
      "name": "flat-irons.jpg",
      "type": 2
    },
    {
      "name": "farm-cat.jpg",
      "type": 2
    }
  ]
}
```

When the stat parameter is set to True, each file listed includes a stat object with the following data:

-   **checksum**: (str) file's SHA-256 hexidecimal digest
-   **ctime**: (int) creation time in seconds since epoch
-   **gid**: (int) group ID of user that created the file
-   **mimetype**: (str) file's MIME type. Example: text/plain
-   **mtime**: (int) last modification time in seconds since epoch
-   **size**: (int) file size
-   **uid**: (int) ID of user that created the file

Example:

```JSON
{
  "code": 0,
  "cookie": 1,
  "list": [
    {
      "stat": {
        "uid": 12020,
        "gid": 100,
        "size": 659819,
        "checksum": "24a436b8a87462482806667b76ec5a120ae236a721c311a66235ad3cf4073bd4",
        "ctime": 1423676679,
        "mimetype": "image/jpeg",
        "mtime": 1423676671
      },
      "name": "flat-irons.jpg",
      "type": 2
    }
  ]
}
```

### Python Sample Requests {/*list-python-sample-requests*/}
Loop through all files in a directory in chunks of three and print the file names.

```Python
# User-defined variables
dir = '/'
pageSize = 3

def printFiles( fileList ):
  global hasFiles
  for ( item ) in fileList:
    hasFiles = True
    print item['name']

hasFiles = False
results = api.listFile( token, dir, pageSize, False )

print ('Files in directory "' + dir + '":')
printFiles( results['list'] )
cookie = results['cookie']

while ( cookie > 0 ):
  results = api.listFile( token, dir, pageSize, cookie, False )
  printFiles( results['list'] )
  cookie = results['cookie']

if not hasFiles:
  print ('**No files in directory**')
```

## Set a File's Content Type  {/*set-type*/}
Method name: `setContentType`

Sets a file's content type to one of the standard MIME types.

Note the following:

-   If you attempting set content type on a directory, the call seems to succeed (returns 0) but in reality has no effect.
-   To use `setContentType` on an object, you must belong to the group that owns the object. To determine the group that owns the object, issue a `stat` call on the object, setting the `detail` parameter to `True`. Then look at the gid value from the results of the call. (See [Obtain File or Directory Metadata](Working With Directories and Files Common.htm#Obtain) for information about the stat function.)To determine your group, you must log in using the login function, setting the detail parameter to True. Then look at the `gid` value from the results of your call to `login`. If the two `gid` values match, you will be able to set the file's content type.

### Set Content Type Using Named Parameters {/*set-using-named-parameters*/}
```JSON
{
  "method": "setContentType",
  "id": 1,
  "params": {
    "token": "12086a82-eed2-4e83-a25b-514a55416b5b",
    "path": "/a/hi1.txt",
    "content_type": "text/plain"
  },
  "jsonrpc": "2.0"
}
```

### Set Content Type Using Positional Parameters {/*set-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "setContentType",
  "id": 0,
  "params": [
    "8c4b1dfc-d36d-4070-8221-f969bc040110",
    "/a/hi1.txt",
    "text/plain"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*set-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str | Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.    |
| path | str | File whose content type you want to set. |
| content\_type | str | Content type such as `text/plain`. See [Content Types](/delivery/storage/apis/reference_materials_content_types). |

### Return Codes {/*set-return-codes*/}
-   **0**: success
-   **\-1**: file does not exist or invalid object type
-   **\-3**: parent path does not exist
-   **\-6**: permission denied. Caller's uid does not exist or does not have permissions to path.
-   **\-8**: invalid path
-   **\-33**: invalid content type
-   **\-10001**: invalid token
<Callout type="info">For a list of error codes not specific to `setContentType`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*set-response-data*/}
Returns only the codes discussed in [Return Codes](#set-return-codes). Does not return any data structures.


### Python Sample Requests {/*set-python-sample-requests*/}
Set content type on cloud-storage-icon.png:

```Python
>>> api.setContentType(token, '/dir10/cloud-storage-icon.png', 'image/png')
0
```

## Generate a MediaVaultURL {/*mediavault*/}
Method name: `mediaVaultUrl`

Generates time-limited URLs you can use to download or preview a file. The time limit is enforced through an expiry time. All requests for the file using the URLs are refused when the expiry time has passed. The expiry time relates to the start of the HTTP GET request, so as long as the request is initiated before this time the download will be successful.

<Callout type="info">For additional information about MediaVault, please see the [MediaVault User Guide](/delivery/delivery/mediavault).</Callout>

### Generate MediaVault URL Using Named Parameters {/*generate-using-named-parameters*/}
```JSON
{
  "method": "mediaVaultUrl",
  "id": 1,
  "params": {
    "token": "d6835f68-7bd4-4a29-9c40-54fbaeeb2444",
    "path": "/TreesOfEurope/DeciduousTrees.txt",
    "expiry": 3600
  },
  "jsonrpc": "2.0"
}
```

### Generate MediaVault URL Using Positional Parameters {/*generate-vusing-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "mediaVaultUrl",
  "id": 1,
  "params": [
    "1ee13c07-1f50-4c05-8f89-d5779e17332b",
    "/TreesOfEurope/DeciduousTrees.txt",
    3600
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*generate-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |   Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| path | str | File to generate URL.<br /><br />The path does not have to exist, this is to support generating a URL prior to uploading an object. |
| expiry | int | Optional<br /><br />Download URL expiry for object in seconds.<br /><br />Must be in the range `1` to `2147483648`.<br /><br />If expiry is 0 or omitted, it defaults to `3600`. |

### Return Codes {/*generate-return-codes*/}
-   **0**: success
-   **\-1**: internal error
-   **\-2**: path exists and is a directory
-   **\-8**: invalid path
-   **\-34**: invalid expiry
-   **\-60**: service is disabled or unavailable
-   **\-10001**: invalid token

### Response Data {/*generate-response-data*/}
The method returns an object with the following data:

-   **code**: (int) return code
-   **download\_url**:(str) URL to use for downloading the file
-   **message**: description of **code**
-   **preview\_url**: (str) URL to use for previewing the file

Example:

```JSON
{
  "code": 0,
  "download_url": "http://cs-download.limelight.com/<path to file>",
  "message": "success",
  "preview_url": "http://cs-download.limelight.com/<path to file>",
}
```

### curl Sample Request {/*curl-sample-requests*/}
Generate MediaVault URLs for the example3.jpg file. This code first calls the ‘login’ method and extracts the token from the output. Next, the code issues the call for the MediaVault URL, passing the extracted token.


```
token=$(curl -v -X POST -H 'X-Agile-Username: yourUser' -H 'X-Agile-Password: yourPassword' 'https://[Account name]-l.upload.llnw.net/account/login' 2>&1 | grep X-Agile-Token: | awk -F ': ' '{print $2}' | tr -d '\r')
curl -v -k^

curl -d '{"jsonrpc": "2.0", "method": "mediaVaultUrl", "params": ["'$token'", "/example3.jpg", 300], "id": 1}' 'https://[Account name]-l.upload.llnw.net/jsonrpc'
```

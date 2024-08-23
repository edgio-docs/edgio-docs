---
title: Working with Methods Common to Files and Directories
---
The Origin Storage API provides methods that apply to both files and directories, such as renaming a file or directory. APIs for working with existing files are available in the JSON-RPC interface only.


## List Files and Directories   {/*list*/}
Method name: `listPath`

Lists both files and directories that are direct children of a given path. The method is not recursive and operates only on the given path.

### Using Named Parameters {/*using-named-parameters*/}
```JSON
{
  "method": "listPath",
  "id": 1,
  "params": {
    "token": "f03efb6a-c63c-4046-9bd9-d1cd8c36c10b",
    "path": "/a",
    "pageSize": 1,
    "cookie": "",
    "stat": true
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "listPath",
  "id": 0,
  "params": [
    "3984d225-286e-41b6-811a-99fcea4dd411",
    "/a",
    1,
    "",
    true
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| path | str | Directory for which you want to list files and directories. |
| pageSize | int | Optional<br /><br />The number of files and directories to return from a call to the method. Must be less than or equal to 10000.<br /><br />Defaults to 100. |
| cookie | str | On return, indicates whether additional files or directories can be returned with subsequent calls to the function.<br /><br />Pass an empty string the first time you call the function. For all subsequent calls, pass the cookie value returned from the prior call. After you have returned all files and directories, the returned cookie value is null.<br /><br />Defaults null |
| stat | bool | Optional<br /><br />Indicates whether to include file details in output.<br /><br />Defaults to `False` |

### Return Codes {/*return-codes*/}
-   **0**: success
-   **\-1**: path does not exist
-   **\-8**: malformed path
-   **\-11**: invalid cookie parameter
-   **\-12**: invalid page size parameter
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `listPath`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*response-data*/}
On success returns an object with the following data:

-   **code**: (int) return code. See [Return Codes](#return-codes) for specific values.
-   **cookie**: (str) base64-encoded string indicating whether additional files or directories can be returned with subsequent calls to the function. Non-null value: additional files or directories are available. Null value: no more files or directories are available.
-   **dirs**: an array of directory objects returned. The exact attributes in each object depends on whether you pass `True` or `False` for the stat parameter.
-   **files**: an array of directory objects returned. The exact attributes in each object depends on whether you pass `True` or `False` for the stat parameter.

When the stat parameter is set to `False`, the method returns the following data for each directory or file in the dirs and files lists respectively:

-   **name**: directory or file name

Example:

```JSON
{
  "code": 0,
  "cookie": "AAAAAAAAAAEAAAAAAAAAAQ\u003d\u003d",
  "dirs": [
    {
      "name": "steve"
    }
  ],
  "files": [
    {
      "name": "flat-irons.jpg"
    }
  ]
}
```

When the stat parameter is set to True, the method returns the following additional data:

-   **checksum**: (str) file's SHA-256 hexidecimal digest (files only)
-   **ctime**: (int) creation time in seconds since epoch
-   **gid**: (int) group ID of user that created the file or directory
-   **mimetype**: (str) file's MIME type. Example: text/plain (files only)
-   **mtime**: (int) last modification time in seconds since epoch
-   **size**: (int) file size in bytes (files only)
-   **uid**: (int) ID of user that created the file or directory

Example:

```JSON
{
  "code": 0,
  "cookie": "AAAAAAAAAAEAAAAAAAAAAQ\u003d\u003d",
  "dirs": [
    {
      "uid": 12020,
      "gid": 100,
      "name": "steve",
      "ctime": 1423258489,
      "mtime": 1423258489
    }
  ],
  "files": [
    {
      "uid": 12020,
      "gid": 100,
      "size": 659819,
      "name": "flat-irons.jpg",
      "checksum": "24a436b8a87462482806667b76ec5a120ae236a721c311a66235ad3cf4073bd4",
      "ctime": 1423676679,
      "mimetype": "image/jpeg",
      "mtime": 1423676671
    }
  ]
}
```

When you call the method on an empty directory, or after you have returned all files and directories and you call the method again, it returns the following:

```JSON
{
  "code": 0,
  "cookie": null,
  "dirs": [],
  "files": []
}
```

When you call the method on a directory with a file but no directory, the method returns the following:

```JSON
{
  "code": 0,
  "cookie": "AAAAAAAAAAAAAAAAAAAAAQ==",
  "dirs": [],
  "files": [
    {
      "name": "text-file.txt"
    }
  ]
}
```

Similarly, when you call the method on a directory with a sub-directory but no files, the method returns the following:

```JSON
{
  "code": 0,
  "cookie": "AAAAAAAAAAAAAAAAAAAAAQ==",
  "dirs": [
    {
      "name": "sub-dir"
    }
  "files": [],
  ]
}
```

On failure returns an object like the following, with code set to the appropriate value described in [Return Codes](#return-codes):

```JSON
{
  "code": -1
}
```

### Python Sample Requests {/*python-sample-requests*/}
Obtain and display formatted information about a directory specified by the variable `dirName`. Details include stat data.

```Python
import jsonrpclib, time

class StatError(RuntimeError):
  def __init__(self, arg):
    self.args = arg

class ListPathError(RuntimeError):
  def __init__(self, arg):
    self.args = arg

# User-Defined Variables
dirName = '/'
pageSize = 30

#Variables maintained by the application.
cookie = ''
numFiles = 0
numDirs = 0
totalBytes = 0

try:

  ##################################################
  # Retrieve directories and files in the directory.
  ##################################################
  while cookie is not None:
    res = api.listPath(token, dirName, pageSize, cookie, True)
    code = res['code']
    if code !=0:
      msg = 'Error issuing listPath command on directory: ' + dirName
      msg += '\n  Return code: ' + str( code )
      msg += '\n  See API documentation for details.'
      raise ListPathError( msg )

    numDirs  += len(res['dirs'])
    numFiles += len(res['files'])
    files = res['files']
    for f in files:
      totalBytes += f['size']
    cookie = res['cookie']

  ######################################
  # Get the directory's ctime and mtime.
  ######################################
  myStat = api.stat(token, dirName, True)
  code = myStat['code']
  if code != 0:
    msg = 'Error issuing stat command on directory: ' + dirName
    msg += '\nReturn code: ' + str( code ) + '\nSee API documentation for details.'
    raise StatError( msg )

  creationTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime( myStat['ctime'] ))
  modificationTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime( myStat['mtime'] ))

  ################################
  # Display directory information.
  ################################
  hdrSep    = '================================================='
  detailSep = '-------------------------------------------------'

  hdr = 'Information for Directory "' + dirName + '"'

  thisHdrSep = hdrSep
  if len( hdr ) > 49:
    while len( thisHdrSep ) < len( hdr ):
      thisHdrSep += thisHdrSep

  thisHdrSep = thisHdrSep[0: len(hdr)]

  print (thisHdrSep)
  print (hdr)
  print (thisHdrSep)
  print ('Total Directories:            ' + str( numDirs )
  print (detailSep
  print ('Total Files:                  ' + str( numFiles )
  print (detailSep
  print ('Total Size All Files (bytes): ' + str( totalBytes )
  print (detailSep
  print ('Directory Creation time:      ' + creationTime)
  print (detailSep)
  print ('Directory Modification time:  ' + modificationTime)
  print (detailSep)

except ListPathError,e:
  print (''.join( e.args ) )

except StatError,e:
  print (''.join( e.args ) )

finally:
  print ('\nLogging out...\n')
  res = api.logout(token)
  print ('Logout results: ' + str( res ) )
```

If you are interested in seeing the values in a cookie, use code like the following:

```
>>> import base64, struct
>>> cookie = api.listPath(token, '/', 2, None, True)['cookie']
>>> (dcookie, fcookie) = struct.unpack(">QQ", base64.b64decode(cookie))
>>> # View number of directories returned
>>> dcookie
2
>>> # View number of files returned
>>> fcookie
2
```

## Obtain File or Directory Metadata  {/*metadata*/}
Method name: `stat`

Obtains meta data such as creation time and last modified time for a specified file or directory.

### Using Named Parameters {/*obtain-using-named-parameters*/}
```JSON
{
  "method": "stat",
  "id": 1,
  "params": {
    "token": "46c939fa-7ab7-4ea6-b305-494d94c66e3a",
    "path": "/a/hi1.txt",
    "detail": true
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*obtain-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "stat",
  "id": 1,
  "params": [
    "46c939fa-7ab7-4ea6-b305-494d94c66e3a",
    "/a/hi1.txt",
    true
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*obtain-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| path | str | Directory or file for which to provide details. |
| detail | bool | Optional<br /><br />Indicates whether to Include file details in output.<br /><br />Defaults to `False` |

### Return Codes {/*obtain-return-codes*/}
-   **0**: success
-   **\-1**: directory or file does not exist
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `stat`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*obtain-response-data*/}
When the detail parameter is set to False, the method returns an object with the following data:

-   **code**: (int) return code
-   **ctime**: (int) creation time in seconds since epoch
-   **mtime**: (int) last modification time in seconds since epoch
-   **size**: (int) file size in bytes (files only)
-   **type**: (int) identifies the path type: 1 = directory, 2 = file

Example:

```JSON
{
  "code": 0,
  "size": 698666,
  "ctime": 1434579443,
  "mtime": 1450392160,
  "type": 2
}
```

When the `detail` parameter is set to True, the following additional data is returned:

-   **checksum**: (str) file’s SHA-256 hexadecimal digest. Empty string for directories
-   **gid**: (int) group ID of user that created the directory
-   **mimetype**: (str) file's MIME type (files only)
-   **uid**: (int) ID of user that created the file or directory

Example:

```JSON
{
  "uid": 12020,
  "code": 0,
  "gid": 100,
  "size": 698666,
  "checksum": "46cb29d05b447367e343143450ae1ca8cbe0080af225a8310c832be4ba64a096",
  "ctime": 1434579443,
  "mimetype": "image/jpeg",
  "mtime": 1450392160,
  "type": 2
}
```

On failure returns the following object with code set to the appropriate value described in [Return Codes](#obtain-return-codes):

```JSON
{
  "uid": 0,
  "code": -1,
  "gid": 0,
  "checksum": ""
}
```


### Python Sample Requests {/*obtain-python-sample-requests*/}
View meta data for a directory, including details. Note the empty string value for checksum.

```Python
api.stat(token, '/', True)
{
  "uid": 12020,
  "code": 0,
  "gid": 100,
  "checksum": "",
  "ctime": 1395777680,
  "mtime": 1395777680,
  "type": 1
}
```

View meta data for the /example2.jpg file, including details:

```api.stat(token, '/example2.jpg', True)```
```Python
{
  "uid": 12020,
  "code": 0,
  "gid": 100,
  "size": 4662,
  "checksum": "71ad472cbd384ef2a8a5f6f7bcc4d538fe22db162ed087548cda736eef9eb720",
  "ctime": 1433972816,
  "mimetype": "application/octet-stream",
  "mtime": 1431079057,
  "type": 2
}
```

## Rename a File or Directory {/*rename*/}
Method name: `rename`

Renames a file or directory. Note that you can use this method to move a file by specifying a different parent path in the newPath argument. Similarly, you can move a directory (if it is empty) to another parent directory.

When you rename a file or directory such that it gets moved to a new directory, the system sets the mtime (last modified time) of the old and new parent directories to the current system time.

When you rename a file or directory such that it stays in its current directory, the system sets the directory's mtime to the current system time.

Although Edgio provides APIs for deleting and renaming a directory, you can do so only if the directory contains no files or sub-directories. This is because the required background processes, such as re-applying policies and pushing maps out to Bricks, could potentially have a significant impact on the Origin Storage platform, causing latency in other operations.

If you are having trouble deleting or managing content with the existing supported management tools or via the API, please contact your account manager who will engage the Edgio Advanced Services team to work with you to achieve the desired results (additional charges may apply).

### Using Named Parameters {/*rename-using-named-parameters*/}

```JSON
{
  "method": "rename",
  "id": 3,
  "params": {
    "token": "6a1a559c-ae50-4f95-b270-b2dc8519b8fd",
    "oldpath": "/OldName.txt",
    "newpath": "/NewName.txt"
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*rename-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "rename",
  "id": 2,
  "params": [
    "cf725651-cfd0-43a5-8c52-5e113fe61bd2",
    "/OldName.txt",
    "/NewName.txt"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*rename-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| oldpath | str | Existing file or directory name, including full path |
| newpath | str | New file or directory name, including full path |

Note the following:

-   When renaming a file you must include the full path in the argument to newpath. Arguments to newpath that do not include a full path will be created in the root directory.
-   You cannot rename a directory that has files or sub-directories.
-   You cannot rename a file or directory to an existing name in an attempt to over-write the directory or file.

### Return Codes {/*rename-return-codes*/}
-   **0**: success
-   **\-1**: oldpath not found or attempt to rename a file or directory to its current name
-   **\-2**: newpath already exists
-   **\-3**: newpath parent directory does not exist
-   **\-6**: permission denied. Caller's uid does not exist or does not have permissions to oldpath.
-   **\-7**: operation not supported. Directory contains files or directories.
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `rename`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*rename-response-data*/}
Returns only the codes discussed in [Return Codes](#rename-return-codes). Does not return any data structures.


### Python Sample Requests {/*rename-python-sample-requests*/}
Rename the
```Python
>>> api.rename(token, '/auto1.jpg', '/auto3.jpg')
0
```
Rename the `floral-items` directory to `floral-accessories`:



```Python
>>> api.rename(token, '/floral-items', '/floral-accessories')
0
```

## Change a File or Directory Last Modification Time {/*change-time*/}
Method name: `setMTime`

Changes a file's or directory's last modification time.

### Using Named Parameters {/*change-using-named-parameters*/}
```JSON
{
  "method": "setMTime",
  "id": 1,
  "params": {
    "token": "d7320fa4-fd5b-4a4e-a1f9-187143f72d90",
    "path": "/a/hi1.txt",
    "mtime": 1461885068
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*change-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "setMTime",
  "id": 0,
  "params": [
    "bca3af0b-f417-4131-b28d-3ca4e35fa144",
    "/a/hi1.txt",
    1461942652
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*change-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| path | str | File or directory's whose last modification time you want to change |
| mtime | int | New modification time in seconds since epoch |



### Return Codes {/*change-return-codes*/}
-   **0**: success
-   **\-1**: file/directory does not exist or you passed an invalid object type
-   **\-5**: cannot acquire lock
-   **\-8**: invalid path
-   **\-27**: invalid mtime
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `setMTime`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*change-response-data*/}
Returns only the codes discussed in [Return Codes](#change-return-codes). Does not return any data structures.


### Python Sample Requests {/*change-python-sample-requests*/}
Change a file's modification time:


```Python
>>> api.setMTime(token, '/auto.jpg', 1450392160)
0
```
Change a directory's modification time:

```Python
>>> api.setMTime(token, '/picture', 1450392160)
0
```

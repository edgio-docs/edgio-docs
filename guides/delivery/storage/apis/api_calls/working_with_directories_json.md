---
title: Working with Directories in the JSON-RPC Interface
---

## Create a Directory {/*create-directory*/}
Method name: `makeDir`

Creates a directory but does not create leading path segments. (See [Create a Directory Along With Leading Paths](#leading-paths) if you want to create any non-existant leading paths for the new directory.)

If the directory is successfully created, the system sets the parent directory's mtime (last modified time) to the current system time.

<Callout type="info">A directory cannot contain a file and a sub-directory with the same name.</Callout>

### Create a Directory Using Named Parameters {/*reate-named-parameters*/}

```JSON
{
  "method": "makeDir",
  "id": 1,
  "params": {
    "token": "9dda5a3a-cb4d-48ee-9e4e-bce49f6bf7dc",
    "path": "/house2"
  },
  "jsonrpc": "2.0"
}
```

### Create a Directory Using Positional Parameters {/*create-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:


```JSON
{
  "method": "makeDir",
  "id": 1,
  "params": [
    "9dda5a3a-cb4d-48ee-9e4e-bce49f6bf7dc",
    "/MakeDirPosParamTest2"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*create-parameter-descriptions*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| path | str | The directory to create. If the directory has parent paths that do not exist, the method call fails. For example if you pass /a/b for path and a does not exist then the call fails. To create parent paths, see [Create a Directory Along With Leading Paths](#leading-paths).<br /><br /> You can't create a directory if the parent directory contains a file with the same name as the directory you want to create. Example: if file b exists in directory a then you can't create a directory called b in directory a.

You can create directories with any white space in the path, including spaces, new lines, carriage returns and horizontal tabs.

You must use the UNIX/Linux path separator `/`. If you use the Windows path separator `\` it becomes part of the name.

If you omit the path separator, the directory is created under the root.

Path segments can contain a maximum of 255 bytes. For more information, see [Path Segment and File Name Limitations](/delivery/storage/apis/reference_materials/path_segment_and_file_name_limitations).|

### Return Codes  {/*return-codes*/}
-   **0**: success
-   **\-1**: malformed path
-   **\-2**: path exists. Parent directory already contains a file with the same name as the directory you attempted to create.
-   **\-3**: parent path does not exist
-   **\-4**: internal error
-   **\-5**: internal error
-   **\-6**: permission denied. Caller’s uid does not exist or does not have permissions to path.
-   **\-8**: invalid or malformed path
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `makeDir`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*response-data*/}
Returns only the codes discussed in [Return Codes](#return-codes). Does not return any data structures.

#### Python Sample Requests {/*python-sample-requests*/}

Create `images` directory:

```Python
>>> api.makeDir(token, '/images')
0
```

## Create a Directory Along With Leading Paths  {/*leading-paths*/}
Method name: `makeDir2`

Creates a directory along with any parent paths that do not already exist.

If the directory is successfully created, the system sets the parent directory's mtime (last modified time) to the current system time.

<Callout type="info">A directory cannot contain a file and a sub-directory with the same name.</Callout>

### Create a Directory Using Named Parameters  {/*create-directory-using-named-parameters2*/}

```JSON
{
  "method": "makeDir2",
  "id": 3,
  "params": {
    "token": "613c28c6-6a1b-4938-9d5a-3a1e7feb98c6",
    "path": "/climate/asia"
  },
  "jsonrpc": "2.0"
}
```
### Create a Directory Using Positional Parameters  {/*create-directory-using-positional-parameters2*/}

Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "makeDir2",
  "id": 2,
  "params": [
    "0881fb22-f1cd-43a4-a7f2-f9ccb8fa55f9",
    "/climate/asia"
  ],
  "jsonrpc": "2.0"
}
```
#### Parameter Descriptions   {/*parameter-descriptions2*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| path | str | The directory to create. If the directory has parent paths that do not exist, the method call fails. For example if you pass /a/b for path and a does not exist then the call fails. To create parent paths, see [Create a Directory Along With Leading Paths](#leading-paths).<br /><br /> You can't create a directory if the parent directory contains a file with the same name as the directory you want to create. Example: if file b exists in directory a then you can't create a directory called b in directory a.

You can create directories with any white space in the path, including spaces, new lines, carriage returns and horizontal tabs.

You must use the UNIX/Linux path separator `/`. If you use the Windows path separator `\` it becomes part of the name.

If you omit the path separator, the directory is created under the root.

Path segments can contain a maximum of 255 bytes. For more information, see [Path Segment and File Name Limitations](/delivery/storage/reference_materials/path_segment_and_file_name_limitations).

### Return Codes  {/*return-codes*/}
-   **0**: success
-   **\-1**: malformed path
-   **\-2**: path exists. Parent directory already contains a file with the same name as the directory you attempted to create.
-   **\-3**: parent path does not exist
-   **\-4**: internal error
-   **\-5**: internal error
-   **\-6**: permission denied. Caller’s uid does not exist or does not have permissions to path.
-   **\-8**: invalid or malformed path
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `makeDir2`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*response-data2*/}
Returns only the codes discussed in [Return Codes](#return-codes). Does not return any data structures.

#### Python Sample Requests {/*python-sample-requests2*/}
The EMEA directory does not currently exist. Create it along with the flowers directory.

```JSON
>>> api.makeDir2(token, 'EMEA/flowers')
0
```
## Delete a Directory   {/*delete-directory*/}
Method name: `deleteDir`

Deletes a directory. If the directory is successfully deleted, the system sets the parent directory's mtime (last modification time) to the current system time.

Although Edgio provides APIs for deleting and renaming a directory, you can do so only if the directory contains no files or sub-directories. This is because the required background processes, such as re-applying policies and pushing maps out to Bricks, could potentially have a significant impact on the Origin Storage platform, causing latency in other operations.

If you are having trouble deleting or managing content with the existing supported management tools or via the API, please contact your account manager who will engage the Edgio Advanced Services team to work with you to achieve the desired results (additional charges may apply).

### Delete a Directory Using Named Parameters {/*delete-a-directory-using-named-parameters*/}

```JSON
{
  "method": "deleteDir",
  "id": 2,
  "params": {
    "token": "c880eae3-49bd-4dbd-91c4-05eaa0a3c598",
    "path": "/tempDelete"
  },
  "jsonrpc": "2.0"
}
```
### Delete a Directory Using Positional Parameters {/*delete-a-directory-using-positional-parameters*/}

Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
 "method": "deleteDir",
 "id": 1,
 "params": [
  "024e3b1e-d808-4f67-a7b8-5bf432169721",
  "/tempDelete"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions  {/*delete-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str | Valid token from a call to login (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| path | str | Directory to delete |

### Return Codes {/*delete-return-codes*/}
-   **0**: success
-   **\-1**: directory does not exist
-   **\-5**: other unspecified error
-   **\-6**: permission denied. Caller's user ID does not exist, or caller's user ID does not have permissions to path.
-   **\-7**: operation not permitted. The directory contains sub-directories or files.
-   **\-10001**: invalid token

### Response Data {/*delete-responose-data*/}

Returns only the codes discussed in [Return Codes](#delete-return-data). Does not return any data structures.

### Python Sample Requests {/*delete-python*/}
Delete the temp directory:

```Python
>>> api.deleteDir(token, '/temp')
0
```

Attempt to delete a directory with sub-directories:

```Python
# First create the directory.
>>> api.makeDir2(token, '/has-sub-dirs/sub-dir')
0
# Now attempt to delete it.
>>> api.deleteDir(token, '/has-sub-dirs')
-7
```

## List Directories  {/*list-directory*/}
Method name: `listDir`

Lists directories that are direct children of a given path. Includes the ability to limit the number of directories returned as well as the ability to include directory details such as creation and modification time. The method is not recursive and operates only on the given path.

### List Directories Using Named Parameters {/*list-using-named-parameters*/}
```JSON
{
  "method": "listDir",
  "id": 1,
  "params": {
    "token": "fd64425a-20b2-4979-bff0-a6923f5325fb",
    "path": "/",
    "pageSize": 1,
    "cookie": 0,
    "stat": true
  },
  "jsonrpc": "2.0"
}
```
### List Directories Using Positional Parameters {/*list-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "listDir",
  "id": 0,
  "params": [
    "c24929c1-2aaf-4c94-975b-bc886a393869",
    "/",
    5,
    0,
    true
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*list-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str | Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| path | str | Directory path whose sub-directories you want to list. |
| pageSize | int | Optional<br /><br />The number of directories to return from a call to the method. Must be less than or equal to 10000.<br /><br />Defaults to 100. |
| cookie | uint64 | Optional<br /><br />On return, indicates whether additional directories can be returned with subsequent calls to the function.<br /><br />Pass 0 the first time you call the function. For all subsequent calls, pass the cookie value returned from the prior call.<br /><br />Defaults to 0. |
| stat | bool | Optional<br /><br />Include file details in output. Pass `True` or `False`. See [Response Data](#list-response-data) for more information.<br /><br />Defaults to `False`. |

### Return Codes {/*list-return-codes*/}
-   **0**: success
-   **\-1**: path does not exist
-   **\-11**: invalid cookie
-   **\-12**: invalid pageSize
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `listDir`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*list-response-data*/}
When the stat parameter is set to False, the method returns an object with the following data:

-   **code**: (int) return code
-   **cookie**: (uint64) indicates whether additional directories can be returned with subsequent calls to the function. Non-zero value: additional directories are available. Zero value: no more directories are available.
-   **list**: array of directory objects. Data for each object is:
    -   **name**: (str) directory name
    -   **type**: (int). Always 1 (directory)

<Callout type="info">The order in which directories are returned is non-deterministic. Results are not sorted.</Callout>

Example:

```JSON
{
  "code": 0,
  "cookie": 2,
  "list": [
    {
      "name": "picture",
      "type": 1
    },
    {
      "name": "video",
      "type": 1
    }
  ]
}
```
When the stat parameter is set to True, the following additional parameters will be returned under a stat key for each directory listed:

-   **ctime**: (int) creation time in seconds since epoch
-   **gid**: (int) group ID of user that created the directory
-   **mtime**: (int) last modification time in seconds since epoch
-   **uid**: (int) ID of user that created the directory

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
        "ctime": 1423257988,
        "mtime": 1423257988
      },
      "name": "picture",
      "type": 1
    }
  ]
}
```
### Python Sample Requests {/*list-python*/}
Pass only required arguments:

```Python
api.listDir(token, '/')

 { "code": 0,
  "cookie": 3,
  "list": [
    {
      "name": "picture",
      "type": 1
    },
    {
      "name": "video",
      "type": 1
    },
    {
      "name": "dir10",
      "type": 1
    }
  ]
}
```

Details returned when you pass True for the stat parameter:

```Python
api.listDir(token, '/', 1, 0, True)

{
  "code": 0,
  "cookie": 1,
  "list": [
    {
      "stat": {
        "uid": 12020,
        "gid": 100,
        "ctime": 1423257988,
        "mtime": 1423257988
      },
      "name": "picture",
      "type": 1
    }
  ]
}
```

Loop through all directories in chunks of four and print directory names.

```Python
# User-defined variables
dir = '/'
pageSize = 4


def printDirs( dirList ):
    global hasDirs
    for ( item ) in dirList:
        hasDirs = True
        print item['name']

hasDirs = False
results = api.listDir( token, dir, pageSize, False )

print 'Sub-directories in directory "' + dir + '":'
printDirs( results['list'] )
cookie = results['cookie']

while ( cookie > 0 ):
    results = api.listDir( token, dir, pageSize, cookie, False )
    printDirs( results['list'] )
    cookie = results['cookie']

if not hasDirs:
    print '**No sub-directories'
```

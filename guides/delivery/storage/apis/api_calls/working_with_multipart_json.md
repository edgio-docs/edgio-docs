---
title: Working with Multipart Uploads in the JSON-RPC Interface
---
The only multipart capability not present in the JSON-RPC interface is the ability to add pieces to a multipart upload, which is in the HTTP interface only. See [Create a Multipart Piece](/delivery/storage/apis/api_calls/working_with_multipart_http/#create-multipart-piece) for information.

For general information about multipart uploads, see [Uploading Files — Multipart](/delivery/storage/apis/api_calls/uploading_files_multipart).

As you read the information in the following sections, keep in mind the caveats mentioned in [Some Notes About Multipart Uploads](/delivery/storage/apis/api_calls/uploading_files_multipart/#notes).

See [Code Samples](#Code) for code samples.

## Begin a Multipart Upload {/*begin-multipart-upload*/}
Method name: createMultipart

Initiates a multipart upload and returns an upload ID. The ID associates all parts in the upload and must be used each time you create a piece for the upload. You also include the ID in the final request to complete or abort the multipart upload request.

The final destination file will not be created until you have added pieces to, and completed, the upload.

- An error will be returned if any parent directories does not exist. To create parent paths, you can use either:

- the makeDir2 API in the JSON RPC interface (see [Create a Directory Recursively]) or:
the post/directory API in the HTTP interface (see [Create a Directory](/delivery/storage/apis/api_calls/working_with_directories_http)(/delivery/storage/apis/api_calls/working_with_directories_json/#leading-paths))

### Using Named Parameters {/*using-named-parameters*/}
```JSON
{
  "method": "createMultipart",
  "id": 1,
  "params": {
    "token": "c1455871-507e-4ceb-b01f-cb80208118a4",
    "path": "/Multipart10",
    "content_type": "text/plain",
    "mtime": 1461947066
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "createMultipart",
  "id": 1,
  "params": [
    "819c8567-175a-4e66-bd85-10b2e1dbf8e4",
    "Multipart10",
    "text/plain",
    1464896993
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*parameter-descriptions*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| path | str | The destination file and path for the final object once the mutlipart upload is completed. |
| content\_type | str | Optional<br /><br />MIME type. Example: `image/gif`<br /><br />If you don't pass a content type or if you pass an empty string, the API will derive the content type based on the file extension you passed for the path argument.<br /><br />If you do not pass a value for content type and the value you passed for path did not have an extension, then the `content_type name-value` pair will be absent from the output of calls to `listMultipart` and `getMultipartStatus`. (See [List Your Multipart Uploads](#list-multipart) and [Get Status for a Multipart Upload](#get-status) respectively.)<br /><br />See also [Content Types](/delivery/storage/apis/reference_materials/content_types).<br /><br />Defaults to an empty string |
| mtime | int | Optional<br /><br />File last modification time in seconds since epoch<br /><br />Defaults to 0 (current time) |

### Return Codes {/*return-codes*/}
-   **0**: success
-   **\-1**: You have exceeded the maximum number of mulitpart uploads (1,000,000) that have not been completed or aborted.
-   **\-16**:  invalid path (path too long). See [Path Segment and File Name Limitations](/delivery/storage/apis/reference_marterials/path_segment_and_file_name_limitations).
-   **\-20**:  invalid last modified time
-   **\-21**: invalid content type
-   **\-23**: parent directory does not exist or is invalid. One or more parent segments in the path argument do not exist.
-   **\-27**: internal server error
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `createMultipart`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*response-data*/}



On success returns an object with the following data:

-   **code**: (int) return code; zero indicates success, non-zero indicates failure
-   **mpid**: (str) multipart upload ID you can use in subsequent requests such as getting status for the mulipart upload

Example:

```JSON
{
  "code": 0,
  "mpid": "fe275a9692b146a281f054063d8832bd"
}
```

On failure returns an object like the following, with code set to the appropriate value described in Return Codes:

```JSON
{
  "code": -23
}
```

### Python Sample Requests {/*python-sample-requests*/}
Create a multipart upload where the destination file will be in the /open-source-novels directory. Specify the content type and mtime yourself:

```Python
>>> api.createMultipart(token, "/open-source-novels/million-page-novel", "text/plain", 1437426380)
{"code": 0, "mpid": "2bb1fec7909d4f4ebca888176d58c402"}
```

Create a multipart upload where the destination file will be in the /movies directory, will have a content type that defaults to video/mpeg, and will have a last modification time that defaults to the current time.

```Python
>>> api.createMultipart(token, '/movies/rock-climbing.mpg')
{"code": 0, "mpid": "fe275a9692b146a281f054063d8832bd"}
```

## Get Status for a Multipart Upload {/*get-status*/}
Method name: `getMultipartStatus`

Gets the state of a multipart upload (new, ready, complete, and so on).

### Using Named Parameters {/*get-status-using-named-parameters*/}
```JSON
{
  "method": "getMultipartStatus",
  "id": 2,
  "params": {
    "token": "eacfb76b-c9eb-45e7-8723-37ed5428dafa",
    "mpid": "a8109827cd2544f28142d469ce78c587"
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*get-status-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "getMultipartStatus",
  "id": 1,
  "params": [
    "b062d5e2-626b-4717-90bd-8d7410948e0e",
    "a8109827cd2544f28142d469ce78c587"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*get-status-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |   Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| mpid | str |
Multipart upload identifier from a prior call to createMultipart or /multipart/create. See Begin a Multipart Upload (JSON-RPC) and [Begin a Multipart Upload (JSON-RPC) Upload](#begin-multipart-upload) and [Begin a Multipart Upload (HTTP)](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload), respectively.   |

### Return Codes {/*get-status-return-codes*/}

-   **0**: success
-   **\-2**: You passed an invalid value for the mpid parameter.
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `getMultipartStatus`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*get-status-response-data*/}
On success returns an object with the following data:

-   **code**: (int) return code
-   **content\_type**: (str) MIME type. Example: image/gif
-   **created**: (int) file creation time in seconds since epoch
-   **error**: (int) error reason, or 0 if no errors occurred
-   **mtime**: (int) last modification time in seconds since epoch
-   **numpieces**: (int) number of pieces in the multipart upload
-   **path**: (str) the destination file and path
-   **state**: (int) state of the multipart upload. See [Multipart Upload State Codes](/delivery/storage/apis/reference_materials/multipart_state_codes) and [Get String Equivalents of Multipart Status Codes](#get-equivalent).

Example:
```JSON
{
  "path": "/{your Account name}/open-source-novels/million-page-novel",
  "code": 0,
  "content_type": "text/plain",
  "numpieces": 0,
  "created": 1437429243,
  "state": 1,
  "mtime": 1437426380,
  "error": 0
}
```

On failure returns an object like the following, with code set to the appropriate value described in [Return Codes](#get-status-return-codes):

```JSON
{
  "code": -2
}
```

<Callout type="info">When you created the multipart upload, if you did not pass a value for content type and the value you passed for path did not have a file extension, then the `content_type name-value` pair will be absent from the output.</Callout>



### Python Sample Requests {/*get-status-python-sample-requests*/}
Get the status for multipart upload 2bb1fec7909d4f4ebca888176d58c402.

```Python
>>> api.getMultipartStatus(token, "2bb1fec7909d4f4ebca888176d58c402")
{u'code': 0, u'created': 1437429243, u'mtime': 1437426380, u'numpieces': 2, u'state': 2, u'content_type': u'text/plain', u'error': 0, u'path': u'/{your Account name}/open-source-novels/million-page-novel'}
```


## Get String Equivalents of Multipart Status Codes {/*get-equivalent*/}
For either mulipart uploads or multipart pieces, gets all possible status codes and their string equivalents. This is useful for programmatically getting string values for the states that are returned from calls to the following methods:

-   `getMultipartStatus` (see [Get Status for a Multipart Upload](#get-status))
-   `listMultipartPiece` (see [List Pieces in a Multipart Upload](#list-pieces))
-   `listMultipart` (see [List Your Multipart Uploads](#list-multipart))

### Using Named Parameters {/*get-string-using-named-parameters*/}
```JSON
{
  "method": "getMultipartStatusMap",
  "id": 2,
  "params": {
    "token": "95bac558-bef9-4c6c-a278-39fe2663b984",
    "name": "upload"
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*get-string-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.


```JSON
{
  "method": "getMultipartStatusMap",
  "id": 1,
  "params": [
    "1a72bc74-b409-4e46-8cf6-1c1b56bd4666",
    "upload"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*get-string-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively. |
| name | str | Optional<br /><br />Indicates the state codes you want. Valid values:<br /><br />**'upload'**: get codes for multipart uploads<br /><br />**'piece'**: get codes for mulipart pieces<br /><br />Defaults to 'upload' |

### Return Codes {/*get-string-return-codes*/}
-   **0**: success
-   **\-19**: invalid value for name parameter
-   **\-10001**: invalid value for token parameter

<Callout type="info">For a list of error codes not specific to `getMultipartStatusMap`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*get-string-response-data*/}
On success returns an object with the following data:

-   **code**: (int) return code; zero indicates success, non-zero indicates failure
-   **map**: an object that contains codes, each mapped to a descriptive name. The exact values depend on the value you pass for the name parameter. See [Multipart State Codes](/delivery/storage/apis/reference_materials/multipart_state_codes) for descriptions of values in the map.

Example of states returned for multipart uploads:

```JSON
{
  "code": 0,
  "map": {
    "11": "EXPIRED",
    "0": "UNKNOWN",
    "12": "FAILED",
    "1": "NEW",
    "2": "READY",
    "3": "COMPLETE",
    "5": "JOIN",
    "6": "SUCCESS",
    "8": "DELETED",
    "9": "ERROR",
    "10": "ABORT"
  }
}
```

Example of states returned for a multipart piece:


```JSON
{
  "code": 0,
  "map": {
    "11": "ABORT",
    "0": "UNKNOWN",
    "12": "EXPIRED",
    "1": "NEW",
    "13": "FAILED",
    "5": "JOIN",
    "6": "SUCCESS",
    "8": "DELETED",
    "9": "ERROR",
    "10": "SKIPPED"
  }
}
```

On failure returns an object like the following, with code set to the appropriate value described in Return Codes:


```JSON
{
  "code": -19
}
```
### Python Sample Requests {/*get-string-python-sample-requests*/}
Get states for multipart uploads:

```Python
{
  "method": "listMultipart",
  "id": 2,
  "params": {
    "token": "ffea4fab-abd9-438d-a700-232af6dc9fb9",
    "cookie": 0,
    "pagesize": 5
  },
  "jsonrpc": "2.0"
}
```
Get states for multipart upload pieces:

```Python
>>> api.getMultipartStatusMap(token, 'upload')

{"map": {"11": "EXPIRED", "0": "UNKNOWN", "12": "FAILED", "1": "NEW", "2": "READY", "3": "COMPLETE", "5": "JOIN", "6": "SUCCESS", "8": "DELETED", "9": "ERROR", "10": "ABORT"} "code": 0,}
```

Get states for multipart upload pieces:

```Python
>>> api.getMultipartStatusMap(token, 'piece')

{u'map': {u'11': u'ABORT', u'10': u'SKIPPED', u'13': u'FAILED', u'12': u'EXPIRED', u'1': u'NEW', u'0': u'UNKNOWN', u'5': u'JOIN', u'6': u'SUCCESS', u'9': u'ERROR', u'8': u'DELETED'}, u'code': 0}
```

See [Multipart State Codes](/delivery/storage/apis/reference_materials/multipart_state_codes) for descriptions of values in the maps in the preceding examples.

## List Your Multipart Uploads {/*list-multipart*/}
Method name: `listMultipart`

Lists all multipart uploads that were created by your user.

### Using Named Parameters {/*list-multipart-using-named-parameters*/}
```JSON
{
  "method": "listMultipart",
  "id": 2,
  "params": {
    "token": "ffea4fab-abd9-438d-a700-232af6dc9fb9",
    "cookie": 0,
    "pagesize": 5
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*list-multipart-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "listMultipart",
  "id": 0,
  "params": [
    "1c3d7040-6809-41ce-9cfa-771abe304f64",
    0,
    5
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*list-multipart-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.   |
| cookie | int | Optional<br /><br />Tracks the number of multipart uploads that have been returned to the caller. Omit this argument or pass 0 the first time you call the function. For all subsequent calls, pass the cookie value returned from the prior call. Defaults to 0. |
| pagesize | int | Optional<br /><br />The number of mulipart uploads to return from each call to the method.<br /><br />Defaults to 100. |

### Return Codes {/*list-multipart-return-codes*/}

-   **0**: success
-   **\-3**: invalid cookie
-   **\-14**: invalid pagesize
-   **\-10001**: invalid value for token parameter

<Callout type="info">For a list of error codes not specific to `listMultipart`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*list-multipart-response-data*/}
On success returns an object with the following data:

-   **code**: (int) return code; zero indicates success, non-zero indicates failure
-   **cookie**: (int) number of results returned
-   **multipart**: array of multipart objects. Data for each object is:
    -   **content\_type**: (str) MIME type. Example: image/gif<sup>1</sup>
    -   **error**: (int) error (if any) that occurred when the multipart upload was created
    -   **gid**: (int) group ID of caller that created the multipart upload
    -   **mpid**: (str) multipart identifier assigned when the multipart upload was created
    -   **mtime**: (int) last modification time in seconds since epoch
    -   **path**: (str) multipart upload destination file and path
    -   **state**: (int) status of the multipart upload. See [Multipart Upload State Codes](/delivery/storage/apis/reference_materials/multipart_state_codes) and [Get String Equivalents of Multipart Status Codes](#get-equivalent)
    -   **uid**: (int) ID of the user that created the multipart upload

Example:

```JSON
{
  "code": 0,
  "cookie": 2,
  "multipart": [
    {
      "uid": 12020,
      "path": "/{your Account name}/multipart/multipart4.txt",
      "gid": 100,
      "content_type": "text/plain",
      "state": 1,
      "mtime": 1537165142,
      "error": 0,
      "mpid": "93b19d0c7e0d4669a01a5c0b2eba9513"
    },
    {
      "uid": 12020,
      "path": "/{your Account name}/open-source-novels/thousand-page-novel.txt",
      "gid": 100,
      "content_type": "text/plain",
      "state": 1,
      "mtime": 1437426380,
      "error": 0,
      "mpid": "5b45cfeb127049d7a74bea389ee4a0b6"
    }
  ]
}
```

<sup>1</sup>When you created the multipart upload, if you did not pass a value for content type and the value you passed for path did not have a file extension, then the content_type name-value pair will be absent from the output.

On failure returns an object like the following, with code set to the appropriate value described in [Return Codes](#list-pieces-return-codes):

```JSON
{
  "code": -3
}
```

### Python Sample Requests {/*list-multipart-python-sample-requests*/}
Display the pieces in multipart uploads that are in states specified by the variable desiredStates. Demonstrates how to use `listMultipart`, `listMultipartPiece`, and `getMultipartStatusMap`.

```Python
import jsonrpclib

# Exceptions

class ListMultipartError(RuntimeError):
  def __init__(self, arg):
    self.args = arg

class ListMultipartPieceError(RuntimeError):
  def __init__(self, arg):
    self.args = arg

class GetStatusMapError(RuntimeError):
  def __init__(self, arg):
    self.args = arg


# User-Defined Variables
# -----------------------------------
desiredStates = [8,11] #States to look for.

# Functions
# -----------------------------------

def getUploadDescr( code ):
  result = uploadMap['map'][ str(code) ]
  return result

def getPieceDescr( code ):
  result = pieceMap['map'][ str(code) ]
  return result


def printMultipart( theList ):
  print ('Length of list: ' + str( len(theList) ))
  for i in range( len(theList) ):
    print (theList[i]['path'])

def getPieces( mpid ):
  piecesRet = []
  pageSize = 1000

  mPieceResults  = api.listMultipartPiece( token, mpid, 0, pageSize )
  code = mPieceResults['code']
  if code != 0:
    msg ='Error getting pieces for multipart upload ' + mpid + '\n  Return code: ' + str( code ) + '\n  See API documentation for details.'
    raise ListMultipartPieceError( msg )
  piecesRet += mPieceResults['pieces']
  cookie = mPieceResults['cookie']

  while ( cookie !=0 ):
    mPieceResults  = api.listMultipartPiece( token, mpid, cookie, pageSize )
    code = mPieceResults['code']
    if code != 0:
      msg ='Error getting pieces for multipart upload ' + mpid + '\n  Return code: ' + str( code ) + '\n  See API documentation for details.'
      raise ListMultipartPieceError( msg )
    piecesRet += mPieceResults['pieces']
    cookie = mPieceResults['cookie']

  return piecesRet

# Main Processing
# -----------------------------------
try:
  hdrSep    = '================================================='

  #Create upload state map
  uploadMap = api.getMultipartStatusMap(token, 'upload')
  if uploadMap['code'] != 0:
    msg ='Error getting multipart upload status map.'
    msg += '\nReturn code: ' + str( res )
    msg += '\nSee API documentation for details.'
    raise GetStatusMapError( msg )

  #Create piece state map
  pieceMap = api.getMultipartStatusMap(token, 'piece')
  if pieceMap['code'] != 0:
    msg ='Error getting multipart upload status map.'
    msg += '\nReturn code: ' + str( res )
    msg += '\nSee API documentation for details.'
    raise GetStatusMapError( msg )

  #######################
  # Get multipart uploads
  #######################
  pageSize = 10

  print ('Multipart uploads')
  print ('-----------------')
  mUploadResults = api.listMultipart(token, 0, pageSize)
  cookie = mUploadResults['cookie']
  print ('cookie: ' + str(cookie))

  while cookie != 0:
    code = mUploadResults['code']
    if code != 0:
      msg ='Error calling listMultipart.'
      msg += '\nReturn code: ' + str( code )
      msg += '\nSee API documentation for details.'
      raise ListMultipartError( msg )

    multipartList = mUploadResults['multipart']

    ############################################################################
    #Go through the mulipart upload list, checking if status is in desiredStates
    ############################################################################
    for i in range( len( multipartList ) ):
      # upload's state
      state = multipartList[i]['state']
      if state in desiredStates:
        path = multipartList[i]['path']
        thisHdrSep = hdrSep
        if len( path ) > 49:
          while len( thisHdrSep ) < len( path ):
            thisHdrSep += thisHdrSep

        thisHdrSep = thisHdrSep[0: len( path )]
        print ('')
        print (thisHdrSep)
        print (path)
        print (thisHdrSep)
        descr = getUploadDescr(state))
        mpid = multipartList[i]['mpid']
        print ('Multipart ID:    ' + mpid)
        print ('Multipart State: ' + str( state ) + ' (' + descr + ')' )

        ####################################
        #List pieces in the multipart upload
        ####################################
        pieces = []
        pieces = getPieces( mpid )
        print ('')
        print ('{0:5s} {1:16s} {2:10s} {3:3s}'.format('Piece', '| State', '| Size', '| Error'))
        print ('------|----------------|----------|------')
        for j in range( len( pieces ) ):
          p = pieces[j]
          pieceNum        = str( p['number'])
          state           = p['state']
          descr           = getPieceDescr( state)
          pieceStateDescr = '| ' + str(state) + ' (' + descr + ')'
          pieceSize       = '| ' + str(p['size'])
          pieceError      = '| ' + str(p['error'])
          print ('{0:5s} {1:16s} {2:10s} {3:3s}'.format( pieceNum, pieceStateDescr, pieceSize, pieceError  ))

    mUploadResults = api.listMultipart(token, cookie, pageSize)
    cookie = mUploadResults['cookie']

except LoginError,e:
  print (''.join( e.args ) )

except ListMultipartError,e:
  print (''.join( e.args ))

except ListMultipartPieceError,e:
  print (''.join( e.args ))

except GetStatusMapError,e:
  print (''.join( e.args ))

finally:
  print ('\nLogging out')
  res = api.logout(token)
  if res != 0:
    msg = 'Error logging out.'
    msg += '\nReturn code: ' + str( res )
    msg += '\nSee API documentation for details.'
    print (msg)
```
## List Pieces in a Multipart Upload {/*list-pieces*/}
Method name: `listMultipartPiece`

Lists pieces in a specified multipart upload along with information such as state and size. Pieces are listed in the order that they were added to the multipart upload. Duplicate pieces are included in the listing; for example if you added piece number 2 twice, both pieces are visible in the output.

### Using Named Parameters {/*list-pieces-using-named-parameters*/}
```JSON
{
  "method": "listMultipartPiece",
  "id": 1,
  "params": {
    "token": "282edeb9-b2b7-4f19-a879-dd9e8b8b4d22",
    "mpid": "a8109827cd2544f28142d469ce78c587",
    "cookie": 0,
    "pagesize": 5
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*list-pieces-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.


```JSON
{
  "method": "listMultipartPiece",
  "id": 0,
  "params": [
    "a991c836-28c6-4584-948d-3ea5c6a9b7d5",
    "91842e50903b4251848e32b67d8d7137",
    0,
    5
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*list-pieces-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.  |
| mpid | str |   Multipart upload identifier from a prior call to createMultipart or /multipart/create. See Begin a Multipart Upload (JSON-RPC) and [Begin a Multipart Upload (JSON-RPC) Upload](#begin-multipart-upload) and [Begin a Multipart Upload (HTTP)](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload), respectively.   |
| cookie | int | Optional<br /><br />Tracks the progress of calls to `multipartPiece` for a given multipart upload identifier.<br /><br />Omit this argument or pass 0 the first time you call the function. For all subsequent calls, pass the cookie value returned from the prior call.<br /><br />Defaults to 0 |
| pagesize | int | Optional<br /><br />The number of pieces to return from each call to the method.<br /><br />Defaults to 100. |

### Return Codes {/*list-pieces-return-codes*/}
-   **0**: success
-   **\-2**: invalid multipart upload identifier
-   **\-3**: invalid cookie
-   **\-14**: invalid page size
-   **\-26**: multipart services down or unavailable
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `listMultipartPiece`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*list-pieces-response-data*/}
On success returns an object with the following data:

-   **code**: (int) return code; zero indicates success, non-zero indicates failure
-   **cookie**: (int) ID of the last piece returned, or zero if all results have been returned. Use this value when you are making successive calls to the method rather than attempting to return all pieces at once. See [Successively list the pieces in a multipart upload](#list-pieces).
-   **pieces**: array of multipart pieces. Data for each piece is:

    -   **error**: (int) error (if any) that occurred when the multipart upload piece was added
    -   **number**: (int) piece (part) number assigned to the piece when it was added to the multipart upload. See [Create a Multipart Piece](Working with Multipart HTTP.htm#Create2).
    -   **size**: (int) size of the piece in bytes
    -   **state**: (int) status of the piece. See [Multipart Upload State Codes](/delivery/storage/apis/reference_materials/multipart_state_codes) and [Get String Equivalents of Multipart Status Codes](#get-equivalent).

After all pieces have been returned, **pieces** is an empty array.

If you pass a page size that is equal to the number of pieces in the multipart upload, the method returns all pieces in the upload but you must call the method a final time before the returned cookie is zero.

Example results from calling the function, requesting one piece from a multipart upload with multiple pieces:

### Python Sample Requests {/*list-pieces-python-sample-requests*/}

## Restart a Multipart Upload {/*restart*/}
Method name: `restartMultipart`

Restarts a failed multipart upload. You can restart a multipart upload only if it is in the FAILED state (code = 12) and was created after the most recent time that the garbage collector ran.

### Using Named Parameters {/*restart-using-named-parameters*/}
```JSON
{
  "method": "restartMultipart",
  "id": 1,
  "params": {
    "token": "b248ccfc-fa9c-418a-a647-43dceee99340",
    "mpid": "91842e50903b4251848e32b67d8d7137"
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*restart-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.


```JSON
{
  "method": "restartMultipart",
  "id": 0,
  "params": [
    "b2784388-0b14-431c-ac1d-e4f830ae7756",
    "91842e50903b4251848e32b67d8d7137"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*restart-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.    |
| mpid | str | Multipart upload identifier from a prior call to createMultipart or /multipart/create. See Begin a Multipart Upload (JSON-RPC) and [Begin a Multipart Upload (JSON-RPC) Upload](#begin-multipart-upload) and [Begin a Multipart Upload (HTTP)](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload), respectively.     |

### Return Codes {/*restart-return-codes*/}
-   **0**: success
-   **\-2**: invalid multipart upload identifier
-   **\-22**: unable to restart the multipart upload; upload was not in a suitable state
-   **\-10001**: invalid value for token parameter

<Callout type="info">For a list of error codes not specific to `restartMutlipart`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*restart-response-data*/}
Returns only the codes discussed in [Return Codes](#restart-return-codes). Does not return any data structures.

### Python Sample Requests {/*restart-python-sample-requests*/}
Successfully restart a multipart piece:

```Python
>>> api.restartMultipart(token, 'eaeb1484045a48d1b23bf02ef43a2165')

0
```

Attempt to restart a multipart piece that is in SUCCESS state (an unsuitable state to be restarted):


```Python
>>> api.restartMultipart(token, 'eaeb1484045a48d1b23bf02ef43a2165')

0
```

## Complete a Multipart Upload {/*complete*/}
Method name: `completeMultipart`

Completes a multipart upload, assembling the associated pieces into a final file.

When the file creation is complete, the system sets the parent directory's mtime (last modification time) to the current system time.

### Using Named Parameters {/*complete-using-named-parameters*/}
```JSON
{
  "method": "completeMultipart",
  "id": 1,
  "params": {
    "token": "2e31a024-a37d-49fb-9985-40eba7d61caa",
    "mpid": "91842e50903b4251848e32b67d8d7137"
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*using-positional-parameters*/}
```JSON
{
  "method": "completeMultipart",
  "id": 0,
  "params": [
    "d87b65ab-df84-46e5-aa49-27e85c6ad6f5",
    "91842e50903b4251848e32b67d8d7137"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*using-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.    |
| mpid | str | Multipart upload identifier from a prior call to createMultipart or /multipart/create. See Begin a Multipart Upload (JSON-RPC) and [Begin a Multipart Upload (JSON-RPC) Upload](#begin-multipart-upload) and [Begin a Multipart Upload (HTTP)](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload), respectively.     |

### Return Codes {/*using-return-codes*/}
-   **0**: success
-   **\-2**: invalid multipart upload identifier
-   **\-4**: the multipart upload does not have any parts
-   **\-5**: the multipart upload is missing some pieces. (The range of piece numbers is not contiguous.)
-   **\-8**: the multipart upload has already been completed or has been deleted or expired
-   **\-17**: the multipart upload has been aborted
-   **\-10001**: invalid value for token parameter

<Callout type="info">For a list of error codes not specific to `completeMultipart`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*using-response-data*/}
On success returns an object with the following data:

-   **code**: (int) return code; zero indicates success, non-zero indicates failure
-   **numpieces**: (int) number of pieces in the multipart upload

Example:
```JSON
{
  "code": 0,
  "numpieces": 1
}
```
On failure returns an object like the following, with code set to the appropriate value described in Return Codes:


```JSON
{
  "code": -4
}
```


### Python Sample Requests {/*using-python-sample-requests*/}
Complete a multipart upload.

```Python
>>> api.completeMultipart(token, '5d50c59de3e645ac8df0f209290c1c29')

{u'numpieces': 4, u'code': 0}
```
## Abort a Multipart Upload  {/*abort*/}
Method name: `abortMultipart`

Aborts a multipart upload that has not already been completed or aborted. Aborting a multipart upload invalidates the given multipart upload ID and all associated pieces.

Aborted multipart uploads and pieces still exist and show up in listings and status checks but are in ABORTED state, Once aborted, a multipart upload cannot be completed or have pieces added to it. Multipart uploads cannot be aborted after calling `completeMultipart`.

### Using Named Parameters {/*abort-using-named-parameters*/}
```JSON
{
  "method": "abortMultipart",
  "id": 1,
  "params": {
    "token": "2754500a-a62d-4cb1-a57a-c84d572862b6",
    "mpid": "91842e50903b4251848e32b67d8d7137"
  },
  "jsonrpc": "2.0"
}
```

### Using Positional Parameters {/*abort-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters example.

```JSON
{
  "method": "abortMultipart",
  "id": 0,
  "params": [
    "889dfb85-3083-44f6-9487-0fdc793fde94",
    "91842e50903b4251848e32b67d8d7137"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*abort-parameter-descriptions*/}
| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.    |
| mpid | str | Multipart upload identifier from a prior call to createMultipart or /multipart/create. See Begin a Multipart Upload (JSON-RPC) and [Begin a Multipart Upload (JSON-RPC) Upload](#begin-multipart-upload) and [Begin a Multipart Upload (HTTP)](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload), respectively.     |

### Return Codes {/*abort-return-codes*/}
-   **0**: success
-   **\-2**: invalid multipart identifier
-   **\-17**: multipart upload has already been aborted
-   **\-18**: invalid state; cannot be aborted
-   **\-10001**: invalid value for token parameter

<Callout type="info">For a list of error codes not specific to `abortMultipart`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*abort-response-data*/}
Returns only the codes discussed in [Return Codes](#abort-return-codes). Does not return any data structures.


### Python Sample Requests {/*abort-python-sample-requests*/}
Successfully abort a multipart upload:


```Python
>>> api.abortMultipart(token, '673abb20317e45ac95325ab8ba574399')

0
```

---
title: Index of Supported API Calls
---
The following sections help you locate the information you need.

See [API Calls by Name](#api-calls-by-name) if you know the call you want to make but you need further information about it.
See [API Calls by Topic](#api-calls-by-topic) if you know what you want to do but you are not sure which call to use.

Both sections contain links to detailed information.

## API Calls by Name
Calls are listed in alphabetical order within each interface. Note that there is not a one-to-one correspondence between calls in the two interfaces because the HTTP interface has fewer calls. Juxtaposition of the HTTP calls with the JSON-RPC calls in the following table is not meant to imply correspondence.

### JSON-RPC Interface
| API Call | Details|
| --- | --- |
| abortMultipart|[Abort a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#abort) |
|authenticate|[Log in to a Sub-directory](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in-to-subdirectory)|
| checkToken|[Determine Your Token's Age](/delivery/storage/apis/_api_calls/working_with_sessions/#determine-token-age) |
| completeMultipart|[Complete a Multipart Upload](/delivery/storage/apis/_api_calls/logging_in_using_the_json_rpc_interface/#complete) |
| deleteDir|[Delete a Directory](/delivery/storage/apis/api_calls/working_with_directories_json/#delete-directory) |
| deleteFile<br />|[Delete a File](/delivery/storage/apis/api_calls/working_with_files/#delete-a-file) |
| fetchFileHTTP|[Copy a File](/delivery/storage/apis/api_calls/working_with_files/#copy-a-file) |
| getMultipartStatus|[Get Status for a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-status) |
| getMultipartStatusMap|[Get String Equivalents of Multipart Status Codes](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-equivalent)  |
| initKeyPair|[Initializing HMAC Key Pairs](/delivery/storage/apis/api_calls/initializing_hmac_key_pairs) |
| listDir|[List Directories](/delivery/storage/apis/api_calls/working_with_directories_json/#list-directory) |
| listFile<br />|[List Files](/delivery/storage/apis/api_calls/working_with_files/#list-file) |
| listMultipart|[List Your Multipart Uploads](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-pieces) |
| listMultipartPiece<br /><br />     See [List Pieces in a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-multipart) |
| listPath<br />|[List Files and Directories](/delivery/storage/apis/api_calls/working_with_methods/#list) |
| login|[Log In](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in) |
| logout|[Log Out](/delivery/storage/apis/api_calls/logging_out/#log-out) |
| makeDir|[Create a Directory](/delivery/storage/apis/api_calls/working_with_directories_json/#create-directory) |
| makeDir2|[Create a Directory Along With Leading Paths](/delivery/storage/apis/api_calls/working_with_directories_json/#leading-paths) |
| mediaVaultURL|[Generate a URL](/delivery/storage/apis/api_calls/working_with_files/#mediavault) |
| noop|[Perform an Authenticated Server Verification](/delivery/storage/apis/api_calls/verifying_the_server_api_connection/#pass-token) |
| ping<br />|[Perform an Unauthenticated Server Verification](/delivery/storage/apis/api_calls/verifying_the_server_api_connection/#no-pass-token) |
| rename<br />|[Rename a File or Directory](/delivery/storage/apis/api_calls/working_with_methods/#rename) |
| restartMultipart|[Restart a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#restart) |
| setContentType|[Set a File's Content Type](/delivery/storage/apis/api_calls/working_with_files/#set-type) |
| setMTime|[Change a File or Directory Last Modification Time](/delivery/storage/apis/api_calls/working_with_methods/#change-time) |
| stat|[Obtain File or Directory Metadata](/delivery/storage/apis/api_calls/working_with_methods/#metadata) |
| updateSession|[Set Your Token's Expiry](/delivery/storage/apis/api_calls/working_with_sessions/#set-your-tokens-exiry) |


### HTTP Interface  {/*http-interface*/}
| API Call | Details |
| --- | --- |
| account/login|[Log In](/delivery/storage/apis/api_calls/logging_in_using_http_interface) |
|  multipart/complete|[Complete a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_http/#complete-multipart-upload) |
|multipart/create|[Begin a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_http/#begin-multipart-upload) |
|multipart-piece|[Create a Multipart Piece](/delivery/storage/apis/api_calls/working_with_multipart_http/#create-multipart-piece) |
|post/file|[Web Browser Upload](/delivery/storage/apis/api_calls/uploading_files/#web-browser-upload) |
|post/raw|[File Raw Post](/delivery/storage/apis/api_calls/uploading_files#file-raw-post) |

## API Calls by Topic  {/*api-calls-by-topic*/}
If you know what you want to do but you are not sure which call to use, refer to information in the following sections:

### Authentication  {/*authentication*/}
| Action  | API Call| Details|
| --- | --- | --- |
| Log in to Origin Storage| login<br /><br />/account/login (HTTP interface) | [Log In](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in)<br /><br />[Log In](/delivery/storage/apis/api_calls/logging_in_using_http_interface) (HTTP interface) |
| Log into a specific sub-directory in Origin Storage| authenticate | [Log in to a Sub-directory](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface/#log-in-to-subdirectory) |
| Log out of Origin Storage| logout | [Logging Out](/delivery/storage/apis/api_calls/logging_out) |

### Connections and Tokens  {/*connections-and-tokens*/}
Calls are available in the JSON-RPC interface only.

| Action  | API Call| Details|
| --- | --- | --- |
| Determine your token's age | checkToken | [Determine Your Token's Age](/delivery/storage/apis_api_calls/working_with_sessions/#determine-token-age) |
| Set your token's expiry time | updateSession | [Set Your Token's Expiry](/delivery/storage/apis/api_calls/working_with_sessions/#set-your-tokens-exiry) |
| Verify the server API connection if you are logged in | noop | [Perform an Authenticated Server Verification](Verifying the Server API Connection.htm#Perform) |
| Verify the server API connection if you are not logged in | ping | [Perform an Unauthenticated Server Verification](Verifying the Server API Connection.htm#Perform2) |
| Generate a new key pair for use in signing requests | initKeyPair | [Initializing HMAC Key Pairs](Initializing HMAC Key Pairs.htm) |

### Directories  {/*directories*/}
Calls are available in the interface unless otherwise indicated.


| To  | Use this call | For instructions see |
| --- | --- | --- |
| Change a directory's last modified time | setMTime | [Change a File or Directory Last Modification Time](Working With Directories and Files Common.htm#Set) |
| Create a directory | makeDir<br /><br />/post/dir (HTTP interface) | [Create a Directory](Working with Directories JSON RPC.htm#Create)<br /><br />[Create a Directory](Working with Directories HTTP.htm#Create) (HTTP interface) |
| Create a directory and leading path segments | makeDir2 | [Create a Directory Along With Leading Paths](Working with Directories JSON RPC.htm#Create2) |
| Delete a directory | deleteDir | [Delete a Directory](Working with Directories JSON RPC.htm#Delete) |
| List directories | listDir | [List Directories](Working with Directories JSON RPC.htm#List) |
| List directories and files | listPath | [List Files and Directories](Working With Directories and Files Common.htm#List) |
| Obtain directory metadata | stat | [Obtain File or Directory Metadata](Working With Directories and Files Common.htm#Obtain) |
| Rename a directory | rename | [Rename a File or Directory](Working With Directories and Files Common.htm#Rename) |

### Files  {/*files*/}
Calls are available in the JSON-RPC interface only.

| To | Use this call | For instructions see |
|---|---|---|
| Change a file's last modified time | setMTime | [Change a File or Directory Last Modification Time](/delivery/storage/apis/api_calls/working_with_methods/#change-time) |
| Copy a file | fetchFileHTTP | [Copy a File](/delivery/storage/apis/api_calls/working_with_files/#copy-a-file) |
| Delete a file | deleteFile | [Delete a File](/delivery/storage/apis/api_calls/working_with_files/#delete-a-file) |
| Generate a MediaVault URL | mediaVaultURL | [Generate a MediaVault URL](/delivery/storage/apis/api_calls/working_with_files/#mediavault) |
| List files | listFile | [List Files](/delivery/storage/apis/api_calls/working_with_files/#list-file) |
| List directories and files | listPath | [List Files and Directories](/delivery/storage/apis/api_calls/working_with_methods/#list) |
| Obtain file metadata | stat | [Obtain File or Directory Metadata](/delivery/storage/apis/api_calls/working_with_methods/#metadata) |
| Rename a file | rename | [Rename a File or Directory](/delivery/storage/apis/api_calls/working_with_methods/#rename) |
| Set a file's content (MIME) type | setContentType | [Set a File's Content Type](/delivery/storage/apis/api_calls/working_with_files_json/#set-type) |

### File Upload - Non-Multipart  {/*nonmultipart-download*/}
Calls are available in the HTTP interface only.

| To | Use this call | For instructions see |
|---|---|---|
| Upload a file | /post/raw | [File Raw Post](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#file-raw-post) |
| Web browser upload | /post/file | [Web Browser Upload](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#web-browser-upload) |

### File Upload - Multipart  {/*multipart-download*/}
Calls are available in the JSON-RPC interface unless otherwise indicated.

| To | Use this call | For instructions see |
|---|---|---|
| Create a mulltipart upload | createMultipart<br />POST to /multipart/create (HTTP interface) | [Begin a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#begin-multipart-upload)<br />[Begin a Multipart Upload (HTTP Interface)](/delivery/storage/apis/api_calls/working_with_multipart_json/#begin-multipart-upload) |
| Create a multipart piece | POST to /multipart/piece (HTTP interface) | [Create a Multipart Piece](/delivery/storage/apis/api_calls/working_with_multipart_json/#create-multipart-piece) |
| Get mapping of multipart status descriptions to integer codes | getMultipartStatusMap | [Get String Equivalents of Multipart Status Codes](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-equivalent) |
| Get a list of pieces in a mulltipart upload | listMultipartPiece | [List Pieces in a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-pieces) |
| Get a list of mulltipart uploads started by your user | listMultipart | [List Your Multipart Uploads](/delivery/storage/apis/api_calls/working_with_multipart_json/#list-multipart) |
| Get multipart upload status | getMulitpartStatus | [Get Status for a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-status) |
| Complete a multipart upload | completeMultipart<br />POST to /multipart/complete (HTTP interface) | [Complete a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#complete)<br />[Complete a Multipart Upload (HTTP interface)](/delivery/storage/apis/api_calls/working_with_multipart_http/#complete-multipart-upload) |
| Restart a multipart upload | restartMultipart | [Restart a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#restart) |
| Abort a multipart upload | abortMultipart | [Abort a Multipart Upload](/delivery/storage/apis/api_calls/working_with_multipart_json/#abort) |

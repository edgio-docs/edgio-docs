---
title: Working with Multipart Uploads in the HTTP Interface
---
The HTTP interface lets you create a multipart upload, add pieces to it, and complete the upload as explained in the following sections:

-   [Begin a Multipart Upload](#begin-multipart-upload)
-   [Create a Multipart Piece](#create-multipart-piece)
-   [Complete a Multipart Upload](#complete-multipart-upload)

For general information about multipart uploads, see [Uploading Files — Multipart](Uploading Files Multipart Container.htm).

As you read information in the following sections, keep in mind the caveats mentioned in [Uploading Files — Non-Multipart](/delivery/storage/apis/api_calls/uploading_files_multipart).


## Begin a Multipart Upload {/*begin-multipart-upload*/}

```
POST to /multipart/create
```

Initiates a multipart upload and returns an upload ID. The ID associates all parts in the upload and must be used each time you create a piece for the upload. You also include the ID in the final request to complete or abort the multipart upload request.

The final destination file will not be created until you have added pieces to, and completed, the upload.

An error will be returned if any parent directories does not exist. To create parent paths, you can use either:

- the makeDir2 API in the JSON RPC interface (see [Create a Directory Recursively](/delivery/storage/apis/api_calls/working_with_directories_json/#leading-paths)) or
- the post/directory API in the HTTP interface (see [Create a Directory](/delivery/storage/apis/api_calls/working_with_directories_http))

### Request Headers  {/*request-headers*/}

| Header Name | Type | Description |
| --- | --- | --- |
| X-Agile-Authorization | str |     |
| X-Agile-Basename | str |     |
| X-Agile-Content-Type | str |     |
| X-Agile-Directory | str | Optional<br /><br />Directory on where the multipart upload is to be created.<br /><br />Defaults to root directory / |
| X-Agile-MTime | str |     |
| X-Agile-Encoding | str |     |

## Create a Multipart Piece {/*create-multipart-piece*/}
## Complete a Multipart Upload  {/*complete-multipart-upload*/}

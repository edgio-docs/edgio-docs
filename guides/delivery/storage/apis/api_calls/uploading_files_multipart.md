---
title: Uploading Files — Multipart
---
This section introduces multipart uploads, provides high-level information about multipart uploads, and points you to detailed instructions for using the related APIs.

## Introduction to Multipart Uploads
Multipart uploads allow you to upload an object in pieces. A multipart upload is an upload to the server that is created by uploading individual pieces of an object and generally comprises these steps:

1.  Create a multipart upload.
2.  Add pieces to the multipart upload.
3.  Complete the multipart upload. This step concatenates the individual pieces together into a single object. Until you do this step, neither the upload nor the individual pieces are visible as files on Origin Storage.

For example if you have a 15GB file you can use the multipart capability to upload the file in 1MB pieces.

<Callout type="info">Via Origin Storage policies, uploads are automatically replicated to multiple bricks.</Callout>

<Callout type="info">Although you can use multipart upload to upload any file, multipart is best for files over 10GB. Otherwise, use non-multipart uploads. See [Uploading Files — Non-Multipart](/delivery/storage/apis/api_calls/uploading_files_nonmultipart).</Callout>

The multipart upload feature offers important advantages over non-multipart uploads:

-   You can ingest pieces of an object in parallel, thereby greatly improving performance.
-   In the case of a network failure, you loose only those pieces that did not upload before the failure as opposed to loosing an entire file if you had not chosen to use the multipart upload capability. The multipart upload maintains its state — it knows which pieces have already been uploaded so you can easily resume the upload after network errors are corrected.

Multipart upload capabilities are available in both the  interface and the HTTP interface, but not all functionality is available in both. The following table shows the capabilities that are available in each interface. A "Y" in a column indicates the capability is available and lack of a "Y" means otherwise.

| Capability | Available in Interface? | Available in HTTP Interface? |
| --- | --- | --- |
| Create a multipart upload | Y   | Y   |
| Create multipart piece |     | Y   |
| List the pieces in a multipart upload | Y   |     |
| List the multipart uploads that your user has created | Y   |     |
| Get the status of a multipart upload | Y   |     |
| Get a list of multipart or multipart piece status codes and corresponding descriptions | Y   |     |
| Complete a multipart upload | Y   | Y   |
| Abort a multipart upload | Y   |     |
| Restart a multipart upload | Y   |     |

As indicated in the table above, only the HTTP interface lets you create multipart pieces.

## Some Notes About Multipart Uploads  {/*notes*/}
-   You can create multiple multipart uploads for the same path (destination file) because each multipart upload has an ID unique to that upload. Note that although this is possible, it is not recommended because the most recent upload is not guaranteed to prevail.
-   Multipart identifiers can only be used and managed by the user who created the multipart upload. Users cannot share multipart identifiers.
-   The multipart framework does not check permissions on the destination path, so first ensure the destination is writable by your user.
-   A process known as the "sweeper" or "garbage collector" periodically checks each multipart upload. The garbage collector performs actions such as transitioning multipart uploads to EXPIRED state if they have been in existence for longer than a configurable amount of time.

## Where to Go for Instructions
See the following sections for instruction about the multipart upload APIs:

-   [Working with Multipart Uploads in the JSON-RPC Interface](/delivery/storage/apis/api_calls/working_with_multipart_json)
-   [Working with Multipart Uploads in the HTTP Interface](/delivery/storage/apis/api_calls/working_with_multipart_http)

See [Multipart Example](/delivery/storage/apis/reference_materials/file_upload_examples/#multipart-example) for a complete end-to-end multipart upload example.

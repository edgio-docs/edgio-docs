---
title: Multipart State Codes
---
Both multipart uploads and multipart pieces have lifecycles along with states that indicate where they are within their lifecycle. Each state has an associated integer code and a status string.

State codes for mutlpart uploads are visible in the output from calls to `getMultipartStatus` and `listMultipart` (see [Get Status for a Multipart Upload](/delivery/storage/api/api_calls/working_with_multipart_json/#get-status) and [List Your Multipart Uploads](/delivery/storage/api/api_calls/working_with_multipart_json/#list-multipart)).

State codes for mulipart pieces are visible in the output from calls to `listMultipartPiece` (see [List Pieces in a Multipart Upload](/delivery/storage/api/api_calls/working_with_multipart_json/#list-pieces)).

<Callout type="info">You can programmatically obtain the status strings by calling getMultipartStatusMap (see [Get String Equivalents of Multipart Status Codes](/delivery/storage/apis/api_calls/working_with_multipart_json/#get-equivalent)). This makes it easy to obtain status strings at runtime.</Callout>

Allowable state transitions are listed in [Multipart State Transitions](/delivery/storage/api/reference_materials/multipart_state_transitions).

## Multipart Upload State Codes  {/*upload*/}
The following table shows the status string and description for each code.

| Code | Status String | Description |
| --- | --- | --- |
| 0   | UNKOWN | Impossible state |
| 1   | NEW | Just created and contains no pieces |
| 2   | READY | One or more pieces have been added. Ready to be completed. |
| 3   | COMPLETE | Multipart upload has been completed |
| 5   | JOIN | Join in progress. (The pieces are being joined in order to create the final file.) |
| 6   | SUCCESS | Join completed and the final file has been created on disk. |
| 8   | DELETED | Pieces have been deleted from all s |
| 9   | ERROR | An internal error occurred |
| 10  | ABORT | Aborted by user |
| 11  | EXPIRED | When a multipart upload that is in NEW or FAILED state reaches an age older than a defined amount of time, the upload is transitioned to EXPIRED state if all associated pieces are also in EXPIRED state.<br /><br />The age limit defaults to 1 day. Contact your Accouont Manager if you want to disable the expiration of aged multipart uploads, or if you want to set the expiry to other than the default. |
| 12  | FAILED | An error occurred during the merge process, such as a 404 or a checksum error. |

## Multipart Piece State Codes {/*piece*/}
The following table shows the status string and description for each code.

| Code | Status String | Description |
| --- | --- | --- |
| 0   | UNKOWN | Impossible state |
| 1   | NEW | Piece has been added to a multipart upload. |
| 5   | JOIN | Piece is being joined (merged) to a multipart upload. |
| 6   | SUCCESS | Piece successfully joined |
| 8   | DELETED | Piece successfully deleted from all s |
| 9   | ERROR | An internal error occurred |
| 10  | SKIPPED | A piece enters SKIPPED state if it is located outside of the local domains on which LLPs run. |
| 11  | ABORT | Aborted by user |
| 12  | EXPIRED | When a multipart piece that is in NEW or FAILED state reaches an age older than a defined amount of time, the piece is automatically transitioned to EXPIRED state.<br /><br />The age limit defaults to 1 day. Contact your Account Manager if you want to disable the automatic expiration of aged multipart uploads, or if you want to set the expiry to other than the default. |
| 13  | FAILED | Piece error; example: piece not found |

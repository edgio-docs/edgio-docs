---
title: MMD Live - Live to VOD Developers Reference
---

This documentation is intended for programmers who are writing client or server applications that interact with MMD Live Recording Schedules and slots.

Specifically, the API permits the following:

- Query - Retrieve a specific Recording Schedule or all Recording Schedules
- Create - Create a new Recording Schedule
- Update - Update a specific Recording Schedule
- Delete - Delete a specific Recording Schedule

Resources about these bullet points are described further in [Data Resources](#data-resources).

## Data Resources  {/*data-resources*/}

The Live to VoD APIs use four Data Resource objects. The method definitions using the Data Resources are defined in [API Requests - Query](#query), [API Requests - Create and Update](#create-update), and [API Requests - Delete](#delete).

### Recording Schedule {/*data-resources-recording-schedule*/}

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| id  | No<br /><br />Automatically set | No  | String | A unique ID assigned to the Recording Schedule. |
| name | Yes | No  | String | Recording Schedule name.<br /><br />There is no restriction on the number and type of characters. Duplicate schedule names are allowed.<br /><br />Required when updating a schedule. |
| start | Yes | No  | ISO8601 formatted date string without timezone | Desired Recording Schedule start date and time.<br /><br />Required when updating a schedule. |
| recurrenceType | Yes | Yes | String | Type of Recording Schedule. One of:<br />-   `ONCE`<br />-   `DAILY`<br />-   `WEEKLY`<br />-   `MONTHLY` |
| slotId | Yes | No  | String | The ID of the slot to contain the Recording Schedule.<br /><br />Required when updating a schedule. |
| allRenditions | No  | No  | boolean | Whether to record all bitrates of your video.<br /><br />true: record all bitrates (default).<br /><br />`false`: don't record all bitrates.<br /><br />Required when updating a schedule. |
| duration | Yes | Yes | ISO8601 interval format string | Recording duration.<br /><br />Default: `PT4H`<br /><br />Required when updating a schedule. |
| segmentDuration | Yes | Yes | ISO8601 interval format string | Segment duration.<br /><br />Default: `PT4H`<br /><br />Required when updating a schedule. |
| timezone | Yes | Yes | timezone locality string | Timezone and sub-timezone in which recording should occur. |
| enabled | No  | No, if set to false | boolean | Determines whether or not the schedule is enabled for recording. |
| recordingStatus | No<br /><br />Automatically set | No  | String | Possible values:<br />-   `SCHEDULED`<br />-   `RECORDING`<br />-   `CANCELLING`<br />-   `FINISHED` |
| callbackUrl | No  | Yes | String | URL to which to post recording status. |

### Slot Status {/*data-resources-slot-status*/}

The Live to VoD API does not support the creation or updating of slot status.

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| id  | n/a | n/a | String | Slot ID. Use this as the ID of the slot to contain the Recording Schedule. |
| status | n/a | n/a | String | Slot status. One of:<br />-   `active`: slot is streaming<br />-   `inactive`: slot is not streaming |

### Slot  {/*data-resources-slot*/}

The Live to VoD API does not support the creation or updating of slots.

| Property Name | Required On Create? | Updatable? | Type | Description |
|---|---|---|---|---|
| id | n/a | n/a | String | The slot ID is the unique identifier assigned to the slot upon slot creation. In this version of the API, the Slot ID is the same as the Stream name used in encoders.<br /><br />This value will remain a unique identifier of the slot in future API versions, but the stream name may be a different field. |
| type | n/a | n/a | String | Type of the slot. One of:<br />`576`<br />`720`<br />`1080`<br />`transmux` |
| name | n/a | n/a | String | The title given to the slot when it was created. This is NOT the stream name used by encoders. |
| state | n/a | n/a | String | State of the slot. One of:<br />`Pending`<br />`Ready`<br />`Failed` |
| publishUrls | n/a | n/a | Object | Publish URLs associated with the slot. Each object contains these String properties:<br />`primary`: primary publish URL<br />`backup`: backup publish URL |
| playbackInfo | n/a | n/a | Object | Playback URLs for the various output types. <br /><br />Each object contains these String properties:<br />`dash`: playback URL for DASH output<br />`hls`: playback URL for HLS output<br />`hds`: playback URL for HDS output<br />`rtmp`: List of playback URLs for RTMP output<br />`mss`: List of playback URLs for MSS output<br />`rtsp`: List of playback URLs for RTSP output |
| mediaVaultType | n/a | n/a | String | Type of MediaVault protection. One of:<br />`NONE`<br />`COOKIE`<br />`URL`<br />`URL_WITH_SUB_MANIFESTS` |
| mediaVaultSecretKey | n/a | n/a | String | MediaVault secret key known only to the customer and Edgio.<br /><br />Null if MediaVault is not configured for the slot |
| region | n/a | n/a | String | Region in which to publish Possible values:<br />`north-america`<br />`europe`<br />`asia-pacific` |
| profiles | n/a | n/a | Array of profile objects | See [Profile](#data-resources-profile). |

### Profile {/*data-resources-profile*/}

A Profile object specifies the audio and video rendition(s) configured for a slot.

The Live to VoD API does not support the creation or updating of profiles.

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| name | n/a | n/a | String | Name of profile. |
| videoBitrate | n/a | n/a | Number | Profile's video bitrate in bits/second. |
| audioBitrate | n/a | n/a | Number | Profile's audio bitrate in bits/second. |
| videoWidth | n/a | n/a | Number | Profile's video width. |
| videoHeight | n/a | n/a | Number | Profile's video height. |

## API Requests - Query  {/*query*/}

The following methods are available for requesting content information for Recording Schedules, slots, and slot status:

### Get a recording schedule {/*recording-schedules-get*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules/{scheduleId}`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: No payload parameters required

**Response**: The retrieved [Recording Schedule](#data-resources-recording-schedule).

**Errors**: Invalid value, Missing signature, A schedule does not exist

### Get all recording schedules {/*recording-schedules-get-all*/}

**URL**: 	`https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Optional Query Parameter**: `slotId`: If specified, the system will only return a list of Recording Schedules that are configured for the Slot.

**Response**: A list of the retrieved [Recording Schedules](#data-resources-recording-schedule).

**Errors**: - Invalid value <br />-Missing signature

### Get all slots

**URL**: 	`https://apis.llnw.com/config-api/v1/live/shortname/{account name}/slots`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. [See Authentication - Signing Requests](#authentication).

**Parameters**: None

**Response**: A list of [Slots](#data-resources-slot).

**Errors**: Invalid value, Missing signature

### Get the streaming status of a slot  {/*get-streaming-status*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/shortname/{account name}/slots/{slotId}/status`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: None

**Response**: The slot's [Streaming Status](#get-streaming-status).

**Errors**: Invalid value, Missing signature, The slot does not exist

## API Requests - Create and Update  {/*create-update*/}

The following methods are available for creating and updating schedules:

### Create a recording schedule {/*create-a-recording-schedule*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules`

**Formats**: `JSON`

**HTTP Method**: `POST`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**:
| Key | Value |
|---|---|
| name | Name of the Recording Schedule <br /><br />String <br /><br />Required |
| start | Start time in the specified timezone. <br /><br />ISO8061 formatted date and time string without timezone. <br /><br />Example: `2018-10-01T12:00:00` <br /><br />Required |
| duration | Duration of the recording. <br /><br />ISO8601 interval format string. <br /><br />Example: `PT4H` <br /><br />Required |
| segmentDuration | Segment duration of the recording. Use this value to break up recordings into smaller files. <br /><br />String <br /><br />Maximum value: 4 hours (`PT4H`) <br /><br />Example: `PT4H` <br /><br />Required |
| slotId | The ID of the MMD Live Slot to record. <br /><br />String <br /><br />Required |
| recurrenceType | Type of Recording Schedule to create. <br /><br />One of: <br />- `ONCE` <br />- `DAILY` <br />- `WEEKLY` <br />- `MONTHLY` <br /><br />String <br /><br />Required |
| allRenditions | Determines whether to record all renditions of a slot. <br /><br />Boolean <br /><br />If `false`, the system will only record the highest bitrate rendition of the slot. <br /><br />Optional. <br /><br />Default `true` |
| enabled | Determines whether or not the Recording Schedule is enabled. <br /><br />Optional. Default `true` |
| callbackUrl | URL to which the system will make POST requests to at various points in the recording lifecycle. <br /><br />Must be a valid http or https URL <br /><br />String <br /><br />Optional |
| timezone | Timezone locality string. The timezone that the system will record is based on the start parameter. <br /><br />Example: `America/New_York` <br /><br />String <br /><br />Required |

**Example**:
The following payload will create a schedule that will record all renditions every Friday for 1 hour at noon in the `America/Phoenix` timezone starting on March 1, 2019.

```
{
    "name": "my-recording-schedule",
    "start": "2019-03-01T12:00:00",
    "recurrenceType": "WEEKLY",
    "slotId": "<slot_id>",
    "allRenditions": true,
    "duration": "PT1H",
    "segmentDuration": "PT1H",
    "timezone": "America/Phoenix",
    "enabled": true,
    "callbackUrl": "http://www.server.com/api/callback"
}
```

**Response**: The created [Recording Schedule](#data-resources-recording-schedule) with the following additional fields:
| Key | Value |
|---|---|
| id | String UUID of the recording schedule |
| recordingStatus | Status of the recording schedule. One of:<br />- `SCHEDULED`<br />- `RECORDING`<br />- `CANCELLING`<br />- `FINISHED` |

**Errors**: Invalid value, Missing signature

### Update an existing recording schedule {/*update-a-recording-schedule*/}

Changes to a recording schedule, while a recording schedule is recording, may not take effect until the recording's next occurrence.

**URL**: `https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules/{scheduleId}`

**Formats**: `JSON`

**HTTP Method**: `PUT`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Updatable Parameters**: You can update the following fields only:

- `start`
- `duration`
- `recurrenceType`
- `enabled`
    May only be set to false. It cannot be changed to true when it is currently false.
- `callbackUrl`
- `timezone`

**'Schedule' Object Parameter**: A complete recording schedule object is required. PATCH requests are not supported.

| Key | Value |
|---|---|
| name | Name of the Recording Schedule<br /><br />String<br /><br />Required |
| start | Start time in the specified timezone.<br /><br />ISO8061 formatted date and time string without timezone.<br /><br />Example: `2018-10-01T12:00:00`<br /><br />Required |
| duration | Duration of the recording.<br /><br />ISO8601 interval format string.<br /><br />Example: `PT4H`<br /><br />Required |
| segmentDuration | Segment Duration of the recording. Use this value to break up recordings into smaller files.<br /><br />String<br /><br />Maximum value: 4 hours (`PT4H`)<br /><br />Example: `PT4H`<br /><br />Required |
| slotId | The ID of the MMD Live Slot to record.<br />String<br /><br />Required |
| recurrenceType | Type of Recording Schedule to create.<br /><br />One of:<br />- `ONCE`<br />- `DAILY`<br />- `WEEKLY`<br />- `MONTHLY`<br /><br />String<br /><br />Required |
| allRenditions | Determines whether to record all renditions of a slot.<br /><br />Boolean<br /><br />If false, the system will only record the highest bitrate rendition of the slot.<br /><br />Required |
| enabled | Determines whether the Recording Schedule is enabled.<br /><br />Required |
| callbackUrl | URL the system will make POST requests to at various points in the recording lifecycle.<br /><br />Must be a valid http or https URL<br /><br />String<br /><br />Optional |
| timezone | Timezone locality string. The timezone that the system will record is based on the start parameter.<br /><br />Example: `America/New_York`<br /><br />String<br /><br />Required |

**Response**: The updated [Recording Schedule](#data-resources-recording-schedule).

**Errors**: Invalid value, Missing signature

## API Requests - Delete  {/*delete*/}

A Recording Schedule can only be deleted if it is in the `FINISHED` state.

A Recording Schedule will be in the `FINISHED` state if:

- Its recurrenceType is `ONCE`, and the recording has completed OR
- Its enabled field is `false`

**URL**: `https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules{scheduleId}`

**Formats**: `JSON`

**HTTP Method**: `DELETE`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: No payload parameters required

**Response**: The deleted [Recording Schedule](#data-resources-recording-schedule).

**Errors**: Invalid value, Missing signature

## Authentication - Signing Requests  {/*authentication*/}

The Live to VoD APIs use symmetric key cryptography and HMAC (Hashed Message Authentication Code) for message authentication and user identification. To secure all calls to the API, an HMAC digest signature is applied to every request by using the following authentication headers:

`X-LLNW-Security-Principal` – Name of the user performing the request. Services lookup shared keys by the username to authenticate a message. Since shared keys are stored on a per-user basis, an attacker would have to know both the username and the shared key for that user to impersonate another user.

`X-LLNW-Security-Timestamp` – Unix time in milliseconds used to prevent replay attacks. If the timestamp is more than X seconds old (usually 300), the message expires, and an error code is returned. Note: System clock skew minimization is an important consideration for message expiration.

`X-LLNW-Security-Token` – MAC hash-generated with the user's shared key. It is calculated based on data that is sent to the server. This token is generated twice, once by the client and once by the server - to compare with the one passed by the client. If the token provided by the client matches the token generated by the server, the message is authentic.

The shared key is a large unique key created for use with the `HmacSHA256` MAC algorithm. The Control maintains a unique and enciphered shared key for every user in the system. It is stored in HEX format and should be decoded to ASCII before usage. Users may access or regenerate this key at any time by using tools in the Control under *My Setting*s > *Edit My Profile*. `X-LLNW-Security-Token` is formed by applying MAC digest for the "data string"; i.e. `REQUEST_METHOD` + `URL` + `QUERY_STRING` (if present) + `TIMESTAMP` + `REQUEST_BODY` (if present)

## Starting and Stopping Recordings  {/*recordings*/}

You can easily start and stop recording.

### Start a Recording  {/*start-a-recording*/}

To start a recording, you simply create a new recording schedule and set the start attribute to the current time:

POST a payload like the following to the URL in [Create a recording schedule](#create-a-recording-schedule):

```
{
    "name": "my-recording-schedule",
    "start": "2019-03-01T12:00:00", // it is currently noon on March 1, 2019
    "recurrenceType": "ONCE", // it is recommended to use ONCE for a one-time recording
    "slotId": "<slot_id>",
    "timezone": "America/Phoenix",
    "duration": "PT1H",
    "segmentDuration": "PT1H",
    "callbackUrl": "http://www.server.com/api/callback"
}
```

### Stop a Recording  {/*stop-a-recording*/}

To stop a recording, you update the recording schedule's enabled field to be false.

PUT a payload like the following to the URL in [Update an existing recording schedule](#update-a-recording-schedule):

```
{
    "enabled": false
}
```

The recording will stop immediately and begin post-processing.

## Callbacks  {/*callback*/}

Live to VoD provides the ability to monitor the state of your recordings through callbacks. When you create a recording, you can optionally provide a URL to which Live to VoD sends POST requests for these recording stages:

- Recording of a segment<sup>1</sup> has started
- The recording has finished, and post-processing has begun
- Recorded files are now available on the customer storage account

<sup>1</sup>A segment is a single entity of a recording. For example, if a schedule says to record for two hours every Friday, that 2-hour recording will be a segment. Segments have an upper limit of 4 hours. If a schedule says to record for 5 hours every Friday, there will be two segments: one 4-hour segment and one 1-hour segment.

### Payload Received in the POST Requests  {/*payload-received*/}

<Callout type="info">Callbacks are valid only for one-time and recurring recordings.</Callout>

The payload contains a recording segment that includes a list of renditions.

#### Recording Segment Fields {/*recording-segment-fields*/}

| Field | Type | Description |
| --- | --- | --- |
| id  | String | The ID of the recording segment. UUID |
| schedule\_id | String | The ID of the recording schedule. UUID |
| start\_time | ISO8601 formatted date string | Start time (UTC) of the recording segment.<br /><br />Example: `2018-01-01T12:00:00Z` |
| end\_time | ISO8601 formatted date string. | End time (UTC) of the recording segment.<br /><br />Example: `2018-01-01T12:00:00Z` |
| status | String | Status of the recording segment. One of:<br />-   `RECORDING`<br />-   `PROCESSING`<br />-   `FILES_READY` |
| renditions | List of [Rendition](#rendition-object) objects | List of the recorded renditions of the recording segment. |

#### Rendition Object {/*rendition-object*/}

| Field | Type | Description |
| --- | --- | --- |
| bitrate | String | The bitrate of recorded rendition in kbps. |
| path | String | Path to the recorded file on the storage. |
| file\_size | Long | File size of the recorded file in bytes. |

### Response Samples {/*response-samples*/}

At various times, callbacks are sent, the payload looks slightly different. For example, when the recording starts and post-processing, the system does not have information about the renditions (as the files have not been fully recorded, converted to mp4, and uploaded). The following sections describe what the payload will look like at the various points.

#### RECORDING {/*recording*/}

```
{
  "id": "0e73e1f7-86b7-446f-8283-540dcb92bc08",
  "schedule_id": "58a3dc1f-a12d-43e0-bb8e-c57201fd329f",
  "start_time": "2018-10-01T17:00:00Z",
  "end_time": "2018-10-01T18:00:00Z",
  "status": "RECORDING",
  "renditions": []
}
```

#### PROCESSING {/*processing*/}

```
{
  "id": "0e73e1f7-86b7-446f-8283-540dcb92bc08",
  "schedule_id": "58a3dc1f-a12d-43e0-bb8e-c57201fd329f",
  "start_time": "2018-10-01T17:00:00Z",
  "end_time": "2018-10-01T18:00:00Z",
  "status": "PROCESSING",
  "renditions": []
}
```

#### FILES_READY {/*files-ready*/}

```
{
  "id": "0e73e1f7-86b7-446f-8283-540dcb92bc08",
  "schedule_id": "58a3dc1f-a12d-43e0-bb8e-c57201fd329f",
  "start_time": "2018-10-01T17:00:00Z",
  "end_time": "2018-10-01T18:00:00Z",
  "status": "FILES_READY",
  "renditions": [
    {
      "bitrate": "1928000",
      "path": "/path_prefix/slot_name/schedule_name/segment_start_time/1928000.mp4",
      "file_size": 14479340
    },
    {
      "bitrate": "1128000",
      "path": "/path_prefix/slot_name/schedule_name/segment_start_time/1128000.mp4",
      "file_size": 7807115
    }
  ]
}
```

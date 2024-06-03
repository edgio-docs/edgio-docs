---
title: MMD Live API Developers Reference
---
This documentation is intended for programmers who are writing client or server applications that interact with MMD Live Recording Schedules and Slots.

## API Overview  {/*overview*/}

| Action | Specific Calls |
| --- | --- |
| Query | [Get information on all slots in an account](#get-all-slots)<br />[Get information on a specific slot](#get-specific-slot)<br />[Get the streaming status of a slot](#get-streaming-status)<br />[Get overview information for an account's slots](#get-overview-information-for-slots)<br />[Get information about a recording schedule](#get_a_recording_schedule)<br />[Get information about all recording schedules](#get_all_recording_schedules) |
| Create | [Create a slot](#Create_a_slot)<br />[Create a recording schedule](#create_a_recording_schedule) |
| Update | [Update an existing recording schedule](#Update_an_existing_recording_schedule) |
| Delete | [Delete a slot](#delete_a_slot)<br />[Delete a recording schedule](#delete_a_recording_schedule) |

Resources about the above bullet points are described further in [Data Resources](#data-sources).

## Data Resources  {/*data-resources*/}

The MMD Live APIs use four Data Resource objects. The method definitions using the Data Resources are defined in [API Requests - Query](#query), [API Requests - Create and Update](#create-and-update), and [API Requests - Delete](#delete).

### Recording Schedule  {/*reording-sechedule*/}

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| id  | No<br /><br />Automatically set | No  | String | A unique ID is assigned to the Recording Schedule. |
| name | Yes | No  | String | Recording Schedule name.<br /><br />There is no restriction on the number and type of characters. Duplicate schedule names are allowed.<br /><br />Required when updating a schedule. |
| start | Yes | No  | ISO8601 formatted date string without timezone | Desired Recording Schedule start date and time.<br /><br />Required when updating a schedule. |
| recurrenceType | Yes | Yes | String | Type of Recording Schedule. One of:<br /><br />-   `ONCE`<br />-   `DAILY`<br />-   `WEEKLY`<br />-   `MONTHLY` |
| slotId | Yes | No  | String | The ID of the slot to contain the Recording Schedule.<br /><br />Required when updating a schedule. |
| allRenditions | No  | No  | boolean | Whether to record all bitrates of your video<br /><br />`true`: record all bitrates (default)<br /><br />`false`: don't record all bitrates<br /><br />Required when updating a schedule. |
| duration | Yes | Yes | ISO8601 interval format string | Recording duration.<br /><br />Default: PT4H<br /><br />Required when updating a schedule. |
| segmentDuration | Yes | Yes | ISO8601 interval format string | Segment duration.<br /><br />Default: `PT4H`<br /><br />Required when updating a schedule. |
| timezone | Yes | Yes | timezone locality string | Timezone and sub-timezone in which recording should occur. |
| enabled | No  | No, if set to `false` | boolean | Determines whether the schedule is enabled for recording. |
| recordingStatus | No<br /><br />Automatically set | No  | String | Possible values:<br /><br />-   `SCHEDULED`<br />-   `RECORDING`<br />-   `CANCELLING`<br />-   `FINISHED` |
| callbackUrl | No  | Yes | String | URL of your choice to which to post the recording status. |

### Slot Streaming Status  {/*slot-streaming-status*/}

<Callout type="info">The MMD Live API does not support the creation or updating of slot streaming status.</Callout>

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| id  | n/a | n/a | String | Slot ID. Use this as the ID of the slot to contain the Recording Schedule. |
| status | n/a | n/a | String | Slot streaming status. One of:<br /><br />`active`: slot is streaming<br /><br />`inactive`: slot is not streaming |

### Slot  {/*slot*/}

| Property Name | Required On Create? | Updatable? | Type | Description |
|---|---|---|---|---|
| id | n/a | n/a | String | The Slot ID is the unique identifier assigned to the slot upon slot creation. In this version of the API, the Slot ID is the same as the stream name used in encoders. |
| type | yes | n/a | String | Type of slot. One of:<br />-`576`<br />-`720`<br />-`1080`<br />-`transmux` |
| name | yes | n/a | String | Note: This name is NOT the stream name used by encoders. |
| state | n/a | n/a | String | State of the slot. One of:<br />-`Pending`<br />-`Ready`<br />-`Failed` |
| publishUrls | n/a | n/a | Object | Publish URLs associated with the slot. Each object contains these String properties:<br />-`primary`: primary publish URL<br />- `backup`: backup publish URL |
| playbackInfo | n/a | n/a | Object | Playback URLs for the various output types. Each object contains these String properties:<br />-`dash`: playback URL for DASH output<br />-`hls`: playback URL for HLS output<br />-`hds`: playback URL for HDS output<br />-`rtmp`: List of playback URLs for RTMP output |
| mediaVaultType | no | n/a | String | Type of MediaVault protection. One of:<br />-`NONE` (default)<br />-`COOKIE`<br />-`URL`<br />-`URL_WITH_SUB_MANIFESTS` |
| mediaVaultSecretKey | no | n/a | String | MediaVault secret key known only to the customer and Edgio. <br /><br />Null if MediaVault is not configured for the slot |
| region | yes | n/a | String | The region in which to publish. Possible values:<br />-`north-america`<br />-`europe`<br />-`asia-pacific`|
 | profiles| yes|n/a|An array of Profile objects | See [Profile](#profile). |
 | shortname | n/a | n/a | String |The account shortname for the slot.  |
| streamName | n/a | n/a |  String | The stream name used in encoders. The `streamName` format must match related regex format. For example: `^[A-Za-z]``[A-Za-z0-9-]` |
 | primaryPop | no | n/a | String | The preferred POP for the primary ingest. Defaults to auto-selection based on region. |
 | backupPop | n/a | n/a |String | The preferred POP for the backup ingest. Defaults to auto-selection based on region. |
| username | yes, if the password is specified | n/a | String | The user name for publishing to the slot. Default credentials will be those configured for the account. |
| password | yes, if the username is specified | n/a | String | The password for publishing to the slot. Default credentials will be those configured for the account. |
| drmType |no  |  n/a| String| Currently a non-functioning field|
| offsetTimecodes |  no | n/a | Boolean | Determines whether the service should override published packet timecodes. Required if the encoder is not using synchronized absolute timecodes. Default is `true`. |
| subtitlesEnabled | no | n/a | Boolean | Determines whether a subtitles reference is included in the HLS manifest. Default is `true`. |
| useBackup | no | n/a | Boolean | Determines whether to allocate a backup ingest. Default is `false`. |
| callbackUrl |   no | n/a | String | HTTP URL that will receive POST requests for stream events. |
| outputFormats |    yes | n/a | Array of Strings | The output formats to enable for this slot. Can be any of:<br />-`hls` <br />-`dash`<br />-`hds`<br />-`mss`<br />-`rtmp` |
| ipGeoMatch |  no | n/a | String| When creating a slot:<br />-Pass null if you do not want to use IP/Geo access.<br />-Otherwise, pass a comma-delimited list of 2-character country codes where playback is allowed or denied.<br /><br />Use "-" (without quotes) before a geocode to indicate denial.<br /><br />Examples:<br />-fr: allow France only<br />-fr,all: allow all countries except France<br />-If you use all, it must appear at the end of the list.<br /><br />Contact your Account Manager if you need assistance with IP geocodes.|

### Profile  {/*profile*/}

A Profile object specifies the audio and video rendition(s) configured for a slot.

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| id  | yes, if slot type is not `transmux` | n/a | String | The ID of a predefined transcode profile. |
| name | n/a | n/a | String | Name of profile. |
| videoBitrate | yes, if the Slot type is `transmux` | n/a | Number | Profile's video bitrate in bits/second. |
| audioBitrate | yes, if the Slot type is `transmux` | n/a | Number | Profile's audio bitrate in bits/second. |
| videoWidth | yes, if the Slot type is `transmux` | n/a | Number | Profile's video width. |
| videoHeight | yes, if the Slot type is `transmux` | n/a | Number | Profile's video height. |

### Overview  {/*overview*/}

An Overview object provides usage statistics for an MMD Live account.

| Property Name | Required On Create? | Updatable? | Type | Description |
| --- | --- | --- | --- | --- |
| transmuxTotal | n/a | n/a | Integer | The total allowed number of transmux slots. |
| transmuxAvailable | n/a | n/a | Integer | The number of available transmux slots. |
| 576Total | n/a | n/a | Integer | The total allowed number of 576p slots. |
| 576Available | n/a | n/a | Integer | The number of available 576p slots. |
| 720Total | n/a | n/a | Integer | The total allowed number of 720p slots. |
| 720Available | n/a | n/a | Integer | The number of available 720p slots. |
| 1080Total | n/a | n/a | Integer | The total allowed number of 1080p slots. |
| 1080Available | n/a | n/a | Integer | The number of available 1080p slots. |

## API Requests - Query  {/*query*/}

The following methods are available for requesting content information for slots, slot streaming status, and Recording Schedules.

### Slots {/*api-requests-slots*/}

#### Get all slots {/*get-all-slots*/}

**URL**: 	`https://apis.llnw.com/config-api/v1/` <br />`live/shortname/{account name}/slots`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. [See Authentication - Signing Requests](#authentication).

**Parameters**: None

**Response**: A list of [Slots](#slot).

**Errors**: Invalid value, Missing signature

#### Get a specific slot {/*get-specific-slot*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/shortname/{account name}/slots/{slot ID}`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: None

**Response**: The slot's Streaming Status below.

**Errors**: Invalid value, Missing signature

#### Get the streaming status of a slot  {/*get-streaming-status*/}

**URL**: `https://apis.llnw.com/config-api/
v1/live/shortname/{account name}/
slots/{slotId}/status`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: None

**Response**: The slot's [Streaming Status](#get-streaming-status).

**Errors**: Invalid value, Missing signature, The slot does not exist

#### Get overview information for an account's slots {/*get-overview-information-for-slots*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/shortname/{account name}/overview`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: None

**Response**: The account's slot [Overview](#overview)

**Errors**: Invalid value, Missing signature

### Recording Schedules {/*recording-schedules-get-overview*/}

#### Get a recording schedule {/*recording-schedules-get*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules/{scheduleId}`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: No payload parameters required

**Response**: The retrieved [Recording Schedule](#recording-schedule).

**Errors**: Invalid value, Missing signature, A schedule does not exist

#### Get all recording schedules {/*recording-schedules-get-all*/}

**URL**: 	`https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules`

**Formats**: `JSON`

**HTTP Method**: `GET`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Optional Query Parameter**: `slotId`: If specified, the system will only return a list of Recording Schedules that are configured for the Slot

**Response**: A list of the retrieved [Recording Schedules](#recording-schedule).

**Errors**: - Invalid value <br />-Missing signature

## API Requests - Create and Update  {/*create-and-update*/}

### Slots {/*create-and-update-slots*/}

The following method is available for creating a slot:

#### Create a Slot   {/*create-slot*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/shortname/{account name}/slots`

**Formats**: `JSON`

**HTTP Method**: `POST`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**:
| Key | Value |
|---|---|
| backupPop | The preferred POP for the backup ingest. Defaults to auto-selection based on region. <br /><br />Optional <br /><br />String |
| callbackUrl | HTTP URL that will receive POST requests for stream events. <br /><br />Optional <br /><br />String |
| drmType | Currently a non-functioning field. |
| ipGeoMatch | When creating a slot: <br />- Pass null if you do not want to use IP/Geo access. <br />- Otherwise, pass a comma-delimited list of 2-character country codes where playback is allowed or denied. <br /><br />Use - (without quotes) before a geocode to indicate denial. <br /><br />Examples: <br />- `fr:` allow France only<br />-  `-fr,all:` allow all countries except France If you use `all`, it must appear at the end of the list. <br /><br />Optional <br /><br />String<br /><br />Contact your Account Manager if you need assistance with IP Geocodes. |
| mediaVaultSecretKey | MediaVault secret key known only to the customer and Edgio. <br /><br />Null if MediaVault is not configured for the slot <br /><br />Optional <br /><br />String |
| mediaVaultType | Type of MediaVault protection. One of: <br />- `NONE` (default) <br />- `COOKIE` <br />- `URL` <br />- `URL_WITH_SUB_MANIFESTS` <br /><br />Optional<br /><br /> String |
| name | Name of the Slot <br /><br />Required <br /><br />String |
| offsetTimecodes | Whether the service should override published packet timecodes. Required if the encoder is not using synchronized absolute timecodes. Default is true. <br /><br />Optional <br /><br />Boolean |
| outputFormats | The output formats to enable for this slot. Can be any of: <br />- `hls` <br />- `dash` <br />- `hds` <br />- `mss` <br />- `rtmp` <br /><br />Required <br /><br />Array of Strings |
| password | The password for publishing to the slot. Default credentials will be those configured for the account. <br /><br />Required if a username is specified. <br /><br />String |
| primaryPop | The preferred POP for the primary ingest. Defaults to auto-selection based on region. <br /><br />Optional <br /><br />String |
| profiles | [Profile](#profile) objects associated with the slot. <br /><br />Required <br /><br />An array of Profile objects. Profiles for transcode slots are identified by profile ID, where each transcode profile type has a specific set of acceptable IDs. See [Transcode Slots](#transcode) for a list of types and allowed IDs. <br /><br />Profiles for transmux slots are identified by an object that defines video properties. See [Transmux Slots](#transmux) for an explanation of the object. |
| region | The region in which to publish. Possible values: <br />- `north-america` <br />- `europe` <br />- `asia-pacific` <br /><br />Required <br /><br />String |
| subtitlesEnabled | Determines whether a subtitles reference is included in the HLS manifest. Default is `true`. <br /><br />Optional <br /><br />Boolean |
| type | Type of slot. One of: <br />- `576` (transcode slot) <br />- `720` (transcode slot) <br />- `1080` (transcode slot) <br />- `transmux` <br /><br />Required <br /><br />String |
| useBackup | Whether to allocate a backup ingest. Default is `false`. <br /><br />Optional <br /><br />Boolean |
| username | The user name for publishing to the slot. Default credentials will be those configured for the account. <br /><br />Required if a password is specified. <br /><br />String |

**Example Usage**
*Transcode Slot Example*

The following payload will create a 576 transcode slot with all available profiles and HLS and MPEG-DASH output enabled.

```
{
     "name": "my-slot",
     "region": "north-america",
     "type": "576",
     "profiles": [
         {"id": "9"},
         {"id": "10"},
         {"id": "8"},
         {"id": "7"},
         {"id": "6"},
         {"id": "3"}
    ],
    "outputFormats": [
        "hls",
        "dash"
    ]
 }
  ```

*Transmux Slot Example*

The following payload creates the same output as the Transcode Slot Example, except only one output is produced.

```
{
     "name": "my-slot2",
     "region": "north-america",
     "type": "transmux",
     "profiles": [
      {
        "videoBitrate": 192000,
        "audioBitrate": 4000000,
        "videoWidth": 1920,
        "videoHeight": 1080
      }
    ],
    "outputFormats": [
        "hls",
        "dash"
    ]
 }
 ```

**Response**:
The created slot along with the following additional fields:

| Key | Value |
|---|---|
| id | The Slot ID is the unique identifier assigned to the slot upon slot creation. In this version of the API, the Slot ID is the same as the stream name used in encoders. <br /><br />String |
| state | State of the slot. One of: <br />- `Pending` <br />- `Ready` <br />- `Failed` <br /><br />String |
| publishUrls | Publish URLs associated with the slot. Each object contains these String properties:   <br /><br />- `primary`: primary publish URL <br />- `backup` backup publish URL <br /><br />Object |
| playbackInfo | Playback URLs for the various output types. Each object contains these String properties:   <br />- `dash`:  playback URL for DASH output <br />- `hls`: playback URL for HLS output <br />- `hds`: playback URL for HDS output <br />- `rtmp`: List of playback URLs for RTMP output <br /><br />Object |
| shortname | The account shortname for the slot. <br /><br />String |
| streamName | The stream name used in encoders.<br /><br />The streamName format must match the related regex format. For example: `^[A-Za-z][A-Za-z0-9-]` <br /><br />String |

**Errors**: Invalid value, Missing signature

### Recording Schedules {/*create-and-update-schedules*/}

The following methods are available for creating and updating schedules:

#### Create a recording schedule {/*create-a-recording-schedule*/}

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

**Response**: The created [Recording Schedule](#recording-schedule) with the following additional fields:
| Key | Value |
|---|---|
| id | String UUID of the recording schedule |
| recordingStatus | Status of the recording schedule. One of:<br />- `SCHEDULED`<br />- `RECORDING`<br />- `CANCELLING`<br />- `FINISHED` |

**Errors**: Invalid value, Missing signature

#### Update an existing recording schedule {/*update-a-recording-schedule*/}

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
| slotId | The ID of the MMD Live Slot to record.<br />String<br />Required |
| recurrenceType | Type of Recording Schedule to create.<br /><br />One of:<br />- `ONCE`<br />- `DAILY`<br />- `WEEKLY`<br />- `MONTHLY`<br /><br />String<br /><br />Required |
| allRenditions | Determines whether to record all renditions of a slot.<br /><br />Boolean<br /><br />If false, the system will only record the highest bitrate rendition of the slot.<br /><br />Required |
| enabled | Determines whether the Recording Schedule is enabled.<br /><br />Required |
| callbackUrl | URL the system will make POST requests to at various points in the recording lifecycle.<br /><br />Must be a valid http or https URL<br /><br />String<br /><br />Optional |
| timezone | Timezone locality string. The timezone that the system will record is based on the start parameter.<br /><br />Example: `America/New_York`<br /><br />String<br /><br />Required |

**Response**: The updated [Recording Schedule](#recording-schedule).

**Errors**: Invalid value, Missing signature

## API Requests - Delete  {/*delete*/}

### Slots {/*delete-slots*/}

The following method is available for deleting slots:

### Delete a slot  {/*delete-a-slot*/}

**URL**: `https://apis.llnw.com/config-api/v1/live/shortname/{account name}/slots{slot ID}`

**Formats**: `JSON`

**HTTP Method**: `DELETE`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: No payload parameters required

**Response**: The deleted [Recording Schedule](#recording-schedule).

**Errors**: Invalid value, Missing signature

### Schedules {/*delete-schedules*/}

#### Delete a recording schedule {/*delete-recording-schedules*/}

The following method is available for deleting schedules:

A Recording Schedule can only be deleted if it is in the `FINISHED` state.

A Recording Schedule will be in the `FINISHED` state if:

- Its `recurrenceType` is `ONCE`, and the recording has completed OR
- Its enabled field is `false`

**URL**: `https://apis.llnw.com/config-api/v1/live/recording/shortname/{account name}/schedules{scheduleId}`

**Formats**: `JSON`

**HTTP Method**: `DELETE`

**Requires Authentication**: Yes. See [Authentication - Signing Requests](#authentication).

**Parameters**: No payload parameters required

**Response**: The updated [Recording Schedule](#recording-schedule).

**Errors**: Invalid value, Missing signature

## Authentication - Signing Release  {/*authentication*/}

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

## Live to VoD Callbacks  {/*live-to-vod-callbacks*/}

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

## MMD Live Callbacks  {/*live-callbacks*/}

MMD Live provides the ability to monitor the state of your slots through callbacks. When you create a slot, you can optionally provide a URL to which MMD Live will send POST requests for the following events:

-   Provisioning Complete
-   Provisioning Error
-   Stream Publish
-   Stream Unpublish

### Payload Received in the POST Requests {/*payload-received*/}

| Field | Type | Description |
| --- | --- | --- |
| id  | String | The ID of the slot. |
| ingest\_type | String | Ingest type from which the callback is coming. One of:<br />-   `primary`<br />-   `backup`<br /><br />Included with `publish` and `unpublish` events. |
| shortname | String | Short name (account name) of the slot. |
| stream\_name | String | Name of the stream being published/unpublished. Included with publish and unpublish events. |
| timestamp | String | The timestamp of the event (UTC).<br /><br />Example: `2020-01-01T12:00:00Z` |
| type | String | Type of event. One of:<br />-   `provisioned`<br />-   `failed`<br />-   `publish`<br />-   `unpublish` |

### Response Samples {/*payload-received-response-samples*/}

#### Provisioning Complete {/*payload-received-provisioning-complete*/}

```
{
  "type":"provisioned",
  "timestamp":"2019-09-11T16:15:46Z",
  "shortname":"mmdstg001",
  "id":"16d3c6ebcf0241e5bc69ea0c9cde352d"
}
```

#### Provisioning Error {/*payload-received-error*/}

```
{
  "type":"failed",
  "timestamp":"2019-09-12T14:13:19Z",
  "shortname":"mmdstg001",
  "id":"16d3c6ebcf0241e5bc69ea0c9cde352d"
}
```

#### Stream Publish {/*payload-received-stream-publish*/}

```
{
  "type":"publish",
  "timestamp":"2019-09-10T19:53:12Z",
  "shortname":"mmdstg001",
  "id":"cc2857809336451b98f416e933973b2e",
  "stream_name": "cc2857809336451b98f416e933973b2e_4000",
  "ingest_type":"primary"
}
```

#### Stream Unpublish {/*payload-received-stream-unpublish*/}

```
{
  "type":"unpublish",
  "timestamp":"2019-09-10T19:53:59Z",
  "shortname":"mmdstg001",
  "id":"cc2857809336451b98f416e933973b2e",
  "stream_name": "cc2857809336451b98f416e933973b2e_4000",
  "ingest_type":"primary"
}
```

## MMD Live Profiles  {/*live-profiles*/}

This appendix explains the possible values for the list of profile objects needed when [creating a slot](#create-slot).

### Transcode Slots {/*transcode*/}

This section defines the IDs used for each transcode profile type (576, 720, 1080) in the list of profile objects required when [creating a slot](#create-slot).

The only item required and used in the profile object for transcode slots is the id field.

<Callout type="info">The order that the profile IDs are defined in the slot creation request dictate the order the various streams are listed in the manifest file when playing back the content.</Callout>

#### SD Slot - 576p {/*sd*/}

| ID  | Video Stream Resolution and Bitrate | Audio Stream Bitrate |
| --- | --- | --- |
| 3   | 1024x576 at 1.8 mbps | 128 kbps |
| 6   | 848x480 at 1 mbps | 128 kbps |
| 7   | 640x360 at 668 kbps | 64 kbps |
| 8   | 320x180 at 268 kbps | 64 kbps |
| 9   | 320x180 at 110 kbps | 64 kbps |
| 10  | Audio only | 64 kbps |

#### HD Slot - 720p {/*hd*/}

| ID  | Video Stream Resolution and Bitrate | Audio Stream Bitrate |
| --- | --- | --- |
| 2   | 1280x720 at 2.4 mbps | 192 kbps |
| 5   | 1024x576 at 1.8 mbps | 128 kbps |
| 6   | 848x480 at 1 mbps | 128 kbps |
| 7   | 640x360 at 668 kbps | 64 kbps |
| 8   | 320x180 at 268 kbps | 64k bps |
| 10  | Audio only | 64 kbps |

#### FHD Slot - 1080p {/*fhd*/}

| ID  | Video Stream Resolution and Bitrate | Audio Stream Bitrate |
| --- | --- | --- |
| 1   | 1920x1080 at 4mbps | 192 kbps |
| 4   | 1280x720 at 2.4mbps | 192 kbps |
| 5   | 1024x576 at 1.8 mbps | 128 kbps |
| 6   | 848x480 at 1 mbps | 128 kbps |
| 7   | 640x360 at 668 kbps | 64 kbps |
| 10  | Audio only | 64 kbps |

### Transmux Slots {/*transmux*/}

Transmux slots are defined by an object with `videoBitrate`, `audioBitrate`, `videoWidth`, and `videoHeight` properties.

The maximum allowed total bitrate (video + audio) of a transmux slot is 16 Mbps. Customers can choose their resolution and bitrates provided bitrates do not reach the maximum bitrate threshold.

<Callout type="info">`videoBitrate` and `audioBitrate` are in bits per second.</Callout>

**Example profile**:
```
{
  "videoBitrate": 192000,
  "audioBitrate": 4000000,
  "videoWidth": 1920,
  "videoHeight": 1080
}
```

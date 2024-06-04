---
title: API Terminology
---

## Authentication  {/*authentication*/}

See [REST APIs Common Structure](/delivery/control/support_tools/api_structure).

## Segment  {/*segment*/}

A  Segment is identified by its ID (long value) and also has name and filter (filtering type and filtering value). Supported filtering types are:
-   Published url
-   Source url
-   Geo entity id

<Callout type="info">The Segments used with the Realtime Reporting API are different from the Custom Views / "subreports" used in the non-realtime reporting API. For more information on creating Segments, please contact your Account Manager.</Callout>

<Callout type="info">Segments begin filtering data from the time they are created. Historical data cannot be included retroactively.</Callout>

## Granularity  {/*granularity*/}

The available time samples of reporting data are:
-   FIVE_MINUTES
-   HOUR
-   DAY

<Callout type="info">Retention periods for each time sample are available by querying the Traffic Retentions Endpoint and the Storage Retentions Endpoint.</Callout>

## Requested Fields / Displayed Data Values  {/*requested-fields*/}
-   datetime
-   shortname
-   policyFQDN
-   requests
-   bytes

### Geo  {/*geo*/}
-   continentId
-   continent
-   countryId
-   country
-   stateId
-   state

### Status Codes  {/*status-codes*/}
-   outBytes
-   inBytes
-   outRequests
-   inRequests
-   datetime
-   cacheCode
-   statusCode
-   shortname

### Storage  {/*storage*/}
-   datetime
-   shortname
-   policyId
-   uniqueBytes
-   uniqueObjects

### Traffic  {/*traffic*/}
-   datetime
-   totalBytes
-   outBytes
-   inBytes
-   totalBitsPerSec
-   outBitsPerSec
-   inBitsPerSec
-   totalRequests
-   outRequests
-   inRequests
-   totalRequestsPerSec
-   outRequestsPerSec
-   inRequestsPerSec
-   efficiencyRequests
-   efficiencyBytes

## Service  {/*service*/}
-   HTTP
-   HTTPS
-   HLS
-   HDS
-   MSS
-   DASH

## Status  {/*status*/}

Segment status:
-   ACTIVE
-   INACTIVE

## Realtime / Non Realtime Segments  {/*realtime*/}

A Boolean value indicating whether a Data Segment is realtime (true) or standard (false). For Standard Data Segments, only *daily* report granularity is supported within queries.

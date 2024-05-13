---
title: Logging Out
---
You can log out with the JSON-RPC interface only.


## Logging Out Using the JSON-RPC Interface  {/**/}
Method name: `logout`

Logs out of Origin Storage and frees any used resources.

```JSON-RPC
{
  "method": "logout",
  "id": 1,
  "params": {
    "token": "b9c13ffb-aa9d-4d5f-9005-165f2cd81e84"
  },
  "jsonrpc": "2.0"
}
```

## Logging Out Using Positional Parameters  {/*logging-out-using-positional-parameters*/}
Example:

```JSON-RPC
{
  "method": "logout",
  "id": 1,
  "params": [
    "920cdcdf-e48f-49b6-b1f8-3361cc099bce"
  ],
  "jsonrpc": "2.0"
}
```

## Parameter Descriptions  {/*parameter-descriptions*/}

|Parameter Name|Type|Description
|---|---|---|
|token|str|Valid token from a call to login (JSON-RPC interface) or /`account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.|

## Return Codes  {/*return-codes*/}
- **`0`**: success
- **`-1`**: invalid token
- **`-2`**: operation not permitted

<Callout type="info">For a list of error codes not specific to `logout`, see [Global Error Codes](/delivery/storage/reference_materials/global_error_codes).</Callout>

## Response Data  {/*response-data*/}
Returns only the codes discussed in Return Codes. Does not return any data structures.

## Python Sample Request  {/*python-sample-request*/}
Log out:

```Python
>>> api.logout(token)

0
```

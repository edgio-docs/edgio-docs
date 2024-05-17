---
title: Verifying the Server API Connection
---
On occasion you may need to verify that the API connection with the server is still valid.

You can verify server API connections with the JSON-RPC interface only.

Two methods are available, one requires a token and the other does not:

- [Perform a Server Verification, Passing a Token](#pass-token)
- [Perform a Server Verification, Not Passing a Token](#no-pass-token)

## Perform a Server Verification, Passing a Token  {/*pass-token*/}

Method name: `noop`

Uses a valid token to verify the server connection. The request does nothing but return the operation that you pass.

<Callout type="info">You can also use this method to determine if your token is still valid.</Callout>

### Verify Using Named Parameters  {/*verify-using-named-parameters*/}
Pass an operation:
```JSON
{
  "method": "noop",
  "id": 1,
  "params": {
    "token": "5636f162-8eee-4d30-a5c7-bb65fd6da2ab",
    "operation": "test"
  },
  "jsonrpc": "2.0"
}
```

Don't pass an operation:

```JSON
{
  "method": "noop",
  "id": 2,
  "params": {
    "token": "5f743f54-5164-46bc-929a-cf9b55a282ff"
  },
  "jsonrpc": "2.0"
}
```
### Verify Using Positional Parameters  {/*verify-using-positional-parameters*/}
Positional parameters must be applied in the same order shown in the named parameters sample.

Pass an operation:

```JSON
{
  "method": "noop",
  "id": 1,
  "params": [
    "5636f162-8eee-4d30-a5c7-bb65fd6da2ab",
    "test"
  ],
  "jsonrpc": "2.0"
}
```

Don't pass an operation:

```JSON
{
  "method": "noop",
  "id": 3,
  "params": [
    "5f743f54-5164-46bc-929a-cf9b55a282ff"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions  {/*parameter-descriptions*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
|token|str|Valid token from a call to `login` (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.|
|operation|any type|Optional<br /><br />A "dummy" operation to pass. You can pass any value.<br /><br />Defaults to 'pong'.

### Return Codes  {/*return-codes*/}
- **`0`**: success
- **`-10001`**: invalid token

<Callout type="info">For a list of error codes not specific to `noop`, see [Global Error Codes](/delivery/storage/reference_materials/global_error_codes).</Callout>

### Response Data  {/*response-data*/}
On success returns an object with the following data:

- **code**: (int) return code
- **operation**: (str) operation passed to the method, or defaulted by the method

Example:

```
{
  "code": 0,
  "operation": "test"
}
```

On failure returns an object like the following, with code set to the appropriate value described in [Return Codes](#return-codes):

```
{
  "code": -10001
}
```

### Python Sample Requests {/*python-sample-requests*/}
Pass a string for the operation parameter:

```Python
>>> api.noop(token, 'operation')
{u'operation': u'operation', u'code': 0}
```

Call the method, not passing an operation:

```Python
>>> api.noop(token)
{u'operation': u'pong', u'code': 0}
```

#### Additional Information{/*additional-info*/}
See any of the following sections for related information:

- Logging in, and setting a token expiry while logging in: [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.
- Setting a token expiry after logging in: [Set Your Token's Expiry](/delivery/storage/apis/api_calls/working_with_sessions/#set-your-tokens-exiry).
- Checking your token's age: [Determine Your Token's Age](/delivery/storage/apis/api_calls/working_with_sessions/#determine-token-age).

## Perform a Server Verification, Not Passing a Token  {/*no-pass-token*/}

Method name: `ping`

Verifies the server connection. Does not require a token. The request does nothing but return the provided operation.

### Verify Using Named Parameters {/*verify-using-named-parameters2*/}
Pass an operation:

```JSON
{
  "method": "ping",
  "id": 1,
  "params": {
    "operation": "test"
  },
  "jsonrpc": "2.0"
}
```
Don't pass an operation:

```JSON
{
  "method": "ping",
  "id": 2,
  "params": {},
  "jsonrpc": "2.0"
}
```

### Verify Using Positional Parameters {/*verify-using-positional-parameters2*/}
Pass an operation:


```JSON
{
  "method": "ping",
  "id": 1,
  "params": {
    "operation": "test"
  },
  "jsonrpc": "2.0"
}
```
Don't pass an operation:

```JSON
{
  "method": "ping",
  "id": 3,
  "params": [],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*parameter-descriptions2*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
|operation|any type|Optional<br /><br />A "dummy" operation to pass. You can pass any value.<br /><br />Defaults to 'pong'.|

### Return Codes {/*return-codes2*/}
- **`0`**: success

<Callout type="info">For a list of error codes not specific to `ping`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data {/*response-data2*/}
On success returns an object with the following data:

- **code**: (int) return code
- **operation**: (str) operation passed to the method, or defaulted by the method

Example:

```JSON
{
  "code": 0,
  "operation": "4"
}
```

### Python Sample Requests {/*python-sample-requests2*/}

Pass a number for the operation parameter:

```Python
>>> api.ping(4)
{u'operation': 4, u'code': 0}
```

Call the method, not passing an operation:

```Python
>>> api.ping()
{u'operation': 'pong', u'code': 0}
```

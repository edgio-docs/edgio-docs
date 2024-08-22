---
title: Working with Sessions in the JSON-RPC Interface
---

Origin Storage provides APIs that help you manage your session lifetime. For example, you can test to determine if your session has expired. You can also set your token to expire after a certain amount of time or never expire.

Session-related APIs are available in the JSON-RPC interface only.

The JSON-RPC interface provides these session-related methods:

[Determine Your Token's Age](#determine-token-age)

[Set Your Token's Expiry](#set-your-tokens-exiry)



## Determine Your Token's Age {/*determine-token-age*/}
Method name: `checkToken`

Returns your token's age in seconds. For example, if your token is set to expire at a known time and if your are running a series of time-consuming method calls, you can periodically call this method to determine if your token is approaching its end of life. If it is, you can re-authenticate (See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.). Then continue with your method calls, thus ensuring that your calls will not fail due to an expired token.

### Determine Token Age Using Named Parameters {/*using-named-parameters*/}

```JSON
{
  "method": "checkToken",
  "id": 1,
  "params": {
    "token": "f2f12f31-49dd-434a-ae10-017a138349d5"
  },
  "jsonrpc": "2.0"
}
```

### Determine Token Age Using Positional Parameters  {/*using-positional-parameters*/}

```JSON
{
  "method": "checkToken",
  "id": 1,
  "params": [
    "675b8d1a-45b1-487a-9396-4d240991600d"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Details {/*parameter-details*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
|token|str|Valid token from a call to login (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.|

### Return Codes {/*return-codes*/}
-   **0**: success
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `checkToken`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>


On success returns an object with the following data:
-   **age**: (float) token's age in seconds
-   **code**: (int) return code of the checkToken request; see [Return Codes](#Return2)
-   **gid**: (int) group ID of user that created by token by logging in
-   **path**: (str) caller's namespace.
-   **uid**: (int) user ID of user that created by token by logging in
-   **username**: (str) user name of user that created by token by logging in

Example:
```JSON
{
  "uid": 12020,
  "path": "/{Account name}",
  "code": 0,
  "gid": 100,
  "age": 0.235221862793,
  "username": "jvillarreal"
}
```

On failure returns an object like the following, with code set to the appropriate value described in [Return Codes](#return-codes):

```JSON
{
  u'code': -10001
}
```

### Python Sample Requests  {/*python-sample-requests*/}

Check token:

```Python
>>> api.checkToken(token)
{u'username': u'guest', u'code': 0, u'uid': 1020679, u'age': 18351.7339401, u'gid': 1086903, u'path': u'/{your Account name}'}
```

## Set Your Token's Expiry  {/*set-your-tokens-exiry*/}

Method name: `updateSession`

Sets your token to expire after a certain amount of time or sets it to never expire.

<Callout type="info">You can call updateSession only once per session. Calling the method more than once results in a `-1` return code.</Callout>

### Set Token Expiry Using Named Parameters {/*set-token-expiry-using-named-parameters*/}

Pass an expire time:

```JSON
{
  "method": "updateSession",
  "id": 1,
  "params": {
    "token": "a8068cf8-4cae-466c-b95a-6f578eb58604",
    "expire": 7200
  },
  "jsonrpc": "2.0"
}
```

Omit expire time, causing the token to never expire:

```JSON
{
  "method": "updateSession",
  "id": 4,
  "params": {
    "token": "d7a2bded-4e83-41ba-a712-40be4073c29f"
  },
"jsonrpc": "2.0"
}
```

### Set Token Expiry Using Positional Parameters {/*set-token-expiry-using-positional-parameters*/}

Positional parameters must be applied in the same order shown in the named parameters sample.

Pass an expire time:

```JSON
{
  "method": "updateSession",
  "id": 3,
  "params": [
    "d896310e-fb96-4e98-a892-eb11b31cfe3a"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions {/*parameter-descriptions2*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| token | str |  Valid token from a call to login (JSON-RPC interface) or `/account/login` (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.|
| expire | int | Optional<br /><br />Amount of time in seconds, after which your token will expire. To set your token to never expire, pass zero or pass only your token.<br /><br />Defaults to 0. |


### Return Codes {/*return-codes2*/}
-   **0**: success
-   **\-1**: session not updated or expiry already set
-   **\-34**: invalid expiration
-   **\-10001**: invalid token

<Callout type="info">For a list of error codes not specific to `updateSession`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>


### Response Data {/*response-data2*/}
Returns only the codes discussed in [Return Codes](#return-codes2). Does not return any data structures.


### Python Sample Requests {/*python-sample-requests2*/}
Set token to expire after two hours:

```Python
>>> api.updateSession(token, 7200)
0
```

Two options to set token to never expire:

```Python
>>> api.updateSession(token, 0)
0
>>> api.updateSession(token)
0
```

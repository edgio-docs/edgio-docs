---
title: Initializing HMAC Key Pairs in the JSON-RPC interface
---
Method name: `initKeyPair`

Generates a paired access key and secret key on a per account basis, replacing any previously generated key pairs. Use the key pair when creating signed requests.

<Callout type="info">The secret key, once generated, will not be available via any API calls and you must stored it in a secure place. If you lose the secret key, Edgio cannot recover it and you must generate a new access key (with a new secret key).</Callout>

## Named Parameters Example  {/*named-parameters-example*/}

```JSON
{
  "method": "initKeyPair",
  "id": 1,
  "params": {
    "token": "b072c8e4-b2db-4f78-94de-1cd90dc8d881"
  },
  "jsonrpc": "2.0"
}
```

## Positional Parameters Example  {/*positional-parameters-example*/}
Example:

```JSON
{
  "method": "initKeyPair",
  "id": 0,
  "params": [
    "dc3993e8-6ccb-4a26-b951-b26bfd52d196"
  ],
  "jsonrpc": "2.0"
}
```
## Parameter Descriptions  {/*parameter-descriptions*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
|token|str|Valid token from a call to login (JSON-RPC interface) or /account/login (HTTP interface). See [Log In Using JSON-RPC](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface) and [Log in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface), respectively.|

## Return Codes  {/*return-codes*/}
- **`0`**: success
- **`-10001`**: invalid value for token parameter
- **`-10004`**: unable to generate access key. Contact your Account Manager.

<Callout type="info">For a list of error codes not specific to `initKeyPair`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

## Response Data
-   **access_key**: (str) key to use when signing a request
-   **code**: (int) return code; zero indicates success, non-zero indicates failure
-   **secret_key**: (str) secret key to use when signing a request

Example:

```
{
  u'access_key': u'8228c1626c8ab9356c6020eede8f69846d8b',
  u'secret_key': u'86b2b120bf50e635ca84fd91524e5e32e344',
  u'code': 0
}
```
On failure returns a single value set to the appropriate value described in [Return Codes](#return-codes).

## Python Sample Requests  {/*python-sample-request*/}
Generate a key pair:

```Python
>>> api.initKeyPair(token)
{u'access_key': u'b837132e7ebbea404e5dff8a59358228c1626c856c6069846d8b', u'secret_key': u'86b2b120bf50e6a4fdaeab8be0153818a66ba1710b2a1c9f4',u'code': 0}
```

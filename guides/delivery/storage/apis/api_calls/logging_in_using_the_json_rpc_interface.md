---
title: Logging in Using the JSON-RPC Interface
---
The JSON-RPC interface provides these methods for logging in:

[Log In](#log-in)

[Log in to a Subdirectory](#log-in-to-subdirectory)

## Log In  {/*log-in*/}
Method name: `login`

Logs into Origin Storage and obtains a token for subsequent calls. Note that by default the token is valid for one hour. If you want to extend your token's lifetime, use the `updateSession` call. (See [Set Your Token's Expiry](/delivery/storage/apis/api_calls/working_with_sessions/#set-your-tokens-exiry) for details.)

### Log In Using Named Parameters  {/*log-in-using-named-parameters*/}

```JSON
{
  "method": "login",
  "id": 0,
  "params": {
    "username": "yourUser",
    "password": "yourPassword",
    "detail": true
  },
  "jsonrpc": "2.0"
}
```

### Log In Using Positional Parameters  {/*log-in-using-positional-parameters-1*/}
Positional parameters must be applied in the same order shown in the named parameters sample. Example:

```JSON
{
  "method": "login",
  "id": 0,
  "params": [
    "yourUser",
    "yourPassword",
    true
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions  {/*parameter-descriptions-1*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| username | str | User name |
| password | str | User password |
| detail | bool | Optional<br /><br />Indicates whether to include additional account information in method output. See [Response Data](#response-data-named) for details.<br /><br />Defaults to `False`. |

### Return Codes   {/*return-codes-named-1*/}
-   On success the method returns an array with a token and user data.
-   If either user or password or both are incorrect, the method returns `[null, null]`.

Other return values:

-   **`-32603`**: protocol error. You omitted either user or password or both.
-   **`-40`**: You passed an empty string for username.
-   **`-41`**: You passed an empty string for password.

<Callout type="info">For a list of error codes not specific to login, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>



### Response Data  {/*response-data-named*/}
On success returns an array with a token and user details. The token is the first member of the array. On failure returns `[null, null]`.

When the detail parameter is set to False, the method returns the following data:

-   **gid**: (int) caller's group ID
-   **token**: (str) token for use in subsequent calls
-   **uid**: (int) caller's user ID

**Example**:
```JSON
[
   "920cfb89-fc44-4049-a2ea-8f05717eed16",
  {
    "uid": 12020,
    "gid": 100
  }
]
```

When the detail parameter is set to True, the method returns the following additional data:

-   **path**: (str) user path within namesapce

**Example**:

```JSON
[
  "44ab329a-316c-40ee-8dce-4be91ca832e2",
  {
    "path": /{your Account name},
    "uid": 12020,
    "gid": 100
  }
]
```

On failure returns values that represent the nature of the failure as described in Return Codes.

Log in, passing an invalid user:

```JSON
>>> api.login('invalidUser', 'password', True)
[None, None]
```

Log in, passing an empty string for user:

```JSON
>>> api.login('', 'password', True)
-40
```

### Python Sample Requests  {/*python-sample-requests-1*/}
Log in and obtain the token and user information without user details:

```Python
>>> token, user = api.login('user', 'password')
>>> print (token)
u'38c5a5d6-8d0f-47d2-a8f8-ced037a9922e'
>>> user
{u'gid': 100, u'uid': 12020}
```

Log in and obtain the token and user information with user details:

```
>>> token, user = api.login('user', 'password', True)
>>> print (token)
u'38c5a5d6-8d0f-47d2-a8f8-ced037a9922e'
>>> user
{u'path': u'/{your Account name}', u'gid': 100, u'uid': 12020}
```

Log in and check for errors:

```Python
import jsonrpclib

class LoginError(RuntimeError):
  def __init__(self, arg):
    self.args = arg


yourUser = 'yourUser'
yourPassword = 'yourPassword'
url = 'http://{Account name}.upload.llnw.net/jsonrpc'

try:
  api = jsonrpclib.Server( url )

  res = api.login(yourUser, yourPassword, True)

  if res == -40 or res == -41 or res == -32603:
    msg ='Error logging in.' + '\n  Return code: ' + str( res )
    msg += '\n  See API documentation for details.'
    raise LoginError( msg )

  if res == [None, None]:
    raise LoginError('Invalid login credentials: ' + yourUser + ' / ' + yourPassword)

  token = res[0]
  print token

  #...

except LoginError,e:
  print ''.join( e.args )
  ```

## Log in to a Sub-directory  {/*log-in-to-subdirectory*/}

Method name: `authenticate`

Limits operations to a specific sub-directory in a user namespace. The method is a convenience as the directory is treated as a root so you don’t have to include the part of the path above the directory when making calls such as `listDir`. Provides better error codes and allows the caller to optionally set a token expiry and to set the sub-directory per token.

This functionality is also available in the HTTP interface by using the `X-Agile-Subdir` header in the `/account/login` call. For more information, see [Logging in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface).

### Log In Using Named Parameters  {/*log-in-using-named-parameters-2*/}

```JSON
{
  "method": "authenticate",
  "id": 1,
  "params": {
    "username": "yourUser",
    "password": "yourPassword",
    "expiry": 2800,
    "subdir": "/"
  },
  "jsonrpc": "2.0"
}
```
### Log In Using Positional Parameters  {/*log-in-using-positional-parameters-2*/}

```JSON
{
  "method": "authenticate",
  "id": 0,
  "params": [
    "yourUser",
    "yourPassword",
    2800,
    "/"
  ],
  "jsonrpc": "2.0"
}
```

### Parameter Descriptions  {/*parameter-descriptions-2*/}

| Parameter Name | Type | Description |
| --- | --- | --- |
| username | str | User name |
| password | str | User password |
| expiry | int | Optional<br /><br />Amount of time in seconds after which the caller must re-authenticate. Expiry values greater than 24 hours (86400 seconds) are not valid.<br /><br />Defaults to 3600 seconds (one hour). |
| subdir | str | Optional<br /><br />The sub-directory to which caller operations will be restricted.<br /><br />Defaults to '/' (root). |

### Return Codes  {/*return-codes-2*/}

-   **0**: success
-   **-34**: invalid expiry time
-   **-40**: you passed an empty string for username
-   **-41**: you passed an empty string for password
-   **-47**: invalid sub-directory
-   **-10001**: invalid username or password. Or both username and password were not passed

<Callout type="info">For a list of error codes not specific to `authenticate`, see [Global Error Codes](/delivery/storage/apis/reference_materials/global_error_codes).</Callout>

### Response Data  {/*response-data-2*/}

On success returns an object with the following data:

-   **code**: (int) always set to 0 (success)
-   **gid**: (int) caller's group ID
-   **path**: (str) sub-directory to which caller operations will be limited. Includes the caller's namespace.
-   **token**: (str) token for use in subsequent calls. If you had previously obtained a token with the login method, you can no longer use if after making the call to authenticate.
-   ****uid**:** (int) caller's user ID

**Example**:

```
{
  "uid": 12020,
  "path": "/{your Account name}/horticulture/flowers/perrenials",
  "gid": 100,
  "code": 0,
  "token": "e4590b08-7e7d-444a-9bac-41503c00994c"
}
```

On failure returns an object with values set as follows:

-   **code**: (int) set to one of the non-zero values listed in [Return Codes](#Return).
-   **gid**: (int) 0
-   **path**: (str) sub-directory passed by the user
-   **token**: null
-   **uid**: (int) 0

**Example**:

```
{
  "uid": 0,
  "path": "/{your Account name}/horticulture/flowers/perrenials",
  "gid": 0,
  "code": -34,
  "token": null
}
```

### Python Sample Request  {/*python-sample-request-2*/}

```Python
>>> api.authenticate('user', 'password', 7200, '/horticulture/flowers/perrenials')
{u'path': u'/{your Account name}/horticulture/flowers/perrenials', u'token': u'42e9aead-92da-4ae4-bd3e-7e967932bh73', u'code': 0, u'uid': 12020, u'gid': 100}
```

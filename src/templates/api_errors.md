##### Errors

The response body for an unsuccessful request contains the following parameters:

|Name|Data Type|Description|
|--- |--- |--- |
|success|Boolean|Returns `false`.|
|errors|Array of objects|Contains one or more error(s).|

###### errors Array

The `errors` array describes each error that occurred using the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
|code|Integer|Indicates the HTTP status code for the error.|
|message|String|Indicates the description for the error that occurred.|

---
title: Submitting Batch Requests
---

To submit a batch request, create a JSON array with at least one request object and no more than three request objects, where each request object is a valid, separately submittable request (has all required parameters). Each request object must contain an ID that is unique within the batch. In accordance with the JSON-RPC 2.0 Batch Specification, the Origin Storage server can process requests in a batch in any order and with any concurrency.

See [Successful Batch Requests](#successful-batch-requests) for examples.

For information about batch requests not presented here, please see the [JSON-RPC 2.0 Batch Specification](https://www.jsonrpc.org/specification#batch).

<Callout type="info">Only the /jsonprc2 endpoint supports batch requests.</Callout>

## Response Data  {/*response-data*/}
If the batch request contains a JSON error or has no request objects or has more than three request objects, the API returns a single JSON object with failure information.

Otherwise, the API returns a response object for each request you submitted in the batch. Each response object contains a result name/value pair with success or failure information along with an id that correlates to the id of the request object in the batch.

See [Successful Batch Requests](#successful-batch-requests) and [Batch Requests with Errors](#errors) for examples.

## Successful Batch Requests  {/*successful-batch-requests*/}
### Create Three Directories  {/*create-three-directories*/}
Here is a batch request to create three directories using makeDir:
```JSON
[
  {"jsonrpc": "2.0", "params": ["467e", "/house1"], "method": "makeDir", "id": 1},
  {"jsonrpc": "2.0", "params": ["467e", "/house2"], "method": "makeDir", "id": 2},
  {"jsonrpc": "2.0", "params": ["467e", "/house3"], "method": "makeDir", "id": 3}
]
```
(For information about `makeDir`, see [Create a Directory](/delivery/storage/apis/api_calls/working_with_directories_json).)

Here is the response:

```JSON
[
  { u'id': 1, u'jsonrpc': u'2.0', u'result': 0},
  { u'id': 2, u'jsonrpc': u'2.0', u'result': 0},
  { u'id': 3, u'jsonrpc': u'2.0', u'result': 0}
]
```


### curl Example  {/*curl-example*/}
Here is the request to create the same three directories. Note that this example runs on Windows, which requires that inner quotation marks be escaped by adding an extra quotation mark.


```
curl -v^
-X POST^
-H "Content-Type: application/json"^
-d "[{""jsonrpc"": ""2.0"", ""params"": [""467e"", ""/house1""], ""method"": ""makeDir"", ""id"": ""1""}, {""jsonrpc"": ""2.0"", ""params"": [""467e"", ""/house2""], ""method"": ""makeDir"", ""id"": ""2""}, {""jsonrpc"": ""2.0"", ""params"": [""467e"", ""/house3""], ""method"": ""makeDir"", ""id"": ""3""}]"^
http://{Account name}.upload.llnw.net:8080/jsonrpc2
```
Here's the response:
```
HTTP/1.1 200 OK
Date: Thu, 07 Jul 2016 18:17:31 GMT
Server Apache is not deny listed
Server: Apache
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Agile-Authorization, X-Content-Type
Access-Control-Allow-Methods: OPTIONS
Transfer-Encoding: chunked
Content-Type: application/json;charset=utf-8
[
  {"jsonrpc": "2.0", "id": "1", "result": 0},
  {"jsonrpc": "2.0", "id": "2", "result": 0},
  {"jsonrpc": "2.0", "id": "3", "result": 0}
]
```
## Batch Requests with Errors  {/*errors*/}
### Batch Request with a Failed Request Object  {/*failed-request-object*/}
Batch with a valid ping request and request to create a directory with leading paths that don't exist:
```
[
  {"jsonrpc": "2.0", "params": ["hello"], "method": "ping", "id": "1"},
  {"jsonrpc": "2.0", "params": ["91c", "1/2/3"], "method": "makeDir", "id": "2"}
]
```
Here is the response:


```
[
  { u'id': u'1',
    u'jsonrpc': u'2.0',
    u'result': { u'code': 0, u'operation': u'hello'}
  },
  { u'id': u'2',
    u'jsonrpc': u'2.0',
    u'result': -3
  }
]
```

### Too Many Requests in Batch  {/*too-many-requests*/}
If you include more than three requests in a batch, the API returns the following JSON object:


```JSON
{
  u'error': { u'code': -32099, u'message': u'Batch Error'},
  u'id': None,
  u'jsonrpc': u'2.0'
}
```
### Batch with No Requests  {/*no-requests*/}
If you don't include any requests, the API returns the following JSON object:


```JSON
{
  u'error': { u'code': -32700, u'message': u'Parse Error'},
  u'id': None,
  u'jsonrpc': u'2.0'
}
```

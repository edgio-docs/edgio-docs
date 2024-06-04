---
title: Global Error Codes
---
The following error codes, not specific to any method, sometimes occur while you are using the Origin Storage APIs.


| Error Number | Error Classification | Description |
| --- | --- | --- |
| \-10001 | Edgio-specific | Invalid authentication credentials |
| \-32000 | Edgio-specific | Unspecified server error. Edgio-specific error |
| \-32099 | Edgio-specific | Batch error. Limelight-specific error |
| \-32600 | JSON Org predefined | Invalid request. Occurs in any of the following conditions:<br /><br />A request did not contain 2.0 in the jsonrpc member of the Request object.<br /><br />A request did not have a method member in the Request object. |
| \-32601 | JSON Org predefined | Method not found. Occurs in any of the following conditions:<br /><br />A request included a method name that started with '\_'<br /><br />A request contained a method that is not part of the API set. |
| \-32602 | JSON Org predefined | Bad parameters<br /><br />A request contained invalid parameters |
| \-32603 | JSON Org predefined | Unspecified internal error. Sometimes returned when you pass invalid parameters to a call. |
| \-32700 | JSON Org predefined | Parsing error |

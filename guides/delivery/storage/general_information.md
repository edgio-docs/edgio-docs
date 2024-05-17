---
title: Storage APIs General Information
---
This guide contains technical reference information for developers interested in or intending to integrate their workflow or application with the Edgio Origin Storage platform using the HTTP interface and the JSON-RPC Application Programming Interface (API).

Both JSON-RPC 1.0 and 2.0 are supported by the JSON-RPC interface. This document contains information required for the use of JSON-RPC but if you are not familiar with JSON-RPC, it is also recommended you refer to the detailed JSON-RPC specification reference information provided at the following URLs:

- JSON-RPC 1.0: http://json-rpc.org/wiki/specification
- JSON-RPC 2.0: http://www.jsonrpc.org/specification

## Before you Begin  {/*before-you-begin*/}
To use any of the Origin Storage APIs, you need an active Origin Storage account, a user ID, and a password. Your Edgio Account name is in the Welcome letter you received when you purchased Origin Storage. Please contact your Edgio representative if you have any questions.

Your Edgio Account name is part of the URL to which you will direct API calls. In this documentation, the Edgio Account name and URL are represented as follows:

- `http://{Account name}.upload.llnw.net/jsonrpc2` for calls in the JSON-RPC interface
    - Example: http://supercustomer.upload.llnw.net/jsonrpc2
- `http://{Account name}.upload.llnw.net` for calls in the HTTP interface
    - Example: http://supercustomer.upload.llnw.net

<Callout type="info">If you are a long-standing customer and the preceding endpoints fail to resolve, you should use the following endpoints with the -l suffix after `{Account name}:`<br />- `http://{Account name}-l.upload.llnw.net/jsonrpc2` for calls in the JSON-RPC interface<br />- `http://{Account name}-l.upload.llnw.net` for calls in the HTTP interface</Callout>

Also note that all your content is stored in the root directory in a sub-directory named for your Edgio Account name:
<br />`/{Account name}/EMEA/games`
<br />Example: `/supercustomer/EMEA/games`

## Available Interfaces  {/*available-interfaces*/}
Origin Storage lets you access APIs via two interfaces:

- HTTP interface: Provides multipart and non-multipart file upload capabilities. Also lets you log in and create directories
- JSON-RPC Interface: Contains the more comprehensive set of APIs, allowing such functionality as logging in, logging out, and working with existing files and directories in Origin Storage.

<Callout type="info">The JSON-RPC interface is, by nature, language-neutral because you can make requests in any programming language that supports JSON-RPC. In the interest of language-neutrality, parameters in this document are presented in sample JSON request messages. Samples are provided for both positional parameters and named parameters. (See the JSON-RPC specification for details.)</Callout>

For a list of APIs in each interface, see [Index of Supported API Calls](/delivery/storage/apis/general_information/index_of_supported_api_calls).

## Cross-Origin Resource Sharing Compliance  {/*cors*/}
The Origin Storage API is in full compliance with the W3C Cross-Origin Resource Sharing (CORS) recommendation, allowing our customers to develop full web based-interfaces to manage their storage account without the need of an intermediate back-end system.

## C# API Library  {/*c-api-library*/}
An open source C# library is available that allows simple, flexible uploads to Origin Storage. The library also includes support for most methods in the JSON-RPC interface. The library:

- is typed so you can work with classes instead of raw JSON data
- comes with a Visual Studio solution file

You can download the library and view its documentation at [Edgio's public GitHub account](https://github.com/llnw). Once at the site, click the *orchestrate-storage-csharp-sdk* link.

## Parameter and HTTP Request Header Descriptions  {/*paramater-and-http*/}
All parameters and headers are required unless marked "Optional."

## API Success and Failure Indicators  {/*success-indicators*/}
API calls in both the JSON-RPC and the HTTP interface return status information.

## JSON-RPC Status Indicators  {/*status-indicators*/}
Methods in the JSON-RPC include a return code that indicates success or failure. The value 0 indicates success. Failure codes are negative numbers with specific meanings. For example, -1 returned from the listDir method means that you passed an invalid directory name to the method.

For APIs that request data, return codes are an object in the code name-value pair as in this example from the noop call:

```JSON-RPC
{
  "code": 0,
  "operation": "test"
}
```

APIs that perform an operation return a single numeric code and no object. Following are those APIs:

- abortMultipart
- fetchFileHTTP
- deleteDir
- deleteFile
- logout
- makeDir
- makeDir2
- rename
- restartMultipart
- setContentType
- setMTime
- updateSession

## HTTP Status Indicators  {/*http-status-indicators*/}
Responses from HTTP calls always include the standard HTTP response code along with a response header that contains specific codes for success and failure. With one exception the header is called `X-Agile-Status`.

Also note that the `/post/directory` call returns a JSON object with a status code and description. (See [Create a Directory](/delivery/storage/apis/api_calls/api_reference/working_with_directories_http) for details.)

Of course the actual HTTP Status Code (200, 400, and so on) also gives an indication of the success or failure of a call.

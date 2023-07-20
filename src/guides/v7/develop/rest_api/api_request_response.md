---
title: API Request and Response
---

This section provides an overview of the basic structure for the request to our REST API services and the response provided to the client.

## HTTP Method {/*http-method*/}

HTTP method is a critical component of a request to our REST API service as it determines the type of action being requested.

-   **DELETE:** Deletes a resource (e.g., custom rule or managed rule configuration).
-   **GET:** Retrieves all or a specific resource.
-   **POST:** Creates a resource (e.g., custom rule or managed rule configuration).
-   **PUT:** Updates a resource (e.g., custom rule or managed rule configuration).

<Callout type="info">

  Our REST API service may return a `405 Method Not Allowed` response for requests submitted with an unsupported HTTP method.
  
</Callout>

## Request URL {/*request-url*/}

Requests to services that leverage our API gateway follow this basic pattern:

`{{ API_URL }}/<SERVICE>/<VERSION>/<TEAM ID>/<RESOURCE>`

-   `<SERVICE>`**:** Identifies the REST API web service (e.g., waf) designed to manage requests for a specific set of resources.
-   `<VERSION>`**:** Identifies the version of the REST API service that will be called.
-   `<TEAM ID>`**:** Identifies your team by its system-defined ID.
-   `<RESOURCE>`**:** Identifies the type of resource to which the action defined by the HTTP method will be applied.

**Sample request:** `{{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/12345/profile`

## Request Headers {/*request-headers*/}

Request headers provide information about your request to a REST API service. This information allows our server to authenticate your request and provides information that allows it to receive and translate the request body.

**Key information:**
-   The use of a Byte Order Mark (BOM) in a request to the REST API is not supported. Some user agents are configured to automatically include a BOM. Please either configure the user agent to exclude the BOM or use a different user agent.
-   Request header values are case-insensitive.

| Request Header  | Description  |
|---|---|
| Authorization  | Authorize requests through the `Authorization` request header. [Learn more about authorization.](/guides/develop/rest_api/authorization#authorizing-requests)  |
| Accept  | This header should indicate the format in which the response will be returned. The recommended value for this request header is: `application/json`.|
| Content-Type | This header should indicate the format of the request body. The recommended value for this request header is: `application/json`. <br />You may omit this header when an endpoint does not have request properties. |
| Host  | This header, which is set by the user agent, indicates the host name corresponding to the requested endpoint (i.e., {{ API_DOMAIN }}.  |
| Content-Length  | This header, which is set by the user agent, indicates the number of bytes contained in the request body.  |

## Request Body {/*request-body*/}

`PUT` and `POST` requests typically require request body properties that describe the action that will take place. These request body properties are case-sensitive.

## Response Headers {/*response-headers*/}

Response headers provide information about the response to your request to the REST API service. A brief description is provided for the response headers that are returned by most endpoints. Standard HTTP response headers are typically returned along with these common response headers.

| Response Header  | Description   |
|---|---|
| Cache-Control  | Indicates the cache-control policy for the response body.  |
| Content-Length  | Indicates the number of bytes in the response body.  |
| Content-Type  | Indicates the format of the response body (e.g., `application/json; charset=utf-8`).  |
| I_am  | This header is reserved for internal use.  |
| Date  | Identifies the date and time (UTC) at which your request was processed.  |

In addition to the above headers, the response may also include the following headers:

`x-amz-apigw-id | x-amzn-Remapped-Date | x-amzn-Remapped-Server | x-amzn-RequestId | X-AspNet-Version | X-Location`

These headers are reserved for future use.

## Status Codes {/*status-codes*/}

Each request to the REST API returns a standard HTTP 1.1 status code, as defined in the [HTTP 1.1 Status Code Definitions (RFC 2616)](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). This HTTP status code indicates whether the request was successful.

-   A `2xx` response (e.g., `200 OK`) indicates that the request was successfully carried out. This means that the request was processed by our servers and the proper response was returned. However, the proper response may be an empty response body. For example, updating a resource (e.g., `PUT` request) will typically return an empty response body.
-   All non-`2xx` status codes indicate that an error occurred while processing the request. The response body typically contains an error message that provides additional information as to why the request was denied.

### Error Reporting {/*error-reporting*/}

The format for error reporting varies by product.

#### Format - ({{ PRODUCT }} {{ PRODUCT_SECURITY }} Endpoints)

Our {{ PRODUCT }} {{ PRODUCT_SECURITY }} endpoints use the following base URL:

`{{ API_URL }}/waf/{{ API_SECURITY_VERSION }}/<TEAM ID>/<RESOURCE>`

{{ API_ERRORS.md }}

A sample JSON response body is provided below.

```
{
    "errors": [{
            "message": "Invalid date range, beginning date too old: 2022-11-08 00:00:00 < 2022-05-04 20:37:53",
            "code": 400
        }
    ]
}
```
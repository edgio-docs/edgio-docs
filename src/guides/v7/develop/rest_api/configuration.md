---
title: Configuration
---

The following operations retrieve and set an environment's origins, hostnames, rules, and RTLD configuration:

-   [Get Configuration Bundle](#get-configuration-bundle)
-   [Update Configuration Bundle](#update-configuration-bundle)

## Authorization {/*authorization*/}

Authorize requests through the `app.config` scope.

[Learn more about authorization.](/guides/develop/rest_api/authentication)

## Get Configuration Bundle {/*get-configuration-bundle*/}

Retrieves a configuration bundle. This bundle may contain origin configurations, hostnames, rules, and RTLD configurations.

<h3>Request</h3>

A request to retrieve a configuration bundle is described below.

`GET {{ API_URL }}/config/{{ API_CONFIG_VERSION }}/<TEAM ID>/configs/<BUNDLE ID>`

Define the following variables when submitting the above request:

{{ TEAM_ID }}
-   `<BUNDLE ID>`**:** Required. Replace this variable with the system-defined ID for the desired configuration bundle.
<!--
    <Callout type="tip">

      Use the [Get All Configuration Bundles operation](#get-all-configurations) to retrieve a list of configuration bundles and their system-defined IDs

	</Callout>
-->

{{ API_REQUEST_HEADERS }}

<h4>Request Body</h4>

Request body properties are not required by this operation.

{{ API_RESPONSE.md }}

<h4>Response Body</h4>

The response body for a successful request contains the following response elements:

| Name      | Data Type        | Description |
| --------- | ---------------- | ----------- |
| @id       | String           | Indicates the relative path to the requested endpoint. |
| @links    | Object           | Contains related links.            |
| @type     | String           | Returns `FINDME`. |
| hostnames | Array of objects | Returns all hostnames associated with this configuration bundle. |
| id        | String           | Identifies this configuration bundle by its system-defined ID.            |
| origins   | Array of objects | Returns all origin configurations associated with this configuration bundle.            |
| rtld      | Object           | Returns all RTLD configurations associated with this configuration bundle.            |
| rules     | Array of objects | Returns all rules associated with this configuration bundle. These rules are defined using JSON syntax. <Callout type="tip">View the JSON syntax that corresponds to your rules through the {{ PORTAL }}'s JSON editor. Load this editor from the **Rules** page by clicking **JSON Editor**. </Callout> |

##### hostnames Array {/*hostnames-array*/}

The `hostnames` array contains an object for each domain through which your site will be served. Each object contains the following property:

|Name|Data Type|Description|
|--- |--- |--- |
| hostname| String | Indicates the domain (e.g., cdn.example.com) through which your site will be served. |

##### origins Array {/*origins-array*/}

The `origins` array contains an object for each origin configuration. Each object contains the following properties:

|Name|Data Type|Description|
|--- |--- |--- |
| name | String| Indicates an origin configuration's name. This name should only consist of alphanumeric characters, hyphens, periods, and underscores.|
| hosts | Array of objects | Contains each host entry associated with this origin configuration.|

###### hosts Array {/*hosts-array*/}

The `hosts` array contains an object for each host entry. Each object contains the following property:

|Name|Data Type|Description|
|--- |--- |--- |
| location | Array of objects | Contains a `hostname` object for each host entry associated with this origin configuration. This `hostname` object contains a string value that identifies web server(s) by either a hostname or IP address (e.g., https://cdn-lb.example.com). |

##### rtld Object {/*rtld-object*/}

The `rtld` object contains all RTLD configurations associated with this configuration bundle. This object contains the following properties:
|Name|Data Type|Description|
|--- |--- |--- |
| | | |


{{ API_ERRORS.md }}

<h3>Sample Request and Response (JSON)</h3>

A sample HTTP request is shown below.

```json
GET {{ API_URL }}/config/{{ API_SECURITY_VERSION }}/{{ SAMPLE_TEAM_ID }}/configs  HTTP/1.1
{{ API_SAMPLE_REQUEST_HEADERS.md }}
```

A sample response is shown below.

```json
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: application/json; charset=utf-8
Date:  Thu, 15 Apr 2021 12:00:00 GMT
Content-Length: 65

{ FINDME 
}
```





## Update Configuration


---
title: Metrics REST API Usage
---

The Metrics REST API allows you to generate reports for key datasets (e.g., origin usage and edge errors). 

## Getting Started {/*getting-started*/}

1.  Identify the name of the dataset (e.g., `edge_errors` or `origin_usage_by_country`) for which report data will be generated.

    View a [list of the available datasets](#datasets) or discover them through the [Get Available Datasets operation](https://docs.edg.io/rest_api/#tag/metrics/operation/datasets):

    `GET https://edgioapis.com/metrics/v1/datasets`

    <Info>
    
    A dataset's unique name is returned by `items[].name`.
    
    </Info>

2.  Generate a report.

    1.  Pass the desired dataset within the path of the [Query Dataset operation](https://docs.edg.io/rest_api/#tag/metrics/operation/data).
    2.  Describe the desired report data through the request body. <a id="sample-request" />

    **Sample URL:** `POST https://edgioapis.com/metrics/v1/datasets/origin_usage_by_country/data`

    **Sample Request Body:**
    ```json
    {
        "date_range": {
            "start": "2024-04-26T00:00:00Z",
            "end": "2024-04-28T00:00:00Z"
        },
        "dimensions": ["origin_name"],
        "metrics": ["requests_origin_total", "ttfb_origin_ms_75_percentile"],
        "filters": {
            "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"]
        }
    }
    ```

## Report Query {/*report-query*/}

A typical query contains the following information:

-   **Date Range:** Use the `date_range` property to define the report's date range.
-   **Dimensions:** Use the `dimensions` property to define the set of dimensions that will be returned.
-   **Metrics:** Use the `metrics` property to define the set of metrics that will be returned.
-   **Filter:** Use the `filters` property to filter report data by one or more condition(s).

    For example, filter a report to only show data for a specific environment through the `environment_id` key.

The [above sample request](#sample-request) generates an environment-specific report for two metrics (i.e., `requests_origin_total` and `ttfb_origin_ms_75_percentile`) grouped by the `origin_name` dimension. 

## Report Data {/*report-data*/}

The following properties are critical for interpreting the response:

-   **data_fields:** This property lists the dimensions and metrics included in the response. 
-   **data_rows:** This property, which is an array of arrays, returns report data. Each inner array represents a row of data. Each value within this innner array aligns with the order in which fields are reported within the `data_fields` field.

**Sample response:** The following sample response is based off of the query defined in the [above sample request](#sample-request).

```
{
    "@id": "/datasets/origin_usage_by_country/data",
    "@type": "Dataset",
    "data_fields": [
        {
            "name": "origin_name",
            "description": "The origin name.",
            "data_type": "STRING"
        },
        {
            "name": "requests_origin_total",
            "description": "Total number of requests to origin.",
            "data_type": "NUMBER"
        },
        {
            "name": "ttfb_origin_ms_75_percentile",
            "description": "Origin TTFB in ms. at the 75th percentile.",
            "data_type": "NUMBER"
        }
    ],
    "data_rows": [
        [ "origin_1", 25413767.0 , 1001.961328723 ],
        [ "origin_2", 59324.0 , 901.872396132 ]
    ],
    "request": {
        "dimensions": [
            "origin_name"
        ],
        "metrics": [
            "requests_origin_total", "ttfb_origin_ms_75_percentile"
        ],
        "filters": {
            "environment_id": [
                "715af1f3-bb60-4696-b777-97572909e833"
            ]
        },
        "date_range": {
            "start": "2024-04-26T00:00:00Z",
            "end": "2024-04-28T00:00:00Z"
        }
    },
    "created_at": "2024-05-05T07:30::00Z"
}
```

The `data_fields` property indicates that each row of data will report the following data in this order: `origin_name`, `requests_origin_total`, and `ttfb_origin_ms_75_percentile`.

The `data_rows` property contains two arrays. This indicates that it contains two rows of data. 

### Time Series {/*time-series*/}

Generate a time series response by adding `time` to the `dimensions` array. 

**Sample request (default time intervals):**

The following sample request groups `requests_origin_total` and `ttfb_origin_ms_75_percentile` by `time` and `origin_name`:

```
POST /datasets/origin_usage_by_country/data

{
    "date_range": {
        "start": "2024-04-26T00:00:00Z",
        "end": "2024-04-28T00:00:00Z"
    },
    "dimensions": ["time", "origin_name"],
    "metrics": ["requests_origin_total", "ttfb_origin_ms_75_percentile"],
    "filters": {
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"]
    }
}
```

**Sample response:**

```
{
    "@id": "/datasets/origin_usage_by_country/data",
    "@type": "Dataset",
    "data_fields": [{
            "name": "time",
            "description": "The date when the request happened.",
            "data_type": "DATE"
        }, {
            "name": "origin_name",
            "description": "The origin name.",
            "data_type": "STRING"
        }, {
            "name": "requests_origin_total",
            "description": "Total number of requests to origin.",
            "data_type": "NUMBER"
        }, {
            "name": "ttfb_origin_ms_75_percentile",
            "description": "Origin TTFB in ms. at the 75th percentile.",
            "data_type": "NUMBER"
        }
    ],
    "data_rows": [
        ["2024-04-26T00:00:00Z", "origin_1", 9990311.0, 1046.1946153211188],
        ["2024-04-26T00:00:00Z", "origin_2", 30860.0, 974.426483285657]
        ["2024-04-27T00:00:00Z", "origin_1", 15423456.0, 998.0100687536416],
        ["2024-04-27T00:00:00Z", "origin_2", 28464.0, 981.2032714345563]
    ],
    "request": {
        "dimensions": [
            "time",
            "origin_name"
        ],
        "metrics": [
            "requests_origin_total",
            "ttfb_origin_ms_75_percentile"
        ],
        "filters": {
            "environment_id": [
                "715af1f3-bb60-4696-b777-97572909e833"
            ]
        },
        "date_range": {
            "start": "2024-04-26T00:00:00Z",
            "end": "2024-04-28T00:00:00Z"
        }
    },
    "created_at": "2024-04-19T09:32:55Z"
}
```

By default, this operation uses the broadest available time granularity. The above report's date range is for multiple days. As a result, report data (`data_rows`) was grouped into daily intervals. Use the `time_granularity` parameter to select another granularity level. 

**Sample request (hourly intervals):**

The following sample request groups data into hourly intervals.

```
POST /datasets/origin_usage_by_country/data

{
    "date_range": {
        "start": "2024-04-26T00:00:00Z",
        "end": "2024-04-26T05:00:00Z"
    },
    "time_granularity": "HOUR",
    "dimensions": ["time", "origin_name"],
    "metrics": ["requests_origin_total", "ttfb_origin_ms_75_percentile"],
    "filters": {
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"]
    }
}
```

**Sample response:**

```
{
    "@id": "/datasets/origin_usage_by_country/data",
    "@type": "Dataset",
    "data_fields": [{
            "name": "time",
            "description": "The date when the request happened.",
            "data_type": "DATE"
        }, {
            "name": "origin_name",
            "description": "The origin name.",
            "data_type": "STRING"
        }, {
            "name": "requests_origin_total",
            "description": "Total number of requests to origin.",
            "data_type": "NUMBER"
        }, {
            "name": "ttfb_origin_ms_75_percentile",
            "description": "Origin TTFB in ms. at the 75th percentile.",
            "data_type": "NUMBER"
        }
    ],
    "data_rows": [
        ["2024-04-26T00:00:00Z", "origin_1", 9990311.0, 1046.1946153211188],
        ["2024-04-26T10:00:00Z", "origin_2", 30860.0, 974.426483285657],
        ["2024-04-26T01:00:00Z", "origin_1", 15423456.0, 998.0100687536416],
        ["2024-04-26T01:00:00Z", "origin_2", 28464.0, 981.2032714345563],
        ...
        ["2024-04-26T04:00:00Z", "origin_1", 9990311.0, 1046.1946153211188],
        ["2024-04-26T14:00:00Z", "origin_2", 30860.0, 974.426483285657]
    ],
    "request": {
        "dimensions": [
            "time",
            "origin_name"
        ],
        "metrics": [
            "requests_origin_total",
            "ttfb_origin_ms_75_percentile"
        ],
        "filters": {
            "environment_id": [
                "715af1f3-bb60-4696-b777-97572909e833"
            ]
        },
        "date_range": {
            "start": "2024-04-26T00:00:00Z",
            "end": "2024-04-28T00:00:00Z"
        }
    },
    "created_at": "2024-04-19T09:32:55Z"
}
```

### Filters {/*filters*/}

Filter report data by defining the `filters` object. 

The following sample request filters report data for a specific environment and origin:

```
{
    "date_range": {
        "start": "2024-04-26T00:00:00Z",
        "end": "2024-04-28T00:00:00Z"
    },
    "time_granularity": "HOUR",
    "dimensions": ["time", "origin_name"],
    "metrics": ["requests_origin_total", "ttfb_origin_ms_75_percentile"],
    "filters": {
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"],
        "origin_name": ["origin_1"]
    }
}
```

## Common Reports {/*common-reports*/}

Sample queries for commonly requested reports are provided below. 

<Tip>

Your business needs may require a different type of report. Examine the datasets returned by the [Get Available Datasets operation](https://docs.edg.io/rest_api/#tag/metrics/operation/datasets) to discover the types of data that can be returned and the manner in which it can be grouped and filtered.

</Tip>

### Get Data Transferred {/*Get Data Transferred*/}

Find out the total amount of data, in bytes, served from our network over a given time period.

**Request:** `POST https://edgioapis.com/metrics/v1/datasets/edge_usage_by_country/data`

**Request Body:** Update the `environment_id` property and the `date_range` object before submitting the following query:

```json
{
    "dimensions": [
        "time"
    ],
    "metrics": [
        "bytes_edge_total"
    ],
    "filters": {
        "environment_id": [
            "12345678-1234-1234-1234-1234567890ab"
        ]
    },
    "date_range": {
        "start": "2024-05-20T00:00:00Z",
        "end": "2024-05-21T00:00:00Z"
    },
    "time_granularity": "DAY"
}
```

### Get Request Rate {/*get-request-rate*/}

Find out the number of requests per second served from our network over a given time period.

**Request:** `POST https://edgioapis.com/metrics/v1/datasets/edge_usage_by_country/data`

**Request Body:** Update the `environment_id` property and the `date_range` object before submitting the following query:

```json
{
    "dimensions": [
        "time"
    ],
    "metrics": [
        "requests_per_second_edge"
    ],
    "filters": {
        "environment_id": [
            "12345678-1234-1234-1234-1234567890ab"
        ]
    },
    "date_range": {
        "start": "2024-05-20T00:00:00Z",
        "end": "2024-05-21T00:00:00Z"
    },
    "time_granularity": "DAY"
}
```

### Get Requests for Common Cache Statuses {/*get-requests-for-common-cache-statuses*/}

Find out the total number of requests served from our network for the following cache statuses over a given time period:
-   Cache hits (`requests_hit_total`)
-   Cache misses (`requests_miss_total`)
-   Expired hits (`requests_stale_total`). 

    An expired hit means that stale content was served to the client. This occurs when the response from an origin server for a revalidation request indicates that a newer version of that asset does not exist. 

**Request:** `POST https://edgioapis.com/metrics/v1/datasets/edge_usage_by_country/data`

**Request Body:** Update the `environment_id` property and the `date_range` object before submitting the following query:

```json
{
    "dimensions": [
        "time"
    ],
    "metrics": [
        "requests_hit_total", "requests_miss_total", "requests_stale_total"
    ],
    "filters": {
        "environment_id": [
            "12345678-1234-1234-1234-1234567890ab"
        ]
    },
    "date_range": {
        "start": "2024-05-20T00:00:00Z",
        "end": "2024-05-21T00:00:00Z"
    },
    "time_granularity": "DAY"
}
```

### Get Bandwidth {/*get-bandwidth*/}

Find out the amount of bandwidth, in bits per second, served over a given time period.

**Request:** `POST https://edgioapis.com/metrics/v1/datasets/edge_usage_by_country/data`

**Request Body:** Update the `environment_id` property and the `date_range` object before submitting the following query:

```json
{
    "dimensions": [
        "time"
    ],
    "metrics": [
        "bits_per_second_edge"
    ],
    "filters": {
        "environment_id": [
            "12345678-1234-1234-1234-1234567890ab"
        ]
    },
    "date_range": {
        "start": "2024-05-20T00:00:00Z",
        "end": "2024-05-21T00:00:00Z"
    },
    "time_granularity": "DAY"
}
```

### Get Errors by HTTP Status Code {/*get-errors-by-http-status-code*/}

Get a breakdown of error responses by HTTP status code over a given time period. Each object in `data_row` represents a HTTP status code.

**Request:** `POST https://edgioapis.com/metrics/v1/datasets/edge_errors/data`

**Request Body:** Update the `environment_id` property and the `date_range` object before submitting the following query:

```json
{
    "dimensions": [
        "time", "http_status_code"
    ],
    "metrics": [
        "requests_edge_total"
    ],
    "filters": {
        "environment_id": [
            "12345678-1234-1234-1234-1234567890ab"
        ]
    },
    "date_range": {
        "start": "2024-05-20T00:00:00Z",
        "end": "2024-05-21T00:00:00Z"
    },
    "time_granularity": "DAY"
}
```

### Get Usage by Origin {/*get-usage-by-origin*/}

Find out the number of requests and the amount of data, in bytes, served by each origin over a given time period.

**Request:** `POST https://edgioapis.com/metrics/v1/datasets/origin_usage/data`

**Request Body:** Update the `environment_id` property and the `date_range` object before submitting the following query:

```json
{
    "dimensions": [
        "time", "origin_name"
    ],
    "metrics": [
        "requests_origin_total", "bytes_origin_total"
    ],
    "filters": {
        "environment_id": [
            "12345678-1234-1234-1234-1234567890ab"
        ]
    },
    "date_range": {
        "start": "2024-05-20T00:00:00Z",
        "end": "2024-05-21T00:00:00Z"
    },
    "time_granularity": "DAY"
}
```

## Available Datasets {/*datasets*/}

The following datasets are described below:

{{ datasets.md }}
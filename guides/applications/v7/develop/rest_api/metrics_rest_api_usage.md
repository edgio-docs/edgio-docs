---
title: Metrics REST API Usage
---

The Metrics REST API allows you to generate reports for key datasets (e.g., origin usage and edge errors). 

## Getting Started {/*getting-started*/}

1.  Identify the name of the dataset (e.g., `edge_errors` or `origin_usage_by_country`) for which report data will be generated.

    Discover the available datasets through the [Get Available Datasets operation](https://docs.edg.io/rest_api/#tag/metrics/operation/datasets):

    `GET https://edgioapis.com/metrics/v1/datasets`

    <Info>
    
    A dataset's unique name is returned by `items[].name`.
    
    </Info>

2.  Generate a report.

    1.  Pass the desired dataset within the path of the [Query Dataset operation](https://docs.edg.io/rest_api/#tag/metrics/operation/data).
    2.  Describe the desired report data through the request body. <a id="sample-request" />

    **Sample request:**

    ```
    POST https://edgioapis.com/metrics/v1/datasets/origin_usage_by_country/data
    
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
---
title: Metrics REST API Usage
---

TODO: Review and revise.

This document explains how to utilize Metrics API to retrieve metrics effectively.

Discover Available Datasets
Begin by identifying which datasets are available for querying by using the metadata endpoint:

GET /datasets
Select Your Dataset
Choose a dataset that contains the metrics relevant to your analysis. For example, if you’re interested in origin usage metrics, you might select the origin_usage_by_country dataset.

Construct Your Query And Execute Request
To retrieve metrics, construct a query. We recommend starting with the following parameters:

A valid entry in the date_range field.
At least one valid entry in the dimensions field.
At least one valid entry in the metrics field.
environment_id entry in the filters field.
Here's a sample request that shows two metrics: requests_origin_total, ttfb_origin_ms_75_percentile, grouped by the dimension origin_name:

POST /datasets/origin_usage_by_country/data

```
{
    "date_range" :{
        "start":"2024-04-16T00:00:00Z",
        "end":"2024-04-18T00:00:00Z"
    },
    "dimensions":[ "origin_name"],
    "metrics":[ "requests_origin_total", "ttfb_origin_ms_75_percentile" ],
    "filters":{        
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"]    
    }
}
```

Interpret the Response
To read data from the response, focus on the data_fields and data_rows properties.  The data_fields lists fields (dimensions and metrics) included in response. The data_rows is an array of arrays, where each inner array represents a row of data. The values in each inner array align with the order of the data_fields
Here's a sample response for the previous sample request:

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
            "start": "2024-04-11T00:00:00Z",
            "end": "2024-04-18T00:00:00Z"
        }
    },
    "created_at": "2024-04-19T07:30::00Z"
}
```

In this response:

The data_fields tells us that there are 3 fields in response: “origin_name”, “requests_origin_total”, "ttfb_origin_ms_75_percentile".
The data_rows contain two rows of data. Each row has an origin name along with the total requests and the TTFB at the 75th percentile for that origin.
Prepare Time Series
To prepare time series add time to the dimensions array. 

Here's an example that groups  requests_origin_total, ttfb_origin_ms_75_percentile into time and origin name:

```
POST /datasets/origin_usage_by_country/data
{
    "date_range" :{
        "start":"2024-04-16T00:00:00Z",
        "end":"2024-04-18T00:00:00Z"
    },
    "dimensions":[ "time","origin_name"],
    "metrics":[ "requests_origin_total", "ttfb_origin_ms_75_percentile" ],
    "filters":{        
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"]    
    }
}
```

Here is sample response for the previous request:

```
{
    "@id": "/datasets/origin_usage_by_country/data",
    "@type": "Dataset",
    "data_fields": [
        {
            "name": "time",
            "description": "The date when the request happened.",
            "data_type": "DATE"
        },
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
        [ "2024-04-16T00:00:00Z", "origin_1", 9990311.0 , 1046.1946153211188 ],
        [ "2024-04-16T00:00:00Z", "origin_2", 30860.0 , 974.426483285657 ]
        [ "2024-04-17T00:00:00Z", "origin_1", 15423456.0 , 998.0100687536416 ],
        [ "2024-04-17T00:00:00Z", "origin_2", 28464.0 , 981.2032714345563 ]
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
            "start": "2024-04-16T00:00:00Z",
            "end": "2024-04-18T00:00:00Z"
        }
    },
    "created_at": "2024-04-19T09:32:55Z"
}
```

By default API returns data grouped into DAILY intervals. Use time_granularity parameter to select another granularity level. 

```
POST /datasets/origin_usage_by_country/data
{
    "date_range" :{
        "start":"2024-04-16T00:00:00Z",
        "end":"2024-04-18T00:00:00Z"
    },
    "time_granularity" : "HOUR",
    "dimensions":[ "time","origin_name"],
    "metrics":[ "requests_origin_total", "ttfb_origin_ms_75_percentile" ],
    "filters":{        
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"]    
    }
}
```

200 OK

```
{
    "@id": "/datasets/origin_usage_by_country/data",
    "@type": "Dataset",
    "data_fields": [
        {
            "name": "time",
            "description": "The date when the request happened.",
            "data_type": "DATE"
        },
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
        [ "2024-04-17T07:00:00Z", "origin_1", 9990311.0 , 1046.1946153211188 ],
        [ "2024-04-16T17:00:00Z", "origin_2", 30860.0 , 974.426483285657 ]
        [ "2024-04-16T03:00:00Z", "origin_1", 15423456.0 , 998.0100687536416 ],
        [ "2024-04-16T01:00:00Z", "origin_2", 28464.0 , 981.2032714345563 ]
      ...
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
            "start": "2024-04-16T00:00:00Z",
            "end": "2024-04-18T00:00:00Z"
        }
    },
    "created_at": "2024-04-19T09:32:55Z"
}
```

Filter Data
In order to narrow down the results to meet specific criterias. For instance:

```
{
    "date_range" :{
        "start":"2024-04-16T00:00:00Z",
        "end":"2024-04-18T00:00:00Z"
    },
    "time_granularity" : "HOUR",
    "dimensions":[ "time","origin_name"],
    "metrics":[ "requests_origin_total", "ttfb_origin_ms_75_percentile" ],
    "filters":{        
        "environment_id": ["777af1f3-aa60-1234-b777-56772909e833"],
        "origin_name": ["origin_1"]    
    }
}
```

This filter will only return data for the specified environment_id and for origin with name origin_1.

   **Example:** The following sample dataset contains three dimensions (i.e., `time`, `country_code`, and `environment_id`) and two metrics (i.e., `requests_edge_total` and `requests_hit_total`). 

| time                 | country_code | environment_id          | requests_edge_total | requests_hit_total |
|----------------------|--------------|------------------------ |---------------------|--------------------|
| 2024-01-01T03:00:00Z | jp           | e10617f2-f1e7-4d7b-8157 | 2541                | 2408               |
| 2024-01-01T06:00:00Z | fr           | 4a3fd0f5-3b67-44ae-8d1d | 12                  | 7                  |
| 2024-01-01T09:00:00Z | jp           | e10617f2-f1e7-4d7b-8157 | 3265                | 2907               |

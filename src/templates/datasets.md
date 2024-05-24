-   [edge_usage_by_country](#edge_usage_by_country)
-   [edge_errors](#edge_errors)
-   [origin_usage_by_country](#origin_usage_by_country)
-   [origin_usage](#origin_usage)
-   [origin_errors](#origin_errors)
-   [origin_offload](#origin_offload)

### edge_usage_by_country {/*edge_usage_by_country*/} 

Aggregated edge usage metrics with breakdown by time, environment id and user country code.

**Dimensions:**

-   **time:** The date when the request happened.
-   **environment_id:** The environment ID.
-   **country_code:** The user's country code. It consists of two lowercase letters, or a single hyphen '-' if the country is unknown.

**Metrics:**

-   **requests_edge_total:** Total number of requests to edge.
-   **requests_per_second_edge:** Number of requests per second to edge.
-   **requests_hit_total:** Total number of requests to edge that were served from the cache.
-   **requests_cache_hit_ratio:** Ratio of requests served from the cache, including both hits and stale responses, to total number of requests made to edge.
-   **requests_miss_total:** Total number of requests to edge that resulted in cache misses.
-   **requests_stale_total:** Total number of edge requests that resulted in the serving of stale content.
-   **requests_prefetch_total:** Total number of requests initiated by prefetch functionality.
-   **requests_prefetch_cache_hit_ratio:** Ratio of requests served from the cache as a result of prefetching, including both hits and stale responses, to the total number of prefetch requests.
-   **requests_cachable_total:** Total number of cacheble requests.
-   **requests_2xx_total:** Total number of edge requests with a 2xx status code (200 - 299).
-   **requests_3xx_total:** Total number of edge requests with a 3xx status code (300 - 399).
-   **requests_4xx_total:** Total number of edge requests with a 4xx status code (400 - 499).
-   **requests_5xx_total:** Total number of edge requests with a 5xx status code (500 - 599).
-   **requests_error_ratio:** Ratio of requests resulting in server errors (5xx status codes) to the total number of requests made to edge.
-   **bytes_edge_total:** Total number of bytes sent from edge.
-   **bytes_hit_total:** Total number of bytes sent from egde cache.
-   **bytes_miss_total:** Total number of bytes that were not found in edge cache.
-   **bytes_stale_total:** Total number of bytes served by edge as stale content.
-   **bits_per_second_edge:** Edge bandwith usage measured in bits per second (bps).
-   **ttfb_edge_ms_5_percentile:** Edge TTFB in ms. at the 5th percentile.
-   **ttfb_edge_ms_25_percentile:** Edge TTFB in ms. at the 25th percentile.
-   **ttfb_edge_ms_50_percentile:** Edge TTFB in ms. at the 50th percentile.
-   **ttfb_edge_ms_75_percentile:** Edge TTFB in ms. at the 75th percentile.
-   **ttfb_edge_ms_95_percentile:** Edge TTFB in ms. at the 95th percentile.
-   **ttfb_edge_ms_99_percentile:** Edge TTFB in ms. at the 99th percentile.
-   **response_time_edge_ms_5_percentile:** Edge response time in ms. at the 5th percentile.
-   **response_time_edge_ms_25_percentile:** Edge response time in ms. at the 25th percentile.
-   **response_time_edge_ms_50_percentile:** Edge response time in ms. at the 50th percentile.
-   **response_time_edge_ms_75_percentile:** Edge response in ms. at the 75th percentile.
-   **response_time_edge_ms_95_percentile:** Edge response in ms. at the 95th percentile.
-   **response_time_edge_ms_99_percentile:** Edge response in ms. at the 99th percentile.

**Filters:**

-   **environment_id:** Sets the filtering by environment id.
-   **country_code:** Sets the filtering by user's country code. Supported values: two lowercase letters or '-'.

### edge_errors {/*edge_errors*/} 

Aggregated usage metrics with breakdown time, environment ID, user country code, and specific HTTP status codes between 500 and 599

**Dimensions:**

-   **time:** The date when the request happened.
-   **environment_id:** The environment ID.
-   **country_code:** The user's country code. It consists of two lowercase letters, or a single hyphen '-' if the country is unknown.
-   **http_status_code:** The HTTP status codes between 500 and 599.

**Metrics:**

-   **requests_edge_total:** Total number of requests to edge.

**Filters:**

-   **environment_id:** Sets the filtering by environment id.
-   **country_code:** Sets the filtering by user's country code. Supported values: two lowercase letters or '-'.
-   **http_status_code:** Sets the filtering by http status code.

### origin_usage_by_country {/*origin_usage_by_country*/} 

Aggregated usage metrics with breakdown time, environment ID, user country code, and origin name.

**Dimensions:**

-   **time:** The date when the request happened.
-   **environment_id:** The environment ID.
-   **country_code:** The user's country code. It consists of two lowercase letters, or a single hyphen '-' if the country is unknown.
-   **origin_name:** The origin name.

**Metrics:**

-   **requests_origin_total:** Total number of requests to origin.
-   **bytes_origin_total:** Total number of bytes sent from origin.
-   **ttfb_origin_ms_5_percentile:** Origin TTFB in ms. at the 5th percentile.
-   **ttfb_origin_ms_25_percentile:** Origin TTFB in ms. at the 25th percentile.
-   **ttfb_origin_ms_50_percentile:** Origin TTFB in ms. at the 50th percentile.
-   **ttfb_origin_ms_75_percentile:** Origin TTFB in ms. at the 75th percentile.
-   **ttfb_origin_ms_95_percentile:** Origin TTFB in ms. at the 95th percentile.
-   **ttfb_origin_ms_99_percentile:** Origin TTFB in ms. at the 99th percentile.
-   **response_time_origin_ms_5_percentile:** Origin response time in ms. at the 5th percentile.
-   **response_time_origin_ms_25_percentile:** Origin response time in ms. at the 25th percentile.
-   **response_time_origin_ms_50_percentile:** Origin response time in ms. at the 50th percentile.
-   **response_time_origin_ms_75_percentile:** Origin response in ms. at the 75th percentile.
-   **response_time_origin_ms_95_percentile:** Origin response in ms. at the 95th percentile.
-   **response_time_origin_ms_99_percentile:** Origin response in ms. at the 99th percentile.

**Filters:**

-   **environment_id:** Sets the filtering by environment id.
-   **country_code:** Sets the filtering by the user's country code. Supported values: two lowercase letters or '-'.
-   **origin_name:** Sets the filtering by origin name.

### origin_usage {/*origin_usage*/} 

Aggregated usage metrics with breakdown time, environment ID, origin name, HTTP method, and response content type.

**Dimensions:**

-   **time:** The date when the request happened.
-   **environment_id:** The environment ID.
-   **origin_name:** The origin name.
-   **http_method:** The request HTTP method.
-   **content_type:** Content-Type response header.

**Metrics:**

-   **requests_origin_total:** Total number of requests to origin.
-   **bytes_origin_total:** Total number of bytes sent from origin.
-   **ttfb_origin_ms_5_percentile:** Origin TTFB in ms. at the 5th percentile.
-   **ttfb_origin_ms_25_percentile:** Origin TTFB in ms. at the 25th percentile.
-   **ttfb_origin_ms_50_percentile:** Origin TTFB in ms. at the 50th percentile.
-   **ttfb_origin_ms_75_percentile:** Origin TTFB in ms. at the 75th percentile.
-   **ttfb_origin_ms_95_percentile:** Origin TTFB in ms. at the 95th percentile.
-   **ttfb_origin_ms_99_percentile:** Origin TTFB in ms. at the 99th percentile.
-   **response_time_origin_ms_5_percentile:** Origin response time in ms. at the 5th percentile.
-   **response_time_origin_ms_25_percentile:** Origin response time in ms. at the 25th percentile.
-   **response_time_origin_ms_50_percentile:** Origin response time in ms. at the 50th percentile.
-   **response_time_origin_ms_75_percentile:** Origin response in ms. at the 75th percentile.
-   **response_time_origin_ms_95_percentile:** Origin response in ms. at the 95th percentile.
-   **response_time_origin_ms_99_percentile:** Origin response in ms. at the 99th percentile.

**Filters:**

-   **environment_id:** Sets the filtering by environment id.
-   **origin_name:** Sets the filtering by origin name.
-   **http_method:** Sets the filtering by request HTTP method.
-   **content_type:** Sets the filtering by response content type.

### origin_errors {/*origin_errors*/} 

Aggregated usage metrics with breakdown time, environment ID, origin name, HTTP method, response content type, and specific HTTP status codes between 400 and 599

**Dimensions:**

-   **time:** The date when the request happened.
-   **environment_id:** The environment ID.
-   **origin_name:** The origin name.
-   **http_method:** The request HTTP method.
-   **content_type:** Content-Type response header.
-   **http_status_code:** The HTTP status codes between 400 and 599.

**Metrics:**

-   **requests_origin_total:** Total number of requests to origin.

**Filters:**

-   **environment_id:** Sets the filtering by environment id.
-   **origin_name:** Sets the filtering by origin name.
-   **http_method:** Sets the filtering by request HTTP method.
-   **content_type:** Sets the filtering by response content type.
-   **http_status_code:** Sets the filtering by http status code.

### origin_offload {/*origin_offload*/} 

Aggregated usage metrics with breakdown time, environment ID, HTTP method and response content type.

**Dimensions:**

-   **time:** The date when the request happened.
-   **environment_id:** The environment ID.
-   **http_method:** The request HTTP method.
-   **content_type:** Content-Type response header.

**Metrics:**

-   **requests_edge_total:** Total number of requests to edge.
-   **requests_origin_total:** Total number of requests to origin.
-   **bytes_edge_total:** Total number of bytes sent from edge.
-   **bytes_origin_total:** Total number of bytes sent from origin.

**Filters:**

-   **environment_id:** Sets the filtering by environment id.
-   **http_method:** Sets the filtering by request HTTP method.
-   **content_type:** Sets the filtering by response content type.


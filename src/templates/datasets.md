-   [edge_usage_by_country](#edge_usage_by_country)
-   [edge_errors](#edge_errors)
-   [origin_usage_by_country](#origin_usage_by_country)
-   [origin_usage](#origin_usage)
-   [origin_errors](#origin_errors)
-   [origin_offload](#origin_offload)

### edge_usage_by_country {/*edge_usage_by_country*/} 

Environment-specific aggregated edge usage metrics that can be broken down by time, country, or both.

**Dimensions:**

-   **environment_id:** An environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **country_code:** The request's country code which consists of two lowercase letters. Returns `-` when the country cannot be identified.

**Metrics:**

-   **requests_edge_total:** Total number of requests to the edge of our network.
-   **requests_per_second_edge:** Number of requests per second to the edge of our network.
-   **requests_hit_total:** Total number of requests to the edge that were served from the cache.
-   **requests_cache_hit_ratio:** Ratio of requests served from the cache, including both hits and stale responses, to total number of requests made to the edge.
-   **requests_miss_total:** Total number of requests to the edge that resulted in cache misses.
-   **requests_stale_total:** Total number of requests that resulted in stale content being served to the client.
-   **requests_prefetch_total:** Total number of requests initiated by predictive prefetching.
-   **requests_prefetch_cache_hit_ratio:** Ratio of requests served from the cache as a result of predictive prefetching, including both hits and stale responses, to the total number of predictive prefetch requests.
-   **requests_cachable_total:** Total number of cacheble requests.
-   **requests_2xx_total:** Total number of edge requests with a 2xx status code (200 - 299).
-   **requests_3xx_total:** Total number of edge requests with a 3xx status code (300 - 399).
-   **requests_4xx_total:** Total number of edge requests with a 4xx status code (400 - 499).
-   **requests_5xx_total:** Total number of edge requests with a 5xx status code (500 - 599).
-   **requests_error_ratio:** Ratio of requests resulting in server errors (5xx status codes) to the total number of requests made to the edge.
-   **bytes_edge_total:** Total number of bytes sent from the edge.
-   **bytes_hit_total:** Total number of bytes sent from edge cache.
-   **bytes_miss_total:** Total number of bytes that were not found in edge cache.
-   **bytes_stale_total:** Total number of bytes served as stale content.
-   **bits_per_second_edge:** Edge bandwith usage measured in bits per second (bps).
-   **ttfb_edge_ms_5_percentile:** Edge time to first byte (TTFB), in milliseconds, at the 5th percentile.
-   **ttfb_edge_ms_25_percentile:** Edge time to first byte (TTFB), in milliseconds, at the 25th percentile.
-   **ttfb_edge_ms_50_percentile:** Edge time to first byte (TTFB), in milliseconds, at the 50th percentile.
-   **ttfb_edge_ms_75_percentile:** Edge time to first byte (TTFB), in milliseconds, at the 75th percentile.
-   **ttfb_edge_ms_95_percentile:** Edge time to first byte (TTFB), in milliseconds, at the 95th percentile.
-   **ttfb_edge_ms_99_percentile:** Edge time to first byte (TTFB), in milliseconds, at the 99th percentile.
-   **response_time_edge_ms_5_percentile:** Edge response time, in milliseconds, at the 5th percentile.
-   **response_time_edge_ms_25_percentile:** Edge response time, in milliseconds, at the 25th percentile.
-   **response_time_edge_ms_50_percentile:** Edge response time, in milliseconds, at the 50th percentile.
-   **response_time_edge_ms_75_percentile:** Edge response time, in milliseconds, at the 75th percentile.
-   **response_time_edge_ms_95_percentile:** Edge response time, in milliseconds, at the 95th percentile.
-   **response_time_edge_ms_99_percentile:** Edge response time, in milliseconds, at the 99th percentile.

**Filters:**

-   **environment_id:** Filters data by an environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **country_code:** Filters data by a two-letter country code or `-` for when the country of origin is unknown.

### edge_errors {/*edge_errors*/} 

Environment-specific aggregated usage metrics for 5xx responses.

**Dimensions:**

-   **time:** The date and time (UTC) at which the request was received.
-   **environment_id:** An environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **country_code:** The request's country code which consists of two lowercase letters. Returns `-` when the country cannot be identified.
-   **http_status_code:** The response's 5xx status code (500 - 599).

**Metrics:**

-   **requests_edge_total:** Total number of requests to the edge of our network.

**Filters:**

-   **environment_id:** Filters data by an environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **country_code:** Filters data by a two-letter country code or `-` for when the country of origin is unknown.
-   **http_status_code:** Filters data by 5xx status code (500 - 599).

### origin_usage_by_country {/*origin_usage_by_country*/} 

Environment-specific aggregated origin usage metrics that can be broken down by time, country, origin, or any combination of these dimensions.

**Dimensions:**

-   **time:** The date and time (UTC) at which the request was received.
-   **environment_id:** An environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **country_code:** The request's country code which consists of two lowercase letters. Returns `-` when the country cannot be identified.
-   **origin_name:** The origin configuration's name.

**Metrics:**

-   **requests_origin_total:** Total number of requests to the origin.
-   **bytes_origin_total:** Total number of bytes sent from an origin.
-   **ttfb_origin_ms_5_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 5th percentile.
-   **ttfb_origin_ms_25_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 25th percentile.
-   **ttfb_origin_ms_50_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 50th percentile.
-   **ttfb_origin_ms_75_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 75th percentile.
-   **ttfb_origin_ms_95_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 95th percentile.
-   **ttfb_origin_ms_99_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 99th percentile.
-   **response_time_origin_ms_5_percentile:** Origin response time, in milliseconds, at the 5th percentile.
-   **response_time_origin_ms_25_percentile:** Origin response time, in milliseconds, at the 25th percentile.
-   **response_time_origin_ms_50_percentile:** Origin response time, in milliseconds, at the 50th percentile.
-   **response_time_origin_ms_75_percentile:** Origin response time, in milliseconds, at the 75th percentile.
-   **response_time_origin_ms_95_percentile:** Origin response time, in milliseconds, at the 95th percentile.
-   **response_time_origin_ms_99_percentile:** Origin response time, in milliseconds, at the 99th percentile.

**Filters:**

-   **environment_id:** Filters data by an environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **country_code:** Filters data by a two-letter country code or `-` for when the country of origin is unknown.
-   **origin_name:** Filters data by origin configuration.

### origin_usage {/*origin_usage*/} 

Environment-specific aggregated origin usage metrics that can be broken down by time, origin, HTTP method, content type, or by any combination of these dimensions.

**Dimensions:**

-   **time:** The date and time (UTC) at which the request was received.
-   **environment_id:** An environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **origin_name:** The origin configuration's name.
-   **http_method:** The request's HTTP method.
-   **content_type:** The `Content-Type` response header's value.

**Metrics:**

-   **requests_origin_total:** Total number of requests to the origin.
-   **bytes_origin_total:** Total number of bytes sent from an origin.
-   **ttfb_origin_ms_5_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 5th percentile.
-   **ttfb_origin_ms_25_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 25th percentile.
-   **ttfb_origin_ms_50_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 50th percentile.
-   **ttfb_origin_ms_75_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 75th percentile.
-   **ttfb_origin_ms_95_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 95th percentile.
-   **ttfb_origin_ms_99_percentile:** Origin time to first byte (TTFB), in milliseconds, at the 99th percentile.
-   **response_time_origin_ms_5_percentile:** Origin response time, in milliseconds, at the 5th percentile.
-   **response_time_origin_ms_25_percentile:** Origin response time, in milliseconds, at the 25th percentile.
-   **response_time_origin_ms_50_percentile:** Origin response time, in milliseconds, at the 50th percentile.
-   **response_time_origin_ms_75_percentile:** Origin response time, in milliseconds, at the 75th percentile.
-   **response_time_origin_ms_95_percentile:** Origin response time, in milliseconds, at the 95th percentile.
-   **response_time_origin_ms_99_percentile:** Origin response time, in milliseconds, at the 99th percentile.

**Filters:**

-   **environment_id:** Filters data by an environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **origin_name:** Filters data by origin configuration.
-   **http_method:** Filters data by HTTP method.
-   **content_type:** Filters data by the response's content type (e.g., text/css or text/javascript).

### origin_errors {/*origin_errors*/} 

Environment-specific aggregated usage metrics for 4xx responses.

**Dimensions:**

-   **time:** The date and time (UTC) at which the request was received.
-   **environment_id:** An environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **origin_name:** The origin configuration's name.
-   **http_method:** The request's HTTP method.
-   **content_type:** The `Content-Type` response header's value.
-   **http_status_code:** The response's 4xx or 5xx status code (400 - 599).

**Metrics:**

-   **requests_origin_total:** Total number of requests to the origin.

**Filters:**

-   **environment_id:** Filters data by an environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **origin_name:** Filters data by origin configuration.
-   **http_method:** Filters data by HTTP method.
-   **content_type:** Filters data by the response's content type (e.g., text/css or text/javascript).
-   **http_status_code:** Filters data by HTTP status code.

### origin_offload {/*origin_offload*/} 

Environment-specific aggregated usage metrics that can be broken down by time, HTTP method, content type, or any combination of these dimensions.

**Dimensions:**

-   **time:** The date and time (UTC) at which the request was received.
-   **environment_id:** An environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **http_method:** The request's HTTP method.
-   **content_type:** The `Content-Type` response header's value.

**Metrics:**

-   **requests_edge_total:** Total number of requests to the edge of our network.
-   **requests_origin_total:** Total number of requests to the origin.
-   **bytes_edge_total:** Total number of bytes sent from the edge.
-   **bytes_origin_total:** Total number of bytes sent from an origin.

**Filters:**

-   **environment_id:** Filters data by an environment's system-defined ID (e.g., 12345678-1234-1234-1234-1234567890ab). From the Edgio Console, navigate to the desired environment and then click **Settings**. It is listed under **Environment ID**.
-   **http_method:** Filters data by HTTP method.
-   **content_type:** Filters data by the response's content type (e.g., text/css or text/javascript).


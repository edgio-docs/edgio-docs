| Field              | Description                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| account_number     | Reserved for future use.                                                                                                                |
| account_number_hex | Reserved for future use.                                                                                                                |
| age                | Indicates the age of the report.                                                                                                        |
| client_as_org      | Indicates the organization corresponding to the client’s ASN.                                                                           |
| client_asn         | Indicates the Autonomous System Number (ASN) associated with the client’s IP address.                                                   |
| client_city        | Indicates the city from which the request originated.                                                                                   |
| client_country     | Indicates the [two-character ISO 3166-1 code for the country](/applications/reference/country_codes) from which the request originated. |
| client_hash        | Indicates the client's hash encoded value.                                                                                              |
| client_ip_prefix   | Indicates the IP address prefix for the device that submitted the request to our CDN. This value always reports `0` for the last octet. |
| client_region      | Indicates the geographical region (e.g., state or province) from which the request originated.                                          |
| customer           | Reserved for future use.                                                                                                                |
| elapsed_time       | Indicates the amount of time elapsed between the request and when the client generated the report.                                      |
| environment_id     | Indicates the system-defined ID for the environment to which the request was submitted.                                                 |
| host               | Indicates the host requested by the client.                                                                                             |
| method             | Indicates the request's HTTP method.                                                                                                    |
| organization_id    | Indicates the system-defined ID for the organization that contains the environment to which the request was submitted.                  |
| original_pop       | Indicates the [code of the POP](/applications/reference/pops) to which the request was submitted.                                       |
| partner_number     | Indicates the system-defined ID for the partner that owns the customer account to which this request was submitted. Reports `0` when a partner has not been assigned to the customer account.                                                                                                                 |
| phase              | Indicates the phase (e.g., application) at which the issue was encountered.                                                             |
| protocol           | Indicates the request's HTTP protocol version (e.g., h2).                                                                               |
| referrer           | Indicates the value for the request's `Referer` header.                                                                                 |
| report_type        | Indicates the type of report (e.g., network-error).                                                                                     |
| reporting_pop      | Indicates the POP that received the client's report.                                                                                    |
| sampling_fraction  | Indicates the network error log's downsampling fraction. A value of `1` indicates that log data is not being downsampled.               |
| server_ip          | Indicates the server's IP address.                                                                                                      |
| status_code        | Indicates the status code for the response received by the client.                                                                      |
| timestamp          | Indicates the date and time (GMT) at which the request was submitted.                                                                   |
| type               | Indicates the type of error that occurred. <br /><br />**Key error types:** <ul><li>**tcp.timed_out:** Indicates that the TCP handshake (SYN) timed out. </li><li>**tcp.address_unreachable:** Indicates that the client was unable to connect to the IP address corresponding to the requested host. </li><li>**dns.name_not_resolved:** Indicates that the client was unable to resolve the requested host. </li></ul>**Noisy error types:**<li>h2.ping_failed</li><li>http.error</li><li>tcp.closed</li><li>tcp.reset</li><li>unknown</li></ul> |
| url                | Indicates the URL requested by the client.                                                                                              |
| user_agent         | Indicates the client's user agent.                                                                                                      |
| wholesaler_number  | Indicates the system-defined ID for the wholesaler account. Reports `0` when a wholesaler has not been assigned to the customer account.|
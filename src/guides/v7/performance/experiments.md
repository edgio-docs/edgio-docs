---
title: Experiments
---

Experiments allow user to enrich their frontend analytics with experiment information

**Common Uses:**

-   run an experiment that show a different homepage to 20% of my visitors from New York
-   run an experiment that enables the new call to action for 10% of my visitors
-   run an experiment that shows 3 different kinds of homepages to my visitors, with 33%, 33% and  34% distribution

## Quick Start {/*quick-start*/}

Set up your experiments through the following steps:

1.  Identify the environment (e.g., `production`) that will be configured.
2.  Define one or more expeirment(s) for that environment. 
3.  Apply your expeirment to that environment by deploying your changes.

## Experiments {/*experiments*/}

A experiment consists of name, critics and variants

### Critics {/*critics*/}

A critics identifies a set of requests. Setting up a condition requires:

1.  Selecting the [type of condition](/guides/performance/rules/conditions).

    For example, you may identify requests by HTTP method, path, or request headers.

2.  Defining how a request will be compared against a value or state. In some cases, this involves selecting a comparison operator and defining the value that will be compared against the request.


### Variants {/*variants*/}

A feature determines how requests will be processed. They are categorized as follows:

-   [Access](/guides/performance/rules/features#access): Controls access to content.
-   [Caching](/guides/performance/rules/features#caching): Customizes when and how content is cached.
-   [Client](/guides/performance/rules/features#client): Controls how the client communicates with our CDN.
-   **Comment:** Adds a note or metadata to your configuration. This feature is solely informational and does not affect your configuration.
-   [Headers](/guides/performance/rules/features#headers): Adds, modifies, or deletes headers from the request or response.
-   [Logs](/guides/performance/rules/features#logs): Customizes how log data is stored.
-   [Origin](/guides/performance/rules/features#origin): Controls how the CDN communicates with an origin server.
-   [Response](/guides/performance/rules/features#response): Customizes the response sent to the client and determines whether we will allow prefetching instructions to be sent to the client.
-   [Set Variables](/guides/performance/rules/features#set-variables): Assigns a value to one or more user-defined variable(s) that are  passed to your bespoke traffic processing solution.
-   [URL](/guides/performance/rules/features#url): Redirects or rewrites requests to a different URL.


## Managing Experiments

You may create, active, and delete experiments.

**Key information:**

-   After deploy the experiement, you only can active or deactive.  
-   Apply your changes to the current environment by clicking **Deploy Changes**.


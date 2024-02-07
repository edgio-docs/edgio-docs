---
title: Request Matching Scenarios
---

Before adding [features](/guides/performance/rules/features) that customize how your traffic is processed, you must first decide the set of requests to which they will be applied. You may either apply them to all requests or use match condition(s) to only apply them to specific requests. Common request matching scenarios are listed below.

-   [All requests](#all-requests)
-   [Request URL](#request-url)
-   [HTTP method](#http-method)
-   [Cookies](#cookies)
-   [Headers](#headers)

In addition to these common scenarios, [there are many other ways](/guides/performance/rules/conditions) through which Rules can match requests. Additionally, you can combine match conditions to selectively apply features when multiple conditions have been met. You may also use [Else or `Else If statements](/guides/performance/rules#statements) to apply features when specific criteria has not been met. The power and flexiblity of Rules allows you to use basic configurations or build upon them to create a configuration that addresses your complex business needs.

### All Requests {/*all-requests*/}

Create a rule without match conditions to apply a set of features to all requests. The recommended position for this rule is the top of the list. This allows rules positioned below it to override this configuration for specific use cases. 

<Callout type="tip">

  Check for the `always applied` label to verify that a rule does not have match conditions.

</Callout>

![Rule that applies to all requests.](/images/v7/performance/rules-use-case-all-requests.png?width=700)

### Request URL {/*request-url*/}

Apply a set of features to:
-   A specific path through the Path match condition. 
-   A query parameter through the Query Parameter match condition.

#### Path {/*path*/}

Use the [Path match condition](/guides/performance/rules/conditions#path) to match requests by path. The most common configuration is to apply a rule across all requests whose relative URL starts with a specific value. Set up this match condition by selecting the `matches regular expression` operator and then appending `.*` to the desired relative path. 

![Path match condition](/images/v7/performance/rules-use-case-path.png?width=700)

The above match configuration matches all requests whose relative path starts with: `/marketing/conferences/`. For example, it matches all of the following request URLs:

```
https://cdn.example.com/marketing/conferences/widgets/index.html
https://cdn-2.example.com/marketing/conferences/widgets/resources/stylesheets/styles.css`
https://images.example.com/marketing/conferences/widgets/features.png
```

Restrict the above rule to images whose relative path starts with: `/marketing/conferences/` by adding the [Extension match condition](/guides/performance/rules/conditions#extension). Set up this match condition by selecting the `is one of` operator and then defining the desired file extensions (e.g., png, jpg, and jpeg).

![Path match condition](/images/v7/performance/rules-use-case-path-extension.png?width=700)

#### Query String {/*query-string*/}

Use the [Query Parameter match condition](/guides/performance/rules/conditions#query-parameter) to find requests that contain a query string parameter set to a specific value. The following configuration finds all requests whose query string contain `session=active`.

![Query Parameter match condition](/images/v7/performance/rules-use-case-query-parameter.png?width=700)

For example, the above configuration matches against the following request:

`https://cdn.example.com/marketing/experience.png?session-id=12345&session=active&width=300`

### HTTP Method {/*http-method*/}

Use the [Method match condition](/guides/performance/rules/conditions#method) to find requests submitted with the desired HTTP method (e.g., `POST`, `PUT`, or `GET`).

![Method match condition](/images/v7/performance/rules-use-case-method.png?width=700)

### Cookies {/*cookies*/}

Use the [Cookie match condition](/guides/performance/rules/conditions#cookie) to find requests that contain a cookie set to a specific value. The following configuration finds all requests that contain this cookie: `type=oatmeal`.

![Cookie match condition](/images/v7/performance/rules-use-case-cookie.png?width=700)

For example, the above configuration matches against a request that contains the following cookies:

`sessionid=12345; type=oatmeal; token=1fj4f3nfy4f7s`

### Headers {/*headers*/}

Use the [Request Header match condition](/guides/performance/rules/conditions#request-header) to find requests that contain a header set to a specific value. The following configuration finds all requests whose `Accept-Language` header contains `en-US`.

![Request Header match condition](/images/v7/performance/rules-use-case-request-header.png?width=700)
---
title: Request Matching Scenarios
---

Before adding [features](/guides/performance/rules/features) that customize how your traffic is processed, you must first decide the set of requests to which they will be applied. You may either apply them to all requests or use match condition(s) to only apply them to specific requests. Common request matching scenarios are listed below.

-   [All requests](#all-requests)
-   [Request URL](#request-url)
-   [HTTP method](#http-method)
-   [Cookies](#cookies)
-   [Headers](#headers)
-   [Hostname](#hostname)
-   [Country](#country)
-   [Status Code](/guides/performance/rules/feature_scenarios#custom-response-for-specific-status-codes)

In addition to these common scenarios, [there are many other ways](/guides/performance/rules/conditions) through which Rules can match requests. Additionally, you can combine match conditions to selectively apply features when multiple conditions have been met. You may also use [Else or Else If statements](#matching-with-conditional-logic) to apply features when specific criteria has not been met. The power and flexiblity of Rules allows you to use basic configurations or build upon them to create a configuration that addresses your complex business needs.

## All Requests {/*all-requests*/}

Create a rule without match conditions to apply a set of features to all requests. The recommended position for this rule is the top of the list. This allows rules positioned below it to override this configuration for specific use cases. 

<Callout type="tip">

  Check for the `always applied` label to verify that a rule does not have match conditions.

</Callout>

![Rule that applies to all requests.](/images/v7/performance/rules-use-case-all-requests.png?width=700)

## Request URL {/*request-url*/}

Apply a set of features to:
-   A specific path through the Path match condition. 
-   A query parameter through the Query Parameter match condition.

### Path {/*path*/}

Use the [Path match condition](/guides/performance/rules/conditions#path) to match requests by path. The most common configuration is to apply a rule across all requests whose relative URL starts with a specific value. Set up this match condition by selecting the `matches regular expression` operator and then appending `.*` to the desired relative path. 

![Path match condition](/images/v7/performance/rules-use-case-path.png)

The above match configuration matches all requests whose relative path starts with: `/marketing/conferences/`. For example, it matches all of the following request URLs:

```
https://cdn.example.com/marketing/conferences/widgets/index.html
https://cdn-2.example.com/marketing/conferences/widgets/resources/stylesheets/styles.css`
https://images.example.com/marketing/conferences/widgets/features.png
```

Restrict the above rule to images whose relative path starts with: `/marketing/conferences/` by adding the [Extension match condition](/guides/performance/rules/conditions#extension). Set up this match condition by selecting the `is one of` operator and then defining the desired file extensions (e.g., png, jpg, and jpeg).

![Path match condition](/images/v7/performance/rules-use-case-path-extension.png?width=700)

<Callout type="info">

  The [Rewrite URL match condition](/guides/performance/rules/features#rewrite-url) is incompatible with the Extension match condition. Use the [Path match condition](/guides/performance/rules/conditions#path) instead.

  [View a sample configuration.](/guides/performance/rules/feature_scenarios#default-image-optimizations)

</Callout>

### Query String {/*query-string*/}

Use the [Query Parameter match condition](/guides/performance/rules/conditions#query-parameter) to find requests that contain a query string parameter set to a specific value. The following configuration matches all requests whose query string contain `session=active`.

![Query Parameter match condition](/images/v7/performance/rules-use-case-query-parameter.png)

For example, the above configuration matches against the following request:

`https://cdn.example.com/marketing/experience.png?session-id=12345&session=active&width=300`

## HTTP Method {/*http-method*/}

Use the [Method match condition](/guides/performance/rules/conditions#method) to find requests submitted with the desired HTTP method (e.g., `POST`, `PUT`, or `GET`).

![Method match condition](/images/v7/performance/rules-use-case-method.png?width=700)

## Cookies {/*cookies*/}

Use the [Cookie match condition](/guides/performance/rules/conditions#cookie) to find requests that contain a cookie set to a specific value. The following configuration matches all requests that contain this cookie: `type=oatmeal`.

![Cookie match condition](/images/v7/performance/rules-use-case-cookie.png?width=700)

For example, the above configuration matches against a request that contains the following cookies:

`sessionid=12345; type=oatmeal; token=1fj4f3nfy4f7s`

## Headers {/*headers*/}

Use the [Request Header match condition](/guides/performance/rules/conditions#request-header) to find requests that contain a header set to a specific value. The following configuration matches all requests whose `Accept-Language` header contains `en-US`.

![Request Header match condition](/images/v7/performance/rules-use-case-request-header.png)

## Hostname {/*hostname*/}

Use the [Request Header match condition](/guides/performance/rules/conditions#request-header) to find requests by hostname. 

1.  Set the **Header Name** option to `Host`.
2.  Set the **Operator** option to `matches regular expression`.
3.  Set the **Match Value** option to the following pattern:

    `<Host>(.*)`
    
    The `(.*)` pattern appended to the hostname accounts for clients that include the port in the `Port` request header. 

The following configuration matches all requests whose `Host` header contains `cdn.example.com`.

![Request Header match condition](/images/v7/performance/rules-use-case-hostname.png)

## Country {/*country*/}

Use the [Country match condition](/guides/performance/rules/conditions#country) to find requests from one or more countries. The following configuration matches all requests from the US, Canada, and Mexico.

![Country match condition](/images/v7/performance/rules-use-case-country.png)

[View additional geolocation match conditions.](/guides/performance/rules/conditions)

## Matching with Conditional Logic {/*matching-with-conditional-logic*/}

Match requests when they satisfy:

-   A single match condition. The majority of the above examples demonstrate how to match by a single match condition. 
-   [Multiple match conditions.](#multiple-match-conditions)
-   [Any match condition](#any-match-condition-in-a-statement) defined within a statement.
-   [Any statement.](#any-statement)
-   [None of the match conditions](#fallback-matching) defined within a rule.

### Multiple Match Conditions {/*multiple-match-conditions*/}

You can add multiple match conditions to a single statement. By default, a request must satisfy all of these conditions before a set of features will be applied to it. 

The following sample configuration redirects traffic that meets both of the following conditions:
-   Matches a specific relative path.
-   Originates outside of North America.

![Multiple match conditions](/images/v7/performance/rules-use-case-multiple-match-conditions.png)

The `and` label, which appears next to the Country match condition, indicates that a request must satisfy both match conditions before it will be redirected.

### Any Match Condition in a Statement {/*any-match-condition-in-a-statement*/}

Apply a set of features to requests that match any match condition in a [statement](/guides/performance/rules#statements) by toggling the `and` labels to `or` labels. 

The following sample configuration redirects traffic when it meets any of the following conditions:

-   The request's relative path starts with: `/shopping/`
-   The request originated from a country other than the United States, Mexico, or Canada.
-   The request contained a session cookie set to `active`.

![Any match conditions](/images/v7/performance/rules-use-case-any-match-condition-statement.png)

### Any Statement {/*any-statement*/}

Add at least one match condition to an [Else statement](/guides/performance/rules#statements) to allow requests to match against any of a rule's statements. 

In the following sample rule, {{ PRODUCT }} will first check whether the request's relative path starts with `/shopping/`. If the request starts with a different relative path, it will then check whether the request originated from the United States, Canada, or Mexico. If the request starts with a different relative path and does not originate from those countries, then it will check whether the `session` cookie has been set to set `active`. 

![Any statement](/images/v7/performance/rules-use-case-any-statement.png)

### Fallback Matching {/*fallback-matching*/}

Add an Else statement without any match conditions to match requests that do not satisfy any of the preceding statements.

In the following sample rule, a default caching policy is applied to requests when their relative path does not start with `/shopping/` or if they were not issued from the United States, Canada, or Mexico.

![Else statement](/images/v7/performance/rules-use-case-else-statement.png)
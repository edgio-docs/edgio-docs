# Split Testing (aka Edge Experiments)

{{ PRODUCT_NAME }} makes it easy to conduct split testing without performance penalties by executing splits at the edge through an easy-to-use yet powerful interface. It can be used for A/B and multivariate tests, canary deploys, blue-green tests, iterative migration off of a legacy website, personalization, and more. This guide shows you how to configure a split test.

## How Split Testing Works

You can perform two kinds of split tests with {{ PRODUCT_NAME }}:

1. A/B test multiple implementations of the same site
2. Split traffic between multiple sites - This is commonly used to test a new experience against a legacy one.

## A/B Testing Multiple Implementations

To A/B test multiple implementations of the same site, simply deploy each implementation to a separate [environment](environments); then [configure the rules for splitting traffic using the {{ PRODUCT_NAME }} Developer Console](#section_configuring_the_split_test).

To use CI to deploy A/B tests we recommend that you:

1. Set up separate branches in source control for the main experience and the new experience, for example `master` and `preview`.
2. Create environments called `production` and `preview` in the {{ PRODUCT_NAME }} Developer Console.
3. Configure CI to deploy the `master` branch to the `production` environment and the `preview` branch to the `preview` environment. (Using `{{ CLI_NAME }} deploy --environment={environment name}`).

## Splitting Traffic between Multiple Sites

To split traffic between multiple sites, create an environment for each site with the backend set to that site, deploy the code to each environment; then [configure the rules for splitting traffic using the {{ PRODUCT_NAME }} Developer Console](#section_configuring_the_split_test).

For example, to use CI to deploy a split between a `new` site and a `legacy` site we recommend that you:

1. Set up separate source control for the new experience and the legacy experience, for example `new` and `legacy`.
2. Create environments called `production` and `legeacy` in the {{ PRODUCT_NAME }} Developer Console.
3. Set the backends in the  `{{ CONFIG_FILE }}` for each code base to point to their specific backend (see below.)
4. Configure CI to deploy the `new` code to the `production` environment and the `legacy` code to the `legacy` environment. (Using `{{ CLI_NAME }} deploy --environment={environment name}`).

```js
// {{ CONFIG_FILE }}
// New site backend
module.exports = {
  backends: {
    default: {
      domainOrIp: 'origin.my-site.com',
    },
  },
}
```

```js
// {{ CONFIG_FILE }}
// Legacy site backend
module.exports = {
  backends: {
    default: {
      domainOrIp: 'legacy-origin.my-site.com',
    },
  },
}
```

## Configuring the Split Test

Navigate to the environment in which you want to configure the split test and click _Edit_:

![edit](/images/split-testing/edit.png)

Scroll to the Split Testing section and click _Add Rule_:

![edit](/images/split-testing/split-testing.png)

Select the amount of traffic to send to each destination or environment and click _Apply_.

![edit](/images/split-testing/add-rule.png)

You can add additional rules to the traffic split as well. For example, you can allow testers to access a specific experience all of the time by setting a cookie value. In addition to cookie value, you can split traffic based on header value, path, IP address, URL parameters, device type, browser type, and bot boolean. Here's an example: 

![edit](/images/split-testing/criteria.png)

The order of rules is critical. Rules are matched from top to bottom. When handling a request, the first matching rule will be used for the request. Given the rules set up in the examples above, you would need to move the `force-new` cookie rule to the top so that it takes precedence over the other rule that splits all traffic without any criteria. We can reorder the rules by dragging and dropping:

![edit](/images/split-testing/order.png)

To begin the split test, click the _Activate_ button at the top of the environment:

![edit](/images/split-testing/activate.png)

## Ending the Split Test

To end the split test, you can either deploy a new version of your app with the router destinations removed, or update the environment to send 100% of traffic to a specific destination.

## Third-Party CDNs

If {{ PRODUCT_NAME }} is behind a third-party CDN, it is critical that you update the third party CDN to not cache responses from {{ PRODUCT_NAME }} nor to affect any cookies that begin with `{{ COOKIE_PREFIX }}_`. You can find more details [here](third_party_cdns#section_split_testing).

## How Requests are Routed

When a split test is active, all users are assigned to a random number between 1 and 100 via a cookie called `{{ COOKIE_PREFIX }}_bucket`. This cookie assignment is done at the edge before the user's first request hits the cache, so there is no performance penalty for new users.

The experience the user sees is determined by the traffic split percentage you set in the environment configuration in the {{ PRODUCT_NAME }} Developer Console and on which side of the split the user's `{{ COOKIE_PREFIX }}_bucket` value falls.

## Identifying the Experience on the Client

When a split test is active, {{ PRODUCT_NAME }} will automatically set a `{{ COOKIE_PREFIX }}_destination` cookie to the name of the chosen destination. You can access this value in the browser and use it to report the split test experience assignment to your analytics.

## Security, Redirects and Split Tests

Each environment defines security rules, redirect rules, and split test rules. When traffic is processed by the {{ PRODUCT_NAME }} servers, the `host` header is used to determine which environment rules are executed. Normally when you have multiple environments you access each of them using different `host` headers. E.g. `www.mysite.com` to access a `production` environment and `new.mysite.com` to access the `new` environment. In this scenario each environment can have its own security rules and redirect rules. Requests arriving at `www.mysite.com` execute the rules in the `production` environment. Requests arriving at `new.mysite.com` execute the rules in the `new` environment.

But when split testing is enabled, all the traffic arrives using the same `host` header. In this case, only the rules for that environment are executed. Using the above example, when a split test is setup on the `production` environment that splits traffic to `production` or `new` all traffic arriving at `www.mysite.com` executes the `production` security, redirect, and split testing rules. Even if the result of the split test is to use the `new` environment, the security, redirect, and split testing rules of the `new` environment are *not* executed. Traffic arriving at `new.mysite.com` bypasses the split test rules on the `production` environment, so it executes the `new` environment's rules normally.

## Metrics and Cache Purging with Split Tests

When split tests are enabled, all metrics and caching are recorded under the environment that is the result of the split test. Using the above example, all traffic arrives on `www.mysite.com` but to see the traffic and caching metrics for requests split test to the `new` environment, you need to view those graphs in `new` environment in {{ PRODUCT_NAME }} Developer Console. This is also true for cache purging. To purge traffic that was split to the `new` environment you use the cache purge button in the `new` environment in {{ PRODUCT_NAME }} Developer Console. If want to purge the entire cache during a split you need to purge both the `production` cache and the `new` cache.

## Compatibility with A/B Testing Tools

{{ PRODUCT_NAME }} split testing routes traffic at the edge based on a variety of criteria. It does not identify user cohorts (although it can split on cohorts identified by another tool) or report business metrics about A/B tests since there are many great tools for that. We recommend you utilize an A/B testing tool that supports server-side integration such as Monetate, Optimizely, Adobe Test, Google Experiments, or Visual Web Optimizer. These tools will set a cookie or header that can be used to split traffic using the appropriate criteria described above.

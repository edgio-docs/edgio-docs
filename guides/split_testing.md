# Split Testing

The Moovweb XDN makes it easy to conduct split testing without performance penalties. This guide shows you how to configure a split test.

## How split testing works

You can perform two kinds of split tests with the Moovweb XDN:

- A/B test multiple implementations of the same site
- Split traffic between multiple sites - This is commonly used to test a new experience against a legacy one.

## A/B testing multiple implementations of the same site

To A/B test mutliple implementations of the same site, simply deploy each implementation to a separate [environment](environments), then [configure the rules for splitting traffic between using the XDN Developer Console](#section_configuring_the_split_test).

To use CI to deploy A/B tests we recommend that you:

1. Set up separate branches in source control for the main experience and the new experience, for example `master` and `preview`
2. Create environments called `production` and `preview` in the XDN Developer Console.
3. Configure CI to deploy the `master` branch to the `production` environment and the `preview` branch to the `preview` environment. (Using `xdn deploy --environment={environment name}`)

## Splitting traffic between multiple sites

To split traffic between multiple sites, first add a backend for each site to `xdn.config.js`. For example, to split traffic between a new experience hosted on `origin.my-site.com` and a legacy experience hosted on `legacy-origin.my-site.com`:

```js
// xdn.config.js
module.exports = {
  backends: {
    legacy: {
      domainOrIp: 'legacy-origin.my-site.com',
    },
    new: {
      domainOrIp: 'origin.my-site.com',
    },
  },
}
```

Then, add a `destination` for each site to your router. For example,

```js
// routes.js
const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .destination(
    'legacy_experience', // displayed in the destination dropdown in the traffic splitting section of your environment configuration in the XDN Developer Console
    new Router()
      // additional routing rules for the legacy experience go here
      .fallback(({ proxy }) => proxy('legacy')),
  )
  .destination(
    'new_experience', // displayed in the destination dropdown in the traffic splitting section of your environment configuration in the XDN Developer Console
    new Router()
      // additional routing rules for the new experience go here
      .fallback(({ proxy }) => proxy('new')),
  )
```

Once you have made these changes, deploy your site using `xdn deploy --environment={my production environment name}`, then [configure the rules for splitting traffic between using the XDN Developer Console](#section_configuring_the_split_test).

## Configuring the split test

Navigate to the environment in which you want to configure the split test and click "Edit":

![edit](/images/split-testing/edit.png)

Scroll to the Split Testing section and click "Add Rule":

![edit](/images/split-testing/split-testing.png)

Select the amount of traffic to send to each destination or environment and click "Apply".

![edit](/images/split-testing/add-rule.png)

You can add additional rules to, for example, allow testers to get to the new experience all of the time by adding a cookie. Here's an example:

![edit](/images/split-testing/criteria.png)

The order of rules is critical. Rules are matched from top to bottom. When handling a request, the first matching rule will be used. Given the rules we've set up in the examples above, we need to move the force-new cookie rule to the top so that it takes precedence since the other rule contains no criteria. We can reorder the rules by dragging and dropping:

![edit](/images/split-testing/order.png)

To begin the split test, click the "Activate" button at the top of the environment:

![edit](/images/split-testing/activate.png)

## Ending the split test

To end the split test, you can either deploy a new version of your app with the router destinations removed, or update the environment
to send 100% of traffic to a specific destination.

## Third-Party CDNs

If the XDN is behind a third-party CDN, it is critical that you update the third party CDN to not cache responses from the XDN nor to affect any cookies that begin with `xdn_`. You can find more details [here](third_party_cdns#section_split_testing).

## How requests are routed

When a split test is active, all users are assigned to a random number between 1 and 100 via a cookie called `xdn_bucket`. This cookie assignment is done at edge, before the user's first request hits cache, and so there is no performance penalty for new users.

The experience the user sees is determined by the traffic split percentage you set in the environment configuration in the Moovweb Developer Console and on which side of the split the user's `xdn_bucket` value falls.

## Identifying the experience on the client

When a split test is active, the XDN will automatically set an `xdn_destination` cookie to the name
of the chosen destination. You can use this value in the browser to report the split test experience assignment to
analytics.

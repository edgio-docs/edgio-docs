# Split Testing

The Moovweb XDN makes it easy to conduct split testing without performance penalties. This guide shows you how to configure a split test.

## How split testing works

To set up a split test using the Moovweb XDN you need to:

1. Configure your router with two or more destinations
2. Configure the rules for splitting traffic between router destinations using the [XDN Developer Console](http://moovweb.app).

When a split test is active, all users are assigned to a random number between 0 and 99 via a cookie called `moov_bucket`.  This cookie assignment is done at edge before before the user's first request hits cache and so there is no performance penalty for new users. 

The experience the user sees is determined by the traffic split percentage you set in the environment configuration in the Moovweb Developer Console and on which side of the split the user's `moov_bucket` value falls.

## Preparing your router

In order to conduct a split test, you need to add at least two destinations to your router. In the example below we set up two destinations: a legacy experience and a new experience:

```js
const { Router } = require('@xdn/core/router')

module.exports = new Router()
  .destination(
    'legacy_experience', // displayed in the destination dropdown in the traffic splitting section of your environment configuration in the XDN Developer Console
    new Router()
      // additional routing rules for the legacy experience go here
      .fallback(({ proxy }) => proxy('legacy'))
  )
  .destination(
    'new_experience', // displayed in the destination dropdown in the traffic splitting section of your environment configuration in the XDN Developer Console
    new Router()
      // additional routing rules for the new experience go here
      .fallback(({ proxy }) => proxy('new'))
  )
}
```

In the example above, `legacy` and `new` correspond to backends in `xdn.config.js`:

```js
// xdn.config.js
module.exports = {
  backends: {
    legacy: {
      domainOrIp: 'legacy-origin.my-site.com'
    },
    new: {
      domainOrIp: 'origin.my-site.com'
    },
  }
}
```

## Deploy your application

Once you've added destinations to your application, deploy your application to an environment using:

```bash
xdn deploy <team> --environment=<environment>
```

## Configuring the split test

Navigate to the environment in which you want to configure the split test and click "Edit":

![edit](/images/split-testing/edit.png)

Scroll to the Split Testing section and click "Add Rule":

![edit](/images/split-testing/split-testing.png)

Select the amount of traffic to send to each destination and click "Apply".

![edit](/images/split-testing/add-rule.png)

You can add additional rules to, for example, allow testers to get to the new experience all of the time by adding a cookie. Here's an example:

![edit](/images/split-testing/criteria.png)

The order of rules is critical. Rules are matched from top to bottom.  When handling a requst, the first matching rule will be used. Given the rules we've set up in the examples above, we need to move the force-new cookie rule to the top so that it takes precedence since the other rule contains no critera.  We can reorder the rules by dragging and dropping:

![edit](/images/split-testing/order.png)

To begin the split test, click the "Activate" button at the top of the environment:

![edit](/images/split-testing/activate.png)

## Ending the split test

To end the split test, you can either deploy a new version of your app with the router destinations removed, or update the environment
to send 100% of traffic to a specific destination.



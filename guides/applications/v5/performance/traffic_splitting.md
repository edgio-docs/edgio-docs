---
title: Traffic Splitting 
---

<Callout type="info">

  You can also use traffic splitting for [A/B Testing](/applications/performance/traffic_splitting/a_b_testing).

</Callout>

{{ PRODUCT_NAME }} makes it easy to conduct A/B testing without performance penalties by executing splits at the edge through an easy-to-use yet powerful interface. A/B Testing, also known as split testing, is a marketing experiment wherein you split your audience to test a number of variations of canary deploys, blue-green tests, iterative migration off of a legacy website, personalization, and more.

Iterative site migrations allow you to mitigate risk as you migrate a site. You can recover quickly if there is an error and ensure that you do not experience downtime during the migration.

This guide provides an overview of site migrations and explains how to configure traffic splitting across multiple sites.


<Callout type="info">

  This guide uses the terms <strong>legacy</strong> and <strong>new</strong> to refer to your current and new sites as well as the related {{ PRODUCT }} environments.

</Callout>

## Configurations Entities {/*configurations-entities*/}

Traffic splitting requires that you make configurations in your project folder and create traffic splitting rules in the {{ PORTAL }}. The entities in the Console and files in your project folder where various configurations reside are called out. To provide a bigger picture, additional Console entities are included.

![Configuration Entities](/images/traffic-splitting/configuration_entities.png)

## Types of Site Migrations {/*types-of-site-migrations*/}

The two general types of iterative site migrations are _gradual migrations_ and _gradual site build-outs_.

* Gradual migrations: You have a legacy site and a new site with some kind of changes and improvements. You want to gradually move traffic from the legacy site to the new site. This allows you to verify items such as load on the new site, core web vitals, and so on. For example, if you want to begin migration on a Monday and finish on Friday, you could do something like this hypothetical situation:

  1. On Monday configure 20% of traffic to the new site and 80% to the legacy (old).
  2. On Wednesday configure a 50%/50% split.
  3. On Friday configure 100% of the traffic to the new site and remove all traffic from the legacy site.

* Gradual site build-outs: You are replacing your legacy site with a new site that you are building/testing/deploying one piece at a time based on domains or routes, and so on. For example, you might have updated a single page or even an image and you want to publish the new item. 
  
  You are ready to roll out the first piece.

  1. You shift all traffic for that piece from the legacy site to the new by configuring 0% for the legacy and 100% for the new.
  2. As new pieces are ready, you do the same for them.
  3. When all pieces have been deployed you remove traffic from the legacy site. 

## Migrating Sites - General Steps {/*migrating-sites-general-steps*/}

### Separate Sites {/*separate-sites*/}

Although there are several ways you might organize your sites for migration, we will focus on a common, simple scenario where the two sites are defined by two distinct environments. One environment is a proxy to the `legacy` site and the other is the `new` site.

1. [Configure the backends](#step-1-configuring-backends) in the `{{ CONFIG_FILE }}` file.
2. [Configure destinations](#step-2-configuring-destination-environments) in the `routes.js` file.
3. [Configure traffic splitting rules](#step-3-configure-traffic-splitting-rules-in-the-developer-console) in the {{ PORTAL }}.

### Separate Code Versions {/*separate-code-versions*/}

If you are using two code versions you can use Continuous Integration/Continuous Deployment  (CI/CD) to push changes to your `new` and `legacy` sites. Regardless of whether your versions reside in branches in the same repository or two different repositories, or some other way of separating your code, we recommend that you:

1. Create environments called `new` and `legacy` in the {{ PORTAL }}.
2. Configure CI/CD to deploy to the `new` or `legacy` site whenever you push changes. Integrate either of these  commands in your deployment script as appropriate:
`0 deploy –environment=new` 
`0 deploy –environment=legacy`

1. [Configure the destinations](#step-2-configuring-destination-environments) in the `routes.js` file, 
2. [Configure traffic splitting rules](#step-3-configure-traffic-splitting-rules-in-the-developer-console) in the {{ PORTAL }}.

### Step 1. Configuring Backends {/*step-1-configuring-backends*/}

If your sites consist of two separate servers use these steps to configure the domain names. Servers are commonly your own origin servers, but can also be third-party servers for which you can use {{ PRODUCT }} to proxy to the domain name, and use the {{ PRODUCT }} router to configure caching and other header manipulation.

<Callout type="info">

  If your sites are defined by different code versions, this step is not necessary.

</Callout>

Configure the backends in the {{ CONFIG_FILE }} file. (See [{{ CONFIG_FILE }}](/applications/basics/edgio_config) for more information.). For example, to split traffic between a new experience hosted on `origin.my-site.com` and a legacy experience hosted on `legacy-origin.my-site.com`:

```js filename="{{ CONFIG_FILE }}"
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

### Step 2. Configuring Destination Environments {/*step-2-configuring-destination-environments*/}

Add a destination for each site or application version to your `routes.js` file. The destinations will appear in the {{ PORTAL }} and you will use them later on when configuring traffic splitting rules.

```js filename="routes.js"
const { Router } = require('{{ PACKAGE_NAME }}/core/router')
module.exports = new Router()
  .destination(
    'legacy_experience', // displayed in the destination dropdown in the traffic splitting section of your environment configuration in the {{ PORTAL }}
    new Router()
      // additional routing rules for the legacy experience go here
      .fallback(({ proxy }) => proxy('legacy')),
  )
  .destination(
    'new_experience', // displayed in the destination dropdown in the traffic splitting section of your environment configuration in the {{ PORTAL }}
    new Router()
      // additional routing rules for the new experience go here
      .fallback(({ proxy }) => proxy('new')),
  )
```
After deploying a router with multiple destinations, all requests will be sent to the first destination until you have defined traffic splitting rules within the {{ PORTAL }}.

### Step 3. Configure Traffic Splitting Rules in the {{ PORTAL }} {/*step-3-configure-traffic-splitting-rules-in-the-developer-console*/}

1.  [Log into your account]({{ APP_URL }}/login/), then navigate to the environment in which you want to configure the iterative migration and click Edit:

    ![Edit Environment](/images/traffic-splitting/edit_env.png)

2.  Scroll to the **Split Testing** section and click *Add Rule*:

    ![Add Split Test Rule](/images/traffic-splitting/add_rule.png)

3.  Select the amount of traffic to send to each destination or environment:

    1.  Click **ADD DESTINATION**.
    2.  Choose a destination from the drop-down menu and enter a percentage for each destination.

        ![Add Split Test Rule Destination](/images/traffic-splitting/rule_config.png)

#### Adding Additional Rules {/*adding-additional-rules*/}

You can add additional rules to the traffic split as well. For example, you can allow testers to access a specific experience all of the time by setting a cookie value. In addition to cookie value, you can split traffic based on header value, path, IP address, URL parameters, device type, browser type, and bot boolean. Here’s an example:

![Add Split Test Additional Rules](/images/traffic-splitting/additional_rules.png)

#### Rule Ordering {/*rule-ordering*/}

The order of rules is critical. Rules are matched from top to bottom. When handling a request, the first matching rule will be used for the request. Given the rules setup in the examples above, you would need to move the force-new cookie rule to the top so that it takes precedence over the other rule that splits all traffic without any criteria. Use the "grip" icon to reorder rules by dragging and dropping:

![Split Test Rule Ordering](/images/traffic-splitting/rule_ordering.png)

### Step 4. Complete the Configuration {/*step-4-complete-the-configuration*/}

Click the Activate button at the top of the environment:

![Activate Environment](/images/traffic-splitting/activate_env.png)

## Common Pitfalls for Site Migrations {/*common-pitfalls-for-site-migrations*/}

* Incomplete routing for static assets, eg.` /images/header.png` only exists on the `legacy` environment but there are no routing rules for that file.
    * For example, a new page at url `/about-us` is being rolled out. The `new` page has its static image assets at `/images/*` but the `legacy` site also has static images at `/images/*`. As a result, without careful routing rules, the `new` page might try to load missing files from the `legacy` environment.
    * One way to solve this is to ensure that static assets from the `new` site live at a completely distinct path from where they live at the `legacy` site. In the previous example, the `new` site might be built with static images located at `/img/*` while the `legacy` site has those files at `/images/*`. The router can then proxy the `new` site for all `/img/*` paths and the `legacy` site for all `/images/*` paths.
    * If the paths are distinct, it is also possible to route the static asset based on the referer url. If the referer url matches a path that is defined as one going to the `new` environment, any static assets should also be loaded from the `new` environment.
    * If it’s not possible to separate the paths from the two environments, a fallback trick can be used whereby the router first tries to load content from one origin, and if that fails, automatically retries against the second origin.
* Missing or incorrect host header entries causing content not to load from the `legacy` environment.
* Links from `new` content pointing to pages that are still in draft in the `new` environment and which do not exist in the `legacy` environment.

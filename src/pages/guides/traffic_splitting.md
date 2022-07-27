# Traffic Splitting for Site Migrations {/*traffic-splitting-for-site-migrations*/}

<Callout type="info">
  You can also use traffic splitting for Split Testing. Please see Traffic Splitting.
</Callout>


{{ PRODUCT }} makes it easy to split traffic without performance penalties by executing splits at the edge through an easy-to-use yet powerful interface. Traffic splitting can be used for canary deployments, Blue/Green deployments, iterative migration off of a legacy website, personalization, and more.

Iterative site migrations allow you to mitigate risk as you migrate a site. You can recover quickly if there is an error and ensure that you do not experience downtime during the migration.

This guide provides an overview of site migrations and explains how to configure traffic splitting across multiple sites.


<Callout type="info">
  This guide uses the terms new and legacy to refer to your current and new sites as well as the related {{ PRODUCT }} environments
</Callout>

# Configurations Entities {/*configurations-entities*/}

Traffic splitting requires that you make configurations in your project folder and create traffic splitting rules in the {{ PRODUCT }} Developer Console (the Console). The entities in the Console and files in your project folder where various configurations reside are called out. To provide a bigger picture, additional Console entities are included.

```
[image]
```

# Request Flow {/*request-flow*/}

In this sample, web browsers make a request for `/path/asset.png`. According to traffic splitting rules, 30% of the requests return the legacy version and 70% return the new version.

```
[image]
```

# Types of Site Migrations {/*types-of-site-migrations*/}

The two general types of iterative site migrations are _gradual migrations_ and _gradual site build-outs_.

* Gradual migrations: You have an original site and a new site with some kind of changes and improvements. You want to gradually move traffic from the original site to the new site. This allows you to verify items such as load on the new site, core web vitals, and so on. For example, if you want to begin migration on a Monday and finish on Friday, you could do something like this hypothetical situation:
1. On Monday configure 20% of traffic to the new site and 80% to the original.  old.
2. On Wednesday configure a 50%/50% split.
3. On Friday configure 100% of the traffic to the new site and bring down the original.

* Gradual site build-outs: You are replacing your original with a new site that you are building/testing/deploying one piece at a time based on domains or routes, and so on. For example, you might have updated a single page or even an image and you want to publish the new item. \
 \
 You are ready to roll out the first piece.
1. You shift all traffic for that piece from the original site to the new by configuring 0% for the original and 100% for the new.
2. As new pieces are ready, you do the same for them.
3. When all pieces have been deployed you bring down the original site. 

# Migrating Sites - General Steps {/*migrating-sites---general-steps*/}

## Separate Sites {/*separate-sites*/}

Although there are several ways you might organize your sites for migration, we will focus on a common, simple scenario where the two sites are defined by two distinct environments. One environment is a proxy to the `legacy `site and the other is the `new` site.

1. [Configure the backends](#heading=h.bbyh8uq2zpnv) in the `{{ CONFIG_FILE }}` file.
2. [Configure destinations](#heading=h.6psn8apbmuyx) in the `routes.js` file.
3. [Configure traffic splitting rules](#heading=h.2amthn83ub1n) in the {{ PRODUCT }} Developer Console.

## Separate Code Versions {/*separate-code-versions*/}

If you are using two code versions you can use Continuous Integration/Continuous Deployment  (CI/CD) to push changes to your `new` and `legacy` sites. Regardless of whether your versions reside in branches in the same repository or two different repositories, or some other way of separating your code, we recommend that you:

1. Create environments called `new` and `legacy` in the {{ PRODUCT }} Developer Console.
2. Configure CI/CD to deploy to the `new` or `legacy` site whenever you push changes. Integrate either of these  commands in your deployment script as appropriate:
`0 deploy –environment=new` 
`0 deploy –environment=legacy`

3. [Configure the destinations](#heading=h.6psn8apbmuyx) in the `routes.js` file, 
4. [Configure traffic splitting rules](#heading=h.2amthn83ub1n) in the {{ PRODUCT }} Developer Console.

## Step 1. Configuring Backends {/*step-1-configuring-backends*/}

If your sites consist of two separate servers use these steps to configure the domain names. Servers are commonly your own origin servers, but can also be third-party servers for which you can use {{ PRODUCT }} to proxy to the domain name, and use the {{ PRODUCT }} router to configure caching and other header manipulation.

<Callout type="info">
If your sites are defined by different code versions, this step is not necessary.
</Callout>

Configure  the backends in the {{ CONFIG_FILE }} file. (See [{{ CONFIG_FILE }}](layer0_config) for more information.). For example, to split traffic between a new experience hosted on `origin.my-site.com` and a legacy experience hosted on `legacy-origin.my-site.com`:

![alt_text](images/image1.png "image_tooltip")

## Step 2. Configuring Destination Environments {/*step-2-configuring-destination-environments*/}

Add a destination for each site or application version to your `routes.js` file. The destinations will appear in the {{ PRODUCT }} Developer Console and you will use them later on when configuring traffic splitting rules.

![alt_text](images/image2.png "image_tooltip")

## Step 3. Configure Traffic Splitting Rules in the {{ PRODUCT }} Developer Console {/*step-3-configure-traffic-splitting-rules-in-the-developer-console*/}

1. [Log into your account](https://app.layer0.co/login/), then navigate to the environment in which you want to configure the iterative migration and click Edit:

![alt_text](images/image3.png "image_tooltip")

2. Scroll to the **Split Testing** section and click *Add Rule*:

![alt_text](images/image4.png "image_tooltip")

3. Select the amount of traffic to send to each destination or environment:

    a. Click **ADD DESTINATION**
    b. Choose a destination from the drop-down menu and enter a percentage for each destination.

![alt_text](images/image5.png "image_tooltip")

### Adding Additional Rules {/*adding-additional-rules*/}

You can add additional rules to the traffic split as well. For example, you can allow testers to access a specific experience all of the time by setting a cookie value. In addition to cookie value, you can split traffic based on header value, path, IP address, URL parameters, device type, browser type, and bot boolean. Here’s an example:

![alt_text](images/image6.png "image_tooltip")

### Rule Ordering {/*rule-ordering*/}

The order of rules is critical. Rules are matched from top to bottom. When handling a request, the first matching rule will be used for the request. Given the rules setup in the examples above, you would need to move the force-new cookie rule to the top so that it takes precedence over the other rule that splits all traffic without any criteria. Use the “grip” icon to reorder rules by dragging and dropping:

![alt_text](images/image7.png "image_tooltip")

## Step 4. Complete the Configuration {/*step-4-complete-the-configuration*/}

Click the Activate button at the top of the environment:

![alt_text](images/image8.png "image_tooltip")

# Common Pitfalls for Site Migrations {/*common-pitfalls-for-site-migrations*/}

* Incomplete routing for static assets, eg.` /images/header.png` only exists on the `legacy` environment but there are no routing rules for that file.
    * For example, a new page at url `/about-us` is being rolled out. The `new` page has its static image assets at `/images/*` but the `legacy` site also has static images at `/images/*`. As a result, without careful routing rules, the `new` page might try to load missing files from the `legacy` environment.
    * One way to solve this is to ensure that static assets from the `new` site live at a completely distinct path from where they live at the `legacy` site. In the previous example, the `new` site might be built with static images located at `/img/*` while the `legacy` site has those files at `/images/*`. The router can then proxy the `new` site for all `/img/*` paths and the `legacy` site for all `/images/*` paths.
    * If the paths are distinct, it is also possible to route the static asset based on the referer url. If the referer url matches a path that is defined as one going to the `new` environment, any static assets should also be loaded from the `new` environment.
    * If it’s not possible to separate the paths from the two environments, a fallback trick can be used whereby the router first tries to load content from one origin, and if that fails, automatically retries against the second origin.
* Missing or incorrect host header entries causing content not to load from the `legacy` environment.
* Links from `new` content pointing to pages that are still in draft in the `new` environment and which do not exist in the `legacy` environment.

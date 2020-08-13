# XDN Starter

This guide describes how to get up and running with XDN Starter. XDN Starter enables traditional websites (i.e. jQuery, PHP, VanillaJS, etc.) to take advantage of the performance benefits of the XDN's advanced caching and predictive prefetching. If your website is built on a modern framework such as React, Angular, or Vue, we recommend considering our framework specific guides that can be found on the [homepage](/) as an alternative to XDN Starter.

## How XDN Starter works

As shown below, in XDN Starter the XDN becomes the main CDN for your site. 

Device ==> www.site.com (XDN) ==> origin.site.com (Server) // TODO turn into an image

Requests for your site will now pass through the XDN's globally distributed network of computers and then to your server. Your site's main domain, such as "www.site.com" now points to the XDN, and your original server now responds to a new domain such as "origin.site.com" that the XDN will use for fetching your page data. Note "origin.site.com" in this example is hidden from users; users continue to access your site transparently from your original domain "www.site.com"

The XDN will do two things that accelerate your pages:

- Globally distributed caching: Pages and content that are in the XDN cache will be returned to the user faster than being fetched from your server.
- Predictive prefetching: The XDN predictively prefetch and serve data to the device *before* the user even requests it. By effectively streaming page data to the device a few seconds ahead of the shopper, the page load becomes instantaneous because there is no network to wait for. Normally the increased traffic from this kind of data streaming would overload your server, but the XDN's caching layer acting as a "shield" protecting your origin for this load.

## Implementation Process

The high level implementation process for XDN Starter is:

1. Make sure your pages are cachable
2. Add the XDN JavaScript libraries to your site
3. Set up a Starter project
4. Configure caching and prefetching
5. Deploy and test on the XDN
6. Go live by changing the DNS

We highly recommend performing this process on a staging server before attempting to try it on your production website.

## Make sure your pages are cachable

The XDN will only prefetch and accelerate pages that are cachable, i.e. do not have user specific content. The good news is that most pages can be made cachable with only a few adjustments. Let's walk through an example. 

Consider the ecommerce page shown above. Most of the content on this page such as the main hero image, the menu items, the company logo, and more are not user specific. However, the badge indicating the number of items in the cart is specific to that user browsing the page. The cart count can't be stored in the cache otherwise, every user would get a page with the same cart count. However to make this page cacheable we can simply remove the user specific parts and "late load" them with JavaScript. In this case, we could change the page so that the cart count is empty in the page HTML and let JavaScript on the page fetch the cart count and update the page HTML after it loads. This strategy of late load is fairly universal and you may want to delegate all the user specific content to a single late load request that is made by JavaScript on your page.

Here are some of common types of page content that may need this approach:

* Badges indicating the number of items in cart or bag
* Text or buttons dependent on the username or login status (e.g. "Login", or "Welcome Bob")
* Segmented or personalized content such as recommended products based on the user's profile or browsing behavior (note that recommended products based on page data *are* cachable because the same recommended product would be shown to all users).
* User specific parameters for analytics (e.g. if analytics tracks users by their userid or how frequently they visit the site).

## Add the XDN JavaScript libraries to your site

Next install the XDN JavaScript libraries to your site by adding the following to your site's HTML:

```
    <script src="/__xdn__/cache-manifest.js" defer="defer"></script>
    <script src="/main.js" defer="defer"></script>
```

These tags power the predictive prefetching and caching that will be used by the XDN. Note that the JavaScript assets referenced in the above script tags are not on your server. The XDN server the assets for these script tags once the XDN is installed in front of your server as described in [How XDN Starter works](#section_how_xdn_starter_works).


## Setup a Starter project

As with any XDN project make sure you have Node and npm installed. If you do not have Node.js installed on your system, download and install it from official [Node.js downloads page](https://nodejs.org/en/download/). Select the download labeled "LTS (Recommended For Most Users)" and that matches your operating system, and run the installer. Note that the installer for Node.js will also install npm.

Next, install the [XDN CLI](cli)

```bash
npm i -g @xdn/cli
```

Create your Starter project using the XDN's create module:

```
npm create xdn-app@latest
```

The XDN create module will prompt you for the following information: 

* Name: Give your project name. 
* Template: Select the `Default Starter template` option.
* Hostname: Enter the domain of the origin server that the XDN will be accelerating.
* Package manager: Pick `npm` unless you have strong preference and experience with `yarn`. This guide will assume `npm`.

Here's an example output from running XDN create:

```
$ npm create xdn-app@latest
npx: installed 170 in 10.375s
✔ Enter a name for your app … my-starter-app
✔ Select an app template › Default starter template
✔ Enter the hostname for the origin site (e.g. domain.com) … origin.site.com
✔ Which package manager would you like to use? › npm
✔ Downloading Default starter template XDN template... done.
✔ Installing dependencies... done.

XDN app created! Run the following to start your app in development mode:

cd my-starter-app
npm start

To deploy your app on the Moovweb XDN, run:

npm run deploy

$
```

## Configure caching and prefetching

Next we need to configure the caching and prefetching in our newly created project. Before we get started you should familiarize yourself with some of key files in the XDN project:

* service-worker.ts: Is run on the browser. The service worker is able to prefetch content (main product image, scripts, fonts, links, etc. as defined here) from within the potential next page’s document. We call this method deepfetching.
This file is where deepfetching rules are defined. The selector, how many elements,  which attribute to fetch, type and an optional callback function for more complex fetches (as shown in the example)
* shoppingFlowRouteHandler.ts: Is run on the XDN. It’s where the caching rules get implemented as well as where the modifications to be made to the requests, responses to support caching of dynamic content are defined.
* cache.ts: This is where the caching rules are defined for both the XDN (edge) and the browser.
* routes.ts: This is where the routes to be cached and prefetched are defined as well as what to pass through without modification and what to serve up as static content.

To configure basic caching of a page you can specify the caching of it's path in the routes.js file. For example consider a site where the homepage (`/`), category pages (`/category/xxxx`), and product pages (`/product/yyyy`) are to be cached. Then your routes.js file would look like:

Refer to the guides on [Routing]() and [Caching]() for the full syntax to use in your routes.js file.

*Something here about deep fetching*? // TODO

You can test the caching by running the project locally with the caching flag enabled.... // TODO
---
title: Implementation
---
## Understanding Your Welcome Letter   {/*understanding-your-welcome-letter*/}

When your Content Delivery service is ready for use, each of the Technical Contacts you provide for your Limelight Account will receive an email Welcome Letter from the Limelight NOC (Network Operations Center).

The Welcome Letter will include any information you need to enter to activate and configure Content Delivery and will also provide you with contact information for the Edgio Support team, additional information on troubleshooting and escalation, and background information on maintenance notifications.

Specific configuration information to look for in your Welcome Letter includes:

### Origin Hostname (also Hostname / Source Host)  {/*origin-hostname*/}
The Origin Hostname is the hostname of your origin server, as configured in Content Delivery during the setup process. For example: `origin.customer.com`

Content Delivery will request content from this server to fill the cache.

You can change your Origin Hostname in the Control portal. Navigate to *Configure* > *Deliver*, and choose the **Basic Configuration wizard** step.

### Account  {/*account*/}
An Accountis the name of a unique configuration of the Content Delivery service. For example: `account_name`

You may be provided more than one Edgio Account name depending on the complexity of your requirements; if so, each Edgio Account is separately configurable.

When you log in to the Control portal, you will see your Edgio Account name(s) in the drop-down menu. If you have more than one Edgio Account, the Edgio Account names will be listed alphabetically in the menu.

### Published Hostname (also Published URL / HTTP(s) or RTMP Prepend URL)  {/*published-hostname*/}
The Published Hostnameis the domain name that your audience will see in published links to your content. Published Hostname directs content requests to the Content Delivery service - URLs for content you want to cache must be prefixed with the Published Hostname. For example:

http://account_name.vo.llnwd.net/

For more information on the Published Hostname, see the Configure chapter of the Control User Guide.

### Host Header  {/*host-header*/}
Content Delivery includes the Host Header value in the HTTP Host header when making requests to your origin. You can use this value to block unauthorized access to content on your origin server.

If you have questions about this configuration information, or anything else in your Welcome Letter, please contact your Account Manager or Edgio Customer Service.

<Callout type="info">If you are a new customer, you will receive a separate Welcome Letter with access information for the Control. You will also receive a separate Welcome Letter any time you order a new service or request major changes to an existing service.</Callout>

## Configuring Content Delivery  {/*configuring-content-delivery*/}
If you need to change a Content Delivery configuration setting provided in your Welcome Letter, or you want to take advantage of a feature described in [Key Content Delivery Features](delivery/delivery/guide/features), you can:

- Contact your Account Manager or Solutions Engineer
- Contact Edgio Customer Service directly
- If Configuration Self Service is enabled for your account(s), and the feature you want to change is customer-configurable, you can manage it directly in the Control under *Configure > Delivery*

### Using CNAMEs  {/*using-cnames*/}
If you want Edgio to set up a DNS CNAME (an alias) to use as your Published Hostname, you can order the CNAME in the Control portal - just navigate to Activate > CNAME and enter the information requested. When your CNAME is ready, you can configure Content Delivery to use the new CNAME as your Published Hostname. You can do this yourself in the configuration wizard in the Control portal, or ask your Account Manager for assistance.

### Caching Based On Query Terms  {/*caching-based-on-query-terms*/}
When caching an object, Content Delivery normally uses the entire URL, including all query terms, as a unique identifier for the object.

As a result, if your origin serves the same content in response to URLs with different query terms, Content Delivery will cache each variation as a separate object.

If you want to change this default behavior, you can configure Content Delivery to ignore any query terms you specify.

## Testing & Tuning  {/*testing-and-tuning*/}
### Updating Links  {/*updating-links*/}
Before your content can be delivered by the Content Delivery service, you need to ensure all links to your content use your Published Hostname.

If you don’t know your Published Hostname, you can find it in your Welcome Letter, or by viewing your Content Delivery configuration in Control. To view your configuration, navigate to *Configure > Deliver* - your Published Hostname will be displayed along with other configuration information in the Deliver Configurations table. If you have multiple configurations and you don’t know which one to use, please contact your Account Manager.

If you are already using a DNS CNAME as the domain name in your links, you don’t need to change the links - you can just point the CNAME to the Published Hostname when you are ready to go live. Otherwise, you will need to change each link to use the Published Hostname as the domain name.

To ensure a smooth transition, you may want to begin by changing a small number of links and testing them individually. A conservative approach is to start with links on less popular (low traffic) or test pages, then graduate to links in popular (high traffic) locations.

### Monitoring Performance  {/*monitoring-performance*/}
During the transition, you may also want to monitor the before-and-after performance of test object and/or important content using a measurement service, such as Dynatrace (formerly Compuware APM and Gomez).

## Going Live  {/*going-live*/}
We recommend that any “go-live” activity be carefully planned so that traffic for your content is directed to the CDN in a controlled manner, and can be monitored by your operational teams as this happens.

If you are using your own hostname and CNAMEing this to Edgio in order to go live, we suggest using a low TTL value in your DNS zone when initially making the change to Edgio. This will help you roll-back quickly in the event that you have any issue with the configuration of the Content Delivery service. Once you are comfortable with the service, this TTL can be increased to reduce the number of DNS lookups needed to resolve requests for your content to the Content Delivery service.

As traffic is directed to the Edgio Content Delivery service, cache fill will begin as requests are made for content. For small content libraries, cache fill will be quick and the CDN efficiency you can achieve will be reached quickly. For larger content libraries, the cache-fill can take some time, and will be affected by the rate at which your users request content from across your library. Migrations from other CDN services to Limelight or the addition of Edgio as a secondary CDN to serve content alongside another CDN would be expected to reach optimal cache efficiency over some time, depending on the rate of requests across the entire content library.

In both cases, the efficiency you are achieving can be monitored using the CDN efficiency report available in the Control portal. This report can be used to determine if content is caching as expected. The File Type report will also indicate the cache efficiency being achieved for each type of file being delivered by Content Delivery and can be used in combination with Edgio’s Customer Facing Troubleshooting Headers, to assess if your configurations are working as expected.

The Content reports available in the Control Portal including the File Errors and Status Code reports can be used to assess how well the service is operating, alongside the CDN Efficiency traffic report.

There are a range of Diagnostic tools available in the Control Portal which can be used to perform troubleshooting and run diagnostic tests during your “go-live” period, as described below.

Edgio Advanced Services are able to provide assistance and monitoring during a go-live process with you. Please contact your Account Manager for more information and to discuss the use of Advanced Services.

## Viewing Order Status  {/*viewing-order-status*/}
For orders you previously submitted using the Activate section of the Control Portal, you can check order status at any time using the Support section of the portal. Just log in and navigate to Support > Order Status. The Order Status Summary table lists each of your orders, both current and historical. For each order, you can see:

- Which service was ordered, and by whom
- When the order was submitted and completed
- The current status of the order
- The order “ticket number” for reference when communicating with the Edgio Support team

## Accessing Online Documentation  {/*accessing-online-documentation*/}
Online documentation for the Content Delivery service can be found in the secure documentation site (under *Support > Documentation* in Control)

## Troubleshooting  {/*troubleshooting*/}
You can use the Control Portal to perform a variety of troubleshooting and diagnostic tests, including:

- DNS lookups for specific hostnames
- MTRs (traceroutes with pings)
- Geographic lookups
- Cache Hit Ratio analysis for specific URLs

To access these tools, navigate to *Support > Diagnostic Tools* and select the desired test in the *Diagnostic Overview* table header.

## Requesting Support  {/*requesting-support*/}
Before you go live, Edgio recommends you direct questions to your Account Manager, who will ensure you the right person is available to provide whatever help you need.

Once you are live, you can contact the Edgio Support team 24 x 7 for technical assistance with your Content Delivery service. See the Edgio Customer Support page for support email addresses and phone numbers.

If you have questions about which Content Delivery features you have purchased, or want to inquire about additional services, your Account Manager will be happy to assist.

Finally, you can log in to the Control Portal at any time to check order status, submit and track support tickets, access documentation, and view detailed reports on the traffic handled by your Content Delivery service. See your welcome letter for credentials.

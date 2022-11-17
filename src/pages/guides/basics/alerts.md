---
title: Alerts
---

Alerts are a way to get notified of certain activities in your project.
This gives you the opportunity to act on issues or errors, or keep up to date with the ongoings in your project.

There are certain [alert types](#alert-types) that can be configured with their corresponding [fields](#fields).

## Alert Types and Fields {/*alert-types-and-fields*/}

![Types of alerts](/images/alerts/alert-types-fields.png)

| Field Name        | Description |
| ----------------- | ----------- |
| Alert Type        | **Deployments**: Get notified when deployments succeed or fail. <br/> **Core Web Vitals**: Select a list of domains to receive alerts for their Core Web Vital status. <br/> **Cache Hit Rate**: Receive alerts on the general percentage of your project's Cache Hit Rate or optionally when it falls below a certain percentage threshold. <br/> **Cache Purges**: Be alerted when resources are removed from the cache. |
| Frequency         | The time interval or how often to notify the selected recipient(s) |
| Environments      | The environment(s) to receive alerts for. This option only apply to the Deployments, Cache Hit Rate, and Cache Purges alert types. |
| Recipients        | The recipient(s) of the alert. At least one recipient needs to be selected. |
| Domains           | Core Web Vitals alert type that describes the domain(s) to receive alerts for. |
| Maximum Threshold | The Cache Hit Rate alert type that specifies the maximum threshold to receive alerts for.|

## Create an alert {/*create-an-alert*/}

To create an alert:

1. Go to the alerts section of your site's settings.
2. Click **Create new Alert.**
3. Fill the form fields to configure the alert.
4. Click **Create Alert** to save your configuration.

![Create an alert](/images/alerts/create-alert.png)

## Edit an alert {/*edit-an-alert*/}

To edit an alert:

1. Go to the alerts section of your site's settings.
2. Find the alert you want to edit then click on it to edit.
3. Make your desired changes to the alert.
4. Click **Save Changes.**

![Edit an alert](/images/alerts/edit-alert.png)

## Disable an alert {/*disable-an-alert*/}

To disable an alert:

1. Go to the alerts section of your site's settings.
2. Click on the <GoKebabVertical className="inline-icon"/> icon in the ACTIONS column.
3. Click on **Disable**.

![Disable an alert](/images/alerts/disable-delete-alert.png)

## Delete an alert {/*delete-an-alert*/}

To delete an alert:

1. Go to the alerts section of your site's settings.
2. Click on the <GoKebabVertical className="inline-icon"/> icon in the ACTIONS column.
3. Click on **Delete.**

![Delete an alert](/images/alerts/disable-delete-alert.png)

## Enable a disabled alert {/*enable-a-disabled-alert*/}

To enable a disabled alert:

1. Go to the alerts section of your site's settings.
2. Click on the <GoKebabVertical className="inline-icon"/> icon in the ACTIONS column.
3. Click on **Enable.**

![Enable a disabled alert](/images/alerts/enable-alert.png)
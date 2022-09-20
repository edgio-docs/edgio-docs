---
title: Alerts
---

Alerts are a way to get notified of certain activities in your project.
This gives you the opportunity to act on issues or errors, or keep up to date with the ongoings in your project.

There are certain [alert types](#alert-types) that can be configured with their corresponding [fields](#fields).

<hr/>

## Alert Types {/*alert-types*/}

There are four types of alert:

1. **Deployments:** Get notified when deployments succeed or fail.
2. **Core Web Vitals**: Select a list of domains and receive alerts for their Core Web vital Status.
3. **Cache Hit Rate**: Receive alerts on the general percentage of your project's Cache Hit Rate or optionally when it falls below a certain percentage threshold.
4. **Cache Purges**: Receive alerts when resources are removed from the cache.

![Types of alerts](/images/alerts/alert-types.png)

<hr/>

## Fields {/*fields*/}

[Alert types](#alert-types) have a number of required and unique fields:

- [Frequency](#frequency)
- [Recipients](#recipients)
- [Environments](#environments)
- [Domains](#domains)
- [Type of Deployment](#type-of-deployment)
- [Maximum Threshold](#maximum-threshold)

### Frequency {/*frequency*/}
A required field for [all alert types](#alert-types) that describes a time interval or how often to notify the selected [recipient(s)](#recipients).

![Frequency field](/images/alerts/frequency-field.png)

<hr/>

### Recipients {/*recipients*/}
A required field for [all alert types](#alert-types) that describe the recipient(s) of the alert type. At least one recipient needs to be selected.

![Recipients field](/images/alerts/recipients-field.png)

<hr/>

### Environments {/*environments*/}
A required field for the **Deployments, Cache Hit Rate, and Cache Purges** alert types that describe the environment(s) to receive alerts for. At least one environment needs to be selected.

![Types of alerts](/images/alerts/environments-field.png)

<hr/>

### Domains {/*domains*/}
A required field for the **Core Web Vitals** alert type that describe the domain(s) to receive alerts for.

![Domain fields](/images/alerts/domains-field.png)

<hr/>

### Type of Deployment {/*type-of-deployment*/}
A required field for the **Deployments** alert type that describes the type of deployments to receive alerts for.

![Deployments field](/images/alerts/deployment-type-field.png)

<hr/>

### Maximum Threshold {/*maximum-threshold*/}
An optional field for the **Cache Hit Rate** (CHR) alert type that describes the maximum CHR threshold to receive alerts for.

![Cache Hit Rate Threshould field](/images/alerts/chr-threshold-field.png)

<hr/>

## Creating an alert {/*creating-an-alert*/}

To create an alert:

1. Go to the alerts section of your Project Settings.
2. Click **Create new Alert.**
3. Fill the form fields to configure the alert.
4. Click **Create Alert** to save your configuration.

![Create an alert](/images/alerts/create-alert.png)

<hr/>

## Preview an alert {/*preview-an-alert*/}

Preview alerts from the **Alerts** section of your project **Settings**.

![Preview an alert](/images/alerts/preview-alert.png)

<hr/>

## Edit an alert {/*edit-an-alert*/}

To edit an alert:

1. Go to the alerts section of your Project Settings.
2. Find the alert you want to edit then click on it to edit.
3. Make your desired changes to the alert.
4. Click **Save Changes.**

![Edit an alert](/images/alerts/edit-alert.png)

<hr/>

## Disable or delete an alert {/*disable-or-delete-an-alert*/}

Alerts can either be:

1. Disabled: This pauses the alert for the recipient(s) but can be re-enabled.
2. Deleted: The alert will no longer exist and the recipient(s) will stop receiving notifications.

To disable or delete alerts:

1. Go to the alerts section of your Project Settings.
2. Click on the Kebab <GoKebabVertical className="inline-icon"/> menu in the Actions column.
3. Click on **Disable** or **Delete.**

![Disable or delete an alert](/images/alerts/disable-delete-alert.png)

<hr/>

## Enable a disabled alert {/*enable-a-disabled-alert*/}

To enable a disabled alert:

1. Go to the alerts section of your Project Settings.
2. Click on the Kebab <GoKebabVertical className="inline-icon"/> menu in the actions column.
3. Click on **Enable.**

![Enable a disabled alert](/images/alerts/enable-alert.png)
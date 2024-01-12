---
title: Alerts
---

There are two types of alerts:

-   [Real-Time Alerts](#real-time-alerts)**:** Receive notifications when unusual traffic patterns are detected and resolved. Use these notifications to investigate and remediate abnormal traffic patterns as they occur.
-   [Daily or Weekly Alerts](#daily-and-weekly-alerts)**:** Receive notifications for performance-related statistics and events that typically do not require immediate attention. 

## Real-Time Alerts {/*real-time-alerts*/}

Receive email notifications when the condition(s) defined for a specific environment are met. For example, you can receive a notification when the number of `404 Not Found` responses exceeds 10 per second or when your bandwidth is less than 100 Megabits per second.

A condition consists of the following components:

-   **Metric:** Determines the type of condition that will be monitored. Choose between:
    -   **Status Code Frequency:** Tracks the number of times that a specific status code or class of status codes (e.g., 4xx or 5xx) occurs per second.
    -   **Status Code Ratio:** Tracks a specific status code or class of status codes as a percentage of total traffic.
    -   **Bandwidth:** Tracks the amount of traffic flowing through our network. 
-   <a id="operator" />**Operator:** Establishes the relationship between the metric and the value assigned to it. 
    -   **<:** Less than. This condition is satisfied when the metric's current value is less than the value specified within the **Value** option.
    -   **>:** Greater than. This condition is satisfied when the metric's current value is greater than the value specified within the **Value** option.
    -   **<=:** Less then or equal to. This condition is satisfied when the metric's current value is less than or equal to the value specified within the **Value** option.
    -   **>=:** Greater than or equal to. This condition is satisfied when the metric's current value is greater than or equal to the value specified within the **Value** option.
-   **Threshold**:** Define the threshold for the selected metric.
-   **Duration:** Defines the length of time that one or more condition(s) associated with this real-time alert must be satisfied before a notification may be sent.

    For example, if you set a 1 minute duration for status code frequency, then the rate for that status code must match or exceed the specified value for an entire minute before a notification is sent. 

<Callout type="info">

  You may create multiple alerts per environment and each alert may contain multiple conditions. A notification will not be triggered until all of its conditions have been satisfied. 

</Callout>

### Managing Real-Time Alerts {/*managing-real-time-alerts*/}

You may create, modify, and delete real-time alerts. 

**To create a real-time alert**

1.  Navigate to the desired environment's **Realtime Alerts** page.
    {{ ENV_NAV }} **Realtime Alerts**.
2.  Click **+ New Alert**.
3.  In the **Alert Name** option, assign a name to this configuration.
4.  From the **Duration** option, select the amount of time that the condition(s) associated with this real-time alert must be met before a notification may be sent.
5.  <a id="add-condition" />Add one or more condition(s) that must be satisfied before a notification is sent.
    1.  Click **+ Add**.
    2.  Select the desired metric. 
    3.  If you selected a status code metric, then set the **Status code** option to the desired status code or status code class (e.g., 4xx).
    4.  From the **Operator** option, select the [mathematical operator](#operator) that establishes the relationship between the selected metric and a threshold value.
    5.  Specify the threshold value that must be met.
        -   **Status Code Frequency:** Set the **Frequency (per sec)** option to a threshold value for the number of responses that result in the specified status code or status class per second. 
        -   **Status Code Ratio:** This metric monitors status code responses as a percentage of total traffic. Set the **Ratio (%)** option to the desired threshold percentage. 
        -   **Bandwidth:** Set the **Amount** option to a threshold value for the desired bandwidth and then set the **Unit** option to the desired units for the specified threshold.

    6.  Repeat steps i - v as needed.
6.  In the **Emails** option, type an email address to which notifications will be sent and then press ENTER. Repeat this step as needed.
7.  Click **Create**.

**To modify a real-time alert**
1.  Navigate to the desired environment's **Realtime Alerts** page.
    {{ ENV_NAV }} **Realtime Alerts**.
2.  Click on the desired real-time alert.
3.  Make the desired changes.

    Common tasks:
    -   [Add a condition.](#add-condition)
    -   Remove a condition by clicking on the <Image inline src="/images/v7/icons/remove-2.png" alt="Remove" /> icon that appears directly to the right of it.
    -   Remove an email address by clicking on its `x`. 
        ![Remove Email](/images/v7/basics/remove-email.png)

4.  Click **Apply Changes**.

**To delete a real-time alert**
1.  Navigate to the desired environment's **Realtime Alerts** page.
    {{ ENV_NAV }} **Realtime Alerts**.
2.  Find the desired real-time alert and click its ![Delete](/images/v7/basics/delete.png) icon.
3.  When prompted, click **Delete** to confirm the deletion.

## Daily and Weekly Alerts {/*daily-and-weekly-alerts*/}

Receive daily or weekly notifications for the following type of events:

-   All or failed deployments for one or more environment(s). 
-   Core web vitals for one or more domain(s).
-   Cache hit ratio for one or more environment(s). You may restrict this notification to only report when the cache hit ratio falls below a specific threshold.
-   Purged content for one or more environment(s).

### Managing Daily and Weekly Alerts {/*managing-daily-and-weekly-alerts*/}

You may create, modify, delete, disable, and re-enable daily and weekly alert configurations. 

**To create an alert**

1. Navigate to your property's **Settings** page and find the **Alerts** section.

   ![Property Settings page](/images/v7/basics/alerts-nav.png?width=550)

2. Click **Create new Alert.**

   ![Create Alert](/images/v7/basics/create-alert.png?width=550)
3. Define the conditions under which alert notifications will be delivered.
4. Click **Create Alert** to save your configuration.

   The **Alerts** section should now look similar to this:
   
   ![Alerts](/images/v7/basics/alerts.png?width=550)

**To modify an alert**

1. Navigate to your property's **Settings** page and find the **Alerts** section.
2. Click on the desired alert. 

   ![Modify alert](/images/v7/basics/modify-alert.png?width=550)
   
3. Make the desired changes.
4. Click **Save Changes.**

**To disable an alert**

1. Navigate to your property's **Settings** page and find the **Alerts** section.
2. Click on the <GoKebabVertical className="inline-icon"/> icon under the **ACTIONS** column.

   ![Disable an alert](/images/v7/basics/disable-alert.png?width=550)
   
3. Click on **Disable**.

**To re-enable an alert**

1. Navigate to your property's **Settings** page and find the **Alerts** section.
2. Click on the <GoKebabVertical className="inline-icon"/> icon under the **ACTIONS** column.
3. Click on **Enable.**

![Enable a disabled alert](/images/v7/basics/enable-alert.png?width=550)

**To delete an alert**

1. Navigate to your property's **Settings** page and find the **Alerts** section.
2. Click on the <GoKebabVertical className="inline-icon"/> icon under the **ACTIONS** column.

   ![Delete an alert](/images/v7/basics/delete-alert.png?width=550)
   
3. Click on **Delete.**
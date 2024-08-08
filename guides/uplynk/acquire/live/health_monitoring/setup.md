---
title: Setup
---

Quickly set up Live Slicer health monitoring by performing the following steps:

1. [Enable monitoring](#prerequisites) on your account.
2. [Create a view](#create-slicer-view) for the desired Live Slicers.
3. [Monitor the Live Slicers](#dashboard) identified above from the Live Slicer Monitoring dashboard.

## Key Steps  {/*key-steps*/}

Set up Live Slicer health monitoring involves:

1. Selecting one or more customer account(s) whose Live Slicers can be monitored.
2. Creating a Slicer View that identifies the set of Live Slicers that will be monitored.
3. Creating a rule set that defines the criteria when metrics will trigger and then clear an alert. Assign this rule set to the desired Live Slicer(s).
4. Defining notification preferences.
5. Granting Live Slicer monitoring access to other accounts.

## Prerequisites  {/*prerequisites*/}

The Live Slicer Monitoring dashboard shows health statistics for all active and recently active Live Slicers associated with a Slicer View. You may only add Live Slicers to a Slicer View when the following conditions are met:

1. **Authorization Requirements:**
   - You must be authorized to monitor the desired Live Slicer(s). Authorization is granted under any of the following conditions:
     - The desired Live Slicer(s) correspond to your customer account.
     - A user that owns the desired Live Slicer(s) has granted you monitoring permissions on their customer account.

        <Info>Monitoring permissions defined on the Account Access page only determine access to the legacy Live Slicer Health dashboard. This version of the Live Slicer Monitoring dashboard requires that you grant monitoring permissions through the Allowed Watchers page. [Learn more](#permissions).</Info>

   - You belong to an organization that has been assigned the account that owns the desired Live Slicer(s). [Learn more](/uplynk/acquire/health_monitoring/#organizations).

2. **Enable Monitoring:** You must enable monitoring on the customer account that owns the Live Slicer.

## Enable/Disable Monitoring  {/*enable-disable*/}

Before you can add a Live Slicer to a Slicer View, you must first enable monitoring on the customer account that owns it.

<Tip>You may only enable monitoring on customer accounts to which you have been [granted monitoring access](#permissions).</Tip>

### Enable monitoring on an account  {/*enable-monitoring*/}

1. **Navigate to the [Monitored Accounts page](https://monitor.uplynk.com/settings/monitored-accounts):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Monitored Accounts**.

2. **Click Configure Monitored Accounts:**
   - Mark each customer account for which monitoring will be enabled.
   - Click "Add # Accounts" to confirm.

### Disable monitoring on an account  {/*disable-monitoring*/}

1. **Navigate to the [Monitored Accounts page](https://monitor.uplynk.com/settings/monitored-accounts):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Monitored Accounts**.

2. **Disable monitoring on an account:**
   - Hover over the desired customer account.
   - Click **Delete Selected Accounts**.
   - Click **Yes, Delete It** to confirm that monitoring should be disabled on the account.

        <Tip>Disabling monitoring removes that customer account's Live Slicers from your Slicer Views.</Tip>

## Permissions  {/*permissions*/}

You may allow other users to monitor your Live Slicers.

<Tip>Users with either the admin or read/write permission may also determine the set of users that will be allowed to monitor the Live Slicers associated with each of your organization's accounts. [Learn more](#organizations).</Tip>

### Allow user(s) to monitor your Live Slicers  {/*allow-users-to-monitor*/}

1. **Navigate to the [Allowed Watchers page](https://monitor.uplynk.com/settings/allowed-watcher):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Allowed Watchers**.

2. **Organization: Admin and Read/Write Users:**
   - Set the Accounts option to `Personal`.

3. **Add user(s) to monitor your Live Slicers:**
   - From the right-hand pane, type the name of the user (e.g., joe@example.com) that will be allowed to monitor your Live Slicers.
   - Verify the specified user name before adding it. For your security, our system does not validate user names.
   - Click **+ Add Watcher**.

4. **Repeat steps 2 and 3 as needed.**

### Disallow user(s) from monitoring your Live Slicers  {/*disallow-users*/}

1. **Navigate to the [Allowed Watchers page](https://monitor.uplynk.com/settings/allowed-watcher):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Allowed Watchers**.

2. **Organization: Admin and Read/Write Users:**
   - Set the Accounts option to `Personal`.

3. **Remove user(s) from monitoring your Live Slicers:**
   - Hover over the desired user and then click **Delete Selected**.
   - Click **Yes, Remove It** to confirm that the user should no longer be allowed to monitor your Live Slicers.

        <Tip>Removing monitoring permissions from a user will remove your Live Slicers from the Slicer Views associated with that user.</Tip>

### Allow user(s) to monitor Live Slicers associated with an account  {/*allow-users-with-account*/}

<Info>By default, all users associated with your organization will be allowed to monitor the Live Slicers associated with your organization's accounts. [Learn more](#organizations).</Info>

<Info>This procedure may only be performed by users that have been granted either the admin or read/write permission.</Info>

1. **Navigate to the [Allowed Watchers page](https://monitor.uplynk.com/settings/allowed-watcher):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Allowed Watchers**.

2. **Select the desired account:**
   - From the Accounts option, select the account you wish to manage.

3. **Add user(s) to monitor Live Slicers:**
   - From the right-hand pane, type the name of the user (e.g., joe@example.com) that will be allowed to monitor your Live Slicers.
   - Verify the specified user name before adding it. For your security, our system does not validate user names.
   - Click **+ Add Watcher**.

4. **Repeat steps 2 and 3 as needed.**

### Disallow user(s) from monitoring Live Slicers associated with an account  {/*disallow-users*/}

<Info>This procedure may only be performed by users that have been granted either the admin or read/write permission.</Info>

1. **Navigate to the [Allowed Watchers page](https://monitor.uplynk.com/settings/allowed-watcher):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Allowed Watchers**.

2. **Select the desired account:**
   - From the Accounts option, select the account from which you wish to remove users.

3. **Remove user(s) from monitoring Live Slicers:**
   - Mark each desired user.
   - Click **Delete Selected**.
   - Click **Yes, Remove It** to confirm that the marked user(s) should no longer be allowed to monitor the Live Slicers associated with the account selected in step 2.

<Info>Removing monitoring permissions from a user will remove the account's Live Slicers from the Slicer Views associated with that user.</Info>

## Slicer View  {/*slicer-view*/}

A Slicer View identifies a set of Live Slicers. You may switch between Slicer Views from the Live Slicer Monitoring dashboard. Use Slicer Views to:

- Focus on monitoring key Live Slicers.
- Quickly switch monitoring focus between different sets of Live Slicers.

- A user with either the admin or read/write permission can create Slicer Views that can be leveraged by any member of your organization. This type of Slicer View is known as an organization Slicer View. [Learn more](#organizations).

### Create a Slicer View  {/*create-a-slicer-view*/}

1. **Verify that you have enabled monitoring on the desired accounts.**

2. **Navigate to the [Slicer Views page](https://monitor.uplynk.com/settings/slicer-views):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Slicer Views**.

3. **Organization: Admin and Read/Write Users:**
   - Determine whether a Slicer View will be created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.
   - Click **+ Create New Slicer View**.

4. **Create the Slicer View:**
   - Type the name that will be assigned to the Slicer View in the View Name field.
   - Optional: Use the Search field to filter the list of available Live Slicers by name and owner.
   - Mark the desired Live Slicers.
   - Click the red add icon.![Red add icon](/images/uplynk/red-add-icon.png)
   - Click **Save**.

### Modify a Slicer View  {/*modify-slicer-view*/}

2. **Navigate to the [Slicer Views page](https://monitor.uplynk.com/settings/slicer-views):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Slicer Views**.

2. **Organization: Admin and Read/Write Users:**
   - Determine whether to modify a Slicer View that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.
   - Click on the desired Slicer View.

3. **Modify the Slicer View:**
   - Add Live Slicers by marking from the Available Slicers list and then clicking ![Card](/images/uplynk/red-add-icon.png).
   - Remove Live Slicers by marking them from the Slicers in View list and then clicking ![Card](/images/uplynk/red-remove-icon.png).
   - Click **Save**.

### Delete a Slicer View  {/*delete-slicer-view*/}

2. **Navigate to the [Slicer Views page](https://monitor.uplynk.com/settings/slicer-views):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Slicer Views**.

2. **Organization: Admin and Read/Write Users:**
   - Determine whether to delete a Slicer View that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.
   - Hover over the desired Slicer View and then click **Delete** (rubbish bin icon).
   - Click **Yes, Delete It** to confirm that the Slicer View should be deleted.

## Monitoring Rules  {/*monitoring-rules*/}

Use rulesets to define rules that identify the set of metrics that will be monitored and the thresholds for warning/critical levels.

### Key Information  {/*key-information-monitoring-rules*/}

- By default, Live Slicers will be monitored using a default set of read-only monitoring rules. However, a custom set of monitoring rules may be [assigned to one or more Live Slicers](#assign-custom-set).
- View your custom monitoring configurations from the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules?refresh=true).
- Once you have created a custom monitoring configuration, you may reassign a Live Slicer to it. This means that the previous set of monitoring rules (e.g., Default) will no longer apply to the Live Slicer, since a Live Slicer may only be associated with a single set of monitoring rules at any given time.
- All metrics, with the exception of Closed Captioning Last Seen, are updated every 4 seconds. The Closed Captioning Last Seen metric is updated every 10 seconds.
- The Live Slicer will only report monitoring data when slicing content. It cannot report data when it is in another state (i.e., ad break, replace content, or blackout), since it is not receiving a video feed.
- A user with either the admin or read/write permission can create rulesets that can be leveraged by any member of your organization. This type of ruleset is known as an organization ruleset.

[Learn more](#organizations)

### Create a custom set of monitoring rules  {/*create-custom-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. **Organization: Admin and Read/Write Users**: Determine whether a ruleset will be created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.

3. Click **+ Create New Ruleset**.
   - Type the name for the ruleset in the Ruleset Name field.
   - Configure each metric that should trigger warning/critical status.
     - Find the desired metric.
     - Select either Warning or Critical from the Severity option.
     - Define the conditions under which the metric will change health states.
        - States: Configure the **Set** option to the number of seconds that the sub-optimal state (e.g., no signal, no closed captions detected, or black video was detected) must persist before the Live Slicer's health will change to the severity defined in the **Severity** option. Configure the **Clear** option to the number of seconds that the optimal state must persist before the Live Slicer's health will change back to healthy.
        - Measurements: Configure the **Set Threshold** option to the condition that must be met for the number of seconds defined in the **Set Duration** option before the Live Slicer's health will change to the severity defined in the **Severity** option. Configure the **Clear Threshold** option to the condition that must be met for the number of seconds defined in the Clear Duration option before the Live Slicer's health will change back to healthy.

4. Repeat the above steps as needed.

5. Click **Save**.

### Modify a custom set of monitoring rules  {/*modify-custom-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. **Organization: Admin and Read/Write Users**. Determine whether to modify a ruleset that was created for your organization or for personal use. From the Organizations option, select either your organization or `Personal`.

3. Click on the desired ruleset.

4. Review and modify the conditions under which metrics will change health states as needed.

5. Click **Save**.

### Delete a custom set of monitoring rules  {/*delete-custom-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. **Organization: Admin and Read/Write Users**. Determine whether to delete a ruleset that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.

3. Mark each desired ruleset.

4. Click **Delete Selected Rulesets**.

5. Click **Yes, Delete It**.

### Assign a custom set of monitoring rules to one or more Live Slicers  {/*assign-custom-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. Determine whether you will map a ruleset that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.

3. Click **Ruleset Mappings**.

4. From the **1. Choose a Ruleset to Apply** option, select the desired custom monitoring configuration.

5. Optional. Use the Search field to filter the list of available Live Slicers by name and owner.

6. Mark the desired Live Slicers.

7. Click **Apply Ruleset to Selected Slicers**.

    <Tip>Alternatively, you may assign a ruleset to a Live Slicer from the Live Slicer Monitoring dashboard by clicking on the desired Live Slicer and then selecting the rule set that will be applied to it from the Ruleset option.</Tip>

### Assign the default set of monitoring rules to one or more Live Slicers  {/*assign-default-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. Determine whether you will map a ruleset that was created for your organization or for personal use. From the **Organizations** option, select either your organization or Personal.

3. Click **Ruleset Mappings**.

4. Optional. Use the Search field to filter the list of available Live Slicers by name and owner.

5. Mark the desired Live Slicers.

6. Click **Remove Ruleset from Selected Slicers**.

## Metrics  {/*metrics*/}

Refer to the matrix of [monitoring metrics](/uplynk/acquire/health_monitoring/#metrics).

## Audio Notifications  {/*audio-notifications*/}

The Live Slicer Monitoring dashboard may be configured to provide audio cues when one of the following conditions is true:

- The state of a Live Slicer changes from "Healthy" to "Warning."
- The state of a Live Slicer changes to "Critical."

<Tip>Audio notifications will play on each device on which the Live Slicer Monitoring dashboard has been loaded, regardless of whether it is the active browser tab/window or if it has been minimized.</Tip>

### Set up Audio Notifications  {/*set-up-audio-notifications*/}

1. Navigate to the [Notifications page](https://monitor.uplynk.com/settings/notifications).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Notifications**.

2. Click **+ Create New Profile**.

3. From the Name option, type the name of the new notification profile.

4. Toggle warning or critical audio notifications by clicking on the **Enabled/Disabled Audio Alarm** option from the **Warning or Critical** section.

5. Click **Save**.

6. Navigate to the [Live Slicer Monitoring dashboard](https://monitor.uplynk.com/).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.

7. From the **Saved Views** option, select a Slicer View that contains the desired Live Slicer.

8. Select the desired Live Slicer.

9. From the Active Notification Profile option, select the notification profile created in step 3.

10. Repeat steps 7 - 9 for each desired Live Slicer.

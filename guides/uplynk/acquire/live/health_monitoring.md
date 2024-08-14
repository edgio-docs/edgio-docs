---
title: Health Monitoring
---

Monitor the health for all recently active Live Slicers through the following tools:

- **API**: View core status information via the following services:

    - [Integration API - `/api2/slicer/status`](https://docs.edgecast.com/video/Content/Develop/Slicer.htm#/api2/sl): Queries the backend to find out the last known status for one or more Live Slicers.
    - [Live Slicer API - `/status`](https://docs.edgecast.com/video/Content/Develop/Live-Slicer-API.htm#status): Queries a Live Slicer directly for current status information.

- **Dashboard**: The Live Slicer Monitoring dashboard provides the following information at a glance:

    - Current and recently active Live Slicers associated with the active Slicer View.
    - Information and statistics on those Live Slicers.

## Setup {/*setup*/}

Quickly set up Live Slicer health monitoring by performing the following steps:

1. [Enable monitoring](#enable-monitoring) on your account.
2. [Create a view](#create-a-slicer-view) for the desired Live Slicers.
3. [Monitor the Live Slicers](#dashboard) identified above from the Live Slicer Monitoring dashboard.

### Key Steps  {/*key-steps*/}

Setting up Live Slicer health monitoring involves:

1. Selecting one or more customer account(s) whose Live Slicers can be monitored.
2. Creating a Slicer View that identifies the set of Live Slicers that will be monitored.
3. Creating a rule set that defines the criteria when metrics will trigger and then clear an alert. Assign this rule set to the desired Live Slicer(s).
4. Defining notification preferences.
5. Granting Live Slicer monitoring access to other accounts.

### Prerequisites  {/*prerequisites*/}

The Live Slicer Monitoring dashboard shows health statistics for all active and recently active Live Slicers associated with a Slicer View. You may only add Live Slicers to a Slicer View when the following conditions are met:

1. **Authorization Requirements:**
   - You must be authorized to monitor the desired Live Slicer(s). Authorization is granted under any of the following conditions:
     - The desired Live Slicer(s) correspond to your customer account.
     - A user that owns the desired Live Slicer(s) has granted you monitoring permissions on their customer account.

        <Info>Monitoring permissions defined on the Account Access page only determine access to the legacy Live Slicer Health dashboard. This version of the Live Slicer Monitoring dashboard requires that you grant monitoring permissions through the Allowed Watchers page. [Learn more](#permissions).</Info>

   - You belong to an organization that has been assigned the account that owns the desired Live Slicer(s). [Learn more](#organizations).

2. **Enable Monitoring:** You must enable monitoring on the customer account that owns the Live Slicer.

### Monitoring  {/*enable-disable*/}

Before you can add a Live Slicer to a Slicer View, you must first enable monitoring on the customer account that owns it.

<Tip>You may only enable monitoring on customer accounts to which you have been [granted monitoring access](#permissions).</Tip>

#### Enable monitoring on an account  {/*enable-monitoring*/}

1. **Navigate to the [Monitored Accounts page](https://monitor.uplynk.com/settings/monitored-accounts):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Monitored Accounts**.

2. **Click Configure Monitored Accounts:**
   - Mark each customer account for which monitoring will be enabled.
   - Click **Add # Accounts** to confirm.

#### Disable monitoring on an account  {/*disable-monitoring*/}

1. **Navigate to the [Monitored Accounts page](https://monitor.uplynk.com/settings/monitored-accounts):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Monitored Accounts**.

2. **Disable monitoring on an account:**
   - Hover over the desired customer account.
   - Click **Delete Selected Accounts**.
   - Click **Yes, Delete It** to confirm that monitoring should be disabled on the account.

        <Tip>Disabling monitoring removes that customer account's Live Slicers from your Slicer Views.</Tip>

### Permissions  {/*permissions*/}

You may allow other users to monitor your Live Slicers.

<Tip>Users with either the admin or read/write permission may also determine the set of users that will be allowed to monitor the Live Slicers associated with each of your organization's accounts. [Learn more](#organizations).</Tip>

#### Allow user(s) to monitor your Live Slicers  {/*allow-users-to-monitor*/}

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

#### Disallow user(s) from monitoring your Live Slicers  {/*disallow-users*/}

1. **Navigate to the [Allowed Watchers page](https://monitor.uplynk.com/settings/allowed-watcher):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Allowed Watchers**.

2. **Organization: Admin and Read/Write Users:**
   - Set the Accounts option to `Personal`.

3. **Remove user(s) from monitoring your Live Slicers:**
   - Hover over the desired user and then click **Delete Selected**.
   - Click **Yes, Remove It** to confirm that the user should no longer be allowed to monitor your Live Slicers.

        <Tip>Removing monitoring permissions from a user will remove your Live Slicers from the Slicer Views associated with that user.</Tip>

#### Allow user(s) to monitor Live Slicers associated with an account  {/*allow-users-with-account*/}

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

#### Disallow user(s) from monitoring Live Slicers associated with an account  {/*disallow-users*/}

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

### Slicer View  {/*slicer-view*/}

A Slicer View identifies a set of Live Slicers. You may switch between Slicer Views from the Live Slicer Monitoring dashboard. Use Slicer Views to:

- Focus on monitoring key Live Slicers.
- Quickly switch monitoring focus between different sets of Live Slicers.

- A user with either the admin or read/write permission can create Slicer Views that can be leveraged by any member of your organization. This type of Slicer View is known as an organization Slicer View. [Learn more](#organizations).

#### Create a Slicer View  {/*create-a-slicer-view*/}

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
   - Click the red left-arrow icon. ![Red icon](/images/uplynk/red-add-icon.png?width=16)
   - Click **Save**.

#### Modify a Slicer View  {/*modify-slicer-view*/}

2. **Navigate to the [Slicer Views page](https://monitor.uplynk.com/settings/slicer-views):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Slicer Views**.

2. **Organization: Admin and Read/Write Users:**
   - Determine whether to modify a Slicer View that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.
   - Click on the desired Slicer View.

3. **Modify the Slicer View:**
   - Add Live Slicers by marking from the Available Slicers list and then clicking the red left-arrow icon. ![Red arrow icon](/images/uplynk/red-add-icon.png)
   - Remove Live Slicers by marking them from the Slicers in View list and then clicking the red right-arrow icon. ![Red arrow icon](/images/uplynk/red-remove-icon.png)
   - Click **Save**.

#### Delete a Slicer View  {/*delete-slicer-view*/}

2. **Navigate to the [Slicer Views page](https://monitor.uplynk.com/settings/slicer-views):**
   - From the main menu, navigate to **Services** > **Monitoring 2.0**.
   - Then navigate to **Settings** > **Slicer Views**.

2. **Organization: Admin and Read/Write Users:**
   - Determine whether to delete a Slicer View that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.
   - Hover over the desired Slicer View and then click **Delete** (rubbish bin icon).
   - Click **Yes, Delete It** to confirm that the Slicer View should be deleted.

### Monitoring Rules  {/*monitoring-rules*/}

Use rulesets to define rules that identify the set of metrics that will be monitored and the thresholds for warning/critical levels.

#### Key Information  {/*key-information-monitoring-rules*/}

- By default, Live Slicers will be monitored using a default set of read-only monitoring rules. However, a custom set of monitoring rules may be [assigned to one or more Live Slicers](#assign-custom-set).
- View your custom monitoring configurations from the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules?refresh=true).
- Once you have created a custom monitoring configuration, you may reassign a Live Slicer to it. This means that the previous set of monitoring rules (e.g., Default) will no longer apply to the Live Slicer, since a Live Slicer may only be associated with a single set of monitoring rules at any given time.
- All metrics, with the exception of Closed Captioning Last Seen, are updated every 4 seconds. The Closed Captioning Last Seen metric is updated every 10 seconds.
- The Live Slicer will only report monitoring data when slicing content. It cannot report data when it is in another state (i.e., ad break, replace content, or blackout), since it is not receiving a video feed.
- A user with either the admin or read/write permission can create rulesets that can be leveraged by any member of your organization. This type of ruleset is known as an organization ruleset. [Learn more](#organizations).

#### Create a Custom Set of Monitoring Rules  {/*create-custom-set*/}

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

#### Modify a Custom Set of Monitoring Rules  {/*modify-custom-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. **Organization: Admin and Read/Write Users**. Determine whether to modify a ruleset that was created for your organization or for personal use. From the Organizations option, select either your organization or `Personal`.

3. Click on the desired ruleset.

4. Review and modify the conditions under which metrics will change health states as needed.

5. Click **Save**.

#### Delete a Custom Set of Monitoring Rules  {/*delete-custom-set*/}

1. Navigate to the [Monitoring Rules page](https://monitor.uplynk.com/settings/rules).
   - From the main menu, navigate to **Services**.
   - Click **Monitoring 2.0**.
   - Navigate to **Settings** > **Monitoring Rules**.

2. **Organization: Admin and Read/Write Users**. Determine whether to delete a ruleset that was created for your organization or for personal use. From the **Organizations** option, select either your organization or `Personal`.

3. Mark each desired ruleset.

4. Click **Delete Selected Rulesets**.

5. Click **Yes, Delete It**.

#### Assign a Custom Set of Monitoring Rules to One or More Live Slicers  {/*assign-custom-set*/}

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

#### Assign the Default Set of Monitoring Rules to One or More Live Slicers  {/*assign-default-set*/}

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

A description for each monitoring metric is provided below.

| Metric | Details |
|---|---|
| Ad Last Seen | Determines the length of time that may elapse since the end of the last ad break before triggering a warning/critical status.<br /><Info>The Live Slicer resets this metric upon changing state (e.g., Slicing, Replacing Content, and Blackout)</Info><br /> **Troubleshooting**<br />Check whether ad breaks are being triggered. |
| Black Video | Determines the length of time that black frames may be sent by a Live Slicer before triggering a warning/critical status.<br /><br />This rule measures the duration of black video by averaging the video's luminosity percentage over the last few seconds.<br /><Info>Periods of black video may be normal. Consider the source content when setting critical/warning thresholds.</Info><br />**Diagnosis**<br />Check the luma response parameter for a very low value.<br /><br /> **Troubleshooting**<br />Check the source feed to resolve issues with video input. |
| Closed Captions Last Seen | Indicates the amount of time since the Live Slicer received closed captioning data.<br /><br /> **Key Information**:<ul><li>This metric is reported in 10 second intervals.</li><li>This rule is inapplicable when closed captioning data has not been received from the Live Slicer.</li><li>Consider the content when setting the threshold for this metric. Some content may contain an extended time period without closed captioning data.</li></ul><br /> **Troubleshooting**<br />Check the source feed. |
| Dropped Frames | Determines how many frames may be dropped within the current reporting period before triggering a warning/critical status.<br /><Info>This metric requires Live Slicer version 16031400 or higher.</Info> |
| Extended Ad Break | Determines the maximum duration of an ad break before triggering a warning/critical status.<br /><br /> **Troubleshooting**<br />Verify that automation scripts are sending valid ad break instructions to the Live Slicer. Also, verify that the Live Slicer is acting upon those instructions. |
| Last Update Time | Indicates the amount of time since an update from the Live Slicer was received. A high value for this metric is indicative of one of the following conditions:<ul><li>The Live Slicer was shut down.</li><li>Internet connectivity issues. If there are other Live Slicers in the same datacenter or location, then this issue may be confirmed by whether they are also reporting a high value for this metric.</li></ul><br /> **Troubleshooting**<br />Check for an egress bandwidth issue. |
| Loss of Audio | Determines the length of time during which audio is not detected before triggering a warning/critical status.<br /><br />Periods of silence may be normal. Consider the source content when setting critical/warning thresholds.<br /><br /> **Diagnosis**<br />Check the vol response parameter for a very low value.<br /><br /> **Troubleshooting**<br />Check the source feed to resolve issues with audio levels. |
| Nielsen Tag Last Seen | Determines the length of time that may elapse since the Live Slicer last received a Nielsen watermark before triggering a warning/critical status.<br /><br /> **Key Information**:<ul><li>Nielsen watermarks may be inserted into the audio stream sent to the Live Slicer. They are typically inserted at 10 second intervals. However, this interval may vary according to your implementation.</li><li>Nielsen watermarks are leveraged by the Live Slicer to generate ID3 tags through which a media player reports viewership data.</li></ul><br /> **Troubleshooting**<br />Check whether Nielsen watermarks are being inserted into the audio stream fed to the Live Slicer. |
| Processing Backlog | Determines how many packets may be queued to be read by the Live Slicer before triggering a warning/critical status.<br /><br /> **Key Information**:<ul><li>The recommended levels for this metric varies according to the signal type. For example, a UDP Unicast stream should have a much lower threshold (e.g., 1,000) than a UDP Multicast stream (e.g., 10,000)</li><li>A high value may be indicative of insufficient CPU resources on the computer hosting the Live Slicer.</li><li>A transient spike in this metric may not be cause for concern.</li></ul><br /> **Troubleshooting**<br />Check for insufficient resources. |
| SCTE Last Seen | Determines the length of time that may elapse since the Live Slicer last received a SCTE 35/104 signal before triggering a warning/critical status. |
| Signal Status | Determines whether a loss of the Live Slicer's signal will trigger warning or critical status.<br /><br />A loss of signal is also indicated in the Live Slicer's thumbnail preview by green/black frames or a predefined background image. |
| Static Audio | Determines the length of time during which static audio is detected before triggering a warning/critical status.<br /><br />Static audio is detected by analyzing the audio's loudness percentage over the last few seconds. This rule ignores periods of silence.<br /><br /> **Diagnosis**<br />Check the vol response parameter for a static value.<br /><br /> **Troubleshooting**<br />Check the source feed to resolve issues with audio levels. |
| Static Video | Determines the length of time during which static video (e.g., green screen, color bars, or a frozen frame) is detected before triggering a warning/critical status.<br /><br />Static video is detected by analyzing the video's average luminosity percentage over the last few seconds.<br /><br /> **Diagnosis**<br />Check the luma response parameter for a static value.<br /><br /> **Troubleshooting**<br />Check the source feed to resolve issues with video input. |
| Upload Queue | Determines how many slices may be queued for upload before triggering a warning/critical status.<br /><br />**Diagnosis**<br />A value higher than 2 may be indicative of Live Slicer connectivity issues.<br /><br /> **Troubleshooting**<br />Check for an egress bandwidth issue. |



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

## Dashboard  {/*dashboard*/}

The Live Slicer Monitoring dashboard provides statistics and graphs that describe Live Slicer health.

![Monitoring Landing Page](/images/uplynk/monitoring-landing.png)

**The left pane**

- Determines whether you will view the Slicer View(s) associated with your personal user account or your organization's shared ones.
- Allows you to switch to a different Slicer View.
- Indicates the current Slicer View and the number of Live Slicers associated with it by health status.
- Toggles Live Slicers from the dashboard by owner. For each owner, it also indicates the number of Live Slicers by health status.

![Monitoring Callouts](/images/uplynk/monitoring-callouts.png)

The **right pane** provides the following information and statistics for each Live Slicer associated with the current Slicer View.

| Column Name | Description  |
|---|---|
| Health  | Indicates Live Slicer health via the following color-coded icons:<ul><li><Image inline src="/images/uplynk/healthy.png" alt="Revert" /> **Healthy**: Indicates that all monitored metrics are below warning thresholds.</li><li><Image inline src="/images/uplynk/neutral.png" alt="Revert" /> **Neutral**: Indicates that the Live Slicer is not slicing content.</li><li><Image inline src="/images/uplynk/warning.png" alt="Revert" /> **Warning**: Indicates that one or more monitored metrics are at warning levels.</li><li><Image inline src="/images/uplynk/critical.png" alt="Revert" /> **Critical**: Indicates that one or more monitored metrics are at critical levels. </li></ul><br /><Tip>A Live Slicer's status is determined by [ruleset](/uplynk/acquire/live/health_monitoring/#monitoring-rules). If a Live Slicer has been [assigned multiple rulesets](/uplynk/acquire/live/health_monitoring/#assign-custom-set), then each unique combination of Live Slicer and ruleset will be listed on the dashboard.</Tip> |
| Duration| Indicates the amount of time that the Live Slicer has been in the current health state.   |
| Slicer ID     | Indicates a Live Slicer's ID. This ID is defined by the slicerID parameter in the Live Slicer's configuration file.     |
| Ruleset | Indicates the ruleset used to determine the state of Live Slicer health. |
| Owner   | Identifies the name of the user that owns the Live Slicer.   <br />[Learn how to monitor Live Slicers across multiple accounts](/uplynk/acquire/live/health_monitoring/#assign-custom-set).  |
| IP| Indicates the Live Slicer's IP address.   |
| Zone    | Indicates the zone to which the Live Slicer is pushing content.|
| Broker  | Identifies the name of the broker handling the Live Slicer's content.|
| Broker IP     | Indicates the IP address of the broker handling the Live Slicer's content.    |
| State   | Indicates the Live Slicer's current state:<ul><li>**Slicing**: Indicates that the Live Slicer is currently slicing content.</li><li>**Ad Break**: Indicates that content is being driven by a third-party ad server instead of the Live Slicer.</li><li>**Replacing Content**: Indicates that content is being driven by pre-encoded content instead of the Live Slicer.</li><li>**Blackout**: Indicates that the content currently being sliced by the Live Slicer is being blacked out.</li><li>**Inactive**: Indicates that the Live Slicer was active within the last 24 hours, but is not currently slicing content, replacing content, in an ad break, or in a blackout state.</li></ul>     |
| Signal  | Indicates the input signal type:<ul><li>**Blackmagic Capture Devices**: Indicates the signal format reported by the card. Sample value: `HD 1080i 60fps`</li><li>**UDP Transport Streams**: Reports the following information: TS \{multicast unicast\}\{Source IP Address\}:\{Port\}\{Resolution Width x Height\} </li><li>**No Signal**: Reports the following value when the signal is lost: No signal</li></ul>|
| Luma    | Indicates the average luminosity percentage for the last few seconds of video. This percentage will only be returned when the Live Slicer has reported a luma value. |
| Vol     | Indicates the average loudness percentage for the last few seconds of audio. This percentage will only be returned when the Live Slicer has reported a volume value. |
| CCLS    | Indicates the number of seconds since the Live Slicer received the most recent caption. <br /> [Learn more](/uplynk/acquire/live/health_monitoring/#metrics). |
| NTLS    | Indicates the number of seconds since the Live Slicer received the most recent Nielsen tag. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics).    |
| SCTELS  | Indicates the number of seconds since the Live Slicer received the most recent SCTE signal. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics).    |
| PB| Indicates the number of packets that are queued to be read by the Live Slicer. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics). |
| DF| Indicates the number of [dropped frames](/uplynk/acquire/live/health_monitoring/#metrics).|
| UQ| Indicates the number of slices that are awaiting to be uploaded. <br />[Learn more](/uplynk/acquire/live/health_monitoring/#metrics).    |
| CPU     | Indicates the percentage of CPU usage for the computer hosting the Live Slicer. CPU usage is reported for 1 second, 5 seconds, and 15 seconds ago.|
| OS| Indicates the operating system for the computer hosting the Live Slicer. |
| Real MEM| Indicates the amount of physical memory, in MB, used by the Live Slicer. |
| Virt MEM| Indicates the amount of virtual memory, in MB, used by the Live Slicer.

**Key Information**

By default, all Live Slicers that have been associated with the currently selected Slicer View and that have been active within the last 24 hours are displayed on the dashboard. This list may be filtered by Live Slicer ID, health status, or account owner.

![Monitoring Filter](/images/uplynk/monitoring-filter.png)

- **Filter by Live Slicer ID**: Type the desired ID and then press the Enter key.
- **Filter by Live Slicer health status**: Click the health status filter icon <Image inline src="/images/uplynk/filter.png" alt="Revert" />, mark and/or clear the desired statuses, and then click off of it to hide the popup.
- **Choose Columns**: Select the set of columns to be displayed by clicking the columns icon <Image inline src="/images/uplynk/columns.png" alt="Revert" />.
- **View Detailed Information**: Clicking on a Live Slicer provides more detailed information about that Live Slicer and its health. This detailed view is known as Live Slicer Details.

### Live Slicer Details  {/*live-slicer-details*/}

View more detailed health information by clicking on a Live Slicer.

- **Health Measurement**: Live Slicer health is measured according to its current ruleset. View and/or set a Live Slicer's ruleset from the pane on the right-hand side of the window.
- **Assign Rulesets**: Assign rulesets to one or more Live Slicer(s) from the [Monitoring Rules](/uplynk/acquire/live/health_monitoring/#monitoring-rules) page.
- **Set Profile**: View and/or set the profile that determines when the Live Slicer will push health data to Amazon SNS or trigger audio notifications from the pane on the right-hand side of the window.

This mode consists of the following four views: Slicer Snapshot, Charts, Health Details, Status.

#### Slicer Snapshot  {/*slicer-snapshot*/}

This view consists of the following sections:

- **Preview**: Displays a thumbnail preview of the Live Slicer's output. The output for this preview varies according to its state.
  - **Slicing**: Displays recently sliced content.
  - **Ad Break**: Displays a message indicating that the thumbnail is unavailable.
  - **Replacing Content**: Displays a message indicating that the thumbnail is unavailable.
  - **Blackout**: Displays a message indicating that the thumbnail is unavailable.
  - **Offline**: By default, green frames are shown whenever the signal is lost. Black frames or an image may be shown instead when either the `no_signal_pad` or the `no_signal_image` setting is defined.
- **Health Level**: Indicates the Live Slicer's current health status and the duration that it has been in that state.
- **Slicer Status**: Indicates the Live Slicer's status and the duration that it has been in that state.
- **Health - *\{Ruleset\}***: Displays historical health status for the current Live Slicer. The line graph's title indicates the ruleset through which health status was determined.

<Tip>You may view Live Slicer health for a previous time window by clicking the **Choose Start Date** link that appears to the right of the Start Date option and then selecting the desired start date and time.</Tip>

#### Charts  {/*charts*/}

This view graphs historical statistics for key metrics. Click on a metric to view its line graph.

<Tip>You may view metric health for a previous time window by clicking the **Choose Start Date** link that appears to the right of the **Start Date** option and then selecting the desired start date and time.</Tip>

Each metric is color-coded to indicate health status:

- <Image inline src="/images/uplynk/healthy.png" alt="Revert" /> **Healthy**: Indicates that all monitored metrics are below warning thresholds.
- <Image inline src="/images/uplynk/neutral.png" alt="Revert" /> **Neutral**: Indicates that the Live Slicer is not slicing content.
- <Image inline src="/images/uplynk/warning.png" alt="Revert" /> **Warning**: Indicates that one or more monitored metrics are at warning levels.
- <Image inline src="/images/uplynk/critical.png" alt="Revert" /> **Critical**: Indicates that one or more monitored metrics are at critical levels.

Some of the metrics reported in this view may be responsible for determining Live Slicer health status in multiple ways. This relationship is explored below.

<Tip>For more information see [Monitoring Metrics](/uplynk/acquire/live/health_monitoring/#metrics).</Tip>

| Metric | Description |
|---|---|
| Signal | Indicates the input signal type. Health status is determined by Signal Status. |
| Luminosity | Indicates the average luminosity percentage for the last few seconds of video. This percentage will only be returned when the Live Slicer has reported a luma value. Health status is determined by Black Video and Static Video. |
| Volume | Indicates the average loudness percentage for the last few seconds of audio. This percentage will only be returned when the Live Slicer has reported a volume value. Health status is determined by Loss of Audio and Static Audio. |
| Closed Captions | Indicates either the number of seconds since the Live Slicer received the most recent caption or None if closed captions have never been received. Health status is determined by Closed Captions Last Seen. |
| Nielsen Tag last seen | Indicates the number of seconds since the Live Slicer received the most recent Nielsen tag. Health status is determined by Nielsen Tag Last Seen. |
| SCTE last seen | Indicates the number of seconds since the Live Slicer received the most recent SCTE signal. Health status is determined by SCTE Last Seen. |
| Processing backlog | Indicates the number of packets that are queued to be read by the Live Slicer. Health status is determined by Processing Backlog. |
| Dropped Frames | Indicates the number of dropped frames. Health status is determined by Dropped Frames. |
| Upload Queue | Indicates the number of slices that are awaiting to be uploaded. Health status is determined by Upload Queue. |
| Extended Ad Break | Indicates duration of the current ad break in seconds. Health status is determined by Extended Ad Break. |

<Info>A Live Slicer's status is determined by ruleset. If a Live Slicer has been assigned multiple rulesets, then each unique combination of Live Slicer and ruleset will be listed on the dashboard.</Info>

#### Health Details  {/*health-details*/}

This view provides detailed Live Slicer health for a given timestamp.

- **Details**: Identifies the timestamp for the current set of health data and the amount of time that the Live Slicer has been in the current state.
- **Metrics**: Provides health data for each metric. Specifically, each row identifies a metric, its health status at the time identified in the Details section, and a brief description of the last time that this metric's health status changed.

#### Status  {/*status*/}

This view provides metric data for a given timestamp.

- **Details**: Identifies the timestamp for the current set of health data.
- **Status JSON**: Provides detailed Live Slicer information, including metrics, in JSON format.
- **Metrics**: Provides data for each metric.

### Alert Log Data  {/*alert-log-data*/}

The Alert Log page displays log data for alerts generated for the current Live Slicer over the specified date range. Leverage this historical data to discover trending issues and adjust warning/critical alert levels.

- Alert log data is paginated and limited to 10,000 entries. If you encounter this limitation, adjust your filters (e.g., reduce the time window or only show changes in health status) to reduce the number of entries.
- Alert log data is displayed in reverse chronological order (i.e., newest to oldest event).
- Log alerts are triggered according to the ruleset(s) assigned to your Live Slicer(s).

**Key Information**

Filter log data by:

- **Health Status**: Mark or clear the desired health status(es).
- **Status Change**: Filter log data to only show changes in a Live Slicer's health status by marking the **Show changes in health only** option.
- **Time**: Specify the date range for which log data will be shown by setting the **From** and **To** options and then clicking **Apply**.

The following information is provided for each logged alert:

| Column Name | Description |
|---|---|
| Slicer ID | Indicates a Live Slicer's ID. This ID is defined by the slicerID parameter in the Live Slicer's configuration file. |
| Account | Identifies the name of the user that owns the Live Slicer. |
| Previous | Indicates the Live Slicer's health status immediately prior to the point-in-time identified by the Timestamp column. |
| Current | Indicates the Live Slicer's health status at the point-in-time identified by the Timestamp column. |
| Created Date | Indicates the relative time that has elapsed since the log event took place. |
| Timestamp | Indicates the date and time (UTC) at which the log event took place. |
| Problem Metrics | Indicates zero or more metrics that caused a warning or critical health status. |

**Common Tasks**

- **View Log Data**: View the Alert Log page by clicking **Log** from the Live Slicer Monitoring dashboard.
- **Refresh Log Data**: View log events that have occurred since the start of your browsing session by clicking **Apply**.
- **Filter Log Data**: Filtering options are provided on the left-hand side of the page.
- **Navigate Log Data**: The Alert Log page can display up to 15 alert events. View older alerts by clicking on one of the following:
  - **« First**: Navigates to the first page.
  - **Previous**: Navigates to the previous page.
  - **Page_Number**: Navigates to a specific page.
  - **Next**: Navigates to the next page.
  - **Last »**: Navigates to the last page.

## Penalty Box  {/*penalty-box*/}

The Penalty Box allows you to quickly review all Live Slicers that are experiencing one or more monitored metrics at warning levels, critical levels, or both.

**Key Information**

To view the [Penalty Box](https://monitor.uplynk.com/penalty-box), follow these steps:

1. From the main menu, navigate to **Services** and then click on **Monitoring 2.0**.
2. Open the **Slicers** menu and then click on **Penalty Box**.

The Penalty Box displays all unhealthy Live Slicers for any of your [monitored accounts](#enable-disable).

- Unhealthy Live Slicers for your own account belong to the **Personal slicers** category. This category also includes any Live Slicers to which you have been granted access that do not belong to your [organization](#organizations).
- If you belong to an organization, then your organization will also be displayed as a category.

Each category indicates the number of Live Slicers that are experiencing one or more monitored metrics at critical and warning levels.

![Penalty Box Indicators](/images/uplynk/penalty-box.png)

Use the **Unhealthy Only** option to determine whether to list your organization or **Personal slicers** when that category only contains healthy Live Slicers.

## Issue Remediation  {/*issue-identification-remediation*/}

Learn how to interpret status information.

It is not recommended to use log data as a monitoring mechanism. Instead, leverage log data to identify and troubleshoot issues. Common issues are typically due to:

- Egress bandwidth
- Source signal
- System resources
- Configuration

### Egress Bandwidth  {/*egress-bandwidth*/}

<Tip>Most Live Slicer issues are due to egress bandwidth.</Tip>

A Live Slicer combats latency issues by uploading up to five video slices in parallel. Under ideal circumstances, it will only upload one or two slices at a time. However, bandwidth constraints may require it to upload additional slices in an effort to catch up. If bandwidth continues to fall short of what is needed, the slicer will buffer up to 5 minutes of video before it begins dropping incoming frames.

### Diagnose Issues  {/*confirm-egress-bandwidth*/}

Confirm egress bandwidth issues through the following error messages:

| Error Message | Description |
|---|---|
| Error uploading slice X, will retry<br />Unable to upload slice X, HTTP error X<br />Failure uploading slice, will retry | These error messages are indicative of an egress bandwidth issue under the following circumstances:<ul><li>**Frequency**: Frequent occurrences of these error messages are a strong indicator of an egress bandwidth issue.</li><li>**Other Indicators**: The combination of these error messages with other indicators (e.g., outdated response parameter) are a strong indicator of egress bandwidth issues.</li></ul><br />**More Information**: <ul><li>It is not abnormal for this message to be logged due to occasional upload errors.</li><li>A slicer may upload up to five slices in parallel. This may result in up to five duplicate error messages being logged at or near the same time.</li><li>If a slice cannot be uploaded, the Live Slicer will wait for a short timeout and then retry. This timeout will double with each attempt. This process will continue until the slice is uploaded.</li></ul> |
| Upload queue depth: X | Check for messages containing a value higher than 2 or 3.<br /><br />**More Information**:<ul><li>This message, which is logged on a regular basis, indicates how many slices are waiting to be uploaded.</li><li>This message provides the same data as the waiting value returned by the status APIs.</li></ul> |
| Switching to alternate upload site | Check for frequent occurrences of this error message.<br /><br />**More Information**:<ul><li>This message indicates that the Live Slicer is trying to work around any possible route-specific problems by switching to an alternate upload location.</li><li>The Live Slicer may attempt this independently for each of the parallel uploaders.</li><li>It is not abnormal for this message to be logged due to momentary bandwidth hiccups.</li></ul> |
| Failed to send status to broker: `<message>` | This message indicates that the Live Slicer is unable to communicate with the backend.<br /><br />**More Information**:<br />The Live Slicer will retry until it is able to resume communication. |
| Clearing current broker - too many consecutive communication failures | This message indicates that the Live Slicer was unable to communicate with the backend.<br /><br />**More Information**:<br />The Live Slicer will switch to a different backend component and then retry. |
| Unable to mark slice X delivered, `<reason>` | Check for frequent occurrences of this error message.<br /><br />**More Information**:<ul><li>This message indicates that the Live Slicer was unable to provide a report of recently uploaded slices to the backend. The Live Slicer will retry until it successfully reports to the backend.</li><li>This message is uncommon due to the small size of the data being sent.</li></ul> |

### Testing  {/*testing*/}

<Tip>This tool only tests burst bandwidth and is not a good indicator of average bandwidth.</Tip>

The Live Slicer includes a tool that reports the bandwidth, in Megabits per second, between the Live Slicer and the backend. Use this tool to assess whether a Live Slicer is experiencing network connectivity issues with the backend.

**Usage**

Run the following command:

```bash
$ cd /opt/uplynk/latest
$ ./slicer -u <username> -apikey <APIKey> -bandwidth
```

### Source Signal  {/*source-signal*/}

A Live Slicer that is not receiving a video signal will output blank green frames with silent audio. This state is indicated by the status methods when the signal response parameter returns **No signal**.

#### Diagnosis  {/*diagnosis*/}

A source signal issue may arise due to the SDI source or the UDP transport stream.

#### SDI Source  {/*SDI-source*/}

The following message indicates that the Live Slicer is unable to receive the source signal from the capture card:

| Error Message | Description |
|---|---|
| Card thinks signal dropped | The Live Slicer will log this message up to 5 consecutive frames before it begins outputting green frames. |

### UDP Transport Streams  {/*udp-transport-streams*/}

Under normal circumstances, a UDP transport stream may drop packets in transit to the Live Slicer and generate any of the error messages listed below. Identify signal issues by the frequency of these error messages.

| Error Message | Description |
|---|---|
| injecting Xms of blank video | Indicates that blank green frames were inserted as a result of video decoding inactivity. This action will only be taken after a full second of missing video. |
| injecting Xms of blank audio | Indicates that silent audio was inserted as a result of audio decoding inactivity. This action will only be taken after a full second of missing audio. |
| tossing frame until we have audio to match<br />tossing frame until timestamps synchronize | Indicates that the Live Slicer has started receiving data again after signal loss, but it is unable to synchronize the audio/video data. It will continue to retry as it receives new audio/video data. |
| Guesstimating frame timestamp ... | Indicates that the Live Slicer has estimated the timing information relative to previous frames due to an in-stream timing information change.<br /><br />**More Information**:<ul><li>This issue is commonly caused by dropped frames. This will create a gap in the timing.</li><li>Another cause for this issue is a change in source content (e.g., splicing from one program to another).</li></ul>|
| Invalid pts delta ... | Indicates that the Live Slicer is attempting to resynchronize audio/video after encountering a large discrepancy between the current and previous frame. |
| frame older than recent estimation | Indicates that the Live Slicer dropped a frame that was older than the previous frame and then attempted to resynchronize the audio/video. |
| Unable to decode frame, skipping | Indicates that the Live Slicer was unable to decode a video frame.<br /><br />**More Information**:<br />This issue is commonly caused by dropped packets. This will prevent the frame from containing sufficient information for the purpose of decoding it. |
| Unable to decode audio, skipping | Indicates that the Live Slicer was unable to decode an audio frame.<br /><br />**More Information**:<br />This issue is commonly caused by dropped packets. This will prevent the frame from containing sufficient information for the purpose of decoding it. |

### Reverse Path Filtering  {/*reverse-path-filtering*/}

Tools that communicate directly with the network interface (e.g., Wireshark) will be unaffected by this issue. However, the Live Slicer will be unable to receive the signal.

A common obstacle with multicast UDP signals is reverse path filtering. This issue occurs when multicast packets arrive on an interface that doesn't have a route for the source address. By default, the Linux kernel will filter these packets and prevent them from being delivered to the Live Slicer.

#### Resolution/Remediation  {/*resolution-remediation*/}

Resolve this issue by either:

- Fixing the routing configuration.
- Disabling reverse path filtering through the following command:

    ```bash
    $ echo 1 > /proc/sys/net/ipv4/conf/all/rp_filter
    $ sysctl -w "net.ipv4.conf.all.rp_filter=0"
    ```

### System Resources  {/*system-resources*/}

The Live Slicer requires significant memory and CPU resources to perform real-time video processing. Insufficient resources may cause dropped frames.

#### Diagnosis  {/*diagnosis*/}

Check for dropped frames occurring without egress bandwidth symptoms. Upon detecting this condition, leverage system tools to monitor system resources (e.g., CPU usage, load average, and memory consumption).

| System Resource | Description |
|---|---|
| Load Average | Check load average by using a system tool, such as:<ul><li>uptime</li><li>top</li></ul><br /><br />Verify that the load average is less than 2x the number of core processors.<br /><br />**More Information**:<ul><li>The above tools report average CPU load for the last 1, 5, and 15 minutes.</li><li>These statistics indicate the average number of tasks that were ready to be processed during that time period.<br /><br />**Example**:<br />A load average of 12 indicates that there are 12 tasks ready to run. On a 6-core system, this means that there are twice as many tasks ready to run as there are cores available to run them.</li></ul> |
| Memory Usage | Check memory usage by using a system tool, such as:<ul><li>/proc/meminfo</li><li>top</li></ul><br /><br />Check for high levels of swap usage by looking at the `SwapTotal` field in `/proc/meminfo`. This is an indicator of a performance issue that may cause dropped frames.<br /><br />**More Information**:<ul><li>A Live Slicer's memory usage depends on the following factors:<br />- The resolution and frame rate of the source material.<br />- Complexity of the video.<br />- The amount of backlog induced by poor egress bandwidth.</li><li>Typical memory usage ranges from 3 to 8 GB. However, this statistic will fluctuate significantly during operation. The system should have sufficient RAM to accommodate this fluctuation, plus some extra for operating system overhead. </li></ul>|

### Configuration  {/*configuration*/}

This section covers common configuration issues that may prevent the Live Slicer from functioning properly.

| Issue | Description |
|---|---|
| Closed captions not working with SDI feeds | Perform the following steps:<ol><li>Use the ancillary scan mode to discover the ancillary line number and/or DID/SDID. Enable `ancillary scan` mode by changing the **ancillary_scan** setting in the Live Slicer's config file from "off" to "on" and then restarting it.</li><li>Check the logs for the following message: `Unknown DID/SDID X/Y on line Z`</li><li>Set the following Live Slicer's config settings to the X, Y, and Z values defined in the log message:<br />- captions_DID<br />- captions_SDID<br />- ancillary_lines</li><li>Restart the Live Slicer.</li><li>Repeat steps 2 - 4 until the right combination is found.</li><li>Turn off ancillary scan mode.</li></ol><br />**More Information**:<br />The Live Slicer must be told where to look for CEA-608/708 closed captions for SDI feeds. By default, the slicer looks on ancillary line 9/13 for SMPTE 291M messages with the DID/SDID 0x61/0x01, which is the most common configuration for broadcast signals. |
| Auto expiring assets | Change the `autoexpire_age` setting in the Live Slicer's config file to the desired length of time and then restart the Live Slicer.<br /><br />**More Information**:<br />By default, the Live Slicer expires live assets after 24 hours. |
| Audio channel layout | **SDI Signal Only**<br />Update the Live Slicer's configuration file through the following steps:<ol><li>Set the desired audio channel layout through the audio_layout setting.</li><li>Add audio tracks by:<br />- Inserting the `audio_tracks` setting. Set it to the desired number of tracks.<br />- Adding an `audio_layout_X` setting for each audio track.<br />**Example**:<br />Add a second track on the second stereo pair (channels 3 and 4) by adding the following settings: `audio_tracks: 2` and `audio_layout_1: stereo 2`.</li><li>Restart the Live Slicer.</li></ol><br />**More Information**:<br />By default, the slicer will use the first two channels from the input signal as a stereo pair. |
| Unique Live Slicer IDs | The following log message indicates that multiple Live Slicers are using the same ID:<br />`Unable to mark slice X delivered: Deliver rejected: slicing for beam Y is already done.`<br />Resolve this issue by assigning a unique ID to each Live Slicer.<br /><br />**More Information**:<br />A unique ID must be assigned to each Live Slicer regardless of whether it is capturing the same signal as other Live Slicers. |

### Troubleshooting  {/*misc-troubleshooting*/}

This section provides additional tips for issue identification and remediation.

#### Asset Rollover  {/*asset-rollover*/}

The maximum duration of a live asset is 8 hours. Once a live asset reaches this duration, the Live Slicer will start writing to a new asset.

#### Delayed Playback  {/*desired-playback*/}

<Info>Expired or deleted assets cannot be viewed on delay.</Info>

A live stream may either be played back in real-time or on delay. Delayed playback is useful when troubleshooting issues that occurred in the past.

To view a live stream on delay, add `delay=<seconds>` to the channel URL query parameters.

## Organizations {/*organizations*/}
---

An organization is a system-defined entity that contains accounts and users. It allows the use of shared Slicer Views and rulesets for Live Slicer health monitoring. Both accounts and users are types of customer accounts. A customer account allows the management of Slicers, Live Slicers, live channels, live events, and content.

![Accounts and Users](/images/uplynk/accounts-users.png)

**Sample Organization**

In this example, there is an organization called Widgets that contains the following customer accounts:

| Type    | Name             |
|---------|------------------|
| **Accounts** | Marketing <br />   Sales            |
| **Users**    | joe@example.com <br /> jane@example.com <br />  john@example.com |

This organization contains Marketing and Sales accounts through which authorized users manage the Live Slicers for their Marketing and Sales conferences.

**Key Information**

- **Account**: A dedicated customer account allows multiple users to leverage shared Live Slicers, live channels, live events, and content. Users may not log in directly to an account.
- **User**: An individual user can manage their own Slicers, Live Slicers, live channels, live events, and content. Authorized users may also monitor Live Slicers associated with accounts.
- **Administrator**: An administrator of your organization can modify the organization's user membership. All other organization properties are read-only. An administrator may only add users who have previously used this version of the Live Slicer Monitoring dashboard.

### User Capabilities  {/*user-capabilities*/}

All users associated with your organization will be able to:

- Leverage your organization's Slicer Views and rulesets for Live Slicer health monitoring.
- Users with either admin or read/write permissions are authorized to create, modify, and delete your organization's Slicer Views and rulesets.
- Monitor the Live Slicers associated with your organization's accounts. A user may either use your organization's Slicer View(s) or create one or more Slicer View(s) for their own personal use.

#### Additional Details  {/*additional-details*/}

- All of your organization's users may select your organization's accounts from the Monitored Accounts page.
- Organization membership does not grant access to the Live Slicers associated with the personal accounts of other members. However, another member may grant you permission to monitor their Live Slicers.
- By default, all users associated with your organization are authorized to monitor the Live Slicers associated with your organization's accounts. An administrator may modify each account's allowed watchers to authorize users outside of your organization or disallow some of your organization's users from monitoring those Live Slicers.
- Our system is responsible for creating and associating accounts with an organization. An account may only be associated with a single organization.
- Contact your account manager to request an organization.

### Modify an Organization's Membership and User Roles  {/*modify-organization-membership*/}

This procedure may only be performed by an administrator of your organization.

#### Access Organizations  {/*access-organizations*/}

1. Navigate to the [Organizations Administration page](https://monitor.uplynk.com/settings/organizations). From the main menu, navigate to **Services** > **Monitoring 2.0** > **Settings** > **Organizations Administration**.
2. Click on your organization.
3. Click on the **Users** tab.

4. Optional. Add users to your organization.

    You may only add users who have previously used this version of the Live Slicer Monitoring dashboard.

    - Click **+ Add Users**.
    -  In the **1. User(s):** option, type the name of the user(s) to be added. If adding multiple users, delimit each username with a comma.

        Example: `joe@example.com,jane@example.com`

    - From the **2. Select Role to Apply to user(s):** option, select the level of access for the user(s) defined in the previous step.
    - Click **Add**.

5. Optional: Assign a new role to a user by clicking the user's current role and selecting the new role to assign.

6. Optional: Remove users from your organization.

    - Mark each desired user.
    - Click **Remove**.
    - Click **Yes, Delete It**.
    - Click **Save**.

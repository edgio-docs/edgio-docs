---
title: Organizations
---

An organization is a system-defined entity that contains accounts and users. It allows the use of shared Slicer Views and rulesets for Live Slicer health monitoring. Both accounts and users are types of customer accounts. A customer account allows the management of Slicers, Live Slicers, live channels, live events, and content.

![Accounts and Users](/images/uplynk/accounts-users.png)

## Sample Organization  {/*sample-organization*/}

In this example, there is an organization called Widgets that contains the following customer accounts:

| Type    | Name             |
|---------|------------------|
| **Accounts** | Marketing <br />   Sales            |
| **Users**    | joe@example.com <br /> jane@example.com <br />  john@example.com |

This organization contains Marketing and Sales accounts through which authorized users manage the Live Slicers for their Marketing and Sales conferences.

## Key Information  {/*key-information*/}

- **Account**: A dedicated customer account allows multiple users to leverage shared Live Slicers, live channels, live events, and content. Users may not log in directly to an account.
- **User**: An individual user can manage their own Slicers, Live Slicers, live channels, live events, and content. Authorized users may also monitor Live Slicers associated with accounts.
- **Administrator**: An administrator of your organization can modify the organization's user membership. All other organization properties are read-only. An administrator may only add users who have previously used this version of the Live Slicer Monitoring dashboard.

## User Capabilities  {/*user-capabilities*/}

All users associated with your organization will be able to:

- Leverage your organization's Slicer Views and rulesets for Live Slicer health monitoring.
- Users with either admin or read/write permissions are authorized to create, modify, and delete your organization's Slicer Views and rulesets.
- Monitor the Live Slicers associated with your organization's accounts. A user may either use your organization's Slicer View(s) or create one or more Slicer View(s) for their own personal use.

### Additional Details  {/*additional-details*/}

- All of your organization's users may select your organization's accounts from the Monitored Accounts page.
- Organization membership does not grant access to the Live Slicers associated with the personal accounts of other members. However, another member may grant you permission to monitor their Live Slicers.
- By default, all users associated with your organization are authorized to monitor the Live Slicers associated with your organization's accounts. An administrator may modify each account's allowed watchers to authorize users outside of your organization or disallow some of your organization's users from monitoring those Live Slicers.
- Our system is responsible for creating and associating accounts with an organization. An account may only be associated with a single organization.
- Contact your account manager to request an organization.

## Modify an Organization's Membership and User Roles  {/*modify-organization-membership*/}

This procedure may only be performed by an administrator of your organization.

### Access Organizations  {/*access-organizations*/}

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

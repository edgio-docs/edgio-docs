---
title: Origin Storage Users
---
Navigate to Manage > Origin Storage Users in the navigation pane. The *Origin Storage Users* screen is displayed, with a list of all Origin Storage users associated with the currently selected Edgio Account.

Links at the top of the list allow you to show active, inactive, or all users.

The list includes the following information for each storage account:

-   **Bucket User** - Indicates if the user is allowed to work with buckets.
-   **Username** - Displays the username of the user who created the storage account.
-   **Restricted Directory** - Displays the path to the restricted directory.

## Creating a New Origin Storage User Account  {/*creating-a-new-origin-storage-user-account*/}

To create a new user account, click **+ new**, and the *Create Origin Storage User* page is displayed.

-   Enter the **Username** of the user who will be managing this account.

    Once your has been saved, this field cannot be edited
-   Enter the **Restricted Directory** path to your restricted content. For example: `/testtest/test`

    The restricted directory is prepended with your shortname before the slash (/)
-   Enter the **Password** and **Confirm Password** for this account
-   Click **Save** to create the new account

<Callout type="info">If you are a bucket-enabled customer, you can only create bucket-enabled users, and the restricted directory is your bucket "root." It is pre-configured as `/<account name>\_buckets` and is disabled. Otherwise, all UI elements and functionality for creating new user accounts are the same as for non-bucket-enabled customers.</Callout>

## Editing an Existing Account  {/*edit-an-existing-account*/}

In the *Origin Storage Users* screen, locate an existing account and click the **pencil** icon. The *Edit User* screen is displayed. The fields and controls for editing an account as the same as under [Creating a New Origin Storage User Account](#creating-a-new-origin-storage-user-account), except that the **Username** and **Restricted Directory** fields cannot be edited.

## Deleting an Account  {/*deleting-an-account*/}

In the *Origin Storage Users* screen, locate an existing account and click the trash icon, then click **Continue** in the confirmation dialog. The account will then be deleted.

## Reactivating an Inactive User  {/*reactivating-an-inactive-user*/}

Inactive users are shown in the *Inactive* and *All* tabs. To reactivate a user, click the **re-activate** (curved arrow) icon in the *Actions* column.

## Exporting Origin Storage User Data  {/*exporting-origin-storage-user-data*/}

In the *Origin Storage Users* screen, click the **Export CSV** icon to the left of the **+ new** button.

User data is exported to a CSV file.
